'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  Users,
  Target,
  Star,
  ArrowRight,
  Zap,
  Phone,
  MessageCircle,
  Gift,
  Shield,
  GraduationCap,
  Calendar,
  Clock,
  HelpCircle,
  Play,
  BookOpen,
  FileText,
  Video,
  Brain,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { MobilePhoneStickyBar } from '@/components/common/MobilePhoneStickyBar'

export default function NEETCrashCoursePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    currentLevel: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [seatsLeft, setSeatsLeft] = useState(12)

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const now = new Date()
    const batchStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10)

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
    window.location.href = '/demo-booking'
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmitSuccess(true)
    setIsSubmitting(false)
    setTimeout(() => {
      window.location.href = '/demo-booking'
    }, 2000)
  }

  const crashCourseFeatures = [
    {
      icon: BookOpen,
      title: 'Complete Syllabus',
      description: 'Full NEET Biology syllabus covered in 90 days',
    },
    {
      icon: Video,
      title: '200+ Live Classes',
      description: 'Daily 4-hour intensive live sessions',
    },
    {
      icon: FileText,
      title: '100+ Mock Tests',
      description: 'Chapter-wise + Full-length tests with analysis',
    },
    {
      icon: Brain,
      title: 'Quick Revision',
      description: 'Mnemonics, shortcuts, and memory techniques',
    },
    {
      icon: Target,
      title: 'Score Booster',
      description: 'Focus on high-weightage topics and PYQs',
    },
    {
      icon: Zap,
      title: 'Speed Training',
      description: 'Time management and quick solving techniques',
    },
  ]

  const weeklyPlan = [
    {
      week: 'Week 1-4',
      title: 'Foundation Revival',
      topics: [
        'Diversity in Living World',
        'Structural Organisation',
        'Cell Structure & Function',
        'Plant Physiology basics',
      ],
      hours: '4 hrs/day',
    },
    {
      week: 'Week 5-8',
      title: 'Core Concepts',
      topics: ['Human Physiology', 'Genetics & Evolution', 'Biotechnology', 'Ecology'],
      hours: '5 hrs/day',
    },
    {
      week: 'Week 9-10',
      title: 'PYQ Analysis',
      topics: ['Last 10 years papers', 'Pattern analysis', 'Common mistakes', 'Scoring strategy'],
      hours: '6 hrs/day',
    },
    {
      week: 'Week 11-12',
      title: 'Test & Revise',
      topics: ['Daily full tests', 'Quick revision notes', 'Doubt clearing', 'Final tips'],
      hours: '6 hrs/day',
    },
  ]

  const successStats = [
    { number: '90', label: 'Days', description: 'Intensive Program' },
    { number: '200+', label: 'Classes', description: 'Live Sessions' },
    { number: '100+', label: 'Tests', description: 'Mock & Practice' },
    { number: '50+', label: 'Marks', description: 'Avg. Improvement' },
  ]

  const crashFAQs = [
    {
      question: 'Who should join the NEET Crash Course?',
      answer:
        'Students who have completed their syllabus once and need intensive revision, or those who want to focus on Biology to boost their overall NEET score in the last few months.',
    },
    {
      question: 'What is the duration and schedule of the Crash Course?',
      answer:
        'The crash course is 3 months (90 days) with 4-6 hours of daily classes. We offer morning (6 AM - 10 AM) and evening (4 PM - 8 PM) batches.',
    },
    {
      question: 'Will the entire NEET Biology syllabus be covered?',
      answer:
        'Yes, the entire Class 11 and 12 NCERT Biology syllabus is covered with focus on high-weightage topics and most frequently asked questions.',
    },
    {
      question: 'How many mock tests are included?',
      answer:
        'The course includes 100+ tests - 50 chapter-wise tests, 30 subject tests, and 20 full-length NEET mock tests with detailed analysis.',
    },
    {
      question: 'What is the fee for the Crash Course?',
      answer:
        'The Crash Course fee is ₹35,000 - ₹50,000 depending on the batch type. EMI options available starting at ₹12,000/month.',
    },
    {
      question: 'Is there a refund policy?',
      answer:
        'Yes, we offer a 7-day money-back guarantee. If you are not satisfied with the teaching within the first week, you get a full refund.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Contact Buttons */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2 sm:gap-3">
        <button
          onClick={async () => {
            await trackAndOpenWhatsApp({
              source: 'crash-course-floating',
              message: 'Hi! I am interested in NEET Crash Course for quick revision.',
              campaign: 'neet-crash-course',
            })
          }}
          className="bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-lg transition-all hover:scale-110 cursor-pointer min-w-[48px] min-h-[48px]"
          aria-label="Chat on WhatsApp about NEET Crash Course"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
        </button>
        <a
          href="tel:+918826444334"
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 sm:p-4 rounded-full shadow-lg transition-all hover:scale-110 min-w-[48px] min-h-[48px] flex items-center justify-center"
          aria-label="Call us"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 to-red-600 text-white py-8 sm:py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 pt-6 sm:pt-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-300" />
                90-Day Intensive Program
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
                NEET <span className="text-yellow-300">Crash Course</span>
                <br />
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-orange-100">
                  Complete Biology Revision in 3 Months
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-orange-100 mb-6 sm:mb-8">
                Intensive revision program with 200+ live classes, 100+ mock tests, and daily
                practice. Perfect for final push before NEET 2026.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
                {successStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3"
                  >
                    <div className="text-lg sm:text-xl md:text-2xl font-bold">{stat.number}</div>
                    <div className="text-[10px] sm:text-xs text-orange-200">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                <div className="flex items-center bg-white/15 backdrop-blur-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-yellow-300" />
                  90 Days Only
                </div>
                <div className="flex items-center bg-white/15 backdrop-blur-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm">
                  <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-yellow-300" />
                  AIIMS Faculty
                </div>
                <div className="flex items-center bg-white/15 backdrop-blur-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-300" />
                  7-Day Guarantee
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="lg:hidden flex flex-col gap-2 sm:gap-3 mb-6 sm:mb-8">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleDemoBooking}
                  className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 w-full text-sm sm:text-base py-2.5 sm:py-3"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Book FREE Demo Class
                </Button>
              </div>
            </motion.div>

            {/* Lead Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-red-700 rounded-t-2xl sm:rounded-t-3xl px-4 py-2 sm:py-3 text-center">
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold">
                  <Calendar className="w-4 h-4" />
                  <span>Next Batch Starting Soon!</span>
                  <span className="bg-yellow-400 text-gray-900 px-2 py-0.5 rounded text-xs">
                    {seatsLeft} Seats Left
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-b-2xl sm:rounded-b-3xl p-4 sm:p-6 md:p-8 shadow-2xl">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-orange-100 text-orange-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                    <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
                    FREE Crash Course Kit Worth ₹2,999
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                    Enroll in Crash Course
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Register now and get quick revision notes free
                  </p>
                </div>

                {/* Countdown */}
                <div className="grid grid-cols-4 gap-2 mb-4 sm:mb-6">
                  {[
                    { value: countdown.days, label: 'Days' },
                    { value: countdown.hours, label: 'Hrs' },
                    { value: countdown.minutes, label: 'Min' },
                    { value: countdown.seconds, label: 'Sec' },
                  ].map((item) => (
                    <div key={item.label} className="bg-orange-50 rounded-lg p-2 text-center">
                      <div className="text-lg sm:text-xl font-bold text-orange-600">
                        {item.value}
                      </div>
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
                    <p className="text-gray-600 text-sm">Redirecting to book your demo class...</p>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-3 sm:space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-orange-500 focus:outline-none text-gray-900 text-sm sm:text-base"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-orange-500 focus:outline-none text-gray-900 text-sm sm:text-base"
                    />
                    <select
                      value={formData.currentLevel}
                      onChange={(e) => setFormData({ ...formData, currentLevel: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-orange-500 focus:outline-none text-gray-900 text-sm sm:text-base"
                    >
                      <option value="">Current Preparation Level</option>
                      <option value="beginner">Just Starting</option>
                      <option value="syllabus-done">Syllabus Once Done</option>
                      <option value="revision">Need Revision</option>
                      <option value="dropper">Dropper/Repeater</option>
                    </select>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 sm:py-4 text-sm sm:text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Processing...'
                      ) : (
                        <>
                          <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Join Crash Course Now
                        </>
                      )}
                    </Button>
                  </form>
                )}

                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-orange-600" />
                      <span>
                        <strong>5,000+</strong> students enrolled
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-yellow-500" />
                      <span>
                        <strong>4.8</strong> rating
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              What You Get in Crash Course
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Everything you need for final NEET Biology revision
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {crashCourseFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-orange-50 rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Plan */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              12-Week Intensive Plan
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Structured approach for maximum score improvement
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {weeklyPlan.map((phase, index) => (
              <motion.div
                key={phase.week}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border-l-4 border-orange-500"
              >
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div>
                    <span className="text-orange-600 font-semibold text-sm">{phase.week}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{phase.title}</h3>
                  </div>
                  <span className="bg-orange-100 text-orange-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {phase.hours}
                  </span>
                </div>
                <div className="space-y-2">
                  {phase.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 sm:py-16 md:py-20 bg-orange-50">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
            Crash Course Investment
          </h2>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  3-Month Crash Course
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                    <span className="text-sm sm:text-base">200+ Live Classes</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                    <span className="text-sm sm:text-base">100+ Mock Tests with Analysis</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                    <span className="text-sm sm:text-base">Quick Revision Notes</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                    <span className="text-sm sm:text-base">Daily Doubt Sessions</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                    <span className="text-sm sm:text-base font-semibold text-green-700">
                      7-Day Money-Back Guarantee
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-100 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="text-sm text-gray-600 mb-1">Course Fee</div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                  ₹35,000 - ₹50,000
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mb-4">
                  EMI from <span className="font-semibold">₹12,000/month</span>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-sm sm:text-base"
                  onClick={handleDemoBooking}
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Crash Course FAQ
            </h2>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {crashFAQs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6"
              >
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 flex items-start">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-orange-600 flex-shrink-0 mt-0.5" />
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

      {/* Final CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              90 Days to NEET Success
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 opacity-90">
              Don&apos;t let time constraints stop you. Join the Crash Course and maximize your NEET
              Biology score.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 text-sm sm:text-base py-3 sm:py-4"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Book FREE Demo
              </Button>

              <a href="tel:+918826444334" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-orange-600 w-full text-sm sm:text-base py-3 sm:py-4"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Call: +91 88264 44334
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Sticky Bar */}
      <MobilePhoneStickyBar source="crash-course" />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: crashFAQs.map((faq) => ({
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
