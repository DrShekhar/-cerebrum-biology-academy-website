/**
 * Enhanced Course Data Hook
 * Integrates API data, real-time updates, and animation synchronization
 */

import { useState, useEffect, useCallback, useMemo } from 'react'
import { EnhancedCourseData, CourseSelectionResponse } from '@/lib/data/integrationSchemas'
import { useRealtimeCourseData, trackCourseInteraction } from '@/lib/data/realtimeSync'

// Cache for API responses
const courseDataCache = new Map<
  string,
  {
    data: CourseSelectionResponse
    timestamp: number
    ttl: number
  }
>()

// Types for hook options
interface UseEnhancedCourseDataOptions {
  classLevel: string
  series?: string
  userId?: string
  includeAnalytics?: boolean
  includeRecommendations?: boolean
  enableRealtime?: boolean
  cacheStrategy?: 'aggressive' | 'moderate' | 'minimal'
  onDataUpdate?: (data: EnhancedCourseData[]) => void
}

interface CourseDataState {
  courses: EnhancedCourseData[]
  recommendations: any[]
  analytics: any
  isLoading: boolean
  error: string | null
  lastUpdated: string | null
  cacheStatus: 'hit' | 'miss' | 'stale'
}

export function useEnhancedCourseData(options: UseEnhancedCourseDataOptions) {
  const {
    classLevel,
    series,
    userId,
    includeAnalytics = true,
    includeRecommendations = true,
    enableRealtime = true,
    cacheStrategy = 'moderate',
    onDataUpdate,
  } = options

  // State management
  const [state, setState] = useState<CourseDataState>({
    courses: [],
    recommendations: [],
    analytics: {},
    isLoading: true,
    error: null,
    lastUpdated: null,
    cacheStatus: 'miss',
  })

  // Real-time data integration
  const {
    data: realtimeData,
    isConnected: realtimeConnected,
    error: realtimeError,
  } = useRealtimeCourseData(classLevel, userId)

  // Cache configuration based on strategy
  const cacheConfig = useMemo(() => {
    const configs = {
      aggressive: { ttl: 600000, maxAge: 3600000 }, // 10min TTL, 1hr max
      moderate: { ttl: 300000, maxAge: 1800000 }, // 5min TTL, 30min max
      minimal: { ttl: 60000, maxAge: 300000 }, // 1min TTL, 5min max
    }
    return configs[cacheStrategy]
  }, [cacheStrategy])

  // Generate cache key
  const cacheKey = useMemo(() => {
    return `courses-${classLevel}-${series || 'all'}-${userId || 'anon'}-${includeAnalytics}-${includeRecommendations}`
  }, [classLevel, series, userId, includeAnalytics, includeRecommendations])

  // Check cache validity
  const getCachedData = useCallback(() => {
    const cached = courseDataCache.get(cacheKey)
    if (!cached) return null

    const now = Date.now()
    const age = now - cached.timestamp

    if (age > cacheConfig.maxAge) {
      courseDataCache.delete(cacheKey)
      return null
    }

    const isStale = age > cached.ttl
    return {
      ...cached,
      isStale,
    }
  }, [cacheKey, cacheConfig])

  // Fetch data from API
  const fetchCourseData = useCallback(
    async (useCache = true) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }))

        // Check cache first
        if (useCache) {
          const cached = getCachedData()
          if (cached && !cached.isStale) {
            setState((prev) => ({
              ...prev,
              courses: cached.data.data.courses.map((course) => ({
                ...course,
                animationConfig: {
                  entranceDelay: 0,
                  hoverEffects: [],
                  selectionAnimation: 'none',
                  transitionDuration: 300,
                },
                realTimeStats: {
                  currentViewers: 0,
                  recentEnrollments: 0,
                  liveInteractions: 0,
                },
                personalizedData: {
                  recommendationScore: 0,
                  matchPercentage: 0,
                  estimatedSuccess: 0,
                  learningPathFit: 0,
                },
              })),
              recommendations: cached.data.data.recommendations,
              analytics: cached.data.data.analytics,
              isLoading: false,
              lastUpdated: cached.data.metadata.timestamp,
              cacheStatus: 'hit',
              error: null,
            }))
            return cached.data
          }
        }

        // Build API URL
        const params = new URLSearchParams({
          class: classLevel,
          includeAnalytics: includeAnalytics.toString(),
          includeRecommendations: includeRecommendations.toString(),
        })

        if (series) params.append('series', series)
        if (userId) params.append('userId', userId)

        const response = await fetch(`/api/courses/enhanced?${params}`)

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status} ${response.statusText}`)
        }

        const data: CourseSelectionResponse = await response.json()

        // Cache the response
        courseDataCache.set(cacheKey, {
          data,
          timestamp: Date.now(),
          ttl: cacheConfig.ttl,
        })

        // Update state with enhanced course data
        const enhancedCourses: EnhancedCourseData[] = data.data.courses.map((course) => ({
          ...course,
          animationConfig: {
            entranceDelay: 0,
            hoverEffects: [],
            selectionAnimation: 'none',
            transitionDuration: 300,
          },
          realTimeStats: {
            currentViewers: 0,
            recentEnrollments: 0,
            liveInteractions: 0,
          },
          personalizedData: {
            recommendationScore: 0,
            matchPercentage: 0,
            estimatedSuccess: 0,
            learningPathFit: 0,
          },
        }))

        setState((prev) => ({
          ...prev,
          courses: enhancedCourses,
          recommendations: data.data.recommendations,
          analytics: data.data.analytics,
          isLoading: false,
          lastUpdated: data.metadata.timestamp,
          cacheStatus: data.metadata.cacheStatus,
          error: null,
        }))

        // Trigger callback
        onDataUpdate?.(enhancedCourses)

        return data
      } catch (error) {
        console.error('Failed to fetch course data:', error)
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch course data',
        }))
        throw error
      }
    },
    [
      classLevel,
      series,
      userId,
      includeAnalytics,
      includeRecommendations,
      cacheKey,
      getCachedData,
      cacheConfig.ttl,
      onDataUpdate,
    ]
  )

  // Handle real-time updates
  useEffect(() => {
    if (enableRealtime && realtimeData.length > 0) {
      setState((prev) => ({
        ...prev,
        courses: realtimeData,
        lastUpdated: new Date().toISOString(),
      }))
      onDataUpdate?.(realtimeData)
    }
  }, [realtimeData, enableRealtime, onDataUpdate])

  // Handle real-time errors
  useEffect(() => {
    if (realtimeError) {
      setState((prev) => ({
        ...prev,
        error: `Real-time connection error: ${realtimeError}`,
      }))
    }
  }, [realtimeError])

  // Initial data fetch
  useEffect(() => {
    fetchCourseData()
  }, [fetchCourseData])

  // Track course interactions
  const trackInteraction = useCallback(
    (courseId: string, action: string, metadata: Record<string, any> = {}) => {
      trackCourseInteraction(courseId, action, {
        ...metadata,
        userId,
        classLevel,
        timestamp: new Date().toISOString(),
      })
    },
    [userId, classLevel]
  )

  // Get course by ID with enhanced data
  const getCourseById = useCallback(
    (courseId: string): EnhancedCourseData | null => {
      return state.courses.find((course) => course.id === courseId) || null
    },
    [state.courses]
  )

  // Filter courses by criteria
  const filterCourses = useCallback(
    (filters: {
      series?: string
      priceRange?: [number, number]
      features?: string[]
      minRating?: number
    }) => {
      return state.courses.filter((course) => {
        if (filters.series && course.series !== filters.series) return false

        if (filters.priceRange) {
          const price = course.plans?.[0]?.price || 0
          if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false
        }

        if (filters.features) {
          const hasAllFeatures = filters.features.every((feature) =>
            course.features.some((f) => f.toLowerCase().includes(feature.toLowerCase()))
          )
          if (!hasAllFeatures) return false
        }

        if (filters.minRating && course.analytics.averageRating < filters.minRating) {
          return false
        }

        return true
      })
    },
    [state.courses]
  )

  // Sort courses by criteria
  const sortCourses = useCallback(
    (criteria: 'popularity' | 'price' | 'rating' | 'enrollment' | 'recommendation') => {
      return [...state.courses].sort((a, b) => {
        switch (criteria) {
          case 'popularity':
            return (
              (b.realTimeStats?.recentEnrollments || 0) - (a.realTimeStats?.recentEnrollments || 0)
            )
          case 'price':
            return (a.plans?.[0]?.price || 0) - (b.plans?.[0]?.price || 0)
          case 'rating':
            return b.analytics.averageRating - a.analytics.averageRating
          case 'enrollment':
            return b.analytics.enrollmentCount - a.analytics.enrollmentCount
          case 'recommendation':
            return (
              (b.personalizedData?.recommendationScore || 0) -
              (a.personalizedData?.recommendationScore || 0)
            )
          default:
            return 0
        }
      })
    },
    [state.courses]
  )

  // Performance metrics
  const performanceMetrics = useMemo(() => {
    return {
      dataFreshness: state.lastUpdated ? Date.now() - new Date(state.lastUpdated).getTime() : null,
      cacheHitRate: courseDataCache.size > 0 ? (state.cacheStatus === 'hit' ? 100 : 0) : 0,
      realtimeStatus: enableRealtime
        ? realtimeConnected
          ? 'connected'
          : 'disconnected'
        : 'disabled',
      courseCount: state.courses.length,
      errorRate: state.error ? 100 : 0,
    }
  }, [
    state.lastUpdated,
    state.cacheStatus,
    enableRealtime,
    realtimeConnected,
    state.courses.length,
    state.error,
  ])

  // Public API
  return {
    // Data
    courses: state.courses,
    recommendations: state.recommendations,
    analytics: state.analytics,

    // State
    isLoading: state.isLoading,
    error: state.error,
    lastUpdated: state.lastUpdated,
    cacheStatus: state.cacheStatus,

    // Actions
    refetch: () => fetchCourseData(false),
    trackInteraction,
    getCourseById,
    filterCourses,
    sortCourses,

    // Real-time
    realtimeConnected,
    realtimeError,

    // Performance
    performanceMetrics,
  }
}
