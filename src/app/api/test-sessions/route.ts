import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const runtime = 'nodejs'

/**
 * POST /api/test-sessions
 * Create a new test session
 * Body: { testTemplateId: string, userId?: string, freeUserId?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { testTemplateId, freeUserId } = body

    // Get authenticated user if available
    const session = await auth()
    const userId = session?.user?.id

    // Must have either userId or freeUserId
    if (!userId && !freeUserId) {
      return NextResponse.json(
        {
          success: false,
          error: 'User identification required',
        },
        { status: 401 }
      )
    }

    // Verify test template exists
    const testTemplate = await prisma.test_templates.findUnique({
      where: { id: testTemplateId },
    })

    if (!testTemplate) {
      return NextResponse.json(
        {
          success: false,
          error: 'Test template not found',
        },
        { status: 404 }
      )
    }

    // Create test session
    const testSession = await prisma.test_sessions.create({
      data: {
        testTemplateId,
        userId,
        freeUserId,
        status: 'NOT_STARTED',
        timeSpent: 0,
        tabSwitchCount: 0,
        fullscreenExits: 0,
      },
      include: {
        test_templates: {
          select: {
            id: true,
            title: true,
            type: true,
            category: true,
            difficulty: true,
            timeLimit: true,
            totalQuestions: true,
            totalMarks: true,
            instructions: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        sessionId: testSession.id,
        testTemplate: testSession.test_templates,
        status: testSession.status,
        createdAt: testSession.createdAt.toISOString(),
      },
    })
  } catch (error) {
    console.error('Error creating test session:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create test session',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/test-sessions
 * Get user's test sessions
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const freeUserId = searchParams.get('freeUserId')

    // Get authenticated user if available
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

    // Fetch test sessions
    const testSessions = await prisma.test_sessions.findMany({
      where: {
        OR: [userId ? { userId } : {}, freeUserId ? { freeUserId } : {}],
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
        createdAt: 'desc',
      },
      take: 50,
    })

    return NextResponse.json({
      success: true,
      data: {
        sessions: testSessions.map((ts) => ({
          id: ts.id,
          testTemplate: ts.test_templates,
          status: ts.status,
          score: ts.score,
          percentage: ts.percentage,
          timeSpent: ts.timeSpent,
          startedAt: ts.startedAt?.toISOString(),
          submittedAt: ts.submittedAt?.toISOString(),
          createdAt: ts.createdAt.toISOString(),
        })),
        count: testSessions.length,
      },
    })
  } catch (error) {
    console.error('Error fetching test sessions:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch test sessions',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
