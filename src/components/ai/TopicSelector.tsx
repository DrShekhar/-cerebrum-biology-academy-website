'use client'

import React, { useState } from 'react'
import { getAllUnits } from '@/data/neet-syllabus'
import DifficultyBadge from '@/components/ui/DifficultyBadge'
import WeightageBadge from '@/components/ui/WeightageBadge'
import { Check, BookOpen, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TopicSelectorProps {
  onSelectionChange?: (selectedUnits: string[], selectedChapters: string[]) => void
  initialSelectedUnits?: string[]
  initialSelectedChapters?: string[]
}

const TopicSelector: React.FC<TopicSelectorProps> = ({
  onSelectionChange,
  initialSelectedUnits = [],
  initialSelectedChapters = [],
}) => {
  const [selectedUnits, setSelectedUnits] = useState<Set<string>>(new Set(initialSelectedUnits))
  const [selectedChapters, setSelectedChapters] = useState<Set<string>>(
    new Set(initialSelectedChapters)
  )
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set())
  const [classFilter, setClassFilter] = useState<'all' | 'class11' | 'class12'>('all')

  const allUnits = getAllUnits()
  const filteredUnits = allUnits.filter((unit) => {
    if (classFilter === 'all') return true
    if (classFilter === 'class11') return unit.id.startsWith('unit-11')
    if (classFilter === 'class12') return unit.id.startsWith('unit-12')
    return true
  })

  const toggleUnit = (unitId: string) => {
    const newSelectedUnits = new Set(selectedUnits)
    const newSelectedChapters = new Set(selectedChapters)
    const unit = allUnits.find((u) => u.id === unitId)

    if (newSelectedUnits.has(unitId)) {
      newSelectedUnits.delete(unitId)
      unit?.chapters.forEach((ch) => newSelectedChapters.delete(ch.id))
    } else {
      newSelectedUnits.add(unitId)
      unit?.chapters.forEach((ch) => newSelectedChapters.add(ch.id))
    }

    setSelectedUnits(newSelectedUnits)
    setSelectedChapters(newSelectedChapters)
    onSelectionChange?.(Array.from(newSelectedUnits), Array.from(newSelectedChapters))
  }

  const toggleChapter = (unitId: string, chapterId: string) => {
    const newSelectedChapters = new Set(selectedChapters)
    const newSelectedUnits = new Set(selectedUnits)
    const unit = allUnits.find((u) => u.id === unitId)

    if (newSelectedChapters.has(chapterId)) {
      newSelectedChapters.delete(chapterId)
      const allChaptersDeselected = unit?.chapters.every((ch) => !newSelectedChapters.has(ch.id))
      if (allChaptersDeselected) {
        newSelectedUnits.delete(unitId)
      }
    } else {
      newSelectedChapters.add(chapterId)
      const allChaptersSelected = unit?.chapters.every((ch) => newSelectedChapters.has(ch.id))
      if (allChaptersSelected) {
        newSelectedUnits.add(unitId)
      }
    }

    setSelectedChapters(newSelectedChapters)
    setSelectedUnits(newSelectedUnits)
    onSelectionChange?.(Array.from(newSelectedUnits), Array.from(newSelectedChapters))
  }

  const toggleUnitExpansion = (unitId: string) => {
    const newExpandedUnits = new Set(expandedUnits)
    if (newExpandedUnits.has(unitId)) {
      newExpandedUnits.delete(unitId)
    } else {
      newExpandedUnits.add(unitId)
    }
    setExpandedUnits(newExpandedUnits)
  }

  const getSelectedCount = () => {
    return {
      units: selectedUnits.size,
      chapters: selectedChapters.size,
      totalWeightage: Array.from(selectedUnits).reduce((sum, unitId) => {
        const unit = allUnits.find((u) => u.id === unitId)
        return sum + (unit?.weightage || 0)
      }, 0),
    }
  }

  const counts = getSelectedCount()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-bold text-gray-900">Select NEET Topics</h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 rounded-lg">
              <Check className="w-4 h-4 text-purple-600" />
              <span>{counts.chapters} chapters</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 rounded-lg">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>{counts.totalWeightage} marks</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {(['all', 'class11', 'class12'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setClassFilter(filter)}
            className={cn(
              'px-4 py-2 rounded-lg font-semibold text-sm transition-all',
              classFilter === filter
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {filter === 'all' ? 'All' : filter === 'class11' ? 'Class 11' : 'Class 12'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredUnits.map((unit) => {
          const isUnitSelected = selectedUnits.has(unit.id)
          const isExpanded = expandedUnits.has(unit.id)
          const selectedChapterCount = unit.chapters.filter((ch) =>
            selectedChapters.has(ch.id)
          ).length

          return (
            <div
              key={unit.id}
              className={cn(
                'border-2 rounded-xl overflow-hidden transition-all',
                isUnitSelected
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-purple-300'
              )}
            >
              <div className="p-4 cursor-pointer" onClick={() => toggleUnitExpansion(unit.id)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleUnit(unit.id)
                      }}
                      className={cn(
                        'mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0',
                        isUnitSelected
                          ? 'bg-purple-600 border-purple-600'
                          : 'border-gray-300 hover:border-purple-400'
                      )}
                    >
                      {isUnitSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h4 className="font-bold text-gray-900">{unit.name}</h4>
                        <WeightageBadge weightage={unit.weightage} size="sm" />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{unit.chapters.length} chapters</span>
                        {selectedChapterCount > 0 && (
                          <span className="text-purple-600 font-semibold">
                            ({selectedChapterCount} selected)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleUnitExpansion(unit.id)
                    }}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
{isExpanded && (
                  <div
                    className="border-t border-gray-200 animate-fadeInUp"
                  >
                    <div className="p-4 space-y-3 bg-gray-50">
                      {unit.chapters.map((chapter) => {
                        const isChapterSelected = selectedChapters.has(chapter.id)

                        return (
                          <div
                            key={chapter.id}
                            onClick={() => toggleChapter(unit.id, chapter.id)}
                            className={cn(
                              'p-3 rounded-lg border-2 cursor-pointer transition-all',
                              isChapterSelected
                                ? 'bg-white border-purple-400'
                                : 'bg-white border-gray-200 hover:border-purple-300'
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={cn(
                                  'mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center transition-all flex-shrink-0',
                                  isChapterSelected
                                    ? 'bg-purple-600 border-purple-600'
                                    : 'border-gray-300'
                                )}
                              >
                                {isChapterSelected && <Check className="w-3 h-3 text-white" />}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-2">
                                  <h5 className="font-semibold text-gray-900 text-sm">
                                    {chapter.name}
                                  </h5>
                                  <DifficultyBadge
                                    difficulty={chapter.difficulty}
                                    showIcon={false}
                                  />
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                                  <span className="font-medium">{chapter.ncertPages}</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    Avg {chapter.pyqFrequency} Q/year
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  {chapter.topics.length} topics
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
</div>
          )
        })}
      </div>
    </div>
  )
}

export default TopicSelector
