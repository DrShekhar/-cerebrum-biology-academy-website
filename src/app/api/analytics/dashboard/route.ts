import { NextRequest, NextResponse } from 'next/server'
import {
  AnalyticsDashboard,
  RealTimeMetrics,
  DashboardMetrics,
  TeacherAnalytics,
  AdminAnalytics,
  UserActivity,
} from '@/lib/types/analytics'
import { prisma as db } from '@/lib/database'
import { auth } from '@/lib/auth'

// SECURITY (2026-01-29): Helper to check authentication and role
async function checkAuthAndRole(
  requiredRoles: string[],
  userId?: string | null
): Promise<{ authorized: boolean; session: any; error?: string; status?: number }> {
  const session = await auth()

  if (!session?.user) {
    return {
      authorized: false,
      session: null,
      error: 'Authentication required',
      status: 401,
    }
  }

  const userRole = (session.user as any).role?.toUpperCase()

  // If specific roles are required, check them
  if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
    return {
      authorized: false,
      session,
      error: `Access denied. Required role: ${requiredRoles.join(' or ')}`,
      status: 403,
    }
  }

  // For student dashboard, verify the user is accessing their own data or is admin/teacher
  if (userId && userRole === 'STUDENT' && session.user.id !== userId) {
    return {
      authorized: false,
      session,
      error: 'Students can only access their own analytics',
      status: 403,
    }
  }

  return { authorized: true, session }
}

// Mock data for demonstration - in production, this would come from your database
/** Parse a '7d' | '30d' | '90d' range string to a start Date (default 30d). */
function rangeStart(dateRange: string): Date {
  const days = parseInt(dateRange, 10)
  const n = Number.isFinite(days) && days > 0 ? days : 30
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d
}

function deviceFromUA(ua: string | null): 'mobile' | 'tablet' | 'desktop' {
  const s = (ua || '').toLowerCase()
  if (/ipad|tablet|playbook|silk/.test(s)) return 'tablet'
  if (/mobi|android|iphone|ipod|phone/.test(s)) return 'mobile'
  return 'desktop'
}

/**
 * Real analytics dashboard, computed from analytics_events (web metrics) plus
 * users / enrollments / leads (business metrics). No fabricated numbers — if a
 * metric has no data yet it simply reads 0/empty rather than a random value.
 */
