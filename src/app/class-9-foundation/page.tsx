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
  Lightbulb,
  ArrowRight,
  Trophy,
  GraduationCap,
  Rocket,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PhotoGallerySection } from '@/components/layout/PhotoGallerySection'
import { ParentTestimonialsSection } from '@/components/layout/ParentTestimonialsSection'
import Link from 'next/link'

export default function Class9FoundationPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_class_9_foundation', {
        event_category: 'conversion',
        event_label: 'class_9_foundation_landing_page',
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
        name: 'When should I start NEET preparation - Class 9 or later?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Students who start NEET preparation from Class 9 have 65% higher success rate due to 4-year preparation timeline allowing deeper concept building, reduced stress, and stronger fundamentals. Starting from Class 9 gives students more time to master biology concepts without overwhelming pressure.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is covered in the Class 9 NEET foundation course?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our Class 9 Biology foundation course covers complete NCERT Class 9 Biology syllabus including Cell Structure and Functions, Tissues, Diversity in Living Organisms, Why Do We Fall Ill, Natural Resources, and Improvement in Food Resources. All topics are taught with NEET-oriented concept building.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long is the Class 9 NEET foundation program?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Class 9 NEET foundation program runs for the full academic year, providing 4 years of total preparation time from Class 9 to Class 12. This extended timeline reduces pressure and builds strong fundamentals for NEET 2028-2029.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the fee for Class 9 NEET foundation course?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The annual fee for our Class 9 NEET foundation course is ₹24,000, which includes comprehensive biology coaching, live classes, study material, practice tests, and doubt clearing sessions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the Class 9 foundation course conducted online or offline?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our Class 9 NEET foundation course is available in online mode, allowing students to learn from anywhere with interactive live classes, recorded sessions, and personalized attention from expert biology faculty.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does early NEET preparation benefit Class 9 students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Early NEET preparation from Class 9 provides reduced pressure through 4-year timeline, strong fundamental concepts that support Class 11-12 learning, competitive edge with 65% higher success rate, and holistic development without overwhelming academic schedule.',
        },
      },
    ],
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Class 9 Biology Foundation Course for NEET 2028-2029',
    description:
      'Specialized Class 9 biology foundation program for NEET preparation. Build strong fundamentals, develop scientific thinking, and set up for success with 4 years of strategic preparation. Complete NCERT Class 9 Biology coverage with NEET-oriented concept building.',
    provider: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://cerebrumbiologyacademy.com',
    },
    courseMode: 'online',
    educationalLevel: 'Class 9',
    timeRequired: 'P4Y',
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

  const class9Curriculum = [
    {
      unit: 'Unit 1: The Fundamental Unit of Life',
      chapters: ['Cell - Structure and Functions', 'Tissues'],
      icon: Microscope,
      difficulty: 'Foundation',
      neetRelevance: 'High',
    },
    {
      unit: 'Unit 2: Living Organisms',
      chapters: ['Diversity in Living Organisms', 'Why Do We Fall Ill'],
      icon: Leaf,
      difficulty: 'Foundation',
      neetRelevance: 'Medium',
    },
    {
      unit: 'Unit 3: Natural Phenomena',
      chapters: ['Natural Resources', 'Improvement in Food Resources'],
      icon: Brain,
      difficulty: 'Foundation',
      neetRelevance: 'Medium',
    },
  ]

  const learningFeatures = [
    {
      title: 'Early Start Advantage',
      description: '4-year preparation timeline reduces pressure and builds strong fundamentals',
      icon: Rocket,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Age-Appropriate Teaching',
      description: 'Concepts explained in simple, relatable language perfect for Class 9 students',
      icon: GraduationCap,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'NCERT Foundation',
      description: 'Complete NCERT Class 9 Biology coverage with NEET concept building',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Interactive Learning',
      description: 'Fun activities, models, and visual aids to make biology interesting',
      icon: Lightbulb,
      color: 'from-orange-500 to-red-500',
    },
  ]

  const successMetrics = [
    { label: '4 Years', sublabel: 'Preparation Timeline', icon: Clock },
    { label: '65%', sublabel: 'Higher Success Rate', icon: Trophy },
    { label: '850+', sublabel: 'Class 9 Students', icon: Users },
    { label: '100%', sublabel: 'Concept Clarity', icon: Star },
  ]

  const whyStartEarly = [
    {
      title: 'Reduced Pressure',
      description: 'Spreading NEET preparation over 4 years eliminates last-minute stress',
      icon: Heart,
    },
    {
      title: 'Strong Fundamentals',
      description: 'Time to build rock-solid basics that support advanced Class 11-12 concepts',
      icon: Brain,
    },
    {
      title: 'Competitive Edge',
      description: 'Students who start early have 65% higher NEET success rate',
      icon: Target,
    },
    {
      title: 'Holistic Development',
      description: 'Balance academics with extracurriculars without overwhelming schedule',
      icon: Award,
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
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 overflow-hidden">
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
                Class 9 Biology Foundation Program
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Class 9 Biology Foundation Course for{' '}
                <span className="text-yellow-300">NEET 2028-2029</span>
              </h1>

              <p className="text-xl md:text-2xl opacity-90 mb-8">
                Start your NEET journey early with our specialized Class 9 foundation program. Build
                strong fundamentals, develop scientific thinking, and set yourself up for success
                with 4 years of strategic preparation!
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
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  View Class Schedule
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
              {/* Early Start Benefits Highlight */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-center">Why Start from Class 9?</h3>

                <div className="space-y-4">
                  <div className="flex items-start bg-white/10 rounded-lg p-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">65% Higher Success Rate</div>
                      <div className="text-sm opacity-80">
                        Students who started NEET preparation from Class 9 show significantly higher
                        success rates
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start bg-white/10 rounded-lg p-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">More Time = Less Stress</div>
                      <div className="text-sm opacity-80">
                        4-year timeline allows proper concept building without overwhelming pressure
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start bg-white/10 rounded-lg p-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Strong Foundation</div>
                      <div className="text-sm opacity-80">
                        Early start builds concepts that make Class 11-12 much easier to master
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <Link href="/early-neet-preparation">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white text-white hover:bg-white hover:text-blue-600"
                    >
                      Learn More About Early Preparation
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Start Early Section */}
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
              The Early Bird Advantage for NEET Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Starting NEET preparation from Class 9 gives you a significant advantage. Here's why
              our Class 9 foundation program is the perfect launchpad for your medical career.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyStartEarly.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
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
              What Makes Our Class 9 Foundation Program Special?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Age-appropriate teaching methodology designed specifically for Class 9 students to
              make biology fun, engaging, and effective.
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
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Class 9 Biology Syllabus - NEET Foundation Aligned
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete NCERT Class 9 Biology coverage with additional NEET-oriented concept building
              and problem-solving practice.
            </p>
          </motion.div>

          <div className="space-y-6">
            {class9Curriculum.map((unit, index) => (
              <motion.div
                key={unit.unit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 border border-blue-200 shadow-md"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start lg:items-center mb-4 lg:mb-0">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <unit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{unit.unit}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {unit.chapters.map((chapter, chapterIndex) => (
                          <span
                            key={chapterIndex}
                            className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
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
                      <div className="font-bold text-green-600">{unit.difficulty}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">NEET Relevance</div>
                      <div className="font-bold text-purple-600">{unit.neetRelevance}</div>
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
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Complete Foundation = Future NEET Success
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Every Class 9 concept is taught with clarity, making it relevant for NEET while
                keeping learning fun and age-appropriate!
              </p>
              <Button
                variant="primary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Your NEET Journey Early
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
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Give Your Child the Early Start Advantage
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 850+ Class 9 students who are building strong foundations for NEET 2028-2029.
              Start early, learn systematically, and set up your child for medical career success!
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
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Download Program Details
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 text-sm opacity-90">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>850+ Class 9 Students</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                <span>4-Year Preparation Timeline</span>
              </div>
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                <span>65% Higher Success Rate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
