'use client'

// Teacher worksheet grading (P2 endpoint UI): list worksheets, expand one to
// see submissions, write grade + feedback inline. Grade/feedback saves via
// PATCH /api/teacher/worksheets/[worksheetId]/submissions/[submissionId]/grade.

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ChevronDown, ChevronRight, FileText, Loader2, Save, Users } from 'lucide-react'
import { showToast } from '@/lib/toast'

interface WorksheetRow {
  id: string
  title: string
  description: string | null
  maxMarks: number | null
  difficulty: string | null
  status: string
  dueDate: string | null
  counts: { total: number; submitted: number; graded: number; awaitingGrade: number }
}

interface SubmissionRow {
  id: string
  status: string
  grade: number | null
  feedback: string | null
  isLate: boolean
  submittedAt: string | null
  gradedAt: string | null
  student: { id: string; name: string | null; email: string | null } | null
}

const STATUS_BADGE: Record<string, string> = {
  NOT_STARTED: 'bg-gray-100 text-gray-600',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  SUBMITTED: 'bg-amber-100 text-amber-700',
  GRADED: 'bg-green-100 text-green-700',
}

function GradeEditor({
  worksheetId,
  submission,
  maxMarks,
  onSaved,
}: {
  worksheetId: string
  submission: SubmissionRow
  maxMarks: number | null
  onSaved: () => void
}) {
  const [grade, setGrade] = useState(submission.grade != null ? String(submission.grade) : '')
  const [feedback, setFeedback] = useState(submission.feedback || '')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    const parsedGrade = grade.trim() === '' ? undefined : Number(grade)
    if (parsedGrade !== undefined && (Number.isNaN(parsedGrade) || parsedGrade < 0)) {
      showToast.error('Grade must be a non-negative number')
      return
    }
    if (parsedGrade !== undefined && maxMarks != null && parsedGrade > maxMarks) {
      showToast.error(`Grade cannot exceed ${maxMarks} marks`)
      return
    }
    if (parsedGrade === undefined && !feedback.trim()) {
      showToast.error('Enter a grade or feedback to save')
      return
    }
    try {
      setSaving(true)
      const res = await fetch(
        `/api/teacher/worksheets/${worksheetId}/submissions/${submission.id}/grade`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...(parsedGrade !== undefined ? { grade: parsedGrade } : {}),
            ...(feedback.trim() ? { feedback: feedback.trim() } : {}),
          }),
        }
      )
      const data = await res.json().catch(() => null)
      if (!res.ok || data?.success === false) {
        showToast.error(data?.error || 'Failed to save grade')
        return
      }
      showToast.success('Saved — the student can now see this feedback')
      onSaved()
    } catch {
      showToast.error('Failed to save grade')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mt-3 grid grid-cols-1 sm:grid-cols-[110px_1fr_auto] gap-2 items-start">
      <div>
        <label className="block text-xs text-gray-500 mb-1">
          Grade{maxMarks != null ? ` / ${maxMarks}` : ''}
        </label>
        <input
          type="number"
          min={0}
          max={maxMarks ?? undefined}
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="—"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Feedback to student</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
          placeholder="What went well, what to improve..."
        />
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 sm:mt-5"
      >
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        Save
      </button>
    </div>
  )
}

function WorksheetSubmissions({ worksheet }: { worksheet: WorksheetRow }) {
  const [submissions, setSubmissions] = useState<SubmissionRow[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/teacher/worksheets/${worksheet.id}/submissions`, {
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) setSubmissions(data.submissions || [])
    } catch {
      showToast.error('Failed to load submissions')
    } finally {
      setLoading(false)
    }
  }, [worksheet.id])

  useEffect(() => {
    load()
  }, [load])

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-400">
        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
      </div>
    )
  }

  if (submissions.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-gray-400">
        <Users className="w-4 h-4 inline mr-1.5" />
        No submissions yet
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-100">
      {submissions.map((s) => (
        <div key={s.id} className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-gray-900 text-sm">
              {s.student?.name || 'Student'}
            </span>
            <span className="text-xs text-gray-400">{s.student?.email}</span>
            <span
              className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[s.status] || 'bg-gray-100 text-gray-600'}`}
            >
              {s.status.replace(/_/g, ' ').toLowerCase()}
            </span>
            {s.isLate && (
              <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                late
              </span>
            )}
            {s.submittedAt && (
              <span className="text-xs text-gray-400 ml-auto">
                Submitted{' '}
                {new Date(s.submittedAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                })}
              </span>
            )}
          </div>
          {(s.status === 'SUBMITTED' || s.status === 'GRADED') && (
            <GradeEditor
              worksheetId={worksheet.id}
              submission={s}
              maxMarks={worksheet.maxMarks}
              onSaved={load}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function TeacherWorksheetsPage() {
  const router = useRouter()
  const [worksheets, setWorksheets] = useState<WorksheetRow[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/teacher/worksheets', { credentials: 'include' })
        if (res.status === 401 || res.status === 403) {
          router.replace('/teacher')
          return
        }
        const data = await res.json()
        if (data.success) setWorksheets(data.worksheets || [])
      } catch {
        showToast.error('Failed to load worksheets')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <Link
            href="/teacher"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-3"
          >
            <ArrowLeft className="w-4 h-4" /> Back to teacher dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Worksheet Grading</h1>
          <p className="text-gray-500 mt-1">
            Review submissions and send grades + feedback to students.
          </p>
        </div>

        {worksheets.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
            <FileText className="w-8 h-8 mx-auto mb-3" />
            No worksheets yet
          </div>
        ) : (
          <div className="space-y-3">
            {worksheets.map((w) => {
              const expanded = expandedId === w.id
              return (
                <div
                  key={w.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedId(expanded ? null : w.id)}
                    className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50"
                  >
                    {expanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-900 truncate">{w.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {w.maxMarks != null && `${w.maxMarks} marks • `}
                        {w.counts.total} submission{w.counts.total === 1 ? '' : 's'} •{' '}
                        {w.counts.graded} graded
                      </div>
                    </div>
                    {w.counts.awaitingGrade > 0 && (
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold flex-shrink-0">
                        {w.counts.awaitingGrade} to grade
                      </span>
                    )}
                  </button>
                  {expanded && (
                    <div className="border-t border-gray-100">
                      <WorksheetSubmissions worksheet={w} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
