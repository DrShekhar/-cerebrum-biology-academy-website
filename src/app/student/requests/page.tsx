'use client'

/**
 * Student "Raise a request" — students (and parents) file support / fees /
 * tech / feature / academic requests that land on the admin shared task
 * board (/admin/tasks). Each request stays open until staff resolves it;
 * students see their own here with live status + any resolution note.
 */

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Clock,
  Circle,
  XCircle,
  LifeBuoy,
  Lightbulb,
  CreditCard,
  Wrench,
  BookOpen,
  HelpCircle,
} from 'lucide-react'

interface Task {
  id: string
  title: string
  detail: string | null
  category: string
  status: string
  createdAt: string
  resolutionNote: string | null
}

const CATEGORIES = [
  { key: 'SUPPORT', label: 'Support', icon: LifeBuoy, hint: 'Account, access, general help' },
  { key: 'FEES', label: 'Fees & payment', icon: CreditCard, hint: 'Invoices, installments, receipts' },
  { key: 'TECH', label: 'Technical issue', icon: Wrench, hint: 'App bugs, video, login' },
  { key: 'ACADEMIC', label: 'Academic', icon: BookOpen, hint: 'Classes, materials, doubts' },
  { key: 'FEATURE', label: 'Feature request', icon: Lightbulb, hint: 'Ideas to improve the app' },
  { key: 'OTHER', label: 'Something else', icon: HelpCircle, hint: '' },
]

const STATUS_META: Record<string, { label: string; cls: string; icon: typeof Circle }> = {
  OPEN: { label: 'Open', cls: 'bg-amber-100 text-amber-800', icon: Circle },
  IN_PROGRESS: { label: 'In progress', cls: 'bg-blue-100 text-blue-800', icon: Clock },
  RESOLVED: { label: 'Resolved', cls: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  WONT_DO: { label: 'Closed', cls: 'bg-gray-200 text-gray-600', icon: XCircle },
}

export default function StudentRequestsPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('SUPPORT')
  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [justSent, setJustSent] = useState(false)

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/tasks/shared')
      const json = await res.json()
      if (json.success) setTasks(json.data.tasks)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const submit = async () => {
    if (title.trim().length < 3 || submitting) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/tasks/shared', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, detail: detail || undefined, category }),
      })
      if (res.ok) {
        setTitle('')
        setDetail('')
        setJustSent(true)
        setTimeout(() => setJustSent(false), 3500)
        load()
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link
          href="/student/dashboard"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Raise a request</h1>
        <p className="mt-1 text-sm text-gray-600">
          Tell us what you need — support, a fee query, a bug, or an idea for the app. Our team
          picks it up and it stays here until it&apos;s resolved.
        </p>

        {/* New request form */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            What is it about?
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CATEGORIES.map((c) => {
              const on = category === c.key
              return (
                <button
                  key={c.key}
                  onClick={() => setCategory(c.key)}
                  className={`flex items-start gap-2 rounded-xl border p-3 text-left transition-colors ${
                    on
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <c.icon className={`mt-0.5 h-4 w-4 shrink-0 ${on ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span>
                    <span className="block text-sm font-medium text-gray-900">{c.label}</span>
                    {c.hint && <span className="block text-[11px] text-gray-400">{c.hint}</span>}
                  </span>
                </button>
              )
            })}
          </div>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Short summary (e.g. Can't open the Genetics recording)"
            className="mt-4 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="Any details that help us fix it faster (optional)"
            rows={3}
            className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={submit}
              disabled={submitting || title.trim().length < 3}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <LifeBuoy className="h-4 w-4" />}
              Submit request
            </button>
            {justSent && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                <CheckCircle2 className="h-4 w-4" /> Sent — we&apos;ll get on it
              </span>
            )}
          </div>
        </div>

        {/* My requests */}
        <h2 className="mb-3 mt-8 text-lg font-bold text-gray-900">Your requests</h2>
        {loading ? (
          <div className="flex items-center gap-2 py-8 text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading…
          </div>
        ) : tasks.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
            No requests yet. Raise one above whenever you need help.
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((t) => {
              const sm = STATUS_META[t.status] || STATUS_META.OPEN
              return (
                <div key={t.id} className="rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900">{t.title}</p>
                      {t.detail && <p className="mt-0.5 text-sm text-gray-600">{t.detail}</p>}
                      <p className="mt-1 text-xs text-gray-400">
                        {t.category.toLowerCase()} ·{' '}
                        {new Date(t.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${sm.cls}`}>
                      {sm.label}
                    </span>
                  </div>
                  {t.resolutionNote && (
                    <p className="mt-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
                      <span className="font-semibold">Resolved: </span>
                      {t.resolutionNote}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
