'use client'

import { NEETWeightage } from '@/types/blog'
import { BookOpenIcon, FireIcon, SparklesIcon } from '@heroicons/react/24/outline'

interface NEETTopicBadgeProps {
  chapter: string
  weightage?: NEETWeightage
  size?: 'sm' | 'md' | 'lg'
}

const weightageConfig: Record<NEETWeightage, { label: string; color: string; icon: string }> = {
  High: {
    label: 'High Weightage',
    color: 'text-red-600 bg-red-50 border-red-200',
    icon: 'fire',
  },
  Medium: {
    label: 'Medium Weightage',
    color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    icon: 'sparkles',
  },
  Low: {
    label: 'Low Weightage',
    color: 'text-gray-600 bg-gray-50 border-gray-200',
    icon: 'book',
  },
}

export function NEETTopicBadge({ chapter, weightage, size = 'md' }: NEETTopicBadgeProps) {
  const config = weightage ? weightageConfig[weightage] : null

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const IconComponent =
    config?.icon === 'fire' ? FireIcon : config?.icon === 'sparkles' ? SparklesIcon : BookOpenIcon

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-lg border ${sizeClasses[size]} ${config?.color || 'text-blue-600 bg-blue-50 border-blue-200'}`}
    >
      <BookOpenIcon className={iconSizes[size]} />
      <span className="font-medium">{chapter}</span>
      {weightage && (
        <>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1">
            <IconComponent className={iconSizes[size]} />
            <span className="text-xs font-medium">{config?.label}</span>
          </span>
        </>
      )}
    </div>
  )
}
