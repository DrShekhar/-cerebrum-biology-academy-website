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

const mumbaiLocalities = [
  {
    name: 'Andheri West',
    slug: 'andheri-west',
    students: '280+',
    highlight: 'Premium Coaching Hub',
    priority: 'high',
  },
  {
    name: 'Andheri East',
    slug: 'andheri-east',
    students: '195+',
    highlight: 'MIDC & Corporate Area',
    priority: 'high',
  },
  {
    name: 'Dadar',
    slug: 'dadar',
    students: '220+',
    highlight: 'Central Mumbai Hub',
    priority: 'high',
  },
  {
    name: 'Borivali',
    slug: 'borivali',
    students: '175+',
    highlight: 'Western Suburbs',
    priority: 'high',
  },
  {
    name: 'Thane',
    slug: 'thane',
    students: '260+',
    highlight: 'Thane City & Suburbs',
    priority: 'high',
  },
  {
    name: 'Navi Mumbai',
    slug: 'navi-mumbai',
    students: '210+',
    highlight: 'Vashi, Kharghar, Panvel',
    priority: 'high',
  },
  {
    name: 'Powai',
    slug: 'powai',
    students: '145+',
    highlight: 'Near IIT Bombay',
    priority: 'high',
  },
  {
    name: 'Bandra',
    slug: 'bandra',
    students: '165+',
    highlight: 'Queen of Suburbs',
    priority: 'high',
  },
  {
    name: 'Malad',
    slug: 'malad',
    students: '155+',
    highlight: 'Malad East & West',
    priority: 'medium',
  },
  {
    name: 'Kandivali',
    slug: 'kandivali',
    students: '140+',
    highlight: 'Western Line Hub',
    priority: 'medium',
  },
  {
    name: 'Goregaon',
    slug: 'goregaon',
    students: '130+',
    highlight: 'Film City Area',
    priority: 'medium',
  },
  {
    name: 'Mulund',
    slug: 'mulund',
    students: '120+',
    highlight: 'Central Line End',
    priority: 'medium',
  },
  {
    name: 'Ghatkopar',
    slug: 'ghatkopar',
    students: '135+',
    highlight: 'Metro Connected',
    priority: 'medium',
  },
  {
    name: 'Chembur',
    slug: 'chembur',
    students: '115+',
    highlight: 'Harbour Line Hub',
    priority: 'medium',
  },
  {
    name: 'Kurla',
    slug: 'kurla',
    students: '110+',
    highlight: 'Railway Junction',
    priority: 'medium',
  },
  {
    name: 'Vikhroli',
    slug: 'vikhroli',
    students: '95+',
    highlight: 'Godrej Township',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Real-time teaching with instant doubt resolution - skip Mumbai traffic completely',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Exclusive Mumbai batches with personal attention for every student',
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
    description: 'Morning, afternoon, and evening batches to fit Mumbai schedules',
  },
  {
    icon: Shield,
    title: 'No Commute Stress',
    description: 'Save 2+ hours daily on Mumbai local trains - study from your home',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '360', icon: Star },
  { label: 'Mumbai Students', value: '2,500+', icon: Users },
  { label: 'Areas Covered', value: '16+', icon: MapPin },
]

