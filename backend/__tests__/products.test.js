import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import fc from 'fast-check';
import request from 'supertest';
import app from '../server.js';

describe('Product API Tests', () => {
  let server;

  beforeAll(() => {
    // Server is already started by importing app
  });

  afterAll(() => {
    // Clean up if needed
  });

  // Feature: mock-ecom-cart, Property 1: Product structure completeness
  test('Property 1: All products should have required fields (id, name, price) and optional image', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constant(null), async () => {
        const response = await request(app)
          .get('/api/products')
          .expect(200);

        const products = response.body;

        // Verify we have products
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);

        // Check each product has required structure
        products.forEach(product => {
          // Required fields
          expect(product).toHaveProperty('id');
          expect(typeof product.id).toBe('number');
          
          expect(product).toHaveProperty('name');
          expect(typeof product.name).toBe('string');
          expect(product.name.length).toBeGreaterThan(0);
          
          expect(product).toHaveProperty('price');
          expect(typeof product.price).toBe('number');
          expect(product.price).toBeGreaterThan(0);
          
          // Optional field - if present, must be string
          if (product.image !== null && product.image !== undefined) {
            expect(typeof product.image).toBe('string');
          }
        });
      }),
      { numRuns: 100 }
    );
  });

  test('GET /api/products should return between 5 and 10 products', async () => {
    const response = await request(app)
      .get('/api/products')
      .expect(200);

    const products = response.body;
    expect(products.length).toBeGreaterThanOrEqual(5);
    expect(products.length).toBeLessThanOrEqual(10);
  });

  test('GET /api/products should return products with valid price values', async () => {
    const response = await request(app)
      .get('/api/products')
      .expect(200);

    const products = response.body;
    products.forEach(product => {
      expect(product.price).toBeGreaterThan(0);
      expect(Number.isFinite(product.price)).toBe(true);
    });
  });
});
