'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import type {
  DailyChallenge as DailyChallengeType,
  MCQQuestion,
  DailyChallengeResult,
} from '@/lib/mcq/types'

interface DailyChallengeProps {
  freeUserId?: string
  onRequireLogin?: () => void
}

type ChallengeState = 'loading' | 'ready' | 'active' | 'completed' | 'error'

export function DailyChallenge({ freeUserId, onRequireLogin }: DailyChallengeProps) {
  const [state, setState] = useState<ChallengeState>('loading')
  const [challenge, setChallenge] = useState<DailyChallengeType | null>(null)
  const [questions, setQuestions] = useState<MCQQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({})
  const [timeStarted, setTimeStarted] = useState<number>(0)
  const [result, setResult] = useState<DailyChallengeResult | null>(null)
  const [isAlreadyCompleted, setIsAlreadyCompleted] = useState(false)

  const fetchChallenge = useCallback(async () => {
    setState('loading')
    try {
      const params = freeUserId ? `?freeUserId=${freeUserId}` : ''
      const response = await fetch(`/api/mcq/daily-challenge${params}`)

      if (!response.ok) throw new Error('Failed to fetch challenge')

      const data = await response.json()
      setChallenge(data)

      if (data.userCompletion?.completed) {
        setIsAlreadyCompleted(true)
        setState('completed')
      } else {
        setState('ready')
      }
    } catch (error) {
      console.error('Error fetching challenge:', error)
      setState('error')
    }
  }, [freeUserId])

  useEffect(() => {
    fetchChallenge()
  }, [fetchChallenge])

  const startChallenge = async () => {
    if (!freeUserId) {
      onRequireLogin?.()
      return
    }

    if (!challenge) return

    // Fetch the questions
    try {
      const questionIds = challenge.questionIds.join(',')
      const response = await fetch(`/api/mcq/questions?ids=${questionIds}`)

      if (!response.ok) throw new Error('Failed to fetch questions')

      const data = await response.json()
      setQuestions(data.questions)
      setTimeStarted(Date.now())
      setState('active')
    } catch (error) {
      console.error('Error starting challenge:', error)
      setState('error')
    }
  }

  const handleAnswer = useCallback(
    (questionId: string, answer: 'A' | 'B' | 'C' | 'D') => {
      setAnswers((prev) => ({ ...prev, [questionId]: answer }))

      // Auto-advance after a brief delay
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1)
        }
      }, 500)
    },
    [currentQuestionIndex, questions.length]
  )

  const submitChallenge = async () => {
    if (!challenge || !freeUserId) return

    // Calculate score
    let score = 0
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score++
      }
    })

    const timeSpent = Math.round((Date.now() - timeStarted) / 1000)

    try {
      const response = await fetch('/api/mcq/daily-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId: challenge.id,
          freeUserId,
          score,
          totalQuestions: questions.length,
          timeSpent,
        }),
      })

      if (!response.ok) throw new Error('Failed to submit')

      const resultData = await response.json()
      setResult(resultData)
      setState('completed')
    } catch (error) {
      console.error('Error submitting challenge:', error)
    }
  }

  const allAnswered = questions.length > 0 && Object.keys(answers).length === questions.length

  // Loading state
  if (state === 'loading') {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto" />
        <p className="mt-4 text-gray-600">Loading today&apos;s challenge...</p>
      </div>
    )
  }

  // Error state
  if (state === 'error') {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <p className="text-4xl mb-4">😕</p>
        <p className="text-gray-600">Failed to load challenge</p>
        <button onClick={fetchChallenge} className="mt-4 text-blue-600 hover:underline">
          Try again
        </button>
      </div>
    )
  }

  // Ready state - show challenge card
  if (state === 'ready' && challenge) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-indigo-500 rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🎯</span>
            <div>
              <h2 className="text-2xl font-bold">Daily Challenge</h2>
              <p className="text-purple-200">{formatDate(challenge.date)}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 my-6">
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold">{challenge.questionCount}</p>
              <p className="text-xs text-purple-200">Questions</p>
            </div>
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold">{challenge.xpReward}</p>
              <p className="text-xs text-purple-200">XP Reward</p>
            </div>
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold">{challenge.participantCount}</p>
              <p className="text-xs text-purple-200">Participants</p>
            </div>
          </div>

          {challenge.topic && (
            <p className="text-purple-200 mb-4">
              Today&apos;s Topic: <span className="text-white font-medium">{challenge.topic}</span>
            </p>
          )}

          <div className="bg-yellow-400/20 rounded-lg p-3 mb-6">
            <p className="text-yellow-200 text-sm">
              <span className="text-yellow-400 font-bold">+{challenge.bonusXp} Bonus XP</span> for
              perfect score!
            </p>
          </div>

          <button
            onClick={startChallenge}
            className="w-full py-3 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors"
          >
            {freeUserId ? 'Start Challenge' : 'Register to Participate'}
          </button>
        </div>

        <div className="bg-white/10 p-4 text-center text-purple-200 text-sm">
          New challenge available every day at midnight
        </div>
      </motion.div>
    )
  }

  // Active state - show questions
  if (state === 'active' && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex]

    return (
      <div className="space-y-4">
        {/* Progress bar */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Object.keys(answers).length}/{questions.length} answered
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            {currentQuestion.isPYQ && (
              <span className="px-2 py-1 bg-amber-100 text-yellow-700 text-xs rounded-full">
                PYQ {currentQuestion.pyqYear}
              </span>
            )}
            <span className="text-xs text-gray-500">{currentQuestion.topic}</span>
          </div>

          <p className="text-lg text-gray-800 mb-6">{currentQuestion.question}</p>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const optionLabel = ['A', 'B', 'C', 'D'][index] as 'A' | 'B' | 'C' | 'D'
              const isSelected = answers[currentQuestion.id] === optionLabel

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(currentQuestion.id, optionLabel)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {optionLabel}
                  </span>
                  <span className="text-left text-gray-700">{option}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium ${
                  index === currentQuestionIndex
                    ? 'bg-blue-600 text-white'
                    : answers[questions[index].id]
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              Next
            </button>
          ) : (
            <button
              onClick={submitChallenge}
              disabled={!allAnswered}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    )
  }

  // Completed state
  if (state === 'completed') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div
          className={`p-8 text-center ${
            result?.isPerfect || isAlreadyCompleted
              ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
              : 'bg-indigo-500'
          } text-white`}
        >
          <p className="text-6xl mb-4">
            {result?.isPerfect ? '🏆' : isAlreadyCompleted ? '✅' : '🎉'}
          </p>
          <h2 className="text-2xl font-bold mb-2">
            {isAlreadyCompleted
              ? 'Challenge Already Completed!'
              : result?.isPerfect
                ? 'Perfect Score!'
                : 'Challenge Complete!'}
          </h2>
          {result && !isAlreadyCompleted && (
            <p className="text-lg opacity-90">
              You scored {result.score}/{result.totalQuestions}
            </p>
          )}
        </div>

        {result && !isAlreadyCompleted && (
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">+{result.xpEarned}</p>
                <p className="text-sm text-gray-500">XP Earned</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">
                  {Math.round((result.score / result.totalQuestions) * 100)}%
                </p>
                <p className="text-sm text-gray-500">Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">#{result.rank}</p>
                <p className="text-sm text-gray-500">Today&apos;s Rank</p>
              </div>
            </div>

            {result.isPerfect && (
              <div className="bg-yellow-50 rounded-xl p-4 text-center mb-4">
                <p className="text-yellow-700">
                  <span className="font-bold">Perfect Score Bonus!</span> You earned an extra{' '}
                  {challenge?.bonusXp} XP
                </p>
              </div>
            )}
          </div>
        )}

        <div className="p-4 border-t text-center">
          <p className="text-gray-500 text-sm">Come back tomorrow for a new challenge!</p>
        </div>
      </motion.div>
    )
  }

  return null
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Widget version for sidebar
export function DailyChallengeWidget({ freeUserId, onRequireLogin }: DailyChallengeProps) {
  const [challenge, setChallenge] = useState<DailyChallengeType | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    fetchChallenge()
  }, [freeUserId])

  const fetchChallenge = async () => {
    try {
      const params = freeUserId ? `?freeUserId=${freeUserId}` : ''
      const response = await fetch(`/api/mcq/daily-challenge${params}`)
      if (response.ok) {
        const data = await response.json()
        setChallenge(data)
        setIsCompleted(data.userCompletion?.completed || false)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (!challenge) return null

  return (
    <div
      className={`rounded-xl p-4 ${
        isCompleted
          ? 'bg-green-50 border border-green-200'
          : 'bg-purple-50 border border-purple-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{isCompleted ? '✅' : '🎯'}</span>
        <div className="flex-1">
          <p className="font-medium text-gray-800">Daily Challenge</p>
          <p className="text-sm text-gray-500">
            {isCompleted ? 'Completed!' : `${challenge.xpReward} XP reward`}
          </p>
        </div>
        {!isCompleted && (
          <a
            href="/neet-biology-mcq/daily-challenge"
            className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700"
          >
            Play
          </a>
        )}
      </div>
    </div>
  )
}
