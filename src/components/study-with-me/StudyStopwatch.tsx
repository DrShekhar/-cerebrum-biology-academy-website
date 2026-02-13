'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, RotateCcw, Flag } from 'lucide-react'
import type { DisplayMode, StopwatchState } from '@/lib/study-with-me/types'
import { STORAGE_KEYS, MAX_LAP_TIMES } from '@/lib/study-with-me/constants'

interface StudyStopwatchProps {
  mode?: DisplayMode
  className?: string
  onStateChange?: (state: StopwatchState) => void
}

export function StudyStopwatch({
  mode = 'web',
  className = '',
  onStateChange,
}: StudyStopwatchProps) {
  const [elapsed, setElapsed] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [lapTimes, setLapTimes] = useState<number[]>([])
  const startTimeRef = useRef<number>(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.stopwatchElapsed)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setElapsed(data.elapsed || 0)
        setLapTimes(data.lapTimes || [])
      } catch {
        // Ignore invalid data
      }
    }
  }, [])

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.stopwatchElapsed, JSON.stringify({ elapsed, lapTimes }))
    onStateChange?.({ elapsed, isRunning, lapTimes })
  }, [elapsed, lapTimes, isRunning, onStateChange])

  // Handle stopwatch ticking
  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsed * 1000
      intervalRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000))
      }, 100)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const formatTime = useCallback((totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
    }
  }, [])

  const handleStart = useCallback(() => {
    setIsRunning(true)
  }, [])

  const handlePause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const handleReset = useCallback(() => {
    setIsRunning(false)
    setElapsed(0)
    setLapTimes([])
  }, [])

  const handleLap = useCallback(() => {
    if (elapsed > 0) {
      setLapTimes((prev) => [elapsed, ...prev].slice(0, MAX_LAP_TIMES))
    }
  }, [elapsed])

  const { hours, minutes, seconds } = formatTime(elapsed)

  // OBS mode - minimal large display (no controls for streaming)
  if (mode === 'obs') {
    return (
      <div className={`text-center ${className}`}>
        <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">Study Time</div>
        <div className="text-7xl font-mono font-bold text-green-500 tracking-wider">
          {hours}:{minutes}:{seconds}
        </div>
      </div>
    )
  }

  // Focus mode - large display WITH interactive controls
  if (mode === 'focus') {
    return (
      <div className={`text-center ${className}`}>
        <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">Study Time</div>
        <div className="text-5xl md:text-7xl font-mono font-bold text-green-500 tracking-wider mb-6">
          {hours}:{minutes}:{seconds}
        </div>
        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handleReset}
            disabled={elapsed === 0 && !isRunning}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Reset"
          >
            <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={isRunning ? handlePause : handleStart}
            className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl active:scale-95 ${
              isRunning
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
            aria-label={isRunning ? 'Pause' : 'Start'}
          >
            {isRunning ? (
              <Pause className="w-6 h-6 md:w-7 md:h-7" />
            ) : (
              <Play className="w-6 h-6 md:w-7 md:h-7 ml-1" />
            )}
          </button>
          <button
            onClick={handleLap}
            disabled={!isRunning || elapsed === 0}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Lap"
          >
            <Flag className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-xl p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          Study Session
        </h3>
        {isRunning && (
          <span
            className="flex items-center text-xs text-green-600 animate-fadeInUp"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
            Recording
          </span>
        )}
      </div>

      {/* Timer Display */}
      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center space-x-1">
          <span className="text-3xl sm:text-4xl md:text-6xl font-mono font-bold text-[#3d4d3d] tracking-tight">
            {hours}
          </span>
          <span className="text-3xl sm:text-4xl md:text-6xl font-mono font-bold text-[#3d4d3d]">:</span>
          <span className="text-3xl sm:text-4xl md:text-6xl font-mono font-bold text-[#3d4d3d] tracking-tight">
            {minutes}
          </span>
          <span className="text-3xl sm:text-4xl md:text-6xl font-mono font-bold text-[#3d4d3d]">:</span>
          <span className="text-3xl sm:text-4xl md:text-6xl font-mono font-bold text-green-500 tracking-tight">
            {seconds}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        {/* Reset Button */}
        <button
          onClick={handleReset}
          disabled={elapsed === 0 && !isRunning}
          className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={isRunning ? handlePause : handleStart}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl active:scale-95 ${
            isRunning
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
          aria-label={isRunning ? 'Pause' : 'Start'}
        >
          {isRunning ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
        </button>

        {/* Lap Button */}
        <button
          onClick={handleLap}
          disabled={!isRunning || elapsed === 0}
          className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Lap"
        >
          <Flag className="w-5 h-5" />
        </button>
      </div>

      {/* Lap Times */}
{lapTimes.length > 0 && (
          <div
            className="mt-6 border-t border-gray-100 pt-4 animate-fadeInUp"
          >
            <h4 className="text-xs font-medium text-gray-400 uppercase mb-2">Lap Times</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {lapTimes.map((lap, index) => {
                const { hours: h, minutes: m, seconds: s } = formatTime(lap)
                return (
                  <div
                    key={`${lap}-${index}`}
                    className="flex items-center justify-between text-sm py-1 animate-fadeInUp"
                  >
                    <span className="text-gray-400">Lap {lapTimes.length - index}</span>
                    <span className="font-mono text-gray-700">
                      {h}:{m}:{s}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
</div>
  )
}
