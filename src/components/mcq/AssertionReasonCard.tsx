'use client'

import { useState, useCallback, useEffect, useRef, useTransition } from 'react'
import { Flag } from 'lucide-react'
import type { MCQQuestion, AnswerResult } from '@/lib/mcq/types'
import { BookmarkButton } from './BookmarkButton'

interface AssertionReasonCardProps {
  question: MCQQuestion
  questionNumber: number
  onAnswer: (answer: 'A' | 'B' | 'C' | 'D', timeSpent: number) => Promise<AnswerResult>
  showExplanation?: boolean
  isProtected?: boolean
  onSkip?: () => void
  onReportError?: (questionId: string) => void
  freeUserId?: string | null
}

const optionLabels = ['A', 'B', 'C', 'D'] as const

const DEFAULT_AR_OPTIONS = [
  'Both A and R are true and R is the correct explanation of A',
  'Both A and R are true but R is NOT the correct explanation of A',
  'A is true but R is false',
  'A is false but R is true',
]

function parseAssertionReason(question: MCQQuestion): {
  assertion: string
  reason: string
  choices: string[]
} {
  const opts = question.options
  let assertion = ''
  let reason = ''

  const text = question.question
  const arPattern =
    /Assertion\s*\(A\)\s*[:\-]\s*([\s\S]*?)(?:\n|\r\n?)\s*Reason\s*\(R\)\s*[:\-]\s*([\s\S]*)/i
  const match = text.match(arPattern)

  if (match) {
    assertion = match[1].trim()
    reason = match[2].trim()
  } else {
    const parts = text.split(/\n+/)
    if (parts.length >= 2) {
      assertion = parts[0].replace(/^Assertion\s*\(A\)\s*[:\-]?\s*/i, '').trim()
      reason = parts[1].replace(/^Reason\s*\(R\)\s*[:\-]?\s*/i, '').trim()
    } else {
      assertion = text
      reason = ''
    }
  }

  const hasAROptions = opts.some(
    (o) => o.toLowerCase().includes('both a and r') || o.toLowerCase().includes('a is true')
  )
  const choices = hasAROptions ? opts : DEFAULT_AR_OPTIONS

  return { assertion, reason, choices }
}

