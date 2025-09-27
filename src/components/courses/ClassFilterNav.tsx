'use client'

import { ClassLevel } from '@/types/courseSystem'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface ClassFilterNavProps {
  selectedClass: ClassLevel | 'all'
  onClassSelect: (classLevel: ClassLevel | 'all') => void
  courseCounts: Record<ClassLevel, number>
}

export function ClassFilterNav({
  selectedClass,
  onClassSelect,
  courseCounts,
}: ClassFilterNavProps) {
  const [hoveredClass, setHoveredClass] = useState<string | null>(null)

  const classOptions: Array<{
    value: ClassLevel | 'all'
    label: string
    emoji: string
    gradient: string
    seriesCount: number
    description: string
  }> = [
    {
      value: 'all',
      label: 'All Classes',
      emoji: '📚',
      gradient: 'from-slate-500 to-slate-600',
      seriesCount: 0,
      description: 'Browse all available courses',
    },
    {
      value: '9th',
      label: 'Class 9th',
      emoji: '🌱',
      gradient: 'from-emerald-500 to-emerald-600',
      seriesCount: 3,
      description: 'Building strong biology basics',
    },
    {
      value: '10th',
      label: 'Class 10th',
      emoji: '🌿',
      gradient: 'from-green-500 to-green-600',
      seriesCount: 3,
      description: 'Foundation for NEET preparation',
    },
    {
      value: '11th',
      label: 'Class 11th',
      emoji: '🎯',
      gradient: 'from-blue-500 to-blue-600',
      seriesCount: 3,
      description: 'NEET Biology preparation focus',
    },
    {
      value: '12th',
      label: 'Class 12th',
      emoji: '🏆',
      gradient: 'from-purple-500 to-purple-600',
      seriesCount: 3,
      description: 'Complete NEET readiness',
    },
    {
      value: 'Dropper',
      label: 'Droppers',
      emoji: '💪',
      gradient: 'from-orange-500 to-orange-600',
      seriesCount: 3,
      description: 'Intensive rank improvement program',
    },
  ]

  const getTotalCourses = () => {
    return Object.values(courseCounts).reduce((sum, count) => sum + count, 0)
  }

  const getSeriesCount = (value: ClassLevel | 'all') => {
    return value === 'all' ? 0 : 3 // Each class has 3 series (Pinnacle, Ascent, Pursuit)
  }

  return (
    <div className="relative mb-8">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20" />

      {/* Main container */}
      <div className="relative p-4 overflow-x-auto">
        <div className="flex space-x-3 min-w-max">
          {classOptions.map((option, index) => {
            const isSelected = selectedClass === option.value
            const isHovered = hoveredClass === option.value
            const seriesCount = getSeriesCount(option.value)

            return (
              <motion.div
                key={option.value}
                layout
                className="relative"
                onHoverStart={() => setHoveredClass(option.value)}
                onHoverEnd={() => setHoveredClass(null)}
              >
                {/* Selection indicator */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      layoutId="classSelection"
                      className="absolute inset-0 rounded-2xl border-3 border-white shadow-selection bg-gradient-to-r from-green-500/30 to-green-600/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.05 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                        duration: 0.3,
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Main button */}
                <motion.button
                  onClick={() => {
                    // Add haptic feedback for mobile
                    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                      navigator.vibrate(50)
                    }
                    onClassSelect(option.value)
                  }}
                  className={`relative flex flex-col items-center p-4 rounded-2xl font-semibold transition-all duration-300 whitespace-nowrap min-w-[140px] group focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                    isSelected ? 'text-white shadow-2xl z-10' : 'text-gray-700 hover:text-gray-900'
                  }`}
                  style={{
                    background: isSelected
                      ? `linear-gradient(135deg, var(--tw-gradient-stops))`
                      : isHovered
                        ? 'rgba(16, 185, 129, 0.1)'
                        : 'rgba(255, 255, 255, 0.7)',
                    border: isHovered && !isSelected ? '2px solid #10b981' : 'none',
                  }}
                  whileHover={{
                    scale: isSelected ? 1.05 : 1.03,
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.1, type: 'spring', stiffness: 400 },
                  }}
                >
                  {/* Gradient background for selected state */}
                  {isSelected && (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${option.gradient} rounded-2xl opacity-100`}
                      style={{ zIndex: -1 }}
                    />
                  )}

                  {/* Icon with animation */}
                  <motion.div
                    className="text-3xl mb-2"
                    animate={{
                      scale: isSelected ? 1.2 : 1,
                      rotate: isSelected ? 5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {option.emoji}
                  </motion.div>

                  {/* Label */}
                  <div className="text-sm font-bold mb-1">{option.label}</div>

                  {/* Series count indicator */}
                  <AnimatePresence mode="wait">
                    {seriesCount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`flex items-center space-x-1 text-xs ${
                          isSelected ? 'text-white/80' : 'text-gray-500'
                        }`}
                      >
                        <div className="w-1 h-1 rounded-full bg-current" />
                        <span>{seriesCount} Series</span>
                        <div className="w-1 h-1 rounded-full bg-current" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hover tooltip */}
                  <AnimatePresence>
                    {isHovered && !isSelected && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-20"
                      >
                        <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                          {option.description}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Ripple effect on click */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Selected class info panel */}
        <AnimatePresence mode="wait">
          {selectedClass !== 'all' && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="mt-4 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-gray-700">
                      Showing 3 Biology Series for{' '}
                      {classOptions.find((opt) => opt.value === selectedClass)?.label} Students
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>Pinnacle</span>
                    <div className="w-1 h-1 bg-gray-400 rounded-full" />
                    <span>Ascent</span>
                    <div className="w-1 h-1 bg-gray-400 rounded-full" />
                    <span>Pursuit</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
