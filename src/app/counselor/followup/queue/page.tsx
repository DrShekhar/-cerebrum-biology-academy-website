'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { showToast } from '@/lib/toast'

type QueueStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'SKIPPED' | 'CANCELLED'
type ActionType = 'EMAIL' | 'WHATSAPP' | 'SMS' | 'CALL_TASK' | 'NOTIFICATION' | 'TASK'

interface QueueItem {
  id: string
  leadId: string
  ruleId: string
  status: QueueStatus
  scheduledFor: string
  processedAt?: string
  error?: string
  retryCount: number
  maxRetries: number
  nextRetryAt?: string
  lead: {
    studentName: string
    email: string
    phone: string
    stage: string
  }
  rule: {
    name: string
    actionType: ActionType
    priority: string
  }
}

interface Statistics {
  total: number
  pending: number
  processing: number
  completed: number
  failed: number
  skipped: number
  cancelled: number
}

export default function FollowupQueuePage() {
  const router = useRouter()
  const [queueItems, setQueueItems] = useState<QueueItem[]>([])
  const [statistics, setStatistics] = useState<Statistics>({
    total: 0,
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0,
    skipped: 0,
    cancelled: 0,
  })
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('ALL')
  const [filterRule, setFilterRule] = useState<string>('')
  const [filterLead, setFilterLead] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchQueue()
  }, [filterStatus, filterRule, filterLead, searchTerm, page])

  async function fetchQueue() {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      params.append('page', page.toString())
      params.append('limit', '20')
      if (filterStatus !== 'ALL') params.append('status', filterStatus)
      if (filterRule) params.append('ruleId', filterRule)
      if (filterLead) params.append('leadId', filterLead)
      if (searchTerm) params.append('search', searchTerm)

      const response = await fetch(`/api/counselor/followup/queue?${params.toString()}`, {
        credentials: 'include',
      })

      if (!response.ok) throw new Error('Failed to fetch queue')

      const result = await response.json()
      setQueueItems(result.data || [])
      setStatistics(result.stats || statistics)
      setTotalPages(result.pagination?.totalPages || 1)
    } catch (err) {
      console.error('Error fetching queue:', err)
    } finally {
      setLoading(false)
    }
  }

  async function executeQueueItem(itemId: string) {
    if (!confirm('Are you sure you want to manually execute this follow-up now?')) return

    try {
      const response = await fetch(`/api/counselor/followup/queue/${itemId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'execute' }),
        credentials: 'include',
      })

      if (!response.ok) throw new Error('Failed to execute follow-up')

      showToast.success('Follow-up executed successfully')
      fetchQueue()
    } catch (err) {
      console.error('Error executing follow-up:', err)
      showToast.error('Failed to execute follow-up')
    }
  }

  async function cancelQueueItem(itemId: string) {
    if (!confirm('Are you sure you want to cancel this scheduled follow-up?')) return

    try {
      const response = await fetch(`/api/counselor/followup/queue/${itemId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel' }),
        credentials: 'include',
      })

      if (!response.ok) throw new Error('Failed to cancel follow-up')

      showToast.success('Follow-up cancelled successfully')
      fetchQueue()
    } catch (err) {
      console.error('Error cancelling follow-up:', err)
      showToast.error('Failed to cancel follow-up')
    }
  }

  async function skipQueueItem(itemId: string) {
    if (!confirm('Are you sure you want to skip this follow-up?')) return

    try {
      const response = await fetch(`/api/counselor/followup/queue/${itemId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'skip' }),
        credentials: 'include',
      })

      if (!response.ok) throw new Error('Failed to skip follow-up')

      showToast.success('Follow-up skipped successfully')
      fetchQueue()
    } catch (err) {
      console.error('Error skipping follow-up:', err)
      showToast.error('Failed to skip follow-up')
    }
  }

  const getStatusColor = (status: QueueStatus) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PROCESSING: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800',
      FAILED: 'bg-red-100 text-red-800',
      SKIPPED: 'bg-gray-100 text-gray-800',
      CANCELLED: 'bg-orange-100 text-orange-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getActionIcon = (actionType: ActionType) => {
    const icons = {
      EMAIL: '📧',
      WHATSAPP: '💬',
      SMS: '📱',
      CALL_TASK: '📞',
      NOTIFICATION: '🔔',
      TASK: '✅',
    }
    return icons[actionType] || '📋'
  }

  if (loading && queueItems.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading queue...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Follow-up Queue</h1>
        <p className="text-gray-600 mt-1">View and manage scheduled follow-ups</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Queued</div>
          <div className="text-2xl font-bold text-gray-900">{statistics.total}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">{statistics.pending}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Completed</div>
          <div className="text-2xl font-bold text-green-600">{statistics.completed}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Failed</div>
          <div className="text-2xl font-bold text-red-600">{statistics.failed}</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value)
                setPage(1)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="COMPLETED">Completed</option>
              <option value="FAILED">Failed</option>
              <option value="SKIPPED">Skipped</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search by student name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(1)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => fetchQueue()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>

      {queueItems.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <div className="text-4xl mb-4">📭</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Queued Follow-ups</h3>
          <p className="text-gray-600">
            There are no follow-ups in the queue matching your filters.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {queueItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.lead.studentName}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Email: {item.lead.email}</div>
                      {item.lead.phone && <div>Phone: {item.lead.phone}</div>}
                      <div>Stage: {item.lead.stage}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 mb-1">{item.rule.name}</div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <span>{getActionIcon(item.rule.actionType)}</span>
                      <span>{item.rule.actionType}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Priority: {item.rule.priority}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <div className="text-gray-600">Scheduled For</div>
                    <div className="font-medium text-gray-900">
                      {new Date(item.scheduledFor).toLocaleString()}
                    </div>
                  </div>
                  {item.processedAt && (
                    <div>
                      <div className="text-gray-600">Processed At</div>
                      <div className="font-medium text-gray-900">
                        {new Date(item.processedAt).toLocaleString()}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="text-gray-600">Retry Count</div>
                    <div className="font-medium text-gray-900">
                      {item.retryCount} / {item.maxRetries}
                    </div>
                  </div>
                  {item.nextRetryAt && (
                    <div>
                      <div className="text-gray-600">Next Retry</div>
                      <div className="font-medium text-gray-900">
                        {new Date(item.nextRetryAt).toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>

                {item.error && (
                  <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
                    <div className="text-sm font-medium text-red-800 mb-1">Error:</div>
                    <div className="text-sm text-red-700">{item.error}</div>
                  </div>
                )}

                <div className="flex gap-2">
                  {item.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => executeQueueItem(item.id)}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        Execute Now
                      </button>
                      <button
                        onClick={() => cancelQueueItem(item.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => skipQueueItem(item.id)}
                        className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                      >
                        Skip
                      </button>
                    </>
                  )}
                  {item.status === 'FAILED' && item.retryCount < item.maxRetries && (
                    <button
                      onClick={() => executeQueueItem(item.id)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Retry Now
                    </button>
                  )}
                  <button
                    onClick={() => router.push(`/counselor/leads/${item.leadId}`)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded hover:bg-blue-200"
                  >
                    View Lead
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
