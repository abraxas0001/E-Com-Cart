import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const fetchProducts = async () => {
  const response = await apiClient.get('/api/products');
  return response.data;
};

// Cart API
export const addToCart = async (productId, quantity = 1) => {
  const response = await apiClient.post('/api/cart', { productId, quantity });
  return response.data;
};

export const getCart = async () => {
  const response = await apiClient.get('/api/cart');
  return response.data;
};

export const updateCartItem = async (itemId, quantity) => {
  const response = await apiClient.put(`/api/cart/${itemId}`, { quantity });
  return response.data;
};

export const removeCartItem = async (itemId) => {
  const response = await apiClient.delete(`/api/cart/${itemId}`);
  return response.data;
};

// Checkout API
export const checkout = async (name, email) => {
  const response = await apiClient.post('/api/checkout', { name, email });
  return response.data;
};

export default apiClient;
