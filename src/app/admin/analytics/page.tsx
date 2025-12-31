'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Eye,
  TrendingUp,
  Activity,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Clock,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  MousePointer,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import { AnalyticsDashboard, RealTimeMetrics } from '@/lib/types/analytics'

export default function AnalyticsPage() {
  const [dashboardData, setDashboardData] = useState<AnalyticsDashboard | null>(null)
  const [realTimeData, setRealTimeData] = useState<RealTimeMetrics | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [dateRange, setDateRange] = useState('30d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
    loadRealTimeData()

    // Set up real-time updates
    const interval = setInterval(() => {
      loadRealTimeData()
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [dateRange])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/analytics/dashboard?type=dashboard&dateRange=${dateRange}`)
      const data = await response.json()
      setDashboardData(data)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadRealTimeData = async () => {
    try {
      const response = await fetch('/api/analytics/dashboard?type=realtime')
      const data = await response.json()
      setRealTimeData(data)
    } catch (error) {
      console.error('Failed to load real-time data:', error)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}m ${seconds}s`
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  if (loading || !dashboardData) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Analytics & Activity Tracking</h1>
            <p className="text-gray-600 mt-2">
              Monitor user behavior, engagement, and conversion metrics
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="365d">Last Year</option>
            </select>

            <Button onClick={loadDashboardData} variant="outline">
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Real-time Metrics Bar */}
        {realTimeData && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-indigo-500 rounded-xl p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span className="text-lg font-semibold">Live Activity</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{realTimeData.activeUsers}</div>
                  <div className="text-sm opacity-90">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{realTimeData.activeSessions.length}</div>
                  <div className="text-sm opacity-90">Live Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {realTimeData.livePageViews.reduce((sum, page) => sum + page.count, 0)}
                  </div>
                  <div className="text-sm opacity-90">Page Views/Hour</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'behavior', label: 'Behavior', icon: Activity },
              { id: 'conversions', label: 'Conversions', icon: Target },
              { id: 'realtime', label: 'Real-time', icon: Zap },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatNumber(dashboardData.totalUsers)}
                    </p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <ArrowUpRight className="w-4 h-4" />
                      +12.5% from last month
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Page Views</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatNumber(dashboardData.totalPageViews)}
                    </p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <ArrowUpRight className="w-4 h-4" />
                      +8.2% from last month
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Session</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatDuration(dashboardData.averageSessionDuration)}
                    </p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <ArrowUpRight className="w-4 h-4" />
                      +5.8% from last month
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {(dashboardData.conversionRate * 100).toFixed(1)}%
                    </p>
                    <p className="text-sm text-red-600 flex items-center mt-1">
                      <ArrowDownRight className="w-4 h-4" />
                      -2.1% from last month
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* User Growth Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth Trend</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">User growth chart visualization</p>
                    <p className="text-sm text-gray-500">
                      Shows {dashboardData.userGrowth.length} days of data
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Device Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Usage</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-5 h-5 text-blue-600" />
                      <span>Mobile</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-600 rounded-full"
                          style={{ width: `${dashboardData.deviceBreakdown.mobile * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {(dashboardData.deviceBreakdown.mobile * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Monitor className="w-5 h-5 text-green-600" />
                      <span>Desktop</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-600 rounded-full"
                          style={{ width: `${dashboardData.deviceBreakdown.desktop * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {(dashboardData.deviceBreakdown.desktop * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Tablet className="w-5 h-5 text-purple-600" />
                      <span>Tablet</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-purple-600 rounded-full"
                          style={{ width: `${dashboardData.deviceBreakdown.tablet * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {(dashboardData.deviceBreakdown.tablet * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Top Pages and Courses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Pages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h3>
                <div className="space-y-3">
                  {dashboardData.topPages.map((page, index) => (
                    <div key={page.page} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium">{page.page}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{formatNumber(page.views)}</div>
                        <div className="text-xs text-gray-500">
                          {formatNumber(page.uniqueUsers)} unique
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Top Courses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Courses</h3>
                <div className="space-y-3">
                  {dashboardData.topCourses.map((course, index) => (
                    <div key={course.courseId} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-medium text-green-600">
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{course.title}</div>
                          <div className="text-xs text-gray-500">
                            {course.enrollments} enrollments
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          {formatCurrency(course.revenue)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatNumber(course.views)} views
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Conversions/Funnel Tab */}
        {activeTab === 'conversions' && dashboardData && (
          <div className="space-y-8">
            {/* Conversion Funnel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Lead-to-Payment Conversion Funnel
              </h3>

              {/* Funnel Visualization */}
              <div className="space-y-4">
                {[
                  { stage: 'Website Visitors', count: 15000, color: 'bg-blue-500' },
                  { stage: 'Lead Captured', count: 2500, color: 'bg-indigo-500' },
                  { stage: 'Demo Booked', count: 850, color: 'bg-purple-500' },
                  { stage: 'Demo Confirmed', count: 680, color: 'bg-violet-500' },
                  { stage: 'Demo Attended', count: 510, color: 'bg-indigo-500' },
                  { stage: 'Enrolled', count: 280, color: 'bg-rose-500' },
                  { stage: 'Paid', count: 245, color: 'bg-green-600' },
                ].map((item, index, arr) => {
                  const prevCount = index > 0 ? arr[index - 1].count : item.count
                  const dropoff =
                    prevCount > 0 ? (((prevCount - item.count) / prevCount) * 100).toFixed(1) : 0
                  const conversionFromStart = ((item.count / arr[0].count) * 100).toFixed(2)
                  const width = (item.count / arr[0].count) * 100

                  return (
                    <motion.div
                      key={item.stage}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 ${item.color} rounded-full`} />
                          <span className="font-medium text-gray-900">{item.stage}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-gray-900">
                            {formatNumber(item.count)}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            ({conversionFromStart}%)
                          </span>
                          {index > 0 && (
                            <span className="text-xs text-red-500 ml-2">-{dropoff}% dropoff</span>
                          )}
                        </div>
                      </div>
                      <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${width}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className={`h-full ${item.color} rounded-lg flex items-center justify-end pr-3`}
                        >
                          <span className="text-white text-xs font-medium">
                            {width.toFixed(1)}%
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Key Conversion Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white"
              >
                <div className="text-sm opacity-90">Lead Capture Rate</div>
                <div className="text-3xl font-bold mt-2">16.7%</div>
                <div className="text-xs opacity-80 mt-1">Visitors → Leads</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white"
              >
                <div className="text-sm opacity-90">Demo Booking Rate</div>
                <div className="text-3xl font-bold mt-2">34.0%</div>
                <div className="text-xs opacity-80 mt-1">Leads → Demo Booked</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-xl text-white"
              >
                <div className="text-sm opacity-90">Demo Attendance</div>
                <div className="text-3xl font-bold mt-2">75.0%</div>
                <div className="text-xs opacity-80 mt-1">Confirmed → Attended</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-green-600 p-6 rounded-xl text-white"
              >
                <div className="text-sm opacity-90">Overall Conversion</div>
                <div className="text-3xl font-bold mt-2">1.63%</div>
                <div className="text-xs opacity-80 mt-1">Visitors → Paid</div>
              </motion.div>
            </div>

            {/* Funnel Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-6 rounded-xl"
            >
              <h4 className="font-semibold text-yellow-800 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Funnel Optimization Insights
              </h4>
              <ul className="space-y-3 text-sm text-yellow-900">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>
                    <strong>Biggest dropoff (83.3%)</strong> at Lead Capture stage - Consider adding
                    more lead magnets and exit-intent popups
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>
                    <strong>Demo confirmation rate (80%)</strong> is strong - WhatsApp reminders
                    working well
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>
                    <strong>Post-demo enrollment (54.9%)</strong> could improve with better
                    follow-up sequence
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>
                    <strong>Payment completion (87.5%)</strong> is excellent - payment flow is
                    optimized
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Exit Intent Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Exit Intent Popup Performance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">342</div>
                  <div className="text-sm text-gray-600">Popups Shown</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">89</div>
                  <div className="text-sm text-gray-600">Leads Captured</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">26.0%</div>
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Real-time Tab */}
        {activeTab === 'realtime' && realTimeData && (
          <div className="space-y-8">
            {/* Real-time Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">{realTimeData.activeUsers}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <MousePointer className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Live Sessions</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {realTimeData.activeSessions.length}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <Eye className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Page Views/Hour</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {realTimeData.livePageViews.reduce((sum, page) => sum + page.count, 0)}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <Target className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(
                        (realTimeData.conversionFunnel.payments /
                          realTimeData.conversionFunnel.visitors) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Live Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Activity Feed</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {realTimeData.recentActivities.slice(0, 20).map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                      <div>
                        <span className="text-sm font-medium capitalize">
                          {activity.type.replace('_', ' ')}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          on {activity.metadata.page}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
