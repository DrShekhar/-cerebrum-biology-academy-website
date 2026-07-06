'use client'

// Teacher feedback feed (roadmap P2 UI): unified graded-work comments from
// GET /api/student/feedback (assignments + worksheets + test assignments).
// Renders nothing when there is no feedback (or the user isn't a student),
// so it can be safely embedded in Overview and Homework.

import React, { useState, useEffect } from 'react'
import { MessageSquare } from 'lucide-react'

interface FeedbackItem {
  id: string
  source: 'assignment' | 'worksheet' | 'test'
  title: string
  feedback: string
  grade: number | null
  maxMarks: number | null
  at: string
}

const SOURCE_STYLES: Record<FeedbackItem['source'], { label: string; classes: string }> = {
  assignment: { label: 'Assignment', classes: 'bg-blue-100 text-blue-700' },
  worksheet: { label: 'Worksheet', classes: 'bg-purple-100 text-purple-700' },
  test: { label: 'Test', classes: 'bg-green-100 text-green-700' },
}

interface TeacherFeedbackFeedProps {
  maxItems?: number
  className?: string
}

export function TeacherFeedbackFeed({ maxItems, className }: TeacherFeedbackFeedProps) {
  const [items, setItems] = useState<FeedbackItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/student/feedback', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const list = d?.items ?? d?.data?.items
        if (Array.isArray(list)) setItems(list)
      })
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading || items.length === 0) return null

  const visible = maxItems ? items.slice(0, maxItems) : items

  return (
    <div className={`bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg ${className || ''}`}>
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <MessageSquare className="w-5 h-5 text-blue-600" />
        <h3 className="text-base sm:text-lg font-bold text-gray-900">Teacher Feedback</h3>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {visible.map((item) => {
          const source = SOURCE_STYLES[item.source] || SOURCE_STYLES.assignment
          return (
            <div key={`${item.source}-${item.id}`} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${source.classes}`}>
                  {source.label}
                </span>
                <span className="text-sm font-medium text-gray-900 truncate flex-1 min-w-0">
                  {item.title}
                </span>
                {item.grade !== null && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex-shrink-0">
                    {item.grade}
                    {item.maxMarks !== null ? `/${item.maxMarks}` : ''}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap line-clamp-3">
                {item.feedback}
              </p>
              <div className="text-[11px] text-gray-400 mt-1.5">
                {new Date(item.at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
