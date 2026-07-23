/**
 * GET /api/student/gradebook — consolidated grade view for the logged-in student.
 *
 * Unions BOTH assessment stores into one transcript:
 * - test_attempts (public /test flow; keyed by freeUserId which holds the user
 *   id for logged-in students)
 * - test_assignment_submissions (teacher-assigned tests) — previously absent,
 *   so a student's assigned-test results never appeared in their gradebook.
 * Assigned-test scores respect the assignment's result-release mode
 * (IMMEDIATELY / AFTER_DEADLINE / manual GRADED release).
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface TranscriptRow {
  id: string
  title: string
  category: string | null
  score: number
  totalMarks: number
  percentage: number
  difficulty: string | null
  questionCount: number | null
  timeSpentSeconds: number
  date: Date
  source: 'PRACTICE_TEST' | 'ASSIGNED_TEST'
}

export async function GET(_request: NextRequest) {
  try {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const [attempts, assignedSubmissions] = await Promise.all([
      prisma.test_attempts.findMany({
        where: { freeUserId: userId, status: 'COMPLETED' },
        include: {
          test_templates: { select: { title: true, type: true, category: true } },
        },
        orderBy: { startedAt: 'desc' },
        take: 200,
      }),
      prisma.test_assignment_submissions.findMany({
        where: { studentId: userId, status: { in: ['SUBMITTED', 'GRADED'] } },
        include: {
          test_assignments: {
            select: {
              title: true,
              difficulty: true,
              totalQuestions: true,
              totalMarks: true,
              showResults: true,
              dueDate: true,
            },
          },
        },
        orderBy: { submittedAt: 'desc' },
        take: 200,
      }),
    ])

    const attemptPct = (a: (typeof attempts)[number]) =>
      a.percentage ?? (a.totalMarks > 0 ? (a.score / a.totalMarks) * 100 : 0)

    const now = new Date()
    const rows: TranscriptRow[] = [
      ...attempts.map(
        (a): TranscriptRow => ({
          id: a.id,
          title: a.test_templates?.title || a.title,
          category: a.test_templates?.category || a.test_templates?.type || null,
          score: a.score,
          totalMarks: a.totalMarks,
          percentage: attemptPct(a),
          difficulty: a.difficulty,
          questionCount: a.questionCount,
          timeSpentSeconds: a.timeSpent || 0,
          date: a.submittedAt || a.startedAt,
          source: 'PRACTICE_TEST',
        })
      ),
      ...assignedSubmissions
        .filter((s) => {
          // Only surface scores the student is allowed to see — mirrors the
          // release gating in /api/student/tests/[id].
          if (s.status === 'GRADED') return true
          const mode = (s.test_assignments.showResults || '').toUpperCase()
          if (mode === 'IMMEDIATELY') return true
          if (mode === 'AFTER_DEADLINE') return new Date(s.test_assignments.dueDate) <= now
          return false
        })
        .map(
          (s): TranscriptRow => ({
            id: s.id,
            title: s.test_assignments.title,
            category: 'Assigned Test',
            score: Number(s.totalScore || 0),
            totalMarks: s.test_assignments.totalMarks,
            percentage:
              s.percentage != null
                ? Number(s.percentage)
                : s.test_assignments.totalMarks > 0
                  ? (Number(s.totalScore || 0) / s.test_assignments.totalMarks) * 100
                  : 0,
            difficulty: s.test_assignments.difficulty,
            questionCount: s.test_assignments.totalQuestions,
            timeSpentSeconds: s.timeSpent || 0,
            date: s.submittedAt || s.startedAt || now,
            source: 'ASSIGNED_TEST',
          })
        ),
    ].sort((a, b) => b.date.getTime() - a.date.getTime())

    const completedCount = rows.length

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

    const averagePercentage =
      Math.round((rows.reduce((s, r) => s + r.percentage, 0) / completedCount) * 10) / 10
    const bestPercentage = Math.round(Math.max(...rows.map((r) => r.percentage)) * 10) / 10
    const totalTimeSpentMinutes = Math.round(rows.reduce((s, r) => s + r.timeSpentSeconds, 0) / 60)

    // By difficulty (reliable enum field).
    const diffMap: Record<string, { total: number; sum: number }> = {}
    for (const r of rows) {
      const d = r.difficulty || 'MEDIUM'
      diffMap[d] = diffMap[d] || { total: 0, sum: 0 }
      diffMap[d].total += 1
      diffMap[d].sum += r.percentage
    }
    const byDifficulty = Object.entries(diffMap).map(([difficulty, v]) => ({
      difficulty,
      tests: v.total,
      averagePercentage: Math.round((v.sum / v.total) * 10) / 10,
    }))

    // Recent trend — last 10 results chronologically.
    const trend = rows
      .slice(0, 10)
      .reverse()
      .map((r) => ({
        date: r.date.toISOString(),
        percentage: Math.round(r.percentage * 10) / 10,
        title: r.title,
      }))

    const transcript = rows.map((r) => ({
      id: r.id,
      title: r.title,
      category: r.category,
      score: r.score,
      totalMarks: r.totalMarks,
      percentage: Math.round(r.percentage * 10) / 10,
      difficulty: r.difficulty,
      questionCount: r.questionCount,
      timeSpentMinutes: Math.round(r.timeSpentSeconds / 60),
      date: r.date.toISOString(),
      source: r.source,
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
