'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Lead } from './types'

interface LeadCardProps {
  lead: Lead
}

const priorityConfig = {
  hot: {
    emoji: '🔥',
    label: 'HOT',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
  },
  warm: {
    emoji: '⚠️',
    label: 'WARM',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200',
  },
  cold: {
    emoji: '❄️',
    label: 'COLD',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
  },
}

export function LeadCard({ lead }: LeadCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: lead.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const priority = priorityConfig[lead.priority]

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200
        hover:shadow-md hover:-translate-y-0.5 transition-all duration-200
        cursor-grab active:cursor-grabbing
        ${isDragging ? 'opacity-50 shadow-lg' : ''}
      `}
    >
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-base truncate flex items-center gap-2">
              {priority.emoji}
              <span className="truncate">{lead.name}</span>
            </h3>
          </div>
          <span
            className={`
              inline-flex items-center px-2 py-1 rounded text-xs font-medium whitespace-nowrap
              ${priority.bgColor} ${priority.textColor} ${priority.borderColor} border
            `}
          >
            {priority.label}
          </span>
        </div>

        <div className="space-y-1.5 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <span className="text-base">📱</span>
            <span className="truncate">{lead.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <span className="text-base">📧</span>
            <span className="truncate">{lead.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <span className="text-base">📚</span>
            <span className="truncate font-medium">{lead.course}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100 space-y-1 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-base">💬</span>
            <span>Last contact: {lead.lastContact}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">📅</span>
            <span>Next follow-up: {lead.nextFollowUp}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              alert(`Opening WhatsApp for ${lead.name}`)
            }}
            className="
              flex-1 flex items-center justify-center gap-2 px-3 py-2.5
              bg-[#166534] hover:bg-[#14532d] text-white rounded-md
              font-medium text-sm transition-colors duration-150
              shadow-sm hover:shadow
            "
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              alert(`Calling ${lead.name}`)
            }}
            className="
              flex items-center justify-center px-3 py-2.5
              bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md
              font-medium text-sm transition-colors duration-150
              border border-indigo-200
            "
          >
            📞
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              alert(`Viewing details for ${lead.name}`)
            }}
            className="
              flex items-center justify-center px-3 py-2.5
              bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-md
              font-medium text-sm transition-colors duration-150
              border border-gray-200
            "
          >
            →
          </button>
        </div>

        <div className="text-xs text-gray-500 pt-1">Source: {lead.source}</div>
      </div>
    </div>
  )
}
