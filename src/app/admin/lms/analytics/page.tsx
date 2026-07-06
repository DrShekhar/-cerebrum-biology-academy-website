'use client'

/**
 * Admin LMS — Analytics Dashboard
 *
 * Real numbers from study_materials counters + material_progress activity.
 * (Previously rendered hardcoded zeros with a "coming soon" notice.)
 */

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface LmsStats {
  totalMaterials: number
  totalDownloads: number
  totalViews: number
  activeStudents: number
}

interface TopMaterial {
  id: string
  title: string
  materialType: string
  category: string | null
  totalViews: number
  totalDownloads: number
  publishedAt: string | null
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<LmsStats | null>(null)
  const [topMaterials, setTopMaterials] = useState<TopMaterial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/lms/analytics', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.success) {
          setStats(data.stats)
          setTopMaterials(data.topMaterials || [])
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const tiles = [
    {
      label: 'Total Materials',
      value: stats?.totalMaterials,
      sub: 'All uploaded materials',
      color: 'text-gray-900',
      emoji: '📚',
    },
    {
      label: 'Total Downloads',
      value: stats?.totalDownloads,
      sub: 'By all students',
      color: 'text-blue-600',
      emoji: '⬇️',
    },
    {
      label: 'Total Views',
      value: stats?.totalViews,
      sub: 'Material opens',
      color: 'text-green-600',
      emoji: '👁️',
    },
    {
      label: 'Active Students',
      value: stats?.activeStudents,
      sub: 'Opened materials, last 7 days',
      color: 'text-purple-600',
      emoji: '👨‍🎓',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">LMS Analytics</h1>
          <p className="text-gray-600">
            Track downloads, views, and student engagement with study materials
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {tiles.map((t) => (
            <div key={t.label} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t.label}</p>
                  <div className={`text-3xl font-bold ${t.color}`}>
                    {loading ? (
                      <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
                    ) : (
                      (t.value ?? 0)
                    )}
                  </div>
                </div>
                <div className="text-4xl">{t.emoji}</div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{t.sub}</p>
            </div>
          ))}
        </div>

        {/* Most-viewed materials */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Most-viewed materials</h2>
          </div>
          {topMaterials.length === 0 ? (
            <div className="p-10 text-center text-gray-400 text-sm">
              {loading
                ? 'Loading…'
                : 'No published materials yet — analytics fill in as students open them.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-3">Material</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Views</th>
                    <th className="px-6 py-3">Downloads</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {topMaterials.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3">
                        <div className="font-medium text-gray-900">{m.title}</div>
                        {m.category && <div className="text-xs text-gray-400">{m.category}</div>}
                      </td>
                      <td className="px-6 py-3 text-gray-600">{m.materialType}</td>
                      <td className="px-6 py-3 font-medium text-green-600">{m.totalViews}</td>
                      <td className="px-6 py-3 font-medium text-blue-600">{m.totalDownloads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/lms/materials/upload"
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">📤 Upload Materials</h3>
            <p className="text-sm text-gray-600">Add new study materials</p>
          </a>
          <a
            href="/admin/lms/materials"
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">📚 View Materials</h3>
            <p className="text-sm text-gray-600">Browse all materials</p>
          </a>
          <a
            href="/admin/students"
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">👨‍🎓 Manage Students</h3>
            <p className="text-sm text-gray-600">View student list</p>
          </a>
        </div>
      </div>
    </div>
  )
}
