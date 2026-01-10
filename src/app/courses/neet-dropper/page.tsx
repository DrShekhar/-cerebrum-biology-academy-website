'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  Clock,
  Users,
  Award,
  BookOpen,
  Target,
  Star,
  ArrowRight,
  Trophy,
  Zap,
  Brain,
  Phone,
  MessageCircle,
  Gift,
  Shield,
  GraduationCap,
  Calendar,
  TrendingUp,
  HelpCircle,
  Play,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NEETToppersShowcase } from '@/components/layout/NEETToppersShowcase'
import { ParentTestimonialsSection } from '@/components/layout/ParentTestimonialsSection'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'

export default function NEETDropperPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    previousScore: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [seatsLeft, setSeatsLeft] = useState(18)

  // Countdown timer for batch start
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set batch start date (e.g., 15th of next month)
    const now = new Date()
    const batchStart = new Date(now.getFullYear(), now.getMonth() + 1, 15)

    const timer = setInterval(() => {
      const difference = batchStart.getTime() - new Date().getTime()

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_dropper', {
        event_category: 'conversion',
        event_label: 'neet_dropper_page',
        value: 1,
      })
    }
    window.location.href = '/demo-booking'
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'lead_form_submit_dropper', {
        event_category: 'conversion',
        event_label: 'neet_dropper_lead_form',
        value: 1,
      })
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmitSuccess(true)
    setIsSubmitting(false)

    setTimeout(() => {
      window.location.href = '/demo-booking'
    }, 2000)
  }

  const courseFeatures = [
    'Complete NEET Biology syllabus in 10 months',
    'Intensive rank improvement strategies',
    'Previous years analysis and pattern study',
    'Daily 6-hour focused study schedule',
    'Weekly full-length mock tests',
    'Personal rank improvement tracking',
    'Dedicated counseling and motivation',
    'Crash course revision in final months',
  ]

  const phasePlan = [
    {
      phase: 'Phase 1: Foundation',
      duration: 'Month 1-3',
      focus: 'Complete syllabus coverage with strong foundation building',
      topics: ['NCERT thorough revision', 'Concept clarity', 'Basic problem solving'],
      color: 'green',
    },
    {
      phase: 'Phase 2: Advanced',
      duration: 'Month 4-7',
      focus: 'Advanced concepts and extensive practice',
      topics: ['Previous year questions', 'Advanced problem solving', 'Speed enhancement'],
      color: 'teal',
    },
    {
      phase: 'Phase 3: Mastery',
      duration: 'Month 8-10',
      focus: 'Mock tests, revision, and exam strategy',
      topics: ['Full-length tests', 'Weak area improvement', 'Time management'],
      color: 'blue',
    },
    {
      phase: 'Phase 4: Final',
      duration: 'Month 11-12',
      focus: 'Final revision and exam preparation',
      topics: ['Crash course', 'Last minute tips', 'Confidence building'],
      color: 'indigo',
    },
  ]

  const successStats = [
    { number: '89%', label: 'Rank Improvement', description: 'Significant rank boost', icon: TrendingUp },
    { number: '350+', label: 'Avg Biology Score', description: 'Target achievement', icon: Target },
    { number: '1500+', label: 'Droppers Coached', description: 'Successful transformations', icon: Users },
    { number: '95%', label: 'Target Achievement', description: 'Desired rank/college', icon: Trophy },
  ]

  const uniqueFeatures = [
    {
      icon: Brain,
      title: 'Psychology Support',
      description: 'Dedicated counseling to handle dropper year stress and maintain motivation',
      color: 'bg-[#3d4d3d]',
    },
    {
      icon: Target,
      title: 'Rank Prediction',
      description: 'AI-powered rank prediction and improvement tracking throughout the year',
      color: 'bg-[#4a5d4a]',
    },
    {
      icon: Zap,
      title: 'Speed Training',
      description: 'Specialized speed enhancement sessions for Biology section completion',
      color: 'bg-[#5a6d5a]',
    },
    {
      icon: Trophy,
      title: 'Success Guarantee',
      description: 'Structured approach with measurable milestones and guaranteed improvement',
      color: 'bg-[#3d4d3d]',
    },
  ]

  const dropperFAQs = [
    {
      question: 'Is there a separate batch only for dropper students?',
      answer:
        'Yes, we have dedicated dropper-only batches. This creates the right environment where all students have similar goals and motivation levels, leading to better peer learning and support.',
    },
    {
      question: 'How do you handle the psychological pressure of dropper year?',
      answer:
        'We provide dedicated counseling sessions, motivation workshops, and stress management techniques. Our faculty is specially trained to handle dropper student psychology and maintain high motivation levels.',
    },
    {
      question: 'What is the average rank improvement for your dropper students?',
      answer:
        'Our dropper students typically see 50,000-100,000 rank improvement. Many who scored 400+ in first attempt achieve 550+ scores and secure government medical colleges in their second attempt.',
    },
    {
      question: 'Do you provide personalized study plans for dropper students?',
      answer:
        'Absolutely! Each dropper student gets a personalized study plan based on their previous attempt analysis, weak areas identification, and target rank/college preferences.',
    },
    {
      question: 'What is the fee structure for the Dropper Course?',
      answer:
        'The Dropper Course fee ranges from ₹70,000 to ₹1,56,000 depending on the batch type and facilities chosen. We offer flexible EMI options starting at ₹5,833/month and scholarships up to 25% based on previous NEET score.',
    },
    {
      question: 'Is there a money-back guarantee?',
      answer:
        'Yes, we offer a 30-day money-back guarantee. If you are not satisfied with our teaching methodology within the first 30 days, you can get a full refund.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Contact Buttons */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2 sm:gap-3">
        <button
          onClick={async () => {
            await trackAndOpenWhatsApp({
              source: 'dropper-floating',
              message: WHATSAPP_MESSAGES.courseEnquiry,
              campaign: 'neet-dropper-course',
            })
          }}
          className="bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-lg transition-all hover:scale-110 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <a
          href="tel:+918826444334"
          className="bg-[#3d4d3d] hover:bg-[#4a5d4a] text-white p-3 sm:p-4 rounded-full shadow-lg transition-all hover:scale-110"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
        </a>
      </div>

      {/* Hero Section with Lead Form */}
      <section className="relative bg-[#3d4d3d] text-white py-8 sm:py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3d4d3d] to-[#2d3d2d]" />

        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 pt-6 sm:pt-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400" />
                #1 NEET Dropper Course for 2026
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
                NEET 2026 <span className="text-yellow-400">Dropper Course</span>
                <br />
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#e8ede8]">
                  Turn Your Second Chance Into Success
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#e8ede8] mb-6 sm:mb-8">
                Intensive 10-12 month program designed specifically for NEET droppers with proven
                rank improvement strategies, psychology support, and personalized mentoring.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
                {successStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3"
                  >
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-yellow-400" />
                    <div className="text-lg sm:text-xl md:text-2xl font-bold">{stat.number}</div>
                    <div className="text-[10px] sm:text-xs text-[#e8ede8]">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-400" />
                  30-Day Money Back
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm">
                  <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-yellow-400" />
                  AIIMS Faculty
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-orange-400" />
                  89% Rank Improvement
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="lg:hidden flex flex-col gap-2 sm:gap-3 mb-6 sm:mb-8">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 w-full text-sm sm:text-base py-2.5 sm:py-3"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Book FREE Demo Class
                </Button>
                <a href="tel:+918826444334" className="w-full">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-[#3d4d3d] w-full text-sm sm:text-base py-2.5 sm:py-3"
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Call: +91 88264 44334
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Urgency Banner */}
              <div className="bg-yellow-500 text-black rounded-t-2xl sm:rounded-t-3xl px-4 py-2 sm:py-3 text-center">
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold">
                  <Calendar className="w-4 h-4" />
                  <span>New Batch Starting Soon!</span>
                  <span className="bg-black text-yellow-500 px-2 py-0.5 rounded text-xs">
                    Only {seatsLeft} Seats Left
                  </span>
                </div>
              </div>

              {/* Lead Collection Form */}
              <div className="bg-white rounded-b-2xl sm:rounded-b-3xl p-4 sm:p-6 md:p-8 shadow-2xl">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-green-100 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                    <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
                    FREE Dropper Success Kit Worth ₹4,999
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                    Get Your Personalized Study Plan
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Register for free counseling + previous year analysis
                  </p>
                </div>

                {/* Countdown Timer */}
                <div className="grid grid-cols-4 gap-2 mb-4 sm:mb-6">
                  {[
                    { value: countdown.days, label: 'Days' },
                    { value: countdown.hours, label: 'Hours' },
                    { value: countdown.minutes, label: 'Mins' },
                    { value: countdown.seconds, label: 'Secs' },
                  ].map((item) => (
                    <div key={item.label} className="bg-[#e8ede8] rounded-lg p-2 text-center">
                      <div className="text-lg sm:text-xl font-bold text-[#3d4d3d]">{item.value}</div>
                      <div className="text-[10px] sm:text-xs text-gray-600">{item.label}</div>
                    </div>
                  ))}
                </div>

                {submitSuccess ? (
                  <div className="text-center py-6 sm:py-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Thank You!</h4>
                    <p className="text-gray-600 text-sm">Redirecting to book your counseling session...</p>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-3 sm:space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name *"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#4a5d4a] focus:outline-none focus:ring-2 focus:ring-[#4a5d4a]/20 text-gray-900 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#4a5d4a] focus:outline-none focus:ring-2 focus:ring-[#4a5d4a]/20 text-gray-900 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#4a5d4a] focus:outline-none focus:ring-2 focus:ring-[#4a5d4a]/20 text-gray-900 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <select
                        value={formData.previousScore}
                        onChange={(e) => setFormData({ ...formData, previousScore: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#4a5d4a] focus:outline-none focus:ring-2 focus:ring-[#4a5d4a]/20 text-gray-900 text-sm sm:text-base"
                      >
                        <option value="">Previous NEET Score (Optional)</option>
                        <option value="below-300">Below 300</option>
                        <option value="300-400">300 - 400</option>
                        <option value="400-500">400 - 500</option>
                        <option value="500-550">500 - 550</option>
                        <option value="above-550">Above 550</option>
                        <option value="first-attempt">First Attempt</option>
                      </select>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full bg-[#3d4d3d] hover:bg-[#4a5d4a] text-white py-3 sm:py-4 text-sm sm:text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <>
                          <Gift className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                          <span className="hidden sm:inline">Get Free Counseling + Study Kit</span>
                          <span className="sm:hidden">Free Counseling</span>
                        </>
                      )}
                    </Button>

                    <p className="text-center text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-3">
                      By registering, you agree to receive updates via WhatsApp & SMS
                    </p>
                  </form>
                )}

                {/* Social Proof */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-[#3d4d3d]" />
                      <span>
                        <strong>1,500+</strong> droppers coached
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-yellow-500" />
                      <span>
                        <strong>4.9</strong> rating
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Droppers Choose Us */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
              Why Droppers Choose Cerebrum?
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized features designed specifically for dropper students' unique needs and challenges
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {uniqueFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 md:p-6 hover:shadow-xl transition-shadow text-center"
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 ${feature.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4 mx-auto`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Phase-wise Plan */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
              Strategic 4-Phase Preparation Plan
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
              Scientifically designed phases for maximum rank improvement
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {phasePlan.map((phase, index) => {
              const colorClasses: Record<string, string> = {
                green: 'border-[#3d4d3d] bg-[#e8ede8]',
                teal: 'border-teal-600 bg-teal-50',
                blue: 'border-blue-600 bg-blue-50',
                indigo: 'border-indigo-600 bg-indigo-50',
              }

              const textClasses: Record<string, string> = {
                green: 'text-[#3d4d3d]',
                teal: 'text-teal-800',
                blue: 'text-blue-800',
                indigo: 'text-indigo-800',
              }

              const checkClasses: Record<string, string> = {
                green: 'text-[#3d4d3d]',
                teal: 'text-teal-600',
                blue: 'text-blue-600',
                indigo: 'text-indigo-600',
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`rounded-xl p-4 sm:p-6 shadow-lg border-l-4 ${colorClasses[phase.color]}`}
                >
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">{phase.phase}</h3>
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${textClasses[phase.color]} bg-white`}
                    >
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium mb-3 sm:mb-4 text-sm sm:text-base">{phase.focus}</p>
                  <div className="space-y-1.5 sm:space-y-2">
                    {phase.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center">
                        <CheckCircle className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 ${checkClasses[phase.color]}`} />
                        <span className="text-gray-700 text-xs sm:text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
              Complete Dropper Course Features
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {courseFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#3d4d3d] mb-2 sm:mb-4" />
                <p className="text-gray-700 font-medium text-xs sm:text-sm">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#e8ede8]">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
              Transform Your NEET Journey
            </h2>

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    NEET 2026 Dropper Course
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span className="text-sm sm:text-base">10-12 months comprehensive program</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span className="text-sm sm:text-base">Exclusive dropper batch environment</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span className="text-sm sm:text-base">Psychology support & counseling</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span className="text-sm sm:text-base">Rank improvement guarantee</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm sm:text-base font-semibold text-green-700">30-Day Money-Back Guarantee</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#e8ede8] rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="text-sm text-gray-600 mb-1">Course Fee</div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3d4d3d] mb-2">
                    ₹70,000 - ₹1,56,000
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mb-4">
                    EMI available from <span className="font-semibold">₹5,833/month</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                      Up to 25% Scholarship
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                      Flexible EMI
                    </span>
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full bg-[#3d4d3d] hover:bg-[#4a5d4a] text-sm sm:text-base"
                    onClick={handleDemoBooking}
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Enroll Now
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 sm:p-6">
              <p className="text-yellow-800 font-semibold mb-2 text-sm sm:text-base">
                🔥 Dropper Special Offer - Limited Time!
              </p>
              <p className="text-yellow-700 text-xs sm:text-sm">
                Join before the batch starts and get additional 100 hours of personal mentoring +
                Psychology counseling sessions FREE!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
              Dropper Students FAQ
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
              Common questions about NEET dropper preparation answered by experts
            </p>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {dropperFAQs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-5 md:p-6"
              >
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3 flex items-start">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-[#3d4d3d] flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base ml-7 sm:ml-9">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEET Toppers Showcase */}
      <NEETToppersShowcase maxToppers={6} showVideos={true} />

      {/* Parent Testimonials */}
      <ParentTestimonialsSection />

      {/* Final CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#3d4d3d] text-white">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">
              Your Second Chance Deserves the Best
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90">
              Join 1,500+ droppers who transformed their NEET journey with Cerebrum Biology Academy.
              Expert faculty, proven methodology, and personalized attention await you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-yellow-500 text-black hover:bg-yellow-400 text-sm sm:text-base py-3 sm:py-4"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Book FREE Demo Class
              </Button>

              <a href="tel:+918826444334" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-[#3d4d3d] w-full text-sm sm:text-base py-3 sm:py-4"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Call: +91 88264 44334
                </Button>
              </a>
            </div>

            <p className="text-xs sm:text-sm opacity-80">
              New dropper batch starting soon. Only {seatsLeft} seats left!
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: dropperFAQs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  )
}
