/**
 * Student Assignment Submission API
 *
 * POST /api/student/assignments/[id]/submit - Submit assignment
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { completeMaterialAndRecompute } from '@/lib/lms/enrollmentProgress'

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

    // A submission needs either at least one file OR some text — text-only
    // answers are valid (the schema supports submittedText), previously rejected.
    const hasFiles = Array.isArray(submittedFiles) && submittedFiles.length > 0
    const hasText = typeof submittedText === 'string' && submittedText.trim().length > 0
    if (!hasFiles && !hasText) {
      return NextResponse.json(
        { error: 'Please attach a file or enter your answer before submitting.' },
        { status: 400 }
      )
    }
    const normalizedFiles = hasFiles ? submittedFiles : []

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
          submittedFiles: normalizedFiles,
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
          assignments: {
            select: {
              id: true,
              title: true,
              maxMarks: true,
              dueDate: true,
            },
          },
        },
      })

      await markLinkedLessonComplete(assignmentId, studentId)

      return NextResponse.json({
        success: true,
        message: 'Assignment resubmitted successfully',
        submission: updatedSubmission,
      })
    }

    const submission = await prisma.assignment_submissions.create({
      data: {
        id: `as_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        assignmentId,
        studentId,
        submittedFiles: normalizedFiles,
        submittedText,
        status: isLate ? 'LATE' : 'SUBMITTED',
        submittedAt: now,
        isLate,
        updatedAt: new Date(),
      },
      include: {
        assignments: {
          select: {
            id: true,
            title: true,
            maxMarks: true,
            dueDate: true,
          },
        },
      },
    })

    await markLinkedLessonComplete(assignmentId, studentId)

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

/**
 * When an assignment is delivered as a course lesson (a study_materials row of
 * type ASSIGNMENT linked via assignmentId), submitting it should complete that
 * lesson so course progress advances — instead of relying on the student to
 * separately click "mark complete". No-op for standalone assignments with no
 * linked lesson.
 */
async function markLinkedLessonComplete(assignmentId: string, studentId: string): Promise<void> {
  const lesson = await prisma.study_materials.findFirst({
    where: { assignmentId },
    select: { id: true },
  })
  if (lesson) {
    await completeMaterialAndRecompute(studentId, lesson.id)
  }
}
