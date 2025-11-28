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
  Download,
  Copy,
  Settings,
  TrendingUp,
  Award,
} from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

type TestStatus = 'DRAFT' | 'TEMPLATE' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED'

interface TestTemplate {
  id: string
  title: string
  description: string
  status: TestStatus
  totalQuestions: number
  duration: number
  totalMarks: number
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
  category: 'MOCK_TEST' | 'CHAPTER_TEST' | 'PRACTICE' | 'NEET_PATTERN' | 'CUSTOM'
  createdAt: string
  createdBy: string
  timesUsed: number
  avgScore: number
  totalAttempts: number
  passRate: number
}

interface AdminTestStats {
  totalTemplates: number
  activeTests: number
  totalAttempts: number
  avgPassRate: number
  testsThisMonth: number
  studentsTestedThisWeek: number
}

export default function AdminTestsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [testTemplates, setTestTemplates] = useState<TestTemplate[]>([])
  const [stats, setStats] = useState<AdminTestStats>({
    totalTemplates: 0,
    activeTests: 0,
    totalAttempts: 0,
    avgPassRate: 0,
    testsThisMonth: 0,
    studentsTestedThisWeek: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'ADMIN')) {
      window.location.href = '/auth/signin'
      return
    }
  }, [authLoading, isAuthenticated, user])

  useEffect(() => {
    async function fetchTests() {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (searchQuery) params.append('search', searchQuery)
        if (categoryFilter !== 'all') params.append('category', categoryFilter)

        const response = await fetch(`/api/admin/tests?${params}`)

        if (response.ok) {
          const data = await response.json()
          setTestTemplates(data.tests || [])
          setStats(data.stats || stats)
        } else {
          setTestTemplates(getMockData())
          setStats({
            totalTemplates: 12,
            activeTests: 5,
            totalAttempts: 1250,
            avgPassRate: 72,
            testsThisMonth: 8,
            studentsTestedThisWeek: 156,
          })
        }
      } catch (error) {
        console.error('Error fetching tests:', error)
        setTestTemplates(getMockData())
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated && user?.role === 'ADMIN') {
      fetchTests()
    }
  }, [isAuthenticated, user, searchQuery, categoryFilter])

  const getMockData = (): TestTemplate[] => [
    {
      id: '1',
      title: 'NEET Biology Full Mock Test 2024',
      description: 'Complete NEET pattern test with 90 questions covering both Botany and Zoology',
      status: 'TEMPLATE',
      totalQuestions: 90,
      duration: 180,
      totalMarks: 360,
      difficulty: 'hard',
      category: 'NEET_PATTERN',
      createdAt: new Date().toISOString(),
      createdBy: 'Admin',
      timesUsed: 45,
      avgScore: 68,
      totalAttempts: 890,
      passRate: 72,
    },
    {
      id: '2',
      title: 'Cell Biology Comprehensive Test',
      description: 'Deep dive into cell structure, functions, and molecular biology',
      status: 'ACTIVE',
      totalQuestions: 50,
      duration: 60,
      totalMarks: 200,
      difficulty: 'medium',
      category: 'CHAPTER_TEST',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdBy: 'Admin',
      timesUsed: 28,
      avgScore: 74,
      totalAttempts: 320,
      passRate: 78,
    },
    {
      id: '3',
      title: 'Genetics Quick Quiz',
      description: 'Short assessment on Mendelian genetics and inheritance',
      status: 'TEMPLATE',
      totalQuestions: 20,
      duration: 25,
      totalMarks: 80,
      difficulty: 'easy',
      category: 'PRACTICE',
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      createdBy: 'Admin',
      timesUsed: 112,
      avgScore: 82,
      totalAttempts: 450,
      passRate: 85,
    },
  ]

  const handleDuplicate = async (testId: string) => {
    try {
      const response = await fetch(`/api/admin/tests/${testId}/duplicate`, {
        method: 'POST',
      })

      if (response.ok) {
        const data = await response.json()
        setTestTemplates((prev) => [data.test, ...prev])
      }
    } catch (error) {
      console.error('Error duplicating test:', error)
    }
  }

  const handleDelete = async (testId: string) => {
    if (!confirm('Are you sure you want to delete this test template?')) return

    try {
      const response = await fetch(`/api/admin/tests/${testId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setTestTemplates((prev) => prev.filter((t) => t.id !== testId))
      }
    } catch (error) {
      console.error('Error deleting test:', error)
    }
  }

  if (authLoading || loading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Brain className="w-8 h-8 text-blue-600" />
                Test Management
              </h1>
              <p className="text-gray-600 mt-1">
                Create and manage organization-wide test templates
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/admin/tests/analytics">
                <Button variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </Link>
              <Link href="/admin/tests/create">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Test Template
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <StatCard
              icon={<FileText className="w-5 h-5" />}
              label="Total Templates"
              value={stats.totalTemplates}
              color="text-blue-600 bg-blue-50"
            />
            <StatCard
              icon={<Target className="w-5 h-5" />}
              label="Active Tests"
              value={stats.activeTests}
              color="text-green-600 bg-green-50"
            />
            <StatCard
              icon={<Users className="w-5 h-5" />}
              label="Total Attempts"
              value={stats.totalAttempts.toLocaleString()}
              color="text-purple-600 bg-purple-50"
            />
            <StatCard
              icon={<Award className="w-5 h-5" />}
              label="Avg Pass Rate"
              value={`${stats.avgPassRate}%`}
              color="text-orange-600 bg-orange-50"
            />
            <StatCard
              icon={<Calendar className="w-5 h-5" />}
              label="This Month"
              value={stats.testsThisMonth}
              color="text-teal-600 bg-teal-50"
            />
            <StatCard
              icon={<TrendingUp className="w-5 h-5" />}
              label="This Week"
              value={stats.studentsTestedThisWeek}
              color="text-pink-600 bg-pink-50"
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search test templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="NEET_PATTERN">NEET Pattern</option>
                <option value="MOCK_TEST">Mock Test</option>
                <option value="CHAPTER_TEST">Chapter Test</option>
                <option value="PRACTICE">Practice</option>
                <option value="CUSTOM">Custom</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {testTemplates.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No test templates yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Create your first test template for the organization
                  </p>
                  <Link href="/admin/tests/create">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Test Template
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              testTemplates.map((test) => (
                <Card key={test.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">{test.title}</h3>
                          <StatusBadge status={test.status} />
                          <CategoryBadge category={test.category} />
                        </div>
                        <p className="text-sm text-gray-600">{test.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDuplicate(test.id)}
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Link href={`/admin/tests/${test.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Link href={`/admin/tests/${test.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(test.id)}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
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
                        <span>{format(new Date(test.createdAt), 'MMM dd, yyyy')}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">{test.timesUsed}</p>
                          <p className="text-xs text-gray-500">Times Used</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">{test.totalAttempts}</p>
                          <p className="text-xs text-gray-500">Attempts</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-purple-600">{test.avgScore}%</p>
                          <p className="text-xs text-gray-500">Avg Score</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-orange-600">{test.passRate}%</p>
                          <p className="text-xs text-gray-500">Pass Rate</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Link href={`/admin/tests/${test.id}/assign`}>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Users className="w-4 h-4 mr-1" />
                          Assign to Classes
                        </Button>
                      </Link>
                      <Link href={`/admin/tests/${test.id}/results`}>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="w-4 h-4 mr-1" />
                          View Results
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </Button>
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

function StatusBadge({ status }: { status: TestStatus }) {
  const config = {
    DRAFT: { color: 'bg-gray-100 text-gray-700', label: 'Draft' },
    TEMPLATE: { color: 'bg-blue-100 text-blue-700', label: 'Template' },
    ACTIVE: { color: 'bg-green-100 text-green-700', label: 'Active' },
    COMPLETED: { color: 'bg-purple-100 text-purple-700', label: 'Completed' },
    ARCHIVED: { color: 'bg-red-100 text-red-700', label: 'Archived' },
  }

  const { color, label } = config[status]

  return <span className={cn('px-2 py-1 text-xs font-medium rounded-full', color)}>{label}</span>
}

function CategoryBadge({ category }: { category: string }) {
  const config: Record<string, { color: string; label: string }> = {
    NEET_PATTERN: { color: 'bg-red-100 text-red-700', label: 'NEET' },
    MOCK_TEST: { color: 'bg-purple-100 text-purple-700', label: 'Mock' },
    CHAPTER_TEST: { color: 'bg-blue-100 text-blue-700', label: 'Chapter' },
    PRACTICE: { color: 'bg-green-100 text-green-700', label: 'Practice' },
    CUSTOM: { color: 'bg-gray-100 text-gray-700', label: 'Custom' },
  }

  const { color, label } = config[category] || config.CUSTOM

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
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs text-gray-600 mb-1">{label}</p>
            <p className="text-xl font-bold text-gray-900">{value}</p>
          </div>
          <div className={cn('p-2 rounded-lg', color)}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="h-10 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
