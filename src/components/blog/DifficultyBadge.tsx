'use client'

import { Difficulty } from '@/types/blog'

interface DifficultyBadgeProps {
  difficulty: Difficulty
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

const difficultyConfig: Record<
  Difficulty,
  { label: string; color: string; bgColor: string; bars: number }
> = {
  Beginner: {
    label: 'Beginner',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    bars: 1,
  },
  Intermediate: {
    label: 'Intermediate',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    bars: 2,
  },
  Advanced: {
    label: 'Advanced',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    bars: 3,
  },
}

export function DifficultyBadge({
  difficulty,
  size = 'md',
  showLabel = true,
}: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty]

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2',
  }

  const barSizes = {
    sm: 'w-1 h-2',
    md: 'w-1.5 h-3',
    lg: 'w-2 h-4',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${config.bgColor} ${config.color} ${sizeClasses[size]}`}
    >
      <span className="flex items-end gap-0.5">
        {[1, 2, 3].map((bar) => (
          <span
            key={bar}
            className={`${barSizes[size]} rounded-sm ${
              bar <= config.bars
                ? difficulty === 'Beginner'
                  ? 'bg-green-600'
                  : difficulty === 'Intermediate'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                : 'bg-gray-300'
            }`}
            style={{ height: `${bar * (size === 'sm' ? 4 : size === 'md' ? 5 : 6)}px` }}
          />
        ))}
      </span>
      {showLabel && <span>{config.label}</span>}
    </span>
  )
}
