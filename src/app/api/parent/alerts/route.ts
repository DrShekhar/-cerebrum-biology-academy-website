import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'

export const dynamic = 'force-dynamic'

interface Alert {
  id: string
  type: 'warning' | 'info' | 'success' | 'error'
  category: 'attendance' | 'homework' | 'test' | 'payment' | 'general'
  title: string
  message: string
  childId?: string
  childName?: string
  priority: 'high' | 'medium' | 'low'
  actionUrl?: string
  actionLabel?: string
  createdAt: string
  isRead: boolean
}

/**
 * GET /api/parent/alerts
 * Fetch alerts and notifications for parent's children
 *
 * Query params:
 * - childId: Filter by specific child (optional)
 * - category: Filter by category (all, attendance, homework, test, payment)
 * - unreadOnly: Show only unread alerts (default false)
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const childIdFilter = searchParams.get('childId')
    const category = searchParams.get('category') || 'all'
    const unreadOnly = searchParams.get('unreadOnly') === 'true'

    // Verify user is a parent
    const parent = await prisma.users.findUnique({
      where: { id: session.user.id },
      select: { id: true, role: true },
    })

    if (!parent || parent.role !== 'PARENT') {
      return NextResponse.json({ success: false, error: 'Parent access required' }, { status: 403 })
    }

    // Get all children for this parent
    const childRelationships = await prisma.parent_child_relationships.findMany({
      where: {
        parentId: parent.id,
        ...(childIdFilter && { childId: childIdFilter }),
      },
      include: {
        child: {
          select: { id: true, name: true, currentClass: true },
        },
      },
    })

    if (childRelationships.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          alerts: [],
          summary: { total: 0, unread: 0, high: 0, medium: 0, low: 0 },
        },
      })
    }

    const alerts: Alert[] = []
    const now = new Date()

    // Generate alerts for each child
    for (const rel of childRelationships) {
      const child = rel.child
      const childAlerts = await generateChildAlerts(child.id, child.name, category, now)
      alerts.push(...childAlerts)
    }

    // Add payment alerts (not child-specific)
    if (category === 'all' || category === 'payment') {
      const paymentAlerts = await generatePaymentAlerts(
        childRelationships.map((r) => r.child.id),
        now
      )
      alerts.push(...paymentAlerts)
    }

    // Sort alerts by priority and date
    alerts.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority]
      if (priorityDiff !== 0) return priorityDiff
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    // Filter unread only if requested
    const filteredAlerts = unreadOnly ? alerts.filter((a) => !a.isRead) : alerts

    // Calculate summary
    const summary = {
      total: alerts.length,
      unread: alerts.filter((a) => !a.isRead).length,
      high: alerts.filter((a) => a.priority === 'high').length,
      medium: alerts.filter((a) => a.priority === 'medium').length,
      low: alerts.filter((a) => a.priority === 'low').length,
      byCategory: {
        attendance: alerts.filter((a) => a.category === 'attendance').length,
        homework: alerts.filter((a) => a.category === 'homework').length,
        test: alerts.filter((a) => a.category === 'test').length,
        payment: alerts.filter((a) => a.category === 'payment').length,
        general: alerts.filter((a) => a.category === 'general').length,
      },
    }

    return NextResponse.json({
      success: true,
      data: {
        alerts: filteredAlerts,
        summary,
        children: childRelationships.map((r) => ({
          id: r.child.id,
          name: r.child.name,
          class: r.child.currentClass,
        })),
      },
    })
  } catch (error) {
    console.error('Error fetching parent alerts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch alerts' },
      { status: 500 }
    )
  }
}

async function generateChildAlerts(
  childId: string,
  childName: string,
  category: string,
  now: Date
): Promise<Alert[]> {
  const alerts: Alert[] = []

  // Attendance alerts
  if (category === 'all' || category === 'attendance') {
    const thirtyDaysAgo = new Date(now)
    thirtyDaysAgo.setDate(now.getDate() - 30)

    const attendanceRecords = await prisma.student_attendance.findMany({
      where: {
        studentId: childId,
        createdAt: { gte: thirtyDaysAgo },
      },
      select: { status: true, isLate: true, createdAt: true },
    })

    const totalSessions = attendanceRecords.length
    const presentCount = attendanceRecords.filter(
      (r) => r.status === 'PRESENT' || r.status === 'LATE'
    ).length
    const attendanceRate = totalSessions > 0 ? (presentCount / totalSessions) * 100 : 100

    if (attendanceRate < 75 && totalSessions >= 5) {
      alerts.push({
        id: `attendance-low-${childId}`,
        type: 'error',
        category: 'attendance',
        title: 'Critical: Low Attendance',
        message: `${childName}'s attendance is ${Math.round(attendanceRate)}% in the last 30 days. This may affect academic performance.`,
        childId,
        childName,
        priority: 'high',
        actionUrl: `/parent/children/${childId}/attendance`,
        actionLabel: 'View Attendance',
        createdAt: now.toISOString(),
        isRead: false,
      })
    } else if (attendanceRate < 85 && totalSessions >= 5) {
      alerts.push({
        id: `attendance-warning-${childId}`,
        type: 'warning',
        category: 'attendance',
        title: 'Attendance Alert',
        message: `${childName}'s attendance (${Math.round(attendanceRate)}%) needs improvement. Regular attendance helps maintain consistency.`,
        childId,
        childName,
        priority: 'medium',
        actionUrl: `/parent/children/${childId}/attendance`,
        actionLabel: 'View Attendance',
        createdAt: now.toISOString(),
        isRead: false,
      })
    }

    // Check for recent absences
    const recentAbsences = attendanceRecords.filter(
      (r) => r.status === 'ABSENT' && new Date(r.createdAt).getTime() > now.getTime() - 7 * 24 * 60 * 60 * 1000
    )

    if (recentAbsences.length >= 3) {
      alerts.push({
        id: `attendance-absences-${childId}`,
        type: 'warning',
        category: 'attendance',
        title: 'Multiple Absences',
        message: `${childName} was absent ${recentAbsences.length} times in the last week.`,
        childId,
        childName,
        priority: 'medium',
        createdAt: now.toISOString(),
        isRead: false,
      })
    }
  }

  // Homework alerts
  if (category === 'all' || category === 'homework') {
    const pendingSubmissions = await prisma.assignment_submissions.findMany({
      where: {
        studentId: childId,
        status: { in: ['NOT_SUBMITTED', 'PENDING'] },
        assignment: {
          status: 'PUBLISHED',
        },
      },
      include: {
        assignment: { select: { title: true, dueDate: true } },
      },
    })

    // Overdue homework
    const overdueHomework = pendingSubmissions.filter(
      (s) => new Date(s.assignment.dueDate) < now
    )

    if (overdueHomework.length > 0) {
      alerts.push({
        id: `homework-overdue-${childId}`,
        type: 'error',
        category: 'homework',
        title: 'Overdue Homework',
        message: `${childName} has ${overdueHomework.length} overdue assignment${overdueHomework.length > 1 ? 's' : ''} that need${overdueHomework.length === 1 ? 's' : ''} immediate attention.`,
        childId,
        childName,
        priority: 'high',
        actionUrl: `/parent/children/${childId}/homework?status=pending`,
        actionLabel: 'View Homework',
        createdAt: now.toISOString(),
        isRead: false,
      })
    }

    // Upcoming deadlines (within 2 days)
    const upcomingDeadlines = pendingSubmissions.filter((s) => {
      const dueDate = new Date(s.assignment.dueDate)
      const twoDaysFromNow = new Date(now)
      twoDaysFromNow.setDate(now.getDate() + 2)
      return dueDate >= now && dueDate <= twoDaysFromNow
    })

    if (upcomingDeadlines.length > 0) {
      alerts.push({
        id: `homework-deadline-${childId}`,
        type: 'info',
        category: 'homework',
        title: 'Upcoming Deadline',
        message: `${childName} has ${upcomingDeadlines.length} assignment${upcomingDeadlines.length > 1 ? 's' : ''} due within 2 days.`,
        childId,
        childName,
        priority: 'medium',
        actionUrl: `/parent/children/${childId}/homework`,
        actionLabel: 'View Homework',
        createdAt: now.toISOString(),
        isRead: false,
      })
    }

    // Recently graded homework
    const recentlyGraded = await prisma.assignment_submissions.findMany({
      where: {
        studentId: childId,
        status: 'GRADED',
        gradedAt: {
          gte: new Date(now.getTime() - 24 * 60 * 60 * 1000),
        },
      },
      include: {
        assignment: { select: { title: true, maxMarks: true } },
      },
    })

    recentlyGraded.forEach((sub) => {
      const percentage = sub.grade !== null ? (sub.grade / sub.assignment.maxMarks) * 100 : 0
      if (percentage < 50) {
        alerts.push({
          id: `homework-grade-low-${sub.id}`,
          type: 'warning',
          category: 'homework',
          title: 'Low Grade Alert',
          message: `${childName} scored ${sub.grade}/${sub.assignment.maxMarks} (${Math.round(percentage)}%) on "${sub.assignment.title}". ${sub.feedback ? `Teacher's feedback: ${sub.feedback}` : ''}`,
          childId,
          childName,
          priority: 'medium',
          createdAt: now.toISOString(),
          isRead: false,
        })
      }
    })
  }

  // Test alerts
  if (category === 'all' || category === 'test') {
    const recentTests = await prisma.test_attempts.findMany({
      where: {
        freeUserId: childId,
        status: 'COMPLETED',
        submittedAt: {
          gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      select: { title: true, percentage: true, submittedAt: true },
    })

    // Low test scores
    const lowScoreTests = recentTests.filter((t) => t.percentage < 50)
    if (lowScoreTests.length > 0) {
      alerts.push({
        id: `test-low-scores-${childId}`,
        type: 'warning',
        category: 'test',
        title: 'Test Performance Alert',
        message: `${childName} scored below 50% in ${lowScoreTests.length} recent test${lowScoreTests.length > 1 ? 's' : ''}. Consider reviewing weak areas.`,
        childId,
        childName,
        priority: 'high',
        actionUrl: `/parent/children/${childId}/tests`,
        actionLabel: 'View Test Results',
        createdAt: now.toISOString(),
        isRead: false,
      })
    }

    // Good performance
    const highScoreTests = recentTests.filter((t) => t.percentage >= 80)
    if (highScoreTests.length > 0 && lowScoreTests.length === 0) {
      alerts.push({
        id: `test-good-performance-${childId}`,
        type: 'success',
        category: 'test',
        title: 'Excellent Performance',
        message: `${childName} scored 80% or above in ${highScoreTests.length} recent test${highScoreTests.length > 1 ? 's' : ''}. Keep up the great work!`,
        childId,
        childName,
        priority: 'low',
        createdAt: now.toISOString(),
        isRead: false,
      })
    }

    // Check for declining performance trend
    const monthlyTests = await prisma.test_attempts.findMany({
      where: {
        freeUserId: childId,
        status: 'COMPLETED',
        submittedAt: {
          gte: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: { submittedAt: 'asc' },
      select: { percentage: true, submittedAt: true },
    })

    if (monthlyTests.length >= 4) {
      const midpoint = Math.floor(monthlyTests.length / 2)
      const olderTests = monthlyTests.slice(0, midpoint)
      const recentTestsSlice = monthlyTests.slice(midpoint)

      const olderAvg = olderTests.reduce((a, t) => a + t.percentage, 0) / olderTests.length
      const recentAvg = recentTestsSlice.reduce((a, t) => a + t.percentage, 0) / recentTestsSlice.length

      if (recentAvg < olderAvg - 15) {
        alerts.push({
          id: `test-declining-${childId}`,
          type: 'warning',
          category: 'test',
          title: 'Declining Performance',
          message: `${childName}'s test scores have declined by ${Math.round(olderAvg - recentAvg)}% recently. Consider addressing any learning gaps.`,
          childId,
          childName,
          priority: 'high',
          actionUrl: `/parent/children/${childId}/tests`,
          actionLabel: 'View Analysis',
          createdAt: now.toISOString(),
          isRead: false,
        })
      }
    }
  }

  return alerts
}

async function generatePaymentAlerts(childIds: string[], now: Date): Promise<Alert[]> {
  const alerts: Alert[] = []

  // Get enrollments for all children
  const enrollments = await prisma.enrollments.findMany({
    where: { studentId: { in: childIds } },
    include: {
      payments: {
        where: { status: { in: ['PENDING', 'OVERDUE'] } },
        orderBy: { dueDate: 'asc' },
      },
      courses: { select: { name: true } },
      student: { select: { name: true } },
    },
  })

  const pendingPayments = enrollments.flatMap((e) =>
    e.payments.map((p) => ({
      ...p,
      courseName: e.courses.name,
      studentName: e.student.name,
    }))
  )

  // Overdue payments
  const overduePayments = pendingPayments.filter(
    (p) => p.dueDate && new Date(p.dueDate) < now
  )

  if (overduePayments.length > 0) {
    const totalOverdue = overduePayments.reduce((acc, p) => acc + p.amount, 0)
    alerts.push({
      id: 'payment-overdue',
      type: 'error',
      category: 'payment',
      title: 'Overdue Payment',
      message: `You have ${overduePayments.length} overdue payment${overduePayments.length > 1 ? 's' : ''} totaling ₹${totalOverdue.toLocaleString('en-IN')}. Please clear dues to avoid service interruption.`,
      priority: 'high',
      actionUrl: '/parent/payments',
      actionLabel: 'Pay Now',
      createdAt: now.toISOString(),
      isRead: false,
    })
  }

  // Upcoming payments (within 7 days)
  const upcomingPayments = pendingPayments.filter((p) => {
    if (!p.dueDate) return false
    const dueDate = new Date(p.dueDate)
    const sevenDaysFromNow = new Date(now)
    sevenDaysFromNow.setDate(now.getDate() + 7)
    return dueDate >= now && dueDate <= sevenDaysFromNow
  })

  if (upcomingPayments.length > 0) {
    const totalUpcoming = upcomingPayments.reduce((acc, p) => acc + p.amount, 0)
    alerts.push({
      id: 'payment-upcoming',
      type: 'info',
      category: 'payment',
      title: 'Payment Due Soon',
      message: `You have ${upcomingPayments.length} payment${upcomingPayments.length > 1 ? 's' : ''} due within 7 days totaling ₹${totalUpcoming.toLocaleString('en-IN')}.`,
      priority: 'medium',
      actionUrl: '/parent/payments',
      actionLabel: 'View Details',
      createdAt: now.toISOString(),
      isRead: false,
    })
  }

  return alerts
}
