import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { correctLetter, toClientQuestion } from '@/lib/cbt/paper'

export const dynamic = 'force-dynamic'

/**
 * GET /api/student/mistakes — the student's Mistake Notebook (P2.5 #1).
 *
 * Aggregates every WRONG answer from CBT mock tests: /api/cbt/session/[id]/submit
 * writes one user_question_responses row per question (selectedAnswer +
 * isCorrect), so that table is the single honest source here. Repeat mistakes
 * on the same question are deduped into one entry with timesWrong.
 *
 * Sources NOT included (no per-question persistence exists for them):
 * - MCQ quick practice (/api/mcq/submit) only updates aggregate stats in
 *   mcq_user_stats / mcq_practice_sessions — individual wrong answers are
 *   never stored, so they cannot be compiled without fabricating data.
 *
 * ?summary=1 returns only counts + top topics (dashboard card).
 */

const SOURCES = {
  cbtMockTests: true,
  mcqPractice: false,
} as const

const SOURCE_NOTE =
  'Compiled from your CBT mock-test attempts. MCQ quick-practice answers are not stored per-question, so they are not included.'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const userId = session.user.id
    const summaryOnly = request.nextUrl.searchParams.get('summary') === '1'

    const responses = await prisma.user_question_responses.findMany({
      where: { userId, isCorrect: false, selectedAnswer: { not: null } },
      orderBy: { answeredAt: 'desc' },
      take: 1000,
      select: {
        questionId: true,
        selectedAnswer: true,
        answeredAt: true,
        questions: {
          select: {
            id: true,
            question: true,
            options: true,
            correctAnswer: true,
            explanation: true,
            explanationImage: true,
            subject: true,
            topic: true,
            subtopic: true,
            marks: true,
            difficulty: true,
            ncertClass: true,
            ncertChapterName: true,
          },
        },
        test_sessions: {
          select: {
            id: true,
            submittedAt: true,
            test_templates: { select: { title: true } },
          },
        },
      },
    })

    // Dedupe repeat mistakes by questionId — most recent occurrence wins,
    // timesWrong counts all occurrences.
    const byQuestion = new Map<
      string,
      {
        latest: (typeof responses)[number]
        timesWrong: number
      }
    >()
    for (const r of responses) {
      const entry = byQuestion.get(r.questionId)
      if (entry) {
        entry.timesWrong++
      } else {
        byQuestion.set(r.questionId, { latest: r, timesWrong: 1 })
      }
    }

    const topicCounts = new Map<string, number>()
    for (const { latest } of byQuestion.values()) {
      const topic = latest.questions.topic || latest.questions.subject || 'General'
      topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1)
    }
    const topics = [...topicCounts.entries()]
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)

    if (summaryOnly) {
      return NextResponse.json({
        success: true,
        summary: {
          totalMistakes: byQuestion.size,
          totalWrongAnswers: responses.length,
          topTopics: topics.slice(0, 3),
        },
        sources: SOURCES,
        note: SOURCE_NOTE,
      })
    }

    const mistakes = [...byQuestion.values()].map(({ latest, timesWrong }) => {
      const q = latest.questions
      const client = toClientQuestion(q as never)
      return {
        questionId: q.id,
        question: q.question,
        options: client.options,
        chosenAnswer: (latest.selectedAnswer || '').toUpperCase(),
        correctAnswer: correctLetter(q as never),
        explanation: q.explanation || '',
        topic: q.topic || q.subject || 'General',
        subtopic: q.subtopic || null,
        chapter: q.ncertChapterName || null,
        ncertClass: q.ncertClass || null,
        subject: q.subject || 'biology',
        date: latest.answeredAt,
        testTitle: latest.test_sessions?.test_templates?.title || 'CBT Mock Test',
        testSessionId: latest.test_sessions?.id || null,
        timesWrong,
      }
    })

    return NextResponse.json({
      success: true,
      mistakes,
      topics,
      totalWrongAnswers: responses.length,
      sources: SOURCES,
      note: SOURCE_NOTE,
    })
  } catch (error) {
    console.error('[student/mistakes] failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load mistakes' }, { status: 500 })
  }
}
