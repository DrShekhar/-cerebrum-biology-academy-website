'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, TrendingUp, Trophy, Star, MapPin } from 'lucide-react'
import { getRandomSuccessStory } from '@/data/studentSuccessData'

interface SuccessTickerProps {
  autoHideDuration?: number // Auto-hide after X minutes (0 = never auto-hide)
  scrollSpeed?: number // Speed of scrolling animation in seconds
  showCloseButton?: boolean
}

export function SuccessTicker({
  autoHideDuration = 5, // Auto-hide after 5 minutes
  scrollSpeed = 30, // 30 seconds for full scroll
  showCloseButton = true,
}: SuccessTickerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [successStories, setSuccessStories] = useState<string[]>([])

  // Generate success stories
  useEffect(() => {
    const stories: string[] = []
    for (let i = 0; i < 10; i++) {
      const story = getRandomSuccessStory()
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

    // Auto-hide after specified duration
    let hideTimer: NodeJS.Timeout
    if (autoHideDuration > 0) {
      hideTimer = setTimeout(
        () => {
          setIsVisible(false)
        },
        autoHideDuration * 60 * 1000
      )
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
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg border-t border-white/20"
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
            <motion.div
              className="flex items-center whitespace-nowrap"
              animate={{
                x: [0, -50 + '%'],
              }}
              transition={{
                duration: scrollSpeed,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <span className="text-sm font-medium">{scrollingText}</span>
            </motion.div>
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
      </motion.div>
    </AnimatePresence>
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
      const story = getRandomSuccessStory()
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
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      className="lg:hidden fixed bottom-4 left-4 right-4 z-40 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-lg shadow-lg"
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
    </motion.div>
  )
}
