/**
 * Study With Me - TypeScript Interfaces
 */

export type DisplayMode = 'web' | 'obs' | 'focus'
export type ClockFormat = '12h' | '24h'
export type AmbientSound = 'lofi' | 'nature' | 'silence'
export type PomodoroPhase = 'study' | 'break' | 'longBreak' | 'idle'

export interface StudySessionPreferences {
  clockFormat: ClockFormat
  ambientSound: AmbientSound
  volume: number
  pomodoroStudyDuration: number
  pomodoroBreakDuration: number
  pomodoroLongBreakDuration: number
  topicName: string
}

export interface PomodoroState {
  phase: PomodoroPhase
  timeRemaining: number
  isRunning: boolean
  cycleCount: number
  totalStudyTime: number
}

export interface StopwatchState {
  elapsed: number
  isRunning: boolean
  lapTimes: number[]
}

export interface StudySessionState {
  stopwatch: StopwatchState
  pomodoro: PomodoroState
  preferences: StudySessionPreferences
  mode: DisplayMode
  isTabVisible: boolean
}

export interface MotivationalQuote {
  text: string
  author: string
  category?: 'motivation' | 'biology' | 'success' | 'persistence'
}

export interface StudyWithMePageProps {
  mode?: DisplayMode
  transparentBg?: boolean
}
