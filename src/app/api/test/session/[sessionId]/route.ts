import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth/middleware'
import { addSecurityHeaders } from '@/lib/auth/config'
import { z } from 'zod'

// Answer submission schema
const SubmitAnswerSchema = z.object({
  questionId: z.string(),
  selectedAnswer: z.string().optional(),
  timeSpent: z.number().min(0).optional(),
  isMarkedForReview: z.boolean().default(false),
  confidence: z.number().min(1).max(5).optional(),
})

// Session update schema
const UpdateSessionSchema = z.object({
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'PAUSED', 'COMPLETED', 'ABANDONED']).optional(),
  currentQuestionIndex: z.number().min(0).optional(),
  questionsAnswered: z.number().min(0).optional(),
  questionsMarkedForReview: z.number().min(0).optional(),
  timeSpent: z.number().min(0).optional(),
  remainingTime: z.number().optional(),
  tabSwitchCount: z.number().min(0).optional(),
  fullscreenExits: z.number().min(0).optional(),
  suspiciousActivity: z.array(z.any()).optional(),
})

/**
 * GET /api/test/session/[sessionId]
 * Get specific test session details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  return withAuth(async (req: NextRequest, session) => {
    try {
      const { sessionId } = await params

      const testSession = await prisma.test_sessions.findUnique({
        where: {
          id: sessionId,
          userId: session.userId, // Ensure user owns this session
        },
        include: {
          test_templates: true,
          user_question_responses: {
            include: {
              questions: {
                select: {
                  id: true,
                  question: true,
                  options: true,
                  correctAnswer: true,
                  explanation: true,
                  marks: true,
                  timeLimit: true,
                  type: true,
                  questionImage: true,
                },
              },
            },
            orderBy: { answeredAt: 'asc' },
          },
          test_analytics: true,
        },
      })

      if (!testSession) {
        return addSecurityHeaders(
          NextResponse.json(
            {
              error: 'Test session not found',
              message: 'Session not found or access denied',
            },
            { status: 404 }
          )
        )
      }

      return addSecurityHeaders(
        NextResponse.json({
          success: true,
          session: testSession,
        })
      )
    } catch (error) {
      console.error('Get test session error:', error)
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Internal server error',
            message: 'Failed to retrieve test session',
          },
          { status: 500 }
        )
      )
    }
  })(request)
}

/**
 * PUT /api/test/session/[sessionId]
 * Update test session (progress, status, etc.)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  return withAuth(async (req: NextRequest, session) => {
    try {
      const { sessionId } = await params
      const body = await request.json()
      const result = UpdateSessionSchema.safeParse(body)

      if (!result.success) {
        return addSecurityHeaders(
          NextResponse.json(
            {
              error: 'Invalid input',
              details: result.error.issues,
            },
            { status: 400 }
          )
        )
      }

      const updateData = result.data

      // Verify session ownership
      const existingSession = await prisma.test_sessions.findUnique({
        where: {
          id: sessionId,
          userId: session.userId,
        },
      })

      if (!existingSession) {
        return addSecurityHeaders(
          NextResponse.json(
            {
              error: 'Test session not found',
              message: 'Session not found or access denied',
            },
            { status: 404 }
          )
        )
      }

      // Update session
      const updatedSession = await prisma.test_sessions.update({
        where: { id: sessionId },
        data: {
          ...updateData,
          ...(updateData.status === 'IN_PROGRESS' &&
            !existingSession.startedAt && {
              startedAt: new Date(),
            }),
          ...(updateData.status === 'COMPLETED' && {
            submittedAt: new Date(),
          }),
          updatedAt: new Date(),
        },
      })

      // Track status change event
      if (updateData.status && updateData.status !== existingSession.status) {
        try {
          await prisma.analytics_events.create({
            data: {
              userId: session.userId,
              eventType: 'test',
              eventName: 'test_session_status_changed',
              properties: {
                testSessionId: sessionId,
                fromStatus: existingSession.status,
                toStatus: updateData.status,
                timeSpent: updateData.timeSpent || existingSession.timeSpent,
              },
              ipAddress:
                request.headers.get('x-forwarded-for') ||
                request.headers.get('x-real-ip') ||
                'unknown',
              userAgent: request.headers.get('user-agent'),
            },
          })
        } catch (analyticsError) {
          console.error('Analytics tracking error:', analyticsError)
        }
      }

      return addSecurityHeaders(
        NextResponse.json({
          success: true,
          message: 'Session updated successfully',
          session: updatedSession,
        })
      )
    } catch (error) {
      console.error('Update test session error:', error)
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Internal server error',
            message: 'Failed to update test session',
          },
          { status: 500 }
        )
      )
    }
  })(request)
}

/**
 * POST /api/test/session/[sessionId]/answer
 * Submit answer for a question
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  return withAuth(async (req: NextRequest, session) => {
    try {
      const { sessionId } = await params
      const body = await request.json()
      const result = SubmitAnswerSchema.safeParse(body)

      if (!result.success) {
        return addSecurityHeaders(
          NextResponse.json(
            {
              error: 'Invalid input',
              details: result.error.issues,
            },
            { status: 400 }
          )
        )
      }

      const { questionId, selectedAnswer, timeSpent, isMarkedForReview, confidence } = result.data

      // Verify session ownership and get session details
      const testSession = await prisma.test_sessions.findUnique({
        where: {
          id: sessionId,
          userId: session.userId,
        },
      })

      if (!testSession) {
        return addSecurityHeaders(
          NextResponse.json(
            {
              error: 'Test session not found',
              message: 'Session not found or access denied',
            },
            { status: 404 }
          )
        )
      }

      // Check if session is in valid state for answering
      if (testSession.status !== 'IN_PROGRESS') {
        return addSecurityHeaders(
          NextResponse.json(
            {
              error: 'Invalid session state',
              message: 'Cannot submit answers to a session that is not in progress',
            },
            { status: 400 }
          )
        )
      }

      // Get question details to check correct answer
      const question = await prisma.questions.findUnique({
        where: { id: questionId },
      })

      if (!question) {
        return addSecurityHeaders(
          NextResponse.json(
            {
              error: 'Question not found',
              message: 'Invalid question ID',
            },
            { status: 404 }
          )
        )
      }

      // Check if answer is correct
      const isCorrect = selectedAnswer === question.correctAnswer
      const marksAwarded = isCorrect ? question.marks || 1 : 0

      // Check if response already exists
      const existingResponse = await prisma.user_question_responses.findFirst({
        where: {
          userId: session.userId,
          questionId,
          testSessionId: sessionId,
        },
      })

      // Create or update user question response
      const response = existingResponse
        ? await prisma.user_question_responses.update({
            where: { id: existingResponse.id },
            data: {
              selectedAnswer,
              isCorrect,
              timeSpent,
              marksAwarded,
              confidence,
              answeredAt: new Date(),
            },
          })
        : await prisma.user_question_responses.create({
            data: {
              userId: session.userId,
              questionId,
              testSessionId: sessionId,
              selectedAnswer,
              isCorrect,
              timeSpent,
              marksAwarded,
              confidence,
              responseMode: 'TEST_MODE',
              deviceType: getDeviceType(request.headers.get('user-agent') || ''),
              answeredAt: new Date(),
            },
          })

      // Update or create test question record
      await prisma.test_questions.updateMany({
        where: {
          testAttemptId: testSession.id, // You might need to link this properly
          questionId,
        },
        data: {
          selectedAnswer,
          isCorrect,
          timeSpent,
          marksAwarded,
          isMarkedForReview,
        },
      })

      // Update question statistics
      await prisma.questions.update({
        where: { id: questionId },
        data: {
          totalAttempts: { increment: 1 },
          ...(isCorrect && { correctAttempts: { increment: 1 } }),
          ...(timeSpent && {
            averageTime: {
              // Calculate new average (this is simplified, you might want a more sophisticated approach)
              set: Math.round(((question.averageTime || 0) + timeSpent) / 2),
            },
          }),
        },
      })

      // Update user progress for this topic
      await updateUserProgress(session.userId, question, isCorrect, timeSpent || 0)

      // Track answer submission event
      try {
        await prisma.analytics_events.create({
          data: {
            userId: session.userId,
            eventType: 'test',
            eventName: 'question_answered',
            properties: {
              testSessionId: sessionId,
              questionId,
              isCorrect,
              timeSpent,
              confidence,
              isMarkedForReview,
              topic: question.topic,
              difficulty: question.difficulty,
            },
            ipAddress:
              request.headers.get('x-forwarded-for') ||
              request.headers.get('x-real-ip') ||
              'unknown',
            userAgent: request.headers.get('user-agent'),
          },
        })
      } catch (analyticsError) {
        console.error('Analytics tracking error:', analyticsError)
      }

      return addSecurityHeaders(
        NextResponse.json({
          success: true,
          message: 'Answer submitted successfully',
          response: {
            id: response.id,
            isCorrect,
            marksAwarded,
            timeSpent,
          },
          feedback: {
            correct: isCorrect,
            explanation: question.explanation,
            correctAnswer: question.correctAnswer,
          },
        })
      )
    } catch (error) {
      console.error('Submit answer error:', error)
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Internal server error',
            message: 'Failed to submit answer',
          },
          { status: 500 }
        )
      )
    }
  })(request)
}

/**
 * Helper function to update user progress
 */
