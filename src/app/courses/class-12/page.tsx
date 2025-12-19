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
} from 'lucide-react'
import { PricingDisplay } from '@/components/ui/PricingDisplay'
import { getCoursePricing } from '@/lib/utils/pricing'

export default function Class12BiologyPage() {
  const courseFeatures = [
    'Complete Class 12 NCERT Biology syllabus',
    'Intensive NEET preparation with previous years',
    'Board exam excellence (90+ marks guaranteed)',
    'Daily practice sessions and mock tests',
    'One-on-one doubt clearing sessions',
    'Comprehensive study materials and notes',
    'Regular assessment and progress tracking',
    'Dedicated counseling and guidance',
  ]

  const curriculum = [
    {
      title: 'Unit 1: Reproduction',
      topics: ['Sexual Reproduction in Plants', 'Human Reproduction', 'Reproductive Health'],
      duration: '6 weeks',
      neetWeight: 'High (12-15 questions)',
    },
    {
      title: 'Unit 2: Genetics & Evolution',
      topics: ['Heredity', 'Molecular Basis of Inheritance', 'Evolution'],
      duration: '8 weeks',
      neetWeight: 'Very High (15-18 questions)',
    },
    {
      title: 'Unit 3: Biology & Human Welfare',
      topics: ['Health & Disease', 'Microbes', 'Biotechnology Applications'],
      duration: '6 weeks',
      neetWeight: 'Medium (8-12 questions)',
    },
    {
      title: 'Unit 4: Biotechnology & Ecology',
      topics: ['Biotechnology Principles', 'Ecosystem', 'Environmental Issues'],
      duration: '8 weeks',
      neetWeight: 'High (12-15 questions)',
    },
  ]

  const successStats = [
    { number: '96%', label: 'Board Exam Success', description: 'Students scoring 90+ marks' },
    { number: '92%', label: 'NEET Qualification', description: 'Students clearing NEET' },
    { number: '340+', label: 'Avg Biology Score', description: 'NEET Biology marks' },
    { number: '3000+', label: 'Students Coached', description: 'Class 12 Biology' },
  ]

  const neetPreparation = [
    { feature: 'Previous 15 years NEET questions', icon: Trophy },
    { feature: 'Weekly full-length mock tests', icon: Target },
    { feature: 'Topic-wise test series', icon: BookOpen },
    { feature: 'Rank prediction analysis', icon: Award },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="max-w-full">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 break-words">
                Class 12th Biology Course
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-purple-100 mb-6 sm:mb-8 break-words">
                Master Class 12th Biology with intensive NEET preparation. The most crucial year for
                medical entrance success with expert AIIMS faculty guidance.
              </p>
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Primary CTA - Book Free Demo */}
                <Link
                  href="/demo-booking"
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-purple-50 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-[1.02] min-h-[52px] w-full group"
                >
                  <span>Book Free Demo</span>
                  <ArrowRight className="w-5 h-5 ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Secondary CTAs */}
                <div className="flex flex-col xs:flex-row gap-3">
                  <Link
                    href="https://wa.me/918826444334?text=Hi%2C%20I%27m%20interested%20in%20Class%2012th%20Biology%20course"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-white/50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center min-h-[44px] flex-1"
                  >
                    WhatsApp Counselor
                  </Link>
                  <Link
                    href="/purchase/class-12"
                    className="border-2 border-white/50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center min-h-[44px] flex-1"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Course Highlights</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-purple-300 flex-shrink-0" />
                  <span className="text-sm sm:text-base">1 Year Intensive Program</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-purple-300 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Premium Batch (Max 20 students)</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-purple-300 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Board + NEET Excellence</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-purple-300 flex-shrink-0" />
                  <span className="text-sm sm:text-base">340+ NEET Biology Target</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Class 12th Success Record
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Outstanding results in both board exams and NEET
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {successStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose Our Class 12th Biology Course?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              The most critical year for NEET aspirants with dual focus on board excellence and
              entrance exam success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {courseFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600 mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEET Preparation Focus */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Intensive NEET Preparation
            </h2>
            <p className="text-sm sm:text-base text-gray-600 px-4">
              Comprehensive NEET-focused approach for maximum Biology score
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {neetPreparation.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-5 sm:p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
                  <p className="text-sm sm:text-base text-gray-700 font-medium">{item.feature}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Complete Curriculum with NEET Weightage
            </h2>
            <p className="text-sm sm:text-base text-gray-600 px-4">
              Strategic coverage based on NEET exam pattern and board requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {curriculum.map((unit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-600"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{unit.title}</h3>
                  <div className="text-right">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium block mb-1">
                      {unit.duration}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      {unit.neetWeight}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {unit.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center">
                      <BookOpen className="w-4 h-4 text-purple-600 mr-2" />
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Enrollment */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Secure Your Medical Seat Today</h2>

          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Class 12th Biology Intensive Course
                </h3>
                <div className="text-left space-y-3">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>12 months intensive program</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Board + NEET dual preparation</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Daily practice + weekly tests</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Personal mentorship included</span>
                  </div>
                </div>
              </div>

              <div>
                <PricingDisplay
                  courseId="class-12-neet-intensive"
                  showCompetitiveAdvantage={true}
                  onEnrollClick={() => (window.location.href = '/admissions')}
                />
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-6">
            <p className="text-yellow-800 font-semibold mb-2">🎯 NEET 2026 Special Offer</p>
            <p className="text-yellow-700">
              Enroll before 31st January and get FREE NEET crash course (worth ₹15,000) + Previous
              15 years question bank!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How is this different from Class 11th course?
              </h3>
              <p className="text-gray-600">
                Class 12th course is more intensive with direct NEET focus. We cover board syllabus
                alongside intensive NEET preparation with daily practice, mock tests, and previous
                year questions analysis.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What is the expected Biology score improvement?
              </h3>
              <p className="text-gray-600">
                Our students typically achieve 330+ marks in NEET Biology (out of 360). We focus on
                high-weightage topics and provide extensive practice to ensure maximum scoring.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Are board exam and NEET preparation covered simultaneously?
              </h3>
              <p className="text-gray-600">
                Yes, our unique curriculum covers both. Board exam preparation is integrated with
                NEET-level depth, ensuring students excel in both without any compromise.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What support is provided for doubt resolution?
              </h3>
              <p className="text-gray-600">
                We provide daily doubt sessions, one-on-one mentoring, WhatsApp support, and weekend
                doubt clearing classes. No student question goes unanswered.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
