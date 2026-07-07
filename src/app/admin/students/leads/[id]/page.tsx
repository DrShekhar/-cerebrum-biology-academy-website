'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Phone,
  Mail,
  Star,
  Clock,
  Activity,
  CheckSquare,
  MessageSquare,
  StickyNote,
  Loader2,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LeadTimeline } from '@/components/staff/LeadTimeline'
import { LeadCommentThread } from '@/components/staff/LeadCommentThread'
import { LeadColorTagPicker, useLeadColorTags } from '@/components/staff/LeadColorLegend'
import { stageBadgeClass, stageLabel } from '@/lib/leads/stageColors'

interface TimelineActivity {
  id: string
  action: string
  description: string
  createdAt: string
  by: string
}
interface LeadDetail {
  id: string
  studentName: string
  email: string | null
  phone: string
  courseInterest: string
  stage: string
  priority: string
  source: string
  sourceDetail: string | null
  score: number | null
  assignedTo: { name: string; email: string } | null
  createdAt: string
  lastContactedAt: string | null
  nextFollowUpAt: string | null
  convertedAt: string | null
  lostReason: string | null
  metadata?: { colorTag?: string | null } | null
  demoBooking: {
    status: string
    preferredDate: string
    preferredTime: string
    demoCompleted: boolean
    demoRating: number | null
  } | null
  activities: TimelineActivity[]
  notes: { id: string; content: string; createdAt: string; by: string }[]
  tasks: {
    id: string
    title: string
    type: string
    priority: string
    status: string
    dueDate: string | null
  }[]
  communications: {
    id: string
    type: string
    content: string
    status: string
    sentAt: string | null
  }[]
}

const stageColor = (s: string) => stageBadgeClass(s)

const fmt = (d: string | null) =>
  d ? new Date(d).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—'

export default function AdminLeadDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const [lead, setLead] = useState<LeadDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [colorTag, setColorTag] = useState<string | null>(null)
  const { tags: colorTags } = useLeadColorTags()

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`/api/admin/leads/${id}`)
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to load lead')
      setLead(data.data)
      setColorTag(data.data?.metadata?.colorTag || null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load lead')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id) load()
  }, [id, load])

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        <button
          onClick={() => router.push('/admin/students/leads')}
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" /> Back to leads
        </button>

        {loading && (
          <div className="flex items-center justify-center py-24 text-gray-500">
            <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading lead…
          </div>
        )}

        {error && !loading && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-700">{error}</p>
            <Button className="mt-4" onClick={() => load()}>
              Try again
            </Button>
          </div>
        )}

        {lead && !loading && (
          <div className="space-y-6">
            {/* Header */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{lead.studentName}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="inline-flex items-center gap-1">
                      <Phone className="w-4 h-4" /> {lead.phone}
                    </span>
                    {lead.email && (
                      <span className="inline-flex items-center gap-1">
                        <Mail className="w-4 h-4" /> {lead.email}
                      </span>
                    )}
                    <span>{lead.courseInterest}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <LeadColorTagPicker
                      leadId={lead.id}
                      current={colorTag}
                      tags={colorTags}
                      onChanged={setColorTag}
                      size="md"
                    />
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${stageColor(lead.stage)}`}
                    >
                      {stageLabel(lead.stage)}
                    </span>
                  </div>
                  {typeof lead.score === 'number' && (
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-700">
                      <Star className="w-4 h-4 text-yellow-500" /> Score {lead.score}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 text-sm md:grid-cols-4">
                <Field label="Priority" value={lead.priority} />
                <Field label="Source" value={lead.sourceDetail || lead.source} />
                <Field label="Assigned to" value={lead.assignedTo?.name || 'Unassigned'} />
                <Field label="Created" value={fmt(lead.createdAt)} />
                <Field label="Last contacted" value={fmt(lead.lastContactedAt)} />
                <Field label="Next follow-up" value={fmt(lead.nextFollowUpAt)} />
                {lead.convertedAt && <Field label="Converted" value={fmt(lead.convertedAt)} />}
                {lead.lostReason && <Field label="Lost reason" value={lead.lostReason} />}
              </div>
              {lead.demoBooking && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-orange-50 px-4 py-3 text-sm text-orange-900">
                  <Calendar className="w-4 h-4" />
                  Demo {lead.demoBooking.status.toLowerCase()} for {lead.demoBooking.preferredDate}{' '}
                  at {lead.demoBooking.preferredTime}
                  {lead.demoBooking.demoCompleted && ' · completed'}
                  {lead.demoBooking.demoRating ? ` · rated ${lead.demoBooking.demoRating}/5` : ''}
                </div>
              )}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Full history: every interaction, note, task and event + Log interaction */}
              <div className="lg:col-span-2 space-y-6">
                <LeadTimeline leadId={lead.id} />
                <LeadCommentThread leadId={lead.id} />
              </div>

              {/* Side column: tasks at a glance */}
              <div className="space-y-6">
                <Panel icon={<CheckSquare className="w-5 h-5 text-blue-600" />} title="Tasks">
                  {lead.tasks.length === 0 ? (
                    <Empty text="No tasks." />
                  ) : (
                    lead.tasks.map((t) => (
                      <div key={t.id} className="border-b border-gray-100 py-2 last:border-0">
                        <div className="text-sm font-medium text-gray-900">{t.title}</div>
                        <div className="text-xs text-gray-500">
                          {t.status} · {t.priority} · due {fmt(t.dueDate)}
                        </div>
                      </div>
                    ))
                  )}
                </Panel>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-gray-400">{label}</div>
      <div className="mt-0.5 font-medium text-gray-900 capitalize">{value}</div>
    </div>
  )
}

function Panel({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
        {icon} {title}
      </h3>
      <div>{children}</div>
    </div>
  )
}

function Empty({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-1 text-sm text-gray-400">
      <Clock className="w-3.5 h-3.5" /> {text}
    </p>
  )
}
