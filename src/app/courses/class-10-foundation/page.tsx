'use client'

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
  Trophy,
  Brain,
  Lightbulb,
  Microscope,
  Zap,
} from 'lucide-react'
import { PricingDisplay } from '@/components/ui/PricingDisplay'

export default function Class10FoundationPage() {
  const courseFeatures = [
    'Advanced Biology concepts preparation',
    'Board exam excellence strategies',
    'Introduction to NEET-style thinking',
    'Life processes detailed understanding',
    'Reproduction and heredity concepts',
    'Environmental science awareness',
    'Problem-solving skill development',
    'Medical career guidance and planning',
  ]

  const curriculum = [
    {
      title: 'Unit 1: Life Processes',
      topics: ['Nutrition in Plants & Animals', 'Respiration', 'Transportation', 'Excretion'],
      duration: '10 weeks',
      focus: 'Core Physiology',
      neetWeight: 'High Importance',
    },
    {
      title: 'Unit 2: Control and Coordination',
      topics: ['Nervous System', 'Hormonal Control', 'Movement in Plants', 'Response Mechanisms'],
      duration: '6 weeks',
      focus: 'Regulatory Systems',
      neetWeight: 'Medium Importance',
    },
    {
      title: 'Unit 3: How do Organisms Reproduce',
      topics: [
        'Reproduction in Animals',
        'Reproduction in Plants',
        'Sexual vs Asexual',
        'Reproductive Health',
      ],
      duration: '8 weeks',
      focus: 'Reproduction Biology',
      neetWeight: 'Very High Importance',
    },
    {
      title: 'Unit 4: Heredity and Evolution',
      topics: ['Heredity Principles', 'Evolution Concepts', 'Genetics Basics', 'Natural Selection'],
      duration: '6 weeks',
      focus: 'Genetics Foundation',
      neetWeight: 'High Importance',
    },
  ]

  const successStats = [
    { number: '97%', label: 'Board Exam Success', description: 'Students scoring 90+ marks' },
    { number: '92%', label: 'NEET Foundation', description: 'Ready for Class 11 NEET prep' },
    { number: '88%', label: 'Class 11 Transition', description: 'Smooth progression rate' },
    { number: '800+', label: 'Students Coached', description: 'Class 10 Biology' },
  ]

  const uniqueFeatures = [
    {
      icon: Target,
      title: 'NEET Foundation',
      description:
        'Introduction to medical entrance thinking with Class 10 concepts as building blocks',
    },
    {
      icon: Brain,
      title: 'Advanced Concepts',
      description: 'Deep dive into life processes that form the backbone of Class 11-12 Biology',
    },
    {
      icon: Zap,
      title: 'Board Excellence',
      description: 'Targeted preparation for scoring 90+ marks in Class 10 board examinations',
    },
    {
      icon: Trophy,
      title: 'Medical Awareness',
      description: 'Early exposure to medical career paths and entrance exam awareness',
    },
  ]

  const learningApproach = [
    {
      method: 'Conceptual Deep Dive',
      description: 'Thorough understanding of life processes with real-world applications',
      icon: '🧠',
    },
    {
      method: 'NEET-Style Questions',
      description: 'Introduction to analytical and application-based Biology questions',
      icon: '🎯',
    },
    {
      method: 'Board Exam Mastery',
      description: 'Comprehensive coverage ensuring 90+ marks in board examinations',
      icon: '📋',
    },
    {
      method: 'Career Guidance',
      description: 'Medical career awareness and future planning discussions',
      icon: '🏥',
    },
  ]

  const boardFocus = [
    {
      subject: 'CBSE Board',
      features: [
        'NCERT thorough coverage',
        'Previous years analysis',
        'Sample papers practice',
        'Marking scheme understanding',
      ],
    },
    {
      subject: 'ICSE Board',
      features: [
        'Detailed theory coverage',
        'Practical knowledge',
        'Application-based questions',
        'Comprehensive answers',
      ],
    },
    {
      subject: 'State Boards',
      features: [
        'State-specific syllabus',
        'Local exam patterns',
        'Regional question styles',
        'Board-specific preparation',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#4a5d4a] text-white py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Class 10th Biology Foundation
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-green-100 mb-6 sm:mb-8">
                Master advanced Biology concepts while excelling in board exams. Perfect preparation
                for NEET foundation with comprehensive life processes understanding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/admissions"
                  className="w-full sm:w-auto bg-white text-green-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center justify-center min-h-[44px]"
                >
                  Join Class 10 Foundation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto border border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-flex items-center justify-center min-h-[44px]"
                >
                  Book Free Demo
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Class 10 Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-green-400" />
                  <span>1 Year Advanced Program</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-6 h-6 mr-3 text-green-400" />
                  <span>Premium Batch (Max 18 students)</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-6 h-6 mr-3 text-green-400" />
                  <span>Board + NEET Foundation</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="w-6 h-6 mr-3 text-green-400" />
                  <span>90+ Board Score Target</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Class 10 Excellence Record
            </h2>
            <p className="text-gray-600">
              Outstanding performance in board exams and NEET foundation building
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {successStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Focus */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              All Board Exam Excellence
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive preparation for all major boards with board-specific strategies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {boardFocus.map((board, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-600"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{board.subject}</h3>
                <div className="space-y-3">
                  {board.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Approach */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Advanced Class 10 Learning
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sophisticated teaching approach preparing students for board excellence and NEET
              foundation
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {learningApproach.map((approach, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{approach.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{approach.method}</h3>
                <p className="text-gray-600 text-sm">{approach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Class 10 Foundation Matters?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Critical year that bridges basic concepts with advanced NEET preparation
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {uniqueFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Curriculum with NEET Weightage */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Class 10 Advanced Curriculum
            </h2>
            <p className="text-gray-600">NCERT-based syllabus with NEET foundation perspective</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {curriculum.map((unit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-600"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{unit.title}</h3>
                  <div className="text-right">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium block mb-1">
                      {unit.duration}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium block mb-1">
                      {unit.focus}
                    </span>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
                      {unit.neetWeight}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {unit.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center">
                      <BookOpen className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Class 10 Foundation Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {courseFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Enrollment */}
      <section className="py-8 sm:py-12 md:py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            Excel in Board Exams & Beyond
          </h2>

          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Class 10th Advanced Foundation
                </h3>
                <div className="text-left space-y-3">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>1 year advanced foundation program</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Board exam 90+ score target</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>NEET foundation introduction</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Medical career guidance included</span>
                  </div>
                </div>
              </div>

              <div>
                <PricingDisplay
                  courseId="class-10-foundation-biology"
                  showCompetitiveAdvantage={true}
                  onEnrollClick={() => (window.location.href = '/admissions')}
                />
              </div>
            </div>
          </div>

          <div className="bg-green-100 border border-green-400 rounded-xl p-6">
            <p className="text-green-800 font-semibold mb-2">🏆 Board Excellence Guarantee</p>
            <p className="text-green-700">
              Score 90+ in Class 10 boards or get additional coaching until you achieve the target -
              absolutely FREE!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Class 10 Foundation FAQ
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How is Class 10 foundation different from Class 9?
              </h3>
              <p className="text-gray-600">
                Class 10 foundation is more advanced with deeper concepts, introduction to
                NEET-style thinking, and serious board exam preparation targeting 90+ marks with
                medical career awareness.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Will this help in Class 11 NEET preparation?
              </h3>
              <p className="text-gray-600">
                Absolutely! Class 10 concepts like life processes, reproduction, and heredity are
                fundamental to Class 11-12 Biology. Strong foundation here makes NEET preparation
                much easier.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Is board exam preparation included?
              </h3>
              <p className="text-gray-600">
                Yes, comprehensive board exam preparation is included for CBSE, ICSE, and State
                boards. We target 90+ marks with board-specific strategies and practice papers.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                When should students join this program?
              </h3>
              <p className="text-gray-600">
                Best to join at the beginning of Class 10 academic year. However, students can join
                mid-year with additional support to cover missed concepts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
