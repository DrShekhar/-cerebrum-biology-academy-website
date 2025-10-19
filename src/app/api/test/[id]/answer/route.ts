import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { withAuth } from '@/lib/auth/middleware'
import { withRateLimit } from '@/lib/middleware/rateLimit'
import { logger } from '@/lib/utils/logger'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

// Validation schema for answer submission
const submitAnswerSchema = z.object({
  questionId: z.string().min(1, 'Question ID is required'),
  selectedAnswer: z.string().min(1, 'Selected answer is required'),
  timeSpent: z.number().min(0, 'Time spent must be non-negative').optional(),
  confidence: z.number().min(1).max(5).optional(), // Confidence level 1-5
  isMarkedForReview: z.boolean().default(false),
  deviceType: z.enum(['mobile', 'tablet', 'desktop']).optional(),
  responseMode: z
    .enum(['TEST_MODE', 'PRACTICE_MODE', 'REVIEW_MODE', 'STUDY_MODE'])
    .default('TEST_MODE'),
})

// Helper function to calculate marks based on answer correctness and marking scheme
function calculateMarks(
  isCorrect: boolean,
  questionMarks: number,
  negativeMarking: boolean
): number {
  if (isCorrect) {
    return questionMarks
  } else if (negativeMarking) {
    return -Math.floor(questionMarks / 4) // Standard NEET negative marking: -1/4 of positive marks
  }
  return 0
}

// Helper function to update user progress
async function updateUserProgress(
  userId: string,
  freeUserId: string | null,
  questionId: string,
  isCorrect: boolean,
  timeSpent: number
) {
  try {
    // Get question details
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: {
        topic: true,
        subtopic: true,
        curriculum: true,
        difficulty: true,
      },
    })

    if (!question) return

    // Find or create user progress record
    const existingProgress = await prisma.userProgress.findFirst({
      where: {
        ...(freeUserId ? { freeUserId } : { userId }),
        topic: question.topic,
        curriculum: question.curriculum,
      },
    })

    if (existingProgress) {
      // Update existing progress
      const newTotal = existingProgress.totalQuestions + 1
      const newCorrect = existingProgress.correctAnswers + (isCorrect ? 1 : 0)
      const newAccuracy = (newCorrect / newTotal) * 100

      // Calculate improvement rate (simplified)
      const oldAccuracy = existingProgress.accuracy
      const improvementRate = newAccuracy - oldAccuracy

      // Update average time
      const totalTime =
        (existingProgress.averageTime || 0) * existingProgress.totalQuestions + timeSpent
      const newAverageTime = Math.round(totalTime / newTotal)

      await prisma.userProgress.update({
        where: { id: existingProgress.id },
        data: {
          totalQuestions: newTotal,
          correctAnswers: newCorrect,
          accuracy: newAccuracy,
          averageTime: newAverageTime,
          improvementRate,
          lastPracticed: new Date(),
          updatedAt: new Date(),
        },
      })
    } else {
      // Create new progress record
      await prisma.userProgress.create({
        data: {
          ...(freeUserId ? { freeUserId } : { userId }),
          topic: question.topic,
          subtopic: question.subtopic,
          curriculum: question.curriculum,
          grade: 'CLASS_12', // Default, should be determined from user context
          totalQuestions: 1,
          correctAnswers: isCorrect ? 1 : 0,
          accuracy: isCorrect ? 100 : 0,
          averageTime: timeSpent,
          improvementRate: 0,
          currentLevel: question.difficulty,
          masteryScore: isCorrect ? 25 : 0, // Start with 25% if correct, 0% if incorrect
          lastPracticed: new Date(),
        },
      })
    }
  } catch (error) {
    logger.error('Error updating user progress:', error)
    // Don't throw error as this is not critical for answer submission
  }
}

