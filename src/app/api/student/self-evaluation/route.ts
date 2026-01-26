import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'
import type { EvaluationSlot } from '@/types/prisma-enums'

export const dynamic = 'force-dynamic'

// ============================================
// TYPES
// ============================================

interface CreateEvaluationData {
  date: string
  slot: EvaluationSlot
  courseId?: string
  topicsCovered?: string[]
  conceptsLearned?: string[]
  questionsAttempted?: number
  questionsCorrect?: number
  difficultyRating?: number
  confidenceLevel?: number
  studyHours?: number
  notes?: string
  goals?: string[]
  achievements?: string[]
  struggles?: string[]
  nextDayPlan?: string
}

// ============================================
// GET - Fetch self-evaluations for current user
// ============================================

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const limit = parseInt(searchParams.get('limit') || '30')
    const offset = parseInt(searchParams.get('offset') || '0')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {
      studentId: session.user.id,
    }

    if (startDate || endDate) {
      whereClause.date = {}
      if (startDate) {
        whereClause.date.gte = new Date(startDate)
      }
      if (endDate) {
        whereClause.date.lte = new Date(endDate)
      }
    }

    const [evaluations, total] = await Promise.all([
      prisma.self_evaluations.findMany({
        where: whereClause,
        orderBy: [{ date: 'desc' }, { slot: 'asc' }],
        take: limit,
        skip: offset,
      }),
      prisma.self_evaluations.count({ where: whereClause }),
    ])

    // Calculate summary stats
    const stats = await prisma.self_evaluations.aggregate({
      where: {
        studentId: session.user.id,
        date: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      },
      _avg: {
        difficultyRating: true,
        confidenceLevel: true,
        studyHours: true,
      },
      _sum: {
        questionsAttempted: true,
        questionsCorrect: true,
        studyHours: true,
      },
      _count: true,
    })

    const accuracy =
      stats._sum.questionsAttempted && stats._sum.questionsAttempted > 0
        ? ((stats._sum.questionsCorrect || 0) / stats._sum.questionsAttempted) * 100
        : 0

    return NextResponse.json({
      success: true,
      data: {
        evaluations,
        stats: {
          totalEntries: stats._count,
          avgDifficulty: stats._avg.difficultyRating,
          avgConfidence: stats._avg.confidenceLevel,
          totalStudyHours: stats._sum.studyHours,
          totalQuestions: stats._sum.questionsAttempted,
          accuracy: Math.round(accuracy * 10) / 10,
        },
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + evaluations.length < total,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching self-evaluations:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch self-evaluations' },
      { status: 500 }
    )
  }
}

// ============================================
// POST - Create or update a self-evaluation
// ============================================

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body: CreateEvaluationData = await request.json()

    // Validate required fields
    if (!body.date || !body.slot) {
      return NextResponse.json(
        { success: false, error: 'Date and slot are required' },
        { status: 400 }
      )
    }

    // Validate slot
    const validSlots: EvaluationSlot[] = ['MORNING', 'AFTERNOON', 'EVENING']
    if (!validSlots.includes(body.slot)) {
      return NextResponse.json(
        { success: false, error: 'Invalid slot. Must be MORNING, AFTERNOON, or EVENING' },
        { status: 400 }
      )
    }

    // Validate ratings (1-5 scale)
    if (
      body.difficultyRating !== undefined &&
      (body.difficultyRating < 1 || body.difficultyRating > 5)
    ) {
      return NextResponse.json(
        { success: false, error: 'Difficulty rating must be between 1 and 5' },
        { status: 400 }
      )
    }
    if (
      body.confidenceLevel !== undefined &&
      (body.confidenceLevel < 1 || body.confidenceLevel > 5)
    ) {
      return NextResponse.json(
        { success: false, error: 'Confidence level must be between 1 and 5' },
        { status: 400 }
      )
    }

    const evalDate = new Date(body.date)
    evalDate.setHours(0, 0, 0, 0)

    // Upsert the evaluation (create or update based on unique constraint)
    const evaluation = await prisma.self_evaluations.upsert({
      where: {
        studentId_date_slot: {
          studentId: session.user.id,
          date: evalDate,
          slot: body.slot,
        },
      },
      update: {
        courseId: body.courseId,
        topicsCovered: body.topicsCovered || [],
        conceptsLearned: body.conceptsLearned || [],
        questionsAttempted: body.questionsAttempted || 0,
        questionsCorrect: body.questionsCorrect || 0,
        difficultyRating: body.difficultyRating,
        confidenceLevel: body.confidenceLevel,
        studyHours: body.studyHours,
        notes: body.notes,
        goals: body.goals || [],
        achievements: body.achievements || [],
        struggles: body.struggles || [],
        nextDayPlan: body.nextDayPlan,
      },
      create: {
        studentId: session.user.id,
        date: evalDate,
        slot: body.slot,
        courseId: body.courseId,
        topicsCovered: body.topicsCovered || [],
        conceptsLearned: body.conceptsLearned || [],
        questionsAttempted: body.questionsAttempted || 0,
        questionsCorrect: body.questionsCorrect || 0,
        difficultyRating: body.difficultyRating,
        confidenceLevel: body.confidenceLevel,
        studyHours: body.studyHours,
        notes: body.notes,
        goals: body.goals || [],
        achievements: body.achievements || [],
        struggles: body.struggles || [],
        nextDayPlan: body.nextDayPlan,
      },
    })

    return NextResponse.json({
      success: true,
      data: evaluation,
      message: 'Self-evaluation saved successfully',
    })
  } catch (error) {
    console.error('Error saving self-evaluation:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save self-evaluation' },
      { status: 500 }
    )
  }
}
