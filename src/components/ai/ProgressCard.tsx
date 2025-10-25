'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon, Flame, Clock, Target, BookOpen, Award, TrendingUp } from 'lucide-react'
import { ProgressRing } from '../ui/ProgressRing'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { MilestoneIndicator } from '../ui/MilestoneIndicator'

type CardVariant = 'syllabus' | 'study-hours' | 'test-score' | 'streak'

interface ProgressCardProps {
  variant: CardVariant
  title: string
  subtitle?: string
  value: number
  maxValue?: number
  change?: string
  icon?: LucideIcon
  gradient?: string
  className?: string
  showMilestones?: boolean
  milestones?: Array<{ value: number; label: string; achieved?: boolean }>
  streak?: number
}

const cardVariants = {
  syllabus: {
    gradient: 'from-purple-500 to-pink-500',
    icon: BookOpen,
    color: 'purple',
    bgGradient: 'from-purple-50 to-pink-50',
  },
  'study-hours': {
    gradient: 'from-blue-500 to-cyan-500',
    icon: Clock,
    color: 'blue',
    bgGradient: 'from-blue-50 to-cyan-50',
  },
  'test-score': {
    gradient: 'from-green-500 to-teal-500',
    icon: Target,
    color: 'green',
    bgGradient: 'from-green-50 to-teal-50',
  },
  streak: {
    gradient: 'from-orange-500 to-red-500',
    icon: Flame,
    color: 'orange',
    bgGradient: 'from-orange-50 to-red-50',
  },
}

export function ProgressCard({
  variant,
  title,
  subtitle,
  value,
  maxValue = 100,
  change,
  icon,
  gradient,
  className = '',
  showMilestones = false,
  milestones,
  streak,
}: ProgressCardProps) {
  const variantConfig = cardVariants[variant]
  const Icon = icon || variantConfig.icon
  const gradientClass = gradient || variantConfig.gradient
  const colorScheme = variantConfig.color

  const getGradientColors = (gradientClass: string): [string, string] => {
    const gradientMap: Record<string, [string, string]> = {
      'from-purple-500 to-pink-500': ['#a855f7', '#ec4899'],
      'from-blue-500 to-cyan-500': ['#3b82f6', '#06b6d4'],
      'from-green-500 to-teal-500': ['#22c55e', '#14b8a6'],
      'from-orange-500 to-red-500': ['#f97316', '#ef4444'],
    }
    return gradientMap[gradientClass] || ['#a855f7', '#ec4899']
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(79, 70, 229, 0.2)' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${variantConfig.bgGradient} border border-white/20 ${className}`}
      style={{ boxShadow: '0 8px 32px rgba(79, 70, 229, 0.12)' }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-20 rounded-full blur-3xl -mr-16 -mt-16" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>

          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center shadow-lg`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-baseline space-x-2">
              <AnimatedCounter
                to={value}
                className="text-4xl font-bold text-gray-900"
                formatLargeNumbers={variant === 'study-hours'}
              />
              {maxValue > 0 && variant !== 'streak' && (
                <span className="text-lg text-gray-500">/ {maxValue}</span>
              )}
            </div>

            {change && (
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">{change}</span>
                <span className="text-sm text-gray-500 ml-1">this week</span>
              </div>
            )}

            {variant === 'streak' && streak !== undefined && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="mt-2 inline-flex items-center space-x-1 bg-orange-100 px-3 py-1 rounded-full"
              >
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-bold text-orange-700">{streak} day streak!</span>
              </motion.div>
            )}
          </div>

          <div className="ml-4">
            <ProgressRing
              value={value}
              max={maxValue}
              size={100}
              strokeWidth={8}
              color={colorScheme}
              gradientColors={getGradientColors(gradientClass)}
              showPercentage={variant !== 'streak'}
            />
          </div>
        </div>

        {showMilestones && milestones && milestones.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 pt-4 border-t border-gray-200"
          >
            <MilestoneIndicator
              current={value}
              milestones={milestones}
              color={colorScheme}
              showProgress={false}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export interface SyllabusCardProps {
  title?: string
  subtitle?: string
  completed: number
  total: number
  change?: string
  showMilestones?: boolean
}

export function SyllabusCard({
  title = 'Syllabus Coverage',
  subtitle = 'NEET Biology Topics',
  completed,
  total,
  change,
  showMilestones = true,
}: SyllabusCardProps) {
  return (
    <ProgressCard
      variant="syllabus"
      title={title}
      subtitle={subtitle}
      value={completed}
      maxValue={total}
      change={change}
      showMilestones={showMilestones}
      milestones={[
        { value: total * 0.25, label: 'Beginner' },
        { value: total * 0.5, label: 'Intermediate' },
        { value: total * 0.75, label: 'Advanced' },
        { value: total, label: 'Master' },
      ]}
    />
  )
}

export interface StudyHoursCardProps {
  title?: string
  subtitle?: string
  hours: number
  target?: number
  change?: string
}

export function StudyHoursCard({
  title = 'Study Hours',
  subtitle = 'This Month',
  hours,
  target = 100,
  change,
}: StudyHoursCardProps) {
  return (
    <ProgressCard
      variant="study-hours"
      title={title}
      subtitle={subtitle}
      value={hours}
      maxValue={target}
      change={change}
    />
  )
}

export interface TestScoreCardProps {
  title?: string
  subtitle?: string
  score: number
  maxScore?: number
  change?: string
}

export function TestScoreCard({
  title = 'Test Score',
  subtitle = 'Average Performance',
  score,
  maxScore = 100,
  change,
}: TestScoreCardProps) {
  return (
    <ProgressCard
      variant="test-score"
      title={title}
      subtitle={subtitle}
      value={score}
      maxValue={maxScore}
      change={change}
    />
  )
}

export interface StreakCardProps {
  title?: string
  subtitle?: string
  days: number
  bestStreak?: number
  change?: string
}

export function StreakCard({
  title = 'Study Streak',
  subtitle = 'Keep it going!',
  days,
  bestStreak = 30,
  change,
}: StreakCardProps) {
  return (
    <ProgressCard
      variant="streak"
      title={title}
      subtitle={subtitle}
      value={days}
      maxValue={bestStreak}
      change={change}
      streak={days}
    />
  )
}

export default ProgressCard
