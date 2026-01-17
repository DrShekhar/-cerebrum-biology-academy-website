'use client'

import { useState, useEffect, useCallback } from 'react'

interface StreakStatus {
  currentStreak: number
  longestStreak: number
  isAtRisk: boolean
  isProtected: boolean
  protectedUntil: string | null
  freezesAvailable: number
  freezesUsedThisWeek: number
  canRecover: boolean
  recoveryDeadline: string | null
  recoveryXpCost: number | null
  lastActivity: string | null
}

interface StreakConfig {
  maxFreezesPerWeek: number
  freezeDurationHours: number
  recoveryWindowHours: number
  baseRecoveryXpCost: number
  recoveryXpPerStreakDay: number
}

interface UseStreakReturn {
  status: StreakStatus | null
  config: StreakConfig | null
  isLoading: boolean
  error: string | null
  useFreeze: () => Promise<{ success: boolean; message: string }>
  recoverStreak: () => Promise<{ success: boolean; message: string }>
  refetch: () => Promise<void>
}

export function useStreak(): UseStreakReturn {
  const [status, setStatus] = useState<StreakStatus | null>(null)
  const [config, setConfig] = useState<StreakConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStreak = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/gamification/streaks')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch streak status')
      }

      if (data.success) {
        setStatus(data.data.status)
        setConfig(data.data.config)
      } else {
        throw new Error(data.error || 'Failed to fetch streak status')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStreak()
  }, [fetchStreak])

  const useFreeze = useCallback(async () => {
    try {
      const response = await fetch('/api/gamification/streaks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'freeze' }),
      })
      const data = await response.json()

      if (data.success && data.data?.status) {
        setStatus(data.data.status)
      }

      return { success: data.success, message: data.message || data.error }
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : 'Failed to use freeze',
      }
    }
  }, [])

  const recoverStreak = useCallback(async () => {
    try {
      const response = await fetch('/api/gamification/streaks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'recover' }),
      })
      const data = await response.json()

      if (data.success && data.data?.status) {
        setStatus(data.data.status)
      }

      return { success: data.success, message: data.message || data.error }
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : 'Failed to recover streak',
      }
    }
  }, [])

  return { status, config, isLoading, error, useFreeze, recoverStreak, refetch: fetchStreak }
}
