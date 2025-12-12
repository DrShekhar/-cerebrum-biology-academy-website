'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PremiumButton,
  PremiumCard,
  PremiumStat,
  PremiumTooltip,
} from '@/components/ui/PremiumDesignSystem'
import {
  AcademicCapIcon,
  SparklesIcon,
  PlayIcon,
  PhoneIcon,
  TrophyIcon,
  BeakerIcon,
  ChartBarIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'
import { getPlaceholderAvatar } from '@/lib/images/imageUtils'
import { StarIcon } from '@heroicons/react/24/solid'

interface SophisticatedHeroProps {
  onDemoBooking?: () => void
  onCallNow?: () => void
  className?: string
}

export function SophisticatedHero({
  onDemoBooking,
  onCallNow,
  className = '',
}: SophisticatedHeroProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const testimonials = [
    {
      name: 'Ananya Sharma',
      score: '355/360',
      rank: 'AIR 47',
      college: 'AIIMS Delhi',
      quote:
        "Dr. Shekhar's methodology transformed my understanding of cellular biology. The systematic approach to NEET preparation is unparalleled.",
      image: getPlaceholderAvatar('Ananya Sharma', 60, '4F46E5', 'fff'),
    },
    {
      name: 'Arjun Patel',
      score: '348/360',
      rank: 'AIR 156',
      college: 'JIPMER Puducherry',
      quote:
        'The depth of knowledge and clarity in explanation helped me master complex concepts in genetics and molecular biology.',
      image: getPlaceholderAvatar('Arjun Patel', 60, '059669', 'fff'),
    },
    {
      name: 'Priya Mehta',
      score: '342/360',
      rank: 'AIR 298',
      college: 'AIIMS Rishikesh',
      quote:
        'From struggling with biology to securing AIIMS admission - Cerebrum Academy made the impossible possible.',
      image: getPlaceholderAvatar('Priya Mehta', 60, '7C3AED', 'fff'),
    },
  ]

  const achievements = [
    { value: 98, suffix: '%', label: 'NEET Success Rate', icon: TrophyIcon },
    { value: 330, prefix: '', suffix: '+', label: 'Average Biology Score', icon: ChartBarIcon },
    { value: 695, suffix: '', label: 'Top Score (Sadhna)', icon: AcademicCapIcon },
    { value: 2500, suffix: '+', label: 'Students Mentored', icon: GlobeAltIcon },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div
      className={`relative min-h-screen bg-navy-50 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.1,
            y: mousePosition.y * 0.1,
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: -mousePosition.x * 0.05,
            y: -mousePosition.y * 0.05,
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        {/* DNA Helix Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,50 Q25,30 50,50 T100,50"
              stroke="url(#dnaGradient)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <defs>
              <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-navy-100 border border-teal-300 rounded-full px-4 py-2"
            >
              <SparklesIcon className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">
                Harvard-Caliber Biology Education • Silicon Valley Innovation
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-navy-900">Master Biology</span>
                <br />
                <span className="text-teal-700">Like a Harvard Professor</span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-2xl">
                Experience world-class NEET Biology preparation with
                <PremiumTooltip content="AIIMS Graduate • 15+ Years Experience • 500+ AIIMS Selections">
                  <span className="font-semibold text-blue-700 cursor-help"> Dr. Shekhar's </span>
                </PremiumTooltip>
                revolutionary teaching methodology.
                <span className="font-semibold text-green-700">98% success rate</span> speaks
                volumes.
              </p>
            </motion.div>

            {/* Achievement Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {achievements.map((achievement, index) => (
                <PremiumCard key={index} variant="premium" size="sm" className="text-center">
                  <achievement.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <PremiumStat
                    value={achievement.value}
                    prefix={achievement.prefix}
                    suffix={achievement.suffix}
                    label={achievement.label}
                    decimals={achievement.suffix === '%' ? 1 : 0}
                  />
                </PremiumCard>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <PremiumButton
                variant="medical"
                size="lg"
                onClick={onDemoBooking}
                className="flex items-center justify-center gap-3 group"
              >
                <PlayIcon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                Experience World-Class Demo
                <span className="text-sm bg-white/20 px-2 py-1 rounded-full ml-2">FREE</span>
              </PremiumButton>

              <PremiumButton
                variant="luxury"
                size="lg"
                onClick={onCallNow}
                className="flex items-center justify-center gap-3"
              >
                <PhoneIcon className="h-6 w-6" />
                Speak with Dr. Shekhar
              </PremiumButton>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-wrap items-center gap-6 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
                  ))}
                </div>
                <span className="font-medium">4.9/5 Rating • 2,847 Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <BeakerIcon className="h-5 w-5 text-green-600" />
                <span>Research-Backed Methodology</span>
              </div>
              <div className="flex items-center gap-2">
                <TrophyIcon className="h-5 w-5 text-blue-600" />
                <span>500+ AIIMS Success Stories</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Interactive Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Featured Success Story */}
            <PremiumCard variant="luxury" size="lg" className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-2xl" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="relative space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {testimonials[currentTestimonial].name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                          {testimonials[currentTestimonial].score}
                        </span>
                        <span className="text-blue-700 font-medium">
                          {testimonials[currentTestimonial].rank}
                        </span>
                        <span className="text-purple-700 font-medium">
                          {testimonials[currentTestimonial].college}
                        </span>
                      </div>
                    </div>
                  </div>

                  <blockquote className="text-lg text-gray-700 leading-relaxed italic">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>

                  <div className="flex justify-between items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">NEET 2024 Success</div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Testimonial Navigation */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? 'bg-blue-600 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </PremiumCard>

            {/* Real-time Success Indicator */}
            <PremiumCard variant="premium" size="md" className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-lg font-semibold text-gray-800">Live Success Updates</span>
              </div>
              <p className="text-gray-600">
                <span className="font-bold text-green-700">Rajesh Kumar</span> just scored
                <span className="font-bold text-blue-700"> 349/360</span> in NEET 2024!
              </p>
              <p className="text-sm text-gray-500 mt-2">Admitted to AIIMS Bhopal • 2 minutes ago</p>
            </PremiumCard>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
        </div>
      </motion.div>
    </div>
  )
}
