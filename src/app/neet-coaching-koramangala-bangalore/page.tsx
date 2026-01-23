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

const koramangalaLocalities = [
  {
    name: 'Koramangala 1st Block',
    slug: 'koramangala-1st-block',
    students: '120+',
    highlight: 'Premium Residential',
    priority: 'high',
  },
  {
    name: 'Koramangala 4th Block',
    slug: 'koramangala-4th-block',
    students: '150+',
    highlight: 'Forum Mall Area',
    priority: 'high',
  },
  {
    name: 'Koramangala 5th Block',
    slug: 'koramangala-5th-block',
    students: '130+',
    highlight: 'Startup Hub',
    priority: 'high',
  },
  {
    name: 'Koramangala 6th Block',
    slug: 'koramangala-6th-block',
    students: '110+',
    highlight: 'Sony Signal Area',
    priority: 'high',
  },
  {
    name: 'Koramangala 8th Block',
    slug: 'koramangala-8th-block',
    students: '95+',
    highlight: 'Jyoti Nivas Area',
    priority: 'high',
  },
  {
    name: 'Ejipura',
    slug: 'ejipura',
    students: '85+',
    highlight: 'Adjacent Hub',
    priority: 'medium',
  },
  {
    name: 'Madiwala',
    slug: 'madiwala',
    students: '90+',
    highlight: 'Market Area',
    priority: 'medium',
  },
  {
    name: 'BTM Layout',
    slug: 'btm-layout',
    students: '140+',
    highlight: 'Tech Professional Area',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Premium online coaching - no need to navigate Silk Board traffic. World-class teaching from your Koramangala apartment.',
  },
  {
    icon: Users,
    title: 'Startup-Era Batches (10-15)',
    description: 'Exclusive batches for Koramangala startup families with personalized attention.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Expert doctors and teachers from premier medical institutions. Quality Koramangala families expect.',
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
    description: 'No ORR or Silk Board traffic stress. Study in comfort from your Koramangala home.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score 2024', value: '354', icon: Star },
  { label: 'Koramangala Students', value: '680+', icon: Users },
  { label: 'Premium Schools', value: '12+', icon: GraduationCap },
]

const faqs = [
  {
    question: 'Why do Koramangala students choose online NEET coaching?',
    answer:
      'Koramangala is Bangalore\'s startup hub with tech-savvy families who understand digital learning. Our online classes offer AIIMS faculty without Silk Board or ORR traffic. Save 2-3 hours daily on commute to coaching centers in Jayanagar or Rajajinagar.',
  },
  {
    question: 'Which areas in Koramangala do you serve?',
    answer:
      'We serve all Koramangala blocks (1st through 8th), plus surrounding areas like Ejipura, Madiwala, BTM Layout, and ST Bed. Students from any part of Koramangala can join our online live classes.',
  },
  {
    question: 'What is the fee for NEET coaching in Koramangala?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 68,000 per year depending on the program chosen. This matches Koramangala\'s premium education standards while offering superior flexibility. EMI options available.',
  },
  {
    question: 'How does this compare to coaching centers in Jayanagar?',
    answer:
      'Unlike physical coaching centers in Jayanagar or Rajajinagar where batches have 50-100 students, we limit batches to 10-15 students. This means every doubt gets addressed, every student gets personal attention.',
  },
  {
    question: 'Do you support CBSE and international school students?',
    answer:
      'Yes! We have batches for CBSE, Karnataka State Board, and international curriculum (IB, IGCSE) students. Many of our Koramangala students are from National Public School, DPS, Inventure Academy, and Greenwood High.',
  },
  {
    question: 'What medical colleges can Koramangala students target?',
    answer:
      'With proper NEET preparation, Koramangala students can target top colleges like Bangalore Medical College, St. John\'s Medical College, MS Ramaiah Medical College, and all-India institutes like AIIMS and JIPMER.',
  },
]

const premiumSchools = [
  'National Public School Koramangala',
  'DPS South',
  'Inventure Academy',
  'Greenwood High',
  'The International School Bangalore',
  'Jyoti Nivas College',
  'Bishop Cotton Boys School',
  'Delhi Public School East',
  'Presidency School',
  'Vibgyor High School',
]

const whyKoramangala = [
  {
    icon: Sparkles,
    title: 'Startup-Era Learning',
    description:
      'AI-powered analytics, interactive platform, progress tracking - the digital experience Koramangala families expect.',
  },
  {
    icon: Building,
    title: 'Zero Traffic, Maximum Study',
    description:
      'Skip Silk Board junction. Get world-class NEET coaching from your Koramangala home.',
  },
  {
    icon: GraduationCap,
    title: 'Premium School Expert',
    description:
      'We understand NPS, DPS, Inventure curriculums. Our faculty bridges school learning with NEET.',
  },
]

export default function NeetCoachingKoramangalaPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_koramangala', {
        event_category: 'conversion',
        event_label: 'neet_coaching_koramangala_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Koramangala"
        citySlug="koramangala-bangalore"
        state="Karnataka"
        localities={koramangalaLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="680"
        coordinates={{ lat: '12.9352', lng: '77.6245' }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-teal-700 to-cyan-800 text-white py-20 overflow-hidden">
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
              Bangalore&apos;s Startup Hub | Premium NEET Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Koramangala</span>, Bangalore
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              All Blocks | Ejipura | Madiwala | BTM Layout | ST Bed
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Startup-era NEET Biology coaching for Koramangala families. 94.2% success rate, AIIMS
              faculty, zero traffic stress. Join 680+ students from NPS, DPS, Inventure Academy.
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

      {/* Koramangala Localities Section */}
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
              NEET Coaching Across Koramangala & Surrounding Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From 1st Block to 8th Block, BTM to Madiwala - premium coaching for every Koramangala locality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {koramangalaLocalities.map((locality, index) => (
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
                      Premium Block
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Koramangala Students Choose Us */}
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
              Why Koramangala&apos;s Startup Families Choose Cerebrum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Digital excellence meets premium education - designed for Bangalore&apos;s startup hub.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyKoramangala.map((item, index) => (
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
              Students from These Koramangala Schools Trust Us
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
              Frequently Asked Questions - NEET Coaching Koramangala
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 via-teal-600 to-cyan-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join Koramangala&apos;s Top NEET Aspirants
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              94.2% success rate, AIIMS faculty, startup-era platform. Skip Silk Board traffic!
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
                <span>All Blocks</span>
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
                <span>Tech Platform</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
