import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { correctLetter, CORRECT_MARKS, NEGATIVE_MARKS } from '@/lib/cbt/paper'

/**
 * POST /api/cbt/session/[id]/submit — server-side scoring + finalize.
 *
 * The client never has the correct answers; we score here from the stored
 * questionIds, write per-question responses, record the session result, and
 * return the scorecard (no answer key).
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    const userId = (session?.user as { id?: string } | undefined)?.id
    if (!userId)
      return NextResponse.json({ success: false, error: 'Sign in required' }, { status: 401 })

    const { id } = await params
    const body = await request.json().catch(() => ({}))

    const row = await prisma.test_sessions.findUnique({ where: { id } })
    if (!row || row.userId !== userId) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    }
    if (row.status === 'COMPLETED') {
      return NextResponse.json({ success: false, error: 'Already submitted' }, { status: 400 })
    }

    const state = (row.answerState as Record<string, unknown>) || {}
    const questionIds: string[] = (state.questionIds as string[]) || []
    // Prefer the answers sent with submit; fall back to last autosaved.
    const answers: Record<string, string> =
      (body.answers as Record<string, string>) || (state.answers as Record<string, string>) || {}

    const questions = await prisma.questions.findMany({
      where: { id: { in: questionIds } },
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
    const byId = new Map(questions.map((q) => [q.id, q]))

    let correct = 0
    let incorrect = 0
    let unattempted = 0
    const perSection: Record<string, { correct: number; incorrect: number; unattempted: number }> =
      {}
    const responseRows: {
      id: string
      userId: string
      questionId: string
      testSessionId: string
      selectedAnswer: string | null
      isCorrect: boolean
      marksAwarded: number
      responseMode: 'TEST_MODE'
    }[] = []

    for (const qid of questionIds) {
      const q = byId.get(qid)
      if (!q) continue
      const sec = (q.subject || 'biology').toLowerCase()
      perSection[sec] = perSection[sec] || { correct: 0, incorrect: 0, unattempted: 0 }
      const sel = answers[qid] || null
      let isCorrect = false
      let marks = 0
      if (!sel) {
        unattempted++
        perSection[sec].unattempted++
      } else if (sel.toUpperCase() === correctLetter(q as never)) {
        isCorrect = true
        marks = CORRECT_MARKS
        correct++
        perSection[sec].correct++
      } else {
        marks = -NEGATIVE_MARKS
        incorrect++
        perSection[sec].incorrect++
      }
      responseRows.push({
        id: `uqr_${row.id}_${qid}`.slice(0, 190),
        userId,
        questionId: qid,
        testSessionId: row.id,
        selectedAnswer: sel,
        isCorrect,
        marksAwarded: marks,
        responseMode: 'TEST_MODE',
      })
    }

    const score = correct * CORRECT_MARKS - incorrect * NEGATIVE_MARKS
    const maxScore = questionIds.length * CORRECT_MARKS
    const percentage = maxScore > 0 ? (Math.max(0, score) / maxScore) * 100 : 0

    await prisma.$transaction([
      // Replace any prior responses for this session, then insert fresh.
      prisma.user_question_responses.deleteMany({ where: { testSessionId: row.id } }),
      prisma.user_question_responses.createMany({ data: responseRows, skipDuplicates: true }),
      prisma.test_sessions.update({
        where: { id: row.id },
        data: {
          status: 'COMPLETED',
          submittedAt: new Date(),
          totalScore: score,
          percentage,
          questionsAnswered: Object.keys(answers).length,
          answerState: { ...state, answers },
          tabSwitchCount: typeof body.tabSwitchCount === 'number' ? body.tabSwitchCount : undefined,
          updatedAt: new Date(),
        },
      }),
      prisma.test_templates.update({
        where: { id: row.testTemplateId },
        data: { attemptCount: { increment: 1 } },
      }),
    ])

    // Rank + percentile across all completed attempts of this paper (this
    // attempt is now COMPLETED, so it's included in the population).
    const [above, totalCandidates] = await Promise.all([
      prisma.test_sessions.count({
        where: {
          testTemplateId: row.testTemplateId,
          status: 'COMPLETED',
          totalScore: { gt: score },
        },
      }),
      prisma.test_sessions.count({
        where: { testTemplateId: row.testTemplateId, status: 'COMPLETED' },
      }),
    ])
    const rank = above + 1
    const percentile =
      totalCandidates > 1 ? ((totalCandidates - rank) / (totalCandidates - 1)) * 100 : 100

    await prisma.test_sessions.update({ where: { id: row.id }, data: { rank } }).catch(() => {})

    return NextResponse.json({
      success: true,
      result: {
        correct,
        incorrect,
        unattempted,
        score,
        maxScore,
        perSection,
        rank,
        percentile: Math.round(percentile * 100) / 100,
        totalCandidates,
      },
    })
  } catch (error) {
    console.error('CBT submit error:', error)
    return NextResponse.json({ success: false, error: 'Failed to submit' }, { status: 500 })
  }
}
