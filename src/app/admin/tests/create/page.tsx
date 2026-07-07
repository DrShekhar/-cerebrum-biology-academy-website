'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Copy, ArrowLeft, Loader2, Info } from 'lucide-react'
import { showToast } from '@/lib/toast'

interface Template {
  id: string
  title: string
  category: string
  difficulty: string
  totalQuestions: number
}

/**
 * Honest create flow: a from-scratch test builder doesn't exist yet, but
 * duplicating an existing template DOES (real API) — so that's the primary
 * action here instead of a "coming soon" dead end.
 */
export default function CreateTestPage() {
  const router = useRouter()
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [duplicating, setDuplicating] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/tests')
      .then((r) => r.json())
      // /api/admin/tests returns { tests, stats } (no envelope)
      .then((json) => setTemplates(json.tests || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const duplicate = async (id: string) => {
    setDuplicating(id)
    try {
      const res = await fetch(`/api/admin/tests/${id}/duplicate`, { method: 'POST' })
      const json = await res.json()
      if (json.success) {
        showToast.success('Template duplicated — it starts unpublished, edit then publish')
        router.push('/admin/tests')
      } else {
        showToast.error(json.error || 'Failed to duplicate')
      }
    } catch {
      showToast.error('Failed to duplicate')
    } finally {
      setDuplicating(null)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link
        href="/admin/tests"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tests
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Test Template</h1>
      <p className="text-gray-600 mb-6">
        Start from an existing template — duplicate it, then adjust it before publishing.
      </p>

      <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-6 text-sm text-blue-900">
        <Info className="w-4 h-4 mt-0.5 shrink-0" />
        <span>
          A from-scratch test builder isn&apos;t available yet. Duplicating gives you a working copy
          (unpublished) with all questions attached. Bulk question import runs via the seed scripts
          (<code>prisma/seed-mcq-batches.ts</code>).
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center py-12 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : templates.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">No templates exist yet to duplicate.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {templates.map((t) => (
            <div key={t.id} className="flex items-center justify-between px-4 py-3">
              <div className="min-w-0">
                <p className="font-medium text-gray-900 truncate">{t.title}</p>
                <p className="text-xs text-gray-500">
                  {t.category} · {t.difficulty} · {t.totalQuestions} questions
                </p>
              </div>
              <button
                onClick={() => void duplicate(t.id)}
                disabled={duplicating !== null}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 shrink-0"
              >
                {duplicating === t.id ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                Duplicate
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
