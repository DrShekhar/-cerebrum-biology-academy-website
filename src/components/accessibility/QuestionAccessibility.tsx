'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface QuestionAccessibilityProps {
  questionType: string
  questionNumber: number
  totalQuestions?: number
  isReviewMode?: boolean
  showExplanation?: boolean
  children: React.ReactNode
  onSkip?: () => void
  onPrevious?: () => void
  onNext?: () => void
  className?: string
}

const QuestionAccessibility: React.FC<QuestionAccessibilityProps> = ({
  questionType,
  questionNumber,
  totalQuestions,
  isReviewMode = false,
  showExplanation = false,
  children,
  onSkip,
  onPrevious,
  onNext,
  className,
}) => {
  const questionRef = useRef<HTMLDivElement>(null)
  const announceRef = useRef<HTMLDivElement>(null)

  // Announce question changes to screen readers
  useEffect(() => {
    if (announceRef.current) {
      const announcement = `Question ${questionNumber}${totalQuestions ? ` of ${totalQuestions}` : ''}, ${questionType} type${isReviewMode ? ', review mode' : ''}`
      announceRef.current.textContent = announcement
    }
  }, [questionNumber, questionType, totalQuestions, isReviewMode])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip default behavior for form inputs
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (event.key) {
        case 'ArrowRight':
        case 'n':
        case 'N':
          if (onNext && !event.shiftKey) {
            event.preventDefault()
            onNext()
          }
          break
        case 'ArrowLeft':
        case 'p':
        case 'P':
          if (onPrevious && !event.shiftKey) {
            event.preventDefault()
            onPrevious()
          }
          break
        case 's':
        case 'S':
          if (onSkip && !event.shiftKey) {
            event.preventDefault()
            onSkip()
          }
          break
        case 'Escape':
          // Focus back to main question area
          if (questionRef.current) {
            questionRef.current.focus()
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onNext, onPrevious, onSkip])

  // Focus management
  useEffect(() => {
    if (questionRef.current && !showExplanation) {
      questionRef.current.focus()
    }
  }, [questionNumber, showExplanation])

  return (
    <div className={cn('relative', className)}>
      {/* Screen Reader Announcements */}
      <div ref={announceRef} className="sr-only" aria-live="polite" aria-atomic="true" />

      {/* Skip Links */}
      <div className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50">
        <div className="flex gap-2 p-2 bg-white border border-gray-300 rounded">
          <button
            onClick={() => {
              const firstOption = document.querySelector(
                '[role="radio"], [role="checkbox"], input[type="text"], input[type="number"]'
              ) as HTMLElement
              firstOption?.focus()
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Skip to answers
          </button>
          {showExplanation && (
            <button
              onClick={() => {
                const explanation = document.querySelector(
                  '[aria-label*="Explanation"]'
                ) as HTMLElement
                explanation?.focus()
              }}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
            >
              Skip to explanation
            </button>
          )}
        </div>
      </div>

      {/* Main Question Container */}
      <div
        ref={questionRef}
        tabIndex={-1}
        role="main"
        aria-label={`Question ${questionNumber}${totalQuestions ? ` of ${totalQuestions}` : ''}: ${questionType} type`}
        className="focus:outline-none"
      >
        {children}
      </div>

      {/* Navigation Controls */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {onPrevious && (
            <button
              onClick={onPrevious}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
              aria-label="Go to previous question"
            >
              <span aria-hidden="true">←</span>
              Previous
            </button>
          )}
          {onSkip && !isReviewMode && (
            <button
              onClick={onSkip}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg transition-colors duration-200"
              aria-label="Skip this question"
            >
              Skip
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onNext && (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              aria-label="Go to next question"
            >
              Next
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <details className="mt-4">
        <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
          Keyboard Shortcuts
        </summary>
        <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
          <div className="grid md:grid-cols-2 gap-2">
            <div>
              <kbd className="px-1 py-0.5 bg-gray-200 rounded">→</kbd> or{' '}
              <kbd className="px-1 py-0.5 bg-gray-200 rounded">N</kbd> - Next question
            </div>
            <div>
              <kbd className="px-1 py-0.5 bg-gray-200 rounded">←</kbd> or{' '}
              <kbd className="px-1 py-0.5 bg-gray-200 rounded">P</kbd> - Previous question
            </div>
            <div>
              <kbd className="px-1 py-0.5 bg-gray-200 rounded">S</kbd> - Skip question
            </div>
            <div>
              <kbd className="px-1 py-0.5 bg-gray-200 rounded">Esc</kbd> - Focus question area
            </div>
            <div>
              <kbd className="px-1 py-0.5 bg-gray-200 rounded">Tab</kbd> - Navigate through options
            </div>
            <div>
              <kbd className="px-1 py-0.5 bg-gray-200 rounded">Space</kbd> - Select option
            </div>
          </div>
        </div>
      </details>

      {/* Progress Indicator for Screen Readers */}
      {totalQuestions && (
        <div className="sr-only" aria-live="polite">
          Progress: {questionNumber} of {totalQuestions} questions completed
        </div>
      )}
    </div>
  )
}

export default QuestionAccessibility

// Accessibility hooks for question components
export const useQuestionAccessibility = (questionType: string) => {
  const announceSelection = (selection: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = `Selected: ${selection}`
    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  const announceCorrection = (isCorrect: boolean, correctAnswer?: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'assertive')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = isCorrect
      ? 'Correct answer!'
      : `Incorrect. ${correctAnswer ? `The correct answer is: ${correctAnswer}` : ''}`
    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 3000)
  }

  const getAriaLabel = (
    optionText: string,
    index: number,
    isSelected: boolean,
    isCorrect?: boolean
  ) => {
    const optionLabel = String.fromCharCode(65 + index)
    let label = `Option ${optionLabel}: ${optionText}`

    if (isSelected) {
      label += ', selected'
    }

    if (isCorrect !== undefined) {
      label += isCorrect ? ', correct answer' : ', incorrect'
    }

    return label
  }

  return {
    announceSelection,
    announceCorrection,
    getAriaLabel,
  }
}

// High contrast mode detection and styling
export const useHighContrastMode = () => {
  const [isHighContrast, setIsHighContrast] = React.useState(false)

  React.useEffect(() => {
    const checkHighContrast = () => {
      // Check for Windows high contrast mode
      const isWindowsHighContrast = window.matchMedia('(-ms-high-contrast: active)').matches

      // Check for prefers-contrast media query
      const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches

      setIsHighContrast(isWindowsHighContrast || prefersHighContrast)
    }

    checkHighContrast()

    // Listen for changes
    const mediaQuery1 = window.matchMedia('(-ms-high-contrast: active)')
    const mediaQuery2 = window.matchMedia('(prefers-contrast: high)')

    mediaQuery1.addEventListener('change', checkHighContrast)
    mediaQuery2.addEventListener('change', checkHighContrast)

    return () => {
      mediaQuery1.removeEventListener('change', checkHighContrast)
      mediaQuery2.removeEventListener('change', checkHighContrast)
    }
  }, [])

  const getHighContrastStyles = (baseStyles: string) => {
    if (!isHighContrast) return baseStyles

    return cn(baseStyles, {
      // High contrast overrides
      'border-2 border-black': true,
      'bg-white text-black': true,
      'focus:ring-4 focus:ring-yellow-400': true,
    })
  }

  return { isHighContrast, getHighContrastStyles }
}
