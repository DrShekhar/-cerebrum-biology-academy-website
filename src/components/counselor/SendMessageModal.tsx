'use client'

import { useState } from 'react'
import type { Lead } from '@/app/counselor/leads/page'
import { TemplateLibraryModal } from './TemplateLibraryModal'

interface SendMessageModalProps {
  lead: Lead
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

type CommChannel = 'EMAIL' | 'WHATSAPP' | 'SMS'
type CommType = 'WHATSAPP' | 'EMAIL' | 'CALL' | 'SMS'
type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

interface MessageTemplate {
  id: string
  name: string
  type: CommType
  subject: string | null
  message: string
  isActive: boolean
  usageCount: number
  createdAt: Date
}

export function SendMessageModal({ lead, isOpen, onClose, onSuccess }: SendMessageModalProps) {
  const [selectedChannels, setSelectedChannels] = useState<Set<CommChannel>>(new Set(['WHATSAPP']))
  const [priority, setPriority] = useState<Priority>('MEDIUM')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false)
  const [selectedTemplateType, setSelectedTemplateType] = useState<CommType | undefined>()

  const [deliveryStatus, setDeliveryStatus] = useState<{
    email?: { success: boolean; error?: string }
    whatsapp?: { success: boolean; error?: string }
    sms?: { success: boolean; error?: string }
  }>({})

  if (!isOpen) return null

  const toggleChannel = (channel: CommChannel) => {
    const newChannels = new Set(selectedChannels)
    if (newChannels.has(channel)) {
      newChannels.delete(channel)
    } else {
      newChannels.add(channel)
    }
    setSelectedChannels(newChannels)
  }

  const handleTemplateSelect = (template: MessageTemplate) => {
    setMessage(template.message)
    if (template.subject) {
      setSubject(template.subject)
    }
    setShowTemplateLibrary(false)
  }

