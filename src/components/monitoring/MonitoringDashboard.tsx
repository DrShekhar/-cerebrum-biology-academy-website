'use client'

/**
 * Production Monitoring Dashboard
 * Real-time system health, performance, and business metrics
 */

import React, { useState, useEffect } from 'react'
interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy'
  score: number
  checks: Array<{ name: string; status: boolean; latency?: number; error?: string }>
}

interface PerformanceMetrics {
  responseTime: { average: number; p95: number; p99: number }
  throughput: { requestsPerSecond: number; peakRps: number }
  errorRate: number
  availability: number
  trends: Array<{ timestamp: number; responseTime: number; throughput: number }>
}

interface BusinessIntelligence {
  revenue: { daily: number; monthly: number; growth: number }
  users: { active: number; new: number; retention: number }
  engagement: { avgSession: number; questionsPerUser: number; collaborativeRate: number }
  costs: { aiCosts: number; infrastructure: number; roi: number }
  forecasts: { revenue: number; users: number; costs: number }
}

interface MonitoringData {
  health: SystemHealth
  performance: PerformanceMetrics
  business: BusinessIntelligence
}

export default function MonitoringDashboard() {
  const [data, setData] = useState<MonitoringData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'system' | 'performance' | 'business'>(
    'overview'
  )
  const [timeRange, setTimeRange] = useState('24h')
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    fetchData()

    if (autoRefresh) {
      const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds
      return () => clearInterval(interval)
    }
  }, [autoRefresh, timeRange])

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/monitoring/dashboard?timeRange=${timeRange}`)
      const result = await response.json()

      if (result.success) {
        setData(result.overview)
      }
    } catch (error) {
      console.error('Failed to fetch monitoring data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-100'
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100'
      case 'unhealthy':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return '✅'
      case 'degraded':
        return '⚠️'
      case 'unhealthy':
        return '❌'
      default:
        return '❓'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(Math.round(num))
  }

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading monitoring dashboard...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load monitoring data</p>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                📊 Cerebrum Biology Academy - Monitoring Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Real-time system health, performance, and business metrics
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Auto Refresh Toggle */}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Auto Refresh</span>
              </label>

              {/* Time Range Selector */}
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="1h">Last Hour</option>
                <option value="6h">Last 6 Hours</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
              </select>

              {/* System Health Indicator */}
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(data.health.status)}`}
              >
                {getHealthIcon(data.health.status)} {data.health.status.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: '📋' },
              { id: 'system', name: 'System Health', icon: '🖥️' },
              { id: 'performance', name: 'Performance', icon: '⚡' },
              { id: 'business', name: 'Business Intelligence', icon: '📈' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon} {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
{activeTab === 'overview' && (
            <div
              key="overview"
              className="space-y-8 animate-fadeInUp"
            >
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="System Health"
                  value={`${data.health.score.toFixed(0)}%`}
                  change={data.health.status === 'healthy' ? '+2%' : '-5%'}
                  trend={data.health.status === 'healthy' ? 'up' : 'down'}
                  icon="🏥"
                  color={data.health.status === 'healthy' ? 'green' : 'red'}
                />

                <MetricCard
                  title="Response Time"
                  value={`${Math.round(data.performance.responseTime.average)}ms`}
                  change={`${data.performance.responseTime.p95}ms P95`}
                  trend="up"
                  icon="⚡"
                  color="blue"
                />

                <MetricCard
                  title="Monthly Revenue"
                  value={formatCurrency(data.business.revenue.monthly)}
                  change={`${formatPercentage(data.business.revenue.growth)} growth`}
                  trend={data.business.revenue.growth > 0 ? 'up' : 'down'}
                  icon="💰"
                  color="green"
                />

                <MetricCard
                  title="Active Students"
                  value={formatNumber(data.business.users.active)}
                  change={`${data.business.users.new} new today`}
                  trend="up"
                  icon="👨‍🎓"
                  color="purple"
                />
              </div>

              {/* System Health Checks */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  🔍 System Health Checks
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.health.checks.map((check, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        check.status ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{check.name}</span>
                        <span className="text-2xl">{check.status ? '✅' : '❌'}</span>
                      </div>
                      {check.latency && (
                        <p className="text-sm text-gray-600 mt-1">Latency: {check.latency}ms</p>
                      )}
                      {check.error && <p className="text-sm text-red-600 mt-1">{check.error}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Business Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Business Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Daily Revenue</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(data.business.revenue.daily)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Student Retention</span>
                      <span className="font-semibold text-blue-600">
                        {formatPercentage(data.business.users.retention * 100)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Collaborative Participation</span>
                      <span className="font-semibold text-purple-600">
                        {formatPercentage(data.business.engagement.collaborativeRate * 100)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">ROI</span>
                      <span className="font-semibold text-indigo-600">
                        {formatPercentage(data.business.costs.roi)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    ⚡ Performance Overview
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Availability</span>
                      <span className="font-semibold text-green-600">
                        {formatPercentage(data.performance.availability)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Error Rate</span>
                      <span className="font-semibold text-red-600">
                        {formatPercentage(data.performance.errorRate)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Requests/Second</span>
                      <span className="font-semibold text-blue-600">
                        {formatNumber(data.performance.throughput.requestsPerSecond)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">P99 Response Time</span>
                      <span className="font-semibold text-orange-600">
                        {Math.round(data.performance.responseTime.p99)}ms
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div
              key="system"
              className="space-y-6 animate-fadeInUp"
            >
              <SystemHealthView health={data.health} />
            </div>
          )}

          {activeTab === 'performance' && (
            <div
              key="performance"
              className="space-y-6 animate-fadeInUp"
            >
              <PerformanceView performance={data.performance} />
            </div>
          )}

          {activeTab === 'business' && (
            <div
              key="business"
              className="space-y-6 animate-fadeInUp"
            >
              <BusinessIntelligenceView business={data.business} />
            </div>
          )}
</div>
    </div>
  )
}

// Metric Card Component
function MetricCard({
  title,
  value,
  change,
  trend,
  icon,
  color,
}: {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: string
  color: string
}) {
  const colorClasses = {
    green: 'border-green-200 bg-green-50',
    blue: 'border-blue-200 bg-blue-50',
    purple: 'border-purple-200 bg-purple-50',
    red: 'border-red-200 bg-red-50',
    orange: 'border-orange-200 bg-orange-50',
  }

  return (
    <div
      className={`bg-white rounded-lg shadow p-6 border-l-4 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
      <div className="mt-2 flex items-center">
        <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? '↗️' : '↘️'} {change}
        </span>
      </div>
    </div>
  )
}

// System Health View
function SystemHealthView({ health }: { health: SystemHealth }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">🖥️ System Health Status</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="text-4xl mb-2">
              {health.status === 'healthy' ? '🟢' : health.status === 'degraded' ? '🟡' : '🔴'}
            </div>
            <p className="text-2xl font-bold text-gray-900">{health.status.toUpperCase()}</p>
            <p className="text-gray-600">Overall Status</p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-2xl font-bold text-gray-900">{health.score.toFixed(0)}%</p>
            <p className="text-gray-600">Health Score</p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-2">✅</div>
            <p className="text-2xl font-bold text-gray-900">
              {health.checks.filter((c) => c.status).length}/{health.checks.length}
            </p>
            <p className="text-gray-600">Passing Checks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {health.checks.map((check, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${
                check.status ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{check.name}</h3>
                <span className="text-2xl">{check.status ? '✅' : '❌'}</span>
              </div>

              {check.latency && (
                <p className="text-sm text-gray-600">Response Time: {check.latency}ms</p>
              )}

              {check.error && <p className="text-sm text-red-600 mt-1">{check.error}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Performance View
function PerformanceView({ performance }: { performance: PerformanceMetrics }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">⚡ Performance Metrics</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(performance.responseTime.average)}ms
            </div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {performance.availability.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Availability</div>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(performance.throughput.requestsPerSecond)}
            </div>
            <div className="text-sm text-gray-600">Requests/Second</div>
          </div>

          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {performance.errorRate.toFixed(2)}%
            </div>
            <div className="text-sm text-gray-600">Error Rate</div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time Percentiles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <div className="text-xl font-bold text-gray-900">
                {Math.round(performance.responseTime.average)}ms
              </div>
              <div className="text-sm text-gray-600">Average</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <div className="text-xl font-bold text-gray-900">
                {Math.round(performance.responseTime.p95)}ms
              </div>
              <div className="text-sm text-gray-600">95th Percentile</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <div className="text-xl font-bold text-gray-900">
                {Math.round(performance.responseTime.p99)}ms
              </div>
              <div className="text-sm text-gray-600">99th Percentile</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Business Intelligence View
function BusinessIntelligenceView({ business }: { business: BusinessIntelligence }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Revenue Metrics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">💰 Revenue Analytics</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(business.revenue.daily)}
            </div>
            <div className="text-sm text-gray-600 mt-2">Daily Revenue</div>
          </div>

          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              {formatCurrency(business.revenue.monthly)}
            </div>
            <div className="text-sm text-gray-600 mt-2">Monthly Revenue</div>
          </div>

          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">
              {business.revenue.growth > 0 ? '+' : ''}
              {business.revenue.growth.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 mt-2">Growth Rate</div>
          </div>
        </div>
      </div>

      {/* Student Metrics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">👨‍🎓 Student Analytics</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-indigo-50 rounded-lg">
            <div className="text-3xl font-bold text-indigo-600">
              {business.users.active.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-2">Active Students</div>
          </div>

          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">{business.users.new}</div>
            <div className="text-sm text-gray-600 mt-2">New Signups Today</div>
          </div>

          <div className="text-center p-6 bg-yellow-50 rounded-lg">
            <div className="text-3xl font-bold text-yellow-600">
              {(business.users.retention * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 mt-2">Retention Rate</div>
          </div>
        </div>
      </div>

      {/* Engagement & Costs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🤝 Engagement Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg Session Duration</span>
              <span className="font-semibold text-blue-600">
                {Math.round(business.engagement.avgSession / 60)} min
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Questions per User</span>
              <span className="font-semibold text-green-600">
                {business.engagement.questionsPerUser.toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Collaborative Rate</span>
              <span className="font-semibold text-purple-600">
                {(business.engagement.collaborativeRate * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💼 Cost Analysis</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">AI Costs</span>
              <span className="font-semibold text-red-600">
                {formatCurrency(business.costs.aiCosts)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Infrastructure</span>
              <span className="font-semibold text-orange-600">
                {formatCurrency(business.costs.infrastructure)}
              </span>
            </div>
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-gray-600 font-medium">ROI</span>
              <span className="font-bold text-green-600">{business.costs.roi.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Forecasts */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">🔮 Forecasts (Next Month)</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-700">
              {formatCurrency(business.forecasts.revenue)}
            </div>
            <div className="text-sm text-green-600 mt-2">Projected Revenue</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">
              {business.forecasts.users.toLocaleString()}
            </div>
            <div className="text-sm text-blue-600 mt-2">Projected Users</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
            <div className="text-2xl font-bold text-orange-700">
              {formatCurrency(business.forecasts.costs)}
            </div>
            <div className="text-sm text-orange-600 mt-2">Projected Costs</div>
          </div>
        </div>
      </div>
    </div>
  )
}
