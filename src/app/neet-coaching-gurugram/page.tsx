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

const gurugramLocalities = [
  // ULTRA-PREMIUM LOCALITIES (Golf Course Road + DLF Phases)
  {
    name: 'DLF Phase 5 (Magnolias/Camellias)',
    slug: 'dlf-phase-5',
    students: '28+',
    highlight: 'Ultra-Luxury Golf Course',
    priority: 'high',
  },
  {
    name: 'Golf Course Road',
    slug: 'golf-course-road',
    students: '180+',
    highlight: 'Premium Residential',
    priority: 'high',
  },
  {
    name: 'DLF Phase 3 (Shri Ram School)',
    slug: 'dlf-phase-3',
    students: '48+',
    highlight: 'Near Shri Ram School',
    priority: 'high',
  },
  {
    name: 'DLF Phase 1',
    slug: 'dlf-phase-1',
    students: '165+',
    highlight: 'Cyber City Area',
    priority: 'high',
  },
  {
    name: 'DLF Phase 2',
    slug: 'dlf-phase-2',
    students: '42+',
    highlight: 'Premium Bungalows',
    priority: 'high',
  },
  {
    name: 'DLF Phase 4',
    slug: 'dlf-phase-4',
    students: '135+',
    highlight: 'Galleria Market',
    priority: 'high',
  },
  // PREMIUM GATED COMMUNITIES
  {
    name: 'Nirvana Country',
    slug: 'nirvana-country',
    students: '35+',
    highlight: 'Premium Villas',
    priority: 'high',
  },
  {
    name: 'Sohna Road (Central Park)',
    slug: 'sohna-road',
    students: '65+',
    highlight: 'Belgravia/Vatika City',
    priority: 'high',
  },
  // AAKASH COMPETITOR AREAS
  {
    name: 'Sector 49 (South City 2)',
    slug: 'sector-49',
    students: '145+',
    highlight: 'Near Aakash - Better Alternative',
    priority: 'high',
  },
  {
    name: 'Sector 84 (M3M Market)',
    slug: 'sector-84',
    students: '55+',
    highlight: 'Near Aakash - 60% Cheaper',
    priority: 'high',
  },
  {
    name: 'Sector 14',
    slug: 'sector-14',
    students: '145+',
    highlight: 'Old Gurugram',
    priority: 'medium',
  },
  // OTHER KEY LOCALITIES
  {
    name: 'Sushant Lok',
    slug: 'sushant-lok',
    students: '220+',
    highlight: 'Established Hub',
    priority: 'high',
  },
  {
    name: 'Sector 56',
    slug: 'sector-56',
    students: '190+',
    highlight: 'Near Golf Course Ext',
    priority: 'medium',
  },
  {
    name: 'Sector 43',
    slug: 'sector-43',
    students: '130+',
    highlight: 'Central Location',
    priority: 'medium',
  },
  {
    name: 'Sector 51',
    slug: 'sector-51',
    students: '125+',
    highlight: 'Near Nirvana Country',
    priority: 'medium',
  },
  {
    name: 'Sector 57',
    slug: 'sector-57',
    students: '140+',
    highlight: 'Scottish High Area',
    priority: 'medium',
  },
  {
    name: 'South City 1',
    slug: 'south-city-1',
    students: '155+',
    highlight: 'South Gurugram',
    priority: 'medium',
  },
  {
    name: 'New Gurugram',
    slug: 'new-gurugram',
    students: '170+',
    highlight: 'Dwarka Expressway',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time teaching with instant doubt resolution - no more Delhi travel needed',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Exclusive Gurugram batches with personal attention for every student',
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
    description: 'Morning, afternoon, and evening batches to fit Gurugram schedules',
  },
  {
    icon: Shield,
    title: 'No Delhi Travel',
    description: 'Save 3+ hours daily on border crossing - study from your Gurugram home',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '360', icon: Star },
  { label: 'Gurugram Students', value: '2,100+', icon: Users },
  { label: 'Localities Covered', value: '18', icon: MapPin },
]

