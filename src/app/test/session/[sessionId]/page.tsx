'use client'

/**
 * DB-backed CBT session player — the missing consumer of the real test
 * engine (/api/test/[id] + /answer + /submit). Quiz-as-lesson "Start test"
 * and any /api/test/create session lands here. The legacy /test/[testId]
 * page renders only the static simpleTests catalog and knows nothing about
 * DB sessions.
 */

import { use, useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, ChevronLeft, ChevronRight, Clock, CheckCircle2, XCircle } from 'lucide-react'
import { showToast } from '@/lib/toast'

interface SessionQuestion {
  index: number
  id: string
  question: string
  options: string[] | null
  marks: number
  questionImage?: string | null
  userResponse: { selectedAnswer: string; isCorrect?: boolean | null } | null
  correctAnswer?: string
  explanation?: string | null
}

interface SessionData {
  testSession: {
    id: string
    status: string
    remainingTime: number
    totalScore: number | null
    percentage: number | null
  }
  testTemplate: { title: string; totalQuestions: number; totalMarks: number } | null
  questions: SessionQuestion[]
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'] as const

export default function TestSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>
}) {
  const { sessionId } = use(params)
  const router = useRouter()
  const [data, setData] = useState<SessionData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [current, setCurrent] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/test/${sessionId}`)
      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.error || 'Could not load the test')
        return
      }
      setData(json.data)
      if (json.data.testSession.status !== 'COMPLETED') {
        setSecondsLeft(json.data.testSession.remainingTime ?? null)
      }
    } catch {
      setError('Network error — please refresh')
    }
  }, [sessionId])

  useEffect(() => {
    load()
  }, [load])

  const submitTest = useCallback(
    async (force: boolean) => {
      if (submitting) return
      setSubmitting(true)
      try {
        const res = await fetch(`/api/test/${sessionId}/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ forceSubmit: force }),
        })
        const json = await res.json()
        if (!res.ok || json.success === false) {
          showToast.error(json.error || 'Submit failed')
          return
        }
        showToast.success('Test submitted')
        await load() // COMPLETED view includes answers + explanations
      } finally {
        setSubmitting(false)
      }
    },
    [sessionId, submitting, load]
  )

  // Countdown → auto-submit at zero.
  useEffect(() => {
    if (secondsLeft === null || data?.testSession.status === 'COMPLETED') return
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s === null) return s
        if (s <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          void submitTest(true)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft === null, data?.testSession.status])

  const answer = async (q: SessionQuestion, letter: string) => {
    // Optimistic local mark
    setData((d) =>
      d
        ? {
            ...d,
            questions: d.questions.map((x) =>
              x.id === q.id ? { ...x, userResponse: { selectedAnswer: letter } } : x
            ),
          }
        : d
    )
    try {
      const res = await fetch(`/api/test/${sessionId}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: q.id, selectedAnswer: letter }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        showToast.error(json.error || 'Could not save answer')
      }
    } catch {
      showToast.error('Network error saving answer')
    }
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <XCircle className="mx-auto h-10 w-10 text-red-500" />
        <h1 className="mt-4 text-xl font-bold text-gray-900">Test unavailable</h1>
        <p className="mt-2 text-sm text-gray-600">{error}</p>
        <button
          onClick={() => router.back()}
          className="mt-5 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white"
        >
          Go back
        </button>
      </div>
    )
  }
  if (!data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  const done = data.testSession.status === 'COMPLETED'
  const questions = data.questions
  const q = questions[current]
  const answered = questions.filter((x) => x.userResponse).length
  const mins = secondsLeft !== null ? Math.floor(secondsLeft / 60) : null

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-gray-900">
            {data.testTemplate?.title || 'Test'}
          </h1>
          <p className="text-xs text-gray-500">
            {answered}/{questions.length} answered
            {done && data.testSession.percentage != null
              ? ` · Score ${data.testSession.totalScore}/${data.testTemplate?.totalMarks} (${Math.round(Number(data.testSession.percentage))}%)`
              : ''}
          </p>
        </div>
        {!done && mins !== null && (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${
              secondsLeft! < 120 ? 'bg-red-100 text-red-700' : 'bg-blue-50 text-blue-700'
            }`}
          >
            <Clock className="h-4 w-4" /> {mins}:{String(secondsLeft! % 60).padStart(2, '0')}
          </span>
        )}
        {done && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700">
            <CheckCircle2 className="h-4 w-4" /> Completed
          </span>
        )}
      </div>

      {/* Question palette */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {questions.map((x, i) => (
          <button
            key={x.id}
            onClick={() => setCurrent(i)}
            className={`h-8 w-8 rounded-md text-xs font-semibold ${
              i === current
                ? 'bg-blue-600 text-white'
                : done && x.userResponse
                  ? x.userResponse.isCorrect || x.userResponse.selectedAnswer === x.correctAnswer
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                  : x.userResponse
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-500'
            }`}
            aria-label={`Question ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {q && (
        <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-900 whitespace-pre-wrap">
            <span className="mr-2 text-gray-400">Q{current + 1}.</span>
            {q.question}
          </p>
          <div className="mt-4 space-y-2">
            {(Array.isArray(q.options) ? q.options : []).map((opt, oi) => {
              const letter = LETTERS[oi]
              const selected = q.userResponse?.selectedAnswer === letter
              const isCorrect = done && q.correctAnswer === letter
              const isWrongPick = done && selected && q.correctAnswer !== letter
              return (
                <button
                  key={oi}
                  disabled={done}
                  onClick={() => answer(q, letter)}
                  className={`block w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    isCorrect
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : isWrongPick
                        ? 'border-red-400 bg-red-50 text-red-900'
                        : selected
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/40'
                  }`}
                >
                  <span className="mr-2 font-semibold">{letter}.</span>
                  {opt}
                </button>
              )
            })}
          </div>
          {done && q.explanation && (
            <div className="mt-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-900">
              <span className="font-semibold">Why: </span>
              {q.explanation}
            </div>
          )}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setCurrent((i) => Math.max(0, i - 1))}
          disabled={current === 0}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>
        {current < questions.length - 1 ? (
          <button
            onClick={() => setCurrent((i) => Math.min(questions.length - 1, i + 1))}
            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        ) : done ? (
          <button
            onClick={() => router.push('/student/courses')}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white"
          >
            Back to my courses
          </button>
        ) : (
          <button
            onClick={() => {
              if (
                answered === questions.length ||
                confirm(`${questions.length - answered} unanswered — submit anyway?`)
              ) {
                void submitTest(true)
              }
            }}
            disabled={submitting}
            className="rounded-lg bg-green-600 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {submitting ? 'Submitting…' : 'Submit test'}
          </button>
        )}
      </div>
    </div>
  )
}
