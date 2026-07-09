'use client'

/**
 * Shared WhatsApp TEAM inbox v2 — one number, whole team (Phase 1).
 * Queue tabs (Unassigned / Mine / All) with counts, transparent takeover
 * (agent name on every outbound bubble + logged handoffs), internal notes
 * with @mentions interleaved in the thread, 24h-window awareness, quick
 * replies with {{name}}/{{course}} interpolation, resolve/reopen.
 * List polls every 15s, the open thread every 5s.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  MessageSquare,
  Send,
  Loader2,
  User,
  ExternalLink,
  StickyNote,
  Zap,
  CheckCircle2,
  RotateCcw,
  Clock,
  UserPlus,
} from 'lucide-react'
import { stageBadgeClass, stageLabel } from '@/lib/leads/stageColors'
import { MentionTextarea } from '@/components/staff/MentionTextarea'
import { segmentContent } from '@/lib/staff/mentions'

interface ConversationSummary {
  id: string
  phone: string
  status: string
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
  users?: { id: string; name: string } | null
}

interface ThreadData {
  id: string
  phone: string
  status: string
  assignedCounselorId: string | null
  users: { id: string; name: string } | null
  leads: { id: string; studentName: string; courseInterest: string; stage: string } | null
  whatsapp_messages: ThreadMessage[]
}

interface StaffUser {
  id: string
  name: string
  role: string
}

interface QuickTemplate {
  id: string
  name: string
  message: string
}

type Tab = 'mine' | 'unassigned' | 'all'
const WINDOW_MS = 24 * 60 * 60 * 1000

const timeShort = (d: string) =>
  new Date(d).toLocaleString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
  })

/** Render note text with @mentions highlighted. */
function NoteBody({ content }: { content: string }) {
  const segments = segmentContent(content)
  return (
    <p className="whitespace-pre-wrap break-words">
      {segments.map((seg, i) =>
        seg.type === 'mention' ? (
          <span key={i} className="font-semibold text-amber-900">
            @{seg.name}
          </span>
        ) : (
          <span key={i}>{seg.value}</span>
        )
      )}
    </p>
  )
}

