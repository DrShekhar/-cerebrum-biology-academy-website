'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

interface CountdownTimerProps {
  targetDate: Date
  className?: string
  showIcon?: boolean
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({
  targetDate,
  className = '',
  showIcon = true,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    setTimeLeft(calculateTimeLeft())

    return () => clearInterval(timer)
  }, [targetDate])

  if (!mounted) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="animate-pulse bg-gray-200 h-16 w-16 rounded-lg"></div>
        <div className="animate-pulse bg-gray-200 h-16 w-16 rounded-lg"></div>
        <div className="animate-pulse bg-gray-200 h-16 w-16 rounded-lg"></div>
        <div className="animate-pulse bg-gray-200 h-16 w-16 rounded-lg"></div>
      </div>
    )
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showIcon && <Clock className="w-6 h-6 text-red-600 animate-pulse" />}
      <div className="flex items-center gap-2">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center">
            <div className="bg-red-900 text-white rounded-lg px-3 py-2 min-w-[60px] text-center">
              <div className="text-2xl font-bold tabular-nums">
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="text-xs uppercase tracking-wide opacity-90">{unit.label}</div>
            </div>
            {index < timeUnits.length - 1 && (
              <span className="text-red-900 font-bold text-xl mx-1">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
