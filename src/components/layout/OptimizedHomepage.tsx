'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UltraSimplifiedHero } from '@/components/layout/UltraSimplifiedHero'
import { StickyTrustBar } from '@/components/layout/StickyTrustBar'
import { SimplifiedCourseCards } from '@/components/layout/SimplifiedCourseCards'
import { TrustFlow } from '@/components/conversion/TrustFlow'
import { PremiumButton, PremiumCard, AnimatedCounter } from '@/components/ui/PremiumDesignSystem'
import {
  SparklesIcon,
  TrophyIcon,
  ClockIcon,
  UsersIcon,
  CheckCircleIcon,
  StarIcon,
  PhoneIcon,
  DocumentArrowDownIcon,
  BookOpenIcon,
  AcademicCapIcon,
  HeartIcon,
  ShieldCheckIcon,
  ChevronRightIcon,
  PlayIcon,
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'

interface OptimizedHomepageProps {
  className?: string
}

export function OptimizedHomepage({ className = '' }: OptimizedHomepageProps) {
  const [showTrustBar, setShowTrustBar] = useState(false)
  const [showTrustFlow, setShowTrustFlow] = useState(false)

  // Show trust bar after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > window.innerHeight * 0.8
      setShowTrustBar(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBookDemo = () => {
    window.location.href = '/demo'
  }

  const handleDownloadBrochure = () => {
    // Track download
    console.log('Brochure download initiated')
    // Generate PDF or redirect to download
  }

  const handleTrustFlowAction = (action: string) => {
    console.log('Trust flow action:', action)
    // Handle different trust flow actions
    switch (action) {
      case 'demo-class':
        window.location.href = '/demo'
        break
      case 'counseling':
        window.location.href = '/counseling'
        break
      case 'free-counseling':
        window.location.href = '/counseling?type=free'
        break
      default:
        console.log('Unknown action:', action)
    }
  }

  const trustMetrics = [
    { value: 5000, suffix: '+', label: 'Students Transformed' },
    { value: 94.2, suffix: '%', label: 'NEET Success Rate' },
    { value: 247, label: 'AIIMS Selections' },
    { value: 15, label: 'Years Experience' },
  ]

  const mainCourses = [
    {
      id: 'class11-12',
      name: 'Class 11-12 NEET Complete',
      subtitle: 'Comprehensive 2-Year Program',
      price: 65000,
      originalPrice: 85000,
      duration: '2 Years',
      features: ['Complete NCERT', 'Advanced Problems', 'Regular Tests', 'Personal Mentoring'],
      highlights: ['Most Popular', '94.8% Success Rate', '1200+ Students'],
      badge: 'RECOMMENDED',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'dropper',
      name: 'Dropper Success Intensive',
      subtitle: 'Second Chance, First Class Success',
      price: 75000,
      originalPrice: 95000,
      duration: '1 Year',
      features: [
        'Complete Restart',
        'Weakness Analysis',
        'Confidence Building',
        'Success Guarantee',
      ],
      highlights: ['89.7% Success Rate', '750+ Transformations', 'Small Batches'],
      badge: 'GUARANTEED',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'final-year',
      name: 'Class 12 Final Sprint',
      subtitle: 'Last Mile Excellence',
      price: 55000,
      originalPrice: 70000,
      duration: '6 Months',
      features: ['Intensive Revision', 'Exam Strategy', 'Mock Tests', 'Score Optimization'],
      highlights: ['92.3% Success Rate', '950+ Students', 'Rapid Results'],
      badge: 'INTENSIVE',
      color: 'from-purple-500 to-purple-600',
    },
  ]

  const differentiators = [
    {
      icon: AcademicCapIcon,
      title: 'AIIMS Faculty Excellence',
      description: 'Learn from doctors who graduated from AIIMS and top medical colleges',
      stat: '15+ Years Teaching',
      color: 'text-blue-600',
    },
    {
      icon: TrophyIcon,
      title: 'Proven Success Record',
      description: '94.2% success rate with 247 AIIMS selections in 2024 alone',
      stat: '5000+ Success Stories',
      color: 'text-green-600',
    },
    {
      icon: HeartIcon,
      title: 'Personal Care & Support',
      description: 'Small batches, personal mentoring, and emotional support throughout',
      stat: '1:20 Teacher Ratio',
      color: 'text-red-600',
    },
  ]

  const quickTestimonials = [
    {
      name: 'Arjun Patel',
      score: '358/360',
      college: 'AIIMS Delhi',
      image: '/api/placeholder/80/80',
      quote: 'The quiz helped me find the perfect course. Best decision ever!',
      course: 'Dropper Success',
      year: '2024',
    },
    {
      name: 'Priya Sharma',
      score: '342/360',
      college: 'JIPMER',
      image: '/api/placeholder/80/80',
      quote: 'Faculty made Biology so interesting and easy to understand.',
      course: 'Class 11-12 Complete',
      year: '2024',
    },
    {
      name: 'Rohit Kumar',
      score: '355/360',
      college: 'AIIMS Rishikesh',
      image: '/api/placeholder/80/80',
      quote: 'From struggling with basics to AIIMS. Journey was incredible.',
      course: 'Final Sprint',
      year: '2024',
    },
  ]

  return (
    <div className={`-mt-16 ${className}`}>
      {/* 1. ULTRA-SIMPLIFIED HERO - 100vh Full Screen */}
      <UltraSimplifiedHero />

      {/* 2. TRUST BAR - 50px Sticky */}
      <StickyTrustBar isVisible={showTrustBar} />

      {/* 3. COURSE CARDS - 3 Main Options Only */}
      <SimplifiedCourseCards />

      {/* 4. WHY CHOOSE US - 3 Key Differentiators */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Why 5,000+ Students Choose Cerebrum
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-6"
            >
              Three pillars of excellence that set us apart
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setShowTrustFlow(true)}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center gap-2 group"
            >
              Why Choose Us?
              <ChevronRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center space-y-6"
              >
                <div
                  className={`w-20 h-20 ${item.color} bg-gray-50 rounded-full flex items-center justify-center mx-auto`}
                >
                  <item.icon className={`h-10 w-10 ${item.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{item.description}</p>
                  <div className={`text-lg font-bold ${item.color}`}>{item.stat}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SUCCESS PREVIEW - 3 Testimonials + View All */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Recent Success Stories
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              See how our students achieved their NEET dreams
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {quickTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PremiumCard variant="luxury" className="h-full">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-3 border-green-200"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <div className="text-2xl font-bold text-green-600">{testimonial.score}</div>
                        <div className="text-sm text-blue-600">{testimonial.college}</div>
                      </div>
                    </div>

                    <blockquote className="text-gray-600 italic">"{testimonial.quote}"</blockquote>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">
                        {testimonial.course} • {testimonial.year}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarSolid key={i} className="h-4 w-4 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center">
            <PremiumButton
              variant="luxury"
              size="lg"
              onClick={() => (window.location.href = '/success-stories')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4"
            >
              View All Success Stories
              <ChevronRightIcon className="h-5 w-5" />
            </PremiumButton>
          </div>
        </div>
      </section>

      {/* 6. QUICK ACTIONS - Book Demo / Download Brochure */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-bold mb-4">Ready to Start Your NEET Journey?</h2>
              <p className="text-xl text-orange-100">
                Take the first step towards your medical career today
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <PremiumButton
                variant="medical"
                size="xl"
                onClick={handleBookDemo}
                className="bg-white text-orange-600 hover:bg-gray-50 font-bold py-4 px-8"
              >
                <PhoneIcon className="h-6 w-6" />
                Book Free Demo Class
                <span className="bg-orange-100 text-orange-800 text-sm px-2 py-1 rounded-full ml-2">
                  FREE
                </span>
              </PremiumButton>

              <PremiumButton
                variant="luxury"
                size="xl"
                onClick={handleDownloadBrochure}
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-8"
              >
                <DocumentArrowDownIcon className="h-6 w-6" />
                Download Course Brochure
              </PremiumButton>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-orange-100">
              <div className="flex items-center gap-1">
                <CheckCircleIcon className="h-4 w-4" />
                No spam, just quality content
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheckIcon className="h-4 w-4" />
                100% Free consultation
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. FOOTER WITH SITEMAP - Complete Navigation */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Courses</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="/courses/class-11" className="hover:text-white">
                    Class 11-12 Complete
                  </a>
                </li>
                <li>
                  <a href="/courses/dropper" className="hover:text-white">
                    Dropper Program
                  </a>
                </li>
                <li>
                  <a href="/courses/final-sprint" className="hover:text-white">
                    Final Year Sprint
                  </a>
                </li>
                <li>
                  <a href="/courses/foundation" className="hover:text-white">
                    Foundation (9-10)
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="/success-stories" className="hover:text-white">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="/curriculum" className="hover:text-white">
                    Curriculum Details
                  </a>
                </li>
                <li>
                  <a href="/compare" className="hover:text-white">
                    Course Comparison
                  </a>
                </li>
                <li>
                  <a href="/mobile-app" className="hover:text-white">
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="/about" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/about/faculty" className="hover:text-white">
                    Faculty
                  </a>
                </li>
                <li>
                  <a href="/about/results" className="hover:text-white">
                    Results
                  </a>
                </li>
                <li>
                  <a href="/about/media" className="hover:text-white">
                    Media Coverage
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>+91 88264 44334</li>
                <li>info@cerebrumbiologyacademy.com</li>
                <li>
                  <a href="/contact" className="hover:text-white">
                    Contact Form
                  </a>
                </li>
                <li>
                  <a href="/demo" className="hover:text-white">
                    Book Demo
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Cerebrum Biology Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Trust Flow Modal */}
      <TrustFlow
        isOpen={showTrustFlow}
        onClose={() => setShowTrustFlow(false)}
        onComplete={handleTrustFlowAction}
      />
    </div>
  )
}
