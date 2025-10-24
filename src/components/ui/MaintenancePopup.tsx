'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Wrench } from 'lucide-react'

export function MaintenancePopup() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-8 right-8 z-[9999]"
          style={{
            width: '132px',
            height: '91px',
          }}
        >
          <div className="relative w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-2xl border border-amber-200 p-3 flex flex-col items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors duration-200 group"
              aria-label="Close maintenance notice"
            >
              <X className="w-3 h-3 text-gray-600 group-hover:text-gray-800" />
            </button>

            {/* Icon with animation */}
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-1"
            >
              <Wrench className="w-5 h-5 text-amber-600" />
            </motion.div>

            {/* Text */}
            <div className="text-center">
              <p className="text-[9px] font-semibold text-gray-800 leading-tight mb-0.5">
                Site Under
              </p>
              <p className="text-[9px] font-semibold text-gray-800 leading-tight mb-1">
                Maintenance
              </p>
              <p className="text-[7px] text-gray-600 leading-tight">Will be live soon</p>
            </div>

            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-b-2xl"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 5, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
