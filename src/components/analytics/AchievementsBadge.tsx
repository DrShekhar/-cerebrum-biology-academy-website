'use client'

import React from 'react'
import { Award, Star, Zap, Target, BookOpen, Clock, Trophy, Medal } from 'lucide-react'
import type { Achievement } from '@/lib/types/analytics'

interface AchievementsBadgeProps {
  achievements: Achievement[]
}

export function AchievementsBadge({ achievements }: AchievementsBadgeProps) {
  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'FIRST_TEST':
        return <BookOpen className="w-4 h-4" />
      case 'STREAK_7_DAYS':
      case 'STREAK_30_DAYS':
        return <Zap className="w-4 h-4" />
      case 'TOPIC_MASTER':
        return <Star className="w-4 h-4" />
      case 'SPEED_DEMON':
        return <Clock className="w-4 h-4" />
      case 'PERFECTIONIST':
        return <Target className="w-4 h-4" />
      case 'COMMUNITY_HELPER':
        return <Award className="w-4 h-4" />
      case 'BOOKWORM':
        return <BookOpen className="w-4 h-4" />
      default:
        return <Trophy className="w-4 h-4" />
    }
  }

  const getAchievementColor = (type: string) => {
    switch (type) {
      case 'FIRST_TEST':
        return 'bg-blue-500'
      case 'STREAK_7_DAYS':
        return 'bg-orange-500'
      case 'STREAK_30_DAYS':
        return 'bg-red-500'
      case 'TOPIC_MASTER':
        return 'bg-yellow-500'
      case 'SPEED_DEMON':
        return 'bg-purple-500'
      case 'PERFECTIONIST':
        return 'bg-green-600'
      case 'COMMUNITY_HELPER':
        return 'bg-indigo-500'
      case 'BOOKWORM':
        return 'bg-indigo-500'
      default:
        return 'bg-gray-500'
    }
  }

  const earnedAchievements = achievements.filter((a) => a.earnedAt)
  const totalPoints = earnedAchievements.reduce((sum, a) => sum + a.points, 0)

  if (achievements.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p>No achievements yet!</p>
        <p className="text-sm">Complete tests to unlock badges</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Achievement Summary */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
        <div>
          <div className="text-lg font-bold text-gray-900">
            {earnedAchievements.length}/{achievements.length}
          </div>
          <div className="text-sm text-gray-600">Achievements Unlocked</div>
        </div>
        <div>
          <div className="text-lg font-bold text-orange-600">{totalPoints}</div>
          <div className="text-sm text-gray-600">Total Points</div>
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {achievements.map((achievement, index) => {
          const isEarned = !!achievement.earnedAt
          const progress = achievement.currentProgress || 0
          const target = achievement.targetProgress || 1
          const progressPercent = Math.min((progress / target) * 100, 100)

          return (
            <div
              key={index}
              className={`relative p-3 rounded-lg border transition-all ${
                isEarned ? 'bg-white border-yellow-300 shadow-md' : 'bg-gray-50 border-gray-200'
              }`}
            >
              {/* Achievement Badge */}
              <div className="flex flex-col items-center space-y-2">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                    isEarned ? getAchievementColor(achievement.type) : 'bg-gray-400'
                  }`}
                >
                  {getAchievementIcon(achievement.type)}
                </div>

                <div className="text-center">
                  <h4
                    className={`font-medium text-sm ${
                      isEarned ? 'text-gray-900' : 'text-gray-600'
                    }`}
                  >
                    {achievement.title}
                  </h4>
                  <p className={`text-xs ${isEarned ? 'text-gray-600' : 'text-gray-500'}`}>
                    {achievement.description}
                  </p>
                </div>

                {/* Progress Bar for Incomplete Achievements */}
                {!isEarned && target > 1 && (
                  <div className="w-full mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-center">
                      {progress}/{target}
                    </div>
                  </div>
                )}

                {/* Points */}
                <div
                  className={`text-xs font-medium ${
                    isEarned ? 'text-yellow-600' : 'text-gray-500'
                  }`}
                >
                  {achievement.points} pts
                </div>

                {/* Earned Date */}
                {isEarned && achievement.earnedAt && (
                  <div className="text-xs text-gray-500">
                    {new Date(achievement.earnedAt).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Earned Badge Overlay */}
              {isEarned && (
                <div className="absolute -top-1 -right-1">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Medal className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              {/* Shimmer Effect for Nearly Complete */}
              {!isEarned && progressPercent >= 80 && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-pulse rounded-lg" />
              )}
            </div>
          )
        })}
      </div>

      {/* Next Achievement Goal */}
      {(() => {
        const nextAchievement = achievements.find(
          (a) => !a.earnedAt && a.currentProgress !== undefined
        )
        if (!nextAchievement) return null

        const progress = nextAchievement.currentProgress || 0
        const target = nextAchievement.targetProgress || 1
        const remaining = target - progress

        return (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Next Achievement</h4>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-blue-800">{nextAchievement.title}</span>
                <p className="text-xs text-blue-600">{remaining} more to unlock</p>
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getAchievementColor(
                  nextAchievement.type
                )}`}
              >
                {getAchievementIcon(nextAchievement.type)}
              </div>
            </div>
          </div>
        )
      })()}

      {/* Achievement Categories */}
      <div className="grid grid-cols-2 gap-3">
        {/* Learning Achievements */}
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <h5 className="font-medium text-green-800 text-sm mb-2">Learning</h5>
          <div className="text-xs text-green-700">
            {
              achievements.filter(
                (a) =>
                  ['FIRST_TEST', 'TOPIC_MASTER', 'PERFECTIONIST', 'BOOKWORM'].includes(a.type) &&
                  a.earnedAt
              ).length
            }{' '}
            earned
          </div>
        </div>

        {/* Consistency Achievements */}
        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
          <h5 className="font-medium text-orange-800 text-sm mb-2">Consistency</h5>
          <div className="text-xs text-orange-700">
            {
              achievements.filter(
                (a) =>
                  ['STREAK_7_DAYS', 'STREAK_30_DAYS', 'SPEED_DEMON'].includes(a.type) && a.earnedAt
              ).length
            }{' '}
            earned
          </div>
        </div>
      </div>
    </div>
  )
}
