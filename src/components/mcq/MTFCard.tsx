'use client'

import { useState, useCallback, useEffect, useRef, useTransition } from 'react'
import { Flag } from 'lucide-react'
import type { MCQQuestion, AnswerResult } from '@/lib/mcq/types'
import { BookmarkButton } from './BookmarkButton'

interface MTFCardProps {
  question: MCQQuestion
  questionNumber: number
  onAnswer: (answer: string, timeSpent: number) => Promise<AnswerResult>
  showExplanation?: boolean
  isProtected?: boolean
  onSkip?: () => void
  onReportError?: (questionId: string) => void
  freeUserId?: string | null
}

export function MTFCard({
  question,
  questionNumber,
  onAnswer,
  showExplanation = false,
  isProtected = true,
  onSkip,
  onReportError,
  freeUserId,
}: MTFCardProps) {
  const [selections, setSelections] = useState<(boolean | null)[]>(
    () => question.options.map(() => null)
  )
  const [result, setResult] = useState<AnswerResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFullExplanation, setShowFullExplanation] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const startTimeRef = useRef<number>(Date.now())
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [isPending, startTransition] = useTransition()

  const isAnswered = result !== null
  const allSelected = selections.every((s) => s !== null)

  const handleToggle = useCallback(
    (index: number, value: boolean) => {
      if (isAnswered || isSubmitting) return
      setSelections((prev) => {
        const next = [...prev]
        next[index] = value
        return next
      })
    },
    [isAnswered, isSubmitting]
  )

  const handleSubmit = useCallback(() => {
    if (!allSelected || isAnswered || isSubmitting) return

    const actualTimeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000)

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    const answer = selections.map((s) => (s ? 'T' : 'F')).join('')
    setIsSubmitting(true)

    startTransition(() => {
      onAnswer(answer, actualTimeSpent)
        .then((answerResult) => {
          setResult(answerResult)
        })
        .catch((error) => {
          console.error('Error submitting MTF answer:', error)
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    })
  }, [allSelected, isAnswered, isSubmitting, selections, onAnswer])

  useEffect(() => {
    startTimeRef.current = Date.now()
    setTimeElapsed(0)
    setSelections(question.options.map(() => null))
    setResult(null)
    setShowFullExplanation(false)

    timerRef.current = setInterval(() => {
      if (!result) {
        setTimeElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000))
      }
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [question.id])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnswered || isSubmitting || e.repeat) return

      const num = parseInt(e.key)
      if (num >= 1 && num <= question.options.length) {
        e.preventDefault()
        const idx = num - 1
        const current = selections[idx]
        if (current === null) {
          handleToggle(idx, true)
        } else {
          handleToggle(idx, !current)
        }
      }

      if (e.key.toLowerCase() === 't') {
        e.preventDefault()
        const firstNull = selections.findIndex((s) => s === null)
        if (firstNull !== -1) handleToggle(firstNull, true)
      }
      if (e.key.toLowerCase() === 'f') {
        e.preventDefault()
        const firstNull = selections.findIndex((s) => s === null)
        if (firstNull !== -1) handleToggle(firstNull, false)
      }

      if (e.key === 'Enter' && allSelected) {
        e.preventDefault()
        handleSubmit()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isAnswered, isSubmitting, selections, allSelected, handleToggle, handleSubmit, question.options.length])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`
  }

  const correctAnswer = result?.correctAnswer || ''

  const getStatementStatus = (index: number): 'correct' | 'wrong' | null => {
    if (!result || !correctAnswer) return null
    const userChar = selections[index] ? 'T' : 'F'
    const correctChar = correctAnswer[index]?.toUpperCase()
    return userChar === correctChar ? 'correct' : 'wrong'
  }

  return (
    <div
      className={`bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-stone-200/50 p-4 animate-fade-in-up paper-texture ${isProtected ? 'select-none' : ''}`}
      onContextMenu={isProtected ? (e) => e.preventDefault() : undefined}
      role="article"
      aria-label={`MTF Question ${questionNumber}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sage-100 text-sage-700 font-bold text-xs font-mono">
            {questionNumber}
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
            MTF
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${
              question.difficulty === 'EASY'
                ? 'bg-green-100 text-green-700'
                : question.difficulty === 'EXPERT'
                  ? 'bg-purple-100 text-purple-700'
                  : question.difficulty === 'HARD'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-amber-100 text-yellow-700'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                question.difficulty === 'EASY'
                  ? 'bg-green-600'
                  : question.difficulty === 'EXPERT'
                    ? 'bg-purple-600'
                    : question.difficulty === 'HARD'
                      ? 'bg-red-500'
                      : 'bg-amber-500'
              }`}
            />
            {question.difficulty}
          </span>
          {question.isOlympiad && question.olympiadLevel && (
            <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
              {question.olympiadLevel}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium font-mono ${
              !isAnswered ? 'bg-stone-100 text-stone-600' : 'bg-stone-50 text-stone-400'
            }`}
          >
            <span className="text-base">⏱️</span>
            <span className="font-semibold tabular-nums">{formatTime(timeElapsed)}</span>
          </div>
          {freeUserId && <BookmarkButton questionId={question.id} freeUserId={freeUserId} />}
          {!isAnswered && onSkip && (
            <button
              onClick={onSkip}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
            >
              Skip →
            </button>
          )}
        </div>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-sage-50 text-sage-700 text-sm font-medium border border-sage-200/50">
          {question.topic}
        </span>
        {question.sourceTextbook && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
            📘 {question.sourceTextbook}
          </span>
        )}
        {question.isOlympiad && (question.campbellUnit || question.campbellChapter) && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-50/80 to-stone-50 border border-purple-200/50 text-purple-700 text-xs font-medium">
            <span>🧬</span>
            <span>
              {question.campbellUnit && `Unit ${question.campbellUnit}`}
              {question.campbellUnit && question.campbellChapter && ' · '}
              {question.campbellChapter && `Ch.${question.campbellChapter}`}
            </span>
          </span>
        )}
        {question.isOlympiad && question.olympiadLevel && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
            🏅 {question.olympiadLevel}
          </span>
        )}
      </div>

      <div className="mb-4">
        <p className="text-lg text-ink leading-relaxed font-medium">{question.question}</p>
        <p className="text-xs text-stone-500 mt-1">
          Mark each statement as True or False
        </p>
      </div>

      <div className="space-y-2.5" role="group" aria-label="Statements to evaluate">
        {question.options.map((statement, index) => {
          const status = getStatementStatus(index)
          const isTrue = selections[index] === true
          const isFalse = selections[index] === false
          const isUnset = selections[index] === null

          return (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 ${
                status === 'correct'
                  ? 'border-green-400 bg-green-50'
                  : status === 'wrong'
                    ? 'border-red-400 bg-red-50'
                    : isUnset
                      ? 'border-stone-200 bg-white'
                      : 'border-sage-300 bg-sage-50'
              }`}
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center text-xs font-bold font-mono">
                S{index + 1}
              </span>

              <span className="flex-1 text-sm text-ink">{statement}</span>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => handleToggle(index, true)}
                  disabled={isAnswered || isSubmitting}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isAnswered && correctAnswer[index]?.toUpperCase() === 'T'
                      ? 'bg-green-600 text-white shadow-md'
                      : isTrue && !isAnswered
                        ? 'bg-sage-600 text-white shadow-md'
                        : 'bg-stone-100 text-stone-600 hover:bg-green-100 hover:text-green-700'
                  } ${isAnswered ? 'cursor-default' : ''}`}
                >
                  T
                </button>
                <button
                  onClick={() => handleToggle(index, false)}
                  disabled={isAnswered || isSubmitting}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isAnswered && correctAnswer[index]?.toUpperCase() === 'F'
                      ? 'bg-green-600 text-white shadow-md'
                      : isFalse && !isAnswered
                        ? 'bg-sage-600 text-white shadow-md'
                        : 'bg-stone-100 text-stone-600 hover:bg-red-100 hover:text-red-700'
                  } ${isAnswered ? 'cursor-default' : ''}`}
                >
                  F
                </button>

                {status === 'correct' && (
                  <span className="text-green-600 text-sm font-bold ml-1">✓</span>
                )}
                {status === 'wrong' && (
                  <span className="text-red-500 text-sm font-bold ml-1">✗</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {!isAnswered && (
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            disabled={!allSelected || isSubmitting}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
              allSelected && !isSubmitting
                ? 'bg-gradient-to-r from-sage-500 to-sage-700 text-white hover:shadow-lg hover:shadow-sage-500/25 hover:scale-[1.01] active:scale-[0.99]'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Checking...
              </span>
            ) : allSelected ? (
              'Submit Answer'
            ) : (
              `Mark all statements (${selections.filter((s) => s !== null).length}/${question.options.length})`
            )}
          </button>
        </div>
      )}

      {!isAnswered && !isSubmitting && (
        <div className="flex items-center justify-center gap-2 mt-2 text-stone-400">
          <span className="text-xs">⌨️</span>
          <p className="text-xs">
            Press{' '}
            <kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-600 font-mono text-xs">
              1-4
            </kbd>{' '}
            to toggle,{' '}
            <kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-600 font-mono text-xs">
              T
            </kbd>
            /
            <kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-600 font-mono text-xs">
              F
            </kbd>{' '}
            for next empty,{' '}
            <kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-600 font-mono text-xs">
              Enter
            </kbd>{' '}
            to submit
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
                result.mtfDetails && result.mtfDetails.partialScore >= 0.6
                  ? 'bg-gradient-to-r from-green-50 to-green-50 border-2 border-green-300'
                  : result.mtfDetails && result.mtfDetails.partialScore > 0
                    ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300'
                    : 'bg-gradient-to-r from-red-50 to-red-50 border-2 border-red-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {result.mtfDetails?.partialScore === 1
                      ? '🎉'
                      : result.mtfDetails && result.mtfDetails.partialScore >= 0.6
                        ? '👍'
                        : result.mtfDetails && result.mtfDetails.partialScore > 0
                          ? '🤔'
                          : '😔'}
                  </span>
                  <div>
                    <span className="font-bold text-base text-ink">
                      {result.mtfDetails?.correctCount}/{result.mtfDetails?.totalStatements} Correct
                    </span>
                    <span className="ml-2 text-sm text-stone-600">
                      (Score: {((result.mtfDetails?.partialScore || 0) * 100).toFixed(0)}%)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-sage-500 to-sage-700 text-white font-bold text-sm font-mono rounded-full shadow-lg">
                    +{result.xpEarned} XP
                  </span>
                  {onReportError && (
                    <button
                      onClick={() => onReportError(question.id)}
                      className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Report an error"
                    >
                      <Flag className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {showExplanation && result.explanation && (
                <div className="mt-2 pt-2 border-t border-stone-200">
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {showFullExplanation || result.explanation.length <= 200
                      ? result.explanation
                      : `${result.explanation.slice(0, result.explanation.lastIndexOf(' ', 200))}...`}
                  </p>
                  {result.explanation.length > 200 && (
                    <button
                      onClick={() => setShowFullExplanation(!showFullExplanation)}
                      className="mt-1 text-sage-600 text-xs font-medium hover:underline"
                    >
                      {showFullExplanation ? 'Less' : 'More'}
                    </button>
                  )}
                </div>
              )}

              {!showExplanation && result.explanation && (
                <div className="mt-2 pt-2 border-t border-stone-200 flex items-center justify-between">
                  <p className="text-stone-600 text-xs">
                    Full explanation available with course enrollment
                  </p>
                  <a
                    href="/demo"
                    className="px-2.5 py-1 bg-sage-600 text-white text-xs font-medium rounded hover:bg-sage-700 transition-colors flex-shrink-0 ml-2"
                  >
                    Unlock Explanations
                  </a>
                </div>
              )}

              {result.streakUpdated && result.newStreak && (
                <div className="mt-3 flex items-center gap-2 p-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <span className="font-bold text-yellow-700 text-sm">
                      {result.newStreak} Day Streak!
                    </span>
                    <p className="text-yellow-600 text-xs">Keep it going!</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
