import cartService from './cartService.js';

/**
 * CheckoutService - Business logic for checkout operations
 */
class CheckoutService {
  /**
   * Process order and generate receipt
   * @param {Array} cartItems - Cart items
   * @param {string} customerName - Customer name
   * @param {string} customerEmail - Customer email
   * @returns {Object} Receipt
   * @throws {Error} If validation fails
   */
  processOrder(cartItems, customerName, customerEmail) {
    // Validate inputs
    if (!customerName || typeof customerName !== 'string' || customerName.trim().length === 0) {
      throw new Error('Customer name is required');
    }

    if (!customerEmail || typeof customerEmail !== 'string') {
      throw new Error('Customer email is required');
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      throw new Error('Invalid email format');
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);

    // Generate receipt
    const receipt = {
      customerName: customerName.trim(),
      email: customerEmail.trim(),
      total: Math.round(total * 100) / 100,
      timestamp: new Date().toISOString(),
      items: cartItems
    };

    // Clear cart after successful checkout
    cartService.clearCart();

    return receipt;
  }
}

export default new CheckoutService();
