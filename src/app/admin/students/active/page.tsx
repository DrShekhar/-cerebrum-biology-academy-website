'use client'

// Active students — REAL data from enrollments + test_attempts + attendance +
// payments via /api/admin/students/active. This page previously rendered a
// hardcoded mock array (fake schools, scores, parent-satisfaction ratings)
// with no fetch at all.

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, Search, Calendar, Mail, Phone, Activity, Loader2 } from 'lucide-react'

interface ActiveStudent {
  id: string
  name: string
  email: string
  phone: string
  coursesEnrolled: string[]
  joiningDate: string
  lastActivity: string | null
  averageScore: number | null
  testsTaken: number
  attendanceRate: number | null
  totalPayments: number
}

function formatCurrency(paise: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(paise / 100)
}

function daysAgo(iso: string | null) {
  if (!iso) return '—'
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / (24 * 60 * 60 * 1000))
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days} days ago`
}

export default function ActiveStudentsPage() {
  const [students, setStudents] = useState<ActiveStudent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [courseFilter, setCourseFilter] = useState('all')

  useEffect(() => {
    fetch('/api/admin/students/active', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setStudents(data.students || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const allCourses = [...new Set(students.flatMap((s) => s.coursesEnrolled))].sort()

  const filtered = students.filter((s) => {
    const q = searchTerm.toLowerCase()
    const matchesSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.phone.includes(q)
    const matchesCourse = courseFilter === 'all' || s.coursesEnrolled.includes(courseFilter)
    return matchesSearch && matchesCourse
  })

  const stats = [
    {
      label: 'Active Students',
      value: students.length,
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Avg Test Score',
      value: (() => {
        const scored = students.filter((s) => s.averageScore != null)
        return scored.length
          ? `${Math.round(scored.reduce((a, s) => a + (s.averageScore || 0), 0) / scored.length)}%`
          : '—'
      })(),
      icon: Activity,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Active This Week',
      value: students.filter(
        (s) =>
          s.lastActivity &&
          Date.now() - new Date(s.lastActivity).getTime() < 7 * 24 * 60 * 60 * 1000
      ).length,
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600',
    },
  ]

  return (
    <>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Active Students</h1>
          <p className="text-gray-600 mt-1">
            Students with an ACTIVE enrollment — scores, attendance, and payments are live data
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white p-5 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{s.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-0.5">
                    {loading ? '…' : s.value}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
                  <s.icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, or phone…"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-sm"
          >
            <option value="all">All courses</option>
            {allCourses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-16 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto" />
            </div>
          ) : error ? (
            <div className="p-16 text-center text-gray-500">Failed to load students.</div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center text-gray-400">
              <Users className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              {students.length === 0
                ? 'No students with active enrollments yet.'
                : 'No students match the current filters.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-5 py-3">Student</th>
                    <th className="px-5 py-3">Courses</th>
                    <th className="px-5 py-3">Joined</th>
                    <th className="px-5 py-3">Last Active</th>
                    <th className="px-5 py-3">Avg Score</th>
                    <th className="px-5 py-3">Attendance</th>
                    <th className="px-5 py-3">Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3.5">
                        <Link
                          href={`/admin/students/${s.id}`}
                          className="font-medium text-gray-900 hover:text-blue-600"
                        >
                          {s.name}
                        </Link>
                        <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                          {s.email && (
                            <span className="inline-flex items-center gap-1">
                              <Mail className="w-3 h-3" /> {s.email}
                            </span>
                          )}
                          {s.phone && (
                            <span className="inline-flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {s.phone}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {s.coursesEnrolled.map((c) => (
                            <span
                              key={c}
                              className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">
                        {new Date(s.joiningDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">{daysAgo(s.lastActivity)}</td>
                      <td className="px-5 py-3.5">
                        {s.averageScore != null ? (
                          <span
                            className={`font-medium ${
                              s.averageScore >= 70
                                ? 'text-green-600'
                                : s.averageScore >= 40
                                  ? 'text-amber-600'
                                  : 'text-red-500'
                            }`}
                          >
                            {s.averageScore}%
                            <span className="text-xs text-gray-400 font-normal">
                              {' '}
                              ({s.testsTaken} tests)
                            </span>
                          </span>
                        ) : (
                          <span className="text-gray-300">No tests yet</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        {s.attendanceRate != null ? (
                          <span className="font-medium text-gray-700">{s.attendanceRate}%</span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 font-medium text-gray-900">
                        {s.totalPayments ? formatCurrency(s.totalPayments) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
