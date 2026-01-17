'use client'

import { useState, useEffect, useCallback } from 'react'

type GoalType = 'DAILY' | 'WEEKLY'
type GoalMetric =
  | 'QUESTIONS_ANSWERED'
  | 'QUESTIONS_CORRECT'
  | 'ACCURACY_PERCENTAGE'
  | 'STUDY_MINUTES'
  | 'SESSIONS_COMPLETED'
  | 'TESTS_COMPLETED'
  | 'CHAPTERS_REVIEWED'

interface Goal {
  id: string
  goalType: GoalType
  metric: GoalMetric
  targetValue: number
  currentValue: number
  xpReward: number
  isCompleted: boolean
  completedAt: string | null
  periodStart: string
  periodEnd: string
  streakBonus: number
}

interface GoalWithMultiplier {
  goal: Goal
  streakMultiplier: number
}

interface GoalSummary {
  completedToday: number
  totalGoals: number
  dailyStreak: number
  weeklyStreak: number
  totalXpFromGoals: number
}

interface UseGoalsReturn {
  dailyGoals: GoalWithMultiplier[]
  weeklyGoals: GoalWithMultiplier[]
  summary: GoalSummary | null
  isLoading: boolean
  error: string | null
  setCustomGoal: (params: {
    goalType: GoalType
    metric: GoalMetric
    targetValue: number
    xpReward?: number
  }) => Promise<{ success: boolean; message: string; goal?: Goal }>
  updateProgress: (params: {
    metric: GoalMetric
    incrementValue?: number
    absoluteValue?: number
  }) => Promise<{ success: boolean; message: string; completedGoals?: Goal[] }>
  refetch: () => Promise<void>
}

export function useGoals(): UseGoalsReturn {
  const [dailyGoals, setDailyGoals] = useState<GoalWithMultiplier[]>([])
  const [weeklyGoals, setWeeklyGoals] = useState<GoalWithMultiplier[]>([])
  const [summary, setSummary] = useState<GoalSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGoals = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/gamification/goals')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch goals')
      }

      if (data.success) {
        setDailyGoals(data.data.daily || [])
        setWeeklyGoals(data.data.weekly || [])
        setSummary(data.data.summary || null)
      } else {
        throw new Error(data.error || 'Failed to fetch goals')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchGoals()
  }, [fetchGoals])

  const setCustomGoal = useCallback(
    async (params: {
      goalType: GoalType
      metric: GoalMetric
      targetValue: number
      xpReward?: number
    }) => {
      try {
        const response = await fetch('/api/gamification/goals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        })
        const data = await response.json()

        if (data.success) {
          await fetchGoals()
        }

        return {
          success: data.success,
          message: data.message || data.error,
          goal: data.data?.goal,
        }
      } catch (err) {
        return {
          success: false,
          message: err instanceof Error ? err.message : 'Failed to set goal',
        }
      }
    },
    [fetchGoals]
  )

  const updateProgress = useCallback(
    async (params: { metric: GoalMetric; incrementValue?: number; absoluteValue?: number }) => {
      try {
        const response = await fetch('/api/gamification/goals', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        })
        const data = await response.json()

        if (data.success) {
          setDailyGoals(data.data.daily || [])
          setWeeklyGoals(data.data.weekly || [])
        }

        return {
          success: data.success,
          message: data.message || data.error,
          completedGoals: data.data?.completedGoals,
        }
      } catch (err) {
        return {
          success: false,
          message: err instanceof Error ? err.message : 'Failed to update progress',
        }
      }
    },
    []
  )

  return {
    dailyGoals,
    weeklyGoals,
    summary,
    isLoading,
    error,
    setCustomGoal,
    updateProgress,
    refetch: fetchGoals,
  }
}
