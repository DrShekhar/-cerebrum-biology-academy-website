import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { withAuth } from '@/lib/auth/middleware'
import { withRateLimit } from '@/lib/middleware/rateLimit'
import { logger } from '@/lib/utils/logger'

interface RouteParams {
  params: {
    id: string
  }
}

// Validation schema for test session updates
const updateTestSessionSchema = z.object({
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'PAUSED', 'COMPLETED', 'EXPIRED', 'ABANDONED', 'TERMINATED']).optional(),
  currentQuestionIndex: z.number().min(0).optional(),
  timeSpent: z.number().min(0).optional(),
  remainingTime: z.number().min(0).optional(),
  browserInfo: z.object({
    userAgent: z.string().optional(),
    screenSize: z.string().optional(),
    timestamp: z.string().optional()
  }).optional(),
  antiCheatData: z.object({
    tabSwitchCount: z.number().optional(),
    fullscreenExits: z.number().optional(),
    suspiciousEvents: z.array(z.string()).optional()
  }).optional()
})

// GET /api/test/[id] - Get test session details
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params

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
      limit: 100, // 100 requests per hour for getting test details
      window: 3600000
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', code: 'RATE_LIMIT_EXCEEDED' },
        { status: 429 }
      )
    }

    // Fetch test session with all related data
    const testSession = await prisma.testSession.findUnique({
      where: {
        id,
        OR: [
          { userId: user.id },
          { freeUserId: user.id } // Support for free users
        ]
      },
      include: {
        testTemplate: {
          include: {
            questionBank: {
              include: {
                questions: {
                  include: {
                    question: {
                      select: {
                        id: true,
                        topic: true,
                        subtopic: true,
                        type: true,
                        difficulty: true,
                        question: true,
                        options: true,
                        marks: true,
                        timeLimit: true,
                        questionImage: true,
                        tags: true,
                        relatedConcepts: true
                      }
                    }
                  },
                  orderBy: {
                    orderIndex: 'asc'
                  }
                }
              }
            }
          }
        },
        responses: {
          include: {
            question: {
              select: {
                id: true,
                correctAnswer: true,
                explanation: true,
                explanationImage: true,
                videoExplanation: true
              }
            }
          },
          orderBy: {
            answeredAt: 'asc'
          }
        },
        analytics: true
      }
    })

    if (!testSession) {
      return NextResponse.json(
        { error: 'Test session not found', code: 'NOT_FOUND' },
        { status: 404 }
      )
    }

    // Calculate progress and analytics
    const totalQuestions = testSession.testTemplate?.questionBank?.[0]?.questions?.length || 0
    const answeredQuestions = testSession.responses.length
    const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0

    // Prepare questions with user responses
    const questionsWithResponses = testSession.testTemplate?.questionBank?.[0]?.questions?.map((qbq, index) => {
      const userResponse = testSession.responses.find(r => r.questionId === qbq.question.id)

      return {
        index: index + 1,
        id: qbq.question.id,
        topic: qbq.question.topic,
        subtopic: qbq.question.subtopic,
        type: qbq.question.type,
        difficulty: qbq.question.difficulty,
        question: qbq.question.question,
        options: qbq.question.options,
        marks: qbq.question.marks,
        timeLimit: qbq.question.timeLimit,
        questionImage: qbq.question.questionImage,
        tags: qbq.question.tags,
        relatedConcepts: qbq.question.relatedConcepts,
        userResponse: userResponse ? {
          selectedAnswer: userResponse.selectedAnswer,
          isCorrect: userResponse.isCorrect,
          timeSpent: userResponse.timeSpent,
          marksAwarded: userResponse.marksAwarded,
          confidence: userResponse.confidence,
          answeredAt: userResponse.answeredAt
        } : null,
        // Only show correct answer and explanation if test is completed or in review mode
        ...(testSession.status === 'COMPLETED' && {
          correctAnswer: qbq.question.correctAnswer,
          explanation: qbq.question.explanation,
          explanationImage: qbq.question.explanationImage,
          videoExplanation: qbq.question.videoExplanation
        })
      }
    }) || []

    // Calculate real-time statistics
    const correctAnswers = testSession.responses.filter(r => r.isCorrect).length
    const currentScore = testSession.responses.reduce((sum, r) => sum + r.marksAwarded, 0)
    const totalMarks = testSession.testTemplate?.totalMarks || 0
    const accuracy = answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0

    // Time calculations
    const now = new Date()
    const startTime = testSession.startedAt
    const timeElapsed = startTime ? Math.floor((now.getTime() - startTime.getTime()) / 1000) : 0
    const effectiveRemainingTime = Math.max(0, (testSession.remainingTime || 0) - timeElapsed)

    const response = {
      success: true,
      data: {
        testSession: {
          id: testSession.id,
          sessionToken: testSession.sessionToken,
          status: testSession.status,
          startedAt: testSession.startedAt,
          submittedAt: testSession.submittedAt,
          timeSpent: testSession.timeSpent,
          remainingTime: effectiveRemainingTime,
          currentQuestionIndex: testSession.currentQuestionIndex,
          questionsAnswered: testSession.questionsAnswered,
          questionsMarkedForReview: testSession.questionsMarkedForReview,
          totalScore: testSession.totalScore,
          percentage: testSession.percentage,
          rank: testSession.rank,
          tabSwitchCount: testSession.tabSwitchCount,
          fullscreenExits: testSession.fullscreenExits,
          isProctored: testSession.isProctored
        },
        testTemplate: testSession.testTemplate ? {
          id: testSession.testTemplate.id,
          title: testSession.testTemplate.title,
          description: testSession.testTemplate.description,
          type: testSession.testTemplate.type,
          category: testSession.testTemplate.category,
          difficulty: testSession.testTemplate.difficulty,
          timeLimit: testSession.testTemplate.timeLimit,
          totalQuestions: testSession.testTemplate.totalQuestions,
          totalMarks: testSession.testTemplate.totalMarks,
          passingMarks: testSession.testTemplate.passingMarks,
          negativeMarking: testSession.testTemplate.negativeMarking,
          topics: testSession.testTemplate.topics,
          instructions: testSession.testTemplate.instructions,
          isAdaptive: testSession.testTemplate.isAdaptive
        } : null,
        questions: questionsWithResponses,
        progress: {
          totalQuestions,
          answeredQuestions,
          progressPercentage: Math.round(progress * 100) / 100,
          currentScore,
          totalMarks,
          accuracy: Math.round(accuracy * 100) / 100,
          timeElapsed,
          remainingTime: effectiveRemainingTime
        },
        analytics: testSession.analytics ? {
          totalTime: testSession.analytics.totalTime,
          averageTimePerQ: testSession.analytics.averageTimePerQ,
          questionsAttempted: testSession.analytics.questionsAttempted,
          questionsCorrect: testSession.analytics.questionsCorrect,
          accuracy: testSession.analytics.accuracy,
          topicPerformance: testSession.analytics.topicPerformance,
          strengthTopics: testSession.analytics.strengthTopics,
          weaknessTopics: testSession.analytics.weaknessTopics,
          percentileRank: testSession.analytics.percentileRank
        } : null
      }
    }

    // Log access
    logger.info('Test session accessed:', {
      testSessionId: id,
      userId: user.id,
      status: testSession.status,
      progress: `${answeredQuestions}/${totalQuestions}`
    })

    return NextResponse.json(response)

  } catch (error) {
    logger.error('Error fetching test session:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch test session',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    )
  }
}

