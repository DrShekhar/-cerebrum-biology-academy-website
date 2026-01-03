import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const CLEANUP_SECRET = process.env.QUIZ_CLEANUP_SECRET || 'default-cleanup-secret'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${CLEANUP_SECRET}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const now = new Date()
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)

    const abandonedWaitingSessions = await prisma.quiz_sessions.deleteMany({
      where: {
        status: 'WAITING',
        createdAt: {
          lt: twentyFourHoursAgo,
        },
      },
    })

    const staleInProgressSessions = await prisma.quiz_sessions.updateMany({
      where: {
        status: 'IN_PROGRESS',
        updatedAt: {
          lt: oneHourAgo,
        },
      },
      data: {
        status: 'COMPLETED',
      },
    })

    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const oldCompletedSessions = await prisma.quiz_sessions.deleteMany({
      where: {
        status: 'COMPLETED',
        createdAt: {
          lt: thirtyDaysAgo,
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        cleanedAt: now.toISOString(),
        abandonedWaitingSessions: abandonedWaitingSessions.count,
        staleInProgressSessions: staleInProgressSessions.count,
        oldCompletedSessions: oldCompletedSessions.count,
        totalCleaned:
          abandonedWaitingSessions.count +
          staleInProgressSessions.count +
          oldCompletedSessions.count,
      },
    })
  } catch (error) {
    console.error('Error cleaning up quiz sessions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to clean up sessions' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${CLEANUP_SECRET}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const now = new Date()
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const [waitingStats, inProgressStats, completedStats, totalActive] =
      await Promise.all([
        prisma.quiz_sessions.count({
          where: {
            status: 'WAITING',
            createdAt: { lt: twentyFourHoursAgo },
          },
        }),
        prisma.quiz_sessions.count({
          where: {
            status: 'IN_PROGRESS',
            updatedAt: { lt: oneHourAgo },
          },
        }),
        prisma.quiz_sessions.count({
          where: {
            status: 'COMPLETED',
            createdAt: { lt: thirtyDaysAgo },
          },
        }),
        prisma.quiz_sessions.count({
          where: {
            status: { in: ['WAITING', 'IN_PROGRESS'] },
          },
        }),
      ])

    return NextResponse.json({
      success: true,
      data: {
        checkedAt: now.toISOString(),
        sessionsToClean: {
          abandonedWaiting: waitingStats,
          staleInProgress: inProgressStats,
          oldCompleted: completedStats,
          total: waitingStats + inProgressStats + completedStats,
        },
        activeSessions: totalActive,
      },
    })
  } catch (error) {
    console.error('Error checking cleanup stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to check cleanup stats' },
      { status: 500 }
    )
  }
}
