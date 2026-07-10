'use client'

/**
 * Article lesson reader — renders an ARTICLE study material's markdown with
 * comfortable reading typography and a mark-complete action. Entitlement is
 * enforced by the API (same gates as material downloads).
 */

import { use, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { MarkdownWithDiagrams } from '@/components/diagrams/MarkdownWithDiagrams'
import { ArrowLeft, BookOpen, CheckCircle2, Loader2, Lock } from 'lucide-react'

interface ArticleData {
  id: string
  title: string
  contentBody: string
  courseName: string | null
  courseId: string | null
}

export default function ArticleLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [article, setArticle] = useState<ArticleData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [upgradeUrl, setUpgradeUrl] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/student/materials/${id}/article`)
      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.error || 'Could not load this lesson')
        if (json.upgradeUrl) setUpgradeUrl(json.upgradeUrl)
        return
      }
      setArticle(json.data)
    } catch {
      setError('Network error — please try again')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  const markComplete = async () => {
    if (saving || done) return
    setSaving(true)
    try {
      const res = await fetch(`/api/student/materials/${id}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      })
      if (res.ok) setDone(true)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-500">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading lesson…
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <Lock className="mx-auto mb-3 h-10 w-10 text-gray-300" />
        <h1 className="text-xl font-bold text-gray-900">Can&apos;t open this lesson</h1>
        <p className="mt-2 text-gray-600">{error}</p>
        <div className="mt-4 flex justify-center gap-3">
          <Link
            href="/student/courses"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            My courses
          </Link>
          {upgradeUrl && (
            <Link
              href={upgradeUrl}
              className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
            >
              View plans
            </Link>
          )}
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link
          href={article.courseId ? `/student/courses/${article.courseId}` : '/student/courses'}
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" /> Back to course
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-10">
          <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-green-700">
            <BookOpen className="h-3.5 w-3.5" />
            {article.courseName || 'Lesson'}
          </p>
          <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>

          <article className="prose prose-gray mt-6 max-w-none prose-headings:font-bold prose-a:text-green-700">
            <MarkdownWithDiagrams>{article.contentBody}</MarkdownWithDiagrams>
          </article>

          <div className="mt-10 border-t border-gray-100 pt-6">
            <button
              onClick={markComplete}
              disabled={saving || done}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold ${
                done
                  ? 'bg-green-100 text-green-700'
                  : 'bg-green-600 text-white hover:bg-green-700 disabled:opacity-60'
              }`}
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              {done ? 'Completed' : 'Mark as complete'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
