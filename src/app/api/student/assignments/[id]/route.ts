/**
 * Student Assignment Detail API
 *
 * GET /api/student/assignments/[id] - Get specific assignment details
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
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            name: true,
          },
        },
        chapter: {
          select: {
            id: true,
            title: true,
          },
        },
        topic: {
          select: {
            id: true,
            title: true,
          },
        },
        submissions: {
          where: {
            studentId,
          },
        },
      },
    })

    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found or not accessible' }, { status: 404 })
    }

    const isOverdue = new Date(assignment.dueDate) < new Date()
    const canSubmit =
      assignment.submissions.length === 0 ||
      (assignment.allowResubmission &&
        (assignment.submissions[0].status === 'GRADED' ||
          assignment.submissions[0].status === 'RESUBMIT_REQUIRED'))

    return NextResponse.json({
      success: true,
      assignment: {
        id: assignment.id,
        title: assignment.title,
        description: assignment.description,
        instructions: assignment.instructions,
        maxMarks: assignment.maxMarks,
        dueDate: assignment.dueDate,
        allowLateSubmission: assignment.allowLateSubmission,
        allowResubmission: assignment.allowResubmission,
        latePenaltyPercentage: assignment.latePenaltyPercentage,
        status: assignment.status,
        attachments: assignment.attachments,
        createdAt: assignment.createdAt,
        updatedAt: assignment.updatedAt,
        publishedAt: assignment.publishedAt,
        teacher: assignment.teacher,
        course: assignment.course,
        chapter: assignment.chapter,
        topic: assignment.topic,
        submission: assignment.submissions[0] || null,
        isOverdue,
        canSubmit: !isOverdue || assignment.allowLateSubmission ? canSubmit : false,
      },
    })
  } catch (error) {
    console.error('Failed to fetch assignment:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch assignment',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
