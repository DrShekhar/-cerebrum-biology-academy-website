'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  BookOpen,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  BarChart3,
  UserPlus,
  RefreshCw,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'

interface DashboardData {
  overview: {
    totalStudents: number
    activeStudents: number
    newRegistrations: number
    totalRevenue: number
    conversionRate: number
    averageSessionTime: number
  }
  demos: {
    totalBookings: number
    pendingBookings: number
    completedToday: number
    conversionRate: number
    averageRating: number
  }
  courses: {
    totalEnrollments: number
    popularCourses: Array<{
      courseId: string
      courseName: string
      enrollments: number
      revenue: number
    }>
  }
  recentActivities: Array<{
    id: string
    type: string
    user: string
    description: string
    timestamp: Date
  }>
  liveMetrics: {
    usersOnline: number
    activeSessions: number
    currentPageViews: number
    demoBookingsToday: number
  }
  changePercentages?: {
    totalStudents: number
    newRegistrations: number
    totalRevenue: number
    conversionRate: number
    demoBookings: number
  }
}

// Default data structure (used as fallback)
const defaultDashboardData: DashboardData = {
  overview: {
    totalStudents: 0,
    activeStudents: 0,
    newRegistrations: 0,
    totalRevenue: 0,
    conversionRate: 0,
    averageSessionTime: 0,
  },
  demos: {
    totalBookings: 0,
    pendingBookings: 0,
    completedToday: 0,
    conversionRate: 0,
    averageRating: 0,
  },
  courses: {
    totalEnrollments: 0,
    popularCourses: [],
  },
  recentActivities: [],
  liveMetrics: {
    usersOnline: 0,
    activeSessions: 0,
    currentPageViews: 0,
    demoBookingsToday: 0,
  },
}

interface MetricCardProps {
  title: string
  value: string | number
  change: number
  changeLabel: string
  icon: any
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red'
}

