'use client'

import { Scale, X } from 'lucide-react'
import type { CollegeResult } from './types'
import { MAX_COMPARE } from './constants'

interface FloatingCompareBarProps {
  compareList: CollegeResult[]
  onCompareClick: () => void
  onClear: () => void
  toggleCompare: (result: CollegeResult) => void
}

export function FloatingCompareBar({
  compareList,
  onCompareClick,
  onClear,
  toggleCompare,
}: FloatingCompareBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-indigo-600" />
            <span className="font-semibold text-indigo-900">
              Compare ({compareList.length}/{MAX_COMPARE})
            </span>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            {compareList.map((r) => (
              <div
                key={`${r.college.name}-${r.quotaType}`}
                className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm"
              >
                <span className="max-w-[150px] truncate font-medium text-gray-700">
                  {r.college.name.split(',')[0]}
                </span>
                <button
                  onClick={() => toggleCompare(r)}
                  className="ml-1 rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            Clear
          </button>
          <button
            onClick={onCompareClick}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Compare Now
          </button>
        </div>
      </div>
    </div>
  )
}
