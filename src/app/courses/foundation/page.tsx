'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
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
  Brain,
  Lightbulb,
  Phone,
  MessageCircle,
  Gift,
  Calculator,
  FileText,
  Play,
  Sparkles,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Laptop,
} from 'lucide-react'
import { NEETToppersShowcase } from '@/components/layout/NEETToppersShowcase'
import { ParentTestimonialsSection } from '@/components/layout/ParentTestimonialsSection'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'

export default function FoundationCoursePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    studentClass: '9',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [seatsLeft, setSeatsLeft] = useState(12)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const now = new Date()
    const batchStart = new Date(now.getFullYear(), now.getMonth() + 1, 1)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'foundation_lead_submit', {
          event_category: 'Lead',
          event_label: 'Foundation Course Lead',
        })
      }
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitSuccess(true)
      setSeatsLeft((prev) => Math.max(prev - 1, 5))
    } finally {
      setIsSubmitting(false)
    }
  }

  const courseFeatures = [
    'NCERT-based conceptual learning',
    'Introduction to NEET-style questions',
    'Fun and interactive Biology sessions',
    'Regular assessments and feedback',
    'Study skills and learning techniques',
    'Medical career guidance and awareness',
    'Strong foundation for future NEET prep',
    'Age-appropriate teaching methodology',
  ]

  const freeTools = [
    {
      icon: Calculator,
      title: 'NEET Predictor',
      description: 'Check your potential NEET score based on current performance',
      link: '/neet-college-predictor',
      color: 'from-[#4a5d4a] to-[#3d4d3d]',
    },
    {
      icon: FileText,
      title: 'Free Study Plan',
      description: 'Get a personalized study plan for Class 9-10 Biology',
      link: '/neet-2026-preparation',
      color: 'from-[#5a6d5a] to-[#4a5d4a]',
    },
    {
      icon: Play,
      title: 'Free Demo Class',
      description: 'Experience our teaching methodology with a free trial',
      link: '/demo-booking',
      color: 'from-[#4a5d4a] to-[#5a6d5a]',
    },
    {
      icon: BookOpen,
      title: 'Biology Quiz',
      description: 'Test your Class 9-10 Biology knowledge with fun quizzes',
      link: '/free-biology-quiz',
      color: 'from-[#3d4d3d] to-[#4a5d4a]',
    },
  ]

  const curriculum = [
    {
      title: 'Class 9 Biology Focus',
      topics: [
        'Life Processes',
        'Control & Coordination',
        'Heredity & Evolution',
        'Environment & Natural Resources',
      ],
      duration: '6 months',
      focus: 'Conceptual Building',
    },
    {
      title: 'Class 10 Biology Focus',
      topics: [
        'Life Processes Advanced',
        'Reproduction',
        'Heredity Basics',
        'Environment Management',
      ],
      duration: '6 months',
      focus: 'NEET Foundation',
    },
    {
      title: 'Medical Awareness Program',
      topics: ['Career in Medicine', 'NEET Introduction', 'Study Planning', 'Goal Setting'],
      duration: 'Throughout',
      focus: 'Career Guidance',
    },
    {
      title: 'Skill Development',
      topics: ['Scientific Thinking', 'Problem Solving', 'Memory Techniques', 'Time Management'],
      duration: 'Continuous',
      focus: 'Life Skills',
    },
  ]

  const successStats = [
    { number: '92%', label: 'Board Exam Success', description: 'Students scoring 85+ marks' },
    { number: '88%', label: 'Concept Clarity', description: 'Strong foundation building' },
    { number: '78%', label: 'NEET Transition', description: 'Students joining NEET prep' },
    { number: '1200+', label: 'Students Coached', description: 'Foundation program' },
  ]

  const uniqueFeatures = [
    {
      icon: Brain,
      title: 'Age-Appropriate Learning',
      description: 'Teaching methodology designed specifically for young minds (ages 13-16)',
    },
    {
      icon: Lightbulb,
      title: 'Concept Visualization',
      description:
        'Interactive models, animations, and practical demonstrations for better understanding',
    },
    {
      icon: Target,
      title: 'Early Goal Setting',
      description: 'Introduction to medical career paths and NEET awareness from early age',
    },
    {
      icon: Trophy,
      title: 'Foundation Excellence',
      description: 'Strong base preparation that makes future NEET coaching highly effective',
    },
  ]

  const ageGroups = [
    {
      age: '13-14 Years',
      class: 'Class 9',
      focus: 'Basic Biology concepts with fun learning',
      features: [
        'Story-based learning',
        'Visual demonstrations',
        'Basic terminology',
        'Board exam focus',
      ],
    },
    {
      age: '15-16 Years',
      class: 'Class 10',
      focus: 'Advanced concepts with NEET introduction',
      features: [
        'Advanced problem solving',
        'NEET-style questions',
        'Medical career awareness',
        'Study techniques',
      ],
    },
  ]

  const foundationFAQs = [
    {
      question: 'Is Class 9-10 too early to start NEET Biology preparation?',
      answer:
        'Not at all! Foundation courses focus on building strong Biology concepts rather than intensive preparation. Early exposure to NCERT Biology concepts gives students a significant advantage when they start formal NEET coaching in Class 11 and 12. Students who start early with online Biology tuition typically score 50-100 marks higher in NEET.',
    },
    {
      question: 'How is your online Biology tuition different from regular school?',
      answer:
        'Our online Biology classes go deeper into NCERT concepts with visual learning, practical demonstrations, and introduce medical terminology early. Our expert Biology tutors provide NEET-oriented teaching for Class 11 and 12 preparation along with study skills and time management techniques.',
    },
    {
      question: 'Do you offer online Biology coaching for Class 11 and 12?',
      answer:
        'Yes! Cerebrum Biology Academy provides comprehensive online Biology tuition for Class 9, 10, 11 and 12 students. Our NEET Biology coaching covers complete NCERT syllabus with chapter-wise weightage analysis, Human Physiology, Genetics, Plant Physiology and all high-weightage NEET topics.',
    },
    {
      question: 'Will this program help in CBSE Board exams and NEET?',
      answer:
        'Absolutely! Our online Biology classes ensure excellent board exam performance while building concepts for NEET entrance preparation. Students typically score 85+ in board Biology and develop strong foundation for NEET 2026 preparation.',
    },
    {
      question: 'What is the schedule for online Biology classes?',
      answer:
        'Our live online Biology tuition classes are scheduled after school hours, typically 3-4 hours per week with weekend doubt clearing sessions. The online format ensures students from anywhere in India can join our expert Biology tutor sessions.',
    },
    {
      question: 'What is the fee for online Biology tuition for NEET?',
      answer:
        'Our online Biology coaching is priced at ₹36,000 - ₹90,000 per year depending on the batch type (Class 9-10 Foundation or Class 11-12 NEET). We offer flexible payment options and scholarships for meritorious students.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#f5f8f5]">
      {/* Floating Contact Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <motion.a
          href="tel:+918826444334"
          className="bg-[#4a5d4a] text-white p-4 rounded-full shadow-lg hover:bg-[#3d4d3d] transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Call Now"
        >
          <Phone className="w-6 h-6" />
        </motion.a>
        <motion.button
          onClick={async () => {
            await trackAndOpenWhatsApp({
              source: 'foundation-floating',
              message: WHATSAPP_MESSAGES.courseEnquiry,
              campaign: 'foundation-course',
            })
          }}
          className="bg-[#166534] text-white p-4 rounded-full shadow-lg hover:bg-[#14532d] transition-colors cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Hero Section with Lead Form */}
      <section className="relative bg-gradient-to-br from-[#e8ede8] to-[#d5ddd5] py-8 sm:py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#4a5d4a] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#3d4d3d] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Urgency Banner */}
          <motion.div
            className="bg-[#4a5d4a] text-white rounded-xl p-3 sm:p-4 mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base">
              <span className="font-semibold flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                New Batch Starting Soon!
              </span>
              <div className="flex gap-2 font-mono">
                <span className="bg-white/20 px-2 py-1 rounded">{countdown.days}d</span>
                <span className="bg-white/20 px-2 py-1 rounded">{countdown.hours}h</span>
                <span className="bg-white/20 px-2 py-1 rounded">{countdown.minutes}m</span>
                <span className="bg-white/20 px-2 py-1 rounded">{countdown.seconds}s</span>
              </div>
              <span className="text-[#e8ede8] font-medium">Only {seatsLeft} Seats Left!</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center bg-[#4a5d4a] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                <GraduationCap className="w-4 h-4 mr-2" />
                For Class 9 & 10 Students
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#3d4d3d] mb-4 sm:mb-6 leading-tight">
                Online Biology Tuition &amp; Classes for
                <span className="text-[#4a5d4a]"> Future Doctors</span>
              </h1>

              <p className="text-base sm:text-lg text-[#5a6d5a] mb-6">
                Best Online Biology Tutor for Class 9, 10, 11 &amp; 12 students preparing for NEET!
                Build a strong Biology foundation with AIIMS-trained faculty. Expert online Biology
                classes with NCERT-based curriculum. 92% of our foundation students score 85+ in
                board exams.
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center shadow-sm">
                  <div className="text-xl sm:text-2xl font-bold text-[#4a5d4a]">1200+</div>
                  <div className="text-xs text-[#5a6d5a]">Students Trained</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center shadow-sm">
                  <div className="text-xl sm:text-2xl font-bold text-[#4a5d4a]">92%</div>
                  <div className="text-xs text-[#5a6d5a]">Board Success</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center shadow-sm">
                  <div className="text-xl sm:text-2xl font-bold text-[#4a5d4a]">20+</div>
                  <div className="text-xs text-[#5a6d5a]">Years Experience</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center shadow-sm">
                  <div className="text-xl sm:text-2xl font-bold text-[#4a5d4a]">15</div>
                  <div className="text-xs text-[#5a6d5a]">Max Batch Size</div>
                </div>
              </div>

              {/* Quick CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center bg-[#4a5d4a] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#3d4d3d] transition-colors"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Link>
                <button
                  onClick={async () => {
                    await trackAndOpenWhatsApp({
                      source: 'foundation-hero',
                      message: WHATSAPP_MESSAGES.courseEnquiry,
                      campaign: 'foundation-course',
                    })
                  }}
                  className="inline-flex items-center border-2 border-[#4a5d4a] text-[#4a5d4a] px-5 py-3 rounded-lg font-semibold hover:bg-[#4a5d4a] hover:text-white transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </button>
              </div>
            </motion.div>

            {/* Lead Capture Form */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {!submitSuccess ? (
                <>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center bg-[#e8ede8] text-[#4a5d4a] px-3 py-1 rounded-full text-sm font-medium mb-3">
                      <Gift className="w-4 h-4 mr-1" />
                      FREE Counseling Session
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#3d4d3d]">
                      Get Your Child's Personalized Study Plan
                    </h3>
                    <p className="text-[#5a6d5a] text-sm mt-2">
                      Fill the form for a free academic assessment
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Student's Name *"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4a5d4a] focus:border-transparent outline-none transition-all"
                        style={{ fontSize: '16px' }}
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Parent's Phone Number *"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4a5d4a] focus:border-transparent outline-none transition-all"
                        style={{ fontSize: '16px' }}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email Address"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4a5d4a] focus:border-transparent outline-none transition-all"
                        style={{ fontSize: '16px' }}
                      />
                    </div>
                    <div>
                      <select
                        value={formData.studentClass}
                        onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4a5d4a] focus:border-transparent outline-none transition-all bg-white"
                        style={{ fontSize: '16px' }}
                      >
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                      </select>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#4a5d4a] hover:bg-[#3d4d3d] text-white font-bold text-lg rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        'Submitting...'
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Get Free Study Plan
                        </>
                      )}
                    </motion.button>

                    <p className="text-xs text-gray-500 text-center">
                      By submitting, you agree to receive calls/messages. No spam!
                    </p>
                  </form>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-center gap-4 text-xs text-[#5a6d5a]">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1 text-[#4a5d4a]" />
                        Free Assessment
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1 text-[#4a5d4a]" />
                        No Obligation
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    className="bg-[#e8ede8] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    <CheckCircle className="w-10 h-10 text-[#4a5d4a]" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#3d4d3d] mb-2">Thank You!</h3>
                  <p className="text-[#5a6d5a] mb-4">
                    Our counselor will call you within 2 hours with your child's personalized study
                    plan.
                  </p>
                  <Link
                    href="/demo-booking"
                    className="inline-flex items-center text-[#4a5d4a] font-semibold hover:underline"
                  >
                    Book Demo Class Now <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3d4d3d] mb-4">
              Free Resources for Your Child
            </h2>
            <p className="text-[#5a6d5a] max-w-2xl mx-auto">
              Start exploring these free tools to help your child prepare better
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {freeTools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={tool.link}
                    className="block bg-[#f5f8f5] hover:bg-[#e8ede8] rounded-xl p-6 text-center transition-all hover:shadow-lg group"
                  >
                    <div
                      className={`bg-gradient-to-br ${tool.color} w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#3d4d3d] mb-2">{tool.title}</h3>
                    <p className="text-sm text-[#5a6d5a] mb-3">{tool.description}</p>
                    <span className="inline-flex items-center text-[#4a5d4a] font-medium text-sm group-hover:underline">
                      Try Free <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Online Biology Tuition Section - SEO Optimized */}
      <section className="py-12 sm:py-16 bg-[#e8ede8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3d4d3d] mb-4">
              Online Biology Tuition for Class 9, 10, 11 &amp; 12
            </h2>
            <p className="text-[#5a6d5a] max-w-3xl mx-auto">
              India's trusted online Biology tutor providing expert NEET Biology coaching. Our
              online Biology classes cover NCERT syllabus with chapter-wise NEET Biology preparation
              for Class 11 &amp; 12 students.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Laptop className="w-10 h-10 text-[#4a5d4a] mb-4" />
              <h3 className="text-lg font-bold text-[#3d4d3d] mb-2">Live Online Biology Classes</h3>
              <p className="text-[#5a6d5a] text-sm">
                Interactive online Biology tuition with live doubt clearing. Best online Biology
                tutor for NEET 2026 preparation with Class 11 &amp; 12 NCERT Biology coverage.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <BookOpen className="w-10 h-10 text-[#4a5d4a] mb-4" />
              <h3 className="text-lg font-bold text-[#3d4d3d] mb-2">NCERT Biology for NEET</h3>
              <p className="text-[#5a6d5a] text-sm">
                Complete NCERT Biology coverage for NEET 2026. Chapter-wise Biology notes and NEET
                Biology mock tests for Class 11 and Class 12 students.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Target className="w-10 h-10 text-[#4a5d4a] mb-4" />
              <h3 className="text-lg font-bold text-[#3d4d3d] mb-2">NEET Biology Coaching</h3>
              <p className="text-[#5a6d5a] text-sm">
                Expert NEET Biology coaching online with PYQ practice. Human Physiology, Genetics,
                Plant Physiology and high-weightage chapters covered with NEET pattern questions.
              </p>
            </motion.div>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
            <h3 className="text-xl font-bold text-[#3d4d3d] mb-4 text-center">
              Why Choose Our Online Biology Tuition?
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                'AIIMS-trained Biology faculty',
                'Live interactive online classes',
                'NEET Biology PYQ practice',
                'Class 11 & 12 NCERT focus',
                'Chapter-wise NEET weightage',
                'Regular Biology mock tests',
                'Doubt clearing sessions',
                'Study material included',
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-[#4a5d4a] mr-2 flex-shrink-0" />
                  <span className="text-[#3d4d3d] text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3d4d3d] mb-4">
              Foundation Program Success
            </h2>
            <p className="text-[#5a6d5a]">
              Building strong Biology foundations that last a lifetime
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {successStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-[#4a5d4a] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-lg font-semibold text-[#3d4d3d] mb-1">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-[#5a6d5a]">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Group Focus */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3d4d3d] mb-4">
              Age-Specific Learning Approach
            </h2>
            <p className="text-[#5a6d5a] max-w-2xl mx-auto">
              Customized curriculum and teaching methods for different age groups
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {ageGroups.map((group, index) => (
              <motion.div
                key={index}
                className="bg-[#f5f8f5] rounded-xl p-6 sm:p-8 border-l-4 border-[#4a5d4a]"
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[#3d4d3d]">{group.class}</h3>
                    <span className="bg-[#4a5d4a] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {group.age}
                    </span>
                  </div>
                  <p className="text-[#5a6d5a] font-medium mb-4">{group.focus}</p>
                </div>
                <div className="space-y-3">
                  {group.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-[#4a5d4a] mr-2 flex-shrink-0" />
                      <span className="text-[#3d4d3d] text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/demo-booking"
                  className="mt-6 inline-flex items-center text-[#4a5d4a] font-semibold hover:underline"
                >
                  Book Demo for {group.class} <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section className="py-12 sm:py-16 bg-[#e8ede8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3d4d3d] mb-4">
              Why Start Early With Cerebrum?
            </h2>
            <p className="text-[#5a6d5a] max-w-2xl mx-auto">
              Early foundation building gives students a significant advantage
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {uniqueFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon className="w-12 h-12 text-[#4a5d4a] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#3d4d3d] mb-3">{feature.title}</h3>
                  <p className="text-[#5a6d5a] text-sm">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3d4d3d] mb-4">
              Comprehensive Foundation Curriculum
            </h2>
            <p className="text-[#5a6d5a]">
              Step-by-step progression from basic concepts to NEET awareness
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {curriculum.map((unit, index) => (
              <motion.div
                key={index}
                className="bg-[#f5f8f5] rounded-xl p-6 border-l-4 border-[#4a5d4a]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#3d4d3d]">{unit.title}</h3>
                  <div className="text-right">
                    <span className="bg-[#4a5d4a] text-white px-3 py-1 rounded-full text-sm font-medium block mb-1">
                      {unit.duration}
                    </span>
                    <span className="bg-[#e8ede8] text-[#4a5d4a] px-3 py-1 rounded-full text-xs font-medium">
                      {unit.focus}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {unit.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center">
                      <BookOpen className="w-4 h-4 text-[#4a5d4a] mr-2" />
                      <span className="text-[#5a6d5a]">{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offline Classes in Delhi NCR Section */}
      <section className="py-12 sm:py-16 bg-[#e8ede8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3d4d3d] mb-4">
              Offline Biology Classes in Delhi NCR &amp; Gurugram
            </h2>
            <p className="text-[#5a6d5a] max-w-3xl mx-auto">
              Along with our online Biology tuition, we offer in-person NEET Biology coaching at our
              centers in Delhi NCR and Gurugram. Best offline Biology classes for Class 11 &amp; 12
              students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-[#4a5d4a]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-[#3d4d3d] mb-4">
                Biology Coaching in Gurugram
              </h3>
              <p className="text-[#5a6d5a] mb-4">
                Join our NEET Biology coaching center in Gurugram for in-person classes. Expert
                Biology tutor with AIIMS background. Small batch sizes for personalized attention.
              </p>
              <div className="space-y-2">
                {[
                  'Sector 14, Gurugram center',
                  'Small batch (15 students max)',
                  'NEET Biology coaching Class 11 & 12',
                  'Weekend & weekday batches',
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#4a5d4a] mr-2 flex-shrink-0" />
                    <span className="text-[#3d4d3d] text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-[#4a5d4a]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-[#3d4d3d] mb-4">
                Biology Tuition in Delhi NCR
              </h3>
              <p className="text-[#5a6d5a] mb-4">
                Offline Biology classes available for students in Delhi NCR region. Best Biology
                tutor in Delhi for NEET preparation with proven results.
              </p>
              <div className="space-y-2">
                {[
                  'South Delhi & nearby areas',
                  'Home tuition available',
                  'Foundation & NEET courses',
                  'Flexible scheduling',
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-[#4a5d4a] mr-2 flex-shrink-0" />
                    <span className="text-[#3d4d3d] text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="text-center">
            <p className="text-[#5a6d5a] mb-4">
              Looking for offline Biology coaching near you in Delhi NCR or Gurugram?
            </p>
            <button
              onClick={async () => {
                await trackAndOpenWhatsApp({
                  source: 'foundation-offline-enquiry',
                  message: 'Hi! I\'m looking for offline Biology classes in Delhi NCR/Gurugram.',
                  campaign: 'foundation-offline',
                })
              }}
              className="inline-flex items-center bg-[#4a5d4a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3d4d3d] transition-colors cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Enquire About Offline Classes
            </button>
          </div>
        </div>
      </section>

      {/* NEET Toppers Showcase */}
      <NEETToppersShowcase />

      {/* Parent Testimonials */}
      <ParentTestimonialsSection />

      {/* Pricing & Enrollment CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#4a5d4a] to-[#3d4d3d] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Start Your Child's Medical Journey Early
          </h2>
          <p className="text-[#e8ede8] mb-8 max-w-2xl mx-auto">
            Enroll in the Foundation Course today and give your child the advantage of early
            preparation. Limited seats available!
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-8">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">₹36,000</div>
                <div className="text-[#e8ede8]">Starting Price/Year</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">15</div>
                <div className="text-[#e8ede8]">Max Students/Batch</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">{seatsLeft}</div>
                <div className="text-[#e8ede8]">Seats Remaining</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center bg-white text-[#4a5d4a] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#e8ede8] transition-colors"
            >
              <Award className="w-5 h-5 mr-2" />
              Enroll Now
            </Link>
            <Link
              href="/demo-booking"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#4a5d4a] transition-colors"
            >
              <Play className="w-5 h-5 mr-2" />
              Book Free Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Parent-Specific CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-blue-200">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                  👨‍👩‍👧 Are You a Parent?
                </h3>
                <p className="text-gray-600 mb-4">
                  We understand your concerns about your child&apos;s early NEET preparation. Chat
                  directly with our counselors to understand fee structure, batch timings, and how we
                  nurture young minds for future medical success.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button
                    onClick={() =>
                      trackAndOpenWhatsApp({
                        source: 'foundation-parent-cta',
                        message: WHATSAPP_MESSAGES.parentFees,
                        campaign: 'parent-engagement',
                      })
                    }
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:shadow-green-500/30 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat as Parent
                  </button>
                  <Link
                    href="/parent-guide"
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-5 rounded-lg border border-gray-300 shadow-sm transition-all duration-300"
                  >
                    <Users className="h-5 w-5" />
                    Parent Guide
                  </Link>
                </div>
              </div>
              <div className="hidden md:block text-6xl">👨‍👩‍👧‍👦</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-[#f5f8f5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#3d4d3d] text-center mb-10">
            Foundation Course FAQ
          </h2>

          <div className="space-y-4">
            {foundationFAQs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#f5f8f5] transition-colors"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-[#3d4d3d] pr-4">
                    {faq.question}
                  </h3>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-[#4a5d4a] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#4a5d4a] flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-[#5a6d5a]">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-[#5a6d5a] mb-4">Still have questions?</p>
            <button
              onClick={async () => {
                await trackAndOpenWhatsApp({
                  source: 'foundation-faq',
                  message: WHATSAPP_MESSAGES.enquiry,
                  campaign: 'foundation-course',
                })
              }}
              className="inline-flex items-center text-[#4a5d4a] font-semibold hover:underline cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with us on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: foundationFAQs.map((faq) => ({
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

      {/* Course Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Online Biology Tuition for NEET - Foundation Course',
            description:
              'Best online Biology tutor for Class 9, 10, 11 & 12 students. Expert NEET Biology coaching with NCERT-based curriculum, live online classes, and AIIMS-trained faculty.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              sameAs: 'https://cerebrumbiologyacademy.com',
            },
            courseCode: 'CBAF-2026',
            educationalLevel: 'Secondary Education',
            about: [
              'NEET Biology Preparation',
              'Class 11 Biology',
              'Class 12 Biology',
              'NCERT Biology',
              'Online Biology Tuition',
            ],
            audience: {
              '@type': 'EducationalAudience',
              educationalRole: 'student',
              audienceType: 'Class 9-12 NEET Aspirants',
            },
            teaches: [
              'NCERT Biology for NEET',
              'Human Physiology',
              'Genetics and Evolution',
              'Plant Physiology',
              'Cell Biology',
              'Ecology',
            ],
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'online',
              courseWorkload: 'PT4H',
              instructor: {
                '@type': 'Person',
                name: 'AIIMS-trained Biology Faculty',
              },
            },
            offers: {
              '@type': 'Offer',
              price: '36000',
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
              validFrom: '2025-01-01',
            },
          }),
        }}
      />

      {/* Educational Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy',
            description:
              'Best online Biology tutor and NEET coaching institute. Expert online Biology tuition for Class 9, 10, 11 & 12 with AIIMS-trained faculty.',
            url: 'https://cerebrumbiologyacademy.com',
            telephone: '+918826444334',
            email: 'info@cerebrumbiologyacademy.com',
            areaServed: 'India',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Online Biology Courses',
              itemListElement: [
                {
                  '@type': 'Course',
                  name: 'Foundation Biology Course (Class 9-10)',
                  description: 'Online Biology tuition for Class 9 and 10 students',
                },
                {
                  '@type': 'Course',
                  name: 'NEET Biology Coaching (Class 11-12)',
                  description: 'Expert NEET Biology preparation for Class 11 and 12',
                },
              ],
            },
          }),
        }}
      />

      {/* LocalBusiness Schema for Delhi NCR & Gurugram */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Cerebrum Biology Academy - Gurugram',
            description:
              'Best Biology coaching in Gurugram for NEET preparation. Offline Biology classes for Class 11 & 12 with AIIMS-trained faculty.',
            url: 'https://cerebrumbiologyacademy.com/courses/foundation',
            telephone: '+918826444334',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Gurugram',
              addressRegion: 'Haryana',
              addressCountry: 'IN',
              postalCode: '122001',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '28.4595',
              longitude: '77.0266',
            },
            areaServed: [
              {
                '@type': 'City',
                name: 'Gurugram',
              },
              {
                '@type': 'City',
                name: 'Delhi',
              },
              {
                '@type': 'State',
                name: 'Delhi NCR',
              },
            ],
            priceRange: '₹36000-₹90000',
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '09:00',
                closes: '20:00',
              },
            ],
            sameAs: [
              'https://www.instagram.com/cerebrumbiologyacademy',
              'https://www.youtube.com/@cerebrumbiologyacademy',
            ],
          }),
        }}
      />
    </div>
  )
}
