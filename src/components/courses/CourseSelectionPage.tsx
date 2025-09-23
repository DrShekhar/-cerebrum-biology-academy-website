'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Star,
  Users,
  Clock,
  Trophy,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  ArrowRight,
  Award,
  Target,
  Zap,
  Shield,
  MessageCircle,
  Phone,
  BookOpen,
  Calendar,
  DollarSign,
  TrendingUp,
  Heart,
  Globe,
  Verified,
  Crown,
  Gift,
  HelpCircle,
  ChevronRight,
  Play,
  GraduationCap,
  Brain,
  Lightning,
  Sparkles,
} from 'lucide-react'

interface CourseCard {
  id: string
  title: string
  subtitle: string
  description: string
  price: number
  originalPrice: number
  duration: string
  students: number
  rating: number
  badge: {
    text: string
    color: string
    bgColor: string
  }
  features: string[]
  highlights: string[]
  color: {
    primary: string
    secondary: string
    gradient: string
    textColor: string
    bgColor: string
  }
  icon: React.ReactNode
  popular?: boolean
}

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

interface TrustBadge {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

// Harvard-level course data with Silicon Valley UX
const COURSE_OPTIONS: CourseCard[] = [
  {
    id: 'class-11-12',
    title: 'Class 11-12 Complete',
    subtitle: '2-Year Foundation Program',
    description:
      'Comprehensive 2-year program building strong foundation from Class 11 through NEET preparation.',
    price: 75000,
    originalPrice: 95000,
    duration: '24 Months',
    students: 1247,
    rating: 4.9,
    badge: {
      text: 'RECOMMENDED',
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
    },
    features: [
      'Complete NCERT + Advanced concepts',
      '24/7 doubt resolution support',
      'Weekly mock tests & assessments',
      'Personal mentor assignment',
      'Parent progress reports',
      'Scholarship opportunities',
    ],
    highlights: [
      '94% students score 90+ in boards',
      '88% achieve 550+ in NEET',
      'Structured learning path',
    ],
    color: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
      textColor: 'text-blue-900',
      bgColor: 'bg-blue-50',
    },
    icon: <GraduationCap className="h-8 w-8" />,
    popular: true,
  },
  {
    id: 'dropper-intensive',
    title: 'Dropper Intensive',
    subtitle: 'Gap Year Excellence Program',
    description:
      'Specialized intensive program for students taking a gap year to crack NEET with guaranteed results.',
    price: 65000,
    originalPrice: 85000,
    duration: '12 Months',
    students: 892,
    rating: 4.8,
    badge: {
      text: 'GUARANTEED',
      color: 'text-green-700',
      bgColor: 'bg-green-100',
    },
    features: [
      'Psychology counseling support',
      'Rank prediction AI system',
      'Speed training modules',
      'Weak area elimination',
      'Mock test series (50+ tests)',
      'Success guarantee program',
    ],
    highlights: [
      '67% improve rank by 1000+',
      '92% qualify NEET on next attempt',
      'Mental health support included',
    ],
    color: {
      primary: '#10B981',
      secondary: '#047857',
      gradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
      textColor: 'text-emerald-900',
      bgColor: 'bg-emerald-50',
    },
    icon: <Target className="h-8 w-8" />,
  },
  {
    id: 'class-12-sprint',
    title: 'Class 12 Final Sprint',
    subtitle: 'Last-Mile Preparation',
    description:
      'Intensive final year program focusing on NEET preparation alongside Class 12 board excellence.',
    price: 45000,
    originalPrice: 60000,
    duration: '12 Months',
    students: 634,
    rating: 4.7,
    badge: {
      text: 'INTENSIVE',
      color: 'text-red-700',
      bgColor: 'bg-red-100',
    },
    features: [
      'Board + NEET dual preparation',
      'Time management training',
      'Revision strategy planning',
      'Previous year analysis',
      'Emergency doubt sessions',
      'Exam psychology training',
    ],
    highlights: [
      '85% students score 650+ in NEET',
      '91% clear boards with 85%+',
      'Proven time management',
    ],
    color: {
      primary: '#EF4444',
      secondary: '#DC2626',
      gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      textColor: 'text-red-900',
      bgColor: 'bg-red-50',
    },
    icon: <Zap className="h-8 w-8" />,
  },
]

const FAQ_DATA: FAQ[] = [
  {
    id: '1',
    question: 'What is the difference between these three programs?',
    answer:
      'Class 11-12 Complete is a 2-year comprehensive program, Dropper Intensive is for gap year students with guaranteed results, and Class 12 Final Sprint focuses on last-year intensive preparation combining boards and NEET.',
    category: 'programs',
  },
  {
    id: '2',
    question: 'Do you provide study materials and books?',
    answer:
      'Yes, all programs include comprehensive study materials, practice books, previous year papers, and digital resources. Our materials are regularly updated based on latest NEET patterns.',
    category: 'materials',
  },
  {
    id: '3',
    question: 'What if I need to change my program after enrollment?',
    answer:
      'We allow program changes within the first 30 days of enrollment without any additional charges. Our counselors will help you choose the most suitable program based on your goals.',
    category: 'enrollment',
  },
  {
    id: '4',
    question: 'Are there any hidden fees or additional charges?',
    answer:
      'No hidden charges. The fee mentioned includes all study materials, tests, doubt sessions, and support services. Optional services like additional coaching sessions may have separate charges.',
    category: 'fees',
  },
  {
    id: '5',
    question: 'What is your success guarantee policy?',
    answer:
      'For Dropper Intensive program, we guarantee minimum 1000 rank improvement or full fee refund. Terms and conditions apply. Other programs have performance improvement guarantees.',
    category: 'guarantee',
  },
  {
    id: '6',
    question: 'Can I get personalized study plan and mentoring?',
    answer:
      'Yes, all programs include personalized study plans, dedicated mentors, and regular progress tracking. We adapt the plan based on your strengths and areas for improvement.',
    category: 'mentoring',
  },
]

