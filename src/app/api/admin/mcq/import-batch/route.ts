import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { rateLimit } from '@/lib/rateLimit'
import type { QuestionType, DifficultyLevel } from '@/generated/prisma'

const VALID_QUESTION_TYPES: QuestionType[] = [
  'MCQ',
  'ASSERTION_REASON',
  'STATEMENT_BASED',
  'MATCH_FOLLOWING',
  'COUNTING_TYPE',
  'SEQUENCE_ORDER',
  'DIAGRAM',
  'TRUE_FALSE',
  'FILL_BLANK',
  'MULTIPLE_SELECT',
  'NUMERICAL',
]

const VALID_DIFFICULTIES: DifficultyLevel[] = ['EASY', 'MEDIUM', 'HARD', 'EXPERT']

interface BatchQuestion {
  type?: string
  topic: string
  subtopic?: string
  chapter?: string
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
  difficulty?: string
  ncertClass?: number
  ncertChapter?: number
  ncertChapterName?: string
  ncertPage?: number
  ncertFigure?: string
  neetWeightage?: string
  isNcertBased?: boolean
  isNeetImportant?: boolean
  isPYQ?: boolean
  pyqYear?: number
  tags?: string[]
  isOlympiad?: boolean
  olympiadLevel?: string
  campbellChapter?: number
  campbellUnit?: number
  campbellEdition?: number
  conceptualDepth?: string
}

interface BatchMeta {
  name: string
  version?: number
  source?: string
  totalQuestions?: number
}

function validateQuestion(
  q: BatchQuestion,
  index: number
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!q.question || q.question.trim().length < 10) {
    errors.push(`Q${index + 1}: Question text too short or missing`)
  }
  if (!q.topic || q.topic.trim().length === 0) {
    errors.push(`Q${index + 1}: Topic is required`)
  }
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    errors.push(`Q${index + 1}: Must have exactly 4 options`)
  }
  if (!q.correctAnswer || !['A', 'B', 'C', 'D'].includes(q.correctAnswer.toUpperCase())) {
    errors.push(`Q${index + 1}: correctAnswer must be A, B, C, or D`)
  }
  if (q.type && !VALID_QUESTION_TYPES.includes(q.type as QuestionType)) {
    errors.push(`Q${index + 1}: Invalid type "${q.type}"`)
  }
  if (q.difficulty && !VALID_DIFFICULTIES.includes(q.difficulty as DifficultyLevel)) {
    errors.push(`Q${index + 1}: Invalid difficulty "${q.difficulty}"`)
  }
  if (q.ncertClass && ![9, 10, 11, 12].includes(q.ncertClass)) {
    errors.push(`Q${index + 1}: ncertClass must be 9, 10, 11, or 12`)
  }
  if (q.isPYQ && q.pyqYear && (q.pyqYear < 2000 || q.pyqYear > 2026)) {
    errors.push(`Q${index + 1}: pyqYear out of range`)
  }

  return { valid: errors.length === 0, errors }
}

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request, {
      maxRequests: 5,
      windowMs: 60 * 60 * 1000,
    })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(rateLimitResult.limit),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': String(rateLimitResult.reset),
          },
        }
      )
    }

    const session = await auth()
    if (!session?.user?.id || session.user.role?.toUpperCase() !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { batch, questions }: { batch: BatchMeta; questions: BatchQuestion[] } = body

    if (!batch?.name) {
      return NextResponse.json(
        { error: 'batch.name is required' },
        { status: 400 }
      )
    }
    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { error: 'questions array is required and must not be empty' },
        { status: 400 }
      )
    }
    if (questions.length > 500) {
      return NextResponse.json(
        { error: 'Maximum 500 questions per batch' },
        { status: 400 }
      )
    }

    const allErrors: string[] = []
    const validQuestions: BatchQuestion[] = []

    for (let i = 0; i < questions.length; i++) {
      const { valid, errors } = validateQuestion(questions[i], i)
      if (valid) {
        validQuestions.push(questions[i])
      } else {
        allErrors.push(...errors)
      }
    }

    if (validQuestions.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No valid questions in batch',
          validationErrors: allErrors,
        },
        { status: 400 }
      )
    }

    const duplicateTexts = new Set<string>()
    const deduped: BatchQuestion[] = []
    for (const q of validQuestions) {
      const normalized = q.question.toLowerCase().trim().replace(/\s+/g, ' ')
      if (!duplicateTexts.has(normalized)) {
        duplicateTexts.add(normalized)
        deduped.push(q)
      } else {
        allErrors.push(`Skipped duplicate: "${q.question.slice(0, 60)}..."`)
      }
    }

    let imported = 0
    let skipped = 0

    const results = await prisma.$transaction(
      deduped.map((q) =>
        prisma.questions.create({
          data: {
            topic: q.topic.trim(),
            subtopic: q.subtopic?.trim() || null,
            curriculum: 'NCERT',
            grade: q.ncertClass ? `Class ${q.ncertClass}` : 'Class 11',
            type: (q.type as QuestionType) || 'MCQ',
            question: q.question.trim(),
            options: q.options,
            correctAnswer: q.correctAnswer.toUpperCase(),
            explanation: q.explanation?.trim() || null,
            difficulty: (q.difficulty as DifficultyLevel) || 'MEDIUM',
            subject: 'biology',
            isActive: true,
            isVerified: true,
            isNcertBased: q.isNcertBased ?? true,
            ncertClass: q.ncertClass || null,
            ncertChapter: q.ncertChapter || null,
            ncertChapterName: q.ncertChapterName?.trim() || q.chapter?.trim() || null,
            ncertPage: q.ncertPage || null,
            ncertFigure: q.ncertFigure || null,
            neetWeightage: q.neetWeightage || null,
            isNeetImportant: q.isNeetImportant ?? false,
            tags: q.tags || null,
            examYear: q.pyqYear || null,
            source: batch.source || 'batch-import',
            isOlympiad: q.isOlympiad ?? false,
            olympiadLevel: q.olympiadLevel || null,
            campbellChapter: q.campbellChapter || null,
            campbellUnit: q.campbellUnit || null,
            campbellEdition: q.campbellEdition || null,
            conceptualDepth: q.conceptualDepth || null,
          },
          select: { id: true },
        })
      )
    )

    imported = results.length
    skipped = questions.length - imported

    return NextResponse.json({
      success: true,
      data: {
        batchName: batch.name,
        imported,
        skipped,
        total: questions.length,
        validationErrors: allErrors.length > 0 ? allErrors : undefined,
      },
    })
  } catch (error) {
    console.error('Batch import error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to import batch',
      },
      { status: 500 }
    )
  }
}
