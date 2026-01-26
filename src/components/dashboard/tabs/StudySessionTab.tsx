'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw } from 'lucide-react'

interface WeakArea {
  chapter: string
  topic: string
  difficulty: 'low' | 'medium' | 'high'
  improvement: number
  recommendedStudyTime: number
}

interface StudySessionTabProps {
  studyTimer: number
  isStudying: boolean
  currentSession: string
  weakAreas: WeakArea[]
  onStartSession: (chapter: string) => void
  onPauseSession: () => void
  onStopSession: () => void
  formatTime: (seconds: number) => string
}

export function StudySessionTab({
  studyTimer,
  isStudying,
  currentSession,
  weakAreas,
  onStartSession,
  onPauseSession,
  onStopSession,
  formatTime,
}: StudySessionTabProps) {
  return (
    <motion.div
      key="study"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4 sm:space-y-8"
    >
      {/* Study Timer - Mobile Optimized */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            📚 Study Timer
          </h3>
          <div className="text-4xl sm:text-6xl font-mono font-bold text-blue-600 mb-4 sm:mb-6">
            {formatTime(studyTimer)}
          </div>
          {currentSession && (
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Studying: <span className="font-semibold">{currentSession}</span>
            </p>
          )}
          <div className="flex justify-center space-x-3 sm:space-x-4">
            {!isStudying ? (
              <button
                onClick={() => onStartSession(currentSession || 'General Study')}
                aria-label="Start study session"
                className="flex items-center space-x-2 bg-green-600 text-white px-5 sm:px-6 py-3 rounded-lg hover:bg-green-700 transition-colors min-h-[48px] touch-action-manipulation active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base font-medium">Start</span>
              </button>
            ) : (
              <button
                onClick={onPauseSession}
                aria-label="Pause study session"
                className="flex items-center space-x-2 bg-yellow-500 text-white px-5 sm:px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors min-h-[48px] touch-action-manipulation active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base font-medium">Pause</span>
              </button>
            )}
            <button
              onClick={onStopSession}
              aria-label="Reset study timer"
              className="flex items-center space-x-2 bg-red-600 text-white px-5 sm:px-6 py-3 rounded-lg hover:bg-red-700 transition-colors min-h-[48px] touch-action-manipulation active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base font-medium">Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Study Options - Mobile Optimized */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {weakAreas.map((area, index) => (
          <div key={index} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 truncate">
              {area.chapter}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
              {area.topic}
            </p>
            <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
              <span className="text-xs sm:text-sm text-gray-500">
                Recommended: {area.recommendedStudyTime} min
              </span>
              <span
                className={`text-xs px-2 py-1 rounded flex-shrink-0 ${
                  area.difficulty === 'high'
                    ? 'bg-red-100 text-red-600'
                    : area.difficulty === 'medium'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-green-100 text-green-600'
                }`}
              >
                {area.difficulty}
              </span>
            </div>
            <button
              onClick={() => onStartSession(area.chapter)}
              aria-label={`Start study session for ${area.chapter}`}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base touch-action-manipulation min-h-[48px] active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Start Session
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
