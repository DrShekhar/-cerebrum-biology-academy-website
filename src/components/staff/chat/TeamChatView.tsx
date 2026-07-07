'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Hash, Plus, Send, Loader2, MessageCircle, Users as UsersIcon, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useStaffInbox } from '@/hooks/staff/useStaffInbox'
import { useChannelMessages } from '@/hooks/staff/useChannelMessages'
import { MentionTextarea } from '@/components/staff/MentionTextarea'
import { MessageBody } from '@/components/staff/MessageBody'

interface ChannelSummary {
  id: string
  name: string
  description: string | null
  type: 'TEAM' | 'DIRECT'
  unread: number
  lastMessage: { content: string; senderName: string | null } | null
  members: { id: string; name: string | null; role: string }[]
}

interface StaffUser {
  id: string
  name: string | null
  role: string
}

/**
 * Two-pane team chat: channel/DM list + message pane. Polling-based
 * (5s open panel / 15s inbox), works for admin and counselor surfaces.
 */
export function TeamChatView() {
  const { user } = useAuth()
  const { markChannelRead, refresh } = useStaffInbox()
  const [channels, setChannels] = useState<ChannelSummary[]>([])
  const [channelsLoading, setChannelsLoading] = useState(true)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [composer, setComposer] = useState('')
  const [showNewChannel, setShowNewChannel] = useState(false)
  const { messages, loading, sending, sendMessage } = useChannelMessages(activeId)
  const bottomRef = useRef<HTMLDivElement>(null)

  const fetchChannels = useCallback(async () => {
    try {
      const res = await fetch('/api/staff/channels')
      const json = await res.json()
      if (json.success) {
        setChannels(json.data.channels)
      }
    } catch {
      // keep current list
    } finally {
      setChannelsLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchChannels()
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') void fetchChannels()
    }, 15_000)
    return () => clearInterval(timer)
  }, [fetchChannels])

  // Opening a channel marks it read.
  useEffect(() => {
    if (activeId) {
      void markChannelRead(activeId)
      setChannels((prev) => prev.map((c) => (c.id === activeId ? { ...c, unread: 0 } : c)))
    }
  }, [activeId, markChannelRead])

  // Keep the pane pinned to the latest message.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const active = channels.find((c) => c.id === activeId) || null

  const handleSend = async () => {
    const ok = await sendMessage(composer)
    if (ok) {
      setComposer('')
      void refresh()
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Channel list */}
      <div
        className={`w-full sm:w-72 border-r border-gray-200 flex-col ${activeId ? 'hidden sm:flex' : 'flex'}`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Team Chat</h2>
          <button
            onClick={() => setShowNewChannel(true)}
            className="p-1.5 hover:bg-gray-100 rounded-lg"
            aria-label="New channel or direct message"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {channelsLoading ? (
            <div className="flex justify-center py-8 text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : channels.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 text-center">
              No conversations yet. Start one with{' '}
              <button className="text-blue-600" onClick={() => setShowNewChannel(true)}>
                + New
              </button>
            </div>
          ) : (
            channels.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 ${
                  activeId === c.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 font-medium text-gray-900 text-sm truncate">
                    {c.type === 'TEAM' ? (
                      <Hash className="w-4 h-4 text-gray-400 shrink-0" />
                    ) : (
                      <MessageCircle className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                    {c.name}
                  </span>
                  {c.unread > 0 && (
                    <span className="min-w-[20px] h-5 px-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shrink-0">
                      {c.unread > 9 ? '9+' : c.unread}
                    </span>
                  )}
                </div>
                {c.lastMessage && (
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {c.lastMessage.senderName ? `${c.lastMessage.senderName}: ` : ''}
                    {c.lastMessage.content}
                  </p>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Message pane */}
      <div className={`flex-1 flex-col ${activeId ? 'flex' : 'hidden sm:flex'}`}>
        {!active ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            Select a conversation
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div className="min-w-0">
                <button
                  onClick={() => setActiveId(null)}
                  className="sm:hidden text-xs text-blue-600 mb-0.5"
                >
                  ← All conversations
                </button>
                <h3 className="font-semibold text-gray-900 truncate">{active.name}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <UsersIcon className="w-3 h-3" />
                  {active.members.map((m) => m.name || 'Unnamed').join(', ')}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {loading ? (
                <div className="flex justify-center py-8 text-gray-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              ) : messages.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  No messages yet — say hello 👋
                </p>
              ) : (
                messages.map((m) => {
                  const mine = m.sender.id === user?.id
                  return (
                    <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[80%] rounded-xl px-3 py-2 ${
                          mine ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {!mine && (
                          <p className="text-xs font-medium mb-0.5 opacity-70">
                            {m.sender.name || 'Teammate'}
                          </p>
                        )}
                        <p className="text-sm">
                          {m.deleted ? (
                            <em className="opacity-60">Message deleted</em>
                          ) : (
                            <MessageBody content={m.content || ''} selfId={user?.id} />
                          )}
                        </p>
                        <p
                          className={`text-[10px] mt-1 ${mine ? 'text-blue-100' : 'text-gray-400'}`}
                        >
                          {new Date(m.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-gray-100 p-3 flex gap-2 items-end">
              <div className="flex-1">
                <MentionTextarea
                  value={composer}
                  onChange={setComposer}
                  rows={2}
                  placeholder={`Message ${active.name}… type @ to mention`}
                />
              </div>
              <button
                onClick={() => void handleSend()}
                disabled={sending || !composer.trim()}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Send message"
              >
                {sending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {showNewChannel && (
        <NewChannelModal
          onClose={() => setShowNewChannel(false)}
          onCreated={(channelId) => {
            setShowNewChannel(false)
            void fetchChannels().then(() => setActiveId(channelId))
          }}
        />
      )}
    </div>
  )
}

function NewChannelModal({
  onClose,
  onCreated,
}: {
  onClose: () => void
  onCreated: (channelId: string) => void
}) {
  const [mode, setMode] = useState<'DIRECT' | 'TEAM'>('DIRECT')
  const [name, setName] = useState('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<StaffUser[]>([])
  const [selected, setSelected] = useState<StaffUser[]>([])
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/staff/users/search?q=${encodeURIComponent(query)}&limit=10`)
        const json = await res.json()
        if (json.success) setResults(json.data.users)
      } catch {
        setResults([])
      }
    }, 200)
    return () => clearTimeout(timer)
  }, [query])

  const toggle = (user: StaffUser) => {
    setSelected((prev) =>
      prev.some((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : mode === 'DIRECT'
          ? [user]
          : [...prev, user]
    )
  }

  const create = async () => {
    if (selected.length === 0) return
    setCreating(true)
    setError(null)
    try {
      const res = await fetch('/api/staff/channels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: mode,
          name: mode === 'TEAM' ? name : undefined,
          memberIds: selected.map((u) => u.id),
        }),
      })
      const json = await res.json()
      if (json.success) {
        onCreated(json.data.channelId)
      } else {
        setError(json.error || 'Failed to create')
      }
    } catch {
      setError('Failed to create')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">New conversation</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => {
              setMode('DIRECT')
              setSelected((prev) => prev.slice(0, 1))
            }}
            className={`flex-1 px-3 py-2 text-sm rounded-lg border ${
              mode === 'DIRECT'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 text-gray-700'
            }`}
          >
            Direct message
          </button>
          <button
            onClick={() => setMode('TEAM')}
            className={`flex-1 px-3 py-2 text-sm rounded-lg border ${
              mode === 'TEAM'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 text-gray-700'
            }`}
          >
            Team channel
          </button>
        </div>

        {mode === 'TEAM' && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Channel name (e.g. Counselors, Admissions)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3"
          />
        )}

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search staff…"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2"
        />
        <div className="max-h-40 overflow-y-auto border border-gray-100 rounded-lg mb-3">
          {results.map((u) => {
            const isSelected = selected.some((s) => s.id === u.id)
            return (
              <button
                key={u.id}
                onClick={() => toggle(u)}
                className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-gray-50 ${
                  isSelected ? 'bg-blue-50' : ''
                }`}
              >
                <span className="text-gray-900">{u.name || 'Unnamed'}</span>
                <span className="text-xs text-gray-500">{u.role}</span>
              </button>
            )
          })}
          {results.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-3">No staff found</p>
          )}
        </div>

        {selected.length > 0 && (
          <p className="text-xs text-gray-600 mb-3">
            {mode === 'DIRECT' ? 'To: ' : 'Members: '}
            {selected.map((u) => u.name || 'Unnamed').join(', ')}
          </p>
        )}
        {error && <p className="text-xs text-red-600 mb-2">{error}</p>}

        <button
          onClick={() => void create()}
          disabled={creating || selected.length === 0 || (mode === 'TEAM' && !name.trim())}
          className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {creating ? 'Creating…' : mode === 'DIRECT' ? 'Start conversation' : 'Create channel'}
        </button>
      </div>
    </div>
  )
}
