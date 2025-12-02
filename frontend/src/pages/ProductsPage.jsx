import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { fetchProducts } from '../api/client';
import ProductGrid from '../components/ProductGrid';
import Hero from '../components/Hero';
import BackToTop from '../components/BackToTop';
import { ProductCardSkeleton } from '../components/Skeleton';
import { pageTransition } from '../utils/animations';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const categorySectionRef = useRef(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(data.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories);
        
        setFilteredProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const scrollToCategories = () => {
    categorySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const featuredProducts = products.slice(0, 12); // Show only first 12 products as featured

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  if (loading) {
    return (
      <motion.div
        className="min-h-screen"
        {...pageTransition}
      >
        <Hero />
        <div id="products-section" className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Featured Products</h2>
              <p className="text-gray-600 dark:text-gray-400">Loading our exclusive collection...</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="glass-strong p-8 rounded-2xl text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xl text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen"
      {...pageTransition}
    >
      {/* Hero Section */}
      <Hero onExploreClick={scrollToCategories} />

      {/* Featured Products Section */}
      <div id="products-section" className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Featured Products</h2>
              <p className="text-gray-600 dark:text-gray-400">Handpicked items just for you</p>
            </div>
            <button
              onClick={scrollToCategories}
              className="glass px-6 py-3 rounded-xl hover:shadow-glow transition-all duration-300 font-semibold text-purple-600 dark:text-purple-400"
            >
              View All Categories
            </button>
          </div>
          
          <ProductGrid products={featuredProducts} onAddToCart={handleAddToCart} />
        </div>
      </div>

      {/* Categories Section */}
      <div ref={categorySectionRef} data-categories-section className="relative overflow-hidden bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Shop by Category</h2>
            <p className="text-gray-600 dark:text-gray-400">Browse our wide range of products</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-glow'
                    : 'glass hover:shadow-premium text-gray-700 dark:text-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Category Products */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
              </h3>
              <div className="glass px-4 py-2 rounded-xl">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {filteredProducts.length} Products
                </span>
              </div>
            </div>
            <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              ),
              title: 'Best Prices',
              description: 'Competitive pricing on all premium products'
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              ),
              title: 'Secure Shopping',
              description: 'Your data is protected with enterprise-grade security'
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              ),
              title: 'Fast Delivery',
              description: 'Express shipping available on all orders'
            }
          ].map((feature, index) => (
            <div key={index} className="glass-strong p-8 rounded-2xl text-center group hover:shadow-premium-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {feature.icon}
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTop />
    </motion.div>
  );
};

export default ProductsPage;
