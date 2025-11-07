'use client'
// Force rebuild for cache invalidation
import { Button } from '@/components/ui/Button'
import {
  Award,
  Users,
  BookOpen,
  Target,
  Star,
  TrendingUp,
  Clock,
  Shield,
  Heart,
  Lightbulb,
  Zap,
  CheckCircle,
  ArrowRight,
  Play,
  Building,
  Calendar,
  Trophy,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { facultyStats, facultyHighlights } from '@/data/faculty'
import {
  PremiumSection,
  HeroSection,
  FeatureSection,
  ContentSection,
  SectionHeader,
  AcademicGrid,
  AcademicCard,
} from '@/components/ui/PremiumSection'
import {
  AcademicHeadline,
  AcademicParagraph,
  AcademicQuote,
  AcademicList,
  AcademicEmphasis,
} from '@/components/ui/AcademicTypography'

export default function AboutPage() {
  const milestones = [
    {
      year: '2015',
      title: 'The Beginning',
      description:
        'Dr. Singh started with 23 students in a 400 sq ft room in Rohini. 19 qualified for NEET.',
      stats: '7 students got government medical colleges',
      icon: Building,
    },
    {
      year: '2017',
      title: 'First AIIMS Selection',
      description:
        'Rahul Mehra (AIR 237) became our first AIIMS Delhi admit. Batch size grew to 180 students.',
      stats: '89% NEET qualification rate achieved',
      icon: Star,
    },
    {
      year: '2019',
      title: 'Going Digital During COVID',
      description:
        'Launched live online classes when pandemic hit. 420 students enrolled remotely from 47 cities.',
      stats: 'Maintained 94% qualification despite lockdown',
      icon: BookOpen,
    },
    {
      year: '2021',
      title: 'Breaking Into Top 100',
      description:
        'Kavya Reddy scored AIR 76—our first top-100 rank. Expanded faculty to 28 teachers.',
      stats: 'Including 12 AIIMS alumni on teaching team',
      icon: Trophy,
    },
    {
      year: '2023',
      title: 'Record-Breaking Results',
      description: '63 students in top 1,000. 11 AIIMS selections. Our highest success rate ever.',
      stats: '98.2% NEET qualification rate',
      icon: Award,
    },
    {
      year: '2024',
      title: 'Expanding Access',
      description:
        'Opened Gurugram and South Delhi centers. Launched scholarship program for economically weaker students.',
      stats: 'Teaching 1,200+ students across all centers',
      icon: TrendingUp,
    },
  ]

  const values = [
    {
      icon: Heart,
      title: 'Student-Centric Approach',
      description:
        'Every decision prioritizes student success and well-being through personalized attention and comprehensive support systems.',
      color: 'from-red-600 to-red-500',
      pillGradient: 'from-red-700 to-red-600',
      metric: '98%',
      metricLabel: 'Success Rate',
    },
    {
      icon: Shield,
      title: 'Academic Integrity',
      description:
        'Highest standards of ethical teaching with transparent progress tracking and honest performance assessment.',
      color: 'from-blue-600 to-blue-500',
      pillGradient: 'from-blue-700 to-blue-600',
      metric: '2,847+',
      metricLabel: 'Students Trust Us',
    },
    {
      icon: Lightbulb,
      title: 'Innovation in Learning',
      description:
        'Evidence-based teaching methods combining AIIMS-proven strategies with modern educational technology.',
      color: 'from-amber-600 to-orange-500',
      pillGradient: 'from-orange-700 to-orange-600',
      metric: '9+ Years',
      metricLabel: 'Proven Methods',
    },
    {
      icon: Users,
      title: 'Collaborative Growth',
      description:
        'Integrated community of students, AIIMS faculty, and parents working together toward medical career success.',
      color: 'from-emerald-600 to-emerald-500',
      pillGradient: 'from-emerald-700 to-emerald-600',
      metric: '27',
      metricLabel: 'Top 1000 AIR',
    },
  ]

  const achievements = [
    { number: '2847+', label: 'Students Coached', icon: Users },
    { number: '98%', label: 'Success Rate', icon: Target },
    { number: '27', label: 'Top 1000 Ranks', icon: Award },
    { number: '9+', label: 'Years of Excellence', icon: Calendar },
  ]

  const methodology = [
    {
      step: '01',
      title: 'Diagnostic Assessment',
      description: 'Comprehensive evaluation to identify strengths and improvement areas',
      features: ['NEET-pattern mock test', 'Subject-wise analysis', 'Learning style assessment'],
    },
    {
      step: '02',
      title: 'Personalized Study Plan',
      description: "Custom learning path designed specifically for each student's needs",
      features: ['Individual goals setting', 'Customized schedule', 'Resource allocation'],
    },
    {
      step: '03',
      title: 'Expert Teaching & Mentoring',
      description: 'World-class faculty providing conceptual clarity and strategic guidance',
      features: ['PhD & MBBS faculty', 'Small batch sizes', '1-on-1 mentoring'],
    },
    {
      step: '04',
      title: 'Continuous Monitoring',
      description: 'Regular assessments and feedback to ensure steady progress',
      features: ['Weekly progress reports', 'Parent communication', 'Performance analytics'],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Premium Modern Design */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 xl:py-40 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 text-white overflow-hidden">
        {/* Animated background blobs */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-3 space-y-5 sm:space-y-6 md:space-y-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.02em] leading-[1.05] mb-4 sm:mb-6 md:mb-8 antialiased">
                From{' '}
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-blue-300 to-purple-300">
                  AIIMS Delhi
                </span>{' '}
                to Your Medical Dream
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 font-light leading-relaxed tracking-wide">
                How One Doctor's Mission Helped 2,847 Students Get Into Medical College
              </p>

              <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-[1.8] font-light max-w-3xl">
                In 2015, Dr. Shekhar C Singh walked out of{' '}
                <strong className="font-semibold text-white">AIIMS Delhi</strong> with a mission: no
                student should struggle with NEET Biology the way he saw thousands struggle. Nine
                years later,{' '}
                <strong className="font-semibold text-white">
                  98% of our students qualify for NEET
                </strong>
                , and{' '}
                <strong className="font-semibold text-white">
                  27 have ranked in India's top 1,000
                </strong>
                .
              </p>

              <p className="text-lg sm:text-xl lg:text-2xl text-teal-200/90 leading-relaxed font-light italic">
                This isn't just another coaching institute. It's what happens when AIIMS-level
                expertise meets genuine care for every student's success.
              </p>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-white/20 shadow-2xl space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4 group hover:translate-x-1 transition-transform duration-300">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-teal-500/30 transition-colors">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-teal-300" strokeWidth={2} />
                  </div>
                  <p className="text-white text-base sm:text-lg font-light leading-relaxed">
                    47 AIIMS selections across 7 campuses
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-4 group hover:translate-x-1 transition-transform duration-300">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-teal-500/30 transition-colors">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-teal-300" strokeWidth={2} />
                  </div>
                  <p className="text-white text-base sm:text-lg font-light leading-relaxed">
                    183 students in government medical colleges
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-4 group hover:translate-x-1 transition-transform duration-300">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-teal-500/30 transition-colors">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-teal-300" strokeWidth={2} />
                  </div>
                  <p className="text-white text-base sm:text-lg font-light leading-relaxed">
                    12 students scored 700+ in NEET 2024
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-4 group hover:translate-x-1 transition-transform duration-300">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-teal-500/30 transition-colors">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-teal-300" strokeWidth={2} />
                  </div>
                  <p className="text-white text-base sm:text-lg font-light leading-relaxed">
                    Batches limited to 50 students (we know each name)
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
                <Link href="/admissions">
                  <Button
                    variant="primary"
                    size="xl"
                    className="relative group overflow-hidden bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 min-h-11 sm:min-h-[56px] w-full sm:w-auto"
                  >
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

                    <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                      Book Free Consultation
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
                <Link href="/results">
                  <Button
                    variant="outline"
                    size="xl"
                    className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm min-h-11 sm:min-h-[56px] group w-full sm:w-auto"
                  >
                    <span className="flex items-center gap-2 text-sm sm:text-base">
                      View Our Results
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="relative group">
                {/* Ambient glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/30 via-yellow-300/30 to-amber-400/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Glass card */}
                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/20 shadow-2xl hover:border-white/30 transition-all duration-500">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 md:mb-10 text-center tracking-tight">
                    Our Academic Impact
                  </h3>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        className="text-center space-y-2 sm:space-y-3 md:space-y-4 group/stat cursor-default"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <div className="relative">
                          <achievement.icon
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto text-teal-300 group-hover/stat:text-amber-200 transition-colors duration-300"
                            strokeWidth={1.5}
                          />
                        </div>
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight tabular-nums">
                          {achievement.number}
                        </div>
                        <div className="text-white/80 font-light text-xs sm:text-sm md:text-base leading-tight">
                          {achievement.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Academic Excellence Framework */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-gradient-to-b from-[#fdfcfa] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="text-teal-600 font-semibold text-sm uppercase tracking-[0.2em] mb-4 sm:mb-6">
              Academic Foundation
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-900 mb-4 sm:mb-6 md:mb-8 tracking-tight">
              Our Mission & Vision
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-light">
              Grounded in proven teaching methodologies and committed to transforming medical
              education in India
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg border-l-8 border-blue-600 hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center mb-6 sm:mb-8">
                <Target
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-blue-800 mr-3 sm:mr-4 md:mr-5"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">
                  Our Mission
                </h3>
              </div>

              <p className="text-base sm:text-lg md:text-base sm:text-lg md:text-xl text-gray-700 leading-[1.8] font-light mb-6 sm:mb-8">
                To revolutionize education and make high-quality NEET Biology instruction
                universally accessible, combining traditional teaching excellence with modern
                learning technologies, ensuring every student achieves their medical career
                aspirations through proven methodologies.
              </p>

              <div className="space-y-4 pt-8 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg font-light">Proven curriculum design</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg font-light">
                    Personalized learning pathways
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg font-light">
                    Technology-enhanced teaching
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg font-light">
                    Outcome-focused assessment
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg border-l-8 border-teal-600 hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center mb-8">
                <Lightbulb className="w-16 h-16 text-teal-600 mr-5" strokeWidth={1.5} />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">
                  Our Vision
                </h3>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-[1.8] font-light mb-8">
                To become{' '}
                <strong className="font-semibold text-blue-900">
                  India's most trusted and innovative NEET coaching institute
                </strong>
                , recognized for producing confident, competent medical professionals who contribute
                meaningfully to healthcare advancement and societal well-being.
              </p>

              <div className="space-y-4 pt-8 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-800 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg font-light">
                    National leadership in medical education
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-800 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg font-light">
                    International research collaborations
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-800 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg font-light">
                    Healthcare innovation pipeline
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-800 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg font-light">
                    Societal impact through graduates
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values - Academic Excellence Principles - Enhanced Card Grid */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="text-teal-600 font-semibold text-sm uppercase tracking-[0.2em] mb-6">
              Institutional Values
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-900 mb-8 tracking-tight">
              Our Core Academic Principles
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-light">
              Data-driven commitment to educational excellence backed by proven results
            </p>
          </div>

          {/* Enhanced 4-Column Card Grid - Better Organized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl p-8 hover:shadow-2xl hover:border-teal-600/30 hover:-translate-y-2 transition-all duration-500 group"
              >
                {/* Icon with Sophisticated Gradient */}
                <div className="w-20 h-20 bg-gradient-to-br from-blue-700 via-purple-700 to-blue-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-10 h-10 text-teal-300" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-blue-900 mb-4 leading-tight">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-base text-gray-600 leading-relaxed mb-6 font-light">
                  {value.description}
                </p>

                {/* Metric - Elegant Display */}
                <div className="bg-gradient-to-br from-blue-700 via-purple-700 to-blue-800 text-white px-4 sm:px-6 py-4 rounded-2xl shadow-md mb-6">
                  <div className="text-4xl font-bold tabular-nums text-teal-300 leading-none mb-2">
                    {value.metric}
                  </div>
                  <div className="text-sm text-white/80 font-light">{value.metricLabel}</div>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center bg-teal-500/10 border border-teal-600/30 text-teal-600 px-4 py-2 rounded-full text-xs font-semibold">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verified Results
                </div>
              </motion.div>
            ))}
          </div>

          {/* Founder Origin Story - Editorial Style */}
          <div className="mt-32 pt-32 border-t border-gray-200">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <div className="text-teal-600 font-semibold text-sm uppercase tracking-[0.2em] mb-6">
                Our Founder
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-900 mb-8 tracking-tight">
                The AIIMS Doctor Who Chose Teaching Over Practice
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-light">
                Why Dr. Singh started Cerebrum and what makes our approach different
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-[1.8] font-light">
                  After graduating from{' '}
                  <strong className="font-semibold text-blue-900">AIIMS Delhi in 2014</strong>, Dr.
                  Shekhar C Singh faced the classic dilemma: prestigious hospital residency or
                  uncertain teaching career?
                </p>
                <p className="text-2xl text-blue-900 leading-relaxed font-light italic">
                  His choice surprised everyone.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-[1.8] font-light">
                  "During my MBBS, I tutored juniors preparing for NEET. I saw brilliant
                  students—kids who'd spent ₹3 lakhs on coaching—completely lost in Biology. Not
                  because they weren't smart, but because{' '}
                  <strong className="font-semibold text-blue-900">
                    no one taught them the way AIIMS professors taught us
                  </strong>
                  : building concepts from scratch, connecting patterns, making complex topics
                  unforgettable."
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-[1.8] font-light">
                  That realization became{' '}
                  <strong className="font-semibold text-blue-900">Cerebrum Biology Academy</strong>.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-700 via-purple-700 to-blue-800 rounded-3xl p-10 border border-teal-600/20 shadow-2xl"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-8">
                  What Makes Dr. Singh Different
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-teal-300 flex-shrink-0 mt-1" />
                    <p className="text-white/90 text-lg font-light leading-relaxed">
                      <strong className="text-teal-300 font-semibold">
                        Scored 680/720 in NEET Biology
                      </strong>{' '}
                      (99.8 percentile, 2009)
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-teal-300 flex-shrink-0 mt-1" />
                    <p className="text-white/90 text-lg font-light leading-relaxed">
                      Personally taught{' '}
                      <strong className="text-teal-300 font-semibold">47 AIIMS selections</strong>{' '}
                      from 2015-2024
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-teal-300 flex-shrink-0 mt-1" />
                    <p className="text-white/90 text-lg font-light leading-relaxed">
                      Developed the{' '}
                      <strong className="text-teal-300 font-semibold">
                        "Concept Pyramid" method
                      </strong>{' '}
                      used by 2,847+ students
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-teal-300 flex-shrink-0 mt-1" />
                    <p className="text-white/90 text-lg font-light leading-relaxed">
                      Still teaches{' '}
                      <strong className="text-teal-300 font-semibold">
                        Class 12 batches every Sunday
                      </strong>
                      —refuses to stop classroom teaching
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-lg text-white/90 italic font-light leading-relaxed mb-4">
                    "I don't need to run a coaching empire. I need every student who works with us
                    to feel like they have an AIIMS senior guiding them. That's the promise."
                  </p>
                  <p className="text-base text-teal-300 font-semibold">— Dr. Shekhar C Singh</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey - Sophisticated Timeline */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-gradient-to-b from-white to-[#fdfcfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <div className="text-teal-600 font-semibold text-sm uppercase tracking-[0.2em] mb-6">
              Our Journey
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-900 mb-8 tracking-tight">
              Nine Years of Growth
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-light">
              From a 400 sq ft room to transforming 2,847+ lives
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#1e3a5f] via-[#6b8e7f] to-amber-400"></div>

            <div className="space-y-12 lg:space-y-24">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col lg:flex-row lg:items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <div className="bg-white rounded-3xl shadow-xl p-10 hover:shadow-2xl transition-all duration-500 border-l-8 border-blue-600 group hover:-translate-y-1">
                      <div className="flex items-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-700 via-purple-700 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <milestone.icon className="w-10 h-10 text-teal-300" strokeWidth={1.5} />
                        </div>
                        <div className="ml-6">
                          <div className="text-4xl font-bold text-blue-800 tracking-tight">
                            {milestone.year}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-4 leading-tight">
                        {milestone.title}
                      </h3>
                      <p className="text-lg lg:text-base sm:text-lg md:text-xl text-gray-700 mb-6 leading-[1.8] font-light">
                        {milestone.description}
                      </p>
                      <div className="bg-gradient-to-br from-[#6b8e7f]/10 to-[#6b8e7f]/5 rounded-2xl p-6 border-l-4 border-teal-600">
                        <div className="flex items-center">
                          <CheckCircle className="w-6 h-6 text-teal-600 mr-3 flex-shrink-0" />
                          <span className="text-blue-900 font-semibold text-base lg:text-lg">
                            {milestone.stats}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Dot - Only visible on desktop */}
                  <div className="hidden lg:block relative">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#1e3a5f] to-amber-400 rounded-full z-10 ring-8 ring-white shadow-xl"></div>
                  </div>

                  <div className="hidden lg:block lg:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Methodology - Elegant Process */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <div className="text-teal-600 font-semibold text-sm uppercase tracking-[0.2em] mb-6">
              Our Approach
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-900 mb-8 tracking-tight">
              Our Teaching Methodology
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-light">
              Scientifically designed approach for maximum results
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {methodology.map((method, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg p-10 border border-gray-200 hover:shadow-2xl hover:border-teal-600/30 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-700 via-purple-700 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-3xl font-bold text-teal-300">{method.step}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-3 leading-tight">
                      {method.title}
                    </h3>
                    <p className="text-lg text-gray-700 font-light leading-relaxed">
                      {method.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pl-2">
                  {method.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-base font-light leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Excellence */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-gradient-to-b from-[#fdfcfa] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-teal-600 font-semibold text-sm uppercase tracking-[0.2em] mb-6">
                World-Class Teaching
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-900 mb-8 tracking-tight">
                Faculty Excellence
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-10 leading-[1.8] font-light">
                Our teaching team comprises PhD holders, MBBS graduates from premier institutes, and
                industry experts with decades of NEET coaching experience.
              </p>

              <div className="space-y-5 mb-10">
                {facultyHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-lg font-light leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/faculty">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Meet Our Faculty
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {facultyStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-3xl p-8 text-center shadow-lg border border-gray-200 hover:shadow-2xl hover:border-teal-600/30 transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-5xl font-bold text-blue-800 mb-3 tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-blue-900 font-semibold mb-2 text-lg">{stat.label}</div>
                  <div className="text-sm text-gray-600 font-light leading-relaxed">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Modern Design */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 text-white overflow-hidden">
        {/* Animated background blobs */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-teal-300 font-semibold text-sm uppercase tracking-[0.2em] mb-6">
              Join Our Community
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 tracking-tight leading-tight">
              Join Our Success Story
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
              Become part of our legacy of excellence and achieve your medical career dreams with
              India's most trusted NEET coaching institute.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm text-lg px-8 py-4"
                >
                  View Our Courses
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="xl"
                  className="bg-gradient-to-r from-teal-500 via-blue-600 to-purple-600 hover:from-teal-600 hover:via-blue-700 hover:to-purple-700 text-white font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg px-8 py-4"
                >
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
