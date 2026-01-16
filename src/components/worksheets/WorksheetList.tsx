'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

// ============================================
// TYPES
// ============================================

type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT'
type SubmissionStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'SUBMITTED' | 'GRADED'

interface WorksheetSubmission {
  id: string
  status: SubmissionStatus
  startedAt: string | null
  submittedAt: string | null
  grade: number | null
  feedback: string | null
  gradedAt: string | null
  isLate: boolean
  timeSpent: number | null
}

interface Worksheet {
  id: string
  title: string
  description: string | null
  courseId: string | null
  chapterId: string | null
  topicId: string | null
  instructions: string | null
  maxMarks: number
  duration: number | null
  difficulty: DifficultyLevel
  dueDate: string | null
  allowLateSubmission: boolean
  publishedAt: string | null
  attachments: string[]
  tags: string[]
  downloadCount: number
  submission: WorksheetSubmission | null
  submissionStatus: SubmissionStatus
  isOverdue: boolean
  canSubmit: boolean
}

interface WorksheetStats {
  total: number
  pending: number
  inProgress: number
  submitted: number
  graded: number
  overdue: number
}

interface WorksheetListProps {
  className?: string
  onSelectWorksheet?: (worksheet: Worksheet) => void
}

// ============================================
// CONFIG
// ============================================

