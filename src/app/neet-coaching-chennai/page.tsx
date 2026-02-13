'use client'

import {
  MapPin,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  Shield,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Building,
  Train,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import { CitySchema } from '@/components/seo/CitySchema'

const chennaiLocalities = [
  {
    name: 'Anna Nagar',
    slug: 'anna-nagar',
    students: '240+',
    highlight: 'Premium Residential Hub',
    priority: 'high',
  },
  {
    name: 'T Nagar',
    slug: 't-nagar',
    students: '210+',
    highlight: 'Commercial & Shopping Center',
    priority: 'high',
  },
  {
    name: 'Adyar',
    slug: 'adyar',
    students: '195+',
    highlight: 'Educational Hub',
    priority: 'high',
  },
  {
    name: 'Velachery',
    slug: 'velachery',
    students: '225+',
    highlight: 'IT Corridor & Metro Connected',
    priority: 'high',
  },
  {
    name: 'OMR',
    slug: 'omr',
    students: '260+',
    highlight: 'Old Mahabalipuram Road',
    priority: 'high',
  },
  {
    name: 'Nungambakkam',
    slug: 'nungambakkam',
    students: '175+',
    highlight: 'Central Chennai',
    priority: 'high',
  },
  {
    name: 'Mylapore',
    slug: 'mylapore',
    students: '165+',
    highlight: 'Cultural & Heritage Area',
    priority: 'high',
  },
  {
    name: 'Tambaram',
    slug: 'tambaram',
    students: '200+',
    highlight: 'Southern Suburbs Hub',
    priority: 'high',
  },
  {
    name: 'Porur',
    slug: 'porur',
    students: '180+',
    highlight: 'Western Chennai',
    priority: 'medium',
  },
  {
    name: 'Guindy',
    slug: 'guindy',
    students: '155+',
    highlight: 'Industrial & IT Hub',
    priority: 'medium',
  },
  {
    name: 'Vadapalani',
    slug: 'vadapalani',
    students: '170+',
    highlight: 'Metro Connected Area',
    priority: 'medium',
  },
  {
    name: 'Ashok Nagar',
    slug: 'ashok-nagar',
    students: '145+',
    highlight: 'Residential Zone',
    priority: 'medium',
  },
  {
    name: 'KK Nagar',
    slug: 'kk-nagar',
    students: '140+',
    highlight: 'Western Suburbs',
    priority: 'medium',
  },
  {
    name: 'Kilpauk',
    slug: 'kilpauk',
    students: '130+',
    highlight: 'Medical & Education Hub',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Real-time teaching with instant doubt resolution - skip Chennai traffic completely',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Exclusive Chennai batches with personal attention for every student',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculties',
    description: 'Expert doctors and teachers trained at premier medical institutions',
  },
  {
    icon: BookOpen,
    title: 'Complete Study Material',
    description: 'NCERT-based notes, previous year questions, mock tests included',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches to fit Chennai schedules',
  },
  {
    icon: Shield,
    title: 'No Commute Stress',
    description: 'Save 2+ hours daily on Chennai traffic - study from your home',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '360', icon: Star },
  { label: 'Chennai Students', value: '2,300+', icon: Users },
  { label: 'Areas Covered', value: '14+', icon: MapPin },
]

const faqs = [
  {
    question: 'Why choose online coaching over traveling across Chennai for NEET preparation?',
    answer:
      'Chennai students typically spend 2-3 hours daily in traffic or on suburban trains for coaching. Our online live classes deliver quality teaching from AIIMS trained faculties directly to your home. Save time, avoid Chennai monsoon and traffic disruptions, and focus 100% on NEET preparation. Our 98% success rate proves online is as effective as offline.',
  },
  {
    question: 'Which areas in Chennai do you serve?',
    answer:
      'We serve all major Chennai localities including Anna Nagar, T Nagar, Adyar, Velachery, OMR (Old Mahabalipuram Road), Nungambakkam, Mylapore, Tambaram, Porur, Guindy, Vadapalani, Ashok Nagar, KK Nagar, Kilpauk, and all surrounding areas. Students from any Chennai pincode can join our online live classes.',
  },
  {
    question: 'What is the fee for NEET coaching in Chennai?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 48,000 per year - significantly lower than premium Chennai coaching centers that charge Rs 1.5-2 lakhs. Plus you save on travel costs. We offer EMI options and merit scholarships.',
  },
  {
    question: 'How do live classes work for Chennai students?',
    answer:
      'We conduct live interactive classes via Zoom/Google Meet. Ask questions in real-time, participate in discussions, and interact with teachers just like a physical classroom. All classes are recorded for revision. Dedicated Chennai batches ensure peer interaction with local students.',
  },
  {
    question: 'Is online coaching effective for competitive exams like NEET?',
    answer:
      'Yes! Our 98% success rate and 67+ AIIMS selections prove that online coaching is highly effective. Chennai students particularly benefit as they save commute time for self-study. Our interactive live classes, doubt sessions, and AI-powered practice tests ensure comprehensive preparation.',
  },
]

const premiumSchools = [
  'PSBB',
  'DAV',
  'Chettinad',
  "Bhavan's",
  'SBOA',
  'P.S. Senior Secondary',
  'Lady Andal',
  'Padma Seshadri',
  'Don Bosco',
  'Vidya Mandir',
]

const whyChennai = [
  {
    icon: Building,
    title: 'Quality Without Traffic',
    description:
      'From Egmore to OMR, get premium coaching without spending hours in Chennai traffic or crowded suburban trains.',
  },
  {
    icon: Train,
    title: 'Monsoon-Proof Learning',
    description:
      'Chennai rains and waterlogging disrupt commute but not your studies. Attend classes from home even during heavy monsoons.',
  },
  {
    icon: GraduationCap,
    title: 'Local Understanding',
    description:
      'We understand Tamil Nadu HSC board patterns, Chennai school schedules, and local academic challenges. Personalized support for Chennai students.',
  },
]

export default function NeetCoachingChennaiPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_chennai', {
        event_category: 'conversion',
        event_label: 'neet_coaching_chennai_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Chennai"
        citySlug="chennai"
        state="Tamil Nadu"
        localities={chennaiLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="2800"
        coordinates={{ lat: '13.0827', lng: '80.2707' }}
      />
      <section className="relative bg-gradient-to-br from-red-800 to-red-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              Serving All Chennai Localities
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Chennai</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Anna Nagar | T Nagar | Adyar | Velachery | OMR | Tambaram | Mylapore
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Skip the Chennai traffic and suburban train commute. Get AIIMS trained faculties, 98%
              success rate, and live interactive classes - all from your Chennai home. Join 2,300+
              Chennai students already preparing with us.
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
                  className="border-white text-white hover:bg-white hover:text-red-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Course Details
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

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              NEET Coaching Across All Chennai Localities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Egmore to OMR, Kilpauk to Tambaram - we serve students from every corner of
              Chennai. Click on your locality for location-specific information.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {chennaiLocalities.map((locality, index) => (
              <div
                key={locality.slug}
               className="animate-fadeInUp">
                <Link href={`/locations/chennai/${locality.slug}`}>
                  <div
                    className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                      locality.priority === 'high' ? 'ring-2 ring-red-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                      <MapPin className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold text-red-600 mb-1">{locality.students}</div>
                    <div className="text-sm text-gray-500">{locality.highlight}</div>
                    {locality.priority === 'high' && (
                      <div className="mt-2 inline-flex items-center text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 mr-1" />
                        High Demand Area
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Chennai Students Choose Online NEET Coaching
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop the daily traffic struggle. Premium education delivered to your doorstep.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyChennai.map((item, index) => (
              <div
                key={item.title}
                className="bg-gradient-to-br bg-red-50 rounded-xl p-8 border border-red-100 animate-fadeInUp"
              >
                <item.icon className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Chennai Schools Trust Us
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {premiumSchools.map((school, index) => (
                <span
                  key={school}
                  className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm animate-fadeInUp"
                >
                  {school}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Cerebrum for NEET Coaching in Chennai?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-8 shadow-lg animate-fadeInUp"
              >
                <feature.icon className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions - NEET Coaching Chennai
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-red-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Cities Section */}
      <RelatedCityLinks currentCity="chennai" variant="default" />

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from Chennai Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS trained faculties, 2,300+ Chennai students. No traffic commute
              required!
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
                  className="border-white text-white hover:bg-white hover:text-red-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All Chennai Areas</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Live Classes</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>No Commute Needed</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
