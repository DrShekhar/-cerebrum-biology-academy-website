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
  Heart,
  Lightbulb,
  ArrowRight,
  Trophy,
  GraduationCap,
  Rocket,
  Zap,
  BadgeCheck,
  TrendingDown,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PhotoGallerySection } from '@/components/layout/PhotoGallerySection'
import { ParentTestimonialsSection } from '@/components/layout/ParentTestimonialsSection'
import Link from 'next/link'

export default function NeetFoundationCoursePage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_neet_foundation', {
        event_category: 'conversion',
        event_label: 'neet_foundation_course_landing_page',
        value: 1,
      })
    }
  }

  const successMetrics = [
    { label: '2K+', sublabel: 'Foundation Students', icon: Users },
    { label: '65%', sublabel: 'Higher Success Rate', icon: Trophy },
    { label: '3-4 Years', sublabel: 'Preparation Timeline', icon: Clock },
    { label: '95%', sublabel: 'Parent Satisfaction', icon: Star },
  ]

  const programFeatures = [
    {
      title: 'NCERT Foundation',
      description:
        'Complete coverage of Class 9-10 NCERT Biology with NEET perspective and concept building',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Age-Appropriate Teaching',
      description:
        'Specially designed pedagogy for young learners - making biology fun, interesting, and easy',
      icon: GraduationCap,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Early Bird Advantage',
      description:
        'Start before the competition, build stronger fundamentals, achieve higher success rates',
      icon: Rocket,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Stress-Free Learning',
      description:
        'Long preparation timeline eliminates pressure, allows holistic development alongside studies',
      icon: Heart,
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Expert Faculty',
      description:
        'Experienced teachers who understand young learners and make complex concepts simple',
      icon: Award,
      color: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Regular Assessment',
      description:
        'Periodic tests and feedback to track progress and identify areas needing attention',
      icon: TrendingUp,
      color: 'from-yellow-500 to-orange-500',
    },
  ]

  const comparisonData = {
    headers: ['Feature', 'Class 9 Program', 'Class 10 Program'],
    rows: [
      {
        feature: 'Duration',
        class9: '4 Years',
        class10: '3 Years',
        icon: Clock,
      },
      {
        feature: 'Target NEET Year',
        class9: 'NEET 2028-2029',
        class10: 'NEET 2027',
        icon: Target,
      },
      {
        feature: 'Ideal For',
        class9: 'Current Class 9 students',
        class10: 'Class 10 / Class 10 Passed',
        icon: GraduationCap,
      },
      {
        feature: 'Weekly Time Commitment',
        class9: '3-4 hours',
        class10: '4-5 hours',
        icon: Clock,
      },
      {
        feature: 'Learning Pace',
        class9: 'Very Relaxed',
        class10: 'Moderate',
        icon: TrendingDown,
      },
      {
        feature: 'Concept Depth',
        class9: 'Maximum',
        class10: 'High',
        icon: Brain,
      },
      {
        feature: 'Pressure Level',
        class9: 'Minimal',
        class10: 'Low',
        icon: Heart,
      },
      {
        feature: 'Success Rate',
        class9: '68% NEET Success',
        class10: '62% NEET Success',
        icon: Trophy,
      },
    ],
  }

  const curriculumHighlights = [
    {
      phase: 'Foundation Phase',
      duration: 'Year 1',
      focus: 'Building Interest & Basics',
      topics: [
        'Complete NCERT Class 9/10 Biology',
        'Basic NEET concepts introduction',
        'Scientific thinking development',
        'Study habit formation',
      ],
      icon: BookOpen,
    },
    {
      phase: 'Strengthening Phase',
      duration: 'Year 2',
      focus: 'Deepening Understanding',
      topics: [
        'Class 11 NCERT with NEET focus',
        'Advanced concept building',
        'Problem-solving techniques',
        'Regular testing & assessment',
      ],
      icon: Brain,
    },
    {
      phase: 'Mastery Phase',
      duration: 'Year 3',
      focus: 'NEET Preparation',
      topics: [
        'Class 12 NCERT completion',
        'Full NEET syllabus coverage',
        'Mock tests & analysis',
        'Final revision & strategy',
      ],
      icon: Target,
    },
  ]

  const whyChooseFoundation = [
    {
      title: 'Research-Backed Approach',
      description:
        'Students starting from Class 9-10 show 65% higher NEET success rate - proven by analysis of 10,000+ students.',
      stat: '65%',
      statLabel: 'Higher Success',
    },
    {
      title: 'Reduced Academic Pressure',
      description:
        'Spreading preparation over 3-4 years eliminates last-minute stress and allows balanced learning.',
      stat: 'Zero',
      statLabel: 'Burnout Risk',
    },
    {
      title: 'Strong Fundamentals',
      description:
        'More time means deeper understanding, better retention, and crystal-clear concepts for NEET.',
      stat: '100%',
      statLabel: 'Concept Clarity',
    },
    {
      title: 'Competitive Edge',
      description:
        'While others rush in Class 11-12, foundation students are already ahead with confidence and preparation.',
      stat: '2-3x',
      statLabel: 'Advantage',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
                <Rocket className="w-5 h-5 mr-2" />
                Complete NEET Foundation Program
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                NEET Biology Foundation Program -{' '}
                <span className="text-yellow-300">Class 9 & 10</span>
              </h1>

              <p className="text-xl md:text-2xl opacity-90 mb-8">
                Give your child the ultimate competitive advantage with our comprehensive NEET
                foundation courses. Start early, learn systematically, and achieve medical career
                success with 65% higher success rate!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  variant="secondary_cta"
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
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Download Complete Brochure
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {successMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  >
                    <metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                    <div className="text-2xl font-bold">{metric.label}</div>
                    <div className="text-sm opacity-80">{metric.sublabel}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Foundation Course */}
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
              Why NEET Foundation Course is the Smart Choice
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Data-driven insights and proven results showing why early preparation is the key to
              NEET success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyChooseFoundation.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex-1">{reason.title}</h3>
                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-full ml-4">
                    <div className="text-lg font-bold text-orange-700">{reason.stat}</div>
                    <div className="text-xs text-orange-600">{reason.statLabel}</div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Features */}
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
              What Makes Our Foundation Program Special
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive features designed specifically for young NEET aspirants starting their
              journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programFeatures.map((feature, index) => (
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

      {/* Program Comparison */}
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
              Class 9 vs Class 10 Foundation: Detailed Comparison
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the program that best fits your child's current academic level and timeline.
              Both paths lead to NEET success!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <div className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <tr>
                    {comparisonData.headers.map((header, idx) => (
                      <th
                        key={idx}
                        className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comparisonData.rows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <row.icon className="w-5 h-5 text-purple-600 mr-3" />
                          <span className="font-semibold text-gray-900">{row.feature}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-700">{row.class9}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-700">{row.class10}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-200"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Class 9 Foundation</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Perfect for students who want the maximum preparation time, deepest concept clarity,
                and most relaxed learning pace.
              </p>
              <Link href="/class-9-foundation">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
                >
                  Explore Class 9 Program
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border-2 border-emerald-200"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mr-4">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Class 10 Foundation</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Ideal for students seeking optimal balance between early start and focused
                preparation, with board exam alignment.
              </p>
              <Link href="/class-10-foundation">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600"
                >
                  Explore Class 10 Program
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum Journey */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Your Foundation to NEET Success Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A carefully designed 3-4 year curriculum that takes your child from basics to NEET
              mastery.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {curriculumHighlights.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <phase.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-center mb-4">
                  <div className="text-sm text-purple-600 font-semibold mb-1">{phase.duration}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{phase.phase}</h3>
                  <p className="text-gray-600 text-sm">{phase.focus}</p>
                </div>
                <div className="space-y-2">
                  {phase.topics.map((topic, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-1" />
                      <span className="text-sm text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Testimonials */}
      <ParentTestimonialsSection />

      {/* Photo Gallery */}
      <PhotoGallerySection showFeaturedOnly={true} maxPhotos={6} />

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Child's NEET Journey the Right Way
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 2,000+ students in our foundation programs who are building the strong base
              needed for NEET success. Give your child the gift of early preparation and 65% higher
              success rate!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="secondary_cta"
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
                className="border-white text-white hover:bg-white hover:text-purple-600"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Talk to Academic Counselor
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm opacity-90">
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                <span>65% Higher Success Rate</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>2,000+ Foundation Students</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                <span>95% Parent Satisfaction</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                <span>Research-Backed Methods</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