export function WhatsAppInbox({ surface }: { surface: 'admin' | 'counselor' }) {
  const [tab, setTab] = useState<Tab>('mine')
  const [counts, setCounts] = useState<{ unassigned: number; mine: number; all: number }>({
    unassigned: 0,
    mine: 0,
    all: 0,
  })
  const [conversations, setConversations] = useState<ConversationSummary[]>([])
  const [activeId, setActiveId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    return new URLSearchParams(window.location.search).get('conversation')
  })
  const [thread, setThread] = useState<ThreadData | null>(null)
  const [loadingList, setLoadingList] = useState(true)
  const [draft, setDraft] = useState('')
  const [noteDraft, setNoteDraft] = useState('')
  const [composer, setComposer] = useState<'reply' | 'note'>('reply')
  const [sending, setSending] = useState(false)
  const [staff, setStaff] = useState<StaffUser[]>([])
  const [templates, setTemplates] = useState<QuickTemplate[]>([])
  const [showQuick, setShowQuick] = useState(false)
  const [showAssign, setShowAssign] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const loadList = useCallback(async () => {
    try {
      const res = await fetch(`/api/staff/whatsapp-inbox?tab=${tab}`)
      const json = await res.json()
      if (json.success) {
        setConversations(json.data.conversations)
        if (json.data.counts) setCounts(json.data.counts)
      }
    } catch {
      /* poll again */
    } finally {
      setLoadingList(false)
    }
  }, [tab])

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
    setLoadingList(true)
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

  // Staff list (assign dropdown) + quick-reply templates — loaded once.
  useEffect(() => {
    fetch('/api/staff/users/search?limit=20')
      .then((r) => r.json())
      .then((j) => j.success && setStaff(j.data.users))
      .catch(() => {})
    fetch('/api/counselor/templates?type=WHATSAPP&activeOnly=true')
      .then((r) => r.json())
      .then((j) => j.success && setTemplates(j.data || []))
      .catch(() => {})
  }, [])

  const send = async () => {
    const isNote = composer === 'note'
    const text = (isNote ? noteDraft : draft).trim()
    if (!text || !activeId || sending) return
    setSending(true)
    try {
      const res = await fetch('/api/staff/whatsapp-inbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: activeId,
          message: text,
          type: isNote ? 'note' : 'reply',
        }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        if (isNote) setNoteDraft('')
        else setDraft('')
        await loadThread(activeId)
        loadList()
      } else {
        toast.error(json.error || 'Send failed')
      }
    } finally {
      setSending(false)
    }
  }

  const act = async (action: 'assign' | 'close' | 'reopen', assigneeId?: string | null) => {
    if (!activeId) return
    const res = await fetch('/api/staff/whatsapp-inbox', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: activeId, action, assigneeId }),
    })
    const json = await res.json()
    if (res.ok && json.success) {
      setShowAssign(false)
      await loadThread(activeId)
      loadList()
    } else {
      toast.error(json.error || 'Action failed')
    }
  }

  const insertTemplate = (t: QuickTemplate) => {
    const text = t.message
      .replace(/\{\{name\}\}/gi, thread?.leads?.studentName || '')
      .replace(/\{\{student_name\}\}/gi, thread?.leads?.studentName || '')
      .replace(/\{\{course\}\}/gi, thread?.leads?.courseInterest || '')
    setDraft(text)
    setComposer('reply')
    setShowQuick(false)
  }

  // 24h customer-service window: computed from the last INBOUND message.
  const lastInbound = thread?.whatsapp_messages
    .filter((m) => m.direction === 'INBOUND')
    .slice(-1)[0]
  const windowRemainingMs = lastInbound
    ? WINDOW_MS - (Date.now() - new Date(lastInbound.timestamp).getTime())
    : null
  const windowOpen = windowRemainingMs !== null && windowRemainingMs > 0

  const TABS: { key: Tab; label: string; count: number }[] = [
    { key: 'mine', label: 'Mine', count: counts.mine },
    { key: 'unassigned', label: 'Unassigned', count: counts.unassigned },
    { key: 'all', label: 'All', count: counts.all },
  ]

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* Conversation list */}
      <div className="flex w-80 shrink-0 flex-col border-r border-gray-100">
        <div className="border-b border-gray-100 p-4 pb-3">
          <h2 className="flex items-center gap-2 font-semibold text-gray-900">
            <MessageSquare className="h-4 w-4 text-green-600" /> WhatsApp Inbox
          </h2>
          <div className="mt-3 flex gap-1 rounded-lg bg-gray-100 p-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 rounded-md px-2 py-1.5 text-xs font-semibold transition-colors ${
                  tab === t.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                }`}
              >
                {t.label}
                <span
                  className={`ml-1 ${t.key === 'unassigned' && t.count > 0 ? 'text-amber-600' : 'text-gray-400'}`}
                >
                  {t.count}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loadingList ? (
            <div className="flex items-center gap-2 p-4 text-sm text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading…
            </div>
          ) : conversations.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">
              {tab === 'mine'
                ? 'No conversations assigned to you yet — check Unassigned.'
                : tab === 'unassigned'
                  ? 'No unassigned conversations. 🎉'
                  : 'No conversations yet. They appear as soon as WhatsApp inbound is connected.'}
            </p>
          ) : (
            conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`block w-full border-b border-gray-50 px-4 py-3 text-left hover:bg-gray-50 ${
                  activeId === c.id ? 'bg-green-50/60' : ''
                } ${c.status === 'CLOSED' ? 'opacity-60' : ''}`}
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
                <div className="mt-1 flex items-center gap-2 text-[10px] text-gray-400">
                  {c.counselor ? (
                    <span>👤 {c.counselor.name}</span>
                  ) : (
                    <span className="font-semibold text-amber-600">Unassigned</span>
                  )}
                  {c.status === 'CLOSED' && <span>· resolved</span>}
                </div>
              </button>
            ))
          )}
        </div>
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
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-semibold text-gray-900">
                  {thread.leads?.studentName || thread.phone}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {thread.phone}
                  {thread.leads?.courseInterest ? ` · ${thread.leads.courseInterest}` : ''}
                  {thread.users ? ` · handled by ${thread.users.name}` : ' · unassigned'}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {/* 24h window badge */}
                {windowRemainingMs !== null && (
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
                      windowOpen ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-800'
                    }`}
                    title="Free-text replies work for 24h after the customer's last message"
                  >
                    <Clock className="h-3 w-3" />
                    {windowOpen
                      ? `${Math.floor(windowRemainingMs / 3600000)}h ${Math.floor((windowRemainingMs % 3600000) / 60000)}m left`
                      : 'Window closed'}
                  </span>
                )}
                {/* Assign */}
                <div className="relative">
                  <button
                    onClick={() => setShowAssign((v) => !v)}
                    className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <UserPlus className="h-3.5 w-3.5" /> Assign
                  </button>
                  {showAssign && (
                    <div className="absolute right-0 z-20 mt-1 w-48 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                      {staff.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => act('assign', s.id)}
                          className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                        >
                          {s.name}
                          <span className="ml-1 text-[10px] text-gray-400">
                            {s.role.toLowerCase()}
                          </span>
                        </button>
                      ))}
                      <button
                        onClick={() => act('assign', null)}
                        className="block w-full border-t border-gray-100 px-3 py-2 text-left text-sm text-amber-700 hover:bg-gray-50"
                      >
                        Move to Unassigned
                      </button>
                    </div>
                  )}
                </div>
                {/* Resolve / Reopen */}
                {thread.status === 'CLOSED' ? (
                  <button
                    onClick={() => act('reopen')}
                    className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Reopen
                  </button>
                ) : (
                  <button
                    onClick={() => act('close')}
                    className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-green-700"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Resolve
                  </button>
                )}
                {thread.leads && (
                  <Link
                    href={`/${surface === 'admin' ? 'admin/students' : 'counselor'}/leads/${thread.leads.id}`}
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <User className="h-3.5 w-3.5" /> Lead <ExternalLink className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto bg-gray-50/60 p-4">
              {thread.whatsapp_messages.map((m) => {
                if (m.messageType === 'system_event') {
                  return (
                    <div key={m.id} className="flex justify-center">
                      <span className="rounded-full bg-gray-200/80 px-3 py-1 text-[11px] text-gray-600">
                        {m.content} · {timeShort(m.timestamp)}
                      </span>
                    </div>
                  )
                }
                if (m.messageType === 'internal_note') {
                  return (
                    <div key={m.id} className="flex justify-center">
                      <div className="w-full max-w-[85%] rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-sm text-amber-900 shadow-sm">
                        <p className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-amber-600">
                          <StickyNote className="h-3 w-3" /> Internal note — not sent to WhatsApp
                        </p>
                        <NoteBody content={m.content} />
                        <p className="mt-1 text-right text-[10px] text-amber-500">
                          {m.users?.name ? `${m.users.name} · ` : ''}
                          {timeShort(m.timestamp)}
                        </p>
                      </div>
                    </div>
                  )
                }
                return (
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
                )
              })}
              <div ref={bottomRef} />
            </div>

            {/* Composer: Reply | Note */}
            <div className="border-t border-gray-100 p-3">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex gap-1 rounded-lg bg-gray-100 p-0.5">
                  <button
                    onClick={() => setComposer('reply')}
                    className={`rounded-md px-3 py-1 text-xs font-semibold ${
                      composer === 'reply' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => setComposer('note')}
                    className={`inline-flex items-center gap-1 rounded-md px-3 py-1 text-xs font-semibold ${
                      composer === 'note' ? 'bg-white text-amber-700 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    <StickyNote className="h-3 w-3" /> Note
                  </button>
                </div>
                {composer === 'reply' && templates.length > 0 && (
                  <div className="relative">
                    <button
                      onClick={() => setShowQuick((v) => !v)}
                      className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <Zap className="h-3 w-3 text-amber-500" /> Quick replies
                    </button>
                    {showQuick && (
                      <div className="absolute bottom-full left-0 z-20 mb-1 max-h-64 w-72 overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                        {templates.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => insertTemplate(t)}
                            className="block w-full px-3 py-2 text-left hover:bg-gray-50"
                          >
                            <span className="block text-xs font-semibold text-gray-800">
                              {t.name}
                            </span>
                            <span className="block truncate text-xs text-gray-500">
                              {t.message}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {composer === 'reply' && !windowOpen && windowRemainingMs !== null && (
                  <span className="text-[11px] text-amber-700">
                    24h window closed — free text may fail until they reply again
                  </span>
                )}
              </div>

              {composer === 'note' ? (
                <div className="flex items-end gap-2">
                  <MentionTextarea
                    value={noteDraft}
                    onChange={setNoteDraft}
                    rows={2}
                    placeholder="Internal note for the team — @mention a teammate to notify them. Never sent to WhatsApp."
                    className="flex-1 rounded-xl border border-amber-300 bg-amber-50/50 px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    onClick={send}
                    disabled={sending || !noteDraft.trim()}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-50"
                  >
                    {sending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <StickyNote className="h-4 w-4" />
                    )}
                  </button>
                </div>
              ) : (
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
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
