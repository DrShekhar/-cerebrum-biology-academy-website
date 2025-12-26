'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, BookOpen, Target, Check, Star, Crown, Zap } from 'lucide-react'
import { CourseSeriesCard } from '@/types/courseSeriesCard'

interface PlanOption {
  id: 'A' | 'B' | 'C'
  name: string
  tagline: string
  description: string
  duration: string
  price: number
  originalPrice?: number
  icon: typeof Rocket
  gradient: string
  cardGradient: string
  features: string[]
  badge?: {
    text: string
    gradient: string
    icon: typeof Star
  }
  popular?: boolean
  recommended?: boolean
}

interface PlanButtonsProps {
  seriesId: string
  seriesType: 'pinnacle' | 'ascent' | 'pursuit'
  onPlanSelect: (planId: string) => void
  selectedPlan?: string
  className?: string
}

export function PlanButtons({
  seriesId,
  seriesType,
  onPlanSelect,
  selectedPlan,
  className = '',
}: PlanButtonsProps) {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  const getPlanConfig = (seriesType: string): PlanOption[] => {
    const baseConfigs = {
      pinnacle: {
        gradient: 'from-navy-700 to-navy-900',
        cardGradient: 'from-navy-50 to-navy-100',
        accentColor: 'navy',
      },
      ascent: {
        gradient: 'from-green-600 to-green-700',
        cardGradient: 'from-green-50 to-green-100',
        accentColor: 'teal',
      },
      pursuit: {
        gradient: 'from-gold-600 to-gold-700',
        cardGradient: 'from-gold-50 to-gold-100',
        accentColor: 'gold',
      },
    }

    const config = baseConfigs[seriesType as keyof typeof baseConfigs] || baseConfigs.pursuit

    return [
      {
        id: 'A' as const,
        name: 'Fast Track',
        tagline: 'Accelerated Learning',
        description: 'Intensive preparation for quick results',
        duration: '3 months',
        price: 999,
        originalPrice: 1299,
        icon: Rocket,
        gradient: config.gradient,
        cardGradient: config.cardGradient,
        features: [
          'Daily Live Classes',
          'Personal Mentor',
          'Priority Support',
          'Weekly Assessments',
        ],
        badge: {
          text: 'INTENSIVE',
          gradient: 'from-gold-500 to-gold-600',
          icon: Zap,
        },
      },
      {
        id: 'B' as const,
        name: 'Standard',
        tagline: 'Most Popular Choice',
        description: 'Balanced approach with proven results',
        duration: '6 months',
        price: 699,
        originalPrice: 899,
        icon: BookOpen,
        gradient: config.gradient,
        cardGradient: config.cardGradient,
        features: [
          'Regular Live Classes',
          'Group Study Sessions',
          'Practice Tests',
          'Study Material',
        ],
        badge: {
          text: 'POPULAR',
          gradient: 'bg-green-600',
          icon: Star,
        },
        popular: true,
        recommended: true,
      },
      {
        id: 'C' as const,
        name: 'Self-Paced',
        tagline: 'Flexible Learning',
        description: 'Learn at your own comfortable speed',
        duration: 'Flexible',
        price: 499,
        originalPrice: 699,
        icon: Target,
        gradient: config.gradient,
        cardGradient: config.cardGradient,
        features: ['Recorded Sessions', 'Self-Assessment', 'Community Access', 'Basic Support'],
        badge: {
          text: 'FLEXIBLE',
          gradient: 'from-gold-500 to-gold-600',
          icon: Target,
        },
      },
    ]
  }

  const planOptions = getPlanConfig(seriesType)

  return (
    <div className={`plan-buttons-container ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 text-center"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Learning Path</h3>
        <p className="text-gray-600">
          Select the plan that best fits your preparation timeline and learning style
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {planOptions.map((plan, index) => {
          const IconComponent = plan.icon
          const BadgeIcon = plan.badge?.icon || Star
          const isSelected = selectedPlan === plan.id
          const isHovered = hoveredPlan === plan.id

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative group"
            >
              {/* Selection indicator */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    layoutId={`plan-selection-${seriesId}`}
                    className="absolute -inset-1 bg-gradient-to-r from-green-600/20 to-green-600/20 rounded-3xl blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Main plan button */}
              <motion.button
                onClick={() => onPlanSelect(plan.id)}
                onHoverStart={() => setHoveredPlan(plan.id)}
                onHoverEnd={() => setHoveredPlan(null)}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }}
                className={`relative w-full p-6 rounded-3xl transition-all duration-500 group ${
                  isSelected
                    ? `bg-gradient-to-br ${plan.cardGradient} border-2 border-blue-300/50 shadow-2xl`
                    : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-xl hover:shadow-2xl'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.3 + index * 0.1,
                        duration: 0.5,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      className={`bg-gradient-to-r ${plan.badge.gradient} text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg`}
                    >
                      <BadgeIcon className="w-3 h-3" />
                      <span>{plan.badge.text}</span>
                    </motion.div>
                  </div>
                )}

                {/* Recommended ribbon */}
                {plan.recommended && (
                  <div className="absolute -top-2 left-6 right-6">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                      className="h-1 bg-gold-500 rounded-full"
                    />
                  </div>
                )}

                {/* Plan icon */}
                <motion.div
                  animate={{
                    scale: isSelected ? 1.1 : 1,
                    rotate: isHovered ? (plan.id === 'A' ? 5 : plan.id === 'B' ? -5 : 0) : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-center mb-4"
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                {/* Plan details */}
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    Plan {plan.id} - {plan.name}
                  </h4>
                  <p className="text-sm text-gray-600 font-medium mb-2">{plan.tagline}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{plan.description}</p>
                </div>

                {/* Duration and pricing */}
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-sm text-gray-600">Duration:</span>
                    <span className="font-semibold text-gray-900">{plan.duration}</span>
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    {plan.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{plan.originalPrice}
                      </span>
                    )}
                    <span className="text-2xl font-bold text-gray-900">₹{plan.price}</span>
                    <span className="text-sm text-gray-600">/month</span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.4 + index * 0.1 + featureIndex * 0.05,
                        duration: 0.3,
                      }}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <div
                        className={`w-1.5 h-1.5 bg-gradient-to-r ${plan.gradient} rounded-full`}
                      />
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Selection indicator */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute bottom-4 right-4"
                    >
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover glow effect */}
                <AnimatePresence>
                  {isHovered && !isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-5 rounded-3xl`}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          )
        })}
      </div>

      {/* Action section */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-8 py-4 bg-gradient-to-r ${planOptions.find((p) => p.id === selectedPlan)?.gradient} text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300`}
            >
              Continue with Plan {selectedPlan}
            </motion.button>

            <p className="text-sm text-gray-500 mt-3">
              30-day money-back guarantee • Cancel anytime
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
