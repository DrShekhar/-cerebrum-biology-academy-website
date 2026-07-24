'use client'

import { useState, useEffect, useCallback } from 'react'
import { Bell, Send, Users, AlertTriangle } from 'lucide-react'

/**
 * Admin console for the anonymous web-push lead channel.
 * Shows how many browsers are subscribed and lets an admin broadcast a
 * notification (demo openings, offers) to all of them — no email/phone needed.
 * Auth is gated by src/app/admin/layout.tsx (ADMIN only).
 */
export default function AdminPushPage() {
  const [info, setInfo] = useState<{ configured: boolean; subscribers: number } | null>(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [url, setUrl] = useState('/')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const loadInfo = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/push/broadcast')
      if (res.ok) setInfo(await res.json())
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    loadInfo()
  }, [loadInfo])

  const send = useCallback(async () => {
    if (!title.trim() || !body.trim()) return
    if (!window.confirm(`Send this notification to all ${info?.subscribers ?? ''} subscribers?`)) {
      return
    }
    setSending(true)
    setResult(null)
    try {
      const res = await fetch('/api/admin/push/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), body: body.trim(), url: url.trim() || '/' }),
      })
      const json = await res.json()
      if (json.success) {
        setResult(`Sent to ${json.sent} device(s). ${json.pruned} dead subscription(s) pruned.`)
        setTitle('')
        setBody('')
        loadInfo()
      } else {
        setResult(`Failed: ${json.error || 'unknown error'}`)
      }
    } catch (e) {
      setResult(`Failed: ${(e as Error).message}`)
    } finally {
      setSending(false)
    }
  }, [title, body, url, info, loadInfo])

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100">
          <Bell className="h-6 w-6 text-teal-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Web Push Broadcast</h1>
          <p className="text-sm text-slate-500">
            Message anonymous leads captured without email or phone.
          </p>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <Users className="h-5 w-5 text-slate-400" />
        <div className="text-sm">
          <span className="font-semibold text-slate-900">{info?.subscribers ?? '—'}</span>{' '}
          <span className="text-slate-600">subscribed browsers</span>
        </div>
        {info && !info.configured && (
          <div className="ml-auto flex items-center gap-1.5 text-xs font-medium text-amber-700">
            <AlertTriangle className="h-4 w-4" />
            VAPID keys not set in prod
          </div>
        )}
      </div>

      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            placeholder="New NEET Biology demo batch this week 🎯"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Message</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={300}
            rows={3}
            placeholder="Free trial class with Dr. Shekhar (AIIMS). Tap to book your slot."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Link (on tap)</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="/book-free-demo"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={send}
          disabled={sending || !title.trim() || !body.trim() || !info?.configured}
          className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          {sending ? 'Sending…' : 'Send broadcast'}
        </button>

        {result && (
          <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">{result}</p>
        )}
      </div>
    </div>
  )
}
