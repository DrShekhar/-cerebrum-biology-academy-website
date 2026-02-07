import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { validateUserSession } from '@/lib/auth/config'
import { withRateLimit } from '@/lib/middleware/rateLimit'
import { logger } from '@/lib/utils/logger'

// Validation schema for question creation
const createQuestionSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  subtopic: z.string().optional(),
  curriculum: z.string().default('NEET'),
  grade: z.string().default('CLASS_12'),
  subject: z.string().default('biology'),
  type: z.enum([
    'MCQ',
    'SHORT_ANSWER',
    'DIAGRAM',
    'TRUE_FALSE',
    'FILL_BLANK',
    'MULTIPLE_SELECT',
    'MATCH_FOLLOWING',
    'NUMERICAL',
  ]),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD', 'EXPERT']).default('MEDIUM'),
  question: z.string().min(10, 'Question must be at least 10 characters'),
  options: z.array(z.string()).optional(), // Required for MCQ, optional for others
  correctAnswer: z.string().min(1, 'Correct answer is required'),
  explanation: z.string().optional(),
  solutionSteps: z.array(z.string()).optional(),
  questionImage: z.string().url().optional(),
  explanationImage: z.string().url().optional(),
  videoExplanation: z.string().url().optional(),
  source: z.string().optional(),
  examYear: z.number().optional(),
  marks: z.number().min(1).default(1),
  timeLimit: z.number().min(30).optional(),
  tags: z.array(z.string()).optional(),
  relatedConcepts: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  category: z
    .enum(['PRACTICE', 'MOCK_TEST', 'PREVIOUS_YEAR', 'CONCEPT_BUILDER', 'COMPETITIVE'])
    .default('PRACTICE'),
})

// Validation schema for filtering questions
const questionFiltersSchema = z.object({
  topic: z.string().optional(),
  subtopic: z.string().optional(),
  curriculum: z.string().optional(),
  grade: z.string().optional(),
  subject: z.string().optional(),
  type: z.string().optional(),
  difficulty: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).or(z.string()).optional(),
  isActive: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z
    .enum(['createdAt', 'updatedAt', 'popularityScore', 'difficulty', 'topic'])
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().optional(),
})

// Helper function to check permissions
function checkPermissions(user: any, action: 'read' | 'create' | 'update' | 'delete') {
  const adminRoles = ['ADMIN', 'TEACHER']

  switch (action) {
    case 'read':
      return true // Everyone can read questions
    case 'create':
    case 'update':
    case 'delete':
      return adminRoles.includes(user.role)
    default:
      return false
  }
}

// Helper function to build search filters
function buildSearchFilters(filters: any) {
  const where: any = {}

  if (filters.topic) where.topic = { contains: filters.topic, mode: 'insensitive' }
  if (filters.subtopic) where.subtopic = { contains: filters.subtopic, mode: 'insensitive' }
  if (filters.curriculum) where.curriculum = filters.curriculum
  if (filters.grade) where.grade = filters.grade
  if (filters.subject) where.subject = filters.subject
  if (filters.type) where.type = filters.type
  if (filters.difficulty) where.difficulty = filters.difficulty
  if (filters.category) where.category = filters.category
  if (filters.isActive !== undefined) where.isActive = filters.isActive
  if (filters.isVerified !== undefined) where.isVerified = filters.isVerified

  if (filters.tags) {
    const tags = Array.isArray(filters.tags) ? filters.tags : [filters.tags]
    where.tags = {
      array_contains: tags,
    }
  }

  if (filters.search) {
    where.OR = [
      { question: { contains: filters.search, mode: 'insensitive' } },
      { topic: { contains: filters.search, mode: 'insensitive' } },
      { explanation: { contains: filters.search, mode: 'insensitive' } },
    ]
  }

  return where
}

