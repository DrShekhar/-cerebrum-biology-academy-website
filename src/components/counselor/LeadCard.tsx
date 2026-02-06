'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  Phone,
  Mail,
  MessageSquare,
  Clock,
  GripVertical,
  ExternalLink,
  Star,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Lead, Priority } from '@/app/counselor/leads/page'

interface LeadCardProps {
  lead: Lead
  isDragging?: boolean
  onRefresh?: () => void
}

const priorityConfig: Record<
  Priority,
  { label: string; emoji: string; bg: string; ring: string }
> = {
  HOT: { label: 'Hot', emoji: '🔥', bg: 'bg-red-50', ring: 'ring-red-200' },
  WARM: { label: 'Warm', emoji: '⚡', bg: 'bg-amber-50', ring: 'ring-amber-200' },
  COLD: { label: 'Cold', emoji: '❄️', bg: 'bg-blue-50', ring: 'ring-blue-200' },
}

function ScoreDot({ score }: { score: number | null }) {
  const s = score || 0
  const color = s >= 70 ? 'bg-green-500' : s >= 40 ? 'bg-yellow-500' : 'bg-red-400'
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-xs text-gray-500 font-medium">{s}</span>
    </div>
  )
}

export function LeadCard({ lead, isDragging, onRefresh }: LeadCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: lead.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const priority = priorityConfig[lead.priority] || priorityConfig.WARM
  const hasOverdueFollowUp =
    lead.nextFollowUpAt && new Date(lead.nextFollowUpAt) < new Date()

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group bg-white rounded-lg border transition-all ${
        isDragging || isSortableDragging
          ? 'shadow-lg border-indigo-300 ring-2 ring-indigo-200 opacity-90'
          : `border-gray-200 hover:border-indigo-200 hover:shadow-sm ${priority.bg}`
      }`}
    >
      {/* Drag Handle + Card Content */}
      <div className="p-3">
        {/* Top row: Drag handle + Priority + Score */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-0.5 -ml-1 opacity-0 group-hover:opacity-100 transition-opacity touch-none"
            >
              <GripVertical className="w-4 h-4 text-gray-300" />
            </button>
            <span className="text-xs font-medium">
              {priority.emoji} {priority.label}
            </span>
          </div>
          <ScoreDot score={lead.score} />
        </div>

        {/* Student Name — clickable link to detail page */}
        <Link
          href={`/counselor/leads/${lead.id}`}
          className="block group/link"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {lead.studentName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate group-hover/link:text-indigo-600 transition-colors">
                {lead.studentName}
              </p>
              <p className="text-xs text-gray-400 truncate">{lead.courseInterest}</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
          </div>
        </Link>

        {/* Contact info */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
          {lead.phone && (
            <a
              href={`tel:${lead.phone}`}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone className="w-3 h-3" />
              <span className="truncate max-w-[80px]">{lead.phone}</span>
            </a>
          )}
          {lead.email && (
            <a
              href={`mailto:${lead.email}`}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Mail className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Bottom row: Source + Follow-up + Quick actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {lead.source && (
              <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded font-medium">
                {lead.source.replace(/_/g, ' ')}
              </span>
            )}
            {hasOverdueFollowUp && (
              <span className="text-[10px] px-1.5 py-0.5 bg-red-100 text-red-600 rounded font-medium flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5" /> Overdue
              </span>
            )}
            {lead.nextFollowUpAt && !hasOverdueFollowUp && (
              <span className="text-[10px] text-gray-400">
                Follow-up {formatDistanceToNow(new Date(lead.nextFollowUpAt), { addSuffix: true })}
              </span>
            )}
          </div>

          {/* Quick WhatsApp */}
          <a
            href={`https://wa.me/91${lead.phone.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md hover:bg-green-50 text-gray-400 hover:text-green-600 transition-colors"
            onClick={(e) => e.stopPropagation()}
            title="WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Activity counts */}
        {lead._count && (
          <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-100 text-[10px] text-gray-400">
            <span>{lead._count.communications || 0} msgs</span>
            <span>{lead._count.tasks || 0} tasks</span>
            <span>{lead._count.notes || 0} notes</span>
          </div>
        )}
      </div>
    </div>
  )
}
