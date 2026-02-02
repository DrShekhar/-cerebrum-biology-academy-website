import { NextRequest, NextResponse } from 'next/server'
import {
  AnalyticsDashboard,
  RealTimeMetrics,
  DashboardMetrics,
  TeacherAnalytics,
  AdminAnalytics,
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
const generateMockDashboardData = (): AnalyticsDashboard => {
  return {
    totalUsers: 15847,
    activeUsers: 1243,
    newUsers: 234,
    returningUsers: 1009,
    totalPageViews: 45678,
    averageSessionDuration: 425000, // in milliseconds
    bounceRate: 0.34,
    conversionRate: 0.068,
    revenueGenerated: 1247500,

    topPages: [
      { page: '/courses/class-12', views: 8567, uniqueUsers: 2341 },
      { page: '/courses/neet-dropper', views: 6789, uniqueUsers: 1876 },
      { page: '/', views: 12456, uniqueUsers: 4321 },
      { page: '/courses/class-11', views: 5432, uniqueUsers: 1654 },
      { page: '/about', views: 3456, uniqueUsers: 1234 },
    ],

    topCourses: [
      {
        courseId: 'neet-class-12',
        title: 'NEET Class 12th Biology',
        views: 8567,
        enrollments: 456,
        revenue: 456000,
      },
      {
        courseId: 'neet-dropper',
        title: 'NEET Dropper Program',
        views: 6789,
        enrollments: 234,
        revenue: 351000,
      },
      {
        courseId: 'neet-class-11',
        title: 'NEET Class 11th Biology',
        views: 5432,
        enrollments: 198,
        revenue: 297000,
      },
      {
        courseId: 'neet-foundation',
        title: 'NEET Foundation Course',
        views: 4321,
        enrollments: 89,
        revenue: 133500,
      },
    ],

    userGrowth: Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return {
        date: date.toISOString().split('T')[0],
        newUsers: Math.floor(Math.random() * 50) + 10,
        totalUsers: 15847 - i * 12,
      }
    }).reverse(),

    sessionData: Array.from({ length: 24 }, (_, hour) => ({
      hour,
      sessions: Math.floor(Math.random() * 200) + 50,
      averageDuration: Math.floor(Math.random() * 300) + 200,
    })),

    deviceBreakdown: {
      mobile: 0.67,
      tablet: 0.18,
      desktop: 0.15,
    },

    locationData: [
      { country: 'India', users: 12456, sessions: 34567 },
      { country: 'United States', users: 1234, sessions: 2345 },
      { country: 'United Kingdom', users: 567, sessions: 890 },
      { country: 'Canada', users: 345, sessions: 567 },
      { country: 'Australia', users: 234, sessions: 456 },
    ],
  }
}

const generateMockRealTimeData = (): RealTimeMetrics => {
  return {
    activeUsers: 1243,
    activeSessions: Array.from({ length: 20 }, (_, i) => ({
      userId: `user_${i + 1}`,
      sessionId: `session_${Date.now()}_${i}`,
      currentPage: ['/courses/class-12', '/courses/neet-dropper', '/', '/about'][
        Math.floor(Math.random() * 4)
      ],
      startTime: new Date(Date.now() - Math.random() * 3600000), // Random time in last hour
      lastActivity: new Date(Date.now() - Math.random() * 300000), // Random time in last 5 minutes
    })),
    livePageViews: [
      { page: '/courses/class-12', count: 89 },
      { page: '/courses/neet-dropper', count: 67 },
      { page: '/', count: 156 },
      { page: '/courses/class-11', count: 45 },
      { page: '/about', count: 23 },
    ],
    recentActivities: Array.from({ length: 50 }, (_, i) => ({
      id: `activity_${i}`,
      userId: `user_${Math.floor(Math.random() * 100)}`,
      sessionId: `session_${Math.floor(Math.random() * 50)}`,
      type: ['page_view', 'course_view', 'video_play', 'download', 'demo_booking'][
        Math.floor(Math.random() * 5)
      ] as any,
      timestamp: new Date(Date.now() - Math.random() * 3600000),
      metadata: {
        page: ['/courses/class-12', '/courses/neet-dropper', '/', '/about'][
          Math.floor(Math.random() * 4)
        ],
      },
    })),
    conversionFunnel: {
      visitors: 15847,
      demoBookings: 2341,
      enrollments: 567,
      payments: 456,
    },
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
        const realTimeData = generateMockRealTimeData()
        return NextResponse.json(realTimeData)
      }

      case 'dashboard': {
        // General dashboard requires at least teacher or admin access
        const authCheck = await checkAuthAndRole(['TEACHER', 'ADMIN'])
        if (!authCheck.authorized) {
          return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
        }
        const dashboardData = generateMockDashboardData()
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
            return NextResponse.json({ error: realtimeCheck.error }, { status: realtimeCheck.status })
          }
          const realTimeDataLegacy = generateMockRealTimeData()
          return NextResponse.json(realTimeDataLegacy)
        }

        const dashboardDataDefault = generateMockDashboardData()
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
    const dashboardData = generateMockDashboardData()

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
  const user = await db.freeUser.findUnique({
    where: { id: userId },
    select: { grade: true },
  })

  if (!user) {
    throw new Error('User not found')
  }

  // Get total students in same grade
  const totalStudents = await db.freeUser.count({
    where: { grade: user.grade },
  })

  // Get completed tests for the user
  const userTests = await db.testAttempt.findMany({
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
  const startedTests = await db.testAttempt.count({
    where: { freeUserId: userId },
  })
  const completionRate = startedTests > 0 ? (totalTests / startedTests) * 100 : 0

  // Get daily activity for last 30 days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const dailyTests = await db.testAttempt.findMany({
    where: {
      freeUserId: userId,
      status: 'COMPLETED',
      submittedAt: { gte: thirtyDaysAgo },
    },
    select: { submittedAt: true },
  })

  const dailyActive = generateDailyActivity(dailyTests, 30)

  // Get top performers in same grade
  const gradeTests = await db.testAttempt.findMany({
    where: {
      status: 'COMPLETED',
      freeUser: { grade: user.grade },
    },
    include: { freeUser: true },
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
  const students = await db.freeUser.findMany({
    where: { grade },
    include: {
      testAttempts: {
        where: { status: 'COMPLETED' },
        orderBy: { submittedAt: 'desc' },
      },
    },
  })

  const totalStudents = students.length

  // Calculate class metrics
  const allTests = students.flatMap((s) => s.testAttempts)
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
    const studentTests = student.testAttempts
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

  const activeStudents = await db.freeUser.count({
    where: {
      grade,
      lastActiveDate: { gte: sevenDaysAgo },
    },
  })

  // Weekly test completion
  const weeklyTests = await db.testAttempt.count({
    where: {
      status: 'COMPLETED',
      submittedAt: { gte: sevenDaysAgo },
      freeUser: { grade },
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
  const totalUsers = await db.user.count()
  const totalTeachers = await db.user.count({ where: { role: 'TEACHER' } })
  const totalStudents = await db.freeUser.count()

  // Monthly growth
  const lastMonth = new Date()
  lastMonth.setMonth(lastMonth.getMonth() - 1)

  const newUsersThisMonth = await db.freeUser.count({
    where: { registrationDate: { gte: lastMonth } },
  })

  const previousMonth = new Date(lastMonth)
  previousMonth.setMonth(previousMonth.getMonth() - 1)

  const newUsersLastMonth = await db.freeUser.count({
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
  const totalQuestions = await db.question.count()
  const totalTests = await db.testTemplate.count()

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
        name: test.freeUser.name || 'Anonymous',
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
