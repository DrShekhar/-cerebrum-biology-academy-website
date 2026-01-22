'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

// ============================================
// TYPES
// ============================================

export type NoticeCategory = 'ANNOUNCEMENT' | 'ALERT' | 'REMINDER' | 'EVENT' | 'HOMEWORK' | 'EXAM'

export interface Notice {
  id: string
  title: string
  content: string
  category: NoticeCategory
  priority: number
  isPinned: boolean
  attachments?: Array<{ name: string; url: string; type: string }> | null
  publishedAt: string | null
  expiresAt: string | null
  viewCount: number
  createdAt: string
  isRead?: boolean
  readAt?: string | null
}

interface NoticeBoardProps {
  className?: string
  limit?: number
  showFilters?: boolean
  compact?: boolean
}

// ============================================
// CATEGORY CONFIG
// ============================================

const categoryConfig: Record<
  NoticeCategory,
  { label: string; icon: string; bgColor: string; textColor: string }
> = {
  ANNOUNCEMENT: {
    label: 'Announcement',
    icon: '📢',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
  },
  ALERT: {
    label: 'Alert',
    icon: '🚨',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
  },
  REMINDER: {
    label: 'Reminder',
    icon: '⏰',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
  },
  EVENT: {
    label: 'Event',
    icon: '📅',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
  },
  HOMEWORK: {
    label: 'Homework',
    icon: '📝',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
  EXAM: {
    label: 'Exam',
    icon: '📚',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-700',
  },
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function formatDate(dateString: string | null): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })
}

// ============================================
// NOTICE CARD COMPONENT
// ============================================

interface NoticeCardProps {
  notice: Notice
  compact?: boolean
  onClick?: () => void
}

function NoticeCard({ notice, compact, onClick }: NoticeCardProps) {
  const config = categoryConfig[notice.category]

  return (
    <div
      className={cn(
        'relative rounded-lg border bg-white p-4 transition-all hover:shadow-md cursor-pointer',
        notice.isPinned && 'border-yellow-300 bg-yellow-50/30',
        !notice.isRead && 'border-l-4 border-l-blue-500'
      )}
      onClick={onClick}
    >
      {/* Pinned Badge */}
      {notice.isPinned && (
        <div className="absolute -top-2 -right-2 text-yellow-500 text-lg">📌</div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
              config.bgColor,
              config.textColor
            )}
          >
            <span>{config.icon}</span>
            <span>{config.label}</span>
          </span>
          {!notice.isRead && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              New
            </span>
          )}
        </div>
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {formatDate(notice.publishedAt || notice.createdAt)}
        </span>
      </div>

      {/* Title */}
      <h3
        className={cn('font-semibold text-gray-900 mb-1', compact ? 'text-sm line-clamp-1' : 'text-base')}
      >
        {notice.title}
      </h3>

      {/* Content Preview */}
      {!compact && (
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{notice.content}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-2">
          {notice.attachments && notice.attachments.length > 0 && (
            <span className="flex items-center gap-1">
              📎 {notice.attachments.length} attachment{notice.attachments.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <span>{notice.viewCount} views</span>
      </div>
    </div>
  )
}

// ============================================
// NOTICE DETAIL MODAL
// ============================================

interface NoticeDetailModalProps {
  notice: Notice | null
  isOpen: boolean
  onClose: () => void
}

function NoticeDetailModal({ notice, isOpen, onClose }: NoticeDetailModalProps) {
  if (!isOpen || !notice) return null

  const config = categoryConfig[notice.category]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span
                className={cn(
                  'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mb-2',
                  config.bgColor,
                  config.textColor
                )}
              >
                <span>{config.icon}</span>
                <span>{config.label}</span>
              </span>
              <h2 className="text-xl font-bold text-gray-900">{notice.title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {formatDate(notice.publishedAt || notice.createdAt)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap text-gray-700">{notice.content}</p>
          </div>

          {/* Attachments */}
          {notice.attachments && notice.attachments.length > 0 && (
            <div className="mt-6 pt-4 border-t">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Attachments</h4>
              <div className="space-y-2">
                {notice.attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={attachment.url}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-lg">📎</span>
                    <span className="text-sm text-gray-700 flex-1">{attachment.name}</span>
                    <span className="text-xs text-gray-400">{attachment.type}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{notice.viewCount} views</span>
            {notice.expiresAt && (
              <span>Expires: {new Date(notice.expiresAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// MAIN NOTICE BOARD COMPONENT
// ============================================

export function NoticeBoard({ className, limit = 10, showFilters = true, compact = false }: NoticeBoardProps) {
  const [notices, setNotices] = useState<Notice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<NoticeCategory | 'ALL'>('ALL')
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchNotices()
  }, [selectedCategory, limit])

  async function fetchNotices() {
    try {
      setIsLoading(true)
      setError(null)

      const params = new URLSearchParams()
      params.set('limit', limit.toString())
      if (selectedCategory !== 'ALL') {
        params.set('category', selectedCategory)
      }

      const response = await fetch(`/api/notices?${params.toString()}`)
      const data = await response.json()

      if (data.success) {
        setNotices(data.data.notices)
      } else {
        setError(data.error || 'Failed to fetch notices')
      }
    } catch (err) {
      console.error('Error fetching notices:', err)
      setError('Failed to load notices')
    } finally {
      setIsLoading(false)
    }
  }

  function handleNoticeClick(notice: Notice) {
    setSelectedNotice(notice)
    setShowModal(true)

    // Mark as read (API call happens in GET /api/notices/[id])
    fetch(`/api/notices/${notice.id}`)
      .then(() => {
        // Update local state to mark as read
        setNotices((prev) =>
          prev.map((n) => (n.id === notice.id ? { ...n, isRead: true } : n))
        )
      })
      .catch(console.error)
  }

  const categories: Array<NoticeCategory | 'ALL'> = [
    'ALL',
    'ANNOUNCEMENT',
    'ALERT',
    'REMINDER',
    'EVENT',
    'HOMEWORK',
    'EXAM',
  ]

  const unreadCount = notices.filter((n) => !n.isRead).length

  return (
    <div className={cn('', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Notice Board</h2>
          {unreadCount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              {unreadCount} new
            </span>
          )}
        </div>
      </div>

      {/* Category Filters */}
      {showFilters && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {category === 'ALL'
                ? 'All'
                : `${categoryConfig[category].icon} ${categoryConfig[category].label}`}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
          <button
            onClick={fetchNotices}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            Try again
          </button>
        </div>
      ) : notices.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <span className="text-4xl mb-2 block">📭</span>
          <p className="text-gray-500">No notices to display</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              compact={compact}
              onClick={() => handleNoticeClick(notice)}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <NoticeDetailModal
        notice={selectedNotice}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  )
}

export default NoticeBoard
