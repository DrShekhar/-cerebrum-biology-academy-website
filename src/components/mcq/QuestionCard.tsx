'use client'

import { useState, useCallback, useEffect, useRef, useTransition } from 'react'
import { Flag } from 'lucide-react'
import type { MCQQuestion, AnswerResult } from '@/lib/mcq/types'
import { DiagramQuestion } from './DiagramQuestion'
import { BookmarkButton } from './BookmarkButton'

interface QuestionCardProps {
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

export function QuestionCard({
  question,
  questionNumber,
  onAnswer,
  showExplanation = false,
  isProtected = true,
  onSkip,
  onReportError,
  freeUserId,
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null)
  const [result, setResult] = useState<AnswerResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFullExplanation, setShowFullExplanation] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const startTimeRef = useRef<number>(Date.now())
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [isPending, startTransition] = useTransition()

  // Handle option click
  const handleOptionClick = useCallback(
    (option: 'A' | 'B' | 'C' | 'D') => {
      if (selectedAnswer || isSubmitting) return

      // Calculate actual time spent
      const actualTimeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000)

      // Stop the timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      // Update UI immediately for instant feedback (improves INP)
      setSelectedAnswer(option)
      setIsSubmitting(true)

      // Defer heavy API call to avoid blocking paint
      startTransition(() => {
        onAnswer(option, actualTimeSpent)
          .then((answerResult) => {
            setResult(answerResult)
          })
          .catch((error) => {
            console.error('Error submitting answer:', error)
            setSelectedAnswer(null)
          })
          .finally(() => {
            setIsSubmitting(false)
          })
      })
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
      return `${baseClasses} border-stone-200 bg-white hover:border-sage-400 hover:bg-sage-50 hover:shadow-sm`
    }

    if (result) {
      if (option === result.correctAnswer) {
        return `${baseClasses} border-green-600 bg-gradient-to-r from-green-50 to-green-50 shadow-md animate-correct-pulse-botanical`
      }
      if (option === selectedAnswer && !result.isCorrect) {
        return `${baseClasses} border-coral-500 bg-gradient-to-r from-coral-50 to-red-50 shadow-sm animate-shake-wrong`
      }
    }

