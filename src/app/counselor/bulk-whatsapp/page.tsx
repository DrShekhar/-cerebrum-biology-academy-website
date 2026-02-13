'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  MessageSquare,
  Users,
  Search,
  Filter,
  Send,
  CheckCircle2,
  X,
  Loader2,
  FileText,
  Eye,
  ChevronDown,
  AlertCircle,
  Check,
  Minus,
} from 'lucide-react'
import { format } from 'date-fns'
import { showToast } from '@/lib/toast'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Lead {
  id: string
  studentName: string
  phone: string
  email: string | null
  stage: string
  priority: string
  courseInterest: string
}

interface Template {
  id: string
  name: string
  type: string
  message: string
  subject: string | null
  usageCount: number
}

// ─── Template Preview ────────────────────────────────────────────────────────

function TemplatePreview({ template, lead }: { template: Template; lead?: Lead }) {
  const personalized = template.message
    .replace(/\{\{name\}\}/gi, lead?.studentName || '{{name}}')
    .replace(/\{\{student_name\}\}/gi, lead?.studentName || '{{student_name}}')
    .replace(/\{\{course\}\}/gi, lead?.courseInterest || '{{course}}')
    .replace(/\{\{phone\}\}/gi, lead?.phone || '{{phone}}')

  return (
    <div className="bg-[#e5ddd5] rounded-xl p-4 max-w-sm">
      <div className="bg-white rounded-lg p-3 shadow-sm relative">
        <div className="absolute -left-1.5 top-3 w-3 h-3 bg-white rotate-45" />
        <p className="text-sm text-gray-800 whitespace-pre-wrap">{personalized}</p>
        <p className="text-[10px] text-gray-400 text-right mt-1">
          {format(new Date(), 'h:mm a')} ✓✓
        </p>
      </div>
    </div>
  )
}

// ─── Checkbox ────────────────────────────────────────────────────────────────

