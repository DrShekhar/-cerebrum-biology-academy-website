'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  IndianRupee,
  Clock,
  CheckCircle2,
  XCircle,
  Filter,
  RefreshCw,
  Calendar,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Phone,
} from 'lucide-react'

interface Commission {
  id: string
  amount: number
  percentage: number
  baseAmount: number
  status: string
  statusLabel: string
  paidAt: string | null
  paymentRef: string | null
  referral: {
    id: string
    studentName: string
    phone: string
    courseInterest: string | null
    status: string
    enrolledAt: string | null
  } | null
  createdAt: string
  updatedAt: string
}

interface Summary {
  totalEarned: number
  totalPending: number
  totalPaid: number
  totalCancelled: number
  countPending: number
  countPaid: number
  countCancelled: number
}

interface MonthlyData {
  month: string
  year: number
  earned: number
  paid: number
  pending: number
  count: number
}

interface CommissionsResponse {
  commissions: Commission[]
  summary: Summary
  monthlyBreakdown: MonthlyData[]
  statusCounts: Record<string, number>
  pagination: {
    total: number
    limit: number
    offset: number
    hasMore: boolean
  }
}

const statusFilters = [
  { value: 'all', label: 'All Commissions' },
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'cancelled', label: 'Cancelled' },
]

const statusColors: Record<string, { bg: string; text: string; icon: typeof CheckCircle2 }> = {
  PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
  PAID: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2 },
  CANCELLED: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle },
}

