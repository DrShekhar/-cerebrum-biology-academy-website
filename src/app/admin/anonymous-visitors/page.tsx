'use client'

import { useState, useEffect, useCallback } from 'react'
import { Flame, RefreshCw, MapPin, Eye, Clock } from 'lucide-react'

interface HotSession {
  sessionId: string
  score: number
  signals: string[]
  pagesViewed: number
  firstSeen: string
  lastSeen: string
  city: string | null
  country: string | null
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  entryPagePath: string | null
  lastPagePath: string | null
}

interface ApiResponse {
  success: boolean
  days: number
  count: number
  sessions: HotSession[]
}

const DAY_OPTIONS = [7, 14, 30] as const

function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

function scoreBadgeClass(score: number): string {
  if (score >= 60) return 'bg-red-100 text-red-800'
  if (score >= 40) return 'bg-orange-100 text-orange-800'
  return 'bg-yellow-100 text-yellow-800'
}

export default function AnonymousVisitorsPage() {
  const [days, setDays] = useState<number>(7)
  const [sessions, setSessions] = useState<HotSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`/api/admin/leads/anonymous-hot?days=${days}`)
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      const data: ApiResponse = await res.json()
      if (!data.success) throw new Error('API returned an error')
      setSessions(data.sessions)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load hot sessions')
      setSessions([])
    } finally {
      setLoading(false)
    }
  }, [days])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-6 h-6 text-orange-600" />
          <h1 className="text-2xl font-bold text-gray-900">Hot Anonymous Visitors</h1>
        </div>
        <p className="text-sm text-gray-600 max-w-3xl">
          These are anonymous visitors showing buying intent (fees pages, demo/booking pages,
          WhatsApp clicks, tool completions) who have <strong>not</strong> given contact info yet.
          Use this to gauge which pages convert and to target retargeting budget. This view is
          read-only.
        </p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Last</span>
          {DAY_OPTIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                days === d
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {d} days
            </button>
          ))}
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Signals</th>
              <th className="px-4 py-3">Pages</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Entry / Last page</th>
              <th className="px-4 py-3">First / Last seen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && sessions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  Loading hot sessions…
                </td>
              </tr>
            ) : sessions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  No hot anonymous sessions in the last {days} days.
                </td>
              </tr>
            ) : (
              sessions.map((s) => (
                <tr key={s.sessionId} className="hover:bg-gray-50 align-top">
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${scoreBadgeClass(
                        s.score
                      )}`}
                    >
                      {s.score}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {s.signals.map((sig, i) => (
                        <span
                          key={i}
                          className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs"
                        >
                          {sig}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <span className="inline-flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-gray-400" />
                      {s.pagesViewed}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {[s.city, s.country].filter(Boolean).join(', ') || '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {s.utmSource || s.utmMedium || s.utmCampaign ? (
                      <div className="text-xs leading-tight">
                        <div>{s.utmSource || '—'}</div>
                        <div className="text-gray-400">
                          {[s.utmMedium, s.utmCampaign].filter(Boolean).join(' · ')}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">direct</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <div
                      className="text-xs leading-tight max-w-[200px] truncate"
                      title={s.entryPagePath || ''}
                    >
                      {s.entryPagePath || '—'}
                    </div>
                    <div
                      className="text-xs leading-tight text-gray-400 max-w-[200px] truncate"
                      title={s.lastPagePath || ''}
                    >
                      → {s.lastPagePath || '—'}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <div className="inline-flex items-center gap-1 text-xs">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {formatDateTime(s.firstSeen)}
                    </div>
                    <div className="text-xs text-gray-400">{formatDateTime(s.lastSeen)}</div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
