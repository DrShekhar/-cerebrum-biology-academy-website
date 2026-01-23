/**
 * Teacher Analytics Dashboard
 * Comprehensive performance analytics and insights
 */

'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  Calendar,
  FileText,
  Users,
  CheckCircle,
  BookOpen,
  Target,
  Activity,
} from 'lucide-react'
import { showToast } from '@/lib/toast'

interface Analytics {
  success: boolean
  period: string
  overview: {
    totalSessions: number
    totalAssignments: number
    totalSubmissions: number
    activeStudents: number
    activeCourses: number
  }
  sessions: {
    total: number
    scheduled: number
    ongoing: number
    completed: number
    cancelled: number
    averageAttendees: number
  }
  assignments: {
    total: number
    draft: number
    published: number
    closed: number
    totalSubmissions: number
    gradedSubmissions: number
    lateSubmissions: number
    averageScore: string
    submissionRate: string
  }
  attendance: {
    overallRate: string
    totalMarked: number
    monthlyData: Array<{
      month: string
      rate: string
      present: number
      total: number
    }>
  }
  courses: Array<{
    id: string
    name: string
    class: string
    enrollments: number
  }>
  engagement: {
    activeStudents: number
    averageClassSize: number
  }
}

export default function TeacherAnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month')

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const fetchAnalytics = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/teacher/analytics?period=${period}`)
      const result = await response.json()

      if (result.success) {
        setAnalytics(result)
      } else {
        showToast.error(result.error || 'Failed to fetch analytics')
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      showToast.error('Failed to fetch analytics')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">No analytics data available</div>
      </div>
    )
  }

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case 'week':
        return 'Last 7 Days'
      case 'month':
        return 'Last 30 Days'
      case 'quarter':
        return 'Last 90 Days'
      case 'year':
        return 'Last 365 Days'
      default:
        return period
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Performance Analytics</h1>
            <p className="text-gray-600 mt-1">
              Track your teaching performance and student engagement
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant={period === 'week' ? 'default' : 'outline'}
            onClick={() => setPeriod('week')}
            size="sm"
          >
            Week
          </Button>
          <Button
            variant={period === 'month' ? 'default' : 'outline'}
            onClick={() => setPeriod('month')}
            size="sm"
          >
            Month
          </Button>
          <Button
            variant={period === 'quarter' ? 'default' : 'outline'}
            onClick={() => setPeriod('quarter')}
            size="sm"
          >
            Quarter
          </Button>
          <Button
            variant={period === 'year' ? 'default' : 'outline'}
            onClick={() => setPeriod('year')}
            size="sm"
          >
            Year
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Overview - {getPeriodLabel(analytics.period)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics.overview.totalSessions}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Assignments</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics.overview.totalAssignments}
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Submissions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics.overview.totalSubmissions}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Students</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics.overview.activeStudents}
                  </p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Courses</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics.overview.activeCourses}
                  </p>
                </div>
                <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Session Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Sessions</span>
                <span className="text-lg font-semibold">{analytics.sessions.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Scheduled</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {analytics.sessions.scheduled}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Ongoing</span>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  {analytics.sessions.ongoing}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completed</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {analytics.sessions.completed}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cancelled</span>
                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                  {analytics.sessions.cancelled}
                </Badge>
              </div>
              <div className="pt-3 border-t flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Average Attendees</span>
                <span className="text-lg font-bold text-blue-600">
                  {analytics.sessions.averageAttendees}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Assignment Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Assignments</span>
                <span className="text-lg font-semibold">{analytics.assignments.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Draft</span>
                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                  {analytics.assignments.draft}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Published</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {analytics.assignments.published}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Closed</span>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  {analytics.assignments.closed}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Late Submissions</span>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  {analytics.assignments.lateSubmissions}
                </Badge>
              </div>
              <div className="pt-3 border-t space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Average Score</span>
                  <span className="text-lg font-bold text-purple-600">
                    {analytics.assignments.averageScore}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Submission Rate</span>
                  <span className="text-lg font-bold text-green-600">
                    {analytics.assignments.submissionRate}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Attendance Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Attendance Rate</span>
                  <span className="text-2xl font-bold text-green-600">
                    {analytics.attendance.overallRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${analytics.attendance.overallRate}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t">
                <span className="text-sm text-gray-600">Sessions with Attendance Marked</span>
                <span className="text-lg font-semibold">{analytics.attendance.totalMarked}</span>
              </div>

              {analytics.attendance.monthlyData.length > 0 && (
                <div className="pt-3 border-t">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Monthly Breakdown</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {analytics.attendance.monthlyData.slice(0, 6).map((month, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{month.month}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {month.present}/{month.total}
                          </span>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            {month.rate}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-orange-600" />
              Student Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Students</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {analytics.engagement.activeStudents}
                  </p>
                </div>
                <Users className="h-12 w-12 text-orange-400" />
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Class Size</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {analytics.engagement.averageClassSize}
                  </p>
                </div>
                <BookOpen className="h-12 w-12 text-blue-400" />
              </div>

              <div className="pt-3 border-t">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Submission Insights</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Submissions</span>
                    <span className="text-lg font-semibold">
                      {analytics.assignments.totalSubmissions}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Graded</span>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {analytics.assignments.gradedSubmissions}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {analytics.courses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              Course Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Course Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Class</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                      Enrollments
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.courses.map((course, index) => (
                    <tr
                      key={course.id}
                      className={index !== analytics.courses.length - 1 ? 'border-b' : ''}
                    >
                      <td className="py-3 px-4 text-sm text-gray-900">{course.name}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className="bg-indigo-50 text-indigo-700 border-indigo-200"
                        >
                          {course.class}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-flex items-center justify-center min-w-[2rem] h-8 px-3 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                          {course.enrollments}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
