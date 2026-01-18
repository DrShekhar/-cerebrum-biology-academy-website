'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  AlertTriangle,
  AlertOctagon,
  AlertCircle,
  Info,
  Filter,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  BookOpen,
  ClipboardList,
  CreditCard,
  User,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle2,
  Clock,
} from 'lucide-react'

type ConcernSeverity = 'critical' | 'high' | 'medium' | 'low'
type ConcernCategory = 'attendance' | 'academic' | 'homework' | 'behavior' | 'payment'
type ConcernStatus = 'active' | 'improving' | 'resolved'

interface Concern {
  id: string
  childId: string
  childName: string
  category: ConcernCategory
  severity: ConcernSeverity
  title: string
  description: string
  details: string[]
  status: ConcernStatus
  trend: 'improving' | 'stable' | 'declining'
  actionRecommended?: string
  reportedBy?: string
  reportedAt: string
  lastUpdated: string
}

interface Child {
  id: string
  name: string
}

interface Summary {
  total: number
  critical: number
  high: number
  medium: number
  low: number
  byCategory: Record<ConcernCategory, number>
  byChild: {
    childId: string
    childName: string
    total: number
    critical: number
  }[]
}

export default function ParentConcernsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [concerns, setConcerns] = useState<Concern[]>([])
  const [children, setChildren] = useState<Child[]>([])
  const [summary, setSummary] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [childFilter, setChildFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [severityFilter, setSeverityFilter] = useState<string>('all')
  const [expandedConcern, setExpandedConcern] = useState<string | null>(null)

  const fetchConcerns = useCallback(async () => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams()
      if (childFilter !== 'all') queryParams.set('childId', childFilter)
      if (categoryFilter !== 'all') queryParams.set('category', categoryFilter)
      if (severityFilter !== 'all') queryParams.set('severity', severityFilter)

      const response = await fetch(`/api/parent/concerns?${queryParams.toString()}`)
      const data = await response.json()

      if (data.success) {
        setConcerns(data.data.concerns)
        setSummary(data.data.summary)
        setChildren(data.data.children)
        setError(null)
      } else {
        setError(data.error || 'Failed to fetch concerns')
      }
    } catch {
      setError('Failed to load concerns')
    } finally {
      setLoading(false)
    }
  }, [childFilter, categoryFilter, severityFilter])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchConcerns()
    }
  }, [status, fetchConcerns])

  const getSeverityConfig = (severity: ConcernSeverity) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          badge: 'bg-red-100 text-red-700',
          icon: <AlertOctagon className="h-5 w-5 text-red-600" />,
        }
      case 'high':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          text: 'text-orange-700',
          badge: 'bg-orange-100 text-orange-700',
          icon: <AlertTriangle className="h-5 w-5 text-orange-600" />,
        }
      case 'medium':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-700',
          badge: 'bg-yellow-100 text-yellow-700',
          icon: <AlertCircle className="h-5 w-5 text-yellow-600" />,
        }
      case 'low':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-700',
          badge: 'bg-blue-100 text-blue-700',
          icon: <Info className="h-5 w-5 text-blue-600" />,
        }
    }
  }

  const getCategoryConfig = (category: ConcernCategory) => {
    switch (category) {
      case 'attendance':
        return {
          icon: <Calendar className="h-4 w-4" />,
          color: 'bg-purple-100 text-purple-700',
          label: 'Attendance',
          link: '/parent/attendance',
        }
      case 'academic':
        return {
          icon: <ClipboardList className="h-4 w-4" />,
          color: 'bg-teal-100 text-teal-700',
          label: 'Academic',
          link: '/parent/tests',
        }
      case 'homework':
        return {
          icon: <BookOpen className="h-4 w-4" />,
          color: 'bg-blue-100 text-blue-700',
          label: 'Homework',
          link: '/parent/homework',
        }
      case 'behavior':
        return {
          icon: <User className="h-4 w-4" />,
          color: 'bg-indigo-100 text-indigo-700',
          label: 'Behavior',
          link: null,
        }
      case 'payment':
        return {
          icon: <CreditCard className="h-4 w-4" />,
          color: 'bg-orange-100 text-orange-700',
          label: 'Payment',
          link: '/parent/payments',
        }
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: ConcernStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <Clock className="h-3 w-3" />
            Active
          </span>
        )
      case 'improving':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <TrendingUp className="h-3 w-3" />
            Improving
          </span>
        )
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            <CheckCircle2 className="h-3 w-3" />
            Resolved
          </span>
        )
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading concerns...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-red-700 mb-2">Error Loading Concerns</h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => router.push('/parent/dashboard')}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/parent/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">Concerns & Issues</h1>
              <p className="text-sm text-gray-500">
                {summary?.total || 0} concerns • {summary?.critical || 0} critical
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertOctagon className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">{summary.critical}</p>
                  <p className="text-xs text-gray-500">Critical</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">{summary.high}</p>
                  <p className="text-xs text-gray-500">High Priority</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{summary.medium}</p>
                  <p className="text-xs text-gray-500">Medium</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Info className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{summary.low}</p>
                  <p className="text-xs text-gray-500">Low</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Breakdown */}
        {summary && summary.total > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Concerns by Category</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(summary.byCategory).map(([category, count]) => {
                if (count === 0) return null
                const config = getCategoryConfig(category as ConcernCategory)
                return (
                  <div
                    key={category}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${config.color}`}
                  >
                    {config.icon}
                    <span className="text-sm font-medium">{config.label}</span>
                    <span className="text-sm font-bold">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter Concerns</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {/* Child Filter */}
            {children.length > 1 && (
              <select
                value={childFilter}
                onChange={(e) => setChildFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="all">All Children</option>
                {children.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.name}
                  </option>
                ))}
              </select>
            )}

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="all">All Categories</option>
              <option value="attendance">Attendance</option>
              <option value="academic">Academic</option>
              <option value="homework">Homework</option>
              <option value="payment">Payment</option>
            </select>

            {/* Severity Filter */}
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Concerns List */}
        {concerns.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Concerns Found</h3>
            <p className="text-gray-500">
              {childFilter !== 'all' || categoryFilter !== 'all' || severityFilter !== 'all'
                ? 'No concerns match your current filters'
                : "Great news! There are no active concerns for your children"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {concerns.map((concern) => {
              const severityConfig = getSeverityConfig(concern.severity)
              const categoryConfig = getCategoryConfig(concern.category)
              const isExpanded = expandedConcern === concern.id

              return (
                <div
                  key={concern.id}
                  className={`rounded-xl border overflow-hidden ${severityConfig.bg} ${severityConfig.border}`}
                >
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => setExpandedConcern(isExpanded ? null : concern.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-0.5">{severityConfig.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold text-gray-900">{concern.title}</h3>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${severityConfig.badge}`}
                          >
                            {concern.severity.charAt(0).toUpperCase() + concern.severity.slice(1)}
                          </span>
                          {getStatusBadge(concern.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{concern.description}</p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${categoryConfig.color}`}
                          >
                            {categoryConfig.icon}
                            {categoryConfig.label}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                            <User className="h-3.5 w-3.5" />
                            {concern.childName}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                            {getTrendIcon(concern.trend)}
                            {concern.trend.charAt(0).toUpperCase() + concern.trend.slice(1)}
                          </span>
                        </div>
                      </div>
                      <button className="flex-shrink-0 p-1 hover:bg-white/50 rounded transition-colors">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-0">
                      <div className="ml-9 border-t border-gray-200 pt-4">
                        {/* Details */}
                        {concern.details.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                              Details
                            </h4>
                            <ul className="space-y-1">
                              {concern.details.map((detail, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Recommended Action */}
                        {concern.actionRecommended && (
                          <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">
                              Recommended Action
                            </h4>
                            <p className="text-sm text-gray-700">{concern.actionRecommended}</p>
                          </div>
                        )}

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>
                            Reported by {concern.reportedBy} on {formatDate(concern.reportedAt)}
                          </span>
                          {categoryConfig.link && (
                            <Link
                              href={`${categoryConfig.link}${concern.childId ? `?childId=${concern.childId}` : ''}`}
                              className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 font-medium"
                            >
                              View {categoryConfig.label} Details
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Child Summary (if multiple children) */}
        {summary && summary.byChild.length > 1 && (
          <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Concerns by Child</h3>
            <div className="space-y-3">
              {summary.byChild.map((child) => (
                <div
                  key={child.childId}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-teal-600" />
                    </div>
                    <span className="font-medium text-gray-900">{child.childName}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {child.critical > 0 && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                        {child.critical} Critical
                      </span>
                    )}
                    <span className="text-sm text-gray-600">{child.total} total</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">About Concerns</h4>
              <p className="text-sm text-blue-700">
                These concerns are automatically generated based on your child&apos;s attendance,
                test scores, homework completion, and payment status. They help identify areas that
                may need attention. For specific teacher-reported concerns or to discuss any
                issues, please contact the school directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
