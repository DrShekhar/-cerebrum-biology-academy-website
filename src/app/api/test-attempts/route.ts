import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const runtime = 'nodejs'

/**
 * POST /api/test-attempts — REMOVED (was a client-trust score write).
 *
 * This endpoint accepted a client-supplied score/percentage and wrote them onto
 * a test_sessions row with no ownership check or server-side grading — a student
 * could POST any score for any session. Test completion + scoring now happens
 * only server-side in POST /api/test/[id]/submit (grades against the stored
 * answer key). This stub refuses the call so any stale client fails loudly
 * rather than silently forging results.
 */
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: 'This endpoint has been removed. Submit tests via /api/test/[id]/submit.',
    },
    { status: 410 }
  )
}

/**
 * GET /api/test-attempts
 * Get user's test attempts history
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const freeUserId = searchParams.get('freeUserId')

    const session = await auth()
    const userId = session?.user?.id

    if (!userId && !freeUserId) {
      return NextResponse.json(
        {
          success: false,
          error: 'User identification required',
        },
        { status: 401 }
      )
    }

    const attempts = await prisma.test_attempts.findMany({
      where: {
        freeUserId: freeUserId || userId,
      },
      include: {
        test_templates: {
          select: {
            title: true,
            type: true,
            category: true,
            difficulty: true,
            totalQuestions: true,
            totalMarks: true,
          },
        },
      },
      orderBy: {
        startedAt: 'desc',
      },
      take: 50,
    })

    return NextResponse.json({
      success: true,
      data: {
        attempts: attempts.map((attempt) => ({
          id: attempt.id,
          testTemplate: attempt.test_templates || { title: 'Practice Test', type: 'PRACTICE' },
          score: attempt.score,
          percentage: attempt.percentage,
          rank: attempt.rank,
          strengthAreas: attempt.strengthAreas,
          weaknessAreas: attempt.weaknessAreas,
          timeSpent: attempt.timeSpent,
          createdAt: attempt.startedAt.toISOString(),
        })),
        count: attempts.length,
      },
    })
  } catch (error) {
    console.error('Error fetching test attempts:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch test attempts',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
