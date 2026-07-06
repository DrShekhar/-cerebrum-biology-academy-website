import { NextRequest, NextResponse } from 'next/server'
import { Anthropic } from '@anthropic-ai/sdk'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { correctLetter } from '@/lib/cbt/paper'

// AI coach feedback for a completed CBT mock test (W2 of the endpoint plan).
// Ports the ONE unique capability of the redundant /api/ai/test engine — the
// Anthropic performance analysis — onto the live CBT platform. Result is
// cached on test_analytics so revisits never re-spend LLM tokens.

let _anthropic: Anthropic | null = null
function anthropic(): Anthropic {
  if (!_anthropic) _anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || '' })
  return _anthropic
}

interface AiFeedback {
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  motivationalMessage: string
}

export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params

    const test = await prisma.test_sessions.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        freeUserId: true,
        status: true,
        totalScore: true,
        percentage: true,
        answerState: true,
        test_analytics: { select: { id: true, answerPattern: true } },
      },
    })
    if (!test || (test.userId || test.freeUserId) !== session.user.id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    if (test.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'Test not yet completed' }, { status: 400 })
    }

    // Cached? (stored under test_analytics.answerPattern.aiFeedback)
    const cachedPattern = test.test_analytics?.answerPattern as Record<string, unknown> | null
    if (cachedPattern?.aiFeedback) {
      return NextResponse.json({
        success: true,
        cached: true,
        feedback: cachedPattern.aiFeedback as AiFeedback,
      })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'AI feedback is not available right now' }, { status: 503 })
    }

    // Recompute topic-wise performance from the stored attempt state
    const state =
      (test.answerState as {
        questionIds?: string[]
        answers?: Record<string, string>
      }) || {}
    const questionIds = state.questionIds || []
    const answers = state.answers || {}
    if (questionIds.length === 0) {
      return NextResponse.json({ error: 'No attempt data for this session' }, { status: 400 })
    }

    const questions = await prisma.questions.findMany({
      where: { id: { in: questionIds } },
      select: { id: true, topic: true, subject: true, correctAnswer: true, options: true },
    })

    const topicWise: Record<string, { correct: number; total: number }> = {}
    for (const q of questions) {
      const key = q.topic || q.subject || 'General'
      if (!topicWise[key]) topicWise[key] = { correct: 0, total: 0 }
      topicWise[key].total++
      const your = (answers[q.id] || '').toUpperCase()
      if (your && your === correctLetter(q as never)) topicWise[key].correct++
    }

    const perf = Object.entries(topicWise).map(([topic, d]) => ({
      topic,
      accuracy: d.total ? (d.correct / d.total) * 100 : 0,
      correct: d.correct,
      total: d.total,
    }))
    const strong = perf.filter((t) => t.accuracy >= 70 && t.total >= 2)
    const weak = perf.filter((t) => t.accuracy < 60)

    const prompt = `Analyze this NEET Biology mock-test performance and provide personalized coaching feedback:

Test Performance:
- Score: ${test.totalScore ?? 0} (${(test.percentage ?? 0).toFixed(1)}%)
- Strong topics: ${strong.map((t) => `${t.topic} (${t.accuracy.toFixed(0)}%, ${t.correct}/${t.total})`).join(', ') || 'None yet'}
- Weak topics: ${weak.map((t) => `${t.topic} (${t.accuracy.toFixed(0)}%, ${t.correct}/${t.total})`).join(', ') || 'None'}

Respond with JSON only:
{"strengths": [2-3 specific strengths], "weaknesses": [2-3 areas to improve], "recommendations": [3-4 specific actionable NCERT-based study actions], "motivationalMessage": "2-3 encouraging sentences"}`

    const response = await anthropic().messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    let feedback: AiFeedback
    try {
      const text = response.content[0].type === 'text' ? response.content[0].text : '{}'
      feedback = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1))
    } catch {
      return NextResponse.json({ error: 'AI feedback could not be generated' }, { status: 502 })
    }

    // Cache (merge into existing analytics row, or skip caching if none)
    if (test.test_analytics?.id) {
      const pattern = (cachedPattern as Record<string, unknown>) || {}
      await prisma.test_analytics
        .update({
          where: { id: test.test_analytics.id },
          data: {
            answerPattern: JSON.parse(JSON.stringify({ ...pattern, aiFeedback: feedback })),
          },
        })
        .catch(() => {})
    }

    return NextResponse.json({ success: true, cached: false, feedback })
  } catch (error) {
    console.error('[cbt/ai-feedback] failed:', error)
    return NextResponse.json({ error: 'Failed to generate AI feedback' }, { status: 500 })
  }
}
