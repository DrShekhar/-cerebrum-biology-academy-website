'use client'

/**
 * Teacher video lectures list — the discoverable entry point to the
 * interactive-video checkpoint editor (previously reachable only by URL).
 */

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2, Video, Sparkles, Search, Clock } from 'lucide-react'

interface LectureRow {
  id: string
  title: string
  duration: number
  uploadStatus: string
  courseName: string | null
  chapterTitle: string | null
  checkpointCount: number
}

function fmtDuration(s: number): string {
  if (!s) return '—'
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${String(sec).padStart(2, '0')}`
}

export default function TeacherVideosPage() {
  const [lectures, setLectures] = useState<LectureRow[]>([])
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [search, setSearch] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setFailed(false)
    try {
      const params = new URLSearchParams()
      if (search.trim()) params.set('search', search.trim())
      const res = await fetch(`/api/teacher/videos?${params.toString()}`)
      const json = await res.json()
      if (res.ok && json.success) setLectures(json.data)
      else setFailed(true)
    } catch {
      setFailed(true)
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    const t = setTimeout(load, 250)
    return () => clearTimeout(t)
  }, [load])

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Video Lectures</h1>
        <p className="mt-1 text-sm text-gray-600">
          Add in-video quiz checkpoints to a lecture — students get a pause-and-answer moment while
          watching.
        </p>
      </div>

      <div className="mb-5 flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2">
        <Search className="h-4 w-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search lectures by title"
          className="w-full text-sm outline-none"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading lectures…
        </div>
      ) : failed ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-red-700">Couldn&apos;t load your video lectures.</p>
          <button
            onClick={load}
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      ) : lectures.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-gray-500">
          <Video className="mx-auto mb-3 h-10 w-10 text-gray-400" />
          No video lectures yet. Upload videos to a course in the course builder, then add
          checkpoints here.
        </div>
      ) : (
        <div className="space-y-3">
          {lectures.map((l) => (
            <div
              key={l.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4"
            >
              <div className="min-w-0">
                <p className="font-semibold text-gray-900">{l.title}</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  {[l.courseName, l.chapterTitle].filter(Boolean).join(' · ') || 'Unlinked'}
                  {' · '}
                  <Clock className="mb-0.5 inline h-3 w-3" /> {fmtDuration(l.duration)}
                  {' · '}
                  {l.checkpointCount} checkpoint{l.checkpointCount === 1 ? '' : 's'}
                </p>
              </div>
              <Link
                href={`/teacher/videos/${l.id}/checkpoints`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                <Sparkles className="h-4 w-4" /> Manage checkpoints
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
