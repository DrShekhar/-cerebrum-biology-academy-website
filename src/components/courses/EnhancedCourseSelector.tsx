'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion'
import { Crown, Zap, Rocket, Star, ChevronRight, Check } from 'lucide-react'
import {
  AnimationOrchestrator,
  AnimatedCard,
  PageTransition,
  ParallaxElement,
  MagneticElement,
  useAnimationOrchestrator,
} from '@/lib/animations/AnimationOrchestrator'
import { appleAnimations } from '@/lib/animations/advancedAnimations'
import { ClassLevel, SeriesType, PlanType } from '@/types/courseSelector'

interface EnhancedCourseSelectorProps {
  onSelectionChange?: (selection: any) => void
  className?: string
}

// Enhanced Class Filter with magnetic interactions
const MagneticClassFilter = () => {
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'all'>('11th')
  const [hoveredClass, setHoveredClass] = useState<string | null>(null)
  const { triggerSequence } = useAnimationOrchestrator()

  const classes = [
    {
      value: 'all' as const,
      label: 'All Classes',
      emoji: '📚',
      gradient: 'from-slate-500 to-slate-600',
    },
    {
      value: 9 as const,
      label: 'Foundation',
      emoji: '🌱',
      gradient: 'from-emerald-500 to-emerald-600',
    },
    { value: 10 as const, label: 'Explorer', emoji: '🌿', gradient: 'from-green-500 to-green-600' },
    { value: 11 as const, label: 'Advanced', emoji: '🎯', gradient: 'from-blue-500 to-blue-600' },
    {
      value: 12 as const,
      label: 'Mastery',
      emoji: '🏆',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      value: 'Dropper' as const,
      label: 'Elite',
      emoji: '💪',
      gradient: 'from-orange-500 to-orange-600',
    },
  ]

  const handleClassSelect = useCallback(
    (classLevel: ClassLevel | 'all') => {
      setSelectedClass(classLevel)
      triggerSequence('courseSelection')
    },
    [triggerSequence]
  )

  return (
    <div className="relative mb-12">
      {/* Glassmorphism background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20"
      />

      {/* Content */}
      <div className="relative p-6 overflow-x-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Learning Journey</h2>
          <p className="text-gray-600">
            Select your class level to explore our specialized biology programs
          </p>
        </motion.div>

        <div className="flex space-x-4 min-w-max justify-center">
          {classes.map((cls, index) => {
            const isSelected = selectedClass === cls.value
            const isHovered = hoveredClass === cls.value

            return (
              <MagneticElement key={cls.value} strength={0.2}>
                <motion.div
                  className="relative"
                  onHoverStart={() => setHoveredClass(cls.value)}
                  onHoverEnd={() => setHoveredClass(null)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Selection indicator with layoutId */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        layoutId="classSelection"
                        className={`absolute inset-0 bg-gradient-to-r ${cls.gradient} rounded-2xl opacity-20`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.2, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Main button */}
                  <motion.button
                    onClick={() => handleClassSelect(cls.value)}
                    className={`relative flex flex-col items-center p-6 rounded-2xl font-semibold transition-all duration-300 min-w-[140px] group ${
                      isSelected
                        ? 'text-white shadow-2xl z-10'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                    style={{
                      background: isSelected
                        ? `linear-gradient(135deg, var(--tw-gradient-stops))`
                        : isHovered
                          ? 'rgba(255, 255, 255, 0.9)'
                          : 'rgba(255, 255, 255, 0.7)',
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: { duration: 0.1 },
                    }}
                  >
                    {/* Gradient background for selected state */}
                    {isSelected && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${cls.gradient} rounded-2xl`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ zIndex: -1 }}
                      />
                    )}

                    {/* Icon with advanced animation */}
                    <motion.div
                      className="text-4xl mb-3"
                      animate={{
                        scale: isSelected ? 1.2 : 1,
                        rotate: isSelected ? 5 : 0,
                        filter: isSelected ? 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' : 'none',
                      }}
                      transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                    >
                      {cls.emoji}
                    </motion.div>

                    {/* Label */}
                    <div className="text-sm font-bold mb-2">{cls.label}</div>

                    {/* Dynamic indicator */}
                    <motion.div
                      className={`flex items-center space-x-1 text-xs ${
                        isSelected ? 'text-white/80' : 'text-gray-500'
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <motion.div
                        className="w-1 h-1 rounded-full bg-current"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span>3 Series</span>
                      <motion.div
                        className="w-1 h-1 rounded-full bg-current"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                    </motion.div>
                  </motion.button>
                </motion.div>
              </MagneticElement>
            )
          })}
        </div>

        {/* Selection feedback */}
        <AnimatePresence>
          {selectedClass !== 'all' && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
                <div className="flex items-center justify-center space-x-3">
                  <motion.div
                    className="w-3 h-3 bg-blue-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    Showing Biology Series for{' '}
                    {classes.find((c) => c.value === selectedClass)?.label}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Enhanced Series Cards with advanced interactions
const EnhancedSeriesCards = () => {
  const [selectedPlans, setSelectedPlans] = useState<Record<SeriesType, PlanType>>(
    {} as Record<SeriesType, PlanType>
  )
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const seriesData = [
    {
      id: 'pinnacle' as SeriesType,
      name: 'Elite Mastery',
      tagline: 'For the Top 1%',
      description: 'Premium coaching with personal mentorship for NEET toppers',
      icon: Crown,
      gradient: 'from-purple-600 via-pink-500 to-purple-700',
      glowColor: 'rgba(168, 85, 247, 0.3)',
      plans: [
        { id: 'A' as PlanType, name: 'Intensive', price: 1299, duration: '3 months' },
        { id: 'B' as PlanType, name: 'Complete', price: 999, duration: '6 months', popular: true },
        { id: 'C' as PlanType, name: 'Extended', price: 799, duration: '12 months' },
      ],
    },
    {
      id: 'ascent' as SeriesType,
      name: 'Advanced Plus',
      tagline: 'Most Popular Choice',
      description: 'Comprehensive NEET preparation with proven track record',
      icon: Zap,
      gradient: 'from-blue-600 via-cyan-500 to-blue-700',
      glowColor: 'rgba(59, 130, 246, 0.3)',
      plans: [
        { id: 'A' as PlanType, name: 'Fast Track', price: 999, duration: '4 months' },
        { id: 'B' as PlanType, name: 'Standard', price: 699, duration: '8 months', popular: true },
        { id: 'C' as PlanType, name: 'Flexible', price: 499, duration: 'Self-paced' },
      ],
    },
    {
      id: 'pursuit' as SeriesType,
      name: 'Foundation Pro',
      tagline: 'Smart Start',
      description: 'Strong foundation building with conceptual clarity',
      icon: Rocket,
      gradient: 'from-green-600 via-emerald-500 to-green-700',
      glowColor: 'rgba(34, 197, 94, 0.3)',
      plans: [
        { id: 'A' as PlanType, name: 'Accelerated', price: 799, duration: '6 months' },
        { id: 'B' as PlanType, name: 'Regular', price: 599, duration: '10 months', popular: true },
        { id: 'C' as PlanType, name: 'Basic', price: 399, duration: 'Flexible' },
      ],
    },
  ]

  const handlePlanSelect = (seriesId: SeriesType, planId: PlanType) => {
    setSelectedPlans((prev) => ({
      ...prev,
      [seriesId]: planId,
    }))
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 mb-12">
      {seriesData.map((series, index) => {
        const IconComponent = series.icon
        const selectedPlan = selectedPlans[series.id]

        return (
          <AnimatedCard
            key={series.id}
            index={index}
            hoverEffect="dynamic"
            entrance="slide"
            glowColor={series.glowColor}
            className="group"
          >
            <div className="relative bg-gradient-to-br from-white/90 via-white/70 to-white/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
              {/* Premium badge */}
              {series.id === 'pinnacle' && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  className="absolute top-4 right-4 z-10"
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <Crown className="w-3 h-3" />
                    <span>ELITE</span>
                  </div>
                </motion.div>
              )}

              {/* Popular badge */}
              {series.id === 'ascent' && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  className="absolute top-4 right-4 z-10"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>POPULAR</span>
                  </div>
                </motion.div>
              )}

              {/* Header */}
              <div className="p-8 text-center">
                {/* Icon with advanced effects */}
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotateY: 10,
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative mx-auto mb-6"
                >
                  <div
                    className={`w-24 h-24 mx-auto bg-gradient-to-br ${series.gradient} rounded-2xl flex items-center justify-center shadow-xl`}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute inset-0 w-24 h-24 mx-auto bg-gradient-to-br ${series.gradient} rounded-2xl opacity-20 blur-xl`}
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <span
                      className={`bg-gradient-to-r ${series.gradient} text-white px-4 py-2 rounded-full text-xs font-bold`}
                    >
                      {series.tagline}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{series.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{series.description}</p>
                </motion.div>
              </div>

              {/* Plan Selection */}
              <div className="p-6 bg-white/40 backdrop-blur-sm border-t border-white/20">
                <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">
                  Choose Your Plan
                </h4>

                {/* Plan buttons */}
                <div className="space-y-3 mb-6">
                  {series.plans.map((plan) => (
                    <motion.button
                      key={plan.id}
                      onClick={() => handlePlanSelect(series.id, plan.id)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedPlan === plan.id
                          ? `border-transparent bg-gradient-to-r ${series.gradient} text-white shadow-lg`
                          : 'border-white/30 bg-white/60 hover:bg-white/80 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <div className="font-semibold flex items-center space-x-2">
                            <span>
                              Plan {plan.id} - {plan.name}
                            </span>
                            {plan.popular && (
                              <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full">
                                ⭐ Popular
                              </span>
                            )}
                          </div>
                          <div className="text-sm opacity-80">{plan.duration}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">₹{plan.price}</div>
                          <div className="text-xs opacity-80">/month</div>
                        </div>
                      </div>

                      {selectedPlan === plan.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2"
                        >
                          <Check className="w-4 h-4" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Action button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!selectedPlan}
                  className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 ${
                    selectedPlan
                      ? `bg-gradient-to-r ${series.gradient} text-white shadow-xl hover:shadow-2xl`
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {selectedPlan ? (
                    <span className="flex items-center justify-center space-x-2">
                      <span>Continue with Plan {selectedPlan}</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  ) : (
                    'Select a Plan First'
                  )}
                </motion.button>
              </div>
            </div>
          </AnimatedCard>
        )
      })}
    </div>
  )
}

// Main Enhanced Course Selector Component
export function EnhancedCourseSelector({
  onSelectionChange,
  className = '',
}: EnhancedCourseSelectorProps) {
  return (
    <AnimationOrchestrator enableDebug={false}>
      <PageTransition type="fade">
        <div
          className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 ${className}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section with Parallax */}
            <ParallaxElement speed={0.2}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-16"
              >
                <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Advanced Course Selection
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Experience the future of educational interfaces with Apple-level animations,
                  sophisticated micro-interactions, and seamless state transitions.
                </p>
              </motion.div>
            </ParallaxElement>

            {/* Class Filter */}
            <MagneticClassFilter />

            {/* Series Cards */}
            <EnhancedSeriesCards />

            {/* Features Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-20 bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                🚀 Advanced Animation Features
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: '🎭',
                    title: 'Orchestrated Sequences',
                    desc: 'Complex animation choreography',
                  },
                  {
                    icon: '🧲',
                    title: 'Magnetic Interactions',
                    desc: 'Elements attract to cursor movement',
                  },
                  { icon: '📐', title: 'Parallax Scrolling', desc: 'Depth-based movement effects' },
                  {
                    icon: '⚡',
                    title: '60fps Performance',
                    desc: 'Hardware-accelerated animations',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30"
                  >
                    <div className="text-3xl mb-3">{feature.icon}</div>
                    <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </AnimationOrchestrator>
  )
}