const faqs = [
  {
    question: 'Why choose online coaching over traveling across Mumbai for NEET preparation?',
    answer:
      'Mumbai students typically spend 2-3 hours daily in local trains or on roads for coaching. Our online live classes deliver quality teaching from AIIMS trained faculties directly to your home. Save time, avoid Mumbai monsoon disruptions, and focus 100% on NEET preparation. Our 98% success rate proves online is as effective as offline.',
  },
  {
    question: 'Which areas in Mumbai do you serve?',
    answer:
      'We serve all major Mumbai localities including Andheri, Dadar, Borivali, Thane, Navi Mumbai (Vashi, Kharghar, Panvel), Powai, Bandra, Malad, Kandivali, Goregaon, Mulund, Ghatkopar, Chembur, and all surrounding areas. Students from any Mumbai pincode can join our online live classes.',
  },
  {
    question: 'What is the fee for NEET coaching in Mumbai?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 48,000 per year - significantly lower than premium Mumbai coaching centers that charge Rs 1.5-2 lakhs. Plus you save on travel costs. We offer EMI options and merit scholarships.',
  },
  {
    question: 'How do live classes work for Mumbai students?',
    answer:
      'We conduct live interactive classes via Zoom/Google Meet. Ask questions in real-time, participate in discussions, and interact with teachers just like a physical classroom. All classes are recorded for revision. Dedicated Mumbai batches ensure peer interaction with local students.',
  },
  {
    question: 'Is online coaching effective for competitive exams like NEET?',
    answer:
      'Yes! Our 98% success rate and 500+ medical college selections prove that online coaching is highly effective. Mumbai students particularly benefit as they save commute time for self-study. Our interactive live classes, doubt sessions, and AI-powered practice tests ensure comprehensive preparation.',
  },
]

const premiumSchools = [
  'Dhirubhai Ambani International',
  'Cathedral & John Connon',
  'Campion School',
  'St. Xaviers High School',
  'Bombay Scottish',
  'JBCN International',
  'Podar International',
  'Hiranandani Foundation',
  'NM College Junior',
  'Mithibai College',
]

const whyMumbai = [
  {
    icon: Building,
    title: 'Quality Without Traffic',
    description:
      'From Colaba to Virar, get premium coaching without spending hours in Mumbai traffic or crowded local trains.',
  },
  {
    icon: Train,
    title: 'Monsoon-Proof Learning',
    description:
      'Mumbai rains disrupt commute but not your studies. Attend classes from home even during waterlogging.',
  },
  {
    icon: GraduationCap,
    title: 'Local Understanding',
    description:
      'We understand Maharashtra HSC board patterns, Mumbai school schedules, and local academic challenges. Personalized support for Mumbai students.',
  },
]

export default function NeetCoachingMumbaiPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_mumbai', {
        event_category: 'conversion',
        event_label: 'neet_coaching_mumbai_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Mumbai"
        citySlug="mumbai"
        state="Maharashtra"
        localities={mumbaiLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="2500"
        coordinates={{ lat: '19.0760', lng: '72.8777' }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white py-20 overflow-hidden">
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
              Serving All Mumbai Localities
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Mumbai</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Andheri | Dadar | Borivali | Thane | Navi Mumbai | Powai | Bandra
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Skip the Mumbai local train commute. Get AIIMS trained faculties, 98% success rate,
              and live interactive classes - all from your Mumbai home. Join 2,500+ Mumbai students
              already preparing with us.
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

      {/* Mumbai Localities Section */}
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
              NEET Coaching Across All Mumbai Localities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Churchgate to Virar, Kurla to Panvel - we serve students from every corner of
              Mumbai and MMR. Click on your locality for location-specific information.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mumbaiLocalities.map((locality, index) => (
              <motion.div
                key={locality.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={`/locations/mumbai/${locality.slug}`}>
                  <div
                    className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                      locality.priority === 'high' ? 'ring-2 ring-blue-500' : ''
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

      {/* Why Mumbai Students Choose Us */}
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
              Why Mumbai Students Choose Online NEET Coaching
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop the daily local train struggle. Premium education delivered to your doorstep.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyMumbai.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100"
              >
                <item.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Mumbai Schools Trust Us
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
              Why Choose Cerebrum for NEET Coaching in Mumbai?
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
              Frequently Asked Questions - NEET Coaching Mumbai
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
      <RelatedCityLinks currentCity="mumbai" variant="default" />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from Mumbai Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS trained faculties, 2,500+ Mumbai students. No local train
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
                <span>All Mumbai Areas</span>
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
