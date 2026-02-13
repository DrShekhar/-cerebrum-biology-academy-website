'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Phone, Mail, Send, Filter, RefreshCw } from 'lucide-react'

type CommType = 'WHATSAPP' | 'EMAIL' | 'CALL'
type Direction = 'INBOUND' | 'OUTBOUND'

interface Communication {
  id: string
  leadId: string
  type: CommType
  direction: Direction
  subject?: string | null
  message: string
  sentAt: Date | string
  status: string
  callDuration?: number | null
  leads: {
    id: string
    studentName: string
    email: string
    phone: string
  }
  users: {
    id: string
    name: string | null
    email: string
  }
}

const commTypeIcons = {
  WHATSAPP: <MessageSquare className="w-4 h-4" />,
  EMAIL: <Mail className="w-4 h-4" />,
  CALL: <Phone className="w-4 h-4" />,
}

const commTypeColors = {
  WHATSAPP: 'bg-green-100 text-green-700 border-green-200',
  EMAIL: 'bg-blue-100 text-blue-700 border-blue-200',
  CALL: 'bg-purple-100 text-purple-700 border-purple-200',
}

export default function MessagesPage() {
  const [communications, setCommunications] = useState<Communication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<CommType | 'ALL'>('ALL')

  useEffect(() => {
    fetchCommunications()
  }, [typeFilter])

  async function fetchCommunications() {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (typeFilter !== 'ALL') {
        params.append('type', typeFilter)
      }

      const response = await fetch(`/api/counselor/communications?${params}`, {
        credentials: 'include',
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch communications')
      }

      setCommunications(data.data || [])
    } catch (err) {
      console.error('Error fetching communications:', err)
      setError(err instanceof Error ? err.message : 'Failed to load communications')
    } finally {
      setLoading(false)
    }
  }

  const whatsappCount = communications.filter((c) => c.type === 'WHATSAPP').length
  const emailCount = communications.filter((c) => c.type === 'EMAIL').length
  const callCount = communications.filter((c) => c.type === 'CALL').length

  function formatTime(date: Date | string) {
    const d = new Date(date)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return d.toLocaleDateString()
  }

  function formatCallDuration(seconds?: number | null) {
    if (!seconds) return 'N/A'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">View all communications with your leads</p>
        </div>

        <button
          onClick={fetchCommunications}
          disabled={loading}
          className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Messages</p>
              <p className="text-2xl font-bold text-gray-900">{communications.length}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-green-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">WhatsApp</p>
              <p className="text-2xl font-bold text-green-600">{whatsappCount}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-blue-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Emails</p>
              <p className="text-2xl font-bold text-blue-600">{emailCount}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-purple-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Calls</p>
              <p className="text-2xl font-bold text-purple-600">{callCount}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by type:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setTypeFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                typeFilter === 'ALL'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setTypeFilter('WHATSAPP')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                typeFilter === 'WHATSAPP'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              WhatsApp
            </button>
            <button
              onClick={() => setTypeFilter('EMAIL')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                typeFilter === 'EMAIL'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setTypeFilter('CALL')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                typeFilter === 'CALL'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Calls
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 font-medium">{error}</p>
          <button
            onClick={fetchCommunications}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : communications.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages yet</h3>
          <p className="text-gray-600">
            Communications with your leads will appear here once logged.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {communications.map((comm) => (
            <div
              key={comm.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${commTypeColors[comm.type]}`}
                    >
                      {commTypeIcons[comm.type]}
                      {comm.type}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        comm.direction === 'OUTBOUND'
                          ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {comm.direction === 'OUTBOUND' ? (
                        <Send className="w-3 h-3" />
                      ) : (
                        <MessageSquare className="w-3 h-3" />
                      )}
                      {comm.direction}
                    </span>
                    {comm.type === 'CALL' && comm.callDuration !== null && (
                      <span className="text-xs text-gray-500">
                        Duration: {formatCallDuration(comm.callDuration)}
                      </span>
                    )}
                  </div>

                  <div className="mb-2">
                    <h3 className="font-semibold text-gray-900 mb-1">{comm.leads.studentName}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {comm.leads.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {comm.leads.email}
                      </span>
                    </div>
                  </div>

                  {comm.subject && (
                    <p className="text-sm font-medium text-gray-800 mb-1">{comm.subject}</p>
                  )}
                  <p className="text-sm text-gray-600 line-clamp-2">{comm.message}</p>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-500">{formatTime(comm.sentAt)}</p>
                  <p className="text-xs text-gray-400 mt-1">by {comm.users.name || 'Unknown'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
