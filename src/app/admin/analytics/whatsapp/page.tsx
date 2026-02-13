'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  MousePointer,
  TrendingUp,
  Smartphone,
  Monitor,
  Tablet,
  Clock,
  Calendar,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  BarChart3,
  Target,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'

interface WhatsAppClickData {
  id: string
  source: string
  page: string
  device: string
  campaign: string | null
  timestamp: string
  utmSource: string | null
  utmMedium: string | null
}

interface SourceStats {
  source: string
  clicks: number
  percentage: number
}

interface PageStats {
  page: string
  clicks: number
  percentage: number
}

interface HourlyStats {
  hour: string
  clicks: number
}

interface WhatsAppAnalytics {
  totalClicks: number
  clicksToday: number
  clicksThisWeek: number
  clicksThisMonth: number
  deviceBreakdown: {
    mobile: number
    desktop: number
    tablet: number
  }
  topSources: SourceStats[]
  topPages: PageStats[]
  hourlyDistribution: HourlyStats[]
  recentClicks: WhatsAppClickData[]
  changeFromLastPeriod: number
}

export default function WhatsAppAnalyticsPage() {
  const [analytics, setAnalytics] = useState<WhatsAppAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('30d')
  const [refreshing, setRefreshing] = useState(false)

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/analytics/whatsapp?dateRange=${dateRange}`)
      if (response.ok) {
        const result = await response.json()
        if (result.success && result.data) {
          setAnalytics(result.data)
        }
      }
    } catch (error) {
      console.error('Failed to load WhatsApp analytics:', error)
    } finally {
      setLoading(false)
    }
  }, [dateRange])

  useEffect(() => {
    loadAnalytics()
  }, [loadAnalytics])

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadAnalytics()
    setRefreshing(false)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const formatTime = (date: string) => {
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getDeviceIcon = (deviceType?: string) => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />
      case 'tablet':
        return <Tablet className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  const stats = [
    {
      label: 'Total Clicks',
      value: analytics?.totalClicks || 0,
      icon: MousePointer,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Today',
      value: analytics?.clicksToday || 0,
      icon: Calendar,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'This Week',
      value: analytics?.clicksThisWeek || 0,
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: 'This Month',
      value: analytics?.clicksThisMonth || 0,
      icon: BarChart3,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-7 h-7 text-green-600" />
              WhatsApp Click Analytics
            </h1>
            <p className="text-gray-600 mt-1">
              Track and analyze WhatsApp button clicks across your website
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </select>

            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-green-600" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${stat.bg}`}>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      {analytics?.changeFromLastPeriod !== undefined && index === 0 && (
                        <span
                          className={`flex items-center text-sm font-medium ${
                            analytics.changeFromLastPeriod >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {analytics.changeFromLastPeriod >= 0 ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          {Math.abs(analytics.changeFromLastPeriod)}%
                        </span>
                      )}
                    </div>
                    <div className="mt-4">
                      <p className="text-3xl font-bold text-gray-900">{formatNumber(stat.value)}</p>
                      <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Top Click Sources
                </h3>
                <div className="space-y-4">
                  {analytics?.topSources.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No data yet</p>
                  ) : (
                    analytics?.topSources.map((source, index) => (
                      <div key={source.source} className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-500 w-6">#{index + 1}</span>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                              {source.source}
                            </span>
                            <span className="text-sm text-gray-600">{source.clicks}</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full transition-all"
                              style={{ width: `${source.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  Top Pages
                </h3>
                <div className="space-y-4">
                  {analytics?.topPages.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No data yet</p>
                  ) : (
                    analytics?.topPages.map((page, index) => (
                      <div key={page.page} className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-500 w-6">#{index + 1}</span>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                              {page.page === '/' ? 'Homepage' : page.page}
                            </span>
                            <span className="text-sm text-gray-600">{page.clicks}</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full transition-all"
                              style={{ width: `${page.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-orange-600" />
                  Device Breakdown
                </h3>
                <div className="space-y-4">
                  {analytics?.deviceBreakdown && (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">Mobile</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          {analytics.deviceBreakdown.mobile}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Monitor className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">Desktop</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          {analytics.deviceBreakdown.desktop}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Tablet className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">Tablet</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          {analytics.deviceBreakdown.tablet}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Clicks by Hour (IST)
                </h3>
                <div className="flex items-end gap-1 h-32">
                  {analytics?.hourlyDistribution.map((hour, index) => {
                    const maxClicks = Math.max(...analytics.hourlyDistribution.map((h) => h.clicks))
                    const height = maxClicks > 0 ? (hour.clicks / maxClicks) * 100 : 0
                    const hourNum = parseInt(hour.hour.split(':')[0])
                    return (
                      <div
                        key={hour.hour}
                        className="flex-1 flex flex-col items-center"
                        title={`${hour.hour} - ${hour.clicks} clicks`}
                      >
                        <div
                          className="w-full bg-green-500 rounded-t hover:bg-green-600 transition-colors cursor-pointer"
                          style={{ height: `${Math.max(height, 2)}%` }}
                        />
                        {index % 4 === 0 && (
                          <span className="text-xs text-gray-500 mt-1">{hourNum}</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Clicks</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        Time
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        Source
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        Page
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        Device
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        Campaign
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics?.recentClicks.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-gray-500">
                          No clicks recorded yet
                        </td>
                      </tr>
                    ) : (
                      analytics?.recentClicks.map((click) => (
                        <tr key={click.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {formatTime(click.timestamp)}
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {click.source}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 truncate max-w-[200px]">
                            {click.page === '/' ? 'Homepage' : click.page}
                          </td>
                          <td className="py-3 px-4">
                            <span className="flex items-center gap-1 text-gray-600">
                              {getDeviceIcon(click.device)}
                              <span className="text-xs capitalize">
                                {click.device || 'Unknown'}
                              </span>
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {click.campaign || '-'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}
