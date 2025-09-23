'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  Users,
  Clock,
  Trophy,
  ChevronDown,
  ChevronUp,
  Check,
  Award,
  Target,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { type Course } from '@/data/courseData'

interface PremiumCourseCardProps {
  course: Course
  onSelect?: (course: Course) => void
  className?: string
}

// Harvard-level color psychology and Silicon Valley design systems
const getSeriesDesign = (series: string) => {
  const designs = {
    Ascent: {
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      hoverBackground: 'linear-gradient(135deg, #E6C200 0%, #E6940A 100%)',
      textColor: 'text-gray-900',
      badgeColor: 'bg-yellow-900/20 text-yellow-900',
      glassColor: 'bg-yellow-900/10 backdrop-blur-md',
      accentColor: 'text-yellow-900',
      buttonColor: 'bg-yellow-900 hover:bg-yellow-800 text-white',
      icon: '🏆',
      prestige: 'PREMIUM',
    },
    Pinnacle: {
      background: 'linear-gradient(135deg, #663399 0%, #9966CC 100%)',
      hoverBackground: 'linear-gradient(135deg, #5A2D7A 0%, #8A5AB8 100%)',
      textColor: 'text-white',
      badgeColor: 'bg-purple-900/30 text-purple-100',
      glassColor: 'bg-white/10 backdrop-blur-md',
      accentColor: 'text-purple-200',
      buttonColor: 'bg-white/20 hover:bg-white/30 text-white border border-white/30',
      icon: '👑',
      prestige: 'ELITE',
    },
    Pursuit: {
      background: 'linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)',
      hoverBackground: 'linear-gradient(135deg, #7AB8D3 0%, #3F75A3 100%)',
      textColor: 'text-gray-900',
      badgeColor: 'bg-blue-900/20 text-blue-900',
      glassColor: 'bg-blue-900/10 backdrop-blur-md',
      accentColor: 'text-blue-900',
      buttonColor: 'bg-blue-900 hover:bg-blue-800 text-white',
      icon: '🎯',
      prestige: 'RECOMMENDED',
    },
    Foundation: {
      background: 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)',
      hoverBackground: 'linear-gradient(135deg, #29B866 0%, #229954 100%)',
      textColor: 'text-white',
      badgeColor: 'bg-green-900/30 text-green-100',
      glassColor: 'bg-white/10 backdrop-blur-md',
      accentColor: 'text-green-200',
      buttonColor: 'bg-white/20 hover:bg-white/30 text-white border border-white/30',
      icon: '🌱',
      prestige: 'FOUNDATION',
    },
    Intensive: {
      background: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)',
      hoverBackground: 'linear-gradient(135deg, #D63031 0%, #A93226 100%)',
      textColor: 'text-white',
      badgeColor: 'bg-red-900/30 text-red-100',
      glassColor: 'bg-white/10 backdrop-blur-md',
      accentColor: 'text-red-200',
      buttonColor: 'bg-white/20 hover:bg-white/30 text-white border border-white/30',
      icon: '🔥',
      prestige: 'INTENSIVE',
    },
  }

  return designs[series as keyof typeof designs] || designs.Pursuit
}

// Harvard-level educational metrics calculation
const calculateEducationalMetrics = (course: Course) => {
  const successRate = course.successRate
  const enrollmentRate = Math.min(100, (course.enrollmentCount / 1000) * 10)
  const valueScore = ((course.originalPrice - course.currentPrice) / course.originalPrice) * 100
  const batchQuality = Math.max(0, 100 - (course.batchSize - 5) * 2)

  const overallScore =
    successRate * 0.4 + enrollmentRate * 0.2 + valueScore * 0.2 + batchQuality * 0.2

  return {
    overallScore: Math.round(overallScore),
    successGrade: successRate >= 95 ? 'A+' : successRate >= 90 ? 'A' : 'B+',
    valueGrade: valueScore >= 20 ? 'Excellent' : valueScore >= 10 ? 'Good' : 'Fair',
    exclusivityLevel:
      course.batchSize <= 10 ? 'Ultra-Exclusive' : course.batchSize <= 20 ? 'Exclusive' : 'Premium',
  }
}

