import express from 'express';
import { getProducts } from '../controllers/productController.js';

const router = express.Router();

// GET /api/products - Get all products
router.get('/', getProducts);

export default router;