// GET /api/questions - Get questions with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const filters = questionFiltersSchema.parse({
      topic: searchParams.get('topic') || undefined,
      subtopic: searchParams.get('subtopic') || undefined,
      curriculum: searchParams.get('curriculum') || undefined,
      grade: searchParams.get('grade') || undefined,
      subject: searchParams.get('subject') || undefined,
      type: searchParams.get('type') || undefined,
      difficulty: searchParams.get('difficulty') || undefined,
      category: searchParams.get('category') || undefined,
      tags: searchParams.get('tags')?.split(',') || undefined,
      isActive: searchParams.get('isActive') ? searchParams.get('isActive') === 'true' : undefined,
      isVerified: searchParams.get('isVerified')
        ? searchParams.get('isVerified') === 'true'
        : undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20,
      sortBy: (searchParams.get('sortBy') as any) || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as any) || 'desc',
      search: searchParams.get('search') || undefined,
    })

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
      limit: 200, // 200 requests per hour
      window: 3600000,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', code: 'RATE_LIMIT_EXCEEDED' },
        { status: 429 }
      )
    }

    // Build search filters
    const where = buildSearchFilters(filters)

    // Calculate pagination
    const skip = (filters.page - 1) * filters.limit

    // Get questions with count
    const [questions, totalCount] = await Promise.all([
      prisma.questions.findMany({
        where,
        select: {
          id: true,
          topic: true,
          subtopic: true,
          curriculum: true,
          grade: true,
          subject: true,
          type: true,
          difficulty: true,
          question: true,
          options: true,
          // Don't include correct answer in list view for students
          ...((user.role === 'ADMIN' || user.role === 'TEACHER') && {
            correctAnswer: true,
            explanation: true,
          }),
          questionImage: true,
          marks: true,
          timeLimit: true,
          tags: true,
          relatedConcepts: true,
          source: true,
          examYear: true,
          category: true,
          totalAttempts: true,
          correctAttempts: true,
          popularityScore: true,
          isActive: true,
          isVerified: true,
          createdAt: true,
          updatedAt: true,
        },
        skip,
        take: filters.limit,
        orderBy: {
          [filters.sortBy]: filters.sortOrder,
        },
      }),
      prisma.questions.count({ where }),
    ])

    // Calculate success rate for each question
    const questionsWithStats = questions.map((q) => ({
      ...q,
      successRate:
        q.totalAttempts > 0
          ? Math.round((q.correctAttempts / q.totalAttempts) * 100 * 100) / 100
          : 0,
      // Calculate difficulty rating based on success rate
      perceivedDifficulty:
        q.totalAttempts > 10
          ? q.correctAttempts / q.totalAttempts > 0.8
            ? 'EASY'
            : q.correctAttempts / q.totalAttempts > 0.5
              ? 'MEDIUM'
              : 'HARD'
          : q.difficulty,
    }))

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / filters.limit)
    const hasMore = filters.page < totalPages

    // Get filter options for frontend
    const filterOptions = await Promise.all([
      prisma.questions.findMany({
        select: { topic: true },
        distinct: ['topic'],
        where: { isActive: true },
      }),
      prisma.questions.findMany({
        select: { curriculum: true },
        distinct: ['curriculum'],
        where: { isActive: true },
      }),
      prisma.questions.findMany({
        select: { grade: true },
        distinct: ['grade'],
        where: { isActive: true },
      }),
    ])

    const response = {
      success: true,
      data: {
        questions: questionsWithStats,
        pagination: {
          currentPage: filters.page,
          totalPages,
          totalCount,
          limit: filters.limit,
          hasMore,
          hasPrevious: filters.page > 1,
        },
        filters: {
          applied: filters,
          available: {
            topics: filterOptions[0].map((t) => t.topic).sort(),
            curricula: filterOptions[1].map((c) => c.curriculum).sort(),
            grades: filterOptions[2].map((g) => g.grade).sort(),
            types: [
              'MCQ',
              'SHORT_ANSWER',
              'DIAGRAM',
              'TRUE_FALSE',
              'FILL_BLANK',
              'MULTIPLE_SELECT',
              'MATCH_FOLLOWING',
              'NUMERICAL',
            ],
            difficulties: ['EASY', 'MEDIUM', 'HARD', 'EXPERT'],
            categories: [
              'PRACTICE',
              'MOCK_TEST',
              'PREVIOUS_YEAR',
              'CONCEPT_BUILDER',
              'COMPETITIVE',
            ],
          },
        },
        statistics: {
          totalActive: await prisma.questions.count({ where: { isActive: true } }),
          totalVerified: await prisma.questions.count({ where: { isVerified: true } }),
          byDifficulty: await prisma.questions.groupBy({
            by: ['difficulty'],
            _count: { id: true },
            where: { isActive: true },
          }),
          byType: await prisma.questions.groupBy({
            by: ['type'],
            _count: { id: true },
            where: { isActive: true },
          }),
        },
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    logger.error('Error fetching questions:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid query parameters',
          code: 'VALIDATION_ERROR',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to fetch questions',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}

// POST /api/questions - Create new question
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createQuestionSchema.parse(body)

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

    if (!checkPermissions(user, 'create')) {
      return NextResponse.json(
        { error: 'Insufficient permissions', code: 'FORBIDDEN' },
        { status: 403 }
      )
    }

    // Rate limiting for question creation
    const rateLimitResult = await withRateLimit(request, {
      identifier: user.id,
      limit: 50, // 50 question creations per hour
      window: 3600000,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', code: 'RATE_LIMIT_EXCEEDED' },
        { status: 429 }
      )
    }

    // Validate MCQ questions have options
    if (
      validatedData.type === 'MCQ' &&
      (!validatedData.options || validatedData.options.length < 2)
    ) {
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

    // Generate slug for the question
    const slug = `${validatedData.topic.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Create the question
    const question = await prisma.questions.create({
      data: {
        ...validatedData,
        slug,
        isActive: true,
        isVerified: user.role === 'ADMIN', // Admin questions are auto-verified
        verifiedBy: user.role === 'ADMIN' ? user.id : undefined,
        qualityScore: 0.8, // Default quality score, could be calculated by AI
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    // Log question creation
    logger.info('Question created:', {
      questionId: question.id,
      topic: question.topic,
      type: question.type,
      difficulty: question.difficulty,
      createdBy: user.id,
    })

    return NextResponse.json({
      success: true,
      data: {
        question: {
          id: question.id,
          topic: question.topic,
          subtopic: question.subtopic,
          type: question.type,
          difficulty: question.difficulty,
          curriculum: question.curriculum,
          grade: question.grade,
          subject: question.subject,
          question: question.question,
          options: question.options,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
          marks: question.marks,
          tags: question.tags,
          isActive: question.isActive,
          isVerified: question.isVerified,
          createdAt: question.createdAt,
        },
      },
      meta: {
        autoVerified: user.role === 'ADMIN',
        needsReview: user.role !== 'ADMIN',
      },
    })
  } catch (error) {
    logger.error('Error creating question:', error)

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

    return NextResponse.json(
      {
        error: 'Failed to create question',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}
