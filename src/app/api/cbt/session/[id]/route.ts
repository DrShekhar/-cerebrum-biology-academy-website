import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

/**
 * PATCH /api/cbt/session/[id] — autosave CBT progress (answers/marked/visited,
 * remaining time, current question, tab-switch count). Owner-scoped.
 */
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    const userId = (session?.user as { id?: string } | undefined)?.id
    if (!userId)
      return NextResponse.json({ success: false, error: 'Sign in required' }, { status: 401 })

    const { id } = await params
    const body = await request.json().catch(() => ({}))

    const row = await prisma.test_sessions.findUnique({
      where: { id },
      select: { id: true, userId: true, status: true, answerState: true },
    })
    if (!row || row.userId !== userId) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    }
    if (row.status !== 'IN_PROGRESS') {
      return NextResponse.json({ success: false, error: 'Session not active' }, { status: 400 })
    }

    const prev = (row.answerState as Record<string, unknown>) || {}
    const answers = body.answers ?? prev.answers ?? {}
    const marked = body.marked ?? prev.marked ?? []
    const visited = body.visited ?? prev.visited ?? []

    await prisma.test_sessions.update({
      where: { id },
      data: {
        answerState: { ...prev, answers, marked, visited },
        remainingTime: typeof body.remainingTime === 'number' ? body.remainingTime : undefined,
        currentQuestionIndex: typeof body.currentIndex === 'number' ? body.currentIndex : undefined,
        questionsAnswered: Object.keys(answers as object).length,
        questionsMarkedForReview: Array.isArray(marked) ? marked.length : undefined,
        tabSwitchCount: typeof body.tabSwitchCount === 'number' ? body.tabSwitchCount : undefined,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('CBT session save error:', error)
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 })
  }
}
