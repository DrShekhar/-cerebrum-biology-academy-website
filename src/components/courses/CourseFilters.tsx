'use client'

import { useState } from 'react'
import { Filter, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CourseFiltersProps {
  examSystems: string[]
  levels: string[]
  selectedExamSystem: string
  selectedLevel: string
  onExamSystemChange: (value: string) => void
  onLevelChange: (value: string) => void
  onClearFilters: () => void
  totalCourses: number
  filteredCount: number
}

export function CourseFilters({
  examSystems,
  levels,
  selectedExamSystem,
  selectedLevel,
  onExamSystemChange,
  onLevelChange,
  onClearFilters,
  totalCourses,
  filteredCount,
}: CourseFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasActiveFilters = selectedExamSystem !== 'all' || selectedLevel !== 'all'

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
      {/* Mobile toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full md:hidden"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-900">Filters</span>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 text-xs font-medium bg-teal-100 text-teal-700 rounded-full">
              Active
            </span>
          )}
        </div>
        <ChevronDown
          className={cn('w-5 h-5 text-gray-400 transition-transform', isExpanded && 'rotate-180')}
        />
      </button>

      {/* Filter content */}
      <div className={cn('md:block', isExpanded ? 'block mt-4' : 'hidden')}>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Exam System Filter */}
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
              Exam System
            </label>
            <select
              value={selectedExamSystem}
              onChange={(e) => onExamSystemChange(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Exam Systems</option>
              {examSystems.map((exam) => (
                <option key={exam} value={exam}>
                  {exam}
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
              Level
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => onLevelChange(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Results count and clear */}
          <div className="flex items-center justify-between md:justify-end gap-4 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
            <span className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredCount}</span> of{' '}
              {totalCourses} courses
            </span>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
