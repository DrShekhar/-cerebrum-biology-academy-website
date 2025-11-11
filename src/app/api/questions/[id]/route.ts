import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { validateUserSession } from '@/lib/auth/config'
import { withRateLimit } from '@/lib/middleware/rateLimit'
import { logger } from '@/lib/utils/logger'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

// Validation schema for question updates
const updateQuestionSchema = z.object({
  topic: z.string().min(1).optional(),
  subtopic: z.string().optional(),
  curriculum: z.string().optional(),
  grade: z.string().optional(),
  subject: z.string().optional(),
  type: z
    .enum([
      'MCQ',
      'SHORT_ANSWER',
      'DIAGRAM',
      'TRUE_FALSE',
      'FILL_BLANK',
      'MULTIPLE_SELECT',
      'MATCH_FOLLOWING',
      'NUMERICAL',
    ])
    .optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD', 'EXPERT']).optional(),
  question: z.string().min(10).optional(),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().min(1).optional(),
  explanation: z.string().optional(),
  solutionSteps: z.array(z.string()).optional(),
  questionImage: z.string().url().optional(),
  explanationImage: z.string().url().optional(),
  videoExplanation: z.string().url().optional(),
  source: z.string().optional(),
  examYear: z.number().optional(),
  marks: z.number().min(1).optional(),
  timeLimit: z.number().min(30).optional(),
  tags: z.array(z.string()).optional(),
  relatedConcepts: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  category: z
    .enum(['PRACTICE', 'MOCK_TEST', 'PREVIOUS_YEAR', 'CONCEPT_BUILDER', 'COMPETITIVE'])
    .optional(),
  isActive: z.boolean().optional(),
  isVerified: z.boolean().optional(),
})

// Helper function to check permissions
function checkPermissions(
  user: any,
  action: 'read' | 'update' | 'delete',
  questionOwnerId?: string
) {
  const adminRoles = ['ADMIN', 'TEACHER']

  switch (action) {
    case 'read':
      return true // Everyone can read questions
    case 'update':
    case 'delete':
      return adminRoles.includes(user.role) || user.id === questionOwnerId
    default:
      return false
  }
}

