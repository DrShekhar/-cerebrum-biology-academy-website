'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { MCQQuestion, AnswerResult } from '@/lib/mcq/types'

interface QuestionCardProps {
  question: MCQQuestion
  questionNumber: number
  onAnswer: (answer: 'A' | 'B' | 'C' | 'D') => Promise<AnswerResult>
  showExplanation?: boolean
  isProtected?: boolean
}

const optionLabels = ['A', 'B', 'C', 'D'] as const

export function QuestionCard({
  question,
  questionNumber,
  onAnswer,
  showExplanation = false,
  isProtected = true,
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null)
  const [result, setResult] = useState<AnswerResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFullExplanation, setShowFullExplanation] = useState(false)

  const handleOptionClick = useCallback(
    async (option: 'A' | 'B' | 'C' | 'D') => {
      if (selectedAnswer || isSubmitting) return

      setSelectedAnswer(option)
      setIsSubmitting(true)

      try {
        const answerResult = await onAnswer(option)
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

  const getOptionClassName = (index: number) => {
    const option = optionLabels[index]
    const baseClasses =
      'flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer'

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white rounded-2xl shadow-lg p-6 ${isProtected ? 'select-none' : ''}`}
      onContextMenu={isProtected ? (e) => e.preventDefault() : undefined}
    >
      {/* Question Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
            {questionNumber}
          </span>
          {question.isPYQ && question.pyqYear && (
            <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
              PYQ {question.pyqYear}
            </span>
          )}
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              question.difficulty === 'EASY'
                ? 'bg-green-100 text-green-700'
                : question.difficulty === 'HARD'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {question.difficulty}
          </span>
        </div>
        <span className="text-xs text-gray-500">{question.topic}</span>
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <p className="text-lg text-gray-800 leading-relaxed">{question.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleOptionClick(optionLabels[index])}
            disabled={!!selectedAnswer || isSubmitting}
            className={getOptionClassName(index)}
            whileHover={!selectedAnswer ? { scale: 1.01 } : {}}
            whileTap={!selectedAnswer ? { scale: 0.99 } : {}}
          >
            <span
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                result && optionLabels[index] === result.correctAnswer
                  ? 'bg-green-500 text-white'
                  : result && optionLabels[index] === selectedAnswer && !result.isCorrect
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700'
              }`}
            >
              {optionLabels[index]}
            </span>
            <span className="text-left text-gray-700 flex-1">{option}</span>
            {result && optionLabels[index] === result.correctAnswer && (
              <span className="text-green-500">✓</span>
            )}
            {result && optionLabels[index] === selectedAnswer && !result.isCorrect && (
              <span className="text-red-500">✗</span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Result Feedback */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6"
          >
            <div
              className={`p-4 rounded-xl ${
                result.isCorrect
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`font-bold ${result.isCorrect ? 'text-green-700' : 'text-red-700'}`}
                >
                  {result.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                </span>
                <span className="text-blue-600 font-medium">+{result.xpEarned} XP</span>
              </div>

              {/* Explanation Preview */}
              {showExplanation && result.explanation && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-gray-600 text-sm">
                    {showFullExplanation
                      ? result.explanation
                      : `${result.explanation.slice(0, 100)}...`}
                  </p>
                  {result.explanation.length > 100 && (
                    <button
                      onClick={() => setShowFullExplanation(!showFullExplanation)}
                      className="mt-2 text-blue-600 text-sm font-medium hover:underline"
                    >
                      {showFullExplanation ? 'Show less' : 'Show full explanation'}
                    </button>
                  )}
                </div>
              )}

              {!showExplanation && result.explanation && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-gray-500 text-sm">
                    Full explanation available with course enrollment
                  </p>
                  <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Unlock Explanations
                  </button>
                </div>
              )}

              {/* Streak Update */}
              {result.streakUpdated && result.newStreak && (
                <div className="mt-3 flex items-center gap-2 text-orange-600">
                  <span className="text-xl">🔥</span>
                  <span className="font-medium">{result.newStreak} day streak!</span>
                </div>
              )}

              {/* Badge Unlocked */}
              {result.badgesUnlocked && result.badgesUnlocked.length > 0 && (
                <div className="mt-3 space-y-2">
                  {result.badgesUnlocked.map((badge) => (
                    <div
                      key={badge.code}
                      className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                    >
                      <span className="text-2xl">{badge.icon}</span>
                      <div>
                        <p className="font-bold text-yellow-800">Badge Unlocked!</p>
                        <p className="text-sm text-yellow-700">{badge.name}</p>
                      </div>
                      <span className="ml-auto text-yellow-600 font-medium">
                        +{badge.xpReward} XP
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Level Up */}
              {result.levelUp && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-3 p-4 bg-purple-50 rounded-lg border border-purple-200 text-center"
                >
                  <p className="text-2xl mb-2">🎉</p>
                  <p className="font-bold text-purple-800">Level Up!</p>
                  <p className="text-purple-700">You are now Level {result.levelUp.newLevel}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
