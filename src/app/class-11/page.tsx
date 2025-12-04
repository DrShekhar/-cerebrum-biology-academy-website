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
  Eye,
  Lightbulb,
  ArrowRight,
  Trophy,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PhotoGallerySection } from '@/components/layout/PhotoGallerySection'
import { ParentTestimonialsSection } from '@/components/layout/ParentTestimonialsSection'
import Link from 'next/link'

export default function Class11Page() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_class_11', {
        event_category: 'conversion',
        event_label: 'class_11_landing_page',
        value: 1,
      })
    }
  }

  const class11Curriculum = [
    {
      unit: 'Unit 1: Diversity of Living Organisms',
      chapters: [
        'The Living World',
        'Biological Classification',
        'Plant Kingdom',
        'Animal Kingdom',
      ],
      icon: Leaf,
      difficulty: 'Foundation',
      weightage: '7 marks',
    },
    {
      unit: 'Unit 2: Structural Organisation',
      chapters: [
        'Morphology of Flowering Plants',
        'Anatomy of Flowering Plants',
        'Structural Organisation in Animals',
      ],
      icon: Microscope,
      difficulty: 'Intermediate',
      weightage: '12 marks',
    },
    {
      unit: 'Unit 3: Cell Structure and Function',
      chapters: ['Cell: The Unit of Life', 'Biomolecules', 'Cell Cycle and Cell Division'],
      icon: Brain,
      difficulty: 'Advanced',
      weightage: '15 marks',
    },
    {
      unit: 'Unit 4: Plant Physiology',
      chapters: [
        'Transport in Plants',
        'Mineral Nutrition',
        'Photosynthesis in Higher Plants',
        'Respiration in Plants',
        'Plant Growth and Development',
      ],
      icon: Leaf,
      difficulty: 'Advanced',
      weightage: '18 marks',
    },
    {
      unit: 'Unit 5: Human Physiology',
      chapters: [
        'Digestion and Absorption',
        'Breathing and Exchange of Gases',
        'Body Fluids and Circulation',
        'Excretory Products and their Elimination',
        'Locomotion and Movement',
        'Neural Control and Coordination',
        'Chemical Coordination and Integration',
      ],
      icon: Heart,
      difficulty: 'Advanced',
      weightage: '20 marks',
    },
  ]

  const learningFeatures = [
    {
      title: 'Foundation Building',
      description: 'Strong conceptual foundation for Class 12 and NEET preparation',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Board + NEET Focus',
      description: 'Dual preparation strategy for both board exams and NEET',
      icon: Target,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Interactive Learning',
      description: 'Practical demonstrations, models, and visual learning aids',
      icon: Eye,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Regular Assessment',
      description: 'Weekly tests and monthly evaluations to track progress',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
    },
  ]

  const successMetrics = [
    { label: '95.8%', sublabel: 'Board Pass Rate', icon: Award },
    { label: '89.2%', sublabel: 'Students Above 85%', icon: Star },
    { label: '156+', sublabel: 'Hours of Content', icon: Clock },
    { label: '2.8K+', sublabel: 'Class 11 Alumni', icon: Users },
  ]

  return (
    <div className="min-h-screen">
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
                Class 11 Biology Program
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Master Class 11 Biology with <span className="text-yellow-300">Dr. Shekhar</span>
              </h1>

              <p className="text-xl md:text-2xl opacity-90 mb-8">
                Build a rock-solid foundation in Biology that sets you up for success in Class 12,
                Board Exams, and NEET preparation. Start your medical journey the right way!
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
              {/* Success Stories Highlight */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-center">Class 11 Success Stories</h3>

                <div className="space-y-4">
                  <div className="flex items-center bg-white/10 rounded-lg p-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Arjun Sharma</div>
                      <div className="text-sm opacity-80">72% → 94% in Boards</div>
                      <div className="text-xs opacity-70">Now AIIMS Delhi student</div>
                    </div>
                  </div>

                  <div className="flex items-center bg-white/10 rounded-lg p-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Priya Patel</div>
                      <div className="text-sm opacity-80">68% → 91% in Boards</div>
                      <div className="text-xs opacity-70">Now KGMU Lucknow student</div>
                    </div>
                  </div>

                  <div className="flex items-center bg-white/10 rounded-lg p-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Rohit Kumar</div>
                      <div className="text-sm opacity-80">65% → 89% in Boards</div>
                      <div className="text-xs opacity-70">Now BHU Varanasi student</div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <Link href="/success-stories">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white text-white hover:bg-white hover:text-blue-600"
                    >
                      View All Success Stories
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Class 11 at Cerebrum */}
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
              Why Start Your Journey with Class 11 at Cerebrum?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Class 11 is the foundation year that determines your success in Class 12 and NEET. Get
              ahead with our proven methodology and expert guidance.
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

      {/* Complete Curriculum Coverage */}
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
              Complete Class 11 Biology Curriculum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive coverage of NCERT syllabus with additional concept building and
              NEET-oriented problem solving for complete mastery.
            </p>
          </motion.div>

          <div className="space-y-6">
            {class11Curriculum.map((unit, index) => (
              <motion.div
                key={unit.unit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
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
                      <div className="text-sm text-gray-600">Difficulty</div>
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
                      <div className="text-sm text-gray-600">NEET Weightage</div>
                      <div className="font-bold text-purple-600">{unit.weightage}</div>
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
                Complete Curriculum = Strong Foundation for NEET Success
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Every topic covered with depth, clarity, and NEET exam perspective. Build concepts
                that last a lifetime!
              </p>
              <Button
                variant="primary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Your Foundation Journey
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Methodology */}
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
              Dr. Shekhar's Proven Teaching Methodology for Class 11
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach that makes complex Biology concepts simple and memorable for
              Class 11 students.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: '01',
                title: 'Concept Building',
                description:
                  'Start with basic concepts using real-life examples and visual aids to make Biology interesting and relatable.',
                icon: Lightbulb,
                color: 'from-yellow-400 to-orange-500',
              },
              {
                step: '02',
                title: 'Practice & Application',
                description:
                  'Reinforce learning through structured practice questions, diagrams, and application-based problems.',
                icon: Target,
                color: 'from-blue-400 to-cyan-500',
              },
              {
                step: '03',
                title: 'Assessment & Growth',
                description:
                  'Regular testing and feedback to identify weak areas and ensure steady improvement throughout the year.',
                icon: TrendingUp,
                color: 'from-emerald-400 to-teal-500',
              },
            ].map((method, index) => (
              <motion.div
                key={method.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-xl shadow-lg p-8 h-full">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mb-6 mx-auto`}
                  >
                    <method.icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-300 mb-2">{method.step}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{method.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{method.description}</p>
                  </div>
                </div>

                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Testimonials - Class 11 Specific */}
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
              Ready to Build Your Biology Foundation?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 2,800+ Class 11 students who built strong foundations and went on to crack NEET
              successfully. Your medical journey starts with the right foundation in Class 11.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-yellow-500 text-black hover:bg-yellow-400"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Class 11 Demo
              </Button>

              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Download Class Schedule
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 text-sm opacity-90">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>2,800+ Class 11 Students</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                <span>95.8% Board Pass Rate</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2" />
                <span>89.2% Above 85% in Boards</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
