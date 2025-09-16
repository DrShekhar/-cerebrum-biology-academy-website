import { NextRequest, NextResponse } from 'next/server'
import { AnalyticsDashboard, RealTimeMetrics } from '@/lib/types/analytics'

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
    const type = searchParams.get('type') || 'dashboard'
    const dateRange = searchParams.get('dateRange') || '30d'

    if (type === 'realtime') {
      const realTimeData = generateMockRealTimeData()
      return NextResponse.json(realTimeData)
    }

    const dashboardData = generateMockDashboardData()

    // Apply date filtering if needed
    if (dateRange !== '30d') {
      // In production, filter data based on date range
      // For now, return the same mock data
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error('Analytics dashboard error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
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
