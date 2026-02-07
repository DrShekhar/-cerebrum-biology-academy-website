import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    const topUsers = await prisma.free_users.findMany({
      where: {
        totalPoints: {
          gt: 0,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        totalPoints: true,
        studyStreak: true,
        createdAt: true,
      },
      orderBy: [{ totalPoints: 'desc' }, { studyStreak: 'desc' }],
      take: limit,
    })

    const studyHours = await prisma.test_sessions.groupBy({
      by: ['userId'],
      _sum: {
        timeSpent: true,
      },
    })

    const studyHoursMap = new Map(
      studyHours.map((s) => [s.userId, Math.floor((s._sum.timeSpent || 0) / 3600)])
    )

    const testsCompleted = await prisma.test_sessions.groupBy({
      by: ['userId'],
      where: {
        status: 'COMPLETED',
      },
      _count: true,
    })

    const testsCompletedMap = new Map(testsCompleted.map((t) => [t.userId, t._count]))

    const leaderboard = topUsers.map((user, index) => {
      const badge =
        index === 0 ? 'crown' : index === 1 ? 'trophy' : index === 2 ? 'medal' : undefined

      return {
        rank: index + 1,
        name: user.name || 'Anonymous Student',
        points: user.totalPoints || 0,
        studyHours: studyHoursMap.get(user.id) || 0,
        testsCompleted: testsCompletedMap.get(user.id) || 0,
        avatar: '/avatars/default.jpg',
        badge,
      }
    })

    return NextResponse.json({ leaderboard })
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch leaderboard',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
