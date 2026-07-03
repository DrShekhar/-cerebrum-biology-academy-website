import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { correctLetter, toClientQuestion } from '@/lib/cbt/paper'

/**
 * GET /api/cbt/session/[id]/review — post-submit solutions review.
 * Only for a COMPLETED session owned by the requester. Reveals the correct
 * option + explanation alongside the student's own answer.
 */
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    const userId = (session?.user as { id?: string } | undefined)?.id
    if (!userId)
      return NextResponse.json({ success: false, error: 'Sign in required' }, { status: 401 })

    const { id } = await params
    const row = await prisma.test_sessions.findUnique({ where: { id } })
    if (!row || row.userId !== userId) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    }
    if (row.status !== 'COMPLETED') {
      return NextResponse.json({ success: false, error: 'Not submitted yet' }, { status: 400 })
    }

    const state = (row.answerState as Record<string, unknown>) || {}
    const questionIds: string[] = (state.questionIds as string[]) || []
    const answers: Record<string, string> = (state.answers as Record<string, string>) || {}

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
        explanation: true,
        explanationImage: true,
      },
    })
    const byId = new Map(questions.map((q) => [q.id, q]))

    const items = questionIds
      .map((qid) => byId.get(qid))
      .filter(Boolean)
      .map((q) => {
        const dq = q as NonNullable<typeof q>
        const client = toClientQuestion(dq as never)
        const yourAnswer = answers[dq.id] || null
        const correct = correctLetter(dq as never)
        return {
          id: dq.id,
          questionText: dq.question,
          options: client.options,
          subject: client.subject,
          topic: dq.topic || '',
          yourAnswer,
          correctAnswer: correct,
          isCorrect: !!yourAnswer && yourAnswer.toUpperCase() === correct,
          explanation: dq.explanation || '',
        }
      })

    return NextResponse.json({ success: true, items })
  } catch (error) {
    console.error('CBT review error:', error)
    return NextResponse.json({ success: false, error: 'Failed to load review' }, { status: 500 })
  }
}
