import { NextRequest, NextResponse } from 'next/server'
import { validateUserSession } from '@/lib/auth/config'
import { rateLimit } from '@/lib/rateLimit'
import { authenticQuestionBank, AuthenticQuestion } from '@/data/authenticQuestions'
import { allAdvancedQuestions } from '@/data/advancedQuestions'
import {
  cellBiologyQuestions,
  NEETQuestion,
  AssertionReasonQuestion,
  MatchFollowingQuestion,
  DiagramBasedQuestion,
  MultipleCorrectQuestion,
  NumericalQuestion,
  StatementBasedQuestion,
} from '@/data/neetQuestionBank'

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface TestConfig {
  title: string
  topics: string[]
  chapters?: string[]
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
  totalQuestions: number
  questionTypeDistribution?: {
    'single-correct': number
    'assertion-reason': number
    'match-following': number
    'diagram-based': number
    'multiple-correct': number
    numerical: number
    'statement-based': number
  }
  class: 'class-9' | 'class-10' | 'class-11' | 'class-12' | 'dropper'
  subject?: 'biology' | 'botany' | 'zoology' | 'mixed'
  duration: number
  negativeMarking?: number
  adaptiveDifficulty?: boolean
  previousYearQuestions?: boolean
}

interface GeneratedQuestion {
  id: string
  question: string
  questionType: string
  options: string[] | any
  correctAnswer: string | string[]
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  subtopic?: string
  marks: number
  timeLimit: number
  ncertReference?: string
  previousYearFrequency?: number
  bloomsLevel?: string
  tags: string[]
  relatedConcepts: string[]
}

// ============================================================================
// QUESTION POOL BUILDER
// ============================================================================

function buildQuestionPool(config: TestConfig): {
  singleCorrect: (AuthenticQuestion | NEETQuestion)[]
  assertionReason: AssertionReasonQuestion[]
  matchFollowing: MatchFollowingQuestion[]
  diagramBased: DiagramBasedQuestion[]
  multipleCorrect: MultipleCorrectQuestion[]
  numerical: NumericalQuestion[]
  statementBased: StatementBasedQuestion[]
} {
  // Get all questions for the selected class
  const classQuestions = authenticQuestionBank[config.class] || []

  // Filter by topics if specified
  let filteredQuestions = classQuestions
  if (config.topics && config.topics.length > 0) {
    filteredQuestions = filteredQuestions.filter(
      (q) => config.topics.includes(q.topicId) || config.chapters?.includes(q.chapterId)
    )
  }

  // Filter by difficulty if not 'mixed'
  if (config.difficulty !== 'mixed') {
    const difficultyMap: Record<string, string> = {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
    }
    filteredQuestions = filteredQuestions.filter(
      (q) => q.difficulty === difficultyMap[config.difficulty]
    )
  }

  // Add advanced questions (all 12 from advancedQuestions.ts)
  const advancedQuestionsPool = {
    assertionReason: allAdvancedQuestions.assertionReason,
    matchFollowing: allAdvancedQuestions.matchFollowing,
    diagramBased: allAdvancedQuestions.diagramBased,
    multipleCorrect: allAdvancedQuestions.multipleCorrect,
    numerical: allAdvancedQuestions.numerical,
    statementBased: allAdvancedQuestions.statementBased,
  }

  // Add cell biology questions from NEET bank
  const neetQuestions = [...cellBiologyQuestions]

  return {
    singleCorrect: [...filteredQuestions, ...neetQuestions],
    ...advancedQuestionsPool,
  }
}

// ============================================================================
// INTELLIGENT QUESTION SELECTION
// ============================================================================

