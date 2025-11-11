'use client'

import { useState } from 'react'
import type { Lead } from '@/app/counselor/leads/page'
import { TemplateLibraryModal } from './TemplateLibraryModal'

interface WhatsAppMessageModalProps {
  lead: Lead
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

type QuickTemplate =
  | 'initial_contact'
  | 'demo_followup'
  | 'negotiation_followup'
  | 'enrollment_confirmation'
  | 'payment_reminder'
  | 'check_in'

const quickTemplates: Record<QuickTemplate, { label: string; icon: string; description: string }> =
  {
    initial_contact: {
      label: 'Initial Contact',
      icon: '👋',
      description: 'First message with demo invitation',
    },
    demo_followup: {
      label: 'Demo Follow-up',
      icon: '🎓',
      description: 'After demo class completion',
    },
    negotiation_followup: {
      label: 'Negotiation',
      icon: '💼',
      description: 'Discuss pricing and payment plans',
    },
    enrollment_confirmation: {
      label: 'Enrollment',
      icon: '🎉',
      description: 'Welcome message after enrollment',
    },
    payment_reminder: {
      label: 'Payment',
      icon: '💳',
      description: 'Installment reminder',
    },
    check_in: {
      label: 'Check-in',
      icon: '📚',
      description: 'Regular progress check',
    },
  }

export function WhatsAppMessageModal({
  lead,
  isOpen,
  onClose,
  onSuccess,
}: WhatsAppMessageModalProps) {
  const [mode, setMode] = useState<'quick' | 'custom'>('quick')
  const [selectedTemplate, setSelectedTemplate] = useState<QuickTemplate>('initial_contact')
  const [customMessage, setCustomMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false)
  const [generatingAI, setGeneratingAI] = useState(false)

  if (!isOpen) return null

  const handleSendQuick = async () => {
    try {
      setSending(true)
      setError(null)

      const response = await fetch('/api/counselor/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          phone: lead.phone,
          studentName: lead.studentName,
          courseInterest: lead.courseInterest,
          templateKey: selectedTemplate,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      onSuccess?.()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const handleSendCustom = async () => {
    if (!customMessage.trim()) {
      setError('Please enter a message')
      return
    }

    try {
      setSending(true)
      setError(null)

      const response = await fetch('/api/counselor/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          phone: lead.phone,
          message: customMessage,
          type: 'MANUAL',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      onSuccess?.()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const handleGenerateAI = async () => {
    try {
      setGeneratingAI(true)
      setError(null)

      const response = await fetch('/api/ai/generate-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          tone: 'friendly',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate AI message')
      }

      setCustomMessage(data.data.message)
      setMode('custom')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate AI message')
    } finally {
      setGeneratingAI(false)
    }
  }

  const handleSend = mode === 'quick' ? handleSendQuick : handleSendCustom

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#25D366] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <div>
              <h2 className="font-bold text-lg">Send WhatsApp Message</h2>
              <p className="text-sm opacity-90">{lead.studentName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setMode('quick')}
            className={`flex-1 py-3 px-4 font-medium text-sm transition-colors ${
              mode === 'quick'
                ? 'text-[#25D366] border-b-2 border-[#25D366] bg-green-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            ⚡ Quick Templates
          </button>
          <button
            onClick={() => setMode('custom')}
            className={`flex-1 py-3 px-4 font-medium text-sm transition-colors ${
              mode === 'custom'
                ? 'text-[#25D366] border-b-2 border-[#25D366] bg-green-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            ✍️ Custom Message
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {mode === 'quick' ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Select a pre-written template for common scenarios:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(quickTemplates).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTemplate(key as QuickTemplate)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedTemplate === key
                        ? 'border-[#25D366] bg-green-50 ring-2 ring-[#25D366]/20'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{template.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{template.label}</div>
                        <div className="text-xs text-gray-600 mt-1">{template.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Your Message</span>
                <div className="flex gap-2">
                  <button
                    onClick={handleGenerateAI}
                    disabled={generatingAI}
                    className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-indigo-50 text-indigo-700 rounded-lg text-xs font-medium hover:from-purple-100 hover:to-indigo-100 transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {generatingAI ? (
                      <>
                        <div className="w-3 h-3 border-2 border-indigo-700 border-t-transparent rounded-full animate-spin"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                        AI Draft
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowTemplateLibrary(true)}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium hover:bg-indigo-100 transition-colors flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                      />
                    </svg>
                    Browse Templates
                  </button>
                </div>
              </div>
              <label className="block">
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#25D366] focus:border-[#25D366] resize-none"
                  maxLength={4096}
                />
              </label>
              <div className="text-xs text-gray-500 text-right">
                {customMessage.length} / 4096 characters
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800 flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">To:</span> {lead.phone}
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                disabled={sending}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={sending || (mode === 'custom' && !customMessage.trim())}
                className="px-6 py-2 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Template Library Modal */}
      <TemplateLibraryModal
        isOpen={showTemplateLibrary}
        onClose={() => setShowTemplateLibrary(false)}
        filterType="WHATSAPP"
        onSelectTemplate={(template) => {
          setCustomMessage(template.message)
          setShowTemplateLibrary(false)
          setMode('custom')
        }}
      />
    </div>
  )
}
