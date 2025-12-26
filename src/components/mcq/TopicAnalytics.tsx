'use client'

import { useState, useEffect } from 'react'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Clock,
  Flame,
  Award,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  ChevronRight,
} from 'lucide-react'

interface TopicStats {
  topic: string
  attempted: number
  correct: number
  accuracy: number
  mastery: number
  avgTimeSpent: number
  lastPracticed: Date | null
  trend: 'improving' | 'stable' | 'declining' | 'new'
}

interface DailyProgress {
  date: string
  questionsAttempted: number
  correctAnswers: number
  accuracy: number
  xpEarned: number
}

interface AnalyticsData {
  topicStats: TopicStats[]
  weakTopics: string[]
  strongTopics: string[]
  overallStats: {
    totalQuestions: number
    correctAnswers: number
    accuracy: number
    averageTimePerQuestion: number
    totalTimeSpent: number
    currentStreak: number
    longestStreak: number
  }
  dailyProgress: DailyProgress[]
  recommendedTopics: string[]
  reviewStats: {
    totalScheduled: number
    dueToday: number
    masteredCount: number
  }
}

interface TopicAnalyticsProps {
  freeUserId: string | null
  onTopicSelect?: (topic: string) => void
}

export function TopicAnalytics({ freeUserId, onTopicSelect }: TopicAnalyticsProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedView, setSelectedView] = useState<'topics' | 'progress' | 'review'>('topics')

  useEffect(() => {
    if (!freeUserId) {
      setIsLoading(false)
      return
    }

    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`/api/mcq/analytics?freeUserId=${freeUserId}&days=30`)
        if (!res.ok) throw new Error('Failed to fetch analytics')
        const data = await res.json()
        if (data.success) {
          setAnalytics(data.data)
        }
      } catch (err) {
        setError('Failed to load analytics')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [freeUserId])

  if (!freeUserId) {
    return (
      <div className="bg-white rounded-xl p-6 text-center">
        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Sign Up to Track Progress</h3>
        <p className="text-gray-500 text-sm">
          Create an account to see detailed analytics of your NEET Biology practice.
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !analytics) {
    return (
      <div className="bg-white rounded-xl p-6 text-center">
        <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
        <p className="text-gray-600">{error || 'No analytics available'}</p>
      </div>
    )
  }

  const {
    topicStats,
    weakTopics,
    strongTopics,
    overallStats,
    dailyProgress,
    recommendedTopics,
    reviewStats,
  } = analytics

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      case 'stable':
        return <Minus className="w-4 h-4 text-gray-400" />
      default:
        return <Target className="w-4 h-4 text-blue-500" />
    }
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'bg-green-600'
    if (accuracy >= 60) return 'bg-yellow-500'
    if (accuracy >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getAccuracyTextColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600'
    if (accuracy >= 60) return 'text-yellow-600'
    if (accuracy >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  // Get max attempted for scaling bars
  const maxAttempted = Math.max(...topicStats.map((t) => t.attempted), 1)

  // Get last 7 days for mini chart
  const last7Days = dailyProgress.slice(-7)
  const maxDailyQuestions = Math.max(...last7Days.map((d) => d.questionsAttempted), 1)

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
            <Target className="w-4 h-4" />
            Total Questions
          </div>
          <p className="text-2xl font-bold text-gray-900">{overallStats.totalQuestions}</p>
          <p className="text-xs text-gray-500">
            {overallStats.correctAnswers} correct ({overallStats.accuracy}%)
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
            <Flame className="w-4 h-4 text-orange-500" />
            Current Streak
          </div>
          <p className="text-2xl font-bold text-gray-900">{overallStats.currentStreak}</p>
          <p className="text-xs text-gray-500">Best: {overallStats.longestStreak} days</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
            <RefreshCw className="w-4 h-4 text-purple-500" />
            Review Queue
          </div>
          <p className="text-2xl font-bold text-gray-900">{reviewStats.dueToday}</p>
          <p className="text-xs text-gray-500">{reviewStats.masteredCount} mastered</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
            <Clock className="w-4 h-4 text-blue-500" />
            Time Spent
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {Math.round(overallStats.totalTimeSpent / 60)}m
          </p>
          <p className="text-xs text-gray-500">
            ~{overallStats.averageTimePerQuestion}s per question
          </p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'topics', label: 'Topics', icon: BarChart3 },
          { id: 'progress', label: 'Progress', icon: TrendingUp },
          { id: 'review', label: 'Review', icon: RefreshCw },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedView(id as typeof selectedView)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedView === id
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Topics View */}
      {selectedView === 'topics' && (
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            Topic-wise Performance
          </h3>

          {/* Weak Topics Alert */}
          {weakTopics.length > 0 && (
            <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center gap-2 text-red-700 text-sm font-medium mb-1">
                <AlertTriangle className="w-4 h-4" />
                Focus Areas
              </div>
              <p className="text-xs text-red-600">
                {weakTopics.slice(0, 3).join(', ')} need more practice (accuracy &lt; 60%)
              </p>
            </div>
          )}

          {/* Strong Topics */}
          {strongTopics.length > 0 && (
            <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center gap-2 text-green-700 text-sm font-medium mb-1">
                <CheckCircle className="w-4 h-4" />
                Strong Areas
              </div>
              <p className="text-xs text-green-600">
                {strongTopics.slice(0, 3).join(', ')} (accuracy &gt; 80%)
              </p>
            </div>
          )}

          {/* Topic List */}
          <div className="space-y-3">
            {topicStats.slice(0, 10).map((topic) => (
              <button
                key={topic.topic}
                onClick={() => onTopicSelect?.(topic.topic)}
                className="w-full text-left group"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                      {topic.topic}
                    </span>
                    {getTrendIcon(topic.trend)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${getAccuracyTextColor(topic.accuracy)}`}>
                      {topic.accuracy}%
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getAccuracyColor(topic.accuracy)} transition-all`}
                      style={{ width: `${(topic.attempted / maxAttempted) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-16 text-right">
                    {topic.attempted} Qs
                  </span>
                </div>
              </button>
            ))}
          </div>

          {topicStats.length > 10 && (
            <button className="mt-4 text-sm text-green-600 hover:text-green-700 font-medium">
              View all {topicStats.length} topics
            </button>
          )}
        </div>
      )}

      {/* Progress View */}
      {selectedView === 'progress' && (
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Last 7 Days Activity
          </h3>

          {/* Mini Bar Chart */}
          <div className="flex items-end justify-between h-32 gap-2 mb-4">
            {last7Days.map((day, i) => {
              const height =
                maxDailyQuestions > 0 ? (day.questionsAttempted / maxDailyQuestions) * 100 : 0
              const date = new Date(day.date)
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })

              return (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col items-center justify-end h-24">
                    {day.questionsAttempted > 0 && (
                      <span className="text-xs text-gray-500 mb-1">{day.questionsAttempted}</span>
                    )}
                    <div
                      className={`w-full rounded-t-md transition-all ${
                        day.questionsAttempted > 0 ? getAccuracyColor(day.accuracy) : 'bg-gray-100'
                      }`}
                      style={{ height: `${Math.max(height, 4)}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{dayName}</span>
                </div>
              )
            })}
          </div>

          {/* Daily Stats Summary */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">
                {last7Days.reduce((sum, d) => sum + d.questionsAttempted, 0)}
              </p>
              <p className="text-xs text-gray-500">Questions</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">
                {last7Days.filter((d) => d.questionsAttempted > 0).length}
              </p>
              <p className="text-xs text-gray-500">Active Days</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">
                {last7Days.reduce((sum, d) => sum + d.xpEarned, 0)}
              </p>
              <p className="text-xs text-gray-500">XP Earned</p>
            </div>
          </div>
        </div>
      )}

      {/* Review View */}
      {selectedView === 'review' && (
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-purple-600" />
            Spaced Repetition Stats
          </h3>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-700">{reviewStats.totalScheduled}</p>
              <p className="text-xs text-purple-600">Total Scheduled</p>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <p className="text-2xl font-bold text-amber-700">{reviewStats.dueToday}</p>
              <p className="text-xs text-amber-600">Due Today</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-700">{reviewStats.masteredCount}</p>
              <p className="text-xs text-green-600">Mastered</p>
            </div>
          </div>

          {reviewStats.dueToday > 0 && (
            <button
              onClick={() => onTopicSelect?.('review')}
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Start Review Session ({reviewStats.dueToday} questions)
            </button>
          )}

          {reviewStats.dueToday === 0 && reviewStats.totalScheduled > 0 && (
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-green-700 font-medium">All caught up!</p>
              <p className="text-green-600 text-sm">No reviews due today</p>
            </div>
          )}
        </div>
      )}

      {/* Recommended Topics */}
      {recommendedTopics.length > 0 && (
        <div className="bg-green-600 rounded-xl p-4 text-white">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Recommended Practice
          </h3>
          <div className="flex flex-wrap gap-2">
            {recommendedTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => onTopicSelect?.(topic)}
                className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-full text-sm transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
