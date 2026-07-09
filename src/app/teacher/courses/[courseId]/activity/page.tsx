'use client'

/**
 * Teacher Activity Matrix — students × lessons grid for a course.
 * Rows = enrolled students, columns = published lessons (grouped by chapter).
 * Each cell: done (green ✓) / in-progress (amber %) / untouched (gray ·).
 * Answers "who's stuck where".
 */

import { use, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Loader2, LayoutGrid } from 'lucide-react'

type CellStatus = 'done' | 'progress' | 'none'

interface Student {
  id: string
  name: string
}
interface Lesson {
  id: string
  title: string
  chapterTitle: string
  type: string
}
interface ActivityData {
  course: { id: string; name: string }
  students: Student[]
  lessons: Lesson[]
  cells: Record<string, { status: CellStatus; percent?: number }>
  truncated: boolean
}

/** Contiguous chapter groups over the ordered lessons, for the grouped header row. */
function chapterGroups(lessons: Lesson[]): { title: string; span: number }[] {
  const groups: { title: string; span: number }[] = []
  for (const l of lessons) {
    const last = groups[groups.length - 1]
    if (last && last.title === l.chapterTitle) last.span += 1
    else groups.push({ title: l.chapterTitle, span: 1 })
  }
  return groups
}

export default function ActivityMatrixPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params)
  const [data, setData] = useState<ActivityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`/api/teacher/courses/${courseId}/activity`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setData(d.data)
        else setError(d.error || 'Failed to load activity')
      })
      .catch(() => setError('Network error'))
      .finally(() => setLoading(false))
  }, [courseId, reloadKey])

  const groups = useMemo(() => (data ? chapterGroups(data.lessons) : []), [data])

  // Per-student done count (client-side from cells).
  const doneCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    if (!data) return counts
    for (const s of data.students) {
      let n = 0
      for (const l of data.lessons) {
        if (data.cells[`${s.id}:${l.id}`]?.status === 'done') n += 1
      }
      counts[s.id] = n
    }
    return counts
  }, [data])

  return (
    <div className="mx-auto max-w-full p-6">
      <Link
        href="/teacher/courses"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800"
      >
        <ArrowLeft className="h-4 w-4" /> Back to courses
      </Link>

      <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
        <LayoutGrid className="h-6 w-6 text-green-600" /> Activity Matrix
      </h1>
      <p className="mt-1 text-sm text-gray-600">
        {data?.course?.name
          ? `${data.course.name} — who has completed which lesson.`
          : 'Who has completed which lesson.'}
      </p>

      {/* Legend */}
      {data && (
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-600">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded bg-green-500" /> Done
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded bg-amber-400" /> In progress
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded bg-gray-200" /> Untouched
          </span>
        </div>
      )}

      {loading ? (
        <MatrixSkeleton />
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
      ) : !data || data.students.length === 0 ? (
        <EmptyState
          title="No active enrollments"
          body="Once students are enrolled and active in this course, their lesson activity will appear here."
        />
      ) : data.lessons.length === 0 ? (
        <EmptyState
          title="No published lessons"
          body="Publish study materials in this course to start tracking student activity against them."
        />
      ) : (
        <div className="mt-5">
          {data.truncated && (
            <p className="mb-2 text-xs text-amber-700">
              Showing the first {data.students.length} students.
            </p>
          )}
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="border-separate border-spacing-0 text-sm">
              <thead>
                {/* Chapter group row */}
                <tr>
                  <th
                    rowSpan={2}
                    className="sticky left-0 top-0 z-30 min-w-[180px] border-b border-r border-gray-200 bg-gray-50 px-3 py-2 text-left font-semibold text-gray-700"
                  >
                    Student
                  </th>
                  {groups.map((g, i) => (
                    <th
                      key={`${g.title}-${i}`}
                      colSpan={g.span}
                      className="sticky top-0 z-20 border-b border-r border-gray-200 bg-gray-100 px-2 py-1.5 text-center text-xs font-semibold text-gray-600"
                    >
                      {g.title}
                    </th>
                  ))}
                  <th
                    rowSpan={2}
                    className="sticky top-0 z-20 min-w-[70px] border-b border-l border-gray-200 bg-gray-50 px-3 py-2 text-center font-semibold text-gray-700"
                  >
                    Done
                  </th>
                </tr>
                {/* Lesson title row */}
                <tr>
                  {data.lessons.map((l) => (
                    <th
                      key={l.id}
                      title={`${l.title} (${l.type})`}
                      className="sticky top-[33px] z-20 h-32 min-w-[36px] max-w-[36px] border-b border-r border-gray-200 bg-gray-50 align-bottom"
                    >
                      <div className="mx-auto h-28 w-[34px] whitespace-nowrap text-left text-[11px] font-medium text-gray-500 [writing-mode:vertical-rl] [transform:rotate(180deg)]">
                        {l.title}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.students.map((s) => (
                  <tr key={s.id} className="group">
                    <td className="sticky left-0 z-10 min-w-[180px] border-b border-r border-gray-200 bg-white px-3 py-1.5 font-medium text-gray-800 group-hover:bg-gray-50">
                      {s.name}
                    </td>
                    {data.lessons.map((l) => (
                      <Cell key={l.id} cell={data.cells[`${s.id}:${l.id}`]} />
                    ))}
                    <td className="border-b border-l border-gray-200 bg-white px-3 py-1.5 text-center text-xs font-semibold text-gray-700 group-hover:bg-gray-50">
                      {doneCounts[s.id] ?? 0}/{data.lessons.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

function Cell({ cell }: { cell?: { status: CellStatus; percent?: number } }) {
  const status = cell?.status ?? 'none'
  if (status === 'done') {
    return (
      <td
        title="Completed"
        className="border-b border-r border-gray-100 bg-green-500 text-center text-[11px] font-bold text-white"
      >
        ✓
      </td>
    )
  }
  if (status === 'progress') {
    return (
      <td
        title={cell?.percent != null ? `In progress · ${cell.percent}%` : 'In progress'}
        className="border-b border-r border-gray-100 bg-amber-400 text-center text-[10px] font-semibold text-amber-900"
      >
        {cell?.percent != null ? cell.percent : '·'}
      </td>
    )
  }
  return (
    <td
      title="Untouched"
      className="border-b border-r border-gray-100 bg-gray-100 text-center text-gray-300"
    >
      ·
    </td>
  )
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-10 text-center">
      <LayoutGrid className="mx-auto mb-3 h-10 w-10 text-gray-300" />
      <p className="font-semibold text-gray-900">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">{body}</p>
    </div>
  )
}

function MatrixSkeleton() {
  return (
    <div className="mt-6 flex items-center justify-center py-16 text-gray-500">
      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading activity…
    </div>
  )
}
