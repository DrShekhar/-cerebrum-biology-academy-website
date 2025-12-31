'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { MultipleCorrectQuestion } from '@/data/neetQuestionBank'

interface MultipleCorrectQuestionProps {
  question: MultipleCorrectQuestion
  selectedAnswer?: string[]
  onAnswerSelect: (answers: string[]) => void
  showExplanation?: boolean
  isReviewMode?: boolean
  questionNumber?: number
}

const MultipleCorrectQuestion: React.FC<MultipleCorrectQuestionProps> = ({
  question,
  selectedAnswer = [],
  onAnswerSelect,
  showExplanation = false,
  isReviewMode = false,
  questionNumber = 1,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selectedAnswer)
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)

  // Update selected options when prop changes
  useEffect(() => {
    setSelectedOptions(selectedAnswer)
  }, [selectedAnswer])

  const handleOptionToggle = (option: string) => {
    if (showExplanation || isReviewMode) return

    const newSelection = selectedOptions.includes(option)
      ? selectedOptions.filter((opt) => opt !== option)
      : [...selectedOptions, option]

    // Check max selections limit
    if (question.maxSelections && newSelection.length > question.maxSelections) {
      return
    }

    setSelectedOptions(newSelection)
    onAnswerSelect(newSelection)
  }

  const getOptionStatus = (option: string) => {
    const isSelected = selectedOptions.includes(option)
    const isCorrect = question.correctAnswers.includes(option)

    if (!showExplanation) {
      return { isSelected, isCorrect: false, showStatus: false }
    }

    return {
      isSelected,
      isCorrect,
      showStatus: true,
    }
  }

  const calculateScore = () => {
    if (!showExplanation) return null

    const correctSelected = selectedOptions.filter((opt) =>
      question.correctAnswers.includes(opt)
    ).length
    const incorrectSelected = selectedOptions.filter(
      (opt) => !question.correctAnswers.includes(opt)
    ).length
    const totalCorrect = question.correctAnswers.length

    if (question.partialMarking) {
      const { fullMarks, partialMarks, negativeMarks } = question.partialMarking

      if (correctSelected === totalCorrect && incorrectSelected === 0) {
        return { score: fullMarks, type: 'full' }
      } else if (correctSelected > 0 && incorrectSelected === 0) {
        return { score: partialMarks, type: 'partial' }
      } else if (incorrectSelected > 0) {
        return { score: negativeMarks, type: 'negative' }
      }
    }

    return {
      score: correctSelected === totalCorrect && incorrectSelected === 0 ? 4 : 0,
      type: 'standard',
    }
  }

  const scoreInfo = calculateScore()

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            Multiple Correct
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
          {question.maxSelections && (
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
              Max: {question.maxSelections}
            </span>
          )}
        </div>
      </div>

      {/* Question Text */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 leading-relaxed mb-4">
          {question.questionText}
        </h2>
      </div>

      {/* Selection Counter */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Selected: {selectedOptions.length}
            {question.maxSelections && ` / ${question.maxSelections}`}
          </span>
          {question.maxSelections && selectedOptions.length >= question.maxSelections && (
            <span className="text-xs text-yellow-600 bg-amber-100 px-2 py-1 rounded">
              Maximum selections reached
            </span>
          )}
        </div>
        {scoreInfo && (
          <div
            className={cn(
              'text-sm font-medium px-3 py-1 rounded',
              scoreInfo.type === 'full'
                ? 'bg-green-100 text-green-800'
                : scoreInfo.type === 'partial'
                  ? 'bg-yellow-100 text-yellow-800'
                  : scoreInfo.type === 'negative'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
            )}
          >
            Score: {scoreInfo.score > 0 ? '+' : ''}
            {scoreInfo.score}
          </div>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const optionLabel = String.fromCharCode(65 + index)
          const { isSelected, isCorrect, showStatus } = getOptionStatus(option)
          const isHovered = hoveredOption === option
          const isDisabled =
            (question.maxSelections &&
              selectedOptions.length >= question.maxSelections &&
              !isSelected) ||
            showExplanation ||
            isReviewMode

          return (
            <div
              key={index}
              onClick={() => handleOptionToggle(option)}
              onMouseEnter={() => setHoveredOption(option)}
              onMouseLeave={() => setHoveredOption(null)}
              className={cn(
                'w-full text-left p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer',
                'hover:shadow-md focus-within:ring-2 focus-within:ring-green-600',
                // Selected state styling
                isSelected
                  ? showStatus
                    ? isCorrect
                      ? 'border-green-600 bg-green-50 text-green-900 shadow-lg'
                      : 'border-red-500 bg-red-50 text-red-900 shadow-lg'
                    : 'border-green-600 bg-green-50 text-green-800 shadow-lg'
                  : // Correct answer highlighting in explanation mode
                    showStatus && isCorrect
                    ? 'border-green-600 bg-green-50 text-green-900 shadow-lg'
                    : // Default and hover states
                      isHovered && !isDisabled
                      ? 'border-green-400 bg-green-50 shadow-md'
                      : isDisabled
                        ? 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                        : 'border-gray-200 hover:border-green-400 hover:bg-gray-50'
              )}
              role="checkbox"
              aria-checked={isSelected}
              aria-disabled={isDisabled}
              tabIndex={isDisabled ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleOptionToggle(option)
                }
              }}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <div
                  className={cn(
                    'w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1',
                    isSelected
                      ? showStatus
                        ? isCorrect
                          ? 'bg-green-600 border-green-600'
                          : 'bg-red-500 border-red-500'
                        : 'bg-green-600 border-green-600'
                      : showStatus && isCorrect
                        ? 'bg-green-600 border-green-600'
                        : 'border-gray-300'
                  )}
                >
                  {(isSelected || (showStatus && isCorrect)) && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                {/* Option Label */}
                <span
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0',
                    isSelected
                      ? showStatus
                        ? isCorrect
                          ? 'bg-green-600 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-green-600 text-white'
                      : showStatus && isCorrect
                        ? 'bg-green-600 text-white'
                        : isHovered && !isDisabled
                          ? 'bg-green-200 text-green-700'
                          : 'bg-gray-200 text-gray-700'
                  )}
                >
                  {optionLabel}
                </span>

                {/* Option Text */}
                <span className="flex-1 leading-relaxed">{option}</span>

                {/* Status Icons */}
                {showStatus && (
                  <div className="flex-shrink-0">
                    {isCorrect && <span className="text-green-600 text-xl">✓</span>}
                    {isSelected && !isCorrect && <span className="text-red-600 text-xl">✗</span>}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Instructions */}
      {!showExplanation && !isReviewMode && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Instructions:</strong> Select all correct options. Multiple answers may be
            correct.
          </p>
          {question.partialMarking && (
            <div className="text-xs text-gray-500 space-y-1">
              <p>
                <strong>Marking Scheme:</strong>
              </p>
              <p>• Full marks: +{question.partialMarking.fullMarks} (all correct, no incorrect)</p>
              <p>
                • Partial marks: +{question.partialMarking.partialMarks} (some correct, no
                incorrect)
              </p>
              <p>
                • Negative marks: {question.partialMarking.negativeMarks} (any incorrect selection)
              </p>
            </div>
          )}
        </div>
      )}

      {/* Explanation */}
      {showExplanation && (
        <div className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border-l-4 border-green-600">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-sm">
              ℹ
            </span>
            Explanation
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">{question.explanation}</p>

          {/* Correct Answers Summary */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Correct Answers:</h4>
            <div className="space-y-1">
              {question.correctAnswers.map((answer, index) => {
                const optionIndex = question.options.findIndex((opt) => opt === answer)
                const optionLabel = String.fromCharCode(65 + optionIndex)
                return (
                  <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {optionLabel}
                    </span>
                    {answer}
                  </div>
                )
              })}
            </div>
          </div>

          {question.ncertReference && (
            <div className="pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>NCERT Reference:</strong> {question.ncertReference}
              </p>
            </div>
          )}

          {question.timeManagementTip && (
            <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
              <p className="text-sm text-green-700">
                <strong>💡 Time Management Tip:</strong> {question.timeManagementTip}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MultipleCorrectQuestion
