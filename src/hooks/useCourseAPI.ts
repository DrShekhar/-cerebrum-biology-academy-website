import { useState, useCallback, useEffect } from 'react'
import { CourseSelectionData } from './useCourseSelectorState'

export interface CourseData {
  id: string
  name: string
  series: 'ascent' | 'pinnacle' | 'pursuit'
  price: {
    base: number
    discounted?: number
    currency: 'INR'
  }
  duration: {
    months: number
    totalHours: number
    hoursPerWeek: number
  }
  features: {
    liveClasses: number
    recordedContent: number
    testSeries: number
    studyMaterial: boolean
    doubtSessions: boolean
    mentoring: boolean
    mobileApp: boolean
  }
  eligibility: {
    minScore?: number
    targetAudience: string[]
    prerequisites: string[]
  }
  schedule: {
    batchTiming: string[]
    flexibility: 'fixed' | 'flexible' | 'self-paced'
    weekendClasses: boolean
  }
  faculty: {
    count: number
    averageExperience: number
    qualifications: string[]
  }
  outcomes: {
    averageImprovement: number
    successRate: number
    topRanks: number[]
  }
  location: {
    availableCities: string[]
    onlineAvailable: boolean
    hybridOptions: boolean
  }
  matching: {
    score: number
    reasons: string[]
    weaknesses: string[]
    recommendations: string[]
  }
}

export interface CourseFilters {
  priceRange: [number, number]
  duration: string[]
  mode: string[]
  schedule: string[]
  features: string[]
  location?: string
}

export interface CourseAPIResponse {
  courses: CourseData[]
  total: number
  recommendations: CourseData[]
  filters: CourseFilters
  metadata: {
    requestId: string
    processingTime: number
    cacheHit: boolean
    version: string
  }
}

interface APIError {
  code: string
  message: string
  details?: any
}

const MOCK_COURSES: CourseData[] = [
  {
    id: 'ascent-comprehensive-2024',
    name: 'Ascent Series - Comprehensive Biology',
    series: 'ascent',
    price: {
      base: 45000,
      discounted: 40500,
      currency: 'INR',
    },
    duration: {
      months: 12,
      totalHours: 400,
      hoursPerWeek: 8,
    },
    features: {
      liveClasses: 200,
      recordedContent: 300,
      testSeries: 24,
      studyMaterial: true,
      doubtSessions: true,
      mentoring: false,
      mobileApp: true,
    },
    eligibility: {
      minScore: 40,
      targetAudience: ['Class 11', 'Class 12', 'Droppers'],
      prerequisites: ['Basic Biology Knowledge'],
    },
    schedule: {
      batchTiming: ['Morning (8-11 AM)', 'Evening (6-9 PM)'],
      flexibility: 'flexible',
      weekendClasses: true,
    },
    faculty: {
      count: 8,
      averageExperience: 7,
      qualifications: ['M.Sc Biology', 'Ph.D', 'IIT/AIIMS Alumni'],
    },
    outcomes: {
      averageImprovement: 120,
      successRate: 85,
      topRanks: [250, 445, 678, 892],
    },
    location: {
      availableCities: ['Delhi', 'Mumbai', 'Kota', 'Hyderabad'],
      onlineAvailable: true,
      hybridOptions: true,
    },
    matching: {
      score: 0,
      reasons: [],
      weaknesses: [],
      recommendations: [],
    },
  },
  {
    id: 'pinnacle-advanced-2024',
    name: 'Pinnacle Series - Advanced Biology',
    series: 'pinnacle',
    price: {
      base: 75000,
      discounted: 67500,
      currency: 'INR',
    },
    duration: {
      months: 15,
      totalHours: 600,
      hoursPerWeek: 10,
    },
    features: {
      liveClasses: 300,
      recordedContent: 400,
      testSeries: 36,
      studyMaterial: true,
      doubtSessions: true,
      mentoring: true,
      mobileApp: true,
    },
    eligibility: {
      minScore: 60,
      targetAudience: ['Class 12', 'Serious Droppers'],
      prerequisites: ['Good Biology Foundation', 'Previous Test Series'],
    },
    schedule: {
      batchTiming: ['Morning (7-10 AM)', 'Afternoon (2-5 PM)', 'Evening (6-9 PM)'],
      flexibility: 'fixed',
      weekendClasses: true,
    },
    faculty: {
      count: 12,
      averageExperience: 10,
      qualifications: ['M.Sc/Ph.D Biology', 'AIIMS Faculty', 'Research Experience'],
    },
    outcomes: {
      averageImprovement: 180,
      successRate: 92,
      topRanks: [42, 87, 156, 234, 345],
    },
    location: {
      availableCities: ['Delhi', 'Kota', 'Hyderabad', 'Bangalore'],
      onlineAvailable: true,
      hybridOptions: true,
    },
    matching: {
      score: 0,
      reasons: [],
      weaknesses: [],
      recommendations: [],
    },
  },
  {
    id: 'pursuit-elite-2024',
    name: 'Pursuit Series - Elite Biology',
    series: 'pursuit',
    price: {
      base: 125000,
      discounted: 112500,
      currency: 'INR',
    },
    duration: {
      months: 18,
      totalHours: 800,
      hoursPerWeek: 12,
    },
    features: {
      liveClasses: 400,
      recordedContent: 500,
      testSeries: 48,
      studyMaterial: true,
      doubtSessions: true,
      mentoring: true,
      mobileApp: true,
    },
    eligibility: {
      minScore: 80,
      targetAudience: ['Top Aspirants', 'Rank Focused Students'],
      prerequisites: ['Strong Biology Base', 'Previous NEET Attempt'],
    },
    schedule: {
      batchTiming: ['Full Day (9 AM - 6 PM)', 'Intensive Batches'],
      flexibility: 'fixed',
      weekendClasses: false,
    },
    faculty: {
      count: 15,
      averageExperience: 15,
      qualifications: ['Ph.D Biology', 'AIIMS/AFMC Faculty', 'Research Publications'],
    },
    outcomes: {
      averageImprovement: 240,
      successRate: 96,
      topRanks: [1, 8, 23, 45, 67, 89],
    },
    location: {
      availableCities: ['Kota', 'Delhi'],
      onlineAvailable: false,
      hybridOptions: false,
    },
    matching: {
      score: 0,
      reasons: [],
      weaknesses: [],
      recommendations: [],
    },
  },
]