async function getRealDashboardData(dateRange: string): Promise<AnalyticsDashboard> {
  const start = rangeStart(dateRange)

  // One bounded pull of web events → many metrics in JS (cheap, single query).
  const events = await db.analytics_events.findMany({
    where: { createdAt: { gte: start } },
    select: {
      eventType: true,
      pagePath: true,
      sessionId: true,
      userId: true,
      userAgent: true,
      country: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 50000,
  })

  const pageViews = events.filter((e) => e.eventType === 'page_view')
  const totalPageViews = pageViews.length

  // Top pages: views + unique sessions per path.
  const pageAgg = new Map<string, { views: number; users: Set<string> }>()
  for (const e of pageViews) {
    if (!e.pagePath) continue
    const a = pageAgg.get(e.pagePath) || { views: 0, users: new Set<string>() }
    a.views++
    if (e.sessionId) a.users.add(e.sessionId)
    pageAgg.set(e.pagePath, a)
  }
  const topPages = [...pageAgg.entries()]
    .map(([page, a]) => ({ page, views: a.views, uniqueUsers: a.users.size }))
    .sort((x, y) => y.views - x.views)
    .slice(0, 5)

  // Per-session spans → average duration + bounce rate.
  const sessionSpans = new Map<string, { first: number; last: number; count: number }>()
  const deviceCount = { mobile: 0, tablet: 0, desktop: 0 }
  const seenSessionForDevice = new Set<string>()
  const countryAgg = new Map<string, { users: Set<string>; sessions: Set<string> }>()
  const hourAgg = new Map<number, { sessions: Set<string>; durSum: number }>()
  const activeUserSet = new Set<string>()

  for (const e of events) {
    const t = e.createdAt.getTime()
    if (e.userId) activeUserSet.add(e.userId)
    else if (e.sessionId) activeUserSet.add(e.sessionId)

    if (e.sessionId) {
      const s = sessionSpans.get(e.sessionId) || { first: t, last: t, count: 0 }
      s.first = Math.min(s.first, t)
      s.last = Math.max(s.last, t)
      s.count++
      sessionSpans.set(e.sessionId, s)

      if (!seenSessionForDevice.has(e.sessionId)) {
        seenSessionForDevice.add(e.sessionId)
        deviceCount[deviceFromUA(e.userAgent)]++
      }
    }

    const country = e.country || 'Unknown'
    const c = countryAgg.get(country) || { users: new Set<string>(), sessions: new Set<string>() }
    if (e.userId) c.users.add(e.userId)
    if (e.sessionId) c.sessions.add(e.sessionId)
    countryAgg.set(country, c)

    const hour = e.createdAt.getHours()
    const h = hourAgg.get(hour) || { sessions: new Set<string>(), durSum: 0 }
    if (e.sessionId) h.sessions.add(e.sessionId)
    hourAgg.set(hour, h)
  }

  const spans = [...sessionSpans.values()]
  const totalSessions = spans.length
  const avgDurationMs = totalSessions
    ? Math.round(spans.reduce((sum, s) => sum + (s.last - s.first), 0) / totalSessions)
    : 0
  const bounceRate = totalSessions ? spans.filter((s) => s.count <= 1).length / totalSessions : 0

  const deviceTotal = deviceCount.mobile + deviceCount.tablet + deviceCount.desktop || 1
  const deviceBreakdown = {
    mobile: deviceCount.mobile / deviceTotal,
    tablet: deviceCount.tablet / deviceTotal,
    desktop: deviceCount.desktop / deviceTotal,
  }

  const locationData = [...countryAgg.entries()]
    .map(([country, a]) => ({ country, users: a.users.size, sessions: a.sessions.size }))
    .sort((x, y) => y.sessions - x.sessions)
    .slice(0, 8)

  const sessionData = Array.from({ length: 24 }, (_, hour) => {
    const h = hourAgg.get(hour)
    return { hour, sessions: h ? h.sessions.size : 0, averageDuration: 0 }
  })

  // Business metrics (real counts).
  const [totalUsers, newUsers, recentUsers, enrollAgg, leadTotal, enrolledLeads] =
    await Promise.all([
      db.users.count(),
      db.users.count({ where: { createdAt: { gte: start } } }),
      db.users.findMany({ where: { createdAt: { gte: start } }, select: { createdAt: true } }),
      db.enrollments.groupBy({
        by: ['courseId'],
        _count: { _all: true },
        _sum: { paidAmount: true },
      }),
      db.leads.count(),
      db.leads.count({ where: { stage: { in: ['ENROLLED', 'ACTIVE_STUDENT'] } } }),
    ])

  const revenueGenerated = enrollAgg.reduce((sum, e) => sum + (e._sum.paidAmount || 0), 0)

  // Top courses by enrollment (+ real revenue); title resolved from courses.
  const topEnroll = [...enrollAgg]
    .sort((a, b) => (b._sum.paidAmount || 0) - (a._sum.paidAmount || 0))
    .slice(0, 5)
  const courseRows = await db.courses.findMany({
    where: { id: { in: topEnroll.map((e) => e.courseId) } },
    select: { id: true, name: true },
  })
  const courseName = new Map(courseRows.map((c) => [c.id, c.name]))
  const topCourses = topEnroll.map((e) => ({
    courseId: e.courseId,
    title: courseName.get(e.courseId) || e.courseId,
    views: 0, // course→page mapping isn't tracked; enrollments/revenue are the real signal
    enrollments: e._count._all,
    revenue: e._sum.paidAmount || 0,
  }))

  // User growth by day over the range.
  const growthByDay = new Map<string, number>()
  for (const u of recentUsers) {
    const key = u.createdAt.toISOString().split('T')[0]
    growthByDay.set(key, (growthByDay.get(key) || 0) + 1)
  }
  const days = Math.max(1, Math.round((Date.now() - start.getTime()) / (24 * 3600 * 1000)))
  let runningTotal = totalUsers - newUsers
  const userGrowth = Array.from({ length: days }, (_, i) => {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const key = d.toISOString().split('T')[0]
    const dayNew = growthByDay.get(key) || 0
    runningTotal += dayNew
    return { date: key, newUsers: dayNew, totalUsers: runningTotal }
  })

  const activeUsers = activeUserSet.size
  const conversionRate = leadTotal > 0 ? enrolledLeads / leadTotal : 0

  return {
    totalUsers,
    activeUsers,
    newUsers,
    returningUsers: Math.max(0, activeUsers - newUsers),
    totalPageViews,
    averageSessionDuration: avgDurationMs,
    bounceRate,
    conversionRate,
    revenueGenerated,
    topPages,
    topCourses,
    userGrowth,
    sessionData,
    deviceBreakdown,
    locationData,
  }
}

/**
 * Real-time metrics from analytics_events (last 30 min) + the live business
 * funnel. No random data.
 */
async function getRealTimeData(): Promise<RealTimeMetrics> {
  const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000)
  const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000)

  const recent = await db.analytics_events.findMany({
    where: { createdAt: { gte: thirtyMinAgo } },
    select: {
      id: true,
      userId: true,
      sessionId: true,
      eventType: true,
      pagePath: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 2000,
  })

  // Active sessions = latest event per session in the last 5 minutes.
  const sessionLatest = new Map<
    string,
    { userId: string; sessionId: string; currentPage: string; startTime: Date; lastActivity: Date }
  >()
  const activeUserSet = new Set<string>()
  const livePageAgg = new Map<string, number>()

  for (const e of recent) {
    if (e.pagePath) livePageAgg.set(e.pagePath, (livePageAgg.get(e.pagePath) || 0) + 1)
    if (!e.sessionId) continue
    if (e.createdAt >= fiveMinAgo) {
      activeUserSet.add(e.userId || e.sessionId)
      const existing = sessionLatest.get(e.sessionId)
      if (!existing) {
        sessionLatest.set(e.sessionId, {
          userId: e.userId || 'anonymous',
          sessionId: e.sessionId,
          currentPage: e.pagePath || '/',
          startTime: e.createdAt,
          lastActivity: e.createdAt,
        })
      } else {
        // recent is desc, so first seen is latest; keep earliest as startTime
        existing.startTime = e.createdAt
      }
    }
  }

  const livePageViews = [...livePageAgg.entries()]
    .map(([page, count]) => ({ page, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)

  const recentActivities: RealTimeMetrics['recentActivities'] = recent.slice(0, 50).map((e) => ({
    id: e.id,
    userId: e.userId || 'anonymous',
    sessionId: e.sessionId || 'unknown',
    type: (e.eventType === 'page_view' ? 'page_view' : 'page_view') as UserActivity['type'],
    timestamp: e.createdAt,
    metadata: { page: e.pagePath || undefined },
  }))

  const [visitors, demoBookings, enrollments, payments] = await Promise.all([
    db.leads.count(),
    db.demo_bookings.count(),
    db.leads.count({ where: { stage: { in: ['ENROLLED', 'ACTIVE_STUDENT'] } } }),
    db.enrollments.count({ where: { paidAmount: { gt: 0 } } }),
  ])

  return {
    activeUsers: activeUserSet.size,
    activeSessions: [...sessionLatest.values()],
    livePageViews,
    recentActivities,
    conversionFunnel: { visitors, demoBookings, enrollments, payments },
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dashboardType =
      (searchParams.get('type') as
        | 'student'
        | 'teacher'
        | 'ADMIN'
        | 'general'
        | 'dashboard'
        | 'realtime') || 'general'
    const userId = searchParams.get('userId')
    const grade = searchParams.get('grade')
    const dateRange = searchParams.get('dateRange') || '30d'

    // SECURITY (2026-01-29): Role-based access control for all dashboard types
    switch (dashboardType) {
      case 'student': {
        if (!userId) {
          return NextResponse.json(
            { error: 'User ID is required for student dashboard' },
            { status: 400 }
          )
        }
        // Students can view their own data, teachers/admins can view any student
        const authCheck = await checkAuthAndRole(['STUDENT', 'TEACHER', 'ADMIN'], userId)
        if (!authCheck.authorized) {
          return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
        }
        const studentMetrics = await getStudentDashboardMetrics(userId)
        return NextResponse.json({ success: true, data: studentMetrics })
      }

      case 'teacher': {
        if (!grade) {
          return NextResponse.json(
            { error: 'Grade is required for teacher dashboard' },
            { status: 400 }
          )
        }
        // Only teachers and admins can access teacher analytics
        const authCheck = await checkAuthAndRole(['TEACHER', 'ADMIN'])
        if (!authCheck.authorized) {
          return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
        }
        const teacherMetrics = await getTeacherDashboardMetrics(grade)
        return NextResponse.json({ success: true, data: teacherMetrics })
      }

      case 'ADMIN': {
        // Only admins can access admin analytics
        const authCheck = await checkAuthAndRole(['ADMIN'])
        if (!authCheck.authorized) {
          return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
        }
        const adminMetrics = await getAdminDashboardMetrics()
        return NextResponse.json({ success: true, data: adminMetrics })
      }

      case 'realtime': {
        // Only admins can view real-time metrics
        const authCheck = await checkAuthAndRole(['ADMIN'])
        if (!authCheck.authorized) {
          return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
        }
        const realTimeData = await getRealTimeData()
        return NextResponse.json(realTimeData)
      }

      case 'dashboard': {
        // General dashboard requires at least teacher or admin access
        const authCheck = await checkAuthAndRole(['TEACHER', 'ADMIN'])
        if (!authCheck.authorized) {
          return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
        }
        const dashboardData = await getRealDashboardData(dateRange)
        return NextResponse.json(dashboardData)
      }

      case 'general':
      default: {
        // General analytics requires authentication
        const authCheck = await checkAuthAndRole(['TEACHER', 'ADMIN'])
        if (!authCheck.authorized) {
          return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
        }
        if (searchParams.get('realtime') === 'true') {
          // Realtime requires admin
          const realtimeCheck = await checkAuthAndRole(['ADMIN'])
          if (!realtimeCheck.authorized) {
            return NextResponse.json(
              { error: realtimeCheck.error },
              { status: realtimeCheck.status }
            )
          }
          const realTimeDataLegacy = await getRealTimeData()
          return NextResponse.json(realTimeDataLegacy)
        }

        const dashboardDataDefault = await getRealDashboardData(dateRange)
        return NextResponse.json(dashboardDataDefault)
      }
    }
  } catch (error) {
    console.error('Analytics dashboard error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // SECURITY (2026-01-29): POST endpoint requires admin access
    const authCheck = await checkAuthAndRole(['ADMIN'])
    if (!authCheck.authorized) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
    }

    const body = await request.json()
    const { filters, dateRange, metrics } = body

    // In production, apply filters and return filtered data
    const dashboardData = await getRealDashboardData(dateRange)

    return NextResponse.json({
      ...dashboardData,
      filters: filters,
      dateRange: dateRange,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Analytics dashboard filter error:', error)
    return NextResponse.json({ error: 'Failed to apply filters' }, { status: 500 })
  }
}

async function getStudentDashboardMetrics(userId: string): Promise<DashboardMetrics> {
  // Get user's grade for class comparison
  const user = await db.free_users.findUnique({
    where: { id: userId },
    select: { grade: true },
  })

  if (!user) {
    throw new Error('User not found')
  }

  // Get total students in same grade
  const totalStudents = await db.free_users.count({
    where: { grade: user.grade },
  })

  // Get completed tests for the user
  const userTests = await db.test_attempts.findMany({
    where: {
      freeUserId: userId,
      status: 'COMPLETED',
    },
    orderBy: { submittedAt: 'desc' },
  })

  const totalTests = userTests.length
  const averageScore =
    totalTests > 0 ? userTests.reduce((sum, test) => sum + test.percentage, 0) / totalTests : 0

  // Get completion rate (completed vs started)
  const startedTests = await db.test_attempts.count({
    where: { freeUserId: userId },
  })
  const completionRate = startedTests > 0 ? (totalTests / startedTests) * 100 : 0

  // Get daily activity for last 30 days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const dailyTests = await db.test_attempts.findMany({
    where: {
      freeUserId: userId,
      status: 'COMPLETED',
      submittedAt: { gte: thirtyDaysAgo },
    },
    select: { submittedAt: true },
  })

  const dailyActive = generateDailyActivity(dailyTests, 30)

  // Get top performers in same grade
  const gradeTests = await db.test_attempts.findMany({
    where: {
      status: 'COMPLETED',
      free_users: { grade: user.grade },
    },
    include: { free_users: true },
  })

  const topPerformers = calculateTopPerformers(gradeTests)

  return {
    overview: {
      totalStudents,
      totalTests,
      averageScore,
      completionRate,
    },
    trends: {
      dailyActive,
      weeklyTests: [], // Implement if needed
      monthlyGrowth: [], // Implement if needed
    },
    topPerformers,
    popularContent: [], // Implement based on user's test history
  }
}

async function getTeacherDashboardMetrics(grade: string): Promise<TeacherAnalytics> {
  // Get all students in the grade
  const students = await db.free_users.findMany({
    where: { grade },
    include: {
      test_attempts: {
        where: { status: 'COMPLETED' },
        orderBy: { submittedAt: 'desc' },
      },
    },
  })

  const totalStudents = students.length

  // Calculate class metrics
  const allTests = students.flatMap((s) => s.test_attempts)
  const classAverage =
    allTests.length > 0
      ? allTests.reduce((sum, test) => sum + test.percentage, 0) / allTests.length
      : 0

  // Calculate improvement (compare last 2 weeks)
  const twoWeeksAgo = new Date()
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)

  const recentTests = allTests.filter((test) => test.submittedAt >= twoWeeksAgo)
  const olderTests = allTests.filter((test) => test.submittedAt < twoWeeksAgo)

  const recentAverage =
    recentTests.length > 0
      ? recentTests.reduce((sum, test) => sum + test.percentage, 0) / recentTests.length
      : 0
  const olderAverage =
    olderTests.length > 0
      ? olderTests.reduce((sum, test) => sum + test.percentage, 0) / olderTests.length
      : 0

  const improvement = recentAverage - olderAverage

  // Get student progress
  const studentProgress = students.map((student) => {
    const studentTests = student.test_attempts
    const avgScore =
      studentTests.length > 0
        ? studentTests.reduce((sum, test) => sum + test.percentage, 0) / studentTests.length
        : 0

    const recentStudentTests = studentTests.filter((test) => test.submittedAt >= twoWeeksAgo)
    const olderStudentTests = studentTests.filter((test) => test.submittedAt < twoWeeksAgo)

    const recentStudentAvg =
      recentStudentTests.length > 0
        ? recentStudentTests.reduce((sum, test) => sum + test.percentage, 0) /
          recentStudentTests.length
        : 0
    const olderStudentAvg =
      olderStudentTests.length > 0
        ? olderStudentTests.reduce((sum, test) => sum + test.percentage, 0) /
          olderStudentTests.length
        : 0

    return {
      studentId: student.id,
      name: student.name || 'Anonymous',
      lastActive: student.lastActiveDate || new Date(),
      testsTaken: studentTests.length,
      averageScore: avgScore,
      improvement: recentStudentAvg - olderStudentAvg,
      strugglingTopics: [], // Implement based on test analysis
    }
  })

  // Active students (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const activeStudents = await db.free_users.count({
    where: {
      grade,
      lastActiveDate: { gte: sevenDaysAgo },
    },
  })

  // Weekly test completion
  const weeklyTests = await db.test_attempts.count({
    where: {
      status: 'COMPLETED',
      submittedAt: { gte: sevenDaysAgo },
      free_users: { grade },
    },
  })

  return {
    classOverview: {
      totalStudents,
      averageScore: classAverage,
      classAverage,
      improvement,
    },
    studentProgress,
    topicPerformance: [], // Implement topic-wise analysis
    engagementMetrics: {
      dailyActiveStudents: activeStudents,
      weeklyTestCompletion: weeklyTests,
      averageStudyTime: 0, // Calculate from test durations
      dropoffPoints: [], // Implement analysis
    },
  }
}

