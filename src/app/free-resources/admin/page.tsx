'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Upload,
  Loader2,
  LogOut,
  Save,
  X,
  FileText,
  Calendar,
  Bell,
  BookOpen,
  Calculator,
  Archive,
  RotateCcw,
} from 'lucide-react'
import AdminPasswordGate from '@/components/free-resources/AdminPasswordGate'

interface Resource {
  id: string
  title: string
  description?: string | null
  type: string
  fileUrl?: string | null
  content?: string | null
  thumbnailUrl?: string | null
  classCategory: string
  priority: number
  isPublished: boolean
  isArchived: boolean
  publishedAt?: string | null
  expiresAt?: string | null
  viewCount: number
  createdAt: string
}

const types = [
  { value: 'PDF', label: 'PDF', icon: FileText },
  { value: 'TIMETABLE', label: 'Timetable', icon: Calendar },
  { value: 'ANNOUNCEMENT', label: 'Announcement', icon: Bell },
  { value: 'NOTES', label: 'Notes', icon: BookOpen },
  { value: 'FORMULA_SHEET', label: 'Formula Sheet', icon: Calculator },
]

const classes = [
  { value: 'ALL', label: 'All Classes' },
  { value: 'CLASS_9', label: 'Class 9' },
  { value: 'CLASS_10', label: 'Class 10' },
  { value: 'CLASS_11', label: 'Class 11' },
  { value: 'CLASS_12', label: 'Class 12' },
  { value: 'DROPPERS', label: 'Droppers' },
]

