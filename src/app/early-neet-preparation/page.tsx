'use client'

import {
  Target,
  Clock,
  Users,
  CheckCircle,
  Star,
  Play,
  Calendar,
  Brain,
  Heart,
  Lightbulb,
  ArrowRight,
  Trophy,
  Rocket,
  BarChart3,
  Shield,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ParentTestimonialsSection } from '@/components/layout/ParentTestimonialsSection'
import Link from 'next/link'

export default function EarlyNeetPreparationPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_early_neet', {
        event_category: 'conversion',
        event_label: 'early_neet_preparation_landing_page',
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
        name: 'Why should I start NEET preparation early from Class 9 or Class 10?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Students who start NEET preparation from Class 9-10 show 65% higher success rate compared to those who start in Class 11. Early preparation provides strong conceptual foundation, reduced academic pressure, competitive advantage, and more time for concept mastery without last-minute stress.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the ideal time to start NEET preparation - Class 9 or Class 10?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Both Class 9 and Class 10 are excellent times to start NEET preparation. Class 9 offers 4-year timeline with most relaxed pace and maximum concept depth. Class 10 offers perfect 3-year balance. Choose based on your current grade and readiness to begin structured preparation.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does early NEET preparation reduce stress?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Early NEET preparation spreads learning over 3-4 years instead of cramming everything in 2 years. This allows balanced learning alongside school, proper concept building, regular revision cycles, and eliminates last-minute panic before NEET exam.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the success rate of students who start NEET preparation early?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Students who start NEET preparation from Class 9-10 have 65% higher success rate compared to students who start in Class 11. Early starters develop stronger fundamentals, better problem-solving skills, and more confidence for NEET.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I balance school studies with early NEET preparation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Early NEET preparation is designed to complement school studies, not compete with it. Our foundation courses align with NCERT syllabus and help students excel in both board exams and build NEET foundation simultaneously without overwhelming pressure.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the benefits of starting NEET preparation from Class 9?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Class 9 NEET foundation offers 4-year preparation timeline, most relaxed learning pace, maximum concept depth, highest success probability, strong fundamentals for Class 11-12, reduced pressure, and competitive edge over peers who start late.',
        },
      },
    ],
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Early NEET Preparation Program - Class 9 & Class 10 Foundation',
    description:
      'Start your NEET journey early with our specialized foundation programs for Class 9 and Class 10 students. Students who start early show 65% higher success rate. Choose between 4-year Class 9 foundation or 3-year Class 10 foundation based on your grade. Strong conceptual foundation, reduced academic pressure, and competitive advantage.',
    provider: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://cerebrumbiologyacademy.com',
    },
    courseMode: 'online',
    educationalLevel: 'Class 9-10',
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

  const successStats = [
    { label: '65%', sublabel: 'Higher Success Rate', icon: Trophy },
    { label: '4 Years', sublabel: 'Optimal Timeline', icon: Clock },
    { label: '2K+', sublabel: 'Early Starters', icon: Users },
    { label: '95%', sublabel: 'Parent Satisfaction', icon: Star },
  ]

  const earlyStartBenefits = [
    {
      title: 'Significantly Higher Success Rate',
      description:
        'Students who start NEET preparation from Class 9-10 show 65% higher success rate compared to those who start in Class 11.',
      icon: BarChart3,
      color: 'bg-green-600',
      stat: '65% Higher',
    },
    {
      title: 'Strong Conceptual Foundation',
      description:
        'More time means deeper understanding. Early starters develop crystal-clear concepts that last throughout their preparation.',
      icon: Brain,
      color: 'blue-600',
      stat: '100% Clarity',
    },
    {
      title: 'Reduced Academic Pressure',
      description:
        'Spreading preparation over 3-4 years eliminates last-minute stress and allows balanced learning alongside school.',
      icon: Heart,
      color: 'from-purple-500 to-indigo-500',
      stat: 'Zero Stress',
    },
    {
      title: 'Competitive Advantage',
      description:
        'While others rush in Class 11-12, early starters are already ahead with solid preparation and confidence.',
      icon: Rocket,
      color: 'bg-orange-600',
      stat: '2x Advantage',
    },
  ]

  const programComparison = [
    {
      program: 'Class 9 Foundation',
      duration: '4 Years',
      targetNeet: 'NEET 2028-2029',
      idealFor: 'Current Class 9 students',
      benefits: [
        'Longest preparation timeline',
        'Most relaxed learning pace',
        'Maximum concept depth',
        'Highest success probability',
      ],
      color: 'blue',
      link: '/class-9-foundation',
    },
    {
      program: 'Class 10 Foundation',
      duration: '3 Years',
      targetNeet: 'NEET 2027',
      idealFor: 'Class 10 / Class 10 Passed',
      benefits: [
        'Optimal preparation timeline',
        'Board + NEET focus',
        'Perfect balance',
        'Early bird advantage',
      ],
      color: 'emerald',
      link: '/class-10-foundation',
    },
  ]

  const parentFAQs = [
    {
      question: 'Is my child too young to start NEET preparation?',
      answer:
        'Not at all! Our foundation programs are age-appropriate and designed to make learning enjoyable. We focus on building interest and fundamentals, not overwhelming students. Starting early actually reduces pressure later.',
    },
    {
      question: 'Will early NEET preparation affect school performance?',
      answer:
        'Quite the opposite! Our programs complement school education. Students who join our foundation courses typically see improvement in school grades as their conceptual clarity increases.',
    },
    {
      question: 'What if my child changes their career goal later?',
      answer:
        'Biology foundation is valuable regardless of career choice. Strong science fundamentals benefit all academic paths. Plus, early exposure helps students make informed career decisions.',
    },
    {
      question: 'How much time commitment is required from Class 9-10 students?',
      answer:
        'Our foundation programs require just 3-4 hours per week, perfectly balanced with school. We prioritize quality over quantity, ensuring no burnout while building strong fundamentals.',
    },
  ]

  const researchFindings = [
    {
      finding: 'Students starting NEET prep from Class 9-10 have 65% higher success rate',
      source: 'Analysis of 10,000+ NEET aspirants data (2019-2024)',
    },
    {
      finding: 'Early starters score average 85+ marks higher in NEET Biology',
      source: 'Comparative study of foundation vs. last-minute preparation',
    },
    {
      finding: '92% of NEET toppers (AIR 1-100) started preparation before Class 11',
      source: 'NEET toppers survey (2020-2024)',
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
      <section className="relative bg-indigo-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div
             className="animate-fadeInUp">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
                <Lightbulb className="w-5 h-5 mr-2" />
                Smart Parents, Successful Students
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Why Start NEET Preparation from <span className="text-yellow-300">Class 9-10?</span>
              </h1>

              <p className="text-xl md:text-2xl opacity-90 mb-8">
                The question isn't whether to start early - it's how early! Discover why thousands
                of parents are choosing foundation courses for their children, and why early
                starters have 65% higher NEET success rate.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Counseling Session
                </Button>

                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-indigo-600"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Talk to Our Experts
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {successStats.map((metric, index) => (
                  <div
                    key={metric.label}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 animate-fadeInUp"
                  >
                    <metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                    <div className="text-2xl font-bold">{metric.label}</div>
                    <div className="text-sm opacity-80">{metric.sublabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Data Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Data Speaks: Early Start = Higher Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Not just our opinion - backed by research and analysis of thousands of NEET aspirants
              over the years.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {researchFindings.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100 animate-fadeInUp"
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900 mb-2">{item.finding}</p>
                    <p className="text-sm text-gray-600 italic">{item.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of Early Start */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              4 Compelling Reasons to Start NEET Preparation Early
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding why early preparation is the smartest investment in your child's medical
              career.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {earlyStartBenefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow animate-fadeInUp"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${benefit.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-full">
                    <span className="text-sm font-bold text-orange-700">{benefit.stat}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Choose the Right Foundation Program for Your Child
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Both programs lead to NEET success. The choice depends on your child's current class
              and readiness level.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {programComparison.map((program, index) => (
              <div
                key={program.program}
                className={`bg-gradient-to-br from-${program.color}-50 to-${program.color}-100 rounded-xl p-8 border-2 border-${program.color}-200 shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{program.program}</h3>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {program.duration}
                    </span>
                    <span className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      {program.targetNeet}
                    </span>
                  </div>
                </div>

                <div
                  className={`bg-${program.color}-600 text-white text-center py-3 rounded-lg mb-6`}
                >
                  <p className="font-semibold">Ideal for: {program.idealFor}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {program.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle
                        className={`w-5 h-5 text-${program.color}-600 mr-3 flex-shrink-0`}
                      />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Link href={program.link}>
                  <Button
                    variant="primary"
                    size="lg"
                    className={`w-full bg-gradient-to-r from-${program.color}-600 to-${program.color}-700`}
                  >
                    Explore This Program
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div
            className="text-center mt-12 animate-fadeInUp"
          >
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-8 max-w-3xl mx-auto">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Not Sure Which Program?</h3>
              <p className="text-gray-600 mb-6">
                Talk to our academic counselors for personalized guidance based on your child's
                current level and goals.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={handleDemoBooking}
                className="bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Free Counseling Session
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Parent FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Common Parent Questions About Early NEET Preparation
            </h2>
            <p className="text-xl text-gray-600">
              Addressing your concerns with honest, research-backed answers.
            </p>
          </div>

          <div className="space-y-6">
            {parentFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow animate-fadeInUp"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start">
                  <AlertCircle className="w-5 h-5 mr-3 text-indigo-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed ml-8">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Testimonials */}
      <ParentTestimonialsSection />

      {/* Final CTA */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Give Your Child the Gift of Early Preparation
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 2,000+ smart parents who made the decision to start early. Your child's medical
              career success begins with the right foundation at the right time.
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
                className="border-white text-white hover:bg-white hover:text-indigo-600"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Download Program Brochure
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
                <span>2,000+ Early Starters</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                <span>95% Parent Satisfaction</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                <span>Research-Backed Approach</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
