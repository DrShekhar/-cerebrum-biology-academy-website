'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { DiagramBasedQuestion } from '@/data/neetQuestionBank'

interface DiagramBasedQuestionProps {
  question: DiagramBasedQuestion
  selectedAnswer?: string
  onAnswerSelect: (answer: string) => void
  showExplanation?: boolean
  isReviewMode?: boolean
  questionNumber?: number
}

interface AnnotationPoint {
  id: string
  x: number
  y: number
  label: string
  isVisible: boolean
}

const DiagramBasedQuestion: React.FC<DiagramBasedQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showExplanation = false,
  isReviewMode = false,
  questionNumber = 1,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)
  const [annotations, setAnnotations] = useState<AnnotationPoint[]>([])
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize annotations from labelledParts
  useEffect(() => {
    if (question.labelledParts && imageLoaded) {
      const newAnnotations = question.labelledParts.map((part) => ({
        id: part.id,
        x: part.position.x,
        y: part.position.y,
        label: part.name,
        isVisible: showExplanation,
      }))
      setAnnotations(newAnnotations)
    }
  }, [question.labelledParts, imageLoaded, showExplanation])

  const handleOptionSelect = (option: string) => {
    if (!showExplanation && !isReviewMode) {
      onAnswerSelect(option)
    }
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
    setImageError(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(false)
  }

  // Toggle annotation visibility (for interactive mode)
  const toggleAnnotation = (id: string) => {
    if (!showExplanation && !isReviewMode) {
      setAnnotations((prev) =>
        prev.map((ann) => (ann.id === id ? { ...ann, isVisible: !ann.isVisible } : ann))
      )
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">
            Diagram Based
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

      {/* Diagram Section */}
      <div className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
        <div ref={containerRef} className="relative inline-block mx-auto">
          {!imageError ? (
            <>
              <img
                ref={imageRef}
                src={question.diagramUrl}
                alt={question.diagramDescription}
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={cn(
                  'max-w-full h-auto rounded-lg border border-gray-300 shadow-md transition-opacity duration-300',
                  imageLoaded ? 'opacity-100' : 'opacity-0',
                  'max-h-96 mx-auto'
                )}
                style={{ display: imageLoaded ? 'block' : 'none' }}
              />

              {/* Loading State */}
              {!imageLoaded && !imageError && (
                <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg border border-gray-300">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-500 text-sm">Loading diagram...</p>
                  </div>
                </div>
              )}

              {/* Annotations Overlay */}
              {imageLoaded && annotations.length > 0 && (
                <div className="absolute inset-0">
                  {annotations.map((annotation) => (
                    <div
                      key={annotation.id}
                      className="absolute"
                      style={{
                        left: `${annotation.x}%`,
                        top: `${annotation.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {/* Annotation Point */}
                      <button
                        onClick={() => toggleAnnotation(annotation.id)}
                        className={cn(
                          'w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-200',
                          annotation.isVisible
                            ? 'bg-blue-500 scale-125'
                            : 'bg-red-500 hover:scale-110'
                        )}
                        aria-label={`Annotation point: ${annotation.label}`}
                      />

                      {/* Label */}
                      {annotation.isVisible && (
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg border border-gray-200 text-xs font-semibold text-gray-800 whitespace-nowrap z-10">
                          {annotation.label}
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-l border-t border-gray-200"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Error State */
            <div className="flex items-center justify-center h-64 bg-red-50 rounded-lg border border-red-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-red-600 text-xl">⚠</span>
                </div>
                <p className="text-red-600 text-sm mb-1">Failed to load diagram</p>
                <p className="text-red-500 text-xs">Please check your internet connection</p>
              </div>
            </div>
          )}
        </div>

        {/* Diagram Description */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 italic">{question.diagramDescription}</p>
          {question.labelledParts && question.labelledParts.length > 0 && !showExplanation && (
            <p className="text-xs text-gray-500 mt-2">Click on the colored dots to view labels</p>
          )}
        </div>
      </div>

      {/* Instructions */}
      {!showExplanation && !isReviewMode && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
          <p className="text-sm text-gray-600">
            <strong>Instructions:</strong> Study the diagram carefully and select the correct answer
            from the options below.
          </p>
        </div>
      )}

      {/* Options */}
      {question.options && (
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
                  'w-full text-left p-4 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500',
                  'hover:shadow-md',
                  isSelected
                    ? showExplanation
                      ? isCorrect
                        ? 'border-green-600 bg-green-50 text-green-900 shadow-lg'
                        : 'border-red-500 bg-red-50 text-red-900 shadow-lg'
                      : 'border-blue-500 bg-blue-50 text-cyan-900 shadow-lg'
                    : showExplanation && isCorrect
                      ? 'border-green-600 bg-green-50 text-green-900 shadow-lg'
                      : isHovered
                        ? 'border-blue-300 bg-cyan-25 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50',
                  (showExplanation || isReviewMode) && 'cursor-not-allowed'
                )}
                aria-label={`Option ${optionLabel}: ${option}`}
                role="radio"
                aria-checked={isSelected}
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
                          : isHovered
                            ? 'bg-cyan-200 text-cyan-800'
                            : 'bg-gray-200 text-gray-700'
                    )}
                  >
                    {optionLabel}
                  </span>
                  <span className="flex-1">{option}</span>
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

          {/* Labelled Parts Information */}
          {question.labelledParts && question.labelledParts.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Diagram Labels:</h4>
              <div className="grid md:grid-cols-2 gap-2">
                {question.labelledParts.map((part, index) => (
                  <div key={part.id} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    {part.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {question.ncertReference && (
            <div className="pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>NCERT Reference:</strong> {question.ncertReference}
              </p>
            </div>
          )}

          {question.timeManagementTip && (
            <div className="mt-3 p-3 bg-blue-50 rounded border border-cyan-200">
              <p className="text-sm text-cyan-700">
                <strong>💡 Time Management Tip:</strong> {question.timeManagementTip}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DiagramBasedQuestion
