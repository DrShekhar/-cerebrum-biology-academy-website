import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { SONNET } from '@/lib/ai/models'
import { ensureSystemUser } from '@/lib/constants/systemUser'

/**
 * POST /api/doubts/ai-solve — instant AI doubt solver.
 *
 * Accepts a typed question and/or a photo of a question (base64) and returns a
 * step-by-step NEET-Biology solution. Best-effort logs the exchange to the doubt
 * system as an AI-ANSWERED ticket so the student can later escalate to a teacher.
 * No-ops gracefully (503) when ANTHROPIC_API_KEY is unset.
 */

const MAX_IMAGE_B64 = 7_000_000 // ~5 MB image

const SYSTEM_PROMPT = `You are a NEET Biology tutor for Indian medical-entrance aspirants.
A student sends a Biology question (typed and/or as a photo). Respond with:
1. **Concept** — the topic/concept it tests (one line).
2. **Solution** — a clear, correct, step-by-step explanation a Class 11/12 student can follow.
3. **Answer** — the final answer; if it is an MCQ, state the correct option and why the others are wrong.
Be accurate and concise. Use NCERT-aligned terminology. If the input is not a biology question, or is unreadable, say so briefly and ask the student to retype it. Do not invent facts.`

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    const userId = (session?.user as { id?: string } | undefined)?.id
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Sign in required' }, { status: 401 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'AI doubt solver is not configured yet.' },
        { status: 503 }
      )
    }

    const body = await request.json().catch(() => ({}))
    const question: string = (body.question || '').toString().trim()
    const imageBase64: string | undefined = body.imageBase64
    const imageMediaType: string = body.imageMediaType || 'image/jpeg'

    if (!question && !imageBase64) {
      return NextResponse.json(
        { success: false, error: 'Type a question or attach a photo.' },
        { status: 400 }
      )
    }
    if (imageBase64 && imageBase64.length > MAX_IMAGE_B64) {
      return NextResponse.json(
        { success: false, error: 'Image too large — please use one under ~5 MB.' },
        { status: 400 }
      )
    }

    const content: Anthropic.MessageParam['content'] = []
    if (imageBase64) {
      content.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: imageMediaType as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif',
          data: imageBase64,
        },
      })
    }
    content.push({
      type: 'text',
      text: question || 'Solve the Biology question in the attached image.',
    })

    const anthropic = new Anthropic({ apiKey })
    const message = await anthropic.messages.create({
      model: SONNET,
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content }],
    })

    const solution = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim()

    // Best-effort: log to the doubt system as an AI-answered ticket (escalatable).
    let ticketId: string | null = null
    try {
      const systemUserId = await ensureSystemUser()
      const subject = question ? question.slice(0, 80) : 'Photo doubt (AI)'
      const ticket = await prisma.doubt_tickets.create({
        data: {
          id: `doubt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
          studentId: userId,
          subject,
          description: question || '[Photo question]',
          status: 'ANSWERED',
          priority: 'MEDIUM',
          updatedAt: new Date(),
        },
      })
      ticketId = ticket.id
      await prisma.doubt_messages.createMany({
        data: [
          {
            id: `dm_${ticket.id}_q`,
            doubtId: ticket.id,
            senderId: userId,
            message: question || '[Photo question]',
            messageType: imageBase64 ? 'IMAGE' : 'TEXT',
            updatedAt: new Date(),
          },
          {
            id: `dm_${ticket.id}_a`,
            doubtId: ticket.id,
            senderId: systemUserId,
            message: solution,
            messageType: 'TEXT',
            metadata: { source: 'ai-doubt-solver', model: SONNET },
            updatedAt: new Date(),
          },
        ],
        skipDuplicates: true,
      })
    } catch (logErr) {
      console.warn('AI doubt: failed to log ticket (non-fatal)', logErr)
    }

    return NextResponse.json({ success: true, solution, ticketId })
  } catch (error) {
    console.error('AI doubt-solve error:', error)
    return NextResponse.json(
      { success: false, error: 'The AI tutor is busy — please try again.' },
      { status: 500 }
    )
  }
}