const faqs = [
  {
    question: 'Why choose online coaching over traveling to Delhi for NEET preparation?',
    answer:
      'Gurugram students typically spend 3-4 hours daily crossing the Delhi border for coaching. Our online live classes deliver Delhi-quality teaching from AIIMS trained faculties directly to your home. Save time, reduce stress, and focus 100% on NEET preparation. Our 98% success rate proves online is as effective as offline.',
  },
  {
    question: 'Which areas in Gurugram do you serve?',
    answer:
      'We serve all major Gurugram localities including DLF Phase 1, 2, 3, 4, Golf Course Road, Sushant Lok, Sector 14, 43, 51, 56, 57, South City, New Gurugram, Nirvana Country, and all surrounding areas. Students from any Gurugram pincode can join our online live classes.',
  },
  {
    question: 'What is the fee for NEET coaching in Gurugram?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 48,000 per year - significantly lower than Delhi coaching centers plus you save on travel costs. Premium Gurugram institutes charge Rs 1.2-1.5 lakhs. We offer EMI options and merit scholarships.',
  },
  {
    question: 'How do live classes work for Gurugram students?',
    answer:
      'We conduct live interactive classes via Zoom/Google Meet. Ask questions in real-time, participate in discussions, and interact with teachers just like a physical classroom. All classes are recorded for revision. Dedicated Gurugram batches ensure peer interaction with local students.',
  },
  {
    question: 'Do you have any physical presence in Gurugram?',
    answer:
      'We are primarily an online coaching institute serving Gurugram and all of India. This allows us to provide top Delhi NCR faculty at affordable fees. For doubt sessions and test series, we organize periodic meetups at convenient Gurugram locations.',
  },
]

const premiumSchools = [
  'The Shri Ram School',
  'DPS Gurugram',
  'Pathways World School',
  'GD Goenka World School',
  'Scottish High International',
  'Heritage Xperiential',
  'Amity International',
  'Shiv Nadar School',
  'Blue Bells',
  'K.R. Mangalam',
]

const whyGurugram = [
  {
    icon: Building,
    title: 'Premium Quality at Home',
    description:
      'DLF, Golf Course Road, Sushant Lok residents deserve excellence. Get Delhi-quality coaching without crossing the border.',
  },
  {
    icon: Train,
    title: 'Save Commute Time',
    description:
      'Gurugram to South Delhi is 2+ hours daily. Use that time for self-study and practice instead of sitting in traffic.',
  },
  {
    icon: GraduationCap,
    title: 'Local Understanding',
    description:
      'We understand Gurugram school schedules, board exam patterns, and local academic challenges. Personalized support for Gurugram students.',
  },
]

export default function NeetCoachingGurugramPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_gurugram', {
        event_category: 'conversion',
        event_label: 'neet_coaching_gurugram_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-800 to-cyan-900 text-white py-20 overflow-hidden">
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
              Serving All Gurugram Localities
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Gurugram</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              DLF Magnolias | Camellias | Aralias | Nirvana Country | Central Park | Golf Course
              Road | Sushant Lok
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Stop wasting 3+ hours daily traveling to Delhi for coaching. Get AIIMS trained
              faculties, 98% success rate, and live interactive classes - all from your Gurugram
              home. Join 1,800+ Gurugram students already preparing with us.
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
                  className="border-white text-white hover:bg-white hover:text-green-800"
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

      {/* Gurugram Localities Section */}
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
              NEET Coaching Across All Gurugram Localities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From DLF Cyber City to New Gurugram - we serve students from every corner of
              Gurugram/Gurgaon. Click on your locality for location-specific information.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gurugramLocalities.map((locality, index) => (
              <motion.div
                key={locality.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={`/locations/gurugram/${locality.slug}`}>
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

      {/* Why Gurugram Students Choose Us */}
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
              Why Gurugram Students Choose Online NEET Coaching
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop the daily Delhi border crossing. Premium education delivered to your doorstep.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyGurugram.map((item, index) => (
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
              Students from These Gurugram Schools Trust Us
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
              Why Choose Cerebrum for NEET Coaching in Gurugram?
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
              Frequently Asked Questions - NEET Coaching Gurugram
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from Gurugram Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS trained faculties, 2,100+ Gurugram students. No Delhi travel
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
                <span>All Gurugram Areas</span>
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
                <span>No Delhi Travel</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
