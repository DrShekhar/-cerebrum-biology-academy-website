import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth/middleware'
import { addSecurityHeaders } from '@/lib/auth/config'
import { z } from 'zod'

// Test session creation schema
const CreateSessionSchema = z.object({
  testTemplateId: z.string().optional(),
  title: z.string().min(1, 'Test title is required'),
  topics: z.array(z.string()).optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD', 'MIXED']).default('MEDIUM'),
  questionCount: z.number().min(1).max(200).default(20),
  timeLimit: z.number().min(5).max(300).optional(), // 5 minutes to 5 hours
  curriculum: z.string().optional(),
  grade: z.string().optional(),
  subject: z.string().default('biology'),
})

// Test session update schema
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
 * POST /api/test/session
 * Create a new test session
 */
export const POST = withAuth(async (request: NextRequest, session) => {
  try {
    const body = await request.json()
    const result = CreateSessionSchema.safeParse(body)

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

    const {
      testTemplateId,
      title,
      topics,
      difficulty,
      questionCount,
      timeLimit,
      curriculum,
      grade,
      subject,
    } = result.data

    // Generate unique session token
    const sessionToken = `test_${Date.now()}_${Math.random().toString(36).substring(2)}`

    // Get client information for security
    const browserInfo = {
      userAgent: request.headers.get('user-agent'),
      acceptLanguage: request.headers.get('accept-language'),
      acceptEncoding: request.headers.get('accept-encoding'),
    }

    const ipAddress =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    // Create test session in database
    const testSession = await prisma.test_sessions.create({
      data: {
        userId: session.userId,
        testTemplateId,
        sessionToken,
        status: 'NOT_STARTED',
        browserInfo,
        ipAddress,
        // Store test configuration in the session
        // You might want to create a separate TestConfiguration model
        // For now, we'll store it in a JSON field or create inline
      },
    })

    // If using a specific test template, get questions from it
    let questions = []
    if (testTemplateId) {
      const template = await prisma.test_templates.findUnique({
        where: { id: testTemplateId },
        include: {
          questionBank: {
            include: {
              question: true,
            },
            take: questionCount,
            orderBy: { orderIndex: 'asc' },
          },
        },
      })

      if (template) {
        questions = template.questionBank.map((qb) => qb.question)
      }
    } else {
      // Generate questions based on criteria
      const whereClause: any = {
        isActive: true,
        isVerified: true,
        ...(subject && { subject }),
        ...(curriculum && { curriculum }),
        ...(grade && { grade }),
        ...(topics && topics.length > 0 && { topic: { in: topics } }),
      }

      if (difficulty !== 'MIXED') {
        whereClause.difficulty = difficulty
      }

      questions = await prisma.questions.findMany({
        where: whereClause,
        take: questionCount,
        orderBy: { popularityScore: 'desc' },
      })
    }

    // Create test attempt record
    const testAttempt = await prisma.testAttempt.create({
      data: {
        freeUserId: session.userId, // Assuming both regular and free users
        testTemplateId,
        title,
        topics: topics || [],
        difficulty: difficulty as any,
        questionCount: questions.length,
        timeLimit,
        score: 0,
        totalMarks: questions.reduce((sum, q) => sum + (q.marks || 1), 0),
        percentage: 0,
        timeSpent: 0,
        topicWiseScore: {},
        status: 'IN_PROGRESS',
      },
    })

    // Create test question records for tracking individual responses
    for (let i = 0; i < questions.length; i++) {
      await prisma.testQuestion.create({
        data: {
          testAttemptId: testAttempt.id,
          questionId: questions[i].id,
          timeSpent: 0,
          marksAwarded: 0,
        },
      })
    }

    // Track test session start event
    try {
      await prisma.analyticsEvent.create({
        data: {
          userId: session.userId,
          eventType: 'test',
          eventName: 'test_session_created',
          properties: {
            testSessionId: testSession.id,
            testAttemptId: testAttempt.id,
            questionCount: questions.length,
            difficulty,
            timeLimit,
            hasTemplate: !!testTemplateId,
          },
          ipAddress,
          userAgent: request.headers.get('user-agent'),
        },
      })
    } catch (analyticsError) {
      console.error('Analytics tracking error:', analyticsError)
    }

    return addSecurityHeaders(
      NextResponse.json({
        success: true,
        message: 'Test session created successfully',
        session: {
          id: testSession.id,
          sessionToken: testSession.sessionToken,
          status: testSession.status,
          createdAt: testSession.createdAt,
        },
        testAttempt: {
          id: testAttempt.id,
          title: testAttempt.title,
          questionCount: questions.length,
          totalMarks: testAttempt.totalMarks,
          timeLimit: testAttempt.timeLimit,
        },
        questions: questions.map((q, index) => ({
          id: q.id,
          index,
          question: q.question,
          options: q.options,
          marks: q.marks || 1,
          timeLimit: q.timeLimit,
          type: q.type,
          questionImage: q.questionImage,
        })),
      })
    )
  } catch (error) {
    console.error('Create test session error:', error)
    return addSecurityHeaders(
      NextResponse.json(
        {
          error: 'Internal server error',
          message: 'Failed to create test session',
        },
        { status: 500 }
      )
    )
  }
})

/**
 * GET /api/test/session
 * Get user's active test sessions
 */
export const GET = withAuth(async (request: NextRequest, session) => {
  try {
    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const offset = parseInt(url.searchParams.get('offset') || '0')

    const whereClause: any = {
      userId: session.userId,
    }

    if (status) {
      whereClause.status = status
    }

    const testSessions = await prisma.test_sessions.findMany({
      where: whereClause,
      include: {
        test_templates: {
          select: {
            id: true,
            title: true,
            description: true,
            type: true,
            category: true,
            timeLimit: true,
            totalQuestions: true,
            totalMarks: true,
          },
        },
        analytics: true,
        _count: {
          select: {
            responses: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    })

    // Get recent test attempts for progress tracking
    const testAttempts = await prisma.testAttempt.findMany({
      where: {
        freeUserId: session.userId,
      },
      orderBy: { startedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        percentage: true,
        status: true,
        startedAt: true,
        submittedAt: true,
        timeSpent: true,
      },
    })

    // Get progress statistics
    const progressStats = await prisma.userProgress.findMany({
      where: {
        userId: session.userId,
      },
      select: {
        topic: true,
        accuracy: true,
        totalQuestions: true,
        correctAnswers: true,
        masteryScore: true,
        lastPracticed: true,
      },
    })

    return addSecurityHeaders(
      NextResponse.json({
        success: true,
        sessions: testSessions,
        recentAttempts: testAttempts,
        progressStats,
        pagination: {
          limit,
          offset,
          total: testSessions.length,
        },
      })
    )
  } catch (error) {
    console.error('Get test sessions error:', error)
    return addSecurityHeaders(
      NextResponse.json(
        {
          error: 'Internal server error',
          message: 'Failed to retrieve test sessions',
        },
        { status: 500 }
      )
    )
  }
})

// OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || ''
  const allowedOrigins = [
    'https://cerebrumbiologyacademy.com',
    'https://cerebrumbiologyacademy.com',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
  ]
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0]

  return addSecurityHeaders(
    new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
  )
}
