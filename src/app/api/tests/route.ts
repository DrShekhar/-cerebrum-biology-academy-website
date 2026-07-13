import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const runtime = 'nodejs'

/**
 * GET /api/tests
 * Fetch available test templates
 * Query params:
 * - type: PRACTICE_TEST | MOCK_TEST | FULL_TEST | ADAPTIVE_TEST
 * - category: TOPIC_WISE | CHAPTER_WISE | FULL_SYLLABUS | PREVIOUS_YEAR
 * - difficulty: EASY | MEDIUM | HARD | EXPERT
 * - limit: number of tests to return
 */
export async function GET(request: NextRequest) {
  try {
    // Require a signed-in user — test templates are course content, not public.
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)

    const type = searchParams.get('type')
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Build filter object
    const where: any = {
      isActive: true,
    }

    if (type) where.type = type
    if (category) where.category = category
    if (difficulty) where.difficulty = difficulty

    // Fetch test templates from database
    const tests = await prisma.test_templates.findMany({
      where,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
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
        passingMarks: true,
        isAdaptive: true,
        createdAt: true,
        _count: {
          select: {
            test_sessions: true,
          },
        },
      },
    })

    // Transform response
    const transformedTests = tests.map((test) => ({
      id: test.id,
      title: test.title,
      description: test.description,
      type: test.type,
      category: test.category,
      difficulty: test.difficulty,
      timeLimit: test.timeLimit,
      totalQuestions: test.totalQuestions,
      totalMarks: test.totalMarks,
      passingMarks: test.passingMarks,
      isAdaptive: test.isAdaptive,
      tags: [],
      syllabus: [],
      attemptsCount: test._count.test_sessions,
      createdAt: test.createdAt.toISOString(),
    }))

    return NextResponse.json({
      success: true,
      data: {
        tests: transformedTests,
        count: transformedTests.length,
      },
    })
  } catch (error) {
    console.error('Error fetching tests:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch tests',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
