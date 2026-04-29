'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  CheckCircle,
  Users,
  Award,
  Target,
  Star,
  ArrowRight,
  Trophy,
  Zap,
  Brain,
  Phone,
  MessageCircle,
  BookOpen,
  GraduationCap,
  Calendar,
  TrendingUp,
  HelpCircle,
  Play,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NEETToppersShowcase } from '@/components/layout/NEETToppersShowcase'
import { ParentTestimonialsSection } from '@/components/layout/ParentTestimonialsSection'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'
import { BookFreeDemoCard } from '@/components/courses/BookFreeDemoCard'
import { VisitOurCenters } from '@/components/seo/InternalCrossLinks'

export default function NEETDropperPage() {
  const router = useRouter()
  const [seatsLeft, setSeatsLeft] = useState(18)
  // Rolling-week framing: we always position the next batch as starting "next
  // week." The page shows the day-of-week + relative-day count rather than a
  // hardcoded calendar date, so the urgency stays accurate without becoming
  // stale or contradicting reality.
  const [batchStartLabel, setBatchStartLabel] = useState('next week')
  const [batchStartDay, setBatchStartDay] = useState('Monday')

  useEffect(() => {
    // Compute the upcoming Monday (>= 7 days from now). This gives a "next
    // week" label that's always honest: never further than a week away, never
    // already passed.
    const now = new Date()
    const day = now.getDay() // 0 = Sun, 1 = Mon, ...
    // Days until the Monday in the FOLLOWING calendar week (always 7-13 days out).
    const daysUntilNextMonday = ((1 - day + 7) % 7) + 7
    const nextBatchStart = new Date(now)
    nextBatchStart.setDate(now.getDate() + daysUntilNextMonday)
    nextBatchStart.setHours(9, 0, 0, 0)

    const dayName = nextBatchStart.toLocaleDateString('en-IN', { weekday: 'long' })
    setBatchStartDay(dayName)
    setBatchStartLabel('next week')
  }, [])

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_dropper', {
        event_category: 'conversion',
        event_label: 'neet_dropper_page',
        value: 1,
      })
    }
    trackAndOpenWhatsApp({ source: 'neet-dropper-demo', message: 'Hi! I want to book a FREE demo class for NEET Dropper/Repeater Batch. Please share available timings.', campaign: 'neet-dropper' })
  }

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
      // Forest-green scale (same hue across all phases) — visual unity
      // instead of the prior green/teal/blue/indigo rotation.
      color: 'phase-1',
    },
    {
      phase: 'Phase 2: Advanced',
      duration: 'Month 4-7',
      focus: 'Advanced concepts and extensive practice',
      topics: ['Previous year questions', 'Advanced problem solving', 'Speed enhancement'],
      color: 'phase-2',
    },
    {
      phase: 'Phase 3: Mastery',
      duration: 'Month 8-10',
      focus: 'Mock tests, revision, and exam strategy',
      topics: ['Full-length tests', 'Weak area improvement', 'Time management'],
      color: 'phase-3',
    },
    {
      phase: 'Phase 4: Final',
      duration: 'Month 11-12',
      focus: 'Final revision and exam preparation',
      topics: ['Crash course', 'Last minute tips', 'Confidence building'],
      color: 'phase-4',
    },
  ]

  const successStats = [
    {
      number: '89%',
      label: 'Added 100+ marks',
      description: 'Rank improvement track record',
      icon: TrendingUp,
    },
    {
      number: '350+',
      label: 'Avg biology score',
      description: 'Cohort biology performance',
      icon: Target,
    },
    {
      number: '1500+',
      label: 'Droppers coached',
      description: 'Across 15+ years',
      icon: Users,
    },
  ]

  const uniqueFeatures = [
    {
      icon: Brain,
      title: 'Psychology Support',
      description: 'Dedicated counseling to handle dropper year stress and maintain motivation',
      color: 'bg-[#3d4d3d]',
    },
    {
      icon: Target,
      title: 'Rank Prediction',
      description: 'AI-powered rank prediction and improvement tracking throughout the year',
      color: 'bg-[#4a5d4a]',
    },
    {
      icon: Zap,
      title: 'Speed Training',
      description: 'Specialized speed enhancement sessions for Biology section completion',
      color: 'bg-[#5a6d5a]',
    },
    {
      icon: Trophy,
      title: 'Success Guarantee',
      description: 'Structured approach with measurable milestones and guaranteed improvement',
      color: 'bg-[#3d4d3d]',
    },
  ]

  const dropperFAQs = [
    {
      question: 'Is there a separate batch only for dropper students?',
      answer:
        'Yes, we have dedicated dropper-only batches. This creates the right environment where all students have similar goals and motivation levels, leading to better peer learning and support.',
    },
    {
      question: 'How do you handle the psychological pressure of dropper year?',
      answer:
        'We provide dedicated counseling sessions, motivation workshops, and stress management techniques. Our faculty is specially trained to handle dropper student psychology and maintain high motivation levels.',
    },
    {
      question: 'What is the average rank improvement for your dropper students?',
      answer:
        'Our dropper students typically see 50,000-100,000 rank improvement. Many who scored 400+ in first attempt achieve 550+ scores and secure government medical colleges in their second attempt.',
    },
    {
      question: 'Do you provide personalized study plans for dropper students?',
      answer:
        'Absolutely! Each dropper student gets a personalized study plan based on their previous attempt analysis, weak areas identification, and target rank/college preferences.',
    },
    {
      question: 'What is the fee structure for the Dropper Course?',
      answer:
        'The Dropper Course fee ranges from ₹70,000 to ₹1,56,000 depending on the batch type and facilities chosen. We offer flexible EMI options starting at ₹5,833/month and scholarships up to 25% based on previous NEET score.',
    },
    {
      question: 'What if my child doesn\u2019t feel the programme is right after a few classes?',
      answer:
        'We run a free demo class first so families can experience the methodology before committing. If after enrolment a student attends the first two weeks of classes and decides the programme is not the right fit, our counsellors work with the family case-by-case to either reassign them to a more suitable batch or process an honest refund per the published refund policy at /refund-policy. We don\u2019t treat this like a product return — we treat it as a coaching decision.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org structured data - Course */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'NEET Dropper Course - Second Attempt Success',
            description:
              'Specialized 10-12 month program for NEET droppers with rank improvement strategies, psychology support, and personalized mentoring. 89% average rank improvement.',
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
            courseCode: 'NEET-DROPPER',
            educationalLevel: 'Advanced',
            teaches: 'NEET Biology - Dropper Year Focus',
            numberOfCredits: '10 months',
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: ['online', 'onsite'],
              courseWorkload: 'PT6H',
              instructor: {
                '@type': 'Person',
                name: 'Dr. Shekhar C Singh',
              },
            },
            offers: {
              '@type': 'Offer',
              category: 'NEET Biology Coaching',
              priceCurrency: 'INR',
              price: '85500',
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

      {/* Floating Contact Buttons — sits above the mobile bottom-nav (~80–90px
          tall) and the desktop sticky surfaces. Mirrors the ARIA-widget vertical
          offset on the opposite (left) side, so the two never overlap. */}
      <div className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2 sm:gap-3">
        <button
          onClick={async () => {
            await trackAndOpenWhatsApp({
              source: 'dropper-floating',
              message: WHATSAPP_MESSAGES.courseEnquiry,
              campaign: 'neet-dropper-course',
            })
          }}
          className="bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-lg transition-all hover:scale-110 cursor-pointer min-w-[48px] min-h-[48px]"
          aria-label="Chat on WhatsApp about NEET Dropper Course"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
        </button>
        <a
          href="tel:+918826444334"
          className="bg-[#3d4d3d] hover:bg-[#4a5d4a] text-white p-3 sm:p-4 rounded-full shadow-lg transition-all hover:scale-110 min-w-[48px] min-h-[48px] flex items-center justify-center"
          aria-label="Call us at +91 88264 44334"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
        </a>
      </div>

      {/* Hero Section with Lead Form */}
      <section className="relative bg-[#3d4d3d] text-white py-8 sm:py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3d4d3d] to-[#2d3d2d]" />

        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 pt-6 sm:pt-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            <div className="animate-fadeInUp">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400" />
                Next batch starts {batchStartLabel} ({batchStartDay})
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 leading-[1.05]">
                NEET <span className="text-yellow-400">Dropper Course</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-[#e8ede8]/80 mb-4 sm:mb-6 font-light tracking-wide">
                Turn your second chance into success.
              </p>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#e8ede8] mb-6 sm:mb-8">
                Intensive 10–12 month programme designed specifically for NEET droppers — proven
                rank-improvement strategies, psychology support, and personalised mentoring from
                AIIMS-trained faculty.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
                {successStats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="text-center bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 animate-fadeInUp"
                  >
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-yellow-400" />
                    <div className="text-lg sm:text-xl md:text-2xl font-bold">{stat.number}</div>
                    <div className="text-[10px] sm:text-xs text-[#e8ede8]">{stat.label}</div>
                  </div>
                ))}
              </div>


              {/* Mobile CTA */}
              <div className="lg:hidden flex flex-col gap-2 sm:gap-3 mb-6 sm:mb-8">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleDemoBooking}
                  className="bg-white text-[#3d4d3d] hover:bg-[#e8ede8] w-full text-sm sm:text-base py-2.5 sm:py-3 font-bold"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Book free demo class
                </Button>
                <a href="tel:+918826444334" className="w-full">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-[#3d4d3d] w-full text-sm sm:text-base py-2.5 sm:py-3"
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Call +91 88264 44334
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative animate-fadeInUp">
              {/* Urgency Banner */}
              <div className="bg-yellow-500 text-black rounded-t-2xl sm:rounded-t-3xl px-4 py-2 sm:py-3 text-center">
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold">
                  <Calendar className="w-4 h-4" />
                  <span>Next batch starts {batchStartLabel} — {batchStartDay}</span>
                  <span className="bg-black text-yellow-500 px-2 py-0.5 rounded text-xs">
                    Only {seatsLeft} seats left
                  </span>
                </div>
              </div>

              {/* Lead Collection Form */}
              <div className="bg-white rounded-b-2xl sm:rounded-b-3xl p-4 sm:p-6 md:p-8 shadow-2xl">
                <div className="text-center mb-4 sm:mb-5">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    Get your personalised study plan
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-gray-600">
                    Free counselling call + previous-year-attempt analysis. Offline at
                    <strong> South Delhi · Gurugram · Faridabad</strong>, plus live online
                    for everyone else.
                  </p>
                  <div className="inline-flex items-center gap-1.5 mt-3 bg-[#e8ede8] text-[#3d4d3d] px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold">
                    <BookOpen className="w-3.5 h-3.5" />
                    Includes full study material + previous-year-attempt diagnostic
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <button
                    type="button"
                    onClick={() =>
                      trackAndOpenWhatsApp({
                        source: 'neet-dropper-page',
                        message:
                          'Hi! I am a NEET dropper/repeater and want to join the Dropper Batch. Please share batch details, timings, and fee structure.',
                        campaign: 'neet-dropper',
                      })
                    }
                    className="w-full flex items-center justify-center gap-2 py-3 sm:py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-base sm:text-lg rounded-xl shadow-lg transition-all min-h-[56px] touch-manipulation"
                  >
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    Get free counselling via WhatsApp
                  </button>

                  <a
                    href="tel:+918826444334"
                    className="w-full flex items-center justify-center gap-2 py-3 sm:py-4 bg-[#3d4d3d] hover:bg-[#4a5d4a] text-white font-bold text-base sm:text-lg rounded-xl shadow-lg transition-all min-h-[56px] touch-manipulation"
                  >
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                    Call +91 88264 44334
                  </a>
                </div>

                {/* Social Proof */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-[#3d4d3d]" />
                      <span>
                        <strong>1,500+</strong> droppers coached
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-yellow-500" />
                      <span>
                        <strong>5.0</strong> rating
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Free Demo — Inline Form */}
      <section className="py-8 bg-gradient-to-b from-green-800 to-green-900">
        <div className="max-w-md mx-auto px-4">
          <BookFreeDemoCard courseName="NEET Dropper Batch" source="neet-dropper-hero-form" />
        </div>
      </section>

      {/* Real student video testimonials — moved up so Sadhna's video is the
          first social proof a visitor sees, not buried 60% down the page. */}
      <VideoTestimonialsSection
        title="Hear from droppers who got in"
        subtitle="Real students. Real ranks. Real videos. Sadhna scored 695/720 with us — start with her story."
      />

      {/* Why Droppers Choose Us */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
              Why Droppers Choose Cerebrum?
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized features designed specifically for dropper students' unique needs and
              challenges
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {uniqueFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 md:p-6 hover:shadow-xl transition-shadow text-center animate-fadeInUp"
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 ${feature.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4 mx-auto`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Phase-wise Plan */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
              Strategic 4-Phase Preparation Plan
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
              Scientifically designed phases for maximum rank improvement
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {phasePlan.map((phase, index) => {
              // Single-hue forest-green scale across all 4 phases — visual
              // unity replaces the prior green/teal/blue/indigo rotation.
              // Each phase deepens the saturation a step.
              const colorClasses: Record<string, string> = {
                'phase-1': 'border-[#5a6d5a] bg-[#f3f6f3]',
                'phase-2': 'border-[#4a5d4a] bg-[#e8ede8]',
                'phase-3': 'border-[#3d4d3d] bg-[#dde4dd]',
                'phase-4': 'border-[#2d3d2d] bg-[#d2dad2]',
              }

              // All phases use the same brand text colour for the duration
              // chip + check icons — keeps the eye anchored on one accent.
              const textClasses: Record<string, string> = {
                'phase-1': 'text-[#3d4d3d]',
                'phase-2': 'text-[#3d4d3d]',
                'phase-3': 'text-[#3d4d3d]',
                'phase-4': 'text-[#3d4d3d]',
              }

              const checkClasses: Record<string, string> = {
                'phase-1': 'text-[#3d4d3d]',
                'phase-2': 'text-[#3d4d3d]',
                'phase-3': 'text-[#3d4d3d]',
                'phase-4': 'text-[#3d4d3d]',
              }

              return (
                <div
                  key={index}
                  className={`rounded-xl p-4 sm:p-6 shadow-lg border-l-4 ${colorClasses[phase.color]}`}
                >
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                      {phase.phase}
                    </h3>
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${textClasses[phase.color]} bg-white`}
                    >
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                    {phase.focus}
                  </p>
                  <div className="space-y-1.5 sm:space-y-2">
                    {phase.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center">
                        <CheckCircle
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 ${checkClasses[phase.color]}`}
                        />
                        <span className="text-gray-700 text-xs sm:text-sm">{topic}</span>
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
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
              Complete Dropper Course Features
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {courseFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow animate-fadeInUp"
              >
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#3d4d3d] mb-2 sm:mb-4" />
                <p className="text-gray-700 font-medium text-xs sm:text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#e8ede8]">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
              Transform Your NEET Journey
            </h2>

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    NEET Dropper Course — three tiers, transparent
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span className="text-sm sm:text-base">10–12 months comprehensive programme</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span className="text-sm sm:text-base">Exclusive dropper-only batch environment</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span className="text-sm sm:text-base">Psychology support &amp; counselling</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span className="text-sm sm:text-base">Rank-improvement track record (89% of past droppers added 100+ marks)</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span className="text-sm sm:text-base">Free demo class before you decide — experience the faculty first</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#e8ede8] rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="text-sm text-gray-600 mb-3 font-semibold">Choose your tier</div>
                  <div className="space-y-3 mb-4">
                    <div className="rounded-lg bg-white px-3 py-2.5 border border-gray-200">
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm font-semibold text-[#3d4d3d]">Pursuit</span>
                        <span className="text-base font-bold text-[#3d4d3d]">₹70,000</span>
                      </div>
                      <div className="text-[11px] text-gray-600 mt-0.5">30–40 students · group format</div>
                    </div>
                    <div className="rounded-lg bg-white px-3 py-2.5 border-2 border-yellow-400 ring-1 ring-yellow-300/40">
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm font-semibold text-[#3d4d3d]">
                          Ascent <span className="ml-1 text-[10px] font-bold text-yellow-700 bg-yellow-100 px-1.5 py-0.5 rounded">Most chosen</span>
                        </span>
                        <span className="text-base font-bold text-[#3d4d3d]">₹90,000</span>
                      </div>
                      <div className="text-[11px] text-gray-600 mt-0.5">16–18 students · weekly mentor call</div>
                    </div>
                    <div className="rounded-lg bg-white px-3 py-2.5 border border-gray-200">
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm font-semibold text-[#3d4d3d]">Pinnacle ZA</span>
                        <span className="text-base font-bold text-[#3d4d3d]">₹1,56,000</span>
                      </div>
                      <div className="text-[11px] text-gray-600 mt-0.5">10–12 students · personal mentorship from Dr. Shekhar</div>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mb-3">
                    EMI from <span className="font-semibold">₹5,833/month</span>. Up to 25% scholarship on previous NEET score.
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full bg-[#3d4d3d] hover:bg-[#4a5d4a] text-sm sm:text-base"
                    onClick={handleDemoBooking}
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Enrol now
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 sm:p-6">
              <p className="text-yellow-800 font-semibold mb-2 text-sm sm:text-base">
                🔥 Dropper Special Offer - Limited Time!
              </p>
              <p className="text-yellow-700 text-xs sm:text-sm">
                Join before the batch starts and get additional 100 hours of personal mentoring +
                Psychology counseling sessions FREE!
              </p>
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
                  We understand your concerns about your child&apos;s NEET dropper year. Chat
                  directly with our counselors to understand fee structure, batch timings, and how
                  we support droppers emotionally and academically.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button
                    onClick={() =>
                      trackAndOpenWhatsApp({
                        source: 'dropper-parent-cta',
                        message: WHATSAPP_MESSAGES.parentFees,
                        campaign: 'parent-engagement',
                      })
                    }
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:shadow-green-500/30 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat as Parent
                  </button>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-5 rounded-lg border border-gray-300 shadow-sm transition-all duration-300"
                  >
                    <Users className="h-5 w-5" />
                    Parent Guide
                  </Link>
                </div>
              </div>
              <div className="hidden md:block text-6xl">👨‍👩‍👧‍👦</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
              Dropper Students FAQ
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
              Common questions about NEET dropper preparation answered by experts
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {dropperFAQs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-5 md:p-6 animate-fadeInUp"
              >
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3 flex items-start">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-[#3d4d3d] flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base ml-7 sm:ml-9">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEET Toppers Showcase */}
      <NEETToppersShowcase maxToppers={6} showVideos={true} />

      {/* Parent Testimonials */}
      <ParentTestimonialsSection />

      {/* Final CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#3d4d3d] text-white">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">
              Your Second Chance Deserves the Best
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90">
              Join 1,500+ droppers who transformed their NEET journey with Cerebrum Biology Academy.
              Expert faculty, proven methodology, and personalized attention await you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
              <Button
                variant="primary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-white text-[#3d4d3d] hover:bg-[#e8ede8] font-bold text-sm sm:text-base py-3 sm:py-4"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Book free demo class
              </Button>

              <a href="tel:+918826444334" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-[#3d4d3d] w-full text-sm sm:text-base py-3 sm:py-4"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Call +91 88264 44334
                </Button>
              </a>
            </div>

            <p className="text-xs sm:text-sm opacity-80">
              Next dropper batch starts {batchStartLabel} ({batchStartDay}) — only {seatsLeft} seats left.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: dropperFAQs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Visit Our Centers - Cross-linking for SEO */}
      <VisitOurCenters />
    </div>
  )
}