// GET /api/questions/[id] - Get specific question
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const session = await validateUserSession(request)
    if (!session.valid) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTH_REQUIRED' },
        { status: 401 }
      )
    }

    const user = {
      id: session.userId!,
      role: session.role!,
      email: session.email!,
      name: session.name!,
    }

    if (!checkPermissions(user, 'read')) {
      return NextResponse.json(
        { error: 'Insufficient permissions', code: 'FORBIDDEN' },
        { status: 403 }
      )
    }

    // Rate limiting
    const rateLimitResult = await withRateLimit(request, {
      identifier: user.id,
      limit: 500, // 500 requests per hour for individual questions
      window: 3600000,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', code: 'RATE_LIMIT_EXCEEDED' },
        { status: 429 }
      )
    }

    // Fetch question with related data
    const question = await prisma.question.findUnique({
      where: { id },
      include: {
        testQuestions: {
          select: {
            testAttempt: {
              select: {
                id: true,
                title: true,
                score: true,
                percentage: true,
              },
            },
          },
          take: 5, // Recent 5 test uses
        },
        userResponses: {
          select: {
            id: true,
            isCorrect: true,
            timeSpent: true,
            confidence: true,
            answeredAt: true,
          },
          where: {
            OR: [{ userId: user.id }, { freeUserId: user.id }],
          },
          orderBy: { answeredAt: 'desc' },
          take: 10, // Recent 10 responses by this user
        },
      },
    })

    if (!question) {
      return NextResponse.json({ error: 'Question not found', code: 'NOT_FOUND' }, { status: 404 })
    }

    // Check if question is accessible (active and verified for regular users)
    if (user.role === 'STUDENT' && (!question.isActive || !question.isVerified)) {
      return NextResponse.json(
        { error: 'Question not accessible', code: 'NOT_ACCESSIBLE' },
        { status: 403 }
      )
    }

    // Calculate question statistics
    const successRate =
      question.totalAttempts > 0
        ? Math.round((question.correctAttempts / question.totalAttempts) * 100 * 100) / 100
        : 0

    const averageTime =
      question.userResponses.length > 0
        ? Math.round(
            question.userResponses.reduce((sum, r) => sum + (r.timeSpent || 0), 0) /
              question.userResponses.length
          )
        : 0

    const userStats = {
      totalAttempts: question.userResponses.length,
      correctAttempts: question.userResponses.filter((r) => r.isCorrect).length,
      averageTime,
      bestTime:
        question.userResponses.length > 0
          ? Math.min(
              ...question.userResponses
                .map((r) => r.timeSpent || Infinity)
                .filter((t) => t !== Infinity)
            )
          : 0,
      lastAttempt: question.userResponses[0]?.answeredAt,
    }

    // Prepare response data
    const responseData = {
      id: question.id,
      topic: question.topic,
      subtopic: question.subtopic,
      curriculum: question.curriculum,
      grade: question.grade,
      subject: question.subject,
      type: question.type,
      difficulty: question.difficulty,
      question: question.question,
      options: question.options,
      questionImage: question.questionImage,
      marks: question.marks,
      timeLimit: question.timeLimit,
      tags: question.tags,
      relatedConcepts: question.relatedConcepts,
      keywords: question.keywords,
      source: question.source,
      examYear: question.examYear,
      category: question.category,
      isActive: question.isActive,
      isVerified: question.isVerified,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      lastUsed: question.lastUsed,

      // Include answer and explanation for authorized users or if user has attempted
      ...((user.role === 'ADMIN' || user.role === 'TEACHER' || userStats.totalAttempts > 0) && {
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        explanationImage: question.explanationImage,
        videoExplanation: question.videoExplanation,
        solutionSteps: question.solutionSteps,
      }),

      // Statistics
      statistics: {
        totalAttempts: question.totalAttempts,
        correctAttempts: question.correctAttempts,
        successRate,
        popularityScore: question.popularityScore,
        difficultyRating: question.difficultyRating,
        qualityScore: question.qualityScore,
        reportCount: question.reportCount,
      },

      // User-specific data
      userProgress: userStats,

      // Recent test usage
      recentUsage: question.testQuestions.map((tq) => ({
        testId: tq.testAttempt.id,
        testTitle: tq.testAttempt.title,
        score: tq.testAttempt.score,
        percentage: tq.testAttempt.percentage,
      })),
    }

    // Update question view count and popularity (async)
    prisma.question
      .update({
        where: { id },
        data: {
          popularityScore: { increment: 0.1 },
        },
      })
      .catch((error) => {
        logger.error('Error updating question popularity:', error)
      })

    // Log question access
    logger.info('Question accessed:', {
      questionId: id,
      userId: user.id,
      topic: question.topic,
      type: question.type,
      userAttempts: userStats.totalAttempts,
    })

    return NextResponse.json({
      success: true,
      data: responseData,
    })
  } catch (error) {
    logger.error('Error fetching question:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch question',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}

// PUT /api/questions/[id] - Update question
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = updateQuestionSchema.parse(body)

    const session = await validateUserSession(request)
    if (!session.valid) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTH_REQUIRED' },
        { status: 401 }
      )
    }

    const user = {
      id: session.userId!,
      role: session.role!,
      email: session.email!,
      name: session.name!,
    }

    // Get existing question to check ownership
    const existingQuestion = await prisma.question.findUnique({
      where: { id },
      select: { id: true, verifiedBy: true },
    })

    if (!existingQuestion) {
      return NextResponse.json({ error: 'Question not found', code: 'NOT_FOUND' }, { status: 404 })
    }

    if (!checkPermissions(user, 'update', existingQuestion.verifiedBy || undefined)) {
      return NextResponse.json(
        { error: 'Insufficient permissions', code: 'FORBIDDEN' },
        { status: 403 }
      )
    }

    // Rate limiting
    const rateLimitResult = await withRateLimit(request, {
      identifier: user.id,
      limit: 100, // 100 updates per hour
      window: 3600000,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', code: 'RATE_LIMIT_EXCEEDED' },
        { status: 429 }
      )
    }

    // Validate MCQ questions have options
    if (validatedData.type === 'MCQ' && validatedData.options && validatedData.options.length < 2) {
      return NextResponse.json(
        {
          error: 'MCQ questions must have at least 2 options',
          code: 'INVALID_MCQ_OPTIONS',
        },
        { status: 400 }
      )
    }

    // Validate correct answer is in options for MCQ
    if (
      validatedData.type === 'MCQ' &&
      validatedData.options &&
      validatedData.correctAnswer &&
      !validatedData.options.includes(validatedData.correctAnswer)
    ) {
      return NextResponse.json(
        {
          error: 'Correct answer must be one of the provided options',
          code: 'INVALID_CORRECT_ANSWER',
        },
        { status: 400 }
      )
    }

    // Prepare update data
    const updateData: any = {
      ...validatedData,
      updatedAt: new Date(),
    }

    // If non-admin user updates verified question, mark as unverified
    if (user.role !== 'ADMIN' && validatedData.isVerified !== false) {
      updateData.isVerified = false
      updateData.verifiedBy = null
    }

    // If admin updates, mark as verified
    if (user.role === 'ADMIN') {
      updateData.verifiedBy = user.id
      if (validatedData.isVerified === undefined) {
        updateData.isVerified = true
      }
    }

    // Update the question
    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: updateData,
    })

    // Log question update
    logger.info('Question updated:', {
      questionId: id,
      updatedBy: user.id,
      updatedFields: Object.keys(validatedData),
      wasReVerified: user.role === 'ADMIN',
    })

    return NextResponse.json({
      success: true,
      data: {
        question: {
          id: updatedQuestion.id,
          topic: updatedQuestion.topic,
          subtopic: updatedQuestion.subtopic,
          type: updatedQuestion.type,
          difficulty: updatedQuestion.difficulty,
          curriculum: updatedQuestion.curriculum,
          grade: updatedQuestion.grade,
          subject: updatedQuestion.subject,
          question: updatedQuestion.question,
          options: updatedQuestion.options,
          correctAnswer: updatedQuestion.correctAnswer,
          explanation: updatedQuestion.explanation,
          marks: updatedQuestion.marks,
          tags: updatedQuestion.tags,
          isActive: updatedQuestion.isActive,
          isVerified: updatedQuestion.isVerified,
          updatedAt: updatedQuestion.updatedAt,
        },
      },
      meta: {
        wasReVerified: user.role === 'ADMIN',
        needsReview: user.role !== 'ADMIN' && !updatedQuestion.isVerified,
      },
    })
  } catch (error) {
    logger.error('Error updating question:', error)

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
        error: 'Failed to update question',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}

