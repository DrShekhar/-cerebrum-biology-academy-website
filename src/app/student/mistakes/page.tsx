'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import {
  ArrowLeft,
  ArrowRight,
  BookX,
  CheckCircle2,
  ChevronDown,
  Info,
  Loader2,
  RotateCcw,
  Target,
} from 'lucide-react'

interface MistakeOption {
  id: string
  text: string
}

interface Mistake {
  questionId: string
  question: string
  options: MistakeOption[]
  chosenAnswer: string
  correctAnswer: string
  explanation: string
  topic: string
  chapter: string | null
  ncertClass: number | null
  date: string
  testTitle: string
  timesWrong: number
}

interface TopicCount {
  topic: string
  count: number
}

// v1 mastered-state lives client-side (no fitting per-user question table for
// authed students — question_review_schedule is keyed to free_users only).
const MASTERED_KEY = 'cbaMasteredMistakes'

function loadMastered(): string[] {
  try {
    const raw = localStorage.getItem(MASTERED_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : []
  } catch {
    return []
  }
}

function saveMastered(ids: string[]) {
  try {
    localStorage.setItem(MASTERED_KEY, JSON.stringify(ids))
  } catch {
    // Non-critical
  }
}

export default function StudentMistakesPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()

  const [mistakes, setMistakes] = useState<Mistake[] | null>(null)
  const [topics, setTopics] = useState<TopicCount[]>([])
  const [note, setNote] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [activeTopic, setActiveTopic] = useState<string>('all')
  const [mastered, setMastered] = useState<string[]>([])
  const [showMastered, setShowMastered] = useState(false)
  const [ncertClass, setNcertClass] = useState<11 | 12 | null>(null)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/sign-in')
    }
  }, [authLoading, isAuthenticated, router])

  useEffect(() => {
    setMastered(loadMastered())
  }, [])

  const load = useCallback(async () => {
    setError(null)
    try {
      const res = await fetch('/api/student/mistakes', { credentials: 'include' })
      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.error || 'Could not load your mistakes.')
        return
      }
      setMistakes(json.mistakes || [])
      setTopics(json.topics || [])
      setNote(json.note || '')
    } catch {
      setError('Network error. Please try again.')
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) load()
  }, [isAuthenticated, load])

  // Grade-aware practice deep-link (same pattern as PracticeTab)
  useEffect(() => {
    if (!isAuthenticated) return
    fetch('/api/student/summary', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.success && (d.student?.ncertClass === 11 || d.student?.ncertClass === 12)) {
          setNcertClass(d.student.ncertClass)
        }
      })
      .catch(() => {})
  }, [isAuthenticated])

  const toggleMastered = (questionId: string) => {
    setMastered((prev) => {
      const next = prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
      saveMastered(next)
      return next
    })
  }

  const practiceHref = ncertClass
    ? `/neet-biology-mcq?ncertClass=${ncertClass}`
    : '/neet-biology-mcq'

  const filtered = useMemo(() => {
    const all = mistakes || []
    return activeTopic === 'all' ? all : all.filter((m) => m.topic === activeTopic)
  }, [mistakes, activeTopic])

  const open = filtered.filter((m) => !mastered.includes(m.questionId))
  const masteredList = filtered.filter((m) => mastered.includes(m.questionId))

  if (authLoading || (!mistakes && !error)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-500">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading your Mistake Notebook…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <Link
          href="/dashboard"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <BookX className="h-6 w-6 text-red-500" /> Mistake Notebook
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Every question you got wrong in mock tests, in one place — review until mastered.
            </p>
          </div>
          <Link
            href={practiceHref}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <Target className="h-4 w-4" /> Practice these topics
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {note && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>{note}</span>
          </div>
        )}

        {error ? (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            {error}
            <button onClick={load} className="ml-3 font-semibold underline">
              Retry
            </button>
          </div>
        ) : (mistakes || []).length === 0 ? (
          <div className="mt-10 rounded-xl border border-gray-200 bg-white p-10 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-green-500" />
            <h2 className="mt-3 text-lg font-semibold text-gray-900">No mistakes recorded yet</h2>
            <p className="mx-auto mt-1 max-w-md text-sm text-gray-600">
              Take a CBT mock test and any question you get wrong will be compiled here
              automatically for revision.
            </p>
            <Link
              href="/cbt"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Take a mock test <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Topic filter chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTopic('all')}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                  activeTopic === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All ({(mistakes || []).length})
              </button>
              {topics.map((t) => (
                <button
                  key={t.topic}
                  onClick={() => setActiveTopic(t.topic)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                    activeTopic === t.topic
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t.topic} ({t.count})
                </button>
              ))}
            </div>

            {/* Open mistakes */}
            <div className="mt-5 space-y-4">
              {open.length === 0 && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center text-sm text-green-800">
                  All mistakes in this topic are marked as mastered. Well done!
                </div>
              )}
              {open.map((m) => (
                <MistakeCard
                  key={m.questionId}
                  mistake={m}
                  mastered={false}
                  onToggle={toggleMastered}
                />
              ))}
            </div>

            {/* Mastered section */}
            {masteredList.length > 0 && (
              <div className="mt-8">
                <button
                  onClick={() => setShowMastered((s) => !s)}
                  className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" /> Mastered (
                    {masteredList.length})
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${showMastered ? 'rotate-180' : ''}`}
                  />
                </button>
                {showMastered && (
                  <div className="mt-3 space-y-4">
                    {masteredList.map((m) => (
                      <MistakeCard
                        key={m.questionId}
                        mistake={m}
                        mastered
                        onToggle={toggleMastered}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function MistakeCard({
  mistake: m,
  mastered,
  onToggle,
}: {
  mistake: Mistake
  mastered: boolean
  onToggle: (questionId: string) => void
}) {
  return (
    <div
      className={`rounded-xl border bg-white p-4 sm:p-5 ${
        mastered ? 'border-green-200 opacity-75' : 'border-gray-200'
      }`}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-blue-50 px-2 py-0.5 font-medium text-blue-700">
          {m.topic}
        </span>
        {m.chapter && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">{m.chapter}</span>
        )}
        {m.timesWrong > 1 && (
          <span className="rounded-full bg-red-100 px-2 py-0.5 font-semibold text-red-700">
            Wrong {m.timesWrong}×
          </span>
        )}
        <span className="ml-auto text-gray-400">
          {m.testTitle} · {new Date(m.date).toLocaleDateString('en-IN')}
        </span>
      </div>

      <p className="text-sm text-gray-900">{m.question}</p>

      <div className="mt-3 space-y-1.5">
        {m.options.map((opt) => {
          const isCorrect = opt.id === m.correctAnswer
          const isYours = opt.id === m.chosenAnswer
          return (
            <div
              key={opt.id}
              className={`rounded-md border px-3 py-2 text-sm ${
                isCorrect
                  ? 'border-green-500 bg-green-50 text-green-900'
                  : isYours
                    ? 'border-red-400 bg-red-50 text-red-900'
                    : 'border-gray-200 text-gray-700'
              }`}
            >
              <span className="font-medium">{opt.id}.</span> {opt.text}
              {isCorrect && <span className="ml-2 text-xs font-semibold">✓ correct</span>}
              {isYours && !isCorrect && (
                <span className="ml-2 text-xs font-semibold">your answer</span>
              )}
            </div>
          )
        })}
      </div>

      {m.explanation && (
        <details className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
          <summary className="cursor-pointer font-semibold text-gray-900">Explanation</summary>
          <p className="mt-2">{m.explanation}</p>
        </details>
      )}

      <div className="mt-3 flex justify-end">
        <button
          onClick={() => onToggle(m.questionId)}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            mastered
              ? 'border border-gray-300 text-gray-600 hover:bg-gray-100'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {mastered ? (
            <>
              <RotateCcw className="h-3.5 w-3.5" /> Move back to review
            </>
          ) : (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" /> Mark as mastered
            </>
          )}
        </button>
      </div>
    </div>
  )
}
