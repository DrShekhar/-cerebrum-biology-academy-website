import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { validateUserSession } from '@/lib/auth/config'
import { withRateLimit } from '@/lib/middleware/rateLimit'
import { logger } from '@/lib/utils/logger'

// Validation schema for test creation
const createTestSchema = z.object({
  testTemplateId: z.string().optional(),
  testType: z
    .enum([
      'PRACTICE_TEST',
      'MOCK_TEST',
      'FULL_TEST',
      'QUICK_TEST',
      'ADAPTIVE_TEST',
      'TIMED_TEST',
      'DIAGNOSTIC_TEST',
    ])
    .default('PRACTICE_TEST'),
  category: z
    .enum([
      'TOPIC_WISE',
      'SUBJECT_WISE',
      'FULL_SYLLABUS',
      'CHAPTER_WISE',
      'DIFFICULTY_WISE',
      'PREVIOUS_YEAR',
      'MIXED',
    ])
    .default('TOPIC_WISE'),
  curriculum: z.string().default('NEET'),
  grade: z.string().default('CLASS_12'),
  subject: z.string().default('biology'),
  topics: z.array(z.string()).min(1, 'At least one topic is required'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD', 'EXPERT']).default('MEDIUM'),
  questionCount: z.number().min(1).max(200).default(30),
  timeLimit: z.number().min(1).max(480).default(60), // minutes
  negativeMarking: z.boolean().default(false),
  customSettings: z
    .object({
      isAdaptive: z.boolean().default(false),
      shuffleQuestions: z.boolean().default(true),
      showResults: z.boolean().default(true),
      allowReview: z.boolean().default(true),
      enableProctoring: z.boolean().default(false),
    })
    .optional(),
})

async function generateTestQuestions(params: {
  topics: string[]
  difficulty: string
  questionCount: number
  curriculum: string
  grade: string
  subject: string
}) {
  const { topics, difficulty, questionCount, curriculum, grade, subject } = params

  try {
    // Fetch questions based on criteria
    const questions = await prisma.questions.findMany({
      where: {
        topic: { in: topics },
        difficulty: difficulty as any,
        curriculum,
        grade,
        subject,
        isActive: true,
        isVerified: true,
      },
      orderBy: {
        popularityScore: 'desc',
      },
      take: questionCount * 2, // Get more questions to allow for randomization
    })

    if (questions.length < questionCount) {
      // If not enough questions, try with relaxed criteria
      const additionalQuestions = await prisma.questions.findMany({
        where: {
          topic: { in: topics },
          curriculum,
          subject,
          isActive: true,
          isVerified: true,
        },
        orderBy: {
          popularityScore: 'desc',
        },
        take: questionCount,
      })

      if (additionalQuestions.length < questionCount) {
        throw new Error(
          `Not enough questions available. Found ${additionalQuestions.length}, need ${questionCount}`
        )
      }

      return additionalQuestions.slice(0, questionCount)
    }

    // Randomize and select required number of questions
    const shuffled = questions.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, questionCount)
  } catch (error) {
    logger.error('Error generating test questions:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createTestSchema.parse(body)

    // Extract user from auth middleware
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

    // Rate limiting
    const rateLimitResult = await withRateLimit(request, {
      identifier: user.id,
      limit: 10, // 10 test creations per hour
      window: 3600000,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', code: 'RATE_LIMIT_EXCEEDED' },
        { status: 429 }
      )
    }

    // Generate questions for the test
    const questions = await generateTestQuestions({
      topics: validatedData.topics,
      difficulty: validatedData.difficulty,
      questionCount: validatedData.questionCount,
      curriculum: validatedData.curriculum,
      grade: validatedData.grade,
      subject: validatedData.subject,
    })

    // Create test template if not provided
    let testTemplateId = validatedData.testTemplateId

    if (!testTemplateId) {
      const testTemplate = await prisma.test_templates.create({
        data: {
          title: `${validatedData.topics.join(', ')} Test - ${validatedData.difficulty}`,
          description: `Auto-generated test for topics: ${validatedData.topics.join(', ')}`,
          slug: `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: validatedData.testType,
          category: validatedData.category,
          difficulty: validatedData.difficulty,
          timeLimit: validatedData.timeLimit,
          totalQuestions: validatedData.questionCount,
          totalMarks: validatedData.questionCount, // 1 mark per question
          curriculum: validatedData.curriculum,
          grade: validatedData.grade,
          subject: validatedData.subject,
          topics: validatedData.topics,
          negativeMarking: validatedData.negativeMarking,
          isAdaptive: validatedData.customSettings?.isAdaptive || false,
          isActive: true,
          isPublished: false, // Auto-generated tests are not published by default
          createdBy: user.id,
        },
      })
      testTemplateId = testTemplate.id
    }

    // Create test session
    const testSession = await prisma.test_sessions.create({
      data: {
        userId: user.id,
        testTemplateId,
        sessionToken: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'NOT_STARTED',
        remainingTime: validatedData.timeLimit * 60, // Convert to seconds
        browserInfo: {
          userAgent: request.headers.get('user-agent'),
          ip: request.headers.get('x-forwarded-for') || 'unknown',
        },
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      },
      include: {
        test_templates: {
          select: {
            id: true,
            title: true,
            description: true,
            type: true,
            category: true,
            difficulty: true,
            timeLimit: true,
            totalQuestions: true,
            totalMarks: true,
            topics: true,
            negativeMarking: true,
            isAdaptive: true,
          },
        },
      },
    })

    // Create question bank for this test session
    const questionBank = await prisma.question_banks.create({
      data: {
        name: `Test Session ${testSession.id} Questions`,
        description: `Questions for test session ${testSession.id}`,
        category: 'CUSTOM',
        curriculum: validatedData.curriculum,
        grade: validatedData.grade,
        subject: validatedData.subject,
        topics: validatedData.topics,
        totalQuestions: questions.length,
        activeQuestions: questions.length,
        isActive: true,
        isPublic: false,
        createdBy: user.id,
      },
    })

    // Add questions to the question bank
    await prisma.question_bank_questions.createMany({
      data: questions.map((question, index) => ({
        questionBankId: questionBank.id,
        questionId: question.id,
        testTemplateId: testTemplateId,
        orderIndex: index,
        groupLabel: `Question ${index + 1}`,
      })),
    })

    // Log test creation
    logger.info('Test session created:', {
      testSessionId: testSession.id,
      userId: user.id,
      testTemplateId,
      questionCount: questions.length,
      topics: validatedData.topics,
    })

    // Update test template attempt count
    await prisma.test_templates.update({
      where: { id: testTemplateId },
      data: {
        attemptCount: { increment: 1 },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        testSession: {
          id: testSession.id,
          sessionToken: testSession.sessionToken,
          status: testSession.status,
          timeLimit: testSession.test_templates?.timeLimit,
          remainingTime: testSession.remainingTime,
          currentQuestionIndex: testSession.currentQuestionIndex,
          testTemplate: testSession.test_templates,
        },
        questionBank: {
          id: questionBank.id,
          totalQuestions: questions.length,
        },
        questions: questions.map((q, index) => ({
          id: q.id,
          index: index + 1,
          topic: q.topic,
          difficulty: q.difficulty,
          type: q.type,
          marks: q.marks,
          timeLimit: q.timeLimit,
        })),
      },
      meta: {
        questionsGenerated: questions.length,
        requestedQuestions: validatedData.questionCount,
        topics: validatedData.topics,
        difficulty: validatedData.difficulty,
      },
    })
  } catch (error) {
    logger.error('Error creating test session:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    if (error instanceof Error && error.message.includes('Not enough questions')) {
      return NextResponse.json(
        {
          error: error.message,
          code: 'INSUFFICIENT_QUESTIONS',
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to create test session',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}

// GET method to retrieve test creation options
export async function GET(request: NextRequest) {
  try {
    const session = await validateUserSession(request)
    if (!session.valid) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTH_REQUIRED' },
        { status: 401 }
      )
    }

    // Get available topics, curricula, and other options
    const [topics, curricula, grades] = await Promise.all([
      prisma.questions.findMany({
        select: { topic: true },
        distinct: ['topic'],
        where: { isActive: true, isVerified: true },
      }),
      prisma.questions.findMany({
        select: { curriculum: true },
        distinct: ['curriculum'],
        where: { isActive: true, isVerified: true },
      }),
      prisma.questions.findMany({
        select: { grade: true },
        distinct: ['grade'],
        where: { isActive: true, isVerified: true },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        availableTopics: topics.map((t) => t.topic),
        availableCurricula: curricula.map((c) => c.curriculum),
        availableGrades: grades.map((g) => g.grade),
        testTypes: [
          'PRACTICE_TEST',
          'MOCK_TEST',
          'FULL_TEST',
          'QUICK_TEST',
          'ADAPTIVE_TEST',
          'TIMED_TEST',
          'DIAGNOSTIC_TEST',
        ],
        categories: [
          'TOPIC_WISE',
          'SUBJECT_WISE',
          'FULL_SYLLABUS',
          'CHAPTER_WISE',
          'DIFFICULTY_WISE',
          'PREVIOUS_YEAR',
          'MIXED',
        ],
        difficulties: ['EASY', 'MEDIUM', 'HARD', 'EXPERT'],
        subjects: ['biology', 'botany', 'zoology'],
      },
    })
  } catch (error) {
    logger.error('Error fetching test creation options:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch test creation options',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}
