/**
 * Teacher Assignments API
 *
 * GET /api/teacher/assignments - Get all assignments created by teacher
 * POST /api/teacher/assignments - Create new assignment
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const courseId = searchParams.get('courseId')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const teacherId = session.user.id

    const where: any = {
      teacherId,
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (courseId) {
      where.courseId = courseId
    }

    if (status) {
      where.status = status
    }

    const [assignments, total] = await Promise.all([
      prisma.assignments.findMany({
        where,
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
            select: {
              id: true,
              status: true,
              submittedAt: true,
              isLate: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.assignments.count({ where }),
    ])

    const stats = await prisma.assignments.groupBy({
      by: ['status'],
      where: { teacherId },
      _count: true,
    })

    const statsMap = {
      totalAssignments: total,
      draftAssignments: stats.find((s) => s.status === 'DRAFT')?._count || 0,
      publishedAssignments: stats.find((s) => s.status === 'PUBLISHED')?._count || 0,
      closedAssignments: stats.find((s) => s.status === 'CLOSED')?._count || 0,
      upcomingDeadlines: assignments.filter(
        (a) => a.status === 'PUBLISHED' && new Date(a.dueDate) > new Date()
      ).length,
    }

    return NextResponse.json({
      success: true,
      assignments: assignments.map((a) => {
        const totalSubmissions = a.submissions.length
        const submittedCount = a.submissions.filter(
          (s) => s.status === 'SUBMITTED' || s.status === 'LATE' || s.status === 'GRADED'
        ).length
        const gradedCount = a.submissions.filter((s) => s.status === 'GRADED').length
        const lateCount = a.submissions.filter((s) => s.isLate).length

        return {
          id: a.id,
          title: a.title,
          description: a.description,
          instructions: a.instructions,
          maxMarks: a.maxMarks,
          dueDate: a.dueDate,
          allowLateSubmission: a.allowLateSubmission,
          allowResubmission: a.allowResubmission,
          latePenaltyPercentage: a.latePenaltyPercentage,
          status: a.status,
          attachments: a.attachments,
          createdAt: a.createdAt,
          updatedAt: a.updatedAt,
          publishedAt: a.publishedAt,
          course: a.course,
          chapter: a.chapter,
          topic: a.topic,
          submissionStats: {
            total: totalSubmissions,
            submitted: submittedCount,
            graded: gradedCount,
            pending: totalSubmissions - submittedCount,
            late: lateCount,
          },
        }
      }),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: statsMap,
    })
  } catch (error) {
    console.error('Failed to fetch teacher assignments:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch assignments',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const teacherId = session.user.id
    const body = await request.json()

    const {
      courseId,
      chapterId,
      topicId,
      title,
      description,
      instructions,
      maxMarks,
      dueDate,
      allowLateSubmission,
      allowResubmission,
      latePenaltyPercentage,
      status,
      attachments,
    } = body

    if (!title || !description || !maxMarks || !dueDate) {
      return NextResponse.json(
        { error: 'Title, description, max marks, and due date are required' },
        { status: 400 }
      )
    }

    const assignment = await prisma.assignments.create({
      data: {
        teacherId,
        courseId: courseId || null,
        chapterId: chapterId || null,
        topicId: topicId || null,
        title,
        description,
        instructions: instructions || null,
        maxMarks: parseInt(maxMarks),
        dueDate: new Date(dueDate),
        allowLateSubmission: allowLateSubmission || false,
        allowResubmission: allowResubmission || false,
        latePenaltyPercentage: latePenaltyPercentage || 0,
        status: status || 'DRAFT',
        attachments: attachments || [],
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
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
      },
    })

    if (status === 'PUBLISHED' && courseId) {
      const enrolledStudents = await prisma.enrollments.findMany({
        where: {
          courseId,
          status: 'ACTIVE',
        },
        select: {
          userId: true,
        },
      })

      await Promise.all(
        enrolledStudents.map((enrollment) =>
          prisma.assignment_submissions.create({
            data: {
              assignmentId: assignment.id,
              studentId: enrollment.userId,
              submittedFiles: [],
              status: 'NOT_SUBMITTED',
            },
          })
        )
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Assignment created successfully',
      assignment,
    })
  } catch (error) {
    console.error('Failed to create assignment:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create assignment',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
