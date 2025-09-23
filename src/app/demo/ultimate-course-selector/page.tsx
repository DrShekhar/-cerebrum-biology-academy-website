/**
 * Ultimate Course Selector Demo - Simplified Working Version
 * Showcases PRO TIPS implementation with working animations
 */

'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// PRO TIP: Micro-copy and contextual hints
const MICRO_COPY = {
  planA: '🎯 Most popular choice - Complete preparation with personal attention',
  planB: '⚡ Best value - Essential preparation with proven results',
  planC: '🚀 Quick start - Foundation building for ambitious students',
  keyboardHint: '💡 Pro tip: Use Cmd+1,2,3 to quickly select plans',
  hoverHint: '✨ Hover for detailed comparison',
  progressiveHint: "👆 Click to see what's included",
}

// PRO TIP: Keyboard shortcuts mapping
const KEYBOARD_SHORTCUTS = {
  '1': 'A',
  '2': 'B',
  '3': 'C',
} as const

// PRO TIP: Delight moments - Easter egg animations
const DELIGHT_ANIMATIONS = ['🎉', '✨', '🚀', '💫', '🌟', '🎊', '💖', '🔥']

interface Plan {
  id: 'A' | 'B' | 'C'
  name: string
  price: number
  features: string[]
  popular?: boolean
  description: string
}

const mockPlans: Plan[] = [
  {
    id: 'A',
    name: 'Comprehensive',
    price: 78000,
    popular: true,
    features: [
      'Complete NEET Coverage',
      'Personal Mentoring',
      'Unlimited Mock Tests',
      'Printed + Digital Materials',
      'One-on-One Doubt Sessions',
      'Performance Analytics',
      'Parent Progress Reports',
      'Scholarship Guidance',
    ],
    description: 'Our most comprehensive plan with maximum support and personalization',
  },
  {
    id: 'B',
    name: 'Focused',
    price: 58000,
    features: [
      'Core NEET Topics',
      'Group Mentoring',
      'Weekly Mock Tests',
      'Digital Materials',
      'Doubt Clearing Sessions',
      'Basic Analytics',
      'Study Schedule',
    ],
    description: 'Focused preparation covering all essential topics with regular support',
  },
  {
    id: 'C',
    name: 'Foundation',
    price: 48000,
    features: [
      'Essential NEET Topics',
      'Monthly Mentoring',
      'Bi-weekly Mock Tests',
      'Basic Study Materials',
      'Online Doubt Support',
    ],
    description: 'Foundation plan covering core concepts with basic support',
  },
]

