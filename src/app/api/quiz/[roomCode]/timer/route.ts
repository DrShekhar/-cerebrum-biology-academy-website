import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyHostToken, unauthorizedResponse } from '@/lib/quiz/auth'
import { ipRateLimit, getRateLimitHeaders } from '@/lib/middleware/rateLimit'

export const dynamic = 'force-dynamic'

interface TimerAction {
  action: 'start' | 'stop' | 'reset'
  timerType: 'question' | 'answer'
}

interface SettingsUpdate {
  questionTimerSeconds?: number
  answerTimerSeconds?: number
}

interface DiscussionUpdate {
  teamDiscussing: 'TEAM_A' | 'TEAM_B' | null
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  try {
    const rateLimitResult = await ipRateLimit(request, {
      limit: 200,
      window: 15 * 60 * 1000,
      endpoint: 'quiz:timer',
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

    const authResult = await verifyHostToken(request, roomCode)
    if (!authResult.valid || !authResult.session) {
      return unauthorizedResponse(authResult.error)
    }

    const body: TimerAction | SettingsUpdate | DiscussionUpdate = await request.json()
    const session = authResult.session

    // Handle settings update
    if ('questionTimerSeconds' in body || 'answerTimerSeconds' in body) {
      const settings = body as SettingsUpdate
      const updateData: {
        questionTimerSeconds?: number
        answerTimerSeconds?: number
      } = {}

      if (settings.questionTimerSeconds !== undefined) {
        const seconds = Number(settings.questionTimerSeconds)
        if (isNaN(seconds) || seconds < 10 || seconds > 300) {
          return NextResponse.json(
            { success: false, error: 'Timer must be between 10 and 300 seconds' },
            { status: 400 }
          )
        }
        updateData.questionTimerSeconds = seconds
      }

      if (settings.answerTimerSeconds !== undefined) {
        const seconds = Number(settings.answerTimerSeconds)
        if (isNaN(seconds) || seconds < 10 || seconds > 300) {
          return NextResponse.json(
            { success: false, error: 'Timer must be between 10 and 300 seconds' },
            { status: 400 }
          )
        }
        updateData.answerTimerSeconds = seconds
      }

      const updated = await prisma.quiz_sessions.update({
        where: { id: session.id },
        data: updateData,
      })

      return NextResponse.json({
        success: true,
        data: {
          questionTimerSeconds: updated.questionTimerSeconds,
          answerTimerSeconds: updated.answerTimerSeconds,
        },
      })
    }

    // Handle discussion indicator
    if ('teamDiscussing' in body) {
      const { teamDiscussing } = body as DiscussionUpdate
      if (teamDiscussing !== null && !['TEAM_A', 'TEAM_B'].includes(teamDiscussing)) {
        return NextResponse.json(
          { success: false, error: 'Invalid team' },
          { status: 400 }
        )
      }

      const updated = await prisma.quiz_sessions.update({
        where: { id: session.id },
        data: { teamDiscussing },
      })

      return NextResponse.json({
        success: true,
        data: {
          teamDiscussing: updated.teamDiscussing,
        },
      })
    }

    // Handle timer action
    const { action, timerType } = body as TimerAction

    if (!action || !['start', 'stop', 'reset'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      )
    }

    if (!timerType || !['question', 'answer'].includes(timerType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid timer type' },
        { status: 400 }
      )
    }

    let updateData: {
      activeTimerType: string | null
      timerStartedAt: Date | null
      timerPausedAt: Date | null
    } = {
      activeTimerType: null,
      timerStartedAt: null,
      timerPausedAt: null,
    }

    switch (action) {
      case 'start':
        updateData = {
          activeTimerType: timerType,
          timerStartedAt: new Date(),
          timerPausedAt: null,
        }
        break
      case 'stop':
        updateData = {
          activeTimerType: null,
          timerStartedAt: null,
          timerPausedAt: null,
        }
        break
      case 'reset':
        updateData = {
          activeTimerType: timerType,
          timerStartedAt: new Date(),
          timerPausedAt: null,
        }
        break
    }

    const updated = await prisma.quiz_sessions.update({
      where: { id: session.id },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      data: {
        activeTimerType: updated.activeTimerType,
        timerStartedAt: updated.timerStartedAt,
        timerPausedAt: updated.timerPausedAt,
        questionTimerSeconds: updated.questionTimerSeconds,
        answerTimerSeconds: updated.answerTimerSeconds,
      },
    })
  } catch (error) {
    console.error('Error handling timer:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update timer' },
      { status: 500 }
    )
  }
}