// DELETE /api/questions/[id] - Delete question
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const session = await validateUserSession(request)
    if (!session.valid) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTH_REQUIRED' },
        { status: 401 }
      )
    }

    const user = {
      id: session.userId!,
      role: session.role!,
      email: session.email!,
      name: session.name!,
    }

    // Get existing question to check ownership and usage
    const existingQuestion = await prisma.question.findUnique({
      where: { id },
      select: {
        id: true,
        topic: true,
        verifiedBy: true,
        totalAttempts: true,
        _count: {
          select: {
            testQuestions: true,
            userResponses: true,
            questionBank: true,
          },
        },
      },
    })

    if (!existingQuestion) {
      return NextResponse.json({ error: 'Question not found', code: 'NOT_FOUND' }, { status: 404 })
    }

    if (!checkPermissions(user, 'delete', existingQuestion.verifiedBy || undefined)) {
      return NextResponse.json(
        { error: 'Insufficient permissions', code: 'FORBIDDEN' },
        { status: 403 }
      )
    }

    // Check if question is in use
    const isInUse =
      existingQuestion._count.testQuestions > 0 ||
      existingQuestion._count.userResponses > 0 ||
      existingQuestion._count.questionBank > 0

    if (isInUse && user.role !== 'ADMIN') {
      return NextResponse.json(
        {
          error: 'Cannot delete question that is in use. Contact admin for assistance.',
          code: 'QUESTION_IN_USE',
          details: {
            testUsages: existingQuestion._count.testQuestions,
            userResponses: existingQuestion._count.userResponses,
            questionBanks: existingQuestion._count.questionBank,
          },
        },
        { status: 409 }
      )
    }

    // If question is in use but admin is deleting, soft delete
    if (isInUse) {
      await prisma.question.update({
        where: { id },
        data: {
          isActive: false,
          updatedAt: new Date(),
        },
      })

      logger.info('Question soft deleted (in use):', {
        questionId: id,
        deletedBy: user.id,
        topic: existingQuestion.topic,
        usageCount: existingQuestion.totalAttempts,
      })

      return NextResponse.json({
        success: true,
        message: 'Question deactivated successfully (soft delete due to usage)',
        action: 'soft_delete',
      })
    }

    // Hard delete if not in use
    await prisma.question.delete({
      where: { id },
    })

    logger.info('Question deleted:', {
      questionId: id,
      deletedBy: user.id,
      topic: existingQuestion.topic,
    })

    return NextResponse.json({
      success: true,
      message: 'Question deleted successfully',
      action: 'hard_delete',
    })
  } catch (error) {
    logger.error('Error deleting question:', error)
    return NextResponse.json(
      {
        error: 'Failed to delete question',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}