export function PremiumCourseCard({ course, onSelect, className = '' }: PremiumCourseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const design = getSeriesDesign(course.series)
  const metrics = calculateEducationalMetrics(course)

  const savings = course.originalPrice - course.currentPrice
  const savingsPercentage = Math.round((savings / course.originalPrice) * 100)

  return (
    <motion.div
      className={`relative group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div
        className="relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500"
        style={{
          background: isHovered ? design.hoverBackground : design.background,
          minHeight: '420px',
        }}
      >
        {/* Harvard-style Academic Prestige Indicator */}
        <div className="absolute top-0 right-0 z-10">
          <div
            className={`${design.badgeColor} px-4 py-2 rounded-bl-2xl font-bold text-sm tracking-wider`}
          >
            {design.prestige}
          </div>
        </div>

        {/* Silicon Valley Glass Morphism Header */}
        <div className={`${design.glassColor} border-b border-white/20 p-6`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{design.icon}</span>
              <div>
                <div
                  className={`${design.textColor} text-sm font-semibold tracking-wide opacity-90`}
                >
                  {course.series.toUpperCase()} SERIES
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`${design.accentColor} text-xs px-2 py-1 rounded-full bg-white/20`}
                  >
                    {metrics.exclusivityLevel}
                  </div>
                  <div
                    className={`${design.accentColor} text-xs px-2 py-1 rounded-full bg-white/20`}
                  >
                    Grade {metrics.successGrade}
                  </div>
                </div>
              </div>
            </div>
            {course.badge && (
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className={`${design.textColor} text-xs font-bold tracking-wider`}>
                  {course.badge.toUpperCase().replace('_', ' ')}
                </span>
              </div>
            )}
          </div>

          {/* Course Title - Harvard Typography */}
          <h3 className={`${design.textColor} text-2xl font-bold leading-tight mb-2`}>
            {course.name}
          </h3>

          <p className={`${design.accentColor} text-sm leading-relaxed opacity-90`}>
            {course.description}
          </p>
        </div>

        {/* Academic Excellence Metrics */}
        <div className="p-6 space-y-6">
          {/* Price Section with Silicon Valley Precision */}
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className={`${design.textColor} text-3xl font-bold`}>
                  ₹{(course.currentPrice / 1000).toFixed(0)}K
                </span>
                {course.originalPrice > course.currentPrice && (
                  <span className={`${design.accentColor} text-lg line-through opacity-60`}>
                    ₹{(course.originalPrice / 1000).toFixed(0)}K
                  </span>
                )}
              </div>
              {savings > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  <span className={`${design.textColor} text-sm font-semibold`}>
                    Save ₹{(savings / 1000).toFixed(0)}K ({savingsPercentage}%)
                  </span>
                  <Sparkles className={`h-4 w-4 ${design.accentColor}`} />
                </div>
              )}
            </div>
            <div className="text-right">
              <div className={`${design.accentColor} text-xs opacity-80`}>EMI from</div>
              <div className={`${design.textColor} font-semibold`}>
                ₹{(course.installmentOptions[0]?.monthlyAmount / 1000).toFixed(1)}K/mo
              </div>
            </div>
          </div>

          {/* Harvard-Level Academic Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div
              className={`${design.glassColor} rounded-xl p-3 text-center border border-white/20`}
            >
              <Trophy className={`h-5 w-5 ${design.accentColor} mx-auto mb-1`} />
              <div className={`${design.textColor} text-lg font-bold`}>{course.successRate}%</div>
              <div className={`${design.accentColor} text-xs opacity-80`}>Success Rate</div>
            </div>
            <div
              className={`${design.glassColor} rounded-xl p-3 text-center border border-white/20`}
            >
              <Users className={`h-5 w-5 ${design.accentColor} mx-auto mb-1`} />
              <div className={`${design.textColor} text-lg font-bold`}>{course.batchSize}</div>
              <div className={`${design.accentColor} text-xs opacity-80`}>Batch Size</div>
            </div>
            <div
              className={`${design.glassColor} rounded-xl p-3 text-center border border-white/20`}
            >
              <Clock className={`h-5 w-5 ${design.accentColor} mx-auto mb-1`} />
              <div className={`${design.textColor} text-sm font-bold`}>{course.duration}</div>
              <div className={`${design.accentColor} text-xs opacity-80`}>Duration</div>
            </div>
          </div>

          {/* Student Success Indicator */}
          <div className={`${design.glassColor} rounded-xl p-4 border border-white/20`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target className={`h-4 w-4 ${design.accentColor}`} />
                <span className={`${design.textColor} text-sm font-medium`}>Student Success</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className={`h-4 w-4 ${design.accentColor}`} />
                <span className={`${design.textColor} text-sm font-semibold`}>
                  {course.rating || 4.9}/5.0
                </span>
              </div>
            </div>
            <div className={`${design.accentColor} text-xs opacity-90`}>
              {course.enrollmentCount.toLocaleString()} students enrolled • {metrics.overallScore}%
              overall score
            </div>
          </div>

          {/* Expandable Features Section */}
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
              className={`w-full flex items-center justify-between p-3 ${design.glassColor} rounded-xl border border-white/20 transition-all duration-300 hover:bg-white/20`}
            >
              <span className={`${design.textColor} font-medium flex items-center gap-2`}>
                <Award className="h-4 w-4" />
                What's Included ({course.features.length} features)
              </span>
              {isExpanded ? (
                <ChevronUp className={`h-4 w-4 ${design.accentColor}`} />
              ) : (
                <ChevronDown className={`h-4 w-4 ${design.accentColor}`} />
              )}
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div
                    className={`${design.glassColor} rounded-xl p-4 mt-2 border border-white/20`}
                  >
                    <div className="grid gap-2">
                      {course.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-2"
                        >
                          <Check className={`h-3 w-3 ${design.accentColor} mt-1 flex-shrink-0`} />
                          <span className={`${design.textColor} text-sm opacity-90`}>
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Silicon Valley CTA */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              onSelect?.(course)
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full ${design.buttonColor} py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl`}
          >
            Choose This Path
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Harvard-style Academic Excellence Watermark */}
        <div className="absolute bottom-4 right-4 opacity-20">
          <div className={`${design.textColor} text-xs font-mono tracking-wider`}>
            EST. EXCELLENCE
          </div>
        </div>
      </div>
    </motion.div>
  )
}
