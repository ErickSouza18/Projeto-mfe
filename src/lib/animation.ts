
// Utility classes for animation and transitions
export const fadeIn = "transition-opacity duration-300 ease-in-out";
export const slideIn = "transition-transform duration-300 ease-in-out";
export const scaleIn = "transition-transform duration-200 ease-in-out";

// Animation delays
export const getAnimationDelay = (index: number): string => {
  return `animation-delay: ${index * 0.05}s`;
};

// Motion variants for components
export const motionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

// Staggered animation for lists
export const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Hover animations
export const hoverScale = "transition-transform hover:scale-105 active:scale-95";
export const hoverElevate = "transition-all hover:-translate-y-1 hover:shadow-md";

// Page transitions
export const pageTransition = "transition-all duration-500 ease-in-out";
