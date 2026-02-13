'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Send,
  Trash2,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Tag,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'

type DraftStatus = 'draft' | 'in_review' | 'approved' | 'rejected' | 'published' | 'archived'
type ContentType = 'BLOG_POST' | 'NEWS_ARTICLE' | 'SEO_LANDING_PAGE' | 'SOCIAL_POST' | 'LEAD_MAGNET'

interface DraftItem {
  id: string
  type: ContentType
  status: DraftStatus
  priority: 'normal' | 'high' | 'urgent'
  createdAt: string
  updatedAt: string
  title: string
  excerpt?: string
  author?: string
  wordCount?: number
  tags?: string[]
}

const statusConfig: Record<
  DraftStatus,
  { label: string; color: string; icon: typeof CheckCircle }
> = {
  draft: { label: 'Draft', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
  in_review: { label: 'In Review', color: 'bg-blue-100 text-blue-800', icon: Eye },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle },
  published: { label: 'Published', color: 'bg-gray-100 text-gray-600', icon: Send },
  archived: { label: 'Archived', color: 'bg-gray-100 text-gray-500', icon: Trash2 },
}

const typeLabels: Record<ContentType, string> = {
  BLOG_POST: 'Blog Post',
  NEWS_ARTICLE: 'News Article',
  SEO_LANDING_PAGE: 'SEO Landing',
  SOCIAL_POST: 'Social Post',
  LEAD_MAGNET: 'Lead Magnet',
}

function getAge(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function ContentDraftsPage() {
  const [drafts, setDrafts] = useState<DraftItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<DraftStatus | 'all'>('all')
  const [expandedDraft, setExpandedDraft] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const fetchDrafts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/admin/content/drafts')
      if (!response.ok) throw new Error('Failed to fetch drafts')
      const data = await response.json()
      setDrafts(data.drafts || [])
    } catch (err) {
      setError('Failed to load drafts')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDrafts()
  }, [fetchDrafts])

  const handleAction = async (draftId: string, action: 'approve' | 'reject' | 'publish') => {
    setActionLoading(draftId)
    try {
      const response = await fetch('/api/admin/content/drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draftId, action }),
      })
      if (!response.ok) throw new Error('Action failed')
      await fetchDrafts()
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading(null)
    }
  }

  const filteredDrafts =
    selectedStatus === 'all' ? drafts : drafts.filter((d) => d.status === selectedStatus)

  const draftsByStatus = drafts.reduce(
    (acc, draft) => {
      acc[draft.status] = (acc[draft.status] || 0) + 1
      return acc
    },
    {} as Record<DraftStatus, number>
  )

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Content Drafts</h1>
              <p className="text-gray-600 mt-1">Review and publish SEO content</p>
            </div>
            <button
              onClick={fetchDrafts}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
          {(
            ['draft', 'in_review', 'approved', 'rejected', 'published', 'archived'] as DraftStatus[]
          ).map((status) => {
            const config = statusConfig[status]
            const Icon = config.icon
            const count = draftsByStatus[status] || 0
            const isSelected = selectedStatus === status
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(isSelected ? 'all' : status)}
                className={`p-3 md:p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-medium text-gray-500 uppercase">
                    {config.label}
                  </span>
                </div>
                <div className="text-xl md:text-2xl font-bold text-gray-900">{count}</div>
              </button>
            )
          })}
        </div>

        {/* Drafts List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600">{error}</p>
            <button
              onClick={fetchDrafts}
              className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
              Try Again
            </button>
          </div>
        ) : filteredDrafts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">No drafts found</p>
            <p className="text-sm text-gray-500">
              Generate content with:{' '}
              <code className="bg-gray-200 px-2 py-1 rounded">
                npm run seo:blog &quot;Topic&quot;
              </code>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredDrafts.map((draft) => {
                const config = statusConfig[draft.status]
                const StatusIcon = config.icon
                const isExpanded = expandedDraft === draft.id
                const isActionLoading = actionLoading === draft.id

                return (
                  <motion.div
                    key={draft.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                  >
                    {/* Main Row */}
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        {/* Priority & Type */}
                        <div className="flex items-center gap-3 md:w-32">
                          {draft.priority === 'urgent' && <span className="text-lg">⚡</span>}
                          {draft.priority === 'high' && <span className="text-lg">🔥</span>}
                          <span className={`px-2 py-1 text-xs font-medium rounded ${config.color}`}>
                            {typeLabels[draft.type]}
                          </span>
                        </div>

                        {/* Title & Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{draft.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {getAge(draft.createdAt)}
                            </span>
                            {draft.wordCount && <span>{draft.wordCount} words</span>}
                            <span className="font-mono text-xs text-gray-400">{draft.id}</span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${config.color}`}
                          >
                            <StatusIcon className="w-4 h-4" />
                            {config.label}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setExpandedDraft(isExpanded ? null : draft.id)}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-gray-100 bg-gray-50"
                        >
                          <div className="p-4 md:p-6">
                            {draft.excerpt && <p className="text-gray-600 mb-4">{draft.excerpt}</p>}

                            {draft.tags && draft.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {draft.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 rounded text-xs text-gray-700"
                                  >
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200">
                              {(draft.status === 'draft' || draft.status === 'in_review') && (
                                <>
                                  <button
                                    onClick={() => handleAction(draft.id, 'approve')}
                                    disabled={isActionLoading}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleAction(draft.id, 'reject')}
                                    disabled={isActionLoading}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                                  >
                                    <XCircle className="w-4 h-4" />
                                    Reject
                                  </button>
                                </>
                              )}

                              {draft.status === 'approved' && (
                                <button
                                  onClick={() => handleAction(draft.id, 'publish')}
                                  disabled={isActionLoading}
                                  className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50"
                                >
                                  <Send className="w-4 h-4" />
                                  {isActionLoading ? 'Publishing...' : 'Publish Now'}
                                </button>
                              )}

                              {draft.status === 'published' && draft.type === 'BLOG_POST' && (
                                <a
                                  href={`/blog/${draft.title
                                    .toLowerCase()
                                    .replace(/[^a-z0-9]+/g, '-')
                                    .slice(0, 60)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  View Live
                                </a>
                              )}

                              <span className="text-sm text-gray-500 ml-auto">
                                Updated {getAge(draft.updatedAt)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {/* CLI Commands */}
        <div className="mt-8 p-4 md:p-6 bg-gray-900 rounded-xl text-white">
          <h3 className="font-semibold mb-3">CLI Commands</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
            <div>
              <p className="text-gray-400 mb-1"># Generate blog post</p>
              <code className="text-green-400">npm run seo:blog &quot;Topic Title&quot;</code>
            </div>
            <div>
              <p className="text-gray-400 mb-1"># Generate news article</p>
              <code className="text-green-400">npm run seo:news --headline &quot;Title&quot;</code>
            </div>
            <div>
              <p className="text-gray-400 mb-1"># Review all drafts</p>
              <code className="text-green-400">npm run seo:review</code>
            </div>
            <div>
              <p className="text-gray-400 mb-1"># Publish approved drafts</p>
              <code className="text-green-400">npm run seo:publish --all-approved</code>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
