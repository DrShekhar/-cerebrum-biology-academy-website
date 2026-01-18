'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type HistoryStatus = 'SENT' | 'FAILED'
type Channel = 'EMAIL' | 'WHATSAPP' | 'SMS' | 'CALL_TASK' | 'NOTIFICATION' | 'TASK'

interface HistoryItem {
  id: string
  leadId: string
  ruleId: string | null
  action: string
  channel: Channel
  content: string
  status: HistoryStatus
  isAutomated: boolean
  createdAt: string
  lead: {
    studentName: string
    email: string
    stage: string
  }
  rule: {
    name: string
    actionType: string
  } | null
}

interface Statistics {
  total: number
  sent: number
  failed: number
  byChannel: Array<{ channel: Channel; count: number }>
}

export default function FollowupHistoryPage() {
  const router = useRouter()
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([])
  const [statistics, setStatistics] = useState<Statistics>({
    total: 0,
    sent: 0,
    failed: 0,
    byChannel: [],
  })
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('ALL')
  const [filterChannel, setFilterChannel] = useState<string>('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchHistory()
  }, [filterStatus, filterChannel, searchTerm, startDate, endDate, page])

  async function fetchHistory() {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      params.append('page', page.toString())
      params.append('limit', '20')
      if (filterStatus !== 'ALL') params.append('status', filterStatus)
      if (filterChannel !== 'ALL') params.append('channel', filterChannel)
      if (searchTerm) params.append('search', searchTerm)
      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)

      const response = await fetch(`/api/counselor/followup/history?${params.toString()}`, {
        credentials: 'include',
      })

      if (!response.ok) throw new Error('Failed to fetch history')

      const result = await response.json()
      setHistoryItems(result.data || [])
      setStatistics(result.stats || statistics)
      setTotalPages(result.pagination?.totalPages || 1)
    } catch (err) {
      console.error('Error fetching history:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: HistoryStatus) => {
    return status === 'SENT' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const getChannelColor = (channel: Channel) => {
    const colors = {
      EMAIL: 'bg-blue-100 text-blue-800',
      WHATSAPP: 'bg-green-100 text-green-800',
      SMS: 'bg-purple-100 text-purple-800',
      CALL_TASK: 'bg-orange-100 text-orange-800',
      NOTIFICATION: 'bg-yellow-100 text-yellow-800',
      TASK: 'bg-indigo-100 text-indigo-800',
    }
    return colors[channel] || 'bg-gray-100 text-gray-800'
  }

  const getChannelIcon = (channel: Channel) => {
    const icons = {
      EMAIL: '📧',
      WHATSAPP: '💬',
      SMS: '📱',
      CALL_TASK: '📞',
      NOTIFICATION: '🔔',
      TASK: '✅',
    }
    return icons[channel] || '📋'
  }

  if (loading && historyItems.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading history...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Follow-up History</h1>
        <p className="text-gray-600 mt-1">View all sent follow-up communications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Sent</div>
          <div className="text-2xl font-bold text-gray-900">{statistics.total}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Successfully Sent</div>
          <div className="text-2xl font-bold text-green-600">{statistics.sent}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Failed</div>
          <div className="text-2xl font-bold text-red-600">{statistics.failed}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Success Rate</div>
          <div className="text-2xl font-bold text-blue-600">
            {statistics.total > 0 ? Math.round((statistics.sent / statistics.total) * 100) : 0}%
          </div>
        </div>
      </div>

      {statistics.byChannel.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">By Channel</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {statistics.byChannel.map((item) => (
              <div key={item.channel} className="text-center">
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getChannelColor(item.channel)}`}
                >
                  <span className="mr-1">{getChannelIcon(item.channel)}</span>
                  <span>{item.channel}</span>
                </div>
                <div className="text-lg font-semibold text-gray-900 mt-1">{item.count}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
              <option value="SENT">Sent</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Channel</label>
            <select
              value={filterChannel}
              onChange={(e) => {
                setFilterChannel(e.target.value)
                setPage(1)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="ALL">All Channels</option>
              <option value="EMAIL">Email</option>
              <option value="WHATSAPP">WhatsApp</option>
              <option value="SMS">SMS</option>
              <option value="CALL_TASK">Call Task</option>
              <option value="NOTIFICATION">Notification</option>
              <option value="TASK">Task</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value)
                setPage(1)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value)
                setPage(1)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Student name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(1)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={() => fetchHistory()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>

      {historyItems.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <div className="text-4xl mb-4">📭</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No History Found</h3>
          <p className="text-gray-600">
            There are no follow-up communications matching your filters.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {historyItems.map((item) => (
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
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getChannelColor(item.channel)}`}
                      >
                        {getChannelIcon(item.channel)} {item.channel}
                      </span>
                      {item.isAutomated && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                          Automated
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Email: {item.lead.email}</div>
                      <div>Stage: {item.lead.stage}</div>
                      {item.rule && <div>Rule: {item.rule.name}</div>}
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                  <div className="text-sm font-medium text-gray-700 mb-2">Content:</div>
                  <div className="text-sm text-gray-900 whitespace-pre-wrap">{item.content}</div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => router.push(`/counselor/leads/${item.leadId}`)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded hover:bg-blue-200"
                  >
                    View Lead
                  </button>
                  {item.rule && (
                    <button
                      onClick={() => router.push(`/counselor/followup/rules`)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200"
                    >
                      View Rule
                    </button>
                  )}
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
