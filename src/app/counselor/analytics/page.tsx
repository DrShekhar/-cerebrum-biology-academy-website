'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useMemo } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Clock,
  Target,
  Phone,
  MessageSquare,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
  RefreshCw,
  Download,
} from 'lucide-react'
import { format } from 'date-fns'
import { showToast } from '@/lib/toast'

// ─── Types ───────────────────────────────────────────────────────────────────

interface AnalyticsData {
  overview: {
    totalLeads: number
    activeLeads: number
    convertedLeads: number
    lostLeads: number
    conversionRate: number
    averageResponseTime: number
  }
  leadsThisWeek: {
    new: number
    contacted: number
    converted: number
    lost: number
  }
  stageDistribution: {
    stage: string
    count: number
    percentage: number
  }[]
  revenueMetrics: {
    totalRevenue: number
    pendingRevenue: number
    paidRevenue: number
    averageDealSize: number
  }
}

// ─── Stat Card Component ─────────────────────────────────────────────────────

function StatCard({
  title,
  value,
  subValue,
  icon: Icon,
  trend,
  trendValue,
  iconBg,
  iconColor,
}: {
  title: string
  value: string
  subValue?: string
  icon: any
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  iconBg: string
  iconColor: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        {trend && trendValue && (
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            trend === 'up' ? 'bg-green-50 text-green-700' :
            trend === 'down' ? 'bg-red-50 text-red-700' :
            'bg-gray-50 text-gray-600'
          }`}>
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : trend === 'down' ? <ArrowDownRight className="w-3 h-3" /> : null}
            {trendValue}
          </div>
        )}
      </div>
      <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
    </div>
  )
}

// ─── Funnel Visualization ────────────────────────────────────────────────────

function ConversionFunnel({ stages }: { stages: { stage: string; count: number; percentage: number }[] }) {
  const maxCount = Math.max(...stages.map(s => s.count), 1)
  
  const stageLabels: Record<string, string> = {
    NEW_LEAD: 'New Leads',
    DEMO_SCHEDULED: 'Demo Scheduled',
    DEMO_COMPLETED: 'Demo Done',
    OFFER_SENT: 'Offer Sent',
    NEGOTIATING: 'Negotiating',
    PAYMENT_PLAN_CREATED: 'Payment Plan',
    ENROLLED: 'Enrolled',
    ACTIVE_STUDENT: 'Active',
    LOST: 'Lost',
  }

  const funnelColors = [
    'from-blue-500 to-blue-400',
    'from-purple-500 to-purple-400',
    'from-indigo-500 to-indigo-400',
    'from-orange-500 to-orange-400',
    'from-yellow-500 to-yellow-400',
    'from-emerald-500 to-emerald-400',
    'from-green-500 to-green-400',
  ]

  const funnelStages = stages.filter(s => s.stage !== 'LOST' && s.stage !== 'ACTIVE_STUDENT')

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Conversion Funnel</h2>
          <p className="text-sm text-gray-500 mt-0.5">Lead progression through stages</p>
        </div>
        <BarChart3 className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-3">
        {funnelStages.map((stage, i) => {
          const widthPercent = Math.max((stage.count / maxCount) * 100, 8)
          const dropOff = i > 0 && funnelStages[i - 1].count > 0
            ? Math.round(((funnelStages[i - 1].count - stage.count) / funnelStages[i - 1].count) * 100)
            : null

          return (
            <div key={stage.stage} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-700">
                  {stageLabels[stage.stage] || stage.stage.replace(/_/g, ' ')}
                </span>
                <div className="flex items-center gap-3">
                  {dropOff !== null && dropOff > 0 && (
                    <span className="text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      ↓ {dropOff}% drop
                    </span>
                  )}
                  <span className="text-sm font-bold text-gray-900">{stage.count}</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-8 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${funnelColors[i % funnelColors.length]} rounded-full flex items-center transition-all duration-700 ease-out`}
                  style={{ width: `${widthPercent}%` }}
                >
                  <span className="text-xs text-white font-medium pl-3 whitespace-nowrap">
                    {stage.percentage}%
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Lost Leads */}
      {stages.find(s => s.stage === 'LOST') && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-red-600 font-medium">❌ Lost Leads</span>
            <span className="text-sm font-bold text-red-600">
              {stages.find(s => s.stage === 'LOST')?.count || 0}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Revenue Cards ───────────────────────────────────────────────────────────

function RevenueSection({ metrics }: { metrics: AnalyticsData['revenueMetrics'] }) {
  const paidPercentage = metrics.totalRevenue > 0
    ? Math.round((metrics.paidRevenue / metrics.totalRevenue) * 100)
    : 0

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Revenue Overview</h2>
          <p className="text-sm text-gray-500 mt-0.5">Financial performance summary</p>
        </div>
        <DollarSign className="w-5 h-5 text-gray-400" />
      </div>

      {/* Total Revenue Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 mb-5 text-white">
        <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
        <p className="text-4xl font-bold mt-1">₹{metrics.totalRevenue.toLocaleString('en-IN')}</p>
        <div className="flex items-center gap-2 mt-3">
          <div className="flex-1 bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-700"
              style={{ width: `${paidPercentage}%` }}
            />
          </div>
          <span className="text-xs text-gray-400">{paidPercentage}% collected</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Paid</p>
          <p className="text-lg font-bold text-green-600">₹{(metrics.paidRevenue / 1000).toFixed(0)}K</p>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Pending</p>
          <p className="text-lg font-bold text-yellow-600">₹{(metrics.pendingRevenue / 1000).toFixed(0)}K</p>
        </div>
        <div className="text-center p-3 bg-indigo-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Avg Deal</p>
          <p className="text-lg font-bold text-indigo-600">₹{(metrics.averageDealSize / 1000).toFixed(0)}K</p>
        </div>
      </div>
    </div>
  )
}

// ─── Weekly Performance ──────────────────────────────────────────────────────

function WeeklyPerformance({ data }: { data: AnalyticsData['leadsThisWeek'] }) {
  const total = data.new + data.contacted + data.converted + data.lost
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-gray-900">This Week</h2>
          <p className="text-sm text-gray-500 mt-0.5">Weekly lead activity</p>
        </div>
        <Calendar className="w-5 h-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-xs text-blue-600 font-medium">New Leads</span>
          </div>
          <p className="text-3xl font-bold text-blue-900">{data.new}</p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs text-green-600 font-medium">Contacted</span>
          </div>
          <p className="text-3xl font-bold text-green-900">{data.contacted}</p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-200/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full" />
            <span className="text-xs text-indigo-600 font-medium">Converted</span>
          </div>
          <p className="text-3xl font-bold text-indigo-900">{data.converted}</p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-red-400 rounded-full" />
            <span className="text-xs text-red-600 font-medium">Lost</span>
          </div>
          <p className="text-3xl font-bold text-red-900">{data.lost}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Main Analytics Page ─────────────────────────────────────────────────────

export default function AnalyticsPageV2() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  async function fetchAnalytics() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/counselor/analytics?range=${timeRange}`, {
        credentials: 'include',
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Failed to fetch analytics')
      setData(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mx-auto mb-3" />
          <p className="text-gray-500">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <p className="text-red-800 font-medium mb-2">{error || 'No data available'}</p>
        <button
          onClick={fetchAnalytics}
          className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Performance metrics and business insights</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>
          <button
            onClick={fetchAnalytics}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Leads"
          value={data.overview.totalLeads.toString()}
          subValue={`${data.overview.activeLeads} active`}
          icon={Users}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Conversions"
          value={data.overview.convertedLeads.toString()}
          subValue={`${data.overview.conversionRate}% rate`}
          icon={Target}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          trend={data.overview.conversionRate >= 20 ? 'up' : 'down'}
          trendValue={`${data.overview.conversionRate}%`}
        />
        <StatCard
          title="Revenue"
          value={`₹${(data.revenueMetrics.totalRevenue / 1000).toFixed(0)}K`}
          subValue={`₹${(data.revenueMetrics.averageDealSize / 1000).toFixed(0)}K avg`}
          icon={DollarSign}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Avg Response"
          value={`${Math.round(data.overview.averageResponseTime / 60)}m`}
          subValue="First contact time"
          icon={Clock}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
          trend={data.overview.averageResponseTime / 60 <= 30 ? 'up' : 'down'}
          trendValue={data.overview.averageResponseTime / 60 <= 30 ? 'Good' : 'Slow'}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConversionFunnel stages={data.stageDistribution} />
        <RevenueSection metrics={data.revenueMetrics} />
      </div>

      {/* Weekly Performance */}
      <WeeklyPerformance data={data.leadsThisWeek} />
    </div>
  )
}
