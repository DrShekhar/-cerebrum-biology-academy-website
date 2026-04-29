'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  CheckCircle,
  Clock,
  Users,
  Award,
  BookOpen,
  Target,
  Star,
  ArrowRight,
  Calculator,
  FileText,
  Brain,
  GraduationCap,
  MessageCircle,
  Sparkles,
  ChevronRight,
  Play,
  Shield,
  TrendingUp,
  AlertCircle,
} from 'lucide-react'
import { Breadcrumbs, BreadcrumbContainer } from '@/components/ui/Breadcrumbs'
import { DualCurrencyPrice, formatINR } from '@/components/ui/DualCurrencyPrice'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'
import { throttle } from '@/lib/performance'

export default function Class11BiologyPage() {
  const [activeSection, setActiveSection] = useState('hero')

  // Lead-capture quick-context selectors. Users tap to refine; the WhatsApp
  // message updates with their selection so the conversation starts with
  // full context (which course, what mode, what track) — no back-and-forth
  // discovery needed by the counsellor.
  const [track, setTrack] = useState<'NEET' | 'Boards' | 'Olympiad' | 'All-round'>('NEET')
  const [mode, setMode] = useState<'Online' | 'Offline' | 'Either'>('Either')

  const buildContextWhatsAppMessage = () => {
    const parts = [
      `Hi! I want to enquire about Class 11 Biology coaching.`,
      ``,
      `Track: ${track === 'All-round' ? 'NEET + Boards + Olympiad foundation' : track}`,
      `Preferred mode: ${
        mode === 'Offline'
          ? 'Offline (South Delhi / Gurugram / Faridabad — please advise nearest centre)'
          : mode === 'Online'
            ? 'Online'
            : 'Either online or offline — please advise'
      }`,
      ``,
      `Please share batch start, schedule, and fee structure.`,
    ]
    return parts.join('\n')
  }

  const sendContextWhatsApp = (source: string) => {
    trackAndOpenWhatsApp({
      source,
      message: buildContextWhatsAppMessage(),
      campaign: 'class-11',
    })
  }

  // Rolling-week batch framing — replaces "March 2026 batch" hardcoding so
  // the urgency badge stays accurate year-round.
  const [batchStartDay, setBatchStartDay] = useState('Monday')

  useEffect(() => {
    const now = new Date()
    const day = now.getDay()
    const daysUntilNextMonday = ((1 - day + 7) % 7) + 7
    const nextBatchStart = new Date(now)
    nextBatchStart.setDate(now.getDate() + daysUntilNextMonday)
    setBatchStartDay(nextBatchStart.toLocaleDateString('en-IN', { weekday: 'long' }))
  }, [])
  const [seatsRemaining, setSeatsRemaining] = useState(12)
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)

  // Track scroll for sticky nav and floating CTA
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCTA(window.scrollY > 500)

      const sections = ['hero', 'features', 'curriculum', 'faculty', 'testimonials', 'pricing']
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section)
          break
        }
      }
    }

    const throttledHandleScroll = throttle(handleScroll, 150)
    window.addEventListener('scroll', throttledHandleScroll)
    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [])

  const freeTools = [
    {
      icon: BookOpen,
      title: 'MCQ Practice',
      description: 'Chapter-wise MCQs with detailed solutions',
      link: '/neet-biology-mcq',
      badge: 'Popular',
      color: 'bg-[#4a5d4a]',
    },
    {
      icon: FileText,
      title: 'NEET PYQs',
      description: '10 years solved papers with explanations',
      link: '/neet-biology-pyq-chapter-wise',
      badge: 'Free Download',
      color: 'bg-green-600',
    },
    {
      icon: GraduationCap,
      title: 'College Predictor',
      description: 'Find colleges based on your NEET score',
      link: '/neet-college-predictor',
      badge: 'Essential',
      color: 'bg-blue-600',
    },
    {
      icon: Calculator,
      title: 'Rank Predictor',
      description: 'Predict your AIR based on expected score',
      link: '/neet-rank-predictor',
      badge: 'Popular',
      color: 'bg-purple-600',
    },
  ]

  const courseFeatures = [
    {
      icon: BookOpen,
      title: 'Complete NCERT Coverage',
      description: 'Every chapter with NEET-focused explanations',
    },
    {
      icon: Brain,
      title: 'NEET Foundation Building',
      description: 'Start your 2-year NEET preparation journey',
    },
    {
      icon: Users,
      title: 'Small Batch Size',
      description: 'Maximum 25 students for personalized attention',
    },
    {
      icon: Target,
      title: 'Board + NEET Combo',
      description: 'Excel in school exams while preparing for NEET',
    },
    {
      icon: Clock,
      title: 'Flexible Timings',
      description: 'Morning, evening & weekend batches available',
    },
    {
      icon: Shield,
      title: 'Doubt Resolution',
      description: 'Unlimited doubt sessions with faculty',
    },
    {
      icon: Award,
      title: 'Weekly Tests',
      description: 'Regular assessments with detailed analysis',
    },
    {
      icon: GraduationCap,
      title: 'AIIMS Faculty',
      description: 'Learn from doctors who cracked NEET',
    },
  ]

  const curriculum = [
    {
      title: 'Unit 1: Diversity in Living World',
      topics: ['The Living World', 'Biological Classification', 'Plant Kingdom', 'Animal Kingdom'],
      neetWeightage: '12%',
      duration: '4 weeks',
    },
    {
      title: 'Unit 2: Structural Organization',
      topics: [
        'Morphology of Flowering Plants',
        'Anatomy of Flowering Plants',
        'Structural Organization in Animals',
      ],
      neetWeightage: '8%',
      duration: '5 weeks',
    },
    {
      title: 'Unit 3: Cell Structure & Function',
      topics: ['Cell: The Unit of Life', 'Biomolecules', 'Cell Cycle and Cell Division'],
      neetWeightage: '15%',
      duration: '6 weeks',
    },
    {
      title: 'Unit 4: Plant Physiology',
      topics: [
        'Transport in Plants',
        'Mineral Nutrition',
        'Photosynthesis',
        'Respiration in Plants',
        'Plant Growth',
      ],
      neetWeightage: '10%',
      duration: '8 weeks',
    },
    {
      title: 'Unit 5: Human Physiology',
      topics: [
        'Digestion & Absorption',
        'Breathing & Exchange of Gases',
        'Body Fluids & Circulation',
        'Excretory Products',
        'Locomotion & Movement',
        'Neural Control',
      ],
      neetWeightage: '18%',
      duration: '10 weeks',
    },
  ]

  const facultyMembers = [
    {
      name: 'Dr. Rajesh Kumar',
      qualification: 'MBBS, AIIMS Delhi',
      experience: '15+ years teaching',
      specialty: 'Human Physiology Expert',
    },
    {
      name: 'Dr. Priya Sharma',
      qualification: 'PhD Botany, DU',
      experience: '15+ years coaching',
      specialty: 'Plant Biology Specialist',
    },
    {
      name: 'Dr. Amit Verma',
      qualification: 'MBBS, MAMC Delhi',
      experience: '15+ years NEET prep',
      specialty: 'Cell Biology & Genetics',
    },
  ]

  const testimonials = [
    {
      name: 'Ananya Singh',
      score: '94% in Class 11',
      college: 'Now at AIIMS Delhi',
      testimonial:
        'The foundation I built in Class 11 at Cerebrum was the reason I cracked NEET in my first attempt.',
      image: null,
    },
    {
      name: 'Rohan Gupta',
      score: '96% Board Exams',
      college: 'NEET AIR 234',
      testimonial:
        'Best decision was joining Cerebrum in Class 11. The teachers make biology so interesting and easy to understand.',
      image: null,
    },
    {
      name: 'Kavya Patel',
      score: '92% Class 11',
      college: 'MBBS at GMC',
      testimonial:
        'The small batch size meant I could ask all my doubts. Dr. Kumar sir is the best biology teacher!',
      image: null,
    },
  ]

  const successStats = [
    { number: '90%+', label: 'Boards target', description: 'Most of our cohort' },
    {
      number: 'NEET-aligned',
      label: 'NCERT-line-by-line',
      description: 'Foundation that actually holds',
    },
    { number: '2000+', label: 'Students taught', description: 'Since 2018' },
    { number: '5.0/5', label: 'Student rating', description: 'Google Reviews' },
  ]

  // Static batch metadata — date is rendered from `batchStartDay` (rolling week)
  // so we don't ship hardcoded month strings. Seat counters live in the
  // `seatsRemaining` state declared above.
  const batchInfo = {
    totalSeats: 25,
    filledSeats: 25 - seatsRemaining,
  }

  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'faculty', label: 'Faculty' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'pricing', label: 'Pricing' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Class 11th Biology Course for NEET',
            description:
              'Foundation year NEET Biology course with Board + NEET dual preparation. 12-month intensive program with complete NCERT coverage.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            instructor: {
              '@type': 'Person',
              name: 'Dr. Shekhar C Singh',
              jobTitle: 'Founder & Head Faculty',
              alumniOf: 'AIIMS New Delhi',
            },
            courseCode: 'NEET-11',
            educationalLevel: 'Intermediate',
            teaches: 'NEET Biology - Class 11 Botany and Zoology',
            numberOfCredits: '12 months',
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: ['online', 'onsite'],
              courseWorkload: 'PT3H',
              instructor: {
                '@type': 'Person',
                name: 'Dr. Shekhar C Singh',
              },
            },
            offers: {
              '@type': 'Offer',
              category: 'NEET Biology Coaching',
              priceCurrency: 'INR',
              price: '75000',
              availability: 'https://schema.org/InStock',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              reviewCount: '38',
              bestRating: '5',
            },
          }),
        }}
      />

      {/* Breadcrumbs */}
      <BreadcrumbContainer className="pt-4">
        <Breadcrumbs />
      </BreadcrumbContainer>

      {/* Hero Section - Cerebrum Brand Colors */}
      <section
        id="hero"
        className="bg-gradient-to-br from-[#3d4d3d] via-[#4a5d4a] to-[#5a6d5a] text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#5a6d5a] rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              {/* Urgency Badge — rolling-week framing, no hardcoded month */}
              <div className="inline-flex items-center bg-yellow-400/20 backdrop-blur-sm text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-yellow-400/30">
                <AlertCircle className="w-4 h-4 mr-2" />
                Next batch starts {batchStartDay} · only {seatsRemaining} seats left
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Class 11th Biology
                <span className="block text-green-300">NEET Foundation Course</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-200 mb-3 leading-relaxed">
                AIIMS-trained faculty. Strong NCERT foundation. Board + NEET dual prep.
              </p>

              {/* Coverage statement — answers the breadth question without linking
                  out (visitor stays locked on this page). Plain text, intentionally
                  small + secondary so it doesn't compete with the H1. */}
              <p className="text-xs sm:text-sm text-gray-300/80 mb-6 leading-relaxed">
                Cerebrum runs Biology for Class&nbsp;9–12, NEET droppers, Boards, and Olympiad
                tracks.{' '}
                <strong className="text-white">
                  Offline at South&nbsp;Delhi · Gurugram · Faridabad
                </strong>
                , plus live online for everyone else. This page is for Class&nbsp;11.
              </p>

              {/* Quick-context capture — selecting chips updates the WhatsApp
                  message so the conversation starts with full context. No
                  multi-field form friction; no second page. */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/15 rounded-2xl p-4 sm:p-5 mb-6">
                <div className="text-[11px] sm:text-xs uppercase tracking-wide text-green-200 font-semibold mb-3">
                  Tell us in 2 taps · we&apos;ll WhatsApp you back with the right batch
                </div>

                <div className="mb-3">
                  <div className="text-xs text-gray-300 mb-1.5">Your goal</div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {(['NEET', 'Boards', 'Olympiad', 'All-round'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTrack(t)}
                        className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition ${
                          track === t
                            ? 'bg-yellow-400 text-gray-900'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs text-gray-300 mb-1.5">Mode</div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {(['Online', 'Offline', 'Either'] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMode(m)}
                        className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition ${
                          mode === m
                            ? 'bg-yellow-400 text-gray-900'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {m === 'Offline' ? 'Offline (Delhi NCR)' : m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary CTA — sends WhatsApp with full context based on chip
                    selections above. WhatsApp brand green = launches WhatsApp. */}
                <button
                  onClick={() => sendContextWhatsApp('class-11-hero-context')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 sm:py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-base sm:text-lg rounded-xl shadow-lg transition min-h-[56px] touch-manipulation"
                >
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  Talk on WhatsApp — context attached
                </button>

                {/* Secondary CTA — Call. Forest green to match brand. */}
                <a
                  href="tel:+918826444334"
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 py-2.5 sm:py-3 border border-white/30 hover:bg-white/10 text-white font-medium text-sm rounded-xl transition min-h-[44px] touch-manipulation"
                >
                  Or call +91 88264 44334
                </a>
              </div>
            </div>

            {/* Course Highlights Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-yellow-400" />
                Why Start in Class 11?
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#5a6d5a] p-2 rounded-lg mr-4">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">2-Year Head Start</h4>
                    <p className="text-gray-300 text-sm">More time = better understanding</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-600 p-2 rounded-lg mr-4">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">55% Syllabus in Class 11</h4>
                    <p className="text-gray-300 text-sm">Get half the NEET prep done early</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600 p-2 rounded-lg mr-4">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Stress-Free Class 12</h4>
                    <p className="text-gray-300 text-sm">Focus only on new chapters</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-600 p-2 rounded-lg mr-4">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Foundation that holds</h4>
                    <p className="text-gray-300 text-sm">
                      Most Class-11 starters carry into Class 12 with a real lead
                    </p>
                  </div>
                </div>
              </div>

              {/* Batch Info */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Next batch: {batchStartDay}</span>
                  <span className="text-sm font-semibold text-yellow-400">
                    {seatsRemaining} seats left
                  </span>
                </div>
                <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${(batchInfo.filledSeats / batchInfo.totalSeats) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline lead-form section + Free NEET Tools section removed —
          the hero already captures full context to WhatsApp, and the tools
          section linked outside this page (against the founder direction
          to keep every visitor locked here on a single WhatsApp path).
          Sections re-enable once we add proper in-page tool surfaces. */}

      {/* Course Features */}
      <section id="features" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Cerebrum for Class 11 NEET Biology?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cerebrum offers the perfect blend of board exam preparation and NEET foundation
              building, with AIIMS-trained faculty, small batches of 25 students, and a structured
              curriculum that covers 55% of the NEET syllabus in Class 11 itself.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-[#4a5d4a]"
                >
                  <div className="bg-[#e8ede8] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#3d4d3d]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-12 sm:py-16 bg-[#3d4d3d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Our Class 11 Success Record</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {successStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
              >
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-sm text-gray-300">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Is Covered in the Class 11 NEET Biology Syllabus?
            </h2>
            <p className="text-gray-600">
              The Class 11 NEET Biology syllabus covers five units -- from Diversity in Living World
              to Human Physiology -- with structured learning across all NCERT chapters and
              NEET-weighted practice.
            </p>
          </div>

          <div className="space-y-4">
            {curriculum.map((unit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-[#4a5d4a]"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{unit.title}</h3>
                  <div className="flex items-center gap-3 mt-2 md:mt-0">
                    <span className="bg-[#e8ede8] text-[#3d4d3d] px-3 py-1 rounded-full text-sm font-medium">
                      NEET: {unit.neetWeightage}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {unit.duration}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {unit.topics.map((topic, topicIndex) => (
                    <span
                      key={topicIndex}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm flex items-center"
                    >
                      <BookOpen className="w-3 h-3 mr-1 text-[#4a5d4a]" />
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Curriculum aligned with NCERT Class 11 Biology (2024-25 edition) and NTA NEET-UG
            syllabus. Sources: ncert.nic.in, nta.ac.in
          </p>
        </div>
      </section>

      {/* Faculty Section */}
      <section id="faculty" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Who Teaches NEET Biology at Cerebrum?
            </h2>
            <p className="text-gray-600">
              Our faculty are AIIMS and top medical college alumni with 15+ years of NEET teaching
              experience. They have cracked NEET themselves and know exactly what it takes to help
              students succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {facultyMembers.map((faculty, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg text-center border border-gray-100"
              >
                <div className="w-20 h-20 bg-[#e8ede8] rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-10 h-10 text-[#3d4d3d]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{faculty.name}</h3>
                <p className="text-[#4a5d4a] font-medium text-sm mb-2">{faculty.qualification}</p>
                <p className="text-gray-600 text-sm mb-2">{faculty.experience}</p>
                <span className="inline-block bg-[#e8ede8] text-[#3d4d3d] px-3 py-1 rounded-full text-sm">
                  {faculty.specialty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Students&apos; Success Stories
            </h2>
            <p className="text-gray-600">
              Hear from students who started their NEET journey in Class 11
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#4a5d4a] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-[#4a5d4a] text-sm font-medium">{testimonial.score}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">&ldquo;{testimonial.testimonial}&rdquo;</p>
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">{testimonial.college}</span>
                </div>
                <div className="flex mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Invest in Your NEET Success
            </h2>
            <p className="text-gray-400">Start your 2-year NEET preparation journey today</p>
          </div>

          <div className="bg-gradient-to-br from-[#4a5d4a] to-[#3d4d3d] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#5a6d5a]/30 rounded-full blur-3xl" />

            <div className="relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                  Class 11 Biology — Complete 1-year course
                </h3>
                <p className="text-gray-300">NCERT foundation · NEET + Board dual prep</p>
              </div>

              <div className="text-center mb-8">
                <DualCurrencyPrice
                  inr={75000}
                  className="text-5xl sm:text-6xl font-bold"
                  secondaryClassName="text-gray-300/80 text-base font-normal mt-2"
                />
                <p className="text-gray-300 mt-2">
                  For the year — <span className="hidden md:inline">Indian families: </span>EMI from{' '}
                  {formatINR(6250)}/month
                </p>
                <p className="text-gray-300/80 text-sm mt-1">
                  Merit scholarships available. Free demo class first — no commitment.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  'Complete NCERT coverage',
                  'AIIMS-trained faculty',
                  'Live + recorded classes',
                  'Weekly tests & analysis',
                  'Doubt resolution sessions',
                  'Study materials included',
                  'Board exam preparation',
                  'Parent-teacher meetings',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => sendContextWhatsApp('class-11-pricing-demo')}
                  className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 text-center inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Book free demo on WhatsApp
                </button>
                <button
                  onClick={() => sendContextWhatsApp('class-11-pricing-enrol')}
                  className="flex-1 bg-white text-[#3d4d3d] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 text-center"
                >
                  Talk about enrolling
                </button>
              </div>

              {/* Urgency */}
              <div className="text-center mt-6">
                <div className="inline-flex items-center bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Only {seatsRemaining} seats left · next batch starts {batchStartDay}
                </div>
              </div>
            </div>
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
                  We understand your concerns about your child&apos;s NEET preparation. Chat
                  directly with our counselors to understand fee structure, batch timings, and how
                  we track student progress.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button
                    onClick={() =>
                      trackAndOpenWhatsApp({
                        source: 'class-11-parent-cta',
                        message: `Hi! I am a parent enquiring about Class 11 Biology coaching for my child. Track interest: ${track}. Preferred mode: ${mode === 'Offline' ? 'Offline (Delhi NCR)' : mode}. Please share fee structure, batch timings, and how progress is tracked.`,
                        campaign: 'parent-engagement',
                      })
                    }
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:shadow-green-500/30 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat as parent on WhatsApp
                  </button>
                  <a
                    href="tel:+918826444334"
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-5 rounded-lg border border-gray-300 shadow-sm transition-all duration-300"
                  >
                    <Users className="h-5 w-5" />
                    Or call +91 88264 44334
                  </a>
                </div>
              </div>
              <div className="hidden md:block text-6xl">👨‍👩‍👧‍👦</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Is this course suitable for CBSE/ICSE/State board students?',
                a: 'Yes, our Class 11th Biology course covers NCERT curriculum which is the foundation for all boards. We provide additional support for board-specific requirements.',
              },
              {
                q: 'How does starting in Class 11 help for NEET?',
                a: 'Class 11 covers 55% of NEET Biology syllabus. Starting early gives you 2 years to build strong concepts, reducing Class 12 stress and allowing more revision time.',
              },
              {
                q: 'What are the batch timings?',
                a: 'Classes are 3 times per week (2 hours each). We offer Morning (8-10 AM), Evening (5-7 PM), and Weekend batches.',
              },
              {
                q: 'Can I switch to Intensive course later?',
                a: 'Yes! Class 11 students get priority admission to our Intensive NEET Biology course for Class 12 with special discounts.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button — sits above the mobile bottom-nav (~80px
          tall) so it isn't clipped on phones. Sends the same context-rich
          message the hero quick-context block builds, so the chat opens with
          full lead context regardless of which surface the visitor tapped. */}
      {showFloatingCTA && (
        <div className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-50">
          <button
            onClick={() => sendContextWhatsApp('class-11-floating')}
            className="bg-[#25D366] hover:bg-[#20BD5A] text-white p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-110 cursor-pointer min-w-[48px] min-h-[48px]"
            aria-label="Chat with us on WhatsApp"
          >
            <MessageCircle className="w-7 h-7" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Bottom CTA Bar - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-40">
        <div className="flex gap-3">
          <button
            onClick={async () => {
              await trackAndOpenWhatsApp({
                source: 'class-11-mobile-cta',
                message: WHATSAPP_MESSAGES.courseEnquiry,
                campaign: 'class-11-course',
              })
            }}
            className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center cursor-pointer min-h-[48px]"
            aria-label="Contact us on WhatsApp for Class 11 course enquiry"
          >
            <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
            WhatsApp
          </button>
          <button
            onClick={() =>
              trackAndOpenWhatsApp({
                source: 'class-11-demo',
                message:
                  'Hi! I want to book a FREE demo class for Class 11th NEET Biology. Please share available timings.',
                campaign: 'class-11',
              })
            }
            className="flex-1 bg-[#3d4d3d] text-white py-3 rounded-xl font-semibold flex items-center justify-center min-h-[48px]"
            aria-label="Book a free demo class for Class 11 Biology course"
          >
            Book Demo
          </button>
        </div>
      </div>

      {/* VisitOurCenters cross-link block removed — per founder direction
          this page keeps every visitor locked here on a single WhatsApp path.
          Centre information is included in the hero coverage statement
          (South Delhi · Gurugram · Faridabad) without an outbound link. */}

      {/* Bottom padding for mobile CTA */}
      <div className="h-20 md:hidden" />
    </div>
  )
}
