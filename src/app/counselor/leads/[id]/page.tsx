'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  Edit3,
  Save,
  X,
  Plus,
  ChevronDown,
  ChevronUp,
  Send,
  FileText,
  DollarSign,
  TrendingUp,
  User,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Star,
  MoreHorizontal,
} from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'
import { showToast } from '@/lib/toast'

// ─── Types ───────────────────────────────────────────────────────────────────

interface LeadDetail {
  id: string
  studentName: string
  email: string | null
  phone: string
  courseInterest: string
  stage: string
  priority: string
  source: string | null
  score: number | null
  scoreBreakdown: any
  lastContactedAt: string | null
  nextFollowUpAt: string | null
  createdAt: string
  updatedAt: string
  lostReason: string | null
  demoBookingId: string | null
  assignedTo?: { name: string; email: string }
  notes: Note[]
  tasks: Task[]
  communications: Communication[]
  feePlans: FeePlan[]
  offers: Offer[]
  _count: {
    communications: number
    tasks: number
    notes: number
  }
}

interface Note {
  id: string
  content: string
  createdAt: string
  createdBy: { name: string }
}

interface Task {
  id: string
  title: string
  type: string
  priority: string
  status: string
  dueDate: string
}

interface Communication {
  id: string
  type: string
  channel: string
  content: string
  status: string
  sentAt: string
}

interface FeePlan {
  id: string
  courseName: string
  totalFee: number
  amountPaid: number
  amountDue: number
  status: string
  installments: { id: string; amount: number; dueDate: string; status: string }[]
}

interface Offer {
  id: string
  offerName: string
  courseName: string
  originalPrice: number
  finalPrice: number
  validUntil: string
  isActive: boolean
}

interface SessionNote {
  id: string
  type: 'COUNSELING' | 'DEMO' | 'FOLLOW_UP' | 'CALL' | 'GENERAL'
  title: string
  content: string
  mood: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | null
  nextSteps: string | null
  duration: number | null
  createdAt: string
  createdBy: { name: string }
}

// ─── Sub-Components ──────────────────────────────────────────────────────────

function StageBadge({ stage }: { stage: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    NEW_LEAD: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'New Lead' },
    DEMO_SCHEDULED: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Demo Scheduled' },
    DEMO_COMPLETED: { bg: 'bg-indigo-100', text: 'text-indigo-700', label: 'Demo Completed' },
    OFFER_SENT: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Offer Sent' },
    NEGOTIATING: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Negotiating' },
    PAYMENT_PLAN_CREATED: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Payment Plan' },
    ENROLLED: { bg: 'bg-green-100', text: 'text-green-700', label: 'Enrolled ✓' },
    ACTIVE_STUDENT: { bg: 'bg-green-100', text: 'text-green-700', label: 'Active Student' },
    LOST: { bg: 'bg-red-100', text: 'text-red-700', label: 'Lost' },
  }
  const c = config[stage] || { bg: 'bg-gray-100', text: 'text-gray-700', label: stage }
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  const config: Record<string, string> = {
    HOT: '🔥 Hot',
    WARM: '⚡ Warm',
    COLD: '❄️ Cold',
  }
  return <span className="text-sm font-medium">{config[priority] || priority}</span>
}

