'use client'

/**
 * LecturePlayerClient — renders SecureVideoPlayer for a course video lecture,
 * now with interactive-video quiz checkpoints.
 *
 * Flow: GET /api/lms/videos?videoId=<lectureId> → signed Cloudflare HLS URL +
 * chapters + checkpoints + saved progress → render SecureVideoPlayer →
 * throttled onProgress POSTs persist video_progress. When playback crosses a
 * checkpoint the player pauses and the quiz overlay appears; the answer is
 * validated server-side, then playback resumes.
 *
 * (Also fixes a response-shape mismatch: the API nests playback fields under
 * `video`, but this client previously read them from the top level — so the
 * player could never load.)
 *
 * YouTube fallback: when the API returns video.youtubeId (lecture has
 * metadata.youtubeId), a privacy-enhanced youtube-nocookie iframe replaces
 * the Cloudflare player. Progress/checkpoints are skipped for those.
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Loader2, AlertTriangle, ArrowLeft, Sparkles, Check, X } from 'lucide-react'
import SecureVideoPlayer from '@/components/lms/SecureVideoPlayer'
import { useAuth } from '@/contexts/AuthContext'

interface Checkpoint {
  id: string
  timeSeconds: number
  isRequired: boolean
  question: { text: string; options: { id: string; text: string }[] }
}

interface PlaybackResponse {
  success: boolean
  video?: {
    url?: string
    /** YouTube-embed lecture (demo/external): render an iframe, not the CF player. */
    youtubeId?: string
    thumbnail?: string
    duration?: number
    chapters?: Array<{ title: string; startTime: number }>
  }
  checkpoints?: Checkpoint[]
  progress?: { lastPosition: number; completionPercent: number }
  error?: string
}

export default function LecturePlayerClient({ lectureId }: { lectureId: string }) {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [data, setData] = useState<PlaybackResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Checkpoint overlay state
  const [activeCheckpoint, setActiveCheckpoint] = useState<Checkpoint | null>(null)
  const [resumeKey, setResumeKey] = useState(0)
  // Throttle progress writes to ~once per 10s.
  const lastSavedRef = useRef(0)
  // The player reports watchedSeconds CUMULATIVELY since mount; the API
  // increments server-side. Track the last cumulative value we sent and post
  // only the delta, so watchedSeconds/totalWatchTime don't balloon.
  const lastWatchedRef = useRef(0)

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
      .then((json: PlaybackResponse) => {
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
    // Send the increment since the last save, not the running total.
    const cumulative = Math.round(watchedSeconds)
    const delta = Math.max(0, cumulative - lastWatchedRef.current)
    lastWatchedRef.current = cumulative
    void fetch('/api/lms/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        videoId: lectureId,
        currentPosition: Math.round(position),
        watchedSeconds: delta,
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
        <p className="mt-2 text-sm text-slate-600">
          This course video is available to enrolled students.
        </p>
        <Link
          href="/sign-in"
          className="mt-5 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Sign in
        </Link>
      </div>
    )
  }

  if (error || !data?.video || (!data.video.url && !data.video.youtubeId)) {
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

  const checkpoints = data.checkpoints || []

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <Link
        href="/student/courses"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-blue-700"
      >
        <ArrowLeft className="h-4 w-4" /> My courses
      </Link>
      {data.video.youtubeId ? (
        // YouTube-embed lecture (demo/external fallback). Entitlements were
        // already enforced server-side by /api/lms/videos; only the player
        // surface differs. Progress tracking and quiz checkpoints are
        // intentionally skipped — the YouTube iframe isn't instrumented.
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(
              data.video.youtubeId
            )}?rel=0&modestbranding=1`}
            title="Lecture"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      ) : (
        <div className="relative">
          <SecureVideoPlayer
            videoId={lectureId}
            videoUrl={data.video.url || ''}
            title="Lecture"
            thumbnail={data.video.thumbnail}
            duration={data.video.duration || 0}
            chapters={data.video.chapters as never}
            initialProgress={data.progress as never}
            userId={user?.id || ''}
            userName={user?.name || 'Student'}
            onProgress={(position, watched) => saveProgress(position, watched, false)}
            onComplete={() =>
              saveProgress(data.video?.duration || 0, data.video?.duration || 0, true)
            }
            checkpoints={checkpoints.map((c) => ({
              id: c.id,
              timeSeconds: c.timeSeconds,
              isRequired: c.isRequired,
            }))}
            onCheckpoint={(id) => {
              const cp = checkpoints.find((c) => c.id === id)
              if (cp) setActiveCheckpoint(cp)
            }}
            resumeKey={resumeKey}
          />
          {activeCheckpoint && (
            <CheckpointOverlay
              checkpoint={activeCheckpoint}
              onDone={() => {
                setActiveCheckpoint(null)
                setResumeKey((k) => k + 1)
              }}
            />
          )}
        </div>
      )}
    </div>
  )
}

/** In-video quiz overlay: answer → server validation → explanation → continue. */
function CheckpointOverlay({ checkpoint, onDone }: { checkpoint: Checkpoint; onDone: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [result, setResult] = useState<{
    isCorrect: boolean
    correctAnswer: string
    explanation: string
  } | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const submit = async () => {
    if (!selected) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/lms/videos/checkpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkpointId: checkpoint.id, selectedAnswer: selected }),
      })
      const json = await res.json()
      if (json.success) {
        setResult({
          isCorrect: json.isCorrect,
          correctAnswer: json.correctAnswer,
          explanation: json.explanation,
        })
      } else {
        // Never trap the student on an API failure — let them continue.
        onDone()
      }
    } catch {
      onDone()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    // Full-screen sheet on phones (the video container is only ~210px tall
    // there — a quiz card can't fit inside it); in-player overlay from sm: up.
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:absolute sm:z-30">
      <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-green-700">
          <Sparkles className="h-4 w-4" /> Quick check
        </div>
        <p className="text-sm font-medium text-gray-900">{checkpoint.question.text}</p>

        <div className="mt-3 space-y-2">
          {checkpoint.question.options.map((opt) => {
            const isSel = selected === opt.id
            const isCorrect = result && opt.id === result.correctAnswer
            const isWrongPick = result && isSel && !result.isCorrect
            return (
              <button
                key={opt.id}
                disabled={!!result}
                onClick={() => setSelected(opt.id)}
                className={`block w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                  isCorrect
                    ? 'border-green-500 bg-green-50 text-green-900'
                    : isWrongPick
                      ? 'border-red-400 bg-red-50 text-red-900'
                      : isSel
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="mr-1.5 font-semibold text-gray-500">{opt.id}.</span>
                {opt.text}
              </button>
            )
          })}
        </div>

        {result ? (
          <div className="mt-4">
            <div
              className={`flex items-center gap-1.5 text-sm font-semibold ${
                result.isCorrect ? 'text-green-700' : 'text-red-600'
              }`}
            >
              {result.isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
              {result.isCorrect ? 'Correct!' : `Correct answer: ${result.correctAnswer}`}
            </div>
            {result.explanation && (
              <p className="mt-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
                {result.explanation}
              </p>
            )}
            <button
              onClick={onDone}
              className="mt-4 w-full rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
            >
              Continue watching
            </button>
          </div>
        ) : (
          <button
            onClick={submit}
            disabled={!selected || submitting}
            className="mt-4 w-full rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-50"
          >
            {submitting ? 'Checking…' : 'Check answer'}
          </button>
        )}
      </div>
    </div>
  )
}
