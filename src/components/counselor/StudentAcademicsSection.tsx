'use client'

import { useEffect, useState } from 'react'
import {
  GraduationCap,
  TrendingUp,
  ClipboardList,
  Calendar,
  Clock,
  MessageSquare,
  BookOpen,
  Loader2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'

/**
 * Staff-side academic snapshot of a student (roadmap P3).
 * Used on the counselor lead detail page (leadId mode — resolves the linked
 * student account server-side) and the admin student drill-down (userId mode).
 * Data: GET /api/counselor/students/[id]/academics
 */

interface AcademicsData {
  lead: { id: string; studentName: string } | null
  linkedStudent?: { id: string } | null
  student?: {
    id: string
    name: string
    email: string
    phone: string | null
    gradeLabel: string | null
    courseNames: string[]
    coachingTier: string
    trialDaysRemaining: number
    joinedAt: string | null
  }
  enrollments?: {
    id: string
    courseName: string
    status: string
    enrolledAt: string
    progress: number
    totalFees: number
    paidAmount: number
    pendingAmount: number
  }[]
  tests?: {
    completed: number
    averagePercentage: number
    bestPercentage: number
    recent: {
      id: string
      title: string
      score: number
      totalMarks: number
      percentage: number
      date: string
    }[]
  }
  homework?: {
    graded: number
    pending: number
    submitted: number
    recentFeedback: {
      id: string
      assignmentTitle: string
      grade: number | null
      maxMarks: number
      feedback: string | null
      gradedAt: string | null
    }[]
  }
  attendance?: {
    recorded: number
    rate: number | null
    recent: { id: string; status: string; date: string; sessionTitle: string }[]
  }
  lastActive?: { latest: string | null }
  payments?: {
    totalPaid: number
    totalPending: number
    recent: {
      id: string
      amount: number
      status: string
      date: string
      courseName: string | null
    }[]
  }
}

function pctColor(p: number) {
  return p >= 70 ? 'text-green-600' : p >= 40 ? 'text-yellow-600' : 'text-red-500'
}

function inr(n: number) {
  return `₹${Number(n || 0).toLocaleString('en-IN')}`
}

export function StudentAcademicsSection({
  leadId,
  userId,
  defaultExpanded = true,
}: {
  leadId?: string
  userId?: string
  defaultExpanded?: boolean
}) {
  const [data, setData] = useState<AcademicsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(defaultExpanded)

  useEffect(() => {
    const id = leadId || userId
    if (!id) return
    const url = leadId
      ? `/api/counselor/students/${leadId}/academics?from=lead`
      : `/api/counselor/students/${userId}/academics`
    let cancelled = false
    setLoading(true)
    fetch(url, { credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.json()).error || 'Failed to load academics')
        return res.json()
      })
      .then((json) => {
        if (!cancelled) {
          setData(json.data)
          setError(null)
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load academics')
      })
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [leadId, userId])

  const student = data?.student

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <GraduationCap className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Academics</h3>
          {student && (
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
              {student.gradeLabel || student.coachingTier}
            </span>
          )}
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {expanded && (
        <div className="px-5 pb-5">
          {loading ? (
            <div className="flex items-center justify-center py-8 text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading academics…
            </div>
          ) : error ? (
            <p className="text-sm text-red-600 py-4">{error}</p>
          ) : data && !student ? (
            <div className="text-center py-6">
              <p className="text-sm text-gray-600 font-medium">No linked student account yet</p>
              <p className="text-xs text-gray-400 mt-1">
                Academic data appears here once this lead signs up or is converted to a student
                account (matched by email / phone).
              </p>
            </div>
          ) : student ? (
            <div className="space-y-5">
              {/* Identity strip */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                <span className="font-medium text-gray-900">{student.name}</span>
                {student.gradeLabel && (
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> {student.gradeLabel}
                  </span>
                )}
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  {student.coachingTier}
                </span>
                {data?.lastActive?.latest && (
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" /> Last active{' '}
                    {formatDistanceToNow(new Date(data.lastActive.latest), { addSuffix: true })}
                  </span>
                )}
              </div>

              {/* Stat tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-indigo-50 rounded-lg p-3">
                  <TrendingUp className="w-4 h-4 text-indigo-600 mb-1" />
                  <p
                    className={`text-xl font-bold ${pctColor(data?.tests?.averagePercentage || 0)}`}
                  >
                    {data?.tests?.completed ? `${data.tests.averagePercentage}%` : '—'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Avg score ({data?.tests?.completed || 0} tests)
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <ClipboardList className="w-4 h-4 text-green-600 mb-1" />
                  <p className="text-xl font-bold text-gray-900">{data?.homework?.graded || 0}</p>
                  <p className="text-xs text-gray-500">
                    Homework graded · {data?.homework?.pending || 0} pending
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <Calendar className="w-4 h-4 text-purple-700 mb-1" />
                  <p className="text-xl font-bold text-gray-900">
                    {data?.attendance?.rate != null ? `${data.attendance.rate}%` : '—'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Attendance ({data?.attendance?.recorded || 0} classes)
                  </p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3">
                  <BookOpen className="w-4 h-4 text-yellow-800 mb-1" />
                  <p className="text-xl font-bold text-gray-900">
                    {data?.enrollments?.length || 0}
                  </p>
                  <p className="text-xs text-gray-500">Enrollments</p>
                </div>
              </div>

              {/* Recent test scores */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Recent test scores
                </h4>
                {data?.tests?.recent?.length ? (
                  <div className="space-y-1.5">
                    {data.tests.recent.slice(0, 6).map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-gray-900 truncate">{t.title}</p>
                          <p className="text-xs text-gray-400">
                            {format(new Date(t.date), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <div className="text-right ml-3">
                          <p className={`font-semibold ${pctColor(t.percentage)}`}>
                            {t.percentage}%
                          </p>
                          <p className="text-xs text-gray-400">
                            {t.score}/{t.totalMarks}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No completed tests yet</p>
                )}
              </div>

              {/* Teacher feedback */}
              {data?.homework?.recentFeedback && data.homework.recentFeedback.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Latest teacher feedback
                  </h4>
                  <div className="space-y-2">
                    {data.homework.recentFeedback.map((f) => (
                      <div
                        key={f.id}
                        className="border-l-4 border-l-indigo-400 bg-indigo-50/50 rounded-r-lg p-3"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {f.assignmentTitle}
                          </p>
                          <span className="text-xs font-semibold text-indigo-700 whitespace-nowrap">
                            {f.grade != null ? `${f.grade}/${f.maxMarks}` : ''}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 italic flex items-start gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-indigo-400" />
                          <span>&ldquo;{f.feedback}&rdquo;</span>
                        </p>
                        {f.gradedAt && (
                          <p className="text-xs text-gray-400 mt-1">
                            {format(new Date(f.gradedAt), 'MMM d, yyyy')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Enrollments */}
              {data?.enrollments && data.enrollments.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Enrollments
                  </h4>
                  <div className="space-y-1.5">
                    {data.enrollments.map((e) => (
                      <div
                        key={e.id}
                        className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-gray-900 truncate">{e.courseName}</p>
                          <p className="text-xs text-gray-400">
                            Since {format(new Date(e.enrolledAt), 'MMM yyyy')} · Paid{' '}
                            {inr(e.paidAmount)}
                            {e.pendingAmount > 0 && ` · Due ${inr(e.pendingAmount)}`}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ml-3 ${
                            e.status === 'ACTIVE'
                              ? 'bg-green-100 text-green-700'
                              : e.status === 'PENDING'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {e.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
