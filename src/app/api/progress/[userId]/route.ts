import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { validateUserSession } from '@/lib/auth/config'
import { withRateLimit } from '@/lib/middleware/rateLimit'
import { logger } from '@/lib/utils/logger'

interface RouteParams {
  params: Promise<{
    userId: string
  }>
}

// Validation schema for progress filters
const progressFiltersSchema = z.object({
  curriculum: z.string().optional(),
  grade: z.string().optional(),
  subject: z.string().optional(),
  topics: z.array(z.string()).or(z.string()).optional(),
  timeFrame: z.enum(['week', 'month', 'quarter', 'year', 'all']).default('all'),
  includeInactive: z.boolean().default(false),
  groupBy: z.enum(['topic', 'difficulty', 'type', 'curriculum']).default('topic'),
  sortBy: z
    .enum(['accuracy', 'masteryScore', 'lastPracticed', 'totalQuestions'])
    .default('masteryScore'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

// Helper function to check user access permissions
function checkUserAccess(requestingUser: any, targetUserId: string): boolean {
  // Users can access their own progress
  if (requestingUser.id === targetUserId) {
    return true
  }

  // Admin and teachers can access any user's progress
  if (['ADMIN', 'TEACHER'].includes(requestingUser.role)) {
    return true
  }

  // Parents can access their children's progress (would need parent-child relationship)
  if (requestingUser.role === 'PARENT') {
    // TODO: Implement parent-child relationship check
    return false
  }

  return false
}

// Helper function to calculate time frame filter
function getTimeFrameFilter(timeFrame: string): Date | undefined {
  const now = new Date()

  switch (timeFrame) {
    case 'week':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    case 'month':
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    case 'quarter':
      return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
    case 'year':
      return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
    case 'all':
    default:
      return undefined
  }
}

// Helper function to calculate comprehensive progress metrics
async function calculateProgressMetrics(userId: string, freeUserId: string | null, filters: any) {
  const timeFrameDate = getTimeFrameFilter(filters.timeFrame)

  // Build base filters
  const baseWhere: any = {
    ...(freeUserId ? { freeUserId } : { userId }),
  }

  if (filters.curriculum) baseWhere.curriculum = filters.curriculum
  if (filters.grade) baseWhere.grade = filters.grade
  if (filters.topics) {
    const topics = Array.isArray(filters.topics) ? filters.topics : [filters.topics]
    baseWhere.topic = { in: topics }
  }

  if (timeFrameDate) {
    baseWhere.lastPracticed = { gte: timeFrameDate }
  }

  // Get user progress data
  const userProgress = await prisma.userProgress.findMany({
    where: baseWhere,
    orderBy: {
      [filters.sortBy]: filters.sortOrder,
    },
  })

  // Get recent test sessions for context
  const recentTestSessions = await prisma.testSession.findMany({
    where: {
      ...(freeUserId ? { freeUserId } : { userId }),
      status: 'COMPLETED',
      ...(timeFrameDate && { submittedAt: { gte: timeFrameDate } }),
    },
    include: {
      testTemplate: {
        select: {
          title: true,
          type: true,
          topics: true,
          difficulty: true,
        },
      },
    },
    orderBy: { submittedAt: 'desc' },
    take: 10,
  })

  // Get recent question responses for detailed analysis
  const recentResponses = await prisma.userQuestionResponse.findMany({
    where: {
      ...(freeUserId ? { freeUserId } : { userId }),
      ...(timeFrameDate && { answeredAt: { gte: timeFrameDate } }),
    },
    include: {
      question: {
        select: {
          topic: true,
          difficulty: true,
          type: true,
          marks: true,
        },
      },
    },
    orderBy: { answeredAt: 'desc' },
    take: 100, // Last 100 responses for analysis
  })

  return { userProgress, recentTestSessions, recentResponses }
}

// Helper function to generate insights and recommendations
function generateInsights(userProgress: any[], recentTestSessions: any[], recentResponses: any[]) {
  const insights = {
    strengths: [] as string[],
    weaknesses: [] as string[],
    improvements: [] as string[],
    recommendations: [] as string[],
    studyPatterns: {} as any,
    performanceTrends: {} as any,
  }

  // Analyze strengths and weaknesses
  userProgress.forEach((progress) => {
    if (progress.accuracy >= 80 && progress.masteryScore >= 75) {
      insights.strengths.push(progress.topic)
    } else if (progress.accuracy < 50 || progress.masteryScore < 40) {
      insights.weaknesses.push(progress.topic)
    }
  })

  // Analyze improvement trends
  const improvingTopics = userProgress.filter((p) => p.improvementRate > 10)
  insights.improvements = improvingTopics.map((p) => p.topic)

  // Generate recommendations
  if (insights.weaknesses.length > 0) {
    insights.recommendations.push(
      `Focus on improving: ${insights.weaknesses.slice(0, 3).join(', ')}`
    )
  }

  if (insights.strengths.length > 3) {
    insights.recommendations.push('Continue practicing strong topics to maintain mastery')
  }

  // Analyze study patterns
  if (recentResponses.length > 0) {
    const responsesByDay = recentResponses.reduce(
      (acc, response) => {
        const day = response.answeredAt.toISOString().split('T')[0]
        acc[day] = (acc[day] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    insights.studyPatterns = {
      averageQuestionsPerDay:
        (Object.values(responsesByDay) as number[]).reduce((sum, count) => sum + count, 0) /
        Object.keys(responsesByDay).length,
      studyDaysPerWeek:
        Object.keys(responsesByDay).length /
        (recentResponses.length > 0
          ? Math.ceil(
              (Date.now() - recentResponses[recentResponses.length - 1].answeredAt.getTime()) /
                (7 * 24 * 60 * 60 * 1000)
            )
          : 1),
      mostActiveDay: Object.entries(responsesByDay).reduce(
        (max, [day, count]: [string, number]) =>
          (count as number) > max.count ? { day, count: count as number } : max,
        { day: '', count: 0 }
      ),
    }
  }

  // Analyze performance trends
  if (recentTestSessions.length > 0) {
    const avgScore =
      recentTestSessions.reduce((sum, session) => sum + (session.percentage || 0), 0) /
      recentTestSessions.length
    const trend =
      recentTestSessions.length > 1
        ? (recentTestSessions[0].percentage || 0) -
          (recentTestSessions[recentTestSessions.length - 1].percentage || 0)
        : 0

    insights.performanceTrends = {
      averageScore: Math.round(avgScore * 100) / 100,
      trend: trend > 5 ? 'improving' : trend < -5 ? 'declining' : 'stable',
      recentTestCount: recentTestSessions.length,
      bestScore: Math.max(...recentTestSessions.map((s) => s.percentage || 0)),
    }
  }

  return insights
}

// GET /api/progress/[userId] - Get user progress data
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = await params
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const filters = progressFiltersSchema.parse({
      curriculum: searchParams.get('curriculum') || undefined,
      grade: searchParams.get('grade') || undefined,
      subject: searchParams.get('subject') || undefined,
      topics: searchParams.get('topics')?.split(',') || undefined,
      timeFrame: (searchParams.get('timeFrame') as any) || 'all',
      includeInactive: searchParams.get('includeInactive') === 'true',
      groupBy: (searchParams.get('groupBy') as any) || 'topic',
      sortBy: (searchParams.get('sortBy') as any) || 'masteryScore',
      sortOrder: (searchParams.get('sortOrder') as any) || 'desc',
    })

    const session = await validateUserSession(request)
    if (!session.valid) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTH_REQUIRED' },
        { status: 401 }
      )
    }

    // UserSession has properties directly, not nested in user object
    const user = {
      id: session.userId!,
      role: session.role!,
      email: session.email!,
      name: session.name!,
    }

    // Check access permissions
    if (!checkUserAccess(user, userId)) {
      return NextResponse.json({ error: 'Access denied', code: 'FORBIDDEN' }, { status: 403 })
    }

    // Rate limiting
    const rateLimitResult = await withRateLimit(request, {
      identifier: user.id,
      limit: 100, // 100 progress requests per hour
      window: 3600000,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', code: 'RATE_LIMIT_EXCEEDED' },
        { status: 429 }
      )
    }

    // Determine if this is a free user or regular user
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true, name: true, email: true },
    })

    const freeUser = targetUser
      ? null
      : await prisma.freeUser.findUnique({
          where: { id: userId },
          select: { id: true, name: true, email: true, grade: true, curriculum: true },
        })

    if (!targetUser && !freeUser) {
      return NextResponse.json({ error: 'User not found', code: 'USER_NOT_FOUND' }, { status: 404 })
    }

    // Calculate progress metrics
    const { userProgress, recentTestSessions, recentResponses } = await calculateProgressMetrics(
      targetUser?.id || '',
      freeUser?.id || null,
      filters
    )

    // Group progress data according to groupBy parameter
    // Type the grouped progress explicitly to avoid 'unknown' type errors
    type UserProgressItem = (typeof userProgress)[number]
    const groupedProgress = userProgress.reduce(
      (acc, progress) => {
        let key: string

        switch (filters.groupBy) {
          case 'difficulty':
            key = progress.currentLevel
            break
          case 'curriculum':
            key = progress.curriculum
            break
          case 'topic':
          default:
            key = progress.topic
            break
        }

        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(progress)
        return acc
      },
      {} as Record<string, UserProgressItem[]>
    )

    // Calculate aggregate statistics
    const totalQuestions = userProgress.reduce((sum, p) => sum + p.totalQuestions, 0)
    const totalCorrect = userProgress.reduce((sum, p) => sum + p.correctAnswers, 0)
    const overallAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0
    const averageMastery =
      userProgress.length > 0
        ? userProgress.reduce((sum, p) => sum + p.masteryScore, 0) / userProgress.length
        : 0

    // Generate insights and recommendations
    const insights = generateInsights(userProgress, recentTestSessions, recentResponses)

    // Calculate learning velocity (questions answered per day)
    const learningVelocity =
      recentResponses.length > 0
        ? {
            questionsPerDay:
              recentResponses.length /
              Math.max(
                1,
                Math.ceil(
                  (Date.now() - recentResponses[recentResponses.length - 1].answeredAt.getTime()) /
                    (24 * 60 * 60 * 1000)
                )
              ),
            accuracy:
              (recentResponses.filter((r) => r.isCorrect).length / recentResponses.length) * 100,
            averageTime:
              recentResponses.reduce((sum, r) => sum + (r.timeSpent || 0), 0) /
              recentResponses.length,
          }
        : null

    const progressData = {
      user: targetUser
        ? {
            id: targetUser.id,
            name: targetUser.name,
            email: targetUser.email,
            role: targetUser.role,
          }
        : {
            id: freeUser!.id,
            name: freeUser!.name,
            email: freeUser!.email,
            grade: freeUser!.grade,
            curriculum: freeUser!.curriculum,
            type: 'free_user',
          },

      summary: {
        totalTopics: userProgress.length,
        totalQuestions,
        totalCorrect,
        overallAccuracy: Math.round(overallAccuracy * 100) / 100,
        averageMastery: Math.round(averageMastery * 100) / 100,
        strongTopics: insights.strengths.length,
        weakTopics: insights.weaknesses.length,
        improvingTopics: insights.improvements.length,
        lastActivity:
          userProgress.length > 0
            ? Math.max(...userProgress.map((p) => new Date(p.lastPracticed || 0).getTime()))
            : null,
      },

      progressByTopic: (Object.entries(groupedProgress) as [string, UserProgressItem[]][]).map(
        ([key, progressList]) => ({
          [filters.groupBy]: key,
          topics: progressList.map((p) => ({
            topic: p.topic,
            subtopic: p.subtopic,
            curriculum: p.curriculum,
            grade: p.grade,
            totalQuestions: p.totalQuestions,
            correctAnswers: p.correctAnswers,
            accuracy: Math.round(p.accuracy * 100) / 100,
            masteryScore: Math.round(p.masteryScore * 100) / 100,
            currentLevel: p.currentLevel,
            averageTime: p.averageTime,
            improvementRate: Math.round(p.improvementRate * 100) / 100,
            lastPracticed: p.lastPracticed,
            recommendedNext: p.recommendedNext,
            weakAreas: p.weakAreas,
            strongAreas: p.strongAreas,
          })),
          aggregateStats: {
            totalQuestions: progressList.reduce((sum, p) => sum + p.totalQuestions, 0),
            averageAccuracy:
              progressList.reduce((sum, p) => sum + p.accuracy, 0) / progressList.length,
            averageMastery:
              progressList.reduce((sum, p) => sum + p.masteryScore, 0) / progressList.length,
          },
        })
      ),

      recentActivity: {
        testSessions: recentTestSessions.map((session) => ({
          id: session.id,
          title: session.testTemplate?.title,
          type: session.testTemplate?.type,
          topics: session.testTemplate?.topics,
          difficulty: session.testTemplate?.difficulty,
          score: session.totalScore,
          percentage: session.percentage,
          submittedAt: session.submittedAt,
          timeSpent: session.timeSpent,
        })),

        questionResponses: recentResponses.slice(0, 20).map((response) => ({
          questionId: response.questionId,
          topic: response.question.topic,
          difficulty: response.question.difficulty,
          type: response.question.type,
          isCorrect: response.isCorrect,
          timeSpent: response.timeSpent,
          confidence: response.confidence,
          answeredAt: response.answeredAt,
        })),

        learningVelocity,
      },

      insights,

      recommendations: {
        immediate: insights.recommendations,
        studyPlan: userProgress
          .filter((p) => p.masteryScore < 70)
          .sort((a, b) => a.masteryScore - b.masteryScore)
          .slice(0, 5)
          .map((p) => ({
            topic: p.topic,
            currentMastery: p.masteryScore,
            targetMastery: 80,
            estimatedHours: Math.ceil((80 - p.masteryScore) / 10), // Rough estimate
            priority: p.masteryScore < 40 ? 'high' : p.masteryScore < 60 ? 'medium' : 'low',
          })),
      },
    }

    // Log progress access
    logger.info('User progress accessed:', {
      requestingUserId: user.id,
      targetUserId: userId,
      filters,
      progressTopics: userProgress.length,
      timeFrame: filters.timeFrame,
    })

    return NextResponse.json({
      success: true,
      data: progressData,
      meta: {
        filters,
        generatedAt: new Date().toISOString(),
        dataSource: targetUser ? 'registered_user' : 'free_user',
      },
    })
  } catch (error) {
    logger.error('Error fetching user progress:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid query parameters',
          code: 'VALIDATION_ERROR',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to fetch user progress',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}
