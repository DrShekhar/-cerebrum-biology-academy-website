'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { useFirebaseSession } from '@/hooks/useFirebaseSession'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  TrendingUp,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Download,
  Search,
  BarChart3,
  Activity,
  ShieldX,
} from 'lucide-react'
import type { TeacherAnalytics } from '@/lib/types/analytics'

// SECURITY (2026-01-29): Unauthorized access component for non-teachers
function UnauthorizedAccess({ userRole }: { userRole?: string }) {
  const router = useRouter()

  const getRedirectPath = () => {
    switch (userRole?.toUpperCase()) {
      case 'ADMIN':
        return '/dashboard/admin'
      case 'STUDENT':
        return '/student/dashboard'
      case 'PARENT':
        return '/parent/dashboard'
      case 'CONSULTANT':
        return '/consultant/dashboard'
      default:
        return '/dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldX className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don&apos;t have permission to access the Teacher Dashboard. This area is restricted to
          teachers only.
        </p>
        <div className="space-y-3">
          <Button
            onClick={() => router.push(getRedirectPath())}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Go to Your Dashboard
          </Button>
          <Button onClick={() => router.push('/')} variant="outline" className="w-full">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function TeacherDashboard() {
  const { user, isLoading } = useFirebaseSession()
  const router = useRouter()
  const [analytics, setAnalytics] = useState<TeacherAnalytics | null>(null)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [selectedGrade, setSelectedGrade] = useState('CLASS_12')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'score' | 'improvement' | 'lastActive'>('score')

  useEffect(() => {
    if (user) {
      fetchAnalyticsData()
    }
  }, [user, selectedGrade])

  const fetchAnalyticsData = async () => {
    setIsLoadingData(true)
    try {
      const response = await fetch(`/api/analytics/dashboard?type=teacher&grade=${selectedGrade}`)
      const data = await response.json()

      if (data.success) {
        setAnalytics(data.data)
      }
    } catch (error) {
      console.error('Error fetching teacher analytics:', error)
    } finally {
      setIsLoadingData(false)
    }
  }

  const exportClassReport = async (format: 'pdf' | 'csv') => {
    try {
      const response = await fetch('/api/analytics/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'class_analytics',
          grade: selectedGrade,
          options: {
            format,
            timeRange: {
              from: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
              to: new Date(),
            },
            filters: { grade: selectedGrade },
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
        a.download = `class-report-${selectedGrade}-${new Date().toISOString().split('T')[0]}.${format}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Error exporting report:', error)
    }
  }

  const filteredStudents =
    analytics?.studentProgress
      ?.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name)
          case 'score':
            return b.averageScore - a.averageScore
          case 'improvement':
            return b.improvement - a.improvement
          case 'lastActive':
            return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
          default:
            return 0
        }
      }) || []

  if (isLoading || !user) {
    return <LoadingDashboard />
  }

  // SECURITY (2026-01-29): Verify user has TEACHER role
  // This is client-side enforcement; API endpoints must also verify role
  const userRole = user?.role?.toUpperCase()
  if (userRole !== 'TEACHER' && userRole !== 'ADMIN') {
    return <UnauthorizedAccess userRole={userRole} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
            <p className="text-gray-600 mt-2">Monitor student progress and class performance</p>
          </div>

          <div className="flex gap-2">
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="CLASS_9">Class 9</option>
              <option value="CLASS_10">Class 10</option>
              <option value="CLASS_11">Class 11</option>
              <option value="CLASS_12">Class 12</option>
              <option value="DROPPER">Dropper</option>
            </select>

            <Button
              onClick={() => exportClassReport('pdf')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Class Overview Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <MetricCard
              title="Total Students"
              value={analytics.classOverview.totalStudents}
              icon={<Users className="w-6 h-6 text-blue-600" />}
              trend={0}
              format="number"
            />
            <MetricCard
              title="Class Average"
              value={analytics.classOverview.classAverage}
              icon={<BarChart3 className="w-6 h-6 text-green-600" />}
              trend={analytics.classOverview.improvement}
              format="percentage"
            />
            <MetricCard
              title="Active Students"
              value={analytics.engagementMetrics.dailyActiveStudents}
              icon={<Activity className="w-6 h-6 text-orange-600" />}
              trend={0}
              format="number"
            />
            <MetricCard
              title="Weekly Tests"
              value={analytics.engagementMetrics.weeklyTestCompletion}
              icon={<BookOpen className="w-6 h-6 text-purple-600" />}
              trend={0}
              format="number"
            />
          </div>
        )}

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            {/* Student Search and Filter */}
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="score">Sort by Score</option>
                <option value="name">Sort by Name</option>
                <option value="improvement">Sort by Improvement</option>
                <option value="lastActive">Sort by Last Active</option>
              </select>
            </div>

            {/* Students List */}
            <div className="grid gap-4">
              {filteredStudents.map((student) => (
                <Card key={student.studentId} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-600">
                            {student.testsTaken} tests completed
                          </p>
                          <p className="text-xs text-gray-500">
                            Last active: {new Date(student.lastActive).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {student.averageScore.toFixed(1)}%
                        </div>
                        <div
                          className={`text-sm flex items-center gap-1 justify-end ${
                            student.improvement > 0
                              ? 'text-green-600'
                              : student.improvement < 0
                                ? 'text-red-600'
                                : 'text-gray-600'
                          }`}
                        >
                          <TrendingUp
                            className={`w-3 h-3 ${student.improvement < 0 ? 'rotate-180' : ''}`}
                          />
                          {Math.abs(student.improvement).toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    {/* Student Struggling Topics */}
                    {student.strugglingTopics.length > 0 && (
                      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">
                            Needs Attention
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {student.strugglingTopics.map((topic, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Class Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Class Performance Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Performance chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              {/* Score Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Score Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { range: '90-100%', count: 5, color: 'bg-green-600' },
                      { range: '80-89%', count: 12, color: 'bg-blue-500' },
                      { range: '70-79%', count: 8, color: 'bg-yellow-500' },
                      { range: '60-69%', count: 4, color: 'bg-orange-500' },
                      { range: '0-59%', count: 2, color: 'bg-red-500' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-16 text-sm text-gray-600">{item.range}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${item.color}`}
                            style={{ width: `${(item.count / 31) * 100}%` }}
                          />
                        </div>
                        <div className="w-8 text-sm text-gray-600">{item.count}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="topics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Topic-wise Class Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { topic: 'Cell Biology', average: 85, struggling: 3 },
                    { topic: 'Genetics', average: 78, struggling: 6 },
                    { topic: 'Ecology', average: 82, struggling: 4 },
                    { topic: 'Plant Physiology', average: 75, struggling: 8 },
                    { topic: 'Human Physiology', average: 80, struggling: 5 },
                  ].map((topic, idx) => (
                    <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{topic.topic}</h4>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-gray-900">{topic.average}%</span>
                          <span className="text-sm text-red-600">
                            {topic.struggling} students struggling
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            topic.average >= 80
                              ? 'bg-green-600'
                              : topic.average >= 70
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                          }`}
                          style={{ width: `${topic.average}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">Strong Performance</span>
                      </div>
                      <p className="text-sm text-green-700">
                        85% of students are performing above class average in Cell Biology
                      </p>
                    </div>

                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium text-yellow-800">Needs Attention</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Plant Physiology has the highest number of struggling students
                      </p>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Improving Trend</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Overall class average improved by 3.2% this month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">Focus on Plant Physiology</h5>
                      <p className="text-sm text-gray-600">
                        Consider extra practice sessions for photosynthesis and respiration
                      </p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">Increase Test Frequency</h5>
                      <p className="text-sm text-gray-600">
                        Weekly mini-tests can help identify struggling areas earlier
                      </p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">Peer Learning</h5>
                      <p className="text-sm text-gray-600">
                        Pair strong performers with struggling students for peer tutoring
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
}: {
  title: string
  value: number
  icon: React.ReactNode
  trend: number
  format: 'number' | 'percentage'
}) {
  const formatValue = (val: number, fmt: string) => {
    switch (fmt) {
      case 'percentage':
        return `${Math.round(val * 100) / 100}%`
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
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
