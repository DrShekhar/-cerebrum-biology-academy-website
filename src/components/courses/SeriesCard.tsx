'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, ChevronRight, Crown, Zap, Rocket, Star } from 'lucide-react'
import Link from 'next/link'
import { CourseSeriesCard, createCourseSeriesCard, SeriesType } from '@/types/courseSeriesCard'

interface Plan {
  id: 'A' | 'B' | 'C'
  name: string
  duration: string
  price: number
  features: string[]
  popular?: boolean
}

interface SeriesCardProps {
  series: {
    id: string
    name: string
    description: string
    icon: string
    color: string
    batchSize: number
    weeklyHours: number
    plans: Plan[]
  }
  classLevel: string
  onPlanSelect?: (seriesId: string, planId: string) => void
}

export function SeriesCard({ series, classLevel, onPlanSelect }: SeriesCardProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    if (onPlanSelect) {
      onPlanSelect(series.id, planId)
    }
  }

  const getSeriesConfig = (seriesId: string) => {
    switch (seriesId) {
      case 'pinnacle':
        return {
          name: 'Elite Mastery',
          tagline: 'For the Top 1%',
          icon: Crown,
          gradient: 'from-navy-700 to-navy-900',
          cardGradient: 'from-navy-50 to-navy-100',
          borderGradient: 'from-navy-400 to-navy-500',
          textColor: 'text-navy-900',
          accentColor: 'navy',
          description: 'Premium coaching with personal mentorship for NEET toppers',
          features: ['1:1 Mentoring', 'Custom Study Plans', 'Priority Support'],
          bgPattern: 'bg-gradient-to-br from-navy-500/5 to-navy-600/5',
          shimmer: 'from-navy-400/20 via-navy-500/20 to-navy-400/20',
        }
      case 'ascent':
        return {
          name: 'Advanced Plus',
          tagline: 'Most Popular Choice',
          icon: Zap,
          gradient: 'bg-[#4a5d4a]',
          cardGradient: 'from-green-50 to-green-100',
          borderGradient: 'bg-[#4a5d4a]',
          textColor: 'text-green-800',
          accentColor: 'teal',
          description: 'Comprehensive NEET preparation with proven track record',
          features: ['Live Classes', 'Test Series', 'Study Material'],
          bgPattern: 'bg-gradient-to-br from-green-600/5 to-green-600/5',
          shimmer: 'from-green-500/20 via-green-600/20 to-green-500/20',
        }
      case 'pursuit':
        return {
          name: 'Foundation Pro',
          tagline: 'Smart Start',
          icon: Rocket,
          gradient: 'from-gold-600 to-gold-700',
          cardGradient: 'from-gold-50 to-gold-100',
          borderGradient: 'from-gold-400 to-gold-500',
          textColor: 'text-gold-900',
          accentColor: 'gold',
          description: 'Strong foundation building with conceptual clarity',
          features: ['Concept Building', 'Practice Tests', 'Doubt Clearing'],
          bgPattern: 'bg-gradient-to-br from-gold-500/5 to-gold-600/5',
          shimmer: 'from-gold-400/20 via-gold-500/20 to-gold-400/20',
        }
      default:
        return {
          name: 'Course',
          tagline: 'Learn',
          icon: Target,
          gradient: 'from-gray-600 to-gray-700',
          cardGradient: 'from-gray-50 to-gray-100',
          borderGradient: 'from-gray-400 to-gray-400',
          textColor: 'text-gray-700',
          accentColor: 'gray',
          description: 'Quality education for all students',
          features: ['Standard Features'],
          bgPattern: 'bg-gradient-to-br from-gray-500/5 to-gray-500/5',
          shimmer: 'from-gray-400/20 via-gray-400/20 to-gray-400/20',
        }
    }
  }

  const config = getSeriesConfig(series.id)

  // Create enhanced series card using the new interface structure
  const enhancedSeries: CourseSeriesCard = createCourseSeriesCard(series.id as SeriesType, {
    totalModules: 24, // 2 years * 12 modules per year
    estimatedDuration: '2 years',
    pricing: {
      plans: series.plans.map((plan) => ({
        id: plan.id,
        name: plan.name,
        duration: plan.duration,
        price: plan.price,
        features: plan.features,
        popular: plan.popular,
      })),
    },
    metadata: {
      classLevel: classLevel,
      targetAudience: 'NEET Aspirants',
      successRate: series.id === 'pinnacle' ? 95 : series.id === 'ascent' ? 90 : 85,
      batchSize: series.batchSize,
      weeklyHours: series.weeklyHours,
    },
  })

  const IconComponent = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: series.id === 'pinnacle' ? 0 : series.id === 'ascent' ? 0.1 : 0.2,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Shimmer effect overlay */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${config.shimmer} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
      />

      {/* Main card */}
      <div
        className={`relative bg-gradient-to-br ${config.cardGradient} backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl group-hover:shadow-3xl transition-all duration-500`}
      >
        {/* Premium badge for Pinnacle */}
        {series.id === 'pinnacle' && (
          <div className="absolute top-4 right-4 z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
              className="bg-gold-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1"
            >
              <Crown className="w-3 h-3" />
              <span>ELITE</span>
            </motion.div>
          </div>
        )}

        {/* Popular badge for Ascent */}
        {series.id === 'ascent' && (
          <div className="absolute top-4 right-4 z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
              className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1"
            >
              <Star className="w-3 h-3" />
              <span>POPULAR</span>
            </motion.div>
          </div>
        )}

        {/* Header with gradient icon */}
        <div className="relative p-8">
          {/* Background pattern */}
          <div className={`absolute inset-0 ${config.bgPattern}`} />

          <div className="relative z-10 text-center">
            {/* Icon with glow effect */}
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: series.id === 'pinnacle' ? 5 : series.id === 'ascent' ? -5 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="relative mx-auto mb-6"
            >
              <div
                className={`w-24 h-24 mx-auto bg-gradient-to-br ${config.gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300`}
              >
                <IconComponent className="w-10 h-10 text-white" />
              </div>

              {/* Glow effect */}
              <div
                className={`absolute inset-0 w-24 h-24 mx-auto bg-gradient-to-br ${config.gradient} rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`}
              />
            </motion.div>

            {/* Series branding */}
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center space-x-3 mb-4"
              >
                <span className="bg-white/60 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                  Class {classLevel}
                </span>
                <span
                  className={`bg-gradient-to-r ${config.gradient} text-white px-4 py-2 rounded-full text-xs font-bold tracking-wide`}
                >
                  {config.tagline}
                </span>
              </motion.div>

              <h3 className={`text-3xl font-bold ${config.textColor} mb-3 tracking-tight`}>
                {config.name}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg font-medium">
                {config.description}
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {config.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-white/30"
                >
                  <div className={`text-sm font-semibold ${config.textColor}`}>{feature}</div>
                </motion.div>
              ))}
            </div>

            {/* Course metrics with enhanced styling */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30"
              >
                <div className="text-2xl font-bold text-gray-900">2Y</div>
                <div className="text-sm text-gray-600 font-medium">Duration</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30"
              >
                <div className="text-2xl font-bold text-gray-900">{series.weeklyHours}h</div>
                <div className="text-sm text-gray-600 font-medium">Per Week</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30"
              >
                <div className="text-2xl font-bold text-gray-900">{series.batchSize}</div>
                <div className="text-sm text-gray-600 font-medium">Batch Size</div>
              </motion.div>
            </div>

            {/* NEET focused badge with enhanced design */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30"
            >
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              <span className="font-semibold text-gray-700">NEET Focused</span>
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
            </motion.div>
          </div>
        </div>

        {/* Plan Selection Section with Apple Design */}
        <div className="relative p-6 bg-white/40 backdrop-blur-sm border-t border-white/20">
          <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Choose Your Learning Path
          </h4>

          {/* Enhanced Plan Selection Tabs */}
          <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-2 mb-6 border border-white/30">
            <AnimatePresence mode="wait">
              {selectedPlan && (
                <motion.div
                  layoutId={`plan-selector-${series.id}`}
                  className={`absolute inset-y-2 bg-gradient-to-r ${config.gradient} rounded-xl`}
                  style={{
                    left: `${(series.plans.findIndex((p) => p.id === selectedPlan) * 100) / series.plans.length + 1}%`,
                    width: `${100 / series.plans.length - 2}%`,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </AnimatePresence>

            <div className="relative flex">
              {series.plans.map((plan) => (
                <motion.button
                  key={plan.id}
                  onClick={() => handlePlanSelect(plan.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all relative z-10 ${
                    selectedPlan === plan.id
                      ? 'text-white'
                      : `${config.textColor} hover:text-gray-900`
                  }`}
                >
                  Plan {plan.id}
                  {plan.popular && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-1 text-xs"
                    >
                      ⭐
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Selected Plan Details with enhanced animation */}
          <AnimatePresence mode="wait">
            {selectedPlan && (
              <motion.div
                key={selectedPlan}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mb-6"
              >
                {(() => {
                  const plan = series.plans.find((p) => p.id === selectedPlan)
                  if (!plan) return null

                  return (
                    <div
                      className={`relative p-6 rounded-2xl border-2 bg-gradient-to-br ${config.cardGradient} border-opacity-30`}
                      style={{ borderColor: `var(--${config.accentColor}-400)` }}
                    >
                      {/* Plan header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 bg-gradient-to-r ${config.gradient} rounded-full`}
                          />
                          <span className="font-bold text-gray-900 text-lg">
                            Plan {plan.id} - {plan.name}
                          </span>
                        </div>
                        {plan.popular && (
                          <motion.span
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="bg-gold-600 text-white px-3 py-1 rounded-full text-xs font-bold"
                          >
                            Most Popular
                          </motion.span>
                        )}
                      </div>

                      {/* Plan details grid */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                          <span className="text-sm text-gray-600 font-medium">Duration</span>
                          <div className="font-bold text-gray-900 text-lg">{plan.duration}</div>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                          <span className="text-sm text-gray-600 font-medium">Investment</span>
                          <div className="font-bold text-gray-900 text-lg">
                            ₹{plan.price.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Features showcase */}
                      <div className="space-y-2">
                        <span className="text-sm font-semibold text-gray-700">
                          What's Included:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {plan.features.slice(0, 3).map((feature, index) => (
                            <motion.span
                              key={feature}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-white/60 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-semibold border border-white/30"
                            >
                              {feature}
                            </motion.span>
                          ))}
                          {plan.features.length > 3 && (
                            <span className="text-gray-500 text-xs font-medium">
                              +{plan.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Action Buttons */}
          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={
                  selectedPlan
                    ? `/courses/${series.id}/${classLevel}/plan-${selectedPlan.toLowerCase()}`
                    : '#'
                }
                className={`block w-full text-center py-4 rounded-2xl font-bold transition-all duration-300 ${
                  selectedPlan
                    ? `bg-gradient-to-r ${config.gradient} text-white shadow-xl hover:shadow-2xl`
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                onClick={(e) => {
                  if (!selectedPlan) {
                    e.preventDefault()
                  }
                }}
              >
                {selectedPlan ? (
                  <span className="flex items-center justify-center space-x-2">
                    <span>View Plan {selectedPlan} Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                ) : (
                  'Select a Plan First'
                )}
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white/60 backdrop-blur-sm text-gray-800 py-4 rounded-2xl font-bold border border-white/30 hover:bg-white/80 transition-all duration-300"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Book Free Demo Class</span>
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              </span>
            </motion.button>
          </div>

          {/* Enhanced Quick Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center"
          >
            <div className="flex justify-center space-x-6">
              {[
                { label: 'Live Classes', color: 'blue' },
                { label: 'Mock Tests', color: 'green' },
                { label: 'Study Material', color: 'purple' },
              ].map((item, index) => (
                <motion.span
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-600"
                >
                  <div className={`w-2 h-2 bg-${item.color}-500 rounded-full animate-pulse`} />
                  <span>{item.label}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
