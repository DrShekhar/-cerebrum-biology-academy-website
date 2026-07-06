'use client'

// Worksheet detail + submission flow. The list page navigated here but the
// page never existed (every click 404'd) while the full-featured
// /api/student/worksheets/[id] route (GET details, POST start/save/submit)
// sat orphaned.

import { useState, useEffect, useCallback, use } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Clock,
  FileText,
  Calendar,
  Loader2,
  Save,
  Send,
  CheckCircle,
  AlertTriangle,
  Paperclip,
  Play,
} from 'lucide-react'
import { showToast } from '@/lib/toast'

interface Submission {
  id: string
  status: string
  answers: unknown
  submittedAt: string | null
  grade: number | null
  feedback: string | null
  isLate: boolean
}

interface Worksheet {
  id: string
  title: string
  description: string | null
  content: unknown
  instructions: string | null
  maxMarks: number | null
  duration: number | null
  difficulty: string | null
  dueDate: string | null
  attachments: unknown
  tags: string[]
  submission: Submission | null
  submissionStatus: string
  isOverdue: boolean
  canSubmit: boolean
}

function extractQuestions(content: unknown): string[] {
  if (!content || typeof content !== 'object') return []
  const c = content as Record<string, unknown>
  const list = Array.isArray(c.questions) ? c.questions : Array.isArray(content) ? content : []
  return (list as unknown[])
    .map((q) => {
      if (typeof q === 'string') return q
      if (q && typeof q === 'object') {
        const qo = q as Record<string, unknown>
        return String(qo.question || qo.text || qo.title || '')
      }
      return ''
    })
    .filter(Boolean)
}

function extractAttachments(attachments: unknown): { name: string; url: string }[] {
  if (!Array.isArray(attachments)) return []
  return attachments
    .map((a) => {
      if (typeof a === 'string') return { name: a.split('/').pop() || 'Attachment', url: a }
      if (a && typeof a === 'object') {
        const ao = a as Record<string, unknown>
        if (typeof ao.url === 'string')
          return { name: String(ao.name || ao.url.split('/').pop() || 'Attachment'), url: ao.url }
      }
      return null
    })
    .filter((a): a is { name: string; url: string } => a !== null)
}

export default function WorksheetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [worksheet, setWorksheet] = useState<Worksheet | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [answerText, setAnswerText] = useState('')
  const [busy, setBusy] = useState<'start' | 'save' | 'submit' | null>(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/student/worksheets/${id}`, { credentials: 'include' })
      if (res.status === 404) {
        setNotFound(true)
        return
      }
      if (!res.ok) throw new Error('load failed')
      const data = await res.json()
      setWorksheet(data.data)
      const saved = data.data?.submission?.answers as Record<string, unknown> | null
      if (saved && typeof saved === 'object' && typeof saved.text === 'string') {
        setAnswerText(saved.text)
      }
    } catch (err) {
      console.error('Failed to load worksheet:', err)
      showToast.error('Failed to load worksheet')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  async function act(action: 'start' | 'save' | 'submit') {
    try {
      setBusy(action)
      const res = await fetch(`/api/student/worksheets/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(
          action === 'start' ? { action } : { action, answers: { text: answerText } }
        ),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'failed')
      if (action === 'start') showToast.success('Worksheet started — good luck!')
      if (action === 'save') showToast.success('Progress saved')
      if (action === 'submit') showToast.success('Worksheet submitted!')
      load()
    } catch (err) {
      showToast.error(err instanceof Error ? err.message : 'Action failed')
    } finally {
      setBusy(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    )
  }

  if (notFound || !worksheet) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Worksheet not available</h1>
        <p className="text-gray-500 mb-6">This worksheet may have been unpublished or removed.</p>
        <Link href="/student/worksheets" className="text-blue-600 hover:underline">
          ← Back to worksheets
        </Link>
      </div>
    )
  }

  const questions = extractQuestions(worksheet.content)
  const attachments = extractAttachments(worksheet.attachments)
  const status = worksheet.submissionStatus
  const graded = worksheet.submission?.grade != null

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <Link
        href="/student/worksheets"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to worksheets
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{worksheet.title}</h1>
            {worksheet.description && <p className="text-gray-500 mt-1">{worksheet.description}</p>}
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              status === 'GRADED' || status === 'SUBMITTED'
                ? 'bg-green-100 text-green-700'
                : status === 'IN_PROGRESS'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600'
            }`}
          >
            {status.replace(/_/g, ' ').toLowerCase()}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
          {worksheet.maxMarks != null && (
            <span className="inline-flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> {worksheet.maxMarks} marks
            </span>
          )}
          {worksheet.duration != null && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {worksheet.duration} min
            </span>
          )}
          {worksheet.dueDate && (
            <span
              className={`inline-flex items-center gap-1.5 ${worksheet.isOverdue ? 'text-red-600' : ''}`}
            >
              <Calendar className="w-4 h-4" /> Due{' '}
              {new Date(worksheet.dueDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
              {worksheet.isOverdue && ' (overdue)'}
            </span>
          )}
          {worksheet.difficulty && (
            <span className="capitalize">{worksheet.difficulty.toLowerCase()}</span>
          )}
        </div>
      </div>

      {/* Graded result */}
      {graded && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-lg font-bold text-green-800">
                Graded: {worksheet.submission?.grade}
                {worksheet.maxMarks != null && ` / ${worksheet.maxMarks}`}
              </div>
              {worksheet.submission?.feedback && (
                <p className="text-sm text-green-700 mt-1">{worksheet.submission.feedback}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {worksheet.instructions && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-amber-800 mb-1.5">Instructions</h2>
          <p className="text-sm text-amber-900 whitespace-pre-wrap">{worksheet.instructions}</p>
        </div>
      )}

      {/* Attachments */}
      {attachments.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Attachments</h2>
          <div className="space-y-2">
            {attachments.map((a, i) => (
              <a
                key={i}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <Paperclip className="w-4 h-4" /> {a.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Questions */}
      {questions.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Questions</h2>
          <ol className="space-y-3 list-decimal list-inside">
            {questions.map((q, i) => (
              <li key={i} className="text-gray-800">
                {q}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Work area */}
      {status === 'NOT_STARTED' && !graded && (
        <button
          onClick={() => act('start')}
          disabled={busy !== null}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {busy === 'start' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          Start worksheet
        </button>
      )}

      {status === 'IN_PROGRESS' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Your answers</h2>
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            rows={10}
            placeholder="Write your answers here (number them to match the questions)…"
            className="w-full border border-gray-300 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {!worksheet.canSubmit && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> The deadline has passed — submission is closed.
            </p>
          )}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => act('save')}
              disabled={busy !== null}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50"
            >
              {busy === 'save' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save progress
            </button>
            <button
              onClick={() => act('submit')}
              disabled={busy !== null || !worksheet.canSubmit || !answerText.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
            >
              {busy === 'submit' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Submit worksheet
            </button>
          </div>
        </div>
      )}

      {status === 'SUBMITTED' && !graded && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
          <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="font-medium text-blue-800">
            Submitted{worksheet.submission?.isLate ? ' (late)' : ''} — awaiting grading
          </p>
          {worksheet.submission?.submittedAt && (
            <p className="text-sm text-blue-600 mt-1">
              {new Date(worksheet.submission.submittedAt).toLocaleString('en-IN')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
