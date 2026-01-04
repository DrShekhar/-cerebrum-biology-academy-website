import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ipRateLimit, getRateLimitHeaders } from '@/lib/middleware/rateLimit'
import { verifyParticipantToken } from '@/lib/quiz/auth'

export const dynamic = 'force-dynamic'

const ALLOWED_EMOJIS = ['👍', '❤️', '😂', '❓', '🔥']

interface ReactRequest {
  participantId: string
  participantToken: string
  messageId: string
  emoji: string
}

// POST - Add or toggle a reaction on a message
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  try {
    const rateLimitResult = await ipRateLimit(request, {
      limit: 100,
      window: 15 * 60 * 1000,
      endpoint: 'quiz:chat:react',
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many reactions. Please slow down.' },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    const { roomCode } = await params
    const body: ReactRequest = await request.json()
    const { participantId, participantToken, messageId, emoji } = body

    // Validate inputs
    if (!participantId || !participantToken || !messageId || !emoji) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate emoji
    if (!ALLOWED_EMOJIS.includes(emoji)) {
      return NextResponse.json({ success: false, error: 'Invalid emoji' }, { status: 400 })
    }

    // Validate room code
    const roomCodeRegex = /^[A-Z0-9]{6}$/
    if (!roomCode || !roomCodeRegex.test(roomCode.toUpperCase())) {
      return NextResponse.json(
        { success: false, error: 'Invalid room code format' },
        { status: 400 }
      )
    }

    // Get session
    const session = await prisma.quiz_sessions.findUnique({
      where: { roomCode: roomCode.toUpperCase() },
    })

    if (!session) {
      return NextResponse.json({ success: false, error: 'Quiz session not found' }, { status: 404 })
    }

    // Verify participant token
    if (!verifyParticipantToken(participantToken, participantId, session.id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid participant credentials' },
        { status: 401 }
      )
    }

    // Verify participant exists and belongs to this session
    const participant = await prisma.quiz_participants.findUnique({
      where: { id: participantId },
      select: { id: true, sessionId: true, team: true },
    })

    if (!participant || participant.sessionId !== session.id) {
      return NextResponse.json(
        { success: false, error: 'Participant not found in this session' },
        { status: 403 }
      )
    }

    // Verify message exists and belongs to this session
    const message = await prisma.quiz_messages.findUnique({
      where: { id: messageId },
      select: { id: true, sessionId: true, team: true },
    })

    if (!message || message.sessionId !== session.id) {
      return NextResponse.json({ success: false, error: 'Message not found' }, { status: 404 })
    }

    // Participant can only react to messages from their own team
    if (message.team !== participant.team) {
      return NextResponse.json(
        { success: false, error: 'Cannot react to other team messages' },
        { status: 403 }
      )
    }

    // Toggle reaction: if exists, remove it; otherwise add it
    const existingReaction = await prisma.quiz_message_reactions.findUnique({
      where: {
        messageId_participantId_emoji: {
          messageId,
          participantId,
          emoji,
        },
      },
    })

    if (existingReaction) {
      // Remove existing reaction
      await prisma.quiz_message_reactions.delete({
        where: { id: existingReaction.id },
      })

      return NextResponse.json({
        success: true,
        action: 'removed',
        messageId,
        emoji,
      })
    } else {
      // Add new reaction
      await prisma.quiz_message_reactions.create({
        data: {
          messageId,
          participantId,
          emoji,
        },
      })

      return NextResponse.json({
        success: true,
        action: 'added',
        messageId,
        emoji,
      })
    }
  } catch (error) {
    console.error('Error handling reaction:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process reaction',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
