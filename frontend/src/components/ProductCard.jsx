import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const { formatPrice } = useUser();
  const { items, removeItem } = useCart();
  const [adding, setAdding] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Check if product is in cart
  const cartItem = items.find(item => item.productId === product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await onAddToCart(product.id);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add item to cart');
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveFromCart = async () => {
    if (cartItem) {
      try {
        await removeItem(cartItem.id);
        toast.success('Removed from cart');
      } catch (error) {
        toast.error('Failed to remove from cart');
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  const hoverVariants = prefersReducedMotion
    ? {}
    : {
        scale: 1.03,
        rotateY: 2,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      };

  return (
    <motion.div
      className="group relative glass rounded-2xl overflow-hidden card-premium"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={hoverVariants}
      whileTap={{ scale: 0.98 }}
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-pink-600/10 transition-all duration-500 pointer-events-none z-10"></div>
      
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        {product.image ? (
          <>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            {/* Shimmer Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>
          </>
        ) : (
          <div className="w-full h-64 flex items-center justify-center">
            <svg className="w-20 h-20 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Quick View Badge */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <div className="glass-strong px-3 py-1 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300">
            Premium
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3
            onClick={() => navigate(`/product/${product.id}`)}
            className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 cursor-pointer"
          >
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              {formatPrice(product.price * 1.3)}
            </span>
          </div>
        </div>

        {/* Add to Cart / Remove Button */}
        {isInCart ? (
          <div className="flex gap-2">
            <motion.button
              onClick={() => navigate('/cart')}
              className="flex-1 relative overflow-hidden rounded-xl py-3 px-6 font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-glow transition-all duration-300"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            >
              <span className="relative flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                In Cart
              </span>
            </motion.button>
            <motion.button
              onClick={handleRemoveFromCart}
              className="px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-all duration-300"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              title="Remove from cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </motion.button>
          </div>
        ) : (
          <motion.button
            onClick={handleAddToCart}
            disabled={adding}
            className="w-full relative overflow-hidden rounded-xl py-3 px-6 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          >
            {/* Button Shimmer Effect */}
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
            
            <span className="relative flex items-center justify-center gap-2">
              {adding ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </>
              )}
            </span>
          </motion.button>
        )}

        {/* Features */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Free Shipping
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            In Stock
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
