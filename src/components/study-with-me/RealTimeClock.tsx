'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { ClockFormat, DisplayMode } from '@/lib/study-with-me/types'

interface RealTimeClockProps {
  format?: ClockFormat
  onFormatChange?: (format: ClockFormat) => void
  mode?: DisplayMode
  className?: string
}

export function RealTimeClock({
  format = '12h',
  onFormatChange,
  mode = 'web',
  className = '',
}: RealTimeClockProps) {
  // Initialize with null to avoid hydration mismatch (server time != client time)
  const [time, setTime] = useState<Date | null>(null)
  const [isTabVisible, setIsTabVisible] = useState(true)

  // Handle tab visibility for performance optimization
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Update time every second, but only when tab is visible
  useEffect(() => {
    if (!isTabVisible) return

    // Start updating immediately when tab is visible (or on mount)
    setTime(new Date())

    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [isTabVisible])

  const formatTime = useCallback(() => {
    if (!time) {
      return { hours: '--', minutes: '--', seconds: '--', period: '' }
    }
    const hours = time.getHours()
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()

    if (format === '24h') {
      return {
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
        period: '',
      }
    }

    const period = hours >= 12 ? 'PM' : 'AM'
    const displayHours = hours % 12 || 12

    return {
      hours: displayHours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      period,
    }
  }, [time, format])

  const formatDate = useCallback(() => {
    if (!time) return 'Loading...'
    return time.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }, [time])

  const { hours, minutes, seconds, period } = formatTime()

  // OBS and Focus mode use larger fonts and simpler layout (dark theme)
  if (mode === 'obs' || mode === 'focus') {
    return (
      <div className={`text-center ${className}`}>
        <div className="text-6xl font-mono font-bold text-white tracking-wider">
          {hours}:{minutes}:{seconds}
          {period && <span className="text-4xl ml-2 text-gray-300">{period}</span>}
        </div>
        <div className="text-xl text-gray-400 mt-2">{formatDate()}</div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-white rounded-xl shadow-xl p-6 ${className}`}
    >
      {/* Header with format toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Current Time</h3>
        {onFormatChange && (
          <button
            onClick={() => onFormatChange(format === '12h' ? '24h' : '12h')}
            className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            {format === '12h' ? '24h' : '12h'}
          </button>
        )}
      </div>

      {/* Time Display */}
      <div className="text-center">
        <div className="flex items-baseline justify-center space-x-1">
          <span className="text-5xl font-mono font-bold text-[#3d4d3d] tracking-tight">
            {hours}
          </span>
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-5xl font-mono font-bold text-[#3d4d3d]"
          >
            :
          </motion.span>
          <span className="text-5xl font-mono font-bold text-[#3d4d3d] tracking-tight">
            {minutes}
          </span>
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-5xl font-mono font-bold text-[#3d4d3d]"
          >
            :
          </motion.span>
          <span className="text-5xl font-mono font-bold text-gray-400 tracking-tight">
            {seconds}
          </span>
          {period && <span className="text-2xl font-medium text-gray-500 ml-2">{period}</span>}
        </div>

        {/* Date */}
        <p className="text-gray-500 mt-3 text-sm">{formatDate()}</p>
      </div>
    </motion.div>
  )
}