const TRUST_BADGES: TrustBadge[] = [
  {
    id: 'verified',
    name: 'Government Verified',
    icon: <Verified className="h-6 w-6 text-green-600" />,
    description: 'Officially recognized coaching institute',
  },
  {
    id: 'iso',
    name: 'ISO Certified',
    icon: <Award className="h-6 w-6 text-blue-600" />,
    description: 'ISO 9001:2015 certified for quality education',
  },
  {
    id: 'secure',
    name: 'Secure Payments',
    icon: <Shield className="h-6 w-6 text-purple-600" />,
    description: 'SSL encrypted payment processing',
  },
  {
    id: 'support',
    name: '24/7 Support',
    icon: <Clock className="h-6 w-6 text-orange-600" />,
    description: 'Round the clock student support',
  },
]

interface CourseSelectionPageProps {
  className?: string
}

export function CourseSelectionPage({ className = '' }: CourseSelectionPageProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [showHelp, setShowHelp] = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const coursesRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const coursesInView = useInView(coursesRef, { once: true, amount: 0.2 })
  const faqInView = useInView(faqRef, { once: true, amount: 0.3 })

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId)
  }

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId)
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 ${className}`}
    >
      {/* Hero Section */}
      <section ref={heroRef} className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-2 rounded-full text-sm font-semibold mb-8">
              <Crown className="w-4 h-4" />
              Choose Your Path to Medical College
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Success Journey
              </span>
              <br />
              Starts Here
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Choose from our scientifically designed programs, each crafted with Harvard-level
              educational psychology and Silicon Valley precision to ensure your NEET success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                Watch Success Stories
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Book Free Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Cards Section */}
      <section ref={coursesRef} className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={coursesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your <span className="text-blue-600">Perfect Program</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each program is designed with specific student needs in mind, ensuring maximum success
              probability.
            </p>
          </motion.div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {COURSE_OPTIONS.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                animate={coursesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                  course.popular ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                }`}
              >
                {/* Popular Badge */}
                {course.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                      🔥 MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Course Badge */}
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`${course.badge.bgColor} ${course.badge.color} px-3 py-1 rounded-full text-xs font-bold tracking-wider`}
                  >
                    {course.badge.text}
                  </div>
                  <div className={`${course.color.bgColor} p-3 rounded-2xl`}>
                    <div style={{ color: course.color.primary }}>{course.icon}</div>
                  </div>
                </div>

                {/* Course Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 font-medium mb-4">{course.subtitle}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{course.description}</p>

                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="font-bold text-gray-900">{course.duration}</div>
                    <div className="text-xs text-gray-500">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900">
                      {course.students.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-bold text-gray-900">{course.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{(course.price / 1000).toFixed(0)}K
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{(course.originalPrice / 1000).toFixed(0)}K
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                      SAVE ₹{((course.originalPrice - course.price) / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    EMI starting from ₹{(course.price / 12 / 1000).toFixed(1)}K/month
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-900 mb-3">Key Highlights:</div>
                  <div className="space-y-2">
                    {course.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center`}
                          style={{ background: course.color.gradient }}
                        >
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCourseSelect(course.id)}
                    className="w-full py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    style={{ background: course.color.gradient }}
                  >
                    Enroll Now
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>

                  <button className="w-full py-3 border-2 border-gray-200 text-gray-700 hover:border-gray-300 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={coursesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Feature</th>
                    {COURSE_OPTIONS.map((course) => (
                      <th
                        key={course.id}
                        className="text-center py-4 px-4 font-semibold text-gray-900 min-w-[150px]"
                      >
                        {course.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">Duration</td>
                    {COURSE_OPTIONS.map((course) => (
                      <td key={course.id} className="text-center py-4 px-4">
                        {course.duration}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">Price</td>
                    {COURSE_OPTIONS.map((course) => (
                      <td key={course.id} className="text-center py-4 px-4 font-semibold">
                        ₹{(course.price / 1000).toFixed(0)}K
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">Success Rate</td>
                    <td className="text-center py-4 px-4 text-green-600 font-semibold">94%</td>
                    <td className="text-center py-4 px-4 text-green-600 font-semibold">92%</td>
                    <td className="text-center py-4 px-4 text-green-600 font-semibold">85%</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium">Best For</td>
                    <td className="text-center py-4 px-4 text-sm">Fresh starters</td>
                    <td className="text-center py-4 px-4 text-sm">Gap year students</td>
                    <td className="text-center py-4 px-4 text-sm">Final year prep</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our programs</p>
          </motion.div>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  {expandedFAQ === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Trusted & Certified</h3>
            <p className="text-gray-600">
              Your success is backed by verified credentials and proven results
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TRUST_BADGES.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300">
                  {badge.icon}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{badge.name}</h4>
                <p className="text-sm text-gray-600">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Help Widget */}
      <AnimatePresence>
        {!showHelp && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setShowHelp(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform duration-300"
          >
            <HelpCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Help Panel */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <span className="font-semibold">Need Help?</span>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                Our counselors are here to help you choose the right program!
              </p>

              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors duration-200">
                <MessageCircle className="h-4 w-4" />
                WhatsApp Chat
              </button>

              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors duration-200">
                <Phone className="h-4 w-4" />
                Call Now
              </button>

              <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors duration-200">
                <Calendar className="h-4 w-4" />
                Schedule Callback
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
