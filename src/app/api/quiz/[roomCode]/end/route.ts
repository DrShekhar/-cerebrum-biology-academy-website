import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { QuizWinner } from '@/generated/prisma'
import { verifyHostToken, unauthorizedResponse } from '@/lib/quiz/auth'
import { ipRateLimit, getRateLimitHeaders } from '@/lib/middleware/rateLimit'

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  try {
    const rateLimitResult = await ipRateLimit(request, {
      limit: 20,
      window: 15 * 60 * 1000,
      endpoint: 'quiz:end',
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please slow down.' },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    const { roomCode } = await params

    if (!roomCode || roomCode.length !== 6) {
      return NextResponse.json({ success: false, error: 'Invalid room code' }, { status: 400 })
    }

    const authResult = await verifyHostToken(request, roomCode)
    if (!authResult.valid || !authResult.session) {
      return unauthorizedResponse(authResult.error)
    }

    // Re-fetch with all rounds and participants for stats
    const session = await prisma.quiz_sessions.findUnique({
      where: { id: authResult.session.id },
      include: {
        rounds: {
          orderBy: { roundNumber: 'asc' },
        },
        participants: true,
      },
    })

    if (!session) {
      return NextResponse.json({ success: false, error: 'Quiz session not found' }, { status: 404 })
    }

    if (session.status === 'COMPLETED') {
      return NextResponse.json({ success: false, error: 'Quiz already ended' }, { status: 400 })
    }

    // Calculate winner before update
    let winner: QuizWinner = 'TIE'
    if (session.teamAScore > session.teamBScore) {
      winner = 'TEAM_A'
    } else if (session.teamBScore > session.teamAScore) {
      winner = 'TEAM_B'
    }

    const updated = await prisma.quiz_sessions.update({
      where: { id: session.id },
      data: {
        status: 'COMPLETED',
        endedAt: new Date(),
        winner,
      },
    })

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
          winner === 'TEAM_A' ? session.teamAName : winner === 'TEAM_B' ? session.teamBName : 'Tie',
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
    return NextResponse.json({ success: false, error: 'Failed to end quiz' }, { status: 500 })
  }
}
