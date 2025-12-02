import productRoutes from './productRoutes.js';
import cartRoutes from './cartRoutes.js';
import checkoutRoutes from './checkoutRoutes.js';

/**
 * Setup all application routes
 */
export default function setupRoutes(app) {
  // Product routes
  app.use('/api/products', productRoutes);
  
  // Cart routes
  app.use('/api/cart', cartRoutes);
  
  // Checkout routes
  app.use('/api/checkout', checkoutRoutes);
}