function AdminPanel() {
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'PDF',
    fileUrl: '',
    content: '',
    thumbnailUrl: '',
    classCategory: 'ALL',
    priority: 0,
    isPublished: false,
    expiresAt: '',
  })

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/free-resources/admin?all=true')
      const data = await res.json()
      if (data.success) {
        setResources(data.resources)
      }
    } catch (error) {
      console.error('Failed to fetch resources:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/free-resources/admin/verify-password', { method: 'DELETE' })
    window.location.reload()
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'PDF',
      fileUrl: '',
      content: '',
      thumbnailUrl: '',
      classCategory: 'ALL',
      priority: 0,
      isPublished: false,
      expiresAt: '',
    })
    setEditingResource(null)
    setShowForm(false)
  }

  const handleEdit = (resource: Resource) => {
    setFormData({
      title: resource.title,
      description: resource.description || '',
      type: resource.type,
      fileUrl: resource.fileUrl || '',
      content: resource.content || '',
      thumbnailUrl: resource.thumbnailUrl || '',
      classCategory: resource.classCategory,
      priority: resource.priority,
      isPublished: resource.isPublished,
      expiresAt: resource.expiresAt ? resource.expiresAt.split('T')[0] : '',
    })
    setEditingResource(resource)
    setShowForm(true)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadProgress('Uploading...')

    const formDataUpload = new FormData()
    formDataUpload.append('file', file)

    try {
      const res = await fetch('/api/free-resources/admin/upload', {
        method: 'POST',
        body: formDataUpload,
      })

      const data = await res.json()
      if (data.success) {
        setFormData((prev) => ({ ...prev, fileUrl: data.file.url }))
        setUploadProgress('Upload complete!')
        setTimeout(() => setUploadProgress(null), 2000)
      } else {
        setUploadProgress(`Error: ${data.error}`)
        setTimeout(() => setUploadProgress(null), 3000)
      }
    } catch (error) {
      setUploadProgress('Upload failed')
      setTimeout(() => setUploadProgress(null), 3000)
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = '/api/free-resources/admin'
      const method = editingResource ? 'PUT' : 'POST'
      const body = editingResource ? { id: editingResource.id, ...formData } : formData

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()
      if (data.success) {
        await fetchResources()
        resetForm()
      } else {
        alert(data.error || 'Failed to save resource')
      }
    } catch (error) {
      alert('Failed to save resource')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return

    try {
      const res = await fetch(`/api/free-resources/admin?id=${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        await fetchResources()
      } else {
        alert(data.error || 'Failed to delete resource')
      }
    } catch (error) {
      alert('Failed to delete resource')
    }
  }

  const togglePublish = async (resource: Resource) => {
    try {
      const res = await fetch('/api/free-resources/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: resource.id, isPublished: !resource.isPublished }),
      })
      const data = await res.json()
      if (data.success) {
        await fetchResources()
      }
    } catch (error) {
      alert('Failed to update resource')
    }
  }

  const toggleArchive = async (resource: Resource) => {
    try {
      const res = await fetch('/api/free-resources/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: resource.id, isArchived: !resource.isArchived }),
      })
      const data = await res.json()
      if (data.success) {
        await fetchResources()
      }
    } catch (error) {
      alert('Failed to update resource')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Free Resources Admin</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Resource
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {editingResource ? 'Edit Resource' : 'Add New Resource'}
                </h2>
                <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    >
                      {types.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
                    <select
                      value={formData.classCategory}
                      onChange={(e) => setFormData({ ...formData, classCategory: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    >
                      {classes.map((cls) => (
                        <option key={cls.value} value={cls.value}>
                          {cls.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {formData.type !== 'ANNOUNCEMENT' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      File Upload
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 border border-dashed border-gray-300 rounded-lg hover:border-green-600 hover:bg-green-50 transition-colors flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Choose File
                      </button>
                      {uploadProgress && (
                        <span className="text-sm text-gray-600">{uploadProgress}</span>
                      )}
                    </div>
                    {formData.fileUrl && (
                      <p className="text-sm text-green-600 mt-2 truncate">
                        File URL: {formData.fileUrl}
                      </p>
                    )}
                  </div>
                )}

                {formData.type === 'ANNOUNCEMENT' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content (HTML)
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent font-mono text-sm"
                      rows={6}
                      placeholder="<p>Your announcement content here...</p>"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority (higher = top)
                    </label>
                    <input
                      type="number"
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expires At (optional)
                    </label>
                    <input
                      type="date"
                      value={formData.expiresAt}
                      onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-600"
                  />
                  <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                    Publish immediately
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {editingResource ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-green-600" />
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Resources Yet</h3>
            <p className="text-gray-500 mb-6">Create your first resource to get started.</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Resource
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Title</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Type</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Class</th>
                    <th className="text-center px-4 py-3 text-sm font-medium text-gray-700">
                      Status
                    </th>
                    <th className="text-center px-4 py-3 text-sm font-medium text-gray-700">
                      Views
                    </th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {resources.map((resource) => (
                    <tr key={resource.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 truncate max-w-xs">
                          {resource.title}
                        </p>
                        {resource.description && (
                          <p className="text-sm text-gray-500 truncate max-w-xs">
                            {resource.description}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600">
                          {resource.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600">
                          {classes.find((c) => c.value === resource.classCategory)?.label ||
                            resource.classCategory}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {resource.isPublished ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              <Eye className="w-3 h-3" />
                              Live
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              <EyeOff className="w-3 h-3" />
                              Draft
                            </span>
                          )}
                          {resource.isArchived && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                              <Archive className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-600">
                        {resource.viewCount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => togglePublish(resource)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title={resource.isPublished ? 'Unpublish' : 'Publish'}
                          >
                            {resource.isPublished ? (
                              <EyeOff className="w-4 h-4 text-gray-600" />
                            ) : (
                              <Eye className="w-4 h-4 text-green-600" />
                            )}
                          </button>
                          <button
                            onClick={() => toggleArchive(resource)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title={resource.isArchived ? 'Unarchive' : 'Archive'}
                          >
                            {resource.isArchived ? (
                              <RotateCcw className="w-4 h-4 text-yellow-600" />
                            ) : (
                              <Archive className="w-4 h-4 text-gray-600" />
                            )}
                          </button>
                          <button
                            onClick={() => handleEdit(resource)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(resource.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <AdminPasswordGate>
      <AdminPanel />
    </AdminPasswordGate>
  )
}
