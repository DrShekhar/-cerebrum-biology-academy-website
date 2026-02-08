'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  Star,
  Phone,
  MessageCircle,
  Users,
  Trophy,
  Target,
  BookOpen,
  Clock,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Shield,
  Zap,
  MapPin,
  Monitor,
  Building2,
  Calendar,
  Award,
  TrendingUp,
  Brain,
  Atom,
  FlaskConical,
  Leaf,
  HeartPulse,
} from 'lucide-react'
import { Breadcrumbs, BreadcrumbContainer } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { BookFreeDemoCard } from '@/components/courses/BookFreeDemoCard'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { getPricingForClass } from '@/data/pricing'
import { cn } from '@/lib/utils'
import {
  classOptions,
  focusOptions,
  tierOptions,
  batchOptions,
  modeOptions,
  locationOptions,
  subjects,
  successStats,
  comparisonData,
  faqs,
  buildWhatsAppMessage,
  getAvailableFocusOptions,
  mapClassToLevel,
  mapFocusToCourseType,
} from '@/data/neetCoachingData'
import type {
  NeetClassOption,
  FocusOption,
  TierOption,
  BatchOption,
  ModeOption,
  LocationOption,
} from '@/data/neetCoachingData'

const subjectIcons: Record<string, React.ReactNode> = {
  Biology: <Leaf className="w-7 h-7" />,
  Physics: <Atom className="w-7 h-7" />,
  Chemistry: <FlaskConical className="w-7 h-7" />,
}

