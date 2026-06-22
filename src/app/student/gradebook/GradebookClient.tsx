'use client'

/**
 * GradebookClient — consolidated grade/transcript view for a student.
 * Fetches /api/student/gradebook (real test_attempts aggregation). Additive;
 * shows an honest empty state until the student has completed tests.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Award, BarChart3, Clock, FileText, Loader2, TrendingUp } from 'lucide-react'

interface Gradebook {
  overall: {
    completedTests: number
    averagePercentage: number
    bestPercentage: number
    totalTimeSpentMinutes: number
  }
  byDifficulty: Array<{ difficulty: string; tests: number; averagePercentage: number }>
  trend: Array<{ date: string; percentage: number; title: string }>
  transcript: Array<{
    id: string
    title: string
    category: string | null
    score: number
    totalMarks: number
    percentage: number
    difficulty: string
    questionCount: number
    timeSpentMinutes: number
    date: string
  }>
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

const gradeColor = (p: number) =>
  p >= 80
    ? 'text-green-600'
    : p >= 60
      ? 'text-blue-600'
      : p >= 40
        ? 'text-amber-600'
        : 'text-red-600'

export default function GradebookClient() {
  const [data, setData] = useState<Gradebook | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/api/student/gradebook')
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return
        if (json.success) setData(json.data)
        else setError(true)
        setLoading(false)
      })
      .catch(() => {
        if (!cancelled) {
          setError(true)
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-slate-600">
          Couldn’t load your gradebook. Please sign in and try again.
        </p>
        <Link href="/sign-in" className="mt-4 inline-block text-blue-700 underline">
          Sign in
        </Link>
      </div>
    )
  }

  if (!data || data.overall.completedTests === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <FileText className="mx-auto h-12 w-12 text-slate-300" />
        <h2 className="mt-4 text-xl font-bold text-slate-900">No grades yet</h2>
        <p className="mt-2 text-sm text-slate-600">
          Complete a test and your scores, averages and full transcript will appear here.
        </p>
        <Link
          href="/mock-tests"
          className="mt-5 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Take a test
        </Link>
      </div>
    )
  }

  const { overall, byDifficulty, trend, transcript } = data
  const maxTrend = Math.max(100, ...trend.map((t) => t.percentage))

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Gradebook</h1>
      <p className="mt-1 text-sm text-slate-600">Your scores across every completed test.</p>

      {/* Overall stat tiles */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat
          icon={<FileText className="h-5 w-5 text-blue-600" />}
          label="Tests completed"
          value={String(overall.completedTests)}
        />
        <Stat
          icon={<BarChart3 className="h-5 w-5 text-blue-600" />}
          label="Average"
          value={`${overall.averagePercentage}%`}
          valueClass={gradeColor(overall.averagePercentage)}
        />
        <Stat
          icon={<Award className="h-5 w-5 text-amber-500" />}
          label="Best score"
          value={`${overall.bestPercentage}%`}
          valueClass={gradeColor(overall.bestPercentage)}
        />
        <Stat
          icon={<Clock className="h-5 w-5 text-blue-600" />}
          label="Time on tests"
          value={`${overall.totalTimeSpentMinutes} min`}
        />
      </div>

      {/* Trend */}
      {trend.length > 1 && (
        <section className="mt-8 rounded-2xl border border-slate-200 p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <TrendingUp className="h-5 w-5 text-blue-600" /> Recent trend
          </h2>
          <div className="mt-4 flex items-end gap-2" style={{ height: 120 }}>
            {trend.map((t, i) => (
              <div
                key={i}
                className="flex flex-1 flex-col items-center justify-end"
                title={`${t.title}: ${t.percentage}%`}
              >
                <div
                  className="w-full rounded-t bg-blue-500"
                  style={{ height: `${(t.percentage / maxTrend) * 100}%`, minHeight: 4 }}
                />
                <span className="mt-1 text-[10px] text-slate-400">{t.percentage}%</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* By difficulty */}
      {byDifficulty.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-bold text-slate-900">By difficulty</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {byDifficulty.map((d) => (
              <div key={d.difficulty} className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {d.difficulty}
                </p>
                <p className={`mt-1 text-2xl font-bold ${gradeColor(d.averagePercentage)}`}>
                  {d.averagePercentage}%
                </p>
                <p className="text-xs text-slate-500">
                  {d.tests} test{d.tests === 1 ? '' : 's'}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Transcript */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">Transcript</h2>
        <div className="mt-3 overflow-x-auto rounded-2xl ring-1 ring-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Test</th>
                <th className="px-4 py-3 font-semibold">Score</th>
                <th className="px-4 py-3 font-semibold">%</th>
                <th className="hidden px-4 py-3 font-semibold sm:table-cell">Difficulty</th>
                <th className="hidden px-4 py-3 font-semibold md:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transcript.map((t) => (
                <tr key={t.id} className="bg-white">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {t.title}
                    {t.category && (
                      <span className="ml-2 text-xs text-slate-400">{t.category}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {t.score}/{t.totalMarks}
                  </td>
                  <td className={`px-4 py-3 font-bold ${gradeColor(t.percentage)}`}>
                    {t.percentage}%
                  </td>
                  <td className="hidden px-4 py-3 text-slate-500 sm:table-cell">{t.difficulty}</td>
                  <td className="hidden px-4 py-3 text-slate-500 md:table-cell">
                    {fmtDate(t.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function Stat({
  icon,
  label,
  value,
  valueClass = 'text-slate-900',
}: {
  icon: React.ReactNode
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      {icon}
      <p className={`mt-2 text-2xl font-bold ${valueClass}`}>{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  )
}
