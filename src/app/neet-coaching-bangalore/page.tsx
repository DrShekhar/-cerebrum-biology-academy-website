'use client'

import { motion } from 'framer-motion'
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

const bangaloreLocalities = [
  {
    name: 'Koramangala',
    slug: 'koramangala',
    students: '320+',
    highlight: 'Premium Tech Hub',
    priority: 'high',
  },
  {
    name: 'Indiranagar',
    slug: 'indiranagar',
    students: '285+',
    highlight: 'Central Bangalore',
    priority: 'high',
  },
  {
    name: 'Whitefield',
    slug: 'whitefield',
    students: '260+',
    highlight: 'IT Corridor',
    priority: 'high',
  },
  {
    name: 'Electronic City',
    slug: 'electronic-city',
    students: '240+',
    highlight: 'South Bangalore Tech',
    priority: 'high',
  },
  {
    name: 'HSR Layout',
    slug: 'hsr-layout',
    students: '295+',
    highlight: 'Residential Hub',
    priority: 'high',
  },
  {
    name: 'Jayanagar',
    slug: 'jayanagar',
    students: '230+',
    highlight: 'Traditional Locality',
    priority: 'high',
  },
  {
    name: 'JP Nagar',
    slug: 'jp-nagar',
    students: '210+',
    highlight: 'South Bangalore',
    priority: 'high',
  },
  {
    name: 'BTM Layout',
    slug: 'btm-layout',
    students: '225+',
    highlight: 'Near Silk Board',
    priority: 'high',
  },
  {
    name: 'Marathahalli',
    slug: 'marathahalli',
    students: '195+',
    highlight: 'Outer Ring Road',
    priority: 'medium',
  },
  {
    name: 'Banashankari',
    slug: 'banashankari',
    students: '185+',
    highlight: 'Metro Connected',
    priority: 'medium',
  },
  {
    name: 'Malleshwaram',
    slug: 'malleshwaram',
    students: '175+',
    highlight: 'Heritage Area',
    priority: 'medium',
  },
  {
    name: 'Rajajinagar',
    slug: 'rajajinagar',
    students: '165+',
    highlight: 'West Bangalore',
    priority: 'medium',
  },
  {
    name: 'Hebbal',
    slug: 'hebbal',
    students: '155+',
    highlight: 'North Bangalore',
    priority: 'medium',
  },
  {
    name: 'Yelahanka',
    slug: 'yelahanka',
    students: '140+',
    highlight: 'Near Airport',
    priority: 'medium',
  },
  {
    name: 'Bellandur',
    slug: 'bellandur',
    students: '180+',
    highlight: 'Sarjapur Road',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Real-time teaching with instant doubt resolution - skip Bangalore traffic completely',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Exclusive Bangalore batches with personal attention for every student',
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
    description: 'Morning, afternoon, and evening batches to fit Bangalore schedules',
  },
  {
    icon: Shield,
    title: 'No Commute Stress',
    description: 'Save 2+ hours daily on Bangalore traffic - study from your home',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '360', icon: Star },
  { label: 'Bangalore Students', value: '3,000+', icon: Users },
  { label: 'Areas Covered', value: '15+', icon: MapPin },
]

const faqs = [
  {
    question: 'Why choose online coaching over traveling across Bangalore for NEET preparation?',
    answer:
      'Bangalore students typically spend 2-4 hours daily stuck in traffic for coaching. Our online live classes deliver quality teaching from AIIMS trained faculties directly to your home. Save time, avoid peak hour traffic jams, and focus 100% on NEET preparation. Our 98% success rate proves online is as effective as offline.',
  },
  {
    question: 'Which areas in Bangalore do you serve?',
    answer:
      'We serve all major Bangalore localities including Koramangala, Indiranagar, Whitefield, Electronic City, HSR Layout, Jayanagar, JP Nagar, BTM Layout, Marathahalli, Banashankari, Malleshwaram, Rajajinagar, Hebbal, Yelahanka, Bellandur, and all surrounding areas. Students from any Bangalore pincode can join our online live classes.',
  },
  {
    question: 'What is the fee for NEET coaching in Bangalore?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 48,000 per year - significantly lower than premium Bangalore coaching centers that charge Rs 1.5-2 lakhs. Plus you save on travel costs and time. We offer EMI options and merit scholarships.',
  },
  {
    question: 'How do live classes work for Bangalore students?',
    answer:
      'We conduct live interactive classes via Zoom/Google Meet. Ask questions in real-time, participate in discussions, and interact with teachers just like a physical classroom. All classes are recorded for revision. Dedicated Bangalore batches ensure peer interaction with local students.',
  },
  {
    question: 'Is online coaching effective for competitive exams like NEET?',
    answer:
      'Yes! Our 98% success rate and 67+ AIIMS selections prove that online coaching is highly effective. Bangalore students particularly benefit as they save commute time for self-study. Our interactive live classes, doubt sessions, and AI-powered practice tests ensure comprehensive preparation.',
  },
  {
    question: 'Do you understand Karnataka PU board patterns?',
    answer:
      'Absolutely! We have specialized batches for Karnataka PU board students. Our faculty understands the PU syllabus, exam patterns, and how to balance PU board exams with NEET preparation. Many of our Bangalore students have scored 95%+ in PU while also cracking NEET.',
  },
]

