import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@/generated/prisma'

export const dynamic = 'force-dynamic'

/**
 * GET /api/student/mastery — the student's chapter-mastery syllabus map (P2).
 *
 * Computes mastery from the student's REAL per-question correctness in
 * user_question_responses (one row per answered CBT/mock question, written by
 * /api/cbt/session/[id]/submit) joined to questions.topic/subject. This is
 * deeper than the dashboard MasteryGrid, which only tallies test-level
 * strength/weakness tags — here accuracy is measured per topic from actual
 * answers.
 *
 * One efficient SQL GROUP BY over this user's responses (grouped, not per-row)
 * yields per-topic {attempted, correct}; a per-subject roll-up is folded in JS.
 *
 * Identity: signed-in students are scoped by session userId. Guests pass their
 * localStorage `freeUserId` (same pattern as /api/mcq/review) and are scoped by
 * that. Rows are keyed to exactly one identity, so there is no cross-user leak.
 */

type MasteryBand = 'strong' | 'developing' | 'weak'

interface TopicAggregateRow {
  subject: string
  topic: string
  attempted: number | bigint
  correct: number | bigint
}

function masteryBand(accuracy: number, attempted: number): MasteryBand | 'untouched' {
  if (attempted === 0) return 'untouched'
  if (accuracy >= 75) return 'strong'
  if (accuracy >= 50) return 'developing'
  return 'weak'
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const userId = session?.user?.id ?? null
    // Guests identify with their localStorage freeUserId; a signed-in session
    // always wins so a stale freeUserId can never widen another user's scope.
    const freeUserId = userId ? null : request.nextUrl.searchParams.get('freeUserId')

    if (!userId && !freeUserId) {
      return NextResponse.json(
        { success: false, error: 'Sign in or start practising to build your mastery map' },
        { status: 401 }
      )
    }

    const identity = userId
      ? Prisma.sql`r."userId" = ${userId}`
      : Prisma.sql`r."freeUserId" = ${freeUserId}`

    // Single grouped join: one row per (subject, topic) for this identity.
    const rows = await prisma.$queryRaw<TopicAggregateRow[]>`
      SELECT
        LOWER(q.subject) AS subject,
        COALESCE(NULLIF(q.topic, ''), 'General') AS topic,
        COUNT(*)::int AS attempted,
        COUNT(*) FILTER (WHERE r."isCorrect" = true)::int AS correct
      FROM user_question_responses r
      JOIN questions q ON q.id = r."questionId"
      WHERE ${identity} AND r."selectedAnswer" IS NOT NULL
      GROUP BY LOWER(q.subject), COALESCE(NULLIF(q.topic, ''), 'General')
      ORDER BY attempted DESC
    `

    const topics = rows.map((row) => {
      const attempted = Number(row.attempted)
      const correct = Number(row.correct)
      const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0
      return {
        subject: row.subject,
        topic: row.topic,
        attempted,
        correct,
        accuracy,
        band: masteryBand(accuracy, attempted),
      }
    })

    // Per-subject roll-up folded from the topic rows (no extra query).
    const bySubject = new Map<string, { attempted: number; correct: number; topicCount: number }>()
    for (const t of topics) {
      const agg = bySubject.get(t.subject) ?? { attempted: 0, correct: 0, topicCount: 0 }
      agg.attempted += t.attempted
      agg.correct += t.correct
      agg.topicCount += 1
      bySubject.set(t.subject, agg)
    }
    const subjects = [...bySubject.entries()].map(([subject, agg]) => {
      const accuracy = agg.attempted > 0 ? Math.round((agg.correct / agg.attempted) * 100) : 0
      return {
        subject,
        attempted: agg.attempted,
        correct: agg.correct,
        accuracy,
        band: masteryBand(accuracy, agg.attempted),
        topicCount: agg.topicCount,
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        subjects,
        topics,
        totalTopics: topics.length,
        totalAttempted: topics.reduce((n, t) => n + t.attempted, 0),
        totalCorrect: topics.reduce((n, t) => n + t.correct, 0),
      },
    })
  } catch (error) {
    console.error('[student/mastery] failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load mastery map' },
      { status: 500 }
    )
  }
}
