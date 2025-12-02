import { describe, test, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import app from '../server.js';
import { cartQueries } from '../db/queries.js';

describe('Cart API Simple Tests', () => {
  beforeEach(() => {
    cartQueries.clear();
  });

  test('Adding item to cart should persist', async () => {
    const response = await request(app)
      .post('/api/cart')
      .send({ productId: 1, quantity: 2 })
      .expect(201);

    expect(response.body.productId).toBe(1);
    expect(response.body.quantity).toBe(2);

    const cartResponse = await request(app)
      .get('/api/cart')
      .expect(200);

    expect(cartResponse.body.items).toHaveLength(1);
    expect(cartResponse.body.items[0].productId).toBe(1);
    expect(cartResponse.body.items[0].quantity).toBe(2);
  });

  test('Adding same product twice should combine quantities', async () => {
    await request(app)
      .post('/api/cart')
      .send({ productId: 1, quantity: 2 })
      .expect(201);

    await request(app)
      .post('/api/cart')
      .send({ productId: 1, quantity: 3 })
      .expect(201);

    const response = await request(app)
      .get('/api/cart')
      .expect(200);

    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].quantity).toBe(5);
  });

  test('Cart items should have all required fields', async () => {
    await request(app)
      .post('/api/cart')
      .send({ productId: 1, quantity: 2 });

    const response = await request(app)
      .get('/api/cart')
      .expect(200);

    const item = response.body.items[0];
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('productId');
    expect(item).toHaveProperty('name');
    expect(item).toHaveProperty('price');
    expect(item).toHaveProperty('quantity');
    expect(item).toHaveProperty('lineTotal');
  });

  test('Cart total should equal sum of line totals', async () => {
    await request(app)
      .post('/api/cart')
      .send({ productId: 1, quantity: 2 });

    await request(app)
      .post('/api/cart')
      .send({ productId: 2, quantity: 1 });

    const response = await request(app)
      .get('/api/cart')
      .expect(200);

    const expectedTotal = response.body.items.reduce(
      (sum, item) => sum + item.lineTotal,
      0
    );

    expect(Math.abs(response.body.total - expectedTotal)).toBeLessThan(0.01);
  });

  test('Updating quantity should persist', async () => {
    const addResponse = await request(app)
      .post('/api/cart')
      .send({ productId: 1, quantity: 2 })
      .expect(201);

    const itemId = addResponse.body.id;

    await request(app)
      .put(`/api/cart/${itemId}`)
      .send({ quantity: 5 })
      .expect(200);

    const cartResponse = await request(app)
      .get('/api/cart')
      .expect(200);

    expect(cartResponse.body.items[0].quantity).toBe(5);
  });

  test('Removing item should update cart and total', async () => {
    await request(app)
      .post('/api/cart')
      .send({ productId: 1, quantity: 2 });

    await request(app)
      .post('/api/cart')
      .send({ productId: 2, quantity: 1 });

    const beforeResponse = await request(app)
      .get('/api/cart')
      .expect(200);

    const beforeTotal = beforeResponse.body.total;
    const itemToRemove = beforeResponse.body.items[0];

    await request(app)
      .delete(`/api/cart/${itemToRemove.id}`)
      .expect(200);

    const afterResponse = await request(app)
      .get('/api/cart')
      .expect(200);

    expect(afterResponse.body.items).toHaveLength(1);
    expect(afterResponse.body.total).toBeLessThan(beforeTotal);
  });

  test('Cart modifications should persist to database', async () => {
    await request(app)
      .post('/api/cart')
      .send({ productId: 1, quantity: 2 });

    const response1 = await request(app).get('/api/cart').expect(200);
    const response2 = await request(app).get('/api/cart').expect(200);

    expect(response1.body).toEqual(response2.body);
  });

  test('Empty cart should return correct structure', async () => {
    const response = await request(app)
      .get('/api/cart')
      .expect(200);

    expect(response.body.items).toEqual([]);
    expect(response.body.total).toBe(0);
  });

  test('Invalid product ID should return 404', async () => {
    const response = await request(app)
      .post('/api/cart')
      .send({ productId: 999, quantity: 1 })
      .expect(404);

    expect(response.body.error).toBe('NotFound');
  });

  test('Invalid quantity should return 400', async () => {
    const response = await request(app)
      .post('/api/cart')
      .send({ productId: 1, quantity: 0 })
      .expect(400);

    expect(response.body.error).toBe('ValidationError');
  });

  test('Updating to quantity 0 should remove item', async () => {
    const addResponse = await request(app)
      .post('/api/cart')
      .send({ productId: 1, quantity: 2 })
      .expect(201);

    await request(app)
      .put(`/api/cart/${addResponse.body.id}`)
      .send({ quantity: 0 })
      .expect(200);

    const cartResponse = await request(app)
      .get('/api/cart')
      .expect(200);

    expect(cartResponse.body.items).toHaveLength(0);
  });

  test('Removing non-existent item should return 404', async () => {
    const response = await request(app)
      .delete('/api/cart/999')
      .expect(404);

    expect(response.body.error).toBe('NotFound');
  });
});
