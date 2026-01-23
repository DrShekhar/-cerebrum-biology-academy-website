'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Image as ImageIcon,
  Video,
  Search,
  Plus,
  Upload,
  Trash2,
  Edit,
  Star,
  StarOff,
  ExternalLink,
  Grid,
  List,
  X,
  RefreshCcw,
  AlertCircle,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

interface GalleryItem {
  id: string
  type: 'PHOTO' | 'VIDEO'
  title: string
  description: string | null
  category: string
  tags: string[]
  featured: boolean
  eventDate: string | null
  cloudflareId: string | null
  url: string
  thumbnailUrl: string | null
  blurHash: string | null
  aspectRatio: string
  width: number | null
  height: number | null
  durationSeconds: number | null
  displayOrder: number
  createdAt: string
}

interface GalleryStats {
  total: number
  photos: number
  videos: number
  byCategory: Record<string, number>
}

const CATEGORIES = [
  { value: 'TOPPERS', label: 'Toppers', icon: '🏆' },
  { value: 'EVENTS', label: 'Events', icon: '📸' },
  { value: 'SEMINARS', label: 'Seminars', icon: '🎓' },
  { value: 'FACULTY', label: 'Faculty', icon: '👨‍🏫' },
  { value: 'CAMPUS', label: 'Campus', icon: '🏫' },
  { value: 'MEDIA', label: 'Media', icon: '📺' },
  { value: 'VIDEOS', label: 'Videos', icon: '🎬' },
]

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [stats, setStats] = useState<GalleryStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<'PHOTO' | 'VIDEO' | null>(null)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  // Pagination
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  // View mode
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [deletingItem, setDeletingItem] = useState<GalleryItem | null>(null)

  // Fetch gallery items
  const fetchGalleryItems = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      params.set('page', String(page))
      params.set('limit', '20')
      params.set('includeStats', 'true')

      if (selectedCategory) params.set('category', selectedCategory)
      if (selectedType) params.set('type', selectedType)
      if (showFeaturedOnly) params.set('featured', 'true')
      if (searchQuery) params.set('search', searchQuery)

      const response = await fetch(`/api/admin/gallery?${params.toString()}`)
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch gallery items')
      }

      setItems(data.items)
      setTotal(data.total)
      setTotalPages(data.totalPages)
      if (data.stats) setStats(data.stats)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [page, selectedCategory, selectedType, showFeaturedOnly, searchQuery])

  useEffect(() => {
    fetchGalleryItems()
  }, [fetchGalleryItems])

  // Toggle featured status
  const toggleFeatured = async (item: GalleryItem) => {
    try {
      const response = await fetch(`/api/admin/gallery/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !item.featured }),
      })

      if (!response.ok) throw new Error('Failed to update')

      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, featured: !i.featured } : i))
      )
    } catch {
      setError('Failed to update featured status')
    }
  }

  // Delete item
  const handleDelete = async () => {
    if (!deletingItem) return

    try {
      const response = await fetch(`/api/admin/gallery/${deletingItem.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete')

      setItems((prev) => prev.filter((i) => i.id !== deletingItem.id))
      setDeletingItem(null)
      fetchGalleryItems()
    } catch {
      setError('Failed to delete gallery item')
    }
  }

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
        <p className="text-gray-600">Manage the Wall of Excellence gallery</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <Grid className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2">
                <ImageIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Photos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.photos}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2">
                <Video className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Videos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.videos}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-100 p-2">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Featured</p>
                <p className="text-2xl font-bold text-gray-900">
                  {items.filter((i) => i.featured).length}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search gallery..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType || ''}
            onChange={(e) => setSelectedType((e.target.value as 'PHOTO' | 'VIDEO') || null)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="">All Types</option>
            <option value="PHOTO">Photos</option>
            <option value="VIDEO">Videos</option>
          </select>

          {/* Featured Toggle */}
          <button
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            className={`flex items-center gap-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
              showFeaturedOnly
                ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Star className="h-4 w-4" />
            Featured
          </button>

          {/* View Mode */}
          <div className="flex rounded-lg border border-gray-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-l-lg p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded-r-lg p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Refresh */}
          <button
            onClick={fetchGalleryItems}
            className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
          >
            <RefreshCcw className="h-4 w-4" />
          </button>

          {/* Add Buttons */}
          <Button onClick={() => setShowUploadModal(true)} className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </Button>

          <Button onClick={() => setShowAddModal(true)} variant="outline" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add from URL
          </Button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ImageIcon className="mb-4 h-16 w-16 text-gray-300" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">No gallery items</h3>
          <p className="mb-4 text-gray-500">
            {searchQuery || selectedCategory || selectedType
              ? 'No items match your filters. Try adjusting your search.'
              : 'Get started by uploading your first image or video.'}
          </p>
          <Button onClick={() => setShowUploadModal(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
        </div>
      ) : (
        <>
          {/* Gallery Grid */}
          {viewMode === 'grid' ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    {/* Image/Video Thumbnail */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      {item.thumbnailUrl ? (
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          {item.type === 'VIDEO' ? (
                            <Video className="h-12 w-12 text-gray-400" />
                          ) : (
                            <ImageIcon className="h-12 w-12 text-gray-400" />
                          )}
                        </div>
                      )}

                      {/* Type Badge */}
                      {item.type === 'VIDEO' && (
                        <div className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                          <Video className="inline-block h-3 w-3 mr-1" />
                          {item.durationSeconds && formatDuration(item.durationSeconds)}
                        </div>
                      )}

                      {/* Featured Badge */}
                      {item.featured && (
                        <div className="absolute right-2 top-2 rounded-full bg-yellow-500 p-1">
                          <Star className="h-3 w-3 text-white" fill="currentColor" />
                        </div>
                      )}

                      {/* Hover Actions */}
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={() => toggleFeatured(item)}
                          className="rounded-full bg-white p-2 hover:bg-yellow-100"
                          title={item.featured ? 'Remove from featured' : 'Add to featured'}
                        >
                          {item.featured ? (
                            <StarOff className="h-4 w-4 text-yellow-600" />
                          ) : (
                            <Star className="h-4 w-4 text-yellow-600" />
                          )}
                        </button>
                        <button
                          onClick={() => setEditingItem(item)}
                          className="rounded-full bg-white p-2 hover:bg-blue-100"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4 text-blue-600" />
                        </button>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-white p-2 hover:bg-green-100"
                          title="View original"
                        >
                          <ExternalLink className="h-4 w-4 text-green-600" />
                        </a>
                        <button
                          onClick={() => setDeletingItem(item)}
                          className="rounded-full bg-white p-2 hover:bg-red-100"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <h3 className="truncate font-medium text-gray-900">{item.title}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                          {CATEGORIES.find((c) => c.value === item.category)?.icon}{' '}
                          {CATEGORIES.find((c) => c.value === item.category)?.label}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            /* List View */
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Image</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Title</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Featured</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
                          {item.thumbnailUrl ? (
                            <img
                              src={item.thumbnailUrl}
                              alt={item.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <ImageIcon className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-gray-900">{item.title}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
                          {CATEGORIES.find((c) => c.value === item.category)?.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-1 text-xs ${
                          item.type === 'VIDEO' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => toggleFeatured(item)}>
                          {item.featured ? (
                            <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                          ) : (
                            <Star className="h-5 w-5 text-gray-300" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingItem(item)}
                            className="rounded-lg p-1 hover:bg-gray-100"
                          >
                            <Edit className="h-4 w-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => setDeletingItem(item)}
                            className="rounded-lg p-1 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of {total} items
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Modal open={!!deletingItem} onOpenChange={(open) => !open && setDeletingItem(null)} title="Delete Gallery Item">
        <div className="p-4">
          <p className="mb-4 text-gray-600">
            Are you sure you want to delete &quot;{deletingItem?.title}&quot;? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeletingItem(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* Upload Modal */}
      <Modal open={showUploadModal} onOpenChange={setShowUploadModal} title="Upload Image" size="lg">
        <GalleryUploadForm
          onSuccess={() => {
            setShowUploadModal(false)
            fetchGalleryItems()
          }}
          onCancel={() => setShowUploadModal(false)}
        />
      </Modal>

      {/* Add from URL Modal */}
      <Modal open={showAddModal} onOpenChange={setShowAddModal} title="Add from URL" size="lg">
        <GalleryUrlForm
          onSuccess={() => {
            setShowAddModal(false)
            fetchGalleryItems()
          }}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={!!editingItem}
        onOpenChange={(open) => !open && setEditingItem(null)}
        title="Edit Gallery Item"
        size="lg"
      >
        {editingItem && (
          <GalleryEditForm
            item={editingItem}
            onSuccess={() => {
              setEditingItem(null)
              fetchGalleryItems()
            }}
            onCancel={() => setEditingItem(null)}
          />
        )}
      </Modal>
    </AdminLayout>
  )
}

// Helper function to format video duration
function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Gallery Upload Form Component
function GalleryUploadForm({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void
  onCancel: () => void
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'EVENTS',
    tags: '',
    featured: false,
    eventDate: '',
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      if (!formData.title) {
        setFormData((prev) => ({
          ...prev,
          title: selectedFile.name.replace(/\.[^/.]+$/, ''),
        }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setError('Please select an image')
      return
    }

    setUploading(true)
    setError(null)

    try {
      // Step 1: Get upload URL
      const uploadResponse = await fetch('/api/admin/gallery/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          description: formData.description,
          tags: formData.tags ? formData.tags.split(',').map((t) => t.trim()) : [],
          featured: formData.featured,
          eventDate: formData.eventDate || undefined,
        }),
      })

      const uploadData = await uploadResponse.json()
      if (!uploadData.success) {
        throw new Error(uploadData.error || 'Failed to get upload URL')
      }

      // Step 2: Upload file to Cloudflare
      const cfFormData = new FormData()
      cfFormData.append('file', file)

      const cfResponse = await fetch(uploadData.uploadUrl, {
        method: 'POST',
        body: cfFormData,
      })

      if (!cfResponse.ok) {
        throw new Error('Failed to upload to Cloudflare')
      }

      // Step 3: Confirm upload
      const confirmResponse = await fetch('/api/admin/gallery/upload/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageId: uploadData.imageId,
          title: formData.title,
          category: formData.category,
          description: formData.description,
          tags: formData.tags ? formData.tags.split(',').map((t) => t.trim()) : [],
          featured: formData.featured,
          eventDate: formData.eventDate || undefined,
        }),
      })

      const confirmData = await confirmResponse.json()
      if (!confirmData.success) {
        throw new Error(confirmData.error || 'Failed to confirm upload')
      }

      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {/* File Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          {preview ? (
            <div className="relative">
              <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded" />
              <button
                type="button"
                onClick={() => {
                  setFile(null)
                  setPreview(null)
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
        <select
          required
          value={formData.category}
          onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.icon} {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
          rows={3}
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData((p) => ({ ...p, tags: e.target.value }))}
          placeholder="e.g., neet-2024, biology, achievement"
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      {/* Event Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
        <input
          type="date"
          value={formData.eventDate}
          onChange={(e) => setFormData((p) => ({ ...p, eventDate: e.target.value }))}
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData((p) => ({ ...p, featured: e.target.checked }))}
          className="rounded"
        />
        <label htmlFor="featured" className="text-sm text-gray-700">
          Featured (show on homepage)
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={uploading}>
          Cancel
        </Button>
        <Button type="submit" disabled={uploading || !file}>
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
    </form>
  )
}

// Gallery URL Form Component
function GalleryUrlForm({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void
  onCancel: () => void
}) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    imageUrl: '',
    title: '',
    description: '',
    category: 'EVENTS',
    tags: '',
    featured: false,
    eventDate: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'PHOTO',
          imageUrl: formData.imageUrl,
          title: formData.title,
          category: formData.category,
          description: formData.description,
          tags: formData.tags ? formData.tags.split(',').map((t) => t.trim()) : [],
          featured: formData.featured,
          eventDate: formData.eventDate || undefined,
        }),
      })

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || 'Failed to add image')
      }

      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add image')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
        <input
          type="url"
          required
          value={formData.imageUrl}
          onChange={(e) => setFormData((p) => ({ ...p, imageUrl: e.target.value }))}
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
        <select
          required
          value={formData.category}
          onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.icon} {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
          rows={3}
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData((p) => ({ ...p, tags: e.target.value }))}
          placeholder="e.g., neet-2024, biology, achievement"
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      {/* Event Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
        <input
          type="date"
          value={formData.eventDate}
          onChange={(e) => setFormData((p) => ({ ...p, eventDate: e.target.value }))}
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured-url"
          checked={formData.featured}
          onChange={(e) => setFormData((p) => ({ ...p, featured: e.target.checked }))}
          className="rounded"
        />
        <label htmlFor="featured-url" className="text-sm text-gray-700">
          Featured (show on homepage)
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Image'}
        </Button>
      </div>
    </form>
  )
}

// Gallery Edit Form Component
function GalleryEditForm({
  item,
  onSuccess,
  onCancel,
}: {
  item: GalleryItem
  onSuccess: () => void
  onCancel: () => void
}) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: item.title,
    description: item.description || '',
    category: item.category,
    tags: item.tags.join(', '),
    featured: item.featured,
    eventDate: item.eventDate ? item.eventDate.split('T')[0] : '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/gallery/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          description: formData.description || null,
          tags: formData.tags ? formData.tags.split(',').map((t) => t.trim()) : [],
          featured: formData.featured,
          eventDate: formData.eventDate || null,
        }),
      })

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || 'Failed to update')
      }

      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {/* Preview */}
      {item.thumbnailUrl && (
        <div className="flex justify-center">
          <img src={item.thumbnailUrl} alt={item.title} className="max-h-32 rounded-lg" />
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
        <select
          required
          value={formData.category}
          onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.icon} {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
          rows={3}
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData((p) => ({ ...p, tags: e.target.value }))}
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      {/* Event Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
        <input
          type="date"
          value={formData.eventDate}
          onChange={(e) => setFormData((p) => ({ ...p, eventDate: e.target.value }))}
          className="w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured-edit"
          checked={formData.featured}
          onChange={(e) => setFormData((p) => ({ ...p, featured: e.target.checked }))}
          className="rounded"
        />
        <label htmlFor="featured-edit" className="text-sm text-gray-700">
          Featured (show on homepage)
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}
