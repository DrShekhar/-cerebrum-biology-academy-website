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
  Sparkles,
  Microscope,
  FlaskConical,
  Filter,
  Search,
} from 'lucide-react'

// Complete Course Catalog from Screenshots
const COMPLETE_COURSE_CATALOG = {
  // PINNACLE SERIES
  pinnacle: {
    title: 'Pinnacle Series',
    subtitle: 'Small Group - max 12 students, Personalised Program',
    description: 'Ultra-premium personalized coaching',
    color: {
      primary: '#8B5CF6',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)',
    },
    courses: [
      {
        id: 'pinnacle-neet-a-z-plan-a',
        title: 'Pinnacle NEET A-Z Plan A',
        type: 'Competitive / NEET & Academic, CUET',
        duration: '1 Year Course (XI or XII)',
        teachingHours: '5.5-6.0 hr / week teaching',
        fees: {
          competitive: { tuition: 60000, booksTest: 6000 },
          academic: { tuition: 30000, booksTest: 4000 },
        },
        installments: {
          single: 98000,
          two: 104000,
          three: 106000,
        },
        features: [
          'Classroom Teaching',
          'Recorded Video Classes',
          'Test Series for NEET',
          'Subjective tests - Academic boards',
          'Multiple Revisions',
          'Chanting',
          'Printed notes',
          'Worksheets - NEET & Academic/boards',
          'summary sheets',
          'Quizzes',
          'Tips & Tricks to remember',
          'Offline/online/hybrid classes',
          'PYQ',
          'Personal Mentoring',
        ],
      },
      {
        id: 'pinnacle-neet-a-z-plan-b',
        title: 'Pinnacle NEET A-Z Plan B',
        type: 'NEET / Competitive',
        duration: '1 Year Course (XI or XII)',
        teachingHours: '3.0-4.0 hr / week teaching',
        installments: {
          single: 65000,
          two: 68000,
        },
        features: [
          'Classroom Teaching',
          'Recorded Video Classes',
          'Test Series for NEET',
          'Multiple Revisions',
          'Chanting',
          'Printed notes',
          'Worksheets - NEET',
          'summary sheets',
          'Quizzes',
          'Tips & Tricks to remember',
          'Offline/online/hybrid classes',
          'PYQ',
          'Personal Mentoring',
        ],
      },
      {
        id: 'pinnacle-academic-a-z-plan-b',
        title: 'Pinnacle Academic A-Z Plan B',
        type: 'Academic/CUET',
        duration: '1 Year Course (XI or XII)',
        teachingHours: '3.0-4.0 hr / week teaching',
        installments: {
          single: 65000,
          two: 68000,
        },
        features: [
          'Classroom Teaching',
          'Recorded Video Classes',
          'Subjective Tests - Academic/Boards',
          'Multiple Revisions',
          'Printed notes',
          'Worksheets',
          'summary sheets',
          'Quizzes',
          'Tips & Tricks to remember',
          'Offline/online/hybrid classes',
          'PYQ',
          'Personal Mentoring',
        ],
      },
      // 2-YEAR PINNACLE PROGRAMS
      {
        id: 'pinnacle-2year-plan-a',
        title: 'Pinnacle NEET A-Z Plan A (2-Year)',
        type: 'Academic/boards/CUET + Competitive/NEET',
        duration: '2-Year Program (Class XI)',
        teachingHours: '5.5-6.0 hr/week (XI), 11-12 hr/week (XII)',
        fees: {
          tuition: 120000, // 60000 x 2
          booksTest: 12000, // 6000 x 2
          pinnacleNEET: 60000, // 30000 x 2
          learningAssistance: 48000, // 4000 x 12
        },
        totalFee: 248000,
        installments: {
          single: 180000,
          two: 184000,
          three: 186000,
        },
      },
    ],
  },

  // ASCENT SERIES
  ascent: {
    title: 'Ascent Series',
    subtitle: 'Batch Size - 12-16 students',
    description: 'Premium coaching with proven track record',
    color: {
      primary: '#F59E0B',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 50%, #DC2626 100%)',
    },
    courses: [
      {
        id: 'ascent-neet-plan-a',
        title: 'Ascent NEET- PLAN A',
        type: 'Competitive / NEET & Academic, CUET',
        duration: '1 Year Course (XI or XII)',
        teachingHours: '4.0-5.0 hr / week teaching',
        installments: {
          single: 76000,
          two: 77000,
          three: 78000,
        },
      },
      {
        id: 'ascent-neet-plan-b',
        title: 'Ascent NEET PLAN B',
        type: 'Competitive / NEET',
        duration: '1 Year Course (XI or XII)',
        teachingHours: '3.0-4.0 hr / week teaching',
        installments: {
          single: 58000,
          two: 60000,
        },
      },
      {
        id: 'ascent-academic-plan-b',
        title: 'Ascent Academic PLAN B',
        type: 'Academic/boards/CUET',
        duration: '1 Year Course (XI or XII)',
        teachingHours: '3.0-4.0 hr / week teaching',
        installments: {
          single: 58000,
          two: 60000,
        },
      },
    ],
  },

  // PURSUIT SERIES
  pursuit: {
    title: 'Pursuit Series',
    subtitle: 'Batch Size - min 20 students, ONLINE Classes',
    description: 'Quality education at affordable pricing',
    color: {
      primary: '#3B82F6',
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #10B981 100%)',
    },
    courses: [
      {
        id: 'pursuit-neet-plan-a',
        title: 'Pursuit NEET- PLAN A',
        type: 'Competitive / NEET & Academic, CUET',
        duration: '1 Year Course (XI or XII)',
        teachingHours: '3-4 hr / week teaching',
        fees: {
          neetCompetitive: { tuition: 37000, booksTest: 6000 },
          academicCUET: { tuition: 4000 },
        },
        totalFee: 47000,
        installments: {
          single: 48000,
          two: 49000,
          three: 49900,
        },
      },
      {
        id: 'pursuit-neet-plan-b',
        title: 'Pursuit NEET Plan B',
        type: 'Competitive / NEET',
        duration: '1 Year Course (XI or XII)',
        teachingHours: '3.0-4.0 hr / week teaching',
        installments: {
          single: 40000,
          two: 42000,
        },
      },
      {
        id: 'pursuit-academic-plan-b',
        title: 'Pursuit Academic Plan B',
        type: 'Academic/boards/CUET',
        duration: '1 Year Course (XI or XII)',
        teachingHours: '3.0-4.0 hr / week teaching',
        installments: {
          single: 40000,
          two: 42000,
        },
      },
      // CLASS XII + DROPPERS SPECIFIC
      {
        id: 'pursuit-xii-droppers-plan-a',
        title: 'Pursuit NEET A-Z PLAN A (XII/Droppers)',
        type: 'Competitive / NEET',
        duration: '1-year classroom Program for Class XII or Droppers',
        teachingHours: '6-9 hr / week teaching',
        installments: {
          single: 88000,
          two: 92000,
          three: 93000,
        },
      },
      {
        id: 'pursuit-xii-droppers-plan-b',
        title: 'Pursuit NEET A-Z PLAN B (XII/Droppers)',
        type: 'Competitive / NEET',
        duration: '1-year classroom Program for Class XII or Droppers',
        installments: {
          single: 86000,
          two: 88000,
          three: 90000,
        },
      },
      {
        id: 'pursuit-xii-droppers-plan-c',
        title: 'Pursuit NEET A-Z PLAN C (XII/Droppers)',
        type: 'Competitive / NEET',
        duration: '1-year classroom Program for Class XII or Droppers',
        teachingHours: '6.0-9.0 hr / week teaching',
        installments: {
          single: 55000,
          two: 56000,
        },
      },
    ],
  },

  // FOUNDATION SERIES (IX, X)
  foundation: {
    title: 'Foundation Series',
    subtitle: 'Biology Foundation Courses for Academics/NEET/Olympiads',
    description: 'Strong conceptual building for future success',
    color: {
      primary: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    },
    courses: [
      {
        id: 'foundation-ix-x-ascent',
        title: 'Ascent Series Foundation (IX, X)',
        type: 'A-Academic Class IX or X + B-Foundation NEET & Olympiads',
        duration: 'Online/Offline/Hybrid',
        batchSize: '12-16 students',
        pricing: {
          classIX_X: { a: 50000, b: 60000, total: 110000, comboOffer: 60000 },
          note: 'COMBO OFFER - for first 6 students of the batch: INR 60,000',
        },
      },
      {
        id: 'foundation-ix-x-pinnacle',
        title: 'Pinnacle Series Foundation (IX, X)',
        type: 'A-Academic Class IX or X + B-Foundation NEET & Olympiads',
        duration: 'Online/Offline/Hybrid',
        batchSize: 'max 12 students, Personalised Program',
        pricing: {
          classIX_X: { a: 65000, b: 60000, total: 125000 },
        },
      },
      {
        id: 'foundation-ix-x-pursuit',
        title: 'Pursuit Series Foundation (IX, X)',
        type: 'A-Academic Class IX or X + B-Foundation NEET & Olympiads',
        duration: 'Online/Offline/Hybrid',
        batchSize: 'min 20 students, ONLINE Classes',
        pricing: {
          classIX_X: { a: 36000, b: 30000, total: 66000 },
        },
      },
    ],
  },

  // INTENSIVE PROGRAMS
  intensive: {
    title: 'Intensive Programs',
    subtitle: 'RIGOROUS TRAINING',
    description: 'High-intensity preparation for serious aspirants',
    color: {
      primary: '#EF4444',
      gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    },
    courses: [
      {
        id: 'intensive-xi',
        title: 'Intensive Program FOR XI',
        type: 'PINNACLE A-Z FEE + 3.6 L FOR TWO YEARS',
        totalFee: '5.46L',
        description: 'Intensive coaching for Class XI students',
      },
      {
        id: 'intensive-xii',
        title: 'Intensive Program FOR XII',
        type: 'PINNACLE Z-A FEE + 3.6 L FOR ONE YEAR',
        totalFee: '5.16L',
        description: 'Intensive coaching for Class XII students',
      },
      {
        id: 'intensive-droppers',
        title: 'Intensive Program FOR DROPPERS',
        type: 'PINNACLE Z-A FEE + 3.6 L FOR ONE YEAR',
        totalFee: '5.16L',
        description: 'Intensive coaching for dropper students',
      },
    ],
  },
}

