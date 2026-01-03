import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { QuizTeam } from '@/generated/prisma'
import { ipRateLimit, getRateLimitHeaders } from '@/lib/middleware/rateLimit'
import { generateParticipantToken } from '@/lib/quiz/auth'

export const dynamic = 'force-dynamic'

interface JoinRequest {
  name: string
  team?: 'TEAM_A' | 'TEAM_B'
  deviceId?: string
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  try {
    const rateLimitResult = await ipRateLimit(request, {
      limit: 30,
      window: 5 * 60 * 1000,
      endpoint: 'quiz:join',
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many join attempts. Please wait before trying again.' },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    const { roomCode } = await params
    const body: JoinRequest = await request.json()

    if (!roomCode || roomCode.length !== 6) {
      return NextResponse.json(
        { success: false, error: 'Invalid room code' },
        { status: 400 }
      )
    }

    if (!body.name || body.name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      )
    }

    const trimmedName = body.name.trim()

    if (trimmedName.length < 2 || trimmedName.length > 50) {
      return NextResponse.json(
        { success: false, error: 'Name must be between 2 and 50 characters' },
        { status: 400 }
      )
    }

    // Only allow alphanumeric, spaces, and common punctuation
    const nameRegex = /^[\p{L}\p{N}\s\-'.]+$/u
    if (!nameRegex.test(trimmedName)) {
      return NextResponse.json(
        { success: false, error: 'Name contains invalid characters' },
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
        { success: false, error: 'This quiz has already ended' },
        { status: 400 }
      )
    }

    // Verify host token if present to determine if this is the host joining
    const hostToken = request.headers.get('x-host-token')
    const isHost = hostToken === session.hostToken

    // Require team selection for non-host participants
    if (!isHost && (!body.team || !['TEAM_A', 'TEAM_B'].includes(body.team))) {
      return NextResponse.json(
        { success: false, error: 'Team selection is required' },
        { status: 400 }
      )
    }

    // Use upsert to prevent race condition between check and create
    const participant = await prisma.quiz_participants.upsert({
      where: {
        sessionId_name: {
          sessionId: session.id,
          name: trimmedName,
        },
      },
      update: {
        lastSeenAt: new Date(),
        team: body.team ? (body.team as QuizTeam) : undefined,
        deviceId: body.deviceId || undefined,
        isHost, // Update isHost based on valid token
      },
      create: {
        sessionId: session.id,
        name: trimmedName,
        team: body.team ? (body.team as QuizTeam) : null,
        isHost, // Only true if valid host token was provided
        deviceId: body.deviceId || null,
      },
    })

    // Determine if this was a rejoin by checking if joinedAt is older than a few seconds
    const isRejoining = participant.joinedAt < new Date(Date.now() - 5000)

    // Generate participant token for authenticated actions (chat, etc.)
    const participantToken = generateParticipantToken(participant.id, session.id)

    return NextResponse.json({
      success: true,
      data: {
        participantId: participant.id,
        participantToken, // Token for authenticated participant actions
        name: participant.name,
        team: participant.team,
        isHost: participant.isHost,
        isRejoining,
        session: {
          id: session.id, // Include session ID for token verification
          title: session.title,
          format: session.format,
          status: session.status,
          teamAName: session.teamAName,
          teamBName: session.teamBName,
          teamAScore: session.teamAScore,
          teamBScore: session.teamBScore,
        },
      },
    })
  } catch (error) {
    console.error('Error joining quiz session:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to join quiz session' },
      { status: 500 }
    )
  }
}
