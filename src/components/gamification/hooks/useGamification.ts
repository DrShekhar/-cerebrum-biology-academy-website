'use client'

import { useState, useEffect, useCallback } from 'react'

interface GamificationUser {
  id: string
  name: string
  tier?: string
  isPaidUser: boolean
}

interface StreakData {
  current: number
  longest: number
  isAtRisk?: boolean
  isProtected?: boolean
  protectedUntil?: string | null
  freezesAvailable?: number
  canRecover?: boolean
  recoveryDeadline?: string | null
  recoveryXpCost?: number | null
  lastActivity?: string | null
  nextMilestone: { days: number; reward: number }
}

interface XpBreakdown {
  today: number
  thisWeek: number
  thisMonth: number
  byCategory: Record<string, number>
}

interface BadgeInfo {
  id: string
  name: string
  description: string
  icon: string
  category: string
  rarity: string
  xpReward: number
  earnedAt?: string
  progress?: number
  maxProgress?: number
}

interface BadgesData {
  earned: number
  total: number
  recent: BadgeInfo[]
  inProgress: BadgeInfo[]
  showcased?: BadgeInfo[]
}

interface GoalData {
  id: string
  goalType: 'DAILY' | 'WEEKLY'
  metric: string
  targetValue: number
  currentValue: number
  xpReward: number
  isCompleted: boolean
  completedAt: string | null
  periodStart: string
  periodEnd: string
  streakBonus: number
}

interface GoalsData {
  daily: Array<{ goal: GoalData; streakMultiplier: number }>
  weekly: Array<{ goal: GoalData; streakMultiplier: number }>
  completedToday: number
}

interface StatsData {
  totalQuestions: number
  correctAnswers: number
  accuracy: number
  weeklyXp: number
  monthlyXp: number
}

interface GamificationData {
  totalPoints: number
  currentLevel: number
  levelName: string
  xpInCurrentLevel: number
  xpNeededForNextLevel: number
  levelProgress: number
  streak: StreakData | null
  xpBreakdown: XpBreakdown
  badges: BadgesData
  goals: GoalsData
  unreadNotifications: number
  stats: StatsData
}

interface UseGamificationReturn {
  user: GamificationUser | null
  gamification: GamificationData | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useGamification(userId?: string, freeUserId?: string): UseGamificationReturn {
  const [user, setUser] = useState<GamificationUser | null>(null)
  const [gamification, setGamification] = useState<GamificationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGamification = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (userId) params.set('userId', userId)
      if (freeUserId) params.set('freeUserId', freeUserId)

      const response = await fetch(`/api/gamification?${params.toString()}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch gamification data')
      }

      if (data.success) {
        setUser(data.user)
        setGamification(data.gamification)
      } else {
        throw new Error(data.error || 'Failed to fetch gamification data')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [userId, freeUserId])

  useEffect(() => {
    fetchGamification()
  }, [fetchGamification])

  return { user, gamification, isLoading, error, refetch: fetchGamification }
}
