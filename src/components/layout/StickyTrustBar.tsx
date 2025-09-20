'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface StickyTrustBarProps {
  className?: string
  isVisible?: boolean
}

export function StickyTrustBar({ className = '', isVisible = true }: StickyTrustBarProps) {
  const handleBookDemo = () => {
    window.location.href = '/demo'
  }

  const handleCallNow = () => {
    window.open('tel:+918826444334', '_self')
  }

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`trust-bar sticky top-0 z-40 bg-slate-900/95 backdrop-blur ${className}`}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-6 text-sm">
            <span className="text-gray-300">📚 5000+ Students</span>
            <span className="text-gray-300">🏆 247 AIIMS</span>
            <span className="text-gray-300">✅ 94% Success</span>
          </div>
          <div className="quick-actions flex gap-3">
            <button
              onClick={handleBookDemo}
              className="bg-emerald-600 hover:bg-emerald-700 px-4 py-1 rounded-lg text-sm text-white transition-colors duration-200"
            >
              Book Free Demo
            </button>
            <button
              onClick={handleCallNow}
              className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 text-sm"
            >
              📞 Call Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
