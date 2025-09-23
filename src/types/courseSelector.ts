/**
 * CourseSelector Interface Structure
 * Comprehensive type definitions for the enhanced course selection system
 */

// Core Types
export type ClassLevel = 9 | 10 | 11 | 12 | 'Dropper'
export type PlanType = 'A' | 'B' | 'C'
export type SeriesType = 'pinnacle' | 'ascent' | 'pursuit'

// Animation States
export type AnimationState = 'idle' | 'loading' | 'entering' | 'exiting' | 'hovering'
export type TransitionType = 'spring' | 'tween' | 'none'

// Plan Selection Structure
export interface PlanSelection {
  series: SeriesType
  plan: PlanType
  timestamp: number
  metadata?: {
    price: number
    duration: string
    features: string[]
  }
}

// Enhanced Course Selector Interface
export interface CourseSelector {
  // State Management
  selectedClass: ClassLevel | 'all'
  hoveredCard: string | null
  selectedPlan: PlanSelection | null
  selectedPlans: Record<SeriesType, PlanSelection> // Multiple selections support

  // UI State
  isLoading: boolean
  animationState: AnimationState
  lastInteraction: number

  // Filters and Search
  searchQuery: string
  activeFilters: {
    priceRange?: [number, number]
    duration?: string[]
    features?: string[]
  }

  // Methods - Core Functionality
  handleClassChange: (classLevel: ClassLevel | 'all') => void
  handleCardHover: (cardId: string | null) => void
  handlePlanSelection: (series: SeriesType, plan: PlanType) => void

  // Methods - Enhanced Functionality
  handleMultiplePlanSelection: (selections: PlanSelection[]) => void
  clearSelections: () => void
  clearSelection: (series: SeriesType) => void

  // Search and Filter Methods
  handleSearch: (query: string) => void
  applyFilters: (filters: CourseSelector['activeFilters']) => void
  clearFilters: () => void

  // Navigation and State
  resetToDefaults: () => void
  saveState: () => void
  restoreState: (state: Partial<CourseSelector>) => void
}

// Enhanced Series Configuration
export interface SeriesConfiguration {
  id: SeriesType
  name: string
  displayName: string
  description: string
  tagline: string

  // Visual Design
  theme: {
    primary: string
    secondary: string
    gradient: string
    cardGradient: string
    borderGradient: string
    textColor: string
    accentColor: string
  }

  // Branding
  icon: {
    name: string
    color: string
    animation?: 'pulse' | 'bounce' | 'rotate' | 'none'
  }

  badge?: {
    text: string
    gradient: string
    iconName: string
  }

  // Content
  features: {
    primary: string[]
    secondary: string[]
    unique: string
  }

  // Metadata
  targetAudience: string
  difficultyLevel: 'Foundation' | 'Advanced' | 'Elite'
  successRate: number
  popularityScore: number
}

// Plan Structure
export interface PlanConfiguration {
  id: PlanType
  name: string
  tagline: string
  description: string

  // Pricing
  price: number
  originalPrice?: number
  discountPercentage?: number

  // Duration and Features
  duration: string
  features: string[]
  detailedFeatures: {
    included: string[]
    excluded?: string[]
    highlighted: string[]
  }

  // Metadata
  popular?: boolean
  recommended?: boolean
  bestValue?: boolean

  // Analytics
  conversionRate: number
  satisfactionScore: number
}

// Course Data Structure
export interface CourseData {
  series: SeriesConfiguration
  plans: PlanConfiguration[]
  metadata: {
    classLevel: ClassLevel
    batchSize: number
    weeklyHours: number
    totalModules: number
    estimatedCompletion: string
    startDates: string[]
    enrollmentDeadline: string
  }

  // Real-time Data
  availability: {
    spotsRemaining: number
    waitlistCount: number
    lastUpdated: number
  }

  // Social Proof
  socialProof: {
    enrolledStudents: number
    avgRating: number
    reviewCount: number
    topReviews: Array<{
      rating: number
      comment: string
      studentName: string
      verified: boolean
    }>
  }
}

// State Management Hooks Interface
export interface useCourseSelector {
  // State
  state: CourseSelector

  // Computed Values
  filteredCourses: CourseData[]
  selectedCourseCount: number
  totalEstimatedCost: number
  isValidSelection: boolean

  // Actions
  actions: {
    selectClass: (classLevel: ClassLevel | 'all') => void
    hoverCard: (cardId: string | null) => void
    selectPlan: (series: SeriesType, plan: PlanType) => void
    updateSearch: (query: string) => void
    updateFilters: (filters: Partial<CourseSelector['activeFilters']>) => void
    reset: () => void

    // Bulk Actions
    selectMultiplePlans: (selections: PlanSelection[]) => void
    compareSelections: () => PlanComparison[]
    proceedToEnrollment: () => EnrollmentData
  }

  // Utilities
  utils: {
    getSeriesConfig: (seriesId: SeriesType) => SeriesConfiguration
    getPlanConfig: (seriesId: SeriesType, planId: PlanType) => PlanConfiguration
    calculateTotalCost: (selections: PlanSelection[]) => number
    validateSelection: (selection: PlanSelection) => boolean
    formatPrice: (price: number) => string
    formatDuration: (duration: string) => string
  }
}