interface CompleteCerebrumCatalogProps {
  className?: string
}

export function CompleteCerebrumCatalog({ className = '' }: CompleteCerebrumCatalogProps) {
  const [selectedSeries, setSelectedSeries] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedDuration, setSelectedDuration] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const heroRef = useRef<HTMLDivElement>(null)
  const catalogRef = useRef<HTMLDivElement>(null)

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const catalogInView = useInView(catalogRef, { once: true, amount: 0.2 })

  // Filter courses based on selected criteria
  const getFilteredCourses = () => {
    const allCourses: any[] = []

    Object.entries(COMPLETE_COURSE_CATALOG).forEach(([seriesKey, series]) => {
      series.courses.forEach((course: any) => {
        allCourses.push({
          ...course,
          seriesKey,
          seriesTitle: series.title,
          seriesColor: series.color,
        })
      })
    })

    return allCourses.filter((course) => {
      const matchesSeries = selectedSeries === 'all' || course.seriesKey === selectedSeries
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.type.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesSeries && matchesSearch
    })
  }

  const filteredCourses = getFilteredCourses()

  return (
    <div className={`min-h-screen relative overflow-hidden ${className}`}>
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-slate-800">
          <div className="absolute inset-0 bg-indigo-100"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,121,198,0.2),transparent_50%)]"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={heroInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-2xl border border-white/30 text-white px-10 py-4 rounded-full text-sm font-bold mb-10 shadow-2xl"
            >
              <Crown className="w-8 h-8 text-yellow-400" />
              <span className="text-xl">Complete Course Catalog</span>
              <Sparkles className="w-6 h-6 text-blue-400" />
            </motion.div>

            <h1 className="text-7xl md:text-8xl font-black text-white mb-8 leading-none tracking-tight">
              <span className="block">Cerebrum Biology</span>
              <span className="block text-blue-400">
                Course Catalog
              </span>
            </h1>

            <p className="text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12 font-light">
              Explore our complete range of Biology programs from Foundation to Intensive coaching
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="relative z-10 px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/30">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Series Filter */}
              <select
                value={selectedSeries}
                onChange={(e) => setSelectedSeries(e.target.value)}
                className="bg-white/10 border border-white/30 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">All Series</option>
                <option value="pinnacle">Pinnacle</option>
                <option value="ascent">Ascent</option>
                <option value="pursuit">Pursuit</option>
                <option value="foundation">Foundation</option>
                <option value="intensive">Intensive</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Course Catalog */}
      <section ref={catalogRef} className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {Object.entries(COMPLETE_COURSE_CATALOG).map(([seriesKey, series]) => {
            const seriesCourses = filteredCourses.filter((course) => course.seriesKey === seriesKey)

            if (seriesCourses.length === 0 && selectedSeries !== 'all') return null

            return (
              <motion.div
                key={seriesKey}
                initial={{ opacity: 0, y: 50 }}
                animate={catalogInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-20"
              >
                {/* Series Header */}
                <div className="text-center mb-12">
                  <h2 className="text-5xl font-black text-white mb-4">
                    <span
                      style={{
                        background: series.color.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {series.title}
                    </span>
                  </h2>
                  <p className="text-xl text-white/80 mb-2">{series.subtitle}</p>
                  <p className="text-white/60">{series.description}</p>
                </div>

                {/* Course Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(selectedSeries === 'all' ? series.courses : seriesCourses).map(
                    (course: any, index: number) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={catalogInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/30 hover:border-white/50 transition-all duration-500"
                      >
                        {/* Course Header */}
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                          <p className="text-blue-300 text-sm mb-2">{course.type}</p>
                          <p className="text-white/70 text-sm">{course.duration}</p>
                          {course.teachingHours && (
                            <p className="text-white/60 text-xs mt-1">{course.teachingHours}</p>
                          )}
                        </div>

                        {/* Pricing */}
                        {course.installments && (
                          <div className="mb-6">
                            <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                              <h4 className="font-bold text-white text-sm mb-3">
                                Payment Options:
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-white/80">Single:</span>
                                  <span className="font-bold text-green-400">
                                    ₹{(course.installments.single / 1000).toFixed(0)}K
                                  </span>
                                </div>
                                {course.installments.two && (
                                  <div className="flex justify-between">
                                    <span className="text-white/80">Two:</span>
                                    <span className="font-bold text-yellow-400">
                                      ₹{(course.installments.two / 1000).toFixed(0)}K
                                    </span>
                                  </div>
                                )}
                                {course.installments.three && (
                                  <div className="flex justify-between">
                                    <span className="text-white/80">Three:</span>
                                    <span className="font-bold text-orange-400">
                                      ₹{(course.installments.three / 1000).toFixed(0)}K
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Special Pricing Display */}
                        {course.pricing && (
                          <div className="mb-6">
                            <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                              <h4 className="font-bold text-white text-sm mb-3">
                                Pricing Details:
                              </h4>
                              <div className="space-y-1 text-xs text-white/80">
                                {Object.entries(course.pricing).map(
                                  ([key, value]: [string, any]) => (
                                    <div key={key}>
                                      {typeof value === 'object' ? (
                                        <div>
                                          <strong>{key}:</strong>
                                          {Object.entries(value).map(([subKey, subValue]) => (
                                            <div key={subKey} className="ml-2">
                                              {subKey}:{' '}
                                              {typeof subValue === 'number'
                                                ? `₹${(subValue / 1000).toFixed(0)}K`
                                                : String(subValue)}
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <div>
                                          {key}: {String(value)}
                                        </div>
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Features */}
                        {course.features && (
                          <div className="mb-6">
                            <h4 className="font-bold text-white text-sm mb-3">Features:</h4>
                            <div className="space-y-1">
                              {course.features.slice(0, 5).map((feature: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <Check className="h-3 w-3 text-green-400 flex-shrink-0" />
                                  <span className="text-white/80 text-xs">{feature}</span>
                                </div>
                              ))}
                              {course.features.length > 5 && (
                                <div className="text-xs text-blue-400">
                                  +{course.features.length - 5} more features
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Action Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 rounded-2xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2"
                          style={{ background: series.color.gradient }}
                        >
                          Select Course
                          <ArrowRight className="h-4 w-4" />
                        </motion.button>
                      </motion.div>
                    )
                  )}
                </div>
              </motion.div>
            )
          })}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={catalogInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-orange-600/20 backdrop-blur-2xl rounded-3xl p-10 border border-white/30">
              <h3 className="text-4xl font-black text-white mb-6">Need Help Choosing?</h3>
              <p className="text-xl text-white/80 mb-8">
                Contact our expert counselors for personalized course recommendations
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.a
                  href="https://wa.me/918826444334"
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#4a5d4a] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3"
                >
                  <MessageCircle className="h-6 w-6" />
                  WhatsApp: 9188264443
                </motion.a>

                <motion.a
                  href="tel:+918826444334"
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3"
                >
                  <Phone className="h-6 w-6" />
                  Call Now
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
