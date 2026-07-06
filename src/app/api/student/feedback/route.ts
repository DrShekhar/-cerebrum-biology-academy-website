/**
 * Unified Student Feedback API
 *
 * GET /api/student/feedback - Teacher feedback across all graded work:
 * assignments (assignment_submissions.feedback/grade), worksheets
 * (worksheet_submissions.feedback/grade) and tests
 * (test_assignment_submissions.teacherFeedback/totalScore), merged into one
 * list sorted by gradedAt (newest first).
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

interface FeedbackItem {
  id: string
  source: 'assignment' | 'worksheet' | 'test'
  title: string
  feedback: string | null
  grade: number | null
  maxMarks: number | null
  at: Date | null
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 })
    }

    const userId = session.user.id
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200)

    const [assignmentSubs, worksheetSubs, testSubs] = await Promise.all([
      prisma.assignment_submissions.findMany({
        where: {
          studentId: userId,
          OR: [{ feedback: { not: null } }, { gradedAt: { not: null } }],
        },
        select: {
          id: true,
          grade: true,
          feedback: true,
          gradedAt: true,
          submittedAt: true,
          assignments: { select: { title: true, maxMarks: true } },
        },
        orderBy: { gradedAt: 'desc' },
        take: limit,
      }),
      prisma.worksheet_submissions
        .findMany({
          where: {
            studentId: userId,
            OR: [{ feedback: { not: null } }, { gradedAt: { not: null } }],
          },
          select: {
            id: true,
            grade: true,
            feedback: true,
            gradedAt: true,
            submittedAt: true,
            worksheets: { select: { title: true, maxMarks: true } },
          },
          orderBy: { gradedAt: 'desc' },
          take: limit,
        })
        // Worksheets tables may not be provisioned yet in this environment
        .catch(() => []),
      prisma.test_assignment_submissions.findMany({
        where: {
          studentId: userId,
          OR: [{ teacherFeedback: { not: null } }, { isGraded: true }],
        },
        select: {
          id: true,
          totalScore: true,
          teacherFeedback: true,
          gradedAt: true,
          submittedAt: true,
          test_assignments: { select: { title: true, totalMarks: true } },
        },
        orderBy: { gradedAt: 'desc' },
        take: limit,
      }),
    ])

    const items: FeedbackItem[] = [
      ...assignmentSubs.map(
        (s): FeedbackItem => ({
          id: s.id,
          source: 'assignment',
          title: s.assignments.title,
          feedback: s.feedback,
          grade: s.grade,
          maxMarks: s.assignments.maxMarks,
          at: s.gradedAt ?? s.submittedAt,
        })
      ),
      ...worksheetSubs.map(
        (s): FeedbackItem => ({
          id: s.id,
          source: 'worksheet',
          title: s.worksheets.title,
          feedback: s.feedback,
          grade: s.grade,
          maxMarks: s.worksheets.maxMarks,
          at: s.gradedAt ?? s.submittedAt,
        })
      ),
      ...testSubs.map(
        (s): FeedbackItem => ({
          id: s.id,
          source: 'test',
          title: s.test_assignments.title,
          feedback: s.teacherFeedback,
          grade: s.totalScore,
          maxMarks: s.test_assignments.totalMarks,
          at: s.gradedAt ?? s.submittedAt,
        })
      ),
    ]
      .sort((a, b) => (b.at?.getTime() ?? 0) - (a.at?.getTime() ?? 0))
      .slice(0, limit)

    return NextResponse.json({
      success: true,
      feedback: items,
      counts: {
        assignments: assignmentSubs.length,
        worksheets: worksheetSubs.length,
        tests: testSubs.length,
        total: items.length,
      },
    })
  } catch (error) {
    console.error('Failed to fetch student feedback:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch feedback',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
