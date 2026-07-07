import { NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/**
 * GET /api/admin/tests/analytics — real aggregates over test_templates and
 * test_sessions (replaces the coming-soon stub page's empty tiles).
 */
export async function GET() {
  try {
    await requireAdminAuth()

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    const [
      totalTemplates,
      publishedTemplates,
      totalSessions,
      submittedSessions,
      recentSessions,
      topTemplates,
    ] = await Promise.all([
      prisma.test_templates.count(),
      prisma.test_templates.count({ where: { isActive: true, isPublished: true } }),
      prisma.test_sessions.count(),
      prisma.test_sessions.count({ where: { submittedAt: { not: null } } }),
      prisma.test_sessions.count({ where: { startedAt: { gte: thirtyDaysAgo } } }),
      prisma.test_templates.findMany({
        orderBy: { attemptCount: 'desc' },
        take: 10,
        select: {
          id: true,
          title: true,
          category: true,
          difficulty: true,
          attemptCount: true,
          averageScore: true,
          totalQuestions: true,
          _count: { select: { test_sessions: true } },
        },
      }),
    ])

    const avgScoreAgg = await prisma.test_templates.aggregate({
      _avg: { averageScore: true },
      where: { attemptCount: { gt: 0 } },
    })

    return NextResponse.json({
      success: true,
      data: {
        totals: {
          templates: totalTemplates,
          published: publishedTemplates,
          sessions: totalSessions,
          submitted: submittedSessions,
          completionRate:
            totalSessions > 0 ? Math.round((submittedSessions / totalSessions) * 100) : 0,
          sessionsLast30Days: recentSessions,
          averageScore: avgScoreAgg._avg.averageScore
            ? Math.round(avgScoreAgg._avg.averageScore * 10) / 10
            : null,
        },
        topTemplates,
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/tests/analytics] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load analytics' }, { status: 500 })
  }
}
