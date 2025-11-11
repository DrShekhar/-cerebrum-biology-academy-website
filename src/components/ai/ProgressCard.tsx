'use client'

import React, { useEffect, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import {
  LucideIcon,
  Flame,
  Clock,
  Target,
  BookOpen,
  Award,
  TrendingUp,
  Sparkles,
} from 'lucide-react'
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

  const [isCelebrating, setIsCelebrating] = useState(false)
  const [previousValue, setPreviousValue] = useState(value)
  const iconControls = useAnimationControls()
  const celebrationControls = useAnimationControls()

  const getGradientColors = (gradientClass: string): [string, string] => {
    const gradientMap: Record<string, [string, string]> = {
      'from-purple-500 to-pink-500': ['#a855f7', '#ec4899'],
      'from-blue-500 to-cyan-500': ['#3b82f6', '#06b6d4'],
      'from-green-500 to-teal-500': ['#22c55e', '#14b8a6'],
      'from-orange-500 to-red-500': ['#f97316', '#ef4444'],
    }
    return gradientMap[gradientClass] || ['#a855f7', '#ec4899']
  }

  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0
  const isMilestoneReached =
    milestones && milestones.some((m) => m.value === value && value > previousValue)

  useEffect(() => {
    if (value > previousValue) {
      iconControls.start({
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0],
        transition: { duration: 0.6, ease: 'easeInOut' },
      })

      if (isMilestoneReached) {
        setIsCelebrating(true)
        celebrationControls.start({
          opacity: [0, 1, 1, 0],
          scale: [0.8, 1.2, 1.2, 0.8],
          y: [0, -20, -20, -40],
          transition: { duration: 2, ease: 'easeOut' as const },
        })

        setTimeout(() => setIsCelebrating(false), 2000)
      }
    }
    setPreviousValue(value)
  }, [value, previousValue, isMilestoneReached, iconControls, celebrationControls])

  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
        staggerChildren: 0.1,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  }

  const childVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' as const },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={`relative overflow-hidden rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl ${className}`}
      style={{
        boxShadow: '0 8px 32px rgba(79, 70, 229, 0.12)',
        willChange: 'transform',
      }}
    >
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-20 rounded-full blur-3xl -mr-16 -mt-16"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {isCelebrating && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={celebrationControls}
        >
          <Sparkles className={`w-12 h-12 text-yellow-400`} />
        </motion.div>
      )}

      <div className="relative z-10">
        <motion.div
          variants={childVariants}
          className="flex items-start justify-between mb-4 sm:mb-6 lg:mb-8"
        >
          <div className="flex-1 min-w-0 pr-3 sm:pr-4">
            <motion.h3
              className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-1 sm:mb-2"
              layoutId={`title-${variant}`}
            >
              {title}
            </motion.h3>
            {subtitle && (
              <motion.p
                className="text-xs sm:text-sm text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          <motion.div
            animate={iconControls}
            className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex-shrink-0 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center shadow-lg`}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
          </motion.div>
        </motion.div>

        <motion.div
          variants={childVariants}
          className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline space-x-1 sm:space-x-2">
              <AnimatedCounter
                to={value}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
                formatLargeNumbers={variant === 'study-hours'}
              />
              {maxValue > 0 && variant !== 'streak' && (
                <motion.span
                  className="text-base sm:text-lg lg:text-xl text-gray-500"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  / {maxValue}
                </motion.span>
              )}
            </div>

            {change && (
              <motion.div
                className="flex items-center mt-2 sm:mt-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 mr-1" />
                </motion.div>
                <span className="text-xs sm:text-sm text-green-600 font-medium">{change}</span>
                <span className="text-xs sm:text-sm text-gray-500 ml-1">this week</span>
              </motion.div>
            )}

            {variant === 'streak' && streak !== undefined && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.3,
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className="mt-2 sm:mt-3 inline-flex items-center space-x-1 sm:space-x-1.5 bg-orange-100 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
                </motion.div>
                <span className="text-xs sm:text-sm font-bold text-orange-700">
                  {streak} day streak!
                </span>
              </motion.div>
            )}
          </div>

          <motion.div
            className="ml-3 sm:ml-4 lg:ml-6 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 150, damping: 20 }}
          >
            <ProgressRing
              value={value}
              max={maxValue}
              size={100}
              strokeWidth={8}
              color={colorScheme}
              gradientColors={getGradientColors(gradientClass)}
              showPercentage={variant !== 'streak'}
            />
          </motion.div>
        </motion.div>

        {showMilestones && milestones && milestones.length > 0 && (
          <motion.div
            variants={childVariants}
            className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-gray-200"
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
