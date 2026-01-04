import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ipRateLimit, getRateLimitHeaders } from '@/lib/middleware/rateLimit'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const rateLimitResult = await ipRateLimit(request, {
      limit: 60,
      window: 15 * 60 * 1000,
      endpoint: 'quiz:history',
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please slow down.' },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
    const offset = parseInt(searchParams.get('offset') || '0')

    const sessions = await prisma.quiz_sessions.findMany({
      where: {
        status: 'COMPLETED',
      },
      orderBy: { endedAt: 'desc' },
      take: limit,
      skip: offset,
      include: {
        _count: {
          select: {
            rounds: true,
            participants: true,
          },
        },
      },
    })

    const total = await prisma.quiz_sessions.count({
      where: { status: 'COMPLETED' },
    })

    return NextResponse.json({
      success: true,
      data: {
        sessions: sessions.map((s) => {
          let winner: string | null = null
          if (s.teamAScore > s.teamBScore) {
            winner = s.teamAName
          } else if (s.teamBScore > s.teamAScore) {
            winner = s.teamBName
          }

          return {
            id: s.id,
            roomCode: s.roomCode,
            title: s.title,
            format: s.format,
            winner,
            teamAName: s.teamAName,
            teamBName: s.teamBName,
            teamAScore: s.teamAScore,
            teamBScore: s.teamBScore,
            totalRounds: s._count.rounds,
            participantCount: s._count.participants,
            duration:
              s.startedAt && s.endedAt
                ? Math.floor((s.endedAt.getTime() - s.startedAt.getTime()) / 1000)
                : 0,
            endedAt: s.endedAt,
          }
        }),
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching quiz history:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quiz history' },
      { status: 500 }
    )
  }
}
