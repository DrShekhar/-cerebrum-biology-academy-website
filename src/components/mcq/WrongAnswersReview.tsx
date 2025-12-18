'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, X, CheckCircle, XCircle, BookOpen } from 'lucide-react'
import type { MCQQuestion } from '@/lib/mcq/types'

export interface WrongAnswer {
  question: MCQQuestion
  selectedAnswer: 'A' | 'B' | 'C' | 'D'
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation?: string
  timeSpent: number
}

interface WrongAnswersReviewProps {
  wrongAnswers: WrongAnswer[]
  onClose: () => void
}

export function WrongAnswersReview({ wrongAnswers, onClose }: WrongAnswersReviewProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const [reviewedIndices, setReviewedIndices] = useState<Set<number>>(new Set())

  const optionLabels = ['A', 'B', 'C', 'D'] as const

  const markAsReviewed = (index: number) => {
    setReviewedIndices((prev) => new Set([...prev, index]))
    // Auto-expand next unreviewed question
    const nextUnreviewed = wrongAnswers.findIndex((_, i) => i > index && !reviewedIndices.has(i))
    if (nextUnreviewed !== -1) {
      setExpandedIndex(nextUnreviewed)
    } else {
      setExpandedIndex(null)
    }
  }

  const reviewProgress = Math.round((reviewedIndices.size / wrongAnswers.length) * 100)

  if (wrongAnswers.length === 0) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Review Wrong Answers</h2>
            <p className="text-sm text-gray-500">
              {wrongAnswers.length} question{wrongAnswers.length > 1 ? 's' : ''} to review
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-2 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Review Progress</span>
            <span>
              {reviewedIndices.size}/{wrongAnswers.length} reviewed
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${reviewProgress}%` }}
            />
          </div>
        </div>

        {/* Questions List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wrongAnswers.map((item, index) => {
            const isExpanded = expandedIndex === index
            const isReviewed = reviewedIndices.has(index)

            return (
              <div
                key={`${item.question.id}-${index}`}
                className={`border rounded-xl overflow-hidden transition-all ${
                  isReviewed
                    ? 'border-green-200 bg-green-50/50'
                    : isExpanded
                      ? 'border-blue-300 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Question Header */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full flex items-center justify-between p-3 text-left"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isReviewed ? 'bg-green-500 text-white' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {isReviewed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                    </span>
                    <span className="text-sm text-gray-700 truncate">
                      {item.question.question.slice(0, 60)}
                      {item.question.question.length > 60 ? '...' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        item.question.difficulty === 'EASY'
                          ? 'bg-green-100 text-green-700'
                          : item.question.difficulty === 'HARD'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {item.question.difficulty}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
                    {/* Full Question */}
                    <div className="pt-3">
                      <p className="text-gray-800 font-medium">{item.question.question}</p>
                    </div>

                    {/* NCERT Reference */}
                    {item.question.isNcertBased && (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg w-fit">
                        <BookOpen className="w-3 h-3" />
                        <span>
                          Class {item.question.ncertClass} | Ch.{item.question.ncertChapter}
                          {item.question.ncertPage && ` | Pg.${item.question.ncertPage}`}
                        </span>
                      </div>
                    )}

                    {/* Options */}
                    <div className="space-y-2">
                      {item.question.options.map((option, optIndex) => {
                        const optionLetter = optionLabels[optIndex]
                        const isCorrect = optionLetter === item.correctAnswer
                        const isSelected = optionLetter === item.selectedAnswer
                        const isWrong = isSelected && !isCorrect

                        return (
                          <div
                            key={optIndex}
                            className={`flex items-center gap-2 p-2 rounded-lg ${
                              isCorrect
                                ? 'bg-green-100 border border-green-300'
                                : isWrong
                                  ? 'bg-red-100 border border-red-300'
                                  : 'bg-gray-50'
                            }`}
                          >
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                isCorrect
                                  ? 'bg-green-500 text-white'
                                  : isWrong
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              {optionLetter}
                            </span>
                            <span
                              className={`flex-1 text-sm ${
                                isCorrect
                                  ? 'text-green-800 font-medium'
                                  : isWrong
                                    ? 'text-red-800'
                                    : 'text-gray-600'
                              }`}
                            >
                              {option}
                            </span>
                            {isCorrect && (
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            )}
                            {isWrong && <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />}
                          </div>
                        )
                      })}
                    </div>

                    {/* Your Answer vs Correct */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="text-gray-500">Your answer:</span>
                        <span className="font-bold text-red-600">{item.selectedAnswer}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-500">Correct:</span>
                        <span className="font-bold text-green-600">{item.correctAnswer}</span>
                      </div>
                    </div>

                    {/* Explanation */}
                    {item.explanation && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs font-medium text-blue-600 mb-1">Explanation:</p>
                        <p className="text-sm text-blue-800">{item.explanation}</p>
                      </div>
                    )}

                    {/* Mark as Reviewed Button */}
                    {!isReviewed && (
                      <button
                        onClick={() => markAsReviewed(index)}
                        className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Got it! Mark as Reviewed
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {reviewedIndices.size === wrongAnswers.length
                ? 'Great job! You reviewed all wrong answers.'
                : `${wrongAnswers.length - reviewedIndices.size} left to review`}
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium text-sm"
            >
              {reviewedIndices.size === wrongAnswers.length ? 'Done' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
