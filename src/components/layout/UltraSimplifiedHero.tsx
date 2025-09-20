'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { EnhancedCourseFinderQuiz } from '@/components/conversion/EnhancedCourseFinderQuiz'
import { LiveTrustIndicators } from '@/components/conversion/ProgressiveDisclosureQuiz'

interface UltraSimplifiedHeroProps {
  className?: string
}

export function UltraSimplifiedHero({ className = '' }: UltraSimplifiedHeroProps) {
  const [showScrollArrow, setShowScrollArrow] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollArrow(window.scrollY < 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleQuizComplete = (result: any) => {
    console.log('Quiz completed:', result)
    // Track completion and redirect to enrollment
  }

  const scrollToCourses = () => {
    const coursesSection = document.getElementById('courses')
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      className={`hero-section h-screen flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden ${className}`}
    >
      {/* Background Effects - Minimal */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Simple, Clear Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white leading-tight">
              Master Biology.
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Crack NEET.
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 font-medium">
              AIIMS Faculty • 94% Success Rate • 3 Delhi NCR Centers
            </p>
          </motion.div>

          {/* Smart Quiz Widget (Replaces multiple CTAs) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <EnhancedCourseFinderQuiz onComplete={handleQuizComplete} />
          </motion.div>

          {/* Single Secondary CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6"
          >
            <button
              onClick={scrollToCourses}
              className="text-gray-400 hover:text-white transition-colors duration-200 font-medium group"
            >
              Or browse all courses{' '}
              <span className="inline-block transition-transform group-hover:translate-y-1">↓</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Trust Elements */}
      <LiveTrustIndicators />

      {/* Scroll Indicator */}
      {showScrollArrow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 text-center cursor-pointer"
            onClick={scrollToCourses}
          >
            <div className="text-sm mb-2">Scroll to explore</div>
            <div className="text-2xl">↓</div>
          </motion.div>
        </motion.div>
      )}

      {/* Additional Trust Elements - Subtle */}
      <div className="absolute top-6 left-6 text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span>Live classes in progress</span>
        </div>
      </div>

      <div className="absolute top-6 right-6 text-gray-400 text-sm text-right">
        <div>247 AIIMS Selections</div>
        <div className="text-xs opacity-70">This year alone</div>
      </div>
    </section>
  )
}
