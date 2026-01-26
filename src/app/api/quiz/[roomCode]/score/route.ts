import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { QuizTeam, RoundOutcome, QuizSessionStatus } from '@/generated/prisma'
import { verifyHostToken, unauthorizedResponse } from '@/lib/quiz/auth'
import { ipRateLimit, getRateLimitHeaders } from '@/lib/middleware/rateLimit'

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
    const rateLimitResult = await ipRateLimit(request, {
      limit: 100,
      window: 15 * 60 * 1000,
      endpoint: 'quiz:score',
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please slow down.' },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    const { roomCode } = await params
    const body: ScoreRequest = await request.json()

    // Validate room code: exactly 6 alphanumeric characters
    const roomCodeRegex = /^[A-Z0-9]{6}$/
    if (!roomCode || !roomCodeRegex.test(roomCode.toUpperCase())) {
      return NextResponse.json(
        { success: false, error: 'Invalid room code format' },
        { status: 400 }
      )
    }

    const authResult = await verifyHostToken(request, roomCode)
    if (!authResult.valid || !authResult.session) {
      return unauthorizedResponse(authResult.error)
    }
    const session = authResult.session

    if (!body.team || !['TEAM_A', 'TEAM_B'].includes(body.team)) {
      return NextResponse.json({ success: false, error: 'Valid team is required' }, { status: 400 })
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

    if (body.customPoints !== undefined) {
      const points = Number(body.customPoints)
      if (isNaN(points) || points < -1000 || points > 1000) {
        return NextResponse.json(
          { success: false, error: 'Custom points must be between -1000 and 1000' },
          { status: 400 }
        )
      }
    }

    if (body.note && body.note.length > 200) {
      return NextResponse.json(
        { success: false, error: 'Note must be 200 characters or less' },
        { status: 400 }
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

      // Calculate new scores with overflow protection
      const MAX_SCORE = 1000000
      const MIN_SCORE = -1000000

      if (body.team === 'TEAM_A') {
        const newScore = session.teamAScore + pointsChange
        scoreUpdate.teamAScore = Math.max(MIN_SCORE, Math.min(MAX_SCORE, newScore))
      } else {
        const newScore = session.teamBScore + pointsChange
        scoreUpdate.teamBScore = Math.max(MIN_SCORE, Math.min(MAX_SCORE, newScore))
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
    return NextResponse.json({ success: false, error: 'Failed to update score' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  try {
    const rateLimitResult = await ipRateLimit(request, {
      limit: 50,
      window: 15 * 60 * 1000,
      endpoint: 'quiz:undo',
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please slow down.' },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    const { roomCode } = await params

    // Validate room code: exactly 6 alphanumeric characters
    const roomCodeRegex = /^[A-Z0-9]{6}$/
    if (!roomCode || !roomCodeRegex.test(roomCode.toUpperCase())) {
      return NextResponse.json(
        { success: false, error: 'Invalid room code format' },
        { status: 400 }
      )
    }

    const authResult = await verifyHostToken(request, roomCode)
    if (!authResult.valid || !authResult.session) {
      return unauthorizedResponse(authResult.error)
    }

    // Re-fetch with just the last round for undo operation
    const session = await prisma.quiz_sessions.findUnique({
      where: { id: authResult.session.id },
      include: {
        rounds: {
          orderBy: { roundNumber: 'desc' },
          take: 1,
        },
      },
    })

    if (!session) {
      return NextResponse.json({ success: false, error: 'Quiz session not found' }, { status: 404 })
    }

    // Prevent undo on completed quizzes
    if (session.status === 'COMPLETED') {
      return NextResponse.json(
        { success: false, error: 'Cannot undo rounds on a completed quiz' },
        { status: 400 }
      )
    }

    if (session.rounds.length === 0) {
      return NextResponse.json({ success: false, error: 'No rounds to undo' }, { status: 400 })
    }

    const lastRound = session.rounds[0]

    // Verify round number matches to prevent race conditions
    if (lastRound.roundNumber !== session.currentRound) {
      return NextResponse.json(
        { success: false, error: 'Round mismatch - please refresh and try again' },
        { status: 409 }
      )
    }

    const result = await prisma.$transaction(async (tx) => {
      await tx.quiz_rounds.delete({
        where: { id: lastRound.id },
      })

      const scoreUpdate: Record<string, unknown> = {
        currentRound: Math.max(0, session.currentRound - 1),
      }

      // Calculate new scores with overflow protection
      const MAX_SCORE = 1000000
      const MIN_SCORE = -1000000

      if (lastRound.answeringTeam === 'TEAM_A') {
        const newScore = session.teamAScore - lastRound.pointsChange
        scoreUpdate.teamAScore = Math.max(MIN_SCORE, Math.min(MAX_SCORE, newScore))
      } else {
        const newScore = session.teamBScore - lastRound.pointsChange
        scoreUpdate.teamBScore = Math.max(MIN_SCORE, Math.min(MAX_SCORE, newScore))
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
