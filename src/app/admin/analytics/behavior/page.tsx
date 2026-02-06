'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import {
  Users,
  Clock,
  MousePointer,
  Eye,
  ArrowRight,
  Monitor,
  Smartphone,
  Tablet,
  TrendingUp,
  RefreshCw,
  ExternalLink,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'

interface BehaviorData {
  overview: {
    totalSessions: number
    avgSessionDuration: number
    bounceRate: number
    pagesPerSession: number
  }
  topPages: Array<{ path: string; views: number; avgTime: number; bounceRate: number }>
  deviceBreakdown: { mobile: number; desktop: number; tablet: number }
  userFlow: Array<{ from: string; to: string; count: number }>
  peakHours: Array<{ hour: number; sessions: number }>
}

export default function UserBehaviorPage() {
  const [data, setData] = useState<BehaviorData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('7d')

  useEffect(() => {
    fetchData()
  }, [dateRange])

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/admin/analytics?timeframe=${dateRange}`)
      const json = await res.json()
      if (json.success) {
        const d = json.data
        setData({
          overview: {
            totalSessions: d.traffic?.visitors || 0,
            avgSessionDuration: d.traffic?.avgSessionDuration || 0,
            bounceRate: d.traffic?.bounceRate || 0,
            pagesPerSession: d.traffic?.pagesPerSession || 0,
          },
          topPages: d.traffic?.topPages || [],
          deviceBreakdown: d.traffic?.deviceBreakdown || { mobile: 0, desktop: 0, tablet: 0 },
          userFlow: d.traffic?.userFlow || [],
          peakHours: d.traffic?.peakHours || [],
        })
      }
    } catch (error) {
      console.error('Failed to fetch behavior data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = Math.round(seconds % 60)
    return `${m}m ${s}s`
  }

  const getDeviceIcon = (device: string) => {
    if (device === 'mobile') return <Smartphone className="w-5 h-5 text-green-600" />
    if (device === 'desktop') return <Monitor className="w-5 h-5 text-blue-600" />
    return <Tablet className="w-5 h-5 text-purple-600" />
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Behavior</h1>
            <p className="text-gray-600 mt-1">
              Understand how users navigate and interact with your site
            </p>
          </div>
          <div className="flex space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <Button variant="outline" className="text-gray-700 border-gray-300" onClick={fetchData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading behavior analytics...</p>
          </div>
        ) : data ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data.overview.totalSessions.toLocaleString()}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Session Duration</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatDuration(data.overview.avgSessionDuration)}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-green-100 text-green-600">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data.overview.bounceRate.toFixed(1)}%
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-red-100 text-red-600">
                    <MousePointer className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pages / Session</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data.overview.pagesPerSession.toFixed(1)}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-purple-100 text-purple-600">
                    <Eye className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h3>
                <div className="space-y-4">
                  {Object.entries(data.deviceBreakdown).map(([device, count]) => {
                    const total = Object.values(data.deviceBreakdown).reduce((s, v) => s + v, 0)
                    const pct = total > 0 ? (count / total) * 100 : 0
                    return (
                      <div key={device} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getDeviceIcon(device)}
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {device}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-20 text-right">
                            {count} ({pct.toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Peak Hours (IST)</h3>
                <div className="space-y-2">
                  {(data.peakHours || []).slice(0, 8).map((entry) => {
                    const maxSessions = Math.max(...(data.peakHours || []).map((h) => h.sessions), 1)
                    const pct = (entry.sessions / maxSessions) * 100
                    return (
                      <div key={entry.hour} className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500 w-12">
                          {entry.hour.toString().padStart(2, '0')}:00
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-4">
                          <div
                            className="bg-green-500 h-4 rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${Math.max(pct, 5)}%` }}
                          >
                            {pct > 20 && (
                              <span className="text-[10px] text-white font-medium">
                                {entry.sessions}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  {(!data.peakHours || data.peakHours.length === 0) && (
                    <p className="text-sm text-gray-500">No peak hour data available</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Page
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Views
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Avg Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Bounce Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(data.topPages || []).map((page, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-3">
                          <div className="flex items-center text-sm text-blue-600">
                            <ExternalLink className="w-3 h-3 mr-2" />
                            {page.path}
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-900">
                          {page.views.toLocaleString()}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-900">
                          {formatDuration(page.avgTime)}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-900">
                          {page.bounceRate.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {(!data.topPages || data.topPages.length === 0) && (
                <div className="text-center py-8">
                  <Eye className="mx-auto h-10 w-10 text-gray-300" />
                  <p className="mt-2 text-sm text-gray-500">No page data available yet</p>
                </div>
              )}
            </div>

            {data.userFlow && data.userFlow.length > 0 && (
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Common User Flows</h3>
                <div className="space-y-3">
                  {data.userFlow.slice(0, 10).map((flow, i) => (
                    <div key={i} className="flex items-center text-sm">
                      <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                        {flow.from}
                      </span>
                      <ArrowRight className="w-4 h-4 mx-3 text-gray-400" />
                      <span className="text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                        {flow.to}
                      </span>
                      <span className="ml-auto text-gray-500 font-medium">{flow.count} users</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <TrendingUp className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No behavior data</h3>
            <p className="mt-1 text-sm text-gray-500">
              Analytics data will appear once users start visiting your site.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
