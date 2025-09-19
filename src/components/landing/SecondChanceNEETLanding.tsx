'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ChevronRightIcon,
  PlayCircleIcon,
  StarIcon,
  TrophyIcon,
  FireIcon,
  UsersIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  GiftIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline'
import {
  CheckCircleIcon as CheckCircleSolid,
  StarIcon as StarSolid,
  TrophyIcon as TrophySolid,
  UserGroupIcon as UserGroupSolid,
  HeartIcon as HeartSolid,
} from '@heroicons/react/24/solid'
import { PremiumCard, PremiumButton, AnimatedCounter } from '@/components/ui/PremiumDesignSystem'

interface SecondChanceNEETLandingProps {
  onFormSubmit?: (data: any) => void
  onWhatsAppContact?: () => void
  onCallNow?: () => void
  onBookCounseling?: () => void
  onDownloadStories?: () => void
}

interface SuccessStory {
  name: string
  beforeScore: number
  afterScore: number
  college: string
  videoId: string
  image: string
  quote: string
}

interface FAQ {
  question: string
  answer: string
  isOpen?: boolean
}

export function SecondChanceNEETLanding({
  onFormSubmit,
  onWhatsAppContact,
  onCallNow,
  onBookCounseling,
  onDownloadStories,
}: SecondChanceNEETLandingProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    previousScore: '',
    email: '',
  })
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [urgencyTimer, setUrgencyTimer] = useState(259200) // 72 hours in seconds
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [liveStats, setLiveStats] = useState({
    repeatersCleared: 2341,
    studentsEnrolled: 847,
    seatsLeft: 23,
    batchProgress: 76,
  })

  // Success stories data
  const successStories: SuccessStory[] = [
    {
      name: 'Arjun Sharma',
      beforeScore: 156,
      afterScore: 612,
      college: 'AIIMS Delhi',
      videoId: 'arjun_success',
      image: '/api/placeholder/100/100',
      quote:
        "I was devastated after scoring 156 in my first attempt. Cerebrum's specialized approach for repeaters changed everything.",
    },
    {
      name: 'Priya Patel',
      beforeScore: 203,
      afterScore: 589,
      college: 'JIPMER Puducherry',
      videoId: 'priya_success',
      image: '/api/placeholder/100/100',
      quote:
        'The small batch size and personal attention helped me overcome my Biology weaknesses completely.',
    },
    {
      name: 'Rahul Kumar',
      beforeScore: 178,
      afterScore: 567,
      college: 'King George Medical University',
      videoId: 'rahul_success',
      image: '/api/placeholder/100/100',
      quote:
        'From failure to medical college - Cerebrum made my dream possible with their scientific approach.',
    },
  ]

  // FAQ data
  const faqData: FAQ[] = [
    {
      question: 'Can I really clear NEET in second attempt?',
      answer:
        'Absolutely! 90% of our repeater students clear NEET in their second attempt. Our specialized curriculum and personalized approach address the specific challenges faced by repeaters.',
      isOpen: false,
    },
    {
      question: 'What if I fail again?',
      answer:
        "We offer a 100% fee refund guarantee if you don't improve your score by at least 100 marks. Plus, you get free coaching for the third attempt.",
      isOpen: false,
    },
    {
      question: 'How are you different from Allen/Aakash?',
      answer:
        'We focus exclusively on Biology (50% of NEET marks) with maximum 15 students per batch. Unlike coaching factories, we provide personalized attention and emotional support for repeaters.',
      isOpen: false,
    },
    {
      question: 'Do you provide hostel facilities?',
      answer:
        'Yes, we have separate hostels for boys and girls with 24/7 medical support, nutritious meals, and study-friendly environment designed specifically for NEET aspirants.',
      isOpen: false,
    },
    {
      question: "What's the fee structure?",
      answer:
        "Our repeater program starts from ₹75,000 with 0% EMI options. We also offer need-based scholarships and payment plans to ensure finances don't hinder your medical dream.",
      isOpen: false,
    },
    {
      question: 'Can parents attend classes?',
      answer:
        'Yes! We encourage parent involvement with monthly parent-teacher meetings, progress reports, and dedicated parent counseling sessions to maintain family support.',
      isOpen: false,
    },
  ]

  useEffect(() => {
    setFaqs(faqData)

    // Countdown timer
    const timer = setInterval(() => {
      setUrgencyTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    // Testimonial rotation
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % successStories.length)
    }, 5000)

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowExitIntent(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearInterval(timer)
      clearInterval(testimonialTimer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFormSubmit?.(formData)
    // Track conversion
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
        value: 1.0,
        currency: 'INR',
      })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleFAQ = (index: number) => {
    setFaqs((prev) =>
      prev.map((faq, i) =>
        i === index ? { ...faq, isOpen: !faq.isOpen } : { ...faq, isOpen: false }
      )
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      {/* Above the Fold Hero Section */}
      <div className="relative bg-gradient-to-br from-red-100 via-white to-blue-100 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-5" />

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Headlines and Hero Image */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="bg-red-500 text-white px-4 py-2 rounded-full inline-block text-sm font-medium">
                  🎯 For NEET 2024 Repeaters Only
                </div>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="text-red-600">Failed NEET 2024?</span>
                  <br />
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    90% of Our Students Clear in Second Attempt
                  </span>
                </h1>

                <p className="text-xl text-gray-700 leading-relaxed">
                  <span className="font-semibold text-blue-600">
                    Specialized Biology Coaching for Repeaters
                  </span>{' '}
                  by AIIMS Faculty
                  <br />
                  Transform your failure into success with India's #1 repeater program
                </p>

                {/* Trust Indicators */}
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <TrophySolid className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium">
                      <AnimatedCounter value={liveStats.repeatersCleared} /> Repeaters Cleared in
                      2024
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UserGroupSolid className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Max 15 Students Per Batch</span>
                  </div>
                </div>
              </motion.div>

              {/* Hero Image - Split Screen Effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="relative bg-gray-100 aspect-square">
                    <img
                      src="/api/placeholder/300/300"
                      alt="Disappointed student after NEET failure"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-red-900/20 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-2xl font-bold">Before</div>
                        <div className="text-sm">Score: 156/720</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative bg-blue-100 aspect-square">
                    <img
                      src="/api/placeholder/300/300"
                      alt="Student celebrating NEET success"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-green-900/20 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-2xl font-bold">After</div>
                        <div className="text-sm">Score: 612/720</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ChevronRightIcon className="w-12 h-12 text-green-500 bg-white rounded-full p-2 shadow-lg" />
                </div>
              </motion.div>
            </div>

            {/* Right Side - Lead Capture Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <PremiumCard variant="luxury" size="lg" className="bg-white shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DocumentTextIcon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Get Your Free Failure Analysis Report
                  </h2>
                  <p className="text-gray-600">
                    Discover exactly why you failed and how to succeed in 2025
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="WhatsApp Number *"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="number"
                      placeholder="Previous NEET Score (out of 720) *"
                      value={formData.previousScore}
                      onChange={(e) => handleInputChange('previousScore', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      min="0"
                      max="720"
                    />
                  </div>

                  <PremiumButton
                    type="submit"
                    variant="medical"
                    size="lg"
                    className="w-full py-4 text-lg font-bold"
                  >
                    Get My Success Plan
                  </PremiumButton>
                </form>

                <div className="mt-4 text-center text-sm text-gray-500">
                  ✓ Instant WhatsApp delivery ✓ 100% Free ✓ No spam calls
                </div>

                {/* Urgency Elements */}
                <div className="mt-6 space-y-3">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-red-800 font-medium">⚡ Early Bird Ends In:</span>
                      <span className="text-red-900 font-bold">{formatTime(urgencyTimer)}</span>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-orange-800 font-medium">
                        🔥 Only {liveStats.seatsLeft} seats left
                      </span>
                      <div className="w-20 h-2 bg-orange-200 rounded-full">
                        <div
                          className="h-2 bg-orange-500 rounded-full transition-all duration-1000"
                          style={{ width: `${liveStats.batchProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Real Students, Real Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Watch how our repeater students transformed their failures into medical college
              admissions
            </p>
          </div>

          {/* Video Testimonials Carousel */}
          <div className="relative mb-12">
            <div className="overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-8 items-center bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl"
                >
                  <div className="relative">
                    <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
                      <img
                        src={successStories[currentTestimonial].image}
                        alt={successStories[currentTestimonial].name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <PlayCircleIcon className="w-16 h-16 text-white cursor-pointer hover:scale-110 transition-transform" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {successStories[currentTestimonial].name}
                      </h3>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">
                            {successStories[currentTestimonial].beforeScore}
                          </div>
                          <div className="text-sm text-gray-600">Before</div>
                        </div>
                        <ChevronRightIcon className="w-6 h-6 text-gray-400" />
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {successStories[currentTestimonial].afterScore}
                          </div>
                          <div className="text-sm text-gray-600">After</div>
                        </div>
                      </div>
                      <div className="text-lg font-medium text-blue-600">
                        {successStories[currentTestimonial].college}
                      </div>
                    </div>

                    <blockquote className="text-lg text-gray-700 italic">
                      "{successStories[currentTestimonial].quote}"
                    </blockquote>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Testimonial indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Live Results Ticker */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-800 font-medium">Live Results:</span>
              </div>
              <div className="text-green-700">Arjun S. just got AIIMS Delhi (Score: 612)</div>
              <div className="text-green-700">Priya P. cleared JIPMER (Score: 589)</div>
              <div className="text-green-700">Rahul K. got KGMU (Score: 567)</div>
            </div>
          </div>

          {/* Google Reviews Widget */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white rounded-xl shadow-lg px-6 py-4">
              <img src="/api/placeholder/24/24" alt="Google" className="w-6 h-6" />
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <StarSolid key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <span className="font-bold text-gray-900">4.8</span>
              <span className="text-gray-600">(1,247 reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Problem-Solution Section */}
      <div className="py-16 bg-gradient-to-br from-red-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Problem Section */}
            <div>
              <div className="text-center mb-8">
                <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-red-600 mb-4">Why You Failed</h2>
                <p className="text-gray-600">Understanding the root causes of failure</p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: 'Weak Biology Foundation',
                    description: 'Biology is 50% of NEET marks, but most students ignore it',
                    stat: '50% marks lost',
                  },
                  {
                    title: 'Large Batches, No Personal Attention',
                    description: 'Lost in crowds of 100+ students with zero individual focus',
                    stat: '100+ students',
                  },
                  {
                    title: 'Generic Teaching for All Students',
                    description: 'Same approach for fresh and repeat students',
                    stat: 'One-size-fits-all',
                  },
                  {
                    title: 'No Emotional Support System',
                    description: 'Failure trauma ignored, mental health overlooked',
                    stat: '70% quit',
                  },
                ].map((problem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{problem.title}</h3>
                        <p className="text-gray-600">{problem.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600">{problem.stat}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Solution Section */}
            <div>
              <div className="text-center mb-8">
                <TrophySolid className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-green-600 mb-4">
                  Why You'll Succeed With Us
                </h2>
                <p className="text-gray-600">Our proven formula for repeater success</p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: 'Biology-Only Focus with AIIMS Faculty',
                    description: 'Specialized Biology coaching by doctors who cleared AIIMS',
                    stat: 'AIIMS Faculty',
                  },
                  {
                    title: '15-Student Batches Maximum',
                    description: 'Personal attention to every student, individual doubt clearing',
                    stat: 'Max 15 students',
                  },
                  {
                    title: 'Specialized Repeater Curriculum',
                    description: 'Different approach for repeaters vs fresh students',
                    stat: 'Repeater-specific',
                  },
                  {
                    title: 'Weekly Counseling and Motivation',
                    description: 'Mental health support, failure trauma healing, success mindset',
                    stat: '90% success rate',
                  },
                ].map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{solution.title}</h3>
                        <p className="text-gray-600">{solution.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{solution.stat}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Urgency Section */}
      <div className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold mb-6">🔥 Limited Time Offer - Act Now!</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Countdown */}
              <PremiumCard
                variant="default"
                className="bg-white/10 backdrop-blur-md border-white/20"
              >
                <div className="text-center">
                  <ClockIcon className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Next Batch Starts In:</h3>
                  <div className="text-3xl font-bold mb-2">{formatTime(urgencyTimer)}</div>
                  <p className="text-white/80">January 15th, 2025</p>
                </div>
              </PremiumCard>

              {/* Seats Left */}
              <PremiumCard
                variant="default"
                className="bg-white/10 backdrop-blur-md border-white/20"
              >
                <div className="text-center">
                  <UserGroupIcon className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Seats Remaining:</h3>
                  <div className="text-3xl font-bold mb-2">{liveStats.seatsLeft}/50</div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${liveStats.batchProgress}%` }}
                    />
                  </div>
                </div>
              </PremiumCard>
            </div>

            {/* Special Offers */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <GiftIcon className="w-8 h-8" />
                  <h3 className="text-xl font-bold">Early Bird Discount</h3>
                </div>
                <p className="text-lg">Enroll today and save ₹15,000 on course fees</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <HeartSolid className="w-8 h-8" />
                  <h3 className="text-xl font-bold">Free Tablet</h3>
                </div>
                <p className="text-lg">Study material tablet for first 50 enrollments</p>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              <PremiumButton
                onClick={onBookCounseling}
                variant="luxury"
                size="xl"
                className="bg-white text-red-600 hover:bg-gray-100"
              >
                <CalendarDaysIcon className="w-6 h-6 mr-3" />
                Book Free Counseling Now
              </PremiumButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Get answers to your concerns about repeating NEET
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <ChevronRightIcon
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      faq.isOpen ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {faq.isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold mb-6">Your Medical Dream is Still Alive</h2>
            <p className="text-xl mb-8">
              Don't let one failure define your future. Join thousands who converted failure into
              success.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <PremiumButton
                onClick={onBookCounseling}
                variant="luxury"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <CalendarDaysIcon className="w-5 h-5 mr-2" />
                Book Free Counseling
              </PremiumButton>

              <PremiumButton
                onClick={onDownloadStories}
                variant="secondary"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                Download Success Stories
              </PremiumButton>

              <PremiumButton
                onClick={() => window.open('/virtual-tour', '_blank')}
                variant="secondary"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <VideoCameraIcon className="w-5 h-5 mr-2" />
                Take Virtual Tour
              </PremiumButton>
            </div>

            <div className="flex justify-center space-x-6 mt-8 text-sm">
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="w-5 h-5" />
                <span>100% Money Back Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <HeartSolid className="w-5 h-5" />
                <span>Emotional Support Included</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrophySolid className="w-5 h-5" />
                <span>90% Success Rate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowExitIntent(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              <div className="text-center">
                <GiftIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Wait! Get 50% Off on Diagnostic Test
                </h3>
                <p className="text-gray-600 mb-6">
                  Don't leave empty-handed. Get our comprehensive diagnostic test at 50% off.
                </p>

                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                  <PremiumButton variant="medical" size="lg" className="w-full">
                    Claim 50% Discount
                  </PremiumButton>
                </div>

                <p className="text-sm text-gray-500 mt-3">
                  Limited time offer. Valid for 24 hours only.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Bottom Action Bar - Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 z-40">
        <div className="flex space-x-3">
          <PremiumButton onClick={onCallNow} variant="secondary" size="sm" className="flex-1">
            <PhoneIcon className="w-4 h-4 mr-2" />
            Call Now
          </PremiumButton>
          <PremiumButton onClick={onWhatsAppContact} variant="medical" size="sm" className="flex-1">
            <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
            WhatsApp
          </PremiumButton>
        </div>
      </div>

      {/* Mobile padding for fixed bottom bar */}
      <div className="h-16 md:hidden" />
    </div>
  )
}
