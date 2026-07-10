'use client'

/**
 * P1 dashboard widget — attendance ring. Real data only from
 * /api/student/attendance (present / total marked sessions). Ring colour bands:
 * green ≥85, amber 70–84, red <70 — matching the DashboardHero's emerald/amber
 * language. New students (no sessions marked yet) get a tidy empty state.
 */

import { useEffect, useState } from 'react'
import { UserCheck } from 'lucide-react'

const EMERALD = '#17924f'
const AMBER = '#f59e0b'
const CORAL = '#f87171'

interface AttendanceStats {
  totalSessions: number
  present: number
  absent: number
  late: number
  excused: number
}

function bandColor(pct: number): string {
  if (pct >= 85) return EMERALD
  if (pct >= 70) return AMBER
  return CORAL
}

function bandLabel(pct: number): string {
  if (pct >= 85) return 'Great attendance'
  if (pct >= 70) return 'Keep it up'
  return 'Attend more classes'
}

export function AttendanceRing() {
  const [stats, setStats] = useState<AttendanceStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch('/api/student/attendance')
        if (!res.ok) throw new Error('not ok')
        const json = await res.json()
        const s = json?.data?.statistics
        if (!cancelled) {
          setStats(
            s
              ? {
                  totalSessions: s.totalSessions ?? 0,
                  present: s.present ?? 0,
                  absent: s.absent ?? 0,
                  late: s.late ?? 0,
                  excused: s.excused ?? 0,
                }
              : null
          )
        }
      } catch {
        if (!cancelled) setStats(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div className="flex animate-pulse items-center gap-5 rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <div className="h-28 w-28 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    )
  }

  if (!stats || stats.totalSessions === 0) {
    return (
      <div className="flex h-full flex-col justify-center rounded-3xl border border-dashed border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-900">
        <UserCheck className="mx-auto mb-2 h-7 w-7 text-gray-300 dark:text-gray-600" />
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">No attendance yet</p>
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          Your attendance appears once classes are marked.
        </p>
      </div>
    )
  }

  const pct = Math.round((stats.present / stats.totalSessions) * 100)
  const color = bandColor(pct)
  const R = 46
  const C = 2 * Math.PI * R
  const frac = Math.min(1, stats.present / stats.totalSessions)

  return (
    <div className="flex h-full items-center gap-5 rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      <div className="relative h-28 w-28 shrink-0">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke="#e5efe8"
            strokeWidth="10"
            className="dark:opacity-20"
          />
          <circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - frac)}
            style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.22,1,.36,1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black tabular-nums text-gray-900 dark:text-white">
            {pct}%
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
            present
          </span>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Attendance
        </p>
        <p className="mt-0.5 text-sm font-bold" style={{ color }}>
          {bandLabel(pct)}
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-bold text-gray-900 dark:text-white">{stats.present}</span> of{' '}
          {stats.totalSessions} classes attended
        </p>
        {(stats.late > 0 || stats.absent > 0) && (
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            {stats.late > 0 && `${stats.late} late`}
            {stats.late > 0 && stats.absent > 0 && ' · '}
            {stats.absent > 0 && `${stats.absent} absent`}
          </p>
        )}
      </div>
    </div>
  )
}
