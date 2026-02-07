import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { validateUserSession } from '@/lib/auth/config'
import { withRateLimit } from '@/lib/middleware/rateLimit'
import { logger } from '@/lib/utils/logger'

// Validation schema for random question generation
const randomQuestionSchema = z.object({
  count: z.number().min(1).max(100).default(10),
  topics: z.array(z.string()).optional(),
  curriculum: z.string().default('NEET'),
  grade: z.string().default('CLASS_12'),
  subject: z.string().default('biology'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD', 'EXPERT']).optional(),
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
  category: z
    .enum(['PRACTICE', 'MOCK_TEST', 'PREVIOUS_YEAR', 'CONCEPT_BUILDER', 'COMPETITIVE'])
    .optional(),
  excludeIds: z.array(z.string()).optional(), // Exclude specific question IDs
  includeAnswered: z.boolean().default(true), // Include questions user has already answered
  adaptiveMode: z.boolean().default(false), // Use adaptive difficulty based on user performance
  weightByPerformance: z.boolean().default(false), // Weight selection by user's topic performance
})

// Helper function to get user's topic performance for adaptive selection
async function getUserTopicPerformance(
  userId: string,
  freeUserId: string | null,
  topics: string[]
) {
  try {
    const userProgress = await prisma.user_progress.findMany({
      where: {
        ...(freeUserId ? { freeUserId } : { userId }),
        topic: { in: topics },
      },
      select: {
        topic: true,
        accuracy: true,
        masteryScore: true,
        currentLevel: true,
      },
    })

    return userProgress.reduce(
      (acc, progress) => {
        acc[progress.topic] = {
          accuracy: progress.accuracy,
          masteryScore: progress.masteryScore,
          currentLevel: progress.currentLevel,
        }
        return acc
      },
      {} as Record<string, any>
    )
  } catch (error) {
    logger.error('Error fetching user topic performance:', error)
    return {}
  }
}

// Helper function to calculate adaptive difficulty
function calculateAdaptiveDifficulty(
  topicPerformance: Record<string, any>,
  topic: string
): string[] {
  const performance = topicPerformance[topic]

  if (!performance) {
    return ['EASY', 'MEDIUM'] // Default for unknown topics
  }

  const accuracy = performance.accuracy || 0
  const masteryScore = performance.masteryScore || 0

  if (accuracy >= 80 && masteryScore >= 75) {
    return ['MEDIUM', 'HARD', 'EXPERT']
  } else if (accuracy >= 60 && masteryScore >= 50) {
    return ['EASY', 'MEDIUM', 'HARD']
  } else if (accuracy >= 40) {
    return ['EASY', 'MEDIUM']
  } else {
    return ['EASY']
  }
}

// Helper function to build weighted random selection
function buildWeightedFilters(
  params: any,
  topicPerformance: Record<string, any>,
  userAnsweredQuestions: string[]
) {
  const baseFilters: any = {
    isActive: true,
    isVerified: true,
    curriculum: params.curriculum,
    grade: params.grade,
    subject: params.subject,
  }

  // Add topic filters
  if (params.topics && params.topics.length > 0) {
    baseFilters.topic = { in: params.topics }
  }

  // Add type filter
  if (params.type) {
    baseFilters.type = params.type
  }

  // Add category filter
  if (params.category) {
    baseFilters.category = params.category
  }

  // Exclude specific IDs
  if (params.excludeIds && params.excludeIds.length > 0) {
    baseFilters.id = { notIn: params.excludeIds }
  }

  // Exclude answered questions if requested
  if (!params.includeAnswered && userAnsweredQuestions.length > 0) {
    baseFilters.id = {
      ...baseFilters.id,
      notIn: [...(baseFilters.id?.notIn || []), ...userAnsweredQuestions],
    }
  }

  // Handle adaptive difficulty
  if (params.adaptiveMode && params.topics) {
    const adaptiveDifficulties = new Set<string>()

    params.topics.forEach((topic: string) => {
      const difficulties = calculateAdaptiveDifficulty(topicPerformance, topic)
      difficulties.forEach((d) => adaptiveDifficulties.add(d))
    })

    baseFilters.difficulty = { in: Array.from(adaptiveDifficulties) }
  } else if (params.difficulty) {
    baseFilters.difficulty = params.difficulty
  }

  return baseFilters
}

// Helper function to apply weighted randomization
function applyWeightedRandomization(
  questions: any[],
  topicPerformance: Record<string, any>,
  requestedCount: number
) {
  // If no weighting needed or no performance data, return simple random selection
  if (Object.keys(topicPerformance).length === 0) {
    return questions.sort(() => 0.5 - Math.random()).slice(0, requestedCount)
  }

  // Calculate weights for each question based on user performance
  const weightedQuestions = questions.map((question) => {
    const topicPerf = topicPerformance[question.topic]
    let weight = 1.0

    if (topicPerf) {
      const accuracy = topicPerf.accuracy || 0
      const masteryScore = topicPerf.masteryScore || 0

      // Higher weight for topics with lower performance (need more practice)
      if (accuracy < 40) {
        weight = 3.0
      } else if (accuracy < 60) {
        weight = 2.5
      } else if (accuracy < 80) {
        weight = 2.0
      } else {
        weight = 1.5
      }

      // Adjust weight based on mastery score
      weight *= (100 - masteryScore) / 100 + 0.5
    }

    return { question, weight }
  })

  // Weighted random selection
  const selected = []
  const remaining = [...weightedQuestions]

  for (let i = 0; i < requestedCount && remaining.length > 0; i++) {
    // Calculate cumulative weights
    const totalWeight = remaining.reduce((sum, item) => sum + item.weight, 0)
    const randomWeight = Math.random() * totalWeight

    // Select based on weight
    let selectedIndex = 0
    let cumulativeWeight = 0

    for (let j = 0; j < remaining.length; j++) {
      cumulativeWeight += remaining[j].weight
      if (randomWeight <= cumulativeWeight) {
        selectedIndex = j
        break
      }
    }

    selected.push(remaining[selectedIndex].question)
    remaining.splice(selectedIndex, 1)
  }

  return selected
}

// GET /api/questions/random - Get random questions for test generation
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const params = randomQuestionSchema.parse({
      count: searchParams.get('count') ? parseInt(searchParams.get('count')!) : 10,
      topics: searchParams.get('topics')?.split(',') || undefined,
      curriculum: searchParams.get('curriculum') || 'NEET',
      grade: searchParams.get('grade') || 'CLASS_12',
      subject: searchParams.get('subject') || 'biology',
      difficulty: (searchParams.get('difficulty') as any) || undefined,
      type: (searchParams.get('type') as any) || undefined,
      category: (searchParams.get('category') as any) || undefined,
      excludeIds: searchParams.get('excludeIds')?.split(',') || undefined,
      includeAnswered: searchParams.get('includeAnswered') !== 'false',
      adaptiveMode: searchParams.get('adaptiveMode') === 'true',
      weightByPerformance: searchParams.get('weightByPerformance') === 'true',
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

    // Rate limiting
    const rateLimitResult = await withRateLimit(request, {
      identifier: user.id,
      limit: 100, // 100 random question requests per hour
      window: 3600000,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', code: 'RATE_LIMIT_EXCEEDED' },
        { status: 429 }
      )
    }

    // Get user's answered questions if needed
    const userAnsweredQuestions = !params.includeAnswered
      ? await prisma.userQuestionResponse
          .findMany({
            where: {
              ...(user.role === 'STUDENT' ? { userId: user.id } : { freeUserId: user.id }),
            },
            select: { questionId: true },
          })
          .then((responses) => responses.map((r) => r.questionId))
      : []

    // Get user's topic performance for adaptive/weighted selection
    let topicPerformance = {}
    if ((params.adaptiveMode || params.weightByPerformance) && params.topics) {
      topicPerformance = await getUserTopicPerformance(
        user.id,
        user.role === 'STUDENT' ? null : user.id,
        params.topics
      )
    }

    // Build filters for question selection
    const filters = buildWeightedFilters(params, topicPerformance, userAnsweredQuestions)

    // Get more questions than needed to allow for proper randomization
    const fetchCount = Math.min(params.count * 3, 300) // Fetch 3x the needed amount, max 300

    const questions = await prisma.questions.findMany({
      where: filters,
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
        questionImage: true,
        marks: true,
        timeLimit: true,
        tags: true,
        relatedConcepts: true,
        category: true,
        popularityScore: true,
        totalAttempts: true,
        correctAttempts: true,
        createdAt: true,
      },
      take: fetchCount,
      orderBy: [{ popularityScore: 'desc' }, { createdAt: 'desc' }],
    })

    if (questions.length === 0) {
      return NextResponse.json(
        {
          error: 'No questions found matching the criteria',
          code: 'NO_QUESTIONS_FOUND',
          suggestions: [
            'Try relaxing the filters',
            'Include previously answered questions',
            'Expand topic selection',
            'Change difficulty level',
          ],
        },
        { status: 404 }
      )
    }

    // Apply weighted randomization or simple random selection
    const selectedQuestions = params.weightByPerformance
      ? applyWeightedRandomization(questions, topicPerformance, params.count)
      : questions.sort(() => 0.5 - Math.random()).slice(0, params.count)

    // Add success rate and difficulty rating to each question
    const questionsWithStats = selectedQuestions.map((q, index) => ({
      ...q,
      index: index + 1,
      successRate:
        q.totalAttempts > 0
          ? Math.round((q.correctAttempts / q.totalAttempts) * 100 * 100) / 100
          : null,
      estimatedDifficulty:
        q.totalAttempts > 10
          ? q.correctAttempts / q.totalAttempts > 0.8
            ? 'EASY'
            : q.correctAttempts / q.totalAttempts > 0.5
              ? 'MEDIUM'
              : 'HARD'
          : q.difficulty,
      isAdaptive: params.adaptiveMode,
      weightApplied: params.weightByPerformance ? topicPerformance[q.topic] : null,
    }))

    // Calculate selection statistics
    const topicDistribution = questionsWithStats.reduce(
      (acc, q) => {
        acc[q.topic] = (acc[q.topic] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const difficultyDistribution = questionsWithStats.reduce(
      (acc, q) => {
        acc[q.difficulty] = (acc[q.difficulty] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    // Log random question generation
    logger.info('Random questions generated:', {
      userId: user.id,
      requestedCount: params.count,
      actualCount: questionsWithStats.length,
      topics: params.topics,
      adaptiveMode: params.adaptiveMode,
      weightByPerformance: params.weightByPerformance,
      availablePool: questions.length,
    })

    return NextResponse.json({
      success: true,
      data: {
        questions: questionsWithStats,
        metadata: {
          requestedCount: params.count,
          actualCount: questionsWithStats.length,
          availablePool: questions.length,
          excludedCount: userAnsweredQuestions.length,
          adaptiveMode: params.adaptiveMode,
          weightByPerformance: params.weightByPerformance,
          selectionCriteria: {
            topics: params.topics,
            curriculum: params.curriculum,
            grade: params.grade,
            subject: params.subject,
            difficulty: params.difficulty,
            type: params.type,
            category: params.category,
          },
        },
        statistics: {
          topicDistribution,
          difficultyDistribution,
          averageMarks:
            Math.round(
              (questionsWithStats.reduce((sum, q) => sum + q.marks, 0) /
                questionsWithStats.length) *
                100
            ) / 100,
          averageSuccessRate:
            questionsWithStats.filter((q) => q.successRate !== null).length > 0
              ? Math.round(
                  (questionsWithStats
                    .filter((q) => q.successRate !== null)
                    .reduce((sum, q) => sum + (q.successRate || 0), 0) /
                    questionsWithStats.filter((q) => q.successRate !== null).length) *
                    100
                ) / 100
              : null,
        },
        userContext:
          params.adaptiveMode || params.weightByPerformance
            ? {
                topicPerformance,
                adaptiveDifficulties: params.topics
                  ? params.topics.reduce(
                      (acc, topic) => {
                        acc[topic] = calculateAdaptiveDifficulty(topicPerformance, topic)
                        return acc
                      },
                      {} as Record<string, string[]>
                    )
                  : {},
              }
            : null,
      },
    })
  } catch (error) {
    logger.error('Error generating random questions:', error)

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
        error: 'Failed to generate random questions',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}
