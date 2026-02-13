'use client'

/**
 * Admin LMS - Materials List
 *
 * View and manage all uploaded study materials
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { showToast } from '@/lib/toast'

interface Material {
  id: string
  title: string
  fileName: string
  fileSize: number
  materialType: string
  isPublished: boolean
  totalDownloads: number
  totalViews: number
  createdAt: string
}

interface Stats {
  totalMaterials: number
  totalDownloads: number
  totalViews: number
  totalSize: number
}

export default function MaterialsListPage() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [stats, setStats] = useState<Stats>({
    totalMaterials: 0,
    totalDownloads: 0,
    totalViews: 0,
    totalSize: 0,
  })
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [publishedFilter, setPublishedFilter] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchMaterials()
  }, [filter, typeFilter, publishedFilter])

  const fetchMaterials = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filter) params.append('search', filter)
      if (typeFilter) params.append('type', typeFilter)
      if (publishedFilter) params.append('published', publishedFilter)

      const response = await fetch(`/api/admin/lms/materials?${params}`)
      const data = await response.json()

      if (data.success) {
        setMaterials(data.materials)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Failed to fetch materials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this material?')) {
      return
    }

    try {
      setDeleting(true)
      const response = await fetch(`/api/admin/lms/materials/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        // Refresh list
        fetchMaterials()
        setDeleteId(null)
      } else {
        showToast.error('Failed to delete material: ' + data.error)
      }
    } catch (error) {
      console.error('Delete failed:', error)
      showToast.error('Failed to delete material')
    } finally {
      setDeleting(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Materials</h1>
            <p className="text-gray-600">Manage all uploaded PDFs and study resources</p>
          </div>

          <Link
            href="/admin/lms/materials/upload"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ➕ Upload New Material
          </Link>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search materials..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="PDF_NOTES">Class Notes</option>
              <option value="PDF_ASSIGNMENT">Assignments</option>
              <option value="PDF_PRACTICE_PAPER">Practice Papers</option>
            </select>

            <select
              value={publishedFilter}
              onChange={(e) => setPublishedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </select>
          </div>
        </div>

        {/* Materials Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading materials...</div>
          ) : materials.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500 mb-4">No materials uploaded yet</p>
              <Link
                href="/admin/lms/materials/upload"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upload Your First Material
              </Link>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Material
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Downloads
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {materials.map((material) => (
                  <tr key={material.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{material.title}</p>
                        <p className="text-sm text-gray-500">{material.fileName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {material.materialType.replace('PDF_', '').replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatFileSize(material.fileSize)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{material.totalDownloads}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          material.isPublished
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {material.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleDelete(material.id)}
                        disabled={deleting}
                        className="text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        {deleting && deleteId === material.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Materials</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalMaterials}</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Published</p>
            <p className="text-2xl font-bold text-green-600">
              {materials.filter((m) => m.isPublished).length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Downloads</p>
            <p className="text-2xl font-bold text-blue-600">{stats.totalDownloads}</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Views</p>
            <p className="text-2xl font-bold text-purple-600">{stats.totalViews}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
