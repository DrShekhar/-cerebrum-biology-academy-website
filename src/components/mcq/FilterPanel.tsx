'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { BIOLOGY_TOPICS, BIOLOGY_CHAPTERS, type BiologyTopic } from '@/lib/mcq/types'
import type { DifficultyLevel } from '@/generated/prisma'

// Question count options
const QUESTION_COUNTS = [10, 20, 30, 50, 100] as const

interface FilterPanelProps {
  selectedTopic: string | null
  selectedChapter: string | null
  selectedDifficulty: DifficultyLevel | null
  questionCount: number
  onTopicChange: (topic: string | null) => void
  onChapterChange: (chapter: string | null) => void
  onDifficultyChange: (difficulty: DifficultyLevel | null) => void
  onQuestionCountChange: (count: number) => void
}

const difficulties: {
  value: DifficultyLevel
  label: string
  color: string
  dotColor: string
  activeColor: string
}[] = [
  {
    value: 'EASY',
    label: 'Easy',
    color: 'border-green-300 hover:border-green-400 hover:bg-green-50',
    dotColor: 'bg-green-500',
    activeColor: 'bg-green-100 border-green-500 text-green-800',
  },
  {
    value: 'MEDIUM',
    label: 'Medium',
    color: 'border-amber-300 hover:border-amber-400 hover:bg-amber-50',
    dotColor: 'bg-amber-500',
    activeColor: 'bg-amber-100 border-amber-500 text-amber-800',
  },
  {
    value: 'HARD',
    label: 'Hard',
    color: 'border-coral-300 hover:border-coral-400 hover:bg-coral-50',
    dotColor: 'bg-coral-500',
    activeColor: 'bg-coral-100 border-coral-500 text-coral-800',
  },
]

export function FilterPanel({
  selectedTopic,
  selectedChapter,
  selectedDifficulty,
  questionCount,
  onTopicChange,
  onChapterChange,
  onDifficultyChange,
  onQuestionCountChange,
}: FilterPanelProps) {
  // Get chapters for selected topic
  const availableChapters = selectedTopic
    ? BIOLOGY_CHAPTERS[selectedTopic as BiologyTopic] || []
    : []

  const activeFiltersCount = [selectedTopic, selectedChapter, selectedDifficulty].filter(
    Boolean
  ).length

  const clearAllFilters = () => {
    onTopicChange(null)
    onChapterChange(null)
    onDifficultyChange(null)
  }

  // Reset chapter when topic changes
  const handleTopicChange = (topic: string | null) => {
    onTopicChange(topic)
    onChapterChange(null)
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200 overflow-hidden paper-texture">
      {/* Header */}
      <div className="px-5 py-4 border-b border-dashed border-stone-200 bg-stone-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg">🔬</span>
            <span className="font-semibold text-ink tracking-tight">Filter Questions</span>
            {activeFiltersCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-sage-100 text-sage-700 text-xs font-medium font-mono">
                {activeFiltersCount} active
              </span>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-stone-600 hover:text-sage-600 font-medium transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Topic Selection */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
              Topic
            </span>
            <div className="h-px flex-1 bg-stone-200 border-dashed" />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleTopicChange(null)}
              className={`
                inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border-2
                transition-all duration-200
                ${
                  !selectedTopic
                    ? 'bg-sage-100 border-sage-500 text-sage-800'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-sage-300 hover:bg-sage-50'
                }
              `}
            >
              {!selectedTopic && <Check className="w-3.5 h-3.5" />}
              All Topics
            </button>
            {BIOLOGY_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicChange(topic)}
                className={`
                  inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border-2
                  transition-all duration-200
                  ${
                    selectedTopic === topic
                      ? 'bg-sage-100 border-sage-500 text-sage-800'
                      : 'bg-white border-stone-200 text-stone-600 hover:border-sage-300 hover:bg-sage-50'
                  }
                `}
              >
                {selectedTopic === topic && <Check className="w-3.5 h-3.5" />}
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
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                  Chapter
                </span>
                <div className="h-px flex-1 bg-stone-200 border-dashed" />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onChapterChange(null)}
                  className={`
                    inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border-2
                    transition-all duration-200
                    ${
                      !selectedChapter
                        ? 'bg-specimen-100 border-specimen-500 text-specimen-800'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-specimen-300 hover:bg-specimen-50'
                    }
                  `}
                >
                  {!selectedChapter && <Check className="w-3.5 h-3.5" />}
                  All Chapters
                </button>
                {availableChapters.map((chapter) => (
                  <button
                    key={chapter}
                    onClick={() => onChapterChange(chapter)}
                    className={`
                      inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border-2
                      transition-all duration-200
                      ${
                        selectedChapter === chapter
                          ? 'bg-specimen-100 border-specimen-500 text-specimen-800'
                          : 'bg-white border-stone-200 text-stone-600 hover:border-specimen-300 hover:bg-specimen-50'
                      }
                    `}
                  >
                    {selectedChapter === chapter && <Check className="w-3.5 h-3.5" />}
                    {chapter}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Difficulty Selection */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
              Difficulty
            </span>
            <div className="h-px flex-1 bg-stone-200 border-dashed" />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onDifficultyChange(null)}
              className={`
                inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border-2
                transition-all duration-200
                ${
                  !selectedDifficulty
                    ? 'bg-sage-100 border-sage-500 text-sage-800'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                }
              `}
            >
              {!selectedDifficulty && <Check className="w-3.5 h-3.5" />}
              <span className="w-2 h-2 rounded-full bg-stone-400" />
              All Levels
            </button>
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                onClick={() => onDifficultyChange(diff.value)}
                className={`
                  inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border-2
                  transition-all duration-200
                  ${
                    selectedDifficulty === diff.value
                      ? diff.activeColor
                      : `bg-white text-stone-600 ${diff.color}`
                  }
                `}
              >
                {selectedDifficulty === diff.value && <Check className="w-3.5 h-3.5" />}
                <span className={`w-2 h-2 rounded-full ${diff.dotColor}`} />
                {diff.label}
              </button>
            ))}
          </div>
        </div>

        {/* Number of Questions Selection */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
              Questions per Session
            </span>
            <div className="h-px flex-1 bg-stone-200 border-dashed" />
          </div>
          <div className="flex flex-wrap gap-2">
            {QUESTION_COUNTS.map((count) => (
              <button
                key={count}
                onClick={() => onQuestionCountChange(count)}
                className={`
                  w-12 h-12 rounded-xl text-sm font-mono font-semibold border-2
                  transition-all duration-200 flex items-center justify-center
                  ${
                    questionCount === count
                      ? 'bg-sage-500 border-sage-500 text-white shadow-md shadow-sage-500/20'
                      : 'bg-white border-stone-200 text-stone-600 hover:border-sage-300 hover:bg-sage-50'
                  }
                `}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
