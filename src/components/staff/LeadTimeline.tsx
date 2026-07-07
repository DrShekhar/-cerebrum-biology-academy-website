'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Clock,
  Phone,
  MessageCircle,
  Mail,
  Users as UsersIcon,
  StickyNote,
  CheckSquare,
  Activity as ActivityIcon,
  Plus,
  Loader2,
  CalendarClock,
} from 'lucide-react'
import { MessageBody } from './MessageBody'

interface TimelineEntry {
  id: string
  kind: 'activity' | 'note' | 'communication' | 'task'
  at: string
  actor: string | null
  title: string
  body: string | null
  meta: Record<string, unknown>
}

interface TimelineData {
  lead: {
    id: string
    studentName: string
    stage: string
    priority: string
    requirement: string
    nextFollowUpAt: string | null
    lastContactedAt: string | null
    createdAt: string
    assignedTo: { id: string; name: string | null } | null
  }
  nextDue: { taskId: string; title: string; dueDate: string | null; status: string } | null
  entries: TimelineEntry[]
}

const STAGES = [
  'NEW_LEAD',
  'DEMO_SCHEDULED',
  'DEMO_COMPLETED',
  'OFFER_SENT',
  'NEGOTIATING',
  'PAYMENT_PLAN_CREATED',
  'ENROLLED',
  'ACTIVE_STUDENT',
  'LOST',
]

const CHANNELS = [
  { id: 'CALL', label: 'Phone call', icon: Phone },
  { id: 'WHATSAPP', label: 'WhatsApp', icon: MessageCircle },
  { id: 'MEETING', label: 'Meeting', icon: UsersIcon },
  { id: 'EMAIL', label: 'Email', icon: Mail },
] as const

const KIND_META: Record<TimelineEntry['kind'], { icon: typeof Clock; color: string }> = {
  communication: { icon: Phone, color: 'bg-green-100 text-green-700' },
  note: { icon: StickyNote, color: 'bg-yellow-100 text-yellow-700' },
  task: { icon: CheckSquare, color: 'bg-purple-100 text-purple-700' },
  activity: { icon: ActivityIcon, color: 'bg-blue-100 text-blue-700' },
}

/**
 * The full historical record of a lead — every call/discussion, note, task
 * and system event in one chronological feed — plus the "Log interaction"
 * composer so each conversation gets recorded the moment it happens.
 */
