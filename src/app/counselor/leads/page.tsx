'use client'

import { useEffect, useRef, useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCorners,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { LeadPipelineColumn } from '@/components/counselor/LeadPipelineColumn'
import { LeadCard } from '@/components/counselor/LeadCard'
import { StatsBar } from '@/components/counselor/StatsBar'
import { CreateLeadModal } from '@/components/counselor/CreateLeadModal'
import { LeadColorLegend, useLeadColorTags } from '@/components/staff/LeadColorLegend'
import { stageSolidClass } from '@/lib/leads/stageColors'

export type LeadStage =
  | 'NEW_LEAD'
  | 'DEMO_SCHEDULED'
  | 'DEMO_COMPLETED'
  | 'OFFER_SENT'
  | 'NEGOTIATING'
  | 'PAYMENT_PLAN_CREATED'
  | 'ENROLLED'
  | 'ACTIVE_STUDENT'
  | 'LOST'

export type Priority = 'HOT' | 'WARM' | 'COLD'

export interface Lead {
  id: string
  studentName: string
  email: string
  phone: string
  courseInterest: string
  stage: LeadStage
  priority: Priority
  source?: string | null
  score?: number | null
  scoreUpdatedAt?: Date | null
  scoreBreakdown?: any
  lastContactedAt?: Date | null
  nextFollowUpAt?: Date | null
  createdAt: Date
  metadata?: { colorTag?: string | null } | null
  _count?: {
    crm_communications: number
    tasks: number
    notes: number
  }
}

const stages = [
  { id: 'NEW_LEAD', title: 'New Leads', color: stageSolidClass('NEW_LEAD') },
  { id: 'DEMO_SCHEDULED', title: 'Demo Scheduled', color: stageSolidClass('DEMO_SCHEDULED') },
  { id: 'DEMO_COMPLETED', title: 'Demo Done', color: stageSolidClass('DEMO_COMPLETED') },
  { id: 'OFFER_SENT', title: 'Offer Sent', color: stageSolidClass('OFFER_SENT') },
  { id: 'NEGOTIATING', title: 'Negotiating', color: stageSolidClass('NEGOTIATING') },
  {
    id: 'PAYMENT_PLAN_CREATED',
    title: 'Payment Plan',
    color: stageSolidClass('PAYMENT_PLAN_CREATED'),
  },
  { id: 'ENROLLED', title: 'Enrolled', color: stageSolidClass('ENROLLED') },
]

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState<Priority | 'ALL'>('ALL')
  const [filterSource, setFilterSource] = useState<string>('ALL')
  const [filterColor, setFilterColor] = useState<string>('ALL')
  // Quick filter driven by the stat tiles (This Week / Due Today / Overdue / Enrolled)
  const [quickFilter, setQuickFilter] = useState<{ type: string; value: string } | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { tags: colorTags, refresh: refreshColorTags } = useLeadColorTags()
  const boardRef = useRef<HTMLDivElement | null>(null)

  // Require 8px of movement before a drag starts — plain clicks still open the
  // lead, and the whole card body becomes draggable (not just the grip icon).
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  useEffect(() => {
    fetchLeads()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        setShowCreateModal(true)
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault()
        document.querySelector<HTMLInputElement>('input[type="text"]')?.focus()
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault()
        exportToCSV()
      }
      if (e.key === 'Escape') {
        setShowCreateModal(false)
        setSearchTerm('')
        setFilterPriority('ALL')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchTerm])

  async function fetchLeads() {
    try {
      setLoading(true)
      const response = await fetch('/api/counselor/leads', {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch leads')
      }

      const data = await response.json()
      setLeads(data.data || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching leads:', err)
    } finally {
      setLoading(false)
    }
  }

  async function updateLeadStage(leadId: string, newStage: LeadStage) {
    try {
      const response = await fetch(`/api/counselor/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: newStage }),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to update lead')
      }

      const data = await response.json()

      setLeads((prevLeads) =>
        prevLeads.map((lead) => (lead.id === leadId ? { ...lead, stage: newStage } : lead))
      )
    } catch (err) {
      console.error('Error updating lead:', err)
      fetchLeads()
    }
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeLead = leads.find((lead) => lead.id === activeId)
    if (!activeLead) return

    // `over` can be a COLUMN (stage id) or another CARD (lead id) — cards are
    // sortable droppables, so dropping onto a non-empty column usually lands
    // on a card. Resolve a card drop to that card's stage; previously the raw
    // card id was sent as the stage → zod 400 → the move silently reverted.
    const isStage = stages.some((s) => s.id === overId)
    const newStage = isStage
      ? (overId as LeadStage)
      : (leads.find((lead) => lead.id === overId)?.stage ?? null)
    if (!newStage) return

    if (activeLead.stage === newStage) return

    updateLeadStage(activeId, newStage)
  }

  const matchesQuickFilter = (lead: Lead): boolean => {
    if (!quickFilter) return true
    const now = new Date()
    switch (quickFilter.type) {
      case 'thisWeek':
        return new Date(lead.createdAt) >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      case 'dueToday':
        return (
          !!lead.nextFollowUpAt &&
          new Date(lead.nextFollowUpAt).toDateString() === now.toDateString()
        )
      case 'overdue':
        return (
          !!lead.nextFollowUpAt &&
          new Date(lead.nextFollowUpAt) < now &&
          lead.stage !== 'ENROLLED' &&
          lead.stage !== 'ACTIVE_STUDENT' &&
          lead.stage !== 'LOST'
        )
      case 'stage':
        return quickFilter.value.split(',').includes(lead.stage)
      default:
        return true
    }
  }

  const handleStatFilter = (filterType: string, value: string) => {
    if (filterType === 'all') {
      setQuickFilter(null)
      setFilterPriority('ALL')
      setFilterSource('ALL')
      setFilterColor('ALL')
      setSearchTerm('')
      return
    }
    if (filterType === 'priority') {
      // Toggle: clicking Hot Leads again clears it.
      setFilterPriority((prev) => (prev === value ? 'ALL' : (value as Priority)))
      return
    }
    if (filterType === 'conversion') {
      // Conversion is a ratio — show the enrolled set behind it.
      setQuickFilter((prev) =>
        prev?.type === 'stage' ? null : { type: 'stage', value: 'ENROLLED,ACTIVE_STUDENT' }
      )
      return
    }
    setQuickFilter((prev) =>
      prev?.type === filterType && prev.value === value ? null : { type: filterType, value }
    )
  }

  const QUICK_FILTER_LABEL: Record<string, string> = {
    thisWeek: 'Added this week',
    dueToday: 'Follow-up due today',
    overdue: 'Overdue follow-ups',
    stage: 'Enrolled students',
  }

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm)

    const matchesPriority = filterPriority === 'ALL' || lead.priority === filterPriority
    const matchesSource = filterSource === 'ALL' || lead.source === filterSource
    const matchesColor = filterColor === 'ALL' || lead.metadata?.colorTag === filterColor

    return (
      matchesSearch && matchesPriority && matchesSource && matchesColor && matchesQuickFilter(lead)
    )
  })

  const activeLead = leads.find((lead) => lead.id === activeId)

  const exportToCSV = () => {
    const headers = [
      'Student Name',
      'Email',
      'Phone',
      'Course',
      'Stage',
      'Priority',
      'Source',
      'Created Date',
      'Last Contacted',
      'Next Follow-up',
      'Communications',
      'Tasks',
      'Notes',
    ]

    const csvData = filteredLeads.map((lead) => [
      lead.studentName,
      lead.email || '',
      lead.phone,
      lead.courseInterest,
      lead.stage.replace(/_/g, ' '),
      lead.priority,
      lead.source?.replace(/_/g, ' ') || '',
      new Date(lead.createdAt).toLocaleDateString(),
      lead.lastContactedAt ? new Date(lead.lastContactedAt).toLocaleDateString() : '',
      lead.nextFollowUpAt ? new Date(lead.nextFollowUpAt).toLocaleDateString() : '',
      lead._count?.crm_communications?.toString() || '0',
      lead._count?.tasks?.toString() || '0',
      lead._count?.notes?.toString() || '0',
    ])

    const csvContent = [
      headers.join(','),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `cerebrum-leads-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leads...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <p className="text-gray-900 font-semibold mb-2">Error Loading Leads</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchLeads}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <StatsBar leads={leads} onFilterClick={handleStatFilter} />

      {(quickFilter || filterPriority !== 'ALL') && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-500">Filtering:</span>
          {quickFilter && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 font-medium text-indigo-700">
              {QUICK_FILTER_LABEL[quickFilter.type] || quickFilter.type}
              <button
                onClick={() => setQuickFilter(null)}
                className="font-bold hover:text-indigo-900"
              >
                ×
              </button>
            </span>
          )}
          {filterPriority !== 'ALL' && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 font-medium text-red-700">
              {filterPriority} priority
              <button
                onClick={() => setFilterPriority('ALL')}
                className="font-bold hover:text-red-900"
              >
                ×
              </button>
            </span>
          )}
          <button
            onClick={() => handleStatFilter('all', '')}
            className="text-gray-500 underline hover:text-gray-700"
          >
            Clear all
          </button>
        </div>
      )}

      <LeadColorLegend tags={colorTags} onTagsChanged={() => void refreshColorTags()} />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search leads by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as Priority | 'ALL')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="ALL">All Priorities</option>
              <option value="HOT">🔥 Hot</option>
              <option value="WARM">⚡ Warm</option>
              <option value="COLD">❄️ Cold</option>
            </select>

            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="ALL">All Sources</option>
              <option value="MANUAL_ENTRY">📝 Manual Entry</option>
              <option value="WALK_IN">🚶 Walk-in</option>
              <option value="PHONE_CALL">📞 Phone Call</option>
              <option value="WEBSITE">🌐 Website</option>
              <option value="REFERRAL">👥 Referral</option>
              <option value="SOCIAL_MEDIA">📱 Social Media</option>
              <option value="EMAIL_CAMPAIGN">📧 Email</option>
              <option value="OTHER">📋 Other</option>
            </select>

            <select
              value={filterColor}
              onChange={(e) => setFilterColor(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              title="Filter by color tag"
            >
              <option value="ALL">All Colors</option>
              {colorTags.map((t) => (
                <option key={t.id} value={t.id}>
                  ● {t.label}
                </option>
              ))}
            </select>

            <button
              onClick={fetchLeads}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Refresh"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>

            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
              title="Export to CSV"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              + New Lead
            </button>
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        {/* Bounded scroll region + a w-max inner track so the fixed-width
            columns overflow and scroll horizontally instead of being clipped.
            Arrow buttons give mouse users (no horizontal wheel, hidden macOS
            scrollbars) a way to reach the later stages. */}
        <div className="relative">
          <button
            aria-label="Scroll pipeline left"
            onClick={() => boardRef.current?.scrollBy({ left: -360, behavior: 'smooth' })}
            className="absolute -left-3 top-24 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:bg-gray-50 lg:flex"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            aria-label="Scroll pipeline right"
            onClick={() => boardRef.current?.scrollBy({ left: 360, behavior: 'smooth' })}
            className="absolute -right-3 top-24 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:bg-gray-50 lg:flex"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
          <div ref={boardRef} className="w-full overflow-x-auto overscroll-x-contain pb-4">
            <div className="flex w-max gap-4">
              {stages.map((stage) => {
                const stageLeads = filteredLeads.filter((lead) => lead.stage === stage.id)
                return (
                  <LeadPipelineColumn
                    key={stage.id}
                    stage={stage}
                    leads={stageLeads}
                    onRefresh={fetchLeads}
                  />
                )
              })}
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeId && activeLead ? (
            <div className="rotate-3 scale-105 cursor-grabbing">
              <LeadCard lead={activeLead} isDragging />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <CreateLeadModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={fetchLeads}
      />
    </div>
  )
}
