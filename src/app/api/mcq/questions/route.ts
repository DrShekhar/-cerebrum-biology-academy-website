import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { MCQQuestion, QuestionFilter, QuestionResponse } from '@/lib/mcq/types'
import type { DifficultyLevel } from '@/generated/prisma'

export const dynamic = 'force-dynamic'

// Helper to safely parse question options (JSON or array)
function safeParseOptions(options: unknown): string[] {
  if (Array.isArray(options)) return options as string[]
  if (typeof options === 'string') {
    try {
      const parsed = JSON.parse(options)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      console.error('Failed to parse question options:', options)
      return []
    }
  }
  return []
}

// Helper to safely query community_questions (table may not exist yet)
async function safeCommunityQuery<T>(queryFn: () => Promise<T>, defaultValue: T): Promise<T> {
  try {
    return await queryFn()
  } catch (error) {
    // If community_questions table doesn't exist, return default value
    if (
      error instanceof Error &&
      error.message.includes('community_questions') &&
      error.message.includes('does not exist')
    ) {
      console.log('community_questions table not found, using official questions only')
      return defaultValue
    }
    throw error
  }
}

// GET /api/mcq/questions - Fetch questions with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Handle fetching by specific IDs (for daily challenges)
    const idsParam = searchParams.get('ids')
    if (idsParam) {
      const ids = idsParam.split(',')
      return await fetchQuestionsByIds(ids)
    }

    const filters: QuestionFilter & {
      isNcertBased?: boolean
      ncertClass?: number
      ncertChapter?: number
      neetWeightage?: string
      hasDiagram?: boolean
    } = {
      topic: searchParams.get('topic') || undefined,
      chapter: searchParams.get('chapter') || undefined,
      difficulty: (searchParams.get('difficulty') as DifficultyLevel) || undefined,
      isPYQOnly: searchParams.get('isPYQOnly') === 'true',
      pyqYear: searchParams.get('pyqYear') ? parseInt(searchParams.get('pyqYear')!) : undefined,
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('offset') || '0'),
      // NCERT filtering
      isNcertBased: searchParams.get('isNcertBased') === 'true' || undefined,
      ncertClass: searchParams.get('ncertClass')
        ? parseInt(searchParams.get('ncertClass')!)
        : undefined,
      ncertChapter: searchParams.get('ncertChapter')
        ? parseInt(searchParams.get('ncertChapter')!)
        : undefined,
      neetWeightage: searchParams.get('neetWeightage') || undefined,
      // Diagram filtering
      hasDiagram: searchParams.get('hasDiagram') === 'true' || undefined,
    }

    const excludeIdsParam = searchParams.get('excludeIds')
    if (excludeIdsParam) {
      filters.excludeIds = excludeIdsParam.split(',')
    }

    // Build where clause for official questions
    const officialWhere: Record<string, unknown> = {
      isActive: true,
      isVerified: true,
    }

    // For official questions: if chapter is selected, use ncertChapterName (more specific)
    // Skip topic filter when chapter is selected since database has subtopics, not broad categories
    if (filters.chapter) {
      officialWhere.ncertChapterName = filters.chapter
    } else if (filters.topic) {
      // Only filter by topic if no chapter is selected
      officialWhere.topic = filters.topic
    }
    if (filters.difficulty) {
      officialWhere.difficulty = filters.difficulty
    }
    // Add PYQ filtering for official questions using examYear
    if (filters.isPYQOnly) {
      officialWhere.examYear = filters.pyqYear ? filters.pyqYear : { not: null } // Any PYQ if no specific year
    }
    if (filters.excludeIds && filters.excludeIds.length > 0) {
      officialWhere.id = { notIn: filters.excludeIds }
    }
    // NCERT filtering
    if (filters.isNcertBased) {
      officialWhere.isNcertBased = true
    }
    if (filters.ncertClass) {
      officialWhere.ncertClass = filters.ncertClass
    }
    if (filters.ncertChapter) {
      officialWhere.ncertChapter = filters.ncertChapter
    }
    if (filters.neetWeightage) {
      officialWhere.neetWeightage = filters.neetWeightage
    }
    // Diagram filtering - only questions that have linked diagrams
    if (filters.hasDiagram) {
      officialWhere.question_diagrams = {
        some: {},
      }
    }

    // Build where clause for community questions
    const communityWhere: Record<string, unknown> = {
      status: 'APPROVED',
    }

    if (filters.topic) {
      communityWhere.topic = filters.topic
    }
    if (filters.chapter) {
      communityWhere.chapter = filters.chapter
    }
    if (filters.difficulty) {
      communityWhere.difficulty = filters.difficulty
    }
    if (filters.isPYQOnly) {
      communityWhere.isPYQ = true
      if (filters.pyqYear) {
        communityWhere.pyqYear = filters.pyqYear
      }
    }
    if (filters.excludeIds && filters.excludeIds.length > 0) {
      communityWhere.id = { notIn: filters.excludeIds }
    }

    // Fetch official questions from questions table
    const officialQuestions = await prisma.questions.findMany({
      where: officialWhere,
      take: filters.limit || 20,
      skip: filters.offset || 0,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        question: true,
        options: true,
        correctAnswer: true,
        explanation: true,
        topic: true,
        subject: true,
        difficulty: true,
        examYear: true,
        // NCERT fields
        isNcertBased: true,
        ncertClass: true,
        ncertChapter: true,
        ncertChapterName: true,
        ncertFigure: true,
        ncertPage: true,
        neetWeightage: true,
        isNeetImportant: true,
        // Diagram relations
        question_diagrams: {
          select: {
            id: true,
            diagramId: true,
            position: true,
            caption: true,
            highlightedParts: true,
            markedLabel: true,
            diagram_assets: {
              select: {
                id: true,
                name: true,
                fileUrl: true,
                svgContent: true,
                labeledParts: true,
              },
            },
          },
        },
      },
    })

    // Fetch approved community questions (safely - table may not exist)
    const communityQuestions = await safeCommunityQuery(
      () =>
        prisma.community_questions.findMany({
          where: communityWhere,
          take: Math.ceil((filters.limit || 20) / 2),
          skip: Math.floor((filters.offset || 0) / 2),
          orderBy: { publishedAt: 'desc' },
          select: {
            id: true,
            question: true,
            options: true,
            correctAnswer: true,
            explanation: true,
            topic: true,
            subtopic: true,
            chapter: true,
            difficulty: true,
            isPYQ: true,
            pyqYear: true,
          },
        }),
      [] as Awaited<ReturnType<typeof prisma.community_questions.findMany>>
    )

    // Transform to unified MCQQuestion format with NCERT info and diagrams
    const transformedOfficialQuestions = officialQuestions
      .map((q) => {
        const options = safeParseOptions(q.options)
        if (options.length === 0) return null // Skip questions with invalid options

        // Transform diagram data
        const diagrams = q.question_diagrams?.map((qd) => ({
          id: qd.id,
          diagramId: qd.diagramId,
          position: (qd.position || 'above') as 'above' | 'inline' | 'below' | 'side',
          caption: qd.caption || undefined,
          highlightedParts: qd.highlightedParts || undefined,
          markedLabel: qd.markedLabel || undefined,
          diagram: {
            id: qd.diagram_assets.id,
            name: qd.diagram_assets.name,
            fileUrl: qd.diagram_assets.fileUrl || undefined,
            svgContent: qd.diagram_assets.svgContent || undefined,
            labeledParts: qd.diagram_assets.labeledParts as
              | { label: string; name: string; function?: string }[]
              | undefined,
          },
        }))

        return {
          id: q.id,
          question: q.question,
          options,
          correctAnswer: q.correctAnswer as 'A' | 'B' | 'C' | 'D',
          explanation: q.explanation || undefined,
          topic: q.topic || 'General',
          subtopic: undefined,
          chapter: undefined,
          difficulty: q.difficulty,
          isPYQ: !!q.examYear,
          pyqYear: q.examYear || undefined,
          source: 'official' as const,
          sourceId: q.id,
          // NCERT info
          isNcertBased: q.isNcertBased || false,
          ncertClass: q.ncertClass || undefined,
          ncertChapter: q.ncertChapter || undefined,
          ncertChapterName: q.ncertChapterName || undefined,
          ncertFigure: q.ncertFigure || undefined,
          ncertPage: q.ncertPage || undefined,
          neetWeightage: q.neetWeightage || undefined,
          isNeetImportant: q.isNeetImportant || false,
          // Diagrams
          diagrams: diagrams && diagrams.length > 0 ? diagrams : undefined,
        }
      })
      .filter((q): q is NonNullable<typeof q> => q !== null)

    const transformedCommunityQuestions: MCQQuestion[] = communityQuestions
      .map((q) => {
        const options = safeParseOptions(q.options)
        if (options.length === 0) return null // Skip questions with invalid options
        return {
          id: q.id,
          question: q.question,
          options,
          correctAnswer: q.correctAnswer as 'A' | 'B' | 'C' | 'D',
          explanation: q.explanation || undefined,
          topic: q.topic,
          subtopic: q.subtopic || undefined,
          chapter: q.chapter || undefined,
          difficulty: q.difficulty,
          isPYQ: q.isPYQ,
          pyqYear: q.pyqYear || undefined,
          source: 'community' as const,
          sourceId: q.id,
        }
      })
      .filter((q): q is MCQQuestion => q !== null)

    // Combine and shuffle questions
    const allQuestions = [...transformedOfficialQuestions, ...transformedCommunityQuestions]
    const shuffledQuestions = shuffleArray(allQuestions)

    // Get total count (safely for community)
    const officialCount = await prisma.questions.count({ where: officialWhere })
    const communityCount = await safeCommunityQuery(
      () => prisma.community_questions.count({ where: communityWhere }),
      0
    )

    const totalCount = officialCount + communityCount

    const requestedCount = filters.limit || 20
    const availableQuestions = shuffledQuestions.slice(0, requestedCount)

    // Generate message if fewer questions available than requested
    let message: string | undefined
    if (totalCount === 0) {
      message = 'No questions available for the selected filters. Try different filters.'
    } else if (totalCount < requestedCount) {
      message = `Only ${totalCount} questions available for these filters (${requestedCount} requested).`
    }

    const response: QuestionResponse = {
      questions: availableQuestions,
      total: totalCount,
      hasMore: (filters.offset || 0) + availableQuestions.length < totalCount,
      filters,
    }

    return NextResponse.json({
      success: true,
      data: response,
      message,
    })
  } catch (error) {
    console.error('Error fetching MCQ questions:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch questions',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Fetch questions by specific IDs
async function fetchQuestionsByIds(ids: string[]) {
  try {
    // Fetch from official questions
    const officialQuestions = await prisma.questions.findMany({
      where: {
        id: { in: ids },
        isActive: true,
      },
      select: {
        id: true,
        question: true,
        options: true,
        correctAnswer: true,
        explanation: true,
        topic: true,
        subject: true,
        difficulty: true,
        examYear: true,
      },
    })

    // Fetch from community questions (safely - table may not exist)
    const communityQuestions = await safeCommunityQuery(
      () =>
        prisma.community_questions.findMany({
          where: {
            id: { in: ids },
            status: 'APPROVED',
          },
          select: {
            id: true,
            question: true,
            options: true,
            correctAnswer: true,
            explanation: true,
            topic: true,
            subtopic: true,
            chapter: true,
            difficulty: true,
            isPYQ: true,
            pyqYear: true,
          },
        }),
      [] as Awaited<ReturnType<typeof prisma.community_questions.findMany>>
    )

    // Transform to unified format with safe parsing
    const transformedOfficial: MCQQuestion[] = officialQuestions
      .map((q) => {
        const options = safeParseOptions(q.options)
        if (options.length === 0) return null
        return {
          id: q.id,
          question: q.question,
          options,
          correctAnswer: q.correctAnswer as 'A' | 'B' | 'C' | 'D',
          explanation: q.explanation || undefined,
          topic: q.topic || 'General',
          subtopic: undefined,
          chapter: undefined,
          difficulty: q.difficulty,
          isPYQ: !!q.examYear,
          pyqYear: q.examYear || undefined,
          source: 'official' as const,
          sourceId: q.id,
        }
      })
      .filter((q): q is MCQQuestion => q !== null)

    const transformedCommunity: MCQQuestion[] = communityQuestions
      .map((q) => {
        const options = safeParseOptions(q.options)
        if (options.length === 0) return null
        return {
          id: q.id,
          question: q.question,
          options,
          correctAnswer: q.correctAnswer as 'A' | 'B' | 'C' | 'D',
          explanation: q.explanation || undefined,
          topic: q.topic,
          subtopic: q.subtopic || undefined,
          chapter: q.chapter || undefined,
          difficulty: q.difficulty,
          isPYQ: q.isPYQ,
          pyqYear: q.pyqYear || undefined,
          source: 'community' as const,
          sourceId: q.id,
        }
      })
      .filter((q): q is MCQQuestion => q !== null)

    const allQuestions = [...transformedOfficial, ...transformedCommunity]

    // Maintain the order of requested IDs
    const orderedQuestions = ids
      .map((id) => allQuestions.find((q) => q.id === id))
      .filter((q): q is MCQQuestion => q !== undefined)

    return NextResponse.json({ questions: orderedQuestions })
  } catch (error) {
    console.error('Error fetching questions by IDs:', error)
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
  }
}
