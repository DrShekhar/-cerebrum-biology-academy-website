'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Edit2,
  Trash2,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  User,
  BookOpen,
  Link2,
  IndianRupee,
  MessageSquare,
  CalendarClock,
} from 'lucide-react'
import toast from 'react-hot-toast'

interface TimelineEvent {
  status: string
  label: string
  timestamp: string
  isCurrent: boolean
}

interface Commission {
  id: string
  amount: number
  percentage: number
  baseAmount: number
  status: string
  paidAt: string | null
  paymentRef: string | null
  createdAt: string
}

interface Lead {
  id: string
  studentName: string
  phone: string
  email: string | null
  courseInterest: string | null
  status: string
  statusLabel: string
  source: string
  notes: string | null
  referralLink: { id: string; code: string; name: string } | null
  demoScheduledAt: string | null
  demoCompletedAt: string | null
  offerSentAt: string | null
  paymentReceivedAt: string | null
  enrolledAt: string | null
  lostAt: string | null
  lostReason: string | null
  enrollmentId: string | null
  totalFeeAmount: number | null
  commissionEarned: number | null
  commissions: Commission[]
  timeline: TimelineEvent[]
  createdAt: string
  updatedAt: string
}

const statusColors: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  NEW_LEAD: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', border: 'border-blue-200' },
  DEMO_SCHEDULED: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500', border: 'border-purple-200' },
  DEMO_COMPLETED: { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500', border: 'border-indigo-200' },
  OFFER_SENT: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500', border: 'border-orange-200' },
  PAYMENT_PENDING: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500', border: 'border-yellow-200' },
  ENROLLED: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500', border: 'border-green-200' },
  LOST: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', border: 'border-red-200' },
}

const funnelSteps = [
  { status: 'NEW_LEAD', label: 'New Lead', icon: User },
  { status: 'DEMO_SCHEDULED', label: 'Demo Scheduled', icon: CalendarClock },
  { status: 'DEMO_COMPLETED', label: 'Demo Done', icon: CheckCircle2 },
  { status: 'OFFER_SENT', label: 'Offer Sent', icon: MessageSquare },
  { status: 'PAYMENT_PENDING', label: 'Payment', icon: IndianRupee },
  { status: 'ENROLLED', label: 'Enrolled', icon: BookOpen },
]

const validTransitions: Record<string, string[]> = {
  NEW_LEAD: ['DEMO_SCHEDULED', 'LOST'],
  DEMO_SCHEDULED: ['DEMO_COMPLETED', 'LOST'],
  DEMO_COMPLETED: ['OFFER_SENT', 'LOST'],
  OFFER_SENT: ['PAYMENT_PENDING', 'LOST'],
  PAYMENT_PENDING: ['ENROLLED', 'LOST'],
  ENROLLED: [],
  LOST: [],
}

