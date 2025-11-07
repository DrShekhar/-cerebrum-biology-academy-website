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
 * Calculate comprehensive dashboard statistics
 */
async function calculateDashboardStats(userId: string): Promise<DashboardStatsResponse> {
  try {
    // Fetch all completed tests
    const allTests = await prisma.testAttempt.findMany({
      where: {
        freeUserId: userId,
        status: 'COMPLETED',
      },
      orderBy: { submittedAt: 'desc' },
    })

    const totalTests = allTests.length

    // Calculate average score
    const averageScore =
      totalTests > 0 ? allTests.reduce((sum, test) => sum + test.percentage, 0) / totalTests : 0

    // Calculate total questions answered
    const totalQuestions = allTests.reduce((sum, test) => sum + test.questionCount, 0)

    // Calculate overall accuracy
    const totalMarks = allTests.reduce((sum, test) => sum + test.totalMarks, 0)
    const totalScored = allTests.reduce((sum, test) => sum + test.score, 0)
    const accuracy = totalMarks > 0 ? (totalScored / totalMarks) * 100 : 0

    // Calculate total study time (in minutes)
    const totalStudyTime = Math.round(
      allTests.reduce((sum, test) => sum + (test.timeSpent || 0), 0) / 60
    )

    // Calculate improvement rate (compare last 10 vs previous 10 tests)
    const recentTests = allTests.slice(0, 10)
    const previousTests = allTests.slice(10, 20)

    const recentAvg =
      recentTests.length > 0
        ? recentTests.reduce((sum, test) => sum + test.percentage, 0) / recentTests.length
        : 0

    const previousAvg =
      previousTests.length > 0
        ? previousTests.reduce((sum, test) => sum + test.percentage, 0) / previousTests.length
        : 0

    const improvementRate = previousAvg > 0 ? ((recentAvg - previousAvg) / previousAvg) * 100 : 0

    // Get last test date
    const lastTestDate = allTests.length > 0 ? allTests[0].submittedAt : null

    // Calculate this week's statistics
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const testsThisWeek = allTests.filter(
      (test) => test.submittedAt && test.submittedAt >= oneWeekAgo
    ).length

    const thisWeekTests = allTests.filter(
      (test) => test.submittedAt && test.submittedAt >= oneWeekAgo
    )

    const questionsThisWeek = thisWeekTests.reduce((sum, test) => sum + test.questionCount, 0)

    const studyTimeThisWeek = Math.round(
      thisWeekTests.reduce((sum, test) => sum + (test.timeSpent || 0), 0) / 60
    )

    // Get upcoming tests (scheduled test sessions)
    const upcomingTestSessions = await prisma.testSession.findMany({
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
    })

    const upcomingTests = upcomingTestSessions.map((session) => ({
      id: session.id,
      title: session.testTemplate?.title || 'Upcoming Test',
      scheduledDate: session.createdAt, // Mock - should have a scheduledDate field
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
          details: validationResult.error.errors,
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

    // Calculate week-over-week comparisons
    const twoWeeksAgo = new Date()
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const lastWeekTests = await prisma.testAttempt.findMany({
      where: {
        freeUserId: userId,
        status: 'COMPLETED',
        submittedAt: {
          gte: twoWeeksAgo,
          lt: oneWeekAgo,
        },
      },
    })

    const lastWeekAvg =
      lastWeekTests.length > 0
        ? lastWeekTests.reduce((sum, test) => sum + test.percentage, 0) / lastWeekTests.length
        : 0

    const thisWeekTests = await prisma.testAttempt.findMany({
      where: {
        freeUserId: userId,
        status: 'COMPLETED',
        submittedAt: {
          gte: oneWeekAgo,
        },
      },
    })

    const thisWeekAvg =
      thisWeekTests.length > 0
        ? thisWeekTests.reduce((sum, test) => sum + test.percentage, 0) / thisWeekTests.length
        : 0

    const weekOverWeekChange =
      lastWeekAvg > 0 ? ((thisWeekAvg - lastWeekAvg) / lastWeekAvg) * 100 : 0

    return NextResponse.json(
      {
        success: true,
        data: {
          ...stats,
          weekOverWeek: {
            testsChange: thisWeekTests.length - lastWeekTests.length,
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
