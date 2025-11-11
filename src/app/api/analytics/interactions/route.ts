/**
 * Analytics API for Course Selector Interactions
 * Tracks user interactions with animated course selector components
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { InteractionSchema } from '@/lib/data/integrationSchemas'

// Batch interaction tracking schema
const BatchInteractionSchema = z.object({
  sessionId: z.string(),
  userId: z.string().optional(),
  interactions: z.array(InteractionSchema),
  metadata: z
    .object({
      userAgent: z.string().optional(),
      viewport: z
        .object({
          width: z.number(),
          height: z.number(),
        })
        .optional(),
      performance: z
        .object({
          loadTime: z.number(),
          renderTime: z.number(),
          animationFps: z.number(),
        })
        .optional(),
    })
    .optional(),
})

// Real-time analytics data store (in production, use Redis or similar)
const analyticsStore = new Map<string, any>()

// Calculate engagement metrics
function calculateEngagementMetrics(interactions: any[]) {
  const totalTime = interactions.reduce((sum, i) => sum + (i.duration || 0), 0)
  const uniqueElements = new Set(interactions.map((i) => i.element)).size
  const clickThroughRate =
    interactions.filter((i) => i.type === 'click').length / Math.max(interactions.length, 1)

  return {
    totalInteractions: interactions.length,
    totalTimeSpent: totalTime,
    uniqueElementsInteracted: uniqueElements,
    clickThroughRate: clickThroughRate * 100,
    engagementScore: Math.min(100, (totalTime / 1000) * uniqueElements * clickThroughRate * 100),
    averageInteractionDuration: totalTime / Math.max(interactions.length, 1),
  }
}

// Generate real-time insights
function generateInsights(interactions: any[]) {
  const elementPopularity = interactions.reduce(
    (acc, i) => {
      acc[i.element] = (acc[i.element] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const mostPopularElement = Object.entries(elementPopularity).sort(
    ([, a], [, b]) => (b as number) - (a as number)
  )[0]

  const typeDistribution = interactions.reduce(
    (acc, i) => {
      acc[i.type] = (acc[i.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return {
    mostPopularElement: mostPopularElement
      ? {
          element: mostPopularElement[0],
          interactions: mostPopularElement[1],
        }
      : null,
    interactionTypes: typeDistribution,
    averageSessionLength:
      interactions.length > 0
        ? (Math.max(...interactions.map((i) => new Date(i.timestamp).getTime())) -
            Math.min(...interactions.map((i) => new Date(i.timestamp).getTime()))) /
          1000
        : 0,
    peakActivity: findPeakActivityTime(interactions),
  }
}

function findPeakActivityTime(interactions: any[]) {
  if (interactions.length === 0) return null

  const timeSlots = interactions.reduce(
    (acc, i) => {
      const time = new Date(i.timestamp)
      const slot = Math.floor(time.getMinutes() / 5) * 5 // 5-minute slots
      acc[slot] = (acc[slot] || 0) + 1
      return acc
    },
    {} as Record<number, number>
  )

  const peakSlot = Object.entries(timeSlots).sort(
    ([, a], [, b]) => (b as number) - (a as number)
  )[0]

  return peakSlot
    ? {
        timeSlot: `${peakSlot[0]}:00`,
        interactions: peakSlot[1],
      }
    : null
}

// POST: Track batch interactions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const batchData = BatchInteractionSchema.parse(body)

    // Store interactions with enhanced metadata
    const sessionId = batchData.sessionId
    const existingData = analyticsStore.get(sessionId) || { interactions: [], metadata: {} }

    existingData.interactions.push(...batchData.interactions)
    existingData.metadata = { ...existingData.metadata, ...batchData.metadata }
    existingData.lastUpdated = new Date().toISOString()

    analyticsStore.set(sessionId, existingData)

    // Calculate real-time metrics
    const engagementMetrics = calculateEngagementMetrics(existingData.interactions)
    const insights = generateInsights(existingData.interactions)

    // Simulate real-time dashboard data
    const dashboardData = {
      liveUsers: Math.floor(Math.random() * 100) + 50,
      activeSelectors: Math.floor(Math.random() * 30) + 10,
      conversionRate: Math.random() * 10 + 5,
      popularCourses: ['pursuit-neet-plan-a', 'ascent-neet-plan-b', 'pinnacle-neet-elite'],
    }

    return NextResponse.json({
      success: true,
      data: {
        sessionId,
        processed: batchData.interactions.length,
        metrics: engagementMetrics,
        insights,
        realTime: dashboardData,
      },
      metadata: {
        timestamp: new Date().toISOString(),
        processingTime: Math.random() * 50 + 10,
      },
    })
  } catch (error) {
    console.error('Analytics tracking error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to track interactions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// GET: Retrieve analytics data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    const timeRange = searchParams.get('timeRange') || '1h'
    const includeRealTime = searchParams.get('realTime') === 'true'

    if (sessionId) {
      // Get specific session data
      const sessionData = analyticsStore.get(sessionId)
      if (!sessionData) {
        return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 })
      }

      const metrics = calculateEngagementMetrics(sessionData.interactions)
      const insights = generateInsights(sessionData.interactions)

      return NextResponse.json({
        success: true,
        data: {
          session: sessionData,
          metrics,
          insights,
        },
      })
    }

    // Get aggregated analytics
    const allSessions = Array.from(analyticsStore.values())
    const allInteractions = allSessions.flatMap((s) => s.interactions)

    const aggregatedMetrics = {
      totalSessions: allSessions.length,
      totalInteractions: allInteractions.length,
      averageSessionDuration:
        allSessions.length > 0
          ? allSessions.reduce((sum, s) => sum + (s.interactions.length || 0), 0) /
            allSessions.length
          : 0,
      uniqueUsers: new Set(allInteractions.map((i) => i.userId).filter(Boolean)).size,
      ...calculateEngagementMetrics(allInteractions),
    }

    const globalInsights = generateInsights(allInteractions)

    // Real-time data simulation
    const realTimeData = includeRealTime
      ? {
          currentLoad: Math.floor(Math.random() * 100) + 20,
          peakHours: ['14:00', '16:00', '20:00'],
          topPerformingElements: ['course-card-pursuit', 'plan-selector-a', 'class-filter-12th'],
          conversionFunnel: {
            views: 1000,
            interactions: 750,
            selections: 300,
            enrollments: 45,
          },
          performanceMetrics: {
            averageLoadTime: Math.random() * 2000 + 500,
            animationFrameRate: Math.random() * 10 + 55,
            errorRate: Math.random() * 2,
          },
        }
      : null

    return NextResponse.json({
      success: true,
      data: {
        timeRange,
        metrics: aggregatedMetrics,
        insights: globalInsights,
        realTime: realTimeData,
      },
      metadata: {
        timestamp: new Date().toISOString(),
        dataPoints: allInteractions.length,
      },
    })
  } catch (error) {
    console.error('Analytics retrieval error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve analytics',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
