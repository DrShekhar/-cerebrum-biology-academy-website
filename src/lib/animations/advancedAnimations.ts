/**
 * Advanced Animation System
 * Apple-level animation configurations and utilities
 */

// Apple's signature animation curves
export const APPLE_EASING = {
  // Standard ease curves
  easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
  easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.58, 1)',

  // Apple's custom curves
  appleDefault: 'cubic-bezier(0.16, 1, 0.3, 1)', // Apple's signature
  appleBounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  appleSharp: 'cubic-bezier(0.4, 0, 0.2, 1)',
  appleGentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  appleElastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // iOS-specific curves
  iosDefault: 'cubic-bezier(0.4, 0, 0.2, 1)',
  iosSpring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  iosBounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const

// Duration presets based on Apple HIG
export const APPLE_DURATIONS = {
  instant: 0,
  micro: 100, // Micro-interactions
  short: 200, // Buttons, toggles
  medium: 300, // Cards, modals
  long: 500, // Page transitions
  extended: 800, // Complex animations
  cinematic: 1200, // Hero animations
} as const

// Spring physics configurations (Framer Motion)
export const APPLE_SPRINGS = {
  gentle: { tension: 120, friction: 14 },
  default: { tension: 300, friction: 30 },
  bouncy: { tension: 400, friction: 25 },
  stiff: { tension: 500, friction: 35 },
  wobbly: { tension: 180, friction: 12 },
} as const

