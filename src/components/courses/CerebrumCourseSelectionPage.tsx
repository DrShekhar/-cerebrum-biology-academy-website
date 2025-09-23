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
  Microscope,
  FlaskConical,
} from 'lucide-react'

interface CourseCard {
  id: string
  title: string
  subtitle: string
  description: string
  targetClass: string
  teachingHours: string
  price: number
  originalPrice?: number
  installmentOptions: {
    single: number
    two?: number
    three?: number
  }
  duration: string
  batchSize: string
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
  series: 'Pinnacle' | 'Ascent' | 'Pursuit'
}

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

// REAL Cerebrum Academy Course Data from Screenshots
const CEREBRUM_COURSES: CourseCard[] = [
  {
    id: 'pinnacle-neet-plan-a',
    title: 'Pinnacle NEET A-Z Plan A',
    subtitle: 'NEET / Competitive',
    targetClass: 'Class XI or XII, 1 Year Course',
    teachingHours: '5.5-6.0 hr / week teaching',
    description:
      'Recommended Plan for Success in NEET & Board Exam. Competitive / NEET & Academic, CUET focus with comprehensive classroom teaching.',
    price: 98000,
    installmentOptions: {
      single: 98000,
      two: 104000,
      three: 106000,
    },
    duration: '12 Months',
    batchSize: 'Small Group - max 12 students',
    badge: {
      text: 'RECOMMENDED',
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
    },
    features: [
      'Classroom Teaching',
      'Recorded Video Classes',
      'Test Series for NEET',
      'Subjective tests - Academic boards',
      'Multiple Revisions',
      'Chanting',
      'Printed notes - NEET & Academic/boards',
      'Worksheets - NEET & Academic/boards',
      'summary sheets',
      'Quizzes',
      'Tips & Tricks to remember',
      'Offline/online/hybrid classes',
      'PYQ',
      'Personal Mentoring',
    ],
    highlights: [
      'Personalized Program for max 12 students',
      'NEET + Academic Board preparation',
      'Personal Mentoring included',
    ],
    color: {
      primary: '#8B5CF6',
      secondary: '#7C3AED',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      textColor: 'text-purple-900',
      bgColor: 'bg-purple-50',
    },
    icon: <Crown className="h-8 w-8" />,
    popular: true,
    series: 'Pinnacle',
  },
  {
    id: 'ascent-neet-plan-a',
    title: 'Ascent NEET- PLAN A',
    subtitle: 'Competitive / NEET',
    targetClass: 'XI OR XII, 1 Year Course',
    teachingHours: '4.0-5.0 hr / week teaching',
    description:
      'Recommended Plan for Success in NEET & Board Exam. Competitive / NEET & Academic, CUET preparation with structured approach.',
    price: 76000,
    installmentOptions: {
      single: 76000,
      two: 77000,
      three: 78000,
    },
    duration: '12 Months',
    batchSize: 'Max 16-18 students',
    badge: {
      text: 'RECOMMENDED',
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-100',
    },
    features: [
      'Classroom Teaching',
      'Recorded Video Classes',
      'Test Series for NEET',
      'Subjective tests - Academic boards',
      'Multiple Revisions',
      'Chanting',
      'Worksheets - NEET & Academic/boards',
      'summary sheets',
      'Quizzes',
      'Tips & Tricks to remember',
      'Offline/online/hybrid classes',
      'PYQ',
    ],
    highlights: [
      'Comprehensive NEET + Board preparation',
      'Proven success track record',
      'Structured learning approach',
    ],
    color: {
      primary: '#F59E0B',
      secondary: '#D97706',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      textColor: 'text-amber-900',
      bgColor: 'bg-amber-50',
    },
    icon: <Trophy className="h-8 w-8" />,
    series: 'Ascent',
  },
  {
    id: 'pursuit-neet-plan-a',
    title: 'Pursuit NEET- PLAN A',
    subtitle: 'Competitive / NEET',
    targetClass: 'XI or XII, 1 Year Course',
    teachingHours: '3-4 hr / week teaching',
    description:
      'Comprehensive NEET preparation with competitive focus. Minimum batch size - 25 students, ONLINE Classes available.',
    price: 48000,
    installmentOptions: {
      single: 48000,
      two: 49000,
      three: 49900,
    },
    duration: '12 Months',
    batchSize: 'Minimum batch size - 25 students',
    badge: {
      text: 'VALUE',
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
    },
    features: [
      'Classroom Teaching',
      'Test Series for NEET',
      'Subjective tests - Academic boards',
      'Printed notes',
      'Worksheets - NEET & Academic/boards',
      'Quizzes',
      'Offline/online/hybrid classes',
      'PYQ',
    ],
    highlights: [
      'Affordable NEET preparation',
      'Online/Offline flexibility',
      'Complete syllabus coverage',
    ],
    color: {
      primary: '#3B82F6',
      secondary: '#2563EB',
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      textColor: 'text-blue-900',
      bgColor: 'bg-blue-50',
    },
    icon: <Target className="h-8 w-8" />,
    series: 'Pursuit',
  },
]

