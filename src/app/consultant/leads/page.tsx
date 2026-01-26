'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Search,
  Filter,
  UserPlus,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'

interface Lead {
  id: string
  studentName: string
  phone: string
  email: string | null
  courseInterest: string | null
  status: string
  statusLabel: string
  source: string
  notes: string | null
  referralLink: { code: string; name: string } | null
  demoScheduledAt: string | null
  enrolledAt: string | null
  lostAt: string | null
  lostReason: string | null
  totalFeeAmount: number | null
  commissionEarned: number | null
  createdAt: string
  updatedAt: string
}

interface LeadsResponse {
  leads: Lead[]
  statusCounts: Record<string, number>
  pagination: {
    total: number
    limit: number
    offset: number
    hasMore: boolean
  }
}

const statusFilters = [
  { value: 'all', label: 'All Leads' },
  { value: 'new_lead', label: 'New' },
  { value: 'demo_scheduled', label: 'Demo Scheduled' },
  { value: 'demo_completed', label: 'Demo Completed' },
  { value: 'offer_sent', label: 'Offer Sent' },
  { value: 'payment_pending', label: 'Payment Pending' },
  { value: 'enrolled', label: 'Enrolled' },
  { value: 'lost', label: 'Lost' },
]

const statusColors: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  NEW_LEAD: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
    border: 'border-blue-200',
  },
  DEMO_SCHEDULED: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    dot: 'bg-purple-500',
    border: 'border-purple-200',
  },
  DEMO_COMPLETED: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    dot: 'bg-indigo-500',
    border: 'border-indigo-200',
  },
  OFFER_SENT: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    dot: 'bg-orange-500',
    border: 'border-orange-200',
  },
  PAYMENT_PENDING: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    dot: 'bg-yellow-500',
    border: 'border-yellow-200',
  },
  ENROLLED: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    dot: 'bg-green-500',
    border: 'border-green-200',
  },
  LOST: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', border: 'border-red-200' },
}

export default function ConsultantLeads() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [data, setData] = useState<LeadsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [status, setStatus] = useState(searchParams.get('status') || 'all')
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (status !== 'all') params.set('status', status)
      if (debouncedSearch) params.set('search', debouncedSearch)
      params.set('limit', '50')

      const response = await fetch(`/api/consultant/leads?${params.toString()}`)
      const result = await response.json()

      if (!result.success) {
        setError(result.error || 'Failed to load leads')
        return
      }

      setData(result.data)
    } catch {
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }, [status, debouncedSearch])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams()
    if (status !== 'all') params.set('status', status)
    if (debouncedSearch) params.set('search', debouncedSearch)
    const queryString = params.toString()
    router.replace(`/consultant/leads${queryString ? `?${queryString}` : ''}`, { scroll: false })
  }, [status, debouncedSearch, router])

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600 mt-1">Track and manage your referral leads</p>
        </div>
        <Link
          href="/consultant/leads/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
        >
          <UserPlus className="w-4 h-4" />
          Add New Lead
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              {statusFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}{' '}
                  {data?.statusCounts?.[filter.value] !== undefined &&
                    `(${data.statusCounts[filter.value]})`}
                </option>
              ))}
            </select>
          </div>

          {/* Refresh */}
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {statusFilters.map((filter) => {
            const count = data?.statusCounts?.[filter.value] || 0
            const isActive = status === filter.value
            return (
              <button
                key={filter.value}
                onClick={() => handleStatusChange(filter.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
                <span className={`ml-1.5 ${isActive ? 'text-teal-200' : 'text-gray-500'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Leads</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchLeads}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && !data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 animate-pulse"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-24"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && data?.leads.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Leads Found</h2>
          <p className="text-gray-600 mb-6">
            {search
              ? `No leads matching "${search}"`
              : status !== 'all'
                ? `No leads with status "${statusFilters.find((f) => f.value === status)?.label}"`
                : 'Start by adding your first lead'}
          </p>
          <Link
            href="/consultant/leads/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            <UserPlus className="w-4 h-4" />
            Add New Lead
          </Link>
        </div>
      )}

      {/* Leads Grid */}
      {!loading && !error && data && data.leads.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.leads.map((lead) => {
              const colors = statusColors[lead.status] || statusColors.NEW_LEAD
              return (
                <Link
                  key={lead.id}
                  href={`/consultant/leads/${lead.id}`}
                  className={`bg-white rounded-xl p-5 shadow-sm border ${colors.border} hover:shadow-md transition-all group`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${colors.bg} ${colors.text}`}
                      >
                        {lead.studentName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                          {lead.studentName}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`}></span>
                          {lead.statusLabel}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors" />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{lead.phone}</span>
                    </div>
                    {lead.email && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {lead.courseInterest && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500">Interested in:</p>
                      <p className="text-sm font-medium text-gray-700 truncate">
                        {lead.courseInterest}
                      </p>
                    </div>
                  )}

                  {lead.referralLink && (
                    <div className="mt-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        via {lead.referralLink.name}
                      </span>
                    </div>
                  )}

                  {lead.commissionEarned && lead.commissionEarned > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm font-semibold text-green-600">
                        Commission: ₹{lead.commissionEarned.toLocaleString('en-IN')}
                      </p>
                    </div>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Pagination Info */}
          <div className="text-center text-sm text-gray-500">
            Showing {data.leads.length} of {data.pagination.total} leads
            {data.pagination.hasMore && (
              <button
                onClick={() => {
                  // Load more functionality can be added here
                }}
                className="ml-2 text-teal-600 hover:text-teal-700 font-medium"
              >
                Load more
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
