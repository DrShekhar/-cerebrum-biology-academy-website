'use client'

import { useState, useEffect, use } from 'react'
import {
  Loader2,
  ArrowLeft,
  Eye,
  Clock,
  FileText,
  Calendar,
  Bell,
  BookOpen,
  Calculator,
  Archive,
} from 'lucide-react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PDFViewer from '@/components/free-resources/PDFViewer'

interface Resource {
  id: string
  title: string
  description?: string | null
  type: string
  fileUrl?: string | null
  content?: string | null
  thumbnailUrl?: string | null
  classCategory: string
  isArchived: boolean
  publishedAt?: string | null
  viewCount: number
}

const typeConfig: Record<
  string,
  { icon: typeof FileText; color: string; bgColor: string; label: string }
> = {
  PDF: { icon: FileText, color: 'text-red-600', bgColor: 'bg-red-100', label: 'PDF Document' },
  TIMETABLE: { icon: Calendar, color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Timetable' },
  ANNOUNCEMENT: {
    icon: Bell,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    label: 'Announcement',
  },
  NOTES: { icon: BookOpen, color: 'text-green-600', bgColor: 'bg-green-100', label: 'Study Notes' },
  FORMULA_SHEET: {
    icon: Calculator,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    label: 'Formula Sheet',
  },
}

const classCategoryLabels: Record<string, string> = {
  CLASS_9: 'Class 9',
  CLASS_10: 'Class 10',
  CLASS_11: 'Class 11',
  CLASS_12: 'Class 12',
  DROPPERS: 'Droppers',
  ALL: 'All Classes',
}

export default function ResourceViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [resource, setResource] = useState<Resource | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchResource()
  }, [id])

  const fetchResource = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(`/api/free-resources/${id}`)
      const data = await res.json()

      if (data.success) {
        setResource(data.resource)
        setError(null)
      } else {
        setError(data.error || 'Resource not found')
      }
    } catch (err) {
      setError('Failed to load resource. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="pt-20 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-green-600" />
        </main>
      </div>
    )
  }

  if (error || !resource) {
    notFound()
  }

  const config = typeConfig[resource.type] || typeConfig.PDF
  const Icon = config.icon

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/free-resources"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${config.bgColor} ${config.color}`}
                >
                  <Icon className="w-4 h-4" />
                  {config.label}
                </span>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                  {classCategoryLabels[resource.classCategory] || resource.classCategory}
                </span>
                {resource.isArchived && (
                  <span className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-200 px-3 py-1.5 rounded-full">
                    <Archive className="w-3.5 h-3.5" />
                    Archived
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {resource.title}
              </h1>

              {resource.description && (
                <p className="text-gray-600 text-lg mb-6">{resource.description}</p>
              )}

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>{resource.viewCount.toLocaleString()} views</span>
                </div>
                {resource.publishedAt && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>Published {formatDate(resource.publishedAt)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 md:p-8">
              {resource.type === 'ANNOUNCEMENT' && resource.content ? (
                <div
                  className="prose prose-green max-w-none"
                  dangerouslySetInnerHTML={{ __html: resource.content }}
                />
              ) : resource.fileUrl ? (
                <PDFViewer fileUrl={resource.fileUrl} title={resource.title} />
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No content available for this resource.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
