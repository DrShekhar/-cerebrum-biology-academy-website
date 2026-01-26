import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'

export const dynamic = 'force-dynamic'

/**
 * GET /api/parent/dashboard
 * Fetch parent dashboard data including linked children via parent_child_relationships
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Verify user is a parent
    const parent = await prisma.users.findUnique({
      where: { id: session.user.id },
      select: { id: true, name: true, email: true, phone: true, role: true },
    })

    if (!parent || parent.role !== 'PARENT') {
      return NextResponse.json({ success: false, error: 'Parent access required' }, { status: 403 })
    }

    // Find linked children via parent_child_relationships table
    const childRelationships = await prisma.parent_child_relationships.findMany({
      where: { parentId: parent.id },
      include: {
        child: {
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
              orderBy: { submittedAt: 'desc' },
              take: 10,
            },
            student_attendance: {
              orderBy: { createdAt: 'desc' },
              take: 30,
              include: {
                session: {
                  select: { title: true, scheduledDate: true },
                },
              },
            },
            assignment_submissions: {
              orderBy: { createdAt: 'desc' },
              take: 10,
              include: {
                assignment: {
                  select: { title: true, dueDate: true, maxMarks: true },
                },
              },
            },
          },
        },
      },
    })

    // Calculate stats for each child
    const childrenWithStats = childRelationships.map((rel) => {
      const child = rel.child

      // Calculate overall progress
      const totalEnrollments = child.enrollments.length
      const completedLessons = child.enrollments.reduce((acc, enr) => {
        return acc + (typeof enr.progress === 'number' ? enr.progress : 0)
      }, 0)
      const overallProgress =
        totalEnrollments > 0 ? Math.round(completedLessons / totalEnrollments) : 0

      // Calculate test performance
      const completedTests = child.test_attempts.filter((t) => t.submittedAt)
      const avgScore =
        completedTests.length > 0
          ? Math.round(
              completedTests.reduce((acc, t) => acc + (t.score || 0), 0) / completedTests.length
            )
          : 0

      // Calculate attendance
      const totalAttendance = child.student_attendance.length
      const presentDays = child.student_attendance.filter((a) => a.status === 'PRESENT').length
      const attendanceRate =
        totalAttendance > 0 ? Math.round((presentDays / totalAttendance) * 100) : 0

      // Get last active
      const lastActivity = child.test_attempts[0]?.submittedAt || child.updatedAt
      const lastActiveText = getTimeAgo(new Date(lastActivity))

      // Calculate homework stats
      const pendingHomework = child.assignment_submissions.filter(
        (s) => s.status === 'NOT_SUBMITTED' || s.status === 'PENDING'
      ).length
      const completedHomework = child.assignment_submissions.filter(
        (s) => s.status === 'SUBMITTED' || s.status === 'GRADED'
      ).length

      return {
        id: child.id,
        name: child.name,
        email: child.email,
        class: child.currentClass || 'Not specified',
        profilePicture: child.profilePicture,
        enrolledCourses: totalEnrollments,
        overallProgress,
        avgTestScore: avgScore,
        attendanceRate,
        lastActive: lastActiveText,
        pendingHomework,
        completedHomework,
        courses: child.enrollments.map((enr) => ({
          id: enr.courses.id,
          name: enr.courses.name,
          progress: enr.progress || 0,
          status: enr.status,
        })),
        recentTests: child.test_attempts.slice(0, 5).map((attempt) => ({
          id: attempt.id,
          title: attempt.title,
          date: attempt.submittedAt?.toISOString() || attempt.startedAt.toISOString(),
          score: attempt.score,
          totalMarks: attempt.totalMarks,
          percentage: attempt.percentage,
          status: attempt.submittedAt ? 'completed' : 'in_progress',
        })),
        recentAttendance: child.student_attendance.slice(0, 7).map((att) => ({
          id: att.id,
          date: att.createdAt.toISOString(),
          status: att.status,
          sessionTitle: att.session?.title || 'Class Session',
          isLate: att.isLate,
          checkInTime: att.checkInTime?.toISOString(),
          checkOutTime: att.checkOutTime?.toISOString(),
        })),
        recentHomework: child.assignment_submissions.slice(0, 5).map((sub) => ({
          id: sub.id,
          title: sub.assignment.title,
          dueDate: sub.assignment.dueDate.toISOString(),
          status: sub.status,
          grade: sub.grade,
          maxMarks: sub.assignment.maxMarks,
          feedback: sub.feedback,
          submittedAt: sub.submittedAt?.toISOString(),
          isLate: sub.isLate,
        })),
      }
    })

    // Get payment history across all children
    const allPayments = childRelationships.flatMap((rel) =>
      rel.child.enrollments.flatMap((enr) =>
        enr.payments.map((payment) => ({
          id: payment.id,
          date: payment.createdAt.toISOString(),
          amount: payment.amount,
          status: payment.status.toLowerCase() as 'paid' | 'pending' | 'overdue',
          description: `${enr.courses.name} - ${payment.paymentMode || 'Course Fee'}`,
          childName: rel.child.name,
        }))
      )
    )

    // Get upcoming tests for enrolled courses
    const enrolledCourseIds = childRelationships.flatMap((rel) =>
      rel.child.enrollments.map((e) => e.courseId)
    )

    const upcomingTests = await prisma.tests.findMany({
      where: {
        courseId: { in: enrolledCourseIds },
        scheduledFor: { gte: new Date() },
      },
      orderBy: { scheduledFor: 'asc' },
      take: 5,
    })

    // Get pending assignments
    const pendingAssignments = await prisma.assignments.findMany({
      where: {
        courseId: { in: enrolledCourseIds },
        dueDate: { gte: new Date() },
        status: 'PUBLISHED',
      },
      orderBy: { dueDate: 'asc' },
      take: 5,
      select: {
        id: true,
        title: true,
        dueDate: true,
        maxMarks: true,
        course: { select: { name: true } },
      },
    })

    // Calculate alerts
    const alerts = generateAlerts(childrenWithStats, allPayments)

    return NextResponse.json({
      success: true,
      data: {
        parent: {
          id: parent.id,
          name: parent.name,
          email: parent.email,
          phone: parent.phone,
        },
        children: childrenWithStats,
        recentPayments: allPayments.slice(0, 10),
        upcomingTests: upcomingTests.map((test) => ({
          id: test.id,
          title: test.title,
          date: test.scheduledFor?.toISOString(),
          totalMarks: test.totalMarks,
          duration: test.duration,
        })),
        pendingAssignments: pendingAssignments.map((assignment) => ({
          id: assignment.id,
          title: assignment.title,
          dueDate: assignment.dueDate.toISOString(),
          maxMarks: assignment.maxMarks,
          courseName: assignment.course?.name,
        })),
        alerts,
        summary: {
          totalChildren: childrenWithStats.length,
          totalEnrollments: childrenWithStats.reduce((acc, c) => acc + c.enrolledCourses, 0),
          pendingPayments: allPayments.filter((p) => p.status === 'pending').length,
          avgAttendance:
            childrenWithStats.length > 0
              ? Math.round(
                  childrenWithStats.reduce((acc, c) => acc + c.attendanceRate, 0) /
                    childrenWithStats.length
                )
              : 0,
          totalPendingHomework: childrenWithStats.reduce((acc, c) => acc + c.pendingHomework, 0),
        },
      },
    })
  } catch (error) {
    console.error('Parent dashboard API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
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

interface ChildStat {
  id: string
  name: string
  attendanceRate: number
  avgTestScore: number
  pendingHomework: number
}

interface Payment {
  status: string
}

interface Alert {
  id: string
  type: 'warning' | 'info' | 'success' | 'error'
  title: string
  message: string
  childName?: string
  createdAt: string
}

function generateAlerts(children: ChildStat[], payments: Payment[]): Alert[] {
  const alerts: Alert[] = []
  const now = new Date()

  children.forEach((child) => {
    // Low attendance alert
    if (child.attendanceRate < 75) {
      alerts.push({
        id: `attendance-${child.id}`,
        type: 'warning',
        title: 'Low Attendance',
        message: `${child.name}'s attendance is ${child.attendanceRate}%. Regular attendance is important for academic success.`,
        childName: child.name,
        createdAt: now.toISOString(),
      })
    }

    // Pending homework alert
    if (child.pendingHomework > 0) {
      alerts.push({
        id: `homework-${child.id}`,
        type: 'info',
        title: 'Pending Homework',
        message: `${child.name} has ${child.pendingHomework} pending homework assignment${child.pendingHomework > 1 ? 's' : ''}.`,
        childName: child.name,
        createdAt: now.toISOString(),
      })
    }

    // Low test score alert
    if (child.avgTestScore < 50) {
      alerts.push({
        id: `score-${child.id}`,
        type: 'warning',
        title: 'Needs Improvement',
        message: `${child.name}'s average test score is ${child.avgTestScore}%. Consider additional study support.`,
        childName: child.name,
        createdAt: now.toISOString(),
      })
    }
  })

  // Payment alerts
  const pendingPayments = payments.filter((p) => p.status === 'pending').length
  if (pendingPayments > 0) {
    alerts.push({
      id: 'payment-pending',
      type: 'error',
      title: 'Payment Due',
      message: `You have ${pendingPayments} pending payment${pendingPayments > 1 ? 's' : ''}. Please clear dues to avoid service interruption.`,
      createdAt: now.toISOString(),
    })
  }

  return alerts
}
