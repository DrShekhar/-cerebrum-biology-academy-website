'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  BookOpen,
  FileQuestion,
  Timer,
  ArrowUpDown,
  Star,
} from 'lucide-react'

interface WeakArea {
  chapter: string
  topic: string
  difficulty: 'low' | 'medium' | 'high'
  improvement: number
  recommendedStudyTime: number
}

type SortOption = 'difficulty' | 'frequency' | 'time'

interface WeakAreasTabProps {
  weakAreas: WeakArea[]
  onStartStudy: (chapter: string) => void
}

function toSlug(chapter: string): string {
  return chapter
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const difficultyOrder: Record<string, number> = { high: 3, medium: 2, low: 1 }

export function WeakAreasTab({ weakAreas, onStartStudy }: WeakAreasTabProps) {
  const [sortBy, setSortBy] = useState<SortOption>('difficulty')

  const sortedAreas = useMemo(() => {
    const areas = [...weakAreas]
    switch (sortBy) {
      case 'difficulty':
        return areas.sort(
          (a, b) => (difficultyOrder[b.difficulty] || 0) - (difficultyOrder[a.difficulty] || 0)
        )
      case 'frequency':
        return areas.sort((a, b) => Math.abs(b.improvement) - Math.abs(a.improvement))
      case 'time':
        return areas.sort((a, b) => b.recommendedStudyTime - a.recommendedStudyTime)
      default:
        return areas
    }
  }, [weakAreas, sortBy])

  if (weakAreas.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-yellow-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">No Weak Areas Detected</h3>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
          Great job! Keep taking tests to identify areas that need improvement. The more tests you
          complete, the better we can track your progress.
        </p>
        <Link
          href="/neet-biology-mcq"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm min-h-[48px]"
        >
          <FileQuestion className="w-4 h-4" />
          Take a Practice Test
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with sort */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            {weakAreas.length} Weak Area{weakAreas.length !== 1 ? 's' : ''} Found
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-xs sm:text-sm bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[36px]"
          >
            <option value="difficulty">By Difficulty</option>
            <option value="frequency">By Frequency</option>
            <option value="time">By Study Time</option>
          </select>
        </div>
      </div>

      {/* Weak Area Cards */}
      <div className="space-y-3">
        {sortedAreas.map((area, index) => {
          const slug = toSlug(area.chapter)
          return (
            <div
              key={`${area.chapter}-${index}`}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                    {area.chapter}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500">{area.topic}</p>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${
                    area.difficulty === 'high'
                      ? 'bg-red-100 text-red-700'
                      : area.difficulty === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                  }`}
                >
                  {area.difficulty === 'high'
                    ? 'Hard'
                    : area.difficulty === 'medium'
                      ? 'Medium'
                      : 'Easy'}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                <Timer className="w-3.5 h-3.5" />
                <span>Recommended: {area.recommendedStudyTime} min/day</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/neet-biology-mcq/${slug}`}
                  className="flex items-center gap-1.5 bg-gradient-to-br from-blue-50 to-purple-50 text-blue-700 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium hover:from-blue-100 hover:to-purple-100 transition-colors min-h-[40px] border border-blue-200"
                >
                  <FileQuestion className="w-3.5 h-3.5" />
                  Practice MCQs
                </Link>
                <Link
                  href={`/biology-notes/${slug}`}
                  className="flex items-center gap-1.5 bg-gradient-to-br from-green-50 to-teal-50 text-teal-700 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium hover:from-green-100 hover:to-teal-100 transition-colors min-h-[40px] border border-teal-200"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Read Notes
                </Link>
                <button
                  onClick={() => onStartStudy(area.chapter)}
                  className="flex items-center gap-1.5 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium hover:from-purple-100 hover:to-pink-100 transition-colors min-h-[40px] border border-purple-200"
                >
                  <Timer className="w-3.5 h-3.5" />
                  Start Timer
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
