'use client'

import {
  Building2,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Target,
  Shield,
  Briefcase,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/seo'

const instituteHighlights = [
  {
    icon: Briefcase,
    title: '15+ Years Experience',
    description: 'Established institute with proven track record since 2008.',
    stat: '15+',
  },
  {
    icon: Trophy,
    title: '98% Success Rate',
    description: 'Highest selection rate among NEET coaching institutes.',
    stat: '98%',
  },
  {
    icon: Users,
    title: '1,50,000+ Alumni',
    description: 'Doctors serving across India and abroad.',
    stat: '1,50K+',
  },
  {
    icon: Award,
    title: 'AIIMS Faculty',
    description: '100% faculty trained at premier medical institutions.',
    stat: '100%',
  },
]

const features = [
  {
    icon: GraduationCap,
    title: 'Expert Faculty Team',
    description: 'Faculty with 10-20 years of NEET teaching experience from AIIMS background.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Curriculum',
    description: 'NCERT-focused syllabus with competitive exam strategies.',
  },
  {
    icon: Target,
    title: 'Result-Oriented Approach',
    description: 'Structured program designed for maximum NEET score improvement.',
  },
  {
    icon: Video,
    title: 'Hybrid Learning',
    description: 'Choose offline at our centres or live online classes.',
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Regular audits, feedback systems, and continuous improvement.',
  },
  {
    icon: Clock,
    title: 'Year-Round Programs',
    description: 'Foundation, crash courses, and dropper batches available.',
  },
]

const courses = [
  {
    name: 'NEET Foundation (Class 11)',
    duration: '2 Years',
    description: 'Build strong fundamentals from Class 11 for NEET success.',
    features: ['Complete NCERT', 'Conceptual clarity', 'Regular tests'],
  },
  {
    name: 'NEET Regular (Class 12)',
    duration: '1 Year',
    description: 'Intensive preparation for Class 12 students.',
    features: ['Board + NEET', 'Mock tests', 'Previous years'],
  },
  {
    name: 'NEET Dropper',
    duration: '1 Year',
    description: 'Dedicated batch for repeaters with focused preparation.',
    features: ['Intensive revision', 'Weak area focus', 'Mental support'],
  },
  {
    name: 'NEET Crash Course',
    duration: '3-6 Months',
    description: 'Quick revision and exam strategies for final preparation.',
    features: ['Quick revision', 'Exam strategies', 'Full tests'],
  },
]

const successMetrics = [
  { label: 'Years Experience', value: '15+', icon: Building2 },
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Total Alumni', value: '1,50K+', icon: Users },
  { label: 'Top Score', value: '720', icon: Star },
]

const faqs = [
  {
    question: 'What makes Cerebrum the best NEET coaching institute?',
    answer:
      'Cerebrum Biology Academy is recognized as the best NEET coaching institute due to our 15+ years of experience, 98% success rate, AIIMS-trained faculty, small batch sizes, and comprehensive study material. Our structured approach and personalized attention ensure every student reaches their potential.',
  },
  {
    question: 'Is there a NEET academy near me?',
    answer:
      'We have 4 physical centres in Delhi NCR - Rohini, Gurugram, South Extension, and Faridabad. If you are not near any of these, join our online program which offers the same quality education with live interactive classes.',
  },
  {
    question: 'What courses does your NEET institute offer?',
    answer:
      'We offer multiple programs: NEET Foundation (2-year for Class 11), NEET Regular (1-year for Class 12), NEET Dropper batch (for repeaters), and NEET Crash Course (3-6 months for quick revision). All courses include Biology, Physics, and Chemistry.',
  },
  {
    question: 'What is the fee structure at your institute?',
    answer:
      'Our fees range from Rs 24,000 to Rs 48,000 per year depending on the program. This includes complete study material, mock tests, doubt sessions, and online resources. EMI options and merit scholarships are available.',
  },
  {
    question: 'How to enroll at your NEET coaching institute?',
    answer:
      'You can enroll by: 1) Booking a free demo class online, 2) Visiting any of our centres, 3) Calling us at +918826444334. We recommend attending a demo class first to experience our teaching methodology.',
  },
]

export default function NeetCoachingInstitutePage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_institute', {
        event_category: 'conversion',
        event_label: 'neet_coaching_institute_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation + Schema */}
      <div className="mx-auto max-w-7xl px-4 pt-4 bg-indigo-900">
        <BreadcrumbSchema
          items={[{ label: 'NEET Coaching Institute', isCurrentPage: true }]}
          className="text-indigo-200 [&_a]:text-indigo-200 [&_a:hover]:text-white [&_.font-medium]:text-white"
        />
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
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

      {/* Hero Section */}
      <section className="relative bg-indigo-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Building2 className="w-5 h-5 mr-2 text-yellow-300" />
              Established 2008 | 15+ Years of Excellence
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching Institute</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              15+ Years Experience | 98% Success Rate | 1,50,000+ Selections
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Looking for the best institute for NEET? Join Cerebrum Biology Academy - a trusted
              NEET coaching institute with proven results, expert faculty, and comprehensive
              programs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Courses
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-fadeInUp"
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Institute Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our NEET Institute?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cerebrum Biology Academy stands out among NEET coaching institutes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instituteHighlights.map((item, index) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-8 shadow-lg text-center animate-fadeInUp"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">{item.stat}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Offered */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Courses at Our NEET Institute
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive programs for every stage of NEET preparation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <div
                key={course.name}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100 animate-fadeInUp"
              >
                <div className="text-sm text-purple-600 font-medium mb-2">{course.duration}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                <ul className="space-y-2">
                  {course.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses">
              <Button variant="primary" size="lg">
                View All Courses
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Features of Our NEET Coaching Institute
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-8 shadow-lg animate-fadeInUp"
              >
                <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              FAQs - NEET Coaching Institute
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-purple-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join the Best NEET Coaching Institute Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              15+ years of excellence, 98% success rate, 1,50,000+ successful alumni
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>15+ Years</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>98% Success</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>1,50,000+ Alumni</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>AIIMS Faculty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/best-neet-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Best NEET Coaching
            </Link>
            <Link
              href="/neet-coaching-centre"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Coaching Centre
            </Link>
            <Link
              href="/neet-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Classes
            </Link>
            <Link
              href="/neet-preparation"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Preparation
            </Link>
            <Link
              href="/neet-biology-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Biology Classes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
