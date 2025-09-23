/**
 * CourseSeriesCard Interface Structure
 * Apple-level UI/UX design specification for course series cards
 */

export interface CourseSeriesCard {
  // Core Identity
  seriesTitle: string // e.g., "Elite Mastery", "Advanced Plus", "Foundation Pro"
  description: string // Brief compelling description

  // Learning Metrics
  totalModules: number // Total number of learning modules
  estimatedDuration: string // e.g., "2 years", "18 months"
  difficultyLevel: 'Foundation' | 'Advanced' | 'Elite' // Structured difficulty levels

  // Feature Highlights
  highlights: {
    primary: string[] // Main selling points (max 3)
    secondary: string[] // Additional features
    unique: string // Unique value proposition
  }

  // Visual Design
  gradientBackground: {
    from: string // Starting gradient color
    via?: string // Optional middle color
    to: string // Ending gradient color
  }

  iconSet: {
    primary: string // Main icon (Lucide icon name)
    accent: string // Accent color for icon
    animation?: 'pulse' | 'bounce' | 'rotate' | 'none' // Icon animation
  }

  // Interaction Design
  animationStyle: {
    entrance: {
      delay: number // Staggered entrance delay
      duration: number // Animation duration
      easing: string // CSS easing function
    }
    hover: {
      lift: number // Hover lift amount (pixels)
      scale: number // Scale transformation
      glow: boolean // Enable glow effect
    }
    selection: {
      borderGradient: string // Selection border gradient
      shimmer: boolean // Enable shimmer effect
    }
  }

  // Content Structure
  pricing: {
    plans: Array<{
      id: 'A' | 'B' | 'C'
      name: string
      duration: string
      price: number
      features: string[]
      popular?: boolean
    }>
  }

  // Metadata
  metadata: {
    classLevel: string // Target class level
    targetAudience: string // Primary target audience
    successRate: number // Success/qualification rate
    batchSize: number // Maximum batch size
    weeklyHours: number // Weekly time commitment
  }
}

