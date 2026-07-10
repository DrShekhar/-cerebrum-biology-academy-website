'use client'

/**
 * Student — "My Batch" (cohort view).
 *
 * A light community surface over the existing student_groups data: the batches
 * a student belongs to, their classmates roster, the content shared to the
 * batch (materials / videos / tests) and any batch-scoped notices. READ-ONLY —
 * no posting/chat/threads (that's the heavier community build, out of scope).
 * Powered by GET /api/student/batch.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Users,
  FileText,
  PlaySquare,
  ClipboardList,
  Megaphone,
  Pin,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface Member {
  id: string
  name: string
}
interface SharedItem {
  id: string
  kind: 'material' | 'video' | 'test'
  title: string
  type: string
  href: string
}
interface BatchNotice {
  id: string
  title: string
  content: string
  category: string
  isPinned: boolean
  publishedAt: string
}
interface BatchGroup {
  id: string
  name: string
  description?: string | null
  classLevel?: string | null
  memberCount: number
  members: Member[]
  sharedContent: SharedItem[]
  notices: BatchNotice[]
}

const AVATAR_TONES = [
  'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
  'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200',
  'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200',
]

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const KIND_ICON = {
  material: FileText,
  video: PlaySquare,
  test: ClipboardList,
} as const

export default function StudentBatchPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const [groups, setGroups] = useState<BatchGroup[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const load = () => {
    setLoading(true)
    setError(false)
    fetch('/api/student/batch')
      .then((r) => r.json())
      .then((j) => {
        if (!j?.success) throw new Error(j?.error || 'Failed')
        const gs: BatchGroup[] = j.data?.groups ?? []
        setGroups(gs)
        setActiveId((prev) => prev ?? gs[0]?.id ?? null)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (authLoading) return
    if (!isAuthenticated) {
      setLoading(false)
      return
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, authLoading])

  // Not signed in
  if (!authLoading && !isAuthenticated) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <Users className="mx-auto h-12 w-12 text-emerald-500" />
        <h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100">
          Sign in to see your batch
        </h1>
        <Link
          href="/sign-in"
          className="mt-5 inline-block rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Sign in
        </Link>
      </div>
    )
  }

  // Loading skeleton
  if (authLoading || loading) {
    return (
      <div className="mx-auto max-w-5xl animate-pulse px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="mt-6 h-28 rounded-2xl bg-gray-200 dark:bg-gray-800" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="h-64 rounded-2xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-64 rounded-2xl bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    )
  }

  // Error + retry
  if (error) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-amber-500" />
        <h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100">
          Couldn&apos;t load your batch
        </h1>
        <button
          onClick={load}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          <RefreshCw className="h-4 w-4" /> Try again
        </button>
      </div>
    )
  }

  // Empty state
  if (groups.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/40">
          <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-300" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100">
          You&apos;re not in a batch yet
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Your counselor will add you to your cohort. Once you&apos;re in, your classmates and
          batch-shared study material will show up here.
        </p>
      </div>
    )
  }

  const active = groups.find((g) => g.id === activeId) ?? groups[0]

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Batch</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your cohort, classmates and shared study material.
          </p>
        </div>
      </div>

      {/* Group switcher */}
      {groups.length > 1 && (
        <div className="scrollbar-hide mt-6 flex gap-2 overflow-x-auto">
          {groups.map((g) => {
            const on = g.id === active.id
            return (
              <button
                key={g.id}
                onClick={() => setActiveId(g.id)}
                className={
                  'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ' +
                  (on
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700')
                }
              >
                {g.name}
              </button>
            )
          })}
        </div>
      )}

      {/* Batch header card */}
      <div className="mt-6 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-amber-50 p-5 dark:border-emerald-900/50 dark:from-emerald-950/40 dark:to-amber-950/20">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{active.name}</h2>
            {active.description && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{active.description}</p>
            )}
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-semibold text-emerald-700 shadow-sm dark:bg-gray-900 dark:text-emerald-300">
            <Users className="h-4 w-4" />
            {active.memberCount} {active.memberCount === 1 ? 'member' : 'members'}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Roster */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            <Users className="h-4 w-4 text-emerald-600" /> Classmates
          </h3>
          <ul className="mt-4 space-y-2.5">
            {active.members.map((m, i) => (
              <li key={m.id} className="flex items-center gap-3">
                <span
                  className={
                    'grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold ' +
                    AVATAR_TONES[i % AVATAR_TONES.length]
                  }
                >
                  {initials(m.name)}
                </span>
                <span className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">
                  {m.name}
                </span>
              </li>
            ))}
          </ul>
          {active.memberCount > active.members.length && (
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-500">
              + {active.memberCount - active.members.length} more
            </p>
          )}
        </section>

        {/* Shared content */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            <FileText className="h-4 w-4 text-amber-600" /> Shared with your batch
          </h3>
          {active.sharedContent.length === 0 ? (
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
              Nothing shared to this batch yet.
            </p>
          ) : (
            <ul className="mt-4 space-y-2">
              {active.sharedContent.map((c) => {
                const Icon = KIND_ICON[c.kind]
                return (
                  <li key={c.id}>
                    <Link
                      href={c.href}
                      className="flex items-center gap-3 rounded-xl border border-gray-100 px-3 py-2.5 transition-colors hover:border-emerald-200 hover:bg-emerald-50 dark:border-gray-800 dark:hover:border-emerald-900 dark:hover:bg-emerald-950/30"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-gray-800 dark:text-gray-200">
                          {c.title}
                        </span>
                        <span className="text-xs uppercase tracking-wide text-gray-400">
                          {c.type}
                        </span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </div>

      {/* Batch notices */}
      {active.notices.length > 0 && (
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            <Megaphone className="h-4 w-4 text-amber-600" /> Batch notices
          </h3>
          <ul className="mt-4 space-y-3">
            {active.notices.map((n) => (
              <li
                key={n.id}
                className="rounded-xl border border-amber-100 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/20"
              >
                <div className="flex items-start gap-2">
                  {n.isPinned && (
                    <Pin className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-label="Pinned" />
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{n.title}</p>
                    <p className="mt-1 whitespace-pre-line text-sm text-gray-700 dark:text-gray-300">
                      {n.content}
                    </p>
                    <p className="mt-2 text-xs text-gray-400">
                      {new Date(n.publishedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
