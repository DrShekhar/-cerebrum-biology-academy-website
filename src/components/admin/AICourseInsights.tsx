'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Sparkles, Loader2, AlertCircle } from 'lucide-react'

/**
 * AI Course Insights — a natural-language analytics box for the admin course
 * workspace. The admin asks a question; the API answers over REAL, pre-computed
 * aggregates for this course. No metric is ever fabricated by the model.
 */

const SUGGESTED_QUESTIONS = [
  'Where are students dropping off?',
  'Which lessons have the lowest completion?',
  'How is the enrollment mix looking?',
  'How are students scoring on the tests?',
]

export default function AICourseInsights({ courseId }: { courseId: string }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const ask = async (q?: string) => {
    const query = (q ?? question).trim()
    if (!query || loading) return
    if (q) setQuestion(q)
    setLoading(true)
    setError(null)
    setAnswer(null)
    try {
      const res = await fetch(`/api/admin/courses/${courseId}/insights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setAnswer(json.data.answer)
      } else {
        setError(json.error || 'Could not generate insights.')
      }
    } catch {
      setError('Network error — please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
          <Sparkles className="h-4 w-4 text-purple-700" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">AI Course Insights</h3>
          <p className="text-xs text-gray-500">Ask about progress, drop-off, or test scores</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') ask()
          }}
          placeholder="e.g. Where are students dropping off?"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        <button
          onClick={() => ask()}
          disabled={loading || !question.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {loading ? 'Thinking…' : 'Ask'}
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => ask(q)}
            disabled={loading}
            className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600 transition-colors hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {answer && (
        <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-4">
          <div className="prose prose-sm max-w-none text-gray-800 prose-headings:text-gray-900 prose-strong:text-gray-900 prose-li:my-0.5">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        </div>
      )}

      <p className="mt-3 text-[11px] text-gray-400">
        Answers are generated from your real course data — figures are never fabricated.
      </p>
    </div>
  )
}
