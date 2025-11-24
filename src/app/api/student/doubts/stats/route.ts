import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 })
    }

    const userId = session.user.id

    const [
      totalDoubts,
      openDoubts,
      inProgressDoubts,
      answeredDoubts,
      resolvedDoubts,
      closedDoubts,
      unreadMessagesCount,
      avgResponseTime,
      recentDoubts,
      categoryStats,
    ] = await Promise.all([
      prisma.doubtTickets.count({
        where: { studentId: userId },
      }),
      prisma.doubtTickets.count({
        where: { studentId: userId, status: 'OPEN' },
      }),
      prisma.doubtTickets.count({
        where: { studentId: userId, status: 'IN_PROGRESS' },
      }),
      prisma.doubtTickets.count({
        where: { studentId: userId, status: 'ANSWERED' },
      }),
      prisma.doubtTickets.count({
        where: { studentId: userId, status: 'RESOLVED' },
      }),
      prisma.doubtTickets.count({
        where: { studentId: userId, status: 'CLOSED' },
      }),
      prisma.doubtMessages.count({
        where: {
          doubt: {
            studentId: userId,
          },
          senderId: {
            not: userId,
          },
          isRead: false,
        },
      }),
      prisma.doubtTickets.aggregate({
        where: {
          studentId: userId,
          responseTime: {
            not: null,
          },
        },
        _avg: {
          responseTime: true,
        },
      }),
      prisma.doubtTickets.findMany({
        where: { studentId: userId },
        select: {
          id: true,
          subject: true,
          status: true,
          priority: true,
          createdAt: true,
          lastMessageAt: true,
          category: {
            select: {
              name: true,
              icon: true,
              color: true,
            },
          },
        },
        orderBy: {
          lastMessageAt: 'desc',
        },
        take: 5,
      }),
      prisma.doubtTickets.groupBy({
        by: ['categoryId'],
        where: {
          studentId: userId,
          categoryId: {
            not: null,
          },
        },
        _count: {
          id: true,
        },
      }),
    ])

    const categoryDetails = await prisma.doubtCategories.findMany({
      where: {
        id: {
          in: categoryStats.map((cs) => cs.categoryId).filter(Boolean) as string[],
        },
      },
      select: {
        id: true,
        name: true,
        icon: true,
        color: true,
      },
    })

    const categoriesWithStats = categoryStats.map((stat) => {
      const category = categoryDetails.find((c) => c.id === stat.categoryId)
      return {
        category: category || { id: stat.categoryId, name: 'Unknown', icon: null, color: null },
        count: stat._count.id,
      }
    })

    const activeDoubts = openDoubts + inProgressDoubts + answeredDoubts

    return NextResponse.json({
      success: true,
      stats: {
        total: totalDoubts,
        open: openDoubts,
        inProgress: inProgressDoubts,
        answered: answeredDoubts,
        resolved: resolvedDoubts,
        closed: closedDoubts,
        active: activeDoubts,
        pending: openDoubts + inProgressDoubts,
        unreadMessages: unreadMessagesCount,
        avgResponseTime: avgResponseTime._avg.responseTime
          ? Math.round(avgResponseTime._avg.responseTime)
          : null,
        resolutionRate: totalDoubts > 0 ? Math.round((resolvedDoubts / totalDoubts) * 100) : 0,
      },
      recentDoubts: recentDoubts.map((doubt) => ({
        id: doubt.id,
        subject: doubt.subject,
        status: doubt.status,
        priority: doubt.priority,
        category: doubt.category,
        createdAt: doubt.createdAt,
        lastMessageAt: doubt.lastMessageAt,
      })),
      categoryStats: categoriesWithStats.sort((a, b) => b.count - a.count),
    })
  } catch (error) {
    console.error('Failed to fetch doubt stats:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch doubt statistics',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
