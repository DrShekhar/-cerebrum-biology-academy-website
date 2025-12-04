'use client'

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
  Microscope,
  Leaf,
  Heart,
  Dna,
  Lightbulb,
  ArrowRight,
  Trophy,
  GraduationCap,
  Rocket,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PhotoGallerySection } from '@/components/layout/PhotoGallerySection'
import { ParentTestimonialsSection } from '@/components/layout/ParentTestimonialsSection'
import Link from 'next/link'

export default function Class10FoundationPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_class_10_foundation', {
        event_category: 'conversion',
        event_label: 'class_10_foundation_landing_page',
        value: 1,
      })
    }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Should I start NEET preparation in Class 10 or after boards?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Both options work! Current Class 10 students can prepare alongside boards with dual preparation strategy. Students who passed Class 10 can start with full focus. Both paths offer 3-year preparation timeline for NEET 2027.',
        },
      },
      {
        '@type': 'Question',
        name: 'What topics are covered in Class 10 NEET foundation course?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Complete NCERT Class 10 Biology including Life Processes (Nutrition, Respiration, Transportation, Excretion), Control and Coordination, How Do Organisms Reproduce, Heredity and Evolution, Our Environment, and Management of Natural Resources with NEET-oriented teaching.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does the Class 10 foundation program last?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Class 10 foundation program runs for one full academic year, providing 3 years total preparation time from Class 10 to NEET 2027. This timeline offers perfect balance - not too early, not too late.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the fee for Class 10 NEET foundation course?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The annual fee is ₹24,000 for comprehensive Class 10 NEET foundation course including board exam preparation, NEET concept building, live classes, study materials, and regular assessments.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I prepare for Class 10 boards and NEET together?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our dual preparation strategy helps you excel in Class 10 board exams while building NEET foundation simultaneously. We align teaching with board syllabus and add NEET concepts gradually without overwhelming students.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which Class 10 biology topics are important for NEET?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Life Processes, How Do Organisms Reproduce, and Heredity and Evolution are crucial NEET topics with maximum relevance. These Class 10 concepts form the foundation for advanced Class 11-12 biology and NEET preparation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the Class 10 foundation course online or offline?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Class 10 NEET foundation course is available online, providing flexibility for students to learn from anywhere with interactive live classes, recorded sessions, and personalized doubt clearing support.',
        },
      },
    ],
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Class 10 Biology Foundation Course for NEET 2027',
    description:
      'Perfect timing to begin your NEET journey! Class 10 biology foundation program offers 3-year structured pathway to NEET success. Complete NCERT Class 10 Biology coverage aligned with board exams, plus additional NEET foundation topics. Available for current Class 10 students and those who passed boards.',
    provider: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://cerebrumbiologyacademy.com',
    },
    courseMode: 'online',
    educationalLevel: 'Class 10',
    timeRequired: 'P3Y',
    offers: {
      '@type': 'Offer',
      price: '24000',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      duration: 'P1Y',
    },
  }

  const class10Curriculum = [
    {
      unit: 'Unit 1: Life Processes',
      chapters: [
        'Life Processes - Nutrition',
        'Life Processes - Respiration',
        'Life Processes - Transportation',
        'Life Processes - Excretion',
      ],
      icon: Heart,
      difficulty: 'Foundation',
      neetRelevance: 'Very High',
    },
    {
      unit: 'Unit 2: Control and Coordination',
      chapters: ['How Do Organisms Reproduce?', 'Heredity and Evolution'],
      icon: Dna,
      difficulty: 'Intermediate',
      neetRelevance: 'Maximum',
    },
    {
      unit: 'Unit 3: Natural Resources',
      chapters: ['Our Environment', 'Management of Natural Resources'],
      icon: Leaf,
      difficulty: 'Foundation',
      neetRelevance: 'High',
    },
  ]

  const learningFeatures = [
    {
      title: 'Board + NEET Focus',
      description: 'Dual preparation strategy for Class 10 boards and NEET foundation building',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Perfect Timing',
      description: '3-year NEET preparation timeline starting from Class 10 or after boards',
      icon: Clock,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'NEET Foundation Topics',
      description: 'Class 10 syllabus + additional NEET foundation concepts and problem solving',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Early Bird Advantage',
      description: 'Start before the competition and build unbeatable competitive edge',
      icon: Rocket,
      color: 'from-orange-500 to-red-500',
    },
  ]

  const successMetrics = [
    { label: '3 Years', sublabel: 'Preparation Timeline', icon: Clock },
    { label: '92%', sublabel: 'Board Pass Rate', icon: Award },
    { label: '1.2K+', sublabel: 'Class 10 Students', icon: Users },
    { label: 'NEET 2027', sublabel: 'Target Year', icon: Trophy },
  ]

  const programOptions = [
    {
      title: 'Current Class 10 Students',
      description:
        'Study alongside your board preparation. Complete both Class 10 boards and NEET foundation simultaneously.',
      benefits: [
        'Dual preparation strategy',
        'Board exam focused teaching',
        'NEET concepts introduced gradually',
        'Reduced future pressure',
      ],
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Class 10 Passed Students',
      description:
        'Perfect time to start! Just finished boards? Jump straight into NEET foundation with full focus.',
      benefits: [
        '3-year dedicated preparation',
        'Fresh mind, strong motivation',
        'Build from Class 10 concepts',
        'Early bird batch advantage',
      ],
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-500',
    },
  ]

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
                <BookOpen className="w-5 h-5 mr-2" />
                Class 10 Biology Foundation Program
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Class 10 Biology Foundation Course -{' '}
                <span className="text-yellow-300">Perfect NEET Head Start</span>
              </h1>

              <p className="text-xl md:text-2xl opacity-90 mb-8">
                The ideal time to begin your NEET journey! Whether you're in Class 10 or just
                finished boards, our foundation program gives you a 3-year structured pathway to
                NEET 2027 success.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>

                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-emerald-600"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Check Batch Options
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {successMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <metric.icon className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                    <div className="text-lg font-bold">{metric.label}</div>
                    <div className="text-xs opacity-80">{metric.sublabel}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Timeline Highlight */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Your 3-Year Success Timeline
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start bg-white/10 rounded-lg p-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-lg font-bold">1</span>
                    </div>
                    <div>
                      <div className="font-semibold">Year 1: Foundation Building</div>
                      <div className="text-sm opacity-80">
                        Class 10 + NEET foundation concepts, basic problem solving, habit formation
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start bg-white/10 rounded-lg p-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-lg font-bold">2</span>
                    </div>
                    <div>
                      <div className="font-semibold">Year 2: Intensive Learning</div>
                      <div className="text-sm opacity-80">
                        Complete Class 11 syllabus with NEET focus, regular testing, concept mastery
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start bg-white/10 rounded-lg p-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-lg font-bold">3</span>
                    </div>
                    <div>
                      <div className="font-semibold">Year 3: NEET Mastery</div>
                      <div className="text-sm opacity-80">
                        Class 12 + Full NEET preparation, mock tests, revision, and NEET 2027
                        success!
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <Link href="/neet-foundation-course">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white text-white hover:bg-white hover:text-emerald-600"
                    >
                      View Complete Foundation Program
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Options - Current vs Passed */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Choose Your Starting Point
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer specialized batches for both current Class 10 students and those who have
              completed their boards. Both paths lead to NEET success!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {programOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-lg flex items-center justify-center mb-6`}
                >
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{option.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>

                <div className="space-y-3">
                  {option.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleDemoBooking}
                  className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-600"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Join This Batch
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Class 10 is the Perfect Time to Start
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Class 10 foundation offers the ideal balance - not too early, not too late. Start your
              NEET journey with confidence and clarity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {learningFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Coverage */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Class 10 Biology Syllabus + NEET Foundation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete NCERT Class 10 Biology coverage aligned with board exams, plus additional
              NEET foundation topics for head start advantage.
            </p>
          </motion.div>

          <div className="space-y-6">
            {class10Curriculum.map((unit, index) => (
              <motion.div
                key={unit.unit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 border border-emerald-200 shadow-md"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start lg:items-center mb-4 lg:mb-0">
                    <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <unit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{unit.unit}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {unit.chapters.map((chapter, chapterIndex) => (
                          <span
                            key={chapterIndex}
                            className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {chapter}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Level</div>
                      <div
                        className={`font-bold ${
                          unit.difficulty === 'Foundation'
                            ? 'text-green-600'
                            : unit.difficulty === 'Intermediate'
                              ? 'text-yellow-600'
                              : 'text-red-600'
                        }`}
                      >
                        {unit.difficulty}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">NEET Relevance</div>
                      <div
                        className={`font-bold ${
                          unit.neetRelevance === 'Maximum'
                            ? 'text-red-600'
                            : unit.neetRelevance === 'Very High'
                              ? 'text-orange-600'
                              : 'text-purple-600'
                        }`}
                      >
                        {unit.neetRelevance}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Preview Topics
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Class 10 Concepts Form the Foundation for NEET Success
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Life Processes, Reproduction, and Heredity are crucial NEET topics. Master them now
                and build your competitive advantage!
              </p>
              <Button
                variant="primary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-gradient-to-r from-emerald-600 to-teal-600"
              >
                <Zap className="w-5 h-5 mr-2" />
                Join Early Bird Batch - Limited Seats!
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Parent Testimonials */}
      <ParentTestimonialsSection />

      {/* Photo Gallery */}
      <PhotoGallerySection showFeaturedOnly={true} maxPhotos={6} />

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your NEET Journey at the Perfect Time
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 1,200+ Class 10 students who chose the smart path - early start, systematic
              preparation, and guaranteed success. Limited seats in early bird batches!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-yellow-500 text-black hover:bg-yellow-400"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo Class
              </Button>

              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-emerald-600"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Check Seat Availability
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 text-sm opacity-90">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>1,200+ Class 10 Students</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                <span>3-Year Preparation</span>
              </div>
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                <span>NEET 2027 Ready</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
