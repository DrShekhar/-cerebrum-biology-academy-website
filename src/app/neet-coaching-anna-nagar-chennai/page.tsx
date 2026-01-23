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
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { CitySchema } from '@/components/seo/CitySchema'

const annaNagarLocalities = [
  {
    name: 'Anna Nagar East',
    slug: 'anna-nagar-east',
    students: '180+',
    highlight: '2nd Avenue Premium',
    priority: 'high',
  },
  {
    name: 'Anna Nagar West',
    slug: 'anna-nagar-west',
    students: '160+',
    highlight: 'Shanthi Colony',
    priority: 'high',
  },
  {
    name: 'Anna Nagar Western Extension',
    slug: 'anna-nagar-western-ext',
    students: '120+',
    highlight: 'Growing Premium',
    priority: 'high',
  },
  {
    name: 'Thirumangalam',
    slug: 'thirumangalam',
    students: '110+',
    highlight: 'Metro Connected',
    priority: 'high',
  },
  {
    name: 'Mogappair',
    slug: 'mogappair',
    students: '95+',
    highlight: 'Adjacent Hub',
    priority: 'high',
  },
  {
    name: 'Villivakkam',
    slug: 'villivakkam',
    students: '85+',
    highlight: 'Growing Area',
    priority: 'medium',
  },
  {
    name: 'Shenoy Nagar',
    slug: 'shenoy-nagar',
    students: '75+',
    highlight: 'Residential',
    priority: 'medium',
  },
  {
    name: 'Aminjikarai',
    slug: 'aminjikarai',
    students: '70+',
    highlight: 'Coaching Hub',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Premium online coaching - no need to navigate Chennai traffic. World-class teaching from your Anna Nagar home.',
  },
  {
    icon: Users,
    title: 'Elite Small Batches (10-15)',
    description: 'Exclusive batches for Anna Nagar students with personalized attention and premium support.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Expert doctors and teachers from premier medical institutions. Quality Anna Nagar families expect.',
  },
  {
    icon: BookOpen,
    title: 'Complete Premium Package',
    description: 'NCERT mastery, advanced materials, unlimited doubt sessions - everything included.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches to complement your school schedule.',
  },
  {
    icon: Shield,
    title: 'Stress-Free Learning',
    description: 'No traffic stress. Study in comfort from Anna Nagar East or West.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score 2024', value: '361', icon: Star },
  { label: 'Anna Nagar Students', value: '720+', icon: Users },
  { label: 'Elite Schools', value: '18+', icon: GraduationCap },
]

const faqs = [
  {
    question: 'Why do Anna Nagar students choose online NEET coaching?',
    answer:
      'Anna Nagar is Chennai\'s premium residential hub with busy professional families. Our online classes offer AIIMS faculty without the traffic to T. Nagar or Vadapalani coaching centers. Save 2+ hours daily - time better spent on revision.',
  },
  {
    question: 'Which areas in Anna Nagar do you serve?',
    answer:
      'We serve all Anna Nagar areas including Anna Nagar East, Anna Nagar West, Western Extension, Thirumangalam, Mogappair, Villivakkam, Shenoy Nagar, and Aminjikarai. Students from any part of North Chennai can join our online live classes.',
  },
  {
    question: 'What is the fee for premium NEET coaching in Anna Nagar?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 68,000 per year depending on the program chosen. This matches Anna Nagar\'s premium education standards while offering superior flexibility. EMI options available.',
  },
  {
    question: 'How does this compare to coaching centers in Aminjikarai?',
    answer:
      'Unlike physical coaching centers in Aminjikarai where batches have 50-100 students, we limit batches to 10-15 students. This means every doubt gets addressed, every student gets personal attention.',
  },
  {
    question: 'Do you support CBSE and State Board students?',
    answer:
      'Yes! We have batches for CBSE, Tamil Nadu State Board, and international curriculum students. Many of our Anna Nagar students are from DAV, Velammal, Chinmaya, and Don Bosco schools.',
  },
  {
    question: 'What medical colleges can Anna Nagar students target?',
    answer:
      'With proper NEET preparation, Anna Nagar students can target top colleges like Madras Medical College, Stanley Medical College, Kilpauk Medical College (nearby!), and all-India institutes like AIIMS, JIPMER, and CMC Vellore.',
  },
]

