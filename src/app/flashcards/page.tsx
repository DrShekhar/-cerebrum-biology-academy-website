'use client'

/**
 * Flashcards — spaced-repetition revision on top of the existing SM-2 engine.
 *
 * Pulls the due-review queue from /api/mcq/review (SM-2 scheduled + new cards),
 * shows each as a flip card (front: question, back: answer + explanation), and
 * records the self-grade via POST /api/mcq/review so the SM-2 scheduler sets
 * the next review date. Identity: the SERVER-created free_users id that the MCQ
 * practice pages store under localStorage `mcq_free_user_id` — the deck and the
 * FK on grade writes are keyed to it. No id yet = practise first.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { Loader2, RotateCw, Check, X, Layers, Trophy, CalendarClock, Sparkles } from 'lucide-react'

interface FlashQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
  topic: string
  difficulty: string
  ncertChapterName?: string
}

interface ReviewStats {
  totalScheduled: number
  totalDue: number
  masteredCount: number
  reviewCount: number
  newCount: number
}

function getFreeUserId(): string | null {
  return localStorage.getItem('mcq_free_user_id')
}

function letterOf(options: string[], correctAnswer: string): string {
  // correctAnswer may already be a letter, or the full option text.
  const raw = (correctAnswer || '').trim()
  if (/^[A-D]$/i.test(raw)) return raw.toUpperCase()
  const idx = options.findIndex((o) => o.trim().toLowerCase() === raw.toLowerCase())
  return idx >= 0 ? String.fromCharCode(65 + idx) : raw
}

export default function FlashcardsPage() {
  const [cards, setCards] = useState<FlashQuestion[]>([])
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [noIdentity, setNoIdentity] = useState(false)
  const [sessionCorrect, setSessionCorrect] = useState(0)
  const [sessionTotal, setSessionTotal] = useState(0)
  const shownAtRef = useRef<number>(Date.now())
  const freeUserIdRef = useRef<string>('')

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    setDone(false)
    setIndex(0)
    setFlipped(false)
    setSessionCorrect(0)
    setSessionTotal(0)
    try {
      const id = getFreeUserId()
      if (!id) {
        setNoIdentity(true)
        return
      }
      setNoIdentity(false)
      freeUserIdRef.current = id
      const res = await fetch(
        `/api/mcq/review?freeUserId=${encodeURIComponent(id)}&includeNew=true`
      )
      const data = await res.json()
      if (!res.ok || !data.success) {
        setError(data.error || 'Could not load your revision queue.')
        return
      }
      setCards(data.data.questions || [])
      setStats(data.data.stats || null)
      shownAtRef.current = Date.now()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const current = cards[index]

  const grade = async (isCorrect: boolean) => {
    if (!current) return
    const timeSpent = Math.max(1, Math.round((Date.now() - shownAtRef.current) / 1000))
    setSessionTotal((n) => n + 1)
    if (isCorrect) setSessionCorrect((n) => n + 1)

    // Record the review (fire-and-forget — never block the flow).
    void fetch('/api/mcq/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        freeUserId: freeUserIdRef.current,
        questionId: current.id,
        isCorrect,
        timeSpent,
        avgTimeForQuestion: 45,
      }),
    }).catch(() => {})

    if (index + 1 >= cards.length) {
      setDone(true)
    } else {
      setIndex(index + 1)
      setFlipped(false)
      shownAtRef.current = Date.now()
    }
  }

  // ── Loading / error / empty ────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-500">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Preparing your revision deck…
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <h1 className="text-xl font-bold text-gray-900">Flashcards unavailable</h1>
        <p className="mt-2 text-gray-600">{error}</p>
        <button
          onClick={load}
          className="mt-4 rounded-lg bg-green-700 px-5 py-2 text-sm font-semibold text-white hover:bg-green-800"
        >
          Try again
        </button>
      </div>
    )
  }

  if (noIdentity) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <Layers className="mx-auto h-12 w-12 text-green-600" />
        <h1 className="mt-3 text-2xl font-bold text-gray-900">Build your deck first</h1>
        <p className="mt-2 text-gray-600">
          Flashcards are made from the MCQs you practise — every question you attempt gets scheduled
          for smart revision. Start practising and your deck appears here.
        </p>
        <Link
          href="/neet-biology-mcq"
          className="mt-6 inline-block rounded-lg bg-green-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
        >
          Practise MCQs
        </Link>
      </div>
    )
  }

  if (done || cards.length === 0) {
    const accuracy = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : null
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <Trophy className="mx-auto h-12 w-12 text-yellow-500" />
        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          {sessionTotal > 0 ? 'Session complete!' : 'All caught up!'}
        </h1>
        {sessionTotal > 0 ? (
          <p className="mt-2 text-gray-600">
            You reviewed {sessionTotal} card{sessionTotal === 1 ? '' : 's'} — {sessionCorrect}{' '}
            correct{accuracy !== null ? ` (${accuracy}%)` : ''}. The scheduler will bring the hard
            ones back sooner.
          </p>
        ) : (
          <p className="mt-2 text-gray-600">
            Nothing is due for revision right now. Practise more MCQs to grow your deck — every
            question you attempt gets scheduled for smart revision.
          </p>
        )}
        {stats && (
          <p className="mt-3 text-xs text-gray-500">
            {stats.masteredCount} mastered · {stats.totalScheduled} scheduled in your deck
          </p>
        )}
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/neet-biology-mcq"
            className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Practise MCQs
          </Link>
          <button
            onClick={load}
            className="rounded-lg bg-green-700 px-5 py-2 text-sm font-semibold text-white hover:bg-green-800"
          >
            Check again
          </button>
        </div>
      </div>
    )
  }

  // ── Card ───────────────────────────────────────────────────────────────────
  const correctLetter = letterOf(current.options, current.correctAnswer)

  return (
    <div className="mx-auto max-w-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-6 w-6 text-green-600" />
          <h1 className="text-xl font-bold text-gray-900">Flashcards</h1>
        </div>
        {stats && (
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <CalendarClock className="h-3.5 w-3.5" /> {stats.reviewCount} due
            </span>
            <span className="inline-flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> {stats.newCount} new
            </span>
            <span className="inline-flex items-center gap-1">
              <Trophy className="h-3.5 w-3.5" /> {stats.masteredCount} mastered
            </span>
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-green-600 transition-all"
            style={{ width: `${(index / cards.length) * 100}%` }}
          />
        </div>
        <div className="mt-1 text-right text-xs text-gray-400">
          {index + 1} / {cards.length}
        </div>
      </div>

      {/* Card */}
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-green-50 px-2 py-0.5 font-medium text-green-700">
            {current.topic}
          </span>
          {current.ncertChapterName && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
              NCERT · {current.ncertChapterName}
            </span>
          )}
          <span className="rounded-full bg-gray-100 px-2 py-0.5 capitalize text-gray-600">
            {String(current.difficulty).toLowerCase()}
          </span>
        </div>

        <p className="text-base font-medium text-gray-900">{current.question}</p>

        <div className="mt-4 space-y-2">
          {current.options.map((opt, i) => {
            const l = String.fromCharCode(65 + i)
            const highlight = flipped && l === correctLetter
            return (
              <div
                key={i}
                className={`rounded-lg border px-3 py-2 text-sm ${
                  highlight
                    ? 'border-green-500 bg-green-50 font-medium text-green-900'
                    : 'border-gray-200 text-gray-700'
                }`}
              >
                <span className="mr-1.5 font-semibold text-gray-500">{l}.</span>
                {opt}
                {highlight && <span className="ml-2 text-xs font-semibold">✓ answer</span>}
              </div>
            )
          })}
        </div>

        {flipped && current.explanation && (
          <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
            <span className="font-semibold text-gray-900">Why: </span>
            {current.explanation}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-4">
        {!flipped ? (
          <button
            onClick={() => setFlipped(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white hover:bg-green-800"
          >
            <RotateCw className="h-4 w-4" /> Show answer
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => grade(false)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-300 bg-red-50 px-6 py-3 text-sm font-semibold text-red-700 hover:bg-red-100"
            >
              <X className="h-4 w-4" /> Missed it
            </button>
            <button
              onClick={() => grade(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white hover:bg-green-800"
            >
              <Check className="h-4 w-4" /> Got it
            </button>
          </div>
        )}
        <p className="mt-2 text-center text-xs text-gray-400">
          Honest self-grading makes the scheduler smarter — missed cards come back sooner.
        </p>
      </div>
    </div>
  )
}
