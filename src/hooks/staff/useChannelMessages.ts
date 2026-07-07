'use client'

/**
 * Message polling for one open chat panel: initial backfill, then a 5s
 * incremental poll (?after=<last message>) while the tab is visible.
 * Merge-by-id dedupes the optimistic append vs the next poll.
 */

import { useState, useEffect, useCallback, useRef } from 'react'

const POLL_MS = 5_000

export interface ChannelMessage {
  id: string
  content?: string
  deleted?: boolean
  mentionedUserIds?: string[]
  attachments?: string[]
  createdAt: string
  sender: { id: string; name: string | null; role: string }
}

export function useChannelMessages(channelId: string | null) {
  const [messages, setMessages] = useState<ChannelMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const messagesRef = useRef<ChannelMessage[]>([])
  messagesRef.current = messages

  const mergeById = useCallback((prev: ChannelMessage[], incoming: ChannelMessage[]) => {
    const seen = new Set(prev.map((m) => m.id))
    const fresh = incoming.filter((m) => !seen.has(m.id))
    return fresh.length ? [...prev, ...fresh] : prev
  }, [])

  // Initial load + reset on channel switch.
  useEffect(() => {
    if (!channelId) {
      setMessages([])
      return
    }
    let cancelled = false
    setLoading(true)
    setMessages([])
    ;(async () => {
      try {
        const res = await fetch(`/api/staff/channels/${channelId}/messages?limit=50`)
        const json = await res.json()
        if (!cancelled && json.success) setMessages(json.data.messages)
      } catch {
        // leave empty; poll will retry
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [channelId])

  // Incremental poll while mounted + visible.
  useEffect(() => {
    if (!channelId) return
    const timer = setInterval(async () => {
      if (document.visibilityState !== 'visible') return
      const last = messagesRef.current[messagesRef.current.length - 1]
      try {
        const params = new URLSearchParams()
        if (last) params.set('after', last.createdAt)
        params.set('limit', '50')
        const res = await fetch(`/api/staff/channels/${channelId}/messages?${params}`)
        const json = await res.json()
        if (json.success && json.data.messages.length) {
          setMessages((prev) => mergeById(prev, json.data.messages))
        }
      } catch {
        // transient; next tick retries
      }
    }, POLL_MS)
    return () => clearInterval(timer)
  }, [channelId, mergeById])

  const sendMessage = useCallback(
    async (content: string): Promise<boolean> => {
      if (!channelId || !content.trim()) return false
      setSending(true)
      try {
        const res = await fetch(`/api/staff/channels/${channelId}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),
        })
        const json = await res.json()
        if (json.success) {
          setMessages((prev) => mergeById(prev, [json.data.message]))
          return true
        }
        return false
      } catch {
        return false
      } finally {
        setSending(false)
      }
    },
    [channelId, mergeById]
  )

  return { messages, loading, sending, sendMessage }
}
