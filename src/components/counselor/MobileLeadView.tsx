'use client'

import { useState } from 'react'
import {
  Phone,
  Mail,
  MessageSquare,
  ChevronRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  Flame,
  Snowflake,
  Zap,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Lead, LeadStage } from '@/app/counselor/leads/page'

interface MobileLeadViewProps {
  leads: Lead[]
  onLeadClick: (lead: Lead) => void
  onWhatsAppClick: (lead: Lead) => void
  onCallClick: (lead: Lead) => void
  onEmailClick: (lead: Lead) => void
}

const stageColors: Record<LeadStage, string> = {
  NEW_LEAD: 'bg-blue-500',
  DEMO_SCHEDULED: 'bg-purple-500',
  DEMO_COMPLETED: 'bg-indigo-500',
  OFFER_SENT: 'bg-orange-500',
  NEGOTIATING: 'bg-yellow-500',
  PAYMENT_PLAN_CREATED: 'bg-green-600',
  ENROLLED: 'bg-green-600',
  ACTIVE_STUDENT: 'bg-green-600',
  LOST: 'bg-gray-500',
}

const stageLabels: Record<LeadStage, string> = {
  NEW_LEAD: 'New',
  DEMO_SCHEDULED: 'Demo Scheduled',
  DEMO_COMPLETED: 'Demo Done',
  OFFER_SENT: 'Offer Sent',
  NEGOTIATING: 'Negotiating',
  PAYMENT_PLAN_CREATED: 'Payment Plan',
  ENROLLED: 'Enrolled',
  ACTIVE_STUDENT: 'Active',
  LOST: 'Lost',
}

const priorityConfig = {
  HOT: { icon: Flame, color: 'text-red-500', bg: 'bg-red-50', label: 'Hot' },
  WARM: { icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50', label: 'Warm' },
  COLD: { icon: Snowflake, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Cold' },
}

function SwipeableLeadCard({
  lead,
  onLeadClick,
  onWhatsAppClick,
  onCallClick,
  onEmailClick,
}: {
  lead: Lead
  onLeadClick: (lead: Lead) => void
  onWhatsAppClick: (lead: Lead) => void
  onCallClick: (lead: Lead) => void
  onEmailClick: (lead: Lead) => void
}) {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)

  const PriorityIcon = priorityConfig[lead.priority].icon

  return (
    <div className="relative overflow-hidden">
      {/* Background action hints */}
      <div className="absolute inset-0 flex items-center justify-between px-6">
        <div className="flex items-center gap-2 text-white">
          <MessageSquare className="w-5 h-5" />
          <span className="font-medium">WhatsApp</span>
        </div>
        <div className="flex items-center gap-2 text-white">
          <span className="font-medium">Call</span>
          <Phone className="w-5 h-5" />
        </div>
      </div>

      {/* Card */}
      <div
        className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-fadeInUp"
      >
        <div className="flex items-start justify-between gap-3">
          {/* Left: Lead info */}
          <div className="flex-1 min-w-0" onClick={() => onLeadClick(lead)}>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 truncate">{lead.studentName}</h3>
              <div className={`${priorityConfig[lead.priority].bg} rounded-full p-1`}>
                <PriorityIcon className={`w-3 h-3 ${priorityConfig[lead.priority].color}`} />
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Phone className="w-3.5 h-3.5" />
              <span className="truncate">{lead.phone}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Mail className="w-3.5 h-3.5" />
              <span className="truncate">{lead.email}</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`${stageColors[lead.stage]} text-white text-xs font-medium px-2 py-0.5 rounded-full`}
              >
                {stageLabels[lead.stage]}
              </span>
              <span className="text-xs text-gray-500">{lead.courseInterest}</span>
            </div>

            {/* Follow-up info */}
            {lead.nextFollowUpAt && (
              <div className="flex items-center gap-1 mt-2 text-xs">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-gray-500">
                  Follow up{' '}
                  {formatDistanceToNow(new Date(lead.nextFollowUpAt), { addSuffix: true })}
                </span>
              </div>
            )}

            {/* Activity counts */}
            {lead._count && (
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {lead._count.communications}
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {lead._count.tasks}
                </span>
              </div>
            )}
          </div>

          {/* Right: Chevron */}
          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
        </div>
      </div>
    </div>
  )
}

export function MobileLeadView({
  leads,
  onLeadClick,
  onWhatsAppClick,
  onCallClick,
  onEmailClick,
}: MobileLeadViewProps) {
  const [groupBy, setGroupBy] = useState<'stage' | 'priority'>('stage')

  // Group leads
  const groupedLeads =
    groupBy === 'stage'
      ? leads.reduce(
          (acc, lead) => {
            if (!acc[lead.stage]) acc[lead.stage] = []
            acc[lead.stage].push(lead)
            return acc
          },
          {} as Record<LeadStage, Lead[]>
        )
      : leads.reduce(
          (acc, lead) => {
            if (!acc[lead.priority]) acc[lead.priority] = []
            acc[lead.priority].push(lead)
            return acc
          },
          {} as Record<string, Lead[]>
        )

  return (
    <div className="h-full overflow-hidden flex flex-col">
      {/* Group toggle */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Group by:</span>
          <button
            onClick={() => setGroupBy('stage')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              groupBy === 'stage'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Stage
          </button>
          <button
            onClick={() => setGroupBy('priority')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              groupBy === 'priority'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Priority
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 Swipe right for WhatsApp, swipe left to call
        </p>
      </div>

      {/* Grouped lists */}
      <div className="flex-1 overflow-y-auto">
        {Object.entries(groupedLeads).map(([group, groupLeads]) => (
          <div key={group} className="mb-4">
            <div className="sticky top-0 bg-gray-50 px-4 py-2 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  {groupBy === 'stage' ? stageLabels[group as LeadStage] : group}
                </h3>
                <span className="text-sm text-gray-500">{groupLeads.length}</span>
              </div>
            </div>

            <div className="px-4 py-2 space-y-2">
              {groupLeads.map((lead) => (
                <SwipeableLeadCard
                  key={lead.id}
                  lead={lead}
                  onLeadClick={onLeadClick}
                  onWhatsAppClick={onWhatsAppClick}
                  onCallClick={onCallClick}
                  onEmailClick={onEmailClick}
                />
              ))}
            </div>
          </div>
        ))}

        {leads.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <AlertCircle className="w-12 h-12 text-gray-400 mb-3" />
            <p className="text-gray-600 font-medium">No leads found</p>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
