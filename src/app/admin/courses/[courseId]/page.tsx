'use client'

/**
 * Admin Course Workspace — one place to manage everything about a course:
 * Curriculum (shared CourseBuilder) | Pricing (course_pricing grid) |
 * Settings (real persisted fields + publish lifecycle) | Students
 * (enrollments) | Analytics (per-course performance).
 */

import { use, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  Loader2,
  BookOpen,
  IndianRupee,
  Settings,
  Users,
  BarChart3,
  ArrowLeft,
  Globe,
  Archive,
  FileEdit,
} from 'lucide-react'
import { CourseBuilder } from '@/components/courses/builder/CourseBuilder'
import { StatCard } from '@/components/admin/kit'

type TabKey = 'curriculum' | 'pricing' | 'settings' | 'students' | 'analytics'

const TABS: { key: TabKey; label: string; icon: typeof BookOpen }[] = [
  { key: 'curriculum', label: 'Curriculum', icon: BookOpen },
  { key: 'pricing', label: 'Pricing', icon: IndianRupee },
  { key: 'settings', label: 'Settings', icon: Settings },
  { key: 'students', label: 'Students', icon: Users },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
]

interface CourseDetail {
  id: string
  name: string
  description: string | null
  type: string
  class: string
  duration: number
  totalFees: number
  status: string
  thumbnailUrl: string | null
  instructorId: string | null
  instructor: { id: string; name: string } | null
  startDate: string | null
  scheduleInfo: string | null
  nextCourseId: string | null
  nextCourseOfferText: string | null
  maxCapacity: number | null
  syllabus: string[] | null
  features: string[] | null
  isActive: boolean
  _count: { enrollments: number; chapters: number; study_materials: number; certificates: number }
}

const STATUS_STYLE: Record<string, string> = {
  DRAFT: 'bg-yellow-100 text-yellow-800',
  PUBLISHED: 'bg-green-100 text-green-800',
  ARCHIVED: 'bg-gray-200 text-gray-600',
}

