'use client'

/**
 * Student syllabus mastery map (P2) — every topic the student has practised,
 * grouped by subject and coloured by real accuracy from their per-question
 * answers (source: /api/student/mastery over user_question_responses). Weakest
 * topics surface first within each subject so focus areas are obvious.
 */

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Layers, RefreshCw, Target, ArrowRight } from 'lucide-react'
import { useUserFlow } from '@/hooks/useUserFlow'

const EMERALD = '#17924f'
const CORAL = '#ef4444'

type Band = 'strong' | 'developing' | 'weak' | 'untouched'

interface TopicMastery {
  subject: string
  topic: string
  attempted: number
  correct: number
  accuracy: number
  band: Band
}

interface SubjectMastery {
  subject: string
  attempted: number
  correct: number
  accuracy: number
  band: Band
  topicCount: number
}

interface MasteryData {
  subjects: SubjectMastery[]
  topics: TopicMastery[]
  totalTopics: number
  totalAttempted: number
  totalCorrect: number
}

const SUBJECT_LABELS: Record<string, string> = {
  botany: 'Botany',
  zoology: 'Zoology',
  biology: 'Biology',
  physics: 'Physics',
  chemistry: 'Chemistry',
}

function subjectLabel(subject: string) {
  return SUBJECT_LABELS[subject] ?? subject.charAt(0).toUpperCase() + subject.slice(1)
}

const BAND_STYLE: Record<Band, { label: string; color: string; border: string; bg: string }> = {
  strong: { label: 'Strong', color: EMERALD, border: '#bbe3cb', bg: '#f0f9f3' },
  developing: { label: 'Developing', color: '#b45309', border: '#fde68a', bg: '#fffbeb' },
  weak: { label: 'Needs work', color: CORAL, border: '#fecaca', bg: '#fef2f2' },
  untouched: { label: 'Untouched', color: '#9ca3af', border: '#e5e7eb', bg: '#fafafa' },
}

const BAND_RANK: Record<Band, number> = { weak: 0, developing: 1, strong: 2, untouched: 3 }

