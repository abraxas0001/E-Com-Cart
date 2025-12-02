import { cartQueries, productQueries } from '../db/queries.js';

/**
 * CartService - Business logic for cart operations
 */
class CartService {
  /**
   * Add item to cart or update quantity if already exists
   * @param {number} productId - Product ID
   * @param {number} quantity - Quantity to add
   * @returns {Object} Cart item
   * @throws {Error} If validation fails
   */
  addItem(productId, quantity) {
    // Validate quantity
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error('Quantity must be a positive integer');
    }

    // Validate product exists
    if (!productQueries.exists(productId)) {
      throw new Error('Product not found');
    }

    // Check if item already in cart
    const existingItem = cartQueries.getByProductId(productId);

    if (existingItem) {
      // Update existing item quantity
      const newQuantity = existingItem.quantity + quantity;
      cartQueries.updateQuantity(existingItem.id, newQuantity);
      return cartQueries.getById(existingItem.id);
    } else {
      // Add new item
      const itemId = cartQueries.add(productId, quantity);
      return cartQueries.getById(itemId);
    }
  }

  /**
   * Get cart with all items and calculated total
   * @returns {Object} Cart with items array and total
   */
  getCartWithTotal() {
    const items = cartQueries.getAll();
    const total = items.reduce((sum, item) => sum + item.lineTotal, 0);

    return {
      items,
      total: Math.round(total * 100) / 100 // Round to 2 decimal places
    };
  }

  /**
   * Update cart item quantity
   * @param {number} itemId - Cart item ID
   * @param {number} quantity - New quantity
   * @returns {Object|null} Updated cart item or null if removed
   * @throws {Error} If validation fails
   */
  updateItemQuantity(itemId, quantity) {
    // Validate quantity
    if (!Number.isInteger(quantity) || quantity < 0) {
      throw new Error('Quantity must be a non-negative integer');
    }

    // Validate item exists
    if (!cartQueries.exists(itemId)) {
      throw new Error('Cart item not found');
    }

    // If quantity is 0, remove the item
    if (quantity === 0) {
      cartQueries.delete(itemId);
      return null;
    }

    // Update quantity
    cartQueries.updateQuantity(itemId, quantity);
    return cartQueries.getById(itemId);
  }

  /**
   * Remove item from cart
   * @param {number} itemId - Cart item ID
   * @throws {Error} If item not found
   */
  removeItem(itemId) {
    // Validate item exists
    if (!cartQueries.exists(itemId)) {
      throw new Error('Cart item not found');
    }

    cartQueries.delete(itemId);
  }

  /**
   * Clear all items from cart
   */
  clearCart() {
    cartQueries.clear();
  }
}

export default new CartService();
