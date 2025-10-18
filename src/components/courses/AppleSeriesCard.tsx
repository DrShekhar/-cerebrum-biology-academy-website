'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Zap, Rocket, ChevronRight, Star, Users, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface Plan {
  id: 'A' | 'B' | 'C'
  name: string
  duration: string
  price: number
  features: string[]
  popular?: boolean
}

interface AppleSeriesCardProps {
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

export function AppleSeriesCard({ series, classLevel, onPlanSelect }: AppleSeriesCardProps) {
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
          name: 'Pinnacle Elite',
          tagline: 'Premium',
          icon: Crown,
          gradient: 'from-slate-900 to-slate-700',
          cardBg: 'bg-white',
          accentColor: 'from-blue-600 to-indigo-600',
          textColor: 'text-slate-900',
          mutedColor: 'text-slate-500',
          badge: { bg: 'bg-indigo-100', text: 'text-indigo-700', label: 'ELITE' },
          description: 'Premium coaching with 1:1 mentorship for top performers',
        }
      case 'ascent':
        return {
          name: 'Ascent Pro',
          tagline: 'Popular',
          icon: Zap,
          gradient: 'from-slate-900 to-slate-700',
          cardBg: 'bg-white',
          accentColor: 'from-emerald-600 to-green-600',
          textColor: 'text-slate-900',
          mutedColor: 'text-slate-500',
          badge: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'POPULAR' },
          description: 'Comprehensive NEET preparation with proven methodology',
        }
      case 'pursuit':
        return {
          name: 'Pursuit Foundation',
          tagline: 'Essential',
          icon: Rocket,
          gradient: 'from-slate-900 to-slate-700',
          cardBg: 'bg-white',
          accentColor: 'from-gold-600 to-gold-700',
          textColor: 'text-slate-900',
          mutedColor: 'text-slate-500',
          badge: { bg: 'bg-gold-100', text: 'text-gold-700', label: 'FOUNDATION' },
          description: 'Strong foundation building with conceptual clarity',
        }
      default:
        return {
          name: 'Course',
          tagline: 'Learn',
          icon: Rocket,
          gradient: 'from-slate-900 to-slate-700',
          cardBg: 'bg-white',
          accentColor: 'from-gray-600 to-gray-700',
          textColor: 'text-slate-900',
          mutedColor: 'text-slate-500',
          badge: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'COURSE' },
          description: 'Quality education for all students',
        }
    }
  }

  const config = getSeriesConfig(series.id)
  const IconComponent = config.icon

  // Apple-like spring animation config
  const springConfig = {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: series.id === 'pinnacle' ? 0 : series.id === 'ascent' ? 0.15 : 0.3,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: springConfig,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer"
      style={{ height: '480px' }} // Optimized height
    >
      {/* Apple-style card with glassmorphism */}
      <div
        className={`
        relative h-full ${config.cardBg}
        rounded-3xl overflow-hidden
        shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        hover:shadow-[0_16px_60px_rgb(0,0,0,0.16)]
        border border-slate-200/60
        backdrop-blur-xl
        transition-all duration-500 ease-out
      `}
      >
        {/* Premium badge */}
        <div className="absolute top-6 right-6 z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.6, ...springConfig }}
            className={`
              ${config.badge.bg} ${config.badge.text}
              px-3 py-1.5 rounded-full text-xs font-semibold
              shadow-sm border border-white/50
            `}
          >
            {config.badge.label}
          </motion.div>
        </div>

        {/* Content container with perfect spacing */}
        <div className="h-full flex flex-col">
          {/* Header section - Apple proportions */}
          <div className="pt-8 pb-6 px-8 flex-shrink-0">
            {/* Icon with subtle glow */}
            <div className="text-center mb-6">
              <motion.div
                whileHover={{ scale: 1.05, rotate: series.id === 'pinnacle' ? 3 : -3 }}
                transition={springConfig}
                className="relative inline-block"
              >
                <div
                  className={`
                  w-20 h-20 mx-auto
                  bg-gradient-to-br ${config.accentColor}
                  rounded-2xl flex items-center justify-center
                  shadow-lg group-hover:shadow-xl
                  transition-shadow duration-300
                `}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Subtle glow effect */}
                <div
                  className={`
                  absolute inset-0 w-20 h-20 mx-auto
                  bg-gradient-to-br ${config.accentColor}
                  rounded-2xl opacity-0 group-hover:opacity-20
                  blur-xl transition-opacity duration-300
                `}
                />
              </motion.div>
            </div>

            {/* Class level and series info */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span
                  className="
                  bg-slate-100 text-slate-700
                  px-4 py-1.5 rounded-full text-sm font-medium
                  border border-slate-200/60
                "
                >
                  Class {classLevel}
                </span>
              </div>

              <h3 className={`text-2xl font-semibold ${config.textColor} mb-2 tracking-tight`}>
                {config.name}
              </h3>

              <p className={`${config.mutedColor} text-sm leading-relaxed max-w-sm mx-auto`}>
                {config.description}
              </p>
            </div>

            {/* Key metrics - Apple style */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Duration', value: '2Y', icon: Clock },
                { label: 'Per Week', value: `${series.weeklyHours}h`, icon: Users },
                { label: 'Batch', value: series.batchSize, icon: CheckCircle },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, ...springConfig }}
                  whileHover={{ scale: 1.02 }}
                  className="
                    bg-slate-50/60 backdrop-blur-sm
                    rounded-xl p-3 text-center
                    border border-slate-200/40
                    hover:bg-slate-100/60 transition-colors duration-200
                  "
                >
                  <div className="text-lg font-semibold text-slate-900">{metric.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Plan selection - Apple style */}
          <div className="flex-1 px-8 pb-8">
            {/* Plan selector */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4 text-center">
                Choose Your Plan
              </h4>

              {/* Apple-style segmented control */}
              <div className="relative bg-slate-100 rounded-xl p-1">
                <AnimatePresence mode="wait">
                  {selectedPlan && (
                    <motion.div
                      layoutId={`plan-indicator-${series.id}`}
                      className={`
                        absolute inset-y-1
                        bg-gradient-to-r ${config.accentColor}
                        rounded-lg shadow-sm
                      `}
                      style={{
                        left: `${(series.plans.findIndex((p) => p.id === selectedPlan) * 100) / series.plans.length + 0.5}%`,
                        width: `${100 / series.plans.length - 1}%`,
                      }}
                      transition={springConfig}
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
                      className={`
                        flex-1 py-2.5 px-3 rounded-lg
                        text-sm font-semibold transition-colors duration-200
                        ${
                          selectedPlan === plan.id
                            ? 'text-white'
                            : 'text-slate-700 hover:text-slate-900'
                        }
                      `}
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
            </div>

            {/* Selected plan details */}
            <AnimatePresence mode="wait">
              {selectedPlan && (
                <motion.div
                  key={selectedPlan}
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-6"
                >
                  {(() => {
                    const plan = series.plans.find((p) => p.id === selectedPlan)
                    if (!plan) return null

                    return (
                      <div
                        className="
                        bg-slate-50/60 backdrop-blur-sm
                        rounded-2xl p-5 border border-slate-200/40
                      "
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.accentColor}`}
                            />
                            <span className="font-semibold text-slate-900">
                              Plan {plan.id} - {plan.name}
                            </span>
                          </div>
                          {plan.popular && (
                            <span
                              className="
                              bg-gold-600
                              text-white px-2.5 py-1 rounded-full text-xs font-semibold
                            "
                            >
                              Popular
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-white/60 rounded-lg p-3">
                            <div className="text-xs text-slate-500 font-medium">Duration</div>
                            <div className="font-semibold text-slate-900">{plan.duration}</div>
                          </div>
                          <div className="bg-white/60 rounded-lg p-3">
                            <div className="text-xs text-slate-500 font-medium">Investment</div>
                            <div className="font-semibold text-slate-900">
                              ₹{plan.price.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {plan.features.slice(0, 3).map((feature, index) => (
                            <span
                              key={feature}
                              className="
                                bg-white/60 text-slate-700
                                px-3 py-1 rounded-full text-xs font-medium
                                border border-slate-200/40
                              "
                            >
                              {feature}
                            </span>
                          ))}
                          {plan.features.length > 3 && (
                            <span className="text-slate-400 text-xs font-medium px-2 py-1">
                              +{plan.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })()}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons - Apple style */}
            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={springConfig}
              >
                <Link
                  href={
                    selectedPlan
                      ? `/courses/${series.id}/${classLevel}/plan-${selectedPlan.toLowerCase()}`
                      : '#'
                  }
                  className={`
                    block w-full text-center py-3.5 rounded-2xl font-semibold
                    transition-all duration-300 text-sm
                    ${
                      selectedPlan
                        ? `bg-gradient-to-r ${config.accentColor} text-white shadow-lg hover:shadow-xl`
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }
                  `}
                  onClick={(e) => {
                    if (!selectedPlan) {
                      e.preventDefault()
                    }
                  }}
                >
                  {selectedPlan ? (
                    <span className="flex items-center justify-center gap-2">
                      <span>View Plan {selectedPlan}</span>
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
                transition={springConfig}
                className="
                  w-full bg-white/60 backdrop-blur-sm text-slate-800
                  py-3.5 rounded-2xl font-semibold border border-slate-200/60
                  hover:bg-white/80 transition-all duration-300 text-sm
                "
              >
                <span className="flex items-center justify-center gap-2">
                  <span>Book Demo Class</span>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
