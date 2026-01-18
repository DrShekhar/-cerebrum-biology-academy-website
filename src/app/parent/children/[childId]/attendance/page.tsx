'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Users,
  Timer,
  BarChart3,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AttendanceRecord {
  id: string
  date: string
  status: string
  statusLabel: string
  session: {
    id: string
    title: string
    scheduledDate: string
    startTime: string | null
    endTime: string | null
    course: { id: string; name: string }
  }
  checkInTime: string | null
  checkOutTime: string | null
  duration: number | null
  isLate: boolean
  lateBy: number | null
  isExcused: boolean
  notes: string | null
  participationScore: number | null
}

interface Child {
  id: string
  name: string
  email: string
  currentClass: string
}

interface Stats {
  totalSessions: number
  present: number
  absent: number
  late: number
  excused: number
  attendanceRate: number
  punctualityRate: number
  totalDuration: number
  avgDurationPerSession: number
}

interface WeeklyData {
  weekStart: string
  weekEnd: string
  present: number
  absent: number
  late: number
  total: number
  rate: number
}

interface MonthlyData {
  month: string
  year: number
  present: number
  absent: number
  total: number
  rate: number
}

interface AttendanceData {
  child: Child
  attendance: AttendanceRecord[]
  stats: Stats
  weeklyBreakdown: WeeklyData[]
  monthlyTrend: MonthlyData[]
  period: {
    name: string
    startDate: string
    endDate: string
  }
  pagination: {
    limit: number
    offset: number
    hasMore: boolean
  }
}

const periodFilters = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Last 7 Days' },
  { value: 'month', label: 'Last 30 Days' },
  { value: 'all', label: 'All Time' },
]

const getStatusConfig = (statusLabel: string, isLate: boolean) => {
  if (isLate) {
    return {
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
    }
  }
  switch (statusLabel) {
    case 'Present':
      return {
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: CheckCircle,
        iconColor: 'text-green-500',
      }
    case 'Absent':
      return {
        color: 'bg-red-100 text-red-700 border-red-200',
        icon: XCircle,
        iconColor: 'text-red-500',
      }
    case 'Late':
      return {
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: AlertTriangle,
        iconColor: 'text-yellow-500',
      }
    case 'Excused':
      return {
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: Clock,
        iconColor: 'text-blue-500',
      }
    case 'Half Day':
      return {
        color: 'bg-orange-100 text-orange-700 border-orange-200',
        icon: Clock,
        iconColor: 'text-orange-500',
      }
    default:
      return {
        color: 'bg-gray-100 text-gray-700 border-gray-200',
        icon: Clock,
        iconColor: 'text-gray-500',
      }
  }
}

