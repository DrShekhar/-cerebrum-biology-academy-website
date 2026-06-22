/**
 * GET /api/student/gradebook — consolidated grade view for the logged-in student.
 *
 * The LMS had per-test results but no transcript/aggregate across tests. This
 * aggregates the student's COMPLETED test_attempts into: overall stats, a
 * by-difficulty breakdown, a recent trend, and a full transcript. Read-only,
 * additive — reuses the existing test_attempts model (keyed by freeUserId, which
 * holds the user id for logged-in students). No schema change.
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(_request: NextRequest) {
  try {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const attempts = await prisma.test_attempts.findMany({
      where: { freeUserId: userId, status: 'COMPLETED' },
      include: {
        test_templates: { select: { title: true, type: true, category: true } },
      },
      orderBy: { startedAt: 'desc' },
      take: 200,
    })

    const completedCount = attempts.length

    if (completedCount === 0) {
      return NextResponse.json({
        success: true,
        data: {
          overall: {
            completedTests: 0,
            averagePercentage: 0,
            bestPercentage: 0,
            totalTimeSpentMinutes: 0,
          },
          byDifficulty: [],
          trend: [],
          transcript: [],
        },
      })
    }

    const pct = (a: (typeof attempts)[number]) =>
      a.percentage ?? (a.totalMarks > 0 ? (a.score / a.totalMarks) * 100 : 0)

    const averagePercentage =
      Math.round((attempts.reduce((s, a) => s + pct(a), 0) / completedCount) * 10) / 10
    const bestPercentage = Math.round(Math.max(...attempts.map(pct)) * 10) / 10
    const totalTimeSpentMinutes = Math.round(
      attempts.reduce((s, a) => s + (a.timeSpent || 0), 0) / 60
    )

    // By difficulty (reliable enum field).
    const diffMap: Record<string, { total: number; sum: number }> = {}
    for (const a of attempts) {
      const d = a.difficulty || 'MEDIUM'
      diffMap[d] = diffMap[d] || { total: 0, sum: 0 }
      diffMap[d].total += 1
      diffMap[d].sum += pct(a)
    }
    const byDifficulty = Object.entries(diffMap).map(([difficulty, v]) => ({
      difficulty,
      tests: v.total,
      averagePercentage: Math.round((v.sum / v.total) * 10) / 10,
    }))

    // Recent trend — last 10 attempts chronologically.
    const trend = [...attempts]
      .slice(0, 10)
      .reverse()
      .map((a) => ({
        date: (a.submittedAt || a.startedAt).toISOString(),
        percentage: Math.round(pct(a) * 10) / 10,
        title: a.test_templates?.title || a.title,
      }))

    const transcript = attempts.map((a) => ({
      id: a.id,
      title: a.test_templates?.title || a.title,
      category: a.test_templates?.category || a.test_templates?.type || null,
      score: a.score,
      totalMarks: a.totalMarks,
      percentage: Math.round(pct(a) * 10) / 10,
      difficulty: a.difficulty,
      questionCount: a.questionCount,
      timeSpentMinutes: Math.round((a.timeSpent || 0) / 60),
      date: (a.submittedAt || a.startedAt).toISOString(),
    }))

    return NextResponse.json({
      success: true,
      data: {
        overall: {
          completedTests: completedCount,
          averagePercentage,
          bestPercentage,
          totalTimeSpentMinutes,
        },
        byDifficulty,
        trend,
        transcript,
      },
    })
  } catch (error) {
    console.error('Gradebook error:', error)
    return NextResponse.json({ success: false, error: 'Failed to load gradebook' }, { status: 500 })
  }
}
