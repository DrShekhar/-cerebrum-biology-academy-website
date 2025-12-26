'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  Users,
  Calendar,
  MessageSquare,
  TrendingUp,
  Bell,
  Search,
  Filter,
  Download,
  Settings,
  RefreshCw,
  ChevronDown,
  BookOpen,
  DollarSign,
  Phone,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Smartphone,
  Mail,
  Calendar as CalendarIcon,
  User,
  GraduationCap
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface AdminDashboardProps {
  isAdmin?: boolean
}

interface DashboardMetrics {
  totalUsers: number
  newRegistrations: number
  activeUsers: number
  userRetention: number
  totalEnrollments: number
  enrollmentConversionRate: number
  revenue: number
  averageOrderValue: number
  demoBookings: number
  demoConversionRate: number
  popularCourses: Array<{courseId: string, enrollmentCount: number}>
  classDistribution: Record<string, number>
  topCities: Array<{city: string, userCount: number}>
}

interface Trend {
  change: number
  direction: 'up' | 'down'
}

export function AdminDashboard({ isAdmin = false }: AdminDashboardProps) {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [trends, setTrends] = useState<Record<string, Trend>>({})
  const [timeframe, setTimeframe] = useState('7d')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState('overview')
  const [notifications, setNotifications] = useState<any[]>([])

  // Real-time data fetching with Page Visibility API
  useEffect(() => {
    fetchDashboardData()

    let intervalId: NodeJS.Timeout | null = null

    const startInterval = () => {
      intervalId = setInterval(() => {
        fetchDashboardData()
      }, 30000) // Refresh every 30 seconds
    }

    const handleVisibilityChange = () => {
      if (document.hidden && intervalId) {
        clearInterval(intervalId)
        intervalId = null
      } else if (!document.hidden && !intervalId) {
        startInterval()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    startInterval()

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (intervalId) clearInterval(intervalId)
    }
  }, [timeframe])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/analytics?timeframe=${timeframe}`)
      const data = await response.json()
      
      if (data.success) {
        setMetrics(data.data.metrics)
        setTrends(data.data.trends)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You need admin privileges to access this dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="ml-4 flex items-center space-x-2">
                <button
                  onClick={fetchDashboardData}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={isLoading}
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Live</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Timeframe Selector */}
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1d">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>

              {/* Quick Actions */}
              <Button variant="outline" size="sm" className="flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors relative">
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Settings */}
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'students', label: 'Students', icon: Users },
              { id: 'demos', label: 'Demo Bookings', icon: Calendar },
              { id: 'marketing', label: 'Marketing', icon: Target },
              { id: 'faculty', label: 'Faculty', icon: GraduationCap },
              { id: 'payments', label: 'Payments', icon: DollarSign }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } transition-colors`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {selectedTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OverviewTab metrics={metrics} trends={trends} isLoading={isLoading} />
            </motion.div>
          )}

          {selectedTab === 'students' && (
            <motion.div
              key="students"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StudentsTab />
            </motion.div>
          )}

          {selectedTab === 'demos' && (
            <motion.div
              key="demos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DemoBookingsTab />
            </motion.div>
          )}

          {selectedTab === 'marketing' && (
            <motion.div
              key="marketing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MarketingTab />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

// Overview Tab Component
function OverviewTab({ 
  metrics, 
  trends, 
  isLoading 
}: { 
  metrics: DashboardMetrics | null
  trends: Record<string, Trend>
  isLoading: boolean 
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!metrics) return null

  const keyMetrics = [
    {
      title: 'Total Students',
      value: metrics.totalUsers.toLocaleString(),
      change: trends.totalUsers?.change || 0,
      direction: trends.totalUsers?.direction || 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'New Registrations',
      value: metrics.newRegistrations.toLocaleString(),
      change: trends.newRegistrations?.change || 0,
      direction: trends.newRegistrations?.direction || 'up',
      icon: UserPlus,
      color: 'green'
    },
    {
      title: 'Total Revenue',
      value: `₹${(metrics.revenue / 100000).toFixed(1)}L`,
      change: trends.revenue?.change || 0,
      direction: trends.revenue?.direction || 'up',
      icon: DollarSign,
      color: 'emerald'
    },
    {
      title: 'Demo Bookings',
      value: metrics.demoBookings.toLocaleString(),
      change: trends.demoConversionRate?.change || 0,
      direction: trends.demoConversionRate?.direction || 'up',
      icon: Calendar,
      color: 'purple'
    },
    {
      title: 'Conversion Rate',
      value: `${metrics.enrollmentConversionRate}%`,
      change: trends.enrollmentConversionRate?.change || 0,
      direction: trends.enrollmentConversionRate?.direction || 'up',
      icon: TrendingUp,
      color: 'orange'
    },
    {
      title: 'Average Order Value',
      value: `₹${metrics.averageOrderValue.toLocaleString()}`,
      change: 5.2,
      direction: 'up' as const,
      icon: Target,
      color: 'pink'
    },
    {
      title: 'Active Users',
      value: metrics.activeUsers.toLocaleString(),
      change: trends.totalUsers?.change || 0,
      direction: trends.totalUsers?.direction || 'up',
      icon: Zap,
      color: 'indigo'
    },
    {
      title: 'User Retention',
      value: `${metrics.userRetention}%`,
      change: -1.2,
      direction: 'down' as const,
      icon: RefreshCw,
      color: 'red'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</p>
                  <div className="flex items-center">
                    {metric.direction === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      metric.direction === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {Math.abs(metric.change)}%
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-${metric.color}-100 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${metric.color}-600`} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-blue-600" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              View Recent Enrollments
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send WhatsApp Campaign
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Demo Call
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
            Alerts
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">Payment Failures</p>
                <p className="text-xs text-red-600">5 failed payments need attention</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
              <Clock className="w-4 h-4 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-orange-800">Pending Demos</p>
                <p className="text-xs text-orange-600">12 demos scheduled for today</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800">High Conversion</p>
                <p className="text-xs text-green-600">Above average this week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Courses */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-green-600" />
            Top Courses
          </h3>
          <div className="space-y-3">
            {metrics.popularCourses.slice(0, 4).map((course, index) => (
              <div key={course.courseId} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${
                    index === 0 ? 'from-yellow-400 to-orange-500' :
                    index === 1 ? 'from-gray-400 to-gray-600' :
                    index === 2 ? 'from-amber-600 to-amber-800' :
                    'from-blue-400 to-blue-600'
                  } flex items-center justify-center text-white text-sm font-bold`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {course.courseId.replace(/-/g, ' ').toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">{course.enrollmentCount} enrollments</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-red-600" />
            Top Cities
          </h3>
          <div className="space-y-3">
            {metrics.topCities.slice(0, 6).map((city, index) => (
              <div key={city.city} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{city.city}</span>
                <span className="text-sm text-gray-600">{city.userCount} students</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
            Class Distribution
          </h3>
          <div className="space-y-3">
            {Object.entries(metrics.classDistribution).map(([className, count]) => (
              <div key={className} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Class {className}</span>
                <span className="text-sm text-gray-600">{count} students</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Placeholder components for other tabs
function StudentsTab() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Student Management</h2>
      <p className="text-gray-600">Student management interface coming soon...</p>
    </div>
  )
}

function DemoBookingsTab() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Demo Booking Management</h2>
      <p className="text-gray-600">Demo booking interface coming soon...</p>
    </div>
  )
}

function MarketingTab() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Marketing Automation</h2>
      <p className="text-gray-600">Marketing automation interface coming soon...</p>
    </div>
  )
}

// UserPlus icon component (since it's not in lucide-react by default)
function UserPlus({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    </svg>
  )
}