export default function LeadDetailPage() {
  const router = useRouter()
  const params = useParams()
  const leadId = params.id as string

  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showLostModal, setShowLostModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const fetchLead = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/consultant/leads/${leadId}`)
      const result = await response.json()

      if (!result.success) {
        setError(result.error || 'Failed to load lead')
        return
      }

      setLead(result.data)
    } catch {
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }, [leadId])

  useEffect(() => {
    fetchLead()
  }, [fetchLead])

  const updateStatus = async (newStatus: string, additionalData?: Record<string, unknown>) => {
    if (!lead) return

    setUpdating(true)
    try {
      const response = await fetch(`/api/consultant/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, ...additionalData }),
      })

      const result = await response.json()

      if (!result.success) {
        toast.error(result.error || 'Failed to update status')
        return
      }

      toast.success(result.message || 'Status updated')
      fetchLead()
    } catch {
      toast.error('Failed to update status')
    } finally {
      setUpdating(false)
    }
  }

  const deleteLead = async () => {
    setUpdating(true)
    try {
      const response = await fetch(`/api/consultant/leads/${leadId}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (!result.success) {
        toast.error(result.error || 'Failed to delete lead')
        return
      }

      toast.success('Lead deleted')
      router.push('/consultant/leads')
    } catch {
      toast.error('Failed to delete lead')
    } finally {
      setUpdating(false)
      setShowDeleteConfirm(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !lead) {
    return (
      <div className="max-w-4xl mx-auto">
        <Link
          href="/consultant/leads"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Leads
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Lead</h2>
          <p className="text-red-600">{error || 'Lead not found'}</p>
          <button
            onClick={fetchLead}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const colors = statusColors[lead.status] || statusColors.NEW_LEAD
  const nextTransitions = validTransitions[lead.status] || []
  const currentStepIndex = funnelSteps.findIndex((s) => s.status === lead.status)
  const isTerminal = lead.status === 'ENROLLED' || lead.status === 'LOST'

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Link */}
      <Link
        href="/consultant/leads"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Leads
      </Link>

      {/* Header Card */}
      <div className={`bg-white rounded-xl p-6 shadow-sm border ${colors.border} mb-6`}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${colors.bg} ${colors.text}`}
            >
              {lead.studentName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{lead.studentName}</h1>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text} mt-1`}
              >
                <span className={`w-2 h-2 rounded-full ${colors.dot}`}></span>
                {lead.statusLabel}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {!isTerminal && (
              <button
                onClick={() => setShowEditModal(true)}
                className="p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                title="Edit Lead"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            )}
            {lead.status === 'NEW_LEAD' && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Lead"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3 text-gray-600">
            <Phone className="w-5 h-5 text-gray-400" />
            <span>{lead.phone}</span>
          </div>
          {lead.email && (
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="w-5 h-5 text-gray-400" />
              <span>{lead.email}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-gray-600">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span>Added {new Date(lead.createdAt).toLocaleDateString()}</span>
          </div>
          {lead.referralLink && (
            <div className="flex items-center gap-3 text-gray-600">
              <Link2 className="w-5 h-5 text-gray-400" />
              <span>
                via <span className="font-medium">{lead.referralLink.name}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Funnel Progress */}
      {!isTerminal && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Lead Progress</h2>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded"></div>
            <div
              className="absolute top-6 left-0 h-1 bg-teal-500 rounded transition-all"
              style={{ width: `${(currentStepIndex / (funnelSteps.length - 1)) * 100}%` }}
            ></div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {funnelSteps.map((step, index) => {
                const Icon = step.icon
                const isCompleted = index < currentStepIndex
                const isCurrent = index === currentStepIndex

                return (
                  <div key={step.status} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-colors ${
                        isCompleted
                          ? 'bg-teal-500 text-white'
                          : isCurrent
                            ? 'bg-teal-100 text-teal-600 ring-4 ring-teal-200'
                            : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span
                      className={`text-xs mt-2 text-center font-medium ${
                        isCurrent ? 'text-teal-600' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          {!isTerminal && nextTransitions.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-3">
                {nextTransitions
                  .filter((t) => t !== 'LOST')
                  .map((transition) => {
                    const step = funnelSteps.find((s) => s.status === transition)
                    if (!step) return null

                    const handleClick = () => {
                      if (transition === 'DEMO_SCHEDULED') {
                        setShowScheduleModal(true)
                      } else {
                        updateStatus(transition)
                      }
                    }

                    return (
                      <button
                        key={transition}
                        onClick={handleClick}
                        disabled={updating}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:opacity-50"
                      >
                        {updating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                        Move to {step.label}
                      </button>
                    )
                  })}
                {nextTransitions.includes('LOST') && (
                  <button
                    onClick={() => setShowLostModal(true)}
                    disabled={updating}
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" />
                    Mark as Lost
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>
            <div className="space-y-4">
              {lead.timeline.map((event, index) => {
                const eventColors = statusColors[event.status] || statusColors.NEW_LEAD
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${event.isCurrent ? eventColors.dot : 'bg-gray-300'}`}
                      ></div>
                      {index < lead.timeline.length - 1 && (
                        <div className="w-0.5 flex-1 bg-gray-200 my-1"></div>
                      )}
                    </div>
                    <div className="pb-4">
                      <p className={`font-medium ${event.isCurrent ? eventColors.text : 'text-gray-700'}`}>
                        {event.label}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Notes */}
          {lead.notes && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Notes</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{lead.notes}</p>
            </div>
          )}

          {/* Lost Reason */}
          {lead.status === 'LOST' && lead.lostReason && (
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h2 className="text-lg font-semibold text-red-700 mb-3">Lost Reason</h2>
              <p className="text-red-600">{lead.lostReason}</p>
              <p className="text-sm text-red-500 mt-2">
                Lost on {new Date(lead.lostAt!).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Lead Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Details</h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-gray-500">Course Interest</dt>
                <dd className="font-medium text-gray-900">{lead.courseInterest || 'Not specified'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Source</dt>
                <dd className="font-medium text-gray-900">{lead.source}</dd>
              </div>
              {lead.demoScheduledAt && (
                <div>
                  <dt className="text-sm text-gray-500">Demo Scheduled</dt>
                  <dd className="font-medium text-gray-900">
                    {new Date(lead.demoScheduledAt).toLocaleString()}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-sm text-gray-500">Last Updated</dt>
                <dd className="font-medium text-gray-900">
                  {new Date(lead.updatedAt).toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>

          {/* Commission Info */}
          {(lead.status === 'ENROLLED' || lead.commissions.length > 0) && (
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h2 className="text-lg font-semibold text-green-700 mb-4">Commission</h2>
              {lead.totalFeeAmount && (
                <div className="mb-3">
                  <p className="text-sm text-green-600">Total Fee</p>
                  <p className="text-xl font-bold text-green-700">
                    ₹{lead.totalFeeAmount.toLocaleString('en-IN')}
                  </p>
                </div>
              )}
              {lead.commissionEarned !== null && lead.commissionEarned > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-green-600">Your Commission</p>
                  <p className="text-2xl font-bold text-green-700">
                    ₹{lead.commissionEarned.toLocaleString('en-IN')}
                  </p>
                </div>
              )}
              {lead.commissions.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-green-200">
                  {lead.commissions.map((commission) => (
                    <div key={commission.id} className="flex justify-between items-center text-sm">
                      <span className="text-green-600">
                        {commission.percentage}% of ₹{commission.baseAmount.toLocaleString('en-IN')}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          commission.status === 'PAID'
                            ? 'bg-green-200 text-green-800'
                            : commission.status === 'PENDING'
                              ? 'bg-yellow-200 text-yellow-800'
                              : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {commission.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditLeadModal
          lead={lead}
          onClose={() => setShowEditModal(false)}
          onSave={() => {
            setShowEditModal(false)
            fetchLead()
          }}
        />
      )}

      {/* Schedule Demo Modal */}
      {showScheduleModal && (
        <ScheduleDemoModal
          onClose={() => setShowScheduleModal(false)}
          onSchedule={(date) => {
            updateStatus('DEMO_SCHEDULED', { demoScheduledAt: date })
            setShowScheduleModal(false)
          }}
          updating={updating}
        />
      )}

      {/* Lost Reason Modal */}
      {showLostModal && (
        <LostReasonModal
          onClose={() => setShowLostModal(false)}
          onConfirm={(reason) => {
            updateStatus('LOST', { lostReason: reason })
            setShowLostModal(false)
          }}
          updating={updating}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <ConfirmDeleteModal
          leadName={lead.studentName}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={deleteLead}
          updating={updating}
        />
      )}
    </div>
  )
}

// Edit Lead Modal Component
function EditLeadModal({
  lead,
  onClose,
  onSave,
}: {
  lead: Lead
  onClose: () => void
  onSave: () => void
}) {
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    studentName: lead.studentName,
    phone: lead.phone,
    email: lead.email || '',
    courseInterest: lead.courseInterest || '',
    notes: lead.notes || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/consultant/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!result.success) {
        toast.error(result.error || 'Failed to update lead')
        return
      }

      toast.success('Lead updated')
      onSave()
    } catch {
      toast.error('Failed to update lead')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Lead</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
            <input
              type="text"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Interest</label>
            <select
              value={formData.courseInterest}
              onChange={(e) => setFormData({ ...formData, courseInterest: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="">Select a course</option>
              <option value="Pinnacle NEET Biology">Pinnacle NEET Biology (₹98,000)</option>
              <option value="Ascent NEET Biology">Ascent NEET Biology (₹75,000)</option>
              <option value="Pursuit NEET Biology">Pursuit NEET Biology (₹45,000)</option>
              <option value="Foundation Course">Foundation Course</option>
              <option value="Crash Course">Crash Course</option>
              <option value="Test Series">Test Series</option>
              <option value="Other">Other / Not Sure</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Schedule Demo Modal
function ScheduleDemoModal({
  onClose,
  onSchedule,
  updating,
}: {
  onClose: () => void
  onSchedule: (date: string) => void
  updating: boolean
}) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !time) {
      toast.error('Please select date and time')
      return
    }
    onSchedule(new Date(`${date}T${time}`).toISOString())
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Schedule Demo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
            >
              {updating ? 'Scheduling...' : 'Schedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Lost Reason Modal
function LostReasonModal({
  onClose,
  onConfirm,
  updating,
}: {
  onClose: () => void
  onConfirm: (reason: string) => void
  updating: boolean
}) {
  const [reason, setReason] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reason.trim()) {
      toast.error('Please provide a reason')
      return
    }
    onConfirm(reason)
  }

  const presetReasons = [
    'Not interested anymore',
    'Chose another institute',
    'Budget constraints',
    'Timing issues',
    'No response',
    'Invalid contact',
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Mark Lead as Lost</h2>
        <p className="text-gray-600 text-sm mb-4">Please provide a reason for losing this lead.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {presetReasons.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setReason(preset)}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  reason === preset
                    ? 'bg-red-100 border-red-300 text-red-700'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Or enter custom reason
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="Describe why this lead was lost..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating || !reason.trim()}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {updating ? 'Saving...' : 'Mark as Lost'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Confirm Delete Modal
function ConfirmDeleteModal({
  leadName,
  onClose,
  onConfirm,
  updating,
}: {
  leadName: string
  onClose: () => void
  onConfirm: () => void
  updating: boolean
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Delete Lead?</h2>
          <p className="text-gray-600 text-sm mb-6">
            Are you sure you want to delete <span className="font-medium">{leadName}</span>? This
            action cannot be undone.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={updating}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {updating ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