// Pre-configured series types matching our enhanced design
export const SERIES_CONFIGURATIONS: Record<string, Partial<CourseSeriesCard>> = {
  pinnacle: {
    seriesTitle: 'Elite Mastery',
    description: 'Premium coaching with personal mentorship for NEET toppers',
    difficultyLevel: 'Elite',
    highlights: {
      primary: ['1:1 Mentoring', 'Custom Study Plans', 'Priority Support'],
      secondary: ['Exclusive Content', 'Personal Tracker', 'Direct Faculty Access'],
      unique: 'Top 1% achiever pathway with guaranteed personal attention',
    },
    gradientBackground: {
      from: 'purple-600',
      via: 'pink-500',
      to: 'purple-700',
    },
    iconSet: {
      primary: 'Crown',
      accent: 'purple',
      animation: 'pulse',
    },
    animationStyle: {
      entrance: { delay: 0, duration: 0.7, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      hover: { lift: 8, scale: 1.02, glow: true },
      selection: { borderGradient: 'from-purple-400 to-pink-400', shimmer: true },
    },
  },

  ascent: {
    seriesTitle: 'Advanced Plus',
    description: 'Comprehensive NEET preparation with proven track record',
    difficultyLevel: 'Advanced',
    highlights: {
      primary: ['Live Classes', 'Test Series', 'Study Material'],
      secondary: ['Doubt Sessions', 'Performance Analytics', 'Peer Learning'],
      unique: 'Most popular choice with highest success rate',
    },
    gradientBackground: {
      from: 'blue-600',
      via: 'cyan-500',
      to: 'blue-700',
    },
    iconSet: {
      primary: 'Zap',
      accent: 'blue',
      animation: 'bounce',
    },
    animationStyle: {
      entrance: { delay: 0.1, duration: 0.7, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      hover: { lift: 8, scale: 1.02, glow: true },
      selection: { borderGradient: 'from-blue-400 to-cyan-400', shimmer: true },
    },
  },

  pursuit: {
    seriesTitle: 'Foundation Pro',
    description: 'Strong foundation building with conceptual clarity',
    difficultyLevel: 'Foundation',
    highlights: {
      primary: ['Concept Building', 'Practice Tests', 'Doubt Clearing'],
      secondary: ['Step-by-step Learning', 'Basic to Advanced', 'Supportive Environment'],
      unique: 'Smart start for building unshakeable biology fundamentals',
    },
    gradientBackground: {
      from: 'green-600',
      via: 'emerald-500',
      to: 'green-700',
    },
    iconSet: {
      primary: 'Rocket',
      accent: 'green',
      animation: 'rotate',
    },
    animationStyle: {
      entrance: { delay: 0.2, duration: 0.7, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      hover: { lift: 8, scale: 1.02, glow: true },
      selection: { borderGradient: 'from-green-400 to-emerald-400', shimmer: true },
    },
  },
}

// Utility types for enhanced type safety
export type SeriesType = keyof typeof SERIES_CONFIGURATIONS
export type DifficultyLevel = CourseSeriesCard['difficultyLevel']
export type AnimationEasing = CourseSeriesCard['animationStyle']['entrance']['easing']

// Factory function to create series cards with default values
export function createCourseSeriesCard(
  seriesType: SeriesType,
  overrides: Partial<CourseSeriesCard> = {}
): CourseSeriesCard {
  const baseConfig = SERIES_CONFIGURATIONS[seriesType]

  const defaultCard: CourseSeriesCard = {
    seriesTitle: 'Course Series',
    description: 'Quality education for all students',
    totalModules: 12,
    estimatedDuration: '2 years',
    difficultyLevel: 'Foundation',
    highlights: {
      primary: ['Live Classes', 'Study Material', 'Test Series'],
      secondary: ['Doubt Sessions', 'Performance Tracking'],
      unique: 'Comprehensive learning experience',
    },
    gradientBackground: {
      from: 'gray-600',
      to: 'gray-700',
    },
    iconSet: {
      primary: 'Target',
      accent: 'gray',
      animation: 'none',
    },
    animationStyle: {
      entrance: { delay: 0, duration: 0.6, easing: 'ease-out' },
      hover: { lift: 5, scale: 1.01, glow: false },
      selection: { borderGradient: 'from-gray-400 to-gray-400', shimmer: false },
    },
    pricing: {
      plans: [
        { id: 'A', name: 'Basic', duration: '1 year', price: 25000, features: ['Core Content'] },
        {
          id: 'B',
          name: 'Standard',
          duration: '1.5 years',
          price: 35000,
          features: ['Core + Practice'],
          popular: true,
        },
        {
          id: 'C',
          name: 'Premium',
          duration: '2 years',
          price: 50000,
          features: ['Everything + Mentoring'],
        },
      ],
    },
    metadata: {
      classLevel: '11th',
      targetAudience: 'NEET Aspirants',
      successRate: 85,
      batchSize: 50,
      weeklyHours: 15,
    },
  }

  // Merge base config and overrides with default
  return {
    ...defaultCard,
    ...baseConfig,
    ...overrides,
    highlights: {
      ...defaultCard.highlights,
      ...baseConfig?.highlights,
      ...overrides.highlights,
    },
    gradientBackground: {
      ...defaultCard.gradientBackground,
      ...baseConfig?.gradientBackground,
      ...overrides.gradientBackground,
    },
    iconSet: {
      ...defaultCard.iconSet,
      ...baseConfig?.iconSet,
      ...overrides.iconSet,
    },
    animationStyle: {
      entrance: {
        ...defaultCard.animationStyle.entrance,
        ...baseConfig?.animationStyle?.entrance,
        ...overrides.animationStyle?.entrance,
      },
      hover: {
        ...defaultCard.animationStyle.hover,
        ...baseConfig?.animationStyle?.hover,
        ...overrides.animationStyle?.hover,
      },
      selection: {
        ...defaultCard.animationStyle.selection,
        ...baseConfig?.animationStyle?.selection,
        ...overrides.animationStyle?.selection,
      },
    },
    pricing: {
      ...defaultCard.pricing,
      ...baseConfig?.pricing,
      ...overrides.pricing,
    },
    metadata: {
      ...defaultCard.metadata,
      ...baseConfig?.metadata,
      ...overrides.metadata,
    },
  }
}
