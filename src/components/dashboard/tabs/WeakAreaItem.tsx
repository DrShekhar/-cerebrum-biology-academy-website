'use client'

import React from 'react'
import { useLongPress } from '@/hooks/useLongPress'

interface WeakArea {
  chapter: string
  topic: string
  difficulty: 'low' | 'medium' | 'high'
  improvement: number
  recommendedStudyTime: number
}

interface WeakAreaItemProps {
  area: WeakArea
  onSelect: (area: WeakArea) => void
}

export function WeakAreaItem({ area, onSelect }: WeakAreaItemProps) {
  const longPressHandlers = useLongPress({
    onLongPress: () => onSelect(area),
    onClick: () => onSelect(area),
    threshold: 500,
  })

  return (
    <div
      {...longPressHandlers}
      className="p-3 sm:p-4 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors active:bg-orange-200 animate-fadeInUp"
      role="button"
      tabIndex={0}
      aria-label={`View details for ${area.chapter}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(area)
        }
      }}
    >
      <div className="flex items-center justify-between mb-2 gap-2">
        <span className="font-medium text-sm sm:text-base text-gray-900 truncate flex-1">
          {area.chapter}
        </span>
        <span
          className={`text-xs px-2 py-1 rounded flex-shrink-0 ${
            area.difficulty === 'high'
              ? 'bg-red-100 text-red-600'
              : area.difficulty === 'medium'
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-green-100 text-green-600'
          }`}
        >
          {area.difficulty}
        </span>
      </div>
      <div className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{area.topic}</div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="text-xs text-gray-500">
          Recommended: {area.recommendedStudyTime} min/day
        </span>
        <span className="text-blue-600 text-xs sm:text-sm font-medium">Tap for details →</span>
      </div>
    </div>
  )
}

export type { WeakArea }
