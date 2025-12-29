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

    const existingParticipant = await prisma.quiz_participants.findUnique({
      where: {
        sessionId_name: {
          sessionId: session.id,
          name: body.name.trim(),
        },
      },
    })

    if (existingParticipant) {
      const updated = await prisma.quiz_participants.update({
        where: { id: existingParticipant.id },
        data: {
          lastSeenAt: new Date(),
          team: body.team ? (body.team as QuizTeam) : existingParticipant.team,
          deviceId: body.deviceId || existingParticipant.deviceId,
        },
      })

      return NextResponse.json({
        success: true,
        data: {
          participantId: updated.id,
          name: updated.name,
          team: updated.team,
          isHost: updated.isHost,
          isRejoining: true,
        },
      })
    }

    const participant = await prisma.quiz_participants.create({
      data: {
        sessionId: session.id,
        name: body.name.trim(),
        team: body.team ? (body.team as QuizTeam) : null,
        isHost: body.isHost || false,
        deviceId: body.deviceId || null,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        participantId: participant.id,
        name: participant.name,
        team: participant.team,
        isHost: participant.isHost,
        isRejoining: false,
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

    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { success: false, error: 'This name is already taken in this session' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to join quiz session' },
      { status: 500 }
    )
  }
}
