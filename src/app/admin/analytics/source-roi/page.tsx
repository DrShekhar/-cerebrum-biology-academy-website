'use client'

/**
 * Source ROI — attribution from first touch to collected revenue.
 * Answers "which channel actually produces enrollments", not clicks.
 */

import { useEffect, useState } from 'react'
import { Loader2, TrendingUp, Users, GraduationCap, IndianRupee } from 'lucide-react'
import { PageHeader, StatCard } from '@/components/admin/kit'

interface SourceRow {
  source: string
  campaigns: string[]
  leads: number
  demos: number
  enrolled: number
  lost: number
  revenue: number
  demoRate: number
  enrollRate: number
}

export default function SourceRoiPage() {
  const [days, setDays] = useState(90)
  const [rows, setRows] = useState<SourceRow[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/admin/analytics/source-roi?days=${days}`)
      .then((r) => r.json())
      .then((j) => {
        if (j.success) {
          setRows(j.data.sources)
          setTotal(j.data.totalLeads)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [days])

  const enrolled = rows.reduce((a, r) => a + r.enrolled, 0)
  const revenue = rows.reduce((a, r) => a + r.revenue, 0)

  return (
    <div className="p-6">
      <PageHeader
        title="Source ROI"
        subtitle="First-touch attribution: leads → demos → enrollments → collected revenue per source"
        actions={
          <select
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value, 10))}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
            aria-label="Time range"
          >
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={365}>Last 12 months</option>
          </select>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Leads" value={total} icon={Users} />
        <StatCard
          label="Enrollments"
          value={enrolled}
          icon={GraduationCap}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          label="Revenue collected"
          value={`₹${revenue.toLocaleString('en-IN')}`}
          icon={IndianRupee}
          color="bg-orange-100 text-orange-600"
        />
        <StatCard
          label="Lead → enrollment"
          value={total ? `${Math.round((enrolled / total) * 1000) / 10}%` : '—'}
          icon={TrendingUp}
          color="bg-purple-100 text-purple-600"
        />
      </div>

      {loading ? (
        <div className="flex items-center gap-2 py-16 text-gray-500 justify-center">
          <Loader2 className="h-5 w-5 animate-spin" /> Building report…
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500">
          No leads in this window yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs uppercase text-gray-500">
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3 text-right">Leads</th>
                <th className="px-4 py-3 text-right">Reached demo+</th>
                <th className="px-4 py-3 text-right">Enrolled</th>
                <th className="px-4 py-3 text-right">Lost</th>
                <th className="px-4 py-3 text-right">Enroll rate</th>
                <th className="px-4 py-3 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map((r) => (
                <tr key={r.source}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{r.source}</p>
                    {r.campaigns.length > 0 && (
                      <p className="mt-0.5 truncate text-xs text-gray-400" title={r.campaigns.join(', ')}>
                        {r.campaigns.join(', ')}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">{r.leads}</td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {r.demos}
                    <span className="ml-1 text-xs text-gray-400">({r.demoRate}%)</span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-green-700">{r.enrolled}</td>
                  <td className="px-4 py-3 text-right text-gray-500">{r.lost}</td>
                  <td className="px-4 py-3 text-right text-gray-700">{r.enrollRate}%</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900">
                    ₹{r.revenue.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-3 text-xs text-gray-400">
        Attribution is first-touch (the source that created the lead). Revenue = fee-plan amounts
        collected from that source&apos;s leads. UTM columns populate for new leads from now on;
        older leads report under their form source.
      </p>
    </div>
  )
}
