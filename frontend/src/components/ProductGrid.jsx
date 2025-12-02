import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { staggerContainer } from '../utils/animations';

const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </motion.div>
  );
};

export default ProductGrid;
