'use client'

import { useState, useEffect, useCallback } from 'react'

type LeaderboardPeriod = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ALL_TIME'

interface LeaderboardEntry {
  rank: number
  freeUserId?: string
  userId?: string
  name: string
  xp: number
  accuracy: number
  questionsAnswered: number
  isCurrentUser?: boolean
  avatarUrl?: string
  level?: number
  previousRank?: number
}

interface Leaderboard {
  period: LeaderboardPeriod
  periodStart: string
  periodEnd: string
  entries: LeaderboardEntry[]
  totalParticipants: number
  currentUserRank?: number
}

interface UseLeaderboardOptions {
  period?: LeaderboardPeriod
  limit?: number
  freeUserId?: string
  userId?: string
}

interface UseLeaderboardReturn {
  leaderboard: Leaderboard | null
  isLoading: boolean
  error: string | null
  setPeriod: (period: LeaderboardPeriod) => void
  refetch: () => Promise<void>
}

export function useLeaderboard(options: UseLeaderboardOptions = {}): UseLeaderboardReturn {
  const { limit = 50, freeUserId, userId } = options

  const [period, setPeriod] = useState<LeaderboardPeriod>(options.period || 'WEEKLY')
  const [leaderboard, setLeaderboard] = useState<Leaderboard | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLeaderboard = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      params.set('period', period)
      params.set('limit', limit.toString())
      if (freeUserId) params.set('freeUserId', freeUserId)
      if (userId) params.set('userId', userId)

      const response = await fetch(`/api/mcq/leaderboard?${params.toString()}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch leaderboard')
      }

      setLeaderboard(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [period, limit, freeUserId, userId])

  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  const handleSetPeriod = useCallback((newPeriod: LeaderboardPeriod) => {
    setPeriod(newPeriod)
  }, [])

  return {
    leaderboard,
    isLoading,
    error,
    setPeriod: handleSetPeriod,
    refetch: fetchLeaderboard,
  }
}
