import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { unstable_cache } from 'next/cache'

// Query parameter validation schema
const querySchema = z.object({
  userId: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).default(10),
  offset: z.coerce.number().min(0).default(0),
  testType: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
})

interface RecentSessionResponse {
  id: string
  type: string
  title: string
  chapter: string | null
  duration: number
  score: number
  percentage: number
  date: Date
  questions: {
    total: number
    correct: number
    skipped: number
  }
  topicWise: Array<{
    topic: string
    score: number
  }>
}

/**
 * Fetch recent test sessions for a user
 */
async function getRecentSessions(
  userId: string,
  limit: number = 10,
  offset: number = 0,
  testType?: string,
  startDate?: string,
  endDate?: string
): Promise<RecentSessionResponse[]> {
  try {
    // Build where clause
    const whereClause: any = {
      freeUserId: userId,
      status: 'COMPLETED',
    }

    // Add test type filter if provided
    if (testType) {
      whereClause.difficulty = testType
    }

    // Add date range filter
    if (startDate || endDate) {
      whereClause.submittedAt = {}
      if (startDate) {
        whereClause.submittedAt.gte = new Date(startDate)
      }
      if (endDate) {
        whereClause.submittedAt.lte = new Date(endDate)
      }
    }

    // Fetch test attempts
    const testAttempts = await prisma.test_attempts.findMany({
      where: whereClause,
      orderBy: { submittedAt: 'desc' },
      take: limit,
      skip: offset,
      include: {
        testTemplate: {
          select: {
            title: true,
            category: true,
            topics: true,
          },
        },
      },
    })

    // Transform to response format
    const sessions: RecentSessionResponse[] = testAttempts.map((attempt) => {
      // Parse topic-wise scores
      const topicWiseScores: Array<{ topic: string; score: number }> = []
      if (attempt.topicWiseScore && typeof attempt.topicWiseScore === 'object') {
        const topicScores = attempt.topicWiseScore as Record<string, number>
        Object.entries(topicScores).forEach(([topic, score]) => {
          topicWiseScores.push({ topic, score: Math.round(score) })
        })
      }

      // Extract chapter from topics or title
      let chapter: string | null = null
      if (attempt.testTemplate?.topics && Array.isArray(attempt.testTemplate.topics)) {
        const topics = attempt.testTemplate.topics as string[]
        chapter = topics[0] || null
      } else if (attempt.topics && Array.isArray(attempt.topics)) {
        const topics = attempt.topics as string[]
        chapter = topics[0] || null
      }

      // Calculate questions breakdown
      const totalQuestions = attempt.questionCount
      const correctQuestions = Math.round((attempt.percentage / 100) * totalQuestions)
      const skippedQuestions = 0 // Mock - should be tracked separately

      return {
        id: attempt.id,
        type: attempt.testTemplate?.category || attempt.difficulty || 'PRACTICE',
        title: attempt.title || attempt.testTemplate?.title || 'Test',
        chapter,
        duration: attempt.timeSpent || 0,
        score: attempt.score,
        percentage: Math.round(attempt.percentage * 10) / 10,
        date: attempt.submittedAt || new Date(),
        questions: {
          total: totalQuestions,
          correct: correctQuestions,
          skipped: skippedQuestions,
        },
        topicWise: topicWiseScores,
      }
    })

    return sessions
  } catch (error) {
    console.error('Error fetching recent sessions:', error)
    throw error
  }
}

/**
 * GET /api/user/sessions/recent
 * Fetch recent test sessions with pagination and filtering
 */
export const GET = withAuth(async (request: NextRequest, session) => {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const userIdParam = searchParams.get('userId')
    const limitParam = searchParams.get('limit') || '10'
    const offsetParam = searchParams.get('offset') || '0'
    const testType = searchParams.get('testType') || undefined
    const startDate = searchParams.get('startDate') || undefined
    const endDate = searchParams.get('endDate') || undefined

    // Use authenticated user ID or provided userId
    const userId = userIdParam || session.userId

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required', message: 'userId parameter or authentication required' },
        { status: 400 }
      )
    }

    // Validate query parameters
    const validationResult = querySchema.safeParse({
      userId,
      limit: limitParam,
      offset: offsetParam,
      testType,
      startDate,
      endDate,
    })

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid parameters',
          details: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    const { limit, offset } = validationResult.data

    // Create cached version with shorter TTL (1 minute)
    const getCachedSessions = unstable_cache(
      async (uid: string, lim: number, off: number, type?: string, start?: string, end?: string) =>
        getRecentSessions(uid, lim, off, type, start, end),
      ['user-recent-sessions'],
      { revalidate: 60, tags: [`user-${userId}`] }
    )

    // Fetch sessions
    const sessions = await getCachedSessions(userId, limit, offset, testType, startDate, endDate)

    // Get total count for pagination
    const totalCount = await prisma.test_attempts.count({
      where: {
        freeUserId: userId,
        status: 'COMPLETED',
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: sessions,
        pagination: {
          total: totalCount,
          limit,
          offset,
          hasMore: offset + limit < totalCount,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('API Error - Recent Sessions:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch recent sessions',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
})
