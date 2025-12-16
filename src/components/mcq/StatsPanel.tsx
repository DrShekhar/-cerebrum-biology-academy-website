'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { LEVEL_CONFIG } from '@/lib/mcq/types'

interface StatsPanelProps {
  totalXp: number
  currentLevel: number
  levelProgress: number
  currentStreak: number
  accuracy: number
  totalQuestions: number
  correctAnswers: number
  sessionQuestions?: number
  sessionCorrect?: number
}

export function StatsPanel({
  totalXp,
  currentLevel,
  levelProgress,
  currentStreak,
  accuracy,
  totalQuestions,
  correctAnswers,
  sessionQuestions = 0,
  sessionCorrect = 0,
}: StatsPanelProps) {
  const router = useRouter()
  const levelConfig = LEVEL_CONFIG.find((l) => l.level === currentLevel) || LEVEL_CONFIG[0]
  const nextLevel = LEVEL_CONFIG.find((l) => l.level === currentLevel + 1)

  const sessionAccuracy =
    sessionQuestions > 0 ? Math.round((sessionCorrect / sessionQuestions) * 100) : 0

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
      {/* Level & XP */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{levelConfig.icon}</span>
            <div>
              <p className="text-sm text-gray-500">Level {currentLevel}</p>
              <p className="font-bold text-gray-900">{levelConfig.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total XP</p>
            <p className="font-bold text-blue-600">{totalXp.toLocaleString()}</p>
          </div>
        </div>

        {/* Progress Bar */}
        {nextLevel && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress to Level {nextLevel.level}</span>
              <span>{Math.round(levelProgress)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {nextLevel.xpRequired - totalXp} XP to {nextLevel.name}
            </p>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Streak */}
        <div className="bg-orange-50 rounded-xl p-4 text-center">
          <div className="text-3xl mb-1">🔥</div>
          <p className="text-2xl font-bold text-orange-600">{currentStreak}</p>
          <p className="text-xs text-orange-700">Day Streak</p>
        </div>

        {/* Accuracy */}
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <div className="text-3xl mb-1">🎯</div>
          <p className="text-2xl font-bold text-green-600">{accuracy}%</p>
          <p className="text-xs text-green-700">Accuracy</p>
        </div>

        {/* Total Questions */}
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <div className="text-3xl mb-1">📝</div>
          <p className="text-2xl font-bold text-blue-600">{totalQuestions}</p>
          <p className="text-xs text-blue-700">Questions</p>
        </div>

        {/* Correct Answers */}
        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <div className="text-3xl mb-1">✅</div>
          <p className="text-2xl font-bold text-purple-600">{correctAnswers}</p>
          <p className="text-xs text-purple-700">Correct</p>
        </div>
      </div>

      {/* Session Stats */}
      {sessionQuestions > 0 && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-500 mb-3">This Session</h4>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Questions</span>
            <span className="font-medium">{sessionQuestions}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-600">Correct</span>
            <span className="font-medium text-green-600">{sessionCorrect}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-600">Session Accuracy</span>
            <span className="font-medium">{sessionAccuracy}%</span>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 space-y-2">
        <button
          onClick={() => router.push('/neet-biology-mcq/leaderboard')}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
        >
          View Leaderboard
        </button>
        <button
          onClick={() => router.push('/neet-biology-mcq/daily-challenge')}
          className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
        >
          Daily Challenge
        </button>
      </div>
    </div>
  )
}

// Compact version for mobile
export function StatsPanelCompact({
  totalXp,
  currentLevel,
  currentStreak,
  sessionQuestions = 0,
  sessionCorrect = 0,
}: Omit<StatsPanelProps, 'levelProgress' | 'accuracy' | 'totalQuestions' | 'correctAnswers'>) {
  const levelConfig = LEVEL_CONFIG.find((l) => l.level === currentLevel) || LEVEL_CONFIG[0]
  const sessionAccuracy =
    sessionQuestions > 0 ? Math.round((sessionCorrect / sessionQuestions) * 100) : 0

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
      {/* Level */}
      <div className="flex items-center gap-2">
        <span className="text-xl">{levelConfig.icon}</span>
        <div>
          <p className="text-xs text-gray-500">Lv.{currentLevel}</p>
          <p className="font-bold text-sm text-blue-600">{totalXp} XP</p>
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-1">
        <span className="text-lg">🔥</span>
        <span className="font-bold text-orange-600">{currentStreak}</span>
      </div>

      {/* Session */}
      <div className="text-center">
        <p className="text-xs text-gray-500">Session</p>
        <p className="font-medium text-sm">
          {sessionCorrect}/{sessionQuestions}
          {sessionQuestions > 0 && <span className="text-gray-400 ml-1">({sessionAccuracy}%)</span>}
        </p>
      </div>
    </div>
  )
}
