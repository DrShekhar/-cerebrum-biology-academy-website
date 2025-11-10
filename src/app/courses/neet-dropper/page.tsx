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
  Zap,
  Brain,
} from 'lucide-react'
import { PricingDisplay } from '@/components/ui/PricingDisplay'

export default function NEETDropperPage() {
  const courseFeatures = [
    'Complete NEET Biology syllabus in 10 months',
    'Intensive rank improvement strategies',
    'Previous years analysis and pattern study',
    'Daily 6-hour focused study schedule',
    'Weekly full-length mock tests',
    'Personal rank improvement tracking',
    'Dedicated counseling and motivation',
    'Crash course revision in final months',
  ]

  const phasePlan = [
    {
      phase: 'Phase 1: Foundation',
      duration: 'Month 1-3',
      focus: 'Complete syllabus coverage with strong foundation building',
      topics: ['NCERT thorough revision', 'Concept clarity', 'Basic problem solving'],
      color: 'green',
    },
    {
      phase: 'Phase 2: Advanced',
      duration: 'Month 4-7',
      focus: 'Advanced concepts and extensive practice',
      topics: ['Previous year questions', 'Advanced problem solving', 'Speed enhancement'],
      color: 'blue',
    },
    {
      phase: 'Phase 3: Mastery',
      duration: 'Month 8-10',
      focus: 'Mock tests, revision, and exam strategy',
      topics: ['Full-length tests', 'Weak area improvement', 'Time management'],
      color: 'purple',
    },
    {
      phase: 'Phase 4: Final',
      duration: 'Month 11-12',
      focus: 'Final revision and exam preparation',
      topics: ['Crash course', 'Last minute tips', 'Confidence building'],
      color: 'red',
    },
  ]

  const successStats = [
    { number: '89%', label: 'Rank Improvement', description: 'Significant rank boost' },
    { number: '350+', label: 'Avg Biology Score', description: 'Target achievement' },
    { number: '1500+', label: 'Droppers Coached', description: 'Successful transformations' },
    { number: '95%', label: 'Target Achievement', description: 'Desired rank/college' },
  ]

  const uniqueFeatures = [
    {
      icon: Brain,
      title: 'Psychology Support',
      description: 'Dedicated counseling to handle dropper year stress and maintain motivation',
    },
    {
      icon: Target,
      title: 'Rank Prediction',
      description: 'AI-powered rank prediction and improvement tracking throughout the year',
    },
    {
      icon: Zap,
      title: 'Speed Training',
      description: 'Specialized speed enhancement sessions for Biology section completion',
    },
    {
      icon: Trophy,
      title: 'Success Guarantee',
      description: 'Structured approach with measurable milestones and guaranteed improvement',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="max-w-full">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 break-words">
                NEET Dropper Course 2025
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-purple-100 mb-6 sm:mb-8 break-words">
                Turn your second chance into your best chance. Intensive one-year program designed
                specifically for NEET droppers with proven rank improvement strategies.
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
                    href="https://wa.me/919311946297?text=Hi%2C%20I%27m%20interested%20in%20NEET%20Dropper%20Course%202025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-white/50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center min-h-[44px] flex-1"
                  >
                    WhatsApp Counselor
                  </Link>
                  <Link
                    href="/purchase/neet-dropper"
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
                  <span className="text-sm sm:text-base">1 Year Comprehensive Program</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-purple-300 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Small Batch Size (Max 25 students)</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-purple-300 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Complete NCERT + Board Preparation</span>
                </div>
                <div className="flex items-center">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-purple-300 flex-shrink-0" />
                  <span className="text-sm sm:text-base">NEET Foundation Building</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dropper Success Record</h2>
            <p className="text-gray-600">
              Proven track record of transforming dropper students into medical college admits
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-3xl font-bold text-red-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Droppers Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized features designed specifically for dropper students' unique needs and
              challenges
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {uniqueFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Phase-wise Plan */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Strategic 4-Phase Preparation Plan
            </h2>
            <p className="text-gray-600">
              Scientifically designed phases for maximum rank improvement
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {phasePlan.map((phase, index) => {
              const colorClasses: Record<string, string> = {
                green: 'border-green-600 bg-green-50',
                blue: 'border-blue-600 bg-blue-50',
                purple: 'border-purple-600 bg-purple-50',
                red: 'border-red-600 bg-red-50',
              }

              const textClasses: Record<string, string> = {
                green: 'text-green-800',
                blue: 'text-blue-800',
                purple: 'text-purple-800',
                red: 'text-red-800',
              }

              return (
                <div
                  key={index}
                  className={`rounded-xl p-6 shadow-lg border-l-4 ${colorClasses[phase.color]}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{phase.phase}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${textClasses[phase.color]} bg-white`}
                    >
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium mb-4">{phase.focus}</p>
                  <div className="space-y-2">
                    {phase.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center">
                        <CheckCircle
                          className={`w-4 h-4 mr-2 ${phase.color === 'green' ? 'text-green-600' : phase.color === 'blue' ? 'text-blue-600' : phase.color === 'purple' ? 'text-purple-600' : 'text-red-600'}`}
                        />
                        <span className="text-gray-700 text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Dropper Course Features
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CheckCircle className="w-8 h-8 text-red-600 mb-4" />
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Enrollment */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Transform Your NEET Journey</h2>

          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  NEET Dropper Complete Course
                </h3>
                <div className="text-left space-y-3">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>12 months comprehensive program</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Exclusive dropper batch environment</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Psychology support & counseling</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Rank improvement guarantee</span>
                  </div>
                </div>
              </div>

              <div>
                <PricingDisplay
                  courseId="neet-dropper-intensive"
                  showCompetitiveAdvantage={true}
                  onEnrollClick={() => (window.location.href = '/admissions')}
                />
              </div>
            </div>
          </div>

          <div className="bg-orange-100 border border-orange-300 rounded-xl p-6">
            <p className="text-orange-800 font-semibold mb-2">🔥 Dropper Special Offer</p>
            <p className="text-orange-700">
              Join before 15th February and get additional 100 hours of personal mentoring +
              Psychology counseling sessions FREE!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Dropper Students FAQ
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Is there a separate batch only for dropper students?
              </h3>
              <p className="text-gray-600">
                Yes, we have dedicated dropper-only batches. This creates the right environment
                where all students have similar goals and motivation levels, leading to better peer
                learning and support.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How do you handle the psychological pressure of dropper year?
              </h3>
              <p className="text-gray-600">
                We provide dedicated counseling sessions, motivation workshops, and stress
                management techniques. Our faculty is specially trained to handle dropper student
                psychology and maintain high motivation levels.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What is the average rank improvement for your dropper students?
              </h3>
              <p className="text-gray-600">
                Our dropper students typically see 50,000-100,000 rank improvement. Many who scored
                400+ in first attempt achieve 550+ scores and secure government medical colleges in
                their second attempt.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Do you provide personalized study plans for dropper students?
              </h3>
              <p className="text-gray-600">
                Absolutely! Each dropper student gets a personalized study plan based on their
                previous attempt analysis, weak areas identification, and target rank/college
                preferences.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
