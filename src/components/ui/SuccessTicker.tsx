'use client'

import { useState, useEffect } from 'react'
import { X, TrendingUp, Trophy } from 'lucide-react'
import { getRandomSuccessStory } from '@/data/studentSuccessData'

interface SuccessTickerProps {
  autoHideDuration?: number // Auto-hide after X seconds (0 = never auto-hide)
  scrollSpeed?: number // Speed of scrolling animation in seconds
  showCloseButton?: boolean
}

export function SuccessTicker({
  autoHideDuration = 0, // Don't auto-hide (0 = stay visible)
  scrollSpeed = 200, // 200 seconds for very readable scrolling (~3.3 minutes)
  showCloseButton = true,
}: SuccessTickerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [successStories, setSuccessStories] = useState<string[]>([])

  // Generate 50 unique success stories (excluding scores > 650)
  useEffect(() => {
    const stories: string[] = []
    let attempts = 0
    const maxAttempts = 150 // Prevent infinite loop

    while (stories.length < 50 && attempts < maxAttempts) {
      const story = getRandomSuccessStory()
      attempts++

      // Skip stories that mention scores > 650
      const scoreMatch = story.message.match(/(\d+)\s*marks?/i)
      if (scoreMatch) {
        const score = parseInt(scoreMatch[1])
        if (score > 650) {
          continue // Skip this story
        }
      }

      // Also check for score patterns like "scored 651"
      const scoredMatch = story.message.match(/scored?\s+(\d+)/i)
      if (scoredMatch) {
        const score = parseInt(scoredMatch[1])
        if (score > 650) {
          continue // Skip this story
        }
      }

      stories.push(story.message)
    }

    setSuccessStories(stories)
  }, [])

  // Show ticker after delay and handle auto-hide
  useEffect(() => {
    if (isDismissed) return

    // Show after 3 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    // Auto-hide after specified duration (in seconds)
    let hideTimer: NodeJS.Timeout
    if (autoHideDuration > 0) {
      hideTimer = setTimeout(() => {
        setIsVisible(false)
      }, autoHideDuration * 1000)
    }

    return () => {
      clearTimeout(showTimer)
      if (hideTimer) clearTimeout(hideTimer)
    }
  }, [autoHideDuration, isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  if (!isVisible || isDismissed || successStories.length === 0) return null

  // Create a continuous scrolling text by duplicating stories
  const scrollingText = [...successStories, ...successStories].join(' • ')

  return (
<div
        className="fixed bottom-16 sm:bottom-0 left-0 right-0 z-40 bg-blue-600 text-white shadow-lg border-t border-white/20 animate-fadeInUp"
      >
        <div className="relative overflow-hidden h-14 flex items-center">
          {/* Icon */}
          <div className="absolute left-4 z-10 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-600/80 pr-4">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold hidden sm:inline">Live Updates:</span>
          </div>

          {/* Scrolling Text */}
          <div className="absolute left-0 right-0 flex items-center h-full pl-16 sm:pl-40 pr-16">
            <div
              className="flex items-center whitespace-nowrap animate-fadeInUp"
            >
              <span className="text-sm font-medium">{scrollingText}</span>
            </div>
          </div>

          {/* Close Button */}
          {showCloseButton && (
            <button
              onClick={handleDismiss}
              className="absolute right-4 z-10 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
              aria-label="Close ticker"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          )}

          {/* Gradient Overlays for Fade Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-40 bg-gradient-to-r from-blue-600 to-transparent pointer-events-none z-20" />
          <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-40 bg-gradient-to-l from-indigo-600 to-transparent pointer-events-none z-20" />
        </div>
      </div>
)
}

// Compact mobile ticker variant
export function CompactSuccessTicker() {
  const [currentStory, setCurrentStory] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    if (isDismissed) return

    // Show only on mobile/tablet
    const isMobile = window.innerWidth <= 1024

    if (!isMobile) return

    const showTimer = setTimeout(() => setIsVisible(true), 3000)
    const hideTimer = setTimeout(() => setIsVisible(false), 180000) // 3 minutes

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [isDismissed])

  useEffect(() => {
    if (!isVisible) return

    const updateStory = () => {
      let story = getRandomSuccessStory()
      let attempts = 0
      const maxAttempts = 20

      // Keep trying until we get a story without high scores
      while (attempts < maxAttempts) {
        const scoreMatch = story.message.match(/(\d+)\s*marks?/i)
        const scoredMatch = story.message.match(/scored?\s+(\d+)/i)

        let hasHighScore = false
        if (scoreMatch && parseInt(scoreMatch[1]) > 650) {
          hasHighScore = true
        }
        if (scoredMatch && parseInt(scoredMatch[1]) > 650) {
          hasHighScore = true
        }

        if (!hasHighScore) {
          break // Found a valid story
        }

        story = getRandomSuccessStory()
        attempts++
      }

      setCurrentStory(story.message)
    }

    updateStory()
    const interval = setInterval(updateStory, 8000) // Change every 8 seconds

    return () => clearInterval(interval)
  }, [isVisible])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  if (!isVisible || isDismissed || !currentStory) return null

  return (
    <div
      className="lg:hidden fixed bottom-20 left-4 right-4 z-40 bg-[#4a5d4a] text-white p-3 rounded-lg shadow-lg animate-fadeInUp"
    >
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 mt-0.5">
          <Trophy className="w-4 h-4" />
        </div>
        <p className="flex-1 text-xs font-medium leading-relaxed">{currentStory}</p>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
