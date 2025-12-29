import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { QuizTeam, RoundOutcome, QuizSessionStatus } from '@/generated/prisma'

export const dynamic = 'force-dynamic'

interface ScoringRules {
  correct: number
  wrong: number
  pass: number
  partial?: Record<string, number>
}

interface ScoreRequest {
  team: 'TEAM_A' | 'TEAM_B'
  outcome: 'CORRECT' | 'INCORRECT' | 'PASSED' | 'PARTIAL' | 'SKIPPED'
  partialType?: string
  note?: string
  customPoints?: number
}

function calculatePoints(
  outcome: RoundOutcome,
  rules: ScoringRules,
  partialType?: string,
  customPoints?: number
): number {
  if (customPoints !== undefined) {
    return customPoints
  }

  switch (outcome) {
    case 'CORRECT':
      return rules.correct
    case 'INCORRECT':
      return rules.wrong
    case 'PASSED':
      return rules.pass
    case 'PARTIAL':
      if (partialType && rules.partial && rules.partial[partialType]) {
        return rules.partial[partialType]
      }
      return Math.floor(rules.correct / 2)
    case 'SKIPPED':
      return 0
    default:
      return 0
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  try {
    const { roomCode } = await params
    const body: ScoreRequest = await request.json()

    if (!roomCode || roomCode.length !== 6) {
      return NextResponse.json(
        { success: false, error: 'Invalid room code' },
        { status: 400 }
      )
    }

    if (!body.team || !['TEAM_A', 'TEAM_B'].includes(body.team)) {
      return NextResponse.json(
        { success: false, error: 'Valid team is required' },
        { status: 400 }
      )
    }

    if (
      !body.outcome ||
      !['CORRECT', 'INCORRECT', 'PASSED', 'PARTIAL', 'SKIPPED'].includes(body.outcome)
    ) {
      return NextResponse.json(
        { success: false, error: 'Valid outcome is required' },
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

    const rules = session.scoringRules as ScoringRules
    const pointsChange = calculatePoints(
      body.outcome as RoundOutcome,
      rules,
      body.partialType,
      body.customPoints
    )

    const nextRound = session.currentRound + 1

    const result = await prisma.$transaction(async (tx) => {
      const round = await tx.quiz_rounds.create({
        data: {
          sessionId: session.id,
          roundNumber: nextRound,
          answeringTeam: body.team as QuizTeam,
          outcome: body.outcome as RoundOutcome,
          pointsChange,
          note: body.note || null,
        },
      })

      const scoreUpdate: Record<string, unknown> = {
        currentRound: nextRound,
      }

      if (session.status === 'WAITING') {
        scoreUpdate.status = 'IN_PROGRESS' as QuizSessionStatus
        scoreUpdate.startedAt = new Date()
      }

      if (body.team === 'TEAM_A') {
        scoreUpdate.teamAScore = session.teamAScore + pointsChange
      } else {
        scoreUpdate.teamBScore = session.teamBScore + pointsChange
      }

      const updatedSession = await tx.quiz_sessions.update({
        where: { id: session.id },
        data: scoreUpdate,
      })

      return { round, session: updatedSession }
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          round: {
            id: result.round.id,
            roundNumber: result.round.roundNumber,
            answeringTeam: result.round.answeringTeam,
            outcome: result.round.outcome,
            pointsChange: result.round.pointsChange,
            note: result.round.note,
          },
          session: {
            teamAScore: result.session.teamAScore,
            teamBScore: result.session.teamBScore,
            currentRound: result.session.currentRound,
            status: result.session.status,
          },
        },
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    )
  } catch (error) {
    console.error('Error updating score:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update score' },
      { status: 500 }
    )
  }
}

export async function DELETE(
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
          orderBy: { roundNumber: 'desc' },
          take: 1,
        },
      },
    })

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Quiz session not found' },
        { status: 404 }
      )
    }

    if (session.rounds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No rounds to undo' },
        { status: 400 }
      )
    }

    const lastRound = session.rounds[0]

    const result = await prisma.$transaction(async (tx) => {
      await tx.quiz_rounds.delete({
        where: { id: lastRound.id },
      })

      const scoreUpdate: Record<string, unknown> = {
        currentRound: Math.max(0, session.currentRound - 1),
      }

      if (lastRound.answeringTeam === 'TEAM_A') {
        scoreUpdate.teamAScore = session.teamAScore - lastRound.pointsChange
      } else {
        scoreUpdate.teamBScore = session.teamBScore - lastRound.pointsChange
      }

      const updatedSession = await tx.quiz_sessions.update({
        where: { id: session.id },
        data: scoreUpdate,
      })

      return updatedSession
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          undoneRound: {
            roundNumber: lastRound.roundNumber,
            answeringTeam: lastRound.answeringTeam,
            pointsChange: lastRound.pointsChange,
          },
          session: {
            teamAScore: result.teamAScore,
            teamBScore: result.teamBScore,
            currentRound: result.currentRound,
          },
        },
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    )
  } catch (error) {
    console.error('Error undoing last round:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to undo last round' },
      { status: 500 }
    )
  }
}
