'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { NumericalQuestion } from '@/data/neetQuestionBank'

interface NumericalQuestionProps {
  question: NumericalQuestion
  selectedAnswer?: number
  onAnswerSelect: (answer: number) => void
  showExplanation?: boolean
  isReviewMode?: boolean
  questionNumber?: number
}

const NumericalQuestion: React.FC<NumericalQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showExplanation = false,
  isReviewMode = false,
  questionNumber = 1
}) => {
  const [inputValue, setInputValue] = useState<string>(selectedAnswer?.toString() || '')
  const [isValid, setIsValid] = useState<boolean>(true)
  const [showSteps, setShowSteps] = useState<boolean>(false)

  // Update input when prop changes
  useEffect(() => {
    setInputValue(selectedAnswer?.toString() || '')
  }, [selectedAnswer])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    // Validate input based on answer type
    if (value === '') {
      setIsValid(true)
      return
    }

    let isValidInput = false
    let numericValue: number

    if (question.answerType === 'integer') {
      const intValue = parseInt(value, 10)
      isValidInput = !isNaN(intValue) && intValue.toString() === value
      numericValue = intValue
    } else {
      const floatValue = parseFloat(value)
      isValidInput = !isNaN(floatValue)
      numericValue = floatValue
    }

    // Check range if specified
    if (isValidInput && question.range) {
      isValidInput = numericValue >= question.range.min && numericValue <= question.range.max
    }

    setIsValid(isValidInput)

    if (isValidInput && !showExplanation && !isReviewMode) {
      onAnswerSelect(numericValue)
    }
  }

  const getAnswerStatus = () => {
    if (!showExplanation || inputValue === '') return null

    const userAnswer = question.answerType === 'integer'
      ? parseInt(inputValue, 10)
      : parseFloat(inputValue)

    if (isNaN(userAnswer)) return null

    const tolerance = question.precision || 0.01
    const isCorrect = Math.abs(userAnswer - question.correctAnswer) <= tolerance

    return { isCorrect, userAnswer }
  }

  const answerStatus = getAnswerStatus()

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            Numerical
          </span>
          <span className="text-gray-500 text-sm">
            Question {questionNumber}
          </span>
          <span className={cn(
            "px-2 py-1 rounded text-xs font-medium",
            question.answerType === 'integer' ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
          )}>
            {question.answerType === 'integer' ? 'Integer' : 'Decimal'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(
            "px-2 py-1 rounded text-xs font-medium",
            question.difficulty === 'easy' ? "bg-green-100 text-green-800" :
            question.difficulty === 'medium' ? "bg-yellow-100 text-yellow-800" :
            "bg-red-100 text-red-800"
          )}>
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

      {/* Answer Input Section */}
      <div className="mb-8 p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200">
        <h3 className="font-semibold text-indigo-900 mb-4 text-center">Enter Your Answer</h3>

        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              disabled={showExplanation || isReviewMode}
              placeholder={question.answerType === 'integer' ? 'Enter integer' : 'Enter decimal'}
              className={cn(
                "w-48 h-12 text-center text-xl font-semibold rounded-lg border-2 transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-indigo-500",
                !isValid && inputValue !== '' && "border-red-500 bg-red-50",
                answerStatus?.isCorrect && "border-green-500 bg-green-50",
                answerStatus && !answerStatus.isCorrect && "border-red-500 bg-red-50",
                !answerStatus && isValid && "border-indigo-300 focus:border-indigo-500",
                (showExplanation || isReviewMode) && "bg-gray-100 cursor-not-allowed"
              )}
              step={question.answerType === 'decimal' ? question.precision || 0.01 : 1}
            />

            {/* Input Status Indicator */}
            {inputValue !== '' && (
              <div className="absolute -right-10 top-1/2 transform -translate-y-1/2">
                {!isValid ? (
                  <span className="text-red-500 text-xl">✗</span>
                ) : answerStatus?.isCorrect ? (
                  <span className="text-green-500 text-xl">✓</span>
                ) : answerStatus && !answerStatus.isCorrect ? (
                  <span className="text-red-500 text-xl">✗</span>
                ) : null}
              </div>
            )}
          </div>

          {question.unit && (
            <span className="text-lg font-medium text-indigo-700">
              {question.unit}
            </span>
          )}
        </div>

        {/* Input Guidelines */}
        <div className="text-center space-y-1">
          <p className="text-sm text-indigo-700">
            {question.answerType === 'integer'
              ? 'Enter a whole number'
              : `Enter a decimal number${question.precision ? ` (precision: ${question.precision})` : ''}`
            }
          </p>
          {question.range && (
            <p className="text-xs text-indigo-600">
              Valid range: {question.range.min} to {question.range.max}
            </p>
          )}
          {!isValid && inputValue !== '' && (
            <p className="text-xs text-red-600">
              Please enter a valid {question.answerType} value
              {question.range ? ` between ${question.range.min} and ${question.range.max}` : ''}
            </p>
          )}
        </div>
      </div>

      {/* Calculation Steps */}
      {question.calculationSteps && question.calculationSteps.length > 0 && (
        <div className="mb-6">
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium mb-3"
          >
            <span>{showSteps ? '▼' : '▶'}</span>
            {showSteps ? 'Hide' : 'Show'} Calculation Steps
          </button>

          {showSteps && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3">Step-by-step Solution:</h4>
              <ol className="space-y-2">
                {question.calculationSteps.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      {!showExplanation && !isReviewMode && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
          <p className="text-sm text-gray-600">
            <strong>Instructions:</strong> Calculate the answer and enter the numerical value.
            {question.answerType === 'integer' ? ' Enter as a whole number.' : ' Use decimal notation if required.'}
          </p>
        </div>
      )}

      {/* Answer Display in Explanation Mode */}
      {showExplanation && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-center gap-3">
            <span className="font-semibold text-green-800">Correct Answer:</span>
            <span className="text-2xl font-bold text-green-900">
              {question.correctAnswer}
              {question.unit && <span className="ml-1">{question.unit}</span>}
            </span>
          </div>
          {answerStatus && (
            <div className="text-center mt-2">
              <span className={cn(
                "text-sm font-medium",
                answerStatus.isCorrect ? "text-green-700" : "text-red-700"
              )}>
                Your answer: {answerStatus.userAnswer}
                {question.unit && <span className="ml-1">{question.unit}</span>}
                {answerStatus.isCorrect ? ' ✓ Correct!' : ' ✗ Incorrect'}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Explanation */}
      {showExplanation && (
        <div className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border-l-4 border-indigo-500">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm">
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
            <div className="mt-3 p-3 bg-indigo-50 rounded border border-indigo-200">
              <p className="text-sm text-indigo-700">
                <strong>💡 Time Management Tip:</strong> {question.timeManagementTip}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default NumericalQuestion