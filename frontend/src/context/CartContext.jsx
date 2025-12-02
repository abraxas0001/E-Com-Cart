import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import * as api from '../api/client';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const cart = await api.getCart();
      setItems(cart.items);
      setTotal(cart.total);
    } catch (err) {
      setError(err.message || 'Failed to fetch cart');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      setError(null);
      await api.addToCart(productId, quantity);
      await fetchCart();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add item to cart');
      console.error('Error adding to cart:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      setLoading(true);
      setError(null);
      await api.updateCartItem(itemId, quantity);
      await fetchCart();
      toast.success('Cart updated');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update quantity';
      setError(errorMsg);
      toast.error(errorMsg);
      console.error('Error updating quantity:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    try {
      setLoading(true);
      setError(null);
      await api.removeCartItem(itemId);
      await fetchCart();
      toast.success('Item removed from cart');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to remove item';
      setError(errorMsg);
      toast.error(errorMsg);
      console.error('Error removing item:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setItems([]);
    setTotal(0);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    items,
    total,
    loading,
    error,
    fetchCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
