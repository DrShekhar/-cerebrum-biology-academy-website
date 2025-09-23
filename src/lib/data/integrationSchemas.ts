/**
 * Enhanced Data Integration Schemas
 * Connects course data with animation system, analytics, and real-time updates
 */

import { z } from 'zod'

// Core Entity Schemas
export const StudentSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  class: z.enum(['9th', '10th', '11th', '12th', 'Dropper']),
  enrolledCourses: z.array(z.string()),
  selectedSeries: z.string().optional(),
  selectedPlan: z.enum(['A', 'B', 'C']).optional(),
  preferences: z.object({
    learningStyle: z.enum(['visual', 'auditory', 'kinesthetic', 'mixed']),
    studyHours: z.number(),
    preferredTime: z.string(),
    subjects: z.array(z.string()),
  }),
  progress: z.object({
    overallScore: z.number(),
    chapterWiseScores: z.record(z.string(), z.number()),
    testResults: z.array(
      z.object({
        testId: z.string(),
        score: z.number(),
        date: z.string(),
        timeSpent: z.number(),
      })
    ),
    studyTime: z.object({
      daily: z.number(),
      weekly: z.number(),
      monthly: z.number(),
    }),
  }),
  analytics: z.object({
    lastLogin: z.string(),
    sessionDuration: z.number(),
    clickThrough: z.record(z.string(), z.number()),
    engagementScore: z.number(),
    learningPath: z.array(z.string()),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const CourseSchema = z.object({
  id: z.string(),
  name: z.string(),
  series: z.enum(['Foundation', 'Pursuit', 'Ascent', 'Pinnacle', 'Intensive']),
  targetClass: z.array(z.string()),
  duration: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  plans: z.array(
    z.object({
      id: z.enum(['A', 'B', 'C']),
      name: z.string(),
      price: z.number(),
      features: z.array(z.string()),
      duration: z.string(),
      popular: z.boolean().optional(),
    })
  ),
  analytics: z.object({
    enrollmentCount: z.number(),
    completionRate: z.number(),
    averageRating: z.number(),
    viewCount: z.number(),
    conversionRate: z.number(),
  }),
  metadata: z.object({
    tags: z.array(z.string()),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    prerequisites: z.array(z.string()),
    learningObjectives: z.array(z.string()),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const InteractionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  sessionId: z.string(),
  type: z.enum(['click', 'hover', 'scroll', 'view', 'select', 'purchase']),
  element: z.string(),
  data: z.record(z.string(), z.unknown()),
  timestamp: z.string(),
  page: z.string(),
  duration: z.number().optional(),
  coordinates: z
    .object({
      x: z.number(),
      y: z.number(),
    })
    .optional(),
})

export const AnimationStateSchema = z.object({
  id: z.string(),
  userId: z.string(),
  sessionId: z.string(),
  currentClass: z.enum(['9th', '10th', '11th', '12th', 'Dropper', 'all']),
  selectedSeries: z.string().optional(),
  selectedPlan: z.enum(['A', 'B', 'C']).optional(),
  hoveredCard: z.string().optional(),
  animationPreferences: z.object({
    reducedMotion: z.boolean(),
    speed: z.enum(['slow', 'normal', 'fast']),
    effects: z.array(z.string()),
  }),
  interactions: z.array(z.string()), // Interaction IDs
  engagementMetrics: z.object({
    timeSpent: z.number(),
    cardsViewed: z.number(),
    plansCompared: z.number(),
    animationsTriggered: z.number(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
})

// Real-time Update Schemas
export const RealtimeEventSchema = z.object({
  id: z.string(),
  type: z.enum([
    'user_joined',
    'course_selected',
    'plan_changed',
    'animation_triggered',
    'engagement_update',
  ]),
  data: z.record(z.string(), z.unknown()),
  userId: z.string(),
  timestamp: z.string(),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
})

// API Response Schemas
export const CourseSelectionResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    courses: z.array(CourseSchema),
    recommendations: z.array(
      z.object({
        courseId: z.string(),
        score: z.number(),
        reasons: z.array(z.string()),
      })
    ),
    analytics: z.object({
      totalViews: z.number(),
      popularCourses: z.array(z.string()),
      trending: z.array(z.string()),
    }),
  }),
  metadata: z.object({
    timestamp: z.string(),
    requestId: z.string(),
    cacheStatus: z.enum(['hit', 'miss', 'stale']),
  }),
})

export const StudentProgressResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    student: StudentSchema,
    progress: z.object({
      overall: z.number(),
      bySubject: z.record(z.string(), z.number()),
      recentTests: z.array(
        z.object({
          id: z.string(),
          score: z.number(),
          date: z.string(),
          subject: z.string(),
        })
      ),
      achievements: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          description: z.string(),
          earnedAt: z.string(),
        })
      ),
    }),
    recommendations: z.array(
      z.object({
        type: z.enum(['study_plan', 'course', 'practice', 'revision']),
        title: z.string(),
        description: z.string(),
        priority: z.number(),
      })
    ),
  }),
  metadata: z.object({
    lastUpdated: z.string(),
    nextUpdate: z.string(),
  }),
})

