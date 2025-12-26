'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SeriesCard } from './SeriesCard'
import { PlanButtons } from './PlanButtons'
import '@/styles/courseSeriesGrid.css'

interface CourseSeriesContainerProps {
  selectedClass: string
  seriesData: Array<{
    id: string
    name: string
    description: string
    icon: string
    color: string
    batchSize: number
    weeklyHours: number
    plans: Array<{
      id: 'A' | 'B' | 'C'
      name: string
      duration: string
      price: number
      features: string[]
      popular?: boolean
    }>
  }>
  onPlanSelect?: (seriesId: string, planId: string) => void
  className?: string
}

export function CourseSeriesContainer({
  selectedClass,
  seriesData,
  onPlanSelect,
  className = '',
}: CourseSeriesContainerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPlans, setSelectedPlans] = useState<Record<string, string>>({})
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [selectedClass])

  const handlePlanSelect = (seriesId: string, planId: string) => {
    setSelectedPlans((prev) => ({
      ...prev,
      [seriesId]: planId,
    }))

    if (onPlanSelect) {
      onPlanSelect(seriesId, planId)
    }
  }

  const getSeriesClassName = (seriesId: string): string => {
    const baseClass = 'course-card'
    const seriesClass = seriesId.toLowerCase()
    const loadingClass = isLoading ? 'loading' : ''

    return `${baseClass} ${seriesClass} ${loadingClass}`.trim()
  }

  if (isLoading) {
    return (
      <div className={`course-series-grid ${className}`}>
        {[1, 2, 3].map((index) => (
          <div key={index} className="course-card loading">
            <div className="h-96 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`course-series-grid animate-in ${className}`}>
      <AnimatePresence mode="wait">
        {seriesData.map((series, index) => (
          <motion.div
            key={`${series.id}-${selectedClass}`}
            className={getSeriesClassName(series.id)}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            onHoverStart={() => setHoveredCard(series.id)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            {/* Main Series Card */}
            <SeriesCard
              series={series}
              classLevel={selectedClass}
              onPlanSelect={handlePlanSelect}
            />

            {/* Enhanced Plan Buttons Overlay */}
            <AnimatePresence>
              {hoveredCard === series.id && (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="plan-buttons-container"
                >
                  {/* Quick Plan Selection */}
                  <div className="space-y-3">
                    <motion.h4
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-white font-bold text-lg mb-4 text-center"
                    >
                      Quick Plan Selection
                    </motion.h4>

                    {series.plans.map((plan, planIndex) => (
                      <motion.button
                        key={plan.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + planIndex * 0.1 }}
                        onClick={() => handlePlanSelect(series.id, plan.id)}
                        className={`plan-button ${
                          selectedPlans[series.id] === plan.id ? 'selected' : ''
                        }`}
                        whileHover={{
                          scale: 1.02,
                          x: 4,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center">
                          <div className="plan-button-icon">
                            {plan.id === 'A' ? '🚀' : plan.id === 'B' ? '📚' : '🎯'}
                          </div>
                          <div className="plan-button-details">
                            <div className="plan-button-title">
                              Plan {plan.id} - {plan.name}
                            </div>
                            <div className="plan-button-subtitle">
                              {plan.duration}
                              {plan.popular && (
                                <span className="ml-2 text-yellow-300">⭐ Popular</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="plan-button-price">₹{plan.price}/mo</div>
                      </motion.button>
                    ))}

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex space-x-3 mt-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-white/20 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-lg border border-white/30 hover:bg-white/30 transition-colors"
                      >
                        View Details
                      </motion.button>
                      {selectedPlans[series.id] && (
                        <motion.button
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                        >
                          Enroll Now
                        </motion.button>
                      )}
                    </motion.div>

                    {/* Quick Info */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-center text-white/70 text-sm mt-3"
                    >
                      <div className="flex justify-center space-x-4 text-xs">
                        <span>📚 {series.batchSize} batch size</span>
                        <span>⏰ {series.weeklyHours}h/week</span>
                        <span>🎯 NEET focused</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Selection Summary */}
      <AnimatePresence>
        {Object.keys(selectedPlans).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="col-span-full mt-8"
          >
            <div className="bg-gradient-to-r from-green-50 to-green-50 rounded-3xl p-6 border border-green-200 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                📋 Your Selections for Class {selectedClass}
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(selectedPlans).map(([seriesId, planId]) => {
                  const series = seriesData.find((s) => s.id === seriesId)
                  const plan = series?.plans.find((p) => p.id === planId)

                  if (!series || !plan) return null

                  return (
                    <motion.div
                      key={seriesId}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50"
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">
                          {seriesId === 'pinnacle' ? '👑' : seriesId === 'ascent' ? '⚡' : '🚀'}
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-1">{series.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Plan {plan.id} - {plan.name}
                        </p>
                        <div className="text-lg font-bold text-green-600">₹{plan.price}/month</div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                >
                  Proceed to Enrollment
                </motion.button>
                <p className="text-sm text-gray-500 mt-2">
                  Complete your registration in just 2 minutes
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
