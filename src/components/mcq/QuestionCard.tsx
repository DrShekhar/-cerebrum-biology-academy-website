'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import type { MCQQuestion, AnswerResult } from '@/lib/mcq/types'

interface QuestionCardProps {
  question: MCQQuestion
  questionNumber: number
  onAnswer: (answer: 'A' | 'B' | 'C' | 'D', timeSpent: number) => Promise<AnswerResult>
  showExplanation?: boolean
  isProtected?: boolean
  onSkip?: () => void
}

const optionLabels = ['A', 'B', 'C', 'D'] as const

export function QuestionCard({
  question,
  questionNumber,
  onAnswer,
  showExplanation = false,
  isProtected = true,
  onSkip,
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null)
  const [result, setResult] = useState<AnswerResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFullExplanation, setShowFullExplanation] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const startTimeRef = useRef<number>(Date.now())
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Handle option click
  const handleOptionClick = useCallback(
    async (option: 'A' | 'B' | 'C' | 'D') => {
      if (selectedAnswer || isSubmitting) return

      // Calculate actual time spent
      const actualTimeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000)

      // Stop the timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      setSelectedAnswer(option)
      setIsSubmitting(true)

      try {
        const answerResult = await onAnswer(option, actualTimeSpent)
        setResult(answerResult)
      } catch (error) {
        console.error('Error submitting answer:', error)
        setSelectedAnswer(null)
      } finally {
        setIsSubmitting(false)
      }
    },
    [selectedAnswer, isSubmitting, onAnswer]
  )

  // Reset timer when question changes
  useEffect(() => {
    startTimeRef.current = Date.now()
    setTimeElapsed(0)
    setSelectedAnswer(null)
    setResult(null)
    setShowFullExplanation(false)

    // Update elapsed time every second
    timerRef.current = setInterval(() => {
      if (!selectedAnswer) {
        setTimeElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000))
      }
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [question.id])

  // Keyboard navigation (1-4 keys to select answers)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedAnswer || isSubmitting) return

      const keyMap: Record<string, 'A' | 'B' | 'C' | 'D'> = {
        '1': 'A',
        '2': 'B',
        '3': 'C',
        '4': 'D',
        a: 'A',
        b: 'B',
        c: 'C',
        d: 'D',
      }

      const option = keyMap[e.key.toLowerCase()]
      if (option) {
        handleOptionClick(option)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedAnswer, isSubmitting, handleOptionClick])

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`
  }

  const getOptionClassName = (index: number) => {
    const option = optionLabels[index]
    const baseClasses =
      'flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer'

    if (!selectedAnswer) {
      return `${baseClasses} border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm`
    }

    if (result) {
      if (option === result.correctAnswer) {
        return `${baseClasses} border-green-500 bg-green-50 shadow-sm`
      }
      if (option === selectedAnswer && !result.isCorrect) {
        return `${baseClasses} border-red-500 bg-red-50 shadow-sm`
      }
    }

    // Non-selected options after answer - keep visible but muted
    return `${baseClasses} border-gray-200 bg-gray-50 opacity-70 cursor-default`
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-4 animate-fade-in-up ${isProtected ? 'select-none' : ''}`}
      onContextMenu={isProtected ? (e) => e.preventDefault() : undefined}
      role="article"
      aria-label={`Question ${questionNumber}`}
    >
      {/* Question Header - Compact */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
            {questionNumber}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              question.difficulty === 'EASY'
                ? 'bg-green-100 text-green-700'
                : question.difficulty === 'HARD'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {question.difficulty}
          </span>
          {question.isPYQ && question.pyqYear && (
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
              PYQ {question.pyqYear}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
              !selectedAnswer ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
            }`}
            aria-label={`Time spent: ${formatTime(timeElapsed)}`}
          >
            <span className="text-[10px] opacity-70">Time:</span>
            <span className="font-semibold tabular-nums">{formatTime(timeElapsed)}</span>
          </div>
          {!selectedAnswer && onSkip && (
            <button
              onClick={onSkip}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              aria-label="Skip this question"
            >
              Skip →
            </button>
          )}
        </div>
      </div>
      {/* Topic - More visible */}
      <div className="mb-2">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
          {question.topic}
        </span>
      </div>

      {/* Question Text - Larger for better readability */}
      <div className="mb-5">
        <p className="text-lg text-gray-900 leading-relaxed font-medium">{question.question}</p>
      </div>

      {/* Options - Better spacing and larger text */}
      <div className="space-y-3" role="radiogroup" aria-label="Answer options">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(optionLabels[index])}
            disabled={!!selectedAnswer || isSubmitting}
            className={`${getOptionClassName(index)} ${!selectedAnswer ? 'hover:scale-[1.01] active:scale-[0.99]' : ''}`}
            role="radio"
            aria-checked={selectedAnswer === optionLabels[index]}
            aria-label={`Option ${optionLabels[index]}: ${option}. Press ${index + 1} to select.`}
          >
            <span
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                result && optionLabels[index] === result.correctAnswer
                  ? 'bg-green-500 text-white'
                  : result && optionLabels[index] === selectedAnswer && !result.isCorrect
                    ? 'bg-red-500 text-white'
                    : selectedAnswer === optionLabels[index]
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700'
              }`}
              aria-hidden="true"
            >
              {optionLabels[index]}
            </span>
            <span className="text-left text-gray-700 text-base flex-1">{option}</span>
            {result && optionLabels[index] === result.correctAnswer && (
              <span className="text-green-500 text-lg font-bold" aria-label="Correct answer">
                ✓
              </span>
            )}
            {result && optionLabels[index] === selectedAnswer && !result.isCorrect && (
              <span className="text-red-500 text-lg font-bold" aria-label="Incorrect">
                ✗
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Keyboard Shortcut Hint - More visible */}
      {!selectedAnswer && !isSubmitting && (
        <div className="flex items-center justify-center gap-2 mt-3 text-gray-400">
          <span className="text-xs">⌨️</span>
          <p className="text-xs">
            Press{' '}
            <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-mono text-xs">
              1-4
            </kbd>{' '}
            or{' '}
            <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-mono text-xs">
              A-D
            </kbd>{' '}
            to select
          </p>
        </div>
      )}

      {/* Result Feedback - Enhanced with CSS animations */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          result ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
        }`}
        role="status"
        aria-live="polite"
      >
        <div className="overflow-hidden">
          {result && (
            <div
              className={`p-4 rounded-xl ${
                result.isCorrect
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 animate-scale-in animate-pulse-glow'
                  : 'bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 animate-shake-wrong'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-2xl ${result.isCorrect ? 'animate-confetti-burst' : 'animate-scale-in'}`}
                  >
                    {result.isCorrect ? '🎉' : '😔'}
                  </span>
                  <span
                    className={`font-bold text-base ${result.isCorrect ? 'text-green-700' : 'text-red-700'}`}
                  >
                    {result.isCorrect ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-sm rounded-full animate-xp-float shadow-lg">
                  +{result.xpEarned} XP
                </span>
              </div>

              {/* Explanation Preview - Compact */}
              {showExplanation && result.explanation && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {showFullExplanation || result.explanation.length <= 150
                      ? result.explanation
                      : `${result.explanation.slice(0, result.explanation.lastIndexOf(' ', 150))}...`}
                  </p>
                  {result.explanation.length > 150 && (
                    <button
                      onClick={() => setShowFullExplanation(!showFullExplanation)}
                      className="mt-1 text-blue-600 text-xs font-medium hover:underline"
                    >
                      {showFullExplanation ? 'Less' : 'More'}
                    </button>
                  )}
                </div>
              )}

              {!showExplanation && result.explanation && (
                <div className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-between">
                  <p className="text-gray-500 text-xs">
                    Full explanation available with course enrollment
                  </p>
                  <a
                    href="/demo"
                    className="px-2.5 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors flex-shrink-0 ml-2"
                  >
                    Unlock Explanations
                  </a>
                </div>
              )}

              {/* Streak Update - Enhanced */}
              {result.streakUpdated && result.newStreak && (
                <div className="mt-3 flex items-center gap-2 p-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200 animate-fade-in-up">
                  <span className="text-2xl animate-streak-fire">🔥</span>
                  <div>
                    <span className="font-bold text-orange-600 text-sm">
                      {result.newStreak} Day Streak!
                    </span>
                    <p className="text-orange-500 text-xs">Keep it going!</p>
                  </div>
                </div>
              )}

              {/* Badge Unlocked - Enhanced */}
              {result.badgesUnlocked && result.badgesUnlocked.length > 0 && (
                <div className="mt-3 space-y-2">
                  {result.badgesUnlocked.map((badge, idx) => (
                    <div
                      key={badge.code}
                      className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-300 animate-scale-in shadow-sm"
                      style={{ animationDelay: `${idx * 150}ms` }}
                    >
                      <span className="text-2xl animate-confetti-burst">{badge.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-yellow-800 text-sm">🏆 Badge Unlocked!</p>
                        <p className="text-yellow-700 text-xs">{badge.name}</p>
                      </div>
                      <span className="px-2 py-1 bg-yellow-200 text-yellow-800 font-bold text-xs rounded-full">
                        +{badge.xpReward} XP
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Level Up - Enhanced */}
              {result.levelUp && (
                <div className="mt-3 p-3 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg border-2 border-purple-300 text-center animate-scale-in animate-pulse-glow">
                  <span className="text-3xl animate-confetti-burst inline-block">🎊</span>
                  <p className="font-bold text-purple-800 text-base mt-1">Level Up!</p>
                  <p className="text-purple-600 text-sm">
                    You&apos;re now Level {result.levelUp.newLevel}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
