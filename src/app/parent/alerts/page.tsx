'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Bell,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Info,
  Filter,
  Calendar,
  BookOpen,
  ClipboardList,
  CreditCard,
  ChevronRight,
  User,
  XCircle,
} from 'lucide-react'

interface Alert {
  id: string
  type: 'warning' | 'info' | 'success' | 'error'
  category: 'attendance' | 'homework' | 'test' | 'payment' | 'general'
  title: string
  message: string
  childId?: string
  childName?: string
  priority: 'high' | 'medium' | 'low'
  actionUrl?: string
  actionLabel?: string
  createdAt: string
  isRead: boolean
}

interface Child {
  id: string
  name: string
  class: string
}

interface Summary {
  total: number
  unread: number
  high: number
  medium: number
  low: number
  byCategory: {
    attendance: number
    homework: number
    test: number
    payment: number
    general: number
  }
}

export default function ParentAlertsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [alerts, setAlerts] = useState<Alert[]>([])
  const [children, setChildren] = useState<Child[]>([])
  const [summary, setSummary] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [childFilter, setChildFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams()
      if (childFilter !== 'all') queryParams.set('childId', childFilter)
      if (categoryFilter !== 'all') queryParams.set('category', categoryFilter)

      const response = await fetch(`/api/parent/alerts?${queryParams.toString()}`)
      const data = await response.json()

      if (data.success) {
        setAlerts(data.data.alerts)
        setSummary(data.data.summary)
        setChildren(data.data.children)
        setError(null)
      } else {
        setError(data.error || 'Failed to fetch alerts')
      }
    } catch {
      setError('Failed to load alerts')
    } finally {
      setLoading(false)
    }
  }, [childFilter, categoryFilter])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchAlerts()
    }
  }, [status, fetchAlerts])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'attendance':
        return <Calendar className="h-4 w-4" />
      case 'homework':
        return <BookOpen className="h-4 w-4" />
      case 'test':
        return <ClipboardList className="h-4 w-4" />
      case 'payment':
        return <CreditCard className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'attendance':
        return 'bg-purple-100 text-purple-700'
      case 'homework':
        return 'bg-blue-100 text-blue-700'
      case 'test':
        return 'bg-teal-100 text-teal-700'
      case 'payment':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
            High
          </span>
        )
      case 'medium':
        return (
          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
            Medium
          </span>
        )
      case 'low':
        return (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">
            Low
          </span>
        )
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  }

  const filteredAlerts = alerts.filter((alert) => {
    if (priorityFilter !== 'all' && alert.priority !== priorityFilter) return false
    return true
  })

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading alerts...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/sign-in')
    return null
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-red-700 mb-2">Error Loading Alerts</h2>
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
              <h1 className="text-xl font-bold text-gray-900">Alerts & Notifications</h1>
              <p className="text-sm text-gray-500">
                {summary?.total || 0} alerts • {summary?.high || 0} require attention
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
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">{summary.high}</p>
                  <p className="text-xs text-gray-500">High Priority</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{summary.medium}</p>
                  <p className="text-xs text-gray-500">Medium Priority</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{summary.byCategory.homework}</p>
                  <p className="text-xs text-gray-500">Homework</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">{summary.byCategory.payment}</p>
                  <p className="text-xs text-gray-500">Payments</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter Alerts</span>
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
              <option value="homework">Homework</option>
              <option value="test">Tests</option>
              <option value="payment">Payments</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Alerts List */}
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">All Clear!</h3>
            <p className="text-gray-500">No alerts matching your filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-xl border overflow-hidden ${getTypeBg(alert.type)}`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-0.5">{getTypeIcon(alert.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                        {getPriorityBadge(alert.priority)}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{alert.message}</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(alert.category)}`}
                        >
                          {getCategoryIcon(alert.category)}
                          {alert.category.charAt(0).toUpperCase() + alert.category.slice(1)}
                        </span>
                        {alert.childName && (
                          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                            <User className="h-3.5 w-3.5" />
                            {alert.childName}
                          </span>
                        )}
                        <span className="text-xs text-gray-400">{formatDate(alert.createdAt)}</span>
                      </div>
                    </div>
                    {alert.actionUrl && (
                      <Link
                        href={alert.actionUrl}
                        className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {alert.actionLabel || 'View'}
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
