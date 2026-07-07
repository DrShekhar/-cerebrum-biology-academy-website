'use client'

/**
 * Staff inbox polling — one provider per staff surface (admin / counselor).
 *
 * Polls GET /api/staff/inbox every 15s while the tab is visible; pauses when
 * hidden, refetches on focus, backs off to 60s on errors, stops on 401.
 * Components read counts via useStaffInbox(). Designed so the polling source
 * can later be swapped for Supabase Realtime without touching consumers.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const POLL_MS = 15_000
const MAX_BACKOFF_MS = 60_000

export interface InboxChannel {
  id: string
  name: string
  type: 'TEAM' | 'DIRECT'
  unread: number
  lastMessageAt: string | null
}

export interface StaffNotification {
  id: string
  type: string
  title: string
  body: string
  href: string
  actorId: string | null
  actorName: string | null
  leadId: string | null
  channelId: string | null
  isRead: boolean
  createdAt: string
}

interface InboxCounts {
  notificationUnread: number
  channelUnreadTotal: number
  channels: InboxChannel[]
}

interface StaffInboxValue {
  counts: InboxCounts
  loading: boolean
  refresh: () => Promise<void>
  fetchNotifications: (before?: string) => Promise<{
    notifications: StaffNotification[]
    hasMore: boolean
  }>
  markNotificationsRead: (idsOrAll: string[] | 'all') => Promise<void>
  markChannelRead: (channelId: string) => Promise<void>
}

const EMPTY_COUNTS: InboxCounts = { notificationUnread: 0, channelUnreadTotal: 0, channels: [] }

const StaffInboxContext = createContext<StaffInboxValue | null>(null)

export function StaffInboxProvider({ children }: { children: React.ReactNode }) {
  const [counts, setCounts] = useState<InboxCounts>(EMPTY_COUNTS)
  const [loading, setLoading] = useState(true)
  const backoffRef = useRef(POLL_MS)
  const stoppedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchInbox = useCallback(async () => {
    if (stoppedRef.current) return
    try {
      const res = await fetch('/api/staff/inbox')
      if (res.status === 401 || res.status === 403) {
        // Pause (a JWT refresh or edge blip can 401 transiently) — the next
        // focus/visibility event clears the pause and retries, so one bad
        // response never kills the bell for the whole session.
        stoppedRef.current = true
        backoffRef.current = MAX_BACKOFF_MS
        return
      }
      const json = await res.json()
      if (json.success) {
        setCounts({
          notificationUnread: json.data.notificationUnread,
          channelUnreadTotal: json.data.channelUnreadTotal,
          channels: json.data.channels,
        })
        backoffRef.current = POLL_MS
      } else {
        backoffRef.current = Math.min(backoffRef.current * 2, MAX_BACKOFF_MS)
      }
    } catch {
      backoffRef.current = Math.min(backoffRef.current * 2, MAX_BACKOFF_MS)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    // The timer chain keeps running even while paused — fetchInbox itself
    // gates on stoppedRef, and focus/visibility can un-pause at any time.
    const schedule = () => {
      if (cancelled) return
      timerRef.current = setTimeout(async () => {
        if (document.visibilityState === 'visible') {
          await fetchInbox()
        }
        schedule()
      }, backoffRef.current)
    }

    const onVisibleOrFocus = () => {
      if (document.visibilityState === 'visible') {
        stoppedRef.current = false
        void fetchInbox()
      }
    }

    void fetchInbox()
    schedule()
    document.addEventListener('visibilitychange', onVisibleOrFocus)
    window.addEventListener('focus', onVisibleOrFocus)
    return () => {
      cancelled = true
      if (timerRef.current) clearTimeout(timerRef.current)
      document.removeEventListener('visibilitychange', onVisibleOrFocus)
      window.removeEventListener('focus', onVisibleOrFocus)
    }
  }, [fetchInbox])

  const fetchNotifications = useCallback(async (before?: string) => {
    const params = new URLSearchParams()
    if (before) params.set('before', before)
    const res = await fetch(`/api/staff/notifications?${params}`)
    const json = await res.json()
    if (json.success) {
      return { notifications: json.data.notifications, hasMore: json.data.hasMore }
    }
    return { notifications: [], hasMore: false }
  }, [])

  const markNotificationsRead = useCallback(
    async (idsOrAll: string[] | 'all') => {
      // Optimistic: clear the badge immediately.
      setCounts((prev) => ({
        ...prev,
        notificationUnread:
          idsOrAll === 'all' ? 0 : Math.max(0, prev.notificationUnread - idsOrAll.length),
      }))
      try {
        await fetch('/api/staff/notifications/read', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(idsOrAll === 'all' ? { all: true } : { ids: idsOrAll }),
        })
      } finally {
        void fetchInbox()
      }
    },
    [fetchInbox]
  )

  const markChannelRead = useCallback(
    async (channelId: string) => {
      setCounts((prev) => {
        const channels = prev.channels.map((c) => (c.id === channelId ? { ...c, unread: 0 } : c))
        return {
          ...prev,
          channels,
          channelUnreadTotal: channels.reduce((sum, c) => sum + c.unread, 0),
        }
      })
      try {
        await fetch(`/api/staff/channels/${channelId}/read`, { method: 'POST' })
      } finally {
        void fetchInbox()
      }
    },
    [fetchInbox]
  )

  const value = useMemo(
    () => ({
      counts,
      loading,
      refresh: fetchInbox,
      fetchNotifications,
      markNotificationsRead,
      markChannelRead,
    }),
    [counts, loading, fetchInbox, fetchNotifications, markNotificationsRead, markChannelRead]
  )

  return <StaffInboxContext.Provider value={value}>{children}</StaffInboxContext.Provider>
}

export function useStaffInbox(): StaffInboxValue {
  const ctx = useContext(StaffInboxContext)
  if (!ctx) {
    throw new Error('useStaffInbox must be used within a StaffInboxProvider')
  }
  return ctx
}
