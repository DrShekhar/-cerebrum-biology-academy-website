'use client'

// Test-assignment detail: header info, submission stats, per-student results,
// and result release. This page was missing — the list page's "View" button
// 404'd, and the two data endpoints below sat built-but-unused.

import React, { useState, useEffect, useCallback, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Clock,
  Users,
  CheckCircle,
  FileText,
  Loader2,
  Send,
  AlertTriangle,
  Eye,
  Pencil,
  Save,
  X,
} from 'lucide-react'
import { showToast } from '@/lib/toast'

interface SubmissionRow {
  id: string
  student: { id: string; name: string | null; email: string | null } | null
  status: string
  submittedAt: string | null
  timeSpent: number | null
  totalScore: number | null
  percentage: number | null
  questionsAttempted: number | null
  questionsCorrect: number | null
  questionsWrong: number | null
  tabSwitchCount: number | null
  isGraded: boolean
  teacherFeedback?: string | null
}

interface Stats {
  total: number
  notStarted: number
  inProgress: number
  submitted: number
  graded: number
}

interface AssignmentInfo {
  id: string
  title: string
  description?: string | null
  status?: string
  totalMarks?: number | null
  duration?: number | null
  scheduledAt?: string | null
  dueAt?: string | null
}

const STATUS_BADGE: Record<string, string> = {
  NOT_STARTED: 'bg-gray-100 text-gray-600',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  SUBMITTED: 'bg-amber-100 text-amber-700',
  GRADED: 'bg-green-100 text-green-700',
}

