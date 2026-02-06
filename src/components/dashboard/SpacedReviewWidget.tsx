'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { RotateCcw, CheckCircle, ArrowRight, Loader2 } from 'lucide-react'

interface ReviewStats {
  totalDue: number
  totalScheduled: number
  masteredCount: number
}

interface ReviewQuestion {
  topic: string
}

export function SpacedReviewWidget() {
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [topics, setTopics] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const freeUserId = localStorage.getItem('freeUserId')
    if (!freeUserId) {
      setLoading(false)
      return
    }

    const fetchReviewData = async () => {
      try {
        const res = await fetch(`/api/mcq/review?freeUserId=${freeUserId}&limit=20`)
        if (!res.ok) return
        const json = await res.json()
        if (json.success && json.data) {
          setStats(json.data.stats)
          const uniqueTopics = [
            ...new Set(
              json.data.questions.map((q: ReviewQuestion) => q.topic).filter(Boolean)
            ),
          ] as string[]
          setTopics(uniqueTopics.slice(0, 3))
        }
      } catch {
        // Silently fail — widget is supplementary
      } finally {
        setLoading(false)
      }
    }

    fetchReviewData()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <RotateCcw className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Spaced Review</h3>
        </div>
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
        </div>
      </div>
    )
  }

  const dueCount = stats?.totalDue || 0

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <RotateCcw className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Spaced Review</h3>
        </div>
        {stats && (
          <span className="text-xs text-gray-500">
            {stats.masteredCount} mastered
          </span>
        )}
      </div>

      {dueCount === 0 ? (
        <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg border border-green-200">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-gray-900">All caught up!</p>
            <p className="text-xs text-gray-500">No reviews due right now. Great job!</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 mb-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">{dueCount}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {dueCount} question{dueCount !== 1 ? 's' : ''} due for review
              </p>
              {dueCount >= 10 && (
                <p className="text-xs text-purple-600 font-medium">Review soon to retain memory!</p>
              )}
            </div>
          </div>

          {topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          <Link
            href="/neet-biology-mcq?mode=review"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors min-h-[44px]"
          >
            Start Review
            <ArrowRight className="w-4 h-4" />
          </Link>
        </>
      )}
    </div>
  )
}
