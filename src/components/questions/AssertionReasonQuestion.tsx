'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import type { AssertionReasonQuestion } from '@/data/neetQuestionBank'

interface AssertionReasonQuestionProps {
  question: AssertionReasonQuestion
  selectedAnswer?: string
  onAnswerSelect: (answer: string) => void
  showExplanation?: boolean
  isReviewMode?: boolean
  questionNumber?: number
}

const AssertionReasonQuestion: React.FC<AssertionReasonQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showExplanation = false,
  isReviewMode = false,
  questionNumber = 1,
}) => {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)

  const handleOptionSelect = (option: string) => {
    if (!showExplanation && !isReviewMode) {
      onAnswerSelect(option)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            Assertion-Reason
          </span>
          <span className="text-gray-500 text-sm">Question {questionNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'px-2 py-1 rounded text-xs font-medium',
              question.difficulty === 'easy'
                ? 'bg-green-100 text-green-800'
                : question.difficulty === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
            )}
          >
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
            {question.estimatedTimeSeconds}s
          </span>
        </div>
      </div>

      {/* Question Text */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 leading-relaxed mb-4">
          {question.questionText}
        </h2>
      </div>

      {/* Assertion Section */}
      <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-500">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Assertion (A):</h3>
            <p className="text-blue-800 leading-relaxed">{question.assertion}</p>
          </div>
        </div>
      </div>

      {/* Reason Section */}
      <div className="mb-8 p-5 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border-l-4 border-purple-500">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            R
          </div>
          <div>
            <h3 className="font-semibold text-purple-900 mb-2">Reason (R):</h3>
            <p className="text-purple-800 leading-relaxed">{question.reason}</p>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const optionLabel = String.fromCharCode(65 + index)
          const isSelected = selectedAnswer === option
          const isCorrect = option === question.correctAnswer
          const isHovered = hoveredOption === option

          return (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              onMouseEnter={() => setHoveredOption(option)}
              onMouseLeave={() => setHoveredOption(null)}
              disabled={showExplanation || isReviewMode}
              className={cn(
                'w-full text-left p-4 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500',
                // Base styles
                'hover:shadow-md',
                // Selected state
                isSelected
                  ? showExplanation
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 text-green-900 shadow-lg'
                      : 'border-red-500 bg-red-50 text-red-900 shadow-lg'
                    : 'border-purple-500 bg-purple-50 text-purple-900 shadow-lg'
                  : // Correct answer highlighting in explanation mode
                    showExplanation && isCorrect
                    ? 'border-green-500 bg-green-50 text-green-900 shadow-lg'
                    : // Default state
                      isHovered
                      ? 'border-purple-300 bg-purple-25 shadow-md'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50',
                // Disabled state
                (showExplanation || isReviewMode) && 'cursor-not-allowed'
              )}
              aria-label={`Option ${optionLabel}: ${option}`}
              role="radio"
              aria-checked={isSelected}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1',
                    isSelected
                      ? showExplanation
                        ? isCorrect
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-purple-500 text-white'
                      : showExplanation && isCorrect
                        ? 'bg-green-500 text-white'
                        : isHovered
                          ? 'bg-purple-200 text-purple-800'
                          : 'bg-gray-200 text-gray-700'
                  )}
                >
                  {optionLabel}
                </span>
                <span className="flex-1 leading-relaxed text-base">{option}</span>
                {showExplanation && (
                  <div className="flex-shrink-0">
                    {isCorrect && <span className="text-green-600 text-xl">✓</span>}
                    {isSelected && !isCorrect && <span className="text-red-600 text-xl">✗</span>}
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Instructions */}
      {!showExplanation && !isReviewMode && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
          <p className="text-sm text-gray-600">
            <strong>Instructions:</strong> Choose the correct relationship between the assertion and
            reason statements above.
          </p>
        </div>
      )}

      {/* Explanation */}
      {showExplanation && (
        <div className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
              ℹ
            </span>
            Explanation
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">{question.explanation}</p>

          {question.ncertReference && (
            <div className="pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>NCERT Reference:</strong> {question.ncertReference}
              </p>
            </div>
          )}

          {question.timeManagementTip && (
            <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
              <p className="text-sm text-blue-700">
                <strong>💡 Time Management Tip:</strong> {question.timeManagementTip}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AssertionReasonQuestion
