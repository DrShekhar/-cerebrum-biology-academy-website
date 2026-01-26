'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Link2,
  Plus,
  Copy,
  Check,
  ExternalLink,
  MousePointerClick,
  Users,
  TrendingUp,
  MoreVertical,
  Edit2,
  Trash2,
  AlertCircle,
  RefreshCw,
  Filter,
  ToggleLeft,
  ToggleRight,
  Loader2,
} from 'lucide-react'
import toast from 'react-hot-toast'

interface ReferralLink {
  id: string
  code: string
  name: string
  description: string | null
  fullUrl: string
  isActive: boolean
  clickCount: number
  conversionCount: number
  conversionRate: number
  referralCount: number
  targetCourse: string | null
  targetCampaign: string | null
  expiresAt: string | null
  createdAt: string
  updatedAt: string
}

interface Summary {
  total: number
  active: number
  inactive: number
  totalClicks: number
  totalConversions: number
  overallConversionRate: number
}

interface LinksResponse {
  links: ReferralLink[]
  summary: Summary
}

const statusFilters = [
  { value: 'all', label: 'All Links' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

export default function ReferralLinksPage() {
  const [data, setData] = useState<LinksResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState<ReferralLink | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<ReferralLink | null>(null)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const fetchLinks = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (status !== 'all') params.set('status', status)

      const response = await fetch(`/api/consultant/links?${params.toString()}`)
      const result = await response.json()

      if (!result.success) {
        setError(result.error || 'Failed to load links')
        return
      }

      setData(result.data)
    } catch {
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }, [status])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  const copyToClipboard = async (link: ReferralLink) => {
    try {
      await navigator.clipboard.writeText(link.fullUrl)
      setCopiedId(link.id)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      toast.error('Failed to copy link')
    }
  }

  const toggleLinkStatus = async (link: ReferralLink) => {
    try {
      const response = await fetch(`/api/consultant/links/${link.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !link.isActive }),
      })

      const result = await response.json()

      if (!result.success) {
        toast.error(result.error || 'Failed to update link')
        return
      }

      toast.success(link.isActive ? 'Link deactivated' : 'Link activated')
      fetchLinks()
    } catch {
      toast.error('Failed to update link')
    }
    setOpenMenu(null)
  }

  const deleteLink = async (link: ReferralLink) => {
    try {
      const response = await fetch(`/api/consultant/links/${link.id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (!result.success) {
        toast.error(result.error || 'Failed to delete link')
        return
      }

      toast.success('Link deleted')
      fetchLinks()
    } catch {
      toast.error('Failed to delete link')
    }
    setShowDeleteConfirm(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Referral Links</h1>
          <p className="text-gray-600 mt-1">Create and manage your referral tracking links</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Create New Link
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
              <Link2 className="w-5 h-5 text-teal-600" />
            </div>
            <span className="text-sm text-gray-600">Total Links</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {loading ? (
              <span className="inline-block w-12 h-8 bg-gray-200 rounded animate-pulse"></span>
            ) : (
              data?.summary.total || 0
            )}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {data?.summary.active || 0} active, {data?.summary.inactive || 0} inactive
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <MousePointerClick className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Total Clicks</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {loading ? (
              <span className="inline-block w-12 h-8 bg-gray-200 rounded animate-pulse"></span>
            ) : (
              (data?.summary.totalClicks || 0).toLocaleString()
            )}
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Conversions</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {loading ? (
              <span className="inline-block w-12 h-8 bg-gray-200 rounded animate-pulse"></span>
            ) : (
              data?.summary.totalConversions || 0
            )}
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600">Conversion Rate</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {loading ? (
              <span className="inline-block w-12 h-8 bg-gray-200 rounded animate-pulse"></span>
            ) : (
              `${data?.summary.overallConversionRate || 0}%`
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              {statusFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={fetchLinks}
            disabled={loading}
            className="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 ml-auto"
          >
            <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Links</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchLinks}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && !data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 animate-pulse"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="flex gap-4 mt-4">
                <div className="h-8 bg-gray-200 rounded w-20"></div>
                <div className="h-8 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && data?.links.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Link2 className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Referral Links</h2>
          <p className="text-gray-600 mb-6">
            Create your first referral link to start tracking leads.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Create Your First Link
          </button>
        </div>
      )}

      {/* Links Grid */}
      {!loading && !error && data && data.links.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.links.map((link) => (
            <div
              key={link.id}
              className={`bg-white rounded-xl p-5 shadow-sm border transition-all ${
                link.isActive ? 'border-gray-100 hover:shadow-md' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 truncate">{link.name}</h3>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        link.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {link.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  {link.description && (
                    <p className="text-sm text-gray-500 mt-1 truncate">{link.description}</p>
                  )}
                </div>

                {/* Menu */}
                <div className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === link.id ? null : link.id)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>

                  {openMenu === link.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)}></div>
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                        <button
                          onClick={() => {
                            setShowEditModal(link)
                            setOpenMenu(null)
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit Link
                        </button>
                        <button
                          onClick={() => toggleLinkStatus(link)}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          {link.isActive ? (
                            <>
                              <ToggleLeft className="w-4 h-4" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <ToggleRight className="w-4 h-4" />
                              Activate
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setShowDeleteConfirm(link)
                            setOpenMenu(null)
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Link
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Link URL */}
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg mb-4">
                <code className="text-sm text-gray-600 truncate flex-1">{link.fullUrl}</code>
                <button
                  onClick={() => copyToClipboard(link)}
                  className="p-1.5 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                  title="Copy link"
                >
                  {copiedId === link.id ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                <a
                  href={link.fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                  title="Open link"
                >
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <p className="text-lg font-bold text-blue-700">
                    {link.clickCount.toLocaleString()}
                  </p>
                  <p className="text-xs text-blue-600">Clicks</p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <p className="text-lg font-bold text-green-700">{link.conversionCount}</p>
                  <p className="text-xs text-green-600">Conversions</p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded-lg">
                  <p className="text-lg font-bold text-purple-700">{link.conversionRate}%</p>
                  <p className="text-xs text-purple-600">Rate</p>
                </div>
              </div>

              {/* Additional Info */}
              {(link.targetCourse || link.targetCampaign || link.expiresAt) && (
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                  {link.targetCourse && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {link.targetCourse}
                    </span>
                  )}
                  {link.targetCampaign && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {link.targetCampaign}
                    </span>
                  )}
                  {link.expiresAt && (
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        new Date(link.expiresAt) < new Date()
                          ? 'bg-red-100 text-red-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      Expires: {new Date(link.expiresAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create Link Modal */}
      {showCreateModal && (
        <CreateLinkModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            fetchLinks()
          }}
        />
      )}

      {/* Edit Link Modal */}
      {showEditModal && (
        <EditLinkModal
          link={showEditModal}
          onClose={() => setShowEditModal(null)}
          onSuccess={() => {
            setShowEditModal(null)
            fetchLinks()
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <DeleteLinkModal
          link={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(null)}
          onConfirm={() => deleteLink(showDeleteConfirm)}
        />
      )}
    </div>
  )
}

// Create Link Modal
function CreateLinkModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    targetCourse: '',
    targetCampaign: '',
    customCode: '',
    expiresAt: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch('/api/consultant/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          customCode: formData.customCode || undefined,
          expiresAt: formData.expiresAt || undefined,
        }),
      })

      const result = await response.json()

      if (!result.success) {
        toast.error(result.error || 'Failed to create link')
        return
      }

      toast.success('Referral link created!')
      onSuccess()
    } catch {
      toast.error('Failed to create link')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Referral Link</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Facebook Campaign, WhatsApp Group"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional description for your reference"
              rows={2}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Course</label>
            <select
              value={formData.targetCourse}
              onChange={(e) => setFormData({ ...formData, targetCourse: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="">Any Course</option>
              <option value="Pinnacle NEET Biology">Pinnacle NEET Biology</option>
              <option value="Ascent NEET Biology">Ascent NEET Biology</option>
              <option value="Pursuit NEET Biology">Pursuit NEET Biology</option>
              <option value="Foundation Course">Foundation Course</option>
              <option value="Crash Course">Crash Course</option>
              <option value="Test Series">Test Series</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Tag</label>
            <input
              type="text"
              value={formData.targetCampaign}
              onChange={(e) => setFormData({ ...formData, targetCampaign: e.target.value })}
              placeholder="e.g., Summer 2024, Diwali Offer"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Custom Code (optional)
            </label>
            <input
              type="text"
              value={formData.customCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customCode: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''),
                })
              }
              placeholder="e.g., my-special-link"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty for auto-generated code. 4-20 characters, lowercase letters, numbers, and
              hyphens only.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <input
              type="date"
              value={formData.expiresAt}
              onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Link'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Edit Link Modal
function EditLinkModal({
  link,
  onClose,
  onSuccess,
}: {
  link: ReferralLink
  onClose: () => void
  onSuccess: () => void
}) {
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: link.name,
    description: link.description || '',
    targetCourse: link.targetCourse || '',
    targetCampaign: link.targetCampaign || '',
    expiresAt: link.expiresAt ? link.expiresAt.split('T')[0] : '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/consultant/links/${link.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          expiresAt: formData.expiresAt || null,
        }),
      })

      const result = await response.json()

      if (!result.success) {
        toast.error(result.error || 'Failed to update link')
        return
      }

      toast.success('Link updated!')
      onSuccess()
    } catch {
      toast.error('Failed to update link')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Referral Link</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Course</label>
            <select
              value={formData.targetCourse}
              onChange={(e) => setFormData({ ...formData, targetCourse: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="">Any Course</option>
              <option value="Pinnacle NEET Biology">Pinnacle NEET Biology</option>
              <option value="Ascent NEET Biology">Ascent NEET Biology</option>
              <option value="Pursuit NEET Biology">Pursuit NEET Biology</option>
              <option value="Foundation Course">Foundation Course</option>
              <option value="Crash Course">Crash Course</option>
              <option value="Test Series">Test Series</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Tag</label>
            <input
              type="text"
              value={formData.targetCampaign}
              onChange={(e) => setFormData({ ...formData, targetCampaign: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <input
              type="date"
              value={formData.expiresAt}
              onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Delete Link Modal
function DeleteLinkModal({
  link,
  onClose,
  onConfirm,
}: {
  link: ReferralLink
  onClose: () => void
  onConfirm: () => void
}) {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    await onConfirm()
    setDeleting(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Delete Link?</h2>
          <p className="text-gray-600 text-sm mb-2">
            Are you sure you want to delete <span className="font-medium">{link.name}</span>?
          </p>
          {link.referralCount > 0 && (
            <p className="text-red-600 text-sm mb-4">
              This link has {link.referralCount} referrals and cannot be deleted.
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting || link.referralCount > 0}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {deleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