export function LeadTimeline({ leadId }: { leadId: string }) {
  const [data, setData] = useState<TimelineData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showLogForm, setShowLogForm] = useState(false)
  const [filter, setFilter] = useState<'all' | TimelineEntry['kind']>('all')

  // Log-interaction form state
  const [channel, setChannel] = useState<(typeof CHANNELS)[number]['id']>('CALL')
  const [direction, setDirection] = useState<'OUTBOUND' | 'INBOUND'>('OUTBOUND')
  const [discussed, setDiscussed] = useState('')
  const [planned, setPlanned] = useState('')
  const [requirement, setRequirement] = useState('')
  const [nextFollowUp, setNextFollowUp] = useState('')
  const [newStage, setNewStage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchTimeline = useCallback(async () => {
    try {
      setError(null)
      const res = await fetch(`/api/counselor/leads/${leadId}/timeline`)
      const json = await res.json()
      if (json.success) {
        setData(json.data)
      } else {
        setError(json.error || 'Failed to load timeline')
      }
    } catch {
      setError('Failed to load timeline')
    } finally {
      setLoading(false)
    }
  }, [leadId])

  useEffect(() => {
    void fetchTimeline()
  }, [fetchTimeline])

  const submitInteraction = async () => {
    if (!discussed.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/counselor/leads/${leadId}/interactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel,
          direction,
          discussed,
          planned: planned.trim() || undefined,
          requirement: requirement.trim() || undefined,
          nextFollowUpAt: nextFollowUp ? new Date(nextFollowUp).toISOString() : undefined,
          stage: newStage || undefined,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setDiscussed('')
        setPlanned('')
        setRequirement('')
        setNextFollowUp('')
        setNewStage('')
        setShowLogForm(false)
        void fetchTimeline()
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex justify-center text-gray-400">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
        <p className="text-sm text-gray-600 mb-3">{error || 'Could not load timeline'}</p>
        <button
          onClick={() => void fetchTimeline()}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Retry
        </button>
      </div>
    )
  }

  const entries = filter === 'all' ? data.entries : data.entries.filter((e) => e.kind === filter)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      {/* Header: next due + requirement */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">History & Interactions</h3>
        </div>
        <button
          onClick={() => setShowLogForm((v) => !v)}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Log interaction
        </button>
      </div>

      {data.nextDue && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm">
          <CalendarClock className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="text-amber-900">
            <span className="font-medium">Next due:</span> {data.nextDue.title}
            {data.nextDue.dueDate && (
              <span className="text-amber-700">
                {' '}
                — {new Date(data.nextDue.dueDate).toLocaleString()}
              </span>
            )}
          </span>
        </div>
      )}

      {/* Log interaction form */}
      {showLogForm && (
        <div className="mb-4 border border-blue-200 bg-blue-50/40 rounded-lg p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {CHANNELS.map((c) => (
              <button
                key={c.id}
                onClick={() => setChannel(c.id)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border ${
                  channel === c.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                }`}
              >
                <c.icon className="w-3.5 h-3.5" />
                {c.label}
              </button>
            ))}
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value as 'OUTBOUND' | 'INBOUND')}
              className="px-2 py-1.5 text-sm border border-gray-300 rounded-lg bg-white"
            >
              <option value="OUTBOUND">We reached out</option>
              <option value="INBOUND">They contacted us</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              What was discussed? <span className="text-red-500">*</span>
            </label>
            <textarea
              value={discussed}
              onChange={(e) => setDiscussed(e.target.value)}
              rows={3}
              placeholder="e.g. Spoke with the student's father — they want evening batches, concerned about fees…"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                What was planned?
              </label>
              <input
                value={planned}
                onChange={(e) => setPlanned(e.target.value)}
                placeholder="e.g. Send fee structure, call back Friday"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Their requirement
              </label>
              <input
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder={data.lead.requirement || 'e.g. NEET dropper batch, online'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Next follow-up due
              </label>
              <input
                type="datetime-local"
                value={nextFollowUp}
                onChange={(e) => setNextFollowUp(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Move to stage</label>
              <select
                value={newStage}
                onChange={(e) => setNewStage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
              >
                <option value="">Keep current ({data.lead.stage.replace(/_/g, ' ')})</option>
                {STAGES.filter((s) => s !== data.lead.stage).map((s) => (
                  <option key={s} value={s}>
                    {s.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => void submitInteraction()}
              disabled={submitting || !discussed.trim()}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Saving…' : 'Save interaction'}
            </button>
            <button
              onClick={() => setShowLogForm(false)}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filter chips */}
      <div className="flex flex-wrap gap-1 mb-3">
        {(['all', 'communication', 'note', 'task', 'activity'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2.5 py-1 text-xs rounded-full ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f === 'all'
              ? `All (${data.entries.length})`
              : `${f}s (${data.entries.filter((e) => e.kind === f).length})`}
          </button>
        ))}
      </div>

      {/* Feed */}
      {entries.length === 0 ? (
        <p className="text-sm text-gray-500 py-6 text-center">
          No history yet — log the first interaction above.
        </p>
      ) : (
        <div className="space-y-3 max-h-[32rem] overflow-y-auto pr-1">
          {entries.map((entry) => {
            const meta = KIND_META[entry.kind]
            const Icon = meta.icon
            return (
              <div key={`${entry.kind}-${entry.id}`} className="flex gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${meta.color}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0 pb-3 border-b border-gray-100">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-gray-900 capitalize truncate">
                      {entry.title}
                    </span>
                    <span className="text-xs text-gray-400 shrink-0">
                      {new Date(entry.at).toLocaleString()}
                    </span>
                  </div>
                  {entry.actor && <p className="text-xs text-gray-500">by {entry.actor}</p>}
                  {entry.body && (
                    <p className="text-sm text-gray-700 mt-1">
                      <MessageBody content={entry.body} />
                    </p>
                  )}
                  {entry.kind === 'task' && typeof entry.meta.status === 'string' && (
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                        entry.meta.status === 'COMPLETED'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {entry.meta.status}
                      {typeof entry.meta.dueDate === 'string' &&
                        ` · due ${new Date(entry.meta.dueDate).toLocaleString()}`}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
