'use client'

import { useState, useEffect } from 'react'
import { Settings, BookOpen, Clock, Coffee, Moon } from 'lucide-react'
import type { DisplayMode } from '@/lib/study-with-me/types'

interface SessionSettingsProps {
  mode?: DisplayMode
  topicName: string
  studyDuration: number
  breakDuration: number
  longBreakDuration: number
  onTopicChange: (topic: string) => void
  onDurationChange: (study: number, breakTime: number, longBreak: number) => void
  className?: string
}

export function SessionSettings({
  mode = 'web',
  topicName,
  studyDuration,
  breakDuration,
  longBreakDuration,
  onTopicChange,
  onDurationChange,
  className = '',
}: SessionSettingsProps) {
  const [localTopic, setLocalTopic] = useState(topicName)
  const [localStudy, setLocalStudy] = useState(Math.floor(studyDuration / 60))
  const [localBreak, setLocalBreak] = useState(Math.floor(breakDuration / 60))
  const [localLongBreak, setLocalLongBreak] = useState(Math.floor(longBreakDuration / 60))
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    setLocalTopic(topicName)
  }, [topicName])

  useEffect(() => {
    setLocalStudy(Math.floor(studyDuration / 60))
    setLocalBreak(Math.floor(breakDuration / 60))
    setLocalLongBreak(Math.floor(longBreakDuration / 60))
  }, [studyDuration, breakDuration, longBreakDuration])

  const handleTopicBlur = () => {
    if (localTopic !== topicName) {
      onTopicChange(localTopic)
    }
  }

  const handleDurationChange = () => {
    const newStudy = localStudy * 60
    const newBreak = localBreak * 60
    const newLongBreak = localLongBreak * 60

    if (
      newStudy !== studyDuration ||
      newBreak !== breakDuration ||
      newLongBreak !== longBreakDuration
    ) {
      onDurationChange(newStudy, newBreak, newLongBreak)
    }
  }

  if (mode === 'obs') return null

  return (
    <div
      className={`bg-white rounded-xl shadow-xl overflow-hidden ${className}`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-[#3d4d3d]" />
          <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider">
            Session Settings
          </h3>
        </div>
        <span className="text-gray-400 animate-fadeInUp">
          ▼
        </span>
      </button>

      <div
        className="overflow-hidden animate-fadeInUp"
      >
        <div className="p-4 pt-0 space-y-4">
          {/* Topic Name */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-600">
              <BookOpen className="w-4 h-4" />
              <span>Session Topic</span>
            </label>
            <input
              type="text"
              value={localTopic}
              onChange={(e) => setLocalTopic(e.target.value)}
              onBlur={handleTopicBlur}
              placeholder="e.g., Chapter 5: Genetics"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-400">Displayed on OBS overlay</p>
          </div>

          {/* Pomodoro Durations */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-600">Pomodoro Durations</label>

            {/* Study Duration */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 w-32">
                <Clock className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">Focus</span>
              </div>
              <input
                type="number"
                min={1}
                max={120}
                value={localStudy}
                onChange={(e) =>
                  setLocalStudy(Math.max(1, Math.min(120, parseInt(e.target.value) || 1)))
                }
                onBlur={handleDurationChange}
                className="w-20 px-3 py-1.5 border border-gray-200 rounded-lg text-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <span className="text-sm text-gray-400">min</span>
            </div>

            {/* Break Duration */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 w-32">
                <Coffee className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">Short Break</span>
              </div>
              <input
                type="number"
                min={1}
                max={30}
                value={localBreak}
                onChange={(e) =>
                  setLocalBreak(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))
                }
                onBlur={handleDurationChange}
                className="w-20 px-3 py-1.5 border border-gray-200 rounded-lg text-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-sm text-gray-400">min</span>
            </div>

            {/* Long Break Duration */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 w-32">
                <Moon className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-600">Long Break</span>
              </div>
              <input
                type="number"
                min={1}
                max={60}
                value={localLongBreak}
                onChange={(e) =>
                  setLocalLongBreak(Math.max(1, Math.min(60, parseInt(e.target.value) || 1)))
                }
                onBlur={handleDurationChange}
                className="w-20 px-3 py-1.5 border border-gray-200 rounded-lg text-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <span className="text-sm text-gray-400">min</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
            Changes apply to the next Pomodoro cycle
          </p>
        </div>
      </div>
    </div>
  )
}
