'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Clock, AlertTriangle, Pause, Play } from 'lucide-react'

interface TimedModeTimerProps {
  timeLimit: number // seconds
  onTimeUp: () => void
  isPaused?: boolean
  onPauseToggle?: () => void
  showWarningAt?: number // Show warning when this many seconds remaining
  className?: string
}

export function TimedModeTimer({
  timeLimit,
  onTimeUp,
  isPaused = false,
  onPauseToggle,
  showWarningAt = 10,
  className = '',
}: TimedModeTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(timeLimit)
  const [isWarning, setIsWarning] = useState(false)
  const [isCritical, setIsCritical] = useState(false)
  const onTimeUpRef = useRef(onTimeUp)

  // Keep callback ref updated
  useEffect(() => {
    onTimeUpRef.current = onTimeUp
  }, [onTimeUp])

  // Reset timer when timeLimit changes
  useEffect(() => {
    setTimeRemaining(timeLimit)
    setIsWarning(false)
    setIsCritical(false)
  }, [timeLimit])

  // Timer countdown
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          // Use setTimeout to avoid state update during render
          setTimeout(() => onTimeUpRef.current(), 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPaused])

  // Update warning/critical states
  useEffect(() => {
    setIsWarning(timeRemaining <= showWarningAt && timeRemaining > 5)
    setIsCritical(timeRemaining <= 5)
  }, [timeRemaining, showWarningAt])

  // Format time as MM:SS
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }, [])

  // Calculate progress percentage
  const progressPercent = (timeRemaining / timeLimit) * 100

  // Determine colors
  const getColors = () => {
    if (isCritical) {
      return {
        bg: 'bg-red-100',
        text: 'text-red-700',
        progress: 'bg-red-500',
        ring: 'ring-red-500',
      }
    }
    if (isWarning) {
      return {
        bg: 'bg-amber-100',
        text: 'text-amber-700',
        progress: 'bg-amber-500',
        ring: 'ring-amber-500',
      }
    }
    return {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      progress: 'bg-blue-500',
      ring: 'ring-blue-500',
    }
  }

  const colors = getColors()

  return (
    <div className={`${className}`}>
      {/* Compact timer display */}
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-xl ${colors.bg} transition-all ${
          isCritical ? 'animate-pulse' : ''
        }`}
      >
        <div className="relative">
          {isCritical ? (
            <AlertTriangle className={`w-5 h-5 ${colors.text}`} />
          ) : (
            <Clock className={`w-5 h-5 ${colors.text}`} />
          )}
        </div>

        <div className="flex flex-col">
          <span className={`text-lg font-bold tabular-nums ${colors.text}`}>
            {formatTime(timeRemaining)}
          </span>
          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${colors.progress} transition-all duration-1000 ease-linear`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {onPauseToggle && (
          <button
            onClick={onPauseToggle}
            className={`p-1 rounded-full hover:bg-white/50 transition-colors ${colors.text}`}
            title={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Warning message */}
      {isCritical && timeRemaining > 0 && (
        <div className="mt-2 text-xs text-center text-red-600 font-medium animate-bounce">
          Hurry! Time is almost up!
        </div>
      )}
    </div>
  )
}

/**
 * Circular timer variant for larger display
 */
export function TimedModeTimerCircular({
  timeLimit,
  onTimeUp,
  isPaused = false,
  showWarningAt = 10,
  className = '',
}: Omit<TimedModeTimerProps, 'onPauseToggle'>) {
  const [timeRemaining, setTimeRemaining] = useState(timeLimit)
  const onTimeUpRef = useRef(onTimeUp)

  useEffect(() => {
    onTimeUpRef.current = onTimeUp
  }, [onTimeUp])

  useEffect(() => {
    setTimeRemaining(timeLimit)
  }, [timeLimit])

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setTimeout(() => onTimeUpRef.current(), 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPaused])

  const progressPercent = (timeRemaining / timeLimit) * 100
  const circumference = 2 * Math.PI * 45 // radius = 45
  const strokeDashoffset = circumference * (1 - progressPercent / 100)

  const isCritical = timeRemaining <= 5
  const isWarning = timeRemaining <= showWarningAt && !isCritical

  const getColor = () => {
    if (isCritical) return '#ef4444' // red-500
    if (isWarning) return '#f59e0b' // amber-500
    return '#3b82f6' // blue-500
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg className="transform -rotate-90 w-24 h-24">
        {/* Background circle */}
        <circle
          cx="48"
          cy="48"
          r="45"
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx="48"
          cy="48"
          r="45"
          stroke={getColor()}
          strokeWidth="6"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className={`text-xl font-bold tabular-nums ${
            isCritical
              ? 'text-red-600 animate-pulse'
              : isWarning
                ? 'text-amber-600'
                : 'text-gray-700'
          }`}
        >
          {formatTime(timeRemaining)}
        </span>
        <span className="text-xs text-gray-400">remaining</span>
      </div>
    </div>
  )
}