// Type exports for TypeScript
export type Student = z.infer<typeof StudentSchema>
export type Course = z.infer<typeof CourseSchema>
export type Interaction = z.infer<typeof InteractionSchema>
export type AnimationState = z.infer<typeof AnimationStateSchema>
export type RealtimeEvent = z.infer<typeof RealtimeEventSchema>
export type CourseSelectionResponse = z.infer<typeof CourseSelectionResponseSchema>
export type StudentProgressResponse = z.infer<typeof StudentProgressResponseSchema>

// Enhanced interfaces for UI components
export interface EnhancedCourseData extends Course {
  animationConfig: {
    entranceDelay: number
    hoverEffects: string[]
    selectionAnimation: string
    transitionDuration: number
  }
  realTimeStats: {
    currentViewers: number
    recentEnrollments: number
    liveInteractions: number
  }
  personalizedData: {
    recommendationScore: number
    matchPercentage: number
    estimatedSuccess: number
    learningPathFit: number
  }
}

export interface EnhancedAnimationMetrics {
  performanceScore: number
  frameRate: number
  loadTime: number
  interactionLatency: number
  smoothnessRating: number
  userSatisfaction: number
  engagementLevel: number
  conversionImpact: number
}

export interface DataIntegrationConfig {
  apiEndpoints: {
    courses: string
    students: string
    analytics: string
    realtime: string
  }
  caching: {
    strategy: 'memory' | 'localStorage' | 'sessionStorage' | 'hybrid'
    ttl: number
    maxSize: number
  }
  animations: {
    performance: 'high' | 'medium' | 'low'
    dataBinding: boolean
    realTimeUpdates: boolean
  }
  analytics: {
    trackingEnabled: boolean
    batchSize: number
    flushInterval: number
  }
}

// Default configuration
export const DEFAULT_INTEGRATION_CONFIG: DataIntegrationConfig = {
  apiEndpoints: {
    courses: '/api/courses',
    students: '/api/students',
    analytics: '/api/analytics',
    realtime: '/api/realtime',
  },
  caching: {
    strategy: 'hybrid',
    ttl: 300000, // 5 minutes
    maxSize: 100,
  },
  animations: {
    performance: 'high',
    dataBinding: true,
    realTimeUpdates: true,
  },
  analytics: {
    trackingEnabled: true,
    batchSize: 10,
    flushInterval: 5000,
  },
}

// Validation utilities
export const validateApiResponse = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data)
  } catch (error) {
    console.error('API Response validation failed:', error)
    throw new Error('Invalid API response format')
  }
}

export const sanitizeUserInput = (input: unknown): Record<string, unknown> => {
  if (typeof input !== 'object' || input === null) {
    return {}
  }

  const sanitized: Record<string, unknown> = {}
  Object.entries(input as Record<string, unknown>).forEach(([key, value]) => {
    if (typeof value === 'string') {
      sanitized[key] = value.trim().slice(0, 1000) // Limit string length
    } else if (typeof value === 'number' && isFinite(value)) {
      sanitized[key] = value
    } else if (typeof value === 'boolean') {
      sanitized[key] = value
    }
  })

  return sanitized
}
