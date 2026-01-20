'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ClipboardList,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
  Calendar,
  Award,
  RefreshCw,
  Filter,
  Search,
  ChevronDown,
  BookOpen,
  MessageSquare,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Homework {
  id: string
  title: string
  description: string
  course: { id: string; name: string }
  chapter: { id: string; name: string } | null
  teacher: { id: string; name: string } | null
  dueDate: string
  maxMarks: number
  allowLateSubmission: boolean
  latePenaltyPercentage: number | null
  isOverdue: boolean
  submission: {
    id?: string
    status: string
    submittedAt: string | null
    grade: number | null
    feedback: string | null
    gradedAt: string | null
    isLate: boolean
    resubmissionCount?: number
  }
  statusLabel: string
}

interface Child {
  id: string
  name: string
  email: string
  currentClass: string
}

interface Stats {
  total: number
  pending: number
  submitted: number
  graded: number
  late: number
  avgScore: number
}

interface HomeworkData {
  child: Child
  homework: Homework[]
  stats: Stats
  pagination: {
    limit: number
    offset: number
    hasMore: boolean
  }
}

const statusFilters = [
  { value: 'all', label: 'All Homework' },
  { value: 'pending', label: 'Pending' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'graded', label: 'Graded' },
]

const getStatusConfig = (statusLabel: string) => {
  switch (statusLabel) {
    case 'Overdue':
      return {
        color: 'bg-red-100 text-red-700 border-red-200',
        icon: AlertTriangle,
        iconColor: 'text-red-500',
      }
    case 'Not Started':
      return {
        color: 'bg-gray-100 text-gray-700 border-gray-200',
        icon: Clock,
        iconColor: 'text-gray-500',
      }
    case 'In Progress':
      return {
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: Clock,
        iconColor: 'text-yellow-500',
      }
    case 'Submitted - Awaiting Review':
      return {
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: FileText,
        iconColor: 'text-blue-500',
      }
    case 'Graded':
      return {
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: CheckCircle,
        iconColor: 'text-green-500',
      }
    default:
      return {
        color: 'bg-gray-100 text-gray-700 border-gray-200',
        icon: Clock,
        iconColor: 'text-gray-500',
      }
  }
}