// Advanced animation variants for Framer Motion
export const createAdvancedVariants = () => ({
  // Card entrance animations
  cardEntrance: {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
      rotateX: -15,
      filter: 'blur(10px)',
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.16, 1, 0.3, 1] as const,
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    }),
  },

  // Sophisticated hover states
  cardHover: {
    rest: {
      scale: 1,
      y: 0,
      rotateY: 0,
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    hover: {
      scale: 1.03,
      y: -8,
      rotateY: 2,
      boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  },

  // Plan selection animations
  planSelection: {
    unselected: {
      opacity: 0.7,
      scale: 0.95,
      y: 10,
      backgroundColor: 'rgba(255,255,255,0.8)',
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    selected: {
      opacity: 1,
      scale: 1,
      y: 0,
      backgroundColor: 'rgba(255,255,255,1)',
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
        type: 'spring' as const,
        stiffness: 200,
        damping: 20,
      },
    },
  },

  // Staggered container animations
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  // Class filter navigation
  classFilter: {
    inactive: {
      scale: 1,
      backgroundColor: 'rgba(255,255,255,0.7)',
      color: 'rgba(107,114,128,1)',
      transition: { duration: 0.2 },
    },
    active: {
      scale: 1.05,
      backgroundColor: 'rgba(59,130,246,1)',
      color: 'rgba(255,255,255,1)',
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  },

  // Morphing animations
  morphingCard: {
    initial: {
      borderRadius: '12px',
      height: 'auto',
    },
    expanded: {
      borderRadius: '24px',
      height: 'auto',
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  },

  // Loading states
  loadingSkeleton: {
    pulse: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  },

  // Success/Error states
  statusFeedback: {
    success: {
      scale: [1, 1.1, 1],
      backgroundColor: ['rgba(34,197,94,0.1)', 'rgba(34,197,94,0.2)', 'rgba(34,197,94,0.1)'],
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    error: {
      x: [0, -10, 10, -10, 10, 0],
      backgroundColor: ['rgba(239,68,68,0.1)', 'rgba(239,68,68,0.2)', 'rgba(239,68,68,0.1)'],
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  },
})

// Page transition animations
export const pageTransitions = {
  slideUp: {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 },
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },

  slideRight: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },

  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 },
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

// Advanced gesture animations
export const gestureAnimations = {
  swipeToAction: {
    drag: {
      x: [-200, 200],
      opacity: [1, 0.5],
      scale: [1, 0.9],
    },
    dragEnd: (info: any) => {
      const { offset, velocity } = info
      if (offset.x > 100 || velocity.x > 500) {
        return {
          x: 300,
          opacity: 0,
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        }
      }
      return {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      }
    },
  },
}

// Complex orchestrated animations
export const orchestratedAnimations = {
  courseSelection: {
    phases: [
      {
        name: 'classSelection',
        duration: 0.5,
        animations: [
          { target: '.class-filter', animation: 'slideIn' },
          { target: '.filter-indicator', animation: 'expand' },
        ],
      },
      {
        name: 'cardsReveal',
        duration: 0.8,
        delay: 0.2,
        animations: [
          { target: '.course-card', animation: 'staggeredEntrance' },
          { target: '.card-overlay', animation: 'fadeIn' },
        ],
      },
      {
        name: 'planSelection',
        duration: 0.6,
        delay: 0.5,
        animations: [
          { target: '.plan-buttons', animation: 'slideUp' },
          { target: '.pricing-info', animation: 'countUp' },
        ],
      },
    ],
  },
}

// Utility functions for animation calculations
export const animationUtils = {
  // Calculate stagger delay based on index and total items
  calculateStaggerDelay: (index: number, total: number, maxDelay = 0.5) => {
    return (index / total) * maxDelay
  },

  // Create elastic animation timing
  createElasticTiming: (amplitude = 1, period = 0.3) => {
    return `cubic-bezier(0.175, 0.885, ${0.32 * amplitude}, ${1.275 * period})`
  },

  // Generate random animation delay for organic feel
  randomDelay: (min = 0, max = 0.3) => {
    return Math.random() * (max - min) + min
  },

  // Create breathe animation keyframes
  createBreatheAnimation: (scale = 1.05, duration = 2000) => ({
    transform: [`scale(1)`, `scale(${scale})`, `scale(1)`],
    animationDuration: `${duration}ms`,
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  }),

  // Create floating animation keyframes
  createFloatingAnimation: (distance = 10, duration = 3000) => ({
    transform: [`translateY(0px)`, `translateY(-${distance}px)`, `translateY(0px)`],
    animationDuration: `${duration}ms`,
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  }),
}

// Performance-optimized animation configurations
export const performanceAnimations = {
  // Use transform and opacity only for 60fps
  optimized: {
    willChange: 'transform, opacity',
    transform: 'translateZ(0)', // Force hardware acceleration
    backfaceVisibility: 'hidden',
  },

  // Reduce motion for accessibility
  reducedMotion: {
    transition: 'none',
    animation: 'none',
  },

  // GPU-accelerated properties
  gpuAccelerated: ['transform', 'opacity', 'filter', 'backdrop-filter'],
}

// Animation presets for different components
export const componentAnimations = {
  button: {
    rest: { scale: 1, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    hover: { scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' },
    tap: { scale: 0.95 },
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },

  card: {
    rest: {
      y: 0,
      scale: 1,
      rotateX: 0,
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    },
    hover: {
      y: -10,
      scale: 1.02,
      rotateX: 2,
      boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
    },
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },

  modal: {
    initial: {
      scale: 0.8,
      opacity: 0,
      y: 50,
      backdropFilter: 'blur(0px)',
    },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      backdropFilter: 'blur(20px)',
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: 50,
      backdropFilter: 'blur(0px)',
    },
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
      backdropFilter: { duration: 0.3 },
    },
  },

  drawer: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },

  toast: {
    initial: {
      y: -100,
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      y: -100,
      opacity: 0,
      scale: 0.8,
    },
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
}

// Export all animation configurations
export const appleAnimations = {
  easing: APPLE_EASING,
  durations: APPLE_DURATIONS,
  springs: APPLE_SPRINGS,
  variants: createAdvancedVariants(),
  pageTransitions,
  gestureAnimations,
  orchestratedAnimations,
  utils: animationUtils,
  performance: performanceAnimations,
  components: componentAnimations,
}
