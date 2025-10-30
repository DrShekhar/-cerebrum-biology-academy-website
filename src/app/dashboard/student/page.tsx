'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { DashboardAccessControl } from '@/components/DashboardAccessControl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Trophy,
  TrendingUp,
  Clock,
  Target,
  BookOpen,
  Award,
  BarChart3,
  Download,
  Zap,
  Brain,
} from 'lucide-react'
import { PerformanceChart } from '@/components/analytics/PerformanceChart'
import { TopicAnalysisChart } from '@/components/analytics/TopicAnalysisChart'
import { ProgressTrendChart } from '@/components/analytics/ProgressTrendChart'
import { LeaderboardWidget } from '@/components/analytics/LeaderboardWidget'
import { AchievementsBadge } from '@/components/analytics/AchievementsBadge'
import type {
  UserPerformanceData,
  PerformanceMetrics,
  ComparativeAnalytics,
  Leaderboard,
} from '@/lib/types/analytics'

export default function StudentDashboard() {
  const { user, isLoading } = useAuth()
  const [performanceData, setPerformanceData] = useState<UserPerformanceData | null>(null)
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [comparative, setComparative] = useState<ComparativeAnalytics | null>(null)
  const [leaderboard, setLeaderboard] = useState<Leaderboard | null>(null)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month')

  useEffect(() => {
    if (user) {
      fetchAnalyticsData()
    }
  }, [user, selectedPeriod])

  const fetchAnalyticsData = async () => {
    if (!user) return

    setIsLoadingData(true)
    try {
      // Fetch performance data
      const [performanceRes, metricsRes, comparativeRes, leaderboardRes] = await Promise.all([
        fetch(`/api/analytics/performance`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            timeRange: {
              from: getPeriodStartDate(selectedPeriod),
              to: new Date(),
            },
          }),
        }),
        fetch(`/api/analytics/performance?userId=${user.id}&period=${selectedPeriod}`),
        fetch(`/api/analytics/comparative?userId=${user.id}&grade=${user.grade || 'CLASS_12'}`),
        fetch(`/api/analytics/leaderboard?type=global&period=weekly&userId=${user.id}`),
      ])

      const [performanceData, metricsData, comparativeData, leaderboardData] = await Promise.all([
        performanceRes.json(),
        metricsRes.json(),
        comparativeRes.json(),
        leaderboardRes.json(),
      ])

      if (performanceData.success) setPerformanceData(performanceData.data)
      if (metricsData.success) setMetrics(metricsData.data)
      if (comparativeData.success) setComparative(comparativeData.data)
      if (leaderboardData.success) setLeaderboard(leaderboardData.data)
    } catch (error) {
      console.error('Error fetching analytics data:', error)
    } finally {
      setIsLoadingData(false)
    }
  }

  const getPeriodStartDate = (period: 'week' | 'month' | 'quarter') => {
    const now = new Date()
    switch (period) {
      case 'week':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      case 'month':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      case 'quarter':
        return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
    }
  }

  const exportReport = async (format: 'pdf' | 'csv') => {
    if (!user) return

    try {
      const response = await fetch('/api/analytics/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'user_performance',
          userId: user.id,
          options: {
            format,
            timeRange: {
              from: getPeriodStartDate(selectedPeriod),
              to: new Date(),
            },
            filters: {
              userId: user.id,
              grade: user.grade,
            },
            includeCharts: true,
            includeRawData: true,
          },
        }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `performance-report-${new Date().toISOString().split('T')[0]}.${format}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Error exporting report:', error)
    }
  }

  if (isLoading || !user) {
    return <LoadingDashboard />
  }

  return (
    <DashboardAccessControl dashboardType="ANALYTICS" fallbackRoute="/student/dashboard">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name || 'Student'}!
              </h1>
              <p className="text-gray-600 mt-2">
                Track your NEET Biology preparation progress and performance insights
              </p>
            </div>

            <div className="flex gap-2">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
              </select>

              <Button
                onClick={() => exportReport('pdf')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </Button>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Tests Completed"
              value={metrics?.totalTests || 0}
              icon={<BookOpen className="w-6 h-6 text-blue-600" />}
              trend={metrics?.improvement || 0}
              format="number"
            />
            <MetricCard
              title="Average Score"
              value={metrics?.averageScore || 0}
              icon={<Target className="w-6 h-6 text-green-600" />}
              trend={metrics?.improvement || 0}
              format="percentage"
            />
            <MetricCard
              title="Study Time"
              value={(metrics?.totalStudyTime || 0) / 60}
              icon={<Clock className="w-6 h-6 text-orange-600" />}
              trend={0}
              format="time"
            />
            <MetricCard
              title="Accuracy"
              value={metrics?.accuracy || 0}
              icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
              trend={metrics?.improvement || 0}
              format="percentage"
            />
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Progress Trend Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Progress Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {performanceData?.progressTrend && (
                      <ProgressTrendChart data={performanceData.progressTrend} />
                    )}
                  </CardContent>
                </Card>

                {/* Leaderboard */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      Leaderboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {leaderboard && (
                      <LeaderboardWidget leaderboard={leaderboard} currentUser={user} />
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Achievements and Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {performanceData?.achievements && (
                      <AchievementsBadge achievements={performanceData.achievements} />
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      Recommended Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {performanceData?.weaknesses?.length > 0 && (
                        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                          <h4 className="font-medium text-red-800 mb-2">Focus Areas</h4>
                          <ul className="text-sm text-red-700 space-y-1">
                            {performanceData.weaknesses.map((topic, idx) => (
                              <li key={idx}>• Practice more {topic} questions</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {performanceData?.strengths?.length > 0 && (
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-medium text-green-800 mb-2">Strengths</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            {performanceData.strengths.map((topic, idx) => (
                              <li key={idx}>• Excellent in {topic}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  {performanceData && (
                    <PerformanceChart data={performanceData} period={selectedPeriod} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="topics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Topic-wise Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  {performanceData?.topicPerformance && (
                    <TopicAnalysisChart data={performanceData.topicPerformance} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Class Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {comparative && (
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">
                            #{comparative.user.rank}
                          </div>
                          <div className="text-gray-600">Class Rank</div>
                          <div className="text-sm text-gray-500">
                            {Math.round(comparative.percentile)}th percentile
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Your Score</span>
                            <span className="font-semibold">
                              {Math.round(comparative.user.score * 100) / 100}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Class Average</span>
                            <span className="font-semibold">
                              {Math.round(comparative.class.averageScore * 100) / 100}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Difference</span>
                            <span
                              className={`font-semibold ${
                                comparative.comparison.scoreComparison >= 0
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {comparative.comparison.scoreComparison >= 0 ? '+' : ''}
                              {Math.round(comparative.comparison.scoreComparison * 100) / 100}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Performers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {comparative?.class.topPerformers && (
                      <div className="space-y-3">
                        {comparative.class.topPerformers.map((performer, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  idx === 0
                                    ? 'bg-yellow-500 text-white'
                                    : idx === 1
                                      ? 'bg-gray-400 text-white'
                                      : idx === 2
                                        ? 'bg-amber-600 text-white'
                                        : 'bg-gray-200 text-gray-700'
                                }`}
                              >
                                {performer.rank}
                              </div>
                              <span className="font-medium">{performer.name}</span>
                            </div>
                            <span className="text-gray-600">
                              {Math.round(performer.score * 100) / 100}%
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardAccessControl>
  )
}

function MetricCard({
  title,
  value,
  icon,
  trend,
  format,
}: {
  title: string
  value: number
  icon: React.ReactNode
  trend: number
  format: 'number' | 'percentage' | 'time'
}) {
  const formatValue = (val: number, fmt: string) => {
    switch (fmt) {
      case 'percentage':
        return `${Math.round(val * 100) / 100}%`
      case 'time':
        return `${Math.round(val)}m`
      default:
        return Math.round(val).toString()
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{formatValue(value, format)}</p>
            {trend !== 0 && (
              <p
                className={`text-sm flex items-center gap-1 ${
                  trend > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                <TrendingUp className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
                {Math.abs(trend).toFixed(1)}%
              </p>
            )}
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function LoadingDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-300 rounded-lg"></div>
            ))}
          </div>

          <div className="h-96 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}
