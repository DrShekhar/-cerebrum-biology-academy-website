'use client'

import { useState, useEffect, useCallback } from 'react'
import { useStudySession } from '@/hooks/useStudySession'
import { RealTimeClock } from './RealTimeClock'
import { StudyStopwatch } from './StudyStopwatch'
import { PomodoroTimer } from './PomodoroTimer'
import { LiveStudentCount } from './LiveStudentCount'
import { AmbientMusicPlayer } from './AmbientMusicPlayer'
import { MotivationalQuotes } from './MotivationalQuotes'
import { SessionSettings } from './SessionSettings'
import type { DisplayMode } from '@/lib/study-with-me/types'
import Image from 'next/image'
import { Maximize2, X } from 'lucide-react'

interface StudyWithMePageProps {
  mode?: DisplayMode
  transparentBg?: boolean
}

export function StudyWithMePage({ mode = 'web', transparentBg = false }: StudyWithMePageProps) {
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Mark as hydrated after first client render
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Hide site header/footer in OBS mode by adding a body class
  // Use useEffect instead of useLayoutEffect to avoid hydration issues
  useEffect(() => {
    if (!isHydrated) return
    if (mode === 'obs') {
      document.body.classList.add('obs-overlay-mode')
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.classList.remove('obs-overlay-mode')
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [mode, isHydrated])

  // Handle Focus Mode body class and scrollbar
  useEffect(() => {
    if (!isHydrated) return
    if (isFocusMode) {
      document.body.classList.add('obs-overlay-mode')
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } else {
      document.body.classList.remove('obs-overlay-mode')
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [isFocusMode, isHydrated])

  // Exit focus mode handler
  const exitFocusMode = useCallback(() => {
    setIsFocusMode(false)
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    }
  }, [])

  // Enter focus mode handler
  const enterFocusMode = useCallback(() => {
    setIsFocusMode(true)
    document.documentElement.requestFullscreen().catch(() => {
      // Fullscreen may be blocked, but focus mode still works
    })
  }, [])

  // Handle ESC key and fullscreen change events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFocusMode) {
        exitFocusMode()
      }
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFocusMode) {
        setIsFocusMode(false)
      }
    }

    if (isFocusMode) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('fullscreenchange', handleFullscreenChange)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [isFocusMode, exitFocusMode])

  const {
    preferences,
    setClockFormat,
    setAmbientSound,
    setVolume,
    setTopicName,
    setPomodoroDurations,
    setPomodoroState,
    setStopwatchState,
  } = useStudySession(isFocusMode ? 'focus' : mode)

  // OBS Mode - Optimized for streaming overlay (1920x1080)
  if (mode === 'obs') {
    return (
      <div
        className={`fixed inset-0 z-[9999] w-full h-screen flex flex-col ${
          transparentBg ? 'bg-transparent' : 'bg-slate-900'
        }`}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-6">
          <RealTimeClock mode="obs" format={preferences.clockFormat} />
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-3">
              <Image
                src="/brain-logo.webp"
                alt="Cerebrum Biology"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <span className="text-2xl font-bold text-white">Cerebrum Biology</span>
            </div>
            {preferences.topicName && (
              <span className="text-lg text-green-400 mt-1 font-medium">
                {preferences.topicName}
              </span>
            )}
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="flex items-center space-x-24">
            <StudyStopwatch mode="obs" onStateChange={setStopwatchState} />
            <PomodoroTimer
              mode="obs"
              studyDuration={preferences.pomodoroStudyDuration}
              breakDuration={preferences.pomodoroBreakDuration}
              longBreakDuration={preferences.pomodoroLongBreakDuration}
              onStateChange={setPomodoroState}
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between px-8 py-6">
          <LiveStudentCount mode="obs" />
          <MotivationalQuotes mode="obs" />
        </div>
      </div>
    )
  }

  // Focus Mode - Fullscreen distraction-free view with interactive controls
  if (isFocusMode) {
    return (
      <div className="fixed inset-0 z-[9999] w-full h-screen flex flex-col bg-slate-900">
        {/* Exit Button */}
        <button
          onClick={exitFocusMode}
          className="absolute top-4 right-4 z-[10000] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Exit Focus Mode"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 md:px-8 py-4 md:py-6">
          <div className="flex flex-col">
            <RealTimeClock mode="focus" format={preferences.clockFormat} />
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-2 md:space-x-3">
              <Image
                src="/brain-logo.webp"
                alt="Cerebrum Biology"
                width={40}
                height={40}
                className="h-8 w-8 md:h-10 md:w-10"
              />
              <span className="text-lg md:text-2xl font-bold text-white">Cerebrum Biology</span>
            </div>
            {preferences.topicName && (
              <span className="text-sm md:text-lg text-green-400 mt-1 font-medium">
                {preferences.topicName}
              </span>
            )}
          </div>
        </div>

        {/* Center Content - Stopwatch & Pomodoro with Controls */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-24">
            <StudyStopwatch mode="focus" onStateChange={setStopwatchState} />
            <PomodoroTimer
              mode="focus"
              studyDuration={preferences.pomodoroStudyDuration}
              breakDuration={preferences.pomodoroBreakDuration}
              longBreakDuration={preferences.pomodoroLongBreakDuration}
              onStateChange={setPomodoroState}
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-8 py-4 md:py-6 gap-4 md:gap-0">
          <LiveStudentCount mode="focus" />
          <MotivationalQuotes mode="focus" />
        </div>

        {/* Focus Mode Hint */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/40 text-xs">
          Press ESC or click ✕ to exit
        </div>
      </div>
    )
  }

  // Web Mode - Responsive layout
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-[#3d4d3d] text-white py-4 px-4 md:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/brain-logo.webp"
              alt="Cerebrum Biology"
              width={40}
              height={40}
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <span className="text-lg md:text-xl font-bold">Cerebrum Biology</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={enterFocusMode}
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-lg font-medium transition-colors text-sm md:text-base"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="hidden sm:inline">Focus Mode</span>
            </button>
            <div className="text-right hidden md:block">
              <h1 className="text-lg md:text-xl font-bold">Study With Me</h1>
              <p className="text-xs md:text-sm text-green-200">NEET Biology Focus Session</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Primary Section: Clock + Stopwatch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <RealTimeClock
            format={preferences.clockFormat}
            onFormatChange={setClockFormat}
            mode="web"
          />
          <StudyStopwatch mode="web" onStateChange={setStopwatchState} />
        </div>

        {/* Secondary Section: Pomodoro + Student Count */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <PomodoroTimer
            mode="web"
            studyDuration={preferences.pomodoroStudyDuration}
            breakDuration={preferences.pomodoroBreakDuration}
            longBreakDuration={preferences.pomodoroLongBreakDuration}
            onStateChange={setPomodoroState}
            className="lg:col-span-2"
          />
          <LiveStudentCount mode="web" />
        </div>

        {/* Tertiary Section: Music + Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <AmbientMusicPlayer
            mode="web"
            sound={preferences.ambientSound}
            volume={preferences.volume}
            onSoundChange={setAmbientSound}
            onVolumeChange={setVolume}
          />
          <MotivationalQuotes mode="web" />
        </div>

        {/* Session Settings */}
        <SessionSettings
          mode="web"
          topicName={preferences.topicName}
          studyDuration={preferences.pomodoroStudyDuration}
          breakDuration={preferences.pomodoroBreakDuration}
          longBreakDuration={preferences.pomodoroLongBreakDuration}
          onTopicChange={setTopicName}
          onDurationChange={setPomodoroDurations}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-4 px-4 md:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© 2025 Cerebrum Biology Academy</p>
          <p className="mt-2 md:mt-0">Focus. Study. Succeed.</p>
        </div>
      </footer>
    </div>
  )
}
