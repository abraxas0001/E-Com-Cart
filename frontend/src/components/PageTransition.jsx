import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { pageTransition } from '../utils/animations';

const PageTransition = ({ children, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : pageTransition.transition;

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : pageTransition.initial}
      animate={prefersReducedMotion ? false : pageTransition.animate}
      exit={prefersReducedMotion ? false : pageTransition.exit}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
