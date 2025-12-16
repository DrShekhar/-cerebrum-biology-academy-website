'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BIOLOGY_TOPICS,
  BIOLOGY_CHAPTERS,
  PYQ_YEARS,
  type BiologyTopic,
  type PYQYear,
} from '@/lib/mcq/types'
import type { DifficultyLevel } from '@/generated/prisma'

// Question count options
const QUESTION_COUNTS = [10, 20, 30, 50, 100] as const

interface TopicFilterProps {
  selectedTopic: string | null
  selectedChapter: string | null
  selectedDifficulty: DifficultyLevel | null
  isPYQOnly: boolean
  selectedPYQYear: number | null
  questionCount: number
  onTopicChange: (topic: string | null) => void
  onChapterChange: (chapter: string | null) => void
  onDifficultyChange: (difficulty: DifficultyLevel | null) => void
  onPYQOnlyChange: (isPYQOnly: boolean) => void
  onPYQYearChange: (year: number | null) => void
  onQuestionCountChange: (count: number) => void
  onApplyFilters: () => void
}

export function TopicFilter({
  selectedTopic,
  selectedChapter,
  selectedDifficulty,
  isPYQOnly,
  selectedPYQYear,
  questionCount,
  onTopicChange,
  onChapterChange,
  onDifficultyChange,
  onPYQOnlyChange,
  onPYQYearChange,
  onQuestionCountChange,
  onApplyFilters,
}: TopicFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const difficulties: { value: DifficultyLevel; label: string; color: string }[] = [
    { value: 'EASY', label: 'Easy', color: 'bg-green-100 text-green-700 border-green-300' },
    { value: 'MEDIUM', label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    { value: 'HARD', label: 'Hard', color: 'bg-red-100 text-red-700 border-red-300' },
  ]

  // Get chapters for selected topic
  const availableChapters = selectedTopic
    ? BIOLOGY_CHAPTERS[selectedTopic as BiologyTopic] || []
    : []

  const activeFiltersCount = [
    selectedTopic,
    selectedChapter,
    selectedDifficulty,
    isPYQOnly,
    selectedPYQYear,
  ].filter(Boolean).length

  const clearAllFilters = () => {
    onTopicChange(null)
    onChapterChange(null)
    onDifficultyChange(null)
    onPYQOnlyChange(false)
    onPYQYearChange(null)
  }

  // Reset chapter when topic changes
  const handleTopicChange = (topic: string | null) => {
    onTopicChange(topic)
    onChapterChange(null) // Reset chapter when topic changes
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">🔍</span>
          <span className="font-semibold text-gray-800">Filter Questions</span>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t"
          >
            <div className="p-4 space-y-6">
              {/* Topic Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleTopicChange(null)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      !selectedTopic
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All Topics
                  </button>
                  {BIOLOGY_TOPICS.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => handleTopicChange(topic)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedTopic === topic
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chapter Selection (only shown when topic is selected) */}
              <AnimatePresence>
                {selectedTopic && availableChapters.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chapter</label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => onChapterChange(null)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          !selectedChapter
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        }`}
                      >
                        All Chapters
                      </button>
                      {availableChapters.map((chapter) => (
                        <button
                          key={chapter}
                          onClick={() => onChapterChange(chapter)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            selectedChapter === chapter
                              ? 'bg-purple-600 text-white'
                              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                          }`}
                        >
                          {chapter}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Difficulty Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onDifficultyChange(null)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                      !selectedDifficulty
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    All Levels
                  </button>
                  {difficulties.map((diff) => (
                    <button
                      key={diff.value}
                      onClick={() => onDifficultyChange(diff.value)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                        selectedDifficulty === diff.value
                          ? diff.color
                          : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* PYQ Toggle */}
              <div>
                <div className="flex items-center justify-between">
                  <label id="pyq-toggle-label" className="text-sm font-medium text-gray-700">
                    Previous Year Questions Only
                  </label>
                  <button
                    onClick={() => onPYQOnlyChange(!isPYQOnly)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onPYQOnlyChange(!isPYQOnly)
                      }
                    }}
                    role="switch"
                    aria-checked={isPYQOnly}
                    aria-labelledby="pyq-toggle-label"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                      isPYQOnly ? 'bg-amber-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isPYQOnly ? 'translate-x-6' : 'translate-x-1'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {/* PYQ Year Selection */}
                <AnimatePresence>
                  {isPYQOnly && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-3"
                    >
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Select Year
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => onPYQYearChange(null)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            !selectedPYQYear
                              ? 'bg-amber-500 text-white'
                              : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                          }`}
                        >
                          All Years
                        </button>
                        {PYQ_YEARS.map((year) => (
                          <button
                            key={year}
                            onClick={() => onPYQYearChange(year)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                              selectedPYQYear === year
                                ? 'bg-amber-500 text-white'
                                : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                            }`}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Number of Questions Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Questions per Session
                </label>
                <div className="flex flex-wrap gap-2">
                  {QUESTION_COUNTS.map((count) => (
                    <button
                      key={count}
                      onClick={() => onQuestionCountChange(count)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        questionCount === count
                          ? 'bg-indigo-600 text-white'
                          : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Select how many questions you want to practice in this session
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2 border-t">
                <button
                  onClick={() => {
                    onApplyFilters()
                    setIsExpanded(false)
                  }}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="py-2 px-4 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Summary (when collapsed) */}
      {!isExpanded && activeFiltersCount > 0 && (
        <div className="px-4 pb-4 flex flex-wrap gap-2">
          {selectedTopic && (
            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
              {selectedTopic}
            </span>
          )}
          {selectedChapter && (
            <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
              {selectedChapter}
            </span>
          )}
          {selectedDifficulty && (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                selectedDifficulty === 'EASY'
                  ? 'bg-green-100 text-green-700'
                  : selectedDifficulty === 'HARD'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {selectedDifficulty}
            </span>
          )}
          {isPYQOnly && (
            <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
              PYQ {selectedPYQYear || 'All Years'}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
