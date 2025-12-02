import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { checkout } from '../api/client';
import CheckoutForm from '../components/CheckoutForm';
import ReceiptModal from '../components/ReceiptModal';
import { pageTransition } from '../utils/animations';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { formatPrice, user } = useUser();
  const [receipt, setReceipt] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async (name, email) => {
    try {
      setError(null);
      const receiptData = await checkout(name, email);
      setReceipt(receiptData);
      setShowReceipt(true);
      clearCart();
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed. Please try again.');
      console.error('Checkout error:', err);
      throw err;
    }
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    navigate('/');
  };

  if (items.length === 0 && !showReceipt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-slide-up">
          <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 mb-6">
            <svg className="w-24 h-24 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Add some items before checking out</p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen py-12"
      {...pageTransition}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-12 text-center animate-slide-up">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Secure Checkout
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-slide-up">
            <div className="glass-strong p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Customer Information</h2>
              {error && (
                <div className="mb-6 p-4 glass-strong border-2 border-red-500/50 rounded-xl animate-scale-in">
                  <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">{error}</span>
                  </div>
                </div>
              )}
              <CheckoutForm onSubmit={handleCheckout} cartTotal={total} />
            </div>

            {/* Shipping Address Display */}
            {user.address.street && (
              <div className="glass-strong p-6 rounded-2xl mt-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  Shipping Address
                </h3>
                <div className="text-gray-600 dark:text-gray-400 space-y-1">
                  <p>{user.address.street}</p>
                  <p>{user.address.city}, {user.address.state} {user.address.zipCode}</p>
                  <p>{user.address.country}</p>
                </div>
              </div>
            )}
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass-strong p-8 rounded-2xl sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 dark:text-white">{item.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-purple-600 dark:text-purple-400">{formatPrice(item.lineTotal)}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span className="font-semibold">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex justify-between text-2xl font-bold mb-6">
                  <span className="text-gray-800 dark:text-white">Total</span>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ReceiptModal
          isOpen={showReceipt}
          receipt={receipt}
          onClose={handleCloseReceipt}
        />
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
