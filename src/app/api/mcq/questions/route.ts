import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { MCQQuestion, QuestionFilter, QuestionResponse } from '@/lib/mcq/types'
import type { DifficultyLevel } from '@/generated/prisma'

export const dynamic = 'force-dynamic'

// GET /api/mcq/questions - Fetch questions with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters: QuestionFilter = {
      topic: searchParams.get('topic') || undefined,
      chapter: searchParams.get('chapter') || undefined,
      difficulty: (searchParams.get('difficulty') as DifficultyLevel) || undefined,
      isPYQOnly: searchParams.get('isPYQOnly') === 'true',
      pyqYear: searchParams.get('pyqYear') ? parseInt(searchParams.get('pyqYear')!) : undefined,
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('offset') || '0'),
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

    if (filters.topic) {
      officialWhere.topic = filters.topic
    }
    if (filters.difficulty) {
      officialWhere.difficulty = filters.difficulty
    }
    if (filters.excludeIds && filters.excludeIds.length > 0) {
      officialWhere.id = { notIn: filters.excludeIds }
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
      take: Math.ceil((filters.limit || 20) / 2),
      skip: Math.floor((filters.offset || 0) / 2),
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
      },
    })

    // Fetch approved community questions
    const communityQuestions = await prisma.community_questions.findMany({
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
    })

    // Transform to unified MCQQuestion format
    const transformedOfficialQuestions: MCQQuestion[] = officialQuestions.map((q) => ({
      id: q.id,
      question: q.question,
      options: Array.isArray(q.options) ? (q.options as string[]) : JSON.parse(q.options as string),
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
    }))

    const transformedCommunityQuestions: MCQQuestion[] = communityQuestions.map((q) => ({
      id: q.id,
      question: q.question,
      options: Array.isArray(q.options) ? (q.options as string[]) : JSON.parse(q.options as string),
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
    }))

    // Combine and shuffle questions
    const allQuestions = [...transformedOfficialQuestions, ...transformedCommunityQuestions]
    const shuffledQuestions = shuffleArray(allQuestions)

    // Get total count
    const [officialCount, communityCount] = await Promise.all([
      prisma.questions.count({ where: officialWhere }),
      prisma.community_questions.count({ where: communityWhere }),
    ])

    const totalCount = officialCount + communityCount

    const response: QuestionResponse = {
      questions: shuffledQuestions.slice(0, filters.limit || 20),
      total: totalCount,
      hasMore: (filters.offset || 0) + shuffledQuestions.length < totalCount,
      filters,
    }

    return NextResponse.json({
      success: true,
      data: response,
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