// PUT /api/test/[id]/answer - Submit answer for a question
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: testSessionId } = await params
    const body = await request.json()
    const validatedData = submitAnswerSchema.parse(body)

    const authResult = await withAuth(request)
    if (!authResult.success) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTH_REQUIRED' },
        { status: 401 }
      )
    }

    const { user } = authResult

    // Rate limiting for answer submission
    const rateLimitResult = await withRateLimit(request, {
      identifier: user.id,
      limit: 500, // 500 answer submissions per hour
      window: 3600000,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', code: 'RATE_LIMIT_EXCEEDED' },
        { status: 429 }
      )
    }

    // Verify test session exists and belongs to user
    const testSession = await prisma.testSession.findUnique({
      where: {
        id: testSessionId,
        OR: [{ userId: user.id }, { freeUserId: user.id }],
      },
      include: {
        testTemplate: {
          select: {
            negativeMarking: true,
            timeLimit: true,
          },
        },
      },
    })

    if (!testSession) {
      return NextResponse.json(
        { error: 'Test session not found', code: 'NOT_FOUND' },
        { status: 404 }
      )
    }

    // Check if test session is in valid state for answer submission
    if (!['NOT_STARTED', 'IN_PROGRESS', 'PAUSED'].includes(testSession.status)) {
      return NextResponse.json(
        {
          error: 'Cannot submit answer for this test session',
          code: 'INVALID_SESSION_STATE',
        },
        { status: 400 }
      )
    }

    // Check if time has expired
    const now = new Date()
    const timeLimit = testSession.testTemplate?.timeLimit || 60 // Default 60 minutes
    const timeLimitMs = timeLimit * 60 * 1000

    if (testSession.startedAt) {
      const elapsedTime = now.getTime() - testSession.startedAt.getTime()
      if (elapsedTime > timeLimitMs) {
        // Auto-expire the session
        await prisma.testSession.update({
          where: { id: testSessionId },
          data: { status: 'EXPIRED', submittedAt: now },
        })

        return NextResponse.json(
          {
            error: 'Test session has expired',
            code: 'SESSION_EXPIRED',
          },
          { status: 400 }
        )
      }
    }

    // Get question details
    const question = await prisma.question.findUnique({
      where: { id: validatedData.questionId },
      select: {
        id: true,
        correctAnswer: true,
        marks: true,
        topic: true,
        difficulty: true,
        totalAttempts: true,
        correctAttempts: true,
      },
    })

    if (!question) {
      return NextResponse.json(
        { error: 'Question not found', code: 'QUESTION_NOT_FOUND' },
        { status: 404 }
      )
    }

    // Check if answer already exists for this question in this session
    const existingResponse = await prisma.userQuestionResponse.findFirst({
      where: {
        testSessionId,
        questionId: validatedData.questionId,
        ...(user.role === 'STUDENT' ? { userId: user.id } : { freeUserId: user.id }),
      },
    })

    const isCorrect = validatedData.selectedAnswer === question.correctAnswer
    const marksAwarded = calculateMarks(
      isCorrect,
      question.marks,
      testSession.testTemplate?.negativeMarking || false
    )

    let userResponse

    if (existingResponse) {
      // Update existing response
      userResponse = await prisma.userQuestionResponse.update({
        where: { id: existingResponse.id },
        data: {
          selectedAnswer: validatedData.selectedAnswer,
          isCorrect,
          timeSpent: validatedData.timeSpent || existingResponse.timeSpent,
          marksAwarded,
          confidence: validatedData.confidence,
          responseMode: validatedData.responseMode,
          deviceType: validatedData.deviceType,
          answeredAt: new Date(),
        },
      })
    } else {
      // Create new response
      userResponse = await prisma.userQuestionResponse.create({
        data: {
          ...(user.role === 'STUDENT' ? { userId: user.id } : { freeUserId: user.id }),
          questionId: validatedData.questionId,
          testSessionId,
          selectedAnswer: validatedData.selectedAnswer,
          isCorrect,
          timeSpent: validatedData.timeSpent || 0,
          marksAwarded,
          confidence: validatedData.confidence,
          responseMode: validatedData.responseMode,
          deviceType: validatedData.deviceType,
        },
      })

      // Update test session question count
      await prisma.testSession.update({
        where: { id: testSessionId },
        data: {
          questionsAnswered: { increment: 1 },
          ...(validatedData.isMarkedForReview && {
            questionsMarkedForReview: { increment: 1 },
          }),
          // Auto-start the session if not started
          ...(testSession.status === 'NOT_STARTED' && {
            status: 'IN_PROGRESS',
            startedAt: new Date(),
          }),
        },
      })
    }

    // Update question statistics
    await prisma.question.update({
      where: { id: validatedData.questionId },
      data: {
        totalAttempts: { increment: 1 },
        ...(isCorrect && { correctAttempts: { increment: 1 } }),
        lastUsed: new Date(),
      },
    })

    // Update user progress asynchronously
    updateUserProgress(
      user.id,
      user.role === 'STUDENT' ? null : user.id,
      validatedData.questionId,
      isCorrect,
      validatedData.timeSpent || 0
    ).catch((error) => {
      logger.error('Error updating user progress:', error)
    })

    // Calculate current session statistics
    const sessionResponses = await prisma.userQuestionResponse.findMany({
      where: { testSessionId },
      select: {
        isCorrect: true,
        marksAwarded: true,
        timeSpent: true,
      },
    })

    const totalMarks = sessionResponses.reduce((sum, r) => sum + r.marksAwarded, 0)
    const correctCount = sessionResponses.filter((r) => r.isCorrect).length
    const totalTime = sessionResponses.reduce((sum, r) => sum + (r.timeSpent || 0), 0)
    const accuracy =
      sessionResponses.length > 0 ? (correctCount / sessionResponses.length) * 100 : 0

    // Prepare response
    const responseData = {
      success: true,
      data: {
        response: {
          id: userResponse.id,
          questionId: userResponse.questionId,
          selectedAnswer: userResponse.selectedAnswer,
          isCorrect: userResponse.isCorrect,
          marksAwarded: userResponse.marksAwarded,
          timeSpent: userResponse.timeSpent,
          confidence: userResponse.confidence,
          answeredAt: userResponse.answeredAt,
        },
        currentStats: {
          totalQuestions: sessionResponses.length,
          correctAnswers: correctCount,
          totalMarks,
          accuracy: Math.round(accuracy * 100) / 100,
          totalTimeSpent: totalTime,
        },
        feedback: {
          isCorrect,
          marksAwarded,
          // Only show immediate feedback in practice mode
          ...(validatedData.responseMode === 'PRACTICE_MODE' && {
            correctAnswer: question.correctAnswer,
            explanation: 'Explanation will be available after test completion',
          }),
        },
      },
    }

    // Log answer submission
    logger.info('Answer submitted:', {
      testSessionId,
      questionId: validatedData.questionId,
      userId: user.id,
      isCorrect,
      marksAwarded,
      timeSpent: validatedData.timeSpent,
    })

    return NextResponse.json(responseData)
  } catch (error) {
    logger.error('Error submitting answer:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to submit answer',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}

// GET /api/test/[id]/answer - Get current answers for the test session
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: testSessionId } = await params

    const authResult = await withAuth(request)
    if (!authResult.success) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTH_REQUIRED' },
        { status: 401 }
      )
    }

    const { user } = authResult

    // Verify test session exists and belongs to user
    const testSession = await prisma.testSession.findUnique({
      where: {
        id: testSessionId,
        OR: [{ userId: user.id }, { freeUserId: user.id }],
      },
    })

    if (!testSession) {
      return NextResponse.json(
        { error: 'Test session not found', code: 'NOT_FOUND' },
        { status: 404 }
      )
    }

    // Get all responses for this session
    const responses = await prisma.userQuestionResponse.findMany({
      where: { testSessionId },
      include: {
        question: {
          select: {
            id: true,
            topic: true,
            type: true,
            difficulty: true,
            marks: true,
          },
        },
      },
      orderBy: { answeredAt: 'asc' },
    })

    // Calculate statistics
    const totalMarks = responses.reduce((sum, r) => sum + r.marksAwarded, 0)
    const correctCount = responses.filter((r) => r.isCorrect).length
    const totalTime = responses.reduce((sum, r) => sum + (r.timeSpent || 0), 0)
    const accuracy = responses.length > 0 ? (correctCount / responses.length) * 100 : 0

    // Group responses by topic for analysis
    const topicStats = responses.reduce(
      (acc, response) => {
        const topic = response.question.topic
        if (!acc[topic]) {
          acc[topic] = {
            total: 0,
            correct: 0,
            marks: 0,
            timeSpent: 0,
          }
        }
        acc[topic].total += 1
        acc[topic].correct += response.isCorrect ? 1 : 0
        acc[topic].marks += response.marksAwarded
        acc[topic].timeSpent += response.timeSpent || 0
        return acc
      },
      {} as Record<string, any>
    )

    return NextResponse.json({
      success: true,
      data: {
        responses: responses.map((r) => ({
          id: r.id,
          questionId: r.questionId,
          selectedAnswer: r.selectedAnswer,
          isCorrect: r.isCorrect,
          marksAwarded: r.marksAwarded,
          timeSpent: r.timeSpent,
          confidence: r.confidence,
          answeredAt: r.answeredAt,
          question: {
            topic: r.question.topic,
            type: r.question.type,
            difficulty: r.question.difficulty,
            marks: r.question.marks,
          },
        })),
        statistics: {
          totalQuestions: responses.length,
          correctAnswers: correctCount,
          totalMarks,
          accuracy: Math.round(accuracy * 100) / 100,
          totalTimeSpent: totalTime,
          averageTimePerQuestion:
            responses.length > 0 ? Math.round(totalTime / responses.length) : 0,
        },
        topicWiseStats: Object.entries(topicStats).map(([topic, stats]) => ({
          topic,
          totalQuestions: stats.total,
          correctAnswers: stats.correct,
          accuracy: Math.round((stats.correct / stats.total) * 100 * 100) / 100,
          marks: stats.marks,
          timeSpent: stats.timeSpent,
        })),
      },
    })
  } catch (error) {
    logger.error('Error fetching answers:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch answers',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}
