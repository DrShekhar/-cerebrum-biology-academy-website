/**
 * Student Assignments API
 *
 * GET /api/student/assignments - List assignments for enrolled courses
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

/**
 * GET - Fetch assignments for student's enrolled courses
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized. Student access required.' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const courseId = searchParams.get('courseId')
    const chapterId = searchParams.get('chapterId')
    const status = searchParams.get('status')
    const submissionStatus = searchParams.get('submissionStatus')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const studentId = session.user.id

    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId: studentId,
        status: 'ACTIVE',
      },
      select: {
        courseId: true,
      },
    })

    const enrolledCourseIds = enrollments.map((e) => e.courseId)

    if (enrolledCourseIds.length === 0) {
      return NextResponse.json({
        success: true,
        assignments: [],
        pagination: { page, limit, total: 0, totalPages: 0 },
        stats: {
          totalAssignments: 0,
          pendingSubmissions: 0,
          submittedAssignments: 0,
          gradedAssignments: 0,
          averageGrade: null,
        },
      })
    }

    const where: any = {
      AND: [
        { status: 'PUBLISHED' },
        {
          OR: [{ courseId: { in: enrolledCourseIds } }, { courseId: null }],
        },
      ],
    }

    if (search) {
      where.AND.push({
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      })
    }

    if (courseId) {
      where.AND.push({ courseId })
    }

    if (chapterId) {
      where.AND.push({ chapterId })
    }

    if (status === 'upcoming') {
      where.AND.push({ dueDate: { gte: new Date() } })
    } else if (status === 'overdue') {
      where.AND.push({ dueDate: { lt: new Date() } })
    }

    const [assignments, total] = await Promise.all([
      prisma.assignment.findMany({
        where,
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
            select: {
              id: true,
              status: true,
              submittedAt: true,
              grade: true,
              isLate: true,
            },
          },
        },
        orderBy: {
          dueDate: 'asc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.assignment.count({ where }),
    ])

    const filteredAssignments = submissionStatus
      ? assignments.filter((a) => {
          const submission = a.submissions[0]
          if (submissionStatus === 'NOT_SUBMITTED') {
            return !submission || submission.status === 'NOT_SUBMITTED'
          }
          return submission && submission.status === submissionStatus
        })
      : assignments

    const allSubmissions = await prisma.assignmentSubmission.findMany({
      where: {
        studentId,
        assignment: {
          status: 'PUBLISHED',
          courseId: { in: enrolledCourseIds },
        },
      },
      select: {
        status: true,
        grade: true,
      },
    })

    const totalAssignments = total
    const submittedCount = allSubmissions.filter(
      (s) => s.status === 'SUBMITTED' || s.status === 'LATE' || s.status === 'GRADED'
    ).length
    const gradedCount = allSubmissions.filter((s) => s.status === 'GRADED').length
    const gradedSubmissions = allSubmissions.filter(
      (s) => s.status === 'GRADED' && s.grade !== null
    )
    const averageGrade =
      gradedSubmissions.length > 0
        ? gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0) / gradedSubmissions.length
        : null

    return NextResponse.json({
      success: true,
      assignments: filteredAssignments.map((a) => ({
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
        teacher: a.teacher,
        course: a.course,
        chapter: a.chapter,
        topic: a.topic,
        submission: a.submissions[0] || null,
        isOverdue: new Date(a.dueDate) < new Date(),
      })),
      pagination: {
        page,
        limit,
        total: filteredAssignments.length,
        totalPages: Math.ceil(filteredAssignments.length / limit),
      },
      stats: {
        totalAssignments,
        pendingSubmissions: totalAssignments - submittedCount,
        submittedAssignments: submittedCount,
        gradedAssignments: gradedCount,
        averageGrade,
      },
    })
  } catch (error) {
    console.error('Failed to fetch student assignments:', error)
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
