'use client'

import React, { useEffect, useState, memo, useId, useRef } from 'react'
interface ProgressRingProps {
  value: number
  max: number
  size?: number
  strokeWidth?: number
  color?: string
  gradientColors?: [string, string]
  showPercentage?: boolean
  label?: string
  className?: string
}

export const ProgressRing = memo(function ProgressRing({
  value,
  max,
  size = 120,
  strokeWidth = 8,
  color = 'purple',
  gradientColors,
  showPercentage = true,
  label,
  className = '',
}: ProgressRingProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const uniqueId = useId()
  const animRef = useRef<number>(0)

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const percentage = Math.min((value / max) * 100, 100)
  const strokeOffset = circumference - (displayValue / 100) * circumference

  const colorClasses: Record<string, { stroke: string; text: string }> = {
    purple: { stroke: 'stroke-purple-500', text: 'text-purple-600' },
    blue: { stroke: 'stroke-blue-500', text: 'text-blue-600' },
    green: { stroke: 'stroke-green-500', text: 'text-green-600' },
    orange: { stroke: 'stroke-orange-500', text: 'text-orange-600' },
    pink: { stroke: 'stroke-indigo-500', text: 'text-indigo-600' },
    cyan: { stroke: 'stroke-blue-500', text: 'text-blue-600' },
  }

  const selectedColor = colorClasses[color] || colorClasses.purple
  const gradientId = `gradient-${color}-${uniqueId.replace(/:/g, '-')}`

  useEffect(() => {
    const start = displayValue
    const end = percentage
    const duration = 800
    const startTime = performance.now()

    function animate(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = start + (end - start) * eased
      setDisplayValue(Math.round(current))
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      }
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [percentage])

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        aria-label={`Progress: ${percentage.toFixed(0)}%`}
        role="img"
      >
        <defs>
          {gradientColors && (
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradientColors[0]} />
              <stop offset="100%" stopColor={gradientColors[1]} />
            </linearGradient>
          )}
        </defs>

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={gradientColors ? `url(#${gradientId})` : 'currentColor'}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          className={`${!gradientColors ? selectedColor.stroke : ''} transition-[stroke-dashoffset] duration-700 ease-out`}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showPercentage && (
          <span className={`text-2xl font-bold ${selectedColor.text}`}>
            {displayValue}%
          </span>
        )}
        {label && (
          <span className="text-xs text-gray-500 mt-1 text-center animate-fadeInUp">
            {label}
          </span>
        )}
      </div>
    </div>
  )
})

export default ProgressRing
