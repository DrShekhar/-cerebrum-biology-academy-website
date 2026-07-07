'use client'

import { useState, useEffect } from 'react'
import { BarChart3, ClipboardCheck, Users, TrendingUp, Loader2 } from 'lucide-react'

interface Totals {
  templates: number
  published: number
  sessions: number
  submitted: number
  completionRate: number
  sessionsLast30Days: number
  averageScore: number | null
}

interface TopTemplate {
  id: string
  title: string
  category: string
  difficulty: string
  attemptCount: number
  averageScore: number | null
  totalQuestions: number
  _count: { test_sessions: number }
}

export default function TestsAnalyticsPage() {
  const [totals, setTotals] = useState<Totals | null>(null)
  const [topTemplates, setTopTemplates] = useState<TopTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/admin/tests/analytics')
      const json = await res.json()
      if (json.success) {
        setTotals(json.data.totals)
        setTopTemplates(json.data.topTemplates)
      } else {
        setError(json.error || 'Failed to load analytics')
      }
    } catch {
      setError('Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchData()
  }, [])

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Analytics</h1>
        <p className="text-gray-600">Live aggregates from test templates and student sessions</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : error || !totals ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-3">{error}</p>
          <button onClick={() => void fetchData()} className="text-sm text-blue-600">
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Stat
              icon={<ClipboardCheck className="w-8 h-8 text-blue-500" />}
              label="Templates (published)"
              value={`${totals.templates} (${totals.published})`}
            />
            <Stat
              icon={<Users className="w-8 h-8 text-green-600" />}
              label="Total sessions"
              value={String(totals.sessions)}
            />
            <Stat
              icon={<TrendingUp className="w-8 h-8 text-purple-500" />}
              label="Completion rate"
              value={`${totals.completionRate}%`}
              sub={`${totals.submitted} submitted`}
            />
            <Stat
              icon={<BarChart3 className="w-8 h-8 text-amber-500" />}
              label="Avg score"
              value={totals.averageScore !== null ? String(totals.averageScore) : '—'}
              sub={`${totals.sessionsLast30Days} sessions in 30d`}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Most attempted templates</h2>
            {topTemplates.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">No attempts recorded yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-600 border-b border-gray-200">
                      <th className="pb-2 font-medium">Template</th>
                      <th className="pb-2 font-medium">Category</th>
                      <th className="pb-2 font-medium">Difficulty</th>
                      <th className="pb-2 font-medium text-right">Questions</th>
                      <th className="pb-2 font-medium text-right">Attempts</th>
                      <th className="pb-2 font-medium text-right">Avg score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topTemplates.map((t) => (
                      <tr key={t.id} className="border-b border-gray-100">
                        <td className="py-2 text-gray-900 font-medium">{t.title}</td>
                        <td className="py-2 text-gray-600">{t.category}</td>
                        <td className="py-2 text-gray-600">{t.difficulty}</td>
                        <td className="py-2 text-gray-600 text-right">{t.totalQuestions}</td>
                        <td className="py-2 text-gray-900 text-right font-medium">
                          {t.attemptCount || t._count.test_sessions}
                        </td>
                        <td className="py-2 text-gray-600 text-right">
                          {t.averageScore !== null ? Math.round(t.averageScore * 10) / 10 : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function Stat({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
        </div>
        {icon}
      </div>
    </div>
  )
}
