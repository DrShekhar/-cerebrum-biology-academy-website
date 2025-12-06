'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  Server,
  DollarSign,
  TrendingUp,
  Activity,
  Database,
  Shield,
  Zap,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Download,
  Settings,
  BarChart3,
  PieChart,
  Globe,
  Clock,
} from 'lucide-react'
import type { AdminAnalytics } from '@/lib/types/analytics'

export default function AdminDashboard() {
  const { user, isLoading } = useAuth()
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null)
  const [realTimeData, setRealTimeData] = useState<any>(null)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [selectedMetric, setSelectedMetric] = useState('users')

  useEffect(() => {
    if (user) {
      fetchAnalyticsData()
      fetchRealTimeData()

      // Set up real-time updates
      const interval = setInterval(fetchRealTimeData, 30000) // Update every 30 seconds
      return () => clearInterval(interval)
    }
  }, [user])

  const fetchAnalyticsData = async () => {
    setIsLoadingData(true)
    try {
      const response = await fetch('/api/analytics/dashboard?type=admin')
      const data = await response.json()

      if (data.success) {
        setAnalytics(data.data)
      }
    } catch (error) {
      console.error('Error fetching admin analytics:', error)
    } finally {
      setIsLoadingData(false)
    }
  }

  const fetchRealTimeData = async () => {
    try {
      const response = await fetch('/api/analytics/real-time')
      const data = await response.json()

      if (data.success) {
        setRealTimeData(data.data)
      }
    } catch (error) {
      console.error('Error fetching real-time data:', error)
    }
  }

  const exportSystemReport = async () => {
    try {
      const response = await fetch('/api/analytics/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'system_analytics',
          options: {
            format: 'pdf',
            timeRange: {
              from: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
              to: new Date(),
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
        a.download = `system-report-${new Date().toISOString().split('T')[0]}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Error exporting system report:', error)
    }
  }

  if (isLoading || !user) {
    return <LoadingDashboard />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">System overview and performance monitoring</p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={exportSystemReport}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              System Report
            </Button>
            <Button className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Real-time Status Bar */}
        {realTimeData && (
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900">System Online</span>
                </div>
                <div className="text-sm text-gray-600">
                  <Activity className="w-4 h-4 inline mr-1" />
                  {realTimeData.activeUsers} active users
                </div>
                <div className="text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 inline mr-1" />
                  {realTimeData.completedTestsToday} tests completed today
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        )}

        {/* Key Metrics Grid */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <MetricCard
              title="Total Users"
              value={analytics.systemMetrics.totalUsers}
              icon={<Users className="w-6 h-6 text-blue-600" />}
              trend={analytics.systemMetrics.monthlyGrowth}
              format="number"
              status="good"
            />
            <MetricCard
              title="System Uptime"
              value={analytics.performanceMetrics.systemUptime}
              icon={<Server className="w-6 h-6 text-green-600" />}
              trend={0}
              format="percentage"
              status="excellent"
            />
            <MetricCard
              title="Response Time"
              value={analytics.performanceMetrics.averageResponseTime}
              icon={<Zap className="w-6 h-6 text-yellow-600" />}
              trend={0}
              format="time"
              status="good"
            />
            <MetricCard
              title="Revenue"
              value={analytics.businessMetrics.revenue}
              icon={<DollarSign className="w-6 h-6 text-purple-600" />}
              trend={0}
              format="currency"
              status="good"
            />
          </div>
        )}

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <SystemHealthItem
                      name="Database"
                      status="healthy"
                      value="99.9% uptime"
                      description="All connections stable"
                    />
                    <SystemHealthItem
                      name="API Gateway"
                      status="healthy"
                      value="250ms avg"
                      description="Response time optimal"
                    />
                    <SystemHealthItem
                      name="Storage"
                      status="warning"
                      value="78% used"
                      description="Consider scaling soon"
                    />
                    <SystemHealthItem
                      name="CDN"
                      status="healthy"
                      value="Global"
                      description="All regions operational"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { action: 'New user registration', count: 23, time: '5 min ago' },
                      { action: 'Tests completed', count: 156, time: '15 min ago' },
                      { action: 'Payment processed', count: 8, time: '1 hour ago' },
                      { action: 'Content uploaded', count: 3, time: '2 hours ago' },
                      { action: 'System backup', count: 1, time: '6 hours ago' },
                    ].map((activity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                      >
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            {activity.action}
                          </span>
                          <span className="text-sm text-gray-600 ml-2">({activity.count})</span>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">User growth chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Revenue chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {analytics && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Students</span>
                        <span className="font-semibold">
                          {analytics.systemMetrics.totalStudents}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Teachers</span>
                        <span className="font-semibold">
                          {analytics.systemMetrics.totalTeachers}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Growth</span>
                        <span className="font-semibold text-green-600">
                          +{analytics.systemMetrics.monthlyGrowth.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Churn Rate</span>
                        <span className="font-semibold text-red-600">
                          {analytics.systemMetrics.churnRate.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>User Activity Heatmap</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Activity heatmap will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            {analytics && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Questions</span>
                        <span className="font-semibold">
                          {analytics.contentMetrics.totalQuestions}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Tests</span>
                        <span className="font-semibold">{analytics.contentMetrics.totalTests}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Average Rating</span>
                        <span className="font-semibold">
                          {analytics.contentMetrics.averageRating}/5
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Content Gaps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analytics.contentMetrics.contentGaps.length > 0 ? (
                        analytics.contentMetrics.contentGaps.map((gap, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                          >
                            <span className="text-sm text-yellow-800">{gap}</span>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <span className="text-sm text-green-800">No content gaps identified</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {analytics && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <PerformanceMetric
                        name="System Uptime"
                        value={`${analytics.performanceMetrics.systemUptime}%`}
                        status="excellent"
                      />
                      <PerformanceMetric
                        name="Avg Response Time"
                        value={`${analytics.performanceMetrics.averageResponseTime}ms`}
                        status="good"
                      />
                      <PerformanceMetric
                        name="Error Rate"
                        value={`${analytics.performanceMetrics.errorRate}%`}
                        status="good"
                      />
                      <PerformanceMetric
                        name="Server Load"
                        value={`${analytics.performanceMetrics.serverLoad}%`}
                        status="warning"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">
                        Performance trends chart will be displayed here
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            {analytics && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Revenue</span>
                        <span className="font-semibold">
                          ₹{analytics.businessMetrics.revenue.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Conversion Rate</span>
                        <span className="font-semibold">
                          {analytics.businessMetrics.conversionRate}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Customer LTV</span>
                        <span className="font-semibold">
                          ₹{analytics.businessMetrics.customerLifetimeValue.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Cost per Acquisition</span>
                        <span className="font-semibold">
                          ₹{analytics.businessMetrics.costPerAcquisition.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Forecast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Revenue forecast chart will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  icon,
  trend,
  format,
  status,
}: {
  title: string
  value: number
  icon: React.ReactNode
  trend: number
  format: 'number' | 'percentage' | 'time' | 'currency'
  status: 'excellent' | 'good' | 'warning' | 'critical'
}) {
  const formatValue = (val: number, fmt: string) => {
    switch (fmt) {
      case 'percentage':
        return `${Math.round(val * 100) / 100}%`
      case 'time':
        return `${Math.round(val)}ms`
      case 'currency':
        return `₹${val.toLocaleString()}`
      default:
        return Math.round(val).toString()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'border-green-500 bg-green-50'
      case 'good':
        return 'border-blue-500 bg-blue-50'
      case 'warning':
        return 'border-yellow-500 bg-yellow-50'
      case 'critical':
        return 'border-red-500 bg-red-50'
      default:
        return 'border-gray-300 bg-white'
    }
  }

  return (
    <Card className={getStatusColor(status)}>
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
          <div className="p-3 bg-white rounded-lg shadow-sm">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function SystemHealthItem({
  name,
  status,
  value,
  description,
}: {
  name: string
  status: 'healthy' | 'warning' | 'critical'
  value: string
  description: string
}) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <CheckCircle className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
      <div className="flex items-center gap-3">
        {getStatusIcon(status)}
        <div>
          <span className="font-medium text-gray-900">{name}</span>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  )
}

function PerformanceMetric({
  name,
  value,
  status,
}: {
  name: string
  value: string
  status: 'excellent' | 'good' | 'warning' | 'critical'
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100'
      case 'good':
        return 'text-blue-600 bg-blue-100'
      case 'warning':
        return 'text-yellow-600 bg-yellow-100'
      case 'critical':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700">{name}</span>
      <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(status)}`}>
        {value}
      </span>
    </div>
  )
}

function LoadingDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
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