export default function AdminCourseWorkspace({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = use(params)
  const [tab, setTab] = useState<TabKey>(() => {
    if (typeof window === 'undefined') return 'curriculum'
    const t = new URLSearchParams(window.location.search).get('tab')
    return TABS.some((x) => x.key === t) ? (t as TabKey) : 'curriculum'
  })
  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setError(null)
      const res = await fetch(`/api/admin/courses/${courseId}`)
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to load course')
      setCourse(json.data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load course')
    } finally {
      setLoading(false)
    }
  }, [courseId])

  useEffect(() => {
    load()
  }, [load])

  const setStatus = async (status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED') => {
    const res = await fetch(`/api/admin/courses/${courseId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    const json = await res.json()
    if (res.ok && json.success) {
      toast.success(
        status === 'PUBLISHED'
          ? 'Course published — visible in catalogs'
          : `Course ${status.toLowerCase()}`
      )
      await load()
    } else {
      toast.error(json.error || 'Status change failed')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-500">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading course…
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <h1 className="text-xl font-bold text-gray-900">Course unavailable</h1>
        <p className="mt-2 text-gray-600">{error || 'Not found'}</p>
        <Link href="/admin/courses" className="mt-4 inline-block text-sm text-blue-600 underline">
          Back to courses
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6">
      <Link
        href="/admin/courses"
        className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" /> All courses
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{course.name}</h1>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[course.status] || STATUS_STYLE.DRAFT}`}
            >
              {course.status}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            {course._count.chapters} chapters · {course._count.study_materials} materials ·{' '}
            {course._count.enrollments} enrollments
            {course.instructor ? ` · Instructor: ${course.instructor.name}` : ''}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          {course.status !== 'PUBLISHED' && (
            <button
              onClick={() => setStatus('PUBLISHED')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
            >
              <Globe className="h-4 w-4" /> Publish
            </button>
          )}
          {course.status === 'PUBLISHED' && (
            <button
              onClick={() => setStatus('DRAFT')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FileEdit className="h-4 w-4" /> Unpublish
            </button>
          )}
          <button
            onClick={async () => {
              if (
                !confirm(
                  'Duplicate this course? Structure and lessons are copied into a new DRAFT course (videos must be re-linked).'
                )
              )
                return
              const res = await fetch(`/api/admin/courses/${courseId}/duplicate`, {
                method: 'POST',
              })
              const json = await res.json()
              if (res.ok && json.success) {
                toast.success(
                  `Duplicated: ${json.data.chapters} chapters, ${json.data.materials} lessons${json.data.videosSkipped ? ` (${json.data.videosSkipped} videos to re-link)` : ''}`
                )
                window.location.href = `/admin/courses/${json.data.newCourseId}`
              } else {
                toast.error(json.error || 'Duplicate failed')
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Duplicate
          </button>
          {course.status !== 'ARCHIVED' && (
            <button
              onClick={() => {
                if (
                  confirm(
                    'Archive this course? It disappears from catalogs; enrolled students keep access.'
                  )
                )
                  setStatus('ARCHIVED')
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <Archive className="h-4 w-4" /> Archive
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-gray-200">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`inline-flex shrink-0 items-center gap-1.5 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === key
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'curriculum' && <CourseBuilder courseId={courseId} showTitle={false} />}
        {tab === 'pricing' && <PricingTab courseId={courseId} />}
        {tab === 'settings' && <SettingsTab course={course} onSaved={load} />}
        {tab === 'students' && <StudentsTab courseId={courseId} />}
        {tab === 'analytics' && <AnalyticsTab courseId={courseId} course={course} />}
      </div>
    </div>
  )
}

// ─── Pricing tab ─────────────────────────────────────────────────────────────

const CURRENCY_SYMBOL: Record<string, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AUD: 'A$',
  CAD: 'C$',
  AED: 'د.إ',
  SGD: 'S$',
}

interface PricingRow {
  currency: string
  amount: number | null // smallest unit
  isActive: boolean
}

function PricingTab({ courseId }: { courseId: string }) {
  const [rows, setRows] = useState<PricingRow[]>([])
  const [totalFees, setTotalFees] = useState('') // rupees
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`/api/admin/courses/${courseId}/pricing`)
        const json = await res.json()
        if (res.ok && json.success) {
          setRows(json.data.pricing)
          setTotalFees(String(Math.round(json.data.totalFees / 100)))
        } else {
          toast.error(json.error || 'Failed to load pricing')
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [courseId])

  const updateRow = (currency: string, patch: Partial<PricingRow>) =>
    setRows((rs) => rs.map((r) => (r.currency === currency ? { ...r, ...patch } : r)))

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/courses/${courseId}/pricing`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalFees: parseInt(totalFees, 10) || undefined, pricing: rows }),
      })
      const json = await res.json()
      if (res.ok && json.success) toast.success('Pricing saved')
      else toast.error(json.error || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading)
    return (
      <div className="flex items-center gap-2 py-10 text-gray-500">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading pricing…
      </div>
    )

  return (
    <div className="max-w-2xl space-y-5">
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <label className="block text-sm font-semibold text-gray-800" htmlFor="base-fee">
          Base fee (₹, used when a currency below has no price)
        </label>
        <input
          id="base-fee"
          type="number"
          min={1000}
          value={totalFees}
          onChange={(e) => setTotalFees(e.target.value)}
          className="mt-2 w-48 rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-gray-500">
          Geo pricing converts this automatically for visitors whose currency has no explicit price.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900">Per-currency prices</h3>
          <p className="mt-0.5 text-xs text-gray-500">
            Enter major units (e.g. 499 = $499). Clear a field to fall back to the base fee.
          </p>
        </div>
        <div className="divide-y divide-gray-50">
          {rows.map((r) => (
            <div key={r.currency} className="flex items-center gap-4 px-4 py-3">
              <span className="w-14 font-mono text-sm font-semibold text-gray-700">
                {r.currency}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-400">{CURRENCY_SYMBOL[r.currency]}</span>
                <input
                  type="number"
                  min={0}
                  value={r.amount === null ? '' : String(Math.round(r.amount / 100))}
                  onChange={(e) =>
                    updateRow(r.currency, {
                      amount:
                        e.target.value === '' ? null : Math.round(parseFloat(e.target.value) * 100),
                      isActive: e.target.value !== '' ? true : r.isActive,
                    })
                  }
                  placeholder="—"
                  aria-label={`${r.currency} price`}
                  className="w-32 rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                />
              </div>
              <label className="ml-auto flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={r.isActive}
                  disabled={r.amount === null}
                  onChange={(e) => updateRow(r.currency, { isActive: e.target.checked })}
                />
                active
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save pricing'}
        </button>
      </div>
    </div>
  )
}

// ─── Settings tab ────────────────────────────────────────────────────────────

function SettingsTab({ course, onSaved }: { course: CourseDetail; onSaved: () => void }) {
  const [form, setForm] = useState({
    name: course.name,
    description: course.description || '',
    type: course.type,
    class: course.class,
    duration: String(course.duration),
    instructorId: course.instructorId || '',
    maxCapacity: course.maxCapacity ? String(course.maxCapacity) : '',
    startDate: course.startDate ? course.startDate.slice(0, 10) : '',
    scheduleInfo: course.scheduleInfo || '',
    nextCourseId: course.nextCourseId || '',
    nextCourseOfferText: course.nextCourseOfferText || '',
    syllabus: (course.syllabus || []).join('\n'),
    features: (course.features || []).join('\n'),
  })
  const [teachers, setTeachers] = useState<{ id: string; name: string }[]>([])
  const [allCourses, setAllCourses] = useState<{ id: string; name: string }[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/faculty')
      .then((r) => r.json())
      .then((j) => {
        if (j.success) {
          setTeachers(
            (j.data.faculty || []).map((f: { id: string; name: string }) => ({
              id: f.id,
              name: f.name,
            }))
          )
        }
      })
      .catch(() => {})
    fetch('/api/admin/courses?limit=200')
      .then((r) => r.json())
      .then((j) => {
        if (j?.success && j.data?.courses) {
          setAllCourses(
            j.data.courses
              .filter((x: { id: string }) => x.id !== course.id)
              .map((x: { id: string; name: string }) => ({ id: x.id, name: x.name }))
          )
        }
      })
      .catch(() => {})
  }, [course.id])

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/courses/${course.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          type: form.type,
          class: form.class,
          duration: parseInt(form.duration, 10) || course.duration,
          instructorId: form.instructorId || null,
          maxCapacity: form.maxCapacity ? parseInt(form.maxCapacity, 10) : null,
          startDate: form.startDate || null,
          scheduleInfo: form.scheduleInfo || null,
          nextCourseId: form.nextCourseId || null,
          nextCourseOfferText: form.nextCourseOfferText || null,
          syllabus: form.syllabus
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean),
          features: form.features
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        toast.success('Settings saved')
        onSaved()
      } else {
        toast.error(json.error || 'Save failed')
      }
    } finally {
      setSaving(false)
    }
  }

  const input = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm'
  const label = 'mb-1 block text-xs font-medium text-gray-600'

  return (
    <div className="max-w-2xl space-y-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4">
        <div>
          <label className={label} htmlFor="cs-name">
            Course name
          </label>
          <input
            id="cs-name"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            className={input}
          />
        </div>
        <div>
          <label className={label} htmlFor="cs-desc">
            Description
          </label>
          <textarea
            id="cs-desc"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            rows={3}
            className={input}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div>
            <label className={label} htmlFor="cs-type">
              Type
            </label>
            <select
              id="cs-type"
              value={form.type}
              onChange={(e) => set('type', e.target.value)}
              className={input}
            >
              {[
                'NEET_COMPLETE',
                'CLASS_11',
                'CLASS_12',
                'DROPPER',
                'FOUNDATION',
                'CRASH_COURSE',
              ].map((t) => (
                <option key={t} value={t}>
                  {t.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="cs-class">
              Class
            </label>
            <select
              id="cs-class"
              value={form.class}
              onChange={(e) => set('class', e.target.value)}
              className={input}
            >
              {['CLASS_9', 'CLASS_10', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION'].map((c) => (
                <option key={c} value={c}>
                  {c.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="cs-duration">
              Duration (months)
            </label>
            <input
              id="cs-duration"
              type="number"
              min={1}
              max={36}
              value={form.duration}
              onChange={(e) => set('duration', e.target.value)}
              className={input}
            />
          </div>
          <div>
            <label className={label} htmlFor="cs-instructor">
              Instructor
            </label>
            <select
              id="cs-instructor"
              value={form.instructorId}
              onChange={(e) => set('instructorId', e.target.value)}
              className={input}
            >
              <option value="">— none —</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="cs-capacity">
              Max capacity
            </label>
            <input
              id="cs-capacity"
              type="number"
              min={1}
              value={form.maxCapacity}
              onChange={(e) => set('maxCapacity', e.target.value)}
              placeholder="unlimited"
              className={input}
            />
          </div>
          <div>
            <label className={label} htmlFor="cs-start">
              Start date
            </label>
            <input
              id="cs-start"
              type="date"
              value={form.startDate}
              onChange={(e) => set('startDate', e.target.value)}
              className={input}
            />
          </div>
        </div>
        <div>
          <label className={label} htmlFor="cs-schedule">
            Schedule (e.g. Mon/Wed/Fri 5–7 PM)
          </label>
          <input
            id="cs-schedule"
            value={form.scheduleInfo}
            onChange={(e) => set('scheduleInfo', e.target.value)}
            className={input}
          />
        </div>

        {/* Completion offer: promoted on the student course page at 100% */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={label} htmlFor="cs-nextcourse">
              Next-course offer (shown on completion)
            </label>
            <select
              id="cs-nextcourse"
              value={form.nextCourseId}
              onChange={(e) => set('nextCourseId', e.target.value)}
              className={input}
            >
              <option value="">None</option>
              {allCourses.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="cs-nextoffer">
              Offer text (optional)
            </label>
            <input
              id="cs-nextoffer"
              value={form.nextCourseOfferText}
              onChange={(e) => set('nextCourseOfferText', e.target.value)}
              placeholder="e.g. Complete alumni get 20% off the next course"
              className={input}
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={label} htmlFor="cs-syllabus">
              Syllabus (one item per line)
            </label>
            <textarea
              id="cs-syllabus"
              value={form.syllabus}
              onChange={(e) => set('syllabus', e.target.value)}
              rows={5}
              className={input}
            />
          </div>
          <div>
            <label className={label} htmlFor="cs-features">
              Features (one per line)
            </label>
            <textarea
              id="cs-features"
              value={form.features}
              onChange={(e) => set('features', e.target.value)}
              rows={5}
              className={input}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save settings'}
        </button>
      </div>
    </div>
  )
}

// ─── Students tab ────────────────────────────────────────────────────────────

interface EnrollmentRow {
  id: string
  status: string
  totalFees: number
  paidAmount: number
  createdAt: string
  currentProgress: number
  users: { id: string; name: string; email: string; phone: string | null } | null
}

function StudentsTab({ courseId }: { courseId: string }) {
  const [rows, setRows] = useState<EnrollmentRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`/api/admin/enrollments?courseId=${courseId}&limit=100`)
        const json = await res.json()
        const list = json?.data?.enrollments || json?.enrollments || []
        setRows(list)
      } catch {
        toast.error('Failed to load enrollments')
      } finally {
        setLoading(false)
      }
    })()
  }, [courseId])

  if (loading)
    return (
      <div className="flex items-center gap-2 py-10 text-gray-500">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading students…
      </div>
    )

  if (rows.length === 0)
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500">
        No enrollments in this course yet.
      </div>
    )

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs uppercase text-gray-500">
            <th className="px-4 py-3">Student</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Progress</th>
            <th className="px-4 py-3">Paid</th>
            <th className="px-4 py-3">Enrolled</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="px-4 py-3">
                <p className="font-medium text-gray-900">{r.users?.name || '—'}</p>
                <p className="text-xs text-gray-500">{r.users?.email}</p>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    r.status === 'ACTIVE'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {r.status}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-700">{r.currentProgress ?? 0}%</td>
              <td className="px-4 py-3 text-gray-700">
                ₹{Math.round((r.paidAmount || 0) / 100).toLocaleString('en-IN')}
                <span className="text-xs text-gray-400">
                  {' '}
                  / ₹{Math.round((r.totalFees || 0) / 100).toLocaleString('en-IN')}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500">
                {new Date(r.createdAt).toLocaleDateString('en-IN')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Analytics tab ───────────────────────────────────────────────────────────

interface PerfRow {
  id: string
  name: string
  enrolledStudents: number
  activeStudents: number
  avgProgress: number
  completionRate: number
  avgTestScore?: number
  submissionRate?: number
}

function AnalyticsTab({ courseId, course }: { courseId: string; course: CourseDetail }) {
  const [perf, setPerf] = useState<PerfRow | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/admin/courses/performance')
        const json = await res.json()
        const list: PerfRow[] = json?.courses || []
        setPerf(list.find((p) => p.id === courseId) || null)
      } catch {
        /* section shows counts only */
      } finally {
        setLoading(false)
      }
    })()
  }, [courseId])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Enrollments" value={course._count.enrollments} icon={Users} />
        <StatCard
          label="Chapters"
          value={course._count.chapters}
          icon={BookOpen}
          color="bg-purple-100 text-purple-600"
        />
        <StatCard
          label="Materials"
          value={course._count.study_materials}
          icon={FileEdit}
          color="bg-orange-100 text-orange-600"
        />
        <StatCard
          label="Certificates issued"
          value={course._count.certificates}
          icon={BarChart3}
          color="bg-green-100 text-green-600"
        />
      </div>

      {loading ? (
        <div className="flex items-center gap-2 py-6 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading performance…
        </div>
      ) : perf ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Active students" value={perf.activeStudents} icon={Users} />
          <StatCard
            label="Avg progress"
            value={`${perf.avgProgress}%`}
            icon={BarChart3}
            color="bg-blue-100 text-blue-600"
          />
          <StatCard
            label="Completion rate"
            value={`${perf.completionRate}%`}
            icon={BarChart3}
            color="bg-green-100 text-green-600"
          />
          <StatCard
            label="Submission rate"
            value={perf.submissionRate !== undefined ? `${perf.submissionRate}%` : '—'}
            icon={FileEdit}
            color="bg-purple-100 text-purple-600"
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
          Performance data appears once the course has active enrollments.
        </div>
      )}
    </div>
  )
}
