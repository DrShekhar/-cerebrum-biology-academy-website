import React from 'react'
import { cn } from '@/lib/utils'
import { TrendingUp } from 'lucide-react'

interface WeightageBadgeProps {
  weightage: number
  className?: string
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeConfig = {
  sm: {
    badge: 'px-2 py-0.5 text-xs',
    icon: 'w-3 h-3',
  },
  md: {
    badge: 'px-2.5 py-1 text-sm',
    icon: 'w-3.5 h-3.5',
  },
  lg: {
    badge: 'px-3 py-1.5 text-base',
    icon: 'w-4 h-4',
  },
}

const WeightageBadge: React.FC<WeightageBadgeProps> = ({
  weightage,
  className,
  showIcon = true,
  size = 'md',
}) => {
  const config = sizeConfig[size]

  const getWeightageColor = (value: number): string => {
    if (value >= 10) return 'bg-blue-600 text-white border-blue-700'
    if (value >= 6) return 'bg-blue-500 text-white border-blue-600'
    if (value >= 3) return 'bg-blue-400 text-white border-blue-500'
    return 'bg-blue-300 text-blue-900 border-blue-400'
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-bold border shadow-sm transition-all hover:shadow-md',
        config.badge,
        getWeightageColor(weightage),
        className
      )}
      title={`NEET Weightage: ${weightage} marks`}
    >
      {showIcon && <TrendingUp className={config.icon} />}
      <span>{weightage} marks</span>
    </div>
  )
}

export default WeightageBadge
