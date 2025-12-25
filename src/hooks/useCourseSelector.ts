'use client'

import { useReducer, useCallback, useMemo, useEffect } from 'react'
import {
  CourseSelector,
  CourseSelectorAction,
  CourseSelectorState,
  PlanSelection,
  ClassLevel,
  SeriesType,
  PlanType,
  CourseData,
  EnrollmentData,
  PlanComparison,
  DEFAULT_COURSE_SELECTOR_STATE,
} from '@/types/courseSelector'

// Reducer function for state management
function courseSelectorReducer(
  state: CourseSelectorState,
  action: CourseSelectorAction
): CourseSelectorState {
  switch (action.type) {
    case 'SET_CLASS':
      return {
        ...state,
        selectedClass: action.payload,
        lastInteraction: Date.now(),
        // Clear selections when changing class
        selectedPlans: {} as Record<SeriesType, PlanSelection>,
        selectedPlan: null,
      }

    case 'SET_HOVER':
      return {
        ...state,
        hoveredCard: action.payload,
        animationState: action.payload ? 'hovering' : 'idle',
      }

    case 'SELECT_PLAN':
      const newSelection = action.payload
      return {
        ...state,
        selectedPlan: newSelection,
        selectedPlans: {
          ...state.selectedPlans,
          [newSelection.series]: newSelection,
        },
        lastInteraction: Date.now(),
      }

    case 'CLEAR_SELECTION': {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [action.payload]: _removed, ...remainingPlans } = state.selectedPlans
      const typedRemainingPlans = remainingPlans as Record<SeriesType, PlanSelection>
      return {
        ...state,
        selectedPlans: typedRemainingPlans,
        selectedPlan:
          Object.keys(typedRemainingPlans).length > 0
            ? Object.values(typedRemainingPlans)[0]
            : null,
        lastInteraction: Date.now(),
      }
    }

    case 'SET_SEARCH':
      return {
        ...state,
        searchQuery: action.payload,
        lastInteraction: Date.now(),
      }

    case 'SET_FILTERS':
      return {
        ...state,
        activeFilters: action.payload,
        lastInteraction: Date.now(),
      }

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
        animationState: action.payload ? 'loading' : 'idle',
      }

    case 'RESET_STATE':
      return {
        ...DEFAULT_COURSE_SELECTOR_STATE,
        lastInteraction: Date.now(),
      }

    default:
      return state
  }
}

// Helper function to generate dynamic enrollment dates
function getNextEnrollmentDates(): string[] {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  // Generate dates for next 3 upcoming batches
  return [
    new Date(year, month + 1, 1).toISOString().split('T')[0],
    new Date(year, month + 1, 15).toISOString().split('T')[0],
    new Date(year, month + 2, 1).toISOString().split('T')[0],
  ]
}

// Helper function to get enrollment deadline (1 week before next batch)
function getEnrollmentDeadline(): string {
  const now = new Date()
  const nextBatch = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const deadline = new Date(nextBatch)
  deadline.setDate(deadline.getDate() - 7)
  return deadline.toISOString().split('T')[0]
}

