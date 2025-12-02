import cartService from '../services/cartService.js';

/**
 * Add item to cart
 * @route POST /api/cart
 */
export function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;

    // Validate request body
    if (!productId || !quantity) {
      return res.status(400).json({
        error: 'ValidationError',
        message: 'productId and quantity are required'
      });
    }

    const item = cartService.addItem(productId, quantity);
    res.status(201).json(item);
  } catch (error) {
    if (error.message === 'Product not found') {
      return res.status(404).json({
        error: 'NotFound',
        message: error.message
      });
    }
    if (error.message.includes('Quantity')) {
      return res.status(400).json({
        error: 'ValidationError',
        message: error.message
      });
    }
    console.error('Error adding to cart:', error);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Failed to add item to cart'
    });
  }
}

/**
 * Get cart contents with total
 * @route GET /api/cart
 */
export function getCart(req, res) {
  try {
    const cart = cartService.getCartWithTotal();
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Failed to fetch cart'
    });
  }
}

/**
 * Update cart item quantity
 * @route PUT /api/cart/:id
 */
export function updateCartItem(req, res) {
  try {
    const itemId = parseInt(req.params.id);
    const { quantity } = req.body;

    // Validate request
    if (isNaN(itemId)) {
      return res.status(400).json({
        error: 'ValidationError',
        message: 'Invalid item ID'
      });
    }

    if (quantity === undefined || quantity === null) {
      return res.status(400).json({
        error: 'ValidationError',
        message: 'quantity is required'
      });
    }

    const item = cartService.updateItemQuantity(itemId, quantity);
    
    if (item === null) {
      // Item was removed (quantity was 0)
      return res.status(200).json({
        message: 'Item removed from cart'
      });
    }

    res.json(item);
  } catch (error) {
    if (error.message === 'Cart item not found') {
      return res.status(404).json({
        error: 'NotFound',
        message: error.message
      });
    }
    if (error.message.includes('Quantity')) {
      return res.status(400).json({
        error: 'ValidationError',
        message: error.message
      });
    }
    console.error('Error updating cart item:', error);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Failed to update cart item'
    });
  }
}

/**
 * Remove item from cart
 * @route DELETE /api/cart/:id
 */
export function removeFromCart(req, res) {
  try {
    const itemId = parseInt(req.params.id);

    // Validate request
    if (isNaN(itemId)) {
      return res.status(400).json({
        error: 'ValidationError',
        message: 'Invalid item ID'
      });
    }

    cartService.removeItem(itemId);
    res.status(200).json({
      message: 'Item removed from cart'
    });
  } catch (error) {
    if (error.message === 'Cart item not found') {
      return res.status(404).json({
        error: 'NotFound',
        message: error.message
      });
    }
    console.error('Error removing from cart:', error);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Failed to remove item from cart'
    });
  }
}
