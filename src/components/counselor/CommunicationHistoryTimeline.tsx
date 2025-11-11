'use client'

import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'

type CommType = 'WHATSAPP' | 'EMAIL' | 'CALL' | 'SMS'
type Direction = 'INBOUND' | 'OUTBOUND'
type CommStatus = 'PENDING' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED'

interface Communication {
  id: string
  type: CommType
  direction: Direction
  subject: string | null
  message: string
  status: CommStatus
  sentAt: string
  sentBy: {
    id: string
    name: string
    email: string
  }
  whatsappMessageId?: string | null
  templateName?: string | null
  callDuration?: number | null
  attachments: string[]
}

interface CommunicationHistoryTimelineProps {
  leadId: string
  isOpen: boolean
  onClose: () => void
  studentName: string
}

export function CommunicationHistoryTimeline({
  leadId,
  isOpen,
  onClose,
  studentName,
}: CommunicationHistoryTimelineProps) {
  const [communications, setCommunications] = useState<Communication[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<CommType | 'ALL'>('ALL')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchCommunications()
    }
  }, [isOpen, leadId, filterType, page])

  async function fetchCommunications() {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filterType !== 'ALL') {
        params.append('type', filterType)
      }
      params.append('page', page.toString())
      params.append('limit', '20')

      const response = await fetch(`/api/counselor/communications/${leadId}?${params}`)
      if (!response.ok) throw new Error('Failed to fetch communications')

      const data = await response.json()
      setCommunications(data.data || [])
      setHasMore(data.pagination?.hasMore || false)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load communications')
    } finally {
      setLoading(false)
    }
  }

  function getTypeIcon(type: CommType) {
    switch (type) {
      case 'WHATSAPP':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        )
      case 'EMAIL':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        )
      case 'CALL':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        )
      case 'SMS':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )
    }
  }

  function getTypeColor(type: CommType) {
    switch (type) {
      case 'WHATSAPP':
        return 'bg-green-100 text-green-700 border-green-300'
      case 'EMAIL':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'SMS':
        return 'bg-purple-100 text-purple-700 border-purple-300'
      case 'CALL':
        return 'bg-orange-100 text-orange-700 border-orange-300'
    }
  }

  function getStatusBadge(status: CommStatus) {
    const styles = {
      PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      SENT: 'bg-blue-100 text-blue-700 border-blue-300',
      DELIVERED: 'bg-green-100 text-green-700 border-green-300',
      READ: 'bg-indigo-100 text-indigo-700 border-indigo-300',
      FAILED: 'bg-red-100 text-red-700 border-red-300',
    }

    const labels = {
      PENDING: 'Pending',
      SENT: 'Sent',
      DELIVERED: 'Delivered',
      READ: 'Read',
      FAILED: 'Failed',
    }

    return (
      <span
        className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${styles[status]}`}
      >
        {labels[status]}
      </span>
    )
  }

  function getDirectionIcon(direction: Direction) {
    if (direction === 'INBOUND') {
      return (
        <svg
          className="w-4 h-4 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
      )
    } else {
      return (
        <svg
          className="w-4 h-4 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      )
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-xl">Communication History</h2>
            <p className="text-sm opacity-90">{studentName}</p>
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

        {/* Filter Buttons */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => {
                setFilterType('ALL')
                setPage(1)
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'ALL'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                setFilterType('WHATSAPP')
                setPage(1)
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'WHATSAPP'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              WhatsApp
            </button>
            <button
              onClick={() => {
                setFilterType('EMAIL')
                setPage(1)
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'EMAIL'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => {
                setFilterType('SMS')
                setPage(1)
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'SMS'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              SMS
            </button>
            <button
              onClick={() => {
                setFilterType('CALL')
                setPage(1)
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterType === 'CALL'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              Calls
            </button>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && communications.length === 0 ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="text-gray-600 mt-2 text-sm">Loading communications...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchCommunications}
                className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium text-sm"
              >
                Try again
              </button>
            </div>
          ) : communications.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-gray-600">No communications yet</p>
              <p className="text-gray-500 text-sm mt-1">
                Start communicating with this lead to see the history here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {communications.map((comm, index) => (
                <div key={comm.id} className="relative">
                  {/* Timeline Line */}
                  {index < communications.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                  )}

                  {/* Communication Item */}
                  <div className="flex gap-4">
                    {/* Icon Circle */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 ${getTypeColor(
                        comm.type
                      )} z-10 bg-white`}
                    >
                      {getTypeIcon(comm.type)}
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getDirectionIcon(comm.direction)}
                          <span className="font-medium text-gray-900">
                            {comm.direction === 'INBOUND' ? 'Received from' : 'Sent by'}{' '}
                            {comm.sentBy.name}
                          </span>
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${getTypeColor(
                              comm.type
                            )}`}
                          >
                            {comm.type}
                          </span>
                        </div>
                        {getStatusBadge(comm.status)}
                      </div>

                      {/* Subject (for emails) */}
                      {comm.subject && (
                        <div className="mb-2">
                          <span className="text-sm font-semibold text-gray-700">Subject: </span>
                          <span className="text-sm text-gray-900">{comm.subject}</span>
                        </div>
                      )}

                      {/* Message */}
                      <div className="text-sm text-gray-700 mb-2 whitespace-pre-wrap">
                        {comm.message.length > 300
                          ? comm.message.substring(0, 300) + '...'
                          : comm.message}
                      </div>

                      {/* Call Duration */}
                      {comm.type === 'CALL' && comm.callDuration && (
                        <div className="text-xs text-gray-600 mb-2">
                          Duration: {Math.floor(comm.callDuration / 60)}m {comm.callDuration % 60}s
                        </div>
                      )}

                      {/* Template Name */}
                      {comm.templateName && (
                        <div className="text-xs text-gray-600 mb-2">
                          Template: {comm.templateName}
                        </div>
                      )}

                      {/* Attachments */}
                      {comm.attachments.length > 0 && (
                        <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
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
                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            />
                          </svg>
                          {comm.attachments.length} attachment(s)
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                        <span>
                          {formatDistanceToNow(new Date(comm.sentAt), { addSuffix: true })}
                        </span>
                        <span>{new Date(comm.sentAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center pt-4">
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