function selectQuestions(
  pool: ReturnType<typeof buildQuestionPool>,
  config: TestConfig
): GeneratedQuestion[] {
  const selectedQuestions: GeneratedQuestion[] = []

  // Default distribution (80% single-correct, 15% assertion-reason, 5% others)
  const distribution = config.questionTypeDistribution || {
    'single-correct': Math.floor(config.totalQuestions * 0.8),
    'assertion-reason': Math.floor(config.totalQuestions * 0.15),
    'match-following': Math.floor(config.totalQuestions * 0.025),
    'diagram-based': Math.floor(config.totalQuestions * 0.025),
    'multiple-correct': 0,
    numerical: 0,
    'statement-based': 0,
  }

  // Helper function to shuffle array
  const shuffle = <T>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Helper function to convert to GeneratedQuestion format
  const convertToGeneratedQuestion = (q: any, type: string): GeneratedQuestion => {
    return {
      id: q.id,
      question: q.questionText || q.question || q.assertion || '',
      questionType: type,
      options: q.options || [],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || '',
      difficulty: (q.difficulty || 'medium').toLowerCase() as 'easy' | 'medium' | 'hard',
      topic: q.topicId || 'general',
      subtopic: q.chapterId || '',
      marks: 4,
      timeLimit: q.estimatedTimeSeconds || q.timeEstimate || 60,
      ncertReference: q.ncertReference || q.ncertPageReference,
      previousYearFrequency: q.previousYearFrequency,
      bloomsLevel: q.bloomsLevel,
      tags: q.tags || [],
      relatedConcepts: q.relatedConcepts || q.conceptualLinks || [],
    }
  }

  // Select single-correct questions
  const singleCorrectShuffled = shuffle(pool.singleCorrect)
  for (let i = 0; i < distribution['single-correct'] && i < singleCorrectShuffled.length; i++) {
    selectedQuestions.push(convertToGeneratedQuestion(singleCorrectShuffled[i], 'single-correct'))
  }

  // Select assertion-reason questions
  const assertionReasonShuffled = shuffle(pool.assertionReason)
  for (let i = 0; i < distribution['assertion-reason'] && i < assertionReasonShuffled.length; i++) {
    selectedQuestions.push(
      convertToGeneratedQuestion(assertionReasonShuffled[i], 'assertion-reason')
    )
  }

  // Select match-following questions
  const matchFollowingShuffled = shuffle(pool.matchFollowing)
  for (let i = 0; i < distribution['match-following'] && i < matchFollowingShuffled.length; i++) {
    selectedQuestions.push(convertToGeneratedQuestion(matchFollowingShuffled[i], 'match-following'))
  }

  // Select diagram-based questions
  const diagramBasedShuffled = shuffle(pool.diagramBased)
  for (let i = 0; i < distribution['diagram-based'] && i < diagramBasedShuffled.length; i++) {
    selectedQuestions.push(convertToGeneratedQuestion(diagramBasedShuffled[i], 'diagram-based'))
  }

  // Select multiple-correct questions (if requested)
  if (distribution['multiple-correct'] > 0) {
    const multipleCorrectShuffled = shuffle(pool.multipleCorrect)
    for (
      let i = 0;
      i < distribution['multiple-correct'] && i < multipleCorrectShuffled.length;
      i++
    ) {
      selectedQuestions.push(
        convertToGeneratedQuestion(multipleCorrectShuffled[i], 'multiple-correct')
      )
    }
  }

  // Select numerical questions (if requested)
  if (distribution['numerical'] > 0) {
    const numericalShuffled = shuffle(pool.numerical)
    for (let i = 0; i < distribution['numerical'] && i < numericalShuffled.length; i++) {
      selectedQuestions.push(convertToGeneratedQuestion(numericalShuffled[i], 'numerical'))
    }
  }

  // Select statement-based questions (if requested)
  if (distribution['statement-based'] > 0) {
    const statementBasedShuffled = shuffle(pool.statementBased)
    for (let i = 0; i < distribution['statement-based'] && i < statementBasedShuffled.length; i++) {
      selectedQuestions.push(
        convertToGeneratedQuestion(statementBasedShuffled[i], 'statement-based')
      )
    }
  }

  // Final shuffle to mix question types
  return shuffle(selectedQuestions)
}

// ============================================================================
// VALIDATION
// ============================================================================

