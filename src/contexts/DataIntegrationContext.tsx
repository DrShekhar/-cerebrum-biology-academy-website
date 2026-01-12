/**
 * Data Integration Context Provider
 * Central hub for managing course data, analytics, and real-time updates
 */

'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react'
import {
  EnhancedCourseData,
  DataIntegrationConfig,
  DEFAULT_INTEGRATION_CONFIG,
} from '@/lib/data/integrationSchemas'
import { useEnhancedCourseData } from '@/hooks/useEnhancedCourseData'
import { useRealtimeAnimationState, useRealtimePerformanceMonitor } from '@/lib/data/realtimeSync'
import { generateUUID } from '@/lib/utils'

// State interface
interface DataIntegrationState {
  // Course data
  selectedClass: string
  selectedSeries: string | null
  selectedPlan: 'A' | 'B' | 'C' | null
  hoveredCard: string | null

  // User context
  userId: string | null
  sessionId: string
  preferences: {
    animationSpeed: 'slow' | 'normal' | 'fast'
    reducedMotion: boolean
    theme: 'light' | 'dark' | 'auto'
  }

  // Analytics
  interactions: Array<{
    type: string
    target: string
    timestamp: string
    metadata: Record<string, any>
  }>

  // Performance
  performanceMetrics: {
    loadTime: number
    renderTime: number
    errorCount: number
    cacheHitRate: number
  }

  // Configuration
  config: DataIntegrationConfig
}

// Action types
type DataIntegrationAction =
  | { type: 'SET_CLASS'; payload: string }
  | { type: 'SET_SERIES'; payload: string | null }
  | { type: 'SET_PLAN'; payload: 'A' | 'B' | 'C' | null }
  | { type: 'SET_HOVERED_CARD'; payload: string | null }
  | { type: 'SET_USER_ID'; payload: string | null }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<DataIntegrationState['preferences']> }
  | { type: 'ADD_INTERACTION'; payload: DataIntegrationState['interactions'][0] }
  | { type: 'UPDATE_PERFORMANCE'; payload: Partial<DataIntegrationState['performanceMetrics']> }
  | { type: 'UPDATE_CONFIG'; payload: Partial<DataIntegrationConfig> }
  | { type: 'RESET_SESSION' }

// Initial state factory to avoid calling generateUUID at module load time
// This ensures compatibility with older iOS browsers
function createInitialState(): DataIntegrationState {
  return {
    selectedClass: 'all',
    selectedSeries: null,
    selectedPlan: null,
    hoveredCard: null,
    userId: null,
    sessionId: generateUUID(),
    preferences: {
      animationSpeed: 'normal',
      reducedMotion: false,
      theme: 'auto',
    },
    interactions: [],
    performanceMetrics: {
      loadTime: 0,
      renderTime: 0,
      errorCount: 0,
      cacheHitRate: 0,
    },
    config: DEFAULT_INTEGRATION_CONFIG,
  }
}

// Reducer
function dataIntegrationReducer(
  state: DataIntegrationState,
  action: DataIntegrationAction
): DataIntegrationState {
  switch (action.type) {
    case 'SET_CLASS':
      return {
        ...state,
        selectedClass: action.payload,
        selectedSeries: null,
        selectedPlan: null,
      }

    case 'SET_SERIES':
      return {
        ...state,
        selectedSeries: action.payload,
        selectedPlan: null,
      }

    case 'SET_PLAN':
      return {
        ...state,
        selectedPlan: action.payload,
      }

    case 'SET_HOVERED_CARD':
      return {
        ...state,
        hoveredCard: action.payload,
      }

    case 'SET_USER_ID':
      return {
        ...state,
        userId: action.payload,
      }

    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
      }

    case 'ADD_INTERACTION':
      return {
        ...state,
        interactions: [
          ...state.interactions.slice(-99), // Keep last 100 interactions
          action.payload,
        ],
      }

    case 'UPDATE_PERFORMANCE':
      return {
        ...state,
        performanceMetrics: {
          ...state.performanceMetrics,
          ...action.payload,
        },
      }

    case 'UPDATE_CONFIG':
      return {
        ...state,
        config: {
          ...state.config,
          ...action.payload,
        },
      }

    case 'RESET_SESSION':
      return {
        ...createInitialState(),
        userId: state.userId,
        config: state.config,
        sessionId: generateUUID(),
      }

    default:
      return state
  }
}

