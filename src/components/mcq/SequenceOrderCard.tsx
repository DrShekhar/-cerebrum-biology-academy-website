'use client'

import { useState, useCallback, useEffect, useRef, useTransition } from 'react'
import { Flag } from 'lucide-react'
import type { MCQQuestion, AnswerResult } from '@/lib/mcq/types'
import { BookmarkButton } from './BookmarkButton'

interface SequenceOrderCardProps {
  question: MCQQuestion
  questionNumber: number
  onAnswer: (answer: string, timeSpent: number) => Promise<AnswerResult>
  showExplanation?: boolean
  isProtected?: boolean
  onSkip?: () => void
  onReportError?: (questionId: string) => void
  freeUserId?: string | null
}

const optionLabels = ['A', 'B', 'C', 'D'] as const

function parseSequenceItems(question: MCQQuestion): {
  prompt: string
  items: string[]
  choices: string[]
} {
  const text = question.question
  const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean)

  let prompt = ''
  const items: string[] = []

  for (const line of lines) {
    if (/^[\d]+[.)]\s/.test(line) || /^[-•]\s/.test(line) || /^[a-h][.)]\s/i.test(line)) {
      items.push(line.replace(/^[\d]+[.)]\s|^[-•]\s|^[a-h][.)]\s/i, ''))
    } else if (items.length === 0) {
      prompt = prompt ? `${prompt} ${line}` : line
    }
  }

  if (!prompt) {
    prompt = 'Arrange the following in correct sequence:'
  }

  return { prompt, items, choices: question.options }
}

export function SequenceOrderCard({
  question,
  questionNumber,
  onAnswer,
  showExplanation = false,
  isProtected = true,
  onSkip,
  onReportError,
  freeUserId,
}: SequenceOrderCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null)
  const [result, setResult] = useState<AnswerResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFullExplanation, setShowFullExplanation] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const startTimeRef = useRef<number>(Date.now())
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [, startTransition] = useTransition()

  const { prompt, items, choices } = parseSequenceItems(question)

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
        '1': 'A', '2': 'B', '3': 'C', '4': 'D',
        a: 'A', b: 'B', c: 'C', d: 'D',
      }
      const option = keyMap[e.key.toLowerCase()]
      if (option) { e.preventDefault(); handleOptionClick(option) }
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
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Sequence Order
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

      <div className="mb-4">
        <p className="text-lg text-ink leading-relaxed font-medium mb-3">{prompt}</p>
        {items.length > 0 && (
          <div className="space-y-2 p-3 rounded-lg bg-blue-50/40 border border-blue-200/50">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-1">
                <span className="flex-shrink-0 w-6 h-6 rounded bg-blue-200 text-blue-800 flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <p className="text-sm text-ink leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        )}
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
            <kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-600 font-mono text-xs">1-4</kbd>{' '}
            or{' '}
            <kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-600 font-mono text-xs">A-D</kbd>{' '}
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
