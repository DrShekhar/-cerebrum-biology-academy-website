'use client'

import { useState, useEffect } from 'react'
import {
  MessageSquare,
  TrendingUp,
  Users,
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  MousePointer,
  RefreshCw,
  ExternalLink,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'

interface WhatsAppAnalytics {
  totalClicks: number
  clicksToday: number
  clicksThisWeek: number
  clicksThisMonth: number
  deviceBreakdown: { mobile: number; desktop: number; tablet: number }
  topSources: Array<{ source: string; clicks: number }>
  topPages: Array<{ page: string; clicks: number }>
  hourlyDistribution: Array<{ hour: number; clicks: number }>
  recentClicks: Array<{
    id: string
    source: string
    page: string
    device: string
    timestamp: string
  }>
  changeFromLastPeriod: number
}

export default function WhatsAppAnalyticsPage() {
  const [data, setData] = useState<WhatsAppAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('7d')

  useEffect(() => {
    fetchData()
  }, [dateRange])

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/admin/analytics/whatsapp?dateRange=${dateRange}`)
      const json = await res.json()
      if (json.success) {
        setData(json.data)
      }
    } catch (error) {
      console.error('Failed to fetch WhatsApp analytics:', error)
    } finally {
      setLoading(false)
    }
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
            <h1 className="text-3xl font-bold text-gray-900">WhatsApp Analytics</h1>
            <p className="text-gray-600 mt-1">Track WhatsApp CTA clicks and engagement</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="1d">Today</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <Button variant="outline" className="text-gray-700 border-gray-300" onClick={fetchData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading WhatsApp analytics...</p>
          </div>
        ) : data ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                    <p className="text-2xl font-bold text-gray-900">{data.totalClicks}</p>
                    <p
                      className={`text-xs mt-1 ${data.changeFromLastPeriod >= 0 ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {data.changeFromLastPeriod >= 0 ? '+' : ''}
                      {data.changeFromLastPeriod.toFixed(1)}% vs last period
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-green-100 text-green-600">
                    <MousePointer className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today</p>
                    <p className="text-2xl font-bold text-green-600">{data.clicksToday}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">This Week</p>
                    <p className="text-2xl font-bold text-gray-900">{data.clicksThisWeek}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-purple-100 text-purple-600">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">This Month</p>
                    <p className="text-2xl font-bold text-gray-900">{data.clicksThisMonth}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-orange-100 text-orange-600">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h3>
                <div className="space-y-4">
                  {Object.entries(data.deviceBreakdown).map(([device, count]) => {
                    const total =
                      data.deviceBreakdown.mobile +
                      data.deviceBreakdown.desktop +
                      data.deviceBreakdown.tablet
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
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-16 text-right">
                            {count} ({pct.toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Sources</h3>
                <div className="space-y-3">
                  {(data.topSources || []).slice(0, 5).map((source, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{source.source}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {source.clicks} clicks
                      </span>
                    </div>
                  ))}
                  {(!data.topSources || data.topSources.length === 0) && (
                    <p className="text-sm text-gray-500">No source data available</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h3>
              <div className="space-y-3">
                {(data.topPages || []).slice(0, 10).map((page, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center space-x-2">
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700 truncate max-w-[400px]">
                        {page.page}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{page.clicks} clicks</span>
                  </div>
                ))}
                {(!data.topPages || data.topPages.length === 0) && (
                  <p className="text-sm text-gray-500">No page data available</p>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Clicks</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Source
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Page
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Device
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(data.recentClicks || []).slice(0, 10).map((click) => (
                      <tr key={click.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">{click.source}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 truncate max-w-[200px]">
                          {click.page}
                        </td>
                        <td className="px-4 py-3">{getDeviceIcon(click.device)}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {new Date(click.timestamp).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {(!data.recentClicks || data.recentClicks.length === 0) && (
                <div className="text-center py-8">
                  <MessageSquare className="mx-auto h-10 w-10 text-gray-300" />
                  <p className="mt-2 text-sm text-gray-500">No recent click data</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No data available</h3>
            <p className="mt-1 text-sm text-gray-500">
              WhatsApp analytics will appear here once CTAs receive clicks.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
