/**
 * Counselor KPI Dashboard Page
 * View personal KPIs, trends, and goals
 */

'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { KPIStatisticsWidget } from '@/components/counselor/KPIStatisticsWidget'
import { TrendingUp, TrendingDown, Target, Award } from 'lucide-react'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'

interface KPIData {
  period: string
  startDate: string
  endDate: string
  metrics: {
    leadsCreated: number
    leadsContacted: number
    leadsConverted: number
    demosScheduled: number
    demosCompleted: number
    demosNoShow: number
    callsMade: number
    callDurationTotal: number
    whatsappsSent: number
    emailsSent: number
    followUpsMade: number
    tasksCompleted: number
    tasksPending: number
    revenueGenerated: number
    enrollmentsGenerated: number
  }
  calculated: {
    conversionRate: number
    avgDealValue: number
  }
}

interface Trend {
  change: number
  direction: 'up' | 'down' | 'stable'
}

interface TrendsData {
  period: {
    start: string
    end: string
    days: number
  }
  summary: {
    avgConversionRate: number
    avgDailyLeads: number
    avgDailyConversions: number
    totalRevenue: number
    totalLeadsCreated: number
    totalLeadsConverted: number
  }
  trends: {
    leads: Trend
    conversions: Trend
    revenue: Trend
  }
}

interface Goal {
  id: string
  goalType: string
  period: string
  targetValue: number
  currentValue: number
  progress: number
  status: string
  isAchieved: boolean
  isMissed: boolean
  startDate: string
  endDate: string
}

export default function CounselorKPIsPage() {
  const [period, setPeriod] = useState<string>('month')
  const [kpiData, setKpiData] = useState<KPIData | null>(null)
  const [trendsData, setTrendsData] = useState<TrendsData | null>(null)
  const [goals, setGoals] = useState<Goal[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchKPIData()
    fetchTrends()
    fetchGoals()
  }, [period])

  const fetchKPIData = async () => {
    try {
      const response = await fetch(`/api/counselor/kpis?period=${period}`)
      const result = await response.json()

      if (result.success) {
        setKpiData(result.data)
      } else {
        showToast.error(result.error || 'Failed to fetch KPI data')
      }
    } catch (error) {
      console.error('Error fetching KPI data:', error)
      showToast.error('Failed to fetch KPI data')
    }
  }

  const fetchTrends = async () => {
    try {
      const days = period === 'month' ? 30 : period === 'week' ? 7 : 1
      const response = await fetch(`/api/counselor/kpis/trends?days=${days}`)
      const result = await response.json()

      if (result.success) {
        setTrendsData(result.data)
      }
    } catch (error) {
      console.error('Error fetching trends:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchGoals = async () => {
    try {
      const response = await fetch(
        `/api/counselor/goals?status=ACTIVE&period=${period.toUpperCase()}`
      )
      const result = await response.json()

      if (result.success) {
        setGoals(result.data.goals || [])
      }
    } catch (error) {
      console.error('Error fetching goals:', error)
    }
  }

  const getTrendIcon = (direction: string) => {
    if (direction === 'up') return <TrendingUp className="w-5 h-5 text-green-600" />
    if (direction === 'down') return <TrendingDown className="w-5 h-5 text-red-600" />
    return <div className="w-5 h-5" />
  }

  const getTrendColor = (direction: string) => {
    if (direction === 'up') return 'text-green-600'
    if (direction === 'down') return 'text-red-600'
    return 'text-gray-600'
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading KPI dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Performance</h1>
            <p className="text-gray-600 mt-1">Track your KPIs and achieve your goals</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={period === 'today' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setPeriod('today')}
            >
              Today
            </Button>
            <Button
              variant={period === 'week' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setPeriod('week')}
            >
              Week
            </Button>
            <Button
              variant={period === 'month' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setPeriod('month')}
            >
              Month
            </Button>
          </div>
        </div>

        {kpiData && (
          <KPIStatisticsWidget
            metrics={kpiData.metrics}
            calculated={kpiData.calculated}
            period={kpiData.period}
          />
        )}

        {trendsData && (
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Leads Trend</p>
                    <p
                      className={cn(
                        'text-2xl font-bold',
                        getTrendColor(trendsData.trends.leads.direction)
                      )}
                    >
                      {trendsData.trends.leads.change > 0 ? '+' : ''}
                      {trendsData.trends.leads.change.toFixed(1)}%
                    </p>
                  </div>
                  {getTrendIcon(trendsData.trends.leads.direction)}
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Conversions Trend</p>
                    <p
                      className={cn(
                        'text-2xl font-bold',
                        getTrendColor(trendsData.trends.conversions.direction)
                      )}
                    >
                      {trendsData.trends.conversions.change > 0 ? '+' : ''}
                      {trendsData.trends.conversions.change.toFixed(1)}%
                    </p>
                  </div>
                  {getTrendIcon(trendsData.trends.conversions.direction)}
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Revenue Trend</p>
                    <p
                      className={cn(
                        'text-2xl font-bold',
                        getTrendColor(trendsData.trends.revenue.direction)
                      )}
                    >
                      {trendsData.trends.revenue.change > 0 ? '+' : ''}
                      {trendsData.trends.revenue.change.toFixed(1)}%
                    </p>
                  </div>
                  {getTrendIcon(trendsData.trends.revenue.direction)}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {goals.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Active Goals
                </CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {goals.slice(0, 3).map((goal) => (
                  <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {goal.goalType.replace(/_/g, ' ')}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {goal.currentValue} / {goal.targetValue}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {goal.progress.toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(goal.progress, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
