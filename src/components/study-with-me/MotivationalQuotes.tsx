'use client'

import { useState, useEffect, useCallback } from 'react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import type { DisplayMode, MotivationalQuote } from '@/lib/study-with-me/types'
import { MOTIVATIONAL_QUOTES, QUOTE_ROTATION_INTERVAL } from '@/lib/study-with-me/constants'

interface MotivationalQuotesProps {
  mode?: DisplayMode
  className?: string
  autoRotate?: boolean
  rotationInterval?: number
}

export function MotivationalQuotes({
  mode = 'web',
  className = '',
  autoRotate = true,
  rotationInterval = QUOTE_ROTATION_INTERVAL,
}: MotivationalQuotesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTabVisible, setIsTabVisible] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)

  // Mark as hydrated and randomize starting quote after mount
  useEffect(() => {
    setIsHydrated(true)
    setCurrentIndex(Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length))
  }, [])

  // Handle tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden)
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Auto-rotate quotes
  useEffect(() => {
    if (!autoRotate || isPaused || !isTabVisible) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length)
    }, rotationInterval)

    return () => clearInterval(interval)
  }, [autoRotate, isPaused, isTabVisible, rotationInterval])

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + MOTIVATIONAL_QUOTES.length) % MOTIVATIONAL_QUOTES.length)
  }, [])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length)
  }, [])

  const currentQuote: MotivationalQuote = MOTIVATIONAL_QUOTES[currentIndex]

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'biology':
        return 'bg-green-100 text-green-700'
      case 'motivation':
        return 'bg-blue-100 text-blue-700'
      case 'persistence':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  // OBS and Focus mode - clean quote display (dark theme)
  if (mode === 'obs' || mode === 'focus') {
    return (
      <div className={`text-center max-w-2xl mx-auto ${className}`}>
<div
            key={currentIndex}
           className="animate-fadeInUp">
            <p className="text-xl text-gray-200 italic leading-relaxed">"{currentQuote.text}"</p>
            <p className="text-sm text-gray-400 mt-3">— {currentQuote.author}</p>
          </div>
</div>
    )
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-xl p-6 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Quote className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Motivation</h3>
        </div>
        {currentQuote.category && (
          <span
            className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(currentQuote.category)}`}
          >
            {currentQuote.category}
          </span>
        )}
      </div>

      {/* Quote Display */}
      <div className="min-h-[120px] flex items-center justify-center">
<div
            key={currentIndex}
            className="text-center animate-fadeInUp"
          >
            <p className="text-lg text-gray-700 leading-relaxed italic">"{currentQuote.text}"</p>
            <p className="text-sm text-gray-500 mt-3 font-medium">— {currentQuote.author}</p>
          </div>
</div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={handlePrevious}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          aria-label="Previous quote"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>

        {/* Progress dots */}
        <div className="flex items-center space-x-1">
          {MOTIVATIONAL_QUOTES.slice(0, 10).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                index === currentIndex % 10 ? 'bg-[#3d4d3d] w-3' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to quote ${index + 1}`}
            />
          ))}
          {MOTIVATIONAL_QUOTES.length > 10 && <span className="text-xs text-gray-400">...</span>}
        </div>

        <button
          onClick={handleNext}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          aria-label="Next quote"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Pause indicator */}
      {isPaused && <p className="text-xs text-center text-gray-400 mt-2">Paused while hovering</p>}
    </div>
  )
}
