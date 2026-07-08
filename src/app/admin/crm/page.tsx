'use client'

/**
 * Admin CRM Overview — the owner's single screen for the whole pipeline:
 * headline totals, the stage funnel, enrollments, and a per-counselor
 * breakdown. Every counselor row drills into that counselor's leads
 * (/admin/students/leads?assignedToId=…) so the admin can oversee and
 * inspect each counselor's book of business without needing their login.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Loader2,
  Users,
  GraduationCap,
  TrendingUp,
  Layers,
  ChevronRight,
  Trophy,
} from 'lucide-react'
import { PageHeader, StatCard } from '@/components/admin/kit'
import { stageBadgeClass, stageLabel } from '@/lib/leads/stageColors'

interface Overview {
  totals: {
    totalLeads: number
    enrolled: number
    lost: number
    open: number
    conversionRate: number
    enrollmentsTotal: number
    enrollmentsActive: number
  }
  funnel: { stage: string; count: number }[]
  counselors: {
    id: string
    name: string
    email: string
    role: string
    totalLeads: number
    activeLeads: number
    enrolled: number
    lost: number
    conversionRate: number
    byStage: Record<string, number>
  }[]
}

export default function AdminCrmOverviewPage() {
  const [data, setData] = useState<Overview | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/crm/overview')
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setData(j.data)
        else setError(j.error || 'Failed to load')
      })
      .catch(() => setError('Network error'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-500">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading CRM overview…
      </div>
    )
  }
  if (error || !data) {
    return <div className="p-6 text-red-600">{error || 'No data'}</div>
  }

  const { totals, funnel, counselors } = data
  const maxFunnel = Math.max(1, ...funnel.map((f) => f.count))

  return (
    <div className="p-6">
      <PageHeader
        title="CRM Overview"
        subtitle="Whole-pipeline view — totals, funnel, and every counselor's book of business"
        actions={
          <div className="flex gap-2">
            <Link
              href="/admin/students/leads"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              All leads
            </Link>
            <Link
              href="/counselor/leads"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Pipeline board
            </Link>
          </div>
        }
      />

      {/* Headline totals */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total leads" value={totals.totalLeads} icon={Users} />
        <StatCard
          label="Enrolled (won)"
          value={totals.enrolled}
          icon={GraduationCap}
          color="bg-green-100 text-green-600"
          sub={`${totals.conversionRate}% conversion`}
        />
        <StatCard
          label="Open pipeline"
          value={totals.open}
          icon={Layers}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          label="Active enrollments"
          value={totals.enrollmentsActive}
          icon={TrendingUp}
          color="bg-purple-100 text-purple-600"
          sub={`${totals.enrollmentsTotal} total`}
        />
      </div>

      {/* Funnel */}
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 font-semibold text-gray-900">Pipeline funnel</h2>
        <div className="space-y-2">
          {funnel.map((f) => (
            <Link
              key={f.stage}
              href={`/admin/students/leads?stage=${f.stage}`}
              className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-gray-50"
            >
              <span className="w-40 shrink-0">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${stageBadgeClass(f.stage)}`}
                >
                  {stageLabel(f.stage)}
                </span>
              </span>
              <div className="h-5 flex-1 overflow-hidden rounded bg-gray-100">
                <div
                  className="h-full rounded bg-blue-500"
                  style={{ width: `${(f.count / maxFunnel) * 100}%` }}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-sm font-medium text-gray-700">
                {f.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Per-counselor breakdown */}
      <div className="rounded-2xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <h2 className="flex items-center gap-2 font-semibold text-gray-900">
            <Trophy className="h-4 w-4 text-yellow-500" /> Counselors
          </h2>
          <span className="text-xs text-gray-400">Click a counselor to see their leads</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs uppercase text-gray-500">
                <th className="px-4 py-3">Counselor</th>
                <th className="px-4 py-3 text-right">Leads</th>
                <th className="px-4 py-3 text-right">Open</th>
                <th className="px-4 py-3 text-right">Enrolled</th>
                <th className="px-4 py-3 text-right">Lost</th>
                <th className="px-4 py-3 text-right">Conversion</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {counselors.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{c.name}</p>
                    <p className="text-xs text-gray-400">
                      {c.email}
                      {c.role === 'ADMIN' ? ' · admin' : ''}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">{c.totalLeads}</td>
                  <td className="px-4 py-3 text-right text-gray-700">{c.activeLeads}</td>
                  <td className="px-4 py-3 text-right font-semibold text-green-700">{c.enrolled}</td>
                  <td className="px-4 py-3 text-right text-gray-500">{c.lost}</td>
                  <td className="px-4 py-3 text-right text-gray-700">{c.conversionRate}%</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/students/leads?assignedToId=${c.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
                    >
                      View leads <ChevronRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
              {counselors.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No counselors with leads yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
