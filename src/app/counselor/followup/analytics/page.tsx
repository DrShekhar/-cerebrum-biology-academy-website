'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Period = 'week' | 'month' | 'quarter' | 'year'
type Channel = 'EMAIL' | 'WHATSAPP' | 'SMS' | 'CALL_TASK' | 'NOTIFICATION' | 'TASK'

interface OverviewMetrics {
  total: number
  sent: number
  failed: number
  successRate: number
  failureRate: number
  avgDeliveryTime: number
}

interface RulePerformance {
  ruleId: string
  ruleName: string
  actionType: string
  total: number
  sent: number
  failed: number
  successRate: number
}

interface ChannelPerformance {
  channel: Channel
  total: number
  sent: number
  failed: number
  successRate: number
}

interface DailyTrend {
  date: string
  total: number
  sent: number
  failed: number
}

interface QueueStats {
  pending: number
  processing: number
  completed: number
  failed: number
  skipped: number
  cancelled: number
}

interface EngagedLead {
  leadId: string
  studentName: string
  email: string
  stage: string
  followupCount: number
}

interface AnalyticsData {
  period: Period
  periodDays: number
  overview: OverviewMetrics
  rulePerformance: RulePerformance[]
  channelPerformance: ChannelPerformance[]
  dailyTrends: DailyTrend[]
  queueStats: QueueStats
  topEngagedLeads: EngagedLead[]
}

export default function FollowupAnalyticsPage() {
  const router = useRouter()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<Period>('month')

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  async function fetchAnalytics() {
    try {
      setLoading(true)
      const response = await fetch(`/api/counselor/followup/analytics?period=${period}`, {
        credentials: 'include',
      })

      if (!response.ok) throw new Error('Failed to fetch analytics')

      const result = await response.json()
      setAnalytics(result)
    } catch (err) {
      console.error('Error fetching analytics:', err)
    } finally {
      setLoading(false)
    }
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

  if (loading && !analytics) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading analytics...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="p-6">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
          <p className="text-gray-600">Unable to load analytics data.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Follow-up Analytics</h1>
          <p className="text-gray-600 mt-1">Performance insights and metrics</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod('week')}
            className={`px-4 py-2 rounded-md ${
              period === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`px-4 py-2 rounded-md ${
              period === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setPeriod('quarter')}
            className={`px-4 py-2 rounded-md ${
              period === 'quarter'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Quarter
          </button>
          <button
            onClick={() => setPeriod('year')}
            className={`px-4 py-2 rounded-md ${
              period === 'year'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Year
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Follow-ups</div>
          <div className="text-2xl font-bold text-gray-900">{analytics.overview.total}</div>
          <div className="text-xs text-gray-500 mt-1">Last {analytics.periodDays} days</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Successfully Sent</div>
          <div className="text-2xl font-bold text-green-600">{analytics.overview.sent}</div>
          <div className="text-xs text-gray-500 mt-1">
            {analytics.overview.successRate.toFixed(1)}% success rate
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Failed</div>
          <div className="text-2xl font-bold text-red-600">{analytics.overview.failed}</div>
          <div className="text-xs text-gray-500 mt-1">
            {analytics.overview.failureRate.toFixed(1)}% failure rate
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Avg Delivery Time</div>
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(analytics.overview.avgDeliveryTime)}s
          </div>
          <div className="text-xs text-gray-500 mt-1">Average processing time</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rule Performance</h3>
          {analytics.rulePerformance.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No rule data available</p>
          ) : (
            <div className="space-y-3">
              {analytics.rulePerformance.slice(0, 5).map((rule) => (
                <div key={rule.ruleId} className="border-b border-gray-200 pb-3 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-gray-900">{rule.ruleName}</div>
                    <div className="text-sm text-gray-600">{rule.total} sent</div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-600">{rule.actionType}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-green-600">{rule.sent} success</span>
                      <span className="text-red-600">{rule.failed} failed</span>
                      <span className="font-medium text-blue-600">
                        {rule.successRate.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Channel Performance</h3>
          {analytics.channelPerformance.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No channel data available</p>
          ) : (
            <div className="space-y-3">
              {analytics.channelPerformance.map((channel) => (
                <div key={channel.channel} className="border-b border-gray-200 pb-3 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span>{getChannelIcon(channel.channel)}</span>
                      <span className="font-medium text-gray-900">{channel.channel}</span>
                    </div>
                    <div className="text-sm text-gray-600">{channel.total} sent</div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-green-600">{channel.sent} success</span>
                      <span className="text-red-600">{channel.failed} failed</span>
                    </div>
                    <span className="font-medium text-blue-600">
                      {channel.successRate.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Queue Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{analytics.queueStats.pending}</div>
            <div className="text-sm text-gray-600 mt-1">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {analytics.queueStats.processing}
            </div>
            <div className="text-sm text-gray-600 mt-1">Processing</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {analytics.queueStats.completed}
            </div>
            <div className="text-sm text-gray-600 mt-1">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{analytics.queueStats.failed}</div>
            <div className="text-sm text-gray-600 mt-1">Failed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">{analytics.queueStats.skipped}</div>
            <div className="text-sm text-gray-600 mt-1">Skipped</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {analytics.queueStats.cancelled}
            </div>
            <div className="text-sm text-gray-600 mt-1">Cancelled</div>
          </div>
        </div>
      </div>

      {analytics.topEngagedLeads.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Engaged Leads (Top 10)</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">
                    Student Name
                  </th>
                  <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Email</th>
                  <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Stage</th>
                  <th className="text-right py-2 px-4 text-sm font-medium text-gray-700">
                    Follow-ups
                  </th>
                  <th className="text-center py-2 px-4 text-sm font-medium text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {analytics.topEngagedLeads.map((lead) => (
                  <tr key={lead.leadId} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {lead.studentName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{lead.email}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        {lead.stage}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-sm font-bold text-blue-600">
                      {lead.followupCount}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => router.push(`/counselor/leads/${lead.leadId}`)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200"
                      >
                        View Lead
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {analytics.dailyTrends.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Trends</h3>
          <div className="overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {analytics.dailyTrends.slice(-14).map((trend) => (
                <div key={trend.date} className="flex flex-col items-center">
                  <div className="text-xs text-gray-600 mb-2">
                    {new Date(trend.date).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div
                      className="bg-green-500 rounded-t"
                      style={{
                        width: '40px',
                        height: `${Math.max(4, (trend.sent / Math.max(trend.total, 1)) * 100)}px`,
                      }}
                      title={`Sent: ${trend.sent}`}
                    ></div>
                    <div
                      className="bg-red-500 rounded-b"
                      style={{
                        width: '40px',
                        height: `${Math.max(4, (trend.failed / Math.max(trend.total, 1)) * 100)}px`,
                      }}
                      title={`Failed: ${trend.failed}`}
                    ></div>
                  </div>
                  <div className="text-xs font-medium text-gray-900 mt-2">{trend.total}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">Sent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-600">Failed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