// PUT /api/test/[id] - Update test session
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params
    const body = await request.json()
    const validatedData = updateTestSessionSchema.parse(body)

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
      limit: 200, // 200 updates per hour
      window: 3600000
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', code: 'RATE_LIMIT_EXCEEDED' },
        { status: 429 }
      )
    }

    // Check if test session exists and belongs to user
    const existingSession = await prisma.testSession.findUnique({
      where: {
        id,
        OR: [
          { userId: user.id },
          { freeUserId: user.id }
        ]
      }
    })

    if (!existingSession) {
      return NextResponse.json(
        { error: 'Test session not found', code: 'NOT_FOUND' },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: any = {}

    if (validatedData.status !== undefined) {
      updateData.status = validatedData.status

      // Set timestamps based on status
      if (validatedData.status === 'IN_PROGRESS' && !existingSession.startedAt) {
        updateData.startedAt = new Date()
      } else if (validatedData.status === 'PAUSED') {
        updateData.pausedAt = new Date()
      } else if (validatedData.status === 'IN_PROGRESS' && existingSession.status === 'PAUSED') {
        updateData.resumedAt = new Date()
      } else if (['COMPLETED', 'ABANDONED', 'TERMINATED'].includes(validatedData.status)) {
        updateData.submittedAt = new Date()
      }
    }

    if (validatedData.currentQuestionIndex !== undefined) {
      updateData.currentQuestionIndex = validatedData.currentQuestionIndex
    }

    if (validatedData.timeSpent !== undefined) {
      updateData.timeSpent = validatedData.timeSpent
    }

    if (validatedData.remainingTime !== undefined) {
      updateData.remainingTime = validatedData.remainingTime
    }

    if (validatedData.browserInfo) {
      updateData.browserInfo = {
        ...existingSession.browserInfo as any,
        ...validatedData.browserInfo
      }
    }

    if (validatedData.antiCheatData) {
      if (validatedData.antiCheatData.tabSwitchCount !== undefined) {
        updateData.tabSwitchCount = validatedData.antiCheatData.tabSwitchCount
      }
      if (validatedData.antiCheatData.fullscreenExits !== undefined) {
        updateData.fullscreenExits = validatedData.antiCheatData.fullscreenExits
      }
      if (validatedData.antiCheatData.suspiciousEvents) {
        updateData.suspiciousActivity = {
          ...existingSession.suspiciousActivity as any,
          events: [
            ...((existingSession.suspiciousActivity as any)?.events || []),
            ...validatedData.antiCheatData.suspiciousEvents
          ]
        }
      }
    }

    // Update test session
    const updatedSession = await prisma.testSession.update({
      where: { id },
      data: updateData,
      include: {
        testTemplate: {
          select: {
            id: true,
            title: true,
            timeLimit: true,
            totalQuestions: true
          }
        }
      }
    })

    // Log update
    logger.info('Test session updated:', {
      testSessionId: id,
      userId: user.id,
      changes: Object.keys(updateData),
      newStatus: updatedSession.status
    })

    return NextResponse.json({
      success: true,
      data: {
        testSession: {
          id: updatedSession.id,
          status: updatedSession.status,
          startedAt: updatedSession.startedAt,
          pausedAt: updatedSession.pausedAt,
          resumedAt: updatedSession.resumedAt,
          submittedAt: updatedSession.submittedAt,
          timeSpent: updatedSession.timeSpent,
          remainingTime: updatedSession.remainingTime,
          currentQuestionIndex: updatedSession.currentQuestionIndex,
          tabSwitchCount: updatedSession.tabSwitchCount,
          fullscreenExits: updatedSession.fullscreenExits
        }
      }
    })

  } catch (error) {
    logger.error('Error updating test session:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: error.errors
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to update test session',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    )
  }
}

// DELETE /api/test/[id] - Delete test session
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params

    const authResult = await withAuth(request)
    if (!authResult.success) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTH_REQUIRED' },
        { status: 401 }
      )
    }

    const { user } = authResult

    // Check if test session exists and belongs to user
    const existingSession = await prisma.testSession.findUnique({
      where: {
        id,
        OR: [
          { userId: user.id },
          { freeUserId: user.id }
        ]
      }
    })

    if (!existingSession) {
      return NextResponse.json(
        { error: 'Test session not found', code: 'NOT_FOUND' },
        { status: 404 }
      )
    }

    // Check if session can be deleted (only if not completed or in critical state)
    if (['COMPLETED', 'IN_PROGRESS'].includes(existingSession.status)) {
      return NextResponse.json(
        {
          error: 'Cannot delete completed or in-progress test session',
          code: 'OPERATION_NOT_ALLOWED'
        },
        { status: 403 }
      )
    }

    // Delete test session and related data
    await prisma.$transaction(async (tx) => {
      // Delete user responses
      await tx.userQuestionResponse.deleteMany({
        where: { testSessionId: id }
      })

      // Delete analytics
      await tx.testAnalytics.deleteMany({
        where: { testSessionId: id }
      })

      // Delete test session
      await tx.testSession.delete({
        where: { id }
      })
    })

    // Log deletion
    logger.info('Test session deleted:', {
      testSessionId: id,
      userId: user.id,
      previousStatus: existingSession.status
    })

    return NextResponse.json({
      success: true,
      message: 'Test session deleted successfully'
    })

  } catch (error) {
    logger.error('Error deleting test session:', error)
    return NextResponse.json(
      {
        error: 'Failed to delete test session',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    )
  }
}