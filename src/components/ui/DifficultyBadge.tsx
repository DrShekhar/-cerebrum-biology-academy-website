import React from 'react'
import { cn } from '@/lib/utils'

interface DifficultyBadgeProps {
  difficulty: 'easy' | 'medium' | 'hard'
  className?: string
  showIcon?: boolean
}

const difficultyConfig = {
  easy: {
    label: 'Easy',
    color: 'bg-green-100 text-green-700 border-green-200',
    hoverColor: 'hover:bg-green-200',
    icon: '●',
    iconColor: 'text-green-600',
  },
  medium: {
    label: 'Medium',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    hoverColor: 'hover:bg-orange-200',
    icon: '●●',
    iconColor: 'text-orange-600',
  },
  hard: {
    label: 'Hard',
    color: 'bg-red-100 text-red-700 border-red-200',
    hoverColor: 'hover:bg-red-200',
    icon: '●●●',
    iconColor: 'text-red-600',
  },
}

const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({
  difficulty,
  className,
  showIcon = true,
}) => {
  const config = difficultyConfig[difficulty]

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors',
        config.color,
        config.hoverColor,
        className
      )}
    >
      {showIcon && (
        <span className={cn('text-[10px] leading-none', config.iconColor)}>{config.icon}</span>
      )}
      <span>{config.label}</span>
    </div>
  )
}

export default DifficultyBadge
