'use client'

import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Lead } from '@/app/counselor/leads/page'
import { formatDistanceToNow } from 'date-fns'
import { WhatsAppMessageModal } from './WhatsAppMessageModal'
import { FeePlanModal } from './FeePlanModal'

interface LeadCardProps {
  lead: Lead
  isDragging?: boolean
  onRefresh?: () => void
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles = {
    HOT: 'bg-red-100 text-red-800 border-red-200',
    WARM: 'bg-orange-100 text-orange-800 border-orange-200',
    COLD: 'bg-blue-100 text-blue-800 border-blue-200',
  }

  const icons = {
    HOT: '🔥',
    WARM: '⚡',
    COLD: '❄️',
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
        styles[priority as keyof typeof styles]
      }`}
    >
      <span>{icons[priority as keyof typeof icons]}</span>
      {priority}
    </span>
  )
}

export function LeadCard({ lead, isDragging = false, onRefresh }: LeadCardProps) {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false)
  const [isFeePlanModalOpen, setIsFeePlanModalOpen] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: lead.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSortableDragging ? 0.5 : 1,
  }

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return 'Not set'
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true })
    } catch {
      return 'Invalid date'
    }
  }

  const getWhatsAppLink = () => {
    const cleanPhone = lead.phone.replace(/[^\d+]/g, '')
    const message = `Hi ${lead.studentName}, this is from Cerebrum Biology Academy. We wanted to follow up regarding your interest in ${lead.courseInterest}. When would be a good time to connect?`
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
  }

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(getWhatsAppLink(), '_blank')
  }

  const handleWhatsAppModalClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsWhatsAppModalOpen(true)
  }

  const handleFeePlanClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFeePlanModalOpen(true)
  }

  const handleSuccess = () => {
    onRefresh?.()
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-white rounded-lg p-4 border border-gray-200
        hover:shadow-md transition-all duration-200
        cursor-grab active:cursor-grabbing
        ${isDragging || isSortableDragging ? 'shadow-xl ring-2 ring-indigo-400' : 'shadow-sm'}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm truncate mb-1">{lead.studentName}</h3>
          <PriorityBadge priority={lead.priority} />
        </div>
      </div>

      <div className="space-y-2 text-xs text-gray-600 mb-3">
        <div className="flex items-center gap-2">
          <svg
            className="w-3.5 h-3.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span className="truncate">{lead.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-3.5 h-3.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className="truncate">{lead.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-3.5 h-3.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <span className="truncate font-medium">{lead.courseInterest}</span>
        </div>
      </div>

      {lead.source && (
        <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
          <span className="font-medium">Source:</span>
          <span>{lead.source}</span>
        </div>
      )}

      {lead.nextFollowUpAt && (
        <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
          <div className="flex items-center gap-1 text-yellow-800">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">Follow-up: {formatDate(lead.nextFollowUpAt)}</span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
        {lead._count && (
          <>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              {lead._count.communications}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              {lead._count.tasks}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              {lead._count.notes}
            </span>
          </>
        )}
      </div>

      <div className="space-y-2 pt-3 border-t border-gray-100">
        <div className="flex gap-2">
          <button
            onClick={handleWhatsAppClick}
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              window.location.href = `tel:${lead.phone}`
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors"
            title="Call"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              // TODO: Open lead details modal
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors"
            title="View Details"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        </div>

        <button
          onClick={handleFeePlanClick}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          Create Fee Plan
        </button>
      </div>

      <WhatsAppMessageModal
        lead={lead}
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <FeePlanModal
        lead={lead}
        isOpen={isFeePlanModalOpen}
        onClose={() => setIsFeePlanModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
