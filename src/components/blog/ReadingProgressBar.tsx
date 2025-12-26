'use client'

import { useEffect, useState, useCallback } from 'react'

interface ReadingProgressBarProps {
  showPercentage?: boolean
  showTimeRemaining?: boolean
  readTime?: number
}

export function ReadingProgressBar({
  showPercentage = false,
  showTimeRemaining = false,
  readTime = 5,
}: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0)

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    setProgress(Math.min(100, Math.max(0, scrollPercent)))
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [updateProgress])

  const timeRemaining = Math.max(0, Math.ceil(readTime * (1 - progress / 100)))

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className="h-1 bg-indigo-600 transition-transform duration-150 ease-out origin-left"
        style={{ transform: `scaleX(${progress / 100})` }}
      />

      {(showPercentage || showTimeRemaining) && progress > 0 && progress < 100 && (
        <div className="absolute right-4 top-2 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg border border-gray-100 animate-fade-in">
          {showPercentage && (
            <span className="text-xs font-medium text-gray-700">{Math.round(progress)}%</span>
          )}
          {showTimeRemaining && timeRemaining > 0 && (
            <span className="text-xs text-gray-500">
              {timeRemaining} min{timeRemaining !== 1 ? 's' : ''} left
            </span>
          )}
        </div>
      )}
    </div>
  )
}
