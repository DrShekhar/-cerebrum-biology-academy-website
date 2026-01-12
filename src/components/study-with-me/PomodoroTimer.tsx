'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react'
import type { DisplayMode, PomodoroPhase, PomodoroState } from '@/lib/study-with-me/types'
import { POMODORO_DEFAULTS, PHASE_COLORS, STORAGE_KEYS } from '@/lib/study-with-me/constants'

interface PomodoroTimerProps {
  mode?: DisplayMode
  studyDuration?: number
  breakDuration?: number
  longBreakDuration?: number
  className?: string
  onStateChange?: (state: PomodoroState) => void
}

export function PomodoroTimer({
  mode = 'web',
  studyDuration = POMODORO_DEFAULTS.studyDuration,
  breakDuration = POMODORO_DEFAULTS.breakDuration,
  longBreakDuration = POMODORO_DEFAULTS.longBreakDuration,
  className = '',
  onStateChange,
}: PomodoroTimerProps) {
  const [phase, setPhase] = useState<PomodoroPhase>('idle')
  const [timeRemaining, setTimeRemaining] = useState(studyDuration)
  const [isRunning, setIsRunning] = useState(false)
  const [cycleCount, setCycleCount] = useState(0)
  const [totalStudyTime, setTotalStudyTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Get duration based on phase
  const getPhaseDuration = useCallback(
    (p: PomodoroPhase) => {
      switch (p) {
        case 'study':
          return studyDuration
        case 'break':
          return breakDuration
        case 'longBreak':
          return longBreakDuration
        default:
          return studyDuration
      }
    },
    [studyDuration, breakDuration, longBreakDuration]
  )

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.pomodoroState)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setPhase(data.phase || 'idle')
        setTimeRemaining(data.timeRemaining || studyDuration)
        setCycleCount(data.cycleCount || 0)
        setTotalStudyTime(data.totalStudyTime || 0)
      } catch {
        // Ignore invalid data
      }
    }

    // Create audio element for notifications
    audioRef.current = new Audio('/sounds/notification.mp3')
    audioRef.current.volume = 0.5

    return () => {
      audioRef.current = null
    }
  }, [studyDuration])

  // Save state
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.pomodoroState,
      JSON.stringify({ phase, timeRemaining, cycleCount, totalStudyTime })
    )
    onStateChange?.({ phase, timeRemaining, isRunning, cycleCount, totalStudyTime })
  }, [phase, timeRemaining, cycleCount, totalStudyTime, isRunning, onStateChange])

  // Timer logic
  useEffect(() => {
    if (!isRunning || phase === 'idle') return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Phase complete
          handlePhaseComplete()
          return 0
        }
        // Track study time
        if (phase === 'study') {
          setTotalStudyTime((t) => t + 1)
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, phase])

  const playNotification = useCallback(() => {
    try {
      audioRef.current?.play().catch(() => {
        // Audio play blocked - user hasn't interacted yet
      })
    } catch {
      // Ignore audio errors
    }
  }, [])

  const handlePhaseComplete = useCallback(() => {
    playNotification()
    setIsRunning(false)

    if (phase === 'study') {
      const newCycleCount = cycleCount + 1
      setCycleCount(newCycleCount)

      // Long break after 4 cycles
      if (newCycleCount % POMODORO_DEFAULTS.cyclesBeforeLongBreak === 0) {
        setPhase('longBreak')
        setTimeRemaining(longBreakDuration)
      } else {
        setPhase('break')
        setTimeRemaining(breakDuration)
      }
    } else {
      // After break, go back to study
      setPhase('study')
      setTimeRemaining(studyDuration)
    }
  }, [phase, cycleCount, studyDuration, breakDuration, longBreakDuration, playNotification])

  const handleStart = useCallback(() => {
    if (phase === 'idle') {
      setPhase('study')
      setTimeRemaining(studyDuration)
    }
    setIsRunning(true)
  }, [phase, studyDuration])

  const handlePause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const handleSkip = useCallback(() => {
    setIsRunning(false)
    if (phase === 'study') {
      const newCycleCount = cycleCount + 1
      setCycleCount(newCycleCount)
      if (newCycleCount % POMODORO_DEFAULTS.cyclesBeforeLongBreak === 0) {
        setPhase('longBreak')
        setTimeRemaining(longBreakDuration)
      } else {
        setPhase('break')
        setTimeRemaining(breakDuration)
      }
    } else {
      setPhase('study')
      setTimeRemaining(studyDuration)
    }
  }, [phase, cycleCount, studyDuration, breakDuration, longBreakDuration])

  const handleReset = useCallback(() => {
    setIsRunning(false)
    setPhase('idle')
    setTimeRemaining(studyDuration)
    setCycleCount(0)
    setTotalStudyTime(0)
  }, [studyDuration])

  const formatTime = useCallback((totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }, [])

  // Calculate progress for circular indicator
  const currentPhaseDuration = getPhaseDuration(phase === 'idle' ? 'study' : phase)
  const progress =
    phase === 'idle' ? 0 : ((currentPhaseDuration - timeRemaining) / currentPhaseDuration) * 100

  const phaseColors = phase === 'idle' ? PHASE_COLORS.idle : PHASE_COLORS[phase]

  const getPhaseLabel = useCallback((p: PomodoroPhase) => {
    switch (p) {
      case 'study':
        return 'Focus Time'
      case 'break':
        return 'Short Break'
      case 'longBreak':
        return 'Long Break'
      default:
        return 'Ready to Start'
    }
  }, [])

  // OBS mode - simplified circular display
  if (mode === 'obs') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <div className="relative w-48 h-48">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#374151" strokeWidth="6" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={phaseColors.primary}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.827} 282.7`}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-mono font-bold text-white">
              {formatTime(timeRemaining)}
            </span>
            <span className="text-sm text-gray-400 mt-1">{getPhaseLabel(phase)}</span>
          </div>
        </div>
        <div className="text-gray-400 text-sm mt-4">Cycle {cycleCount} / 4</div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={`bg-white rounded-xl shadow-xl p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pomodoro</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${phaseColors.light} ${phaseColors.text}`}>
          Cycle {cycleCount + 1} / 4
        </span>
      </div>

      {/* Circular Timer */}
      <div className="flex flex-col items-center">
        <div className="relative w-52 h-52">
          {/* SVG Circle */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={phaseColors.primary}
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ strokeDasharray: '0 282.7' }}
              animate={{ strokeDasharray: `${progress * 2.827} 282.7` }}
              transition={{ duration: 0.5 }}
            />
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-mono font-bold text-[#3d4d3d]">
              {formatTime(timeRemaining)}
            </span>
            <span className={`text-sm mt-1 ${phaseColors.text} font-medium`}>
              {getPhaseLabel(phase)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mt-6">
          {/* Reset */}
          <button
            onClick={handleReset}
            className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={isRunning ? handlePause : handleStart}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl active:scale-95 text-white ${phaseColors.bg}`}
            aria-label={isRunning ? 'Pause' : 'Start'}
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          {/* Skip */}
          <button
            onClick={handleSkip}
            disabled={phase === 'idle'}
            className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Skip phase"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Total Study Time */}
        {totalStudyTime > 0 && (
          <p className="text-xs text-gray-400 mt-4">
            Total focus time: {Math.floor(totalStudyTime / 60)} min
          </p>
        )}
      </div>
    </motion.div>
  )
}
