'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QuickQuizFlow } from './QuickQuizFlow'
import { InstantEnrollment } from './InstantEnrollment'
import { PremiumButton, PremiumCard, AnimatedCounter } from '@/components/ui/PremiumDesignSystem'
import {
  SparklesIcon,
  TrophyIcon,
  ClockIcon,
  UsersIcon,
  CheckCircleIcon,
  StarIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'

interface QuizResult {
  studentType: 'foundation' | 'class11' | 'class12' | 'dropper'
  currentScore: number
  targetScore: number
  timeframe: string
  confidence: number
  recommendedCourse: string
  pricing: number
}

interface HighConversionLandingProps {
  className?: string
}

export function HighConversionLanding({ className = '' }: HighConversionLandingProps) {
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
  const [showEnrollment, setShowEnrollment] = useState(false)
  const [liveStats, setLiveStats] = useState({
    enrollmentsToday: 23,
    studentsOnline: 127,
    successRate: 94.2,
  })

  // Simulate live stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setLiveStats((prev) => ({
          ...prev,
          enrollmentsToday: prev.enrollmentsToday + 1,
          studentsOnline: prev.studentsOnline + Math.floor(Math.random() * 3) - 1,
        }))
      }
    }, 45000) // Update every 45 seconds
    return () => clearInterval(interval)
  }, [])

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result)
    setShowEnrollment(true)
  }

  const handleEnrollmentSuccess = (enrollmentData: any) => {
    console.log('Enrollment successful:', enrollmentData)
    // Track conversion
    // Send to analytics
    // Redirect to dashboard or success page
  }

  const handleCallNow = () => {
    window.open('tel:+918826444334', '_self')
  }

  const handleWhatsAppChat = () => {
    const message =
      "Hi! I'm interested in your NEET Biology courses. Can you help me choose the right program?"
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/918826444334?text=${encodedMessage}`, '_blank')
  }

  const testimonials = [
    {
      name: 'Arjun Patel',
      score: '358/360',
      college: 'AIIMS Delhi',
      image: '/api/placeholder/60/60',
      quote: 'The quiz helped me find the perfect course. Enrolled in 3 minutes!',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      score: '342/360',
      college: 'JIPMER',
      image: '/api/placeholder/60/60',
      quote: 'Super fast enrollment process. Started studying the same day!',
      rating: 5,
    },
    {
      name: 'Rohit Kumar',
      score: '355/360',
      college: 'AIIMS Rishikesh',
      image: '/api/placeholder/60/60',
      quote: 'Found my ideal course in 2 minutes. Best decision ever!',
      rating: 5,
    },
  ]

  const conversionFeatures = [
    {
      icon: ClockIcon,
      title: '2-Minute Enrollment',
      description: 'Complete signup to first class access',
      color: 'text-blue-600',
    },
    {
      icon: TrophyIcon,
      title: '94.2% Success Rate',
      description: 'Proven track record of student success',
      color: 'text-green-600',
    },
    {
      icon: SparklesIcon,
      title: 'Instant Course Match',
      description: 'AI-powered course recommendation',
      color: 'text-purple-600',
    },
    {
      icon: UsersIcon,
      title: '5000+ Students',
      description: 'Join the success community',
      color: 'text-orange-600',
    },
  ]

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 ${className}`}
    >
      {/* Hero Section with Integrated Quiz */}
      <div className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Live Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 mb-8"
          >
            <div className="flex items-center justify-center gap-8 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>
                  <AnimatedCounter value={liveStats.studentsOnline} /> students online
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrophyIcon className="h-4 w-4 text-yellow-400" />
                <span>
                  <AnimatedCounter value={liveStats.enrollmentsToday} /> enrolled today
                </span>
              </div>
              <div className="flex items-center gap-2">
                <StarSolid className="h-4 w-4 text-yellow-400" />
                <span>
                  <AnimatedCounter value={liveStats.successRate} suffix="%" /> success rate
                </span>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Value Proposition */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-orange-300 via-yellow-300 to-green-300 bg-clip-text text-transparent">
                    Master Biology,
                  </span>
                  <br />
                  <span className="text-emerald-300">Conquer NEET,</span>
                  <br />
                  <span className="text-blue-300">Become a Doctor</span>
                </h1>

                <p className="text-xl text-blue-100 leading-relaxed">
                  Take our <span className="font-bold text-yellow-300">2-minute quiz</span> and get
                  <span className="font-bold text-green-300">
                    {' '}
                    personalized course recommendations
                  </span>{' '}
                  with
                  <span className="font-bold text-orange-300"> instant enrollment</span>
                </p>
              </div>

              {/* Conversion Features */}
              <div className="grid grid-cols-2 gap-4">
                {conversionFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
                  >
                    <feature.icon className={`h-8 w-8 mx-auto mb-2 ${feature.color}`} />
                    <div className="text-sm font-semibold">{feature.title}</div>
                    <div className="text-xs text-blue-200">{feature.description}</div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <PremiumButton
                  variant="medical"
                  size="lg"
                  onClick={handleCallNow}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  <PhoneIcon className="h-5 w-5" />
                  Call Now - Get Instant Admission
                </PremiumButton>

                <PremiumButton
                  variant="luxury"
                  size="lg"
                  onClick={handleWhatsAppChat}
                  className="bg-transparent border-2 border-white/50 text-white hover:bg-white/10"
                >
                  <ChatBubbleLeftRightIcon className="h-5 w-5" />
                  WhatsApp Chat
                </PremiumButton>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircleIcon className="h-4 w-4 text-green-400" />
                  <span>100% Refund Guarantee</span>
                </div>
                <div className="flex items-center gap-1">
                  <UsersIcon className="h-4 w-4 text-blue-400" />
                  <span>5000+ Happy Students</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Quiz Component */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <QuickQuizFlow onComplete={handleQuizComplete} />

              {/* Social Proof Testimonials */}
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Success Stories</h3>
                </div>

                <div className="space-y-3">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-orange-300"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-semibold text-white">{testimonial.name}</div>
                            <div className="flex">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <StarSolid key={i} className="h-4 w-4 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <div className="text-sm text-green-300 font-medium">
                            {testimonial.score} • {testimonial.college}
                          </div>
                          <div className="text-sm text-blue-100 mt-1">"{testimonial.quote}"</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Instant Enrollment Modal */}
      <AnimatePresence>
        {showEnrollment && quizResult && (
          <InstantEnrollment
            quizResult={quizResult}
            onClose={() => setShowEnrollment(false)}
            onSuccess={handleEnrollmentSuccess}
          />
        )}
      </AnimatePresence>

      {/* Conversion Stats Section */}
      <div className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why Students Choose Our 2-Minute Enrollment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: '12-15%', label: 'Conversion Rate', desc: 'Industry Leading' },
              { value: '2-3min', label: 'Enrollment Time', desc: 'Lightning Fast' },
              { value: '247', label: 'AIIMS Selections', desc: 'Proven Results' },
              { value: '5000+', label: 'Students Enrolled', desc: 'Via Quick Quiz' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-900">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
