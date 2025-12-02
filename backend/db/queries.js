import { db } from './init.js';

/**
 * Product queries
 */
export const productQueries = {
  /**
   * Get all products
   */
  getAll() {
    return db.prepare('SELECT * FROM products').all();
  },

  /**
   * Get product by ID
   */
  getById(id) {
    return db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  },

  /**
   * Check if product exists
   */
  exists(id) {
    const result = db.prepare('SELECT COUNT(*) as count FROM products WHERE id = ?').get(id);
    return result.count > 0;
  }
};

/**
 * Cart queries
 */
export const cartQueries = {
  /**
   * Get all cart items with product details
   */
  getAll() {
    return db.prepare(`
      SELECT 
        ci.id,
        ci.product_id as productId,
        p.name,
        p.price,
        ci.quantity,
        (p.price * ci.quantity) as lineTotal
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
    `).all();
  },

  /**
   * Get cart item by ID
   */
  getById(id) {
    return db.prepare(`
      SELECT 
        ci.id,
        ci.product_id as productId,
        p.name,
        p.price,
        ci.quantity,
        (p.price * ci.quantity) as lineTotal
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.id = ?
    `).get(id);
  },

  /**
   * Get cart item by product ID
   */
  getByProductId(productId) {
    return db.prepare(`
      SELECT 
        ci.id,
        ci.product_id as productId,
        p.name,
        p.price,
        ci.quantity,
        (p.price * ci.quantity) as lineTotal
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.product_id = ?
    `).get(productId);
  },

  /**
   * Add item to cart
   */
  add(productId, quantity) {
    const result = db.prepare('INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)').run(productId, quantity);
    return result.lastInsertRowid;
  },

  /**
   * Update cart item quantity
   */
  updateQuantity(id, quantity) {
    return db.prepare('UPDATE cart_items SET quantity = ? WHERE id = ?').run(quantity, id);
  },

  /**
   * Delete cart item
   */
  delete(id) {
    return db.prepare('DELETE FROM cart_items WHERE id = ?').run(id);
  },

  /**
   * Clear all cart items
   */
  clear() {
    return db.prepare('DELETE FROM cart_items').run();
  },

  /**
   * Check if cart item exists
   */
  exists(id) {
    const result = db.prepare('SELECT COUNT(*) as count FROM cart_items WHERE id = ?').get(id);
    return result.count > 0;
  }
};