// Mock course data (in real app, this would come from API)
const MOCK_COURSE_DATA: CourseData[] = [
  {
    series: {
      id: 'pinnacle',
      name: 'Pinnacle',
      displayName: 'Elite Mastery',
      description: 'Premium coaching with personal mentorship for NEET toppers',
      tagline: 'For the Top 1%',
      theme: {
        primary: 'purple-600',
        secondary: 'pink-500',
        gradient: 'from-purple-600 via-pink-500 to-purple-700',
        cardGradient: 'from-purple-50 via-pink-50 to-purple-100',
        borderGradient: 'from-purple-400 to-pink-400',
        textColor: 'text-purple-700',
        accentColor: 'purple',
      },
      icon: {
        name: 'Crown',
        color: 'purple',
        animation: 'pulse',
      },
      badge: {
        text: 'ELITE',
        gradient: 'from-yellow-400 to-orange-400',
        iconName: 'Crown',
      },
      features: {
        primary: ['1:1 Mentoring', 'Custom Study Plans', 'Priority Support'],
        secondary: ['Exclusive Content', 'Personal Tracker', 'Direct Faculty Access'],
        unique: 'Top 1% achiever pathway with guaranteed personal attention',
      },
      targetAudience: 'High-achieving NEET aspirants',
      difficultyLevel: 'Elite',
      successRate: 95,
      popularityScore: 8.5,
    },
    plans: [
      {
        id: 'A',
        name: 'Intensive',
        tagline: 'Accelerated Excellence',
        description: 'Maximum intensity for fastest results',
        price: 1299,
        originalPrice: 1599,
        duration: '3 months',
        features: [
          'Daily 1:1 Sessions',
          'Custom Study Plan',
          'Priority Support',
          'Weekly Assessments',
        ],
        detailedFeatures: {
          included: ['Personal Mentor', 'Daily Classes', 'Custom Plans', '24/7 Support'],
          highlighted: ['Guaranteed Results', 'Money-back Promise'],
        },
        popular: false,
        recommended: false,
        bestValue: false,
        conversionRate: 0.25,
        satisfactionScore: 4.8,
      },
      {
        id: 'B',
        name: 'Comprehensive',
        tagline: 'Complete Mastery',
        description: 'Balanced approach with full support',
        price: 999,
        originalPrice: 1299,
        duration: '6 months',
        features: ['Regular Mentoring', 'Live Classes', 'Study Material', 'Test Series'],
        detailedFeatures: {
          included: ['Mentor Sessions', 'Live Classes', 'Materials', 'Tests'],
          highlighted: ['Most Popular', 'Best Results'],
        },
        popular: true,
        recommended: true,
        bestValue: true,
        conversionRate: 0.45,
        satisfactionScore: 4.9,
      },
      {
        id: 'C',
        name: 'Foundation',
        tagline: 'Solid Start',
        description: 'Essential support for strong foundation',
        price: 799,
        originalPrice: 999,
        duration: '12 months',
        features: ['Group Sessions', 'Recorded Classes', 'Basic Support', 'Monthly Tests'],
        detailedFeatures: {
          included: ['Group Learning', 'Recordings', 'Support', 'Tests'],
          highlighted: ['Affordable', 'Flexible'],
        },
        popular: false,
        recommended: false,
        bestValue: false,
        conversionRate: 0.3,
        satisfactionScore: 4.6,
      },
    ],
    metadata: {
      classLevel: 11,
      batchSize: 15,
      weeklyHours: 20,
      totalModules: 24,
      estimatedCompletion: '6 months',
      startDates: getNextEnrollmentDates(),
      enrollmentDeadline: getEnrollmentDeadline(),
    },
    availability: {
      spotsRemaining: 3,
      waitlistCount: 12,
      lastUpdated: Date.now(),
    },
    socialProof: {
      enrolledStudents: 487,
      avgRating: 4.8,
      reviewCount: 234,
      topReviews: [
        {
          rating: 5,
          comment: 'Exceptional mentoring helped me crack NEET with AIR 47!',
          studentName: 'Priya S.',
          verified: true,
        },
      ],
    },
  },
  // Additional series data would go here...
]

