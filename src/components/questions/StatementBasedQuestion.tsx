'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import type { StatementBasedQuestion } from '@/data/neetQuestionBank'

interface StatementBasedQuestionProps {
  question: StatementBasedQuestion
  selectedAnswer?: string
  onAnswerSelect: (answer: string) => void
  showExplanation?: boolean
  isReviewMode?: boolean
  questionNumber?: number
}

const StatementBasedQuestion: React.FC<StatementBasedQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showExplanation = false,
  isReviewMode = false,
  questionNumber = 1,
}) => {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)
  const [hoveredStatement, setHoveredStatement] = useState<string | null>(null)

  const handleOptionSelect = (option: string) => {
    if (!showExplanation && !isReviewMode) {
      onAnswerSelect(option)
    }
  }

  const getStatementStatus = (statement: { id: string; text: string; isCorrect: boolean }) => {
    if (!showExplanation) return { showStatus: false, isCorrect: false }
    return { showStatus: true, isCorrect: statement.isCorrect }
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Statement Based
          </span>
          <span className="text-gray-500 text-sm">Question {questionNumber}</span>
          <span
            className={cn(
              'px-2 py-1 rounded text-xs font-medium',
              question.evaluationType === 'individual'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-purple-100 text-purple-800'
            )}
          >
            {question.evaluationType === 'individual' ? 'Individual' : 'Combined'}
          </span>
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

      {/* Statements Section */}
      <div className="mb-8 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-800 mb-4 text-center">
          Evaluate the following statements:
        </h3>

        <div className="space-y-4">
          {question.statements.map((statement, index) => {
            const { showStatus, isCorrect } = getStatementStatus(statement)
            const isHovered = hoveredStatement === statement.id

            return (
              <div
                key={statement.id}
                onMouseEnter={() => setHoveredStatement(statement.id)}
                onMouseLeave={() => setHoveredStatement(null)}
                className={cn(
                  'p-4 rounded-lg border-2 transition-all duration-200',
                  showStatus
                    ? isCorrect
                      ? 'border-green-600 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : isHovered
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-green-400 bg-white hover:border-green-500'
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Statement Number */}
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
                      showStatus
                        ? isCorrect
                          ? 'bg-green-600 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-green-600 text-white'
                    )}
                  >
                    {index + 1}
                  </div>

                  {/* Statement Text */}
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed">{statement.text}</p>
                  </div>

                  {/* Status Indicator */}
                  {showStatus && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className={cn(
                          'px-2 py-1 rounded text-xs font-medium',
                          isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        )}
                      >
                        {isCorrect ? 'True' : 'False'}
                      </span>
                      <span
                        className={cn('text-lg', isCorrect ? 'text-green-600' : 'text-red-600')}
                      >
                        {isCorrect ? '✓' : '✗'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Instructions */}
      {!showExplanation && !isReviewMode && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Instructions:</strong> Evaluate each statement and select the correct option
            below.
          </p>
          <p className="text-xs text-gray-500">
            {question.evaluationType === 'individual'
              ? 'Each statement should be evaluated independently.'
              : 'Consider the statements together when selecting your answer.'}
          </p>
        </div>
      )}

      {/* Options */}
      {question.options && (
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-gray-700 mb-3">Select the correct option:</h4>
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
                  'w-full text-left p-4 rounded-lg border-2 transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-green-600 hover:shadow-md',
                  isSelected
                    ? showExplanation
                      ? isCorrect
                        ? 'border-green-600 bg-green-50 text-green-900 shadow-lg'
                        : 'border-red-500 bg-red-50 text-red-900 shadow-lg'
                      : 'border-green-600 bg-green-50 text-green-800 shadow-lg'
                    : showExplanation && isCorrect
                      ? 'border-green-600 bg-green-50 text-green-900 shadow-lg'
                      : isHovered
                        ? 'border-green-400 bg-green-50 shadow-md'
                        : 'border-gray-200 hover:border-green-400 hover:bg-gray-50',
                  (showExplanation || isReviewMode) && 'cursor-not-allowed'
                )}
                aria-label={`Option ${optionLabel}: ${option}`}
                role="radio"
                aria-checked={isSelected}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0',
                      isSelected
                        ? showExplanation
                          ? isCorrect
                            ? 'bg-green-600 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-green-600 text-white'
                        : showExplanation && isCorrect
                          ? 'bg-green-600 text-white'
                          : isHovered
                            ? 'bg-green-200 text-green-800'
                            : 'bg-gray-200 text-gray-700'
                    )}
                  >
                    {optionLabel}
                  </span>
                  <span className="flex-1 leading-relaxed">{option}</span>
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
      )}

      {/* Statement Analysis in Explanation Mode */}
      {showExplanation && (
        <div className="mb-6 p-5 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-3">Statement Analysis:</h4>
          <div className="space-y-3">
            {question.statements.map((statement, index) => (
              <div key={statement.id} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <span className="text-gray-700">{statement.text}</span>
                  <span
                    className={cn(
                      'ml-3 px-2 py-1 rounded text-xs font-medium',
                      statement.isCorrect
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    )}
                  >
                    {statement.isCorrect ? 'TRUE' : 'FALSE'}
                  </span>
                </div>
              </div>
            ))}
          </div>
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

export default StatementBasedQuestion
