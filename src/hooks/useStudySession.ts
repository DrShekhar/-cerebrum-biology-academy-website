'use client'

import { useState, useEffect, useCallback } from 'react'
import type {
  DisplayMode,
  ClockFormat,
  AmbientSound,
  StudySessionPreferences,
  PomodoroState,
  StopwatchState,
} from '@/lib/study-with-me/types'
import { STORAGE_KEYS, DEFAULT_PREFERENCES } from '@/lib/study-with-me/constants'

interface UseStudySessionReturn {
  // Display mode
  mode: DisplayMode
  setMode: (mode: DisplayMode) => void

  // Preferences
  preferences: StudySessionPreferences
  updatePreferences: (updates: Partial<StudySessionPreferences>) => void

  // Shortcut setters
  setClockFormat: (format: ClockFormat) => void
  setAmbientSound: (sound: AmbientSound) => void
  setVolume: (volume: number) => void
  setTopicName: (name: string) => void
  setPomodoroDurations: (study: number, breakTime: number, longBreak: number) => void

  // State tracking (read-only)
  pomodoroState: PomodoroState | null
  setPomodoroState: (state: PomodoroState) => void
  stopwatchState: StopwatchState | null
  setStopwatchState: (state: StopwatchState) => void

  // Tab visibility
  isTabVisible: boolean
}

export function useStudySession(initialMode: DisplayMode = 'web'): UseStudySessionReturn {
  const [mode, setMode] = useState<DisplayMode>(initialMode)
  const [preferences, setPreferences] = useState<StudySessionPreferences>(DEFAULT_PREFERENCES)
  const [pomodoroState, setPomodoroState] = useState<PomodoroState | null>(null)
  const [stopwatchState, setStopwatchState] = useState<StopwatchState | null>(null)
  const [isTabVisible, setIsTabVisible] = useState(true)

  // Load preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.preferences)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setPreferences((prev) => ({ ...prev, ...parsed }))
      } catch {
        // Ignore invalid data
      }
    }
  }, [])

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.preferences, JSON.stringify(preferences))
  }, [preferences])

  // Track tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden)
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  const updatePreferences = useCallback((updates: Partial<StudySessionPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }))
  }, [])

  const setClockFormat = useCallback(
    (format: ClockFormat) => {
      updatePreferences({ clockFormat: format })
    },
    [updatePreferences]
  )

  const setAmbientSound = useCallback(
    (sound: AmbientSound) => {
      updatePreferences({ ambientSound: sound })
    },
    [updatePreferences]
  )

  const setVolume = useCallback(
    (volume: number) => {
      updatePreferences({ volume })
    },
    [updatePreferences]
  )

  const setTopicName = useCallback(
    (topicName: string) => {
      updatePreferences({ topicName })
    },
    [updatePreferences]
  )

  const setPomodoroDurations = useCallback(
    (study: number, breakTime: number, longBreak: number) => {
      updatePreferences({
        pomodoroStudyDuration: study,
        pomodoroBreakDuration: breakTime,
        pomodoroLongBreakDuration: longBreak,
      })
    },
    [updatePreferences]
  )

  return {
    mode,
    setMode,
    preferences,
    updatePreferences,
    setClockFormat,
    setAmbientSound,
    setVolume,
    setTopicName,
    setPomodoroDurations,
    pomodoroState,
    setPomodoroState,
    stopwatchState,
    setStopwatchState,
    isTabVisible,
  }
}
