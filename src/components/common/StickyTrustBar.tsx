'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Users, Star, BookOpen, X, TrendingUp } from 'lucide-react'

export function StickyTrustBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentMetric, setCurrentMetric] = useState(0)

  const trustMetrics = [
    {
      icon: Trophy,
      value: '94.2%',
      label: 'NEET Success Rate',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      icon: Users,
      value: '2,847+',
      label: 'Medical Seats Secured',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      icon: BookOpen,
      value: '247',
      label: 'AIIMS Selections',
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'Student Rating',
      color: 'text-orange-600 bg-orange-50 border-orange-200',
    },
  ]

  // Auto-rotate metrics every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % trustMetrics.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentTrustMetric = trustMetrics[currentMetric]
  const Icon = currentTrustMetric.icon

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Left: Rotating Trust Metric */}
            <motion.div
              key={currentMetric}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center space-x-3"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center border ${currentTrustMetric.color}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900">{currentTrustMetric.value}</span>
                <span className="text-sm text-gray-600 ml-2">{currentTrustMetric.label}</span>
              </div>
            </motion.div>

            {/* Center: Quick Stats */}
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600">127 students online</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-gray-600">+23% enrollment this month</span>
              </div>
            </div>

            {/* Right: Metric Indicators + Close */}
            <div className="flex items-center space-x-3">
              {/* Metric dots */}
              <div className="hidden sm:flex space-x-1">
                {trustMetrics.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMetric(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentMetric ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="Close trust bar"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
