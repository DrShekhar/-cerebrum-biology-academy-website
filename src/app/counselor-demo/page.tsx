'use client'

import React, { useState, useEffect } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core'
import { formatDistanceToNow } from 'date-fns'

type LeadStage =
  | 'NEW_LEAD'
  | 'CONTACTED'
  | 'DEMO_SCHEDULED'
  | 'DEMO_COMPLETED'
  | 'OFFER_SENT'
  | 'NEGOTIATING'
  | 'PAYMENT_PENDING'
  | 'ENROLLED'
  | 'ACTIVE_STUDENT'
  | 'LOST'

type LeadPriority = 'HOT' | 'WARM' | 'COLD' | 'URGENT'

interface Lead {
  id: string
  studentName: string
  email: string
  phone: string
  grade: string
  city: string
  school: string
  stage: LeadStage
  priority: LeadPriority
  source: string
  interestedCourse: string
  followUpDate?: string | null
  lastContactedAt?: string | null
  createdAt: string
  _count: {
    communications: number
    tasks: number
    notes: number
  }
}

const STAGE_COLUMNS: { id: LeadStage; title: string; color: string }[] = [
  { id: 'NEW_LEAD', title: 'New Lead', color: 'bg-gray-100' },
  { id: 'CONTACTED', title: 'Contacted', color: 'bg-blue-100' },
  { id: 'DEMO_SCHEDULED', title: 'Demo Scheduled', color: 'bg-purple-100' },
  { id: 'DEMO_COMPLETED', title: 'Demo Done', color: 'bg-indigo-100' },
  { id: 'OFFER_SENT', title: 'Offer Sent', color: 'bg-yellow-100' },
  { id: 'NEGOTIATING', title: 'Negotiating', color: 'bg-orange-100' },
  { id: 'PAYMENT_PENDING', title: 'Payment Pending', color: 'bg-red-100' },
  { id: 'ENROLLED', title: 'Enrolled', color: 'bg-green-100' },
  { id: 'ACTIVE_STUDENT', title: 'Active', color: 'bg-green-100' },
]

// Draggable Lead Card Component
function DraggableLeadCard({ lead }: { lead: Lead }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white border border-gray-200 rounded-lg p-3 cursor-move hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900">{lead.studentName}</h4>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            lead.priority === 'HOT'
              ? 'bg-red-100 text-red-700'
              : lead.priority === 'WARM'
                ? 'bg-yellow-100 text-yellow-700'
                : lead.priority === 'URGENT'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-700'
          }`}
        >
          {lead.priority === 'HOT' && '🔥'}
          {lead.priority === 'WARM' && '⚡'}
          {lead.priority === 'COLD' && '❄️'}
          {lead.priority === 'URGENT' && '🚨'} {lead.priority}
        </span>
      </div>

      <div className="text-xs text-gray-600 space-y-1 mb-2">
        <div className="flex items-center gap-1">
          <span>📧</span>
          <span className="truncate">{lead.email}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>📞</span>
          <span>{lead.phone}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>🏫</span>
          <span className="truncate">{lead.school}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>📍</span>
          <span>{lead.city}</span>
        </div>
      </div>

      {lead.followUpDate && (
        <div className="text-xs text-gray-600 mb-2">
          📅 Follow-up: {formatDistanceToNow(new Date(lead.followUpDate), { addSuffix: true })}
        </div>
      )}

      <div className="flex gap-2 text-xs text-gray-500">
        <span>💬 {lead._count.communications}</span>
        <span>✅ {lead._count.tasks}</span>
        <span>📝 {lead._count.notes}</span>
      </div>
    </div>
  )
}

// Droppable Column Component
function DroppableColumn({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  const columnLeads = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === DraggableLeadCard
  )

  return (
    <div
      ref={setNodeRef}
      className={`w-80 flex-shrink-0 bg-white rounded-lg border-2 p-4 transition-colors ${
        isOver ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium">
          {columnLeads.length}
        </span>
      </div>

      <div className="space-y-3">{children}</div>
    </div>
  )
}

