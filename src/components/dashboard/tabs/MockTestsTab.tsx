'use client'

// Mock Tests tab (roadmap P1): CBT attempt history + resume from
// /api/cbt/attempts. Graceful empty state with a "Take your first mock" CTA.

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ClipboardList,
  PlayCircle,
  Trophy,
  ArrowRight,
  CheckCircle,
  Clock,
  BarChart3,
} from 'lucide-react'

interface CbtAttempt {
  id: string
  status: string
  score: number | null
  percentage: number | null
  percentile: number | null
  rank: number | null
  date: string
}

interface AttemptsResponse {
  success: boolean
  inProgressId: string | null
  maxScore: number
  attempts: CbtAttempt[]
}

function statusBadge(status: string) {
  if (status === 'COMPLETED') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
        <CheckCircle className="w-3 h-3" /> Completed
      </span>
    )
  }
  if (status === 'IN_PROGRESS') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
        <Clock className="w-3 h-3" /> In Progress
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
      {status.replace(/_/g, ' ').toLowerCase()}
    </span>
  )
}

export function MockTestsTab() {
  const [data, setData] = useState<AttemptsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/cbt/attempts', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.success) setData(d)
      })
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  const attempts = data?.attempts ?? []
  const completed = attempts.filter((a) => a.status === 'COMPLETED')
  const bestPct = completed.reduce((best, a) => Math.max(best, a.percentage ?? 0), 0)

  if (attempts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 sm:p-12 text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ClipboardList className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No mock tests yet</h3>
        <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
          Take a full-length NEET-pattern computer-based test to see your score, percentile and
          AI-powered feedback.
        </p>
        <Link
          href="/cbt"
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-sm font-semibold transition-colors"
        >
          <PlayCircle className="w-5 h-5" /> Take your first mock
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Resume banner */}
      {data?.inProgressId && (
        <Link
          href="/cbt"
          className="block bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl shadow-xl p-5 text-white hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <PlayCircle className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold">Resume your mock test</h3>
                <p className="text-sm text-white/80 truncate">
                  You have a test in progress — pick up where you left off
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 flex-shrink-0" />
          </div>
        </Link>
      )}

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-xs text-gray-500">Attempts</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{completed.length}</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-4 h-4 text-yellow-600" />
            </div>
            <span className="text-xs text-gray-500">Best</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">
            {completed.length > 0 ? `${Math.round(bestPct)}%` : '—'}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-xs text-gray-500">Max Marks</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{data?.maxScore ?? 720}</div>
        </div>
      </div>

      {/* Attempt list */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Past Attempts</h3>
          <Link
            href="/cbt"
            className="inline-flex items-center gap-1 text-sm font-medium text-purple-700 hover:text-purple-800"
          >
            New mock <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {attempts.map((attempt) => (
            <div
              key={attempt.id}
              className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-medium text-sm sm:text-base text-gray-900">
                    NEET Full Mock
                  </span>
                  {statusBadge(attempt.status)}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  {new Date(attempt.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                  {attempt.percentile !== null && ` • ${attempt.percentile}th percentile`}
                  {attempt.rank !== null && ` • Rank #${attempt.rank}`}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                {attempt.status === 'COMPLETED' ? (
                  <>
                    <div className="text-green-600 font-bold text-sm sm:text-base">
                      {attempt.score ?? 0}/{data?.maxScore ?? 720}
                    </div>
                    {attempt.percentage !== null && (
                      <div className="text-xs text-gray-500">{Math.round(attempt.percentage)}%</div>
                    )}
                  </>
                ) : attempt.status === 'IN_PROGRESS' ? (
                  <Link
                    href="/cbt"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold transition-colors"
                  >
                    Resume
                  </Link>
                ) : (
                  <span className="text-xs text-gray-400">—</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
