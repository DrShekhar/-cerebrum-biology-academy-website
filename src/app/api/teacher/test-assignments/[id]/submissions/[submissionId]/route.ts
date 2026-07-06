/**
 * Teacher Test Submission Feedback API
 *
 * PATCH /api/teacher/test-assignments/[id]/submissions/[submissionId]
 * Write teacherFeedback (and optionally adjust totalScore) on a test
 * submission — previously there was no write path for teacherFeedback.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; submissionId: string }> }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden. Teacher access required.' }, { status: 403 })
    }

    const { id, submissionId } = await params
    const body = await request.json().catch(() => null)
    if (!body || (body.teacherFeedback === undefined && body.totalScore === undefined)) {
      return NextResponse.json(
        { error: 'Provide teacherFeedback and/or totalScore' },
        { status: 400 }
      )
    }

    const { teacherFeedback, totalScore } = body as {
      teacherFeedback?: string | null
      totalScore?: number | null
    }

    const assignment = await prisma.test_assignments.findUnique({
      where: { id },
      select: { id: true, teacherId: true, totalMarks: true },
    })
    if (!assignment) {
      return NextResponse.json({ error: 'Test assignment not found' }, { status: 404 })
    }
    if (assignment.teacherId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized to grade this submission' }, { status: 403 })
    }

    const submission = await prisma.test_assignment_submissions.findFirst({
      where: { id: submissionId, testAssignmentId: id },
      select: { id: true, status: true },
    })
    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }
    if (submission.status !== 'SUBMITTED' && submission.status !== 'GRADED') {
      return NextResponse.json(
        { error: 'Cannot grade a submission that has not been submitted' },
        { status: 400 }
      )
    }

    if (totalScore !== undefined && totalScore !== null) {
      const numericScore = Number(totalScore)
      if (Number.isNaN(numericScore) || numericScore < 0 || numericScore > assignment.totalMarks) {
        return NextResponse.json(
          { error: `totalScore must be between 0 and ${assignment.totalMarks}` },
          { status: 400 }
        )
      }
    }

    const updated = await prisma.test_assignment_submissions.update({
      where: { id: submissionId },
      data: {
        ...(teacherFeedback !== undefined ? { teacherFeedback: teacherFeedback || null } : {}),
        ...(totalScore !== undefined && totalScore !== null
          ? { totalScore: Number(totalScore) }
          : {}),
        isGraded: true,
        gradedAt: new Date(),
        gradedBy: session.user.id,
        status: 'GRADED',
      },
      include: {
        test_assignments: { select: { id: true, title: true, totalMarks: true } },
        users: { select: { id: true, name: true, email: true } },
      },
    })

    const { users, test_assignments, ...submissionRest } = updated
    return NextResponse.json({
      success: true,
      message: 'Test submission feedback saved',
      submission: { ...submissionRest, student: users, testAssignment: test_assignments },
    })
  } catch (error) {
    console.error('Failed to save test submission feedback:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save test submission feedback',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
