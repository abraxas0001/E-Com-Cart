/**
 * Animation configuration and utilities
 */

/**
 * Get transition config based on reduced motion preference
 * @param {boolean} prefersReducedMotion
 * @param {object} normalTransition
 * @returns {object} Transition configuration
 */
export const getTransition = (prefersReducedMotion, normalTransition = {}) => {
  if (prefersReducedMotion) {
    return { duration: 0 };
  }
  return normalTransition;
};

/**
 * Page transition variants
 */
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeInOut' }
};

/**
 * Fade in variants
 */
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

/**
 * Slide in from right variants (for drawer)
 */
export const slideInRight = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
  transition: { type: 'spring', damping: 25, stiffness: 200 }
};

/**
 * Scale and fade variants
 */
export const scaleAndFade = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.2 }
};

/**
 * Stagger children animation
 */
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

/**
 * Stagger item animation
 */
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

/**
 * Hover scale animation
 */
export const hoverScale = {
  scale: 1.05,
  transition: { type: 'spring', stiffness: 300, damping: 20 }
};

/**
 * Tap scale animation
 */
export const tapScale = {
  scale: 0.95
};

/**
 * Bounce animation
 */
export const bounce = {
  y: [0, -10, 0],
  transition: {
    duration: 0.5,
    ease: 'easeInOut'
  }
};

/**
 * Confetti configuration
 */
export const confettiConfig = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ['#6366f1', '#14b8a6', '#10b981', '#f59e0b', '#ef4444']
};

/**
 * Toast configuration
 */
export const toastConfig = {
  duration: 3000,
  position: 'top-right',
  style: {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
  },
  success: {
    iconTheme: {
      primary: '#10b981',
      secondary: '#fff'
    }
  },
  error: {
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fff'
    }
  }
};