    // Non-selected options after answer - keep visible but muted
    return `${baseClasses} border-stone-200 bg-stone-50 opacity-70 cursor-default`
  }

  return (
    <div
      className={`bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-stone-200/50 p-4 animate-fade-in-up paper-texture ${isProtected ? 'select-none' : ''}`}
      onContextMenu={isProtected ? (e) => e.preventDefault() : undefined}
      role="article"
      aria-label={`Question ${questionNumber}`}
    >
      {/* Question Header - Botanical Scholar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sage-100 text-sage-700 font-bold text-xs font-mono">
            {questionNumber}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${
              question.difficulty === 'EASY'
                ? 'bg-green-100 text-green-700'
                : question.difficulty === 'HARD'
                  ? 'bg-coral-100 text-coral-700'
                  : 'bg-amber-100 text-yellow-700'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                question.difficulty === 'EASY'
                  ? 'bg-green-600'
                  : question.difficulty === 'HARD'
                    ? 'bg-coral-500'
                    : 'bg-amber-500'
              }`}
            />
            {question.difficulty}
          </span>
          {question.isPYQ && question.pyqYear && (
            <span className="px-2 py-0.5 rounded-full bg-specimen-100 text-specimen-700 text-xs font-medium">
              📜 PYQ {question.pyqYear}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium font-mono ${
              !selectedAnswer ? 'bg-stone-100 text-stone-600' : 'bg-stone-50 text-stone-400'
            }`}
            aria-label={`Time spent: ${formatTime(timeElapsed)}`}
          >
            <span className="text-base">⏱️</span>
            <span className="font-semibold tabular-nums">{formatTime(timeElapsed)}</span>
          </div>
          {freeUserId && <BookmarkButton questionId={question.id} freeUserId={freeUserId} />}
          {!selectedAnswer && onSkip && (
            <button
              onClick={onSkip}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
              aria-label="Skip this question"
            >
              Skip →
            </button>
          )}
        </div>
      </div>
      {/* Topic & NCERT Reference - Botanical Scholar */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-sage-50 text-sage-700 text-sm font-medium border border-sage-200/50">
          {question.topic}
        </span>
        {question.isNcertBased && (question.ncertClass || question.ncertChapter) && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-sage-50/80 to-stone-50 border border-sage-200/50 text-sage-700 text-xs font-medium">
            <span>📖</span>
            <span>
              {question.ncertClass && `Class ${question.ncertClass}`}
              {question.ncertClass && question.ncertChapter && ' • '}
              {question.ncertChapter && `Ch.${question.ncertChapter}`}
              {question.ncertPage && ` • Pg.${question.ncertPage}`}
            </span>
          </span>
        )}
        {question.isNeetImportant && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-yellow-700 text-xs font-medium">
            <span className="text-amber-500">★</span>
            NEET Important
          </span>
        )}
      </div>

      {/* Diagram Display (if question has diagrams) */}
      {question.diagrams && question.diagrams.length > 0 && (
        <div className="mb-4">
          {question.diagrams
            .filter((d) => d.position === 'above' || d.position === 'inline')
            .map((diagram) => (
              <DiagramQuestion key={diagram.id} diagram={diagram} />
            ))}
        </div>
      )}

      {/* Question Text - Botanical Scholar */}
      <div className="mb-5">
        <p className="text-lg text-ink leading-relaxed font-medium">{question.question}</p>
      </div>

      {/* Side-positioned diagrams */}
      {question.diagrams && question.diagrams.some((d) => d.position === 'side') && (
        <div className="float-right ml-4 mb-4 w-1/2 max-w-xs">
          {question.diagrams
            .filter((d) => d.position === 'side')
            .map((diagram) => (
              <DiagramQuestion key={diagram.id} diagram={diagram} />
            ))}
        </div>
      )}

      {/* Options - Botanical Scholar */}
      <div className="space-y-3" role="radiogroup" aria-label="Answer options">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(optionLabels[index])}
            disabled={!!selectedAnswer || isSubmitting}
            className={`${getOptionClassName(index)} w-full ${!selectedAnswer ? 'hover:scale-[1.01] active:scale-[0.99]' : ''}`}
            role="radio"
            aria-checked={selectedAnswer === optionLabels[index]}
            aria-label={`Option ${optionLabels[index]}: ${option}. Press ${index + 1} to select.`}
          >
            <span
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm font-mono transition-colors ${
                result && optionLabels[index] === result.correctAnswer
                  ? 'bg-green-600 text-white shadow-md'
                  : result && optionLabels[index] === selectedAnswer && !result.isCorrect
                    ? 'bg-coral-500 text-white shadow-md'
                    : selectedAnswer === optionLabels[index]
                      ? 'bg-sage-500 text-white shadow-md'
                      : 'bg-stone-100 text-stone-700'
              }`}
              aria-hidden="true"
            >
              {optionLabels[index]}
            </span>
            <span className="text-left text-ink text-base flex-1">{option}</span>
            {result && optionLabels[index] === result.correctAnswer && (
              <span className="text-green-600 text-lg font-bold" aria-label="Correct answer">
                ✓
              </span>
            )}
            {result && optionLabels[index] === selectedAnswer && !result.isCorrect && (
              <span className="text-coral-500 text-lg font-bold" aria-label="Incorrect">
                ✗
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Keyboard Shortcut Hint - Botanical Scholar */}
      {!selectedAnswer && !isSubmitting && (
        <div className="flex items-center justify-center gap-2 mt-3 text-stone-400">
          <span className="text-xs">⌨️</span>
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

      {/* Result Feedback - Botanical Scholar */}
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
                  : 'bg-gradient-to-r from-coral-50 to-red-50 border-2 border-coral-300 animate-shake-wrong'
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
                    className={`font-bold text-base ${result.isCorrect ? 'text-green-700' : 'text-coral-700'}`}
                  >
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
                      className="p-1.5 text-stone-400 hover:text-coral-500 hover:bg-coral-50 rounded-full transition-colors"
                      title="Report an error with this question"
                      aria-label="Report error"
                    >
                      <Flag className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Explanation Preview - Botanical Scholar */}
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

              {/* Streak Update - Botanical Scholar */}
              {result.streakUpdated && result.newStreak && (
                <div className="mt-3 flex items-center gap-2 p-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200 animate-fade-in-up">
                  <span className="text-2xl animate-streak-glow-botanical">🔥</span>
                  <div>
                    <span className="font-bold text-yellow-700 text-sm">
                      {result.newStreak} Day Streak!
                    </span>
                    <p className="text-yellow-600 text-xs">Keep it going!</p>
                  </div>
                </div>
              )}

              {/* Badge Unlocked - Botanical Scholar */}
              {result.badgesUnlocked && result.badgesUnlocked.length > 0 && (
                <div className="mt-3 space-y-2">
                  {result.badgesUnlocked.map((badge, idx) => (
                    <div
                      key={badge.code}
                      className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-300 animate-scale-in shadow-sm"
                      style={{ animationDelay: `${idx * 150}ms` }}
                    >
                      <span className="text-2xl animate-confetti-burst">{badge.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-yellow-800 text-sm">🏆 Badge Unlocked!</p>
                        <p className="text-yellow-700 text-xs">{badge.name}</p>
                      </div>
                      <span className="px-2 py-1 bg-amber-200 text-yellow-800 font-bold text-xs font-mono rounded-full">
                        +{badge.xpReward} XP
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Level Up - Botanical Scholar */}
              {result.levelUp && (
                <div className="mt-3 p-3 bg-gradient-to-r from-specimen-100 to-purple-100 rounded-lg border-2 border-specimen-300 text-center animate-scale-in">
                  <span className="text-3xl animate-confetti-burst inline-block">🎊</span>
                  <p className="font-bold text-specimen-800 text-base mt-1">Level Up!</p>
                  <p className="text-specimen-600 text-sm">
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
