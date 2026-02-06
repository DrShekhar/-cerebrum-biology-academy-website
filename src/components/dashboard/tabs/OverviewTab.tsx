'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Target, Clock, Award, Brain, Star, ArrowUp, ArrowDown } from 'lucide-react'
import { BiologyScoreDisplay } from '@/components/ui/BiologyScoreDisplay'
import { AchievementsDisplay } from '@/components/gamification/AchievementsDisplay'
import { XPProgressCard } from '@/components/gamification/XPProgressCard'
import { StreakWidget } from '@/components/gamification/StreakWidget'
import { NTAAnnouncementWidget } from '../NTAAnnouncementWidget'
import { SpacedReviewWidget } from '../SpacedReviewWidget'
import { NEETReadinessMeter } from '../NEETReadinessMeter'
import { DailyChallengeCard } from '../DailyChallengeCard'
import { WeakAreaItem } from './WeakAreaItem'

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

interface GamificationAchievement {
  id: string
  type: string
  title: string
  description: string
  icon: string
  points: number
  isCompleted: boolean
  earnedAt: Date | null
  currentProgress: number
  targetProgress: number
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
  recentAchievements: GamificationAchievement[]
  inProgressAchievements: GamificationAchievement[]
  totalAchievements: number
  completedAchievements: number
}

interface GamificationData {
  gamification: GamificationStats
}

interface OverviewTabProps {
  neetProgress: NEETProgress
  recentSessions: StudySession[]
  gamificationData: GamificationData | null
  onWeakAreaSelect: (area: WeakArea) => void
  totalStudyTime: number
  averageScore: number
  testsCompleted: number
}

export function OverviewTab({
  neetProgress,
  recentSessions,
  gamificationData,
  onWeakAreaSelect,
  totalStudyTime,
  averageScore,
  testsCompleted,
}: OverviewTabProps) {
  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4 sm:space-y-8"
    >
      {/* NEET Score Prediction Card - Mobile Optimized */}
      <div className="bg-gradient-to-r from-green-600 to-navy-700 rounded-xl sm:rounded-2xl p-4 sm:p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">🎯 NEET Biology Score</h3>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="text-xs sm:text-sm text-blue-100">Current Score</div>
              <BiologyScoreDisplay
                currentScore={neetProgress.currentScore}
                maxScore={360}
                showNEETTotal={true}
                size="lg"
                showLabel={false}
                showPercentage={false}
                className="text-white [&_.text-blue-600]:text-white [&_.text-gray-500]:text-blue-200"
              />
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                {neetProgress.improvement >= 0 ? (
                  <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-300" />
                ) : (
                  <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-300" />
                )}
                <span
                  className={`text-xs sm:text-sm ${neetProgress.improvement >= 0 ? 'text-green-300' : 'text-red-300'}`}
                >
                  {neetProgress.improvement >= 0 ? '+' : ''}
                  {neetProgress.improvement} from last test
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Target Progress</h4>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  <span>Progress to Target ({neetProgress.targetScore})</span>
                  <span>
                    {Math.round((neetProgress.currentScore / neetProgress.targetScore) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-blue-400 rounded-full h-2 sm:h-3">
                  <div
                    className="bg-white h-2 sm:h-3 rounded-full transition-all duration-1000"
                    style={{
                      width: `${Math.min((neetProgress.currentScore / neetProgress.targetScore) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-blue-100">
                {Math.max(0, neetProgress.targetScore - neetProgress.currentScore)} marks to target
              </div>
              <div className="text-xs sm:text-sm text-blue-200">
                Biology: Zoology + Botany (180 + 180)
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Performance Metrics</h4>
            <div className="space-y-1.5 sm:space-y-2">
              {neetProgress.rank > 0 && (
                <>
                  <div className="text-2xl sm:text-3xl font-bold">#{neetProgress.rank}</div>
                  <div className="text-xs sm:text-sm text-blue-100">
                    {neetProgress.percentile}th percentile
                  </div>
                </>
              )}
              <div className="text-xs sm:text-sm text-blue-100">
                {recentSessions.length} tests completed
              </div>
              <div className="text-xs sm:text-sm text-blue-100">
                {neetProgress.strongAreas.length} strong areas
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEET Readiness Meter */}
      <NEETReadinessMeter />

      {/* Quick Stats Grid - Mobile Optimized */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div className="min-w-0">
              <div className="text-lg sm:text-2xl font-bold text-gray-900">
                {Math.round(totalStudyTime / 60)}h
              </div>
              <div className="text-xs sm:text-sm text-gray-500 truncate">Study Time</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
            <div className="min-w-0">
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{averageScore}%</div>
              <div className="text-xs sm:text-sm text-gray-500 truncate">Avg Score</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <div className="min-w-0">
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{testsCompleted}</div>
              <div className="text-xs sm:text-sm text-gray-500 truncate">Tests Done</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
            </div>
            <div className="min-w-0">
              <div className="text-lg sm:text-2xl font-bold text-gray-900">
                {gamificationData?.gamification?.studyStreak || 0}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 truncate">Day Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gamification Section - Mobile Optimized */}
      {gamificationData?.gamification && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <XPProgressCard
            currentLevel={gamificationData.gamification.currentLevel}
            xpInCurrentLevel={gamificationData.gamification.xpInCurrentLevel}
            xpNeededForNextLevel={gamificationData.gamification.xpNeededForNextLevel}
            levelProgress={gamificationData.gamification.levelProgress}
            totalPoints={gamificationData.gamification.totalPoints}
          />
          <StreakWidget
            studyStreak={gamificationData.gamification.studyStreak}
            longestStreak={gamificationData.gamification.longestStreak}
            streakMilestone={gamificationData.gamification.streakMilestone}
          />
          <AchievementsDisplay
            achievements={[
              ...gamificationData.gamification.recentAchievements,
              ...gamificationData.gamification.inProgressAchievements,
            ]}
            totalAchievements={gamificationData.gamification.totalAchievements}
            completedAchievements={gamificationData.gamification.completedAchievements}
          />
        </div>
      )}

      {/* NTA Announcements Widget */}
      <NTAAnnouncementWidget />

      {/* Daily Challenge */}
      <DailyChallengeCard />

      {/* Spaced Repetition Review */}
      <SpacedReviewWidget />

      {/* Recent Sessions & Weak Areas - Mobile Optimized */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {/* Recent Study Sessions */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
            📚 Recent Sessions
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {recentSessions.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
                <p className="text-gray-500 text-sm sm:text-base">
                  No sessions yet. Start studying!
                </p>
              </div>
            ) : (
              recentSessions.slice(0, 5).map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-sm sm:text-base text-gray-900 truncate">
                      {session.chapter}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      {session.duration} min • {new Date(session.date).toLocaleDateString()}
                    </div>
                  </div>
                  {session.score !== undefined && (
                    <span className="text-green-600 font-semibold text-sm sm:text-base flex-shrink-0">
                      {session.score}%
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Weak Areas */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
            🎯 Focus Areas
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {neetProgress.weakAreas.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <Star className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mx-auto mb-2 sm:mb-3" />
                <p className="text-gray-500 text-sm sm:text-base">
                  Great job! No weak areas detected.
                </p>
              </div>
            ) : (
              neetProgress.weakAreas
                .slice(0, 4)
                .map((area, index) => (
                  <WeakAreaItem key={index} area={area} onSelect={onWeakAreaSelect} />
                ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export type {
  WeakArea,
  NEETProgress,
  StudySession,
  GamificationData,
  GamificationStats,
  GamificationAchievement,
}