export default function CounselorDemoPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<LeadPriority | 'ALL'>('ALL')

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))

  useEffect(() => {
    fetchLeads()
  }, [])

  async function fetchLeads() {
    try {
      setLoading(true)
      const response = await fetch('/api/counselor/leads/demo')
      const result = await response.json()
      if (result.success) {
        setLeads(result.data)
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery)

    const matchesPriority = priorityFilter === 'ALL' || lead.priority === priorityFilter

    return matchesSearch && matchesPriority
  })

  const getLeadsByStage = (stage: LeadStage) => {
    return filteredLeads.filter((lead) => lead.stage === stage)
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const leadId = active.id as string
      const newStage = over.id as LeadStage

      setLeads((prevLeads) =>
        prevLeads.map((lead) => (lead.id === leadId ? { ...lead, stage: newStage } : lead))
      )
    }

    setActiveId(null)
  }

  const activeLead = activeId ? leads.find((lead) => lead.id === activeId) : null

  // Calculate stats
  const stats = {
    total: filteredLeads.length,
    hot: filteredLeads.filter((l) => l.priority === 'HOT').length,
    dueToday: filteredLeads.filter((l) => {
      if (!l.followUpDate) return false
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      const followUp = new Date(l.followUpDate)
      return followUp >= today && followUp < tomorrow
    }).length,
    enrolled: filteredLeads.filter((l) => l.stage === 'ENROLLED' || l.stage === 'ACTIVE_STUDENT')
      .length,
    conversionRate:
      filteredLeads.length > 0
        ? Math.round(
            (filteredLeads.filter((l) => l.stage === 'ENROLLED' || l.stage === 'ACTIVE_STUDENT')
              .length /
              filteredLeads.length) *
              100
          )
        : 0,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-indigo-600">Cerebrum</span> | Counselor CRM Demo
              </h1>
              <p className="text-sm text-gray-600 mt-1">Demo Mode - No Authentication Required</p>
            </div>
            <button
              onClick={fetchLeads}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4 mb-4">
            <div className="bg-blue-50 rounded-lg p-2 sm:p-3">
              <div className="text-xs text-blue-600 font-medium">Total Leads</div>
              <div className="text-lg sm:text-2xl font-bold text-blue-900">{stats.total}</div>
            </div>
            <div className="bg-red-50 rounded-lg p-2 sm:p-3">
              <div className="text-xs text-red-600 font-medium">🔥 Hot Leads</div>
              <div className="text-lg sm:text-2xl font-bold text-red-900">{stats.hot}</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-2 sm:p-3">
              <div className="text-xs text-yellow-600 font-medium">Due Today</div>
              <div className="text-lg sm:text-2xl font-bold text-yellow-900">{stats.dueToday}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-2 sm:p-3">
              <div className="text-xs text-green-600 font-medium">Enrolled</div>
              <div className="text-2xl font-bold text-green-900">{stats.enrolled}</div>
            </div>
            <div className="bg-indigo-50 rounded-lg p-3">
              <div className="text-xs text-indigo-600 font-medium">Conversion</div>
              <div className="text-2xl font-bold text-indigo-900">{stats.conversionRate}%</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="ALL">All Priorities</option>
              <option value="HOT">🔥 Hot</option>
              <option value="WARM">⚡ Warm</option>
              <option value="COLD">❄️ Cold</option>
              <option value="URGENT">🚨 Urgent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pipeline Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="p-6 overflow-x-auto">
          <div className="inline-flex gap-4 pb-4">
            {STAGE_COLUMNS.map((column) => {
              const columnLeads = getLeadsByStage(column.id)
              return (
                <DroppableColumn key={column.id} id={column.id} title={column.title}>
                  {columnLeads.map((lead) => (
                    <DraggableLeadCard key={lead.id} lead={lead} />
                  ))}
                  {columnLeads.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm">
                      No leads in this stage
                    </div>
                  )}
                </DroppableColumn>
              )
            })}
          </div>
        </div>

        <DragOverlay>
          {activeLead && (
            <div className="bg-white border border-indigo-500 rounded-lg p-3 shadow-lg w-80">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{activeLead.studentName}</h4>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                  {activeLead.priority}
                </span>
              </div>
              <div className="text-xs text-gray-600">{activeLead.email}</div>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