const difficultyConfig: Record<DifficultyLevel, { label: string; color: string; bgColor: string }> = {
  EASY: { label: 'Easy', color: 'text-green-700', bgColor: 'bg-green-100' },
  MEDIUM: { label: 'Medium', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  HARD: { label: 'Hard', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  EXPERT: { label: 'Expert', color: 'text-red-700', bgColor: 'bg-red-100' },
}

const statusConfig: Record<SubmissionStatus, { label: string; icon: string; color: string; bgColor: string }> = {
  NOT_STARTED: { label: 'Not Started', icon: '📄', color: 'text-gray-600', bgColor: 'bg-gray-100' },
  IN_PROGRESS: { label: 'In Progress', icon: '✏️', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  SUBMITTED: { label: 'Submitted', icon: '📤', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  GRADED: { label: 'Graded', icon: '✅', color: 'text-green-600', bgColor: 'bg-green-100' },
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function formatDate(dateString: string | null): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
  })
}

function formatDueDate(dateString: string | null): { text: string; isUrgent: boolean } {
  if (!dateString) return { text: 'No deadline', isUrgent: false }

  const date = new Date(dateString)
  const now = new Date()
  const diffMs = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return { text: `Overdue by ${Math.abs(diffDays)} days`, isUrgent: true }
  }
  if (diffDays === 0) {
    return { text: 'Due today!', isUrgent: true }
  }
  if (diffDays === 1) {
    return { text: 'Due tomorrow', isUrgent: true }
  }
  if (diffDays <= 3) {
    return { text: `Due in ${diffDays} days`, isUrgent: true }
  }
  return { text: `Due ${formatDate(dateString)}`, isUrgent: false }
}

function formatDuration(minutes: number | null): string {
  if (!minutes) return 'No time limit'
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

// ============================================
// STATS CARD
// ============================================

interface StatsCardProps {
  stats: WorksheetStats
}

function StatsCard({ stats }: StatsCardProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
      <div className="bg-gray-50 rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-gray-700">{stats.total}</div>
        <div className="text-xs text-gray-500">Total</div>
      </div>
      <div className="bg-blue-50 rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-blue-700">{stats.pending}</div>
        <div className="text-xs text-blue-600">Pending</div>
      </div>
      <div className="bg-yellow-50 rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-yellow-700">{stats.inProgress}</div>
        <div className="text-xs text-yellow-600">In Progress</div>
      </div>
      <div className="bg-purple-50 rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-purple-700">{stats.submitted}</div>
        <div className="text-xs text-purple-600">Submitted</div>
      </div>
      <div className="bg-green-50 rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-green-700">{stats.graded}</div>
        <div className="text-xs text-green-600">Graded</div>
      </div>
      <div className="bg-red-50 rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-red-700">{stats.overdue}</div>
        <div className="text-xs text-red-600">Overdue</div>
      </div>
    </div>
  )
}

// ============================================
// WORKSHEET CARD
// ============================================

interface WorksheetCardProps {
  worksheet: Worksheet
  onClick?: () => void
}

function WorksheetCard({ worksheet, onClick }: WorksheetCardProps) {
  const diffConfig = difficultyConfig[worksheet.difficulty]
  const statConfig = statusConfig[worksheet.submissionStatus]
  const dueInfo = formatDueDate(worksheet.dueDate)

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative rounded-lg border bg-white p-4 transition-all hover:shadow-md cursor-pointer',
        worksheet.isOverdue && 'border-red-200 bg-red-50/30'
      )}
    >
      {/* Status Badge */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span
          className={cn(
            'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
            statConfig.bgColor,
            statConfig.color
          )}
        >
          {statConfig.icon} {statConfig.label}
        </span>
        <span
          className={cn(
            'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
            diffConfig.bgColor,
            diffConfig.color
          )}
        >
          {diffConfig.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-900 mb-1">{worksheet.title}</h3>

      {/* Description */}
      {worksheet.description && (
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{worksheet.description}</p>
      )}

      {/* Tags */}
      {worksheet.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {worksheet.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
          {worksheet.tags.length > 3 && (
            <span className="text-xs text-gray-400">+{worksheet.tags.length - 3}</span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t mt-2">
        <div className="flex items-center gap-3">
          <span>{worksheet.maxMarks} marks</span>
          {worksheet.duration && <span>{formatDuration(worksheet.duration)}</span>}
        </div>
        <span className={cn(dueInfo.isUrgent ? 'text-red-600 font-medium' : '')}>
          {dueInfo.text}
        </span>
      </div>

      {/* Grade if graded */}
      {worksheet.submission?.grade !== null && worksheet.submission?.grade !== undefined && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
          {worksheet.submission.grade}/{worksheet.maxMarks}
        </div>
      )}
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export function WorksheetList({ className, onSelectWorksheet }: WorksheetListProps) {
  const [worksheets, setWorksheets] = useState<Worksheet[]>([])
  const [stats, setStats] = useState<WorksheetStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'submitted' | 'graded'>('all')

  useEffect(() => {
    fetchWorksheets()
  }, [])

  async function fetchWorksheets() {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/student/worksheets')
      const data = await response.json()

      if (data.success) {
        setWorksheets(data.data.worksheets)
        setStats(data.data.stats)
      } else {
        setError(data.error || 'Failed to fetch worksheets')
      }
    } catch (err) {
      console.error('Error fetching worksheets:', err)
      setError('Failed to load worksheets')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredWorksheets = worksheets.filter((w) => {
    if (filter === 'all') return true
    if (filter === 'pending') return w.submissionStatus === 'NOT_STARTED'
    if (filter === 'in_progress') return w.submissionStatus === 'IN_PROGRESS'
    if (filter === 'submitted') return w.submissionStatus === 'SUBMITTED'
    if (filter === 'graded') return w.submissionStatus === 'GRADED'
    return true
  })

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'graded', label: 'Graded' },
  ]

  return (
    <div className={cn('', className)}>
      {/* Stats */}
      {stats && <StatsCard stats={stats} />}

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value as typeof filter)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all',
              filter === option.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
          <button onClick={fetchWorksheets} className="mt-2 text-sm text-blue-600 hover:underline">
            Try again
          </button>
        </div>
      ) : filteredWorksheets.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <span className="text-4xl mb-2 block">📝</span>
          <p className="text-gray-500">No worksheets found</p>
          {filter !== 'all' && (
            <button
              onClick={() => setFilter('all')}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              View all worksheets
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredWorksheets.map((worksheet) => (
            <WorksheetCard
              key={worksheet.id}
              worksheet={worksheet}
              onClick={() => onSelectWorksheet?.(worksheet)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default WorksheetList