export default function ParentChildHomeworkPage() {
  const params = useParams()
  const router = useRouter()
  const childId = params.childId as string
  const sessionResult = useSession()
  const session = sessionResult?.data
  const status = sessionResult?.status ?? 'loading'

  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<HomeworkData | null>(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedHomework, setExpandedHomework] = useState<string | null>(null)

  const fetchHomework = useCallback(async () => {
    try {
      setRefreshing(true)
      const queryParams = new URLSearchParams({
        status: statusFilter,
        limit: '50',
      })

      const response = await fetch(`/api/parent/children/${childId}/homework?${queryParams}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch homework')
      }

      const result = await response.json()
      if (result.success) {
        setData(result.data)
      } else {
        throw new Error(result.error || 'Failed to fetch homework')
      }
    } catch (err) {
      console.error('Failed to fetch homework:', err)
      setError(err instanceof Error ? err.message : 'Failed to load homework data')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [childId, statusFilter])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchHomework()
    } else if (status === 'unauthenticated') {
      router.push('/sign-in')
    }
  }, [status, fetchHomework, router])

  const filteredHomework =
    data?.homework.filter((hw) => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        hw.title.toLowerCase().includes(query) ||
        hw.course.name.toLowerCase().includes(query) ||
        (hw.chapter?.name || '').toLowerCase().includes(query)
      )
    }) || []

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
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Homework</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError('')
              setLoading(true)
              fetchHomework()
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

  const { child, stats } = data

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
              <ClipboardList className="w-8 h-8 text-orange-600" />
              Homework Tracking
            </h1>
            <p className="text-gray-600 mt-1">
              {child.name} • {child.currentClass}
            </p>
          </div>
          <button
            onClick={fetchHomework}
            disabled={refreshing}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshCw className={cn('w-5 h-5', refreshing && 'animate-spin')} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <ClipboardList className="w-5 h-5 text-blue-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-xs text-gray-600">Total</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <Clock className="w-5 h-5 text-yellow-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
          <p className="text-xs text-gray-600">Pending</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <FileText className="w-5 h-5 text-blue-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{stats.submitted}</p>
          <p className="text-xs text-gray-600">Submitted</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{stats.graded}</p>
          <p className="text-xs text-gray-600">Graded</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <AlertTriangle className="w-5 h-5 text-red-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{stats.late}</p>
          <p className="text-xs text-gray-600">Late</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <Award className="w-5 h-5 text-purple-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{stats.avgScore}%</p>
          <p className="text-xs text-gray-600">Avg Score</p>
        </div>
      </div>

      {/* Overdue Alert */}
      {filteredHomework.some((hw) => hw.isOverdue) && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800">Overdue Homework</h3>
              <p className="text-sm text-red-700 mt-1">
                {child.name} has {filteredHomework.filter((hw) => hw.isOverdue).length} overdue
                assignment(s). Please ensure these are completed as soon as possible.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search homework..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {statusFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Homework List */}
      <div className="space-y-4">
        {filteredHomework.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Homework Found</h3>
            <p className="text-gray-600">
              {searchQuery
                ? 'No homework matches your search criteria.'
                : 'No homework assignments for the selected filter.'}
            </p>
          </div>
        ) : (
          filteredHomework.map((hw) => {
            const statusConfig = getStatusConfig(hw.statusLabel)
            const StatusIcon = statusConfig.icon
            const isExpanded = expandedHomework === hw.id

            return (
              <div
                key={hw.id}
                className={cn(
                  'bg-white rounded-xl shadow-sm border overflow-hidden transition-all',
                  hw.isOverdue ? 'border-red-300' : 'border-gray-200'
                )}
              >
                <button
                  onClick={() => setExpandedHomework(isExpanded ? null : hw.id)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900 truncate">{hw.title}</h3>
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border',
                            statusConfig.color
                          )}
                        >
                          <StatusIcon className={cn('w-3 h-3', statusConfig.iconColor)} />
                          {hw.statusLabel}
                        </span>
                        {hw.submission.isLate && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
                            Late
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          {hw.course.name}
                        </span>
                        {hw.chapter && (
                          <span className="hidden sm:block">• {hw.chapter.name}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Due: {new Date(hw.dueDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}</span>
                      </div>
                      {hw.submission.grade !== null && (
                        <p className="mt-1 text-lg font-semibold text-green-600">
                          {hw.submission.grade}/{hw.maxMarks}
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-gray-400 mt-2 mx-auto transition-transform',
                      isExpanded && 'rotate-180'
                    )}
                  />
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                    <div className="pt-4 space-y-4">
                      {/* Description */}
                      {hw.description && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
                          <p className="text-sm text-gray-600">{hw.description}</p>
                        </div>
                      )}

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Max Marks</p>
                          <p className="font-medium text-gray-900">{hw.maxMarks}</p>
                        </div>
                        {hw.teacher && (
                          <div>
                            <p className="text-xs text-gray-500">Teacher</p>
                            <p className="font-medium text-gray-900">{hw.teacher.name}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-gray-500">Late Submission</p>
                          <p className="font-medium text-gray-900">
                            {hw.allowLateSubmission
                              ? `Allowed (${hw.latePenaltyPercentage || 0}% penalty)`
                              : 'Not Allowed'}
                          </p>
                        </div>
                        {hw.submission.submittedAt && (
                          <div>
                            <p className="text-xs text-gray-500">Submitted On</p>
                            <p className="font-medium text-gray-900">
                              {new Date(hw.submission.submittedAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Feedback Section */}
                      {hw.submission.feedback && (
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="w-4 h-4 text-blue-600" />
                            <h4 className="text-sm font-medium text-gray-900">Teacher Feedback</h4>
                          </div>
                          <p className="text-sm text-gray-700">{hw.submission.feedback}</p>
                          {hw.submission.gradedAt && (
                            <p className="text-xs text-gray-500 mt-2">
                              Graded on:{' '}
                              {new Date(hw.submission.gradedAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Grade Display */}
                      {hw.submission.grade !== null && (
                        <div className="flex items-center justify-between bg-green-50 rounded-lg p-4 border border-green-200">
                          <div>
                            <p className="text-sm text-green-800">Grade Received</p>
                            <p className="text-2xl font-bold text-green-700">
                              {hw.submission.grade}/{hw.maxMarks}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-green-800">Percentage</p>
                            <p className="text-2xl font-bold text-green-700">
                              {Math.round((hw.submission.grade / hw.maxMarks) * 100)}%
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Load More */}
      {data.pagination.hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              // Could implement load more functionality
            }}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Load More
          </button>
        </div>
      )}

      {/* Legend */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Status Legend</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Not Started', color: 'bg-gray-100 text-gray-700' },
            { label: 'In Progress', color: 'bg-yellow-100 text-yellow-700' },
            { label: 'Submitted', color: 'bg-blue-100 text-blue-700' },
            { label: 'Graded', color: 'bg-green-100 text-green-700' },
            { label: 'Overdue', color: 'bg-red-100 text-red-700' },
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
