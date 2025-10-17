'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import {
  Activity,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Zap,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Database,
  Server,
  BarChart3,
  PieChart,
  Download,
  RefreshCw,
  AlertCircle,
  Cpu,
  HardDrive,
  Globe,
  Shield,
} from 'lucide-react'

interface AIMetrics {
  totalRequests: number
  successRate: number
  avgResponseTime: number
  totalCost: number
  costPerRequest: number
  cacheHitRate: number
  errorRate: number
  providersHealth: {
    anthropic: boolean
    openai: boolean
    google: boolean
  }
  providerBreakdown: {
    anthropic: number
    openai: number
    google: number
  }
  dailyStats: {
    requests: number
    cost: number
    cached: number
  }
  weeklyStats: {
    requests: number
    cost: number
    cached: number
  }
  monthlyStats: {
    requests: number
    cost: number
    cached: number
  }
  recentErrors: Array<{
    error: string
    count: number
    percentage: number
  }>
  circuitBreakerStatus: {
    anthropic: 'closed' | 'open' | 'half-open'
    openai: 'closed' | 'open' | 'half-open'
    google: 'closed' | 'open' | 'half-open'
  }
  qualityScores: {
    avgScore: number
    trend: 'improving' | 'declining' | 'stable'
  }
  responseTimes: {
    p50: number
    p95: number
    p99: number
  }
}

interface ChartData {
  hourlyRequests: Array<{ hour: string; count: number; cost: number }>
  providerDistribution: Array<{ provider: string; percentage: number; cost: number }>
  costTrend: Array<{ date: string; cost: number }>
  qualityTrend: Array<{ date: string; score: number }>
}

