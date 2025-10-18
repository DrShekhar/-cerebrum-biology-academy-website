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

// REAL Cerebrum Academy Course Data
const CEREBRUM_COURSES: CourseCard[] = [
  {
    id: 'pinnacle-neet-plan-a',
    title: 'Pinnacle NEET A-Z Plan A',
    subtitle: 'NEET / Competitive',
    targetClass: 'Class XI or XII, 1 Year Course',
    teachingHours: '5.5-6.0 hr / week teaching',
    description:
      'Recommended Plan for Success in NEET & Board Exam. Ultra-premium personalized coaching with guaranteed results.',
    price: 98000,
    installmentOptions: {
      single: 98000,
      two: 104000,
      three: 106000,
    },
    duration: '12 Months',
    batchSize: 'Small Group - max 12 students',
    badge: {
      text: 'ELITE',
      color: 'text-white',
      bgColor: 'bg-teal-600',
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
      primary: '#14B8A6',
      secondary: '#0D9488',
      gradient: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
      textColor: 'text-teal-900',
      bgColor: 'bg-teal-50',
    },
    icon: <Crown className="h-10 w-10" />,
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
      'Recommended Plan for Success in NEET & Board Exam. Premium coaching with proven track record.',
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
      color: 'text-white',
      bgColor: 'bg-gradient-to-r from-amber-500 to-orange-600',
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
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 50%, #DC2626 100%)',
      textColor: 'text-amber-900',
      bgColor: 'bg-amber-50',
    },
    icon: <Trophy className="h-10 w-10" />,
    series: 'Ascent',
  },
  {
    id: 'pursuit-neet-plan-a',
    title: 'Pursuit NEET- PLAN A',
    subtitle: 'Competitive / NEET',
    targetClass: 'XI or XII, 1 Year Course',
    teachingHours: '3-4 hr / week teaching',
    description:
      'Comprehensive NEET preparation with competitive focus. Quality education at affordable pricing.',
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
      color: 'text-white',
      bgColor: 'bg-gradient-to-r from-blue-500 to-cyan-600',
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
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #10B981 100%)',
      textColor: 'text-blue-900',
      bgColor: 'bg-blue-50',
    },
    icon: <Target className="h-10 w-10" />,
    series: 'Pursuit',
  },
]

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

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

interface PremiumCerebrumCoursePageProps {
  className?: string
}

