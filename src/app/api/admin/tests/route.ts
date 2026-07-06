import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CATEGORY_FILTER, mapTemplate } from './mapper'

// Admin test-template management. /admin/tests previously called this
// non-existent route and silently rendered fabricated mock templates —
// list/duplicate/delete all failed. Backed by test_templates (the same table
// the student-facing /api/tests serves).

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')?.trim()
    const category = searchParams.get('category')

    const where: Record<string, unknown> = {}
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }
    if (category && CATEGORY_FILTER[category]) {
      where.category = { in: CATEGORY_FILTER[category] }
    }

    const monthStart = new Date()
    monthStart.setDate(1)
    monthStart.setHours(0, 0, 0, 0)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    const [templates, totalTemplates, activeTests, attemptAgg, testsThisMonth, weekSessions] =
      await Promise.all([
        prisma.test_templates.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          take: 100,
          select: {
            id: true,
            title: true,
            description: true,
            category: true,
            difficulty: true,
            timeLimit: true,
            totalQuestions: true,
            totalMarks: true,
            isActive: true,
            isPublished: true,
            attemptCount: true,
            averageScore: true,
            createdAt: true,
            createdBy: true,
            _count: { select: { test_sessions: true } },
          },
        }),
        prisma.test_templates.count(),
        prisma.test_templates.count({ where: { isActive: true, isPublished: true } }),
        prisma.test_templates.aggregate({ _sum: { attemptCount: true } }),
        prisma.test_templates.count({ where: { createdAt: { gte: monthStart } } }),
        prisma.test_sessions.findMany({
          where: { createdAt: { gte: weekAgo }, userId: { not: null } },
          select: { userId: true },
          distinct: ['userId'],
          take: 1000,
        }),
      ])

    // Average of template averageScore across templates that have one — the
    // closest real metric available (pass-rate is not tracked per template).
    const scored = templates.filter((t) => t.averageScore != null)
    const avgPassRate = scored.length
      ? Math.round(scored.reduce((s, t) => s + (t.averageScore || 0), 0) / scored.length)
      : 0

    return NextResponse.json({
      tests: templates.map(mapTemplate),
      stats: {
        totalTemplates,
        activeTests,
        totalAttempts: attemptAgg._sum.attemptCount || 0,
        avgPassRate,
        testsThisMonth,
        studentsTestedThisWeek: weekSessions.length,
      },
    })
  } catch (error) {
    console.error('[admin/tests] GET failed:', error)
    return NextResponse.json({ error: 'Failed to load tests' }, { status: 500 })
  }
}
