'use client'

/**
 * LecturePlayerClient — the missing surface that renders the (already-built)
 * SecureVideoPlayer for a course video lecture.
 *
 * Flow: GET /api/lms/videos?videoId=<lectureId> → signed Cloudflare HLS URL +
 * title/duration/chapters/saved-progress → render SecureVideoPlayer → throttled
 * onProgress POSTs back to /api/lms/videos so video_progress persists.
 *
 * Additive: new route; nothing existing modified. The player, API and models
 * already existed and were simply never wired to a page.
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Loader2, AlertTriangle, ArrowLeft } from 'lucide-react'
import SecureVideoPlayer from '@/components/lms/SecureVideoPlayer'
import { useAuth } from '@/contexts/AuthContext'

interface PlaybackData {
  success: boolean
  title?: string
  videoUrl?: string
  thumbnail?: string
  duration?: number
  chapters?: Array<{ title: string; startTime: number }>
  progress?: { lastPosition: number; completionPercent: number }
  error?: string
}

export default function LecturePlayerClient({ lectureId }: { lectureId: string }) {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [data, setData] = useState<PlaybackData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Throttle progress writes to ~once per 10s.
  const lastSavedRef = useRef(0)

  useEffect(() => {
    if (authLoading) return
    if (!isAuthenticated) {
      setError('auth')
      setLoading(false)
      return
    }
    let cancelled = false
    fetch(`/api/lms/videos?videoId=${encodeURIComponent(lectureId)}`)
      .then((r) => r.json())
      .then((json: PlaybackData) => {
        if (cancelled) return
        if (!json.success) {
          setError(json.error || 'Could not load this lecture.')
        } else {
          setData(json)
        }
        setLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setError('Could not load this lecture. Please try again.')
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [lectureId, isAuthenticated, authLoading])

  function saveProgress(position: number, watchedSeconds: number, isCompleted = false) {
    const now = Date.now()
    if (!isCompleted && now - lastSavedRef.current < 10_000) return
    lastSavedRef.current = now
    void fetch('/api/lms/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        videoId: lectureId,
        currentPosition: Math.round(position),
        watchedSeconds: Math.round(watchedSeconds),
        isCompleted,
      }),
    }).catch(() => {
      /* progress save is best-effort */
    })
  }

  if (loading || authLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (error === 'auth') {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-amber-500" />
        <h1 className="mt-4 text-xl font-bold text-slate-900">Sign in to watch this lecture</h1>
        <p className="mt-2 text-sm text-slate-600">This course video is available to enrolled students.</p>
        <Link
          href="/sign-in"
          className="mt-5 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Sign in
        </Link>
      </div>
    )
  }

  if (error || !data?.videoUrl) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-amber-500" />
        <h1 className="mt-4 text-xl font-bold text-slate-900">Lecture unavailable</h1>
        <p className="mt-2 text-sm text-slate-600">
          {error || 'This lecture could not be loaded.'}
        </p>
        <Link
          href="/student/courses"
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to my courses
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <Link
        href="/student/courses"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-blue-700"
      >
        <ArrowLeft className="h-4 w-4" /> My courses
      </Link>
      <SecureVideoPlayer
        videoId={lectureId}
        videoUrl={data.videoUrl}
        title={data.title || 'Lecture'}
        thumbnail={data.thumbnail}
        duration={data.duration || 0}
        chapters={data.chapters}
        initialProgress={data.progress}
        userId={user?.id || ''}
        userName={user?.name || 'Student'}
        onProgress={(position, watched) => saveProgress(position, watched, false)}
        onComplete={() => saveProgress(data.duration || 0, data.duration || 0, true)}
      />
    </div>
  )
}