function validateQuestionAvailability(
  pool: ReturnType<typeof buildQuestionPool>,
  config: TestConfig
): { isValid: boolean; message?: string; availableCount: number } {
  const distribution = config.questionTypeDistribution || {
    'single-correct': Math.floor(config.totalQuestions * 0.8),
    'assertion-reason': Math.floor(config.totalQuestions * 0.15),
    'match-following': Math.floor(config.totalQuestions * 0.025),
    'diagram-based': Math.floor(config.totalQuestions * 0.025),
    'multiple-correct': 0,
    numerical: 0,
    'statement-based': 0,
  }

  const availableCount =
    pool.singleCorrect.length +
    pool.assertionReason.length +
    pool.matchFollowing.length +
    pool.diagramBased.length +
    pool.multipleCorrect.length +
    pool.numerical.length +
    pool.statementBased.length

  if (availableCount < config.totalQuestions) {
    return {
      isValid: false,
      message: `Only ${availableCount} questions available for your selection. Please reduce total questions to ${availableCount} or select more topics.`,
      availableCount,
    }
  }

  // Check individual type availability
  if (pool.singleCorrect.length < distribution['single-correct']) {
    return {
      isValid: false,
      message: `Not enough single-correct questions available. Need ${distribution['single-correct']}, found ${pool.singleCorrect.length}`,
      availableCount,
    }
  }

  if (pool.assertionReason.length < distribution['assertion-reason']) {
    return {
      isValid: false,
      message: `Not enough assertion-reason questions available. Need ${distribution['assertion-reason']}, found ${pool.assertionReason.length}`,
      availableCount,
    }
  }

  return { isValid: true, availableCount }
}

// ============================================================================
// API HANDLER
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    // SECURITY: Rate limit test generation (20 per hour per IP)
    const rateLimitResult = await rateLimit(request, { maxRequests: 20, windowMs: 60 * 60 * 1000 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many test generation requests. Please try again later.' },
        { status: 429 }
      )
    }

    // SECURITY: Require authentication to protect question bank IP
    const session = await validateUserSession(request)
    if (!session.valid) {
      return NextResponse.json(
        { error: 'Authentication required to generate tests' },
        { status: 401 }
      )
    }

    // Parse request
    const config: TestConfig = await request.json()

    // Validate required fields
    if (!config.totalQuestions || config.totalQuestions < 1 || config.totalQuestions > 100) {
      return NextResponse.json(
        { error: 'Total questions must be between 1 and 100' },
        { status: 400 }
      )
    }

    if (!config.class) {
      return NextResponse.json({ error: 'Class selection is required' }, { status: 400 })
    }

    // Build question pool
    const questionPool = buildQuestionPool(config)

    // Validate availability
    const validation = validateQuestionAvailability(questionPool, config)
    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: validation.message,
          availableQuestions: validation.availableCount,
          suggestion: 'Try selecting more topics or reducing the number of questions',
        },
        { status: 400 }
      )
    }

    // Select questions intelligently
    const selectedQuestions = selectQuestions(questionPool, config)

    // Ensure we have exactly the requested number
    const finalQuestions = selectedQuestions.slice(0, config.totalQuestions)

    // Log analytics

    // Return response
    return NextResponse.json({
      success: true,
      test: {
        title: config.title,
        totalQuestions: finalQuestions.length,
        duration: config.duration,
        negativeMarking: config.negativeMarking || -1,
        maxMarks: finalQuestions.length * 4,
        difficulty: config.difficulty,
        class: config.class,
      },
      questions: finalQuestions,
      metadata: {
        totalAvailable: validation.availableCount,
        distribution: {
          'single-correct': finalQuestions.filter((q) => q.questionType === 'single-correct')
            .length,
          'assertion-reason': finalQuestions.filter((q) => q.questionType === 'assertion-reason')
            .length,
          'match-following': finalQuestions.filter((q) => q.questionType === 'match-following')
            .length,
          'diagram-based': finalQuestions.filter((q) => q.questionType === 'diagram-based').length,
          'multiple-correct': finalQuestions.filter((q) => q.questionType === 'multiple-correct')
            .length,
          numerical: finalQuestions.filter((q) => q.questionType === 'numerical').length,
          'statement-based': finalQuestions.filter((q) => q.questionType === 'statement-based')
            .length,
        },
      },
    })
  } catch (error) {
    console.error('❌ Test generation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate test',
        details: 'Internal server error',
      },
      { status: 500 }
    )
  }
}