async function updateUserProgress(
  userId: string,
  question: any,
  isCorrect: boolean,
  timeSpent: number
) {
  try {
    const existingProgress = await prisma.user_progress.findFirst({
      where: {
        userId,
        topic: question.topic,
        curriculum: question.curriculum,
        grade: question.grade,
      },
    })

    if (existingProgress) {
      // Update existing progress
      const newTotalQuestions = existingProgress.totalQuestions + 1
      const newCorrectAnswers = existingProgress.correctAnswers + (isCorrect ? 1 : 0)
      const newAccuracy = (newCorrectAnswers / newTotalQuestions) * 100

      // Calculate new average time
      const newAverageTime = existingProgress.averageTime
        ? Math.round((existingProgress.averageTime + timeSpent) / 2)
        : timeSpent

      // Calculate mastery score (accuracy weighted by consistency)
      const masteryScore = Math.min(100, newAccuracy * (1 + Math.min(newTotalQuestions / 50, 1)))

      await prisma.user_progress.update({
        where: { id: existingProgress.id },
        data: {
          totalQuestions: newTotalQuestions,
          correctAnswers: newCorrectAnswers,
          accuracy: newAccuracy,
          averageTime: newAverageTime,
          masteryScore,
          lastPracticed: new Date(),
          ...(masteryScore >= 80 && { currentLevel: 'MEDIUM' }),
          ...(masteryScore >= 90 && { currentLevel: 'HARD' }),
        },
      })
    } else {
      // Create new progress record
      await prisma.user_progress.create({
        data: {
          userId,
          topic: question.topic,
          subtopic: question.subtopic,
          curriculum: question.curriculum,
          grade: question.grade,
          totalQuestions: 1,
          correctAnswers: isCorrect ? 1 : 0,
          accuracy: isCorrect ? 100 : 0,
          averageTime: timeSpent,
          masteryScore: isCorrect ? 20 : 0, // Starting score
          currentLevel: 'EASY',
          lastPracticed: new Date(),
        },
      })
    }
  } catch (error) {
    console.error('Error updating user progress:', error)
  }
}

/**
 * Helper function to determine device type
 */
function getDeviceType(userAgent: string): string {
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return 'tablet'
  }
  if (
    /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(
      userAgent
    )
  ) {
    return 'mobile'
  }
  return 'desktop'
}

// OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || ''
  const allowedOrigins = [
    'https://cerebrumbiologyacademy.com',
    'https://www.cerebrumbiologyacademy.com',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
  ]
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0]

  return addSecurityHeaders(
    new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
  )
}
