'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CourseProgram, CourseSeries } from '@/types/courseSystem'
import { getCoursePricing, formatPrice, formatCurrency } from '@/lib/utils/pricing'
import { courseTiers } from '@/data/courseSystemData'
import { DemoClassModal } from './DemoClassModal'
import { Star, Users, Clock, Award, ChevronRight, CheckCircle } from 'lucide-react'

interface AppleCourseCardProps {
  course: CourseProgram
  selectedTier?: CourseSeries
}

export function AppleCourseCard({ course, selectedTier = 'ascent' }: AppleCourseCardProps) {
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [activeTier, setActiveTier] = useState<CourseSeries>(selectedTier)
  const [isHovered, setIsHovered] = useState(false)

  // Get pricing information using the centralized system
  const pricing = getCoursePricing(course.id)
  const tierInfo = courseTiers.find((t) => t.series === activeTier)
  const tierPricing = pricing.tiers.find((t) => t.series === activeTier)

  // Apple-inspired tier configurations
  const tierConfigs = {
    pinnacle: {
      name: 'Pinnacle',
      gradient: 'from-slate-900 to-slate-700',
      accentColor: 'from-indigo-600 to-blue-600',
      bgColor: 'bg-indigo-50/50',
      borderColor: 'border-indigo-200/60',
    },
    ascent: {
      name: 'Ascent',
      gradient: 'from-slate-900 to-slate-700',
      accentColor: 'from-emerald-600 to-green-600',
      bgColor: 'bg-emerald-50/50',
      borderColor: 'border-emerald-200/60',
    },
    pursuit: {
      name: 'Pursuit',
      gradient: 'from-slate-900 to-slate-700',
      accentColor: 'from-purple-600 to-violet-600',
      bgColor: 'bg-purple-50/50',
      borderColor: 'border-purple-200/60',
    },
  }

  const activeConfig = tierConfigs[activeTier]

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

  // Apple-like spring animation config
  const springConfig = {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1,
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: springConfig,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer"
      style={{ height: '420px' }} // Optimized compact height
    >
      {/* Apple-style card */}
      <div
        className={`
        relative h-full bg-white
        rounded-3xl overflow-hidden
        shadow-[0_6px_24px_rgb(0,0,0,0.08)]
        hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)]
        border border-slate-200/60
        backdrop-blur-xl
        transition-all duration-500 ease-out
      `}
      >
        {/* Popular badge */}
        {course.isPopular && (
          <div className="absolute top-5 right-5 z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, ...springConfig }}
              className="
                bg-gradient-to-r from-amber-400 to-orange-400
                text-white px-3 py-1.5 rounded-full text-xs font-semibold
                shadow-sm flex items-center gap-1
              "
            >
              <Star className="w-3 h-3" />
              <span>Popular</span>
            </motion.div>
          </div>
        )}

        {/* Content container */}
        <div className="h-full flex flex-col">
          {/* Header section */}
          <div className="pt-6 pb-4 px-6 text-center flex-shrink-0">
            {/* Course icon */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={springConfig}
              className={`
                w-16 h-16 mx-auto mb-4
                ${activeConfig.bgColor}
                rounded-2xl flex items-center justify-center
                border ${activeConfig.borderColor}
                shadow-sm group-hover:shadow-md
                transition-shadow duration-300
              `}
            >
              <div className="text-3xl">{getClassEmoji(course.targetClass)}</div>
            </motion.div>

            {/* Course info */}
            <div className="mb-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span
                  className="
                  bg-slate-100 text-slate-700
                  px-4 py-1.5 rounded-full text-sm font-medium
                  border border-slate-200/60
                "
                >
                  Class {course.targetClass}
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mb-3 tracking-tight">
                {course.name}
              </h3>

              <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto line-clamp-2">
                {course.description}
              </p>
            </div>

            {/* Course metrics */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: 'Duration', value: course.duration, icon: Clock },
                { label: 'Per Week', value: `${course.teachingHours}h`, icon: Users },
                { label: 'Batch', value: tierInfo?.batchSize || 25, icon: CheckCircle },
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
                  <div className="text-lg font-semibold text-slate-900">{metric.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tier selection and pricing */}
          <div className="flex-1 px-6 pb-6 flex flex-col">
            {/* Tier selector - Apple style segmented control */}
            <div className="mb-6">
              <div className="relative bg-slate-100 rounded-xl p-1">
                <motion.div
                  className={`
                    absolute inset-y-1 rounded-lg
                    bg-gradient-to-r ${activeConfig.accentColor}
                    shadow-sm
                  `}
                  style={{
                    left: `${(['pinnacle', 'ascent', 'pursuit'].indexOf(activeTier) * 100) / 3 + 0.5}%`,
                    width: '32.33%',
                  }}
                  transition={springConfig}
                  layoutId="tierSelector"
                />

                <div className="relative flex">
                  {pricing.tiers.map((tierOption) => (
                    <motion.button
                      key={tierOption.series}
                      onClick={() => setActiveTier(tierOption.series)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        flex-1 py-2.5 px-3 rounded-lg
                        text-sm font-semibold transition-colors duration-200
                        ${
                          activeTier === tierOption.series
                            ? 'text-white'
                            : 'text-slate-700 hover:text-slate-900'
                        }
                      `}
                    >
                      {tierConfigs[tierOption.series].name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing display */}
            <div className="mb-4 text-center">
              <div
                className={`
                ${activeConfig.bgColor} rounded-xl p-3
                border ${activeConfig.borderColor}
              `}
              >
                <div className="text-2xl font-bold text-slate-900 mb-0.5">
                  {tierPricing?.formattedPrice || formatPrice(pricing.minPrice)}
                </div>
                <div className="text-slate-600 text-xs mb-1">
                  {formatCurrency(tierPricing?.price || pricing.minPrice)} per year
                </div>
                <div className="text-xs font-medium text-emerald-600">0% EMI available</div>
              </div>
            </div>

            {/* Key features */}
            <div className="mb-4 flex-1">
              <div className="space-y-1.5">
                {(tierInfo?.highlights.slice(0, 3) || course.learningOutcomes.slice(0, 3)).map(
                  (highlight: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, ...springConfig }}
                      className="flex items-center text-xs text-slate-700"
                    >
                      <CheckCircle className="w-3 h-3 text-emerald-600 mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{highlight}</span>
                    </motion.div>
                  )
                )}
                {(tierInfo?.highlights.length || course.learningOutcomes.length) > 3 && (
                  <div className="text-xs text-slate-400 font-medium pl-5">
                    +{(tierInfo?.highlights.length || course.learningOutcomes.length) - 3} more
                    features
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
                  href={`/enrollments?course=${course.id}&tier=${activeTier}`}
                  className={`
                    block w-full text-center py-3.5 rounded-2xl font-semibold
                    bg-gradient-to-r ${activeConfig.accentColor} text-white
                    shadow-lg hover:shadow-xl
                    transition-all duration-300 text-sm
                  `}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>Enroll Now</span>
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
                    flex-1 bg-emerald-50 text-emerald-700
                    py-3 rounded-2xl font-semibold text-sm
                    border border-emerald-200/60
                    hover:bg-emerald-100 transition-colors duration-200
                  "
                >
                  Demo Class
                </motion.button>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href={`/courses/${course.id}`}
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
            <div className="mt-2 flex justify-center">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                {course.learningMode.slice(0, 2).map((mode, index) => (
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
      {showDemoModal && <DemoClassModal course={course} onClose={() => setShowDemoModal(false)} />}
    </motion.div>
  )
}
