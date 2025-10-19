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

// Validation schema for test submission
const submitTestSchema = z.object({
  forceSubmit: z.boolean().default(false), // Allow force submission even if not all questions answered
  finalAnswers: z
    .array(
      z.object({
        questionId: z.string(),
        selectedAnswer: z.string(),
        timeSpent: z.number().optional(),
        confidence: z.number().min(1).max(5).optional(),
      })
    )
    .optional(), // Final batch of answers if any
  sessionData: z
    .object({
      totalTimeSpent: z.number().min(0),
      browserEvents: z
        .array(
          z.object({
            type: z.string(),
            timestamp: z.string(),
            data: z.any().optional(),
          })
        )
        .optional(),
      deviceInfo: z
        .object({
          userAgent: z.string().optional(),
          screenSize: z.string().optional(),
          browserName: z.string().optional(),
          osName: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
})

// Helper function to calculate comprehensive analytics
async function calculateTestAnalytics(testSessionId: string) {
  try {
    // Get all responses for this session
    const responses = await prisma.userQuestionResponse.findMany({
      where: { testSessionId },
      include: {
        question: {
          select: {
            id: true,
            topic: true,
            subtopic: true,
            difficulty: true,
            marks: true,
            type: true,
          },
        },
      },
      orderBy: { answeredAt: 'asc' },
    })

    if (responses.length === 0) {
      return null
    }

    // Basic performance metrics
    const totalQuestions = responses.length
    const correctAnswers = responses.filter((r) => r.isCorrect).length
    const totalMarks = responses.reduce((sum, r) => sum + r.marksAwarded, 0)
    const totalTime = responses.reduce((sum, r) => sum + (r.timeSpent || 0), 0)
    const accuracy = (correctAnswers / totalQuestions) * 100
    const averageTimePerQ = totalTime / totalQuestions

    // Difficulty-wise analysis
    const difficultyStats = responses.reduce(
      (acc, r) => {
        const diff = r.question.difficulty
        if (!acc[diff]) {
          acc[diff] = { total: 0, correct: 0, time: 0 }
        }
        acc[diff].total += 1
        acc[diff].correct += r.isCorrect ? 1 : 0
        acc[diff].time += r.timeSpent || 0
        return acc
      },
      {} as Record<string, any>
    )

    // Topic-wise performance
    const topicPerformance = responses.reduce(
      (acc, r) => {
        const topic = r.question.topic
        if (!acc[topic]) {
          acc[topic] = {
            total: 0,
            correct: 0,
            marks: 0,
            averageTime: 0,
            accuracy: 0,
          }
        }
        acc[topic].total += 1
        acc[topic].correct += r.isCorrect ? 1 : 0
        acc[topic].marks += r.marksAwarded
        acc[topic].averageTime += r.timeSpent || 0
        return acc
      },
      {} as Record<string, any>
    )

    // Calculate final topic stats
    Object.keys(topicPerformance).forEach((topic) => {
      const stats = topicPerformance[topic]
      stats.accuracy = (stats.correct / stats.total) * 100
      stats.averageTime = stats.averageTime / stats.total
    })

    // Identify strengths and weaknesses
    const strengthTopics = Object.entries(topicPerformance)
      .filter(([_, stats]: [string, any]) => stats.accuracy >= 70)
      .map(([topic, _]) => topic)

    const weaknessTopics = Object.entries(topicPerformance)
      .filter(([_, stats]: [string, any]) => stats.accuracy < 50)
      .map(([topic, _]) => topic)

    // Time distribution analysis
    const timeDistribution = responses.map((r, index) => ({
      questionIndex: index + 1,
      timeSpent: r.timeSpent || 0,
      isCorrect: r.isCorrect,
    }))

    // Answer pattern analysis
    const answerPattern = responses.map((r) => ({
      questionId: r.questionId,
      selectedAnswer: r.selectedAnswer,
      isCorrect: r.isCorrect,
      timeSpent: r.timeSpent || 0,
    }))

    // Behavioral analytics
    const questionsSkipped = responses.filter(
      (r) => !r.selectedAnswer || r.selectedAnswer === ''
    ).length
    const questionsRevisited = 0 // This would need tracking in the frontend

    return {
      totalTime,
      averageTimePerQ,
      questionsAttempted: totalQuestions,
      questionsCorrect: correctAnswers,
      accuracy,
      questionsSkipped,
      questionsRevisited,
      timeDistribution,
      answerPattern,
      easyQuestions: difficultyStats.EASY || { total: 0, correct: 0, time: 0 },
      mediumQuestions: difficultyStats.MEDIUM || { total: 0, correct: 0, time: 0 },
      hardQuestions: difficultyStats.HARD || { total: 0, correct: 0, time: 0 },
      topicPerformance,
      strengthTopics,
      weaknessTopics,
    }
  } catch (error) {
    logger.error('Error calculating test analytics:', error)
    return null
  }
}

// Helper function to calculate percentile rank
async function calculatePercentileRank(
  testTemplateId: string,
  userScore: number,
  totalMarks: number
): Promise<number | null> {
  try {
    // Get all completed sessions for this test template
    const completedSessions = await prisma.testSession.findMany({
      where: {
        testTemplateId,
        status: 'COMPLETED',
        totalScore: { not: null },
      },
      select: { totalScore: true },
    })

    if (completedSessions.length === 0) {
      return null
    }

    const userPercentage = (userScore / totalMarks) * 100
    const allPercentages = completedSessions.map((s) => ((s.totalScore || 0) / totalMarks) * 100)

    const betterScores = allPercentages.filter((score) => score < userPercentage).length
    const percentileRank = (betterScores / allPercentages.length) * 100

    return Math.round(percentileRank * 100) / 100
  } catch (error) {
    logger.error('Error calculating percentile rank:', error)
    return null
  }
}

// POST /api/test/[id]/submit - Submit entire test
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: testSessionId } = await params
    const body = await request.json()
    const validatedData = submitTestSchema.parse(body)

    const authResult = await withAuth(request)
    if (!authResult.success) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTH_REQUIRED' },
        { status: 401 }
      )
    }

    const { user } = authResult

    // Rate limiting
    const rateLimitResult = await withRateLimit(request, {
      identifier: user.id,
      limit: 10, // 10 test submissions per hour
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
            id: true,
            title: true,
            totalQuestions: true,
            totalMarks: true,
            negativeMarking: true,
            timeLimit: true,
            passingMarks: true,
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

    // Check if test is already submitted
    if (testSession.status === 'COMPLETED') {
      return NextResponse.json(
        { error: 'Test already submitted', code: 'ALREADY_SUBMITTED' },
        { status: 400 }
      )
    }

    // Check if test session is in valid state for submission
    if (!['IN_PROGRESS', 'PAUSED', 'NOT_STARTED'].includes(testSession.status)) {
      return NextResponse.json(
        {
          error: 'Cannot submit test in current state',
          code: 'INVALID_SESSION_STATE',
        },
        { status: 400 }
      )
    }

    const submissionTime = new Date()

    // Process final answers if provided
    if (validatedData.finalAnswers && validatedData.finalAnswers.length > 0) {
      for (const answer of validatedData.finalAnswers) {
        // Get question details
        const question = await prisma.question.findUnique({
          where: { id: answer.questionId },
          select: { correctAnswer: true, marks: true },
        })

        if (question) {
          const isCorrect = answer.selectedAnswer === question.correctAnswer
          const marksAwarded = isCorrect
            ? question.marks
            : testSession.testTemplate?.negativeMarking
              ? -Math.floor(question.marks / 4)
              : 0

          // Check if response already exists
          const existingResponse = await prisma.userQuestionResponse.findFirst({
            where: {
              testSessionId,
              questionId: answer.questionId,
            },
          })

          if (existingResponse) {
            // Update existing response
            await prisma.userQuestionResponse.update({
              where: { id: existingResponse.id },
              data: {
                selectedAnswer: answer.selectedAnswer,
                isCorrect,
                marksAwarded,
                timeSpent: answer.timeSpent || existingResponse.timeSpent,
                confidence: answer.confidence,
                answeredAt: submissionTime,
              },
            })
          } else {
            // Create new response
            await prisma.userQuestionResponse.create({
              data: {
                ...(user.role === 'STUDENT' ? { userId: user.id } : { freeUserId: user.id }),
                questionId: answer.questionId,
                testSessionId,
                selectedAnswer: answer.selectedAnswer,
                isCorrect,
                marksAwarded,
                timeSpent: answer.timeSpent || 0,
                confidence: answer.confidence,
                responseMode: 'TEST_MODE',
              },
            })
          }
        }
      }
    }

    // Calculate final scores and analytics
    const responses = await prisma.userQuestionResponse.findMany({
      where: { testSessionId },
      include: {
        question: {
          select: { marks: true, topic: true, difficulty: true },
        },
      },
    })

    const totalScore = responses.reduce((sum, r) => sum + r.marksAwarded, 0)
    const maxPossibleScore = testSession.testTemplate?.totalMarks || 0
    const percentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0

    // Calculate percentile rank
    const percentileRank = await calculatePercentileRank(
      testSession.testTemplate?.id || '',
      totalScore,
      maxPossibleScore
    )

    // Calculate comprehensive analytics
    const analyticsData = await calculateTestAnalytics(testSessionId)

    // Use transaction to update everything atomically
    const result = await prisma.$transaction(async (tx) => {
      // Update test session
      const updatedSession = await tx.testSession.update({
        where: { id: testSessionId },
        data: {
          status: 'COMPLETED',
          submittedAt: submissionTime,
          timeSpent: validatedData.sessionData?.totalTimeSpent || testSession.timeSpent,
          totalScore,
          percentage: Math.round(percentage * 100) / 100,
          questionsAnswered: responses.length,
          browserInfo: {
            ...(testSession.browserInfo as any),
            ...validatedData.sessionData?.deviceInfo,
            submissionEvents: validatedData.sessionData?.browserEvents,
          },
        },
      })

      // Create analytics record if we have data
      let analytics = null
      if (analyticsData) {
        analytics = await tx.testAnalytics.create({
          data: {
            testSessionId,
            ...analyticsData,
            percentileRank,
            averageComparison: percentileRank ? percentileRank - 50 : null, // How much above/below average
            analyzedAt: submissionTime,
          },
        })
      }

      // Update test template statistics
      await tx.testTemplate.update({
        where: { id: testSession.testTemplate?.id },
        data: {
          attemptCount: { increment: 1 },
          // Update running averages (simplified calculation)
          averageScore: {
            // This would need a more sophisticated calculation for accurate running averages
            set: percentage,
          },
          averageTime: {
            set: validatedData.sessionData?.totalTimeSpent || testSession.timeSpent,
          },
        },
      })

      return { updatedSession, analytics }
    })

    // Determine rank (simplified - would need more sophisticated ranking)
    const rank = percentileRank ? Math.ceil((100 - percentileRank) / 10) : null

    // Update session with rank
    await prisma.testSession.update({
      where: { id: testSessionId },
      data: { rank },
    })

    // Log test submission
    logger.info('Test submitted:', {
      testSessionId,
      userId: user.id,
      totalScore,
      percentage: Math.round(percentage * 100) / 100,
      questionsAnswered: responses.length,
      totalQuestions: testSession.testTemplate?.totalQuestions,
      timeSpent: validatedData.sessionData?.totalTimeSpent,
    })

    // Prepare comprehensive response
    const submissionResponse = {
      success: true,
      data: {
        submission: {
          id: testSessionId,
          status: 'COMPLETED',
          submittedAt: submissionTime,
          totalScore,
          maxPossibleScore,
          percentage: Math.round(percentage * 100) / 100,
          percentileRank,
          rank,
          questionsAnswered: responses.length,
          totalQuestions: testSession.testTemplate?.totalQuestions,
          timeSpent: validatedData.sessionData?.totalTimeSpent || testSession.timeSpent,
          isPassed: testSession.testTemplate?.passingMarks
            ? totalScore >= testSession.testTemplate.passingMarks
            : percentage >= 40, // Default 40% passing
        },
        performance: {
          totalQuestions: responses.length,
          correctAnswers: responses.filter((r) => r.isCorrect).length,
          incorrectAnswers: responses.filter((r) => !r.isCorrect).length,
          accuracy:
            responses.length > 0
              ? Math.round(
                  (responses.filter((r) => r.isCorrect).length / responses.length) * 100 * 100
                ) / 100
              : 0,
          averageTimePerQuestion:
            responses.length > 0
              ? Math.round(
                  ((validatedData.sessionData?.totalTimeSpent || 0) / responses.length) * 100
                ) / 100
              : 0,
        },
        analytics: result.analytics
          ? {
              strengthTopics: result.analytics.strengthTopics,
              weaknessTopics: result.analytics.weaknessTopics,
              topicPerformance: result.analytics.topicPerformance,
              difficultyAnalysis: {
                easy: result.analytics.easyQuestions,
                medium: result.analytics.mediumQuestions,
                hard: result.analytics.hardQuestions,
              },
            }
          : null,
        recommendations: {
          studyTopics: result.analytics?.weaknessTopics || [],
          practiceAreas: result.analytics?.weaknessTopics?.slice(0, 3) || [],
          nextSteps:
            percentage >= 70
              ? ['Take advanced level tests', 'Focus on time management']
              : ['Review fundamental concepts', 'Practice more questions', 'Focus on weak topics'],
        },
      },
    }

    return NextResponse.json(submissionResponse)
  } catch (error) {
    logger.error('Error submitting test:', error)

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
        error: 'Failed to submit test',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}
