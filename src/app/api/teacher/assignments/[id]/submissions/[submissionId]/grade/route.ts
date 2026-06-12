/**
 * Teacher Assignment Grading API
 *
 * POST /api/teacher/assignments/[id]/submissions/[submissionId]/grade - Grade submission
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; submissionId: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const assignmentId = params.id
    const submissionId = params.submissionId
    const teacherId = session.user.id
    const body = await request.json()

    const { grade, feedback, requireResubmission } = body

    if (grade === undefined || grade === null) {
      return NextResponse.json({ error: 'Grade is required' }, { status: 400 })
    }

    const assignment = await prisma.assignments.findFirst({
      where: {
        id: assignmentId,
        teacherId,
      },
    })

    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 })
    }

    if (parseInt(grade) < 0 || parseInt(grade) > assignment.maxMarks) {
      return NextResponse.json(
        { error: `Grade must be between 0 and ${assignment.maxMarks}` },
        { status: 400 }
      )
    }

    const submission = await prisma.assignment_submissions.findFirst({
      where: {
        id: submissionId,
        assignmentId,
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    if (submission.status === 'NOT_SUBMITTED') {
      return NextResponse.json(
        { error: 'Cannot grade a submission that has not been submitted' },
        { status: 400 }
      )
    }

    const updatedSubmission = await prisma.assignment_submissions.update({
      where: {
        id: submissionId,
      },
      data: {
        grade: parseInt(grade),
        feedback: feedback || null,
        status: requireResubmission ? 'RESUBMIT_REQUIRED' : 'GRADED',
        gradedAt: new Date(),
      },
      include: {
        assignments: {
          select: {
            id: true,
            title: true,
            maxMarks: true,
          },
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    // Preserve the original response shape (student/assignment keys) after the
    // relation accessors were renamed to the real schema names (users/assignments).
    const { users, assignments, ...submissionRest } = updatedSubmission
    return NextResponse.json({
      success: true,
      message: 'Submission graded successfully',
      submission: { ...submissionRest, student: users, assignment: assignments },
    })
  } catch (error) {
    console.error('Failed to grade submission:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to grade submission',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
