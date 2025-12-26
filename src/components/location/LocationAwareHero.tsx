'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Users, Target, Award, ChevronRight } from 'lucide-react'
import { getLocationBySlug } from '@/data/locationData'
import { useUserLocation } from '@/components/location/LocationDetector'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface LocationAwareHeroProps {
  className?: string
  fallbackTitle?: string
  fallbackSubtitle?: string
}

export function LocationAwareHero({
  className = '',
  fallbackTitle = "Master NEET Biology with India's #1 Faculty",
  fallbackSubtitle = 'Join 10,000+ students who chose Cerebrum Biology Academy for guaranteed NEET success',
}: LocationAwareHeroProps) {
  const { preferredLocation } = useUserLocation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Determine content based on location
  const getLocationContent = () => {
    if (preferredLocation) {
      return {
        title: preferredLocation.contentVariants.heroTitle,
        subtitle: preferredLocation.contentVariants.heroSubtitle,
        locationBadge: `${preferredLocation.city}, ${preferredLocation.state}`,
        aspirants: preferredLocation.neetAspirants,
        urgencyMessage: preferredLocation.contentVariants.urgencyMessage,
        ctaText: preferredLocation.contentVariants.ctaText,
        showLocationStats: true,
      }
    }

    return {
      title: fallbackTitle,
      subtitle: fallbackSubtitle,
      locationBadge: null,
      aspirants: null,
      urgencyMessage: 'Limited seats available for 2024 batch',
      ctaText: 'Start Your NEET Journey',
      showLocationStats: false,
    }
  }

  const content = getLocationContent()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.section
      className={`relative py-20 px-4 bg-blue-600 overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto text-center text-white">
        {/* Location Badge */}
        {content.locationBadge && (
          <motion.div variants={itemVariants} className="mb-6">
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-sm px-4 py-2">
              <MapPin className="w-4 h-4 mr-2" />
              Personalized for {content.locationBadge}
            </Badge>
            {content.showLocationStats && (
              <Badge className="ml-3 bg-green-400/20 backdrop-blur-sm text-white border-green-400/30">
                <Users className="w-4 h-4 mr-2" />
                {content.aspirants?.toLocaleString()}+ aspirants in your area
              </Badge>
            )}
          </motion.div>
        )}

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          {content.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90 leading-relaxed"
        >
          {content.subtitle}
        </motion.p>

        {/* Stats Section */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-8 mb-10">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">98%</div>
            <div className="text-sm md:text-base opacity-80">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">10,000+</div>
            <div className="text-sm md:text-base opacity-80">Students Enrolled</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">330+</div>
            <div className="text-sm md:text-base opacity-80">Avg Biology Score</div>
          </div>
          {content.showLocationStats && preferredLocation && (
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">
                {preferredLocation.medicalColleges}
              </div>
              <div className="text-sm md:text-base opacity-80">Med Colleges Nearby</div>
            </div>
          )}
        </motion.div>

        {/* Urgency Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <Badge className="bg-red-500/20 backdrop-blur-sm text-white border-red-400/30 text-sm px-4 py-2">
            <Target className="w-4 h-4 mr-2" />
            {content.urgencyMessage}
          </Badge>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <Button
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold"
          >
            {content.ctaText}
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 rounded-full backdrop-blur-sm"
          >
            <Award className="mr-2 w-5 h-5" />
            View Success Stories
          </Button>
        </motion.div>

        {/* Location-specific value proposition */}
        {preferredLocation && (
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
            <p className="text-lg opacity-90 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
              {preferredLocation.contentVariants.valueProposition}
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </motion.section>
  )
}