function Checkbox({
  checked,
  indeterminate,
  onChange,
}: {
  checked: boolean
  indeterminate?: boolean
  onChange: () => void
}) {
  return (
    <button
      onClick={onChange}
      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
        checked
          ? 'bg-indigo-600 border-indigo-600'
          : indeterminate
            ? 'bg-indigo-300 border-indigo-400'
            : 'border-gray-300 hover:border-indigo-400'
      }`}
    >
      {checked && <Check className="w-3.5 h-3.5 text-white" />}
      {indeterminate && !checked && <Minus className="w-3.5 h-3.5 text-white" />}
    </button>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function BulkWhatsAppPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sentCount, setSentCount] = useState(0)

  // Selection state
  const [selectedLeadIds, setSelectedLeadIds] = useState<Set<string>>(new Set())
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [customMessage, setCustomMessage] = useState('')

  // Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [stageFilter, setStageFilter] = useState<string>('ALL')
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL')

  // UI state
  const [step, setStep] = useState<1 | 2 | 3>(1) // 1: Select leads, 2: Choose template, 3: Preview & Send
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setLoading(true)
      const [leadsRes, templatesRes] = await Promise.allSettled([
        fetch('/api/counselor/leads?limit=500', { credentials: 'include' }),
        fetch('/api/counselor/templates?type=WHATSAPP&activeOnly=true', { credentials: 'include' }),
      ])

      if (leadsRes.status === 'fulfilled' && leadsRes.value.ok) {
        const data = await leadsRes.value.json()
        setLeads(data.data || [])
      }
      if (templatesRes.status === 'fulfilled' && templatesRes.value.ok) {
        const data = await templatesRes.value.json()
        setTemplates(data.data || [])
      }
    } catch {
      showToast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm)
      const matchesStage = stageFilter === 'ALL' || lead.stage === stageFilter
      const matchesPriority = priorityFilter === 'ALL' || lead.priority === priorityFilter
      return matchesSearch && matchesStage && matchesPriority
    })
  }, [leads, searchTerm, stageFilter, priorityFilter])

  // Selection helpers
  const allFilteredSelected = filteredLeads.length > 0 && filteredLeads.every((l) => selectedLeadIds.has(l.id))
  const someFilteredSelected = filteredLeads.some((l) => selectedLeadIds.has(l.id))

  function toggleSelectAll() {
    if (allFilteredSelected) {
      const newSet = new Set(selectedLeadIds)
      filteredLeads.forEach((l) => newSet.delete(l.id))
      setSelectedLeadIds(newSet)
    } else {
      const newSet = new Set(selectedLeadIds)
      filteredLeads.forEach((l) => newSet.add(l.id))
      setSelectedLeadIds(newSet)
    }
  }

  function toggleLead(id: string) {
    const newSet = new Set(selectedLeadIds)
    if (newSet.has(id)) newSet.delete(id)
    else newSet.add(id)
    setSelectedLeadIds(newSet)
  }

  // Send bulk messages
  async function handleSend() {
    const message = selectedTemplate?.message || customMessage
    if (!message.trim()) {
      showToast.error('Please select a template or write a message')
      return
    }
    if (selectedLeadIds.size === 0) {
      showToast.error('Please select at least one lead')
      return
    }

    const confirmed = confirm(
      `Send WhatsApp message to ${selectedLeadIds.size} student${selectedLeadIds.size > 1 ? 's' : ''}?`
    )
    if (!confirmed) return

    try {
      setSending(true)
      let successCount = 0

      // Send to each lead individually
      const selectedLeads = leads.filter((l) => selectedLeadIds.has(l.id))

      for (const lead of selectedLeads) {
        const personalizedMsg = message
          .replace(/\{\{name\}\}/gi, lead.studentName)
          .replace(/\{\{student_name\}\}/gi, lead.studentName)
          .replace(/\{\{course\}\}/gi, lead.courseInterest)
          .replace(/\{\{phone\}\}/gi, lead.phone)

        try {
          const res = await fetch('/api/counselor/whatsapp/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              leadId: lead.id,
              phone: lead.phone,
              message: personalizedMsg,
              templateId: selectedTemplate?.id || null,
            }),
          })
          if (res.ok) successCount++
        } catch {
          // Continue sending to others even if one fails
        }
      }

      setSentCount(successCount)
      setSent(true)
      showToast.success(`Sent to ${successCount}/${selectedLeadIds.size} students`)
    } catch {
      showToast.error('Failed to send messages')
    } finally {
      setSending(false)
    }
  }

  // Quick select groups
  function selectByStage(stage: string) {
    const newSet = new Set(selectedLeadIds)
    leads.filter((l) => l.stage === stage).forEach((l) => newSet.add(l.id))
    setSelectedLeadIds(newSet)
  }

  function selectByPriority(priority: string) {
    const newSet = new Set(selectedLeadIds)
    leads.filter((l) => l.priority === priority).forEach((l) => newSet.add(l.id))
    setSelectedLeadIds(newSet)
  }

  const stages = ['NEW_LEAD', 'DEMO_SCHEDULED', 'DEMO_COMPLETED', 'OFFER_SENT', 'NEGOTIATING', 'PAYMENT_PLAN_CREATED']

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    )
  }

  if (sent) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Messages Sent!</h2>
          <p className="text-gray-600 mb-6">
            Successfully sent to {sentCount} out of {selectedLeadIds.size} students
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { setSent(false); setSelectedLeadIds(new Set()); setStep(1) }}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Send More
            </button>
            <Link
              href="/counselor/messages"
              className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              View Messages
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bulk WhatsApp</h1>
          <p className="text-gray-600 mt-1">Send personalized messages to multiple students at once</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedLeadIds.size > 0 && (
            <span className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
              {selectedLeadIds.size} selected
            </span>
          )}
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2">
        {[
          { num: 1, label: 'Select Students' },
          { num: 2, label: 'Choose Message' },
          { num: 3, label: 'Preview & Send' },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center gap-2">
            <button
              onClick={() => {
                if (s.num === 1 || (s.num === 2 && selectedLeadIds.size > 0) || (s.num === 3 && selectedLeadIds.size > 0 && (selectedTemplate || customMessage))) {
                  setStep(s.num as 1 | 2 | 3)
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                step === s.num
                  ? 'bg-indigo-600 text-white'
                  : step > s.num
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-500'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < 2 && <div className="w-8 h-0.5 bg-gray-200" />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Students */}
      {step === 1 && (
        <div className="space-y-4">
          {/* Quick Select */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Quick Select:</p>
            <div className="flex flex-wrap gap-2">
              {stages.map((stage) => {
                const count = leads.filter((l) => l.stage === stage).length
                if (count === 0) return null
                return (
                  <button
                    key={stage}
                    onClick={() => selectByStage(stage)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 rounded-lg text-xs font-medium transition-colors"
                  >
                    {stage.replace(/_/g, ' ')} ({count})
                  </button>
                )
              })}
              <button
                onClick={() => selectByPriority('HOT')}
                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-medium transition-colors"
              >
                🔥 All Hot ({leads.filter((l) => l.priority === 'HOT').length})
              </button>
              <button
                onClick={() => selectByPriority('WARM')}
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-xs font-medium transition-colors"
              >
                ⚡ All Warm ({leads.filter((l) => l.priority === 'WARM').length})
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or phone..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="ALL">All Stages</option>
                {stages.map((s) => (
                  <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                ))}
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="ALL">All Priorities</option>
                <option value="HOT">🔥 Hot</option>
                <option value="WARM">⚡ Warm</option>
                <option value="COLD">❄️ Cold</option>
              </select>
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left w-12">
                      <Checkbox
                        checked={allFilteredSelected}
                        indeterminate={someFilteredSelected && !allFilteredSelected}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Stage</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Course</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => toggleLead(lead.id)}
                      className={`border-b border-gray-100 cursor-pointer transition-colors ${
                        selectedLeadIds.has(lead.id) ? 'bg-indigo-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <Checkbox checked={selectedLeadIds.has(lead.id)} onChange={() => toggleLead(lead.id)} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {lead.studentName.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{lead.studentName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{lead.phone}</td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {lead.stage.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 hidden lg:table-cell">{lead.courseInterest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
              Showing {filteredLeads.length} students • {selectedLeadIds.size} selected
            </div>
          </div>

          {/* Next Step */}
          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={selectedLeadIds.size === 0}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              Next: Choose Message ({selectedLeadIds.size} selected)
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Choose Template */}
      {step === 2 && (
        <div className="space-y-4">
          {/* Templates */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              <FileText className="w-5 h-5 inline mr-2 text-indigo-600" />
              Message Templates
            </h3>

            {templates.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-2">No WhatsApp templates found</p>
                <p className="text-sm">Create templates from the Messages section first, or write a custom message below</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => { setSelectedTemplate(template); setCustomMessage('') }}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${
                      selectedTemplate?.id === template.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-900">{template.name}</p>
                      {selectedTemplate?.id === template.id && (
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-3">{template.message}</p>
                    <p className="text-[10px] text-gray-400 mt-2">Used {template.usageCount} times</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Custom Message */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Or Write Custom Message
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              Use {'{{name}}'}, {'{{course}}'}, {'{{phone}}'} for personalization
            </p>
            <textarea
              value={customMessage}
              onChange={(e) => { setCustomMessage(e.target.value); setSelectedTemplate(null) }}
              placeholder="Hello {{name}}, this is Cerebrum Biology Academy..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm min-h-[120px] resize-y"
            />
          </div>

          {/* Nav Buttons */}
          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!selectedTemplate && !customMessage.trim()}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              Next: Preview & Send
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Preview & Send */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Recipients</span>
                  <span className="text-sm font-bold text-gray-900">{selectedLeadIds.size} students</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Template</span>
                  <span className="text-sm font-bold text-gray-900">
                    {selectedTemplate?.name || 'Custom Message'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Channel</span>
                  <span className="text-sm font-bold text-green-600">WhatsApp</span>
                </div>
              </div>

              {/* Recipient list */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs font-medium text-gray-500 mb-2">RECIPIENTS:</p>
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {leads
                    .filter((l) => selectedLeadIds.has(l.id))
                    .map((lead) => (
                      <div key={lead.id} className="flex items-center gap-2 py-1 text-sm">
                        <div className="w-5 h-5 bg-indigo-100 rounded flex items-center justify-center text-indigo-600 text-[10px] font-bold">
                          {lead.studentName.charAt(0)}
                        </div>
                        <span className="text-gray-700 flex-1 truncate">{lead.studentName}</span>
                        <span className="text-gray-400 text-xs">{lead.phone}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Message Preview</h3>
              <TemplatePreview
                template={{
                  ...(selectedTemplate || { id: 'custom', name: 'Custom', type: 'WHATSAPP', subject: null, usageCount: 0 }),
                  message: selectedTemplate?.message || customMessage,
                }}
                lead={leads.find((l) => selectedLeadIds.has(l.id))}
              />
              <p className="text-xs text-gray-400 mt-3">
                Preview shown for: {leads.find((l) => selectedLeadIds.has(l.id))?.studentName || 'first recipient'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={handleSend}
              disabled={sending}
              className="flex items-center gap-2 px-8 py-3 bg-[#166534] text-white rounded-xl font-medium hover:bg-[#14532d] disabled:opacity-50 transition-colors text-lg"
            >
              {sending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              {sending ? 'Sending...' : `Send to ${selectedLeadIds.size} Students`}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
