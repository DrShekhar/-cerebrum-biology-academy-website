'use client'

// Force dynamic rendering to prevent Clerk auth issues during static build
export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  Timer,
  Calendar,
  ArrowRight,
  Filter,
  Trophy,
  Target,
  BookOpen,
  BarChart3,
  Loader2,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Test {
  submissionId: string
  testId: string
  title: string
  description: string
  instructions: string
  difficulty: string
  totalQuestions: number
  totalMarks: number
  duration: number
  negativeMarking: boolean
  passingMarks: number | null
  dueDate: string
  availableFrom: string | null
  teacher: {
    id: string
    name: string
  }
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'SUBMITTED' | 'GRADED'
  startedAt: string | null
  submittedAt: string | null
  timeSpent: number | null
  remainingTime: number | null
  totalScore: number | null
  percentage: number | null
  questionsAttempted: number | null
  questionsCorrect: number | null
  questionsWrong: number | null
  questionsSkipped: number | null
  isGraded: boolean
  teacherFeedback: string | null
  showResults: string
  isAvailable: boolean
  isPastDue: boolean
  canTake: boolean
}

interface Stats {
  total: number
  notStarted: number
  inProgress: number
  submitted: number
  graded: number
}

export default function StudentTestsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [tests, setTests] = useState<Test[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const fetchTests = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `/api/student/tests${filter !== 'all' ? `?status=${filter}` : ''}`
      )
      const data = await response.json()

      if (data.success) {
        setTests(data.tests)
        setStats(data.stats)
      } else {
        setError(data.error || 'Failed to fetch tests')
      }
    } catch (err) {
      setError('Failed to load tests. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [filter])

  useEffect(() => {
    if (isAuthenticated) {
      fetchTests()
    }
  }, [isAuthenticated, fetchTests])

  const getStatusBadge = (test: Test) => {
    if (test.status === 'GRADED') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
          Graded
        </span>
      )
    }
    if (test.status === 'SUBMITTED') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
          Submitted
        </span>
      )
    }
    if (test.status === 'IN_PROGRESS') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
          In Progress
        </span>
      )
    }
    if (test.isPastDue) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
          Missed
        </span>
      )
    }
    if (!test.isAvailable) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
          Upcoming
        </span>
      )
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
        Available
      </span>
    )
  }

  const getDifficultyBadge = (difficulty: string) => {
    const colors: Record<string, string> = {
      EASY: 'bg-green-100 text-green-800',
      MEDIUM: 'bg-yellow-100 text-yellow-800',
      HARD: 'bg-red-100 text-red-800',
    }
    return (
      <span
        className={cn(
          'px-2 py-0.5 rounded text-xs font-medium',
          colors[difficulty] || 'bg-gray-100 text-gray-600'
        )}
      >
        {difficulty}
      </span>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your tests...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Login Required</h2>
            <p className="text-gray-600 mb-6">Please login to view your assigned tests.</p>
            <Link href="/auth/signin">
              <Button className="w-full">Login to Continue</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Tests</h1>
          <p className="text-gray-600 mt-1">View and take your assigned tests</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                      <div className="text-sm text-gray-600">Total</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Target className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stats.notStarted}</div>
                      <div className="text-sm text-gray-600">Pending</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stats.inProgress}</div>
                      <div className="text-sm text-gray-600">In Progress</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stats.submitted}</div>
                      <div className="text-sm text-gray-600">Submitted</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Trophy className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stats.graded}</div>
                      <div className="text-sm text-gray-600">Graded</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'all', label: 'All Tests' },
            { key: 'NOT_STARTED', label: 'Pending' },
            { key: 'IN_PROGRESS', label: 'In Progress' },
            { key: 'SUBMITTED', label: 'Submitted' },
            { key: 'GRADED', label: 'Graded' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                filter === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Error State */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tests List */}
        {tests.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No tests found"
            description={
              filter === 'all' ? 'You have no assigned tests yet.' : 'No tests match this filter.'
            }
          />
        ) : (
          <div className="space-y-4">
            {tests.map((test, index) => (
              <motion.div
                key={test.submissionId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Test Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusBadge(test)}
                          {getDifficultyBadge(test.difficulty)}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{test.title}</h3>
                        {test.description && (
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {test.description}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {test.totalQuestions} Questions
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {test.totalMarks} Marks
                          </span>
                          <span className="flex items-center gap-1">
                            <Timer className="w-4 h-4" />
                            {formatDuration(test.duration)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Due: {formatDate(test.dueDate)}
                          </span>
                        </div>
                        {test.teacher && (
                          <p className="text-sm text-gray-500 mt-2">By: {test.teacher.name}</p>
                        )}
                      </div>

                      {/* Score & Action */}
                      <div className="flex flex-col items-end gap-3">
                        {(test.status === 'SUBMITTED' || test.status === 'GRADED') &&
                          test.totalScore !== null && (
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                {test.percentage?.toFixed(1)}%
                              </div>
                              <div className="text-sm text-gray-500">
                                {test.totalScore}/{test.totalMarks} marks
                              </div>
                              {test.questionsCorrect !== null && (
                                <div className="text-xs text-gray-400">
                                  {test.questionsCorrect} correct, {test.questionsWrong} wrong
                                </div>
                              )}
                            </div>
                          )}

                        {test.canTake && (
                          <Link href={`/student/tests/${test.testId}`}>
                            <Button className="flex items-center gap-2">
                              {test.status === 'IN_PROGRESS' ? (
                                <>
                                  <PlayCircle className="w-4 h-4" />
                                  Continue Test
                                </>
                              ) : (
                                <>
                                  <PlayCircle className="w-4 h-4" />
                                  Start Test
                                </>
                              )}
                            </Button>
                          </Link>
                        )}

                        {(test.status === 'SUBMITTED' || test.status === 'GRADED') && (
                          <Link href={`/student/tests/${test.testId}/results`}>
                            <Button variant="outline" className="flex items-center gap-2">
                              <BarChart3 className="w-4 h-4" />
                              View Results
                            </Button>
                          </Link>
                        )}

                        {test.isPastDue && test.status === 'NOT_STARTED' && (
                          <span className="text-sm text-red-600">Deadline passed</span>
                        )}

                        {!test.isAvailable && !test.isPastDue && (
                          <span className="text-sm text-gray-500">
                            Available from: {formatDate(test.availableFrom!)}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
