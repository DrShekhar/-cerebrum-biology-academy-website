'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useScroll } from 'framer-motion'

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
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setProgress(Math.round(latest * 100))
    })
  }, [scrollYProgress])

  const timeRemaining = Math.max(0, Math.ceil(readTime * (1 - progress / 100)))

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 origin-left"
        style={{ scaleX }}
      />

      {(showPercentage || showTimeRemaining) && progress > 0 && progress < 100 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-4 top-2 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg border border-gray-100"
        >
          {showPercentage && <span className="text-xs font-medium text-gray-700">{progress}%</span>}
          {showTimeRemaining && timeRemaining > 0 && (
            <span className="text-xs text-gray-500">
              {timeRemaining} min{timeRemaining !== 1 ? 's' : ''} left
            </span>
          )}
        </motion.div>
      )}
    </div>
  )
}