export function useCourseSelector(initialState?: Partial<CourseSelectorState>) {
  const [state, dispatch] = useReducer(courseSelectorReducer, {
    ...DEFAULT_COURSE_SELECTOR_STATE,
    ...initialState,
  })

  // Actions
  const selectClass = useCallback((classLevel: ClassLevel | 'all') => {
    dispatch({ type: 'SET_CLASS', payload: classLevel })
  }, [])

  const hoverCard = useCallback((cardId: string | null) => {
    dispatch({ type: 'SET_HOVER', payload: cardId })
  }, [])

  const selectPlan = useCallback((series: SeriesType, plan: PlanType) => {
    const selection: PlanSelection = {
      series,
      plan,
      timestamp: Date.now(),
      metadata: {
        price: 999, // This would be looked up from course data
        duration: '6 months',
        features: ['Live Classes', 'Study Material', 'Test Series'],
      },
    }
    dispatch({ type: 'SELECT_PLAN', payload: selection })
  }, [])

  const updateSearch = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH', payload: query })
  }, [])

  const updateFilters = useCallback(
    (filters: Partial<CourseSelectorState['activeFilters']>) => {
      dispatch({
        type: 'SET_FILTERS',
        payload: { ...state.activeFilters, ...filters },
      })
    },
    [state.activeFilters]
  )

  const clearSelection = useCallback((series: SeriesType) => {
    dispatch({ type: 'CLEAR_SELECTION', payload: series })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET_STATE' })
  }, [])

  const selectMultiplePlans = useCallback((selections: PlanSelection[]) => {
    selections.forEach((selection) => {
      dispatch({ type: 'SELECT_PLAN', payload: selection })
    })
  }, [])

  // Computed values
  const filteredCourses = useMemo(() => {
    let courses = MOCK_COURSE_DATA

    // Filter by class level
    if (state.selectedClass !== 'all') {
      courses = courses.filter((course) => course.metadata.classLevel === state.selectedClass)
    }

    // Filter by search query
    if (state.searchQuery) {
      courses = courses.filter(
        (course) =>
          course.series.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          course.series.description.toLowerCase().includes(state.searchQuery.toLowerCase())
      )
    }

    // Apply price range filter
    if (state.activeFilters.priceRange) {
      const [min, max] = state.activeFilters.priceRange
      courses = courses.filter((course) =>
        course.plans.some((plan) => plan.price >= min && plan.price <= max)
      )
    }

    return courses
  }, [state.selectedClass, state.searchQuery, state.activeFilters])

  const selectedCourseCount = useMemo(() => {
    return Object.keys(state.selectedPlans).length
  }, [state.selectedPlans])

  const totalEstimatedCost = useMemo(() => {
    return Object.values(state.selectedPlans).reduce((total, selection) => {
      return total + (selection.metadata?.price || 0)
    }, 0)
  }, [state.selectedPlans])

  const isValidSelection = useMemo(() => {
    return selectedCourseCount > 0 && state.selectedClass !== 'all'
  }, [selectedCourseCount, state.selectedClass])

  // Utility functions
  const getSeriesConfig = useCallback((seriesId: SeriesType) => {
    const course = MOCK_COURSE_DATA.find((c) => c.series.id === seriesId)
    return course?.series
  }, [])

  const getPlanConfig = useCallback((seriesId: SeriesType, planId: PlanType) => {
    const course = MOCK_COURSE_DATA.find((c) => c.series.id === seriesId)
    return course?.plans.find((p) => p.id === planId)
  }, [])

  const calculateTotalCost = useCallback((selections: PlanSelection[]) => {
    return selections.reduce((total, selection) => {
      return total + (selection.metadata?.price || 0)
    }, 0)
  }, [])

  const validateSelection = useCallback(
    (selection: PlanSelection) => {
      const series = getSeriesConfig(selection.series)
      const plan = getPlanConfig(selection.series, selection.plan)
      return !!(series && plan)
    },
    [getSeriesConfig, getPlanConfig]
  )

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }, [])

  const formatDuration = useCallback((duration: string) => {
    return duration.toLowerCase().includes('month') ? duration : `${duration} months`
  }, [])

  const compareSelections = useCallback((): PlanComparison[] => {
    const selections = Object.values(state.selectedPlans)
    const grouped = selections.reduce(
      (acc, selection) => {
        if (!acc[selection.series]) {
          acc[selection.series] = []
        }
        acc[selection.series].push(selection.plan)
        return acc
      },
      {} as Record<SeriesType, PlanType[]>
    )

    return Object.entries(grouped).map(([series, plans]) => {
      const seriesConfig = getSeriesConfig(series as SeriesType)
      const planConfigs = plans.map((plan) => getPlanConfig(series as SeriesType, plan))

      return {
        series: series as SeriesType,
        plans,
        differences: {
          price: planConfigs.map((p) => p?.price || 0),
          features: planConfigs.map((p) => p?.features || []),
          duration: planConfigs.map((p) => p?.duration || ''),
          value: planConfigs.map((p) => (p?.satisfactionScore || 0) * 10),
        },
        recommendation: {
          bestValue: planConfigs.find((p) => p?.bestValue)?.id || 'B',
          mostPopular: planConfigs.find((p) => p?.popular)?.id || 'B',
          recommended: planConfigs.find((p) => p?.recommended)?.id || 'B',
          reason: 'Based on student feedback and success rates',
        },
      }
    })
  }, [state.selectedPlans, getSeriesConfig, getPlanConfig])

  const proceedToEnrollment = useCallback((): EnrollmentData => {
    const selections = Object.values(state.selectedPlans)
    const subtotal = calculateTotalCost(selections)
    const discounts = Math.round(subtotal * 0.1) // 10% discount
    const taxes = Math.round((subtotal - discounts) * 0.18) // 18% GST
    const total = subtotal - discounts + taxes

    // Calculate dynamic timeline dates
    const now = new Date()
    const enrollmentDeadline = getEnrollmentDeadline()
    const courseStartDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
      .toISOString()
      .split('T')[0]
    const estimatedCompletion = new Date(now.getFullYear(), now.getMonth() + 7, 15)
      .toISOString()
      .split('T')[0]

    return {
      selections,
      student: {
        classLevel: state.selectedClass as ClassLevel,
        preferences: state.activeFilters,
        timestamp: Date.now(),
      },
      pricing: {
        subtotal,
        discounts,
        taxes,
        total,
        paymentOptions: ['razorpay', 'upi', 'netbanking', 'card'],
      },
      timeline: {
        enrollmentDeadline,
        courseStartDate,
        estimatedCompletion,
      },
    }
  }, [state.selectedPlans, state.selectedClass, state.activeFilters, calculateTotalCost])

  // Auto-save functionality
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (selectedCourseCount > 0) {
        localStorage.setItem('courseSelector', JSON.stringify(state))
      }
    }, 30000) // Save every 30 seconds

    return () => clearInterval(saveInterval)
  }, [state, selectedCourseCount])

  // Load saved state on mount
  useEffect(() => {
    const savedState = localStorage.getItem('courseSelector')
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState)
        // Restore only safe parts of the state
        dispatch({ type: 'SET_CLASS', payload: parsed.selectedClass })
        if (parsed.selectedPlans) {
          Object.values(parsed.selectedPlans).forEach((selection: any) => {
            dispatch({ type: 'SELECT_PLAN', payload: selection })
          })
        }
      } catch (error) {
        console.warn('Failed to restore course selector state:', error)
      }
    }
  }, [])

  return {
    // State
    state,

    // Computed Values
    filteredCourses,
    selectedCourseCount,
    totalEstimatedCost,
    isValidSelection,

    // Actions
    actions: {
      selectClass,
      hoverCard,
      selectPlan,
      updateSearch,
      updateFilters,
      reset,
      selectMultiplePlans,
      compareSelections,
      proceedToEnrollment,
    },

    // Utilities
    utils: {
      getSeriesConfig,
      getPlanConfig,
      calculateTotalCost,
      validateSelection,
      formatPrice,
      formatDuration,
    },
  }
}
