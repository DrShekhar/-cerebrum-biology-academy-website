'use client'

// Assign-material modal (P2 endpoint UI): grants material access to picked
// students, a group, or a whole course via POST /api/admin/materials/assign.
// Used from /admin/lms/materials.

import React, { useState, useEffect, useCallback } from 'react'
import { X, Search, Loader2, Users, UsersRound, BookOpen, CheckCircle } from 'lucide-react'
import { showToast } from '@/lib/toast'

interface StudentRow {
  id: string
  name: string
  email: string | null
  phone: string | null
}

interface CourseRow {
  id: string
  name: string
}

interface GroupRow {
  id: string
  name: string
  memberCount: number
}

interface AssignResult {
  targeted: number
  granted: number
  alreadyHadAccess: number
}

interface AssignMaterialModalProps {
  materialId: string
  materialTitle: string
  onClose: () => void
}

type Mode = 'students' | 'course' | 'group'

export function AssignMaterialModal({
  materialId,
  materialTitle,
  onClose,
}: AssignMaterialModalProps) {
  const [mode, setMode] = useState<Mode>('students')
  const [search, setSearch] = useState('')
  const [students, setStudents] = useState<StudentRow[]>([])
  const [searching, setSearching] = useState(false)
  const [selected, setSelected] = useState<Map<string, StudentRow>>(new Map())
  const [courses, setCourses] = useState<CourseRow[]>([])
  const [courseId, setCourseId] = useState('')
  const [groupId, setGroupId] = useState('')
  const [groups, setGroups] = useState<GroupRow[] | null>(null)
  const [groupsUnavailable, setGroupsUnavailable] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<AssignResult | null>(null)

  const searchStudents = useCallback(async (query: string) => {
    try {
      setSearching(true)
      const params = new URLSearchParams({ role: 'student', limit: '20' })
      if (query) params.set('search', query)
      const res = await fetch(`/api/admin/students?${params}`, { credentials: 'include' })
      const data = await res.json()
      if (data.success && data.data?.students) {
        setStudents(data.data.students)
      }
    } catch {
      // Non-critical — list just stays empty
    } finally {
      setSearching(false)
    }
  }, [])

  // Debounced student search
  useEffect(() => {
    if (mode !== 'students') return
    const t = setTimeout(() => searchStudents(search), 300)
    return () => clearTimeout(t)
  }, [search, mode, searchStudents])

  // Courses for the course mode
  useEffect(() => {
    if (mode !== 'course' || courses.length > 0) return
    fetch('/api/admin/courses?limit=100', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.success && d.data?.courses) setCourses(d.data.courses)
      })
      .catch(() => {})
  }, [mode, courses.length])

  // Groups for the group mode. Falls back to a manual ID input when the
  // groups tables aren't provisioned yet (endpoint returns 400) or the
  // fetch fails.
  useEffect(() => {
    if (mode !== 'group' || groups !== null || groupsUnavailable) return
    fetch('/api/admin/groups', { credentials: 'include' })
      .then((r) => r.json().then((d) => ({ ok: r.ok, d })))
      .then(({ ok, d }) => {
        if (ok && d?.success && Array.isArray(d.groups)) {
          setGroups(d.groups)
        } else {
          setGroupsUnavailable(true)
        }
      })
      .catch(() => setGroupsUnavailable(true))
  }, [mode, groups, groupsUnavailable])

  const toggleStudent = (student: StudentRow) => {
    setSelected((prev) => {
      const next = new Map(prev)
      if (next.has(student.id)) next.delete(student.id)
      else next.set(student.id, student)
      return next
    })
  }

  const canSubmit =
    !submitting &&
    ((mode === 'students' && selected.size > 0) ||
      (mode === 'course' && !!courseId) ||
      (mode === 'group' && groupId.trim().length > 0))

  async function handleAssign() {
    if (!canSubmit) return
    try {
      setSubmitting(true)
      setResult(null)
      const body: Record<string, unknown> = { materialId }
      if (mode === 'students') body.userIds = [...selected.keys()]
      if (mode === 'course') body.courseId = courseId
      if (mode === 'group') body.groupId = groupId.trim()

      const res = await fetch('/api/admin/materials/assign', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok || data?.success === false) {
        showToast.error(data?.error || 'Failed to assign material')
        return
      }
      const summary: AssignResult = {
        targeted: data.targeted ?? data.data?.targeted ?? 0,
        granted: data.granted ?? data.data?.granted ?? 0,
        alreadyHadAccess: data.alreadyHadAccess ?? data.data?.alreadyHadAccess ?? 0,
      }
      setResult(summary)
      showToast.success(`Access granted to ${summary.granted} student(s)`)
    } catch {
      showToast.error('Failed to assign material')
    } finally {
      setSubmitting(false)
    }
  }

  const MODE_TABS: Array<{ id: Mode; label: string; icon: typeof Users }> = [
    { id: 'students', label: 'Students', icon: Users },
    { id: 'course', label: 'Course', icon: BookOpen },
    { id: 'group', label: 'Group', icon: UsersRound },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-gray-200">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-gray-900">Assign Material</h2>
            <p className="text-sm text-gray-500 truncate">{materialTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode tabs */}
        <div className="flex gap-2 px-5 pt-4">
          {MODE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setMode(tab.id)
                setResult(null)
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                mode === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {mode === 'students' && (
            <div>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search students by name, email or phone..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {selected.size > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {[...selected.values()].map((s) => (
                    <span
                      key={s.id}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                    >
                      {s.name}
                      <button
                        onClick={() => toggleStudent(s)}
                        aria-label={`Remove ${s.name}`}
                        className="hover:text-blue-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-64 overflow-y-auto">
                {searching ? (
                  <div className="p-6 text-center text-gray-400">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  </div>
                ) : students.length === 0 ? (
                  <div className="p-6 text-center text-sm text-gray-400">No students found</div>
                ) : (
                  students.map((s) => (
                    <label
                      key={s.id}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selected.has(s.id)}
                        onChange={() => toggleStudent(s)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300"
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-gray-900 truncate">
                          {s.name}
                        </span>
                        <span className="block text-xs text-gray-500 truncate">
                          {s.email || s.phone || ''}
                        </span>
                      </span>
                    </label>
                  ))
                )}
              </div>
            </div>
          )}

          {mode === 'course' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Grant to all students enrolled in
              </label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">Select a course...</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {mode === 'group' && (
            <div>
              {groupsUnavailable ? (
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Group ID</label>
                  <input
                    type="text"
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                    placeholder="Paste a student group ID"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">
                    Could not load the group list (groups may not be provisioned yet) — paste a
                    group ID manually.
                  </p>
                </>
              ) : (
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Grant to all members of
                  </label>
                  <select
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                    disabled={groups === null}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-60"
                  >
                    <option value="">
                      {groups === null
                        ? 'Loading groups...'
                        : groups.length === 0
                          ? 'No groups yet — create one at /admin/groups'
                          : 'Select a group...'}
                    </option>
                    {(groups ?? []).map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name} ({g.memberCount} member{g.memberCount === 1 ? '' : 's'})
                      </option>
                    ))}
                  </select>
                </>
              )}
              <p className="text-xs text-gray-400 mt-1.5">
                All members of the group will receive access to this material.
              </p>
            </div>
          )}

          {result && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                Targeted {result.targeted} student(s) — {result.granted} newly granted,{' '}
                {result.alreadyHadAccess} already had access.
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-5 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium"
          >
            {result ? 'Done' : 'Cancel'}
          </button>
          <button
            onClick={handleAssign}
            disabled={!canSubmit}
            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Assign
          </button>
        </div>
      </div>
    </div>
  )
}
