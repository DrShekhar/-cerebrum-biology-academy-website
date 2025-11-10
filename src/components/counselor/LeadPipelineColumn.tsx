'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { LeadCard } from './LeadCard'
import type { Lead } from '@/app/counselor/leads/page'

interface Stage {
  id: string
  title: string
  color: string
}

interface LeadPipelineColumnProps {
  stage: Stage
  leads: Lead[]
  onRefresh: () => void
}

export function LeadPipelineColumn({ stage, leads, onRefresh }: LeadPipelineColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
  })

  return (
    <div className="flex-shrink-0 w-80">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className={`${stage.color} text-white px-4 py-3 rounded-t-lg`}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">{stage.title}</h3>
            <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
              {leads.length}
            </span>
          </div>
        </div>

        <div
          ref={setNodeRef}
          className={`p-3 space-y-3 min-h-[500px] max-h-[calc(100vh-350px)] overflow-y-auto ${
            isOver ? 'bg-indigo-50 ring-2 ring-indigo-400 ring-inset' : ''
          }`}
        >
          <SortableContext items={leads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
            {leads.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                <div className="text-center">
                  <svg
                    className="w-8 h-8 mx-auto mb-2 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <p>No leads here</p>
                </div>
              </div>
            ) : (
              leads.map((lead) => <LeadCard key={lead.id} lead={lead} onRefresh={onRefresh} />)
            )}
          </SortableContext>
        </div>
      </div>
    </div>
  )
}