const premiumSchools = [
  'DAV Public School',
  'Velammal School',
  'Chinmaya Vidyalaya',
  'Don Bosco Matriculation',
  'Chettinad Vidyashram',
  'PSBB School',
  'Bharath Senior Secondary',
  'AMM Matriculation',
  'Zion Matriculation',
  'St. Patrick Academy',
]

const whyAnnaNagar = [
  {
    icon: Sparkles,
    title: 'Chennai\'s Premium Hub',
    description:
      'Get world-class NEET coaching without leaving Anna Nagar. No traffic to Aminjikarai or T. Nagar.',
  },
  {
    icon: Building,
    title: 'Near Kilpauk Medical',
    description:
      'Anna Nagar is adjacent to Kilpauk Medical College. We specialize in preparing students for Chennai\'s top medical colleges.',
  },
  {
    icon: GraduationCap,
    title: 'Elite School Expert',
    description:
      'We understand DAV, Velammal, Chinmaya curriculums. Our faculty bridges school learning with NEET.',
  },
]

export default function NeetCoachingAnnaNagarPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_anna_nagar', {
        event_category: 'conversion',
        event_label: 'neet_coaching_anna_nagar_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Anna Nagar"
        citySlug="anna-nagar-chennai"
        state="Tamil Nadu"
        localities={annaNagarLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="720"
        coordinates={{ lat: '13.0850', lng: '80.2101' }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-emerald-700 to-teal-800 text-white py-20 overflow-hidden">
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
              North Chennai Premium | NEET Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Anna Nagar</span>, Chennai
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Anna Nagar East | West | Thirumangalam | Mogappair | Shenoy Nagar
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Premium NEET Biology coaching for Anna Nagar&apos;s elite schools. 94.2% success rate, AIIMS
              faculty, zero traffic stress. Join 720+ students from DAV, Velammal, Chinmaya.
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
                  className="border-white text-white hover:bg-white hover:text-emerald-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Premium Programs
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

      {/* Anna Nagar Localities Section */}
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
              NEET Coaching Across Anna Nagar & Surrounding Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Anna Nagar East to Mogappair, Thirumangalam to Shenoy Nagar - premium coaching for North Chennai.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {annaNagarLocalities.map((locality, index) => (
              <motion.div
                key={locality.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                    locality.priority === 'high' ? 'ring-2 ring-emerald-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    {locality.students}
                  </div>
                  <div className="text-sm text-gray-500">{locality.highlight}</div>
                  {locality.priority === 'high' && (
                    <div className="mt-2 inline-flex items-center text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 mr-1" />
                      Premium Area
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Anna Nagar Students Choose Us */}
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
              Why Anna Nagar&apos;s Elite Choose Cerebrum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium education meets convenience - designed for North Chennai&apos;s discerning families.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyAnnaNagar.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-emerald-50 rounded-xl p-8 border border-emerald-100"
              >
                <item.icon className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Anna Nagar Schools Trust Us
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
              Premium NEET Biology Coaching Features
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
                <feature.icon className="w-12 h-12 text-emerald-600 mb-4" />
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
              Frequently Asked Questions - NEET Coaching Anna Nagar
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
                  <MessageCircle className="w-6 h-6 mr-3 text-emerald-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join Anna Nagar&apos;s Top NEET Aspirants
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              94.2% success rate, AIIMS faculty, premium small batches. Kilpauk Medical specialists!
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
                  className="border-white text-white hover:bg-white hover:text-emerald-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All Anna Nagar</span>
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
                <span>MMC Expert</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
