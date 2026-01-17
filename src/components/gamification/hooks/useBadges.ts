'use client'

import { useState, useEffect, useCallback } from 'react'

type BadgeRarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY'
type BadgeCategory = 'STREAKS' | 'MCQ_MASTERY' | 'TEST_PERFORMANCE' | 'CONSISTENCY' | 'SPECIAL'

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: BadgeCategory
  rarity: BadgeRarity
  xpReward: number
  isEarned: boolean
  earnedAt: string | null
  progress: number
  maxProgress: number
  requirement: string
  isShowcased?: boolean
}

interface UseBadgesReturn {
  earned: Badge[]
  inProgress: Badge[]
  available: Badge[]
  showcased: Badge[]
  totalBadges: number
  earnedCount: number
  completionPercentage: number
  isLoading: boolean
  error: string | null
  toggleShowcase: (badgeId: string, showcased: boolean) => Promise<{ success: boolean; message: string }>
  refetch: () => Promise<void>
}

export function useBadges(): UseBadgesReturn {
  const [earned, setEarned] = useState<Badge[]>([])
  const [inProgress, setInProgress] = useState<Badge[]>([])
  const [available, setAvailable] = useState<Badge[]>([])
  const [showcased, setShowcased] = useState<Badge[]>([])
  const [totalBadges, setTotalBadges] = useState(0)
  const [earnedCount, setEarnedCount] = useState(0)
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBadges = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/gamification/badges')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch badges')
      }

      if (data.success) {
        setEarned(data.data.earned || [])
        setInProgress(data.data.inProgress || [])
        setAvailable(data.data.available || [])
        setShowcased(data.data.showcased || [])
        setTotalBadges(data.data.totalBadges || 0)
        setEarnedCount(data.data.earnedCount || 0)
        setCompletionPercentage(data.data.completionPercentage || 0)
      } else {
        throw new Error(data.error || 'Failed to fetch badges')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBadges()
  }, [fetchBadges])

  const toggleShowcase = useCallback(async (badgeId: string, showcased: boolean) => {
    try {
      const response = await fetch('/api/gamification/badges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ badgeId, showcased }),
      })
      const data = await response.json()

      if (data.success && data.data?.showcased) {
        setShowcased(data.data.showcased)
      }

      return { success: data.success, message: data.message || data.error }
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : 'Failed to update showcase',
      }
    }
  }, [])

  return {
    earned,
    inProgress,
    available,
    showcased,
    totalBadges,
    earnedCount,
    completionPercentage,
    isLoading,
    error,
    toggleShowcase,
    refetch: fetchBadges,
  }
}
