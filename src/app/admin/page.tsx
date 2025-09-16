'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  BookOpen,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  BarChart3,
  Eye,
  UserPlus,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'

// Mock data - in real implementation, this would come from your database
const mockDashboardData = {
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
      { courseId: 'class-12', courseName: 'Class 12th Biology', enrollments: 456, revenue: 3420000 },
      { courseId: 'dropper', courseName: 'NEET Dropper Program', enrollments: 234, revenue: 1989000 },
      { courseId: 'class-11', courseName: 'Class 11th Biology', enrollments: 345, revenue: 2622000 },
    ],
  },
  recentActivities: [
    {
      id: 1,
      type: 'demo_booking',
      user: 'Rahul Sharma',
      description: 'booked a demo for Class 12th Biology',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: 2,
      type: 'enrollment',
      user: 'Priya Patel',
      description: 'enrolled in NEET Dropper Program',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
    },
    {
      id: 3,
      type: 'payment',
      user: 'Amit Kumar',
      description: 'completed payment of ₹75,000',
      timestamp: new Date(Date.now() - 18 * 60 * 1000),
    },
    {
      id: 4,
      type: 'cart_abandonment',
      user: 'Sneha Singh',
      description: 'abandoned cart with ₹85,000 value',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
    },
  ],
  liveMetrics: {
    usersOnline: 127,
    activeSessions: 89,
    currentPageViews: 45,
    demoBookingsToday: 12,
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
    green: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    red: 'bg-red-50 text-red-600 border-red-200',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      style={{ boxShadow: 'var(--shadow-soft)' }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <div className="flex items-center mt-2">
            <TrendingUp className={`w-4 h-4 mr-1 ${change >= 0 ? 'text-emerald-500' : 'text-red-500'}`} />
            <span className={`text-sm font-medium ${change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
            <span className="text-sm text-gray-500 ml-1">{changeLabel}</span>
          </div>
        </div>
        <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </motion.div>
  )
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case 'demo_booking':
      return <Calendar className="w-4 h-4 text-blue-500" />
    case 'enrollment':
      return <BookOpen className="w-4 h-4 text-emerald-500" />
    case 'payment':
      return <DollarSign className="w-4 h-4 text-green-500" />
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
  const [data, setData] = useState(mockDashboardData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setIsLoading(false), 1000)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        liveMetrics: {
          ...prev.liveMetrics,
          usersOnline: prev.liveMetrics.usersOnline + Math.floor(Math.random() * 10) - 5,
          activeSessions: prev.liveMetrics.activeSessions + Math.floor(Math.random() * 6) - 3,
          currentPageViews: prev.liveMetrics.currentPageViews + Math.floor(Math.random() * 8) - 4,
        }
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's what's happening at Cerebrum Biology Academy today.
          </p>
          
          {/* Live indicators */}
          <div className="flex items-center space-x-6 mt-4 p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
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
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Students"
            value={data.overview.totalStudents}
            change={12.5}
            changeLabel="vs last month"
            icon={Users}
            color="blue"
          />
          <MetricCard
            title="Demo Bookings"
            value={data.demos.totalBookings}
            change={23.8}
            changeLabel="vs last month"
            icon={Calendar}
            color="green"
          />
          <MetricCard
            title="Total Revenue"
            value={`₹${(data.overview.totalRevenue / 100000).toFixed(1)}L`}
            change={18.2}
            changeLabel="vs last month"
            icon={DollarSign}
            color="purple"
          />
          <MetricCard
            title="Conversion Rate"
            value={`${data.overview.conversionRate}%`}
            change={3.2}
            changeLabel="vs last month"
            icon={TrendingUp}
            color="orange"
          />
        </div>

        {/* Demo Booking Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Pending Demos</h3>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-2">{data.demos.pendingBookings}</div>
            <p className="text-sm text-gray-600">Require immediate attention</p>
            <button className="mt-4 text-orange-600 hover:text-orange-700 font-medium text-sm">
              View Details →
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Completed Today</h3>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-emerald-600 mb-2">{data.demos.completedToday}</div>
            <p className="text-sm text-gray-600">Average rating: {data.demos.averageRating}★</p>
            <button className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              View Feedback →
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Demo → Enrollment</h3>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">{data.demos.conversionRate}%</div>
            <p className="text-sm text-gray-600">Conversion rate this month</p>
            <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
              Improve Rate →
            </button>
          </motion.div>
        </div>

        {/* Recent Activity & Popular Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
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
          </motion.div>

          {/* Popular Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
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
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-gold-100 text-gold-600' :
                      index === 1 ? 'bg-gray-100 text-gray-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
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
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-colors group">
              <UserPlus className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-primary-700">
                Add Student
              </span>
            </button>

            <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-colors group">
              <Calendar className="w-5 h-5 text-gray-400 group-hover:text-emerald-600" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-emerald-700">
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
        </motion.div>
      </div>
    </AdminLayout>
  )
}