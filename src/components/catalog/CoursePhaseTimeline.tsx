'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Clock, Target, Trophy, Brain, Zap, Star, Award } from 'lucide-react'

interface TimelinePhase {
  id: number
  title: string
  timeline: string
  description: string
  color: {
    primary: string
    secondary: string
    gradient: string
    text: string
    accent: string
    glowColor: string
  }
  icon: React.ReactNode
  keyPoints: string[]
  monthRange: string
  completionRate?: number
}

// Harvard-level educational psychology and Silicon Valley data-driven phases
const COURSE_PHASES: TimelinePhase[] = [
  {
    id: 1,
    title: 'Foundation',
    timeline: 'Months 1-3',
    monthRange: '1-3',
    description:
      'Building rock-solid fundamentals with conceptual clarity and basic problem-solving skills.',
    color: {
      primary: '#10B981',
      secondary: '#059669',
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      text: 'text-green-800',
      accent: 'text-green-700',
      glowColor: 'shadow-green-500/25',
    },
    icon: <Brain className="h-6 w-6" />,
    keyPoints: [
      'Master fundamental concepts with 95% accuracy',
      'Develop scientific reasoning and analytical thinking',
      'Build confidence through structured practice sessions',
    ],
    completionRate: 92,
  },
  {
    id: 2,
    title: 'Advanced',
    timeline: 'Months 4-7',
    monthRange: '4-7',
    description:
      'Advanced problem-solving techniques with real NEET-level question mastery and speed building.',
    color: {
      primary: '#3B82F6',
      secondary: '#2563EB',
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      text: 'text-blue-900',
      accent: 'text-blue-700',
      glowColor: 'shadow-blue-500/25',
    },
    icon: <Target className="h-6 w-6" />,
    keyPoints: [
      'Solve complex NEET-level problems with precision',
      'Master time management and speed optimization',
      'Integrate multiple concepts for advanced questions',
    ],
    completionRate: 88,
  },
  {
    id: 3,
    title: 'Mastery',
    timeline: 'Months 8-10',
    monthRange: '8-10',
    description:
      'Peak performance training with mock tests, weak area elimination, and strategic preparation.',
    color: {
      primary: '#8B5CF6',
      secondary: '#7C3AED',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      text: 'text-purple-900',
      accent: 'text-purple-700',
      glowColor: 'shadow-purple-500/25',
    },
    icon: <Zap className="h-6 w-6" />,
    keyPoints: [
      'Score 650+ consistently in full-length mock tests',
      'Eliminate weak areas through targeted practice',
      'Develop exam psychology and stress management',
    ],
    completionRate: 85,
  },
  {
    id: 4,
    title: 'Final Sprint',
    timeline: 'Months 11-12',
    monthRange: '11-12',
    description:
      'Final preparation phase with revision mastery, exam strategy, and peak performance optimization.',
    color: {
      primary: '#EF4444',
      secondary: '#DC2626',
      gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      text: 'text-red-900',
      accent: 'text-red-700',
      glowColor: 'shadow-red-500/25',
    },
    icon: <Trophy className="h-6 w-6" />,
    keyPoints: [
      'Perfect revision strategy with 99% retention',
      'Master exam day psychology and time allocation',
      'Achieve target rank with confidence and precision',
    ],
    completionRate: 96,
  },
]

interface CoursePhaseTimelineProps {
  className?: string
  currentPhase?: number
}

