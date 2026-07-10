'use client'

/**
 * P1 dashboard widget — "Your library" horizontal rail of recent learning
 * resources: recorded classes (class_sessions with recordingUrl) + recent study
 * materials. Real data only from /api/student/sessions (past) and
 * /api/student/materials. Recordings link to /learn/[videoLectureId] when the
 * Zoom recording has been processed, else the raw recordingUrl; materials link
 * to their file (or the materials library when tier-locked). Empty state for
 * new students. Emerald #17924f accent to match the DashboardHero.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PlayCircle, FileText, Library, ArrowRight } from 'lucide-react'

const EMERALD = '#17924f'

interface LibraryItem {
  id: string
  title: string
  kind: 'recording' | 'material'
  meta?: string | null
  href: string
  external: boolean
  date: number
}

interface PastSession {
  id: string
  title: string
  recordingUrl?: string | null
  videoLectureId?: string | null
  startTime?: string | null
  course?: { name?: string | null } | null
}

interface Material {
  id: string
  title: string
  materialType?: string | null
  fileUrl?: string | null
  publishedAt?: string | null
  createdAt?: string | null
  course?: { name?: string | null } | null
}

export function LibraryStrip() {
  const [items, setItems] = useState<LibraryItem[] | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const collected: LibraryItem[] = []

      // Recorded classes
      try {
        const res = await fetch('/api/student/sessions?type=past')
        if (res.ok) {
          const json = await res.json()
          const sessions: PastSession[] = json?.data?.sessions ?? []
          for (const s of sessions) {
            if (!s.recordingUrl && !s.videoLectureId) continue
            collected.push({
              id: `rec_${s.id}`,
              title: s.title || 'Recorded class',
              kind: 'recording',
              meta: s.course?.name ?? null,
              href: s.videoLectureId ? `/learn/${s.videoLectureId}` : (s.recordingUrl as string),
              external: !s.videoLectureId,
              date: s.startTime ? new Date(s.startTime).getTime() : 0,
            })
          }
        }
      } catch {
        /* degrade gracefully */
      }

      // Recent study materials
      try {
        const res = await fetch('/api/student/materials?limit=12')
        if (res.ok) {
          const json = await res.json()
          const materials: Material[] = json?.materials ?? []
          for (const m of materials) {
            collected.push({
              id: `mat_${m.id}`,
              title: m.title || 'Study material',
              kind: 'material',
              meta: m.materialType ?? m.course?.name ?? null,
              href: m.fileUrl || '/student/materials',
              external: Boolean(m.fileUrl),
              date: m.publishedAt
                ? new Date(m.publishedAt).getTime()
                : m.createdAt
                  ? new Date(m.createdAt).getTime()
                  : 0,
            })
          }
        }
      } catch {
        /* degrade gracefully */
      }

      collected.sort((a, b) => b.date - a.date)
      if (!cancelled) setItems(collected.slice(0, 12))
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your library</h2>
        <Link
          href="/student/materials"
          className="text-sm font-semibold hover:underline"
          style={{ color: EMERALD }}
        >
          Browse all →
        </Link>
      </div>

      {items === null ? (
        <div className="flex gap-3 overflow-hidden">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 w-56 shrink-0 animate-pulse rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-900">
          <Library className="mb-2 h-7 w-7 text-gray-300 dark:text-gray-600" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Your library is empty
          </p>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            Recorded classes and study materials will collect here.
          </p>
        </div>
      ) : (
        <div className="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2">
          {items.map((item) => (
            <LibraryCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  )
}

function LibraryCard({ item }: { item: LibraryItem }) {
  const isRecording = item.kind === 'recording'
  const body = (
    <>
      <div className="flex items-start justify-between">
        <span
          className="grid h-9 w-9 place-items-center rounded-xl"
          style={{
            background: isRecording ? '#f0f9f3' : '#fef3c7',
            color: isRecording ? EMERALD : '#b45309',
          }}
        >
          {isRecording ? <PlayCircle className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
        </span>
        <ArrowRight className="h-4 w-4 text-gray-300 transition-colors group-hover:text-gray-500 dark:text-gray-600" />
      </div>
      <div className="mt-3">
        <p className="line-clamp-2 text-sm font-bold text-gray-900 dark:text-white">{item.title}</p>
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          {isRecording ? 'Recorded class' : 'Study material'}
          {item.meta ? ` · ${item.meta}` : ''}
        </p>
      </div>
    </>
  )

  const className =
    'group flex h-32 w-56 shrink-0 snap-start flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900'

  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {body}
    </Link>
  )
}