// Context interface
interface DataIntegrationContextType {
  // State
  state: DataIntegrationState

  // Course data
  courses: EnhancedCourseData[]
  recommendations: any[]
  analytics: any
  isLoading: boolean
  error: string | null

  // Actions
  setClass: (classLevel: string) => void
  setSeries: (series: string | null) => void
  setPlan: (plan: 'A' | 'B' | 'C' | null) => void
  setHoveredCard: (cardId: string | null) => void
  setUserId: (userId: string | null) => void
  updatePreferences: (preferences: Partial<DataIntegrationState['preferences']>) => void

  // Interactions
  trackInteraction: (type: string, target: string, metadata?: Record<string, any>) => void

  // Utilities
  getCourseById: (courseId: string) => EnhancedCourseData | null
  filterCourses: (filters: any) => EnhancedCourseData[]
  sortCourses: (criteria: string) => EnhancedCourseData[]
  resetSession: () => void

  // Performance
  performanceMonitor: any

  // Real-time
  realtimeConnected: boolean
  realtimeError: string | null
}

// Context
const DataIntegrationContext = createContext<DataIntegrationContextType | undefined>(undefined)

// Provider props
interface DataIntegrationProviderProps {
  children: React.ReactNode
  config?: Partial<DataIntegrationConfig>
  initialUserId?: string
  onStateChange?: (state: DataIntegrationState) => void
}