export default function CommissionsPage() {
  const [data, setData] = useState<CommissionsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [status, setStatus] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const fetchCommissions = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (status !== 'all') params.set('status', status)
      if (dateFrom) params.set('dateFrom', dateFrom)
      if (dateTo) params.set('dateTo', dateTo)
      params.set('limit', '50')

      const response = await fetch(`/api/consultant/commissions?${params.toString()}`)
      const result = await response.json()

      if (!result.success) {
        setError(result.error || 'Failed to load commissions')
        return
      }

      setData(result.data)
    } catch {
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }, [status, dateFrom, dateTo])

  useEffect(() => {
    fetchCommissions()
  }, [fetchCommissions])

  const clearFilters = () => {
    setStatus('all')
    setDateFrom('')
    setDateTo('')
  }

  // Calculate max for chart scaling
  const maxMonthlyAmount = data?.monthlyBreakdown
    ? Math.max(...data.monthlyBreakdown.map((m) => m.earned), 1)
    : 1

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Commission Reports</h1>
        <p className="text-gray-600 mt-1">Track your earnings from successful referrals</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-teal-600" />
            </div>
            <span className="text-sm text-gray-600">Total Earned</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {loading ? (
              <span className="inline-block w-24 h-8 bg-gray-200 rounded animate-pulse"></span>
            ) : (
              `₹${(data?.summary.totalEarned || 0).toLocaleString('en-IN')}`
            )}
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Paid</span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {loading ? (
              <span className="inline-block w-24 h-8 bg-gray-200 rounded animate-pulse"></span>
            ) : (
              `₹${(data?.summary.totalPaid || 0).toLocaleString('en-IN')}`
            )}
          </p>
          <p className="text-xs text-gray-500 mt-1">{data?.summary.countPaid || 0} commissions</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-sm text-gray-600">Pending</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">
            {loading ? (
              <span className="inline-block w-24 h-8 bg-gray-200 rounded animate-pulse"></span>
            ) : (
              `₹${(data?.summary.totalPending || 0).toLocaleString('en-IN')}`
            )}
          </p>
          <p className="text-xs text-gray-500 mt-1">{data?.summary.countPending || 0} pending</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm text-gray-600">Cancelled</span>
          </div>
          <p className="text-2xl font-bold text-red-600">
            {loading ? (
              <span className="inline-block w-24 h-8 bg-gray-200 rounded animate-pulse"></span>
            ) : (
              `₹${(data?.summary.totalCancelled || 0).toLocaleString('en-IN')}`
            )}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {data?.summary.countCancelled || 0} cancelled
          </p>
        </div>
      </div>

      {/* Monthly Breakdown Chart */}
      {!loading && data?.monthlyBreakdown && data.monthlyBreakdown.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            <h2 className="text-lg font-semibold text-gray-900">6-Month Trend</h2>
          </div>
          <div className="flex items-end justify-between gap-2 h-40">
            {data.monthlyBreakdown.map((month) => {
              const heightPercent = (month.earned / maxMonthlyAmount) * 100
              return (
                <div
                  key={`${month.month}-${month.year}`}
                  className="flex-1 flex flex-col items-center"
                >
                  <div
                    className="relative w-full flex flex-col items-center"
                    style={{ height: '120px' }}
                  >
                    <div
                      className="w-full max-w-[40px] bg-teal-500 rounded-t transition-all hover:bg-teal-600"
                      style={{ height: `${Math.max(heightPercent, 2)}%` }}
                      title={`₹${month.earned.toLocaleString('en-IN')}`}
                    ></div>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-xs font-medium text-gray-600">{month.month}</p>
                    <p className="text-[10px] text-gray-400">{month.year}</p>
                  </div>
                  <p className="text-xs font-semibold text-gray-700 mt-1">
                    ₹{month.earned >= 1000 ? `${(month.earned / 1000).toFixed(1)}k` : month.earned}
                  </p>
                </div>
              )
            })}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-teal-500"></div>
              <span className="text-sm text-gray-600">Commissions Earned</span>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              {statusFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}{' '}
                  {data?.statusCounts?.[filter.value] !== undefined
                    ? `(${data.statusCounts[filter.value]})`
                    : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="From"
            />
            <span className="text-gray-400">to</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Clear Filters */}
          {(status !== 'all' || dateFrom || dateTo) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2.5 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Clear Filters
            </button>
          )}

          {/* Refresh */}
          <button
            onClick={fetchCommissions}
            disabled={loading}
            className="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 md:ml-auto"
          >
            <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Commissions</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchCommissions}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && !data && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && data?.commissions.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <IndianRupee className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Commissions Found</h2>
          <p className="text-gray-600 mb-6">
            {status !== 'all' || dateFrom || dateTo
              ? 'Try adjusting your filters to see more results.'
              : 'Commissions will appear here once your leads enroll.'}
          </p>
          {(status !== 'all' || dateFrom || dateTo) && (
            <button
              onClick={clearFilters}
              className="px-6 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Commissions List */}
      {!loading && !error && data && data.commissions.length > 0 && (
        <div className="space-y-3">
          {data.commissions.map((commission) => {
            const statusStyle = statusColors[commission.status] || statusColors.PENDING
            const StatusIcon = statusStyle.icon

            return (
              <div
                key={commission.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Referral Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-semibold text-lg">
                      {commission.referral?.studentName.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div>
                      {commission.referral ? (
                        <Link
                          href={`/consultant/leads/${commission.referral.id}`}
                          className="font-semibold text-gray-900 hover:text-teal-600 transition-colors flex items-center gap-1"
                        >
                          {commission.referral.studentName}
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <span className="font-semibold text-gray-900">Unknown Student</span>
                      )}
                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
                        {commission.referral?.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5" />
                            {commission.referral.phone}
                          </span>
                        )}
                        {commission.referral?.courseInterest && (
                          <span className="hidden sm:inline">
                            {commission.referral.courseInterest}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Commission Details */}
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ₹{commission.amount.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {commission.percentage}% of ₹{commission.baseAmount.toLocaleString('en-IN')}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${statusStyle.bg} ${statusStyle.text}`}
                    >
                      <StatusIcon className="w-4 h-4" />
                      {commission.statusLabel}
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Created: {new Date(commission.createdAt).toLocaleDateString()}
                  </span>
                  {commission.paidAt && (
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      Paid: {new Date(commission.paidAt).toLocaleDateString()}
                    </span>
                  )}
                  {commission.paymentRef && (
                    <span className="text-gray-400">Ref: {commission.paymentRef}</span>
                  )}
                </div>
              </div>
            )
          })}

          {/* Pagination Info */}
          {data.pagination && (
            <div className="text-center text-sm text-gray-500 pt-4">
              Showing {data.commissions.length} of {data.pagination.total} commissions
              {data.pagination.hasMore && (
                <button
                  onClick={() => {
                    // Load more can be implemented here
                  }}
                  className="ml-2 text-teal-600 hover:text-teal-700 font-medium"
                >
                  Load more
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