export default function SyllabusMasteryPage() {
  const { user, isAuthenticated, isLoading: authLoading, freeUserId } = useUserFlow()

  const [data, setData] = useState<MasteryData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  const identity = user?.id || freeUserId

  useEffect(() => {
    if (authLoading) return
    // Guests still resolve a freeUserId from useUserFlow; if neither exists yet
    // there is simply nothing to show.
    if (!identity) {
      setData(null)
      setIsLoading(false)
      return
    }

    let cancelled = false
    async function load() {
      try {
        setIsLoading(true)
        setError(false)
        const query = isAuthenticated ? '' : `?freeUserId=${encodeURIComponent(identity as string)}`
        const res = await fetch(`/api/student/mastery${query}`)
        const json = await res.json()
        if (cancelled) return
        if (json.success) {
          setData(json.data as MasteryData)
        } else {
          setError(true)
        }
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [identity, isAuthenticated, authLoading, reloadKey])

  // Subjects worst-first so the neediest surfaces at the top; topics within a
  // subject sorted weak-first (then by accuracy, then most-practised).
  const grouped = useMemo(() => {
    if (!data) return []
    const subjectOrder = [...data.subjects].sort((a, b) => a.accuracy - b.accuracy)
    return subjectOrder.map((subject) => {
      const topics = data.topics
        .filter((t) => t.subject === subject.subject)
        .sort(
          (a, b) =>
            BAND_RANK[a.band] - BAND_RANK[b.band] ||
            a.accuracy - b.accuracy ||
            b.attempted - a.attempted
        )
      return { subject, topics }
    })
  }, [data])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6">
          <div className="flex items-center gap-3">
            <span
              className="grid h-11 w-11 place-items-center rounded-2xl text-white"
              style={{ background: EMERALD }}
            >
              <Layers className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Syllabus Mastery</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Every topic you have practised, coloured by your real accuracy.
              </p>
            </div>
          </div>
        </header>

        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState onRetry={() => setReloadKey((k) => k + 1)} />
        ) : !data || data.totalTopics === 0 ? (
          <EmptyState />
        ) : (
          <>
            <SubjectSummaryBar data={data} />
            <Legend />
            <div className="mt-6 space-y-8">
              {grouped.map(({ subject, topics }) => (
                <section key={subject.subject}>
                  <div className="mb-3 flex items-baseline justify-between">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      {subjectLabel(subject.subject)}
                    </h2>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {subject.accuracy}% across {subject.topicCount} topic
                      {subject.topicCount === 1 ? '' : 's'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {topics.map((topic) => (
                      <TopicTile key={`${topic.subject}-${topic.topic}`} topic={topic} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function SubjectSummaryBar({ data }: { data: MasteryData }) {
  const overall =
    data.totalAttempted > 0 ? Math.round((data.totalCorrect / data.totalAttempted) * 100) : 0
  const subjects = [...data.subjects].sort((a, b) => a.accuracy - b.accuracy)

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">Subject overview</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {overall}% overall · {data.totalCorrect}/{data.totalAttempted} questions
        </p>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => {
          const style = BAND_STYLE[subject.band]
          return (
            <div
              key={subject.subject}
              className="rounded-xl border border-gray-100 p-3 dark:border-gray-800"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {subjectLabel(subject.subject)}
                </span>
                <span className="text-sm font-bold" style={{ color: style.color }}>
                  {subject.accuracy}%
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${subject.accuracy}%`, background: style.color }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-gray-500 dark:text-gray-400">
                {subject.correct}/{subject.attempted} correct
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TopicTile({ topic }: { topic: TopicMastery }) {
  const style = BAND_STYLE[topic.band]
  return (
    <div
      className="rounded-xl border p-3"
      style={{ borderColor: style.border, background: style.bg }}
    >
      <p
        className="truncate text-sm font-semibold text-gray-900"
        title={topic.topic}
        style={{ color: '#111827' }}
      >
        {topic.topic}
      </p>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-lg font-black" style={{ color: style.color }}>
          {topic.accuracy}%
        </span>
        <span className="text-[11px] font-semibold" style={{ color: style.color }}>
          {style.label}
        </span>
      </div>
      <p className="mt-0.5 text-[11px] text-gray-500">
        {topic.correct}/{topic.attempted} correct
      </p>
    </div>
  )
}

function Legend() {
  const bands: Band[] = ['strong', 'developing', 'weak']
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      {bands.map((band) => {
        const style = BAND_STYLE[band]
        return (
          <span
            key={band}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{ background: style.color, boxShadow: `inset 0 0 0 1px ${style.border}` }}
            />
            {style.label}
            <span className="text-gray-400">
              ({band === 'strong' ? '≥75%' : band === 'developing' ? '50–74%' : '<50%'})
            </span>
          </span>
        )
      })}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-40 rounded-2xl bg-gray-200 dark:bg-gray-800" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-gray-200 dark:bg-gray-800" />
        ))}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-900">
      <span
        className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl text-white"
        style={{ background: EMERALD }}
      >
        <Target className="h-6 w-6" />
      </span>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        Practice questions to build your mastery map
      </h2>
      <p className="mx-auto mt-1 max-w-md text-sm text-gray-500 dark:text-gray-400">
        As you attempt mock tests, every topic you touch is scored here by your real accuracy so you
        always know what to revise next.
      </p>
      <Link
        href="/mock-tests"
        className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ background: EMERALD }}
      >
        Start practising <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-gray-900">
      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        We couldn&apos;t load your mastery map.
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Please check your connection and try again.
      </p>
      <button
        onClick={onRetry}
        className="mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ background: EMERALD }}
      >
        <RefreshCw className="h-4 w-4" /> Retry
      </button>
    </div>
  )
}
