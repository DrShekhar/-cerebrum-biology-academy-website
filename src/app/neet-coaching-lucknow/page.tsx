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
  Heart,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import { CitySchema } from '@/components/seo/CitySchema'

const lucknowLocalities = [
  {
    name: 'Gomti Nagar',
    slug: 'gomti-nagar',
    students: '380+',
    highlight: 'Premium Hub',
    priority: 'high',
  },
  {
    name: 'Hazratganj',
    slug: 'hazratganj',
    students: '320+',
    highlight: 'Central Lucknow',
    priority: 'high',
  },
  {
    name: 'Aliganj',
    slug: 'aliganj',
    students: '290+',
    highlight: 'Educational Zone',
    priority: 'high',
  },
  {
    name: 'Indira Nagar',
    slug: 'indira-nagar',
    students: '270+',
    highlight: 'Residential Hub',
    priority: 'high',
  },
  {
    name: 'Rajajipuram',
    slug: 'rajajipuram',
    students: '240+',
    highlight: 'West Lucknow',
    priority: 'high',
  },
  {
    name: 'Alambagh',
    slug: 'alambagh',
    students: '220+',
    highlight: 'Transport Hub',
    priority: 'medium',
  },
  {
    name: 'Mahanagar',
    slug: 'mahanagar',
    students: '200+',
    highlight: 'Traditional Area',
    priority: 'medium',
  },
  {
    name: 'Jankipuram',
    slug: 'jankipuram',
    students: '230+',
    highlight: 'Extension Area',
    priority: 'high',
  },
  {
    name: 'Vikas Nagar',
    slug: 'vikas-nagar',
    students: '180+',
    highlight: 'Growing Hub',
    priority: 'medium',
  },
  {
    name: 'Chinhat',
    slug: 'chinhat',
    students: '160+',
    highlight: 'Industrial Belt',
    priority: 'medium',
  },
  {
    name: 'Faizabad Road',
    slug: 'faizabad-road',
    students: '210+',
    highlight: 'East Corridor',
    priority: 'medium',
  },
  {
    name: 'Kanpur Road',
    slug: 'kanpur-road',
    students: '190+',
    highlight: 'South Corridor',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Real-time teaching with instant doubt resolution - world-class coaching from your home',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Exclusive UP batches with personal attention for every aspirant',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculties',
    description: 'Expert doctors and teachers trained at premier medical institutions',
  },
  {
    icon: BookOpen,
    title: 'KGMU-Focused Prep',
    description: 'Coaching designed to help you secure seats in UP\'s top medical colleges',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches to fit your schedule',
  },
  {
    icon: Shield,
    title: 'Stay in Lucknow',
    description: 'No need to migrate to Kota - get top coaching from the City of Nawabs',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score 2024', value: '358', icon: Star },
  { label: 'UP Students', value: '4,500+', icon: Users },
  { label: 'Areas Covered', value: '12+', icon: MapPin },
]

const faqs = [
  {
    question: 'Why choose online coaching for NEET preparation in Lucknow?',
    answer:
      'Lucknow students often consider migrating to Kota, spending Rs 3-4 lakhs annually. Our online coaching delivers same quality teaching at Rs 24,000-48,000 per year. Stay in the City of Nawabs with family, save money, and get personalized attention. Our 94.2% success rate proves online is equally effective.',
  },
  {
    question: 'Which areas in Lucknow do you serve?',
    answer:
      'We serve all major Lucknow localities including Gomti Nagar, Hazratganj, Aliganj, Indira Nagar, Rajajipuram, Alambagh, Mahanagar, Jankipuram, Vikas Nagar, Chinhat, Faizabad Road, Kanpur Road, and all surrounding areas. Students from any Lucknow or UP district can join our online live classes.',
  },
  {
    question: 'What is the fee for NEET coaching in Lucknow?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 48,000 per year - a fraction of Kota migration costs. We offer EMI options and merit scholarships specifically for UP students.',
  },
  {
    question: 'How do live classes work for Lucknow students?',
    answer:
      'We conduct live interactive classes via Zoom/Google Meet. Ask questions in real-time, participate in discussions, and interact with teachers just like a physical classroom. All classes are recorded for revision. Dedicated UP batches ensure peer interaction with local students.',
  },
  {
    question: 'Do you understand UP board patterns?',
    answer:
      'Yes! We have specialized batches for UP board students. Our faculty understands the UP intermediate syllabus, exam patterns, and how to balance board exams with NEET preparation. Many of our Lucknow students have scored 90%+ in boards while also cracking NEET.',
  },
  {
    question: 'What about UP state quota for medical colleges?',
    answer:
      'UP has excellent state quota medical colleges like KGMU, GSVM Kanpur, MLN Medical College, BRD Medical College. With 85% state quota, UP students have great opportunities. Our coaching helps you maximize your score for better state quota seats.',
  },
]

const premiumSchools = [
  'City Montessori School',
  'La Martiniere College',
  'Seth M R Jaipuria School',
  'Loreto Convent',
  'Kendriya Vidyalaya',
  'DAV Public School',
  'St. Francis College',
  'Lucknow Public School',
  'Spring Dale College',
  'Central Academy',
]

const whyLucknow = [
  {
    icon: Building,
    title: 'No Kota Migration',
    description:
      'Get Kota-quality coaching from Lucknow. Save Rs 2-3 lakhs annually and stay in the historic City of Nawabs.',
  },
  {
    icon: TrendingUp,
    title: 'UP\'s Rising Excellence',
    description:
      'UP students are cracking NEET at record numbers. Be part of the success story from the state capital.',
  },
  {
    icon: GraduationCap,
    title: 'UP Board Expert',
    description:
      'We understand UP Board patterns, Lucknow school schedules, and local challenges. Personalized support for UP students.',
  },
]

const medicalColleges = [
  'KGMU Lucknow',
  'GSVM Medical College Kanpur',
  'MLN Medical College Prayagraj',
  'BRD Medical College Gorakhpur',
  'LLRM Medical College Meerut',
  'SN Medical College Agra',
]

export default function NeetCoachingLucknowPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_lucknow', {
        event_category: 'conversion',
        event_label: 'neet_coaching_lucknow_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Lucknow"
        citySlug="lucknow"
        state="Uttar Pradesh"
        localities={lucknowLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="4500"
        coordinates={{ lat: '26.8467', lng: '80.9462' }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-900 via-teal-700 to-teal-800 text-white py-20 overflow-hidden">
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
              City of Nawabs | KGMU Focused Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Lucknow</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Gomti Nagar | Hazratganj | Aliganj | Indira Nagar | Rajajipuram
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Why migrate to Kota? Get AIIMS trained faculties, 94.2% success rate, and live
              interactive classes - all from Lucknow. Join 4,500+ UP students achieving NEET success
              from home.
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
                  className="border-white text-white hover:bg-white hover:text-teal-900"
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

      {/* Lucknow Localities Section */}
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
              NEET Coaching Across All Lucknow Localities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Gomti Nagar to Jankipuram, Hazratganj to Alambagh - we serve students from every
              corner of Lucknow and UP.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {lucknowLocalities.map((locality, index) => (
              <motion.div
                key={locality.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                    locality.priority === 'high' ? 'ring-2 ring-teal-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                    <MapPin className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="text-2xl font-bold text-teal-600 mb-1">
                    {locality.students}
                  </div>
                  <div className="text-sm text-gray-500">{locality.highlight}</div>
                  {locality.priority === 'high' && (
                    <div className="mt-2 inline-flex items-center text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
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

      {/* UP Medical Colleges */}
      <section className="py-20 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Into Top UP Medical Colleges
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              UP has 85% state quota seats in government medical colleges. Our coaching is designed
              to help you secure seats in UP&apos;s prestigious institutions.
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
                  <Heart className="w-5 h-5 text-teal-600 mr-2" />
                  <span className="font-semibold text-gray-900">{college}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Lucknow Students Choose Us */}
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
              Why Lucknow Students Choose Online NEET Coaching
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyLucknow.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-teal-50 rounded-xl p-8 border border-teal-100"
              >
                <item.icon className="w-12 h-12 text-teal-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Lucknow Schools Trust Us
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
              Why Choose Cerebrum for NEET Coaching in Lucknow?
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
                <feature.icon className="w-12 h-12 text-teal-600 mb-4" />
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
              Frequently Asked Questions - NEET Coaching Lucknow
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
                  <MessageCircle className="w-6 h-6 mr-3 text-teal-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Cities Section */}
      <RelatedCityLinks currentCity="lucknow" variant="default" />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 via-teal-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from the City of Nawabs
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              94.2% success rate, AIIMS trained faculties, 4,500+ UP students. KGMU-focused
              preparation!
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
                  className="border-white text-white hover:bg-white hover:text-teal-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All Lucknow Areas</span>
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
                <span>UP Specialist</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
