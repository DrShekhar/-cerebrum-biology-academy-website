import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { AdminAnalytics } from '@/lib/admin-schema'

// GET /api/admin/analytics - Get dashboard analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get('timeframe') || '7d' // 1d, 7d, 30d, 90d, 1y
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Calculate date range based on timeframe
    const endTimestamp = endDate ? new Date(endDate).getTime() : Date.now()
    const startTimestamp = startDate 
      ? new Date(startDate).getTime()
      : getStartTimestamp(timeframe, endTimestamp)

    // Real-time analytics query using InstantDB
    const analyticsData = await db.query({
      analytics: {
        $: {
          where: {
            createdAt: { $gte: startTimestamp, $lte: endTimestamp }
          },
          order: { createdAt: 'desc' }
        }
      },
      enrollments: {
        $: {
          where: {
            enrollmentDate: { $gte: startTimestamp, $lte: endTimestamp }
          }
        }
      },
      users: {
        $: {
          where: {
            createdAt: { $gte: startTimestamp, $lte: endTimestamp }
          }
        }
      },
      demoBookings: {
        $: {
          where: {
            createdAt: { $gte: startTimestamp, $lte: endTimestamp }
          }
        }
      },
      payments: {
        $: {
          where: {
            createdAt: { $gte: startTimestamp, $lte: endTimestamp },
            status: 'completed'
          }
        }
      }
    })

    // Aggregate real-time metrics
    const metrics = calculateMetrics(analyticsData, timeframe)

    return NextResponse.json({
      success: true,
      data: {
        timeframe,
        startDate: new Date(startTimestamp).toISOString(),
        endDate: new Date(endTimestamp).toISOString(),
        metrics,
        trends: calculateTrends(metrics, timeframe),
        comparisons: await getComparisonData(startTimestamp, endTimestamp, timeframe)
      }
    })

  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}

// Helper function to calculate start timestamp based on timeframe
function getStartTimestamp(timeframe: string, endTimestamp: number): number {
  const end = new Date(endTimestamp)
  
  switch (timeframe) {
    case '1d':
      return end.getTime() - (24 * 60 * 60 * 1000)
    case '7d':
      return end.getTime() - (7 * 24 * 60 * 60 * 1000)
    case '30d':
      return end.getTime() - (30 * 24 * 60 * 60 * 1000)
    case '90d':
      return end.getTime() - (90 * 24 * 60 * 60 * 1000)
    case '1y':
      return end.getTime() - (365 * 24 * 60 * 60 * 1000)
    default:
      return end.getTime() - (7 * 24 * 60 * 60 * 1000)
  }
}

// Calculate aggregated metrics from raw data
function calculateMetrics(data: any, timeframe: string) {
  const { enrollments, users, demoBookings, payments } = data

  // User metrics
  const totalUsers = users.length
  const newRegistrations = users.filter((user: any) => 
    user.createdAt >= getStartTimestamp(timeframe, Date.now())
  ).length
  
  // Calculate user retention (simplified)
  const activeUsers = users.filter((user: any) => 
    user.lastActiveAt && user.lastActiveAt >= Date.now() - (7 * 24 * 60 * 60 * 1000)
  ).length
  
  const userRetention = totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0

  // Enrollment metrics
  const totalEnrollments = enrollments.length
  const paidEnrollments = enrollments.filter((e: any) => e.paymentStatus === 'paid').length
  const enrollmentConversionRate = totalUsers > 0 ? (totalEnrollments / totalUsers) * 100 : 0

  // Revenue metrics
  const revenue = payments.reduce((sum: number, payment: any) => sum + payment.finalAmount, 0)
  const averageOrderValue = paidEnrollments > 0 ? revenue / paidEnrollments : 0

  // Demo booking metrics
  const totalDemoBookings = demoBookings.length
  const completedDemos = demoBookings.filter((demo: any) => demo.status === 'completed').length
  const demoConversionRate = completedDemos > 0 ? (paidEnrollments / completedDemos) * 100 : 0

  // Course distribution
  const courseDistribution = enrollments.reduce((acc: any, enrollment: any) => {
    const courseId = enrollment.courseId
    acc[courseId] = (acc[courseId] || 0) + 1
    return acc
  }, {})

  const popularCourses = Object.entries(courseDistribution)
    .map(([courseId, count]) => ({ courseId, enrollmentCount: count as number }))
    .sort((a, b) => b.enrollmentCount - a.enrollmentCount)
    .slice(0, 5)

  // Class distribution
  const classDistribution = users.reduce((acc: any, user: any) => {
    const currentClass = user.profile?.currentClass
    if (currentClass) {
      acc[currentClass] = (acc[currentClass] || 0) + 1
    }
    return acc
  }, {
    '11th': 0,
    '12th': 0,
    'Dropper': 0,
    'Foundation': 0
  })

  // Geographic distribution
  const cityDistribution = users.reduce((acc: any, user: any) => {
    const city = user.profile?.city
    if (city) {
      acc[city] = (acc[city] || 0) + 1
    }
    return acc
  }, {})

  const topCities = Object.entries(cityDistribution)
    .map(([city, count]) => ({ city, userCount: count as number }))
    .sort((a, b) => b.userCount - a.userCount)
    .slice(0, 10)

  return {
    totalUsers,
    newRegistrations,
    activeUsers,
    userRetention: Math.round(userRetention * 100) / 100,
    totalEnrollments,
    enrollmentConversionRate: Math.round(enrollmentConversionRate * 100) / 100,
    revenue,
    averageOrderValue: Math.round(averageOrderValue * 100) / 100,
    demoBookings: totalDemoBookings,
    demoConversionRate: Math.round(demoConversionRate * 100) / 100,
    leadGeneration: users.filter((u: any) => u.role === 'student').length,
    whatsappEngagement: users.filter((u: any) => u.whatsappConsent).length,
    popularCourses,
    classDistribution,
    topCities
  }
}

// Calculate trends for comparison
function calculateTrends(currentMetrics: any, timeframe: string) {
  // This would compare with previous period data
  // For now, returning mock trend data
  return {
    totalUsers: { change: 12.5, direction: 'up' },
    newRegistrations: { change: 8.3, direction: 'up' },
    revenue: { change: 15.2, direction: 'up' },
    enrollmentConversionRate: { change: -2.1, direction: 'down' },
    demoConversionRate: { change: 5.7, direction: 'up' }
  }
}

// Get comparison data for previous periods
async function getComparisonData(startTimestamp: number, endTimestamp: number, timeframe: string) {
  const duration = endTimestamp - startTimestamp
  const previousStart = startTimestamp - duration
  const previousEnd = startTimestamp

  // Query previous period data for comparison
  // Implementation would be similar to main query but for previous period
  
  return {
    previousPeriod: {
      startDate: new Date(previousStart).toISOString(),
      endDate: new Date(previousEnd).toISOString(),
      // Previous period metrics would be calculated here
    }
  }
}