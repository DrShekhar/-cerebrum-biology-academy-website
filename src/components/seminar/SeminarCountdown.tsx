'use client'

import { useState, useEffect } from 'react'
import { getTimeUntilSeminar, getNextSeminarDate } from '@/lib/seminar/config'

interface SeminarCountdownProps {
  /** Target date for countdown */
  targetDate?: Date
  /** Additional CSS classes */
  className?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

export function SeminarCountdown({
  targetDate,
  className = '',
  size = 'lg',
}: SeminarCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const date = targetDate || getNextSeminarDate()

    const updateCountdown = () => {
      setTimeLeft(getTimeUntilSeminar(date))
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`${className} ${sizeClasses[size].container}`}>
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {['Days', 'Hours', 'Mins', 'Secs'].map((label) => (
            <div key={label} className="text-center">
              <div
                className={`${sizeClasses[size].box} bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center`}
              >
                <span className={`${sizeClasses[size].number} font-bold text-white`}>
                  --
                </span>
              </div>
              <span className={`${sizeClasses[size].label} text-slate-300 mt-1 block`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (timeLeft.total <= 0) {
    return (
      <div className={`${className} ${sizeClasses[size].container}`}>
        <div className="bg-green-500/20 backdrop-blur-sm rounded-xl px-6 py-4 text-center">
          <span className="text-xl md:text-2xl font-bold text-green-400">
            🎉 Seminar is LIVE NOW!
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className} ${sizeClasses[size].container}`}>
      <div className="flex items-center justify-center gap-2 md:gap-4">
        <TimeBox value={timeLeft.days} label="Days" size={size} />
        <Separator size={size} />
        <TimeBox value={timeLeft.hours} label="Hours" size={size} />
        <Separator size={size} />
        <TimeBox value={timeLeft.minutes} label="Mins" size={size} />
        <Separator size={size} />
        <TimeBox value={timeLeft.seconds} label="Secs" size={size} />
      </div>
    </div>
  )
}

interface TimeBoxProps {
  value: number
  label: string
  size: 'sm' | 'md' | 'lg'
}

function TimeBox({ value, label, size }: TimeBoxProps) {
  return (
    <div className="text-center">
      <div
        className={`${sizeClasses[size].box} bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center`}
      >
        <span className={`${sizeClasses[size].number} font-bold text-white`}>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className={`${sizeClasses[size].label} text-slate-300 mt-1 block`}>
        {label}
      </span>
    </div>
  )
}

function Separator({ size }: { size: 'sm' | 'md' | 'lg' }) {
  return (
    <span className={`${sizeClasses[size].separator} font-bold text-yellow-400`}>
      :
    </span>
  )
}

const sizeClasses = {
  sm: {
    container: '',
    box: 'w-12 h-12 md:w-14 md:h-14',
    number: 'text-xl md:text-2xl',
    label: 'text-xs',
    separator: 'text-xl hidden md:block',
  },
  md: {
    container: '',
    box: 'w-14 h-14 md:w-16 md:h-16',
    number: 'text-2xl md:text-3xl',
    label: 'text-xs md:text-sm',
    separator: 'text-2xl hidden md:block',
  },
  lg: {
    container: '',
    box: 'w-16 h-16 md:w-20 md:h-20',
    number: 'text-2xl md:text-4xl',
    label: 'text-sm',
    separator: 'text-3xl hidden md:block',
  },
}

export default SeminarCountdown