function MetricCard({ title, value, change, changeLabel, icon: Icon, color }: MetricCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    red: 'bg-red-50 text-red-600 border-red-200',
  }

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fadeInUp"
      style={{ boxShadow: 'var(--shadow-soft)' }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <div className="flex items-center mt-2">
            <TrendingUp
              className={`w-4 h-4 mr-1 ${change >= 0 ? 'text-green-600' : 'text-red-500'}`}
            />
            <span
              className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {change >= 0 ? '+' : ''}
              {change}%
            </span>
            <span className="text-sm text-gray-500 ml-1">{changeLabel}</span>
          </div>
        </div>
        <div
          className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center ${colorClasses[color]}`}
        >
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  )
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case 'demo_booking':
      return <Calendar className="w-4 h-4 text-blue-500" />
    case 'enrollment':
      return <BookOpen className="w-4 h-4 text-green-600" />
    case 'payment':
      return <DollarSign className="w-4 h-4 text-green-600" />
    case 'cart_abandonment':
      return <AlertCircle className="w-4 h-4 text-orange-500" />
    default:
      return <Activity className="w-4 h-4 text-gray-500" />
  }
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return 'just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}h ago`

  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays}d ago`
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData>(defaultDashboardData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [timeframe, setTimeframe] = useState('7d')

  const fetchDashboardData = useCallback(async () => {
    try {
      setError(null)
      const response = await fetch(`/api/admin/analytics?timeframe=${timeframe}`)
      const result = await response.json()

      if (result.success && result.data) {
        const apiData = result.data
        setData({
          overview: apiData.overview,
          demos: apiData.demos,
          courses: apiData.courses,
          recentActivities:
            apiData.recentActivities?.map((a: any) => ({
              ...a,
              timestamp: new Date(a.timestamp),
            })) || [],
          liveMetrics: apiData.liveMetrics,
          changePercentages: apiData.changePercentages,
        })
        setLastUpdated(new Date(apiData.lastUpdated))
      } else {
        setError(result.error || 'Failed to fetch dashboard data')
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err)
      setError('Failed to connect to server')
    } finally {
      setIsLoading(false)
    }
  }, [timeframe])

  useEffect(() => {
    fetchDashboardData()

    // Refresh data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000)

    return () => clearInterval(interval)
  }, [fetchDashboardData])

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Welcome back! Here's what's happening at Cerebrum Biology Academy.
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Timeframe selector */}
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="1d">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              {/* Refresh button */}
              <button
                onClick={fetchDashboardData}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Refresh data"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Live indicators */}
          <div className="flex items-center justify-between mt-4 p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">System Online</span>
              </div>
              <div className="text-sm text-gray-500">
                {data.liveMetrics.usersOnline} users online
              </div>
              <div className="text-sm text-gray-500">
                {data.liveMetrics.activeSessions} active sessions
              </div>
              <div className="text-sm text-gray-500">
                {data.liveMetrics.demoBookingsToday} demos today
              </div>
            </div>
            {lastUpdated && (
              <div className="text-xs text-gray-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Students"
            value={data.overview.totalStudents}
            change={data.changePercentages?.totalStudents || 0}
            changeLabel="vs previous period"
            icon={Users}
            color="blue"
          />
          <MetricCard
            title="Demo Bookings"
            value={data.demos.totalBookings}
            change={data.changePercentages?.demoBookings || 0}
            changeLabel="vs previous period"
            icon={Calendar}
            color="green"
          />
          <MetricCard
            title="Total Revenue"
            value={`₹${(data.overview.totalRevenue / 100000).toFixed(1)}L`}
            change={data.changePercentages?.totalRevenue || 0}
            changeLabel="vs previous period"
            icon={DollarSign}
            color="purple"
          />
          <MetricCard
            title="Conversion Rate"
            value={`${data.overview.conversionRate.toFixed(1)}%`}
            change={data.changePercentages?.conversionRate || 0}
            changeLabel="vs previous period"
            icon={TrendingUp}
            color="orange"
          />
        </div>

        {/* Demo Booking Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fadeInUp"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Pending Demos</h3>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {data.demos.pendingBookings}
            </div>
            <p className="text-sm text-gray-600">Require immediate attention</p>
            <button className="mt-4 text-orange-600 hover:text-orange-700 font-medium text-sm">
              View Details →
            </button>
          </div>

          <div
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fadeInUp"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Completed Today</h3>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {data.demos.completedToday}
            </div>
            <p className="text-sm text-gray-600">Average rating: {data.demos.averageRating}★</p>
            <button className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm">
              View Feedback →
            </button>
          </div>

          <div
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fadeInUp"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Demo → Enrollment</h3>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {data.demos.conversionRate}%
            </div>
            <p className="text-sm text-gray-600">Conversion rate this month</p>
            <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
              Improve Rate →
            </button>
          </div>
        </div>

        {/* Recent Activity & Popular Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Activity */}
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fadeInUp"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {data.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <ActivityIcon type={activity.type} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">{activity.user}</span>{' '}
                      <span className="text-gray-600">{activity.description}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Courses */}
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fadeInUp"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Popular Courses</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Analytics
              </button>
            </div>

            <div className="space-y-4">
              {data.courses.popularCourses.map((course, index) => (
                <div key={course.courseId} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0
                          ? 'bg-gold-100 text-gold-600'
                          : index === 1
                            ? 'bg-gray-100 text-gray-600'
                            : 'bg-orange-100 text-orange-600'
                      }`}
                    >
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{course.courseName}</p>
                      <p className="text-sm text-gray-500">{course.enrollments} enrollments</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₹{(course.revenue / 100000).toFixed(1)}L
                    </p>
                    <p className="text-sm text-gray-500">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fadeInUp"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-colors group">
              <UserPlus className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-primary-700">
                Add Student
              </span>
            </button>

            <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-colors group">
              <Calendar className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-green-700">
                Schedule Demo
              </span>
            </button>

            <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors group">
              <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-purple-700">
                Send Campaign
              </span>
            </button>

            <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-colors group">
              <BarChart3 className="w-5 h-5 text-gray-400 group-hover:text-orange-600" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-orange-700">
                View Reports
              </span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
