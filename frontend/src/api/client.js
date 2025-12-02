import axios from 'axios';
import { mockAPI } from './mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || !import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 second timeout
});

// Helper to try real API first, fallback to mock
const withFallback = async (apiCall, mockCall) => {
  if (USE_MOCK) {
    console.log('Using mock API');
    return mockCall();
  }
  
  try {
    return await apiCall();
  } catch (error) {
    console.warn('API call failed, using mock data:', error.message);
    return mockCall();
  }
};

// Products API
export const fetchProducts = async () => {
  return withFallback(
    async () => {
      const response = await apiClient.get('/api/products');
      return response.data;
    },
    () => mockAPI.fetchProducts()
  );
};

// Cart API
export const addToCart = async (productId, quantity = 1) => {
  return withFallback(
    async () => {
      const response = await apiClient.post('/api/cart', { productId, quantity });
      return response.data;
    },
    () => mockAPI.addToCart(productId, quantity)
  );
};

export const getCart = async () => {
  return withFallback(
    async () => {
      const response = await apiClient.get('/api/cart');
      return response.data;
    },
    () => mockAPI.getCart()
  );
};

export const updateCartItem = async (itemId, quantity) => {
  return withFallback(
    async () => {
      const response = await apiClient.put(`/api/cart/${itemId}`, { quantity });
      return response.data;
    },
    () => mockAPI.updateCartItem(itemId, quantity)
  );
};

export const removeCartItem = async (itemId) => {
  return withFallback(
    async () => {
      const response = await apiClient.delete(`/api/cart/${itemId}`);
      return response.data;
    },
    () => mockAPI.removeCartItem(itemId)
  );
};

// Checkout API
export const checkout = async (name, email) => {
  return withFallback(
    async () => {
      const response = await apiClient.post('/api/checkout', { name, email });
      return response.data;
    },
    () => mockAPI.checkout(name, email)
  );
};

export default apiClient;
