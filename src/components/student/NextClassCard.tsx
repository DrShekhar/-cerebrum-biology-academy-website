'use client'

/**
 * P1 dashboard widget — the student's next live class. Real data only from
 * /api/student/sessions?type=upcoming. Emerald #17924f accent to match the
 * DashboardHero. Shows a Join button when the class is live/soon (meetingLink),
 * otherwise a "starts in" countdown. New students (no upcoming class) get a
 * tidy empty state instead of a blank card.
 */

import { useEffect, useState } from 'react'
import { CalendarClock, Video, User, ArrowUpRight } from 'lucide-react'

const EMERALD = '#17924f'

interface UpcomingSession {
  id: string
  title: string
  description?: string | null
  startTime: string
  endTime?: string | null
  status?: string | null
  meetingLink?: string | null
  teacher?: { name?: string | null } | null
  course?: { name?: string | null } | null
}

function formatWhen(start: Date): string {
  const now = new Date()
  const time = start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
  const startDay = new Date(start)
  startDay.setHours(0, 0, 0, 0)
  const today = new Date(now)
  today.setHours(0, 0, 0, 0)
  const dayDiff = Math.round((startDay.getTime() - today.getTime()) / 86400000)
  if (dayDiff === 0) return `Today ${time}`
  if (dayDiff === 1) return `Tomorrow ${time}`
  const weekday = start.toLocaleDateString('en-US', { weekday: 'short' })
  if (dayDiff > 1 && dayDiff < 7) return `${weekday} ${time}`
  const date = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return `${weekday}, ${date} · ${time}`
}

/** Human "starts in" label from a positive minute delta. */
function startsIn(minutes: number): string {
  if (minutes < 1) return 'Starting now'
  if (minutes < 60) return `Starts in ${minutes}m`
  const hrs = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hrs < 24) return mins ? `Starts in ${hrs}h ${mins}m` : `Starts in ${hrs}h`
  const days = Math.floor(hrs / 24)
  return `Starts in ${days}d`
}

export function NextClassCard() {
  const [session, setSession] = useState<UpcomingSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch('/api/student/sessions?type=upcoming')
        if (!res.ok) throw new Error('not ok')
        const json = await res.json()
        const list: UpcomingSession[] = json?.data?.upcoming ?? json?.data?.sessions ?? []
        const soonest = [...list].sort(
          (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        )[0]
        if (!cancelled) setSession(soonest ?? null)
      } catch {
        if (!cancelled) setSession(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    const timer = setInterval(() => setNow(Date.now()), 30000)
    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-4 h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mb-2 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex h-full flex-col justify-center rounded-3xl border border-dashed border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-900">
        <CalendarClock className="mx-auto mb-2 h-7 w-7 text-gray-300 dark:text-gray-600" />
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          No classes scheduled
        </p>
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          Your next live class will appear here.
        </p>
      </div>
    )
  }

  const start = new Date(session.startTime)
  const end = session.endTime ? new Date(session.endTime) : null
  const minsUntil = Math.round((start.getTime() - now) / 60000)
  const isOngoing = session.status === 'ONGOING'
  const inWindow = now >= start.getTime() && (!end || now <= end.getTime())
  // "Live/soon" = ongoing, currently inside the class window, or starting within 15 min.
  const joinable = isOngoing || inWindow || (minsUntil <= 15 && minsUntil >= -1)
  const live = isOngoing || inWindow

  return (
    <div className="flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Next class
        </span>
        {live ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600 dark:bg-red-500/10 dark:text-red-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" /> Live
          </span>
        ) : (
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold"
            style={{ background: '#f0f9f3', color: EMERALD }}
          >
            <CalendarClock className="h-3.5 w-3.5" /> {startsIn(minsUntil)}
          </span>
        )}
      </div>

      <div className="mt-3 flex-1">
        <p className="text-lg font-bold leading-snug text-gray-900 dark:text-white">
          {session.title || 'Class session'}
        </p>
        <div className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400">
          <p className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 shrink-0" style={{ color: EMERALD }} />
            {formatWhen(start)}
          </p>
          {session.teacher?.name && (
            <p className="flex items-center gap-2">
              <User className="h-4 w-4 shrink-0" style={{ color: EMERALD }} />
              {session.teacher.name}
            </p>
          )}
          {session.course?.name && (
            <p
              className="truncate text-xs text-gray-400 dark:text-gray-500"
              title={session.course.name}
            >
              {session.course.name}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        {joinable && session.meetingLink ? (
          <a
            href={session.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-transform active:scale-[0.98]"
            style={{ background: EMERALD }}
          >
            <Video className="h-4 w-4" /> Join class
          </a>
        ) : session.meetingLink ? (
          <a
            href={session.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:border-gray-300 dark:border-gray-700 dark:text-gray-300"
          >
            View meeting link <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          <p className="text-center text-xs text-gray-400 dark:text-gray-500">
            Join link will be shared before class
          </p>
        )}
      </div>
    </div>
  )
}
