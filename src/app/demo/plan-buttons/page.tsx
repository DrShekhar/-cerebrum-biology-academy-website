'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PlanButtons } from '@/components/courses/PlanButtons'
import '@/styles/planButtons.css'

export default function PlanButtonsDemo() {
  const [selectedPlan, setSelectedPlan] = useState<string>('')
  const [currentSeries, setCurrentSeries] = useState<'pinnacle' | 'ascent' | 'pursuit'>('ascent')

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    console.log(`Selected Plan ${planId} for ${currentSeries} series`)
  }

  const seriesOptions = [
    { id: 'pinnacle', name: 'Elite Mastery', emoji: '👑' },
    { id: 'ascent', name: 'Advanced Plus', emoji: '⚡' },
    { id: 'pursuit', name: 'Foundation Pro', emoji: '🚀' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Apple-Level Plan Selection</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience Silicon Valley-grade UI/UX with our enhanced plan selection interface. Choose
            different series to see the dynamic styling adaptation.
          </p>
        </motion.div>

        {/* Series Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Choose Series to Preview
            </h2>
            <div className="flex space-x-4 justify-center">
              {seriesOptions.map((series) => (
                <motion.button
                  key={series.id}
                  onClick={() => setCurrentSeries(series.id as any)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    currentSeries === series.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{series.emoji}</span>
                  {series.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Plan Buttons Component */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
        >
          <PlanButtons
            seriesId={`demo-${currentSeries}`}
            seriesType={currentSeries}
            onPlanSelect={handlePlanSelect}
            selectedPlan={selectedPlan}
            className="max-w-6xl mx-auto"
          />
        </motion.div>

        {/* Selection Summary */}
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <div className="text-center">
                <div className="text-3xl mb-2">✅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Plan Selected Successfully!
                </h3>
                <p className="text-gray-600">
                  You've selected <strong>Plan {selectedPlan}</strong> for the{' '}
                  <strong>{seriesOptions.find((s) => s.id === currentSeries)?.name}</strong> series.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPlan('')}
                  className="mt-4 px-6 py-2 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Reset Selection
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Features Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Enhanced Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: '🎨',
                  title: 'Dynamic Theming',
                  description: 'Adapts colors and gradients based on series selection',
                },
                {
                  icon: '✨',
                  title: 'Micro-Interactions',
                  description: 'Apple-level hover effects and animations',
                },
                {
                  icon: '📱',
                  title: 'Responsive Design',
                  description: 'Perfect on all devices with touch-friendly interactions',
                },
                {
                  icon: '🚀',
                  title: 'Performance',
                  description: '60fps animations with hardware acceleration',
                },
                {
                  icon: '🎯',
                  title: 'Accessibility',
                  description: 'Keyboard navigation and screen reader support',
                },
                {
                  icon: '🔥',
                  title: 'State Management',
                  description: 'Smooth transitions between selection states',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
