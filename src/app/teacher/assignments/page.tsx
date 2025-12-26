'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { FileText, Plus, Search, Edit, Trash2, Users, CheckCircle, Clock, Eye } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Assignment, AssignmentStatus, AssignmentStats } from '@/types/assignment'

export default function TeacherAssignmentsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [assignments, setAssignments] = useState<
    Array<
      Assignment & {
        submissionStats?: {
          total: number
          submitted: number
          graded: number
          pending: number
          late: number
        }
      }
    >
  >([])
  const [stats, setStats] = useState<AssignmentStats>({
    totalAssignments: 0,
    draftAssignments: 0,
    publishedAssignments: 0,
    closedAssignments: 0,
    upcomingDeadlines: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'TEACHER')) {
      window.location.href = '/auth/signin'
      return
    }
  }, [authLoading, isAuthenticated, user])

  useEffect(() => {
    async function fetchAssignments() {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (searchQuery) params.append('search', searchQuery)
        if (statusFilter !== 'all') params.append('status', statusFilter)

        const response = await fetch(`/api/teacher/assignments?${params}`)
        const data = await response.json()

        if (response.ok) {
          setAssignments(data.assignments)
          setStats(data.stats)
        }
      } catch (error) {
        console.error('Error fetching assignments:', error)
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated && user?.role === 'TEACHER') {
      fetchAssignments()
    }
  }, [isAuthenticated, user, searchQuery, statusFilter])

  const handleDelete = async (assignmentId: string) => {
    if (!confirm('Are you sure you want to delete this assignment?')) return

    try {
      const response = await fetch(`/api/teacher/assignments/${assignmentId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setAssignments((prev) => prev.filter((a) => a.id !== assignmentId))
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to delete assignment')
      }
    } catch (error) {
      console.error('Error deleting assignment:', error)
      alert('Failed to delete assignment')
    }
  }

  const handleStatusChange = async (assignmentId: string, newStatus: AssignmentStatus) => {
    try {
      const response = await fetch(`/api/teacher/assignments/${assignmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setAssignments((prev) =>
          prev.map((a) => (a.id === assignmentId ? { ...a, status: newStatus } : a))
        )
      }
    } catch (error) {
      console.error('Error updating assignment status:', error)
    }
  }

  if (authLoading || loading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Assignments</h1>
              <p className="text-gray-600 mt-1">Manage and grade student assignments</p>
            </div>
            <Link href="/teacher/assignments/create">
              <Button variant="primary">
                <Plus className="w-4 h-4 mr-2" />
                Create Assignment
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard
              icon={<FileText className="w-5 h-5" />}
              label="Total"
              value={stats.totalAssignments}
              color="text-blue-600 bg-blue-50"
            />
            <StatCard
              icon={<Edit className="w-5 h-5" />}
              label="Drafts"
              value={stats.draftAssignments}
              color="text-gray-600 bg-gray-50"
            />
            <StatCard
              icon={<CheckCircle className="w-5 h-5" />}
              label="Published"
              value={stats.publishedAssignments}
              color="text-green-600 bg-green-50"
            />
            <StatCard
              icon={<Clock className="w-5 h-5" />}
              label="Upcoming"
              value={stats.upcomingDeadlines}
              color="text-orange-600 bg-orange-50"
            />
            <StatCard
              icon={<FileText className="w-5 h-5" />}
              label="Closed"
              value={stats.closedAssignments}
              color="text-purple-600 bg-purple-50"
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search assignments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {assignments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No assignments yet</h3>
                  <p className="text-gray-600 mb-4">Create your first assignment to get started</p>
                  <Link href="/teacher/assignments/create">
                    <Button variant="primary">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Assignment
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              assignments.map((assignment) => (
                <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {assignment.title}
                          </h3>
                          <StatusBadge status={assignment.status} />
                        </div>
                        {assignment.course && (
                          <p className="text-sm text-gray-600">{assignment.course.name}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/teacher/assignments/${assignment.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        {assignment.status === 'DRAFT' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(assignment.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                      {assignment.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Due: {format(new Date(assignment.dueDate), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>Max: {assignment.maxMarks} marks</span>
                      </div>
                      {assignment.submissionStats && (
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {assignment.submissionStats.submitted}/
                            {assignment.submissionStats.total} submitted
                          </span>
                        </div>
                      )}
                    </div>

                    {assignment.status === 'DRAFT' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          handleStatusChange(assignment.id, AssignmentStatus.PUBLISHED)
                        }
                      >
                        Publish Assignment
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: AssignmentStatus }) {
  const config = {
    DRAFT: { color: 'bg-gray-100 text-gray-700', label: 'Draft' },
    PUBLISHED: { color: 'bg-green-100 text-green-700', label: 'Published' },
    CLOSED: { color: 'bg-red-100 text-red-700', label: 'Closed' },
  }

  const { color, label } = config[status]

  return <span className={cn('px-2 py-1 text-xs font-medium rounded-full', color)}>{label}</span>
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: number
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
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