export default function NEETCoachingPage() {
  const [selectedClass, setSelectedClass] = useState<NeetClassOption>('class-12')
  const [selectedFocus, setSelectedFocus] = useState<FocusOption>('board-neet')
  const [selectedTier, setSelectedTier] = useState<TierOption>('ascent')
  const [selectedBatch, setSelectedBatch] = useState<BatchOption>('weekday')
  const [selectedMode, setSelectedMode] = useState<ModeOption>('offline')
  const [selectedLocation, setSelectedLocation] = useState<LocationOption>('south-extension')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [showFloatingCta, setShowFloatingCta] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCta(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const available = getAvailableFocusOptions(selectedClass)
    if (!available.includes(selectedFocus)) {
      setSelectedFocus(available[0])
    }
  }, [selectedClass, selectedFocus])

  const currentPricing = getPricingForClass(
    mapClassToLevel(selectedClass),
    mapFocusToCourseType(selectedFocus)
  )

  const selectedTierData = tierOptions.find((t) => t.id === selectedTier)
  const selectedClassData = classOptions.find((c) => c.id === selectedClass)
  const selectedFocusData = focusOptions.find((f) => f.id === selectedFocus)

  const pricingTier =
    selectedTier === 'intensive'
      ? null
      : currentPricing?.find((p) => p.tier === selectedTierData?.tierLevel)

  const tierFeatures =
    selectedTier === 'intensive'
      ? [
          'Ultra-personalized learning plan',
          'Daily progress tracking & follow-ups',
          'Weekly strategy sessions with Dr. Shekhar',
          'Dedicated mentor assignment',
          'Priority doubt resolution',
          'Limited to 8-10 students per batch',
        ]
      : pricingTier?.features.slice(0, 8) || []

  const handleWhatsAppEnquiry = useCallback(() => {
    const classLabel = selectedClassData?.label || 'Class 12'
    const focusLabel = selectedFocusData?.label || 'Board + NEET'
    const tierLabel = selectedTierData?.label || 'Ascent'
    const tierBatchSize = selectedTierData?.batchSize || '16-18 students'
    const batchLabel = batchOptions.find((b) => b.id === selectedBatch)?.label || 'Weekday'
    const modeLabel = modeOptions.find((m) => m.id === selectedMode)?.label || 'Offline'
    const locationLabel =
      selectedMode === 'offline'
        ? locationOptions.find((l) => l.id === selectedLocation)?.label
        : undefined

    const message = buildWhatsAppMessage({
      classLabel,
      focusLabel,
      tierLabel,
      tierBatchSize,
      batchLabel,
      modeLabel,
      locationLabel,
    })

    trackAndOpenWhatsApp({
      source: 'neet-coaching-selector',
      message,
      campaign: 'neet-coaching-page',
    })
  }, [
    selectedClass,
    selectedFocus,
    selectedTier,
    selectedBatch,
    selectedMode,
    selectedLocation,
    selectedClassData,
    selectedFocusData,
    selectedTierData,
  ])

  const handleParentWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'neet-coaching-parent',
      message:
        'Hi! I am a parent enquiring about NEET coaching for my child. Please share course details, batch timings, and fee structure.',
      campaign: 'neet-coaching-parent',
    })
  }

  const handleHeroWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'neet-coaching-hero',
      message:
        'Hi! I am interested in NEET Coaching at Cerebrum Biology Academy. Please share details.',
      campaign: 'neet-coaching-hero',
    })
  }

  const handleDemoScroll = () => {
    document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  const displayPrice =
    selectedTier === 'intensive'
      ? '3,60,000'
      : pricingTier
        ? `${(pricingTier.prices.lumpSum / 1000).toFixed(0)},000`
        : '--'

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Breadcrumbs */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800">
        <BreadcrumbContainer className="pt-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'NEET Coaching', current: true },
            ]}
          />
        </BreadcrumbContainer>

        {/* 2. Hero Section */}
        <section className="container mx-auto px-4 pb-16 pt-8 md:pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                NEET Coaching 2026
                <span className="block text-yellow-400 mt-2">Physics | Chemistry | Biology</span>
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                Expert AIIMS & IITians Faculties | Small Batches | 98% Success Rate
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  'AIIMS & IITians faculties for all 3 subjects',
                  'Small batches of 10-18 students only',
                  '695/720 top NEET score by our student',
                  'Online + Offline in 4 Delhi-NCR centers',
                ].map((prop) => (
                  <div key={prop} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                    <span className="text-gray-200 text-sm">{prop}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold shadow-lg"
                  onClick={handleDemoScroll}
                >
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-500 text-white font-bold"
                  onClick={handleHeroWhatsApp}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-xl font-bold text-white mb-5">Why Cerebrum?</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: <Users className="w-5 h-5 text-yellow-400" />,
                    title: 'Small Batches',
                    desc: '10-18 students for personal attention',
                  },
                  {
                    icon: <HeartPulse className="w-5 h-5 text-green-400" />,
                    title: 'AIIMS & IITians Faculties',
                    desc: 'Taught by doctors & engineers from top institutes',
                  },
                  {
                    icon: <Trophy className="w-5 h-5 text-blue-400" />,
                    title: '98% Success Rate',
                    desc: '2000+ students coached, 695/720 top score',
                  },
                  {
                    icon: <Target className="w-5 h-5 text-purple-400" />,
                    title: 'All 3 Subjects',
                    desc: 'Complete Physics, Chemistry & Biology coverage',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="mt-0.5">{item.icon}</div>
                    <div>
                      <p className="text-white font-semibold text-sm">{item.title}</p>
                      <p className="text-gray-400 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Seats Filling Fast</span>
                  <span className="text-yellow-400 font-semibold">78% Full</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2.5">
                  <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* 3. Book Free Demo Card */}
      <section id="book-demo" className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-lg">
          <BookFreeDemoCard courseName="NEET Coaching 2026" source="neet-coaching-demo" />
        </div>
      </section>

      {/* 4. Success Stats Strip */}
      <section className="bg-[#3d4d3d] py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {successStats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className={`text-3xl md:text-4xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-gray-300 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Subjects Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Complete NEET Syllabus
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All 3 Subjects, <span className="text-blue-600">One Academy</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Physics, Chemistry, and Biology — taught by specialized AIIMS & IITians faculties with
              subject-specific strategies for NEET 2026.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {subjects.map((subject, idx) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className={cn('p-6', subject.bgColor)}>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn('flex items-center gap-2', subject.color)}>
                      {subjectIcons[subject.name]}
                      <h3 className="text-xl font-bold">{subject.name}</h3>
                    </div>
                    <span
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-bold',
                        subject.name === 'Biology'
                          ? 'bg-green-600 text-white'
                          : subject.name === 'Physics'
                            ? 'bg-blue-600 text-white'
                            : 'bg-purple-700 text-white'
                      )}
                    >
                      {subject.weightage} Weightage
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs">{subject.questions} questions in NEET</p>
                </div>

                <div className="p-6">
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {subject.description}
                  </p>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Key Topics
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {subject.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 italic border-t border-gray-100 pt-3">
                    {subject.whyItMatters}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Interactive Course Selector */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              Build Your Course
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your <span className="text-purple-700">NEET Path</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select your preferences below and enquire directly on WhatsApp. Our counselors will
              share exact fees, batch timings, and schedule.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Step 1: Class */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                  1
                </span>
                Select Your Class
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {classOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedClass(opt.id)}
                    className={cn(
                      'p-4 rounded-xl border-2 text-left transition-all',
                      selectedClass === opt.id
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    )}
                  >
                    <p className="font-bold text-gray-900 text-sm md:text-base">{opt.label}</p>
                    <p className="text-xs text-gray-500 mt-1 hidden md:block">{opt.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Focus */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                  2
                </span>
                Choose Your Focus
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {focusOptions.map((opt) => {
                  const available = getAvailableFocusOptions(selectedClass)
                  const isDisabled = !available.includes(opt.id)
                  return (
                    <button
                      key={opt.id}
                      onClick={() => !isDisabled && setSelectedFocus(opt.id)}
                      disabled={isDisabled}
                      className={cn(
                        'p-4 rounded-xl border-2 text-left transition-all',
                        isDisabled && 'opacity-40 cursor-not-allowed',
                        selectedFocus === opt.id && !isDisabled
                          ? 'border-blue-600 bg-blue-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      )}
                    >
                      <p className="font-bold text-gray-900 text-sm">{opt.label}</p>
                      <p className="text-xs text-gray-500 mt-1">{opt.description}</p>
                      {isDisabled && selectedClass === 'dropper' && (
                        <p className="text-xs text-orange-600 mt-1 font-medium">
                          Droppers: NEET Only
                        </p>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 3: Tier */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                  3
                </span>
                Select Course Tier
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {tierOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedTier(opt.id)}
                    className={cn(
                      'p-4 rounded-xl border-2 text-left transition-all relative',
                      selectedTier === opt.id
                        ? 'border-purple-600 bg-purple-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    )}
                  >
                    {opt.badge && (
                      <span
                        className={cn(
                          'absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold',
                          opt.badge === 'Premium'
                            ? 'bg-blue-600 text-white'
                            : opt.badge === 'Most Popular'
                              ? 'bg-green-600 text-white'
                              : 'bg-purple-700 text-white'
                        )}
                      >
                        {opt.badge}
                      </span>
                    )}
                    <p className="font-bold text-gray-900 text-sm">{opt.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{opt.batchSize}</p>
                    <p className="text-xs text-gray-500">{opt.hours}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Batch Type */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                  4
                </span>
                Batch Type
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {batchOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedBatch(opt.id)}
                    className={cn(
                      'p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3',
                      selectedBatch === opt.id
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    )}
                  >
                    <Calendar className="w-5 h-5 text-gray-400 shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{opt.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{opt.schedule}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Mode */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                  5
                </span>
                Mode of Learning
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {modeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedMode(opt.id)}
                    className={cn(
                      'p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3',
                      selectedMode === opt.id
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    )}
                  >
                    {opt.id === 'online' ? (
                      <Monitor className="w-5 h-5 text-gray-400 shrink-0" />
                    ) : (
                      <Building2 className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{opt.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{opt.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 6: Location (offline only) */}
            {selectedMode === 'offline' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                    6
                  </span>
                  Select Center
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {locationOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedLocation(opt.id)}
                      className={cn(
                        'p-4 rounded-xl border-2 text-left transition-all',
                        selectedLocation === opt.id
                          ? 'border-blue-600 bg-blue-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                        <p className="font-bold text-gray-900 text-sm">{opt.label}</p>
                      </div>
                      <p className="text-xs text-gray-500 leading-snug">{opt.address}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 text-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Your Selection Summary
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-400">Class</p>
                  <p className="font-semibold">{selectedClassData?.label}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Focus</p>
                  <p className="font-semibold">{selectedFocusData?.label}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Tier</p>
                  <p className="font-semibold">
                    {selectedTierData?.label} ({selectedTierData?.batchSize})
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Batch</p>
                  <p className="font-semibold">
                    {batchOptions.find((b) => b.id === selectedBatch)?.label}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Mode</p>
                  <p className="font-semibold">
                    {modeOptions.find((m) => m.id === selectedMode)?.label}
                  </p>
                </div>
                {selectedMode === 'offline' && (
                  <div>
                    <p className="text-xs text-gray-400">Location</p>
                    <p className="font-semibold">
                      {locationOptions.find((l) => l.id === selectedLocation)?.label}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/20">
                <div>
                  <p className="text-xs text-gray-400">Starting from</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    Rs {displayPrice}
                    <span className="text-sm font-normal text-gray-400"> /year</span>
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs text-gray-400">Duration</p>
                  <p className="font-semibold">{selectedClassData?.duration}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-500 text-white font-bold flex-1"
                  onClick={handleWhatsAppEnquiry}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Enquire on WhatsApp
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 flex-1"
                  onClick={() => window.open(`tel:${CONTACT_INFO.phone.primary}`, '_self')}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: {CONTACT_INFO.phone.display.primary}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Course Features Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What You Get in <span className="text-blue-600">{selectedTierData?.label}</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {selectedTierData?.batchSize} per batch, {selectedTierData?.hours}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {tierFeatures.map((feature, idx) => {
              const icons = [BookOpen, Users, Brain, Target, Award, Shield, Zap, TrendingUp]
              const IconComp = icons[idx % icons.length]
              return (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <IconComp className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 8. Video Testimonials */}
      <VideoTestimonialsSection />

      {/* 9. Competitor Comparison Table */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cerebrum vs <span className="text-green-600">Competition</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {comparisonData.headers.map((header, idx) => (
                    <th
                      key={header}
                      className={cn(
                        'px-4 py-3 text-left font-bold',
                        idx === 1
                          ? 'bg-green-600 text-white rounded-t-lg'
                          : 'text-gray-700 bg-gray-50'
                      )}
                    >
                      {header}
                      {idx === 1 && (
                        <Star className="w-3 h-3 inline ml-1 text-yellow-300 fill-yellow-300" />
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.rows.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-gray-100">
                    {row.map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        className={cn(
                          'px-4 py-3',
                          cellIdx === 1
                            ? 'bg-green-50 font-semibold text-green-800'
                            : 'text-gray-600'
                        )}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 10. Parent CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Parents, We Understand Your Concerns
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-6 text-lg">
              Your child's medical career is our responsibility too. Speak directly with our
              academic counselors about batch timings, faculty credentials, and our track record.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-lg"
                onClick={handleParentWhatsApp}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat as Parent on WhatsApp
              </Button>
              <Button
                size="lg"
                className="bg-white/20 text-white border-2 border-white/40 hover:bg-white/30 font-bold"
                onClick={() => window.open(`tel:${CONTACT_INFO.phone.primary}`, '_self')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call: {CONTACT_INFO.phone.display.primary}
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-100">
              {[
                'Monthly parent-teacher meetings',
                'Weekly progress reports',
                'Transparent fee structure',
                'EMI options available',
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 11. FAQ Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-semibold text-gray-900 text-sm md:text-base">
                    {faq.question}
                  </span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Your NEET Journey Today
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-8 text-lg">
              Join 2000+ students who cracked NEET with Cerebrum. Limited seats per batch — enroll
              now.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold shadow-lg"
                onClick={handleDemoScroll}
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Book Free Demo Class
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-bold"
                onClick={() => window.open(`tel:${CONTACT_INFO.phone.primary}`, '_self')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call: {CONTACT_INFO.phone.display.primary}
              </Button>
            </div>

            <p className="text-yellow-400 text-sm font-medium">
              New batches starting this month — limited seats available
            </p>
          </motion.div>
        </div>
      </section>

      {/* 13. Floating CTAs */}
      {showFloatingCta && (
        <>
          {/* Desktop: WhatsApp floating button */}
          <div className="hidden md:block fixed bottom-6 right-6 z-50">
            <button
              onClick={handleHeroWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile: Sticky bottom bar */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl p-3 flex gap-2">
            <button
              onClick={handleHeroWhatsApp}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
            <button
              onClick={handleDemoScroll}
              className="flex-1 bg-yellow-500 text-gray-900 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              Book Demo
            </button>
          </div>
        </>
      )}
    </div>
  )
}
