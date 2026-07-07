'use client'

/**
 * Shared WhatsApp inbox — two-pane thread view over /api/staff/whatsapp-inbox.
 * Counselors reply to inbound WhatsApp from the CRM; every thread is linked
 * to its lead. List polls every 15s, the open thread every 5s.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { MessageSquare, Send, Loader2, User, ExternalLink } from 'lucide-react'
import { stageBadgeClass, stageLabel } from '@/lib/leads/stageColors'

interface ConversationSummary {
  id: string
  phone: string
  lead: { id: string; studentName: string; stage: string } | null
  counselor: { id: string; name: string } | null
  lastMessageAt: string
  lastMessage: { content: string; direction: string; timestamp: string } | null
}

interface ThreadMessage {
  id: string
  direction: 'INBOUND' | 'OUTBOUND'
  content: string
  messageType: string
  status: string
  timestamp: string
  users?: { name: string } | null
}

interface ThreadData {
  id: string
  phone: string
  leads: { id: string; studentName: string; courseInterest: string; stage: string } | null
  whatsapp_messages: ThreadMessage[]
}

const timeShort = (d: string) =>
  new Date(d).toLocaleString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
  })

export function WhatsAppInbox({ surface }: { surface: 'admin' | 'counselor' }) {
  const [conversations, setConversations] = useState<ConversationSummary[]>([])
  const [activeId, setActiveId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    return new URLSearchParams(window.location.search).get('conversation')
  })
  const [thread, setThread] = useState<ThreadData | null>(null)
  const [loadingList, setLoadingList] = useState(true)
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const loadList = useCallback(async () => {
    try {
      const res = await fetch('/api/staff/whatsapp-inbox?view=list')
      const json = await res.json()
      if (json.success) setConversations(json.data.conversations)
    } catch {
      /* poll again */
    } finally {
      setLoadingList(false)
    }
  }, [])

  const loadThread = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/staff/whatsapp-inbox?conversationId=${encodeURIComponent(id)}`)
      const json = await res.json()
      if (json.success) setThread(json.data.conversation)
    } catch {
      /* poll again */
    }
  }, [])

  useEffect(() => {
    loadList()
    const t = setInterval(() => {
      if (document.visibilityState === 'visible') loadList()
    }, 15000)
    return () => clearInterval(t)
  }, [loadList])

  useEffect(() => {
    if (!activeId) return
    setThread(null)
    loadThread(activeId)
    const t = setInterval(() => {
      if (document.visibilityState === 'visible') loadThread(activeId)
    }, 5000)
    return () => clearInterval(t)
  }, [activeId, loadThread])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [thread?.whatsapp_messages.length])

  const send = async () => {
    const text = draft.trim()
    if (!text || !activeId || sending) return
    setSending(true)
    try {
      const res = await fetch('/api/staff/whatsapp-inbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: activeId, message: text }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setDraft('')
        await loadThread(activeId)
      } else {
        toast.error(json.error || 'Send failed')
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* Conversation list */}
      <div className="w-80 shrink-0 overflow-y-auto border-r border-gray-100">
        <div className="border-b border-gray-100 p-4">
          <h2 className="flex items-center gap-2 font-semibold text-gray-900">
            <MessageSquare className="h-4 w-4 text-green-600" /> WhatsApp Inbox
          </h2>
          <p className="mt-0.5 text-xs text-gray-500">
            Inbound chats auto-create leads and land here
          </p>
        </div>
        {loadingList ? (
          <div className="flex items-center gap-2 p-4 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        ) : conversations.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">
            No conversations yet. They appear as soon as WhatsApp inbound is connected.
          </p>
        ) : (
          conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`block w-full border-b border-gray-50 px-4 py-3 text-left hover:bg-gray-50 ${
                activeId === c.id ? 'bg-green-50/60' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium text-gray-900">
                  {c.lead?.studentName || c.phone}
                </span>
                <span className="shrink-0 text-[11px] text-gray-400">
                  {timeShort(c.lastMessageAt)}
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-2">
                {c.lead && (
                  <span
                    className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${stageBadgeClass(c.lead.stage)}`}
                  >
                    {stageLabel(c.lead.stage)}
                  </span>
                )}
                <span className="truncate text-xs text-gray-500">
                  {c.lastMessage
                    ? `${c.lastMessage.direction === 'OUTBOUND' ? 'You: ' : ''}${c.lastMessage.content}`
                    : '—'}
                </span>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Thread */}
      <div className="flex min-w-0 flex-1 flex-col">
        {!activeId ? (
          <div className="flex flex-1 items-center justify-center text-sm text-gray-400">
            Select a conversation
          </div>
        ) : !thread ? (
          <div className="flex flex-1 items-center justify-center text-gray-400">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-semibold text-gray-900">
                  {thread.leads?.studentName || thread.phone}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {thread.phone}
                  {thread.leads?.courseInterest ? ` · ${thread.leads.courseInterest}` : ''}
                </p>
              </div>
              {thread.leads && (
                <Link
                  href={`/${surface === 'admin' ? 'admin/students' : 'counselor'}/leads/${thread.leads.id}`}
                  className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  <User className="h-3.5 w-3.5" /> Open lead <ExternalLink className="h-3 w-3" />
                </Link>
              )}
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto bg-gray-50/60 p-4">
              {thread.whatsapp_messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.direction === 'OUTBOUND' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm shadow-sm ${
                      m.direction === 'OUTBOUND'
                        ? 'rounded-br-sm bg-green-600 text-white'
                        : 'rounded-bl-sm bg-white text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{m.content}</p>
                    <p
                      className={`mt-1 text-right text-[10px] ${
                        m.direction === 'OUTBOUND' ? 'text-green-100' : 'text-gray-400'
                      }`}
                    >
                      {m.direction === 'OUTBOUND' && m.users?.name ? `${m.users.name} · ` : ''}
                      {timeShort(m.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-gray-100 p-3">
              <div className="flex gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
                  placeholder="Reply on WhatsApp… (free-text works within 24h of their last message)"
                  aria-label="Reply"
                  className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <button
                  onClick={send}
                  disabled={sending || !draft.trim()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                  aria-label="Send"
                >
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
