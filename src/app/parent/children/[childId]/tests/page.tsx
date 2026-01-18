'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ClipboardList,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Target,
  Award,
  Calendar,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  BookOpen,
  BarChart3,
  Star,
  AlertTriangle,
} from 'lucide-react'

interface Child {
  id: string
  name: string
  email: string
  currentClass: string
}

interface Grade {
  letter: string
  color: string
}

interface Test {
  id: string
  title: string
  topics: string[]
  questionCount: number
  timeLimit: number
  score: number
  totalMarks: number
  percentage: number
  accuracy: number | null
  consistency: number | null
  timeSpent: number
  status: string
  statusLabel: string
  startedAt: string
  submittedAt: string | null
  topicWiseScore: { topic: string; score: number; total: number; percentage: number }[] | null
  strengthAreas: string[] | null
  weaknessAreas: string[] | null
  recommendations: string[] | null
  improvementAreas: string[] | null
  grade: Grade
}

interface Stats {
  totalTests: number
  avgScore: number
  avgPercentage: number
  avgAccuracy: number
  highestScore: number
  lowestScore: number
  totalTimeSpent: number
  avgTimePerTest: number
  gradeDistribution: Record<string, number>
}

interface TrendData {
  month: string
  year: number
  testsCompleted: number
  avgPercentage: number
}

interface TopicPerformance {
  topic: string
  avgPercentage: number
  attempts: number
  trend: 'improving' | 'declining' | 'stable'
}

interface UpcomingTest {
  id: string
  title: string
  course: { id: string; name: string }
  scheduledFor: string | null
  duration: number | null
  totalMarks: number | null
  passingMarks: number | null
}