async function getAdminDashboardMetrics(): Promise<AdminAnalytics> {
  // System metrics
  const totalUsers = await db.users.count()
  const totalTeachers = await db.users.count({ where: { role: 'TEACHER' } })
  const totalStudents = await db.free_users.count()

  // Monthly growth
  const lastMonth = new Date()
  lastMonth.setMonth(lastMonth.getMonth() - 1)

  const newUsersThisMonth = await db.free_users.count({
    where: { registrationDate: { gte: lastMonth } },
  })

  const previousMonth = new Date(lastMonth)
  previousMonth.setMonth(previousMonth.getMonth() - 1)

  const newUsersLastMonth = await db.free_users.count({
    where: {
      registrationDate: {
        gte: previousMonth,
        lt: lastMonth,
      },
    },
  })

  const monthlyGrowth =
    newUsersLastMonth > 0 ? ((newUsersThisMonth - newUsersLastMonth) / newUsersLastMonth) * 100 : 0

  // Content metrics
  const totalQuestions = await db.questions.count()
  const totalTests = await db.test_templates.count()

  // Performance metrics (mock data for now)
  const systemUptime = 99.9
  const averageResponseTime = 250
  const errorRate = 0.1

  return {
    systemMetrics: {
      totalUsers,
      totalTeachers,
      totalStudents,
      monthlyGrowth,
      churnRate: 0, // Implement churn calculation
    },
    contentMetrics: {
      totalQuestions,
      totalTests,
      averageRating: 4.5, // Implement rating system
      contentGaps: [], // Implement gap analysis
    },
    performanceMetrics: {
      systemUptime,
      averageResponseTime,
      errorRate,
      serverLoad: 65, // Mock data
    },
    businessMetrics: {
      revenue: 0, // Implement revenue tracking
      conversionRate: 0, // Implement conversion tracking
      customerLifetimeValue: 0, // Implement CLV calculation
      costPerAcquisition: 0, // Implement CPA calculation
    },
  }
}

function generateDailyActivity(tests: any[], days: number): Array<{ date: string; count: number }> {
  const activity = []
  const testsByDate: Record<string, number> = {}

  tests.forEach((test) => {
    const date = test.submittedAt.toISOString().split('T')[0]
    testsByDate[date] = (testsByDate[date] || 0) + 1
  })

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]

    activity.push({
      date: dateStr,
      count: testsByDate[dateStr] || 0,
    })
  }

  return activity
}

function calculateTopPerformers(
  tests: any[]
): Array<{ userId: string; name: string; score: number; rank: number }> {
  const userStats: Record<string, { name: string; totalScore: number; testCount: number }> = {}

  tests.forEach((test) => {
    const userId = test.freeUserId
    if (!userStats[userId]) {
      userStats[userId] = {
        name: test.free_users.name || 'Anonymous',
        totalScore: 0,
        testCount: 0,
      }
    }
    userStats[userId].totalScore += test.percentage
    userStats[userId].testCount++
  })

  return Object.entries(userStats)
    .map(([userId, stats]) => ({
      userId,
      name: stats.name,
      score: stats.testCount > 0 ? stats.totalScore / stats.testCount : 0,
      rank: 0,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((user, index) => ({ ...user, rank: index + 1 }))
}
