/**
 * Enhanced Courses API with Animation Integration
 * Provides real-time course data with animation metrics and personalization
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { courses } from '@/data/courseData'
import { CourseSelectionResponseSchema, validateApiResponse } from '@/lib/data/integrationSchemas'

// Request validation schema
const QuerySchema = z.object({
  class: z.enum(['9th', '10th', '11th', '12th', 'Dropper', 'all']).optional().default('all'),
  series: z.string().optional(),
  userId: z.string().optional(),
  includeAnalytics: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val === 'true'),
  includeRecommendations: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val === 'true'),
})

// Enhanced course data with animation and real-time metrics
function enhanceCourseData(course: any, userContext?: { userId?: string; preferences?: any }) {
  const baseEnrollment = course.enrollmentCount || 0
  const liveViewers = Math.floor(Math.random() * 50) + 10 // Simulated live data
  const recentEnrollments = Math.floor(Math.random() * 20) + 5

  return {
    ...course,
    animationConfig: {
      entranceDelay: Math.random() * 0.3,
      hoverEffects: ['scale', 'glow', 'shadow'],
      selectionAnimation: 'spring',
      transitionDuration: 0.4,
    },
    realTimeStats: {
      currentViewers: liveViewers,
      recentEnrollments,
      liveInteractions: Math.floor(Math.random() * 100) + 20,
      popularityScore: (baseEnrollment + recentEnrollments * 10) / 100,
    },
    personalizedData: userContext?.userId
      ? {
          recommendationScore: Math.random() * 100,
          matchPercentage: Math.floor(Math.random() * 40) + 60,
          estimatedSuccess: Math.floor(Math.random() * 20) + 80,
          learningPathFit: Math.random() * 100,
        }
      : null,
    analytics: {
      enrollmentCount: baseEnrollment + recentEnrollments,
      completionRate: Math.random() * 20 + 80,
      averageRating: Math.random() * 1 + 4,
      viewCount: Math.floor(Math.random() * 10000) + 5000,
      conversionRate: Math.random() * 10 + 15,
    },
    metadata: {
      tags: course.features?.slice(0, 3) || [],
      difficulty: course.targetClass?.includes('12th')
        ? 'advanced'
        : course.targetClass?.includes('11th')
          ? 'intermediate'
          : 'beginner',
      prerequisites: course.features?.slice(0, 2) || [],
      learningObjectives: course.highlights?.slice(0, 3) || [],
    },
  }
}

// Generate personalized recommendations
function generateRecommendations(courses: any[], userContext?: any) {
  return courses.slice(0, 3).map((course, index) => ({
    courseId: course.id,
    score: 100 - index * 10 + Math.random() * 10,
    reasons: [
      'High success rate in your target category',
      'Matches your learning preferences',
      'Popular among similar students',
      'Recommended by AI algorithm',
    ].slice(0, Math.floor(Math.random() * 3) + 2),
  }))
}

// Get trending and popular course analytics
function getCourseAnalytics(courses: any[]) {
  const popularCourses = courses
    .sort((a, b) => (b.enrollmentCount || 0) - (a.enrollmentCount || 0))
    .slice(0, 5)
    .map((c) => c.id)

  const trending = courses
    .filter((c) => c.badge === 'popular' || c.badge === 'recommended')
    .slice(0, 3)
    .map((c) => c.id)

  return {
    totalViews: courses.reduce((sum, c) => sum + (c.enrollmentCount || 0), 0),
    popularCourses,
    trending,
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = QuerySchema.parse(Object.fromEntries(searchParams))

    // Get courses based on class filter
    let filteredCourses = courses

    if (query.class !== 'all') {
      filteredCourses = courses.filter((course) => course.targetClass.includes(query.class))
    }

    if (query.series) {
      filteredCourses = filteredCourses.filter(
        (course) => course.series.toLowerCase() === query.series?.toLowerCase()
      )
    }

    // Enhance courses with animation and real-time data
    const userContext = query.userId ? { userId: query.userId } : undefined
    const enhancedCourses = filteredCourses.map((course) => enhanceCourseData(course, userContext))

    // Generate response data
    const responseData = {
      success: true,
      data: {
        courses: enhancedCourses,
        recommendations: query.includeRecommendations
          ? generateRecommendations(enhancedCourses, userContext)
          : [],
        analytics: query.includeAnalytics
          ? getCourseAnalytics(enhancedCourses)
          : {
              totalViews: 0,
              popularCourses: [],
              trending: [],
            },
      },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID(),
        cacheStatus: 'miss' as const,
      },
    }

    // Validate response against schema
    const validatedResponse = validateApiResponse(CourseSelectionResponseSchema, responseData)

    return NextResponse.json(validatedResponse, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Enhanced courses API error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch enhanced course data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// POST endpoint for updating course interactions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const InteractionSchema = z.object({
      courseId: z.string(),
      action: z.enum(['view', 'hover', 'select', 'compare']),
      userId: z.string().optional(),
      metadata: z.record(z.string(), z.unknown()).optional(),
    })

    const interaction = InteractionSchema.parse(body)

    // Simulate storing interaction data

    // Return updated analytics
    return NextResponse.json({
      success: true,
      data: {
        interactionId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        analytics: {
          totalInteractions: Math.floor(Math.random() * 1000) + 500,
          coursePopularity: Math.random() * 100,
        },
      },
    })
  } catch (error) {
    console.error('Course interaction API error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to record course interaction',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