const FAQ_DATA: FAQ[] = [
  {
    id: '1',
    question: 'What is the difference between Pinnacle, Ascent, and Pursuit series?',
    answer:
      'Pinnacle is our premium series with max 12 students and personal mentoring (₹98K). Ascent offers comprehensive preparation for 16-18 students (₹76K). Pursuit provides quality education for larger batches at affordable pricing (₹48K).',
    category: 'programs',
  },
  {
    id: '2',
    question: 'What payment options are available?',
    answer:
      'We offer single payment, two-installment, and three-installment plans. Payment is due Day 1 after demo class, with subsequent installments on Day 31 and Day 61 for three-installment plans.',
    category: 'payment',
  },
  {
    id: '3',
    question: 'Do you provide study materials for both NEET and Academic boards?',
    answer:
      'Yes, all our courses include printed notes, worksheets, and study materials for both NEET preparation and Academic/Board examinations. We also provide summary sheets and PYQ (Previous Year Questions).',
    category: 'materials',
  },
  {
    id: '4',
    question: 'What is the batch size for each program?',
    answer:
      'Pinnacle: Maximum 12 students (personalized), Ascent: 16-18 students, Pursuit: Minimum 25 students. Smaller batches ensure more personalized attention.',
    category: 'batch',
  },
  {
    id: '5',
    question: 'Are classes available online, offline, or hybrid?',
    answer:
      'All our programs offer offline/online/hybrid classes to provide maximum flexibility to students based on their convenience and requirements.',
    category: 'delivery',
  },
  {
    id: '6',
    question: 'Why is Biology fee higher than Physics or Chemistry?',
    answer:
      'Biology accounts for 50% of marks (360/720) in NEET UG. Biology includes two subjects: Zoology + Botany. In typical NEET coaching, Biology gets more time (usually twice) than Physics or Chemistry, and we maintain small batch sizes.',
    category: 'pricing',
  },
]

interface CerebrumCourseSelectionPageProps {
  className?: string
}

