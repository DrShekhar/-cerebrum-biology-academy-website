'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2, BookOpen, Wrench, LayoutGrid } from 'lucide-react'

interface Course {
  id: string
  name: string
  description: string | null
  type: string
  class: string | null
}

/** Teacher course list — entry point to the course builder. */
export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch('/api/teacher/courses')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setCourses(d.courses || [])
        else setError(d.error || 'Failed to load courses')
      })
      .catch(() => setError('Network error'))
      .finally(() => setLoading(false))
  }, [reloadKey])

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
        <BookOpen className="h-6 w-6 text-green-600" /> Courses
      </h1>
      <p className="mt-1 text-sm text-gray-600">
        Open a course in the builder to manage its chapters, topics, drip schedule and
        prerequisites.
      </p>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-500">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading courses…
        </div>
      ) : error ? (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => setReloadKey((k) => k + 1)}
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      ) : courses.length === 0 ? (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-10 text-center">
          <BookOpen className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="font-semibold text-gray-900">No courses assigned to you yet</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
            Once an admin assigns you a course (or creates one for your batch), it will appear here
            ready to build.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {courses.map((c) => (
            <div key={c.id} className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {c.type}
                {c.class ? ` · ${c.class}` : ''}
              </div>
              <h2 className="mt-1 font-bold text-gray-900">{c.name}</h2>
              {c.description && (
                <p className="mt-1 line-clamp-2 text-sm text-gray-600">{c.description}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={`/teacher/courses/${c.id}/builder`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
                >
                  <Wrench className="h-4 w-4" /> Open builder
                </Link>
                <Link
                  href={`/teacher/courses/${c.id}/activity`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <LayoutGrid className="h-4 w-4" /> Activity
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
