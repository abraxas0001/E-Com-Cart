import express from 'express';
import { addToCart, getCart, updateCartItem, removeFromCart } from '../controllers/cartController.js';

const router = express.Router();

// POST /api/cart - Add item to cart
router.post('/', addToCart);

// GET /api/cart - Get cart contents
router.get('/', getCart);

// PUT /api/cart/:id - Update cart item quantity
router.put('/:id', updateCartItem);

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', removeFromCart);

export default router;
