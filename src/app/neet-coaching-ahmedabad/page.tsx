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
  TrendingUp,
  Heart,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import { CitySchema } from '@/components/seo/CitySchema'

const ahmedabadLocalities = [
  {
    name: 'Satellite',
    slug: 'satellite',
    students: '320+',
    highlight: 'Premium West Zone',
    priority: 'high',
  },
  {
    name: 'SG Highway',
    slug: 'sg-highway',
    students: '290+',
    highlight: 'Corporate Hub',
    priority: 'high',
  },
  {
    name: 'Bopal',
    slug: 'bopal',
    students: '260+',
    highlight: 'South Ahmedabad',
    priority: 'high',
  },
  {
    name: 'Prahlad Nagar',
    slug: 'prahlad-nagar',
    students: '280+',
    highlight: 'Educational Hub',
    priority: 'high',
  },
  {
    name: 'Navrangpura',
    slug: 'navrangpura',
    students: '240+',
    highlight: 'Central Area',
    priority: 'high',
  },
  {
    name: 'Vastrapur',
    slug: 'vastrapur',
    students: '250+',
    highlight: 'IIM-A Vicinity',
    priority: 'high',
  },
  {
    name: 'Maninagar',
    slug: 'maninagar',
    students: '200+',
    highlight: 'East Ahmedabad',
    priority: 'medium',
  },
  {
    name: 'Shahibag',
    slug: 'shahibag',
    students: '180+',
    highlight: 'Traditional Area',
    priority: 'medium',
  },
  {
    name: 'Gandhinagar',
    slug: 'gandhinagar',
    students: '220+',
    highlight: 'Capital City',
    priority: 'high',
  },
  {
    name: 'Thaltej',
    slug: 'thaltej',
    students: '210+',
    highlight: 'Upscale Residential',
    priority: 'medium',
  },
  {
    name: 'Gota',
    slug: 'gota',
    students: '190+',
    highlight: 'North Zone',
    priority: 'medium',
  },
  {
    name: 'Chandkheda',
    slug: 'chandkheda',
    students: '170+',
    highlight: 'Growing Hub',
    priority: 'medium',
  },
  {
    name: 'Naroda',
    slug: 'naroda',
    students: '160+',
    highlight: 'Industrial Belt',
    priority: 'medium',
  },
  {
    name: 'Bodakdev',
    slug: 'bodakdev',
    students: '230+',
    highlight: 'Prime Location',
    priority: 'high',
  },
  {
    name: 'Ambawadi',
    slug: 'ambawadi',
    students: '175+',
    highlight: 'Central Hub',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Real-time teaching with instant doubt resolution - skip Ahmedabad traffic completely',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Exclusive Gujarat batches with personal attention for every student',
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
    description: 'Morning, afternoon, and evening batches to fit Ahmedabad schedules',
  },
  {
    icon: Shield,
    title: 'No Commute Stress',
    description: 'Save hours on Ahmedabad traffic - study from your home in any locality',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score 2024', value: '355', icon: Star },
  { label: 'Gujarat Students', value: '3,500+', icon: Users },
  { label: 'Areas Covered', value: '15+', icon: MapPin },
]

const faqs = [
  {
    question: 'Why choose online coaching for NEET preparation in Ahmedabad?',
    answer:
      'Ahmedabad students typically spend 1-2 hours daily commuting to coaching centers on SG Highway or CG Road. Our online live classes deliver quality teaching from AIIMS trained faculties directly to your home. Save time, avoid traffic jams, and focus 100% on NEET preparation. Our 94.2% success rate proves online is as effective as offline.',
  },
  {
    question: 'Which areas in Ahmedabad do you serve?',
    answer:
      'We serve all major Ahmedabad localities including Satellite, SG Highway, Bopal, Prahlad Nagar, Navrangpura, Vastrapur, Maninagar, Shahibag, Gandhinagar, Thaltej, Gota, Chandkheda, Naroda, Bodakdev, Ambawadi, and all surrounding areas. Students from any Ahmedabad pincode can join our online live classes.',
  },
  {
    question: 'What is the fee for NEET coaching in Ahmedabad?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 48,000 per year - significantly lower than premium Ahmedabad coaching centers that charge Rs 1-1.5 lakhs. Plus you save on travel costs and time. We offer EMI options and merit scholarships.',
  },
  {
    question: 'How do live classes work for Ahmedabad students?',
    answer:
      'We conduct live interactive classes via Zoom/Google Meet. Ask questions in real-time, participate in discussions, and interact with teachers just like a physical classroom. All classes are recorded for revision. Dedicated Gujarat batches ensure peer interaction with local students.',
  },
  {
    question: 'Do you understand Gujarat board patterns?',
    answer:
      'Yes! We have specialized batches for Gujarat board (GSEB) students. Our faculty understands the Gujarat HSC syllabus, exam patterns, and how to balance board exams with NEET preparation. Many of our Ahmedabad students have scored 90%+ in boards while also cracking NEET.',
  },
  {
    question: 'What about Gujarat state quota for medical colleges?',
    answer:
      'We understand Gujarat has excellent state quota medical colleges like BJ Medical College, NHL Medical College, and GMERS colleges. Our coaching is designed to help students excel in both state quota and all-India quota counseling rounds.',
  },
]

const premiumSchools = [
  'DPS Bopal',
  'Adani Vidya Mandir',
  'Zydus School',
  'Anand Niketan',
  'GLS University Schools',
  'Udgam School',
  'Navrachana School',
  'Sheth CN English Medium',
  'Mount Carmel School',
  'St. Kabir School',
]

const whyAhmedabad = [
  {
    icon: Building,
    title: 'Quality Without Traffic',
    description:
      'From SG Highway to CG Road, get premium coaching without spending hours in Ahmedabad traffic.',
  },
  {
    icon: TrendingUp,
    title: 'Gujarat Growth Hub',
    description:
      "Ahmedabad is growing rapidly. Get education that matches the city's aspirations for excellence.",
  },
  {
    icon: GraduationCap,
    title: 'Gujarat Board Expert',
    description:
      'We understand GSEB patterns, Ahmedabad school schedules, and local academic challenges. Personalized support for Gujarat students.',
  },
]

const medicalColleges = [
  'BJ Medical College',
  'NHL Medical College',
  'GMERS Ahmedabad',
  'GMERS Gandhinagar',
  'AMC MET Medical College',
  'Surat Municipal Medical College',
]

export default function NeetCoachingAhmedabadPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_ahmedabad', {
        event_category: 'conversion',
        event_label: 'neet_coaching_ahmedabad_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Ahmedabad"
        citySlug="ahmedabad"
        state="Gujarat"
        localities={ahmedabadLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="3500"
        coordinates={{ lat: '23.0225', lng: '72.5714' }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
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
              Serving All Ahmedabad & Gujarat
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Ahmedabad</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Satellite | SG Highway | Bopal | Prahlad Nagar | Vastrapur | Gandhinagar
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Skip Ahmedabad traffic. Get AIIMS trained faculties, 94.2% success rate, and live
              interactive classes - all from your home. Join 3,500+ Gujarat students already
              preparing with us.
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
                  className="border-white text-white hover:bg-white hover:text-blue-900"
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

      {/* Ahmedabad Localities Section */}
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
              NEET Coaching Across All Ahmedabad Localities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Satellite to Gandhinagar, Maninagar to Bopal - we serve students from every
              corner of Ahmedabad and Gujarat.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {ahmedabadLocalities.map((locality, index) => (
              <motion.div
                key={locality.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                    locality.priority === 'high' ? 'ring-2 ring-blue-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{locality.students}</div>
                  <div className="text-sm text-gray-500">{locality.highlight}</div>
                  {locality.priority === 'high' && (
                    <div className="mt-2 inline-flex items-center text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 mr-1" />
                      High Demand
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gujarat Medical Colleges */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Into Top Gujarat Medical Colleges
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our coaching is designed to help you crack state quota counseling and secure seats in
              Gujarat&apos;s prestigious medical colleges.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {medicalColleges.map((college, index) => (
              <motion.div
                key={college}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white px-6 py-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center">
                  <Heart className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold text-gray-900">{college}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Ahmedabad Students Choose Us */}
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
              Why Ahmedabad Students Choose Online NEET Coaching
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop the daily traffic struggle. Premium education delivered to your doorstep.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyAhmedabad.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-blue-50 rounded-xl p-8 border border-blue-100"
              >
                <item.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Ahmedabad Schools Trust Us
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
              Why Choose Cerebrum for NEET Coaching in Ahmedabad?
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
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
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
              Frequently Asked Questions - NEET Coaching Ahmedabad
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
                  <MessageCircle className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Cities Section */}
      <RelatedCityLinks currentCity="ahmedabad" variant="default" />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from Ahmedabad Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              94.2% success rate, AIIMS trained faculties, 3,500+ Gujarat students. No traffic
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
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All Ahmedabad Areas</span>
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
                <span>No Commute</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
