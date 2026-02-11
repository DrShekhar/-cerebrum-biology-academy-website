'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { QuickQuizFlow } from './QuickQuizFlow'
import { InstantEnrollment } from './InstantEnrollment'
import { PremiumButton, AnimatedCounter } from '@/components/ui/PremiumDesignSystem'
import {
  Sparkles,
  Trophy,
  Clock,
  Users,
  CheckCircle2,
  Star,
  Phone,
  MessageSquare,
} from 'lucide-react'
import { getPlaceholderAvatar } from '@/lib/images/imageUtils'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { getPhoneLink } from '@/lib/constants/contactInfo'

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
    successRate: 98,
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
    window.open(getPhoneLink(), '_self')
  }

  const handleWhatsAppChat = async () => {
    await trackAndOpenWhatsApp({
      source: 'high-conversion-landing-hero',
      message:
        "Hi! I'm interested in your NEET Biology courses. Can you help me choose the right program?",
      campaign: 'high-conversion-landing',
    })
  }

  const testimonials = [
    {
      name: 'Arjun Patel',
      score: '358/360',
      college: 'AIIMS Delhi',
      image: getPlaceholderAvatar('Arjun Patel', 60, '4F46E5', 'fff'),
      quote: 'The quiz helped me find the perfect course. Enrolled in 3 minutes!',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      score: '342/360',
      college: 'JIPMER',
      image: getPlaceholderAvatar('Priya Sharma', 60, '059669', 'fff'),
      quote: 'Super fast enrollment process. Started studying the same day!',
      rating: 5,
    },
    {
      name: 'Rohit Kumar',
      score: '355/360',
      college: 'AIIMS Rishikesh',
      image: getPlaceholderAvatar('Rohit Kumar', 60, '7C3AED', 'fff'),
      quote: 'Found my ideal course in 2 minutes. Best decision ever!',
      rating: 5,
    },
  ]

  const conversionFeatures = [
    {
      icon: Clock,
      title: '2-Minute Enrollment',
      description: 'Complete signup to first class access',
      color: 'text-blue-600',
    },
    {
      icon: Trophy,
      title: '98% Success Rate',
      description: 'Proven track record of student success',
      color: 'text-green-600',
    },
    {
      icon: Sparkles,
      title: 'Instant Course Match',
      description: 'AI-powered course recommendation',
      color: 'text-purple-600',
    },
    {
      icon: Users,
      title: '5000+ Students',
      description: 'Join the success community',
      color: 'text-orange-600',
    },
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-b from-navy-50 to-white ${className}`}>
      {/* Hero Section with Integrated Quiz */}
      <div className="relative bg-navy-900 text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-green-500/15 to-green-600/10 rounded-full blur-3xl"
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
            className="bg-white/10 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-3 mb-6 sm:mb-8"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 md:gap-8 text-xs sm:text-sm font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>
                  <AnimatedCounter value={liveStats.studentsOnline} /> students online
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span>
                  <AnimatedCounter value={liveStats.enrollmentsToday} /> enrolled today
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>
                  <AnimatedCounter value={liveStats.successRate} suffix="%" /> success rate
                </span>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left Column - Value Proposition */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-orange-300 via-yellow-300 to-green-300 bg-clip-text text-transparent">
                    Master Biology,
                  </span>
                  <br />
                  <span className="text-green-400">Conquer NEET,</span>
                  <br />
                  <span className="text-blue-300">Become a Doctor</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed">
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
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                {conversionFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center"
                  >
                    <feature.icon
                      className={`h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 ${feature.color}`}
                    />
                    <div className="text-xs sm:text-sm font-semibold">{feature.title}</div>
                    <div className="text-xs text-blue-200 hidden xs:block">
                      {feature.description}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <PremiumButton
                  variant="medical"
                  size="lg"
                  onClick={handleCallNow}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Phone className="h-5 w-5" />
                  Call Now - Get Instant Admission
                </PremiumButton>

                <PremiumButton
                  variant="luxury"
                  size="lg"
                  onClick={handleWhatsAppChat}
                  className="bg-transparent border-2 border-white/50 text-white hover:bg-white/10"
                >
                  <MessageSquare className="h-5 w-5" />
                  WhatsApp Chat
                </PremiumButton>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 xs:gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>100% Refund Guarantee</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-blue-400" />
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
              <div className="space-y-3 sm:space-y-4">
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                    Recent Success Stories
                  </h3>
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
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover border-2 border-orange-300"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-semibold text-white">{testimonial.name}</div>
                            <div className="flex">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400" />
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
      <div className="py-10 sm:py-12 md:py-16 bg-navy-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            Why Students Choose Our 2-Minute Enrollment
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
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
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
