import checkoutService from '../services/checkoutService.js';
import cartService from '../services/cartService.js';

/**
 * Process checkout
 * @route POST /api/checkout
 */
export function processCheckout(req, res) {
  try {
    const { name, email } = req.body;

    // Get current cart
    const cart = cartService.getCartWithTotal();

    // Process checkout
    const receipt = checkoutService.processOrder(cart.items, name, email);

    res.status(200).json(receipt);
  } catch (error) {
    if (error.message.includes('required') || error.message.includes('Invalid') || error.message.includes('empty')) {
      return res.status(400).json({
        error: 'ValidationError',
        message: error.message
      });
    }
    console.error('Error processing checkout:', error);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Failed to process checkout'
    });
  }
}
