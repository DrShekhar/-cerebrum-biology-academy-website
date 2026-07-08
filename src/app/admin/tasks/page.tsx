'use client'

/**
 * Admin shared Task / Request board — one accountable list that any staff or
 * student/parent can add to. Items stay OPEN until a staff member resolves
 * them (nothing is lost). Filter by status/category; assign, progress, resolve.
 */

import { useCallback, useEffect, useState } from 'react'
import { Loader2, Inbox, CheckCircle2, Clock, Circle, XCircle, Plus } from 'lucide-react'
import { PageHeader } from '@/components/admin/kit'

interface SharedTask {
  id: string
  title: string
  detail: string | null
  category: string
  priority: string
  status: string
  createdByName: string | null
  createdByRole: string
  createdAt: string
  resolutionNote: string | null
}

const STATUSES = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'WONT_DO'] as const
const CATEGORIES = ['SUPPORT', 'TECH', 'FEES', 'FEATURE', 'ACADEMIC', 'OTHER']

const STATUS_META: Record<string, { label: string; cls: string; icon: typeof Circle }> = {
  OPEN: { label: 'Open', cls: 'bg-amber-100 text-amber-800', icon: Circle },
  IN_PROGRESS: { label: 'In progress', cls: 'bg-blue-100 text-blue-800', icon: Clock },
  RESOLVED: { label: 'Resolved', cls: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  WONT_DO: { label: "Won't do", cls: 'bg-gray-200 text-gray-600', icon: XCircle },
}
const CAT_CLS: Record<string, string> = {
  SUPPORT: 'bg-teal-100 text-teal-800',
  TECH: 'bg-purple-100 text-purple-800',
  FEES: 'bg-orange-100 text-orange-800',
  FEATURE: 'bg-indigo-100 text-indigo-800',
  ACADEMIC: 'bg-green-100 text-green-800',
  OTHER: 'bg-gray-100 text-gray-700',
}
const PRIORITY_CLS: Record<string, string> = {
  HIGH: 'text-red-600',
  MEDIUM: 'text-amber-600',
  LOW: 'text-gray-400',
}

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<SharedTask[]>([])
  const [openCount, setOpenCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [statusFilter, setStatusFilter] = useState('OPEN')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [adding, setAdding] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (statusFilter !== 'all') params.set('status', statusFilter)
    if (categoryFilter !== 'all') params.set('category', categoryFilter)
    setFailed(false)
    try {
      const res = await fetch(`/api/tasks/shared?${params.toString()}`)
      const json = await res.json()
      if (json.success) {
        setTasks(json.data.tasks)
        setOpenCount(json.data.openCount)
      } else {
        setFailed(true)
      }
    } catch {
      setFailed(true)
    } finally {
      setLoading(false)
    }
  }, [statusFilter, categoryFilter])

  useEffect(() => {
    load()
  }, [load])

  const update = async (id: string, patch: Record<string, unknown>) => {
    const res = await fetch(`/api/tasks/shared/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    })
    if (res.ok) load()
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Tasks & Requests"
        subtitle="One shared board for staff to-dos and student/parent requests — stays open until resolved"
        actions={
          <button
            onClick={() => setAdding((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> New task
          </button>
        }
      />

      {adding && (
        <NewTaskForm
          onCreated={() => {
            setAdding(false)
            load()
          }}
        />
      )}

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm">
          <Inbox className="h-4 w-4 text-amber-500" />
          <span className="font-semibold text-gray-900">{openCount}</span>
          <span className="text-gray-500">open &amp; in progress</span>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_META[s].label}
            </option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0) + c.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 py-16 text-gray-500 justify-center">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading…
        </div>
      ) : failed ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-red-700">Couldn&apos;t load tasks.</p>
          <button
            onClick={load}
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      ) : tasks.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-gray-500">
          <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-green-500" />
          Nothing here — all clear for this filter.
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((t) => {
            const sm = STATUS_META[t.status] || STATUS_META.OPEN
            return (
              <div key={t.id} className="rounded-2xl border border-gray-200 bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${CAT_CLS[t.category] || CAT_CLS.OTHER}`}
                      >
                        {t.category.toLowerCase()}
                      </span>
                      <span className={`text-xs font-bold ${PRIORITY_CLS[t.priority]}`}>
                        {t.priority === 'HIGH'
                          ? '● High'
                          : t.priority === 'MEDIUM'
                            ? '● Medium'
                            : '● Low'}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${sm.cls}`}>
                        {sm.label}
                      </span>
                    </div>
                    <p className="mt-2 font-semibold text-gray-900">{t.title}</p>
                    {t.detail && <p className="mt-1 text-sm text-gray-600">{t.detail}</p>}
                    <p className="mt-2 text-xs text-gray-400">
                      by {t.createdByName || 'Unknown'} ({t.createdByRole.toLowerCase()}) ·{' '}
                      {new Date(t.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                      })}
                      {t.resolutionNote ? ` · resolution: ${t.resolutionNote}` : ''}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {t.status === 'OPEN' && (
                      <button
                        onClick={() => update(t.id, { status: 'IN_PROGRESS' })}
                        className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-50"
                      >
                        Start
                      </button>
                    )}
                    {t.status !== 'RESOLVED' && t.status !== 'WONT_DO' && (
                      <button
                        onClick={() => update(t.id, { status: 'RESOLVED' })}
                        className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700"
                      >
                        Resolve
                      </button>
                    )}
                    {(t.status === 'RESOLVED' || t.status === 'WONT_DO') && (
                      <button
                        onClick={() => update(t.id, { status: 'OPEN' })}
                        className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                      >
                        Reopen
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function NewTaskForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')
  const [category, setCategory] = useState('OTHER')
  const [priority, setPriority] = useState('MEDIUM')
  const [saving, setSaving] = useState(false)

  const submit = async () => {
    if (title.trim().length < 3 || saving) return
    setSaving(true)
    try {
      const res = await fetch('/api/tasks/shared', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, detail: detail || undefined, category, priority }),
      })
      if (res.ok) onCreated()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs doing?"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
      />
      <textarea
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        placeholder="Details (optional)"
        rows={2}
        className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
      />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0) + c.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        <button
          onClick={submit}
          disabled={saving || title.trim().length < 3}
          className="ml-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Adding…' : 'Add task'}
        </button>
      </div>
    </div>
  )
}
