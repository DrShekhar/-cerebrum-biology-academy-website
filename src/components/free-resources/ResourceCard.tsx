'use client'

import { FileText, Calendar, Bell, BookOpen, Calculator, Eye, Clock, Archive } from 'lucide-react'
import Link from 'next/link'

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

interface ResourceCardProps {
  resource: Resource
}

const typeConfig: Record<string, { icon: typeof FileText; color: string; bgColor: string }> = {
  PDF: { icon: FileText, color: 'text-red-600', bgColor: 'bg-red-100' },
  TIMETABLE: { icon: Calendar, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  ANNOUNCEMENT: { icon: Bell, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  NOTES: { icon: BookOpen, color: 'text-green-600', bgColor: 'bg-green-100' },
  FORMULA_SHEET: { icon: Calculator, color: 'text-purple-600', bgColor: 'bg-purple-100' },
}

const classCategoryLabels: Record<string, string> = {
  CLASS_9: 'Class 9',
  CLASS_10: 'Class 10',
  CLASS_11: 'Class 11',
  CLASS_12: 'Class 12',
  DROPPERS: 'Droppers',
  ALL: 'All Classes',
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const config = typeConfig[resource.type] || typeConfig.PDF
  const Icon = config.icon

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <Link href={`/free-resources/${resource.id}`} className="group block">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-green-300 transition-all duration-300 h-full flex flex-col">
        {resource.thumbnailUrl ? (
          <div className="aspect-video bg-gray-100 relative overflow-hidden">
            <img
              src={resource.thumbnailUrl}
              alt={resource.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {resource.isArchived && (
              <div className="absolute top-2 right-2 bg-gray-800/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <Archive className="w-3 h-3" />
                Archived
              </div>
            )}
          </div>
        ) : (
          <div
            className={`aspect-video ${config.bgColor} flex items-center justify-center relative`}
          >
            <Icon className={`w-16 h-16 ${config.color} opacity-50`} />
            {resource.isArchived && (
              <div className="absolute top-2 right-2 bg-gray-800/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <Archive className="w-3 h-3" />
                Archived
              </div>
            )}
          </div>
        )}

        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}
            >
              <Icon className="w-3 h-3" />
              {resource.type.replace('_', ' ')}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {classCategoryLabels[resource.classCategory] || resource.classCategory}
            </span>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
            {resource.title}
          </h3>

          {resource.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
              {resource.description}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>{resource.viewCount.toLocaleString()} views</span>
            </div>
            {resource.publishedAt && (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatDate(resource.publishedAt)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
