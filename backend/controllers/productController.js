import { productQueries } from '../db/queries.js';

/**
 * Get all products
 * @route GET /api/products
 */
export function getProducts(req, res) {
  try {
    const products = productQueries.getAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Failed to fetch products'
    });
  }
}
