/**
 * Teacher Analytics API
 * GET /api/teacher/analytics - Get comprehensive teacher performance analytics
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'teacher') {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const teacherId = session.user.id
    const searchParams = request.nextUrl.searchParams
    const period = searchParams.get('period') || 'month'

    const now = new Date()
    let startDate: Date

    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'month':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case 'quarter':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
      case 'year':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        break
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    }

    const [sessionsData, assignmentsData, attendanceData, studentEngagement, courseDistribution] =
      await Promise.all([
        prisma.class_sessions.aggregate({
          where: {
            teacherId,
            createdAt: { gte: startDate },
          },
          _count: { id: true },
          _avg: { presentCount: true, totalStudents: true },
        }),

        prisma.assignments.findMany({
          where: {
            teacherId,
            createdAt: { gte: startDate },
          },
          select: {
            id: true,
            status: true,
            maxMarks: true,
            submissions: {
              select: {
                status: true,
                grade: true,
                isLate: true,
              },
            },
          },
        }),

        prisma.class_sessions.findMany({
          where: {
            teacherId,
            createdAt: { gte: startDate },
            attendanceMarked: true,
          },
          select: {
            presentCount: true,
            totalStudents: true,
            scheduledDate: true,
          },
        }),

        prisma.enrollments.count({
          where: {
            course: {
              teacherId,
            },
            status: 'ACTIVE',
          },
        }),

        prisma.courses.findMany({
          where: {
            teacherId,
            isActive: true,
          },
          select: {
            id: true,
            name: true,
            class: true,
            _count: {
              select: {
                enrollments: {
                  where: { status: 'ACTIVE' },
                },
              },
            },
          },
        }),
      ])

    const sessionsByStatus = await prisma.class_sessions.groupBy({
      by: ['status'],
      where: {
        teacherId,
        createdAt: { gte: startDate },
      },
      _count: { id: true },
    })

    let totalAssignments = assignmentsData.length
    let totalSubmissions = 0
    let gradedSubmissions = 0
    let totalGradePoints = 0
    let totalMaxMarks = 0
    let lateSubmissions = 0

    assignmentsData.forEach((assignment) => {
      totalSubmissions += assignment.submissions.length
      assignment.submissions.forEach((submission) => {
        if (submission.status === 'GRADED' && submission.grade !== null) {
          gradedSubmissions++
          totalGradePoints += submission.grade
          totalMaxMarks += assignment.maxMarks
        }
        if (submission.isLate) {
          lateSubmissions++
        }
      })
    })

    const averageScore =
      totalMaxMarks > 0 ? ((totalGradePoints / totalMaxMarks) * 100).toFixed(1) : 0

    let totalPresent = 0
    let totalPossible = 0

    attendanceData.forEach((session) => {
      totalPresent += session.presentCount || 0
      totalPossible += session.totalStudents || 0
    })

    const overallAttendanceRate =
      totalPossible > 0 ? ((totalPresent / totalPossible) * 100).toFixed(1) : 0

    const monthlyAttendance = attendanceData.reduce(
      (acc: Record<string, { present: number; total: number }>, session) => {
        const month = new Date(session.scheduledDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
        })
        if (!acc[month]) {
          acc[month] = { present: 0, total: 0 }
        }
        acc[month].present += session.presentCount || 0
        acc[month].total += session.totalStudents || 0
        return acc
      },
      {}
    )

    const assignmentsByStatus = assignmentsData.reduce(
      (acc: Record<string, number>, assignment) => {
        acc[assignment.status] = (acc[assignment.status] || 0) + 1
        return acc
      },
      {}
    )

    const sessionsStatusMap = sessionsByStatus.reduce((acc: Record<string, number>, item) => {
      acc[item.status] = item._count.id
      return acc
    }, {})

    return NextResponse.json({
      success: true,
      period,
      overview: {
        totalSessions: sessionsData._count.id,
        totalAssignments,
        totalSubmissions,
        activeStudents: studentEngagement,
        activeCourses: courseDistribution.length,
      },
      sessions: {
        total: sessionsData._count.id,
        scheduled: sessionsStatusMap.SCHEDULED || 0,
        ongoing: sessionsStatusMap.ONGOING || 0,
        completed: sessionsStatusMap.COMPLETED || 0,
        cancelled: sessionsStatusMap.CANCELLED || 0,
        averageAttendees: Math.round(sessionsData._avg.presentCount || 0),
      },
      assignments: {
        total: totalAssignments,
        draft: assignmentsByStatus.DRAFT || 0,
        published: assignmentsByStatus.PUBLISHED || 0,
        closed: assignmentsByStatus.CLOSED || 0,
        totalSubmissions,
        gradedSubmissions,
        lateSubmissions,
        averageScore,
        submissionRate:
          totalSubmissions > 0 ? ((gradedSubmissions / totalSubmissions) * 100).toFixed(1) : 0,
      },
      attendance: {
        overallRate: overallAttendanceRate,
        totalMarked: attendanceData.length,
        monthlyData: Object.entries(monthlyAttendance).map(([month, data]) => ({
          month,
          rate: ((data.present / data.total) * 100).toFixed(1),
          present: data.present,
          total: data.total,
        })),
      },
      courses: courseDistribution.map((course) => ({
        id: course.id,
        name: course.name,
        class: course.class,
        enrollments: course._count.enrollments,
      })),
      engagement: {
        activeStudents: studentEngagement,
        averageClassSize: Math.round(sessionsData._avg.totalStudents || 0),
      },
    })
  } catch (error) {
    console.error('Failed to fetch teacher analytics:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch analytics',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
