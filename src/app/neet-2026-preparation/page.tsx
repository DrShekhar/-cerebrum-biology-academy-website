'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Target,
  TrendingUp,
  Award,
  Clock,
  Users,
  CheckCircle,
  Star,
  Play,
  Calendar,
  Brain,
  Zap,
  Trophy,
  ArrowRight,
  FileText,
  Video,
  HelpCircle,
  Download,
  Phone,
  MessageCircle,
  Gift,
  Shield,
  Sparkles,
  GraduationCap,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NEETToppersShowcase } from '@/components/layout/NEETToppersShowcase'
import { ParentTestimonialsSection } from '@/components/layout/ParentTestimonialsSection'
import Link from 'next/link'

export default function NEET2026PreparationPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    studentClass: '12',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_neet2026', {
        event_category: 'conversion',
        event_label: 'neet_2026_landing_page',
        value: 1,
      })
    }
    window.location.href = '/demo-booking'
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'lead_form_submit', {
        event_category: 'conversion',
        event_label: 'neet_2026_lead_form',
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

  const neet2026Highlights = [
    {
      title: 'Updated Syllabus Coverage',
      description: 'Complete NEET 2026 syllabus with latest NTA patterns and NCERT-based approach',
      icon: BookOpen,
      color: 'bg-red-500',
    },
    {
      title: 'AI-Powered Learning',
      description: 'Personalized study plans and adaptive mock tests for targeted preparation',
      icon: Brain,
      color: 'bg-blue-500',
    },
    {
      title: '500+ NEET Selections',
      description: '98% success rate with 500+ students in top medical colleges yearly',
      icon: Trophy,
      color: 'bg-amber-500',
    },
    {
      title: 'AIIMS Faculty',
      description: 'Learn from ex-AIIMS doctors and NEET biology experts with 15+ years experience',
      icon: Award,
      color: 'bg-green-500',
    },
  ]

  const neet2026Timeline = [
    { event: 'Start Early Preparation', date: 'Now - Dec 2025', status: 'active' },
    { event: 'Complete Syllabus', date: 'Jan - Jun 2026', status: 'upcoming' },
    { event: 'NEET 2026 Registration', date: 'Expected Feb 2026', status: 'upcoming' },
    { event: 'Revision & Mock Tests', date: 'Mar - Apr 2026', status: 'upcoming' },
    { event: 'NEET 2026 Exam Date', date: 'Expected May 2026', status: 'exam' },
    { event: 'Result & Counselling', date: 'Jun - Jul 2026', status: 'upcoming' },
  ]

  const neet2026Batches = [
    {
      name: 'Crash Course',
      target: 'NEET 2026',
      duration: '3-4 Months',
      features: [
        'Rapid syllabus revision',
        'High-yield topic focus',
        'Intensive mock tests',
      ],
      price: '₹45,000',
      color: 'bg-red-500',
      description:
        'Fast-track intensive program for last-minute NEET preparation. Covers complete syllabus with focus on most important topics and exam strategies.',
    },
    {
      name: 'Test Series Course',
      target: 'NEET 2026',
      duration: '6 Months',
      features: [
        '100+ chapter-wise tests',
        'Full-length mock exams',
        'Detailed performance analysis',
      ],
      price: '₹12,000',
      color: 'bg-blue-500',
      description:
        'Comprehensive test practice program with NTA-pattern mock tests, detailed solutions, and AI-powered performance analytics to identify strengths and weaknesses.',
    },
    {
      name: 'Dropper Course',
      target: 'NEET 2026',
      duration: '10-12 Months',
      features: [
        'Complete syllabus from scratch',
        'Personalized weakness analysis',
        'One-on-one mentoring',
      ],
      price: '₹70,000-₹1,56,000',
      color: 'bg-amber-500',
      popular: true,
      description:
        'Comprehensive year-long program designed for repeaters. Rebuild concepts from foundation with expert guidance, intensive practice, and dedicated mentor support.',
    },
    {
      name: 'Test & Discussion Course',
      target: 'NEET 2026',
      duration: '6-8 Months',
      features: [
        'Weekly tests with live discussion',
        'Doubt clearing sessions',
        'Expert faculty guidance',
      ],
      price: '₹26,000',
      color: 'bg-green-500',
      description:
        'Perfect blend of practice and learning. Regular tests followed by detailed discussion sessions with faculty to clear doubts and strengthen concepts.',
    },
  ]

  const neet2026FAQs = [
    {
      question: 'When is NEET 2026 exam date?',
      answer:
        'NEET 2026 is expected to be conducted in May 2026 (tentatively first Sunday of May). NTA will release the official notification around December 2025 or January 2026.',
    },
    {
      question: 'What is the syllabus for NEET 2026?',
      answer:
        'NEET 2026 syllabus covers Physics, Chemistry, and Biology from Class 11 and 12 NCERT. Biology has 90 questions (360 marks) - highest weightage. The syllabus is expected to remain based on NCERT.',
    },
    {
      question: 'How to prepare for NEET 2026 Biology?',
      answer:
        'Focus on NCERT thoroughly, practice MCQs daily, take mock tests regularly, master diagrams, and understand concepts rather than rote learning. Start early with Class 11 concepts for strong foundation.',
    },
    {
      question: 'Is online coaching effective for NEET 2026?',
      answer:
        'Yes! Online coaching offers flexibility, recorded lectures for revision, AI-powered doubt solving, and personalized learning paths. Our hybrid model combines best of both online and offline learning.',
    },
    {
      question: 'What is the expected cut-off for NEET 2026?',
      answer:
        'Based on trends, General category may need 620+ for top government medical colleges. Our students typically score 600-680+ with dedicated preparation and our structured approach.',
    },
    {
      question: 'When should I start preparing for NEET 2026?',
      answer:
        'The best time to start is NOW! Starting early in Class 11 gives you 2 full years for comprehensive preparation. Even if you are in Class 12, starting immediately gives you 5-6 months of focused study.',
    },
  ]

  const successMetrics = [
    { label: '98%', sublabel: 'Success Rate', icon: Trophy },
    { label: '500+', sublabel: 'Selections Yearly', icon: Users },
    { label: '650+', sublabel: 'Avg Top Score', icon: Star },
    { label: '15+', sublabel: 'Years Experience', icon: Award },
  ]

  return (
    <div className="min-h-screen">
      {/* Floating Contact Buttons */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2 sm:gap-3">
        <a
          href="https://wa.me/918826444334?text=Hi, I'm interested in NEET 2026 preparation"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-lg transition-all hover:scale-110"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </a>
        <a
          href="tel:+918826444334"
          className="bg-[#3d4d3d] hover:bg-[#4a5d4a] text-white p-3 sm:p-4 rounded-full shadow-lg transition-all hover:scale-110"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
        </a>
      </div>

      {/* Hero Section */}
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
                <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400" />
                #1 NEET Biology Coaching for 2026
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
                NEET 2026 <span className="text-yellow-400">Preparation</span>
                <br />
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#e8ede8]">
                  Your Medical Dream Starts Here
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#e8ede8] mb-6 sm:mb-8">
                Join India's top NEET Biology coaching with 98% success rate. Expert AIIMS faculty,
                AI-powered learning, and proven results.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
                {successMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3"
                  >
                    <metric.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-yellow-400" />
                    <div className="text-lg sm:text-xl md:text-2xl font-bold">{metric.label}</div>
                    <div className="text-[10px] sm:text-xs text-[#e8ede8]">{metric.sublabel}</div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-400" />
                  100% Refund
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm">
                  <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-yellow-400" />
                  AIIMS Faculty
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-orange-400" />
                  15+ Yrs Exp
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
              {/* Lead Collection Form */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-green-100 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                    <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
                    FREE Material Worth ₹2,999
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                    Get Your Free NEET 2026 Study Kit
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Register now for free demo class + study material
                  </p>
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
                    <div>
                      <input
                        type="text"
                        placeholder="Student Name *"
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
                        value={formData.studentClass}
                        onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-[#4a5d4a] focus:outline-none focus:ring-2 focus:ring-[#4a5d4a]/20 text-gray-900 text-sm sm:text-base"
                      >
                        <option value="11">Class 11 (NEET 2027)</option>
                        <option value="12">Class 12 (NEET 2026)</option>
                        <option value="dropper">Dropper (NEET 2026)</option>
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
                          <Gift className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Get Free Study Kit + Demo
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
                        <strong>2,500+</strong> enrolled
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

      {/* Why Choose Us Section */}
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
              Why Choose Cerebrum for NEET 2026?
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              India's most trusted NEET Biology coaching with proven track record of 500+ medical
              selections annually.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {neet2026Highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 md:p-6 hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r ${highlight.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4`}
                >
                  <highlight.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEET 2026 Batches */}
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
              NEET 2026 Course Options
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the right batch based on your current class and preparation level.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {neet2026Batches.map((batch, index) => (
              <motion.div
                key={batch.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 border-2 ${
                  batch.popular ? 'border-[#4a5d4a]' : 'border-gray-100'
                } hover:shadow-xl transition-shadow`}
              >
                {batch.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4a5d4a] text-white px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap">
                    MOST POPULAR
                  </div>
                )}

                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${batch.color} rounded-lg flex items-center justify-center mb-3 sm:mb-4`}
                >
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{batch.name}</h3>
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
                  <span className="bg-[#e8ede8] text-[#3d4d3d] text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded">
                    {batch.target}
                  </span>
                  <span className="bg-gray-100 text-gray-700 text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded">
                    {batch.duration}
                  </span>
                </div>

                {'description' in batch && (
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">
                    {batch.description}
                  </p>
                )}

                <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  {batch.features.map((feature) => (
                    <li key={feature} className="flex items-start text-xs sm:text-sm text-gray-600">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {batch.price}
                </div>

                <Button
                  variant={batch.popular ? 'primary' : 'outline'}
                  size="sm"
                  className={`w-full text-xs sm:text-sm ${batch.popular ? 'bg-[#3d4d3d] hover:bg-[#4a5d4a]' : ''}`}
                  onClick={handleDemoBooking}
                >
                  Enroll Now
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Schema */}
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
              NEET 2026 FAQs
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
              Common questions about NEET 2026 preparation answered by experts
            </p>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {neet2026FAQs.map((faq, index) => (
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

      {/* NEET Toppers */}
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
              Start Your NEET 2026 Journey Today
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90">
              Join 500+ students who crack NEET every year with Cerebrum Biology Academy. Expert
              faculty, proven methodology, and personalized attention await you.
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
              New batch for NEET 2026 starting soon. Limited seats available!
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
            mainEntity: neet2026FAQs.map((faq) => ({
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
