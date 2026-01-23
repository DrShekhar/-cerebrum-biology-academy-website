'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ClassLevel, CourseSeries } from '@/types/courseSystem'
import { courseTiers, coursePrograms } from '@/data/courseSystemData'
import { getCoursePricing, formatPrice, formatCurrency } from '@/lib/utils/pricing'
import { DemoClassModal } from './DemoClassModal'
import { Users, Clock, ChevronRight, CheckCircle } from 'lucide-react'

interface ClassTierCardProps {
  classLevel: ClassLevel
  tier: CourseSeries
}

export function ClassTierCard({ classLevel, tier }: ClassTierCardProps) {
  const [showDemoModal, setShowDemoModal] = useState(false)

  // Find a representative course for this class to get course structure
  const representativeCourse = coursePrograms.find((course) => course.targetClass === classLevel)

  // Get tier information
  const tierInfo = courseTiers.find((t) => t.series === tier)
  const pricing = representativeCourse ? getCoursePricing(representativeCourse.id) : null
  const tierPricing = pricing?.tiers.find((t) => t.series === tier)

  // Tier configurations for styling
  const tierConfigs = {
    pinnacle: {
      name: 'Pinnacle Elite',
      tagline: 'Premium',
      gradient: 'from-navy-700 to-navy-900',
      bgColor: 'bg-navy-50/50',
      borderColor: 'border-navy-200/60',
      badge: { bg: 'bg-navy-100', text: 'text-navy-700', label: 'ELITE' },
      description: 'Premium coaching with 1:1 mentorship for top performers',
      icon: '👑',
    },
    ascent: {
      name: 'Ascent Pro',
      tagline: 'Popular',
      gradient: 'bg-[#4a5d4a]',
      bgColor: 'bg-green-50/50',
      borderColor: 'border-green-200/60',
      badge: { bg: 'bg-green-100', text: 'text-green-700', label: 'POPULAR' },
      description: 'Comprehensive NEET preparation with proven methodology',
      icon: '⚡',
    },
    pursuit: {
      name: 'Pursuit Foundation',
      tagline: 'Essential',
      gradient: 'from-gold-600 to-gold-700',
      bgColor: 'bg-gold-50/50',
      borderColor: 'border-gold-200/60',
      badge: { bg: 'bg-gold-100', text: 'text-gold-700', label: 'FOUNDATION' },
      description: 'Strong foundation building with conceptual clarity',
      icon: '🚀',
    },
  }

  const config = tierConfigs[tier]

  const getClassEmoji = (targetClass: string) => {
    const emojiMap = {
      '9th': '🌱',
      '10th': '🌿',
      '11th': '🎯',
      '12th': '🏆',
      Dropper: '💪',
    }
    return emojiMap[targetClass] || '📚'
  }

  // Animation config
  const springConfig = {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
  }

  if (!tierInfo || !representativeCourse) {
    return (
      <div className="bg-gray-100 rounded-xl p-6 text-center">
        <p className="text-gray-500">Course not available</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: tier === 'pinnacle' ? 0 : tier === 'ascent' ? 0.15 : 0.3,
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: springConfig,
      }}
      className="group cursor-pointer"
      style={{ minHeight: '500px' }}
    >
      <div
        className={`
        relative bg-white min-h-full
        rounded-3xl overflow-hidden
        shadow-[0_6px_24px_rgb(0,0,0,0.08)]
        hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)]
        border border-slate-200/60
        backdrop-blur-xl
        transition-all duration-500 ease-out
      `}
      >
        {/* Badge */}
        <div className="absolute top-5 right-5 z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, ...springConfig }}
            className={`
              ${config.badge.bg} ${config.badge.text}
              px-3 py-1.5 rounded-full text-xs font-semibold
              shadow-sm flex items-center gap-1
            `}
          >
            <span>{config.badge.label}</span>
          </motion.div>
        </div>

        {/* Content container */}
        <div className="flex flex-col min-h-full">
          {/* Header section */}
          <div className="pt-6 pb-4 px-6 text-center flex-shrink-0">
            {/* Tier icon */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={springConfig}
              className={`
                w-16 h-16 mx-auto mb-4
                ${config.bgColor}
                rounded-2xl flex items-center justify-center
                border ${config.borderColor}
                shadow-sm group-hover:shadow-md
                transition-shadow duration-300
              `}
            >
              <div className="text-3xl">{config.icon}</div>
            </motion.div>

            {/* Class and tier info */}
            <div className="mb-4">
              <div className="flex items-center justify-center gap-3 mb-4">
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

              <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                {config.name}
              </h3>

              <p className="text-slate-700 text-sm leading-relaxed max-w-sm mx-auto">
                {config.description}
              </p>
            </div>

            {/* Course metrics */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: 'Duration', value: representativeCourse.duration, icon: Clock },
                { label: 'Per Week', value: `${representativeCourse.teachingHours}h`, icon: Users },
                { label: 'Batch', value: tierInfo.batchSize, icon: CheckCircle },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  whileHover={{ scale: 1.02 }}
                  transition={springConfig}
                  className="
                    bg-slate-50/60 backdrop-blur-sm
                    rounded-xl p-3
                    border border-slate-200/40
                    hover:bg-slate-100/60 transition-colors duration-200
                  "
                >
                  <div className="text-lg font-bold text-slate-900">{metric.value}</div>
                  <div className="text-sm text-slate-700 font-medium">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pricing and features */}
          <div className="flex-1 px-6 pb-6 flex flex-col">
            {/* Pricing display */}
            <div className="mb-5 text-center">
              <div
                className={`
                ${config.bgColor} rounded-xl p-4
                border ${config.borderColor}
              `}
              >
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {tierPricing?.formattedPrice || formatPrice(tierInfo.priceRange.min)}
                </div>
                <div className="text-slate-700 text-sm mb-1">
                  {formatCurrency(tierPricing?.price || tierInfo.priceRange.min)} per year
                </div>
                <div className="text-sm font-medium text-green-600">0% EMI available</div>
              </div>
            </div>

            {/* Key features */}
            <div className="mb-5 flex-1">
              <h4 className="font-semibold text-slate-800 mb-2 text-sm">Key Features:</h4>
              <div className="space-y-1">
                {tierInfo.highlights.slice(0, 4).map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, ...springConfig }}
                    className="flex items-center text-sm text-slate-700"
                  >
                    <CheckCircle className="w-3 h-3 text-green-600 mr-2 flex-shrink-0" />
                    <span className="line-clamp-1">{highlight}</span>
                  </motion.div>
                ))}
                {tierInfo.highlights.length > 4 && (
                  <div className="text-sm text-slate-400 font-medium pl-5">
                    +{tierInfo.highlights.length - 4} more features
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={springConfig}
              >
                <Link
                  href={`/enrollments?class=${classLevel}&tier=${tier}`}
                  className={`
                    block w-full text-center py-3.5 rounded-2xl font-semibold
                    bg-gradient-to-r ${config.gradient} text-white
                    shadow-lg hover:shadow-xl
                    transition-all duration-300 text-sm
                  `}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>Enroll in {config.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDemoModal(true)}
                  className="
                    flex-1 bg-green-50 text-green-700
                    py-3 rounded-2xl font-semibold text-sm
                    border border-green-200/60
                    hover:bg-green-100 transition-colors duration-200
                  "
                >
                  Demo Class
                </motion.button>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href={`/courses/class-${classLevel.toLowerCase()}`}
                    className="
                      flex-1 bg-slate-50 text-slate-700
                      py-3 px-4 rounded-2xl font-semibold text-sm
                      border border-slate-200/60
                      hover:bg-slate-100 transition-colors duration-200
                      inline-flex items-center justify-center
                    "
                  >
                    Details
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Learning modes indicator */}
            <div className="mt-3 flex justify-center">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                {representativeCourse.learningMode.slice(0, 2).map((mode, index) => (
                  <span key={index} className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                    {mode}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Class Modal */}
      {showDemoModal && representativeCourse && (
        <DemoClassModal course={representativeCourse} onClose={() => setShowDemoModal(false)} />
      )}
    </motion.div>
  )
}
