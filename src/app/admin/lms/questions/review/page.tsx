'use client'

/**
 * Admin/Teacher LMS — AI Question Review.
 *
 * AI-generated questions are persisted as isVerified=false. This queue lets a
 * teacher approve (verify), edit, or reject them before they're trusted as
 * canonical bank content.
 */

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2, Check, Trash2, Pencil, X, Sparkles } from 'lucide-react'
import { showToast } from '@/lib/toast'

interface Question {
  id: string
  question: string
  options: string[] | null
  correctAnswer: string
  explanation: string | null
  topic: string
  type: string
  grade: string
  curriculum: string
  source: string | null
  isVerified: boolean
}

export default function QuestionReviewPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [pendingCount, setPendingCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<{ question: string; correctAnswer: string; explanation: string }>(
    { question: '', correctAnswer: '', explanation: '' }
  )

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/lms/questions?source=AI_GENERATED&isVerified=false&limit=100')
      const j = await r.json()
      if (j?.success) {
        setQuestions(
          (j.questions as any[]).map((q) => ({
            ...q,
            options: Array.isArray(q.options) ? q.options : [],
          }))
        )
        setPendingCount(j.pendingCount ?? 0)
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function approve(id: string) {
    const r = await fetch(`/api/admin/lms/questions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ verify: true }),
    })
    const j = await r.json()
    if (j?.success) {
      setQuestions((p) => p.filter((q) => q.id !== id))
      setPendingCount((c) => Math.max(0, c - 1))
      showToast.success('Question approved')
    } else showToast.error(j?.error || 'Could not approve')
  }

  async function reject(id: string) {
    if (!window.confirm('Delete this AI-generated question? This cannot be undone.')) return
    const r = await fetch(`/api/admin/lms/questions/${id}`, { method: 'DELETE' })
    const j = await r.json()
    if (j?.success) {
      setQuestions((p) => p.filter((q) => q.id !== id))
      setPendingCount((c) => Math.max(0, c - 1))
    } else showToast.error(j?.error || 'Could not delete')
  }

  function startEdit(q: Question) {
    setEditingId(q.id)
    setDraft({
      question: q.question,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || '',
    })
  }

  async function saveEdit(id: string) {
    const r = await fetch(`/api/admin/lms/questions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draft),
    })
    const j = await r.json()
    if (j?.success) {
      setQuestions((p) =>
        p.map((q) => (q.id === id ? { ...q, ...draft, explanation: draft.explanation || null } : q))
      )
      setEditingId(null)
      showToast.success('Saved')
    } else showToast.error(j?.error || 'Could not save')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin/lms/materials"
          className="mb-3 inline-block text-sm font-medium text-gray-500 hover:text-blue-700"
        >
          ← LMS
        </Link>
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Question Review</h1>
        </div>
        <p className="mb-6 text-gray-600">
          {pendingCount} AI-generated question{pendingCount === 1 ? '' : 's'} awaiting review. Approve
          to mark verified, edit to fix, or delete to reject.
        </p>

        {loading ? (
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-600" />
        ) : questions.length === 0 ? (
          <p className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
            Nothing to review — all AI-generated questions have been handled.
          </p>
        ) : (
          <div className="space-y-4">
            {questions.map((q) => (
              <div key={q.id} className="rounded-lg border border-gray-200 bg-white p-5">
                <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                  <span className="rounded bg-purple-100 px-2 py-0.5 font-medium text-purple-700">
                    AI
                  </span>
                  <span>{q.topic}</span>
                  <span>·</span>
                  <span>{q.grade}</span>
                </div>

                {editingId === q.id ? (
                  <div className="space-y-3">
                    <textarea
                      value={draft.question}
                      onChange={(e) => setDraft((d) => ({ ...d, question: e.target.value }))}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      rows={2}
                    />
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-600">
                        Correct answer
                      </label>
                      <select
                        value={draft.correctAnswer}
                        onChange={(e) => setDraft((d) => ({ ...d, correctAnswer: e.target.value }))}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      >
                        {(q.options || []).map((o, i) => (
                          <option key={i} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                    <textarea
                      value={draft.explanation}
                      onChange={(e) => setDraft((d) => ({ ...d, explanation: e.target.value }))}
                      placeholder="Explanation"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(q.id)}
                        className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        <Check className="h-4 w-4" /> Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200"
                      >
                        <X className="h-4 w-4" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="mb-3 font-medium text-gray-900">{q.question}</p>
                    <ul className="mb-3 space-y-1">
                      {(q.options || []).map((o, i) => (
                        <li
                          key={i}
                          className={
                            o === q.correctAnswer
                              ? 'rounded bg-green-50 px-2 py-1 text-sm font-medium text-green-800'
                              : 'px-2 py-1 text-sm text-gray-700'
                          }
                        >
                          {o === q.correctAnswer ? '✓ ' : ''}
                          {o}
                        </li>
                      ))}
                    </ul>
                    {q.explanation && (
                      <p className="mb-3 text-sm text-gray-600">
                        <span className="font-medium">Why: </span>
                        {q.explanation}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => approve(q.id)}
                        className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-700"
                      >
                        <Check className="h-4 w-4" /> Approve
                      </button>
                      <button
                        onClick={() => startEdit(q)}
                        className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200"
                      >
                        <Pencil className="h-4 w-4" /> Edit
                      </button>
                      <button
                        onClick={() => reject(q.id)}
                        className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" /> Reject
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