// Comparison and Analytics
export interface PlanComparison {
  series: SeriesType
  plans: PlanType[]
  differences: {
    price: number[]
    features: string[][]
    duration: string[]
    value: number[] // Calculated value score
  }
  recommendation: {
    bestValue: PlanType
    mostPopular: PlanType
    recommended: PlanType
    reason: string
  }
}

// Enrollment Data Structure
export interface EnrollmentData {
  selections: PlanSelection[]
  student: {
    classLevel: ClassLevel
    preferences: CourseSelector['activeFilters']
    timestamp: number
  }
  pricing: {
    subtotal: number
    discounts: number
    taxes: number
    total: number
    paymentOptions: string[]
  }
  timeline: {
    enrollmentDeadline: string
    courseStartDate: string
    estimatedCompletion: string
  }
}

// Event Handling Types
export interface CourseSelectorEvents {
  onClassChange: (classLevel: ClassLevel | 'all') => void
  onCardHover: (cardId: string | null, isEntering: boolean) => void
  onPlanSelect: (selection: PlanSelection) => void
  onPlanDeselect: (series: SeriesType) => void
  onSearchChange: (query: string) => void
  onFilterChange: (filters: CourseSelector['activeFilters']) => void
  onEnrollmentStart: (data: EnrollmentData) => void
  onComparisonRequest: (series: SeriesType[]) => void
  onStateChange: (newState: Partial<CourseSelector>) => void
}

// Animation Configuration
export interface AnimationConfig {
  entrance: {
    duration: number
    delay: number
    easing: string
    stagger: number
  }
  hover: {
    scale: number
    lift: number
    duration: number
    glow: boolean
  }
  selection: {
    duration: number
    springConfig: {
      tension: number
      friction: number
    }
  }
  transition: {
    type: TransitionType
    duration: number
    ease: string
  }
}

// Context Provider Props
export interface CourseSelectorContextProps {
  children: React.ReactNode
  initialState?: Partial<CourseSelector>
  config?: {
    enableMultipleSelections?: boolean
    enableComparison?: boolean
    enableSearch?: boolean
    enableFilters?: boolean
    autoSave?: boolean
    analyticsTracking?: boolean
  }
  onStateChange?: (state: CourseSelector) => void
  onEnrollment?: (data: EnrollmentData) => void
}

// Component Props Interfaces
export interface ClassFilterNavProps {
  selectedClass: ClassLevel | 'all'
  onClassSelect: (classLevel: ClassLevel | 'all') => void
  courseCounts: Record<ClassLevel, number>
  animationConfig?: Partial<AnimationConfig>
  className?: string
}

export interface SeriesCardProps {
  series: SeriesConfiguration
  plans: PlanConfiguration[]
  classLevel: ClassLevel
  isHovered?: boolean
  isSelected?: boolean
  selectedPlan?: PlanType
  onHover?: (isHovering: boolean) => void
  onPlanSelect?: (planId: PlanType) => void
  animationConfig?: Partial<AnimationConfig>
  className?: string
}

export interface PlanButtonsProps {
  seriesId: SeriesType
  plans: PlanConfiguration[]
  selectedPlan?: PlanType
  onPlanSelect: (planId: PlanType) => void
  variant?: 'compact' | 'detailed' | 'comparison'
  showPricing?: boolean
  showFeatures?: boolean
  animationConfig?: Partial<AnimationConfig>
  className?: string
}

// Utility Types
export type CourseSelectorAction =
  | { type: 'SET_CLASS'; payload: ClassLevel | 'all' }
  | { type: 'SET_HOVER'; payload: string | null }
  | { type: 'SELECT_PLAN'; payload: PlanSelection }
  | { type: 'CLEAR_SELECTION'; payload: SeriesType }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_FILTERS'; payload: CourseSelector['activeFilters'] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET_STATE' }

export type CourseSelectorState = Omit<CourseSelector, keyof CourseSelectorEvents>

// Default Configurations
export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  entrance: {
    duration: 0.6,
    delay: 0,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    stagger: 0.1,
  },
  hover: {
    scale: 1.02,
    lift: 8,
    duration: 0.3,
    glow: true,
  },
  selection: {
    duration: 0.4,
    springConfig: {
      tension: 300,
      friction: 30,
    },
  },
  transition: {
    type: 'spring',
    duration: 0.5,
    ease: 'easeInOut',
  },
}

export const DEFAULT_COURSE_SELECTOR_STATE: CourseSelectorState = {
  selectedClass: 'all',
  hoveredCard: null,
  selectedPlan: null,
  selectedPlans: {} as Record<SeriesType, PlanSelection>,
  isLoading: false,
  animationState: 'idle',
  lastInteraction: Date.now(),
  searchQuery: '',
  activeFilters: {},
  handleClassChange: () => {},
  handleCardHover: () => {},
  handlePlanSelection: () => {},
  handleMultiplePlanSelection: () => {},
  clearSelections: () => {},
  clearSelection: () => {},
  handleSearch: () => {},
  applyFilters: () => {},
  clearFilters: () => {},
  resetToDefaults: () => {},
  saveState: () => {},
  restoreState: () => {},
}
