'use client'

import { useState, useEffect } from 'react'

type CommType = 'WHATSAPP' | 'EMAIL' | 'CALL' | 'SMS'

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

interface TemplateLibraryModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate?: (template: MessageTemplate) => void
  filterType?: CommType
}

export function TemplateLibraryModal({
  isOpen,
  onClose,
  onSelectTemplate,
  filterType,
}: TemplateLibraryModalProps) {
  const [templates, setTemplates] = useState<MessageTemplate[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<CommType | 'ALL'>(filterType || 'ALL')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: 'WHATSAPP' as CommType,
    subject: '',
    message: '',
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchTemplates()
    }
  }, [isOpen, selectedType])

  async function fetchTemplates() {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedType !== 'ALL') {
        params.append('type', selectedType)
      }
      params.append('activeOnly', 'false')

      const response = await fetch(`/api/counselor/templates?${params}`)
      if (!response.ok) throw new Error('Failed to fetch templates')

      const data = await response.json()
      setTemplates(data.data || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load templates')
    } finally {
      setLoading(false)
    }
  }

  function handleEdit(template: MessageTemplate) {
    setEditingTemplate(template)
    setFormData({
      name: template.name,
      type: template.type,
      subject: template.subject || '',
      message: template.message,
    })
    setShowCreateForm(true)
  }

  async function handleDelete(templateId: string) {
    if (!confirm('Are you sure you want to delete this template?')) return

    try {
      const response = await fetch(`/api/counselor/templates/${templateId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete template')

      fetchTemplates()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete template')
    }
  }

  async function handleToggleActive(template: MessageTemplate) {
    try {
      const response = await fetch(`/api/counselor/templates/${template.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !template.isActive }),
      })

      if (!response.ok) throw new Error('Failed to update template')

      fetchTemplates()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update template')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!formData.name.trim() || !formData.message.trim()) {
      alert('Please fill in all required fields')
      return
    }

    if (formData.type === 'EMAIL' && !formData.subject.trim()) {
      alert('Email templates require a subject')
      return
    }

    try {
      setSaving(true)

      if (editingTemplate) {
        // Update existing template
        const response = await fetch(`/api/counselor/templates/${editingTemplate.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            subject: formData.type === 'EMAIL' ? formData.subject : null,
            message: formData.message,
          }),
        })

        if (!response.ok) throw new Error('Failed to update template')
      } else {
        // Create new template
        const response = await fetch('/api/counselor/templates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            type: formData.type,
            subject: formData.type === 'EMAIL' ? formData.subject : null,
            message: formData.message,
          }),
        })

        if (!response.ok) throw new Error('Failed to create template')
      }

      // Reset form
      setFormData({ name: '', type: 'WHATSAPP', subject: '', message: '' })
      setShowCreateForm(false)
      setEditingTemplate(null)
      fetchTemplates()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save template')
    } finally {
      setSaving(false)
    }
  }

  function handleCancelForm() {
    setShowCreateForm(false)
    setEditingTemplate(null)
    setFormData({ name: '', type: 'WHATSAPP', subject: '', message: '' })
  }

  if (!isOpen) return null

  const filteredTemplates =
    selectedType === 'ALL' ? templates : templates.filter((t) => t.type === selectedType)

  const typeColors: Record<CommType, string> = {
    WHATSAPP: 'bg-green-100 text-green-700 border-green-300',
    EMAIL: 'bg-blue-100 text-blue-700 border-blue-300',
    SMS: 'bg-purple-100 text-purple-700 border-purple-300',
    CALL: 'bg-orange-100 text-orange-700 border-orange-300',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-xl">Communication Template Library</h2>
            <p className="text-sm opacity-90">Manage your message templates</p>
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
        <div className="flex-1 overflow-y-auto p-6">
          {!showCreateForm ? (
            <>
              {/* Filter and Create Button */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedType('ALL')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedType === 'ALL'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedType('WHATSAPP')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedType === 'WHATSAPP'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={() => setSelectedType('EMAIL')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedType === 'EMAIL'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Email
                  </button>
                  <button
                    onClick={() => setSelectedType('SMS')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedType === 'SMS'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    SMS
                  </button>
                </div>

                <button
                  onClick={() => setShowCreateForm(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
                >
                  + New Template
                </button>
              </div>

              {/* Templates List */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="text-gray-600 mt-2 text-sm">Loading templates...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-600">{error}</p>
                </div>
              ) : filteredTemplates.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No templates found</p>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                  >
                    Create your first template
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={`border rounded-lg p-4 ${
                        template.isActive ? 'bg-white' : 'bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{template.name}</h3>
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${
                                typeColors[template.type]
                              }`}
                            >
                              {template.type}
                            </span>
                            {!template.isActive && (
                              <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-600">
                                Inactive
                              </span>
                            )}
                          </div>
                          {template.subject && (
                            <p className="text-sm text-gray-600 mb-1">
                              Subject: {template.subject}
                            </p>
                          )}
                          <p className="text-sm text-gray-700 line-clamp-2">{template.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Used {template.usageCount} times
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3">
                        {onSelectTemplate && (
                          <button
                            onClick={() => {
                              onSelectTemplate(template)
                              onClose()
                            }}
                            className="px-3 py-1.5 bg-indigo-600 text-white rounded text-xs font-medium hover:bg-indigo-700 transition-colors"
                          >
                            Use Template
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(template)}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-gray-200 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleActive(template)}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-gray-200 transition-colors"
                        >
                          {template.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDelete(template.id)}
                          className="px-3 py-1.5 bg-red-50 text-red-600 rounded text-xs font-medium hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingTemplate ? 'Edit Template' : 'Create New Template'}
              </h3>

              {/* Template Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Welcome Message, Follow-up Reminder"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={saving}
                />
              </div>

              {/* Type (only for new templates) */}
              {!editingTemplate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as CommType })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    disabled={saving}
                  >
                    <option value="WHATSAPP">WhatsApp</option>
                    <option value="EMAIL">Email</option>
                    <option value="SMS">SMS</option>
                  </select>
                </div>
              )}

              {/* Subject (for email) */}
              {(formData.type === 'EMAIL' || editingTemplate?.type === 'EMAIL') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Email subject line"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    disabled={saving}
                  />
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Template message content. Use {{studentName}}, {{courseName}} as variables."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use variables like {'{{'} studentName {'}}'}, {'{{'} courseName {'}}'} for
                  personalization
                </p>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={handleCancelForm}
                  disabled={saving}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>{editingTemplate ? 'Update Template' : 'Create Template'}</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
