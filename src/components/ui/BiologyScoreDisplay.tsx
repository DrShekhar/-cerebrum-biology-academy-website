'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface BiologyScoreDisplayProps {
  currentScore: number
  maxScore?: number
  showNEETTotal?: boolean
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
  showPercentage?: boolean
}

export function BiologyScoreDisplay({
  currentScore,
  maxScore = 360,
  showNEETTotal = false,
  size = 'md',
  showLabel = true,
  className,
  showPercentage = true,
}: BiologyScoreDisplayProps) {
  const percentage = maxScore > 0 ? ((currentScore / maxScore) * 100).toFixed(1) : '0.0'
  const neetTotal = currentScore * 2
  const neetMax = 720

  const sizeClasses = {
    sm: {
      container: 'space-y-0.5',
      label: 'text-xs',
      score: 'text-base',
      secondary: 'text-xs',
      percentage: 'text-xs',
    },
    md: {
      container: 'space-y-1',
      label: 'text-sm',
      score: 'text-xl sm:text-2xl',
      secondary: 'text-xs sm:text-sm',
      percentage: 'text-sm',
    },
    lg: {
      container: 'space-y-2',
      label: 'text-base',
      score: 'text-3xl sm:text-4xl',
      secondary: 'text-sm sm:text-base',
      percentage: 'text-base',
    },
  }

  const classes = sizeClasses[size]

  return (
    <div className={cn('text-center sm:text-left', classes.container, className)}>
      {showLabel && (
        <div className={cn('text-gray-600 font-medium', classes.label)}>Biology Score</div>
      )}
      <div className="flex items-baseline gap-1 justify-center sm:justify-start">
        <span className={cn('font-bold text-blue-600', classes.score)}>
          {currentScore}/{maxScore}
        </span>
        {showPercentage && (
          <span className={cn('text-gray-500', classes.percentage)}>({percentage}%)</span>
        )}
      </div>
      {showNEETTotal && (
        <div className={cn('text-gray-500', classes.secondary)}>
          Total NEET: {neetTotal}/{neetMax}
        </div>
      )}
    </div>
  )
}
