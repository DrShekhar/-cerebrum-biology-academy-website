'use client'

import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Lead, StageConfig } from './types'
import { LeadCard } from './LeadCard'

interface PipelineColumnProps {
  stage: StageConfig
  leads: Lead[]
}

export function PipelineColumn({ stage, leads }: PipelineColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
  })

  return (
    <div className="flex flex-col h-full min-w-[320px] lg:min-w-[380px]">
      <div
        className="px-4 py-3 rounded-t-lg border-b-2"
        style={{
          backgroundColor: stage.bgColor,
          borderColor: stage.color,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base" style={{ color: stage.color }}>
              {stage.name}
            </h3>
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: stage.color }}
            >
              {leads.length}
            </span>
          </div>
          {stage.id === 'new_lead' && (
            <button
              onClick={() => alert('Add new lead functionality')}
              className="
                flex items-center justify-center w-8 h-8 rounded-full
                bg-white shadow-sm hover:shadow-md transition-shadow
                text-lg font-bold
              "
              style={{ color: stage.color }}
            >
              +
            </button>
          )}
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={`
          flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50 rounded-b-lg
          transition-colors duration-200
          ${isOver ? 'bg-indigo-50 ring-2 ring-indigo-300' : ''}
        `}
        style={{
          minHeight: '500px',
          maxHeight: 'calc(100vh - 400px)',
        }}
      >
        <SortableContext
          items={leads.map((lead) => lead.id)}
          strategy={verticalListSortingStrategy}
        >
          {leads.length > 0 ? (
            leads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
          ) : (
            <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
              <div className="text-center">
                <div className="text-3xl mb-2">📭</div>
                <div>No leads in this stage</div>
              </div>
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  )
}
