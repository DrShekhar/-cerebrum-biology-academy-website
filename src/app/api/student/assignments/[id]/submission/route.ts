/**
 * Student Assignment Submission API
 *
 * GET /api/student/assignments/[id]/submission - Get student's submission
 * PATCH /api/student/assignments/[id]/submission - Update submission (before deadline)
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized. Student access required.' }, { status: 401 })
    }

    const assignmentId = params.id
    const studentId = session.user.id

    const submission = await prisma.assignment_submissions.findUnique({
      where: {
        assignmentId_studentId: {
          assignmentId,
          studentId,
        },
      },
      include: {
        assignment: {
          select: {
            id: true,
            title: true,
            maxMarks: true,
            dueDate: true,
            allowResubmission: true,
            allowLateSubmission: true,
          },
        },
      },
    })

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      submission,
    })
  } catch (error) {
    console.error('Failed to fetch submission:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch submission',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized. Student access required.' }, { status: 401 })
    }

    const assignmentId = params.id
    const studentId = session.user.id
    const body = await request.json()
    const { submittedFiles, submittedText } = body

    const submission = await prisma.assignment_submissions.findUnique({
      where: {
        assignmentId_studentId: {
          assignmentId,
          studentId,
        },
      },
      include: {
        assignment: true,
      },
    })

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    if (submission.status === 'GRADED') {
      return NextResponse.json({ error: 'Cannot update a graded submission' }, { status: 400 })
    }

    const now = new Date()
    const dueDate = new Date(submission.assignment.dueDate)
    const isLate = now > dueDate

    if (isLate && !submission.assignment.allowLateSubmission) {
      return NextResponse.json(
        { error: 'Cannot update submission after deadline' },
        { status: 400 }
      )
    }

    const updatedSubmission = await prisma.assignment_submissions.update({
      where: {
        id: submission.id,
      },
      data: {
        submittedFiles: submittedFiles || submission.submittedFiles,
        submittedText: submittedText !== undefined ? submittedText : submission.submittedText,
        status: isLate ? 'LATE' : 'SUBMITTED',
        isLate,
        submittedAt: now,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Submission updated successfully',
      submission: updatedSubmission,
    })
  } catch (error) {
    console.error('Failed to update submission:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update submission',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
