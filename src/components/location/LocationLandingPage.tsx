'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Star,
  Users,
  Trophy,
  Clock,
  Target,
  BookOpen,
  GraduationCap,
  ChevronRight,
  Award,
  TrendingUp,
  Heart,
  Zap,
} from 'lucide-react'
import { LocationData } from '@/data/locationData'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Separator } from '@/components/ui/separator'

interface LocationLandingPageProps {
  locationData: LocationData
  className?: string
}

export function LocationLandingPage({ locationData, className = '' }: LocationLandingPageProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'tier1':
        return 'from-purple-600 to-pink-600'
      case 'tier2':
        return 'from-blue-600 to-indigo-600'
      case 'tier3':
        return 'from-green-600 to-teal-600'
      default:
        return 'from-gray-600 to-slate-600'
    }
  }

  const getCompetitionBadge = (level: string) => {
    switch (level) {
      case 'very-high':
        return { text: 'Very High Competition', color: 'bg-red-500' }
      case 'high':
        return { text: 'High Competition', color: 'bg-orange-500' }
      case 'moderate':
        return { text: 'Moderate Competition', color: 'bg-yellow-500' }
      default:
        return { text: 'Competition Level', color: 'bg-gray-500' }
    }
  }

  const competitionBadge = getCompetitionBadge(locationData.competitionLevel)

  return (
    <motion.div
      className={`min-h-screen bg-gradient-to-b from-slate-50 to-white ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      {/* Hero Section */}
      <section
        className={`relative py-20 px-4 overflow-hidden bg-gradient-to-r ${getTierColor(locationData.tier)}`}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto text-center text-white">
          <motion.div variants={itemVariants} className="mb-6">
            <Badge className="mb-4 bg-white/20 backdrop-blur-sm text-white border-white/30">
              <MapPin className="w-4 h-4 mr-2" />
              {locationData.city}, {locationData.state}
            </Badge>
            <Badge className={`ml-2 ${competitionBadge.color} text-white border-none`}>
              <Target className="w-4 h-4 mr-2" />
              {competitionBadge.text}
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            {locationData.contentVariants.heroTitle}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90"
          >
            {locationData.contentVariants.heroSubtitle}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="text-center">
              <div className="text-3xl font-bold">
                {locationData.neetAspirants.toLocaleString()}+
              </div>
              <div className="text-sm opacity-80">NEET Aspirants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{locationData.medicalColleges}</div>
              <div className="text-sm opacity-80">Medical Colleges</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{locationData.localContext.successRate}%</div>
              <div className="text-sm opacity-80">Local Success Rate</div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {locationData.contentVariants.ctaText}
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why {locationData.city} Students Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {locationData.contentVariants.valueProposition}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Local Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Deep understanding of {locationData.state} medical college requirements and
                    local competition patterns.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {locationData.localContext.topMedicalColleges
                      .slice(0, 3)
                      .map((college, index) => (
                        <li key={index} className="flex items-center">
                          <Award className="w-4 h-4 mr-2 text-gold-500" />
                          {college} focused preparation
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Cost Advantage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Save ₹{(locationData.localContext.avgCoachingFee * 0.4).toLocaleString()}{' '}
                    compared to local coaching institutes.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Local Average:</span>
                      <span className="line-through text-red-500">
                        ₹{locationData.localContext.avgCoachingFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Our Price:</span>
                      <span className="text-green-600">
                        ₹{(locationData.localContext.avgCoachingFee * 0.6).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Cultural Connect</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Teaching methodology that resonates with {locationData.city}'s educational
                    culture.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {locationData.localContext.culturalFactors.slice(0, 3).map((factor, index) => (
                      <li key={index} className="flex items-center">
                        <Zap className="w-4 h-4 mr-2 text-purple-500" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Local Challenges & Solutions */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Solving {locationData.city}'s NEET Challenges
            </h2>
            <p className="text-xl text-gray-600">
              We understand the unique challenges faced by {locationData.city} students
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {locationData.localContext.localChallenges.map((challenge, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 border-l-4 border-l-red-500 bg-white">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Target className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Challenge: {challenge}</h3>
                      <p className="text-gray-600 text-sm">
                        Our advanced teaching methodology and technology-driven approach directly
                        addresses this concern.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competition Analysis */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why We're Better Than {locationData.city} Alternatives
            </h2>
            <Badge className={`${competitionBadge.color} text-white`}>
              <Users className="w-4 h-4 mr-2" />
              {locationData.neetAspirants.toLocaleString()}+ students competing in{' '}
              {locationData.city}
            </Badge>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locationData.localContext.majorCompetitors.map((competitor, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 text-center border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-700 mb-4">{competitor}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Class Size:</span>
                      <span className="text-red-500">100+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Personal Attention:</span>
                      <span className="text-red-500">Limited</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Results Tracking:</span>
                      <span className="text-red-500">Basic</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-8">
            <Card className="p-6 border-4 border-green-500 bg-green-50">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Cerebrum Biology Academy</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-green-600">1:15</div>
                    <div className="text-sm text-green-700">Teacher:Student Ratio</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">98%</div>
                    <div className="text-sm text-green-700">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">24/7</div>
                    <div className="text-sm text-green-700">Doubt Resolution</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className={`py-16 px-4 bg-gradient-to-r ${getTierColor(locationData.tier)}`}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {locationData.contentVariants.urgencyMessage}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {locationData.contentVariants.testimonialFocus}
            </p>
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Clock className="mr-2 w-5 h-5" />
              Secure Your Seat Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Local Medical Colleges */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Target Medical Colleges in {locationData.state}
            </h2>
            <p className="text-xl text-gray-600">
              Our students are getting admitted to these prestigious institutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locationData.localContext.topMedicalColleges.map((college, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-gold-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{college}</h3>
                  <Badge className="bg-blue-100 text-blue-800">Target Institution</Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Ready to Join {locationData.city}'s Success Story?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Don't let location limit your medical dreams. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                <BookOpen className="mr-2 w-5 h-5" />
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                <Users className="mr-2 w-5 h-5" />
                Talk to {locationData.city} Students
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
