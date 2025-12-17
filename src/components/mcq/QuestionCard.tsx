'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
      'flex items-center gap-2 p-2.5 rounded-lg border transition-all duration-200 cursor-pointer'

    if (!selectedAnswer) {
      return `${baseClasses} border-gray-200 hover:border-blue-400 hover:bg-blue-50`
    }

    if (result) {
      if (option === result.correctAnswer) {
        return `${baseClasses} border-green-500 bg-green-50`
      }
      if (option === selectedAnswer && !result.isCorrect) {
        return `${baseClasses} border-red-500 bg-red-50`
      }
    }

    return `${baseClasses} border-gray-200 opacity-60 cursor-default`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`bg-white rounded-xl shadow-lg p-4 ${isProtected ? 'select-none' : ''}`}
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
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              !selectedAnswer ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
            }`}
            aria-label={`Time spent: ${formatTime(timeElapsed)}`}
          >
            ⏱️ {formatTime(timeElapsed)}
          </span>
          {!selectedAnswer && onSkip && (
            <button
              onClick={onSkip}
              className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              aria-label="Skip this question"
            >
              Skip →
            </button>
          )}
        </div>
      </div>
      {/* Topic */}
      <div className="mb-1.5">
        <span className="text-xs text-gray-500">{question.topic}</span>
      </div>

      {/* Question Text - Compact */}
      <div className="mb-4">
        <p className="text-base text-gray-800 leading-relaxed">{question.question}</p>
      </div>

      {/* Options - Compact with fixed spacing */}
      <div className="space-y-2" role="radiogroup" aria-label="Answer options">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleOptionClick(optionLabels[index])}
            disabled={!!selectedAnswer || isSubmitting}
            className={getOptionClassName(index)}
            whileHover={!selectedAnswer ? { scale: 1.005 } : {}}
            whileTap={!selectedAnswer ? { scale: 0.995 } : {}}
            role="radio"
            aria-checked={selectedAnswer === optionLabels[index]}
            aria-label={`Option ${optionLabels[index]}: ${option}. Press ${index + 1} to select.`}
          >
            <span
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                result && optionLabels[index] === result.correctAnswer
                  ? 'bg-green-500 text-white'
                  : result && optionLabels[index] === selectedAnswer && !result.isCorrect
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700'
              }`}
              aria-hidden="true"
            >
              {optionLabels[index]}
            </span>
            <span className="text-left text-gray-700 text-sm flex-1">{option}</span>
            {result && optionLabels[index] === result.correctAnswer && (
              <span className="text-green-500 text-sm" aria-label="Correct answer">
                ✓
              </span>
            )}
            {result && optionLabels[index] === selectedAnswer && !result.isCorrect && (
              <span className="text-red-500 text-sm" aria-label="Incorrect">
                ✗
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Keyboard Shortcut Hint */}
      {!selectedAnswer && !isSubmitting && (
        <p className="text-[10px] text-gray-400 text-center mt-2">Press 1-4 or A-D to select</p>
      )}

      {/* Result Feedback - Compact */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
            role="status"
            aria-live="polite"
          >
            <div
              className={`p-3 rounded-lg ${
                result.isCorrect
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-semibold text-sm ${result.isCorrect ? 'text-green-700' : 'text-red-700'}`}
                >
                  {result.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                </span>
                <span className="text-blue-600 font-medium text-sm">+{result.xpEarned} XP</span>
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

              {/* Streak Update - Compact */}
              {result.streakUpdated && result.newStreak && (
                <div className="mt-2 flex items-center gap-1.5 text-orange-600 text-sm">
                  <span>🔥</span>
                  <span className="font-medium">{result.newStreak} day streak!</span>
                </div>
              )}

              {/* Badge Unlocked - Compact */}
              {result.badgesUnlocked && result.badgesUnlocked.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  {result.badgesUnlocked.map((badge) => (
                    <div
                      key={badge.code}
                      className="flex items-center gap-2 p-2 bg-yellow-50 rounded border border-yellow-200"
                    >
                      <span className="text-lg">{badge.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-yellow-800 text-xs">Badge: {badge.name}</p>
                      </div>
                      <span className="text-yellow-600 font-medium text-xs">
                        +{badge.xpReward} XP
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Level Up - Compact */}
              {result.levelUp && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-2 p-2 bg-purple-50 rounded border border-purple-200 text-center"
                >
                  <p className="font-semibold text-purple-800 text-sm">
                    🎉 Level Up! Now Level {result.levelUp.newLevel}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
