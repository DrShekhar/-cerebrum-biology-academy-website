'use client'

import { useState, useEffect } from 'react'
import { SeriesCard } from './SeriesCard'
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
              <div
                className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-fadeInUp"
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`course-series-grid animate-in ${className}`}>
{seriesData.map((series, index) => (
          <div
            key={`${series.id}-${selectedClass}`}
            className={getSeriesClassName(series.id)}
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
{hoveredCard === series.id && (
                <div
                  className="plan-buttons-container animate-fadeInUp"
                >
                  {/* Quick Plan Selection */}
                  <div className="space-y-3">
                    <h4
                      className="text-white font-bold text-lg mb-4 text-center animate-fadeInUp"
                    >
                      Quick Plan Selection
                    </h4>

                    {series.plans.map((plan, planIndex) => (
                      <button
                        key={plan.id}
                        onClick={() => handlePlanSelect(series.id, plan.id)}
                        className={`plan-button ${
                          selectedPlans[series.id] === plan.id ? 'selected' : ''
                        }`}
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
                      </button>
                    ))}

                    {/* Action Buttons */}
                    <div
                      className="flex space-x-3 mt-4 animate-fadeInUp"
                    >
                      <button
                        className="flex-1 bg-white/20 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-lg border border-white/30 hover:bg-white/30 transition-colors animate-fadeInUp"
                      >
                        View Details
                      </button>
                      {selectedPlans[series.id] && (
                        <button
                          className="flex-1 bg-[#4a5d4a] text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-fadeInUp"
                        >
                          Enroll Now
                        </button>
                      )}
                    </div>

                    {/* Quick Info */}
                    <div
                      className="text-center text-white/70 text-sm mt-3 animate-fadeInUp"
                    >
                      <div className="flex justify-center space-x-4 text-xs">
                        <span>📚 {series.batchSize} batch size</span>
                        <span>⏰ {series.weeklyHours}h/week</span>
                        <span>🎯 NEET focused</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
</div>
        ))}
{/* Selection Summary */}
{Object.keys(selectedPlans).length > 0 && (
          <div
            className="col-span-full mt-8 animate-fadeInUp"
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
                    <div
                      key={seriesId}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 animate-fadeInUp"
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
                    </div>
                  )
                })}
              </div>
              <div
                className="text-center mt-6 animate-fadeInUp"
              >
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all animate-fadeInUp"
                >
                  Proceed to Enrollment
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Complete your registration in just 2 minutes
                </p>
              </div>
            </div>
          </div>
        )}
</div>
  )
}
