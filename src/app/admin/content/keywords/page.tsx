'use client'

// Keyword rankings — honest state. This page previously rendered a hardcoded
// list of fabricated positions/volumes/changes that looked like live rank
// data. Real rankings require the Google Search Console API (not connected);
// until then we link straight to GSC instead of inventing numbers.

import { AdminLayout } from '@/components/admin/AdminLayout'
import { Search, ExternalLink, BarChart3, FileText } from 'lucide-react'

const GSC_PROPERTY =
  'https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Acerebrumbiologyacademy.com'

const SHORTCUTS = [
  {
    title: 'Search performance (queries)',
    description:
      'Real positions, clicks, impressions, and CTR for every keyword — live from Google.',
    href: `${GSC_PROPERTY}&breakdown=query`,
    icon: Search,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Search performance (pages)',
    description: 'Which pages earn the queries — spot cannibalization and winners.',
    href: `${GSC_PROPERTY}&breakdown=page`,
    icon: FileText,
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Content analytics (on-site)',
    description: 'Real per-post view counts tracked by this site.',
    href: '/admin/content/analytics',
    icon: BarChart3,
    color: 'bg-purple-100 text-purple-600',
    internal: true,
  },
]

export default function KeywordsPage() {
  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Keyword Rankings</h1>
          <p className="text-gray-600 mt-1">
            Live keyword positions come from Google Search Console — the source of truth.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-900">
          <strong>Why is there no table here?</strong> This page used to show sample ranking data
          that wasn&apos;t connected to anything real. Rank tracking needs the Search Console API;
          until that integration is built, use the direct links below — they open the exact GSC
          reports with real numbers.
        </div>

        <div className="grid gap-4">
          {SHORTCUTS.map((s) => (
            <a
              key={s.title}
              href={s.href}
              target={s.internal ? undefined : '_blank'}
              rel={s.internal ? undefined : 'noopener noreferrer'}
              className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-4"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color}`}
              >
                <s.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-gray-900 flex items-center gap-1.5">
                  {s.title}
                  {!s.internal && (
                    <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500" />
                  )}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">{s.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
