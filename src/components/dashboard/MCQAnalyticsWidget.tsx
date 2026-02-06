'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  Loader2,
  BarChart3,
  Sparkles,
} from 'lucide-react'

interface TopicStat {
  topic: string
  accuracy: number
  attempted: number
  trend: 'improving' | 'stable' | 'declining' | 'new'
}

interface OverallStats {
  totalQuestions: number
  accuracy: number
  currentStreak: number
}

interface AnalyticsData {
  topicStats: TopicStat[]
  weakTopics: string[]
  strongTopics: string[]
  overallStats: OverallStats
  dailyProgress: { date: string; questionsAttempted: number }[]
  recommendedTopics: string[]
}

export function MCQAnalyticsWidget() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const freeUserId = localStorage.getItem('freeUserId')
    if (!freeUserId) {
      setLoading(false)
      return
    }

    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`/api/mcq/analytics?freeUserId=${freeUserId}&days=7`)
        if (!res.ok) return
        const json = await res.json()
        if (json.success && json.data) {
          setData(json.data)
        }
      } catch {
        // Supplementary widget — fail silently
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">MCQ Analytics</h3>
        </div>
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
        </div>
      </div>
    )
  }

  if (!data || data.overallStats.totalQuestions === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">MCQ Analytics</h3>
        </div>
        <div className="text-center py-6">
          <p className="text-gray-500 text-sm">
            Practice MCQs to see detailed topic analytics
          </p>
        </div>
      </div>
    )
  }

  const todayQuestions =
    data.dailyProgress.length > 0
      ? data.dailyProgress[data.dailyProgress.length - 1].questionsAttempted
      : 0
  const avgDailyQuestions =
    data.dailyProgress.length > 0
      ? Math.round(
          data.dailyProgress.reduce((sum, d) => sum + d.questionsAttempted, 0) /
            data.dailyProgress.length
        )
      : 0

  const weakTopicStats = data.topicStats
    .filter((t) => data.weakTopics.includes(t.topic))
    .slice(0, 3)

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === 'improving') return <TrendingUp className="w-3 h-3 text-green-600" />
    if (trend === 'declining') return <TrendingDown className="w-3 h-3 text-red-500" />
    return <Minus className="w-3 h-3 text-gray-400" />
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">MCQ Analytics</h3>
        </div>
        <span className="text-xs text-gray-500">Last 7 days</span>
      </div>

      {/* Overall Accuracy */}
      <div className="flex items-center gap-4 mb-4 p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(data.overallStats.accuracy)}%
          </div>
          <div className="text-xs text-gray-500">Accuracy</div>
        </div>
        <div className="h-10 w-px bg-blue-200" />
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {data.overallStats.totalQuestions}
          </div>
          <div className="text-xs text-gray-500">Questions</div>
        </div>
        <div className="h-10 w-px bg-blue-200" />
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">
            {todayQuestions}
            <span className="text-xs font-normal text-gray-400">/{avgDailyQuestions} avg</span>
          </div>
          <div className="text-xs text-gray-500">Today</div>
        </div>
      </div>

      {/* Weak Topics */}
      {weakTopicStats.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Needs Improvement
          </h4>
          <div className="space-y-2">
            {weakTopicStats.map((topic) => (
              <div
                key={topic.topic}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <TrendIcon trend={topic.trend} />
                  <span className="text-sm text-gray-900 truncate">{topic.topic}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-medium text-red-600">
                    {Math.round(topic.accuracy)}%
                  </span>
                  <Link
                    href={`/neet-biology-mcq?topic=${encodeURIComponent(topic.topic)}`}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Practice
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Topics */}
      {data.recommendedTopics.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-500" />
            Recommended
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {data.recommendedTopics.slice(0, 4).map((topic) => (
              <Link
                key={topic}
                href={`/neet-biology-mcq?topic=${encodeURIComponent(topic)}`}
                className="px-2.5 py-1 bg-gradient-to-br from-blue-50 to-purple-50 text-blue-700 rounded-md text-xs font-medium hover:from-blue-100 hover:to-purple-100 transition-colors border border-blue-200 flex items-center gap-1"
              >
                {topic}
                <ArrowRight className="w-2.5 h-2.5" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
