// Mock data for when backend is not available
export const mockProducts = [
  { id: 1, name: "Wireless Headphones", price: 59.99, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
  { id: 2, name: "Smart Watch", price: 199.99, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
  { id: 3, name: "Laptop Stand", price: 49.99, category: "Electronics", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500" },
  { id: 4, name: "Mechanical Keyboard", price: 129.99, category: "Electronics", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500" },
  { id: 5, name: "USB-C Hub", price: 39.99, category: "Electronics", image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500" },
  { id: 6, name: "Desk Lamp", price: 34.99, category: "Home & Garden", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500" },
  { id: 7, name: "Coffee Mug", price: 14.99, category: "Home & Garden", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500" },
  { id: 8, name: "Backpack", price: 79.99, category: "Fashion", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500" },
  { id: 9, name: "Sunglasses", price: 89.99, category: "Fashion", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500" },
  { id: 10, name: "Water Bottle", price: 24.99, category: "Sports", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500" },
  { id: 11, name: "Yoga Mat", price: 29.99, category: "Sports", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500" },
  { id: 12, name: "Running Shoes", price: 119.99, category: "Sports", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
];

// In-memory cart storage for demo
let mockCart = [];
let nextCartId = 1;

export const mockAPI = {
  fetchProducts: async () => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return mockProducts;
  },

  addToCart: async (productId, quantity = 1) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const product = mockProducts.find(p => p.id === productId);
    if (!product) throw new Error('Product not found');

    const existingItem = mockCart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.lineTotal = existingItem.quantity * existingItem.price;
    } else {
      mockCart.push({
        id: nextCartId++,
        productId,
        name: product.name,
        price: product.price,
        quantity,
        lineTotal: product.price * quantity
      });
    }
    return { message: 'Item added to cart' };
  },

  getCart: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const total = mockCart.reduce((sum, item) => sum + item.lineTotal, 0);
    return { items: mockCart, total };
  },

  updateCartItem: async (itemId, quantity) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const item = mockCart.find(i => i.id === itemId);
    if (!item) throw new Error('Cart item not found');
    
    if (quantity <= 0) {
      mockCart = mockCart.filter(i => i.id !== itemId);
    } else {
      item.quantity = quantity;
      item.lineTotal = item.price * quantity;
    }
    return { message: 'Cart updated' };
  },

  removeCartItem: async (itemId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    mockCart = mockCart.filter(i => i.id !== itemId);
    return { message: 'Item removed from cart' };
  },

  checkout: async (name, email) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const total = mockCart.reduce((sum, item) => sum + item.lineTotal, 0);
    const receipt = {
      customerName: name,
      email,
      total,
      timestamp: new Date().toISOString(),
      items: [...mockCart]
    };
    mockCart = []; // Clear cart after checkout
    return receipt;
  }
};
