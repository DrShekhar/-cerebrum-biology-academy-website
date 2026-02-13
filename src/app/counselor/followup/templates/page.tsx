'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { showToast } from '@/lib/toast'

type Channel = 'EMAIL' | 'WHATSAPP' | 'SMS' | 'CALL_TASK' | 'NOTIFICATION' | 'TASK'

interface FollowupTemplate {
  id: string
  name: string
  description: string | null
  channel: Channel
  subject: string | null
  content: string
  isActive: boolean
  _count: {
    rules: number
  }
  validation?: {
    valid: boolean
    invalidPlaceholders: string[]
    validPlaceholders: string[]
  }
  createdAt: Date
  updatedAt: Date
}

export default function FollowupTemplatesPage() {
  const [templates, setTemplates] = useState<FollowupTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterChannel, setFilterChannel] = useState<Channel | 'ALL'>('ALL')
  const [filterActive, setFilterActive] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    fetchTemplates()
  }, [])

  async function fetchTemplates() {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filterChannel !== 'ALL') params.append('channel', filterChannel)
      if (filterActive === 'ACTIVE') params.append('isActive', 'true')
      if (filterActive === 'INACTIVE') params.append('isActive', 'false')
      if (searchTerm) params.append('search', searchTerm)

      const response = await fetch(`/api/counselor/followup/templates?${params}`, {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch templates')
      }

      const data = await response.json()
      setTemplates(data.data || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching templates:', err)
    } finally {
      setLoading(false)
    }
  }

  async function toggleTemplateStatus(templateId: string, currentStatus: boolean) {
    try {
      const response = await fetch(`/api/counselor/followup/templates/${templateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to update template')
      }

      fetchTemplates()
    } catch (err) {
      console.error('Error updating template:', err)
    }
  }

  async function deleteTemplate(templateId: string) {
    if (!confirm('Are you sure you want to delete this template? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/counselor/followup/templates/${templateId}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to delete template')
      }

      fetchTemplates()
    } catch (err) {
      console.error('Error deleting template:', err)
      showToast.error('Failed to delete template. It may be in use by active rules.')
    }
  }

  const getChannelLabel = (channel: Channel) => {
    const labels = {
      EMAIL: 'Email',
      WHATSAPP: 'WhatsApp',
      SMS: 'SMS',
      CALL_TASK: 'Call Task',
      NOTIFICATION: 'Notification',
      TASK: 'Task',
    }
    return labels[channel] || channel
  }

  const getChannelIcon = (channel: Channel) => {
    const icons = {
      EMAIL: '📧',
      WHATSAPP: '💬',
      SMS: '📱',
      CALL_TASK: '📞',
      NOTIFICATION: '🔔',
      TASK: '✓',
    }
    return icons[channel] || '📋'
  }

  const getChannelColor = (channel: Channel) => {
    const colors = {
      EMAIL: 'bg-blue-100 text-blue-800',
      WHATSAPP: 'bg-green-100 text-green-800',
      SMS: 'bg-purple-100 text-purple-800',
      CALL_TASK: 'bg-orange-100 text-orange-800',
      NOTIFICATION: 'bg-yellow-100 text-yellow-800',
      TASK: 'bg-indigo-100 text-indigo-800',
    }
    return colors[channel] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading templates...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <p className="text-gray-900 font-semibold mb-2">Error Loading Templates</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchTemplates}
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Follow-up Templates</h1>
          <p className="text-gray-600 mt-1">Manage message templates for automated follow-ups</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          + Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Templates</p>
              <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Templates</p>
              <p className="text-2xl font-bold text-gray-900">
                {templates.filter((t) => t.isActive).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">In Use</p>
              <p className="text-2xl font-bold text-gray-900">
                {templates.filter((t) => t._count.rules > 0).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Validation Issues</p>
              <p className="text-2xl font-bold text-gray-900">
                {templates.filter((t) => t.validation && !t.validation.valid).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1 w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search templates by name, description, or content..."
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
              value={filterChannel}
              onChange={(e) => setFilterChannel(e.target.value as Channel | 'ALL')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="ALL">All Channels</option>
              <option value="EMAIL">Email</option>
              <option value="WHATSAPP">WhatsApp</option>
              <option value="SMS">SMS</option>
              <option value="CALL_TASK">Call Task</option>
              <option value="NOTIFICATION">Notification</option>
              <option value="TASK">Task</option>
            </select>

            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value as 'ALL' | 'ACTIVE' | 'INACTIVE')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active Only</option>
              <option value="INACTIVE">Inactive Only</option>
            </select>

            <button
              onClick={fetchTemplates}
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
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {templates.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Templates Yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first message template to use in automated follow-up rules.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Create Your First Template
            </button>
          </div>
        ) : (
          templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                    {template.isActive ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                        Inactive
                      </span>
                    )}
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${getChannelColor(template.channel)}`}
                    >
                      {getChannelIcon(template.channel)} {getChannelLabel(template.channel)}
                    </span>
                    {template.validation && !template.validation.valid && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        ⚠️ Validation Issues
                      </span>
                    )}
                  </div>

                  {template.description && (
                    <p className="text-gray-600 mb-3">{template.description}</p>
                  )}

                  {template.subject && (
                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-500">Subject: </span>
                      <span className="text-sm text-gray-900">{template.subject}</span>
                    </div>
                  )}

                  <div className="mb-3">
                    <p className="text-sm text-gray-600 line-clamp-2">{template.content}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Used by rules:</span>
                      <span className="font-semibold text-gray-900">{template._count.rules}</span>
                    </div>

                    {template.validation && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Valid placeholders:</span>
                        <span className="font-semibold text-gray-900">
                          {template.validation.validPlaceholders.length}
                        </span>
                      </div>
                    )}

                    {template.validation && template.validation.invalidPlaceholders.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-red-600">Invalid placeholders:</span>
                        <span className="font-semibold text-red-700">
                          {template.validation.invalidPlaceholders.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => toggleTemplateStatus(template.id, template.isActive)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                      template.isActive
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                    title={template.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {template.isActive ? 'Pause' : 'Activate'}
                  </button>

                  <Link
                    href={`/counselor/followup/templates/${template.id}`}
                    className="px-3 py-2 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 font-medium transition-colors"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteTemplate(template.id)}
                    className="px-3 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 font-medium transition-colors"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Template</h2>
            <p className="text-gray-600 mb-4">
              Template creation form will be implemented here. For now, please use the API directly
              or contact support.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