// Provider component
export function DataIntegrationProvider({
  children,
  config,
  initialUserId,
  onStateChange,
}: DataIntegrationProviderProps) {
  const [state, dispatch] = useReducer(dataIntegrationReducer, undefined, () => ({
    ...createInitialState(),
    userId: initialUserId || null,
    config: { ...DEFAULT_INTEGRATION_CONFIG, ...config },
  }))

  // Performance monitoring
  const performanceMonitor = useRealtimePerformanceMonitor()

  // Real-time animation state
  const {
    data: animationState,
    isConnected: realtimeConnected,
    error: realtimeError,
  } = useRealtimeAnimationState(state.sessionId)

  // Enhanced course data
  const {
    courses,
    recommendations,
    analytics,
    isLoading,
    error,
    trackInteraction: trackCourseInteraction,
    getCourseById,
    filterCourses,
    sortCourses,
    performanceMetrics,
  } = useEnhancedCourseData({
    classLevel: state.selectedClass,
    series: state.selectedSeries || undefined,
    userId: state.userId || undefined,
    includeAnalytics: true,
    includeRecommendations: true,
    enableRealtime: true,
    onDataUpdate: (courses) => {
      console.log(`📊 Updated course data: ${courses.length} courses`)
    },
  })

  // Update performance metrics
  useEffect(() => {
    dispatch({
      type: 'UPDATE_PERFORMANCE',
      payload: {
        ...performanceMetrics,
        ...performanceMonitor,
      },
    })
  }, [performanceMetrics, performanceMonitor])

  // State change callback
  useEffect(() => {
    onStateChange?.(state)
  }, [state, onStateChange])

  // Analytics batching
  const analyticsQueue = useRef<any[]>([])
  const flushAnalytics = useCallback(async () => {
    if (analyticsQueue.current.length === 0) return

    try {
      const batch = analyticsQueue.current.splice(0)

      await fetch('/api/analytics/interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: state.sessionId,
          userId: state.userId,
          interactions: batch,
          metadata: {
            userAgent: navigator.userAgent,
            viewport: {
              width: window.innerWidth,
              height: window.innerHeight,
            },
            performance: performanceMonitor,
          },
        }),
      })
    } catch (error) {
      console.error('Failed to flush analytics:', error)
    }
  }, [state.sessionId, state.userId, performanceMonitor])

  // Periodic analytics flush
  useEffect(() => {
    const interval = setInterval(flushAnalytics, state.config.analytics.flushInterval)
    return () => clearInterval(interval)
  }, [flushAnalytics, state.config.analytics.flushInterval])

  // Actions
  const setClass = useCallback((classLevel: string) => {
    dispatch({ type: 'SET_CLASS', payload: classLevel })
    trackInteraction('class_selected', classLevel)
  }, [])

  const setSeries = useCallback((series: string | null) => {
    dispatch({ type: 'SET_SERIES', payload: series })
    if (series) trackInteraction('series_selected', series)
  }, [])

  const setPlan = useCallback((plan: 'A' | 'B' | 'C' | null) => {
    dispatch({ type: 'SET_PLAN', payload: plan })
    if (plan) trackInteraction('plan_selected', plan)
  }, [])

  const setHoveredCard = useCallback((cardId: string | null) => {
    dispatch({ type: 'SET_HOVERED_CARD', payload: cardId })
    if (cardId) trackInteraction('card_hover', cardId)
  }, [])

  const setUserId = useCallback((userId: string | null) => {
    dispatch({ type: 'SET_USER_ID', payload: userId })
  }, [])

  const updatePreferences = useCallback(
    (preferences: Partial<DataIntegrationState['preferences']>) => {
      dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences })
      trackInteraction('preferences_updated', 'settings', preferences)
    },
    []
  )

  const trackInteraction = useCallback(
    (type: string, target: string, metadata: Record<string, any> = {}) => {
      const interaction = {
        id: crypto.randomUUID(),
        userId: state.userId || 'anonymous',
        sessionId: state.sessionId,
        type: type as any,
        element: target,
        data: metadata,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
      }

      // Add to local state
      dispatch({
        type: 'ADD_INTERACTION',
        payload: {
          type,
          target,
          timestamp: interaction.timestamp,
          metadata,
        },
      })

      // Queue for analytics
      if (state.config.analytics.trackingEnabled) {
        analyticsQueue.current.push(interaction)

        // Flush if batch size reached
        if (analyticsQueue.current.length >= state.config.analytics.batchSize) {
          flushAnalytics()
        }
      }

      // Track in course system
      if (type.includes('course') || type.includes('plan') || type.includes('series')) {
        trackCourseInteraction(target, type, metadata)
      }
    },
    [state.userId, state.sessionId, state.config.analytics, flushAnalytics, trackCourseInteraction]
  )

  const resetSession = useCallback(() => {
    dispatch({ type: 'RESET_SESSION' })
    analyticsQueue.current = []
  }, [])

  // Context value
  const contextValue: DataIntegrationContextType = {
    // State
    state,

    // Course data
    courses,
    recommendations,
    analytics,
    isLoading,
    error,

    // Actions
    setClass,
    setSeries,
    setPlan,
    setHoveredCard,
    setUserId,
    updatePreferences,

    // Interactions
    trackInteraction,

    // Utilities
    getCourseById,
    filterCourses,
    sortCourses,
    resetSession,

    // Performance
    performanceMonitor,

    // Real-time
    realtimeConnected,
    realtimeError,
  }

  return (
    <DataIntegrationContext.Provider value={contextValue}>
      {children}
    </DataIntegrationContext.Provider>
  )
}

// Hook to use context
export function useDataIntegration() {
  const context = useContext(DataIntegrationContext)
  if (!context) {
    throw new Error('useDataIntegration must be used within DataIntegrationProvider')
  }
  return context
}

// Specialized hooks
export function useCourseSelection() {
  const { state, courses, setClass, setSeries, setPlan, setHoveredCard, trackInteraction } =
    useDataIntegration()

  return {
    selectedClass: state.selectedClass,
    selectedSeries: state.selectedSeries,
    selectedPlan: state.selectedPlan,
    hoveredCard: state.hoveredCard,
    courses,
    setClass,
    setSeries,
    setPlan,
    setHoveredCard,
    trackInteraction,
  }
}

export function useAnalytics() {
  const { state, analytics, trackInteraction, performanceMonitor } = useDataIntegration()

  return {
    interactions: state.interactions,
    analytics,
    trackInteraction,
    performanceMetrics: state.performanceMetrics,
    performanceMonitor,
  }
}