export function AssertionReasonCard({
  question,
  questionNumber,
  onAnswer,
  showExplanation = false,
  isProtected = true,
  onSkip,
  onReportError,
  freeUserId,
}: AssertionReasonCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null)
  const [result, setResult] = useState<AnswerResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFullExplanation, setShowFullExplanation] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const startTimeRef = useRef<number>(Date.now())
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [, startTransition] = useTransition()

  const { assertion, reason, choices } = parseAssertionReason(question)

  const handleOptionClick = useCallback(
    (option: 'A' | 'B' | 'C' | 'D') => {
      if (selectedAnswer || isSubmitting) return
      const actualTimeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000)
      if (timerRef.current) clearInterval(timerRef.current)
      setSelectedAnswer(option)
      setIsSubmitting(true)
      startTransition(() => {
        onAnswer(option, actualTimeSpent)
          .then((answerResult) => setResult(answerResult))
          .catch(() => setSelectedAnswer(null))
          .finally(() => setIsSubmitting(false))
      })
    },
    [selectedAnswer, isSubmitting, onAnswer]
  )

  useEffect(() => {
    startTimeRef.current = Date.now()
    setTimeElapsed(0)
    setSelectedAnswer(null)
    setResult(null)
    setShowFullExplanation(false)
    timerRef.current = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000))
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [question.id])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedAnswer || isSubmitting || e.repeat) return
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
        e.preventDefault()
        handleOptionClick(option)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedAnswer, isSubmitting, handleOptionClick])

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
      return `${baseClasses} border-stone-200 bg-white hover:border-sage-400 hover:bg-sage-50 hover:shadow-sm`
    }
    if (result) {
      if (option === result.correctAnswer) {
        return `${baseClasses} border-green-600 bg-gradient-to-r from-green-50 to-green-50 shadow-md animate-correct-pulse-botanical`
      }
      if (option === selectedAnswer && !result.isCorrect) {
        return `${baseClasses} border-red-500 bg-gradient-to-r from-red-50 to-red-50 shadow-sm animate-shake-wrong`
      }
    }
    return `${baseClasses} border-stone-200 bg-stone-50 opacity-70 cursor-default`
  }

  return (
    <div
      className={`bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-stone-200/50 p-4 animate-fade-in-up paper-texture ${isProtected ? 'select-none' : ''}`}
      onContextMenu={isProtected ? (e) => e.preventDefault() : undefined}
      role="article"
      aria-label={`Question ${questionNumber}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sage-100 text-sage-700 font-bold text-xs font-mono">
            {questionNumber}
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Assertion-Reason
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${
              question.difficulty === 'EASY'
                ? 'bg-green-100 text-green-700'
                : question.difficulty === 'HARD'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-amber-100 text-yellow-700'
            }`}
          >
            {question.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium font-mono ${
              !selectedAnswer ? 'bg-stone-100 text-stone-600' : 'bg-stone-50 text-stone-400'
            }`}
          >
            <span className="text-base">⏱️</span>
            <span className="font-semibold tabular-nums">{formatTime(timeElapsed)}</span>
          </div>
          {freeUserId && <BookmarkButton questionId={question.id} freeUserId={freeUserId} />}
          {!selectedAnswer && onSkip && (
            <button
              onClick={onSkip}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
            >
              Skip →
            </button>
          )}
        </div>
      </div>

      <div className="mb-4 space-y-3">
        <div className="p-3 rounded-lg border-l-4 border-indigo-500 bg-indigo-50/50">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">
            Assertion (A)
          </p>
          <p className="text-base text-ink leading-relaxed">{assertion}</p>
        </div>
        <div className="p-3 rounded-lg border-l-4 border-green-500 bg-green-50/50">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">
            Reason (R)
          </p>
          <p className="text-base text-ink leading-relaxed">{reason}</p>
        </div>
      </div>

      <div className="space-y-3" role="radiogroup" aria-label="Answer options">
        {choices.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(optionLabels[index])}
            disabled={!!selectedAnswer || isSubmitting}
            className={`${getOptionClassName(index)} w-full ${!selectedAnswer ? 'hover:scale-[1.01] active:scale-[0.99]' : ''}`}
            role="radio"
            aria-checked={selectedAnswer === optionLabels[index]}
          >
            <span
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm font-mono transition-colors ${
                result && optionLabels[index] === result.correctAnswer
                  ? 'bg-green-600 text-white shadow-md'
                  : result && optionLabels[index] === selectedAnswer && !result.isCorrect
                    ? 'bg-red-500 text-white shadow-md'
                    : selectedAnswer === optionLabels[index]
                      ? 'bg-sage-500 text-white shadow-md'
                      : 'bg-stone-100 text-stone-700'
              }`}
            >
              {optionLabels[index]}
            </span>
            <span className="text-left text-ink text-sm flex-1">{option}</span>
            {result && optionLabels[index] === result.correctAnswer && (
              <span className="text-green-600 text-lg font-bold">✓</span>
            )}
            {result && optionLabels[index] === selectedAnswer && !result.isCorrect && (
              <span className="text-red-500 text-lg font-bold">✗</span>
            )}
          </button>
        ))}
      </div>

      {!selectedAnswer && !isSubmitting && (
        <div className="flex items-center justify-center gap-2 mt-3 text-stone-400">
          <p className="text-xs">
            Press{' '}
            <kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-600 font-mono text-xs">
              1-4
            </kbd>{' '}
            or{' '}
            <kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-600 font-mono text-xs">
              A-D
            </kbd>{' '}
            to select
          </p>
        </div>
      )}

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
                  ? 'bg-gradient-to-r from-green-50 to-green-50 border-2 border-green-300 animate-correct-pulse-botanical'
                  : 'bg-gradient-to-r from-red-50 to-red-50 border-2 border-red-300 animate-shake-wrong'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-2xl ${result.isCorrect ? 'animate-confetti-burst' : 'animate-scale-in'}`}>
                    {result.isCorrect ? '🎉' : '😔'}
                  </span>
                  <span className={`font-bold text-base ${result.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {result.isCorrect ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-sage-500 to-sage-700 text-white font-bold text-sm font-mono rounded-full animate-xp-float-botanical shadow-lg">
                    +{result.xpEarned} XP
                  </span>
                  {onReportError && (
                    <button
                      onClick={() => onReportError(question.id)}
                      className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Report an error with this question"
                    >
                      <Flag className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              {showExplanation && result.explanation && (
                <div className="mt-2 pt-2 border-t border-stone-200">
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {showFullExplanation || result.explanation.length <= 150
                      ? result.explanation
                      : `${result.explanation.slice(0, result.explanation.lastIndexOf(' ', 150))}...`}
                  </p>
                  {result.explanation.length > 150 && (
                    <button
                      onClick={() => setShowFullExplanation(!showFullExplanation)}
                      className="mt-1 text-sage-600 text-xs font-medium hover:underline"
                    >
                      {showFullExplanation ? 'Less' : 'More'}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
