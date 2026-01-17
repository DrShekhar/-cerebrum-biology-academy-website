'use client'

import { useState, useEffect, useCallback } from 'react'

type NotificationType =
  | 'BADGE_EARNED'
  | 'LEVEL_UP'
  | 'STREAK_MILESTONE'
  | 'STREAK_AT_RISK'
  | 'STREAK_BROKEN'
  | 'GOAL_COMPLETED'
  | 'DAILY_CHALLENGE'
  | 'LEADERBOARD_CHANGE'
  | 'XP_MILESTONE'

type NotificationPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'

interface GamificationNotification {
  id: string
  type: NotificationType
  title: string
  message: string
  metadata: Record<string, unknown>
  isRead: boolean
  priority: NotificationPriority
  createdAt: string
}

interface UseNotificationsOptions {
  limit?: number
  unreadOnly?: boolean
  types?: NotificationType[]
  autoRefreshInterval?: number
}

interface UseNotificationsReturn {
  notifications: GamificationNotification[]
  unreadCount: number
  total: number
  hasMore: boolean
  isLoading: boolean
  error: string | null
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  deleteNotification: (id: string) => Promise<void>
  loadMore: () => Promise<void>
  refetch: () => Promise<void>
}

export function useNotifications(options: UseNotificationsOptions = {}): UseNotificationsReturn {
  const { limit = 20, unreadOnly = false, types, autoRefreshInterval } = options

  const [notifications, setNotifications] = useState<GamificationNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNotifications = useCallback(
    async (reset = true) => {
      setIsLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams()
        params.set('limit', limit.toString())
        params.set('offset', reset ? '0' : offset.toString())
        if (unreadOnly) params.set('unreadOnly', 'true')
        if (types?.length) params.set('types', types.join(','))

        const response = await fetch(`/api/gamification/notifications?${params.toString()}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch notifications')
        }

        if (data.success) {
          if (reset) {
            setNotifications(data.data.notifications)
            setOffset(data.data.notifications.length)
          } else {
            setNotifications((prev) => [...prev, ...data.data.notifications])
            setOffset((prev) => prev + data.data.notifications.length)
          }
          setUnreadCount(data.data.unreadCount)
          setTotal(data.data.total)
          setHasMore(data.data.hasMore)
        } else {
          throw new Error(data.error || 'Failed to fetch notifications')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    },
    [limit, offset, unreadOnly, types]
  )

  useEffect(() => {
    fetchNotifications(true)
  }, [limit, unreadOnly, types])

  useEffect(() => {
    if (!autoRefreshInterval) return

    const interval = setInterval(() => {
      fetchNotifications(true)
    }, autoRefreshInterval)

    return () => clearInterval(interval)
  }, [autoRefreshInterval, fetchNotifications])

  const markAsRead = useCallback(async (id: string) => {
    try {
      const response = await fetch('/api/gamification/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'markRead', notificationId: id }),
      })
      const data = await response.json()

      if (data.success) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        )
        if (data.data?.unreadCount !== undefined) {
          setUnreadCount(data.data.unreadCount)
        }
      }
    } catch (err) {
      console.error('Failed to mark notification as read:', err)
    }
  }, [])

  const markAllAsRead = useCallback(async () => {
    try {
      const response = await fetch('/api/gamification/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'markAllRead' }),
      })
      const data = await response.json()

      if (data.success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
        setUnreadCount(0)
      }
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err)
    }
  }, [])

  const deleteNotification = useCallback(async (id: string) => {
    try {
      const response = await fetch('/api/gamification/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', notificationId: id }),
      })
      const data = await response.json()

      if (data.success) {
        setNotifications((prev) => prev.filter((n) => n.id !== id))
        setTotal((prev) => prev - 1)
        if (data.data?.unreadCount !== undefined) {
          setUnreadCount(data.data.unreadCount)
        }
      }
    } catch (err) {
      console.error('Failed to delete notification:', err)
    }
  }, [])

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return
    await fetchNotifications(false)
  }, [hasMore, isLoading, fetchNotifications])

  return {
    notifications,
    unreadCount,
    total,
    hasMore,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    loadMore,
    refetch: () => fetchNotifications(true),
  }
}
