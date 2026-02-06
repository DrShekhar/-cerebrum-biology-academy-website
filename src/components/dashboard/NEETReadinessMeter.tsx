'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import {
  Target,
  Loader2,
  Lightbulb,
  TrendingUp,
  Calendar,
  Zap,
} from 'lucide-react'

interface ProgressInsights {
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  studyPatterns: {
    averageQuestionsPerDay: number
    studyDaysPerWeek: number
  }
  performanceTrends: {
    averageScore: number
    trend: 'improving' | 'declining' | 'stable'
    bestScore: number
  }
}

interface ProgressSummary {
  totalTopics: number
  totalQuestions: number
  overallAccuracy: number
  averageMastery: number
  strongTopics: number
  weakTopics: number
}

interface LearningVelocity {
  questionsPerDay: number
  accuracy: number
}

interface ProgressData {
  summary: ProgressSummary
  insights: ProgressInsights
  recentActivity: {
    learningVelocity: LearningVelocity | null
  }
}

function computeReadiness(data: ProgressData): number {
  const { summary, insights, recentActivity } = data

  // Syllabus coverage (0-40 points) — based on topics covered
  const totalNEETTopics = 38 // Approximate NEET Biology topics
  const coverageScore = Math.min((summary.totalTopics / totalNEETTopics) * 40, 40)

  // Accuracy (0-35 points)
  const accuracyScore = (summary.overallAccuracy / 100) * 35

  // Consistency (0-25 points) — based on study days per week
  const studyDays = insights.studyPatterns?.studyDaysPerWeek || 0
  const consistencyScore = Math.min((studyDays / 6) * 25, 25)

  // Velocity bonus/penalty
  const velocity = recentActivity?.learningVelocity
  let bonus = 0
  if (velocity && velocity.questionsPerDay >= 30) bonus = 5
  else if (velocity && velocity.questionsPerDay >= 15) bonus = 2

  return Math.min(Math.round(coverageScore + accuracyScore + consistencyScore + bonus), 100)
}

function getNEETCountdown(): number {
  // NEET 2026 expected in May 2026
  const neetDate = new Date('2026-05-03')
  const today = new Date()
  const diff = neetDate.getTime() - today.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

function getReadinessLabel(score: number): { label: string; color: string } {
  if (score >= 75) return { label: 'On Track', color: 'text-green-600' }
  if (score >= 50) return { label: 'Needs Focus', color: 'text-yellow-600' }
  return { label: 'Behind', color: 'text-red-600' }
}

function ReadinessGauge({ value }: { value: number }) {
  const radius = 50
  const strokeWidth = 10
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (value / 100) * circumference

  const color =
    value >= 75 ? '#22c55e' : value >= 50 ? '#eab308' : '#ef4444'

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="-rotate-90">
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-gray-900">{value}%</span>
        <span className="text-[10px] text-gray-500">Ready</span>
      </div>
    </div>
  )
}

export function NEETReadinessMeter() {
  const { user } = useAuth()
  const [data, setData] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = user?.id || localStorage.getItem('freeUserId')
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchProgress = async () => {
      try {
        const res = await fetch(`/api/progress/${userId}`)
        if (!res.ok) return
        const json = await res.json()
        if (json.success && json.data) {
          setData(json.data)
        }
      } catch {
        // Supplementary widget
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [user?.id])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-green-600" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">NEET Readiness</h3>
        </div>
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
        </div>
      </div>
    )
  }

  if (!data || data.summary.totalQuestions === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-green-600" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">NEET Readiness</h3>
        </div>
        <div className="text-center py-6">
          <p className="text-gray-500 text-sm">Practice more to see your NEET readiness score</p>
        </div>
      </div>
    )
  }

  const readiness = computeReadiness(data)
  const daysToNEET = getNEETCountdown()
  const { label, color } = getReadinessLabel(readiness)
  const velocity = data.recentActivity?.learningVelocity
  const recommendations = data.insights?.recommendations?.slice(0, 3) || []

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-green-600" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">NEET Readiness</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-xs font-medium text-gray-600">{daysToNEET} days to NEET</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-4">
        {/* Gauge */}
        <ReadinessGauge value={readiness} />

        {/* Status + Velocity */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <span className={`text-lg font-bold ${color}`}>{label}</span>
            {data.insights?.performanceTrends?.trend === 'improving' && (
              <TrendingUp className="w-4 h-4 text-green-600" />
            )}
          </div>

          {velocity && (
            <div className="flex items-center justify-center sm:justify-start gap-1 text-sm text-gray-600 mb-1">
              <Zap className="w-3.5 h-3.5 text-yellow-500" />
              <span>
                {Math.round(velocity.questionsPerDay)} questions/day at{' '}
                {Math.round(velocity.accuracy)}% accuracy
              </span>
            </div>
          )}

          <div className="text-xs text-gray-500">
            {data.summary.strongTopics} strong • {data.summary.weakTopics} weak •{' '}
            {data.summary.totalTopics} topics covered
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      {recommendations.length > 0 && (
        <div className="border-t border-gray-100 pt-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-yellow-500" />
            AI Insights
          </h4>
          <ul className="space-y-1.5">
            {recommendations.map((rec, idx) => (
              <li
                key={idx}
                className="text-xs text-gray-600 pl-3 border-l-2 border-blue-200"
              >
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
