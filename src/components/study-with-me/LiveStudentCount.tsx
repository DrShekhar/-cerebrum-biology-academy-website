'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users } from 'lucide-react'
import type { DisplayMode } from '@/lib/study-with-me/types'
import { MOCK_STUDENT_COUNT } from '@/lib/study-with-me/constants'

interface LiveStudentCountProps {
  mode?: DisplayMode
  className?: string
  realTimeCount?: number // For future WebSocket integration
}

export function LiveStudentCount({
  mode = 'web',
  className = '',
  realTimeCount,
}: LiveStudentCountProps) {
  const [count, setCount] = useState(0)
  const [displayCount, setDisplayCount] = useState(0)
  const [isTabVisible, setIsTabVisible] = useState(true)

  // Generate realistic mock count
  const generateMockCount = useCallback(() => {
    const { min, max } = MOCK_STUDENT_COUNT
    // Add some variance based on time of day for realism
    const hour = new Date().getHours()
    let boost = 0

    // More students during study hours (6 AM - 10 PM)
    if (hour >= 6 && hour <= 22) {
      boost = Math.floor(Math.random() * 15)
    }
    // Peak hours (8-10 AM, 7-10 PM)
    if ((hour >= 8 && hour <= 10) || (hour >= 19 && hour <= 22)) {
      boost += Math.floor(Math.random() * 10)
    }

    return min + Math.floor(Math.random() * (max - min)) + boost
  }, [])

  // Handle tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden)
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Initialize and update count
  useEffect(() => {
    // Use real-time count if provided, otherwise mock
    if (realTimeCount !== undefined) {
      setCount(realTimeCount)
      return
    }

    // Initial count
    setCount(generateMockCount())

    // Only update when tab is visible
    if (!isTabVisible) return

    const interval = setInterval(() => {
      setCount((prev) => {
        // Small random walk (+/- 1-3 students)
        const change = Math.floor(Math.random() * 7) - 3
        const newCount = Math.max(
          MOCK_STUDENT_COUNT.min,
          Math.min(MOCK_STUDENT_COUNT.max + 20, prev + change)
        )
        return newCount
      })
    }, MOCK_STUDENT_COUNT.updateInterval)

    return () => clearInterval(interval)
  }, [realTimeCount, isTabVisible, generateMockCount])

  // Animated count display
  useEffect(() => {
    if (displayCount === count) return

    const diff = count - displayCount
    const step = diff > 0 ? 1 : -1
    const delay = Math.max(20, 100 / Math.abs(diff))

    const timer = setTimeout(() => {
      setDisplayCount((prev) => prev + step)
    }, delay)

    return () => clearTimeout(timer)
  }, [count, displayCount])

  // Badge mode - compact display for header/corner
  if (mode === 'badge') {
    return (
      <div
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 ${className}`}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-green-500"
        />
        <Users className="w-3.5 h-3.5 text-green-600" />
        <span className="text-sm font-semibold text-green-700">{displayCount}</span>
      </div>
    )
  }

  // OBS and Focus mode - minimal display (dark theme)
  if (mode === 'obs' || mode === 'focus') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-3 h-3 rounded-full bg-green-500"
        />
        <span className="text-2xl font-bold text-white">{displayCount}</span>
        <span className="text-lg text-gray-400">students studying</span>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className={`bg-white rounded-xl shadow-xl p-5 ${className}`}
    >
      <div className="flex items-center space-x-4">
        {/* Animated Icon */}
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center"
          >
            <Users className="w-6 h-6 text-green-600" />
          </motion.div>

          {/* Live indicator */}
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"
          />
        </div>

        {/* Count and Text */}
        <div>
          <div className="flex items-baseline space-x-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={displayCount}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-3xl font-bold text-[#3d4d3d]"
              >
                {displayCount}
              </motion.span>
            </AnimatePresence>
            <span className="text-gray-600">students</span>
          </div>
          <p className="text-sm text-gray-500">studying with you right now</p>
        </div>
      </div>

      {/* Subtle activity bar */}
      <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          animate={{
            width: ['20%', '60%', '40%', '80%', '30%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
        />
      </div>
    </motion.div>
  )
}
