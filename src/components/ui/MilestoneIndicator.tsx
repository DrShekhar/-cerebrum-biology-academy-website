'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Circle, Target } from 'lucide-react'

interface Milestone {
  value: number
  label: string
  achieved?: boolean
}

interface MilestoneIndicatorProps {
  current: number
  milestones: Milestone[]
  color?: string
  className?: string
  showProgress?: boolean
}

export function MilestoneIndicator({
  current,
  milestones,
  color = 'purple',
  className = '',
  showProgress = true,
}: MilestoneIndicatorProps) {
  const sortedMilestones = [...milestones].sort((a, b) => a.value - b.value)

  const maxValue = sortedMilestones[sortedMilestones.length - 1]?.value || 100
  const progressPercentage = Math.min((current / maxValue) * 100, 100)

  const colorClasses: Record<
    string,
    { bg: string; border: string; text: string; gradient: string }
  > = {
    purple: {
      bg: 'bg-purple-500',
      border: 'border-purple-500',
      text: 'text-purple-600',
      gradient: 'from-purple-400 to-purple-600',
    },
    blue: {
      bg: 'bg-blue-500',
      border: 'border-blue-500',
      text: 'text-blue-600',
      gradient: 'from-blue-400 to-blue-600',
    },
    green: {
      bg: 'bg-green-600',
      border: 'border-green-600',
      text: 'text-green-600',
      gradient: 'from-green-400 to-green-600',
    },
    orange: {
      bg: 'bg-orange-500',
      border: 'border-orange-500',
      text: 'text-orange-600',
      gradient: 'from-orange-400 to-orange-600',
    },
  }

  const selectedColor = colorClasses[color] || colorClasses.purple

  const getCurrentMilestoneIndex = () => {
    for (let i = sortedMilestones.length - 1; i >= 0; i--) {
      if (current >= sortedMilestones[i].value) {
        return i
      }
    }
    return -1
  }

  const currentMilestoneIndex = getCurrentMilestoneIndex()

  return (
    <div className={`w-full ${className}`}>
      {showProgress && (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-gray-600 font-medium">Progress</span>
          <span className={`font-bold ${selectedColor.text}`}>{current}</span>
        </div>
      )}

      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full bg-gradient-to-r ${selectedColor.gradient} rounded-full`}
          />
        </div>

        <div className="relative mt-6 flex justify-between">
          {sortedMilestones.map((milestone, index) => {
            const isAchieved =
              milestone.achieved !== undefined ? milestone.achieved : current >= milestone.value
            const isCurrent = index === currentMilestoneIndex
            const position = (milestone.value / maxValue) * 100

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center"
                style={{
                  position: 'absolute',
                  left: `${position}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <div className="relative -top-[34px]">
                  {isAchieved ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                    >
                      <CheckCircle
                        className={`w-6 h-6 ${selectedColor.text} ${selectedColor.bg} rounded-full`}
                        fill="white"
                      />
                    </motion.div>
                  ) : isCurrent ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Target className={`w-6 h-6 ${selectedColor.text}`} />
                    </motion.div>
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300" />
                  )}
                </div>

                <div className="mt-2 text-center">
                  <div
                    className={`text-xs font-medium ${
                      isAchieved || isCurrent ? selectedColor.text : 'text-gray-500'
                    }`}
                  >
                    {milestone.value}
                  </div>
                  <div
                    className={`text-xs mt-1 whitespace-nowrap ${
                      isAchieved || isCurrent ? 'text-gray-700' : 'text-gray-500'
                    }`}
                  >
                    {milestone.label}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MilestoneIndicator
