'use client'

import React, { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core'
import { Lead, LeadStage } from './types'
import { sampleLeads, stageConfigs } from './sampleData'
import { PipelineColumn } from './PipelineColumn'
import { LeadCard } from './LeadCard'

export function PipelineBoard() {
  const [leads, setLeads] = useState<Lead[]>(sampleLeads)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }

    const leadId = active.id as string
    const newStage = over.id as LeadStage

    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === leadId ? { ...lead, stage: newStage } : lead))
    )

    setActiveId(null)
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  const filteredLeads = leads.filter((lead) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      lead.name.toLowerCase().includes(query) ||
      lead.email.toLowerCase().includes(query) ||
      lead.phone.includes(query) ||
      lead.course.toLowerCase().includes(query)
    )
  })

  const activeLead = activeId ? leads.find((lead) => lead.id === activeId) : null

  const getLeadsByStage = (stageId: LeadStage) => {
    return filteredLeads.filter((lead) => lead.stage === stageId)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            🎯 Lead Pipeline
          </h2>
          <p className="text-sm text-gray-600 mt-1">Drag and drop leads between stages</p>
        </div>
        <div className="w-full sm:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full sm:w-80 px-4 py-2 pl-10 pr-4
                border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                text-sm
              "
            />
            <span className="absolute left-3 top-2.5 text-gray-400 text-lg">🔍</span>
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="relative">
          <div className="overflow-x-auto pb-4">
            <div className="inline-flex gap-4 min-w-full">
              {stageConfigs.map((stage) => (
                <PipelineColumn key={stage.id} stage={stage} leads={getLeadsByStage(stage.id)} />
              ))}
            </div>
          </div>

          {filteredLeads.length === 0 && searchQuery && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-lg">
              <div className="text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No leads found</h3>
                <p className="text-gray-600">Try adjusting your search query</p>
              </div>
            </div>
          )}
        </div>

        <DragOverlay>
          {activeLead ? (
            <div className="rotate-3 scale-105 opacity-90">
              <LeadCard lead={activeLead} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="font-semibold text-indigo-900 mb-1">Pro Tip: Drag & Drop</h4>
            <p className="text-sm text-indigo-800">
              Click and drag any lead card to move it between stages. The system will automatically
              update the lead status and trigger relevant workflows.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
