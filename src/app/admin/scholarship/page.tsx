'use client'

/**
 * Admin — Scholarship Test: registrations (the lead machine's output) +
 * editable config (name, duration, question count, exam window, waiver bands).
 */

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Users, CheckCircle2, Percent, Award, Settings2, ExternalLink } from 'lucide-react'
import { PageHeader, StatCard, DataTable, type DataTableColumn } from '@/components/admin/kit'

interface Band {
  minPercent: number
  waiverPercent: number
}

interface TestConfig {
  id: string
  name: string
  isActive: boolean
  questionCount: number
  durationMin: number
  windowStartAt: string | null
  windowEndAt: string | null
  waiverBands: Band[]
}

interface Registration {
  id: string
  studentName: string
  phone: string
  email: string | null
  classLevel: string
  city: string | null
  status: string
  score: number | null
  maxScore: number | null
  percent: number | null
  waiverPercent: number | null
  leadId: string | null
  createdAt: string
  completedAt: string | null
}

const CLASS_LABEL: Record<string, string> = {
  CLASS_11: 'Class 11',
  CLASS_12: 'Class 12',
  DROPPER: 'Dropper',
}

export default function AdminScholarshipPage() {
  const [test, setTest] = useState<TestConfig | null>(null)
  const [rows, setRows] = useState<Registration[]>([])
  const [stats, setStats] = useState<{ total: number; completed: number; showRate: number }>({
    total: 0,
    completed: 0,
    showRate: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [showConfig, setShowConfig] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.set('status', statusFilter)
      const res = await fetch(`/api/admin/scholarship?${params.toString()}`)
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to load')
      setTest(json.data.test)
      setRows(json.data.registrations)
      setStats(json.data.stats)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    load()
  }, [load])

  const columns: DataTableColumn<Registration>[] = [
    {
      key: 'student',
      header: 'Student',
      render: (r) => (
        <div>
          <p className="font-medium text-gray-900">{r.studentName}</p>
          <p className="text-xs text-gray-500">
            {CLASS_LABEL[r.classLevel] || r.classLevel}
            {r.city ? ` · ${r.city}` : ''}
          </p>
        </div>
      ),
    },
    {
      key: 'contact',
      header: 'Contact',
      render: (r) => (
        <div className="text-sm text-gray-700">
          <p>{r.phone}</p>
          {r.email && <p className="text-xs text-gray-500">{r.email}</p>}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => (
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            r.status === 'COMPLETED'
              ? 'bg-green-100 text-green-800'
              : r.status === 'STARTED'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600'
          }`}
        >
          {r.status.toLowerCase()}
        </span>
      ),
    },
    {
      key: 'score',
      header: 'Score',
      render: (r) =>
        r.status === 'COMPLETED' && r.score !== null ? (
          <span className="font-semibold text-gray-900">
            {r.score}/{r.maxScore}{' '}
            <span className="text-xs font-normal text-gray-500">({r.percent}%)</span>
          </span>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    {
      key: 'waiver',
      header: 'Waiver',
      render: (r) =>
        r.waiverPercent !== null ? (
          <span className="inline-flex items-center gap-1 font-bold text-amber-600">
            <Award className="h-4 w-4" /> {r.waiverPercent}%
          </span>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    {
      key: 'date',
      header: 'Registered',
      render: (r) => (
        <span className="text-sm text-gray-500">
          {new Date(r.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
        </span>
      ),
    },
    {
      key: 'lead',
      header: 'Lead',
      render: (r) =>
        r.leadId ? (
          <Link
            href={`/admin/students/leads?leadId=${r.leadId}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
          >
            Open <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
  ]

  return (
    <div className="p-6">
      <PageHeader
        title="Scholarship Test"
        subtitle={test ? `${test.name} — the lead machine's output` : 'Loading…'}
        actions={
          <div className="flex flex-wrap gap-2">
            <Link
              href="/scholarship-test"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ExternalLink className="h-4 w-4" /> Public page
            </Link>
            <button
              onClick={() => setShowConfig((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Settings2 className="h-4 w-4" /> Configure
            </button>
          </div>
        }
      />

      {showConfig && test && (
        <ConfigPanel
          test={test}
          onSaved={(t) => {
            setTest(t)
            setShowConfig(false)
            toast.success('Scholarship test config saved')
          }}
        />
      )}

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        <StatCard label="Registrations" value={stats.total} icon={Users} />
        <StatCard
          label="Completed"
          value={stats.completed}
          icon={CheckCircle2}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          label="Show rate"
          value={`${stats.showRate}%`}
          icon={Percent}
          color="bg-amber-100 text-amber-600"
          sub="completed ÷ registered"
        />
      </div>

      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="all">All statuses</option>
          <option value="REGISTERED">Registered</option>
          <option value="STARTED">Started</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(r) => r.id}
        loading={loading}
        error={error}
        onRetry={load}
        emptyTitle="No registrations yet"
        emptyText="Share the public scholarship-test page to start collecting scored leads."
      />
    </div>
  )
}

function ConfigPanel({ test, onSaved }: { test: TestConfig; onSaved: (t: TestConfig) => void }) {
  const [name, setName] = useState(test.name)
  const [isActive, setIsActive] = useState(test.isActive)
  const [questionCount, setQuestionCount] = useState(test.questionCount)
  const [durationMin, setDurationMin] = useState(test.durationMin)
  const [bands, setBands] = useState<Band[]>(test.waiverBands)
  const [saving, setSaving] = useState(false)

  const setBand = (i: number, field: keyof Band, value: number) => {
    setBands((prev) => prev.map((b, idx) => (idx === i ? { ...b, [field]: value } : b)))
  }

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/scholarship', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, isActive, questionCount, durationMin, waiverBands: bands }),
      })
      const json = await res.json()
      if (res.ok && json.success) onSaved(json.data)
      else toast.error(json.error || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Test name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Questions</span>
            <input
              type="number"
              min={10}
              max={180}
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Duration (min)</span>
            <input
              type="number"
              min={10}
              max={240}
              value={durationMin}
              onChange={(e) => setDurationMin(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-sm font-medium text-gray-700">
          Waiver bands (min score % → waiver %)
        </p>
        <div className="space-y-2">
          {bands.map((band, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <input
                type="number"
                min={0}
                max={100}
                value={band.minPercent}
                onChange={(e) => setBand(i, 'minPercent', Number(e.target.value))}
                className="w-24 rounded-lg border border-gray-300 px-3 py-2"
              />
              <span className="text-gray-500">%+ score →</span>
              <input
                type="number"
                min={0}
                max={100}
                value={band.waiverPercent}
                onChange={(e) => setBand(i, 'waiverPercent', Number(e.target.value))}
                className="w-24 rounded-lg border border-gray-300 px-3 py-2"
              />
              <span className="text-gray-500">% fee waiver</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Registrations open
        </label>
        <button
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save config'}
        </button>
      </div>
    </div>
  )
}
