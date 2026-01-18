'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCorners,
  DragStartEvent,
} from '@dnd-kit/core'
import { LeadPipelineColumn } from '@/components/counselor/LeadPipelineColumn'
import { LeadCard } from '@/components/counselor/LeadCard'
import { StatsBar } from '@/components/counselor/StatsBar'
import { CreateLeadModal } from '@/components/counselor/CreateLeadModal'

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
  _count?: {
    communications: number
    tasks: number
    notes: number
  }
}

const stages = [
  { id: 'NEW_LEAD', title: 'New Leads', color: 'bg-blue-500' },
  { id: 'DEMO_SCHEDULED', title: 'Demo Scheduled', color: 'bg-purple-500' },
  { id: 'DEMO_COMPLETED', title: 'Demo Done', color: 'bg-indigo-500' },
  { id: 'OFFER_SENT', title: 'Offer Sent', color: 'bg-orange-500' },
  { id: 'NEGOTIATING', title: 'Negotiating', color: 'bg-yellow-500' },
  { id: 'PAYMENT_PLAN_CREATED', title: 'Payment Plan', color: 'bg-green-600' },
  { id: 'ENROLLED', title: 'Enrolled', color: 'bg-green-600' },
]

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState<Priority | 'ALL'>('ALL')
  const [filterSource, setFilterSource] = useState<string>('ALL')
  const [showCreateModal, setShowCreateModal] = useState(false)

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

    const newStage = overId as LeadStage

    if (activeLead.stage === newStage) return

    updateLeadStage(activeId, newStage)
  }

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm)

    const matchesPriority = filterPriority === 'ALL' || lead.priority === filterPriority
    const matchesSource = filterSource === 'ALL' || lead.source === filterSource

    return matchesSearch && matchesPriority && matchesSource
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
      lead._count?.communications?.toString() || '0',
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
      <StatsBar leads={leads} />

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
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
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