export function CerebrumCourseSelectionPage({ className = '' }: CerebrumCourseSelectionPageProps) {
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-6 py-2 rounded-full text-sm font-semibold mb-8">
              <Brain className="w-4 h-4" />
              Cerebrum Biology Academy - Choose Your Success Path
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              NEET Biology
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Excellence Awaits
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Choose from our scientifically designed Biology programs - Pinnacle, Ascent, or
              Pursuit. Each crafted for different learning needs with guaranteed NEET success
              methodology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                Watch Demo Class
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2"
              >
                <Phone className="h-5 w-5" />
                Call: 918826444334
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
              Choose Your <span className="text-purple-600">Biology Excellence</span> Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From personalized Pinnacle to affordable Pursuit - we have the perfect NEET Biology
              program for every student.
            </p>
          </motion.div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {CEREBRUM_COURSES.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                animate={coursesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                  course.popular ? 'ring-2 ring-purple-500 ring-opacity-50' : ''
                }`}
              >
                {/* Popular Badge */}
                {course.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                      👑 MOST POPULAR
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
                <p className="text-gray-600 font-medium mb-2">{course.subtitle}</p>
                <p className="text-sm text-gray-500 mb-4">{course.targetClass}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{course.description}</p>

                {/* Course Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Teaching Hours:</span>
                    <span className="font-semibold text-gray-900">{course.teachingHours}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Batch Size:</span>
                    <span className="font-semibold text-gray-900">{course.batchSize}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold text-gray-900">{course.duration}</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      ₹{(course.price / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-gray-600">Single Payment</div>
                  </div>

                  {/* Installment Options */}
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm mb-3">Payment Plans:</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Single Payment:</span>
                        <span className="font-semibold">
                          ₹{(course.installmentOptions.single / 1000).toFixed(0)}K
                        </span>
                      </div>
                      {course.installmentOptions.two && (
                        <div className="flex justify-between">
                          <span>Two Installments:</span>
                          <span className="font-semibold">
                            ₹{(course.installmentOptions.two / 1000).toFixed(0)}K
                          </span>
                        </div>
                      )}
                      {course.installmentOptions.three && (
                        <div className="flex justify-between">
                          <span>Three Installments:</span>
                          <span className="font-semibold">
                            ₹{(course.installmentOptions.three / 1000).toFixed(0)}K
                          </span>
                        </div>
                      )}
                    </div>
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
                    Choose {course.series} Series
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>

                  <button className="w-full py-3 border-2 border-gray-200 text-gray-700 hover:border-gray-300 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    View Complete Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Course Features Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={coursesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              What's Included in Each Program
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Features</th>
                    <th className="text-center py-4 px-4 font-semibold text-purple-700">
                      Pinnacle
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-amber-700">Ascent</th>
                    <th className="text-center py-4 px-4 font-semibold text-blue-700">Pursuit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">Personal Mentoring</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <X className="h-5 w-5 text-gray-400 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <X className="h-5 w-5 text-gray-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">Batch Size</td>
                    <td className="text-center py-4 px-4 text-purple-700 font-semibold">Max 12</td>
                    <td className="text-center py-4 px-4 text-amber-700 font-semibold">16-18</td>
                    <td className="text-center py-4 px-4 text-blue-700 font-semibold">25+</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">Teaching Hours/Week</td>
                    <td className="text-center py-4 px-4 font-semibold">5.5-6.0 hrs</td>
                    <td className="text-center py-4 px-4 font-semibold">4.0-5.0 hrs</td>
                    <td className="text-center py-4 px-4 font-semibold">3-4 hrs</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">Recorded Video Classes</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <X className="h-5 w-5 text-gray-400 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium">Offline/Online/Hybrid</td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
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
            <p className="text-xl text-gray-600">
              Everything you need to know about Cerebrum Biology Academy programs
            </p>
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

      {/* Why Biology Fee is Higher Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-6">
              Why is Biology Fee Higher than Physics or Chemistry?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4" />
                  </div>
                  <span>Biology accounts for 50% of marks (360/720) in NEET UG</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4" />
                  </div>
                  <span>Biology includes two subjects: Zoology + Botany</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4" />
                  </div>
                  <span>Biology gets more time (usually twice) than Physics or Chemistry</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4" />
                  </div>
                  <span>Small Batch Size for personalized attention</span>
                </div>
              </div>
            </div>
          </motion.div>
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
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform duration-300"
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
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex items-center justify-between">
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
                Call us at 918826444334 for course guidance!
              </p>

              <a
                href="https://wa.me/918826444334"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Chat
              </a>

              <a
                href="tel:+918826444334"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>

              <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors duration-200">
                <Calendar className="h-4 w-4" />
                Book Demo Class
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
