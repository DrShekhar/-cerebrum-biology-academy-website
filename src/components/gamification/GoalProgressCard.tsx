'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Target,
  CheckCircle2,
  Clock,
  Flame,
  Zap,
  Calendar,
  BookOpen,
  Trophy,
} from 'lucide-react'

type GoalType = 'DAILY' | 'WEEKLY'
type GoalMetric =
  | 'MCQ_QUESTIONS_ANSWERED'
  | 'MCQ_CORRECT_ANSWERS'
  | 'TESTS_COMPLETED'
  | 'STUDY_MINUTES'
  | 'STREAK_DAYS'
  | 'XP_EARNED'

interface Goal {
  id: string
  goalType: GoalType
  metric: GoalMetric
  targetValue: number
  currentValue: number
  xpReward: number
  isCompleted: boolean
  completedAt: string | null
  periodStart: string
  periodEnd: string
  streakBonus: number
}

interface GoalProgressCardProps {
  goals: Goal[]
  currentStreakDays: number
  className?: string
  onClaimReward?: (goalId: string) => Promise<void>
}

const METRIC_CONFIG: Record<GoalMetric, {
  label: string
  icon: React.ComponentType<{ className?: string }>
  unit: string
}> = {
  MCQ_QUESTIONS_ANSWERED: {
    label: 'Answer Questions',
    icon: BookOpen,
    unit: 'questions',
  },
  MCQ_CORRECT_ANSWERS: {
    label: 'Correct Answers',
    icon: CheckCircle2,
    unit: 'correct',
  },
  TESTS_COMPLETED: {
    label: 'Complete Tests',
    icon: Target,
    unit: 'tests',
  },
  STUDY_MINUTES: {
    label: 'Study Time',
    icon: Clock,
    unit: 'minutes',
  },
  STREAK_DAYS: {
    label: 'Maintain Streak',
    icon: Flame,
    unit: 'days',
  },
  XP_EARNED: {
    label: 'Earn XP',
    icon: Zap,
    unit: 'XP',
  },
}

function getTimeRemaining(endDate: string): string {
  const diff = new Date(endDate).getTime() - Date.now()
  if (diff <= 0) return 'Expired'

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours >= 24) {
    const days = Math.floor(hours / 24)
    return `${days}d ${hours % 24}h`
  }
  return `${hours}h ${minutes}m`
}

function GoalItem({
  goal,
  currentStreakDays,
  onClaimReward,
}: {
  goal: Goal
  currentStreakDays: number
  onClaimReward?: (goalId: string) => Promise<void>
}) {
  const config = METRIC_CONFIG[goal.metric]
  const Icon = config.icon
  const progress = Math.min((goal.currentValue / goal.targetValue) * 100, 100)
  const totalReward = goal.xpReward + goal.streakBonus

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border-2 transition-all ${
        goal.isCompleted
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
          goal.isCompleted
            ? 'bg-green-500 text-white'
            : 'bg-gray-100 text-gray-500'
        }`}>
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-gray-900 truncate">
              {config.label}
            </h4>
            {goal.isCompleted && (
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            )}
          </div>

          {/* Progress text */}
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">
              {goal.currentValue} / {goal.targetValue} {config.unit}
            </span>
            {!goal.isCompleted && (
              <span className="text-gray-400 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {getTimeRemaining(goal.periodEnd)}
              </span>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-2 rounded-full ${
                goal.isCompleted
                  ? 'bg-green-500'
                  : progress >= 75
                  ? 'bg-yellow-500'
                  : 'bg-blue-500'
              }`}
            />
          </div>

          {/* Reward info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">
                +{goal.xpReward} XP
              </span>
              {goal.streakBonus > 0 && (
                <span className="text-xs font-medium text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full flex items-center">
                  <Flame className="w-3 h-3 mr-1" />
                  +{goal.streakBonus} bonus
                </span>
              )}
            </div>
            {goal.isCompleted && goal.completedAt && (
              <span className="text-xs text-gray-500">
                {new Date(goal.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function GoalProgressCard({
  goals,
  currentStreakDays,
  className = '',
  onClaimReward,
}: GoalProgressCardProps) {
  const dailyGoals = goals.filter((g) => g.goalType === 'DAILY')
  const weeklyGoals = goals.filter((g) => g.goalType === 'WEEKLY')

  const dailyCompleted = dailyGoals.filter((g) => g.isCompleted).length
  const weeklyCompleted = weeklyGoals.filter((g) => g.isCompleted).length

  const totalXpEarned = goals
    .filter((g) => g.isCompleted)
    .reduce((sum, g) => sum + g.xpReward + g.streakBonus, 0)

  // Calculate streak bonus multiplier
  const streakMultiplier = currentStreakDays >= 7 ? 2 : currentStreakDays >= 3 ? 1.5 : 1

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold flex items-center">
              <Target className="w-6 h-6 mr-2" />
              Goals Progress
            </h3>
            <p className="text-white/90 text-sm mt-1">
              Complete goals to earn XP bonuses
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{totalXpEarned}</div>
            <div className="text-xs text-white/80">XP earned today</div>
          </div>
        </div>

        {/* Streak Multiplier Banner */}
        {currentStreakDays >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-white/20 rounded-lg p-3 flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-orange-300" />
              <span className="font-medium">{currentStreakDays}-Day Streak Active</span>
            </div>
            <div className="bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold">
              {streakMultiplier}x Bonus
            </div>
          </motion.div>
        )}
      </div>

      {/* Goals Sections */}
      <div className="p-6 space-y-6">
        {/* Daily Goals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              Daily Goals
            </h4>
            <span className="text-sm text-gray-500">
              {dailyCompleted}/{dailyGoals.length} complete
            </span>
          </div>
          {dailyGoals.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <Target className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No daily goals set</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dailyGoals.map((goal) => (
                <GoalItem
                  key={goal.id}
                  goal={goal}
                  currentStreakDays={currentStreakDays}
                  onClaimReward={onClaimReward}
                />
              ))}
            </div>
          )}
        </div>

        {/* Weekly Goals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-900 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-purple-500" />
              Weekly Goals
            </h4>
            <span className="text-sm text-gray-500">
              {weeklyCompleted}/{weeklyGoals.length} complete
            </span>
          </div>
          {weeklyGoals.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <Trophy className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No weekly goals set</p>
            </div>
          ) : (
            <div className="space-y-3">
              {weeklyGoals.map((goal) => (
                <GoalItem
                  key={goal.id}
                  goal={goal}
                  currentStreakDays={currentStreakDays}
                  onClaimReward={onClaimReward}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* All Complete Banner */}
      {dailyCompleted === dailyGoals.length && dailyGoals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white text-center"
        >
          <div className="flex items-center justify-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span className="font-bold">All Daily Goals Complete!</span>
            <Trophy className="w-5 h-5" />
          </div>
          <p className="text-sm text-white/90 mt-1">
            Great work! Come back tomorrow for new challenges.
          </p>
        </motion.div>
      )}
    </div>
  )
}
