import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { QuizSessionStatus } from '@/generated/prisma'
import { verifyHostToken, unauthorizedResponse } from '@/lib/quiz/auth'
import { ipRateLimit, getRateLimitHeaders } from '@/lib/middleware/rateLimit'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  try {
    const rateLimitResult = await ipRateLimit(request, {
      limit: 200,
      window: 15 * 60 * 1000,
      endpoint: 'quiz:session:get',
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please slow down.' },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

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
          take: 20,
        },
        participants: {
          orderBy: { joinedAt: 'desc' },
        },
      },
    })

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Quiz session not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: session.id,
          roomCode: session.roomCode,
          title: session.title,
          format: session.format,
          questionMode: session.questionMode,
          status: session.status,
          teamAName: session.teamAName,
          teamBName: session.teamBName,
          teamAScore: session.teamAScore,
          teamBScore: session.teamBScore,
          currentRound: session.currentRound,
          totalRounds: session.totalRounds,
          scoringRules: session.scoringRules,
          rounds: session.rounds.map((r) => ({
            id: r.id,
            roundNumber: r.roundNumber,
            answeringTeam: r.answeringTeam,
            outcome: r.outcome,
            pointsChange: r.pointsChange,
            note: r.note,
            createdAt: r.createdAt,
          })),
          participants: session.participants.map((p) => ({
            id: p.id,
            name: p.name,
            team: p.team,
            isHost: p.isHost,
            joinedAt: p.joinedAt,
          })),
          startedAt: session.startedAt,
          endedAt: session.endedAt,
          createdAt: session.createdAt,
          questionTimerSeconds: session.questionTimerSeconds,
          answerTimerSeconds: session.answerTimerSeconds,
          activeTimerType: session.activeTimerType,
          timerStartedAt: session.timerStartedAt,
          timerPausedAt: session.timerPausedAt,
          teamDiscussing: session.teamDiscussing,
        },
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching quiz session:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quiz session' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  try {
    const rateLimitResult = await ipRateLimit(request, {
      limit: 50,
      window: 15 * 60 * 1000,
      endpoint: 'quiz:session:patch',
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please slow down.' },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    const { roomCode } = await params
    const body = await request.json()

    if (!roomCode || roomCode.length !== 6) {
      return NextResponse.json(
        { success: false, error: 'Invalid room code' },
        { status: 400 }
      )
    }

    const authResult = await verifyHostToken(request, roomCode)
    if (!authResult.valid || !authResult.session) {
      return unauthorizedResponse(authResult.error)
    }
    const session = authResult.session

    const updateData: Record<string, unknown> = {}

    if (body.status && ['WAITING', 'IN_PROGRESS', 'PAUSED', 'COMPLETED'].includes(body.status)) {
      updateData.status = body.status as QuizSessionStatus
      if (body.status === 'IN_PROGRESS' && !session.startedAt) {
        updateData.startedAt = new Date()
      }
      if (body.status === 'COMPLETED') {
        updateData.endedAt = new Date()
      }
    }

    if (body.teamAName !== undefined) updateData.teamAName = body.teamAName
    if (body.teamBName !== undefined) updateData.teamBName = body.teamBName

    const updated = await prisma.quiz_sessions.update({
      where: { roomCode: roomCode.toUpperCase() },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      data: {
        id: updated.id,
        roomCode: updated.roomCode,
        status: updated.status,
        teamAName: updated.teamAName,
        teamBName: updated.teamBName,
        teamAScore: updated.teamAScore,
        teamBScore: updated.teamBScore,
        startedAt: updated.startedAt,
        endedAt: updated.endedAt,
      },
    })
  } catch (error) {
    console.error('Error updating quiz session:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update quiz session' },
      { status: 500 }
    )
  }
}
