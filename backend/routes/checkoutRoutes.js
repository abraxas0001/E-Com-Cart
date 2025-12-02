import express from 'express';
import { processCheckout } from '../controllers/checkoutController.js';

const router = express.Router();

// POST /api/checkout - Process checkout
router.post('/', processCheckout);

export default router;
