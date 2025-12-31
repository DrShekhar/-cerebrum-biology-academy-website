'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Trophy,
  Target,
  Zap,
  Clock,
  TrendingUp,
  RotateCcw,
  Home,
  ArrowRight,
  BookX,
} from 'lucide-react'
import { WrongAnswersReview, type WrongAnswer } from './WrongAnswersReview'

interface SessionSummaryProps {
  questionsAttempted: number
  correctAnswers: number
  xpEarned: number
  totalTimeSeconds?: number
  onContinue: () => void
  onNewSession: () => void
  wrongAnswers?: WrongAnswer[]
}

export function SessionSummary({
  questionsAttempted,
  correctAnswers,
  xpEarned,
  totalTimeSeconds = 0,
  onContinue,
  onNewSession,
  wrongAnswers = [],
}: SessionSummaryProps) {
  const router = useRouter()
  const [showWrongAnswersReview, setShowWrongAnswersReview] = useState(false)
  const accuracy =
    questionsAttempted > 0 ? Math.round((correctAnswers / questionsAttempted) * 100) : 0
  const wrongCount = questionsAttempted - correctAnswers

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    if (mins >= 60) {
      const hrs = Math.floor(mins / 60)
      const remainingMins = mins % 60
      return `${hrs}h ${remainingMins}m`
    }
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
  }

  // Performance message based on accuracy
  const getPerformanceMessage = () => {
    if (accuracy >= 90) return { emoji: '🏆', text: 'Outstanding!', color: 'text-yellow-600' }
    if (accuracy >= 75) return { emoji: '🌟', text: 'Excellent!', color: 'text-green-600' }
    if (accuracy >= 60) return { emoji: '👍', text: 'Good job!', color: 'text-blue-600' }
    if (accuracy >= 40) return { emoji: '💪', text: 'Keep practicing!', color: 'text-orange-600' }
    return { emoji: '📚', text: 'More practice needed', color: 'text-red-600' }
  }

  const performance = getPerformanceMessage()

  // Avg time per question
  const avgTimePerQuestion =
    questionsAttempted > 0 ? Math.round(totalTimeSeconds / questionsAttempted) : 0

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-lg mx-auto animate-scale-in">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-5xl mb-3 animate-confetti-burst inline-block">{performance.emoji}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Session Complete!</h2>
        <p className={`text-lg font-medium ${performance.color}`}>{performance.text}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Questions */}
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-blue-600 mb-1">
            <Target className="w-4 h-4" />
            <span className="text-xs font-medium">Questions</span>
          </div>
          <p className="text-2xl font-bold text-blue-700">{questionsAttempted}</p>
        </div>

        {/* Correct */}
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-green-600 mb-1">
            <Trophy className="w-4 h-4" />
            <span className="text-xs font-medium">Correct</span>
          </div>
          <p className="text-2xl font-bold text-green-700">{correctAnswers}</p>
        </div>

        {/* Accuracy */}
        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-purple-600 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-medium">Accuracy</span>
          </div>
          <p className="text-2xl font-bold text-purple-700">{accuracy}%</p>
        </div>

        {/* XP Earned */}
        <div className="bg-amber-50 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-yellow-600 mb-1">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-medium">XP Earned</span>
          </div>
          <p className="text-2xl font-bold text-yellow-700">+{xpEarned}</p>
        </div>
      </div>

      {/* Time Stats */}
      {totalTimeSeconds > 0 && (
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Total Time</span>
            </div>
            <span className="font-semibold text-gray-800">{formatTime(totalTimeSeconds)}</span>
          </div>
          {avgTimePerQuestion > 0 && (
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
              <span className="text-sm text-gray-500">Avg. per question</span>
              <span className="text-sm font-medium text-gray-700">{avgTimePerQuestion}s</span>
            </div>
          )}
        </div>
      )}

      {/* Accuracy Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-gray-600">Session Accuracy</span>
          <span className="font-medium text-gray-800">{accuracy}%</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              accuracy >= 75
                ? 'bg-green-600'
                : accuracy >= 50
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                  : 'bg-red-600'
            }`}
            style={{ width: `${accuracy}%` }}
          />
        </div>
      </div>

      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-green-50 to-green-50 rounded-xl p-4 mb-6 text-center border border-green-200">
        <p className="text-sm text-green-700">
          {accuracy >= 75
            ? '🎯 Great accuracy! Keep this momentum going!'
            : accuracy >= 50
              ? "📈 You're improving! Review wrong answers to boost accuracy."
              : '💡 Tip: Read explanations carefully to understand concepts better.'}
        </p>
      </div>

      {/* Review Wrong Answers Button */}
      {wrongCount > 0 && wrongAnswers.length > 0 && (
        <button
          onClick={() => setShowWrongAnswersReview(true)}
          className="w-full bg-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 mb-4"
        >
          <BookX className="w-5 h-5" />
          Review {wrongCount} Wrong Answer{wrongCount > 1 ? 's' : ''}
        </button>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onContinue}
          className="w-full bg-[#4a5d4a] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          Continue Practicing
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex gap-3">
          <button
            onClick={onNewSession}
            className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            New Session
          </button>
          <button
            onClick={() => router.push('/neet-biology-mcq/leaderboard')}
            className="flex-1 bg-white border-2 border-blue-200 text-blue-600 py-2.5 px-4 rounded-xl font-medium hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            Leaderboard
          </button>
        </div>

        <button
          onClick={() => router.push('/')}
          className="w-full text-gray-500 py-2 text-sm hover:text-gray-700 transition-colors flex items-center justify-center gap-1"
        >
          <Home className="w-3.5 h-3.5" />
          Back to Home
        </button>
      </div>

      {/* Wrong Answers Review Modal */}
      {showWrongAnswersReview && (
        <WrongAnswersReview
          wrongAnswers={wrongAnswers}
          onClose={() => setShowWrongAnswersReview(false)}
        />
      )}
    </div>
  )
}