  const handleSend = async () => {
    if (!message.trim()) {
      setError('Please enter a message')
      return
    }

    if (selectedChannels.has('EMAIL') && !subject.trim()) {
      setError('Email requires a subject line')
      return
    }

    if (selectedChannels.size === 0) {
      setError('Please select at least one channel')
      return
    }

    try {
      setSending(true)
      setError(null)
      setDeliveryStatus({})

      const response = await fetch('/api/counselor/communications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          studentName: lead.studentName,
          email: lead.email,
          phone: lead.phone,
          priority,
          channels: {
            email: selectedChannels.has('EMAIL'),
            whatsapp: selectedChannels.has('WHATSAPP'),
            sms: selectedChannels.has('SMS'),
          },
          subject: selectedChannels.has('EMAIL') ? subject : undefined,
          message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setDeliveryStatus(data.channels || {})

      const anySuccess = Object.values(data.channels || {}).some((ch: any) => ch?.success)

      if (anySuccess) {
        onSuccess?.()
        setTimeout(() => {
          onClose()
          setMessage('')
          setSubject('')
          setDeliveryStatus({})
        }, 2000)
      } else {
        setError('All channels failed to send')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const channelConfig: Record<
    CommChannel,
    {
      label: string
      icon: string
      description: string
      selectedClasses: string
      unselectedClasses: string
    }
  > = {
    EMAIL: {
      label: 'Email',
      icon: '📧',
      description: 'Professional and detailed',
      selectedClasses: 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20',
      unselectedClasses: 'border-gray-200 hover:border-gray-300 hover:shadow-sm',
    },
    WHATSAPP: {
      label: 'WhatsApp',
      icon: '💬',
      description: '98% open rate',
      selectedClasses: 'border-green-500 bg-green-50 ring-2 ring-green-500/20',
      unselectedClasses: 'border-gray-200 hover:border-gray-300 hover:shadow-sm',
    },
    SMS: {
      label: 'SMS',
      icon: '📱',
      description: 'Instant delivery',
      selectedClasses: 'border-purple-500 bg-purple-50 ring-2 ring-purple-500/20',
      unselectedClasses: 'border-gray-200 hover:border-gray-300 hover:shadow-sm',
    },
  }

  const priorityConfig: Record<
    Priority,
    { label: string; description: string; selectedClasses: string; unselectedClasses: string }
  > = {
    LOW: {
      label: 'Low',
      description: 'General updates',
      selectedClasses: 'bg-gray-600 text-white',
      unselectedClasses: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    },
    MEDIUM: {
      label: 'Medium',
      description: 'Important info',
      selectedClasses: 'bg-blue-600 text-white',
      unselectedClasses: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    },
    HIGH: {
      label: 'High',
      description: 'Requires attention',
      selectedClasses: 'bg-orange-600 text-white',
      unselectedClasses: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    },
    URGENT: {
      label: 'Urgent',
      description: 'Critical action needed',
      selectedClasses: 'bg-red-600 text-white',
      unselectedClasses: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    },
  }

  const hasDeliveryStatus = Object.keys(deliveryStatus).length > 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-xl">Send Multi-Channel Message</h2>
            <p className="text-sm opacity-90">{lead.studentName}</p>
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Channel Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Channels <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(
                Object.entries(channelConfig) as [
                  CommChannel,
                  (typeof channelConfig)[CommChannel],
                ][]
              ).map(([channel, config]) => (
                <button
                  key={channel}
                  type="button"
                  onClick={() => toggleChannel(channel)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedChannels.has(channel)
                      ? config.selectedClasses
                      : config.unselectedClasses
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{config.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{config.label}</div>
                      <div className="text-xs text-gray-600 mt-1">{config.description}</div>
                    </div>
                    {selectedChannels.has(channel) && (
                      <svg
                        className="w-5 h-5 text-green-600 ml-auto"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Priority Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <div className="flex gap-2">
              {(
                Object.entries(priorityConfig) as [Priority, (typeof priorityConfig)[Priority]][]
              ).map(([p, config]) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    priority === p ? config.selectedClasses : config.unselectedClasses
                  }`}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subject (for Email) */}
          {selectedChannels.has('EMAIL') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject line"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

          {/* Message */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Message <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTemplateType('WHATSAPP')
                    setShowTemplateLibrary(true)
                  }}
                  className="px-3 py-1 bg-green-50 text-green-700 rounded text-xs font-medium hover:bg-green-100 transition-colors"
                >
                  💬 WhatsApp Templates
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTemplateType('EMAIL')
                    setShowTemplateLibrary(true)
                  }}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium hover:bg-blue-100 transition-colors"
                >
                  📧 Email Templates
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTemplateType('SMS')
                    setShowTemplateLibrary(true)
                  }}
                  className="px-3 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium hover:bg-purple-100 transition-colors"
                >
                  📱 SMS Templates
                </button>
              </div>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              maxLength={selectedChannels.has('SMS') ? 1600 : 4096}
            />
            <div className="text-xs text-gray-500 text-right mt-1">
              {message.length} / {selectedChannels.has('SMS') ? 1600 : 4096} characters
            </div>
          </div>

          {/* Delivery Status */}
          {hasDeliveryStatus && (
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-3">Delivery Status</h3>
              <div className="space-y-2">
                {deliveryStatus.email && (
                  <div
                    className={`flex items-center gap-2 ${deliveryStatus.email.success ? 'text-green-700' : 'text-red-700'}`}
                  >
                    <span>{deliveryStatus.email.success ? '✅' : '❌'}</span>
                    <span className="font-medium">Email</span>
                    {deliveryStatus.email.error && (
                      <span className="text-xs text-red-600">({deliveryStatus.email.error})</span>
                    )}
                  </div>
                )}
                {deliveryStatus.whatsapp && (
                  <div
                    className={`flex items-center gap-2 ${deliveryStatus.whatsapp.success ? 'text-green-700' : 'text-red-700'}`}
                  >
                    <span>{deliveryStatus.whatsapp.success ? '✅' : '❌'}</span>
                    <span className="font-medium">WhatsApp</span>
                    {deliveryStatus.whatsapp.error && (
                      <span className="text-xs text-red-600">
                        ({deliveryStatus.whatsapp.error})
                      </span>
                    )}
                  </div>
                )}
                {deliveryStatus.sms && (
                  <div
                    className={`flex items-center gap-2 ${deliveryStatus.sms.success ? 'text-green-700' : 'text-red-700'}`}
                  >
                    <span>{deliveryStatus.sms.success ? '✅' : '❌'}</span>
                    <span className="font-medium">SMS</span>
                    {deliveryStatus.sms.error && (
                      <span className="text-xs text-red-600">({deliveryStatus.sms.error})</span>
                    )}
                  </div>
                )}
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
              <span className="font-medium">To:</span> {lead.email || lead.phone}
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
                disabled={sending || !message.trim() || selectedChannels.size === 0}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
                    Send to {selectedChannels.size} Channel{selectedChannels.size !== 1 ? 's' : ''}
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
        filterType={selectedTemplateType}
        onSelectTemplate={handleTemplateSelect}
      />
    </div>
  )
}
