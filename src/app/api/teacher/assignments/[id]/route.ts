/**
 * Teacher Assignment Detail API
 *
 * GET /api/teacher/assignments/[id] - Get assignment with all submissions
 * PATCH /api/teacher/assignments/[id] - Update assignment
 * DELETE /api/teacher/assignments/[id] - Delete assignment
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'teacher') {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const assignmentId = params.id
    const teacherId = session.user.id

    const assignment = await prisma.assignment.findFirst({
      where: {
        id: assignmentId,
        teacherId,
      },
      include: {
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
          include: {
            student: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
          orderBy: {
            submittedAt: 'desc',
          },
        },
      },
    })

    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 })
    }

    const submissionStats = {
      total: assignment.submissions.length,
      submitted: assignment.submissions.filter(
        (s) => s.status === 'SUBMITTED' || s.status === 'LATE' || s.status === 'GRADED'
      ).length,
      graded: assignment.submissions.filter((s) => s.status === 'GRADED').length,
      pending: assignment.submissions.filter((s) => s.status === 'NOT_SUBMITTED').length,
      late: assignment.submissions.filter((s) => s.isLate).length,
    }

    const gradedSubmissions = assignment.submissions.filter(
      (s) => s.status === 'GRADED' && s.grade !== null
    )
    const averageGrade =
      gradedSubmissions.length > 0
        ? gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0) / gradedSubmissions.length
        : null

    return NextResponse.json({
      success: true,
      assignment: {
        ...assignment,
        submissionStats,
        averageGrade,
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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'teacher') {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const assignmentId = params.id
    const teacherId = session.user.id
    const body = await request.json()

    const assignment = await prisma.assignment.findFirst({
      where: {
        id: assignmentId,
        teacherId,
      },
    })

    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 })
    }

    if (assignment.status === 'PUBLISHED' && body.status === 'DRAFT') {
      return NextResponse.json(
        { error: 'Cannot unpublish an assignment. You can only close it.' },
        { status: 400 }
      )
    }

    const updateData: any = {}

    if (body.title !== undefined) updateData.title = body.title
    if (body.description !== undefined) updateData.description = body.description
    if (body.instructions !== undefined) updateData.instructions = body.instructions
    if (body.maxMarks !== undefined) updateData.maxMarks = parseInt(body.maxMarks)
    if (body.dueDate !== undefined) updateData.dueDate = new Date(body.dueDate)
    if (body.allowLateSubmission !== undefined)
      updateData.allowLateSubmission = body.allowLateSubmission
    if (body.allowResubmission !== undefined) updateData.allowResubmission = body.allowResubmission
    if (body.latePenaltyPercentage !== undefined)
      updateData.latePenaltyPercentage = body.latePenaltyPercentage
    if (body.status !== undefined) {
      updateData.status = body.status
      if (body.status === 'PUBLISHED' && !assignment.publishedAt) {
        updateData.publishedAt = new Date()
      }
    }
    if (body.attachments !== undefined) updateData.attachments = body.attachments
    if (body.courseId !== undefined) updateData.courseId = body.courseId || null
    if (body.chapterId !== undefined) updateData.chapterId = body.chapterId || null
    if (body.topicId !== undefined) updateData.topicId = body.topicId || null

    const updatedAssignment = await prisma.assignment.update({
      where: {
        id: assignmentId,
      },
      data: updateData,
      include: {
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
      },
    })

    if (
      body.status === 'PUBLISHED' &&
      assignment.status === 'DRAFT' &&
      updatedAssignment.courseId
    ) {
      const enrolledStudents = await prisma.enrollment.findMany({
        where: {
          courseId: updatedAssignment.courseId,
          status: 'ACTIVE',
        },
        select: {
          userId: true,
        },
      })

      await Promise.all(
        enrolledStudents.map((enrollment) =>
          prisma.assignmentSubmission.upsert({
            where: {
              assignmentId_studentId: {
                assignmentId: updatedAssignment.id,
                studentId: enrollment.userId,
              },
            },
            create: {
              assignmentId: updatedAssignment.id,
              studentId: enrollment.userId,
              submittedFiles: [],
              status: 'NOT_SUBMITTED',
            },
            update: {},
          })
        )
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Assignment updated successfully',
      assignment: updatedAssignment,
    })
  } catch (error) {
    console.error('Failed to update assignment:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update assignment',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'teacher') {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const assignmentId = params.id
    const teacherId = session.user.id

    const assignment = await prisma.assignment.findFirst({
      where: {
        id: assignmentId,
        teacherId,
      },
      include: {
        submissions: {
          where: {
            status: {
              in: ['SUBMITTED', 'LATE', 'GRADED'],
            },
          },
        },
      },
    })

    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 })
    }

    if (assignment.submissions.length > 0) {
      return NextResponse.json(
        {
          error:
            'Cannot delete assignment with submissions. Please close it instead or contact admin.',
        },
        { status: 400 }
      )
    }

    await prisma.assignment.delete({
      where: {
        id: assignmentId,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Assignment deleted successfully',
    })
  } catch (error) {
    console.error('Failed to delete assignment:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete assignment',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