export function PremiumCerebrumCoursePage({ className = '' }: PremiumCerebrumCoursePageProps) {
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
    <div className={`min-h-screen relative overflow-hidden ${className}`}>
      {/* Professional Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-navy-900">
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/10 via-transparent to-teal-500/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(20,184,166,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(13,148,136,0.1),transparent_50%)]"></div>
        </div>
      </div>

      {/* Animated DNA Helix Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-teal-500 rounded-full"
            animate={{
              y: [0, -200, 0],
              x: [0, Math.sin(i) * 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Ultra-Premium Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={heroInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-2xl border border-white/30 text-white px-10 py-4 rounded-full text-sm font-bold mb-10 shadow-2xl"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg">Cerebrum Biology Academy</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </motion.div>

            {/* Hero Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-7xl md:text-9xl font-black text-white mb-8 leading-none tracking-tight"
            >
              <span className="block">Master</span>
              <span className="block text-teal-400 animate-pulse">NEET Biology</span>
              <span className="block text-6xl md:text-7xl mt-4 text-gold-500">Excellence</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl md:text-3xl text-navy-300 max-w-5xl mx-auto leading-relaxed mb-12 font-light"
            >
              Join India's most{' '}
              <span className="font-bold text-teal-400">elite Biology coaching</span> with
              <span className="font-bold text-white"> Harvard-level pedagogy</span> and
              <span className="font-bold text-teal-300"> evidence-based innovation</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-teal-600 hover:bg-teal-700 text-white px-12 py-6 rounded-2xl font-black text-xl shadow-2xl hover:shadow-teal-500/50 transition-all duration-500 flex items-center gap-4 min-w-[280px] justify-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Play className="h-7 w-7 group-hover:scale-125 transition-transform relative z-10" />
                <span className="relative z-10">Start Free Demo</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform relative z-10" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white/10 backdrop-blur-2xl border-2 border-white/40 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-500 flex items-center gap-4 min-w-[280px] justify-center"
              >
                <Phone className="h-7 w-7 group-hover:rotate-12 transition-transform" />
                <span>Call: 9188264443</span>
              </motion.button>
            </motion.div>

            {/* Success Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {[
                {
                  number: '3000+',
                  label: 'NEET Selections',
                  icon: Trophy,
                  color: 'from-yellow-400 to-orange-500',
                },
                {
                  number: '95%',
                  label: 'Success Rate',
                  icon: Target,
                  color: 'from-green-400 to-emerald-500',
                },
                {
                  number: '15+',
                  label: 'Expert Faculty',
                  icon: Award,
                  color: 'from-teal-400 to-teal-600',
                },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={heroInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 hover:border-white/50 transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-black text-white mb-2">{stat.number}</div>
                  <div className="text-white/80 text-lg font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Course Cards Section */}
      <section ref={coursesRef} className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={coursesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-black text-white mb-8">
              Choose Your
              <span className="block text-teal-400">Excellence Path</span>
            </h2>
            <p className="text-2xl text-white/80 max-w-4xl mx-auto font-light">
              From ultra-premium Pinnacle to value-driven Pursuit - we have the perfect NEET Biology
              program for every ambitious student.
            </p>
          </motion.div>

          {/* Premium Course Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
            {CEREBRUM_COURSES.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 100 }}
                animate={coursesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -15, scale: 1.02 }}
                className={`group relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 hover:border-white/50 transition-all duration-500 overflow-hidden ${
                  course.popular ? 'ring-4 ring-yellow-400/50 shadow-2xl' : ''
                }`}
              >
                {/* Premium Popular Badge */}
                {course.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-black px-6 py-2 rounded-full shadow-2xl flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      MOST POPULAR
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                )}

                {/* Animated Background */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                  <div
                    style={{ background: course.color.gradient }}
                    className="w-full h-full"
                  ></div>
                </div>

                {/* Course Badge */}
                <div className="relative z-10 flex justify-between items-start mb-8">
                  <div
                    className={`${course.badge.bgColor} px-4 py-2 rounded-full text-sm font-bold tracking-wider ${course.badge.color} shadow-lg`}
                  >
                    {course.badge.text}
                  </div>
                  <div className="p-4 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30">
                    <div className="text-white">{course.icon}</div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-white mb-3">{course.title}</h3>
                  <p className="text-cyan-300 font-bold mb-2 text-lg">{course.subtitle}</p>
                  <p className="text-white/70 text-sm mb-2">{course.targetClass}</p>
                  <p className="text-white/80 leading-relaxed mb-8">{course.description}</p>

                  {/* Course Details */}
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                      <span className="text-white/80">Teaching Hours:</span>
                      <span className="font-bold text-white">{course.teachingHours}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                      <span className="text-white/80">Batch Size:</span>
                      <span className="font-bold text-white">{course.batchSize}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                      <span className="text-white/80">Duration:</span>
                      <span className="font-bold text-white">{course.duration}</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mb-8">
                    <div className="text-center mb-6">
                      <div className="text-5xl font-black text-white mb-2">
                        ₹{(course.price / 1000).toFixed(0)}K
                      </div>
                      <div className="text-white/80">Single Payment</div>
                    </div>

                    {/* Premium Installment Options */}
                    <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                      <h4 className="font-bold text-white text-lg mb-4 text-center">
                        Payment Plans:
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-white/80">Single Payment:</span>
                          <span className="font-bold text-green-400 text-lg">
                            ₹{(course.installmentOptions.single / 1000).toFixed(0)}K
                          </span>
                        </div>
                        {course.installmentOptions.two && (
                          <div className="flex justify-between items-center">
                            <span className="text-white/80">Two Installments:</span>
                            <span className="font-bold text-yellow-400 text-lg">
                              ₹{(course.installmentOptions.two / 1000).toFixed(0)}K
                            </span>
                          </div>
                        )}
                        {course.installmentOptions.three && (
                          <div className="flex justify-between items-center">
                            <span className="text-white/80">Three Installments:</span>
                            <span className="font-bold text-orange-400 text-lg">
                              ₹{(course.installmentOptions.three / 1000).toFixed(0)}K
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mb-8">
                    <div className="text-lg font-bold text-white mb-4">Key Highlights:</div>
                    <div className="space-y-3">
                      {course.highlights.map((highlight, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ x: -20, opacity: 0 }}
                          animate={coursesInView ? { x: 0, opacity: 1 } : {}}
                          transition={{ delay: index * 0.2 + idx * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-white/90">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Premium Action Buttons */}
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCourseSelect(course.id)}
                      className="w-full py-5 rounded-2xl font-bold text-lg text-white shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden relative group"
                      style={{ background: course.color.gradient }}
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10">Choose {course.series} Series</span>
                      <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform relative z-10" />
                    </motion.button>

                    <button className="w-full py-4 border-2 border-white/30 text-white hover:border-white/50 hover:bg-white/10 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-3">
                      <BookOpen className="h-5 w-5" />
                      View Complete Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Biology Fee is Higher Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-navy-800/60 backdrop-blur-2xl rounded-3xl p-10 border border-white/30 text-white"
          >
            <div className="text-center mb-10">
              <h3 className="text-4xl font-black mb-4">
                Why is Biology Fee Higher than Physics or Chemistry?
              </h3>
              <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg">
                    Biology accounts for{' '}
                    <span className="font-bold text-cyan-400">50% of marks (360/720)</span> in NEET
                    UG
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg">
                    Biology includes{' '}
                    <span className="font-bold text-teal-300">two subjects: Zoology + Botany</span>
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg">
                    Biology gets{' '}
                    <span className="font-bold text-teal-300">more time (usually twice)</span> than
                    Physics or Chemistry
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg">
                    <span className="font-bold text-yellow-400">Small Batch Size</span> for
                    personalized attention
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-white mb-6">
              Frequently Asked
              <span className="block text-teal-400">Questions</span>
            </h2>
            <p className="text-xl text-white/80">
              Everything you need to know about Cerebrum Biology Academy programs
            </p>
          </motion.div>

          <div className="space-y-6">
            {FAQ_DATA.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/30 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-8 text-left flex items-center justify-between hover:bg-white/10 transition-colors duration-200"
                >
                  <span className="font-bold text-white text-lg pr-4">{faq.question}</span>
                  <div className="bg-white/20 rounded-full p-2">
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="h-6 w-6 text-white" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-white" />
                    )}
                  </div>
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
                      <div className="px-8 pb-8 text-white/80 leading-relaxed text-lg">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
            className="fixed bottom-8 right-8 w-16 h-16 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform duration-300"
          >
            <HelpCircle className="h-8 w-8" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Premium Help Panel */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-8 right-8 w-96 bg-black/80 backdrop-blur-2xl rounded-3xl border border-white/30 z-50 overflow-hidden"
          >
            <div className="bg-teal-600 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6" />
                <span className="font-bold text-lg">Need Expert Help?</span>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-white/90 mb-6 text-center">
                Call our expert counselors at{' '}
                <span className="font-bold text-cyan-400">9188264443</span> for personalized course
                guidance!
              </p>

              <a
                href="https://wa.me/918826444334"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Chat
              </a>

              <a
                href="tel:+918826444334"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>

              <button className="w-full bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white/20">
                <Calendar className="h-5 w-5" />
                Book Demo Class
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
