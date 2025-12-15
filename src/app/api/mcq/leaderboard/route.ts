import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { LeaderboardPeriod } from '@/generated/prisma'
import type { Leaderboard, LeaderboardEntry } from '@/lib/mcq/types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const period = (searchParams.get('period') || 'WEEKLY') as LeaderboardPeriod
    const freeUserId = searchParams.get('freeUserId')
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)

    // Calculate period dates
    const now = new Date()
    let periodStart: Date
    let periodEnd: Date

    switch (period) {
      case 'DAILY':
        periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        periodEnd = new Date(periodStart)
        periodEnd.setDate(periodEnd.getDate() + 1)
        break
      case 'WEEKLY':
        const dayOfWeek = now.getDay()
        const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
        periodStart = new Date(now.getFullYear(), now.getMonth(), diff)
        periodStart.setHours(0, 0, 0, 0)
        periodEnd = new Date(periodStart)
        periodEnd.setDate(periodEnd.getDate() + 7)
        break
      case 'MONTHLY':
        periodStart = new Date(now.getFullYear(), now.getMonth(), 1)
        periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1)
        break
      case 'ALL_TIME':
      default:
        periodStart = new Date(2020, 0, 1)
        periodEnd = new Date(2100, 0, 1)
        break
    }

    // Check for cached leaderboard
    const cachedLeaderboard = await prisma.mcq_leaderboard.findFirst({
      where: {
        period,
        periodStart: {
          gte: new Date(periodStart.getTime() - 3600000), // 1 hour cache tolerance
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Use cached if less than 15 minutes old
    if (
      cachedLeaderboard &&
      new Date().getTime() - cachedLeaderboard.createdAt.getTime() < 900000
    ) {
      const rankings = cachedLeaderboard.rankings as LeaderboardEntry[]
      let currentUserRank: number | undefined

      if (freeUserId) {
        const userIndex = rankings.findIndex((r) => r.freeUserId === freeUserId)
        if (userIndex !== -1) {
          currentUserRank = userIndex + 1
          rankings[userIndex].isCurrentUser = true
        }
      }

      const response: Leaderboard = {
        period,
        periodStart: cachedLeaderboard.periodStart,
        periodEnd: cachedLeaderboard.periodEnd,
        entries: rankings.slice(0, limit),
        totalParticipants: cachedLeaderboard.totalParticipants,
        currentUserRank,
      }

      return NextResponse.json(response)
    }

    // Generate fresh leaderboard from user stats
    let userStatsQuery

    if (period === 'ALL_TIME') {
      // For all-time, use total XP
      userStatsQuery = await prisma.mcq_user_stats.findMany({
        where: {
          totalXp: { gt: 0 },
        },
        orderBy: {
          totalXp: 'desc',
        },
        take: 100,
      })
    } else {
      // For period-based, we need to aggregate from sessions
      const sessionStats = await prisma.mcq_practice_sessions.groupBy({
        by: ['freeUserId'],
        where: {
          startedAt: {
            gte: periodStart,
            lt: periodEnd,
          },
          freeUserId: { not: null },
        },
        _sum: {
          xpEarned: true,
          correctAnswers: true,
          questionsAttempted: true,
        },
        orderBy: {
          _sum: {
            xpEarned: 'desc',
          },
        },
        take: 100,
      })

      // Get user details for the top users
      const freeUserIds = sessionStats
        .map((s) => s.freeUserId)
        .filter((id): id is string => id !== null)

      const userDetails = await prisma.free_users.findMany({
        where: {
          id: { in: freeUserIds },
        },
        select: {
          id: true,
          name: true,
          phone: true,
        },
      })

      const userDetailsMap = new Map(userDetails.map((u) => [u.id, u]))

      const rankings: LeaderboardEntry[] = sessionStats.map((stat, index) => {
        const user = stat.freeUserId ? userDetailsMap.get(stat.freeUserId) : null
        const total = stat._sum.questionsAttempted || 0
        const correct = stat._sum.correctAnswers || 0

        return {
          rank: index + 1,
          freeUserId: stat.freeUserId || undefined,
          name: user?.name || `Aspirant_${(stat.freeUserId || '').slice(-4)}`,
          xp: stat._sum.xpEarned || 0,
          accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
          questionsAnswered: total,
          isCurrentUser: stat.freeUserId === freeUserId,
        }
      })

      // Cache the leaderboard
      await prisma.mcq_leaderboard.create({
        data: {
          period,
          periodStart,
          periodEnd,
          rankings: rankings as unknown as object,
          totalParticipants: rankings.length,
          topScore: rankings[0]?.xp || 0,
          avgScore:
            rankings.length > 0 ? rankings.reduce((a, b) => a + b.xp, 0) / rankings.length : 0,
        },
      })

      let currentUserRank: number | undefined
      if (freeUserId) {
        const userIndex = rankings.findIndex((r) => r.freeUserId === freeUserId)
        if (userIndex !== -1) {
          currentUserRank = userIndex + 1
        }
      }

      const response: Leaderboard = {
        period,
        periodStart,
        periodEnd,
        entries: rankings.slice(0, limit),
        totalParticipants: rankings.length,
        currentUserRank,
      }

      return NextResponse.json(response)
    }

    // For ALL_TIME using user stats
    const freeUserIds = userStatsQuery
      .map((s) => s.freeUserId)
      .filter((id): id is string => id !== null)

    const userDetails = await prisma.free_users.findMany({
      where: {
        id: { in: freeUserIds },
      },
      select: {
        id: true,
        name: true,
        phone: true,
      },
    })

    const userDetailsMap = new Map(userDetails.map((u) => [u.id, u]))

    const rankings: LeaderboardEntry[] = userStatsQuery.map((stat, index) => {
      const user = stat.freeUserId ? userDetailsMap.get(stat.freeUserId) : null

      return {
        rank: index + 1,
        freeUserId: stat.freeUserId || undefined,
        name: user?.name || `Aspirant_${(stat.freeUserId || '').slice(-4)}`,
        xp: stat.totalXp,
        accuracy: stat.accuracy,
        questionsAnswered: stat.totalQuestions,
        isCurrentUser: stat.freeUserId === freeUserId,
      }
    })

    // Cache the leaderboard
    await prisma.mcq_leaderboard.create({
      data: {
        period,
        periodStart,
        periodEnd,
        rankings: rankings as unknown as object,
        totalParticipants: rankings.length,
        topScore: rankings[0]?.xp || 0,
        avgScore:
          rankings.length > 0 ? rankings.reduce((a, b) => a + b.xp, 0) / rankings.length : 0,
      },
    })

    let currentUserRank: number | undefined
    if (freeUserId) {
      const userIndex = rankings.findIndex((r) => r.freeUserId === freeUserId)
      if (userIndex !== -1) {
        currentUserRank = userIndex + 1
      }
    }

    const response: Leaderboard = {
      period,
      periodStart,
      periodEnd,
      entries: rankings.slice(0, limit),
      totalParticipants: rankings.length,
      currentUserRank,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Leaderboard API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 })
  }
}