function ScoreRing({ score }: { score: number | null }) {
  const s = score || 0
  const color = s >= 70 ? 'text-green-600' : s >= 40 ? 'text-yellow-600' : 'text-red-500'
  const ringColor = s >= 70 ? 'stroke-green-500' : s >= 40 ? 'stroke-yellow-500' : 'stroke-red-400'
  const circumference = 2 * Math.PI * 36
  const offset = circumference - (s / 100) * circumference

  return (
    <div className="relative w-20 h-20">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="36" fill="none" stroke="#e5e7eb" strokeWidth="6" />
        <circle
          cx="40" cy="40" r="36" fill="none"
          className={ringColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className={`absolute inset-0 flex items-center justify-center text-lg font-bold ${color}`}>
        {s}
      </div>
    </div>
  )
}

// ─── Session Notes Component ─────────────────────────────────────────────────

function SessionNotesSection({
  leadId,
  initialNotes,
}: {
  leadId: string
  initialNotes: Note[]
}) {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [noteType, setNoteType] = useState<string>('GENERAL')
  const [noteContent, setNoteContent] = useState('')
  const [noteMood, setNoteMood] = useState<string>('')
  const [noteNextSteps, setNoteNextSteps] = useState('')
  const [expanded, setExpanded] = useState(true)

  async function handleSave() {
    if (!noteContent.trim()) return
    try {
      setSaving(true)
      const res = await fetch(`/api/counselor/leads/${leadId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          content: noteContent,
          type: noteType,
          mood: noteMood || null,
          nextSteps: noteNextSteps || null,
        }),
      })
      if (!res.ok) throw new Error('Failed to save note')
      const data = await res.json()
      setNotes((prev) => [data.data || data, ...prev])
      setNoteContent('')
      setNoteNextSteps('')
      setNoteMood('')
      setShowForm(false)
      showToast.success('Session note saved')
    } catch (err) {
      showToast.error('Failed to save note')
    } finally {
      setSaving(false)
    }
  }

  const typeConfig: Record<string, { icon: string; label: string; color: string }> = {
    COUNSELING: { icon: '🧠', label: 'Counseling Session', color: 'border-l-indigo-500' },
    DEMO: { icon: '📺', label: 'Demo Session', color: 'border-l-purple-500' },
    FOLLOW_UP: { icon: '📞', label: 'Follow-up Call', color: 'border-l-blue-500' },
    CALL: { icon: '☎️', label: 'Phone Call', color: 'border-l-green-500' },
    GENERAL: { icon: '📝', label: 'General Note', color: 'border-l-gray-400' },
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Session Notes</h3>
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
            {notes.length}
          </span>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4">
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Session Note
            </button>
          )}

          {showForm && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <label className="text-sm font-medium text-gray-700">Type:</label>
                {Object.entries(typeConfig).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setNoteType(key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      noteType === key
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {val.icon} {val.label}
                  </button>
                ))}
              </div>

              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="What happened in this session? Key points discussed, student concerns, decisions made..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px] text-sm resize-y"
                autoFocus
              />

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Student Mood</label>
                  <div className="flex gap-2">
                    {[
                      { val: 'POSITIVE', emoji: '😊', label: 'Positive' },
                      { val: 'NEUTRAL', emoji: '😐', label: 'Neutral' },
                      { val: 'NEGATIVE', emoji: '😟', label: 'Concerned' },
                    ].map((m) => (
                      <button
                        key={m.val}
                        onClick={() => setNoteMood(noteMood === m.val ? '' : m.val)}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                          noteMood === m.val
                            ? 'bg-indigo-100 border-indigo-300 border text-indigo-700'
                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {m.emoji} {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <textarea
                value={noteNextSteps}
                onChange={(e) => setNoteNextSteps(e.target.value)}
                placeholder="Next steps or action items..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-none h-16"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => { setShowForm(false); setNoteContent(''); setNoteNextSteps('') }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !noteContent.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Note
                </button>
              </div>
            </div>
          )}

          {/* Notes List */}
          <div className="space-y-3">
            {notes.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No session notes yet</p>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className={`border-l-4 ${typeConfig['GENERAL']?.color || 'border-l-gray-400'} bg-white rounded-r-lg p-4 border border-gray-100`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">
                      {note.createdBy?.name || 'Counselor'} • {format(new Date(note.createdAt), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">{note.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Activity Timeline ───────────────────────────────────────────────────────

function ActivityTimeline({ communications, tasks }: { communications: Communication[]; tasks: Task[] }) {
  const [expanded, setExpanded] = useState(true)

  const allEvents = [
    ...communications.map((c) => ({
      id: c.id,
      type: 'communication' as const,
      title: `${c.channel} - ${c.type}`,
      detail: c.content.substring(0, 120) + (c.content.length > 120 ? '...' : ''),
      date: c.sentAt,
      status: c.status,
    })),
    ...tasks.map((t) => ({
      id: t.id,
      type: 'task' as const,
      title: t.title,
      detail: `${t.type} • ${t.priority} priority`,
      date: t.dueDate,
      status: t.status,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium">
            {allEvents.length}
          </span>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      {expanded && (
        <div className="px-5 pb-5">
          {allEvents.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No activity yet</p>
          ) : (
            <div className="relative pl-6 space-y-4">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200" />
              {allEvents.slice(0, 15).map((event) => (
                <div key={event.id} className="relative">
                  <div
                    className={`absolute -left-6 top-1.5 w-4 h-4 rounded-full border-2 ${
                      event.type === 'communication'
                        ? 'bg-blue-100 border-blue-400'
                        : event.status === 'COMPLETED'
                          ? 'bg-green-100 border-green-400'
                          : 'bg-yellow-100 border-yellow-400'
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{event.title}</span>
                      <span className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(event.date), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{event.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Main Lead Detail Page ───────────────────────────────────────────────────

export default function LeadDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [lead, setLead] = useState<LeadDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingStage, setEditingStage] = useState(false)
  const [newStage, setNewStage] = useState('')

  const fetchLead = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/counselor/leads/${id}`, { credentials: 'include' })
      if (!res.ok) throw new Error('Lead not found')
      const data = await res.json()
      setLead(data.data || data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load lead')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id) fetchLead()
  }, [id, fetchLead])

  async function handleStageUpdate() {
    if (!newStage || !lead) return
    try {
      const res = await fetch(`/api/counselor/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ stage: newStage }),
      })
      if (!res.ok) throw new Error('Failed to update stage')
      setLead((prev) => prev ? { ...prev, stage: newStage } : prev)
      setEditingStage(false)
      showToast.success('Stage updated')
    } catch {
      showToast.error('Failed to update stage')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mx-auto mb-3" />
          <p className="text-gray-600">Loading student profile...</p>
        </div>
      </div>
    )
  }

  if (error || !lead) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <p className="text-gray-900 font-semibold mb-2">Error Loading Profile</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => router.back()} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Go Back
            </button>
            <button onClick={fetchLead} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  const stages = [
    'NEW_LEAD', 'DEMO_SCHEDULED', 'DEMO_COMPLETED', 'OFFER_SENT',
    'NEGOTIATING', 'PAYMENT_PLAN_CREATED', 'ENROLLED', 'LOST',
  ]

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Breadcrumb + Back */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/counselor/leads" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Pipeline
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{lead.studentName}</span>
      </div>

      {/* ─── Header Card ─── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Avatar + Info */}
          <div className="flex gap-4 flex-1">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {lead.studentName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900">{lead.studentName}</h1>
                <StageBadge stage={lead.stage} />
                <PriorityBadge priority={lead.priority} />
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                {lead.phone && (
                  <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-indigo-600">
                    <Phone className="w-3.5 h-3.5" /> {lead.phone}
                  </a>
                )}
                {lead.email && (
                  <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-indigo-600">
                    <Mail className="w-3.5 h-3.5" /> {lead.email}
                  </a>
                )}
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> {lead.courseInterest}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                <span>Added {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}</span>
                {lead.source && <span>Source: {lead.source.replace(/_/g, ' ')}</span>}
                {lead.lastContactedAt && (
                  <span>Last contact: {formatDistanceToNow(new Date(lead.lastContactedAt), { addSuffix: true })}</span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Score + Quick Actions */}
          <div className="flex items-center gap-6">
            <ScoreRing score={lead.score} />
            <div className="flex flex-col gap-2">
              <a
                href={`https://wa.me/91${lead.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#166534] hover:bg-[#14532d] text-white rounded-lg text-sm font-medium transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp
              </a>
              <a
                href={`tel:${lead.phone}`}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Phone className="w-4 h-4" /> Call
              </a>
            </div>
          </div>
        </div>

        {/* Stage Progress Bar */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">PIPELINE STAGE</span>
            {!editingStage ? (
              <button onClick={() => { setEditingStage(true); setNewStage(lead.stage) }} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                Change Stage
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value)}
                  className="text-xs border border-gray-300 rounded-lg px-2 py-1"
                >
                  {stages.map((s) => (
                    <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                  ))}
                </select>
                <button onClick={handleStageUpdate} className="text-green-600 hover:text-green-800">
                  <CheckCircle2 className="w-4 h-4" />
                </button>
                <button onClick={() => setEditingStage(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <div className="flex gap-1">
            {stages.filter(s => s !== 'LOST').map((stage, i) => {
              const currentIdx = stages.indexOf(lead.stage)
              const isActive = i <= currentIdx && lead.stage !== 'LOST'
              const isCurrent = stage === lead.stage
              return (
                <div key={stage} className="flex-1">
                  <div
                    className={`h-2 rounded-full transition-colors ${
                      isCurrent ? 'bg-indigo-600' : isActive ? 'bg-indigo-300' : 'bg-gray-200'
                    }`}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─── Two Column Layout ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Session Notes */}
          <SessionNotesSection leadId={lead.id} initialNotes={lead.notes || []} />

          {/* Activity Timeline */}
          <ActivityTimeline
            communications={lead.communications || []}
            tasks={lead.tasks || []}
          />
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Quick Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-indigo-600">{lead._count?.communications || 0}</p>
                <p className="text-xs text-gray-500">Messages</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{lead._count?.tasks || 0}</p>
                <p className="text-xs text-gray-500">Tasks</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{lead._count?.notes || 0}</p>
                <p className="text-xs text-gray-500">Notes</p>
              </div>
            </div>
          </div>

          {/* Next Follow-up */}
          {lead.nextFollowUpAt && (
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-semibold text-amber-800">Next Follow-up</h3>
              </div>
              <p className="text-lg font-bold text-amber-900">
                {format(new Date(lead.nextFollowUpAt), 'MMM d, yyyy')}
              </p>
              <p className="text-xs text-amber-600 mt-1">
                {formatDistanceToNow(new Date(lead.nextFollowUpAt), { addSuffix: true })}
              </p>
            </div>
          )}

          {/* Fee Plans */}
          {lead.feePlans && lead.feePlans.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Fee Plans</h3>
              </div>
              {lead.feePlans.map((plan) => (
                <div key={plan.id} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">{plan.courseName}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      plan.status === 'PAID' ? 'bg-green-100 text-green-700' :
                      plan.status === 'PARTIAL' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {plan.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Paid: ₹{Number(plan.amountPaid).toLocaleString('en-IN')}</span>
                    <span>Due: ₹{Number(plan.amountDue).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: `${(Number(plan.amountPaid) / Number(plan.totalFee)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Offers */}
          {lead.offers && lead.offers.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Active Offers</h3>
              </div>
              {lead.offers.filter(o => o.isActive).map((offer) => (
                <div key={offer.id} className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 mb-2 last:mb-0">
                  <p className="text-sm font-medium text-gray-900">{offer.offerName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400 line-through">₹{Number(offer.originalPrice).toLocaleString('en-IN')}</span>
                    <span className="text-sm font-bold text-green-600">₹{Number(offer.finalPrice).toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Expires {format(new Date(offer.validUntil), 'MMM d, yyyy')}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Pending Tasks */}
          {lead.tasks && lead.tasks.filter(t => t.status !== 'COMPLETED').length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Pending Tasks</h3>
              {lead.tasks.filter(t => t.status !== 'COMPLETED').slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                  <div className={`w-2 h-2 rounded-full ${
                    task.priority === 'URGENT' ? 'bg-red-500' :
                    task.priority === 'HIGH' ? 'bg-orange-500' :
                    task.priority === 'MEDIUM' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{task.title}</p>
                    <p className="text-xs text-gray-400">{format(new Date(task.dueDate), 'MMM d')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
