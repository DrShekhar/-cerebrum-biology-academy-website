'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { Trophy, Target, Users, Star, TrendingUp, Award, BookOpen, Heart } from 'lucide-react'

interface MetricCard {
  id: string
  value: number
  label: string
  description: string
  suffix: string
  icon: React.ReactNode
  color: {
    primary: string
    secondary: string
    gradient: string
    textColor: string
    iconBg: string
    glowColor: string
  }
  prefix?: string
}

// Harvard-level educational psychology and Silicon Valley data-driven metrics
const SUCCESS_METRICS: MetricCard[] = [
  {
    id: 'board-success',
    value: 94,
    label: 'Board Exam Success',
    description: 'Students scoring 90+ in Class 12 Biology',
    suffix: '%',
    icon: <Trophy className="h-6 w-6" />,
    color: {
      primary: '#FFD700',
      secondary: '#FFA500',
      gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      textColor: 'text-yellow-900',
      iconBg: 'bg-yellow-50',
      glowColor: 'shadow-yellow-500/25',
    },
  },
  {
    id: 'neet-foundation',
    value: 88,
    label: 'NEET Foundation',
    description: 'Students achieving 550+ NEET scores',
    suffix: '%',
    icon: <Target className="h-6 w-6" />,
    color: {
      primary: '#10B981',
      secondary: '#059669',
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      textColor: 'text-emerald-900',
      iconBg: 'bg-emerald-50',
      glowColor: 'shadow-emerald-500/25',
    },
  },
  {
    id: 'students-taught',
    value: 2000,
    label: 'Students Taught',
    description: 'Successful biology transformations completed',
    suffix: '+',
    icon: <Users className="h-6 w-6" />,
    color: {
      primary: '#3B82F6',
      secondary: '#2563EB',
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      textColor: 'text-blue-900',
      iconBg: 'bg-blue-50',
      glowColor: 'shadow-blue-500/25',
    },
  },
  {
    id: 'student-rating',
    value: 4.9,
    label: 'Student Rating',
    description: 'Average satisfaction from student feedback',
    suffix: '/5',
    icon: <Star className="h-6 w-6" />,
    color: {
      primary: '#8B5CF6',
      secondary: '#7C3AED',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      textColor: 'text-purple-900',
      iconBg: 'bg-purple-50',
      glowColor: 'shadow-purple-500/25',
    },
  },
]

// Custom hook for animated counting
function useAnimatedCounter(
  targetValue: number,
  duration: number = 2000,
  isInView: boolean = false
) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const endTime = startTime + duration

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * targetValue)

      if (currentCount !== countRef.current) {
        countRef.current = currentCount
        setCount(currentCount)
      }

      if (now < endTime) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(targetValue)
      }
    }

    // Small delay before starting animation
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(updateCount)
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [targetValue, duration, isInView])

  return count
}

interface MetricCardComponentProps {
  metric: MetricCard
  index: number
  isInView: boolean
}

function MetricCardComponent({ metric, index, isInView }: MetricCardComponentProps) {
  const animatedValue = useAnimatedCounter(metric.value, 2000 + index * 200, isInView)

  const formatValue = (value: number) => {
    if (metric.id === 'student-rating') {
      return value.toFixed(1)
    } else if (metric.id === 'students-taught' && value >= 1000) {
      return (value / 1000).toFixed(1) + 'K'
    }
    return value.toString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: 'easeOut',
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      className={`group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 ${metric.color.glowColor} hover:shadow-2xl overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 overflow-hidden">
        <div className="w-full h-full rounded-full" style={{ background: metric.color.gradient }} />
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-20"
            animate={{
              y: [-20, -100],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.8 + index * 0.2,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            style={{
              background: metric.color.primary,
              left: `${20 + i * 30}%`,
              top: '80%',
            }}
          />
        ))}
      </div>

      {/* Icon Container */}
      <div className="relative z-10 mb-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: index * 0.15 + 0.3,
            ease: 'easeOut',
          }}
          className={`w-16 h-16 ${metric.color.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
          style={{
            boxShadow: `0 8px 32px ${metric.color.primary}20`,
          }}
        >
          <div style={{ color: metric.color.primary }}>{metric.icon}</div>
        </motion.div>
      </div>

      {/* Metric Value */}
      <div className="relative z-10 mb-4">
        <div className="flex items-baseline gap-1">
          {metric.prefix && (
            <span className={`text-2xl font-bold ${metric.color.textColor} opacity-80`}>
              {metric.prefix}
            </span>
          )}
          <motion.span
            className={`text-5xl font-bold ${metric.color.textColor} leading-none`}
            style={{
              background: metric.color.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {formatValue(animatedValue)}
          </motion.span>
          <span className={`text-2xl font-bold ${metric.color.textColor} opacity-80`}>
            {metric.suffix}
          </span>
        </div>

        {/* Progress Bar for Percentage Metrics */}
        {(metric.suffix === '%' || metric.id === 'student-rating') && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={
                  isInView
                    ? {
                        width:
                          metric.id === 'student-rating'
                            ? `${(animatedValue / 5) * 100}%`
                            : `${animatedValue}%`,
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  delay: index * 0.15 + 0.5,
                  ease: 'easeOut',
                }}
                className="h-2 rounded-full"
                style={{ background: metric.color.gradient }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Label and Description */}
      <div className="relative z-10">
        <h3
          className={`text-xl font-bold ${metric.color.textColor} mb-2 group-hover:scale-105 transition-transform duration-300`}
        >
          {metric.label}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{metric.description}</p>
      </div>

      {/* Hover Glow Effect */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${metric.color.primary}10 0%, transparent 70%)`,
        }}
      />

      {/* Success Indicator */}
      {(metric.value >= 90 || metric.id === 'student-rating') && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.4,
            delay: index * 0.15 + 1,
          }}
          className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
        >
          <Award className="h-4 w-4 text-white" />
        </motion.div>
      )}
    </motion.div>
  )
}

interface SuccessMetricsProps {
  className?: string
}

export function SuccessMetrics({ className = '' }: SuccessMetricsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      ref={sectionRef}
      className={`py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden ${className}`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <TrendingUp className="w-4 h-4" />
            Success That Speaks Numbers
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Proven Track Record of
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Educational Excellence
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our success metrics reflect years of dedication to student achievement and educational
            innovation. Every number represents countless hours of personalized attention and proven
            teaching methodologies.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SUCCESS_METRICS.map((metric, index) => (
            <MetricCardComponent
              key={metric.id}
              metric={metric}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Additional Context */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-center text-white"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-red-300" />
            <span className="text-xl font-semibold">Built on Trust & Excellence</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <div className="text-2xl font-bold mb-1">5+ Years</div>
              <div className="text-blue-100 text-sm">Teaching Experience</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">15+ Faculty</div>
              <div className="text-blue-100 text-sm">Expert Educators</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-blue-100 text-sm">Student Support</div>
            </div>
          </div>

          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            "These aren't just numbers – they're dreams fulfilled, futures secured, and lives
            transformed through quality education."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
