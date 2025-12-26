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
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-stone-200/50 p-4 sticky top-24 paper-texture">
      {/* Level Card - Botanical Scholar */}
      <div className="mb-4 bg-gradient-to-br from-sage-50 to-stone-50 rounded-xl p-3 border border-sage-200/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{levelConfig.icon}</span>
            <div>
              <p className="text-xs text-stone-600 font-medium">Level {currentLevel}</p>
              <p className="font-semibold text-sm text-ink">{levelConfig.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-stone-600">Total XP</p>
            <p className="font-bold text-sm font-mono text-sage-600">{totalXp.toLocaleString()}</p>
          </div>
        </div>

        {/* Progress Bar - Botanical */}
        {nextLevel ? (
          <div className="mt-2">
            <div className="flex justify-between text-[10px] text-stone-600 mb-0.5">
              <span>Progress to Level {nextLevel.level}</span>
              <span className="font-mono">{Math.round(levelProgress)}%</span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sage-400 to-sage-600 rounded-full transition-all duration-500 ease-out animate-progress-fill"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
            <p className="text-[10px] text-stone-400 mt-1 font-mono">
              {Math.max(0, nextLevel.xpRequired - totalXp)} XP to {nextLevel.name}
            </p>
          </div>
        ) : (
          <div className="mt-2 text-center">
            <p className="text-[10px] text-specimen-600 font-medium">🎊 Max Level Reached!</p>
          </div>
        )}
      </div>

      {/* Stats Grid - Botanical Scholar */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {/* Streak */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-2.5 text-center border border-amber-200/50">
          <div className="text-xl mb-0.5">🔥</div>
          <p className="text-lg font-bold font-mono text-amber-600">{currentStreak}</p>
          <p className="text-[10px] text-amber-700 font-medium">Day Streak</p>
        </div>

        {/* Accuracy */}
        <div className="bg-gradient-to-br from-green-50 to-green-50 rounded-lg p-2.5 text-center border border-green-200/50">
          <div className="text-xl mb-0.5">🎯</div>
          <p className="text-lg font-bold font-mono text-green-600">{accuracy}%</p>
          <p className="text-[10px] text-green-700 font-medium">Accuracy</p>
        </div>

        {/* Total Questions */}
        <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-lg p-2.5 text-center border border-sky-200/50">
          <div className="text-xl mb-0.5">📝</div>
          <p className="text-lg font-bold font-mono text-sky-600">{totalQuestions}</p>
          <p className="text-[10px] text-sky-700 font-medium">Questions</p>
        </div>

        {/* Correct Answers */}
        <div className="bg-gradient-to-br from-specimen-50 to-purple-50 rounded-lg p-2.5 text-center border border-specimen-200/50">
          <div className="text-xl mb-0.5">✅</div>
          <p className="text-lg font-bold font-mono text-specimen-600">{correctAnswers}</p>
          <p className="text-[10px] text-specimen-700 font-medium">Correct</p>
        </div>
      </div>

      {/* Session Stats - Botanical Scholar */}
      {sessionQuestions > 0 && (
        <div className="border-t border-dashed border-stone-200 pt-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
              This Session
            </span>
            <div className="h-px flex-1 bg-stone-200" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-600">Questions</span>
              <span className="font-medium font-mono">{sessionQuestions}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-600">Correct</span>
              <span className="font-medium font-mono text-green-600">{sessionCorrect}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-600">Session Accuracy</span>
              <span className="font-medium font-mono">{sessionAccuracy}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions - Botanical Scholar */}
      <div className="mt-4 space-y-2">
        <button
          onClick={() => router.push('/neet-biology-mcq/leaderboard')}
          className="w-full py-2 px-3 bg-white border-2 border-sage-400 text-sage-700 rounded-lg font-medium hover:bg-sage-50 hover:border-sage-500 transition-colors text-xs flex items-center justify-center gap-2"
        >
          <span>🏆</span> View Leaderboard
        </button>
        <button
          onClick={() => router.push('/neet-biology-mcq/daily-challenge')}
          className="w-full py-2 px-3 bg-white border-2 border-amber-400 text-amber-700 rounded-lg font-medium hover:bg-amber-50 hover:border-amber-500 transition-colors text-xs flex items-center justify-center gap-2"
        >
          <span>🎯</span> Daily Challenge
        </button>
      </div>
    </div>
  )
}

// Compact version for mobile - Botanical Scholar
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
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-stone-200/50 p-4 flex items-center justify-between">
      {/* Level */}
      <div className="flex items-center gap-2">
        <span className="text-xl">{levelConfig.icon}</span>
        <div>
          <p className="text-xs text-stone-600">Lv.{currentLevel}</p>
          <p className="font-bold text-sm font-mono text-sage-600">{totalXp} XP</p>
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-1">
        <span className="text-lg">🔥</span>
        <span className="font-bold font-mono text-amber-600">{currentStreak}</span>
      </div>

      {/* Session */}
      <div className="text-center">
        <p className="text-xs text-stone-600">Session</p>
        <p className="font-medium text-sm font-mono">
          {sessionCorrect}/{sessionQuestions}
          {sessionQuestions > 0 && (
            <span className="text-stone-400 ml-1">({sessionAccuracy}%)</span>
          )}
        </p>
      </div>
    </div>
  )
}
