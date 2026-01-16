import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: Promise<{ childId: string }>
}

/**
 * GET /api/parent/children/[childId]/tests
 * Fetch test attempts and performance for a specific child
 *
 * Query params:
 * - status: Filter by status (all, completed, pending, in_progress)
 * - period: Filter by period (week, month, year, all)
 * - limit: Number of results (default 20)
 * - offset: Pagination offset (default 0)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
    }

    const { childId } = await params
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'all'
    const period = searchParams.get('period') || 'all'
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
    const offset = parseInt(searchParams.get('offset') || '0')

    // Verify parent has access to this child
    const parentChildRelation = await prisma.parent_child_relationships.findFirst({
      where: {
        parentId: session.user.id,
        childId: childId,
      },
      include: {
        child: {
          select: { id: true, name: true, email: true, currentClass: true },
        },
      },
    })

    if (!parentChildRelation) {
      return NextResponse.json(
        { success: false, error: 'You do not have access to this child\'s data' },
        { status: 403 }
      )
    }

    // Calculate date filter
    const dateFilter = getDateFilter(period)

    // Build status filter
    const statusFilter = (() => {
      switch (status) {
        case 'completed':
          return { status: 'COMPLETED' as const }
        case 'pending':
          return { status: 'NOT_STARTED' as const }
        case 'in_progress':
          return { status: 'IN_PROGRESS' as const }
        default:
          return {}
      }
    })()

    // Fetch test attempts
    const testAttempts = await prisma.test_attempts.findMany({
      where: {
        freeUserId: childId,
        ...statusFilter,
        ...(dateFilter && { startedAt: dateFilter }),
      },
      orderBy: { startedAt: 'desc' },
      skip: offset,
      take: limit,
    })

    // Transform test data
    const tests = testAttempts.map((attempt) => ({
      id: attempt.id,
      title: attempt.title,
      topics: attempt.topics,
      questionCount: attempt.questionCount,
      timeLimit: attempt.timeLimit,
      score: attempt.score,
      totalMarks: attempt.totalMarks,
      percentage: attempt.percentage,
      accuracy: attempt.accuracy,
      consistency: attempt.consistency,
      timeSpent: attempt.timeSpent,
      status: attempt.status,
      statusLabel: getStatusLabel(attempt.status),
      startedAt: attempt.startedAt.toISOString(),
      submittedAt: attempt.submittedAt?.toISOString(),
      topicWiseScore: attempt.topicWiseScore,
      strengthAreas: attempt.strengthAreas,
      weaknessAreas: attempt.weaknessAreas,
      recommendations: attempt.recommendations,
      improvementAreas: attempt.improvementAreas,
      grade: calculateGrade(attempt.percentage),
    }))

    // Calculate overall statistics
    const allAttempts = await prisma.test_attempts.findMany({
      where: {
        freeUserId: childId,
        status: 'COMPLETED',
        ...(dateFilter && { startedAt: dateFilter }),
      },
      select: {
        score: true,
        totalMarks: true,
        percentage: true,
        accuracy: true,
        timeSpent: true,
        topicWiseScore: true,
        strengthAreas: true,
        weaknessAreas: true,
      },
    })

    const stats = calculateTestStats(allAttempts)

    // Get upcoming tests from enrolled courses
    const enrollments = await prisma.enrollments.findMany({
      where: { studentId: childId },
      select: { courseId: true },
    })

    const courseIds = enrollments.map((e) => e.courseId)

    const upcomingTests = await prisma.tests.findMany({
      where: {
        courseId: { in: courseIds },
        scheduledFor: { gte: new Date() },
      },
      orderBy: { scheduledFor: 'asc' },
      take: 5,
      include: {
        course: { select: { id: true, name: true } },
      },
    })

    // Calculate performance trend
    const performanceTrend = await calculatePerformanceTrend(childId)

    // Aggregate topic-wise performance
    const topicPerformance = aggregateTopicPerformance(allAttempts)

    return NextResponse.json({
      success: true,
      data: {
        child: parentChildRelation.child,
        tests,
        stats,
        performanceTrend,
        topicPerformance,
        upcomingTests: upcomingTests.map((test) => ({
          id: test.id,
          title: test.title,
          course: test.course,
          scheduledFor: test.scheduledFor?.toISOString(),
          duration: test.duration,
          totalMarks: test.totalMarks,
          passingMarks: test.passingMarks,
        })),
        pagination: {
          limit,
          offset,
          hasMore: tests.length === limit,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching child tests:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch test data' },
      { status: 500 }
    )
  }
}

function getDateFilter(period: string): { gte: Date } | null {
  const now = new Date()

  switch (period) {
    case 'week':
      const weekAgo = new Date(now)
      weekAgo.setDate(now.getDate() - 7)
      return { gte: weekAgo }
    case 'month':
      const monthAgo = new Date(now)
      monthAgo.setMonth(now.getMonth() - 1)
      return { gte: monthAgo }
    case 'year':
      const yearAgo = new Date(now)
      yearAgo.setFullYear(now.getFullYear() - 1)
      return { gte: yearAgo }
    default:
      return null
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'COMPLETED':
      return 'Completed'
    case 'IN_PROGRESS':
      return 'In Progress'
    case 'NOT_STARTED':
      return 'Not Started'
    case 'EXPIRED':
      return 'Expired'
    default:
      return status
  }
}

function calculateGrade(percentage: number): { letter: string; color: string } {
  if (percentage >= 90) return { letter: 'A+', color: 'green' }
  if (percentage >= 80) return { letter: 'A', color: 'green' }
  if (percentage >= 70) return { letter: 'B+', color: 'blue' }
  if (percentage >= 60) return { letter: 'B', color: 'blue' }
  if (percentage >= 50) return { letter: 'C', color: 'yellow' }
  if (percentage >= 40) return { letter: 'D', color: 'orange' }
  return { letter: 'F', color: 'red' }
}

interface TestAttemptStats {
  score: number
  totalMarks: number
  percentage: number
  accuracy: number | null
  timeSpent: number
  topicWiseScore: unknown
  strengthAreas: unknown
  weaknessAreas: unknown
}

interface Stats {
  totalTests: number
  avgScore: number
  avgPercentage: number
  avgAccuracy: number
  highestScore: number
  lowestScore: number
  totalTimeSpent: number
  avgTimePerTest: number
  gradeDistribution: Record<string, number>
}

function calculateTestStats(attempts: TestAttemptStats[]): Stats {
  if (attempts.length === 0) {
    return {
      totalTests: 0,
      avgScore: 0,
      avgPercentage: 0,
      avgAccuracy: 0,
      highestScore: 0,
      lowestScore: 0,
      totalTimeSpent: 0,
      avgTimePerTest: 0,
      gradeDistribution: { 'A+': 0, A: 0, 'B+': 0, B: 0, C: 0, D: 0, F: 0 },
    }
  }

  const totalTests = attempts.length
  const totalScore = attempts.reduce((acc, a) => acc + a.score, 0)
  const totalPercentage = attempts.reduce((acc, a) => acc + a.percentage, 0)
  const totalAccuracy = attempts.reduce((acc, a) => acc + (a.accuracy || 0), 0)
  const totalTimeSpent = attempts.reduce((acc, a) => acc + a.timeSpent, 0)

  const percentages = attempts.map((a) => a.percentage)
  const highestScore = Math.max(...percentages)
  const lowestScore = Math.min(...percentages)

  // Calculate grade distribution
  const gradeDistribution: Record<string, number> = {
    'A+': 0,
    A: 0,
    'B+': 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0,
  }

  attempts.forEach((a) => {
    const grade = calculateGrade(a.percentage)
    gradeDistribution[grade.letter]++
  })

  return {
    totalTests,
    avgScore: Math.round(totalScore / totalTests),
    avgPercentage: Math.round(totalPercentage / totalTests),
    avgAccuracy: Math.round(totalAccuracy / totalTests),
    highestScore,
    lowestScore,
    totalTimeSpent,
    avgTimePerTest: Math.round(totalTimeSpent / totalTests),
    gradeDistribution,
  }
}

interface TrendData {
  month: string
  year: number
  testsCompleted: number
  avgPercentage: number
}

async function calculatePerformanceTrend(childId: string): Promise<TrendData[]> {
  const trend: TrendData[] = []
  const now = new Date()

  for (let i = 5; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999)

    const attempts = await prisma.test_attempts.findMany({
      where: {
        freeUserId: childId,
        status: 'COMPLETED',
        submittedAt: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
      select: { percentage: true },
    })

    const monthName = monthStart.toLocaleString('en-US', { month: 'short' })
    const avgPercentage =
      attempts.length > 0
        ? Math.round(attempts.reduce((acc, a) => acc + a.percentage, 0) / attempts.length)
        : 0

    trend.push({
      month: monthName,
      year: monthStart.getFullYear(),
      testsCompleted: attempts.length,
      avgPercentage,
    })
  }

  return trend
}

interface TopicScore {
  topic: string
  score: number
  total: number
  percentage: number
}

interface TopicPerformance {
  topic: string
  avgPercentage: number
  attempts: number
  trend: 'improving' | 'declining' | 'stable'
}

function aggregateTopicPerformance(attempts: TestAttemptStats[]): TopicPerformance[] {
  const topicMap = new Map<string, { scores: number[]; totals: number[] }>()

  attempts.forEach((attempt) => {
    const topicScores = attempt.topicWiseScore as TopicScore[] | null
    if (!topicScores || !Array.isArray(topicScores)) return

    topicScores.forEach((ts) => {
      const existing = topicMap.get(ts.topic) || { scores: [], totals: [] }
      existing.scores.push(ts.score)
      existing.totals.push(ts.total)
      topicMap.set(ts.topic, existing)
    })
  })

  const topicPerformance: TopicPerformance[] = []

  topicMap.forEach((data, topic) => {
    const avgScore = data.scores.reduce((a, b) => a + b, 0) / data.scores.length
    const avgTotal = data.totals.reduce((a, b) => a + b, 0) / data.totals.length
    const avgPercentage = avgTotal > 0 ? Math.round((avgScore / avgTotal) * 100) : 0

    // Calculate trend based on recent vs older scores
    let trend: 'improving' | 'declining' | 'stable' = 'stable'
    if (data.scores.length >= 2) {
      const midpoint = Math.floor(data.scores.length / 2)
      const olderScores = data.scores.slice(0, midpoint)
      const recentScores = data.scores.slice(midpoint)

      const olderAvg = olderScores.reduce((a, b) => a + b, 0) / olderScores.length
      const recentAvg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length

      if (recentAvg > olderAvg + 5) trend = 'improving'
      else if (recentAvg < olderAvg - 5) trend = 'declining'
    }

    topicPerformance.push({
      topic,
      avgPercentage,
      attempts: data.scores.length,
      trend,
    })
  })

  // Sort by average percentage (lowest first to highlight areas needing improvement)
  return topicPerformance.sort((a, b) => a.avgPercentage - b.avgPercentage)
}