export default function TestAssignmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [assignment, setAssignment] = useState<AssignmentInfo | null>(null)
  const [submissions, setSubmissions] = useState<SubmissionRow[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [releasing, setReleasing] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  // Inline score/feedback editor (P2 endpoint UI)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editScore, setEditScore] = useState('')
  const [editFeedback, setEditFeedback] = useState('')
  const [savingEdit, setSavingEdit] = useState(false)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const [aRes, sRes] = await Promise.all([
        fetch(`/api/teacher/test-assignments/${id}`, { credentials: 'include' }),
        fetch(
          `/api/teacher/test-assignments/${id}/submissions${statusFilter !== 'all' ? `?status=${statusFilter}` : ''}`,
          { credentials: 'include' }
        ),
      ])
      if (aRes.status === 401 || aRes.status === 403) {
        router.replace('/teacher')
        return
      }
      if (aRes.ok) {
        const data = await aRes.json()
        setAssignment(data.assignment)
      }
      if (sRes.ok) {
        const data = await sRes.json()
        setSubmissions(data.submissions || [])
        setStats(data.stats || null)
      }
    } catch (err) {
      console.error('Failed to load test assignment:', err)
      showToast.error('Failed to load test assignment')
    } finally {
      setLoading(false)
    }
  }, [id, statusFilter, router])

  useEffect(() => {
    loadData()
  }, [loadData])

  async function handleRelease() {
    if (
      !confirm(
        'Release results to students? All submitted attempts will be marked as graded and visible to students.'
      )
    )
      return
    try {
      setReleasing(true)
      const res = await fetch(`/api/teacher/test-assignments/${id}/release`, {
        method: 'POST',
        credentials: 'include',
      })
      if (!res.ok) throw new Error('release failed')
      showToast.success('Results released to students')
      loadData()
    } catch {
      showToast.error('Failed to release results')
    } finally {
      setReleasing(false)
    }
  }

  function fmtTime(sec: number | null) {
    if (!sec) return '—'
    const m = Math.floor(sec / 60)
    return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`
  }

  function startEdit(s: SubmissionRow) {
    setEditingId(s.id)
    setEditScore(s.totalScore != null ? String(s.totalScore) : '')
    setEditFeedback(s.teacherFeedback || '')
  }

  async function saveEdit(submissionId: string) {
    const parsedScore = editScore.trim() === '' ? undefined : Number(editScore)
    if (parsedScore !== undefined && (Number.isNaN(parsedScore) || parsedScore < 0)) {
      showToast.error('Score must be a non-negative number')
      return
    }
    if (
      parsedScore !== undefined &&
      assignment?.totalMarks != null &&
      parsedScore > assignment.totalMarks
    ) {
      showToast.error(`Score cannot exceed ${assignment.totalMarks} marks`)
      return
    }
    if (parsedScore === undefined && !editFeedback.trim()) {
      showToast.error('Enter a score or feedback to save')
      return
    }
    try {
      setSavingEdit(true)
      const res = await fetch(`/api/teacher/test-assignments/${id}/submissions/${submissionId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(parsedScore !== undefined ? { totalScore: parsedScore } : {}),
          ...(editFeedback.trim() ? { teacherFeedback: editFeedback.trim() } : {}),
        }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || data?.success === false) {
        showToast.error(data?.error || 'Failed to save')
        return
      }
      showToast.success('Score & feedback saved')
      setEditingId(null)
      loadData()
    } catch {
      showToast.error('Failed to save')
    } finally {
      setSavingEdit(false)
    }
  }

  if (loading && !assignment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/teacher/test-assignment"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-3"
          >
            <ArrowLeft className="w-4 h-4" /> Back to test assignments
          </Link>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {assignment?.title || 'Test assignment'}
              </h1>
              {assignment?.description && (
                <p className="text-gray-500 mt-1 max-w-2xl">{assignment.description}</p>
              )}
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                {assignment?.totalMarks != null && (
                  <span className="inline-flex items-center gap-1">
                    <FileText className="w-4 h-4" /> {assignment.totalMarks} marks
                  </span>
                )}
                {assignment?.duration != null && (
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {assignment.duration} min
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={handleRelease}
              disabled={releasing || !stats || stats.submitted === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              title={
                stats && stats.submitted === 0
                  ? 'No submitted attempts awaiting release'
                  : 'Mark all submitted attempts as graded'
              }
            >
              {releasing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Release results
            </button>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {(
              [
                ['Assigned', stats.total, 'text-gray-900'],
                ['Not started', stats.notStarted, 'text-gray-500'],
                ['In progress', stats.inProgress, 'text-blue-600'],
                ['Submitted', stats.submitted, 'text-amber-600'],
                ['Graded', stats.graded, 'text-green-600'],
              ] as const
            ).map(([label, value, color]) => (
              <div key={label} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className={`text-2xl font-bold ${color}`}>{value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Filter */}
        <div className="flex items-center gap-2 mb-4">
          {['all', 'SUBMITTED', 'GRADED', 'IN_PROGRESS', 'NOT_STARTED'].map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                statusFilter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f === 'all' ? 'All' : f.replace(/_/g, ' ').toLowerCase()}
            </button>
          ))}
        </div>

        {/* Submissions table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">%</th>
                  <th className="px-4 py-3">Correct / Wrong</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Flags</th>
                  <th className="px-4 py-3">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {submissions.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-gray-400">
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          <Users className="w-4 h-4" /> No submissions yet
                        </span>
                      )}
                    </td>
                  </tr>
                )}
                {submissions.map((s) => (
                  <React.Fragment key={s.id}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">
                          {s.student?.name || 'Student'}
                        </div>
                        <div className="text-xs text-gray-400">{s.student?.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[s.status] || 'bg-gray-100 text-gray-600'}`}
                        >
                          {s.status.replace(/_/g, ' ').toLowerCase()}
                        </span>
                        {s.isGraded && (
                          <CheckCircle className="inline w-3.5 h-3.5 text-green-500 ml-1.5" />
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {s.totalScore != null ? s.totalScore : '—'}
                      </td>
                      <td className="px-4 py-3">
                        {s.percentage != null ? `${Math.round(s.percentage)}%` : '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {s.questionsCorrect != null ? (
                          <>
                            <span className="text-green-600">{s.questionsCorrect}</span>
                            {' / '}
                            <span className="text-red-500">{s.questionsWrong ?? 0}</span>
                            <span className="text-gray-400"> of {s.questionsAttempted ?? 0}</span>
                          </>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{fmtTime(s.timeSpent)}</td>
                      <td className="px-4 py-3">
                        {s.tabSwitchCount ? (
                          <span
                            className="inline-flex items-center gap-1 text-xs text-amber-600"
                            title="Tab switches during the test"
                          >
                            <AlertTriangle className="w-3.5 h-3.5" /> {s.tabSwitchCount}
                          </span>
                        ) : (
                          <span className="text-gray-300">
                            <Eye className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {s.status === 'SUBMITTED' || s.status === 'GRADED' ? (
                          <button
                            onClick={() => (editingId === s.id ? setEditingId(null) : startEdit(s))}
                            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                            title="Edit score & feedback"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            {editingId === s.id ? 'Close' : 'Edit'}
                          </button>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                    {editingId === s.id && (
                      <tr className="bg-blue-50/40">
                        <td colSpan={8} className="px-4 py-3">
                          <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr_auto_auto] gap-2 items-start">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">
                                Score
                                {assignment?.totalMarks != null
                                  ? ` / ${assignment.totalMarks}`
                                  : ''}
                              </label>
                              <input
                                type="number"
                                min={0}
                                max={assignment?.totalMarks ?? undefined}
                                value={editScore}
                                onChange={(e) => setEditScore(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="—"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">
                                Feedback to student
                              </label>
                              <textarea
                                value={editFeedback}
                                onChange={(e) => setEditFeedback(e.target.value)}
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                                placeholder="What went well, what to improve..."
                              />
                            </div>
                            <button
                              onClick={() => saveEdit(s.id)}
                              disabled={savingEdit}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 sm:mt-5"
                            >
                              {savingEdit ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Save className="w-4 h-4" />
                              )}
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="inline-flex items-center gap-1 px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg text-sm sm:mt-5"
                            >
                              <X className="w-4 h-4" /> Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
