'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  CheckCircle,
  Clock,
  Eye,
  Brain,
  Target,
  BarChart3,
  Calendar,
  BookOpen,
} from 'lucide-react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { showToast } from '@/lib/toast'

type TestAssignmentStatus = 'DRAFT' | 'PUBLISHED' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED'

interface TestAssignment {
  id: string
  title: string
  description: string
  status: TestAssignmentStatus
  totalQuestions: number
  duration: number
  totalMarks: number
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
  dueDate: string
  createdAt: string
  assignedTo: {
    type: 'ALL' | 'CLASS' | 'BATCH' | 'INDIVIDUAL'
    classId?: string
    className?: string
    studentCount: number
  }
  submissionStats?: {
    total: number
    submitted: number
    graded: number
    pending: number
    averageScore: number
  }
}

interface TestAssignmentStats {
  totalTests: number
  draftTests: number
  activeTests: number
  completedTests: number
  avgCompletion: number
}

export default function TeacherTestAssignmentPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [testAssignments, setTestAssignments] = useState<TestAssignment[]>([])
  const [stats, setStats] = useState<TestAssignmentStats>({
    totalTests: 0,
    draftTests: 0,
    activeTests: 0,
    completedTests: 0,
    avgCompletion: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'TEACHER')) {
      router.push('/sign-in')
      return
    }
  }, [authLoading, isAuthenticated, user])

  useEffect(() => {
    async function fetchTestAssignments() {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (searchQuery) params.append('search', searchQuery)
        if (statusFilter !== 'all') params.append('status', statusFilter)

        const response = await fetch(`/api/teacher/test-assignments?${params}`)

        if (response.ok) {
          const data = await response.json()
          const mappedAssignments = (data.assignments || []).map((a: any) => ({
            id: a.id,
            title: a.title,
            description: a.description || '',
            status: a.status,
            totalQuestions: a.totalQuestions,
            duration: a.duration,
            totalMarks: a.totalMarks,
            difficulty: a.difficulty?.toLowerCase() || 'medium',
            dueDate: a.dueDate,
            createdAt: a.createdAt,
            assignedTo: {
              type:
                a.assignToType === 'ALL_STUDENTS'
                  ? 'ALL'
                  : a.assignToType === 'SPECIFIC_CLASS'
                    ? 'CLASS'
                    : a.assignToType === 'SPECIFIC_BATCH'
                      ? 'BATCH'
                      : 'INDIVIDUAL',
              studentCount: a.submissionStats?.total || 0,
            },
            submissionStats: a.submissionStats
              ? {
                  total: a.submissionStats.total,
                  submitted: a.submissionStats.submitted,
                  graded: a.submissionStats.graded,
                  pending: a.submissionStats.pending,
                  averageScore: parseFloat(a.submissionStats.averageScore) || 0,
                }
              : undefined,
          }))
          setTestAssignments(mappedAssignments)
          setStats({
            totalTests: data.stats?.totalAssignments || 0,
            draftTests: data.stats?.draftAssignments || 0,
            activeTests: data.stats?.activeAssignments || 0,
            completedTests: data.stats?.completedAssignments || 0,
            avgCompletion:
              mappedAssignments.length > 0
                ? Math.round(
                    mappedAssignments.reduce(
                      (acc: number, a: any) =>
                        acc +
                        ((a.submissionStats?.submitted || 0) /
                          Math.max(a.submissionStats?.total || 1, 1)) *
                          100,
                      0
                    ) / mappedAssignments.length
                  )
                : 0,
          })
        } else {
          setTestAssignments(getMockData())
          setStats({
            totalTests: 5,
            draftTests: 1,
            activeTests: 2,
            completedTests: 2,
            avgCompletion: 78,
          })
        }
      } catch (error) {
        console.error('Error fetching test assignments:', error)
        setTestAssignments(getMockData())
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated && user?.role === 'TEACHER') {
      fetchTestAssignments()
    }
  }, [isAuthenticated, user, searchQuery, statusFilter])

  const getMockData = (): TestAssignment[] => [
    {
      id: '1',
      title: 'Cell Biology Mid-Term Test',
      description: 'Comprehensive test covering cell structure, organelles, and cell division',
      status: 'ACTIVE',
      totalQuestions: 30,
      duration: 45,
      totalMarks: 120,
      difficulty: 'medium',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      assignedTo: {
        type: 'CLASS',
        classId: 'class-11',
        className: 'Class 11 - A',
        studentCount: 45,
      },
      submissionStats: {
        total: 45,
        submitted: 32,
        graded: 28,
        pending: 4,
        averageScore: 76,
      },
    },
    {
      id: '2',
      title: 'Genetics Weekly Quiz',
      description: 'Quick quiz on Mendelian genetics and inheritance patterns',
      status: 'COMPLETED',
      totalQuestions: 15,
      duration: 20,
      totalMarks: 60,
      difficulty: 'easy',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      assignedTo: {
        type: 'CLASS',
        classId: 'class-12',
        className: 'Class 12 - B',
        studentCount: 38,
      },
      submissionStats: {
        total: 38,
        submitted: 38,
        graded: 38,
        pending: 0,
        averageScore: 82,
      },
    },
    {
      id: '3',
      title: 'NEET Practice Test - Botany',
      description: 'NEET-style questions covering plant anatomy and physiology',
      status: 'DRAFT',
      totalQuestions: 45,
      duration: 60,
      totalMarks: 180,
      difficulty: 'hard',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      assignedTo: {
        type: 'ALL',
        studentCount: 120,
      },
    },
  ]

  const handleDelete = async (testId: string) => {
    if (!confirm('Are you sure you want to delete this test assignment?')) return

    try {
      const response = await fetch(`/api/teacher/test-assignments/${testId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setTestAssignments((prev) => prev.filter((t) => t.id !== testId))
      } else {
        const data = await response.json()
        showToast.error(data.error || 'Failed to delete test assignment')
      }
    } catch (error) {
      console.error('Error deleting test assignment:', error)
      showToast.error('Failed to delete test assignment')
    }
  }

  const handleStatusChange = async (testId: string, newStatus: TestAssignmentStatus) => {
    try {
      const response = await fetch(`/api/teacher/test-assignments/${testId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setTestAssignments((prev) =>
          prev.map((t) => (t.id === testId ? { ...t, status: newStatus } : t))
        )
      }
    } catch (error) {
      console.error('Error updating test status:', error)
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Brain className="w-8 h-8 text-purple-600" />
                Test Assignments
              </h1>
              <p className="text-gray-600 mt-1">Create and manage MCQ tests for your students</p>
            </div>
            <Link href="/teacher/test-assignment/create">
              <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Test Assignment
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
              label="Total Tests"
              value={stats.totalTests}
              color="text-blue-600 bg-blue-50"
            />
            <StatCard
              icon={<Edit className="w-5 h-5" />}
              label="Drafts"
              value={stats.draftTests}
              color="text-gray-600 bg-gray-50"
            />
            <StatCard
              icon={<Target className="w-5 h-5" />}
              label="Active"
              value={stats.activeTests}
              color="text-green-600 bg-green-50"
            />
            <StatCard
              icon={<CheckCircle className="w-5 h-5" />}
              label="Completed"
              value={stats.completedTests}
              color="text-purple-600 bg-purple-50"
            />
            <StatCard
              icon={<BarChart3 className="w-5 h-5" />}
              label="Avg Completion"
              value={`${stats.avgCompletion}%`}
              color="text-orange-600 bg-orange-50"
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search test assignments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {testAssignments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No test assignments yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Create your first test assignment to evaluate your students
                  </p>
                  <Link href="/teacher/test-assignment/create">
                    <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Test Assignment
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              testAssignments.map((test) => (
                <Card key={test.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">{test.title}</h3>
                          <StatusBadge status={test.status} />
                          <DifficultyBadge difficulty={test.difficulty} />
                        </div>
                        <p className="text-sm text-gray-600">{test.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/teacher/test-assignment/${test.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        {test.status === 'DRAFT' && (
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(test.id)}>
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{test.totalQuestions} questions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{test.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>{test.totalMarks} marks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {format(new Date(test.dueDate), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>
                          {test.assignedTo.className || 'All Students'} (
                          {test.assignedTo.studentCount})
                        </span>
                      </div>
                    </div>

                    {test.submissionStats && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Submissions</span>
                          <span className="font-medium">
                            {test.submissionStats.submitted}/{test.submissionStats.total}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-gradient-to-r from-green-600 to-blue-500 h-2 rounded-full transition-all"
                            style={{
                              width: `${(test.submissionStats.submitted / test.submissionStats.total) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                          <span>Graded: {test.submissionStats.graded}</span>
                          <span>Pending: {test.submissionStats.pending}</span>
                          <span>Avg Score: {test.submissionStats.averageScore}%</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {test.status === 'DRAFT' && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleStatusChange(test.id, 'PUBLISHED')}
                        >
                          Publish Test
                        </Button>
                      )}
                      {test.status === 'PUBLISHED' && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => handleStatusChange(test.id, 'ACTIVE')}
                        >
                          Activate Test
                        </Button>
                      )}
                      {test.status === 'ACTIVE' && (
                        <Link href={`/teacher/test-assignment/${test.id}/results`}>
                          <Button size="sm" variant="outline">
                            <BarChart3 className="w-4 h-4 mr-1" />
                            View Results
                          </Button>
                        </Link>
                      )}
                    </div>
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

function StatusBadge({ status }: { status: TestAssignmentStatus }) {
  const config = {
    DRAFT: { color: 'bg-gray-100 text-gray-700', label: 'Draft' },
    PUBLISHED: { color: 'bg-blue-100 text-blue-700', label: 'Published' },
    ACTIVE: { color: 'bg-green-100 text-green-700', label: 'Active' },
    COMPLETED: { color: 'bg-purple-100 text-purple-700', label: 'Completed' },
    ARCHIVED: { color: 'bg-red-100 text-red-700', label: 'Archived' },
  }

  const { color, label } = config[status]

  return <span className={cn('px-2 py-1 text-xs font-medium rounded-full', color)}>{label}</span>
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const config: Record<string, { color: string; label: string }> = {
    easy: { color: 'bg-green-100 text-green-700', label: 'Easy' },
    medium: { color: 'bg-yellow-100 text-yellow-700', label: 'Medium' },
    hard: { color: 'bg-red-100 text-red-700', label: 'Hard' },
    mixed: { color: 'bg-purple-100 text-purple-700', label: 'Mixed' },
  }

  const { color, label } = config[difficulty] || config.medium

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
  value: number | string
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
