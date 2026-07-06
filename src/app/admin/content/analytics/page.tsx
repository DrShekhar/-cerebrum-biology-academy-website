'use client'

// Content analytics — REAL tracked data from blog_views (per-post cumulative
// view counters). This page previously fetched an endpoint that never existed
// and rendered empty mock structures.
//
// Scope honesty: the site tracks view COUNTERS only (no per-view timestamps),
// so totals/rankings are real; time-series trends, time-on-page, and bounce
// rate would need GA4 and are intentionally NOT shown rather than fabricated.

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { BarChart3, Eye, FileText, TrendingUp, Loader2, ExternalLink } from 'lucide-react'

interface Overview {
  totalViews: number
  trackedPosts: number
  totalPosts: number
  avgViewsPerPost: number
}

interface TopContent {
  slug: string
  title: string
  views: number
  lastViewedAt: string
  exists: boolean
}

export default function ContentAnalyticsPage() {
  const [overview, setOverview] = useState<Overview | null>(null)
  const [topContent, setTopContent] = useState<TopContent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/admin/content/analytics', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        setOverview(data.overview)
        setTopContent(data.topContent || [])
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const tiles = [
    {
      label: 'Total blog views',
      value: overview?.totalViews,
      icon: Eye,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Posts with views',
      value: overview?.trackedPosts,
      icon: BarChart3,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Published posts',
      value: overview?.totalPosts,
      icon: FileText,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Avg views / post',
      value: overview?.avgViewsPerPost,
      icon: TrendingUp,
      color: 'bg-amber-100 text-amber-600',
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Analytics</h1>
          <p className="text-gray-600 mt-1">
            Real view counts per blog post. Time-on-page, bounce, and trends live in{' '}
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GA4 <ExternalLink className="inline w-3 h-3" />
            </a>{' '}
            — they aren&apos;t tracked here.
          </p>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {tiles.map((t) => (
            <div key={t.label} className="bg-white p-5 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{t.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-0.5">
                    {loading ? '…' : (t.value ?? 0).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${t.color}`}>
                  <t.icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top content */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Most-viewed posts</h2>
          </div>
          {loading ? (
            <div className="p-16 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto" />
            </div>
          ) : error ? (
            <div className="p-16 text-center text-gray-500">Failed to load analytics.</div>
          ) : topContent.length === 0 ? (
            <div className="p-16 text-center text-gray-400">
              No tracked views yet — counters fill in as readers open blog posts.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-3 w-10">#</th>
                    <th className="px-6 py-3">Post</th>
                    <th className="px-6 py-3">Views</th>
                    <th className="px-6 py-3">Last viewed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {topContent.map((c, i) => (
                    <tr key={c.slug} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-400">{i + 1}</td>
                      <td className="px-6 py-3">
                        {c.exists ? (
                          <a
                            href={`/blog/${c.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-gray-900 hover:text-blue-600"
                          >
                            {c.title}
                          </a>
                        ) : (
                          <span className="font-medium text-gray-500" title="Post no longer exists">
                            {c.title} <span className="text-xs text-red-400">(removed)</span>
                          </span>
                        )}
                        <div className="text-xs text-gray-400">/blog/{c.slug}</div>
                      </td>
                      <td className="px-6 py-3 font-semibold text-gray-900">
                        {c.views.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-3 text-gray-500">
                        {new Date(c.lastViewedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
