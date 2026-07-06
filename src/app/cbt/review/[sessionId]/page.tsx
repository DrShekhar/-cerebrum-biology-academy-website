'use client'

import { use, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, ArrowLeft, Sparkles, TrendingUp, TrendingDown, ListChecks } from 'lucide-react'
import type { CBTReviewItem } from '@/components/cbt/CBTExam'

interface AiFeedback {
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  motivationalMessage: string
}

/**
 * Standalone solutions review for a past CBT attempt (owner-only, completed).
 */
export default function CBTReviewPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params)
  const router = useRouter()
  const [items, setItems] = useState<CBTReviewItem[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [aiFeedback, setAiFeedback] = useState<AiFeedback | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)

  async function getAiFeedback() {
    try {
      setAiLoading(true)
      setAiError(null)
      const res = await fetch(`/api/cbt/session/${sessionId}/ai-feedback`, {
        method: 'POST',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'AI feedback failed')
      setAiFeedback(data.feedback)
    } catch (err) {
      setAiError(err instanceof Error ? err.message : 'AI feedback failed')
    } finally {
      setAiLoading(false)
    }
  }

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/cbt/session/${sessionId}/review`)
      const data = await res.json()
      if (!res.ok || !data.success) {
        setError(data.error || 'Could not load the review.')
        return
      }
      setItems(data.items || [])
    } catch {
      setError('Network error.')
    } finally {
      setLoading(false)
    }
  }, [sessionId])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="mx-auto max-w-3xl p-6">
      <button
        onClick={() => router.push('/cbt')}
        className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back to CBT
      </button>
      <h1 className="text-2xl font-bold text-gray-900">Solutions review</h1>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-500">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading…
        </div>
      ) : error ? (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
          {error}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {/* AI Coach feedback (W2: the ai/test engine's analysis, on the live CBT platform) */}
          <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-5">
            {!aiFeedback ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 font-semibold text-indigo-900">
                    <Sparkles className="h-4 w-4 text-indigo-600" /> AI Coach Feedback
                  </div>
                  <p className="mt-0.5 text-sm text-indigo-700/80">
                    Personalized strengths, weak areas, and a study plan for this attempt.
                  </p>
                  {aiError && <p className="mt-1 text-sm text-red-600">{aiError}</p>}
                </div>
                <button
                  onClick={getAiFeedback}
                  disabled={aiLoading}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
                >
                  {aiLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {aiLoading ? 'Analyzing…' : 'Get AI feedback'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-semibold text-indigo-900">
                  <Sparkles className="h-4 w-4 text-indigo-600" /> AI Coach Feedback
                </div>
                <p className="text-sm italic text-indigo-800">{aiFeedback.motivationalMessage}</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-green-700">
                      <TrendingUp className="h-3.5 w-3.5" /> Strengths
                    </div>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {aiFeedback.strengths.map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
                      <TrendingDown className="h-3.5 w-3.5" /> Work on
                    </div>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {aiFeedback.weaknesses.map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                    <ListChecks className="h-3.5 w-3.5" /> Study plan
                  </div>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {aiFeedback.recommendations.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {(items || []).map((item, i) => (
            <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-500">
                  Q{i + 1} · {item.subject}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 font-medium ${
                    item.isCorrect
                      ? 'bg-green-100 text-green-700'
                      : item.yourAnswer
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {item.isCorrect ? 'Correct' : item.yourAnswer ? 'Incorrect' : 'Unattempted'}
                </span>
              </div>
              <p className="text-sm text-gray-900">{item.questionText}</p>
              <div className="mt-3 space-y-1.5">
                {item.options.map((opt) => {
                  const isCorrect = opt.id === item.correctAnswer
                  const isYours = opt.id === item.yourAnswer
                  return (
                    <div
                      key={opt.id}
                      className={`rounded-md border px-3 py-2 text-sm ${
                        isCorrect
                          ? 'border-green-500 bg-green-50 text-green-900'
                          : isYours
                            ? 'border-red-400 bg-red-50 text-red-900'
                            : 'border-gray-200 text-gray-700'
                      }`}
                    >
                      <span className="font-medium">{opt.id}.</span> {opt.text}
                      {isCorrect && <span className="ml-2 text-xs font-semibold">✓ correct</span>}
                      {isYours && !isCorrect && (
                        <span className="ml-2 text-xs font-semibold">your answer</span>
                      )}
                    </div>
                  )
                })}
              </div>
              {item.explanation && (
                <div className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">Explanation: </span>
                  {item.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