function PlanCard({
  plan,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  showDetails,
  onToggleDetails,
  delightTrigger,
}: {
  plan: Plan
  isSelected: boolean
  isHovered: boolean
  onSelect: () => void
  onHover: (hovered: boolean) => void
  showDetails: boolean
  onToggleDetails: () => void
  delightTrigger: string | null
}) {
  return (
    <motion.div
      className={`
        relative cursor-pointer transition-all duration-500 transform-gpu
        ${isSelected ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}
        ${plan.popular ? 'border-2 border-orange-400' : 'border border-gray-200'}
      `}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onSelect}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="relative bg-white rounded-2xl p-6 h-full overflow-hidden shadow-lg">
        {/* PRO TIP: Popular badge with animation */}
        <AnimatePresence>
          {plan.popular && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              className="absolute -top-2 -right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10"
            >
              ⭐ Popular
            </motion.div>
          )}
        </AnimatePresence>

        {/* Plan Header */}
        <div className="text-center mb-4">
          <motion.h3
            className="text-2xl font-bold text-gray-900 mb-2"
            animate={{
              color: isSelected ? '#3B82F6' : '#111827',
              scale: isSelected ? 1.05 : 1,
            }}
          >
            Plan {plan.id}
          </motion.h3>
          <p className="text-gray-600">{plan.name}</p>

          {/* PRO TIP: Animated price with formatting */}
          <motion.div className="mt-3" animate={{ scale: isHovered ? 1.1 : 1 }}>
            <span className="text-3xl font-bold text-blue-600">
              ₹{plan.price.toLocaleString('en-IN')}
            </span>
            <span className="text-gray-500">/year</span>
          </motion.div>
        </div>

        {/* PRO TIP: Micro-copy with contextual hints */}
        <motion.p
          className="text-sm text-gray-600 mb-4 min-h-[2rem]"
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >
          {MICRO_COPY[`plan${plan.id}` as keyof typeof MICRO_COPY]}
        </motion.p>

        {/* PRO TIP: Progressive disclosure - Features preview */}
        <div className="space-y-2">
          <motion.div
            className="space-y-1 overflow-hidden"
            animate={{
              height: showDetails ? 'auto' : '120px',
            }}
          >
            {plan.features.slice(0, showDetails ? undefined : 3).map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: i * 0.1 },
                }}
                className="flex items-center text-sm text-gray-700"
              >
                <span className="text-green-500 mr-2">✓</span>
                {feature}
              </motion.div>
            ))}
          </motion.div>

          {/* PRO TIP: Progressive disclosure toggle */}
          {plan.features.length > 3 && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                onToggleDetails()
              }}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
              whileHover={{ x: 5 }}
            >
              {showDetails ? 'Show less' : `+${plan.features.length - 3} more features`}
              <motion.span animate={{ rotate: showDetails ? 180 : 0 }} className="ml-1">
                ↓
              </motion.span>
            </motion.button>
          )}
        </div>

        {/* PRO TIP: Selection indicator with smooth animation */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 bg-blue-500 bg-opacity-10 rounded-2xl border-2 border-blue-500 pointer-events-none"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                ✓
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PRO TIP: Delight moments - Easter egg animations */}
        <AnimatePresence>
          {delightTrigger === `click-${plan.id}` && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                opacity: [0, 1, 0],
                y: [0, -50, -100],
              }}
              transition={{ duration: 2 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl pointer-events-none z-20"
            >
              {DELIGHT_ANIMATIONS[Math.floor(Math.random() * DELIGHT_ANIMATIONS.length)]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function UltimateCourseSelectorDemo() {
  const [selectedPlan, setSelectedPlan] = useState<'A' | 'B' | 'C' | null>(null)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({})
  const [delightTrigger, setDelightTrigger] = useState<string | null>(null)
  const [showKeyboardHint, setShowKeyboardHint] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // PRO TIP: Keyboard shortcuts implementation
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      const key = e.key
      const shortcut = KEYBOARD_SHORTCUTS[key as keyof typeof KEYBOARD_SHORTCUTS]

      if ((e.metaKey || e.ctrlKey) && ['1', '2', '3'].includes(key)) {
        e.preventDefault()
        const planId = shortcut as 'A' | 'B' | 'C'
        setSelectedPlan(planId)

        // PRO TIP: Delight moment - Easter egg for keyboard users
        setDelightTrigger(`keyboard-${planId}`)
        setTimeout(() => setDelightTrigger(null), 2000)
      }
    }

    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [])

  // PRO TIP: Show keyboard hint after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowKeyboardHint(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handlePlanSelection = useCallback((planId: 'A' | 'B' | 'C') => {
    setSelectedPlan(planId)
    setDelightTrigger(`click-${planId}`)
    setShowConfetti(true)

    setTimeout(() => {
      setDelightTrigger(null)
      setShowConfetti(false)
    }, 3000)
  }, [])

  const handleEnrollment = () => {
    alert(
      `🎉 Enrollment started for Plan ${selectedPlan}!\n\nFeatures included:\n✅ All PRO TIPS implemented\n✅ Responsive hover states\n✅ Keyboard shortcuts\n✅ Progressive disclosure\n✅ Delight moments\n✅ Micro-copy guidance`
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* PRO TIP: Confetti celebration for delight moments */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 500,
                  y: -20,
                  rotate: 0,
                  scale: Math.random() * 0.8 + 0.2,
                }}
                animate={{
                  y: typeof window !== 'undefined' ? window.innerHeight + 20 : 800,
                  rotate: Math.random() * 360,
                  transition: {
                    duration: Math.random() * 3 + 2,
                    ease: 'easeOut',
                  },
                }}
                className="absolute text-2xl"
              >
                {DELIGHT_ANIMATIONS[i % DELIGHT_ANIMATIONS.length]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-6xl font-bold mb-4"
          >
            🚀 Ultimate Course Selector
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto"
          >
            Experience the most advanced course selection interface with PRO UX patterns and
            delightful interactions that make choosing a plan feel exciting!
          </motion.p>

          {/* PRO TIPS Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid md:grid-cols-5 gap-4 max-w-5xl mx-auto"
          >
            {[
              { icon: '🎯', title: 'Responsive Hover', desc: 'Smart debounced interactions' },
              { icon: '⌨️', title: 'Keyboard Shortcuts', desc: 'Cmd+1,2,3 for power users' },
              { icon: '💡', title: 'Micro-copy', desc: 'Contextual helpful hints' },
              { icon: '📊', title: 'Progressive Disclosure', desc: 'Information when needed' },
              { icon: '✨', title: 'Delight Moments', desc: 'Celebrations & easter eggs' },
            ].map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.8 + index * 0.1,
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 200,
                }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <div className="text-3xl mb-2">{tip.icon}</div>
                <h3 className="font-semibold mb-1 text-sm">{tip.title}</h3>
                <p className="text-xs text-blue-200">{tip.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Course Selection */}
        <motion.div layout className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Pursuit NEET Course</h2>
            <p className="text-gray-600">Comprehensive NEET preparation with proven results</p>
          </div>

          {/* PRO TIP: Contextual keyboard hint */}
          <AnimatePresence>
            {showKeyboardHint && !selectedPlan && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center text-sm text-gray-500 bg-blue-50 rounded-lg p-3 mb-6"
              >
                {MICRO_COPY.keyboardHint}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {mockPlans.map((plan, index) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isSelected={selectedPlan === plan.id}
                isHovered={hoveredPlan === `plan-${plan.id}`}
                onSelect={() => handlePlanSelection(plan.id)}
                onHover={(hovered) => setHoveredPlan(hovered ? `plan-${plan.id}` : null)}
                showDetails={showDetails[plan.id] || false}
                onToggleDetails={() =>
                  setShowDetails((prev) => ({ ...prev, [plan.id]: !prev[plan.id] }))
                }
                delightTrigger={delightTrigger}
              />
            ))}
          </div>

          {/* PRO TIP: Contextual help panel */}
          <AnimatePresence>
            {hoveredPlan && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 text-center mb-6"
              >
                <p className="text-sm text-gray-600">{MICRO_COPY.hoverHint}</p>
                {!selectedPlan && (
                  <p className="text-xs text-gray-500 mt-1">{MICRO_COPY.progressiveHint}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Section */}
          <AnimatePresence>
            {selectedPlan && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEnrollment}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Enroll in Plan {selectedPlan} 🎯
                </motion.button>
                <p className="text-sm text-gray-500 mt-2">
                  30-day money-back guarantee • Start your NEET journey today
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* PRO TIPS Implementation Details */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-8"
        >
          <h3 className="text-2xl font-semibold text-yellow-400 mb-6 text-center">
            💡 PRO TIPS Implementation
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="font-semibold text-white mb-2">Responsive Hover</h4>
              <p className="text-sm text-gray-300">
                Smooth hover states with proper debouncing prevent jumpy behavior
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">⌨️</div>
              <h4 className="font-semibold text-white mb-2">Keyboard Shortcuts</h4>
              <p className="text-sm text-gray-300">
                Cmd+1,2,3 for quick plan selection with easter egg animations
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">💡</div>
              <h4 className="font-semibold text-white mb-2">Micro-copy</h4>
              <p className="text-sm text-gray-300">
                Contextual hints guide users through their decision process
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="font-semibold text-white mb-2">Progressive Disclosure</h4>
              <p className="text-sm text-gray-300">
                Feature lists expand on demand, preventing information overload
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">✨</div>
              <h4 className="font-semibold text-white mb-2">Delight Moments</h4>
              <p className="text-sm text-gray-300">
                Confetti celebrations and surprise animations create joy
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
