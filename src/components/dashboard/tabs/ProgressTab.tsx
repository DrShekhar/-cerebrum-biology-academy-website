'use client'

import React from 'react'
import { TrendingUp, Target, Award, Clock, BarChart3, ArrowUp, ArrowDown } from 'lucide-react'
import { XPProgressCard } from '@/components/gamification/XPProgressCard'

interface StudySession {
  id: string
  subject: string
  chapter: string
  duration: number
  score?: number
  date: string
  type: 'study' | 'practice' | 'test'
}

interface WeakArea {
  chapter: string
  topic: string
  difficulty: 'low' | 'medium' | 'high'
  improvement: number
  recommendedStudyTime: number
}

interface NEETProgress {
  currentScore: number
  targetScore: number
  improvement: number
  rank: number
  percentile: number
  strongAreas: string[]
  weakAreas: WeakArea[]
}

interface GamificationStats {
  totalPoints: number
  currentLevel: number
  xpInCurrentLevel: number
  xpNeededForNextLevel: number
  levelProgress: number
  studyStreak: number
  longestStreak: number
  streakMilestone: { days: number; reward: number }
  recentAchievements: unknown[]
  inProgressAchievements: unknown[]
  totalAchievements: number
  completedAchievements: number
}

interface GamificationData {
  gamification: GamificationStats
}

interface ProgressTabProps {
  neetProgress: NEETProgress
  recentSessions: StudySession[]
  gamificationData: GamificationData | null
  totalStudyTime: number
  averageScore: number
  testsCompleted: number
}

function ScoreTrendChart({ sessions }: { sessions: StudySession[] }) {
  const scoreSessions = sessions
    .filter((s) => s.score !== undefined && s.score > 0)
    .slice(0, 10)
    .reverse()

  if (scoreSessions.length < 2) {
    return (
      <div className="text-center py-8">
        <BarChart3 className="w-10 h-10 text-gray-300 mx-auto mb-2" />
        <p className="text-gray-500 text-sm">Take more tests to see your score trend</p>
      </div>
    )
  }

  const maxScore = Math.max(...scoreSessions.map((s) => s.score || 0), 100)
  const chartHeight = 160

  return (
    <div className="relative">
      <div className="flex items-end gap-1.5 sm:gap-2 justify-center" style={{ height: chartHeight }}>
        {scoreSessions.map((session, idx) => {
          const score = session.score || 0
          const barHeight = Math.max((score / maxScore) * chartHeight * 0.85, 8)
          const prevScore = idx > 0 ? scoreSessions[idx - 1].score || 0 : score
          const isUp = score >= prevScore

          return (
            <div
              key={session.id}
              className="flex flex-col items-center gap-1 flex-1 max-w-[48px]"
            >
              <span className="text-[10px] sm:text-xs font-medium text-gray-700">{score}%</span>
              <div
                className={`w-full rounded-t-md transition-all duration-500 ${
                  isUp
                    ? 'bg-gradient-to-t from-green-500 to-green-400'
                    : 'bg-gradient-to-t from-red-400 to-red-300'
                }`}
                style={{ height: barHeight }}
              />
              <span className="text-[9px] sm:text-[10px] text-gray-400 truncate w-full text-center">
                {new Date(session.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                })}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TopicMasteryGrid({
  strongAreas,
  weakAreas,
}: {
  strongAreas: string[]
  weakAreas: WeakArea[]
}) {
  return (
    <div className="space-y-3">
      {strongAreas.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Strong Topics</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {strongAreas.map((area) => (
              <div
                key={area}
                className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-3 border border-green-200"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-900 truncate">{area}</span>
                  <span className="text-xs text-green-600 font-medium flex-shrink-0">Strong</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {weakAreas.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Needs Improvement</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {weakAreas.map((area) => {
              const barWidth =
                area.difficulty === 'high'
                  ? 'w-1/4'
                  : area.difficulty === 'medium'
                    ? 'w-2/5'
                    : 'w-3/5'
              return (
                <div key={area.chapter} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {area.chapter}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded flex-shrink-0 ${
                        area.difficulty === 'high'
                          ? 'bg-red-100 text-red-600'
                          : area.difficulty === 'medium'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {area.difficulty}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className={`bg-yellow-500 h-1.5 rounded-full ${barWidth}`} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export function ProgressTab({
  neetProgress,
  recentSessions,
  gamificationData,
  totalStudyTime,
  averageScore,
  testsCompleted,
}: ProgressTabProps) {
  const bestScore = recentSessions.reduce((best, s) => Math.max(best, s.score || 0), 0)
  const latestScore = recentSessions.length > 0 ? recentSessions[0].score || 0 : 0
  const previousScore = recentSessions.length > 1 ? recentSessions[1].score || 0 : latestScore
  const improvementTrend = latestScore - previousScore

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-xs text-gray-500">Tests Taken</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{testsCompleted}</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-xs text-gray-500">Avg Accuracy</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{averageScore}%</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              {improvementTrend >= 0 ? (
                <ArrowUp className="w-4 h-4 text-green-600" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500" />
              )}
            </div>
            <span className="text-xs text-gray-500">Trend</span>
          </div>
          <div
            className={`text-xl sm:text-2xl font-bold ${improvementTrend >= 0 ? 'text-green-600' : 'text-red-500'}`}
          >
            {improvementTrend >= 0 ? '+' : ''}
            {improvementTrend}%
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4 text-yellow-600" />
            </div>
            <span className="text-xs text-gray-500">Best Score</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{bestScore}%</div>
        </div>
      </div>

      {/* Score Trend Chart */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Score Trend</h3>
        </div>
        <ScoreTrendChart sessions={recentSessions} />
      </div>

      {/* Topic Mastery + Level Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Topic Mastery</h3>
          <TopicMasteryGrid
            strongAreas={neetProgress.strongAreas}
            weakAreas={neetProgress.weakAreas}
          />
          {neetProgress.strongAreas.length === 0 && neetProgress.weakAreas.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500 text-sm">
                Complete more tests to see topic-wise mastery
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {gamificationData?.gamification && (
            <XPProgressCard
              currentLevel={gamificationData.gamification.currentLevel}
              xpInCurrentLevel={gamificationData.gamification.xpInCurrentLevel}
              xpNeededForNextLevel={gamificationData.gamification.xpNeededForNextLevel}
              levelProgress={gamificationData.gamification.levelProgress}
              totalPoints={gamificationData.gamification.totalPoints}
            />
          )}

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-teal-600" />
              <h3 className="text-base sm:text-lg font-bold text-gray-900">Study Time</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {Math.round(totalStudyTime / 60)}h {totalStudyTime % 60}m
            </div>
            <p className="text-sm text-gray-500">Total study time across all sessions</p>
          </div>
        </div>
      </div>
    </div>
  )
}
