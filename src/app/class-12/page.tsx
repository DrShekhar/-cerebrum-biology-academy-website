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
  Dna,
  Heart,
  Trophy,
  Zap,
  ArrowRight,
  AlertCircle,
  Flame,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NEETToppersShowcase } from '@/components/layout/NEETToppersShowcase'
import { ParentTestimonialsSection } from '@/components/layout/ParentTestimonialsSection'
import Link from 'next/link'

export default function Class12Page() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_class_12', {
        event_category: 'conversion',
        event_label: 'class_12_landing_page',
        value: 1,
      })
    }
  }

  const class12Curriculum = [
    {
      unit: 'Unit 6: Reproduction',
      chapters: [
        'Reproduction in Organisms',
        'Sexual Reproduction in Flowering Plants',
        'Human Reproduction',
        'Reproductive Health',
      ],
      icon: Heart,
      difficulty: 'High Priority',
      weightage: '14 marks',
      neetImportance: 'Very High',
    },
    {
      unit: 'Unit 7: Genetics and Evolution',
      chapters: ['Heredity and Variation', 'Molecular Basis of Inheritance', 'Evolution'],
      icon: Dna,
      difficulty: 'Critical',
      weightage: '18 marks',
      neetImportance: 'Maximum',
    },
    {
      unit: 'Unit 8: Biology and Human Welfare',
      chapters: ['Human Health and Disease', 'Microbes in Human Welfare'],
      icon: Heart,
      difficulty: 'Moderate',
      weightage: '14 marks',
      neetImportance: 'High',
    },
    {
      unit: 'Unit 9: Biotechnology',
      chapters: ['Biotechnology: Principles and Processes', 'Biotechnology and its Applications'],
      icon: Microscope,
      difficulty: 'Advanced',
      weightage: '10 marks',
      neetImportance: 'High',
    },
    {
      unit: 'Unit 10: Ecology',
      chapters: [
        'Organisms and Populations',
        'Ecosystem',
        'Biodiversity and Conservation',
        'Environmental Issues',
      ],
      icon: Brain,
      difficulty: 'Moderate',
      weightage: '14 marks',
      neetImportance: 'High',
    },
  ]

  const class12Features = [
    {
      title: 'NEET-Focused Preparation',
      description:
        'Every topic taught with NEET exam perspective and previous year questions analysis',
      icon: Target,
      color: 'from-red-500 to-pink-500',
    },
    {
      title: 'Board + NEET Integration',
      description: 'Simultaneous preparation for 12th board exams and NEET without compromise',
      icon: Trophy,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Advanced Problem Solving',
      description: 'Complex NEET-level questions and application-based problems for depth',
      icon: Brain,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Regular Mock Tests',
      description: 'Full-length NEET mock tests and chapter-wise assessments for readiness',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
    },
  ]

  const successMetrics = [
    { label: '98%', sublabel: 'NEET Success Rate', icon: Trophy },
    { label: '680+', sublabel: 'Average NEET Score', icon: Star },
    { label: '97.1%', sublabel: 'Board Pass Rate', icon: Award },
    { label: '3.2K+', sublabel: 'NEET Qualifiers', icon: Users },
  ]

  const urgencyReasons = [
    'Board exams start in 4 months',
    'NEET 2025 preparation needs to peak now',
    'Limited seats in medical colleges',
    'Competition increases every year',
    'Foundation gaps need immediate fixing',
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Urgency */}
      <section className="relative bg-gradient-to-br from-red-600 via-purple-600 to-indigo-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        {/* Urgency Banner */}
        <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-3">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="font-bold">
                ⚡ URGENT: Class 12 Fast-Track Batch Starting Soon! Limited Seats Available
              </span>
              <Flame className="w-5 h-5 ml-2 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
                <BookOpen className="w-5 h-5 mr-2" />
                Class 12 Biology + NEET Program
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Crack NEET 2025 with <span className="text-yellow-300">Class 12 Biology</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 mb-8">
                The most critical year of your medical journey! Master Class 12 Biology concepts
                while simultaneously preparing for NEET 2025. Time is running out!
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-yellow-300" />
                  Why You Need to Start NOW:
                </h3>
                <ul className="space-y-2 text-sm">
                  {urgencyReasons.map((reason, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 animate-pulse"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>

                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-red-600"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Check Seat Availability
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
              {/* NEET 2025 Countdown */}
              <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl p-8 text-center mb-6">
                <h3 className="text-2xl font-bold mb-4">NEET 2025 Countdown</h3>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                  <div>
                    <div className="text-xl sm:text-3xl font-bold">167</div>
                    <div className="text-xs sm:text-sm opacity-80">Days Left</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-3xl font-bold">4K</div>
                    <div className="text-xs sm:text-sm opacity-80">Hours Left</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-3xl font-bold">720</div>
                    <div className="text-xs sm:text-sm opacity-80">Max Marks</div>
                  </div>
                </div>
                <div className="mt-4 text-sm">
                  🎯 <strong>Target:</strong> 650+ marks for Top Medical Colleges
                </div>
              </div>

              {/* Recent NEET Toppers */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-center">Our NEET 2024 Toppers</h3>

                <div className="space-y-4">
                  <div className="flex items-center bg-white/10 rounded-lg p-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Sadhna Sirin</div>
                      <div className="text-sm opacity-80">695 marks • AIIMS Delhi</div>
                      <div className="text-xs opacity-70">Started in Class 12 with us</div>
                    </div>
                  </div>

                  <div className="flex items-center bg-white/10 rounded-lg p-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Abhisek Kumar</div>
                      <div className="text-sm opacity-80">672 marks • AFMC Pune</div>
                      <div className="text-xs opacity-70">Class 12 + NEET preparation</div>
                    </div>
                  </div>

                  <div className="flex items-center bg-white/10 rounded-lg p-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Priya Sharma</div>
                      <div className="text-sm opacity-80">658 marks • AIIMS Jodhpur</div>
                      <div className="text-xs opacity-70">Dual prep success story</div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <Link href="/success-stories">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white text-white hover:bg-white hover:text-red-600"
                    >
                      View All NEET Toppers
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dual Preparation Strategy */}
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
              Master Board Exams + NEET Simultaneously
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven dual preparation strategy ensures you excel in both 12th board exams and
              NEET without compromising on either. Maximum efficiency, maximum results!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {class12Features.map((feature, index) => (
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

      {/* Class 12 Biology Curriculum - NEET Focused */}
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
              Class 12 Biology - Complete NEET Syllabus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master every unit with NEET exam perspective. Each topic covered with depth, previous
              year questions analysis, and advanced problem-solving techniques.
            </p>
          </motion.div>

          <div className="space-y-6">
            {class12Curriculum.map((unit, index) => (
              <motion.div
                key={unit.unit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-100"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start lg:items-center mb-4 lg:mb-0">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <unit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{unit.unit}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {unit.chapters.map((chapter, chapterIndex) => (
                          <span
                            key={chapterIndex}
                            className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {chapter}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Priority</div>
                      <div
                        className={`font-bold ${
                          unit.difficulty === 'Critical' || unit.difficulty === 'High Priority'
                            ? 'text-red-600'
                            : unit.difficulty === 'Advanced'
                              ? 'text-orange-600'
                              : 'text-yellow-600'
                        }`}
                      >
                        {unit.difficulty}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">NEET Marks</div>
                      <div className="font-bold text-purple-600">{unit.weightage}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Importance</div>
                      <div
                        className={`font-bold ${
                          unit.neetImportance === 'Maximum'
                            ? 'text-red-600'
                            : unit.neetImportance === 'Very High'
                              ? 'text-orange-600'
                              : 'text-yellow-600'
                        }`}
                      >
                        {unit.neetImportance}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      NEET Questions
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
            <div className="bg-gradient-to-r from-red-100 to-pink-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🎯 Total NEET Biology Weightage: 70 marks (Class 12 contributes 50+ marks)
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Class 12 Biology forms the backbone of NEET success. Master these units = Secure
                your medical seat!
              </p>
              <Button
                variant="primary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-gradient-to-r from-red-600 to-pink-600 animate-pulse"
              >
                <Target className="w-5 h-5 mr-2" />
                Start NEET-Focused Class 12 Prep
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEET Toppers Showcase */}
      <NEETToppersShowcase maxToppers={6} showVideos={true} />

      {/* Parent Testimonials */}
      <ParentTestimonialsSection />

      {/* Final Urgent CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 mr-3 text-yellow-300" />
                <span className="text-2xl font-bold">LAST CHANCE ALERT!</span>
                <Flame className="w-8 h-8 ml-3 text-yellow-300 animate-pulse" />
              </div>
              <p className="text-lg">
                Class 12 is your final opportunity to build the foundation needed for NEET success.
                Don't let this critical year slip away!
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Secure Your Medical Future - Start Today!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 3,200+ Class 12 students who are already on track for NEET 2025 success. Every
              day you wait, the competition gets stronger. Act NOW!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-yellow-500 text-black hover:bg-yellow-400 animate-bounce"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo Class
              </Button>

              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-red-600"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Check Available Batches
              </Button>
            </div>

            {/* Final Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 text-sm opacity-90">
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                <span>98% NEET Success</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                <span>680+ Avg Score</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2" />
                <span>3,200+ Medical Seats</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
