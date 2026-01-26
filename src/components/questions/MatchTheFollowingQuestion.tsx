'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { MatchFollowingQuestion } from '@/data/neetQuestionBank'

interface MatchTheFollowingQuestionProps {
  question: MatchFollowingQuestion
  selectedAnswer?: string
  onAnswerSelect: (answer: string) => void
  showExplanation?: boolean
  isReviewMode?: boolean
  questionNumber?: number
}

interface DragDropState {
  dragging: string | null
  dragOver: string | null
  matches: { [key: string]: string }
}

const MatchTheFollowingQuestion: React.FC<MatchTheFollowingQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showExplanation = false,
  isReviewMode = false,
  questionNumber = 1,
}) => {
  const [dragDropState, setDragDropState] = useState<DragDropState>({
    dragging: null,
    dragOver: null,
    matches: {},
  })

  const [selectedOption, setSelectedOption] = useState<string>(selectedAnswer || '')

  // Generate answer string from matches
  const generateAnswerFromMatches = (matches: { [key: string]: string }) => {
    const sortedMatches = Object.entries(matches)
      .sort(([a], [b]) => {
        const aIndex = question.columnA.findIndex((item) => item.id === a)
        const bIndex = question.columnA.findIndex((item) => item.id === b)
        return aIndex - bIndex
      })
      .map(([aId, bId]) => {
        const aIndex = question.columnA.findIndex((item) => item.id === aId)
        const bIndex = question.columnB.findIndex((item) => item.id === bId)
        return `${aIndex + 1}-${String.fromCharCode(65 + bIndex)}`
      })
    return sortedMatches.join(', ')
  }

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDragDropState((prev) => ({ ...prev, dragging: itemId }))
    e.dataTransfer.setData('text/plain', itemId)
  }

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    setDragDropState((prev) => ({ ...prev, dragOver: targetId }))
  }

  // Handle drop
  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    const sourceId = e.dataTransfer.getData('text/plain')

    if (sourceId && sourceId !== targetId) {
      const newMatches = { ...dragDropState.matches }

      // Remove any existing match for this source
      Object.keys(newMatches).forEach((key) => {
        if (newMatches[key] === targetId) {
          delete newMatches[key]
        }
      })

      newMatches[sourceId] = targetId

      setDragDropState((prev) => ({
        ...prev,
        matches: newMatches,
        dragging: null,
        dragOver: null,
      }))

      const answerString = generateAnswerFromMatches(newMatches)
      onAnswerSelect(answerString)
    }
  }

  // Handle option selection (fallback for non-drag devices)
  const handleOptionSelect = (option: string) => {
    if (!showExplanation && !isReviewMode) {
      setSelectedOption(option)
      onAnswerSelect(option)
    }
  }

  // Get match status for UI
  const getMatchStatus = (aId: string, bId: string) => {
    if (!showExplanation) return 'none'

    const correctMatch = question.correctMatches.find((m) => m.aId === aId && m.bId === bId)
    const userMatch = dragDropState.matches[aId] === bId

    if (correctMatch && userMatch) return 'correct'
    if (!correctMatch && userMatch) return 'incorrect'
    if (correctMatch && !userMatch) return 'missed'
    return 'none'
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
            Match the Following
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

      {/* Drag and Drop Interface */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Column A */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-4 text-center">Column A</h3>
          <div className="space-y-3">
            {question.columnA.map((item, index) => {
              const isMatched = Object.keys(dragDropState.matches).includes(item.id)
              const matchedBId = dragDropState.matches[item.id]
              const matchStatus = matchedBId ? getMatchStatus(item.id, matchedBId) : 'none'

              return (
                <div
                  key={item.id}
                  draggable={!showExplanation && !isReviewMode}
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  className={cn(
                    'flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200',
                    'cursor-move select-none',
                    dragDropState.dragging === item.id && 'opacity-50 scale-95',
                    isMatched && matchStatus === 'correct' && 'border-green-600 bg-green-50',
                    isMatched && matchStatus === 'incorrect' && 'border-red-500 bg-red-50',
                    !isMatched && 'border-blue-300 bg-white hover:border-blue-400 hover:shadow-md',
                    (showExplanation || isReviewMode) && 'cursor-default'
                  )}
                >
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-blue-900 font-medium">{item.text}</span>
                  {isMatched && (
                    <span className="text-sm text-gray-600">
                      ↔{' '}
                      {String.fromCharCode(
                        65 + question.columnB.findIndex((b) => b.id === matchedBId)
                      )}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Column B */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
          <h3 className="font-semibold text-purple-900 mb-4 text-center">Column B</h3>
          <div className="space-y-3">
            {question.columnB.map((item, index) => {
              const isMatchTarget = Object.values(dragDropState.matches).includes(item.id)
              const isDragOver = dragDropState.dragOver === item.id

              return (
                <div
                  key={item.id}
                  onDragOver={(e) => handleDragOver(e, item.id)}
                  onDrop={(e) => handleDrop(e, item.id)}
                  onDragLeave={() => setDragDropState((prev) => ({ ...prev, dragOver: null }))}
                  className={cn(
                    'flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200',
                    'min-h-[60px]',
                    isDragOver && 'border-purple-500 bg-purple-100 scale-105',
                    isMatchTarget && 'border-purple-500 bg-purple-100',
                    !isMatchTarget &&
                      !isDragOver &&
                      'border-purple-300 bg-white hover:border-purple-400'
                  )}
                >
                  <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 text-purple-900 font-medium">{item.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Instructions */}
      {!showExplanation && !isReviewMode && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Instructions:</strong> Drag items from Column A to match with corresponding
            items in Column B.
          </p>
          <p className="text-xs text-gray-500">
            Alternative: Select from the options below if drag-and-drop is not available.
          </p>
        </div>
      )}

      {/* Fallback Options */}
      {question.options && (
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-gray-700 mb-3">Answer Options:</h4>
          {question.options.map((option, index) => {
            const optionLabel = String.fromCharCode(65 + index)
            const isSelected = selectedOption === option
            const isCorrect = option === question.correctAnswer

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                disabled={showExplanation || isReviewMode}
                className={cn(
                  'w-full text-left p-4 rounded-lg border-2 transition-all duration-200',
                  isSelected
                    ? showExplanation
                      ? isCorrect
                        ? 'border-green-600 bg-green-50 text-green-900'
                        : 'border-red-500 bg-red-50 text-red-900'
                      : 'border-orange-500 bg-orange-50 text-orange-900'
                    : showExplanation && isCorrect
                      ? 'border-green-600 bg-green-50 text-green-900'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
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
                          : 'bg-orange-500 text-white'
                        : showExplanation && isCorrect
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                    )}
                  >
                    {optionLabel}
                  </span>
                  <span className="flex-1 font-mono text-sm">{option}</span>
                  {showExplanation && isCorrect && <span className="text-green-600">✓</span>}
                  {showExplanation && isSelected && !isCorrect && (
                    <span className="text-red-600">✗</span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Explanation */}
      {showExplanation && (
        <div className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border-l-4 border-orange-500">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">
              ℹ
            </span>
            Explanation
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">{question.explanation}</p>

          {/* Correct Matches */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Correct Matches:</h4>
            <div className="space-y-1">
              {question.correctMatches.map((match, index) => {
                const aItem = question.columnA.find((item) => item.id === match.aId)
                const bItem = question.columnB.find((item) => item.id === match.bId)
                const aIndex = question.columnA.findIndex((item) => item.id === match.aId)
                const bIndex = question.columnB.findIndex((item) => item.id === match.bId)

                return (
                  <div key={index} className="text-sm text-gray-600">
                    {aIndex + 1}. {aItem?.text} ↔ {String.fromCharCode(65 + bIndex)}. {bItem?.text}
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
            <div className="mt-3 p-3 bg-orange-50 rounded border border-orange-200">
              <p className="text-sm text-orange-700">
                <strong>💡 Time Management Tip:</strong> {question.timeManagementTip}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MatchTheFollowingQuestion
