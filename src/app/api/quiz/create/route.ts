import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { QuizFormat, QuizQuestionMode } from '@/generated/prisma'
import { randomBytes } from 'crypto'
import { ipRateLimit, getRateLimitHeaders } from '@/lib/middleware/rateLimit'

export const dynamic = 'force-dynamic'

function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = randomBytes(6)
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(bytes[i] % chars.length)
  }
  return code
}

interface CreateQuizRequest {
  title: string
  format: 'MODERATOR' | 'TEAMS_ASK_EACH_OTHER'
  questionMode: 'SIMPLE_SCOREBOARD' | 'PRELOADED'
  teamAName?: string
  teamBName?: string
  scoringRules?: {
    correct: number
    wrong: number
    pass: number
    partial?: Record<string, number>
  }
  totalRounds?: number
}

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await ipRateLimit(request, {
      limit: 10,
      window: 15 * 60 * 1000,
      endpoint: 'quiz:create',
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many quiz creations. Please wait before creating another.' },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    const body: CreateQuizRequest = await request.json()

    if (!body.title || body.title.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Quiz title is required' },
        { status: 400 }
      )
    }

    if (!body.format || !['MODERATOR', 'TEAMS_ASK_EACH_OTHER'].includes(body.format)) {
      return NextResponse.json(
        { success: false, error: 'Valid quiz format is required' },
        { status: 400 }
      )
    }

    if (!body.questionMode || !['SIMPLE_SCOREBOARD', 'PRELOADED'].includes(body.questionMode)) {
      return NextResponse.json(
        { success: false, error: 'Valid question mode is required' },
        { status: 400 }
      )
    }

    let roomCode = generateRoomCode()
    let attempts = 0
    const maxAttempts = 10

    while (attempts < maxAttempts) {
      const existing = await prisma.quiz_sessions.findUnique({
        where: { roomCode },
      })
      if (!existing) break
      roomCode = generateRoomCode()
      attempts++
    }

    if (attempts >= maxAttempts) {
      return NextResponse.json(
        { success: false, error: 'Failed to generate unique room code' },
        { status: 500 }
      )
    }

    const scoringRules = body.scoringRules || {
      correct: 20,
      wrong: -10,
      pass: -10,
    }

    const session = await prisma.quiz_sessions.create({
      data: {
        roomCode,
        title: body.title.trim(),
        format: body.format as QuizFormat,
        questionMode: body.questionMode as QuizQuestionMode,
        createdById: 'host',
        teamAName: body.teamAName?.trim() || 'Team A',
        teamBName: body.teamBName?.trim() || 'Team B',
        scoringRules: scoringRules,
        totalRounds: body.totalRounds || null,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        sessionId: session.id,
        roomCode: session.roomCode,
        title: session.title,
        format: session.format,
        questionMode: session.questionMode,
        teamAName: session.teamAName,
        teamBName: session.teamBName,
        hostUrl: `/neet-tools/quiz-competition/${session.roomCode}/host`,
        joinUrl: `/neet-tools/quiz-competition/${session.roomCode}/join`,
        viewUrl: `/neet-tools/quiz-competition/${session.roomCode}/view`,
      },
    })
  } catch (error) {
    console.error('Error creating quiz session:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create quiz session',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
