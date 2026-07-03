import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import {
  ensureNeetTemplate,
  selectPaperQuestions,
  toClientQuestion,
  DURATION_MIN,
} from '@/lib/cbt/paper'

/**
 * POST /api/cbt/session — start or resume a CBT NEET full-mock attempt.
 *
 * Resumes an in-progress session for this user if one exists (returns the exact
 * same paper + saved progress); otherwise builds a fresh 180-Q paper, stores the
 * question ids on the session, and returns the client-safe questions (no answers).
 */
export async function POST(_request: NextRequest) {
  try {
    const session = await auth()
    const userId = (session?.user as { id?: string } | undefined)?.id
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Sign in required' }, { status: 401 })
    }

    const templateId = await ensureNeetTemplate()

    // Resume an existing in-progress attempt.
    const existing = await prisma.test_sessions.findFirst({
      where: { userId, testTemplateId: templateId, status: 'IN_PROGRESS' },
      orderBy: { createdAt: 'desc' },
    })

    if (existing && existing.answerState) {
      const state = existing.answerState as {
        questionIds?: string[]
        answers?: Record<string, string>
        marked?: string[]
        visited?: string[]
      }
      const ids = state.questionIds || []
      const rows = await prisma.questions.findMany({
        where: { id: { in: ids } },
        select: {
          id: true,
          question: true,
          options: true,
          correctAnswer: true,
          subject: true,
          topic: true,
          marks: true,
          difficulty: true,
          explanationImage: true,
        },
      })
      const byId = new Map(rows.map((r) => [r.id, r]))
      const questions = ids
        .map((id) => byId.get(id))
        .filter(Boolean)
        .map((r) => toClientQuestion(r as never))
      return NextResponse.json({
        success: true,
        resumed: true,
        sessionId: existing.id,
        durationMin: DURATION_MIN,
        remainingTime: existing.remainingTime ?? DURATION_MIN * 60,
        currentIndex: existing.currentQuestionIndex,
        savedState: {
          answers: state.answers || {},
          marked: state.marked || [],
          visited: state.visited || [],
        },
        questions,
      })
    }

    // Fresh attempt.
    const picked = await selectPaperQuestions()
    if (picked.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No questions available to build a paper' },
        { status: 503 }
      )
    }
    const questionIds = picked.map((q) => q.id)
    const created = await prisma.test_sessions.create({
      data: {
        id: `cbt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        userId,
        testTemplateId: templateId,
        sessionToken: `cbt_${userId}_${Date.now()}`,
        status: 'IN_PROGRESS',
        startedAt: new Date(),
        remainingTime: DURATION_MIN * 60,
        answerState: { questionIds, answers: {}, marked: [], visited: [] },
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      resumed: false,
      sessionId: created.id,
      durationMin: DURATION_MIN,
      remainingTime: DURATION_MIN * 60,
      currentIndex: 0,
      savedState: { answers: {}, marked: [], visited: [] },
      questions: picked.map((q) => toClientQuestion(q)),
    })
  } catch (error) {
    console.error('CBT session start error:', error)
    return NextResponse.json({ success: false, error: 'Failed to start session' }, { status: 500 })
  }
}
