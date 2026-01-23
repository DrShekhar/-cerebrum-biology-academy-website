'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Flame, TrendingUp, Award } from 'lucide-react'

interface StreakWidgetProps {
  studyStreak: number
  longestStreak: number
  streakMilestone: { days: number; reward: number }
  className?: string
}

export function StreakWidget({
  studyStreak,
  longestStreak,
  streakMilestone,
  className = '',
}: StreakWidgetProps) {
  const progressToMilestone = Math.min((studyStreak / streakMilestone.days) * 100, 100)
  const daysUntilMilestone = Math.max(0, streakMilestone.days - studyStreak)

  return (
    <div
      className={`bg-orange-600 rounded-xl shadow-lg p-6 text-white ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold flex items-center">
            <Flame className="w-5 h-5 mr-2" />
            Study Streak
          </h3>
          <p className="text-orange-100 text-sm mt-1">Keep the momentum going!</p>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          className="flex items-center space-x-1"
        >
          <span className="text-5xl font-bold">{studyStreak}</span>
          <Flame className={`w-8 h-8 ${studyStreak > 0 ? 'text-yellow-300' : 'text-orange-200'}`} />
        </motion.div>
      </div>

      {/* Progress to Next Milestone */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium">Next Milestone</span>
          <span className="text-orange-100">{streakMilestone.days} days</span>
        </div>
        <div className="w-full bg-orange-700 bg-opacity-50 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressToMilestone}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="bg-gradient-to-r from-yellow-300 to-yellow-100 h-3 rounded-full"
          />
        </div>
        <div className="text-xs text-orange-100 mt-1">
          {daysUntilMilestone > 0
            ? `${daysUntilMilestone} more ${daysUntilMilestone === 1 ? 'day' : 'days'} to unlock ${streakMilestone.reward} XP!`
            : `Milestone reached! Claim ${streakMilestone.reward} XP!`}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white bg-opacity-15 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className="w-4 h-4 text-yellow-200" />
            <span className="text-xs text-orange-100 font-medium">Current</span>
          </div>
          <div className="text-2xl font-bold">{studyStreak}</div>
          <div className="text-xs text-orange-200">day{studyStreak !== 1 ? 's' : ''}</div>
        </div>

        <div className="bg-white bg-opacity-15 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-1">
            <Award className="w-4 h-4 text-yellow-200" />
            <span className="text-xs text-orange-100 font-medium">Best</span>
          </div>
          <div className="text-2xl font-bold">{longestStreak}</div>
          <div className="text-xs text-orange-200">day{longestStreak !== 1 ? 's' : ''}</div>
        </div>
      </div>

      {/* Encouragement Message */}
      {studyStreak > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center"
        >
          {studyStreak >= 7 ? (
            <div className="bg-yellow-400 text-orange-900 px-4 py-2 rounded-full text-sm font-bold inline-flex items-center space-x-2">
              <Flame className="w-4 h-4" />
              <span>You're on fire! Keep it up!</span>
              <Flame className="w-4 h-4" />
            </div>
          ) : studyStreak >= 3 ? (
            <div className="text-sm font-medium text-orange-100">
              Great start! You're building a habit!
            </div>
          ) : (
            <div className="text-sm font-medium text-orange-100">
              Study today to keep your streak alive!
            </div>
          )}
        </motion.div>
      )}

      {/* Zero Streak Message */}
      {studyStreak === 0 && (
        <div className="mt-4 text-center">
          <div className="text-sm font-medium text-orange-100 mb-2">Start your streak today!</div>
          <div className="text-xs text-orange-200">Complete a test or study session to begin</div>
        </div>
      )}
    </div>
  )
}
