import { describe, test, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import app from '../server.js';
import { cartQueries } from '../db/queries.js';

describe('Checkout API Tests', () => {
  beforeEach(() => {
    cartQueries.clear();
  });

  test('Valid checkout should return receipt', async () => {
    // Add item to cart
    await request(app)
      .post('/api/cart')
      .send({ productId: 1, quantity: 2 });

    // Checkout
    const response = await request(app)
      .post('/api/checkout')
      .send({ name: 'John Doe', email: 'john@example.com' })
      .expect(200);

    expect(response.body).toHaveProperty('customerName', 'John Doe');
    expect(response.body).toHaveProperty('email', 'john@example.com');
    expect(response.body).toHaveProperty('total');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('items');
  });

  test('Checkout should clear cart', async () => {
    // Add item to cart
    await request(app)
      .post('/api/cart')
      .send({ productId: 1, quantity: 2 });

    // Checkout
    await request(app)
      .post('/api/checkout')
      .send({ name: 'John Doe', email: 'john@example.com' })
      .expect(200);

    // Verify cart is empty
    const cartResponse = await request(app)
      .get('/api/cart')
      .expect(200);

    expect(cartResponse.body.items).toHaveLength(0);
    expect(cartResponse.body.total).toBe(0);
  });

  test('Checkout with empty cart should return 400', async () => {
    const response = await request(app)
      .post('/api/checkout')
      .send({ name: 'John Doe', email: 'john@example.com' })
      .expect(400);

    expect(response.body.error).toBe('ValidationError');
  });

  test('Checkout without name should return 400', async () => {
    await request(app)
      .post('/api/cart')
      .send({ productId: 1, quantity: 2 });

    const response = await request(app)
      .post('/api/checkout')
      .send({ email: 'john@example.com' })
      .expect(400);

    expect(response.body.error).toBe('ValidationError');
  });

  test('Checkout with invalid email should return 400', async () => {
    await request(app)
      .post('/api/cart')
      .send({ productId: 1, quantity: 2 });

    const response = await request(app)
      .post('/api/checkout')
      .send({ name: 'John Doe', email: 'invalid-email' })
      .expect(400);

    expect(response.body.error).toBe('ValidationError');
  });

  test('Receipt should have correct timestamp format', async () => {
    await request(app)
      .post('/api/cart')
      .send({ productId: 1, quantity: 2 });

    const response = await request(app)
      .post('/api/checkout')
      .send({ name: 'John Doe', email: 'john@example.com' })
      .expect(200);

    // Verify timestamp is ISO format
    const timestamp = new Date(response.body.timestamp);
    expect(timestamp.toISOString()).toBe(response.body.timestamp);
  });
});
