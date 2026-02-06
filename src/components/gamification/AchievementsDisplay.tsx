'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Trophy, CheckCircle } from 'lucide-react'

interface Achievement {
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

interface AchievementsDisplayProps {
  achievements: Achievement[]
  totalAchievements: number
  completedAchievements: number
  className?: string
}

export function AchievementsDisplay({
  achievements,
  totalAchievements,
  completedAchievements,
  className = '',
}: AchievementsDisplayProps) {
  const completionRate =
    totalAchievements > 0 ? Math.round((completedAchievements / totalAchievements) * 100) : 0

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
            Achievements
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {completedAchievements} of {totalAchievements} unlocked
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-yellow-600">{completionRate}%</div>
          <div className="text-xs text-gray-500">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full"
          />
        </div>
      </div>

      {/* Achievements Grid */}
      {achievements.length === 0 ? (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">No achievements yet</p>
          <p className="text-sm text-gray-500 mt-2">
            Complete tests and study to unlock achievements!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-2 transition-all ${
                achievement.isCompleted
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 shadow-md'
                  : 'bg-gray-50 border-gray-200 opacity-75'
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    achievement.isCompleted
                      ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg'
                      : 'bg-gray-300'
                  }`}
                >
                  {achievement.isCompleted ? achievement.icon : '🔒'}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4
                      className={`font-semibold truncate ${
                        achievement.isCompleted ? 'text-gray-900' : 'text-gray-600'
                      }`}
                    >
                      {achievement.title}
                    </h4>
                    {achievement.isCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 ml-2" />
                    )}
                  </div>

                  <p
                    className={`text-sm mb-2 line-clamp-2 ${
                      achievement.isCompleted ? 'text-gray-700' : 'text-gray-500'
                    }`}
                  >
                    {achievement.description}
                  </p>

                  {/* Progress or Earned Date */}
                  {achievement.isCompleted ? (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-yellow-700 font-medium">
                        +{achievement.points} XP
                      </span>
                      {achievement.earnedAt && (
                        <span className="text-xs text-gray-500">
                          {new Date(achievement.earnedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>
                          {achievement.currentProgress} / {achievement.targetProgress}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-gray-400 h-1.5 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              (achievement.currentProgress / achievement.targetProgress) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* View All Link (if needed) */}
      {achievements.length > 0 && totalAchievements > achievements.length && (
        <Link
          href="/dashboard?tab=progress"
          className="block w-full mt-6 py-3 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg font-medium text-yellow-700 hover:border-yellow-300 hover:shadow-md transition-all text-center"
        >
          View All {totalAchievements} Achievements
        </Link>
      )}
    </div>
  )
}
