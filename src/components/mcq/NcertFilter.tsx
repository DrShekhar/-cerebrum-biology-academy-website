'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NcertChapter {
  ncertClass: number
  ncertChapter: number
  ncertChapterName: string
  questionCount: number
}

interface NcertFilterProps {
  isNcertOnly: boolean
  selectedClass: number | null
  selectedChapter: number | null
  selectedWeightage: string | null
  hasDiagramOnly: boolean
  diagramCount?: number
  onNcertOnlyChange: (isNcertOnly: boolean) => void
  onClassChange: (ncertClass: number | null) => void
  onChapterChange: (ncertChapter: number | null) => void
  onWeightageChange: (weightage: string | null) => void
  onDiagramOnlyChange: (hasDiagramOnly: boolean) => void
}

export function NcertFilter({
  isNcertOnly,
  selectedClass,
  selectedChapter,
  selectedWeightage,
  hasDiagramOnly,
  diagramCount = 248,
  onNcertOnlyChange,
  onClassChange,
  onChapterChange,
  onWeightageChange,
  onDiagramOnlyChange,
}: NcertFilterProps) {
  const [chapters, setChapters] = useState<{
    class11: NcertChapter[]
    class12: NcertChapter[]
  }>({ class11: [], class12: [] })
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<{
    totalNcertQuestions: number
    class11Questions: number
    class12Questions: number
  } | null>(null)

  // Fetch NCERT chapters on mount
  useEffect(() => {
    async function fetchChapters() {
      setLoading(true)
      try {
        const res = await fetch('/api/mcq/ncert-chapters')
        const data = await res.json()
        if (data.success) {
          setChapters(data.data.chapters)
          setStats(data.data.statistics)
        }
      } catch (error) {
        console.error('Failed to fetch NCERT chapters:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchChapters()
  }, [])

  const availableChapters = selectedClass === 11 ? chapters.class11 : chapters.class12

  const weightages = [
    { value: 'HIGH', label: 'High', color: 'bg-red-100 text-red-700 border-red-300' },
    { value: 'MEDIUM', label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    { value: 'LOW', label: 'Low', color: 'bg-green-100 text-green-700 border-green-300' },
  ]

  // Reset chapter when class changes
  const handleClassChange = (ncertClass: number | null) => {
    onClassChange(ncertClass)
    onChapterChange(null)
  }

  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">📚</span>
          <span className="font-semibold text-gray-800">NCERT Practice Mode</span>
          {stats && (
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
              {stats.totalNcertQuestions} questions
            </span>
          )}
        </div>
        <button
          onClick={() => onNcertOnlyChange(!isNcertOnly)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onNcertOnlyChange(!isNcertOnly)
            }
          }}
          role="switch"
          aria-checked={isNcertOnly}
          aria-label="Toggle NCERT-only questions"
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isNcertOnly ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isNcertOnly ? 'translate-x-6' : 'translate-x-1'
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      <AnimatePresence>
        {isNcertOnly && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Class Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleClassChange(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !selectedClass
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 border border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Both Classes
                </button>
                <button
                  onClick={() => handleClassChange(11)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedClass === 11
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 border border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Class 11
                  {stats && (
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded ${selectedClass === 11 ? 'bg-blue-500' : 'bg-gray-100'}`}
                    >
                      {stats.class11Questions}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleClassChange(12)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedClass === 12
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 border border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Class 12
                  {stats && (
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded ${selectedClass === 12 ? 'bg-blue-500' : 'bg-gray-100'}`}
                    >
                      {stats.class12Questions}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Chapter Selection */}
            <AnimatePresence>
              {selectedClass && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Chapter
                  </label>
                  {loading ? (
                    <div className="flex items-center gap-2 text-gray-500">
                      <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                      <span className="text-sm">Loading chapters...</span>
                    </div>
                  ) : availableChapters.length > 0 ? (
                    <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                      <button
                        onClick={() => onChapterChange(null)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          !selectedChapter
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-50'
                        }`}
                      >
                        All Chapters
                      </button>
                      {availableChapters.map((ch) => (
                        <button
                          key={ch.ncertChapter}
                          onClick={() => onChapterChange(ch.ncertChapter)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                            selectedChapter === ch.ncertChapter
                              ? 'bg-purple-600 text-white'
                              : 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-50'
                          }`}
                          title={ch.ncertChapterName}
                        >
                          Ch {ch.ncertChapter}
                          <span
                            className={`text-xs px-1 rounded ${selectedChapter === ch.ncertChapter ? 'bg-purple-500' : 'bg-purple-100'}`}
                          >
                            {ch.questionCount}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No NCERT questions available for Class {selectedClass} yet.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* NEET Weightage Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">NEET Weightage</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onWeightageChange(null)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    !selectedWeightage
                      ? 'bg-gray-700 text-white border-gray-700'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  All Weightages
                </button>
                {weightages.map((w) => (
                  <button
                    key={w.value}
                    onClick={() => onWeightageChange(w.value)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                      selectedWeightage === w.value
                        ? w.color
                        : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {w.label} Priority
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Filter by how frequently this topic appears in NEET exams
              </p>
            </div>

            {/* Diagram Filter */}
            <div className="flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-200">
              <div className="flex items-center gap-2">
                <span className="text-xl">🖼️</span>
                <div>
                  <span className="font-medium text-gray-800">Diagram-Based Questions</span>
                  <p className="text-xs text-gray-500">Practice with visual diagrams</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                  {diagramCount} questions
                </span>
              </div>
              <button
                onClick={() => onDiagramOnlyChange(!hasDiagramOnly)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onDiagramOnlyChange(!hasDiagramOnly)
                  }
                }}
                role="switch"
                aria-checked={hasDiagramOnly}
                aria-label="Toggle diagram-only questions"
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                  hasDiagramOnly ? 'bg-amber-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    hasDiagramOnly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-white/50 rounded-lg p-3 border border-blue-100">
              <p className="text-xs text-gray-600">
                <span className="font-medium text-blue-700">💡 NCERT Mode:</span> Questions are
                directly mapped to NCERT textbook chapters. Perfect for building strong fundamentals
                and covering the syllabus systematically.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
