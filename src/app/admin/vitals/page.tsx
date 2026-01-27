'use client'

import { useState, useEffect } from 'react'
import { Activity, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react'

interface VitalData {
  good: number
  needsImprovement: number
  poor: number
  avg: number
  count: number
}

interface VitalsResponse {
  success: boolean
  data: Record<string, VitalData>
  days: number
}

const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000, unit: 'ms', label: 'Largest Contentful Paint' },
  FCP: { good: 1800, poor: 3000, unit: 'ms', label: 'First Contentful Paint' },
  CLS: { good: 0.1, poor: 0.25, unit: '', label: 'Cumulative Layout Shift' },
  INP: { good: 200, poor: 500, unit: 'ms', label: 'Interaction to Next Paint' },
  TTFB: { good: 800, poor: 1800, unit: 'ms', label: 'Time to First Byte' },
}

function getScoreColor(good: number, total: number): string {
  const goodPct = (good / total) * 100
  if (goodPct >= 75) return 'text-green-600'
  if (goodPct >= 50) return 'text-yellow-600'
  return 'text-red-600'
}

function getStatusIcon(good: number, total: number) {
  const goodPct = (good / total) * 100
  if (goodPct >= 75) return <CheckCircle className="h-5 w-5 text-green-500" />
  if (goodPct >= 50) return <TrendingUp className="h-5 w-5 text-yellow-500" />
  return <AlertTriangle className="h-5 w-5 text-red-500" />
}

export default function VitalsAdminPage() {
  const [vitals, setVitals] = useState<Record<string, VitalData>>({})
  const [loading, setLoading] = useState(true)
  const [days, setDays] = useState(7)

  useEffect(() => {
    fetchVitals()
  }, [days])

  async function fetchVitals() {
    setLoading(true)
    try {
      const res = await fetch(`/api/vitals?days=${days}`)
      const data: VitalsResponse = await res.json()
      if (data.success) {
        setVitals(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch vitals:', error)
    }
    setLoading(false)
  }

  const totalSamples = Object.values(vitals).reduce((sum, v) => sum + v.count, 0)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Activity className="h-6 w-6 text-blue-500" />
              Core Web Vitals Monitor
            </h1>
            <p className="text-gray-500">Real user performance data</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Time range:</span>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option value={1}>Last 24 hours</option>
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          </div>
        ) : totalSamples === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm">
            <Activity className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <h2 className="text-lg font-semibold text-gray-700">No data yet</h2>
            <p className="text-gray-500">
              Web Vitals data will appear here as users visit your site.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-600">
                <strong>{totalSamples.toLocaleString()}</strong> samples collected in the last{' '}
                <strong>{days}</strong> days
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(THRESHOLDS).map(([metric, config]) => {
                const data = vitals[metric]
                if (!data) return null

                const total = data.good + data.needsImprovement + data.poor
                const goodPct = total > 0 ? Math.round((data.good / total) * 100) : 0
                const needsImprovementPct = total > 0 ? Math.round((data.needsImprovement / total) * 100) : 0
                const poorPct = total > 0 ? Math.round((data.poor / total) * 100) : 0

                return (
                  <div key={metric} className="rounded-xl bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{metric}</h3>
                        <p className="text-xs text-gray-500">{config.label}</p>
                      </div>
                      {getStatusIcon(data.good, total)}
                    </div>

                    <div className="mb-4">
                      <div className={`text-3xl font-bold ${getScoreColor(data.good, total)}`}>
                        {data.avg.toFixed(metric === 'CLS' ? 3 : 0)}
                        <span className="text-lg font-normal text-gray-400">{config.unit}</span>
                      </div>
                      <p className="text-xs text-gray-500">Average</p>
                    </div>

                    <div className="mb-2 h-2 overflow-hidden rounded-full bg-gray-100">
                      <div className="flex h-full">
                        <div
                          className="bg-green-500 transition-all"
                          style={{ width: `${goodPct}%` }}
                        />
                        <div
                          className="bg-yellow-500 transition-all"
                          style={{ width: `${needsImprovementPct}%` }}
                        />
                        <div
                          className="bg-red-500 transition-all"
                          style={{ width: `${poorPct}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-green-600">{goodPct}% Good</span>
                      <span className="text-yellow-600">{needsImprovementPct}% OK</span>
                      <span className="text-red-600">{poorPct}% Poor</span>
                    </div>

                    <div className="mt-4 border-t pt-4">
                      <p className="text-xs text-gray-400">
                        Good: &lt;{config.good}{config.unit} | Poor: &gt;{config.poor}{config.unit}
                      </p>
                      <p className="text-xs text-gray-400">{total.toLocaleString()} samples</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 rounded-xl bg-blue-50 p-6">
              <h3 className="mb-2 font-semibold text-blue-900">Understanding the Scores</h3>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>
                  <strong>LCP &lt; 2.5s:</strong> Content loads quickly - users see main content fast
                </li>
                <li>
                  <strong>FCP &lt; 1.8s:</strong> First paint happens quickly - page feels responsive
                </li>
                <li>
                  <strong>CLS &lt; 0.1:</strong> Layout is stable - no unexpected shifts
                </li>
                <li>
                  <strong>INP &lt; 200ms:</strong> Interactions feel instant - clicks respond fast
                </li>
                <li>
                  <strong>TTFB &lt; 800ms:</strong> Server responds quickly - infrastructure is healthy
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
