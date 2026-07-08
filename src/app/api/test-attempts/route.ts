import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const runtime = 'nodejs'

/**
 * POST /api/test-attempts
 * Submit a completed test and create TestAttempt record
 * Body: {
 *   testSessionId: string,
 *   freeUserId?: string,
 *   score: number,
 *   percentage: number,
 *   topicWiseScore: object,
 *   answers: array
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      testSessionId,
      testTemplateId,
      freeUserId,
      score,
      percentage,
      topicWiseScore,
      answers,
      timeSpent,
    } = body

    // Get authenticated user if available
    const session = await auth()
    const userId = session?.user?.id

    if (!userId && !freeUserId) {
      return NextResponse.json(
        {
          success: false,
          error: 'User identification required',
        },
        { status: 401 }
      )
    }

    // Update test session if provided
    if (testSessionId) {
      await prisma.test_sessions.update({
        where: { id: testSessionId },
        data: {
          status: 'COMPLETED',
          totalScore: score,
          percentage,
          submittedAt: new Date(),
          timeSpent: timeSpent || 0,
        },
      })
    }

    // Calculate topic-wise analysis
    const topicsAnalyzed = topicWiseScore || {}
    const strengthAreas = Object.entries(topicsAnalyzed)
      .filter(([_, data]: [string, any]) => data.percentage >= 70)
      .map(([topic]) => topic)

    const weaknessAreas = Object.entries(topicsAnalyzed)
      .filter(([_, data]: [string, any]) => data.percentage < 50)
      .map(([topic]) => topic)

    // Create test attempt record
    const testAttempt = await prisma.test_attempts.create({
      data: {
        id: `ta_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        freeUserId: freeUserId || userId,
        testTemplateId,
        title: body.title ?? 'Test Attempt',
        questionCount: body.questionCount ?? 0,
        totalMarks: body.totalMarks ?? 0,
        score,
        percentage,
        topicWiseScore: topicsAnalyzed,
        strengthAreas,
        weaknessAreas,
        timeSpent: timeSpent || 0,
        rank: null, // Will be calculated later
      },
    })

    // Update free user statistics
    if (freeUserId) {
      const existingUser = await prisma.free_users.findUnique({
        where: { id: freeUserId },
      })

      if (existingUser) {
        await prisma.free_users.update({
          where: { id: freeUserId },
          data: {
            totalTestsTaken: (existingUser.totalTestsTaken || 0) + 1,
            averageScore: existingUser.averageScore
              ? (existingUser.averageScore + score) / 2
              : score,
            bestScore: Math.max(existingUser.bestScore || 0, score),
            weakestTopics: weaknessAreas,
            strongestTopics: strengthAreas,
            lastActiveDate: new Date(),
          },
        })
      }
    }

    // Create achievement if it's first test
    if (freeUserId) {
      const attemptCount = await prisma.test_attempts.count({
        where: { freeUserId },
      })

      if (attemptCount === 1) {
        await prisma.achievements.create({
          data: {
            id: `ach_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
            freeUserId,
            type: 'FIRST_TEST',
            title: 'First Test Completed',
            description: 'You completed your first test!',
            points: 10,
            currentProgress: 1,
            targetProgress: 1,
            isCompleted: true,
            earnedAt: new Date(),
          },
        })
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        attemptId: testAttempt.id,
        score: testAttempt.score,
        percentage: testAttempt.percentage,
        strengthAreas,
        weaknessAreas,
        rank: testAttempt.rank,
      },
    })
  } catch (error) {
    console.error('Error creating test attempt:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create test attempt',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/test-attempts
 * Get user's test attempts history
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const freeUserId = searchParams.get('freeUserId')

    const session = await auth()
    const userId = session?.user?.id

    if (!userId && !freeUserId) {
      return NextResponse.json(
        {
          success: false,
          error: 'User identification required',
        },
        { status: 401 }
      )
    }

    const attempts = await prisma.test_attempts.findMany({
      where: {
        freeUserId: freeUserId || userId,
      },
      include: {
        test_templates: {
          select: {
            title: true,
            type: true,
            category: true,
            difficulty: true,
            totalQuestions: true,
            totalMarks: true,
          },
        },
      },
      orderBy: {
        startedAt: 'desc',
      },
      take: 50,
    })

    return NextResponse.json({
      success: true,
      data: {
        attempts: attempts.map((attempt) => ({
          id: attempt.id,
          testTemplate: attempt.test_templates || { title: 'Practice Test', type: 'PRACTICE' },
          score: attempt.score,
          percentage: attempt.percentage,
          rank: attempt.rank,
          strengthAreas: attempt.strengthAreas,
          weaknessAreas: attempt.weaknessAreas,
          timeSpent: attempt.timeSpent,
          createdAt: attempt.startedAt.toISOString(),
        })),
        count: attempts.length,
      },
    })
  } catch (error) {
    console.error('Error fetching test attempts:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch test attempts',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
