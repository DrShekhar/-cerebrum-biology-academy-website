import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  try {
    const { roomCode } = await params

    if (!roomCode || roomCode.length !== 6) {
      return NextResponse.json(
        { success: false, error: 'Invalid room code' },
        { status: 400 }
      )
    }

    const session = await prisma.quiz_sessions.findUnique({
      where: { roomCode: roomCode.toUpperCase() },
      include: {
        rounds: {
          orderBy: { roundNumber: 'asc' },
        },
        participants: true,
      },
    })

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Quiz session not found' },
        { status: 404 }
      )
    }

    if (session.status === 'COMPLETED') {
      return NextResponse.json(
        { success: false, error: 'Quiz already ended' },
        { status: 400 }
      )
    }

    const updated = await prisma.quiz_sessions.update({
      where: { id: session.id },
      data: {
        status: 'COMPLETED',
        endedAt: new Date(),
      },
    })

    let winner: 'TEAM_A' | 'TEAM_B' | 'TIE' = 'TIE'
    if (session.teamAScore > session.teamBScore) {
      winner = 'TEAM_A'
    } else if (session.teamBScore > session.teamAScore) {
      winner = 'TEAM_B'
    }

    const teamACorrect = session.rounds.filter(
      (r) => r.answeringTeam === 'TEAM_A' && r.outcome === 'CORRECT'
    ).length
    const teamBCorrect = session.rounds.filter(
      (r) => r.answeringTeam === 'TEAM_B' && r.outcome === 'CORRECT'
    ).length

    return NextResponse.json({
      success: true,
      data: {
        sessionId: session.id,
        roomCode: session.roomCode,
        title: session.title,
        status: updated.status,
        winner,
        winnerName:
          winner === 'TEAM_A'
            ? session.teamAName
            : winner === 'TEAM_B'
              ? session.teamBName
              : 'Tie',
        finalScores: {
          teamA: {
            name: session.teamAName,
            score: session.teamAScore,
            correctAnswers: teamACorrect,
          },
          teamB: {
            name: session.teamBName,
            score: session.teamBScore,
            correctAnswers: teamBCorrect,
          },
        },
        totalRounds: session.currentRound,
        participantCount: session.participants.length,
        duration: session.startedAt
          ? Math.floor((updated.endedAt!.getTime() - session.startedAt.getTime()) / 1000)
          : 0,
        startedAt: session.startedAt,
        endedAt: updated.endedAt,
      },
    })
  } catch (error) {
    console.error('Error ending quiz:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to end quiz' },
      { status: 500 }
    )
  }
}