export const useCourseAPI = () => {
  const [courses, setCourses] = useState<CourseData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<APIError | null>(null)
  const [cache, setCache] = useState<Map<string, CourseAPIResponse>>(new Map())

  const calculateMatchingScore = useCallback(
    (course: CourseData, selectionData: CourseSelectionData): CourseData => {
      let score = 0
      const reasons: string[] = []
      const weaknesses: string[] = []
      const recommendations: string[] = []

      // Budget matching (40% weight)
      const budgetScore =
        selectionData.budget.maxAmount > 0
          ? Math.max(
              0,
              100 -
                (Math.abs(
                  course.price.discounted || course.price.base - selectionData.budget.maxAmount
                ) /
                  selectionData.budget.maxAmount) *
                  100
            )
          : 50
      score += budgetScore * 0.4

      if (budgetScore > 80) {
        reasons.push('Perfectly fits your budget')
      } else if (budgetScore > 60) {
        reasons.push('Within acceptable budget range')
      } else {
        weaknesses.push('Slightly above your budget')
        recommendations.push('Consider EMI options or scholarships')
      }

      // Goals alignment (30% weight)
      let goalsScore = 0
      if (selectionData.goals.targetScore > 0) {
        const courseAvgScore = course.outcomes.averageImprovement + 200 // Base expectation
        const scoreAlignment = Math.max(
          0,
          100 -
            (Math.abs(courseAvgScore - selectionData.goals.targetScore) /
              selectionData.goals.targetScore) *
              100
        )
        goalsScore += scoreAlignment * 0.5
      }

      if (selectionData.goals.preferredRank > 0) {
        const rankAlignment = course.outcomes.topRanks.some(
          (rank) => rank <= selectionData.goals.preferredRank
        )
          ? 100
          : 50
        goalsScore += rankAlignment * 0.5
      }
      score += goalsScore * 0.3

      if (goalsScore > 80) {
        reasons.push('Excellent track record for your target rank')
      } else if (goalsScore > 60) {
        reasons.push('Good success rate for your goals')
      } else {
        weaknesses.push('May need additional effort for your target')
        recommendations.push('Consider supplementary test series')
      }

      // Time availability (20% weight)
      let timeScore = 0
      if (selectionData.timeAvailability.hoursPerDay > 0) {
        const courseHoursPerDay = course.duration.hoursPerWeek / 7
        const timeAlignment = Math.max(
          0,
          100 -
            (Math.abs(courseHoursPerDay - selectionData.timeAvailability.hoursPerDay) /
              selectionData.timeAvailability.hoursPerDay) *
              100
        )
        timeScore = timeAlignment
      }
      score += timeScore * 0.2

      if (timeScore > 80) {
        reasons.push('Perfect time commitment match')
      } else if (timeScore > 60) {
        reasons.push('Manageable time requirements')
      } else {
        weaknesses.push('High time commitment required')
        recommendations.push('Consider flexible batch options')
      }

      // Location preference (10% weight)
      let locationScore = 50 // Default neutral score
      if (selectionData.location.city && selectionData.location.preferredMode) {
        if (selectionData.location.preferredMode === 'online' && course.location.onlineAvailable) {
          locationScore = 100
          reasons.push('Available online as preferred')
        } else if (
          selectionData.location.preferredMode === 'offline' &&
          course.location.availableCities.includes(selectionData.location.city)
        ) {
          locationScore = 100
          reasons.push('Available in your city')
        } else if (
          selectionData.location.preferredMode === 'hybrid' &&
          course.location.hybridOptions
        ) {
          locationScore = 100
          reasons.push('Hybrid options available')
        } else {
          locationScore = 30
          weaknesses.push('Limited availability in your preferred mode/location')
          recommendations.push('Consider online or nearby city options')
        }
      }
      score += locationScore * 0.1

      return {
        ...course,
        matching: {
          score: Math.round(score),
          reasons: reasons.slice(0, 3), // Top 3 reasons
          weaknesses: weaknesses.slice(0, 2), // Top 2 weaknesses
          recommendations: recommendations.slice(0, 2), // Top 2 recommendations
        },
      }
    },
    []
  )

  const generateCacheKey = useCallback(
    (selectionData: CourseSelectionData, filters?: CourseFilters): string => {
      const key = {
        budget: selectionData.budget.maxAmount,
        goals: selectionData.goals.targetScore,
        time: selectionData.timeAvailability.hoursPerDay,
        location: selectionData.location.city,
        mode: selectionData.location.preferredMode,
        filters: filters || {},
      }
      return btoa(JSON.stringify(key))
    },
    []
  )

  const fetchCourses = useCallback(
    async (
      selectionData: CourseSelectionData,
      filters?: CourseFilters
    ): Promise<CourseAPIResponse> => {
      const cacheKey = generateCacheKey(selectionData, filters)

      // Check cache first
      if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey)!
        return cached
      }

      setLoading(true)
      setError(null)

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200))

        // Process courses with matching scores
        let processedCourses = MOCK_COURSES.map((course) =>
          calculateMatchingScore(course, selectionData)
        )

        // Apply filters
        if (filters) {
          if (filters.priceRange) {
            processedCourses = processedCourses.filter((course) => {
              const price = course.price.discounted || course.price.base
              return price >= filters.priceRange[0] && price <= filters.priceRange[1]
            })
          }

          if (filters.duration.length > 0) {
            processedCourses = processedCourses.filter((course) =>
              filters.duration.includes(`${course.duration.months} months`)
            )
          }

          if (filters.mode.length > 0) {
            processedCourses = processedCourses.filter((course) => {
              if (filters.mode.includes('online') && course.location.onlineAvailable) return true
              if (filters.mode.includes('offline') && course.location.availableCities.length > 0)
                return true
              if (filters.mode.includes('hybrid') && course.location.hybridOptions) return true
              return false
            })
          }

          if (filters.features.length > 0) {
            processedCourses = processedCourses.filter((course) => {
              return filters.features.every((feature) => {
                switch (feature) {
                  case 'mentoring':
                    return course.features.mentoring
                  case 'doubt-sessions':
                    return course.features.doubtSessions
                  case 'mobile-app':
                    return course.features.mobileApp
                  case 'study-material':
                    return course.features.studyMaterial
                  default:
                    return true
                }
              })
            })
          }
        }

        // Sort by matching score
        processedCourses.sort((a, b) => b.matching.score - a.matching.score)

        // Get top recommendations (top 3 matches)
        const recommendations = processedCourses.slice(0, 3)

        const response: CourseAPIResponse = {
          courses: processedCourses,
          total: processedCourses.length,
          recommendations,
          filters: filters || {
            priceRange: [30000, 150000],
            duration: ['12 months', '15 months', '18 months'],
            mode: ['online', 'offline', 'hybrid'],
            schedule: ['morning', 'evening', 'full-day'],
            features: ['mentoring', 'doubt-sessions', 'mobile-app', 'study-material'],
          },
          metadata: {
            requestId: Math.random().toString(36).substr(2, 9),
            processingTime: 800 + Math.random() * 1200,
            cacheHit: false,
            version: '1.0.0',
          },
        }

        // Cache the response
        setCache((prev) => new Map(prev).set(cacheKey, response))

        setCourses(processedCourses)
        return response
      } catch (err) {
        const apiError: APIError = {
          code: 'FETCH_ERROR',
          message: 'Failed to fetch courses. Please try again.',
          details: err,
        }
        setError(apiError)
        throw apiError
      } finally {
        setLoading(false)
      }
    },
    [calculateMatchingScore, generateCacheKey, cache]
  )

  const refreshCourses = useCallback(
    async (selectionData: CourseSelectionData) => {
      setCache(new Map()) // Clear cache
      return fetchCourses(selectionData)
    },
    [fetchCourses]
  )

  const getCourseById = useCallback(
    (courseId: string): CourseData | null => {
      return courses.find((course) => course.id === courseId) || null
    },
    [courses]
  )

  const compareCourses = useCallback(
    (courseIds: string[]): CourseData[] => {
      return courseIds.map((id) => getCourseById(id)).filter(Boolean) as CourseData[]
    },
    [getCourseById]
  )

  // Clear cache every 5 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        setCache(new Map())
      },
      5 * 60 * 1000
    )

    return () => clearInterval(interval)
  }, [])

  return {
    courses,
    loading,
    error,
    fetchCourses,
    refreshCourses,
    getCourseById,
    compareCourses,
    clearCache: () => setCache(new Map()),
    cacheSize: cache.size,
  }
}