export default function ParentTestsPage() {
  const { data: session, status } = useSession()
  const params = useParams()
  const router = useRouter()
  const childId = params.childId as string

  const [child, setChild] = useState<Child | null>(null)
  const [tests, setTests] = useState<Test[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [performanceTrend, setPerformanceTrend] = useState<TrendData[]>([])
  const [topicPerformance, setTopicPerformance] = useState<TopicPerformance[]>([])
  const [upcomingTests, setUpcomingTests] = useState<UpcomingTest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [periodFilter, setPeriodFilter] = useState('all')
  const [expandedTest, setExpandedTest] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'tests' | 'performance' | 'upcoming'>('tests')

  const fetchTests = useCallback(async () => {
    if (!childId) return

    try {
      setLoading(true)
      const queryParams = new URLSearchParams()
      if (statusFilter !== 'all') queryParams.set('status', statusFilter)
      if (periodFilter !== 'all') queryParams.set('period', periodFilter)
      queryParams.set('limit', '50')

      const response = await fetch(
        `/api/parent/children/${childId}/tests?${queryParams.toString()}`
      )
      const data = await response.json()

      if (data.success) {
        setChild(data.data.child)
        setTests(data.data.tests)
        setStats(data.data.stats)
        setPerformanceTrend(data.data.performanceTrend)
        setTopicPerformance(data.data.topicPerformance)
        setUpcomingTests(data.data.upcomingTests)
        setError(null)
      } else {
        setError(data.error || 'Failed to fetch test data')
      }
    } catch {
      setError('Failed to load test data')
    } finally {
      setLoading(false)
    }
  }, [childId, statusFilter, periodFilter])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchTests()
    }
  }, [status, fetchTests])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  const getGradeColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'blue':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'yellow':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'orange':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'red':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return { bg: 'bg-green-100', text: 'text-green-700', icon: Award }
      case 'IN_PROGRESS':
        return { bg: 'bg-blue-100', text: 'text-blue-700', icon: Clock }
      case 'NOT_STARTED':
        return { bg: 'bg-gray-100', text: 'text-gray-700', icon: ClipboardList }
      case 'EXPIRED':
        return { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle }
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', icon: ClipboardList }
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-blue-600'
    if (percentage >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getPercentageBg = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-blue-500'
    if (percentage >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading test data...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-red-700 mb-2">Error Loading Tests</h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => router.push('/parent/dashboard')}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/parent/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Test Summary</h1>
                {child && (
                  <p className="text-sm text-gray-500">
                    {child.name} • Class {child.currentClass}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="all">All Time</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <ClipboardList className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalTests}</p>
                  <p className="text-xs text-gray-500">Tests Taken</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${getPercentageColor(stats.avgPercentage)}`}>
                    {stats.avgPercentage}%
                  </p>
                  <p className="text-xs text-gray-500">Avg Score</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${getPercentageColor(stats.avgAccuracy)}`}>
                    {stats.avgAccuracy}%
                  </p>
                  <p className="text-xs text-gray-500">Accuracy</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.highestScore}%</p>
                  <p className="text-xs text-gray-500">Best Score</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('tests')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'tests'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <ClipboardList className="h-4 w-4" />
                <span>Test History</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'performance'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Performance</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Upcoming ({upcomingTests.length})</span>
              </div>
            </button>
          </div>

          <div className="p-4">
            {/* Test History Tab */}
            {activeTab === 'tests' && (
              <div>
                {/* Status Filter */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {['all', 'completed', 'in_progress', 'pending'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        statusFilter === s
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {s === 'all'
                        ? 'All'
                        : s === 'completed'
                          ? 'Completed'
                          : s === 'in_progress'
                            ? 'In Progress'
                            : 'Pending'}
                    </button>
                  ))}
                </div>

                {tests.length === 0 ? (
                  <div className="text-center py-12">
                    <ClipboardList className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No tests found for the selected filters</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tests.map((test) => {
                      const statusConfig = getStatusConfig(test.status)
                      const isExpanded = expandedTest === test.id

                      return (
                        <div
                          key={test.id}
                          className="border border-gray-200 rounded-xl overflow-hidden"
                        >
                          <div
                            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => setExpandedTest(isExpanded ? null : test.id)}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span
                                    className={`px-2 py-0.5 rounded text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}
                                  >
                                    {test.statusLabel}
                                  </span>
                                  {test.status === 'COMPLETED' && (
                                    <span
                                      className={`px-2 py-0.5 rounded text-xs font-bold border ${getGradeColor(test.grade.color)}`}
                                    >
                                      {test.grade.letter}
                                    </span>
                                  )}
                                </div>
                                <h3 className="font-semibold text-gray-900 truncate">
                                  {test.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  {formatDate(test.startedAt)} • {test.questionCount} questions
                                </p>
                              </div>

                              <div className="flex items-center gap-4">
                                {test.status === 'COMPLETED' && (
                                  <div className="text-right">
                                    <p
                                      className={`text-2xl font-bold ${getPercentageColor(test.percentage)}`}
                                    >
                                      {test.percentage}%
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {test.score}/{test.totalMarks}
                                    </p>
                                  </div>
                                )}
                                {isExpanded ? (
                                  <ChevronUp className="h-5 w-5 text-gray-400" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                            </div>
                          </div>

                          {isExpanded && test.status === 'COMPLETED' && (
                            <div className="border-t border-gray-200 p-4 bg-gray-50">
                              {/* Test Details */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">Time Spent</p>
                                  <p className="font-medium">{formatTime(test.timeSpent)}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">Accuracy</p>
                                  <p
                                    className={`font-medium ${getPercentageColor(test.accuracy || 0)}`}
                                  >
                                    {test.accuracy || 0}%
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">Consistency</p>
                                  <p className="font-medium">{test.consistency || 0}%</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">Submitted</p>
                                  <p className="font-medium">
                                    {test.submittedAt ? formatDate(test.submittedAt) : '-'}
                                  </p>
                                </div>
                              </div>

                              {/* Topic-wise Scores */}
                              {test.topicWiseScore && test.topicWiseScore.length > 0 && (
                                <div className="mb-4">
                                  <p className="text-sm font-medium text-gray-700 mb-2">
                                    Topic-wise Performance
                                  </p>
                                  <div className="space-y-2">
                                    {test.topicWiseScore.map((topic, idx) => (
                                      <div key={idx} className="flex items-center gap-3">
                                        <span className="text-sm text-gray-600 w-32 truncate">
                                          {topic.topic}
                                        </span>
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                          <div
                                            className={`h-full rounded-full ${getPercentageBg(topic.percentage)}`}
                                            style={{ width: `${topic.percentage}%` }}
                                          />
                                        </div>
                                        <span
                                          className={`text-sm font-medium w-12 text-right ${getPercentageColor(topic.percentage)}`}
                                        >
                                          {topic.percentage}%
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Strengths & Weaknesses */}
                              <div className="grid md:grid-cols-2 gap-4">
                                {test.strengthAreas && test.strengthAreas.length > 0 && (
                                  <div className="bg-green-50 rounded-lg p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Star className="h-4 w-4 text-green-600" />
                                      <p className="text-sm font-medium text-green-700">
                                        Strong Areas
                                      </p>
                                    </div>
                                    <ul className="text-sm text-green-600 space-y-1">
                                      {test.strengthAreas.map((area, idx) => (
                                        <li key={idx}>• {area}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {test.weaknessAreas && test.weaknessAreas.length > 0 && (
                                  <div className="bg-red-50 rounded-lg p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                      <AlertTriangle className="h-4 w-4 text-red-600" />
                                      <p className="text-sm font-medium text-red-700">
                                        Needs Improvement
                                      </p>
                                    </div>
                                    <ul className="text-sm text-red-600 space-y-1">
                                      {test.weaknessAreas.map((area, idx) => (
                                        <li key={idx}>• {area}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>

                              {/* Recommendations */}
                              {test.recommendations && test.recommendations.length > 0 && (
                                <div className="mt-4 bg-blue-50 rounded-lg p-3">
                                  <p className="text-sm font-medium text-blue-700 mb-2">
                                    Recommendations
                                  </p>
                                  <ul className="text-sm text-blue-600 space-y-1">
                                    {test.recommendations.map((rec, idx) => (
                                      <li key={idx}>• {rec}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <div className="space-y-6">
                {/* Performance Trend Chart */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-4">6-Month Performance Trend</h3>
                  <div className="h-48 flex items-end gap-2">
                    {performanceTrend.map((month, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center">
                        <div
                          className={`w-full rounded-t-lg transition-all ${
                            month.avgPercentage > 0 ? getPercentageBg(month.avgPercentage) : 'bg-gray-200'
                          }`}
                          style={{
                            height: `${Math.max(month.avgPercentage, 5)}%`,
                          }}
                        />
                        <p className="text-xs font-medium mt-2">{month.avgPercentage}%</p>
                        <p className="text-xs text-gray-500">{month.month}</p>
                        <p className="text-xs text-gray-400">{month.testsCompleted}t</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grade Distribution */}
                {stats && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Grade Distribution</h3>
                    <div className="grid grid-cols-7 gap-2">
                      {Object.entries(stats.gradeDistribution).map(([grade, count]) => (
                        <div key={grade} className="text-center">
                          <div
                            className={`h-16 rounded-lg flex items-end justify-center p-2 ${
                              count > 0
                                ? grade === 'A+' || grade === 'A'
                                  ? 'bg-green-100'
                                  : grade === 'B+' || grade === 'B'
                                    ? 'bg-blue-100'
                                    : grade === 'C'
                                      ? 'bg-yellow-100'
                                      : 'bg-red-100'
                                : 'bg-gray-100'
                            }`}
                          >
                            <span className="text-lg font-bold">{count}</span>
                          </div>
                          <p className="text-xs font-medium mt-1">{grade}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Topic Performance */}
                {topicPerformance.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-4">
                      Topic-wise Performance (Weakest First)
                    </h3>
                    <div className="space-y-3">
                      {topicPerformance.slice(0, 10).map((topic, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-40 truncate">
                            <p className="text-sm font-medium text-gray-900">{topic.topic}</p>
                            <p className="text-xs text-gray-500">{topic.attempts} attempts</p>
                          </div>
                          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${getPercentageBg(topic.avgPercentage)}`}
                              style={{ width: `${topic.avgPercentage}%` }}
                            />
                          </div>
                          <div className="flex items-center gap-2 w-20 justify-end">
                            <span
                              className={`text-sm font-bold ${getPercentageColor(topic.avgPercentage)}`}
                            >
                              {topic.avgPercentage}%
                            </span>
                            {getTrendIcon(topic.trend)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Upcoming Tab */}
            {activeTab === 'upcoming' && (
              <div>
                {upcomingTests.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No upcoming tests scheduled</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingTests.map((test) => (
                      <div
                        key={test.id}
                        className="border border-gray-200 rounded-xl p-4 hover:border-teal-300 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">{test.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              <BookOpen className="h-3.5 w-3.5 inline mr-1" />
                              {test.course.name}
                            </p>
                          </div>
                          <div className="text-right">
                            {test.scheduledFor && (
                              <p className="text-sm font-medium text-teal-600">
                                {formatDate(test.scheduledFor)}
                              </p>
                            )}
                            {test.duration && (
                              <p className="text-xs text-gray-500">{test.duration} mins</p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-4 mt-3 text-xs text-gray-500">
                          {test.totalMarks && <span>Total: {test.totalMarks} marks</span>}
                          {test.passingMarks && <span>Passing: {test.passingMarks} marks</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