const premiumSchools = [
  'DPS Bangalore',
  'Bishop Cotton',
  "St. Joseph's Boys",
  'National Public School',
  'Inventure Academy',
  'Greenwood High',
  'CMR National',
  "Kumaran's",
  'Vidyashilp Academy',
  'Legacy School',
]

const whyBangalore = [
  {
    icon: Building,
    title: 'Quality Without Traffic',
    description:
      'From Silk Board to Hebbal Flyover, get premium coaching without spending hours in Bangalore traffic or metro changes.',
  },
  {
    icon: Train,
    title: 'Metro-Proof Learning',
    description:
      'Bangalore traffic and metro delays disrupt commute but not your studies. Attend classes from home regardless of traffic conditions.',
  },
  {
    icon: GraduationCap,
    title: 'Karnataka PU Board Expert',
    description:
      'We understand Karnataka PU board patterns, Bangalore school schedules, and local academic challenges. Personalized support for Bangalore students.',
  },
]

export default function NeetCoachingBangalorePage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_bangalore', {
        event_category: 'conversion',
        event_label: 'neet_coaching_bangalore_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Bangalore"
        citySlug="bangalore"
        state="Karnataka"
        localities={bangaloreLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="3000"
        coordinates={{ lat: '12.9716', lng: '77.5946' }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-700 to-green-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              Serving All Bangalore Localities
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Bangalore</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Koramangala | Indiranagar | Whitefield | HSR | Electronic City | Jayanagar
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Skip the Bangalore traffic commute. Get AIIMS trained faculties, 98% success rate, and
              live interactive classes - all from your Bangalore home. Join 3,000+ Bangalore
              students already preparing with us.
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
                  className="border-white text-white hover:bg-white hover:text-green-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Course Details
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bangalore Localities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              NEET Coaching Across All Bangalore Localities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From MG Road to Outer Ring Road, Yeshwanthpur to Electronic City - we serve students
              from every corner of Bangalore. Click on your locality for location-specific
              information.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bangaloreLocalities.map((locality, index) => (
              <motion.div
                key={locality.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={`/locations/bangalore/${locality.slug}`}>
                  <div
                    className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                      locality.priority === 'high' ? 'ring-2 ring-green-600' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {locality.students}
                    </div>
                    <div className="text-sm text-gray-500">{locality.highlight}</div>
                    {locality.priority === 'high' && (
                      <div className="mt-2 inline-flex items-center text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 mr-1" />
                        High Demand Area
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Bangalore Students Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Bangalore Students Choose Online NEET Coaching
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop the daily traffic struggle. Premium education delivered to your doorstep.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyBangalore.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-green-50 rounded-xl p-8 border border-green-100"
              >
                <item.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Bangalore Schools Trust Us
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {premiumSchools.map((school, index) => (
                <motion.span
                  key={school}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm"
                >
                  {school}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Cerebrum for NEET Coaching in Bangalore?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <feature.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions - NEET Coaching Bangalore
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-green-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Cities Section */}
      <RelatedCityLinks currentCity="bangalore" variant="default" />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from Bangalore Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS trained faculties, 3,000+ Bangalore students. No traffic
              commute required!
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
                  className="border-white text-white hover:bg-white hover:text-green-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All Bangalore Areas</span>
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
          </motion.div>
        </div>
      </section>
    </div>
  )
}
