'use client'

import { useState, useEffect } from 'react'
import {
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  Target,
  Clock,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'

interface CoursePerformance {
  id: string
  name: string
  type: string
  enrolledStudents: number
  activeStudents: number
  completionRate: number
  avgTestScore: number
  avgProgress: number
  totalAssignments: number
  submissionRate: number
}

export default function CoursePerformancePage() {
  const [courses, setCourses] = useState<CoursePerformance[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPerformanceData()
  }, [])

  async function fetchPerformanceData() {
    try {
      setIsLoading(true)
      const res = await fetch('/api/admin/courses/performance')
      const data = await res.json()
      if (data.success) {
        setCourses(data.courses || [])
      }
    } catch (err) {
      console.error('Failed to fetch performance data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const totalStudents = courses.reduce((sum, c) => sum + c.enrolledStudents, 0)
  const avgCompletion = courses.length > 0
    ? Math.round(courses.reduce((sum, c) => sum + c.completionRate, 0) / courses.length)
    : 0
  const avgScore = courses.length > 0
    ? Math.round(courses.reduce((sum, c) => sum + c.avgTestScore, 0) / courses.length)
    : 0
  const avgSubmissionRate = courses.length > 0
    ? Math.round(courses.reduce((sum, c) => sum + c.submissionRate, 0) / courses.length)
    : 0

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Performance</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track student progress, completion rates, and test scores across all courses
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Users className="h-5 w-5 text-blue-600" />}
            label="Total Enrolled"
            value={totalStudents}
            bg="bg-blue-50"
          />
          <StatCard
            icon={<Target className="h-5 w-5 text-green-600" />}
            label="Avg Completion"
            value={`${avgCompletion}%`}
            bg="bg-green-50"
          />
          <StatCard
            icon={<BarChart3 className="h-5 w-5 text-purple-600" />}
            label="Avg Test Score"
            value={`${avgScore}%`}
            bg="bg-purple-50"
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5 text-orange-600" />}
            label="Submission Rate"
            value={`${avgSubmissionRate}%`}
            bg="bg-orange-50"
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          </div>
        ) : courses.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No course data yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Performance data will appear once students are enrolled in courses.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Avg Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Completion
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Avg Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Submissions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="font-medium text-gray-900">{course.name}</div>
                      <div className="text-sm text-gray-500">{course.type}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {course.activeStudents}/{course.enrolledStudents}
                      <span className="ml-1 text-xs text-gray-400">active</span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <ProgressBar value={course.avgProgress} />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <ProgressBar value={course.completionRate} color="green" />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`text-sm font-medium ${course.avgTestScore >= 70 ? 'text-green-600' : course.avgTestScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {course.avgTestScore}%
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {course.submissionRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

function StatCard({ icon, label, value, bg }: { icon: React.ReactNode; label: string; value: string | number; bg: string }) {
  return (
    <div className={`rounded-lg ${bg} p-4`}>
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

function ProgressBar({ value, color = 'blue' }: { value: number; color?: string }) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
  }

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-20 overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full ${colorMap[color] || 'bg-blue-500'}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      <span className="text-sm text-gray-600">{value}%</span>
    </div>
  )
}
