import { NextRequest, NextResponse } from 'next/server'
import { withOptionalAuth } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { unstable_cache } from 'next/cache'

// Query parameter validation schema
const querySchema = z.object({
  userId: z.string().optional(),
})

interface DashboardStatsResponse {
  totalTests: number
  averageScore: number
  totalQuestions: number
  accuracy: number
  totalStudyTime: number
  improvementRate: number
  lastTestDate: Date | null
  testsThisWeek: number
  questionsThisWeek: number
  studyTimeThisWeek: number
  upcomingTests: Array<{
    id: string
    title: string
    scheduledDate: Date
  }>
}

/**
 * Get default dashboard stats for new users
 */
function getDefaultDashboardStats(): DashboardStatsResponse {
  return {
    totalTests: 0,
    averageScore: 0,
    totalQuestions: 0,
    accuracy: 0,
    totalStudyTime: 0,
    improvementRate: 0,
    lastTestDate: null,
    testsThisWeek: 0,
    questionsThisWeek: 0,
    studyTimeThisWeek: 0,
    upcomingTests: [],
  }
}

/**
 * Calculate comprehensive dashboard statistics
 * OPTIMIZED: Uses database aggregations instead of fetching all records
 */
async function calculateDashboardStats(userId: string): Promise<DashboardStatsResponse> {
  try {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    // Use Promise.allSettled for graceful error handling - one failing query won't break the dashboard
    const results = await Promise.allSettled([
      // Overall statistics using aggregation
      prisma.testAttempt.aggregate({
        where: {
          freeUserId: userId,
          status: 'COMPLETED',
        },
        _count: { id: true },
        _avg: { percentage: true },
        _sum: {
          questionCount: true,
          totalMarks: true,
          score: true,
          timeSpent: true,
        },
      }),

      // This week's statistics using aggregation
      prisma.testAttempt.aggregate({
        where: {
          freeUserId: userId,
          status: 'COMPLETED',
          submittedAt: { gte: oneWeekAgo },
        },
        _count: { id: true },
        _sum: {
          questionCount: true,
          timeSpent: true,
        },
      }),

      // Fetch only the 20 most recent tests for improvement calculation (not all tests)
      prisma.testAttempt.findMany({
        where: {
          freeUserId: userId,
          status: 'COMPLETED',
        },
        select: {
          percentage: true,
          submittedAt: true,
        },
        orderBy: { submittedAt: 'desc' },
        take: 20,
      }),

      // Upcoming tests
      prisma.testSession.findMany({
        where: {
          freeUserId: userId,
          status: 'NOT_STARTED',
          startedAt: null,
        },
        take: 5,
        orderBy: { createdAt: 'asc' },
        include: {
          testTemplate: {
            select: {
              title: true,
            },
          },
        },
      }),
    ])

    // Extract values with defaults for failed queries
    const overallStats = results[0].status === 'fulfilled' ? results[0].value : { _count: { id: 0 }, _avg: { percentage: 0 }, _sum: { questionCount: 0, totalMarks: 0, score: 0, timeSpent: 0 } }
    const thisWeekStats = results[1].status === 'fulfilled' ? results[1].value : { _count: { id: 0 }, _sum: { questionCount: 0, timeSpent: 0 } }
    const recentTests = results[2].status === 'fulfilled' ? results[2].value : []
    const upcomingTestSessions = results[3].status === 'fulfilled' ? results[3].value : []

    // Log any failed queries for debugging
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Dashboard query ${index} failed:`, result.reason)
      }
    })

    // Return default data if no tests found
    const totalTests = overallStats._count.id
    if (totalTests === 0) {
      return getDefaultDashboardStats()
    }

    // Calculate metrics from aggregated data
    const averageScore = overallStats._avg.percentage || 0
    const totalQuestions = overallStats._sum.questionCount || 0
    const totalMarks = overallStats._sum.totalMarks || 0
    const totalScored = overallStats._sum.score || 0
    const accuracy = totalMarks > 0 ? (totalScored / totalMarks) * 100 : 0
    const totalStudyTime = Math.round((overallStats._sum.timeSpent || 0) / 60)

    // Calculate improvement rate from recent tests only
    const recentTestsSlice = recentTests.slice(0, 10)
    const previousTestsSlice = recentTests.slice(10, 20)

    const recentAvg =
      recentTestsSlice.length > 0
        ? recentTestsSlice.reduce((sum, test) => sum + test.percentage, 0) / recentTestsSlice.length
        : 0

    const previousAvg =
      previousTestsSlice.length > 0
        ? previousTestsSlice.reduce((sum, test) => sum + test.percentage, 0) /
          previousTestsSlice.length
        : 0

    const improvementRate = previousAvg > 0 ? ((recentAvg - previousAvg) / previousAvg) * 100 : 0

    // Get last test date
    const lastTestDate = recentTests.length > 0 ? recentTests[0].submittedAt : null

    // This week's stats from aggregation
    const testsThisWeek = thisWeekStats._count.id
    const questionsThisWeek = thisWeekStats._sum.questionCount || 0
    const studyTimeThisWeek = Math.round((thisWeekStats._sum.timeSpent || 0) / 60)

    const upcomingTests = upcomingTestSessions.map((session) => ({
      id: session.id,
      title: session.testTemplate?.title || 'Upcoming Test',
      scheduledDate: session.createdAt,
    }))

    return {
      totalTests,
      averageScore: Math.round(averageScore * 10) / 10,
      totalQuestions,
      accuracy: Math.round(accuracy * 10) / 10,
      totalStudyTime,
      improvementRate: Math.round(improvementRate * 10) / 10,
      lastTestDate,
      testsThisWeek,
      questionsThisWeek,
      studyTimeThisWeek,
      upcomingTests,
    }
  } catch (error) {
    console.error('Error calculating dashboard stats:', error)
    throw error
  }
}

/**
 * GET /api/user/dashboard-stats
 * Fetch high-level dashboard statistics with week-over-week comparisons
 */
export const GET = withOptionalAuth(async (request: NextRequest, session) => {
  try {
    const { searchParams } = new URL(request.url)
    const userIdParam = searchParams.get('userId')

    // Use authenticated user ID or provided userId
    const userId = userIdParam || session?.userId

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required', message: 'userId parameter or authentication required' },
        { status: 400 }
      )
    }

    // Validate query parameters
    const validationResult = querySchema.safeParse({ userId })
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid parameters',
          details: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    // Create cached version of stats calculation
    const getCachedStats = unstable_cache(
      async (uid: string) => calculateDashboardStats(uid),
      ['user-dashboard-stats'],
      { revalidate: 300, tags: [`user-${userId}`] }
    )

    // Fetch dashboard stats
    const stats = await getCachedStats(userId)

    // Calculate week-over-week comparisons using aggregation (not fetching all records)
    const twoWeeksAgo = new Date()
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    // Use Promise.allSettled for graceful error handling
    const weeklyResults = await Promise.allSettled([
      // Last week's average using aggregation
      prisma.testAttempt.aggregate({
        where: {
          freeUserId: userId,
          status: 'COMPLETED',
          submittedAt: {
            gte: twoWeeksAgo,
            lt: oneWeekAgo,
          },
        },
        _avg: { percentage: true },
        _count: { id: true },
      }),

      // This week's average using aggregation
      prisma.testAttempt.aggregate({
        where: {
          freeUserId: userId,
          status: 'COMPLETED',
          submittedAt: {
            gte: oneWeekAgo,
          },
        },
        _avg: { percentage: true },
        _count: { id: true },
      }),
    ])

    // Extract values with defaults for failed queries
    const lastWeekStatsResult = weeklyResults[0].status === 'fulfilled' ? weeklyResults[0].value : { _avg: { percentage: 0 }, _count: { id: 0 } }
    const thisWeekStatsResult = weeklyResults[1].status === 'fulfilled' ? weeklyResults[1].value : { _avg: { percentage: 0 }, _count: { id: 0 } }

    const lastWeekAvg = lastWeekStatsResult._avg.percentage || 0
    const thisWeekAvg = thisWeekStatsResult._avg.percentage || 0

    const weekOverWeekChange =
      lastWeekAvg > 0 ? ((thisWeekAvg - lastWeekAvg) / lastWeekAvg) * 100 : 0

    return NextResponse.json(
      {
        success: true,
        data: {
          ...stats,
          weekOverWeek: {
            testsChange: thisWeekStatsResult._count.id - lastWeekStatsResult._count.id,
            scoreChange: Math.round((thisWeekAvg - lastWeekAvg) * 10) / 10,
            percentageChange: Math.round(weekOverWeekChange * 10) / 10,
          },
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('API Error - Dashboard Stats:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch dashboard stats',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
})
