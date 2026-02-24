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
      <div className="fixed inset-0 z-[9999] w-full h-screen flex flex-col bg-slate-900 overflow-hidden">
        {/* Exit Button - positioned safely away from content */}
        <button
          onClick={exitFocusMode}
          className="absolute top-2 right-2 md:top-4 md:right-4 z-[10000] p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Exit Focus Mode"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Top Bar - Stacked on mobile, side-by-side on desktop */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-8 pt-12 md:pt-6 pb-2 md:pb-6">
          {/* Clock Section */}
          <div className="flex flex-col items-center md:items-start mb-2 md:mb-0">
            <RealTimeClock mode="focus" format={preferences.clockFormat} />
          </div>
          {/* Branding Section - Hidden on very small screens, compact on mobile */}
          <div className="hidden sm:flex flex-col items-center md:items-end">
            <div className="flex items-center space-x-2 md:space-x-3">
              <Image
                src="/brain-logo.webp"
                alt="Cerebrum Biology"
                width={40}
                height={40}
                className="h-6 w-6 md:h-10 md:w-10"
              />
              <span className="text-base md:text-2xl font-bold text-white">Cerebrum Biology</span>
            </div>
            {preferences.topicName && (
              <span className="text-xs md:text-lg text-green-400 mt-1 font-medium text-center md:text-right max-w-[200px] md:max-w-none truncate">
                {preferences.topicName}
              </span>
            )}
          </div>
        </div>

        {/* Center Content - Stopwatch & Pomodoro with Controls */}
        <div className="flex-1 flex items-center justify-center px-2 md:px-8 min-h-0">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-16 lg:gap-24 scale-90 md:scale-100">
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

        {/* Bottom Bar - Stacked on mobile */}
        <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-2 md:py-6 gap-2 md:gap-0">
          <LiveStudentCount mode="focus" />
          <div className="max-w-full md:max-w-md overflow-hidden">
            <MotivationalQuotes mode="focus" />
          </div>
        </div>

        {/* Focus Mode Hint - Hidden on mobile to save space */}
        <div className="hidden md:block absolute bottom-2 left-1/2 -translate-x-1/2 text-white/40 text-xs">
          Press ESC or click ✕ to exit
        </div>
      </div>
    )
  }

  // Web Mode - Responsive layout (compact version)
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-[#3d4d3d] text-white py-3 px-4 md:px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/brain-logo.webp"
              alt="Cerebrum Biology"
              width={32}
              height={32}
              className="h-7 w-7 md:h-8 md:w-8"
            />
            <span className="text-base md:text-lg font-bold">Cerebrum Biology</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Student Count Badge - Top Right */}
            <LiveStudentCount mode="badge" />
            <button
              onClick={enterFocusMode}
              className="flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-1.5 bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-lg font-medium transition-colors text-xs md:text-sm"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Focus Mode</span>
            </button>
            <div className="text-right hidden md:block">
              <h1 className="text-base md:text-lg font-bold">Study With Me</h1>
              <p className="text-xs text-green-200">NEET Biology Focus Session</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Compact layout with reduced padding and gaps */}
      <main className="max-w-6xl mx-auto px-3 md:px-5 py-3 md:py-5">
        {/* Primary Section: Clock + Stopwatch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
          <RealTimeClock
            format={preferences.clockFormat}
            onFormatChange={setClockFormat}
            mode="web"
          />
          <StudyStopwatch mode="web" onStateChange={setStopwatchState} />
        </div>

        {/* Secondary Section: Pomodoro (compact) + Quotes (moved here) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-4">
          <PomodoroTimer
            mode="web"
            studyDuration={preferences.pomodoroStudyDuration}
            breakDuration={preferences.pomodoroBreakDuration}
            longBreakDuration={preferences.pomodoroLongBreakDuration}
            onStateChange={setPomodoroState}
            className="lg:col-span-2"
            compact
          />
          <MotivationalQuotes mode="web" />
        </div>

        {/* Tertiary Section: Music + Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
          <AmbientMusicPlayer
            mode="web"
            sound={preferences.ambientSound}
            volume={preferences.volume}
            onSoundChange={setAmbientSound}
            onVolumeChange={setVolume}
          />
          <SessionSettings
            mode="web"
            topicName={preferences.topicName}
            studyDuration={preferences.pomodoroStudyDuration}
            breakDuration={preferences.pomodoroBreakDuration}
            longBreakDuration={preferences.pomodoroLongBreakDuration}
            onTopicChange={setTopicName}
            onDurationChange={setPomodoroDurations}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-4 px-4 md:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© 2026 Cerebrum Biology Academy</p>
          <p className="mt-2 md:mt-0">Focus. Study. Succeed.</p>
        </div>
      </footer>

      {/* Mobile Floating Action Button for Focus Mode */}
      <button
        onClick={enterFocusMode}
        className="fixed bottom-6 right-6 z-50 md:hidden flex items-center justify-center w-14 h-14 bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-full shadow-lg transition-all active:scale-95"
        aria-label="Enter Focus Mode"
      >
        <Maximize2 className="w-6 h-6" />
      </button>
    </div>
  )
}
