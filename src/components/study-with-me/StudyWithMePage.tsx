'use client'

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

interface StudyWithMePageProps {
  mode?: DisplayMode
  transparentBg?: boolean
}

export function StudyWithMePage({ mode = 'web', transparentBg = false }: StudyWithMePageProps) {
  const {
    preferences,
    setClockFormat,
    setAmbientSound,
    setVolume,
    setTopicName,
    setPomodoroDurations,
    setPomodoroState,
    setStopwatchState,
  } = useStudySession(mode)

  // OBS Mode - Optimized for streaming overlay (1920x1080)
  // Uses fixed positioning to cover the entire viewport including any header/footer
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
          <div className="text-right">
            <h1 className="text-lg md:text-xl font-bold">Study With Me</h1>
            <p className="text-xs md:text-sm text-green-200">NEET Biology Focus Session</p>
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
          <p>© {new Date().getFullYear()} Cerebrum Biology Academy</p>
          <p className="mt-2 md:mt-0">Focus. Study. Succeed.</p>
        </div>
      </footer>
    </div>
  )
}
