'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, Monitor, Clock } from 'lucide-react'

interface Attempt {
  id: string
  status: string
  score: number | null
  percentage: number | null
  rank: number | null
  date: string
}

/**
 * CBT hub — start/resume the NEET full-mock and see past attempts.
 */
export default function CBTHubPage() {
  const router = useRouter()
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [inProgressId, setInProgressId] = useState<string | null>(null)
  const [maxScore, setMaxScore] = useState(720)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/cbt/attempts')
      const data = await res.json()
      if (res.status === 401) {
        setError('Please sign in to take the CBT mock.')
        return
      }
      if (!res.ok || !data.success) {
        setError(data.error || 'Could not load attempts.')
        return
      }
      setAttempts(data.attempts || [])
      setInProgressId(data.inProgressId || null)
      if (data.maxScore) setMaxScore(data.maxScore)
    } catch {
      setError('Network error.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-r from-green-800 to-green-900 p-6 text-white md:p-8">
        <div className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
          NEET 2027 is computer-based — practise on the real interface
        </div>
        <h1 className="mt-3 flex items-center gap-2 text-2xl font-bold md:text-3xl">
          <Monitor className="h-7 w-7" /> NEET Biology CBT Mock
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-white/85">
          180 questions · 720 marks · 3 hours · +4 / −1. Full NTA-style interface with question
          palette, sections, mark-for-review, timer and anti-cheat. Results are server-scored with
          rank, percentile and solutions.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/cbt/neet-full"
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-green-800 hover:bg-white/90"
          >
            {inProgressId ? 'Resume attempt' : 'Start CBT Mock'}
          </Link>
          {inProgressId && (
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-3 text-sm">
              <Clock className="h-4 w-4" /> You have an attempt in progress
            </span>
          )}
        </div>
      </div>

      {/* Attempts history */}
      <div className="mt-8">
        <h2 className="mb-3 text-lg font-bold text-gray-900">Your attempts</h2>
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-500">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading…
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            {error}
          </div>
        ) : attempts.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
            No attempts yet. Start your first CBT mock above.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-gray-500">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Score</th>
                  <th className="px-4 py-2">Percentile</th>
                  <th className="px-4 py-2">Rank</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((a) => (
                  <tr key={a.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-2.5 text-gray-700">{fmt(a.date)}</td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          a.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {a.status === 'COMPLETED' ? 'Completed' : 'In progress'}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 font-medium text-gray-900">
                      {a.status === 'COMPLETED' && a.score !== null
                        ? `${a.score} / ${maxScore}`
                        : '—'}
                    </td>
                    <td className="px-4 py-2.5 text-gray-700">
                      {a.percentage !== null && a.status === 'COMPLETED'
                        ? `${a.percentage.toFixed(1)}%`
                        : '—'}
                    </td>
                    <td className="px-4 py-2.5 text-gray-700">{a.rank ?? '—'}</td>
                    <td className="px-4 py-2.5 text-right">
                      {a.status === 'COMPLETED' ? (
                        <button
                          onClick={() => router.push(`/cbt/review/${a.id}`)}
                          className="text-sm font-medium text-green-700 hover:text-green-900"
                        >
                          Review
                        </button>
                      ) : (
                        <Link
                          href="/cbt/neet-full"
                          className="text-sm font-medium text-amber-700 hover:text-amber-900"
                        >
                          Resume
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
