'use client'

import React, { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

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

export function ProgressRing({
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

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const percentage = Math.min((value / max) * 100, 100)

  const spring = useSpring(0, {
    stiffness: 75,
    damping: 25,
    restSpeed: 0.5,
  })

  const offset = useTransform(spring, (latest) => circumference - (latest / 100) * circumference)

  const colorClasses: Record<string, { stroke: string; text: string }> = {
    purple: { stroke: 'stroke-purple-500', text: 'text-purple-600' },
    blue: { stroke: 'stroke-blue-500', text: 'text-blue-600' },
    green: { stroke: 'stroke-green-500', text: 'text-green-600' },
    orange: { stroke: 'stroke-orange-500', text: 'text-orange-600' },
    pink: { stroke: 'stroke-pink-500', text: 'text-pink-600' },
    cyan: { stroke: 'stroke-cyan-500', text: 'text-cyan-600' },
  }

  const selectedColor = colorClasses[color] || colorClasses.purple

  const gradientId = `gradient-${color}-${Math.random().toString(36).substr(2, 9)}`

  useEffect(() => {
    const timer = setTimeout(() => {
      spring.set(percentage)
    }, 100)

    const unsubscribe = spring.on('change', (latest) => {
      setDisplayValue(Math.round(latest))
    })

    return () => {
      clearTimeout(timer)
      unsubscribe()
    }
  }, [percentage, spring])

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

        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={gradientColors ? `url(#${gradientId})` : 'currentColor'}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset }}
          className={!gradientColors ? selectedColor.stroke : ''}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showPercentage && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.3,
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
            className={`text-2xl font-bold ${selectedColor.text}`}
          >
            {displayValue}%
          </motion.span>
        )}
        {label && (
          <motion.span
            className="text-xs text-gray-500 mt-1 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {label}
          </motion.span>
        )}
      </div>
    </div>
  )
}

export default ProgressRing
