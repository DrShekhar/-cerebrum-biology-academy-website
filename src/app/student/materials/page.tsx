'use client'

/**
 * Student Materials Portal - Browse and access study materials
 *
 * Features:
 * - Browse published materials
 * - Filter by course/chapter/type
 * - Search materials
 * - Download PDFs with tracking
 * - View material details
 */

import { useEffect, useState } from 'react'

// Force dynamic rendering since this requires authentication
export const dynamic = 'force-dynamic'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  BookOpen,
  Download,
  Eye,
  FileText,
  Filter,
  Search,
  Star,
  Clock,
  ChevronRight,
} from 'lucide-react'

interface Material {
  id: string
  title: string
  description: string | null
  fileName: string
  fileUrl: string
  fileSize: number
  materialType: string
  category: string | null
  tags: string[]
  totalDownloads: number
  totalViews: number
  avgRating: number | null
  course: {
    id: string
    name: string
  } | null
  chapter: {
    id: string
    title: string
  } | null
  topic: {
    id: string
    title: string
  } | null
  createdAt: string
  publishedAt: string | null
}

interface MaterialsResponse {
  success: boolean
  materials: Material[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  stats: {
    totalMaterials: number
    totalDownloads: number
  }
  error?: string
}

export default function StudentMaterialsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [stats, setStats] = useState({ total: 0, downloads: 0 })

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/student/materials')
    }
  }, [status, router])

  // Fetch materials
  useEffect(() => {
    if (status === 'authenticated') {
      fetchMaterials()
    }
  }, [status, searchQuery, filterType])

  const fetchMaterials = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      params.append('published', 'true') // Only published materials
      if (searchQuery) params.append('search', searchQuery)
      if (filterType && filterType !== 'all') params.append('type', filterType)

      const response = await fetch(`/api/student/materials?${params}`)
      const data: MaterialsResponse = await response.json()

      if (data.success) {
        setMaterials(data.materials)
        setStats({
          total: data.stats.totalMaterials,
          downloads: data.stats.totalDownloads,
        })
      } else {
        setError(data.error || 'Failed to load materials')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const handleDownload = async (materialId: string, fileUrl: string, fileName: string) => {
    try {
      // Track download
      await fetch(`/api/student/materials/${materialId}/download`, {
        method: 'POST',
      })

      // Open PDF in new tab
      window.open(fileUrl, '_blank')
    } catch (err) {
      console.error('Download tracking failed:', err)
      // Still open the file even if tracking fails
      window.open(fileUrl, '_blank')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading materials...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Materials</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchMaterials}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
              <p className="mt-1 text-sm text-gray-500">
                Access your course materials and resources
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{stats.total}</span> Materials
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{stats.downloads}</span> Downloads
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter by Type */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Types</option>
              <option value="NOTES">Notes</option>
              <option value="ASSIGNMENT">Assignments</option>
              <option value="PRACTICE">Practice Sets</option>
              <option value="SOLUTION">Solutions</option>
              <option value="REFERENCE">Reference Material</option>
            </select>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {materials.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No materials found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery
                ? 'Try adjusting your search'
                : 'Materials will appear here when added by your instructor'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
              <div
                key={material.id}
                className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {material.materialType}
                    </span>
                    {material.avgRating && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        {material.avgRating.toFixed(1)}
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {material.title}
                  </h3>
                  {material.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{material.description}</p>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-3">
                  {/* Course Info */}
                  {material.course && (
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span className="font-medium">{material.course.name}</span>
                    </div>
                  )}

                  {/* Chapter/Topic */}
                  {(material.chapter || material.topic) && (
                    <div className="flex items-center text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 mr-1" />
                      {material.chapter && <span>{material.chapter.title}</span>}
                      {material.chapter && material.topic && <span className="mx-1">›</span>}
                      {material.topic && <span>{material.topic.title}</span>}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {material.totalDownloads}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {material.totalViews}
                    </div>
                    <div>{formatFileSize(material.fileSize)}</div>
                  </div>

                  {/* Date */}
                  {material.publishedAt && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDate(material.publishedAt)}
                    </div>
                  )}

                  {/* Tags */}
                  {material.tags && material.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {material.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                      {material.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{material.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6">
                  <button
                    onClick={() => handleDownload(material.id, material.fileUrl, material.fileName)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
