import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/parent/dashboard
 * Fetch parent dashboard data including linked students
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const parentId = searchParams.get('parentId')
    const parentEmail = searchParams.get('email')

    if (!parentId && !parentEmail) {
      return NextResponse.json({ error: 'parentId or email required' }, { status: 400 })
    }

    // Find parent user
    const parent = await prisma.users.findFirst({
      where: parentId
        ? { id: parentId, role: 'PARENT' }
        : { email: parentEmail || '', role: 'PARENT' },
    })

    if (!parent) {
      return NextResponse.json({ error: 'Parent not found' }, { status: 404 })
    }

    // Find linked students (children)
    // Students are linked via the parentPhone or metadata
    const students = await prisma.users.findMany({
      where: {
        OR: [
          { parentPhone: parent.phone },
          {
            metadata: {
              path: ['parentEmail'],
              equals: parent.email,
            },
          },
        ],
        role: 'STUDENT',
      },
      include: {
        enrollments: {
          include: {
            courses: true,
            payments: {
              orderBy: { createdAt: 'desc' },
              take: 5,
            },
          },
        },
        test_attempts: {
          orderBy: { completedAt: 'desc' },
          take: 10,
          include: {
            tests: true,
          },
        },
        attendances: {
          orderBy: { createdAt: 'desc' },
          take: 30,
        },
      },
    })

    // Calculate stats for each student
    const studentsWithStats = students.map((student) => {
      // Calculate overall progress
      const totalEnrollments = student.enrollments.length
      const completedLessons = student.enrollments.reduce((acc, enr) => {
        return acc + (typeof enr.progress === 'number' ? enr.progress : 0)
      }, 0)
      const overallProgress =
        totalEnrollments > 0 ? Math.round(completedLessons / totalEnrollments) : 0

      // Calculate test performance
      const completedTests = student.test_attempts.filter((t) => t.completedAt)
      const avgScore =
        completedTests.length > 0
          ? Math.round(
              completedTests.reduce((acc, t) => acc + (t.score || 0), 0) / completedTests.length
            )
          : 0

      // Calculate attendance
      const totalAttendance = student.attendances.length
      const presentDays = student.attendances.filter((a) => a.status === 'PRESENT').length
      const attendanceRate =
        totalAttendance > 0 ? Math.round((presentDays / totalAttendance) * 100) : 0

      // Get last active
      const lastActivity = student.test_attempts[0]?.completedAt || student.updatedAt
      const lastActiveText = getTimeAgo(new Date(lastActivity))

      return {
        id: student.id,
        name: student.name,
        email: student.email,
        class: student.currentClass || 'Not specified',
        enrolledCourses: totalEnrollments,
        overallProgress,
        avgTestScore: avgScore,
        attendanceRate,
        lastActive: lastActiveText,
        courses: student.enrollments.map((enr) => ({
          id: enr.courses.id,
          name: enr.courses.name,
          progress: enr.progress || 0,
          status: enr.status,
        })),
        recentTests: student.test_attempts.slice(0, 5).map((attempt) => ({
          id: attempt.id,
          name: attempt.tests?.title || 'Unknown Test',
          date: attempt.completedAt?.toISOString() || attempt.startedAt.toISOString(),
          score: attempt.score,
          totalMarks: attempt.tests?.totalMarks || 100,
          status: attempt.completedAt ? 'completed' : 'in_progress',
        })),
      }
    })

    // Get payment history across all students
    const allPayments = students.flatMap((student) =>
      student.enrollments.flatMap((enr) =>
        enr.payments.map((payment) => ({
          id: payment.id,
          date: payment.createdAt.toISOString(),
          amount: payment.amount,
          status: payment.status.toLowerCase() as 'paid' | 'pending' | 'overdue',
          description: `${enr.courses.name} - ${payment.paymentMode || 'Course Fee'}`,
          studentName: student.name,
        }))
      )
    )

    // Get upcoming tests
    const upcomingTests = await prisma.tests.findMany({
      where: {
        courseId: {
          in: students.flatMap((s) => s.enrollments.map((e) => e.courseId)),
        },
        scheduledFor: {
          gte: new Date(),
        },
      },
      orderBy: { scheduledFor: 'asc' },
      take: 5,
    })

    return NextResponse.json({
      success: true,
      parent: {
        id: parent.id,
        name: parent.name,
        email: parent.email,
        phone: parent.phone,
      },
      students: studentsWithStats,
      recentPayments: allPayments.slice(0, 10),
      upcomingTests: upcomingTests.map((test) => ({
        id: test.id,
        name: test.title,
        date: test.scheduledFor?.toISOString(),
        totalMarks: test.totalMarks,
        status: 'upcoming',
      })),
      summary: {
        totalStudents: students.length,
        totalEnrollments: students.reduce((acc, s) => acc + s.enrollments.length, 0),
        pendingPayments: allPayments.filter((p) => p.status === 'pending').length,
        avgAttendance:
          studentsWithStats.length > 0
            ? Math.round(
                studentsWithStats.reduce((acc, s) => acc + s.attendanceRate, 0) /
                  studentsWithStats.length
              )
            : 0,
      },
    })
  } catch (error) {
    console.error('Parent dashboard API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data', details: String(error) },
      { status: 500 }
    )
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) return `${diffMins} minutes ago`
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}