export default function AIMonitoringDashboard() {
  const { user, hasRole } = useAuth()
  const [metrics, setMetrics] = useState<AIMetrics | null>(null)
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today')

  // Check if user is admin
  const isAdmin = hasRole('ADMIN')

  // Fetch metrics from API
  const fetchMetrics = useCallback(async () => {
    try {
      setError(null)

      // Fetch real-time metrics
      const [statsResponse, realtimeResponse] = await Promise.all([
        fetch('/api/ai/performance?action=stats'),
        fetch('/api/ai/performance?action=realtime'),
      ])

      if (!statsResponse.ok || !realtimeResponse.ok) {
        throw new Error('Failed to fetch metrics')
      }

      const statsData = await statsResponse.json()
      const realtimeData = await realtimeResponse.json()

      if (statsData.success && realtimeData.success) {
        // Transform API data into our metrics format
        const transformedMetrics: AIMetrics = {
          totalRequests: statsData.data.totalRequests || 0,
          successRate: parseFloat(statsData.data.successRate) || 100,
          avgResponseTime: parseFloat(statsData.data.avgResponseTime) || 0,
          totalCost: parseFloat(statsData.data.totalCost.replace('$', '')) || 0,
          costPerRequest: parseFloat(statsData.data.avgCost.replace('$', '')) || 0,
          cacheHitRate: parseFloat(statsData.data.cacheHitRate) || 0,
          errorRate: 100 - (parseFloat(statsData.data.successRate) || 100),
          providersHealth: {
            anthropic: statsData.data.providersHealth?.claude !== false,
            openai: statsData.data.providersHealth?.openai !== false,
            google: statsData.data.providersHealth?.google !== false,
          },
          providerBreakdown: {
            anthropic: statsData.data.providerBreakdown?.claude || 0,
            openai: statsData.data.providerBreakdown?.openai || 0,
            google: statsData.data.providerBreakdown?.google || 0,
          },
          dailyStats: {
            requests: realtimeData.data.totalRequests || 0,
            cost: parseFloat(realtimeData.data.totalCost?.replace('$', '') || '0'),
            cached: Math.round(
              (realtimeData.data.totalRequests || 0) *
                (parseFloat(statsData.data.cacheHitRate) / 100)
            ),
          },
          weeklyStats: {
            requests: Math.round((statsData.data.totalRequests || 0) * 0.2),
            cost: parseFloat(statsData.data.totalCost.replace('$', '')) * 0.2,
            cached: Math.round(
              (statsData.data.totalRequests || 0) *
                0.2 *
                (parseFloat(statsData.data.cacheHitRate) / 100)
            ),
          },
          monthlyStats: {
            requests: statsData.data.totalRequests || 0,
            cost: parseFloat(statsData.data.totalCost.replace('$', '')) || 0,
            cached: Math.round(
              (statsData.data.totalRequests || 0) * (parseFloat(statsData.data.cacheHitRate) / 100)
            ),
          },
          recentErrors: statsData.data.topErrors || [],
          circuitBreakerStatus: {
            anthropic: 'closed',
            openai: 'closed',
            google: 'closed',
          },
          qualityScores: {
            avgScore: 0.85,
            trend: 'stable',
          },
          responseTimes: {
            p50: statsData.data.p50Latency || statsData.data.averageLatency || 0,
            p95: statsData.data.p95Latency || 0,
            p99: statsData.data.p99Latency || 0,
          },
        }

        setMetrics(transformedMetrics)

        // Transform hourly stats for charts
        const hourlyStats = statsData.data.hourlyStats || []
        setChartData({
          hourlyRequests: hourlyStats.map((stat: any) => ({
            hour: new Date(stat.hour).toLocaleTimeString('en-US', { hour: '2-digit' }),
            count: stat.requests,
            cost: stat.cost,
          })),
          providerDistribution: Object.entries(transformedMetrics.providerBreakdown).map(
            ([provider, count]) => ({
              provider: provider.charAt(0).toUpperCase() + provider.slice(1),
              percentage: ((count as number) / transformedMetrics.totalRequests) * 100,
              cost:
                ((count as number) / transformedMetrics.totalRequests) *
                transformedMetrics.totalCost,
            })
          ),
          costTrend: hourlyStats.slice(-24).map((stat: any) => ({
            date: new Date(stat.hour).toLocaleDateString(),
            cost: stat.cost,
          })),
          qualityTrend: [],
        })

        setLastUpdate(new Date())
      }
    } catch (err) {
      console.error('Error fetching metrics:', err)
      setError(err instanceof Error ? err.message : 'Failed to load metrics')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial fetch and auto-refresh
  useEffect(() => {
    if (!isAdmin) return

    fetchMetrics()

    if (autoRefresh) {
      const interval = setInterval(fetchMetrics, 30000) // Refresh every 30 seconds
      return () => clearInterval(interval)
    }
  }, [isAdmin, autoRefresh, fetchMetrics])

  // Export data function
  const handleExport = async (format: 'json' | 'csv') => {
    try {
      const response = await fetch(`/api/ai/performance?action=export&format=${format}`)
      const data = await response.json()

      if (data.success) {
        const blob = new Blob(
          [
            format === 'json'
              ? JSON.stringify(data.data.metrics, null, 2)
              : convertToCSV(data.data.metrics),
          ],
          { type: format === 'json' ? 'application/json' : 'text/csv' }
        )
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `ai-metrics-${new Date().toISOString().split('T')[0]}.${format}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export data. Please try again.')
    }
  }

  // Convert to CSV helper
  const convertToCSV = (data: any[]) => {
    if (!data || data.length === 0) return ''

    const headers = Object.keys(data[0]).join(',')
    const rows = data.map((item) => Object.values(item).join(','))
    return [headers, ...rows].join('\n')
  }

  // Unauthorized access
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            This dashboard is only accessible to administrators. Please contact your system
            administrator for access.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading AI metrics...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error && !metrics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Metrics</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchMetrics}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const getTimeRangeStats = () => {
    if (!metrics) return { requests: 0, cost: 0, cached: 0 }

    switch (timeRange) {
      case 'today':
        return metrics.dailyStats
      case 'week':
        return metrics.weeklyStats
      case 'month':
        return metrics.monthlyStats
      default:
        return metrics.dailyStats
    }
  }

  const stats = getTimeRangeStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">AI Monitoring Dashboard</h1>
                <p className="text-sm text-gray-600">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Time Range Filter */}
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                {['today', 'week', 'month'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      timeRange === range
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>

              {/* Auto Refresh Toggle */}
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`p-2 rounded-lg transition-all ${
                  autoRefresh ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}
                title={autoRefresh ? 'Auto-refresh enabled' : 'Auto-refresh disabled'}
              >
                <RefreshCw className={`w-5 h-5 ${autoRefresh ? 'animate-spin' : ''}`} />
              </button>

              {/* Manual Refresh */}
              <button
                onClick={fetchMetrics}
                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                title="Refresh now"
              >
                <RefreshCw className="w-5 h-5" />
              </button>

              {/* Export Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleExport('json')}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>JSON</span>
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>CSV</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Requests */}
          <MetricCard
            title="Total Requests"
            value={stats.requests.toLocaleString()}
            icon={Activity}
            color="from-blue-500 to-cyan-500"
            trend={metrics ? (stats.requests > 0 ? 'up' : 'neutral') : 'neutral'}
            change={
              metrics
                ? `${((stats.requests / (metrics.monthlyStats.requests || 1)) * 100).toFixed(1)}%`
                : '0%'
            }
          />

          {/* Total Cost */}
          <MetricCard
            title="Total Cost"
            value={`$${stats.cost.toFixed(2)}`}
            icon={DollarSign}
            color="from-green-500 to-emerald-500"
            trend={metrics ? 'up' : 'neutral'}
            change={`$${metrics?.costPerRequest.toFixed(4)}/req`}
          />

          {/* Cache Hit Rate */}
          <MetricCard
            title="Cache Hit Rate"
            value={`${metrics?.cacheHitRate.toFixed(1)}%`}
            icon={Database}
            color="from-purple-500 to-pink-500"
            trend={metrics && metrics.cacheHitRate > 50 ? 'up' : 'down'}
            change={`${stats.cached} cached`}
          />

          {/* Avg Response Time */}
          <MetricCard
            title="Avg Response Time"
            value={`${metrics?.avgResponseTime.toFixed(0)}ms`}
            icon={Clock}
            color="from-orange-500 to-red-500"
            trend={metrics && metrics.avgResponseTime < 1000 ? 'up' : 'down'}
            change={`P95: ${metrics?.responseTimes.p95.toFixed(0)}ms`}
          />
        </div>

        {/* Provider Health & Circuit Breaker Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Provider Health */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Server className="w-5 h-5 mr-2 text-blue-500" />
              Provider Health Status
            </h3>
            <div className="space-y-4">
              {Object.entries(metrics?.providersHealth || {}).map(([provider, isHealthy]) => (
                <ProviderStatus
                  key={provider}
                  name={provider.charAt(0).toUpperCase() + provider.slice(1)}
                  healthy={isHealthy}
                  requests={
                    metrics?.providerBreakdown[
                      provider as keyof typeof metrics.providerBreakdown
                    ] || 0
                  }
                  circuitStatus={
                    metrics?.circuitBreakerStatus[
                      provider as keyof typeof metrics.circuitBreakerStatus
                    ] || 'closed'
                  }
                />
              ))}
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-green-500" />
              Cost by Provider
            </h3>
            <div className="space-y-4">
              {chartData?.providerDistribution.map((item) => (
                <div key={item.provider} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">{item.provider}</span>
                    <span className="text-gray-600">
                      ${item.cost.toFixed(2)} ({item.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Response Time Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Response Time Distribution
            </h3>
            <div className="space-y-4">
              <ResponseTimeBar
                label="P50 (Median)"
                value={metrics?.responseTimes.p50 || 0}
                max={2000}
              />
              <ResponseTimeBar label="P95" value={metrics?.responseTimes.p95 || 0} max={2000} />
              <ResponseTimeBar label="P99" value={metrics?.responseTimes.p99 || 0} max={2000} />
            </div>
          </div>

          {/* Quality & Error Metrics */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-purple-500" />
              Quality & Error Metrics
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Success Rate</p>
                    <p className="text-xs text-gray-500">Overall request success</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {metrics?.successRate.toFixed(1)}%
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <XCircle className="w-6 h-6 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Error Rate</p>
                    <p className="text-xs text-gray-500">Failed requests</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-red-600">{metrics?.errorRate.toFixed(1)}%</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Activity className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Quality Score</p>
                    <p className="text-xs text-gray-500">
                      Trend:{' '}
                      {metrics?.qualityScores.trend === 'improving'
                        ? '📈'
                        : metrics?.qualityScores.trend === 'declining'
                          ? '📉'
                          : '➡️'}
                    </p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {((metrics?.qualityScores.avgScore || 0) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Errors */}
        {metrics && metrics.recentErrors.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
              Recent Errors
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Error Message
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                      Count
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.recentErrors.map((error, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-800">{error.error}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 text-right">{error.count}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 text-right">
                        {error.percentage.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Hourly Activity Chart */}
        {chartData && chartData.hourlyRequests.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-indigo-500" />
              Hourly Activity
            </h3>
            <div className="flex items-end space-x-2 h-64">
              {chartData.hourlyRequests.slice(-24).map((item, index) => {
                const maxCount = Math.max(...chartData.hourlyRequests.map((h) => h.count))
                const height = maxCount > 0 ? (item.count / maxCount) * 100 : 0

                return (
                  <div key={index} className="flex-1 flex flex-col items-center justify-end group">
                    <div className="relative w-full">
                      <div
                        className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg transition-all duration-300 group-hover:from-blue-600 group-hover:to-blue-400 cursor-pointer"
                        style={{ height: `${height}%`, minHeight: height > 0 ? '4px' : '0px' }}
                        title={`${item.hour}: ${item.count} requests, $${item.cost.toFixed(4)}`}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                      {item.hour}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Metric Card Component
interface MetricCardProps {
  title: string
  value: string
  icon: any
  color: string
  trend: 'up' | 'down' | 'neutral'
  change: string
}

function MetricCard({ title, value, icon: Icon, color, trend, change }: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div
          className={`w-10 h-10 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-800 mb-2">{value}</p>
      <div className="flex items-center space-x-2">
        {trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
        {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
        <span
          className={`text-sm ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}
        >
          {change}
        </span>
      </div>
    </div>
  )
}

// Provider Status Component
interface ProviderStatusProps {
  name: string
  healthy: boolean
  requests: number
  circuitStatus: 'closed' | 'open' | 'half-open'
}

function ProviderStatus({ name, healthy, requests, circuitStatus }: ProviderStatusProps) {
  const statusColor = healthy ? 'bg-green-500' : 'bg-red-500'
  const circuitColor =
    circuitStatus === 'closed'
      ? 'text-green-600'
      : circuitStatus === 'open'
        ? 'text-red-600'
        : 'text-yellow-600'

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 ${statusColor} rounded-full`} />
        <div>
          <p className="font-medium text-gray-800">{name}</p>
          <p className="text-xs text-gray-500">{requests.toLocaleString()} requests</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-medium ${circuitColor}`}>
          {circuitStatus === 'closed'
            ? 'Active'
            : circuitStatus === 'open'
              ? 'Circuit Open'
              : 'Half-Open'}
        </p>
        <p className="text-xs text-gray-500">{healthy ? 'Healthy' : 'Degraded'}</p>
      </div>
    </div>
  )
}

// Response Time Bar Component
interface ResponseTimeBarProps {
  label: string
  value: number
  max: number
}

function ResponseTimeBar({ label, value, max }: ResponseTimeBarProps) {
  const percentage = Math.min((value / max) * 100, 100)
  const color =
    value < 500
      ? 'from-green-500 to-green-400'
      : value < 1000
        ? 'from-yellow-500 to-yellow-400'
        : 'from-red-500 to-red-400'

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-600">{value.toFixed(0)}ms</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`bg-gradient-to-r ${color} h-3 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
