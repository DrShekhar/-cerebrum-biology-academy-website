'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUserFlow } from '@/hooks/useUserFlow'
import { Button } from '@/components/ui/Button'
import {
  TrendingUp,
  Calendar,
  CreditCard,
  Bell,
  ChevronRight,
  Clock,
  BookOpen,
  Trophy,
  Users,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  ClipboardList,
  GraduationCap,
  FileText,
  RefreshCw,
  ShieldX,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Child {
  id: string
  name: string
  email: string
  class: string
  profilePicture?: string
  enrolledCourses: number
  overallProgress: number
  avgTestScore: number
  attendanceRate: number
  lastActive: string
  pendingHomework: number
  completedHomework: number
  courses: Array<{
    id: string
    name: string
    progress: number
    status: string
  }>
  recentTests: Array<{
    id: string
    title: string
    date: string
    score: number
    totalMarks: number
    percentage: number
    status: string
  }>
  recentAttendance: Array<{
    id: string
    date: string
    status: string
    sessionTitle: string
    isLate: boolean
  }>
  recentHomework: Array<{
    id: string
    title: string
    dueDate: string
    status: string
    grade: number | null
    maxMarks: number
    feedback: string | null
    isLate: boolean
  }>
}

interface Payment {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  description: string
  childName?: string
}

interface UpcomingTest {
  id: string
  title: string
  date?: string
  totalMarks: number
  duration?: number
}

interface PendingAssignment {
  id: string
  title: string
  dueDate: string
  maxMarks: number
  courseName?: string
}

interface Alert {
  id: string
  type: 'warning' | 'info' | 'success' | 'error'
  category: string
  title: string
  message: string
  childName?: string
  priority: 'high' | 'medium' | 'low'
  actionUrl?: string
  actionLabel?: string
  createdAt: string
}

interface DashboardData {
  parent: { id: string; name: string; email: string; phone?: string }
  children: Child[]
  recentPayments: Payment[]
  upcomingTests: UpcomingTest[]
  pendingAssignments: PendingAssignment[]
  alerts: Alert[]
  summary: {
    totalChildren: number
    totalEnrollments: number
    pendingPayments: number
    avgAttendance: number
    totalPendingHomework: number
  }
}

const alertIcons = {
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
  error: XCircle,
}

const alertColors = {
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
}

const alertIconColors = {
  warning: 'text-yellow-500',
  info: 'text-blue-500',
  success: 'text-green-500',
  error: 'text-red-500',
}

// SECURITY (2026-01-29): Unauthorized access component for non-parents
function UnauthorizedAccess({ userRole }: { userRole?: string }) {
  const router = useRouter()

  const getRedirectPath = () => {
    switch (userRole?.toUpperCase()) {
      case 'ADMIN': return '/dashboard/admin'
      case 'TEACHER': return '/dashboard/teacher'
      case 'STUDENT': return '/student/dashboard'
      case 'CONSULTANT': return '/consultant/dashboard'
      default: return '/dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldX className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don&apos;t have permission to access the Parent Dashboard.
          This area is restricted to parents only.
        </p>
        <div className="space-y-3">
          <Button
            onClick={() => router.push(getRedirectPath())}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Go to Your Dashboard
          </Button>
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="w-full"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ParentDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useUserFlow()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [selectedChild, setSelectedChild] = useState<string | null>(null)

  const fetchDashboardData = useCallback(async () => {
    try {
      setRefreshing(true)
      const response = await fetch('/api/parent/dashboard')

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch dashboard data')
      }

      const data = await response.json()
      if (data.success) {
        setDashboardData(data.data)
        if (data.data.children.length > 0 && !selectedChild) {
          setSelectedChild(data.data.children[0].id)
        }
      } else {
        throw new Error(data.error || 'Failed to fetch dashboard data')
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [selectedChild])

  useEffect(() => {
    if (authLoading) return
    if (isAuthenticated) {
      fetchDashboardData()
    } else {
      setLoading(false)
      setError('Please sign in to view your dashboard')
    }
  }, [isAuthenticated, authLoading, fetchDashboardData])

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // SECURITY (2026-01-29): Verify user has PARENT role
  // This is client-side enforcement; API endpoints must also verify role
  if (isAuthenticated && user) {
    const userRole = user?.role?.toUpperCase()
    if (userRole !== 'PARENT' && userRole !== 'ADMIN') {
      return <UnauthorizedAccess userRole={userRole} />
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError('')
              setLoading(true)
              fetchDashboardData()
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!dashboardData) return null

  const { parent, children, recentPayments, upcomingTests, pendingAssignments, alerts, summary } =
    dashboardData
  const currentChild = children.find((c) => c.id === selectedChild) || children[0]
  const highPriorityAlerts = alerts.filter((a) => a.priority === 'high')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome, {parent.name}</h1>
          <p className="text-gray-600 mt-1">Monitor your children&apos;s academic progress</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            disabled={refreshing}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshCw className={cn('w-5 h-5', refreshing && 'animate-spin')} />
          </button>
          <Link
            href="/parent/alerts"
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative"
          >
            <Bell className="w-5 h-5" />
            {highPriorityAlerts.length > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {highPriorityAlerts.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* High Priority Alerts */}
      {highPriorityAlerts.length > 0 && (
        <div className="mb-6 space-y-3">
          {highPriorityAlerts.slice(0, 3).map((alert) => {
            const IconComponent = alertIcons[alert.type]
            return (
              <div
                key={alert.id}
                className={cn(
                  'p-4 rounded-lg border flex items-start gap-3',
                  alertColors[alert.type]
                )}
              >
                <IconComponent className={cn('w-5 h-5 mt-0.5', alertIconColors[alert.type])} />
                <div className="flex-1">
                  <h4 className="font-semibold">{alert.title}</h4>
                  <p className="text-sm opacity-90">{alert.message}</p>
                </div>
                {alert.actionUrl && (
                  <Link
                    href={alert.actionUrl}
                    className="text-sm font-medium underline hover:no-underline"
                  >
                    {alert.actionLabel || 'View'}
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <Users className="w-6 h-6 text-blue-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{summary.totalChildren}</p>
          <p className="text-sm text-gray-600">Children</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <BookOpen className="w-6 h-6 text-green-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{summary.totalEnrollments}</p>
          <p className="text-sm text-gray-600">Enrollments</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <Calendar className="w-6 h-6 text-purple-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{summary.avgAttendance}%</p>
          <p className="text-sm text-gray-600">Avg Attendance</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <ClipboardList className="w-6 h-6 text-orange-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{summary.totalPendingHomework}</p>
          <p className="text-sm text-gray-600">Pending Homework</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <CreditCard className="w-6 h-6 text-red-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{summary.pendingPayments}</p>
          <p className="text-sm text-gray-600">Pending Payments</p>
        </div>
      </div>

      {/* Child Selector (if multiple children) */}
      {children.length > 1 && (
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child.id)}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors',
                  selectedChild === child.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {child.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Current Child Overview */}
      {currentChild && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  {currentChild.profilePicture ? (
                    <img
                      src={currentChild.profilePicture}
                      alt={currentChild.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{currentChild.name}</h2>
                  <p className="text-gray-600">{currentChild.class}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    Last active: {currentChild.lastActive}
                  </p>
                </div>
              </div>
              <Link
                href={`/parent/children/${currentChild.id}`}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
              >
                View Details
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <BookOpen className="w-5 h-5 text-blue-600 mb-2" />
                <p className="text-2xl font-bold text-gray-900">{currentChild.enrolledCourses}</p>
                <p className="text-sm text-gray-600">Courses</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <TrendingUp className="w-5 h-5 text-green-600 mb-2" />
                <p className="text-2xl font-bold text-gray-900">{currentChild.overallProgress}%</p>
                <p className="text-sm text-gray-600">Progress</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <Trophy className="w-5 h-5 text-purple-600 mb-2" />
                <p className="text-2xl font-bold text-gray-900">{currentChild.avgTestScore}%</p>
                <p className="text-sm text-gray-600">Avg Score</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <Calendar className="w-5 h-5 text-orange-600 mb-2" />
                <p className="text-2xl font-bold text-gray-900">{currentChild.attendanceRate}%</p>
                <p className="text-sm text-gray-600">Attendance</p>
              </div>
            </div>

            {/* Quick Links for Child */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/parent/children/${currentChild.id}/homework`}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700"
              >
                <ClipboardList className="w-4 h-4" />
                Homework ({currentChild.pendingHomework} pending)
              </Link>
              <Link
                href={`/parent/children/${currentChild.id}/attendance`}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700"
              >
                <Calendar className="w-4 h-4" />
                Attendance
              </Link>
              <Link
                href={`/parent/children/${currentChild.id}/tests`}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700"
              >
                <FileText className="w-4 h-4" />
                Test Results
              </Link>
            </div>
          </div>

          {/* Recent Homework */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-orange-600" />
              Recent Homework
            </h3>
            <div className="space-y-3">
              {currentChild.recentHomework.length > 0 ? (
                currentChild.recentHomework.slice(0, 4).map((hw) => (
                  <div key={hw.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900 text-sm">{hw.title}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-600">
                        Due:{' '}
                        {new Date(hw.dueDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                      <span
                        className={cn(
                          'text-xs px-2 py-0.5 rounded-full',
                          hw.status === 'GRADED'
                            ? 'bg-green-100 text-green-700'
                            : hw.status === 'SUBMITTED'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-yellow-100 text-yellow-700'
                        )}
                      >
                        {hw.status === 'GRADED'
                          ? `${hw.grade}/${hw.maxMarks}`
                          : hw.status === 'SUBMITTED'
                            ? 'Submitted'
                            : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No recent homework</p>
              )}
            </div>
            <Link
              href={`/parent/children/${currentChild.id}/homework`}
              className="mt-4 block text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Homework
            </Link>
          </div>
        </div>
      )}

      {/* Bottom Section: Tests, Payments, Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Tests */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Upcoming Tests
          </h3>
          <div className="space-y-3">
            {upcomingTests.length > 0 ? (
              upcomingTests.map((test) => (
                <div key={test.id} className="p-3 bg-yellow-50 rounded-lg">
                  <p className="font-medium text-gray-900 text-sm">{test.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-600">
                      {test.date
                        ? new Date(test.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                          })
                        : 'TBD'}
                    </p>
                    <span className="text-xs font-medium text-yellow-700">
                      {test.totalMarks} marks
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No upcoming tests</p>
            )}
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              Recent Payments
            </h3>
            <Link
              href="/parent/payments"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentPayments.length > 0 ? (
              recentPayments.slice(0, 4).map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{payment.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(payment.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₹{payment.amount.toLocaleString('en-IN')}
                    </p>
                    <span
                      className={cn(
                        'text-xs px-2 py-0.5 rounded-full',
                        payment.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : payment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      )}
                    >
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No recent payments</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/parent/notices"
              className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Bell className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Notices</span>
            </Link>
            <Link
              href="/parent/alerts"
              className="flex flex-col items-center gap-2 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <span className="text-sm font-medium text-gray-900">Alerts</span>
            </Link>
            <Link
              href="/parent/schedule"
              className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Calendar className="w-6 h-6 text-green-600" />
              <span className="text-sm font-medium text-gray-900">Schedule</span>
            </Link>
            <Link
              href="/contact"
              className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Users className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-medium text-gray-900">Support</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Help Banner */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Need Help?</h3>
            <p className="text-blue-100 text-sm">
              Contact our support team for any queries regarding your child&apos;s education.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Contact Support
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
