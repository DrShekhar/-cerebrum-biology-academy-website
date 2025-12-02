import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/auth'

// Mock analytics data until database is implemented
const mockAnalyticsData = {
  overview: {
    totalStudents: 2847,
    activeStudents: 1923,
    newRegistrations: 23,
    totalRevenue: 4250000,
    conversionRate: 18.5,
    averageSessionTime: 12.5,
  },
  demos: {
    totalBookings: 156,
    pendingBookings: 8,
    completedToday: 5,
    conversionRate: 42.5,
    averageRating: 4.8,
  },
  courses: {
    totalEnrollments: 1234,
    popularCourses: [
      {
        courseId: 'class-12',
        courseName: 'Class 12th Biology',
        enrollments: 456,
        revenue: 3420000,
      },
      {
        courseId: 'dropper',
        courseName: 'NEET Dropper Program',
        enrollments: 234,
        revenue: 1989000,
      },
      {
        courseId: 'class-11',
        courseName: 'Class 11th Biology',
        enrollments: 345,
        revenue: 2622000,
      },
    ],
  },
  revenue: {
    totalRevenue: 4250000,
    monthlyRevenue: 850000,
    averageOrderValue: 67500,
    revenueGrowth: 15.2,
  },
  traffic: {
    totalPageViews: 125000,
    uniqueVisitors: 45000,
    bounceRate: 35.2,
    averageSessionDuration: 185, // seconds
  },
  geography: {
    topCities: [
      { city: 'Kota', students: 654, percentage: 23.5 },
      { city: 'Delhi', students: 432, percentage: 15.5 },
      { city: 'Hyderabad', students: 387, percentage: 13.9 },
      { city: 'Mumbai', students: 298, percentage: 10.7 },
      { city: 'Bangalore', students: 245, percentage: 8.8 },
    ],
    internationalStudents: 87,
  },
  trends: {
    userGrowth: [
      { month: 'Oct', users: 1654 },
      { month: 'Nov', users: 1823 },
      { month: 'Dec', users: 2145 },
      { month: 'Jan', users: 2847 },
    ],
    revenueGrowth: [
      { month: 'Oct', revenue: 3200000 },
      { month: 'Nov', revenue: 3650000 },
      { month: 'Dec', revenue: 3900000 },
      { month: 'Jan', revenue: 4250000 },
    ],
  },
}

// GET /api/admin/analytics - Get dashboard analytics
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    await requireAdminAuth()

    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get('timeframe') || '7d' // 1d, 7d, 30d, 90d, 1y
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // In a real implementation, this would filter data based on timeframe
    // For now, returning mock data with simulated filtering

    const filteredData = { ...mockAnalyticsData }

    // Simulate timeframe filtering
    if (timeframe === '1d') {
      filteredData.overview.newRegistrations = 3
      filteredData.demos.completedToday = 2
    } else if (timeframe === '30d') {
      filteredData.overview.newRegistrations = 156
      filteredData.demos.completedToday = 45
    }

    // Calculate change percentages (mock data)
    const changePercentages = {
      totalStudents: 12.5,
      newRegistrations: 8.3,
      totalRevenue: 15.2,
      conversionRate: -2.1,
      demoBookings: 23.8,
    }

    // Live metrics simulation
    const liveMetrics = {
      usersOnline: Math.floor(Math.random() * 50) + 80, // 80-130
      activeSessions: Math.floor(Math.random() * 30) + 50, // 50-80
      currentPageViews: Math.floor(Math.random() * 20) + 30, // 30-50
      demoBookingsToday: filteredData.demos.completedToday,
      realTimeRevenue: Math.floor(Math.random() * 10000) + 50000, // Today's revenue
    }

    return NextResponse.json({
      success: true,
      data: {
        timeframe,
        startDate:
          startDate || new Date(Date.now() - getTimeframeDuration(timeframe)).toISOString(),
        endDate: endDate || new Date().toISOString(),
        ...filteredData,
        changePercentages,
        liveMetrics,
        lastUpdated: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Analytics API error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}

// Helper function to get timeframe duration in milliseconds
function getTimeframeDuration(timeframe: string): number {
  switch (timeframe) {
    case '1d':
      return 24 * 60 * 60 * 1000
    case '7d':
      return 7 * 24 * 60 * 60 * 1000
    case '30d':
      return 30 * 24 * 60 * 60 * 1000
    case '90d':
      return 90 * 24 * 60 * 60 * 1000
    case '1y':
      return 365 * 24 * 60 * 60 * 1000
    default:
      return 7 * 24 * 60 * 60 * 1000
  }
}
