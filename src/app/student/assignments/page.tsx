'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { AssignmentList } from '@/components/student/AssignmentList'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FileText, Clock, CheckCircle, Award, AlertCircle, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Assignment, StudentAssignmentStats, SubmissionStatus } from '@/types/assignment'

export default function StudentAssignmentsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [assignments, setAssignments] = useState<
    Array<
      Assignment & {
        submission?: {
          id: string
          status: SubmissionStatus
          submittedAt?: Date | string | null
          grade?: number | null
          isLate: boolean
        } | null
        isOverdue?: boolean
      }
    >
  >([])
  const [stats, setStats] = useState<StudentAssignmentStats>({
    totalAssignments: 0,
    pendingSubmissions: 0,
    submittedAssignments: 0,
    gradedAssignments: 0,
    averageGrade: undefined,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/signin')
      return
    }

    if (isAuthenticated && user?.role !== 'STUDENT') {
      router.push('/dashboard')
      return
    }
  }, [authLoading, isAuthenticated, user, router])

  useEffect(() => {
    async function fetchAssignments() {
      try {
        setLoading(true)
        const response = await fetch('/api/student/assignments')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch assignments')
        }

        setAssignments(data.assignments)
        setStats(data.stats)
      } catch (err) {
        console.error('Error fetching assignments:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch assignments')
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated && user?.role === 'STUDENT') {
      fetchAssignments()
    }
  }, [isAuthenticated, user])

  if (authLoading || loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="border-red-200">
            <CardContent className="p-6">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Error Loading Assignments
                </h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Assignments</h1>
              <p className="text-gray-600 mt-1">Track and submit your assignments</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<FileText className="w-5 h-5" />}
              label="Total Assignments"
              value={stats.totalAssignments}
              color="text-blue-600 bg-blue-50"
            />
            <StatCard
              icon={<Clock className="w-5 h-5" />}
              label="Pending Submissions"
              value={stats.pendingSubmissions}
              color="text-yellow-600 bg-yellow-50"
            />
            <StatCard
              icon={<CheckCircle className="w-5 h-5" />}
              label="Submitted"
              value={stats.submittedAssignments}
              color="text-green-600 bg-green-50"
            />
            <StatCard
              icon={<Award className="w-5 h-5" />}
              label="Average Grade"
              value={stats.averageGrade ? `${stats.averageGrade.toFixed(1)}%` : 'N/A'}
              color="text-purple-600 bg-purple-50"
            />
          </div>

          <AssignmentList assignments={assignments} loading={false} />
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  color: string
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
          <div className={cn('p-3 rounded-lg', color)}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
