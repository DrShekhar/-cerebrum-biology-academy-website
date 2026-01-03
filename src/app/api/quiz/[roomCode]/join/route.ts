import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { QuizTeam } from '@/generated/prisma'

export const dynamic = 'force-dynamic'

interface JoinRequest {
  name: string
  team?: 'TEAM_A' | 'TEAM_B'
  isHost?: boolean
  deviceId?: string
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  try {
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

    // Require team selection for non-host participants
    if (!body.isHost && (!body.team || !['TEAM_A', 'TEAM_B'].includes(body.team))) {
      return NextResponse.json(
        { success: false, error: 'Team selection is required' },
        { status: 400 }
      )
    }

    const trimmedName = body.name.trim()

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
      },
      create: {
        sessionId: session.id,
        name: trimmedName,
        team: body.team ? (body.team as QuizTeam) : null,
        isHost: body.isHost || false,
        deviceId: body.deviceId || null,
      },
    })

    // Determine if this was a rejoin by checking if joinedAt is older than a few seconds
    const isRejoining = participant.joinedAt < new Date(Date.now() - 5000)

    return NextResponse.json({
      success: true,
      data: {
        participantId: participant.id,
        name: participant.name,
        team: participant.team,
        isHost: participant.isHost,
        isRejoining,
        session: {
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
