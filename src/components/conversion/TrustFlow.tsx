'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Award, Users, BookOpen, Play, Calendar, MessageCircle, ArrowRight } from 'lucide-react'
import { FormSteps } from '@/components/ui/ProgressIndicators'

interface TrustFlowProps {
  isOpen: boolean
  onClose: () => void
  onComplete?: (action: string) => void
}

interface Differentiator {
  icon: React.ElementType
  title: string
  description: string
  stat: string
}

export function TrustFlow({ isOpen, onClose, onComplete }: TrustFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [counters, setCounters] = useState({
    students: 0,
    selections: 0,
    success: 0,
  })

  const differentiators: Differentiator[] = [
    {
      icon: Award,
      title: 'AIIMS Faculty Teaching',
      description:
        'Learn directly from doctors who teach at AIIMS - the most prestigious medical institute',
      stat: '15+ AIIMS Doctors',
    },
    {
      icon: Users,
      title: 'Proven Track Record',
      description: 'Our students consistently secure top ranks in NEET with personalized attention',
      stat: '247 AIIMS Selections',
    },
    {
      icon: BookOpen,
      title: 'Personalized Learning',
      description:
        'Small batch sizes ensure every student gets individual attention and doubt resolution',
      stat: 'Max 25 Students/Batch',
    },
  ]

  const testimonialVideo = {
    thumbnail: '/testimonials/student-success.jpg',
    title: 'How I Scored 680/720 in NEET',
    student: 'Priya Sharma',
    achievement: 'AIIMS Delhi Selection',
    duration: '2:34',
  }

  // Counter animation effect
  useEffect(() => {
    if (currentStep === 1) {
      const targets = { students: 5000, selections: 247, success: 94 }
      const duration = 2000 // 2 seconds

      const startTime = Date.now()
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        setCounters({
          students: Math.floor(targets.students * progress),
          selections: Math.floor(targets.selections * progress),
          success: Math.floor(targets.success * progress),
        })

        if (progress >= 1) {
          clearInterval(timer)
        }
      }, 16) // ~60fps

      return () => clearInterval(timer)
    }
  }, [currentStep])

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && isOpen && currentStep > 0) {
        setShowExitIntent(true)
      }
    }

    if (isOpen) {
      document.addEventListener('mouseleave', handleMouseLeave)
      return () => document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isOpen, currentStep])

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleAction = (action: string) => {
    onComplete?.(action)
    onClose()
  }

  const handleExitIntentAction = () => {
    handleAction('free-counseling')
    setShowExitIntent(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Main Trust Flow Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-slate-900 rounded-2xl shadow-2xl max-w-full sm:max-w-2xl lg:max-w-4xl w-full mx-4 sm:mx-0 max-h-[90vh] overflow-hidden border border-slate-700"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-700">
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-white">
                Why Choose Cerebrum Biology Academy?
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm">Discover what makes us different</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4 sm:p-6">
            <AnimatePresence mode="wait">
              {/* Step 0: Key Differentiators */}
              {currentStep === 0 && (
                <motion.div
                  key="differentiators"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">
                      3 Key Reasons Students Choose Us
                    </h3>
                    <p className="text-gray-400">
                      What sets us apart from other coaching institutes
                    </p>
                  </div>

                  <div className="grid gap-6">
                    {differentiators.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-slate-800 rounded-xl p-6 border border-slate-700"
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-emerald-600/20 p-3 rounded-lg">
                            <item.icon className="w-6 h-6 text-emerald-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                            <p className="text-gray-300 mb-3">{item.description}</p>
                            <div className="text-emerald-400 font-bold text-lg">{item.stat}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex justify-center pt-6">
                    <button
                      onClick={handleNext}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                    >
                      See Our Success Numbers
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 1: Success Counter Animation */}
              {currentStep === 1 && (
                <motion.div
                  key="counters"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center space-y-8"
                >
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Our Success in Numbers</h3>
                    <p className="text-gray-400">Real results from real students</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                      <div className="text-4xl font-bold text-emerald-400 mb-2">
                        {counters.students.toLocaleString()}+
                      </div>
                      <div className="text-white font-semibold">Students Taught</div>
                      <div className="text-gray-400 text-sm">Across all batches</div>
                    </div>

                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                      <div className="text-4xl font-bold text-blue-400 mb-2">
                        {counters.selections}
                      </div>
                      <div className="text-white font-semibold">AIIMS Selections</div>
                      <div className="text-gray-400 text-sm">This year alone</div>
                    </div>

                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                      <div className="text-4xl font-bold text-yellow-400 mb-2">
                        {counters.success}%
                      </div>
                      <div className="text-white font-semibold">Success Rate</div>
                      <div className="text-gray-400 text-sm">NEET qualification</div>
                    </div>
                  </div>

                  <div className="flex justify-center pt-6">
                    <button
                      onClick={handleNext}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                    >
                      Hear From Our Students
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Video Testimonial */}
              {currentStep === 2 && (
                <motion.div
                  key="testimonial"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Success Stories</h3>
                    <p className="text-gray-400">Hear directly from our AIIMS-selected students</p>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="aspect-video bg-slate-700 rounded-lg relative overflow-hidden mb-4 cursor-pointer group">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-blue-600/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 rounded-full p-4 group-hover:bg-white transition-colors">
                          <Play className="w-8 h-8 text-slate-900 ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {testimonialVideo.duration}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-white">{testimonialVideo.title}</h4>
                      <p className="text-emerald-400 font-medium">{testimonialVideo.student}</p>
                      <p className="text-gray-400">{testimonialVideo.achievement}</p>
                    </div>
                  </div>

                  <div className="flex justify-center pt-6">
                    <button
                      onClick={handleNext}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                    >
                      Experience It Yourself
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Free Demo Offer & Lead Capture */}
              {currentStep === 3 && (
                <motion.div
                  key="demo"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Ready to Experience Excellence?
                    </h3>
                    <p className="text-gray-400">
                      Book your free demo class and see the difference
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-xl p-6 border border-emerald-600/30">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-white mb-2">FREE Demo Class</div>
                      <div className="text-emerald-400 text-lg">
                        Worth ₹2,000 - Absolutely Free!
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3 text-white">
                        <Calendar className="w-5 h-5 text-emerald-400" />
                        <span>1-hour live biology class</span>
                      </div>
                      <div className="flex items-center gap-3 text-white">
                        <MessageCircle className="w-5 h-5 text-emerald-400" />
                        <span>Doubt resolution session</span>
                      </div>
                      <div className="flex items-center gap-3 text-white">
                        <BookOpen className="w-5 h-5 text-emerald-400" />
                        <span>Study material sample</span>
                      </div>
                      <div className="flex items-center gap-3 text-white">
                        <Award className="w-5 h-5 text-emerald-400" />
                        <span>Personal counseling</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <button
                        onClick={() => handleAction('demo-class')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-5 h-5" />
                        Book Free Demo
                      </button>
                      <button
                        onClick={() => handleAction('counseling')}
                        className="border border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Get Counseling
                      </button>
                    </div>
                  </div>

                  <div className="text-center text-sm text-gray-400">
                    🔒 No spam, no obligations. Just pure learning experience.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Enhanced Progress Indicator */}
          <div className="px-6 pb-6">
            <FormSteps
              steps={[
                { id: 'differentiators', label: 'Key Benefits' },
                { id: 'stats', label: 'Success Data' },
                { id: 'testimonial', label: 'Student Stories' },
                { id: 'action', label: 'Get Started' },
              ]}
              currentStep={currentStep}
              completedSteps={Array.from({ length: currentStep }, (_, i) => i)}
              variant="circular"
              size="sm"
              showLabels={false}
              className="justify-center"
            />
          </div>
        </motion.div>
      </div>

      {/* Exit Intent Modal */}
      <AnimatePresence>
        {showExitIntent && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80"
              onClick={() => setShowExitIntent(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 rounded-xl p-6 max-w-md w-full border border-red-500/50 relative"
            >
              <button
                onClick={() => setShowExitIntent(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <div className="text-2xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-2">Wait! Before You Go...</h3>
                <p className="text-gray-300 mb-6">
                  Get a FREE counseling session with our AIIMS faculty. Discover your perfect study
                  plan for NEET success.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={handleExitIntentAction}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Get Free Counseling Session
                  </button>
                  <button
                    onClick={() => setShowExitIntent(false)}
                    className="w-full text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    No thanks, I'll figure it out myself
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
