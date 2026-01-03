import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { QuizTeam } from '@/generated/prisma'
import { ipRateLimit, getRateLimitHeaders } from '@/lib/middleware/rateLimit'

export const dynamic = 'force-dynamic'

interface SendMessageRequest {
  participantId: string
  message: string
}

// GET - Fetch messages for a team (or all messages for host)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  try {
    const rateLimitResult = await ipRateLimit(request, {
      limit: 200,
      window: 15 * 60 * 1000,
      endpoint: 'quiz:chat:get',
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please slow down.' },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    const { roomCode } = await params
    const { searchParams } = new URL(request.url)
    const team = searchParams.get('team') as QuizTeam | null
    // Use timestamp-based cursor instead of ID for proper ordering
    const afterTimestamp = searchParams.get('after')
    const limitParam = searchParams.get('limit')
    const limit = Math.min(Math.max(parseInt(limitParam || '50', 10) || 50, 1), 100)

    if (!roomCode || roomCode.length !== 6) {
      return NextResponse.json(
        { success: false, error: 'Invalid room code' },
        { status: 400 }
      )
    }

    const session = await prisma.quiz_sessions.findUnique({
      where: { roomCode: roomCode.toUpperCase() },
    })

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Quiz session not found' },
        { status: 404 }
      )
    }

    // Verify host token to determine if this is the host viewing
    const hostToken = request.headers.get('x-host-token')
    const isHost = hostToken === session.hostToken

    // Build query based on whether it's host or team member
    const whereClause: Record<string, unknown> = {
      sessionId: session.id,
    }

    // If not host, only fetch messages for their team
    if (!isHost && team) {
      whereClause.team = team
    }

    // Use timestamp-based cursor for proper chronological ordering
    if (afterTimestamp) {
      const afterDate = new Date(afterTimestamp)
      if (!isNaN(afterDate.getTime())) {
        whereClause.createdAt = { gt: afterDate }
      }
    }

    const messages = await prisma.quiz_messages.findMany({
      where: whereClause,
      orderBy: { createdAt: 'asc' },
      take: limit + 1, // Fetch one extra to check if there are more
    })

    // Check if there are more messages
    const hasMore = messages.length > limit
    const returnMessages = hasMore ? messages.slice(0, limit) : messages

    // Get the last timestamp for next cursor
    const lastMessage = returnMessages[returnMessages.length - 1]
    const nextCursor = lastMessage ? lastMessage.createdAt.toISOString() : null

    return NextResponse.json(
      {
        success: true,
        data: returnMessages.map((m) => ({
          id: m.id,
          team: m.team,
          participantId: m.participantId,
          senderName: m.senderName,
          message: m.message,
          createdAt: m.createdAt,
        })),
        hasMore,
        nextCursor,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

// POST - Send a new message
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  try {
    const rateLimitResult = await ipRateLimit(request, {
      limit: 30,
      window: 5 * 60 * 1000,
      endpoint: 'quiz:chat:post',
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many messages. Please slow down.' },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    const { roomCode } = await params
    const body: SendMessageRequest = await request.json()

    if (!roomCode || roomCode.length !== 6) {
      return NextResponse.json(
        { success: false, error: 'Invalid room code' },
        { status: 400 }
      )
    }

    if (!body.participantId || !body.message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Participant ID and message are required' },
        { status: 400 }
      )
    }

    // Limit message length
    if (body.message.length > 500) {
      return NextResponse.json(
        { success: false, error: 'Message too long (max 500 characters)' },
        { status: 400 }
      )
    }

    const session = await prisma.quiz_sessions.findUnique({
      where: { roomCode: roomCode.toUpperCase() },
    })

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Quiz session not found' },
        { status: 404 }
      )
    }

    if (session.status === 'COMPLETED') {
      return NextResponse.json(
        { success: false, error: 'Quiz has ended' },
        { status: 400 }
      )
    }

    // Find the participant
    const participant = await prisma.quiz_participants.findUnique({
      where: { id: body.participantId },
    })

    if (!participant) {
      return NextResponse.json(
        { success: false, error: 'Participant not found' },
        { status: 404 }
      )
    }

    if (!participant.team) {
      return NextResponse.json(
        { success: false, error: 'You must be on a team to send messages' },
        { status: 400 }
      )
    }

    // Create the message
    const message = await prisma.quiz_messages.create({
      data: {
        sessionId: session.id,
        team: participant.team,
        participantId: participant.id,
        senderName: participant.name,
        message: body.message.trim(),
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          id: message.id,
          team: message.team,
          participantId: message.participantId,
          senderName: message.senderName,
          message: message.message,
          createdAt: message.createdAt,
        },
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    )
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