export default function ParentChildAttendancePage() {
  const params = useParams()
  const router = useRouter()
  const childId = params.childId as string
  const sessionResult = useSession()
  const session = sessionResult?.data
  const status = sessionResult?.status ?? 'loading'

  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<AttendanceData | null>(null)
  const [periodFilter, setPeriodFilter] = useState('month')
  const [activeTab, setActiveTab] = useState<'records' | 'weekly' | 'monthly'>('records')

  const fetchAttendance = useCallback(async () => {
    try {
      setRefreshing(true)
      const queryParams = new URLSearchParams({
        period: periodFilter,
        limit: '50',
      })

      const response = await fetch(`/api/parent/children/${childId}/attendance?${queryParams}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch attendance')
      }

      const result = await response.json()
      if (result.success) {
        setData(result.data)
      } else {
        throw new Error(result.error || 'Failed to fetch attendance')
      }
    } catch (err) {
      console.error('Failed to fetch attendance:', err)
      setError(err instanceof Error ? err.message : 'Failed to load attendance data')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [childId, periodFilter])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchAttendance()
    } else if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, fetchAttendance, router])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Attendance</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError('')
              setLoading(true)
              fetchAttendance()
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!data) return null

  const { child, attendance, stats, weeklyBreakdown, monthlyTrend } = data

  // Determine attendance status color
  const getAttendanceRateColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600'
    if (rate >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/parent/dashboard"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-purple-600" />
              Attendance Reports
            </h1>
            <p className="text-gray-600 mt-1">
              {child.name} • {child.currentClass}
            </p>
          </div>
          <button
            onClick={fetchAttendance}
            disabled={refreshing}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshCw className={cn('w-5 h-5', refreshing && 'animate-spin')} />
          </button>
        </div>
      </div>

      {/* Main Stats Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Attendance Rate - Large Display */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
            <p className={cn('text-5xl font-bold', getAttendanceRateColor(stats.attendanceRate))}>
              {stats.attendanceRate}%
            </p>
            <p className="text-sm text-gray-600 mt-2">Attendance Rate</p>
            {stats.attendanceRate < 75 && (
              <div className="flex items-center gap-1 mt-2 text-red-600 text-xs">
                <AlertTriangle className="w-3 h-3" />
                Below 75%
              </div>
            )}
          </div>

          {/* Other Stats */}
          <div className="col-span-2 md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-900">{stats.present}</p>
              <p className="text-xs text-gray-600">Present</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <XCircle className="w-5 h-5 text-red-600 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-900">{stats.absent}</p>
              <p className="text-xs text-gray-600">Absent</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-900">{stats.late}</p>
              <p className="text-xs text-gray-600">Late</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <Timer className="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-900">{stats.punctualityRate}%</p>
              <p className="text-xs text-gray-600">Punctuality</p>
            </div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-gray-900">{stats.totalSessions}</p>
            <p className="text-xs text-gray-600">Total Sessions</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">{stats.excused}</p>
            <p className="text-xs text-gray-600">Excused</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {stats.avgDurationPerSession > 0
                ? `${Math.floor(stats.avgDurationPerSession / 60)}h ${stats.avgDurationPerSession % 60}m`
                : 'N/A'}
            </p>
            <p className="text-xs text-gray-600">Avg Duration</p>
          </div>
        </div>
      </div>

      {/* Low Attendance Alert */}
      {stats.attendanceRate < 75 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800">Low Attendance Warning</h3>
              <p className="text-sm text-red-700 mt-1">
                {child.name}&apos;s attendance rate is below 75%. Regular attendance is crucial for
                academic success. Please ensure your child attends all scheduled classes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Period Filter & Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { key: 'records', label: 'Daily Records', icon: Calendar },
              { key: 'weekly', label: 'Weekly', icon: BarChart3 },
              { key: 'monthly', label: 'Monthly Trend', icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Period Filter */}
          <div className="relative">
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="pl-4 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {periodFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Content Based on Tab */}
      {activeTab === 'records' && (
        <div className="space-y-3">
          {attendance.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Attendance Records</h3>
              <p className="text-gray-600">No attendance records found for the selected period.</p>
            </div>
          ) : (
            attendance.map((record) => {
              const statusConfig = getStatusConfig(record.statusLabel, record.isLate)
              const StatusIcon = statusConfig.icon

              return (
                <div
                  key={record.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900">{record.session.title}</h3>
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border',
                            statusConfig.color
                          )}
                        >
                          <StatusIcon className={cn('w-3 h-3', statusConfig.iconColor)} />
                          {record.statusLabel}
                          {record.isLate && record.statusLabel !== 'Late' && ' (Late)'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{record.session.course.name}</p>
                      {record.notes && (
                        <p className="text-sm text-gray-500 mt-2 italic">&quot;{record.notes}&quot;</p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(record.session.scheduledDate).toLocaleDateString('en-IN', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                      {record.checkInTime && (
                        <p className="text-xs text-gray-500 mt-1">
                          Check-in:{' '}
                          {new Date(record.checkInTime).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      )}
                      {record.lateBy !== null && record.lateBy > 0 && (
                        <p className="text-xs text-yellow-600 mt-1">Late by {record.lateBy} min</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {activeTab === 'weekly' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Weekly Breakdown</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {weeklyBreakdown.length === 0 ? (
              <div className="p-8 text-center">
                <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No weekly data available.</p>
              </div>
            ) : (
              weeklyBreakdown.map((week, index) => (
                <div key={index} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(week.weekStart).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}{' '}
                      -{' '}
                      {new Date(week.weekEnd).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                    <span className={cn('text-sm font-bold', getAttendanceRateColor(week.rate))}>
                      {week.rate}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full',
                          week.rate >= 90
                            ? 'bg-green-500'
                            : week.rate >= 75
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        )}
                        style={{ width: `${week.rate}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Present: {week.present}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      Absent: {week.absent}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                      Late: {week.late}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'monthly' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">6-Month Attendance Trend</h3>
          </div>
          {monthlyTrend.length === 0 ? (
            <div className="p-8 text-center">
              <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No monthly data available.</p>
            </div>
          ) : (
            <>
              {/* Simple Bar Chart */}
              <div className="p-4">
                <div className="flex items-end justify-between gap-2 h-40">
                  {monthlyTrend.map((month, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className={cn(
                          'w-full max-w-12 rounded-t-lg transition-all',
                          month.rate >= 90
                            ? 'bg-green-500'
                            : month.rate >= 75
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        )}
                        style={{ height: `${Math.max(month.rate, 5)}%` }}
                      />
                      <p className="text-xs font-medium text-gray-600 mt-2">{month.month}</p>
                      <p className={cn('text-sm font-bold', getAttendanceRateColor(month.rate))}>
                        {month.rate}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trend Indicator */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                {monthlyTrend.length >= 2 && (
                  <div className="flex items-center gap-2">
                    {monthlyTrend[monthlyTrend.length - 1].rate >
                    monthlyTrend[monthlyTrend.length - 2].rate ? (
                      <>
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-green-700">
                          Attendance improving - up{' '}
                          {monthlyTrend[monthlyTrend.length - 1].rate -
                            monthlyTrend[monthlyTrend.length - 2].rate}
                          % from last month
                        </span>
                      </>
                    ) : monthlyTrend[monthlyTrend.length - 1].rate <
                      monthlyTrend[monthlyTrend.length - 2].rate ? (
                      <>
                        <TrendingDown className="w-5 h-5 text-red-600" />
                        <span className="text-sm text-red-700">
                          Attendance declining - down{' '}
                          {monthlyTrend[monthlyTrend.length - 2].rate -
                            monthlyTrend[monthlyTrend.length - 1].rate}
                          % from last month
                        </span>
                      </>
                    ) : (
                      <span className="text-sm text-gray-600">
                        Attendance stable from last month
                      </span>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Attendance Status</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Present', color: 'bg-green-100 text-green-700' },
            { label: 'Absent', color: 'bg-red-100 text-red-700' },
            { label: 'Late', color: 'bg-yellow-100 text-yellow-700' },
            { label: 'Excused', color: 'bg-blue-100 text-blue-700' },
            { label: 'Half Day', color: 'bg-orange-100 text-orange-700' },
          ].map((status) => (
            <span
              key={status.label}
              className={cn('px-3 py-1 rounded-full text-xs font-medium', status.color)}
            >
              {status.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