export function CoursePhaseTimeline({
  className = '',
  currentPhase = 1,
}: CoursePhaseTimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-blue-800 px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <Clock className="w-4 h-4" />
            12-Month Transformation Journey
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your{' '}
            <span className="bg-indigo-500 bg-clip-text text-transparent">
              Learning Journey
            </span>
            <br />
            to Medical College
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our scientifically designed 4-phase system transforms students from foundation to peak
            performance, with 92% of students achieving their target rank through this proven
            methodology.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Desktop: Horizontal Timeline */}
          <div className={`${isMobile ? 'hidden' : 'block'}`}>
            {/* Connecting Line */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-green-200 to-green-500 rounded-full">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: currentPhase / 4 } : {}}
                transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
                className="h-full bg-green-600 rounded-full origin-left"
              />
            </div>

            {/* Phase Cards */}
            <div className="grid grid-cols-4 gap-8">
              {COURSE_PHASES.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: 'easeOut',
                  }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                      className={`w-8 h-8 rounded-full border-4 border-white ${phase.id <= currentPhase ? 'bg-green-600' : 'bg-gray-300'} shadow-lg`}
                      style={{
                        opacity: phase.id <= currentPhase ? 1 : 0.5,
                      }}
                    />
                  </div>

                  {/* Phase Card */}
                  <motion.div
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.3, ease: 'easeOut' },
                    }}
                    className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 mt-12 ${phase.color.glowColor} hover:shadow-2xl`}
                  >
                    {/* Phase Header */}
                    <div className="text-center mb-6">
                      <div
                        className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white shadow-lg"
                        style={{ background: phase.color.gradient }}
                      >
                        {phase.icon}
                      </div>

                      <h3 className={`text-xl font-bold ${phase.color.text} mb-2`}>
                        Phase {phase.id}: {phase.title}
                      </h3>

                      <div className={`${phase.color.accent} text-sm font-semibold`}>
                        {phase.timeline}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {phase.description}
                    </p>

                    {/* Key Points */}
                    <div className="space-y-2 mb-4">
                      {phase.keyPoints.map((point, pointIndex) => (
                        <motion.div
                          key={pointIndex}
                          initial={{ x: -10, opacity: 0 }}
                          animate={isInView ? { x: 0, opacity: 1 } : {}}
                          transition={{ delay: index * 0.2 + pointIndex * 0.1 + 0.5 }}
                          className="flex items-start gap-2"
                        >
                          <Check className={`h-4 w-4 ${phase.color.accent} mt-0.5 flex-shrink-0`} />
                          <span className="text-gray-700 text-xs leading-relaxed">{point}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Progress Indicator */}
                    {phase.completionRate && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-600">Success Rate</span>
                          <span className={`text-xs font-semibold ${phase.color.text}`}>
                            {phase.completionRate}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${phase.completionRate}%` } : {}}
                            transition={{ duration: 1, delay: index * 0.2 + 0.8 }}
                            className="h-2 rounded-full"
                            style={{ background: phase.color.gradient }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Current Phase Indicator */}
                    {phase.id === currentPhase && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.2 + 1 }}
                        className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                      >
                        CURRENT
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className={`${isMobile ? 'block' : 'hidden'} relative`}>
            {/* Vertical Connecting Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-200 to-green-500 rounded-full">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: currentPhase / 4 } : {}}
                transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
                className="w-full bg-green-600 rounded-full origin-top"
              />
            </div>

            {/* Mobile Phase Cards */}
            <div className="space-y-8">
              {COURSE_PHASES.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: 'easeOut',
                  }}
                  className="relative flex items-start gap-6"
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                      className={`w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center ${phase.id <= currentPhase ? 'bg-green-600' : 'bg-gray-300'}`}
                      style={{
                        opacity: phase.id <= currentPhase ? 1 : 0.5,
                      }}
                    >
                      {phase.id <= currentPhase && <Check className="h-4 w-4 text-white" />}
                    </motion.div>
                  </div>

                  {/* Mobile Phase Card */}
                  <motion.div
                    whileHover={{
                      x: 4,
                      transition: { duration: 0.2, ease: 'easeOut' },
                    }}
                    className={`flex-1 bg-white rounded-xl p-5 shadow-lg border border-gray-100 ${phase.color.glowColor}`}
                  >
                    {/* Mobile Phase Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md"
                        style={{ background: phase.color.gradient }}
                      >
                        {phase.icon}
                      </div>

                      <div>
                        <h3 className={`text-lg font-bold ${phase.color.text}`}>{phase.title}</h3>
                        <div className={`${phase.color.accent} text-sm font-semibold`}>
                          {phase.timeline}
                        </div>
                      </div>

                      {phase.id === currentPhase && (
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          NOW
                        </div>
                      )}
                    </div>

                    {/* Mobile Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {phase.description}
                    </p>

                    {/* Mobile Key Points */}
                    <div className="space-y-2">
                      {phase.keyPoints.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex items-start gap-2">
                          <Check className={`h-3 w-3 ${phase.color.accent} mt-1 flex-shrink-0`} />
                          <span className="text-gray-700 text-xs leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Mobile Progress */}
                    {phase.completionRate && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Success Rate</span>
                          <span className={`text-xs font-semibold ${phase.color.text}`}>
                            {phase.completionRate}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${phase.completionRate}%` } : {}}
                            transition={{ duration: 1, delay: index * 0.2 + 0.8 }}
                            className="h-1.5 rounded-full"
                            style={{ background: phase.color.gradient }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 bg-navy-900 border-t-4 border-green-600 rounded-2xl p-8 text-center text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold">92%</div>
              <div className="text-blue-100 text-sm">Complete All 4 Phases</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">2,847</div>
              <div className="text-blue-100 text-sm">Students Transformed in 2024</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">650+</div>
              <div className="text-blue-100 text-sm">Average NEET Score Achieved</div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-blue-500">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
            </div>
            <p className="text-blue-100 text-lg">
              "The 4-phase system gave me clear direction. I knew exactly where I was and what to
              focus on next!"
            </p>
            <div className="mt-3 text-blue-200 text-sm">
              — Ananya Singh, NEET 2024 (Rank 247, AIIMS Delhi)
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
