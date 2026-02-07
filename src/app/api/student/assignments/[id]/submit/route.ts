/**
 * Student Assignment Submission API
 *
 * POST /api/student/assignments/[id]/submit - Submit assignment
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized. Student access required.' }, { status: 401 })
    }

    const assignmentId = params.id
    const studentId = session.user.id
    const body = await request.json()
    const { submittedFiles, submittedText } = body

    if (!submittedFiles || submittedFiles.length === 0) {
      return NextResponse.json({ error: 'At least one file must be submitted' }, { status: 400 })
    }

    const enrollments = await prisma.enrollments.findMany({
      where: {
        userId: studentId,
        status: 'ACTIVE',
      },
      select: {
        courseId: true,
      },
    })

    const enrolledCourseIds = enrollments.map((e) => e.courseId)

    const assignment = await prisma.assignments.findFirst({
      where: {
        id: assignmentId,
        status: 'PUBLISHED',
        OR: [{ courseId: { in: enrolledCourseIds } }, { courseId: null }],
      },
    })

    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found or not accessible' }, { status: 404 })
    }

    const now = new Date()
    const dueDate = new Date(assignment.dueDate)
    const isLate = now > dueDate

    if (isLate && !assignment.allowLateSubmission) {
      return NextResponse.json(
        { error: 'Assignment deadline has passed and late submissions are not allowed' },
        { status: 400 }
      )
    }

    const existingSubmission = await prisma.assignment_submissions.findUnique({
      where: {
        assignmentId_studentId: {
          assignmentId,
          studentId,
        },
      },
    })

    if (existingSubmission) {
      if (
        !assignment.allowResubmission ||
        (existingSubmission.status !== 'GRADED' &&
          existingSubmission.status !== 'RESUBMIT_REQUIRED')
      ) {
        return NextResponse.json(
          { error: 'Resubmission not allowed for this assignment' },
          { status: 400 }
        )
      }

      const updatedSubmission = await prisma.assignment_submissions.update({
        where: {
          id: existingSubmission.id,
        },
        data: {
          submittedFiles,
          submittedText,
          status: isLate ? 'LATE' : 'SUBMITTED',
          submittedAt: now,
          isLate,
          resubmissionCount: existingSubmission.resubmissionCount + 1,
          lastResubmittedAt: now,
          grade: null,
          feedback: null,
          gradedAt: null,
        },
        include: {
          assignment: {
            select: {
              id: true,
              title: true,
              maxMarks: true,
              dueDate: true,
            },
          },
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Assignment resubmitted successfully',
        submission: updatedSubmission,
      })
    }

    const submission = await prisma.assignment_submissions.create({
      data: {
        assignmentId,
        studentId,
        submittedFiles,
        submittedText,
        status: isLate ? 'LATE' : 'SUBMITTED',
        submittedAt: now,
        isLate,
      },
      include: {
        assignment: {
          select: {
            id: true,
            title: true,
            maxMarks: true,
            dueDate: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Assignment submitted successfully',
      submission,
    })
  } catch (error) {
    console.error('Failed to submit assignment:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit assignment',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
