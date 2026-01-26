'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import {
  NEETQuestion,
  AssertionReasonQuestion,
  MatchFollowingQuestion,
  DiagramBasedQuestion,
  MultipleCorrectQuestion,
  NumericalQuestion,
  StatementBasedQuestion,
} from '@/data/neetQuestionBank'

// Import the new question components
import AssertionReasonQuestionComponent from '@/components/questions/AssertionReasonQuestion'
import MatchTheFollowingQuestionComponent from '@/components/questions/MatchTheFollowingQuestion'
import DiagramBasedQuestionComponent from '@/components/questions/DiagramBasedQuestion'
import MultipleCorrectQuestionComponent from '@/components/questions/MultipleCorrectQuestion'
import NumericalQuestionComponent from '@/components/questions/NumericalQuestion'
import StatementBasedQuestionComponent from '@/components/questions/StatementBasedQuestion'

interface AdvancedQuestionRendererProps {
  question:
    | NEETQuestion
    | AssertionReasonQuestion
    | MatchFollowingQuestion
    | DiagramBasedQuestion
    | MultipleCorrectQuestion
    | NumericalQuestion
    | StatementBasedQuestion
  selectedAnswer?: string | string[] | number
  onAnswerSelect: (answer: string | string[] | number) => void
  showExplanation?: boolean
  isReviewMode?: boolean
  questionNumber?: number
}

const AdvancedQuestionRenderer: React.FC<AdvancedQuestionRendererProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showExplanation = false,
  isReviewMode = false,
  questionNumber = 1,
}) => {
  // Use the appropriate component based on question type
  const renderQuestionByType = () => {
    const commonProps = {
      question,
      selectedAnswer,
      onAnswerSelect,
      showExplanation,
      isReviewMode,
      questionNumber,
    }

    switch (question.questionType) {
      case 'assertion-reason':
        return (
          <AssertionReasonQuestionComponent
            {...commonProps}
            question={question as AssertionReasonQuestion}
            selectedAnswer={selectedAnswer as string}
            onAnswerSelect={onAnswerSelect as (answer: string) => void}
          />
        )
      case 'match-following':
        return (
          <MatchTheFollowingQuestionComponent
            {...commonProps}
            question={question as MatchFollowingQuestion}
            selectedAnswer={selectedAnswer as string}
            onAnswerSelect={onAnswerSelect as (answer: string) => void}
          />
        )
      case 'diagram-based':
        return (
          <DiagramBasedQuestionComponent
            {...commonProps}
            question={question as DiagramBasedQuestion}
            selectedAnswer={selectedAnswer as string}
            onAnswerSelect={onAnswerSelect as (answer: string) => void}
          />
        )
      case 'multiple-correct':
        return (
          <MultipleCorrectQuestionComponent
            {...commonProps}
            question={question as MultipleCorrectQuestion}
            selectedAnswer={selectedAnswer as string[]}
            onAnswerSelect={onAnswerSelect as (answers: string[]) => void}
          />
        )
      case 'numerical':
        return (
          <NumericalQuestionComponent
            {...commonProps}
            question={question as NumericalQuestion}
            selectedAnswer={selectedAnswer as number}
            onAnswerSelect={onAnswerSelect as (answer: number) => void}
          />
        )
      case 'statement-based':
        return (
          <StatementBasedQuestionComponent
            {...commonProps}
            question={question as StatementBasedQuestion}
            selectedAnswer={selectedAnswer as string}
            onAnswerSelect={onAnswerSelect as (answer: string) => void}
          />
        )
      default:
        // Fallback for single-correct questions using inline rendering
        return (
          <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Question Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Single Correct
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

            {/* Options */}
            <div className="space-y-3 mb-6">
              {question.options?.map((option, index) => {
                const optionLabel = String.fromCharCode(65 + index)
                const isSelected = selectedAnswer === option
                const isCorrect = option === question.correctAnswer

                return (
                  <button
                    key={index}
                    onClick={() => onAnswerSelect(option)}
                    disabled={showExplanation || isReviewMode}
                    className={cn(
                      'w-full text-left p-4 rounded-lg border-2 transition-all duration-200',
                      isSelected
                        ? showExplanation
                          ? isCorrect
                            ? 'border-green-600 bg-green-50 text-green-900'
                            : 'border-red-500 bg-red-50 text-red-900'
                          : 'border-blue-500 bg-blue-50 text-blue-900'
                        : showExplanation && isCorrect
                          ? 'border-green-600 bg-green-50 text-green-900'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                          isSelected
                            ? showExplanation
                              ? isCorrect
                                ? 'bg-green-600 text-white'
                                : 'bg-red-500 text-white'
                              : 'bg-blue-500 text-white'
                            : showExplanation && isCorrect
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-200 text-gray-700'
                        )}
                      >
                        {optionLabel}
                      </span>
                      <span className="flex-1">{option}</span>
                      {showExplanation && isCorrect && <span className="text-green-600">✓</span>}
                      {showExplanation && isSelected && !isCorrect && (
                        <span className="text-red-600">✗</span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

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
  }

  return renderQuestionByType()
}

export default AdvancedQuestionRenderer
