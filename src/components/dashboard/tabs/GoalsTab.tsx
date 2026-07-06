'use client'

// Goals tab (roadmap P1): real gamification_goals via /api/gamification/goals
// (daily + weekly targets with progress) plus a NEET target card derived from
// the student's grade (/api/student/summary).

import React, { useState, useEffect } from 'react'
import { Target, Flame, CheckCircle, Zap, CalendarDays } from 'lucide-react'

interface GoalDefinition {
  id: string
  goalType: 'DAILY' | 'WEEKLY'
  metric: string
  targetValue: number
  currentValue: number
  isCompleted: boolean
  xpReward: number
}

interface GoalProgress {
  goal: GoalDefinition
  percentage: number
  remaining: number
  timeRemaining: string
  isExpired: boolean
}

interface GoalsSummary {
  completedToday: number
  totalGoals: number
  dailyStreak: number
  weeklyStreak: number
  totalXpFromGoals: number
}

const METRIC_LABELS: Record<string, string> = {
  QUESTIONS_ANSWERED: 'Questions answered',
  QUESTIONS_CORRECT: 'Correct answers',
  ACCURACY_PERCENTAGE: 'Accuracy',
  STUDY_MINUTES: 'Study minutes',
  SESSIONS_COMPLETED: 'Study sessions',
  TESTS_COMPLETED: 'Tests completed',
  CHAPTERS_REVIEWED: 'Chapters reviewed',
}

function metricLabel(metric: string): string {
  return METRIC_LABELS[metric] || metric.replace(/_/g, ' ').toLowerCase()
}

function GoalRow({ item }: { item: GoalProgress }) {
  const { goal } = item
  const pct = Math.min(100, Math.round(item.percentage))
  const isPercentMetric = goal.metric === 'ACCURACY_PERCENTAGE'
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          {goal.isCompleted ? (
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
          ) : (
            <Target className="w-4 h-4 text-blue-600 flex-shrink-0" />
          )}
          <span className="text-sm font-medium text-gray-900 truncate">
            {metricLabel(goal.metric)}
          </span>
        </div>
        <span className="text-xs text-gray-500 flex-shrink-0">
          {goal.currentValue}
          {isPercentMetric ? '%' : ''} / {goal.targetValue}
          {isPercentMetric ? '%' : ''}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            goal.isCompleted ? 'bg-green-500' : 'bg-blue-600'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[11px] text-gray-400">{item.timeRemaining}</span>
        <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-yellow-700">
          <Zap className="w-3 h-3" /> +{goal.xpReward} XP
        </span>
      </div>
    </div>
  )
}

export function GoalsTab() {
  const [daily, setDaily] = useState<GoalProgress[]>([])
  const [weekly, setWeekly] = useState<GoalProgress[]>([])
  const [summary, setSummary] = useState<GoalsSummary | null>(null)
  const [gradeLabel, setGradeLabel] = useState<string | null>(null)
  const [ncertClass, setNcertClass] = useState<11 | 12 | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled([
      fetch('/api/gamification/goals', { credentials: 'include' }).then((r) =>
        r.ok ? r.json() : null
      ),
      fetch('/api/student/summary', { credentials: 'include' }).then((r) =>
        r.ok ? r.json() : null
      ),
    ])
      .then(([goalsRes, summaryRes]) => {
        if (goalsRes.status === 'fulfilled' && goalsRes.value?.success && goalsRes.value.data) {
          setDaily(goalsRes.value.data.daily ?? [])
          setWeekly(goalsRes.value.data.weekly ?? [])
          setSummary(goalsRes.value.data.summary ?? null)
        }
        if (summaryRes.status === 'fulfilled' && summaryRes.value?.success) {
          setGradeLabel(summaryRes.value.student?.gradeLabel ?? null)
          setNcertClass(summaryRes.value.student?.ncertClass ?? null)
        }
      })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  // NEET happens in May: before May → this year's exam is still ahead.
  const now = new Date()
  const nextExamYear = now.getMonth() < 4 ? now.getFullYear() : now.getFullYear() + 1
  const targetYear = ncertClass === 11 ? nextExamYear + 1 : ncertClass === 12 ? nextExamYear : null

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* NEET target card */}
      {targetYear && (
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl shadow-xl p-5 sm:p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">Target: NEET {targetYear}</h3>
              <p className="text-sm text-white/80">
                {gradeLabel ? `${gradeLabel} • ` : ''}
                Stay consistent — daily goals compound into rank improvements.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Summary strip */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">
              {summary.completedToday}/{summary.totalGoals}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">Goals Done</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
            <div className="flex items-center gap-1 text-xl sm:text-2xl font-bold text-orange-600">
              <Flame className="w-5 h-5" /> {summary.dailyStreak}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">Daily Streak</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">
              {summary.weeklyStreak}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">Weekly Streak</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
            <div className="flex items-center gap-1 text-xl sm:text-2xl font-bold text-yellow-700">
              <Zap className="w-5 h-5" /> {summary.totalXpFromGoals}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">XP from Goals</div>
          </div>
        </div>
      )}

      {/* Daily + weekly goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Today&apos;s Goals</h3>
          {daily.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 text-center">
              Answer a few questions to activate your daily goals.
            </p>
          ) : (
            <div className="space-y-2.5">
              {daily.map((item) => (
                <GoalRow key={item.goal.id} item={item} />
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">This Week</h3>
          {weekly.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 text-center">
              Weekly goals appear once you start practising.
            </p>
          ) : (
            <div className="space-y-2.5">
              {weekly.map((item) => (
                <GoalRow key={item.goal.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
