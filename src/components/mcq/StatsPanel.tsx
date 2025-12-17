'use client'

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
    <div className="bg-white rounded-xl shadow-lg p-4 sticky top-24">
      {/* Level & XP - Compact */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">{levelConfig.icon}</span>
            <div>
              <p className="text-xs text-gray-500">Level {currentLevel}</p>
              <p className="font-semibold text-sm text-gray-900">{levelConfig.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Total XP</p>
            <p className="font-bold text-sm text-blue-600">{totalXp.toLocaleString()}</p>
          </div>
        </div>

        {/* Progress Bar */}
        {nextLevel ? (
          <div className="mt-2">
            <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
              <span>Progress to Level {nextLevel.level}</span>
              <span>{Math.round(levelProgress)}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5">
              {Math.max(0, nextLevel.xpRequired - totalXp)} XP to {nextLevel.name}
            </p>
          </div>
        ) : (
          <div className="mt-2 text-center">
            <p className="text-[10px] text-purple-600 font-medium">Max Level Reached!</p>
          </div>
        )}
      </div>

      {/* Stats Grid - Compact */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {/* Streak */}
        <div className="bg-orange-50 rounded-lg p-2.5 text-center">
          <div className="text-xl mb-0.5">🔥</div>
          <p className="text-lg font-bold text-orange-600">{currentStreak}</p>
          <p className="text-[10px] text-orange-700">Day Streak</p>
        </div>

        {/* Accuracy */}
        <div className="bg-green-50 rounded-lg p-2.5 text-center">
          <div className="text-xl mb-0.5">🎯</div>
          <p className="text-lg font-bold text-green-600">{accuracy}%</p>
          <p className="text-[10px] text-green-700">Accuracy</p>
        </div>

        {/* Total Questions */}
        <div className="bg-blue-50 rounded-lg p-2.5 text-center">
          <div className="text-xl mb-0.5">📝</div>
          <p className="text-lg font-bold text-blue-600">{totalQuestions}</p>
          <p className="text-[10px] text-blue-700">Questions</p>
        </div>

        {/* Correct Answers */}
        <div className="bg-purple-50 rounded-lg p-2.5 text-center">
          <div className="text-xl mb-0.5">✅</div>
          <p className="text-lg font-bold text-purple-600">{correctAnswers}</p>
          <p className="text-[10px] text-purple-700">Correct</p>
        </div>
      </div>

      {/* Session Stats - Compact */}
      {sessionQuestions > 0 && (
        <div className="border-t pt-3">
          <h4 className="text-xs font-medium text-gray-500 mb-2">This Session</h4>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Questions</span>
            <span className="font-medium">{sessionQuestions}</span>
          </div>
          <div className="flex items-center justify-between text-xs mt-0.5">
            <span className="text-gray-600">Correct</span>
            <span className="font-medium text-green-600">{sessionCorrect}</span>
          </div>
          <div className="flex items-center justify-between text-xs mt-0.5">
            <span className="text-gray-600">Session Accuracy</span>
            <span className="font-medium">{sessionAccuracy}%</span>
          </div>
        </div>
      )}

      {/* Quick Actions - Consistent button style */}
      <div className="mt-4 space-y-2">
        <button
          onClick={() => router.push('/neet-biology-mcq/leaderboard')}
          className="w-full py-2 px-3 bg-white border-2 border-blue-500 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors text-xs flex items-center justify-center gap-2"
        >
          <span>🏆</span> View Leaderboard
        </button>
        <button
          onClick={() => router.push('/neet-biology-mcq/daily-challenge')}
          className="w-full py-2 px-3 bg-white border-2 border-amber-500 text-amber-600 rounded-lg font-medium hover:bg-amber-50 transition-colors text-xs flex items-center justify-center gap-2"
        >
          <span>🎯</span> Daily Challenge
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
