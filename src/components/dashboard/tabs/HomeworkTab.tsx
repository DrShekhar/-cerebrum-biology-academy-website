'use client'

// Homework tab (roadmap P1): assignments (with grades + teacher feedback,
// now returned by the list API) + worksheets, in one place.

import React, { useState, useEffect } from 'react'
import { BookOpenCheck, FileText, LogIn } from 'lucide-react'
import Link from 'next/link'
import { AssignmentList } from '@/components/student/AssignmentList'
import WorksheetList from '@/components/worksheets/WorksheetList'

type AssignmentItem = React.ComponentProps<typeof AssignmentList>['assignments'][number]

interface AssignmentStats {
  totalAssignments: number
  pendingSubmissions: number
  submittedAssignments: number
  gradedAssignments: number
  averageGrade: number | null
}

export function HomeworkTab() {
  const [assignments, setAssignments] = useState<AssignmentItem[]>([])
  const [stats, setStats] = useState<AssignmentStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [unauthorized, setUnauthorized] = useState(false)

  useEffect(() => {
    fetch('/api/student/assignments', { credentials: 'include' })
      .then((r) => {
        if (r.status === 401 || r.status === 403) {
          setUnauthorized(true)
          return null
        }
        return r.ok ? r.json() : null
      })
      .then((d) => {
        if (d?.success) {
          setAssignments(d.assignments ?? [])
          setStats(d.stats ?? null)
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  if (unauthorized) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center">
        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <LogIn className="w-7 h-7 text-blue-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Sign in as a student</h3>
        <p className="text-sm text-gray-600">
          Homework is available for enrolled student accounts.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats strip */}
      {stats && stats.totalAssignments > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">
              {stats.totalAssignments}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">Assignments</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">
              {stats.pendingSubmissions}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">Pending</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              {stats.gradedAssignments}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">Graded</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
            <div className="text-xl sm:text-2xl font-bold text-purple-700">
              {stats.averageGrade !== null ? Math.round(stats.averageGrade * 10) / 10 : '—'}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">Avg Grade</div>
          </div>
        </div>
      )}

      {/* Assignments */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpenCheck className="w-5 h-5 text-blue-600" />
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Assignments</h3>
          </div>
          <Link
            href="/student/assignments"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all
          </Link>
        </div>
        <AssignmentList assignments={assignments} loading={isLoading} />
      </div>

      {/* Worksheets */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-purple-700" />
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Worksheets</h3>
        </div>
        <WorksheetList />
      </div>
    </div>
  )
}
