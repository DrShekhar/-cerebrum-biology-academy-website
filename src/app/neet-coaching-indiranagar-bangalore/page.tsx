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

const indiranagarLocalities = [
  {
    name: '100 Feet Road',
    slug: '100-feet-road',
    students: '130+',
    highlight: 'Premium High Street',
    priority: 'high',
  },
  {
    name: '12th Main',
    slug: '12th-main',
    students: '110+',
    highlight: 'Food & Culture Hub',
    priority: 'high',
  },
  {
    name: 'HAL 2nd Stage',
    slug: 'hal-2nd-stage',
    students: '95+',
    highlight: 'Defense Enclave',
    priority: 'high',
  },
  {
    name: 'HAL 3rd Stage',
    slug: 'hal-3rd-stage',
    students: '85+',
    highlight: 'Residential Premium',
    priority: 'high',
  },
  {
    name: 'CMH Road',
    slug: 'cmh-road',
    students: '100+',
    highlight: 'Metro Connected',
    priority: 'high',
  },
  {
    name: 'Domlur',
    slug: 'domlur',
    students: '120+',
    highlight: 'Corporate Hub',
    priority: 'medium',
  },
  {
    name: 'Defence Colony',
    slug: 'defence-colony',
    students: '75+',
    highlight: 'Army Area',
    priority: 'medium',
  },
  {
    name: 'Cambridge Layout',
    slug: 'cambridge-layout',
    students: '70+',
    highlight: 'Residential Area',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Premium online coaching - no need to navigate ORR traffic. World-class teaching from your Indiranagar home.',
  },
  {
    icon: Users,
    title: 'Premium Batches (10-15)',
    description:
      'Exclusive batches for Indiranagar families with personalized attention and premium support.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description:
      'Expert doctors and teachers from premier medical institutions. Quality Indiranagar families expect.',
  },
  {
    icon: BookOpen,
    title: 'Complete Premium Package',
    description:
      'NCERT mastery, advanced materials, unlimited doubt sessions - everything included.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches to complement your school schedule.',
  },
  {
    icon: Shield,
    title: 'Stress-Free Learning',
    description: 'No traffic stress. Study in comfort from 100 Feet Road or HAL area.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score 2024', value: '357', icon: Star },
  { label: 'Indiranagar Students', value: '590+', icon: Users },
  { label: 'Premium Schools', value: '14+', icon: GraduationCap },
]

const faqs = [
  {
    question: 'Why do Indiranagar students choose online NEET coaching?',
    answer:
      "Indiranagar is East Bangalore's most sought-after address with busy professional families. Our online classes offer AIIMS faculty without ORR or airport road traffic. Save 2+ hours daily on commute to coaching centers in Rajajinagar or Jayanagar.",
  },
  {
    question: 'Which areas in Indiranagar do you serve?',
    answer:
      'We serve all Indiranagar areas including 100 Feet Road, 12th Main, HAL 2nd Stage, HAL 3rd Stage, CMH Road, Domlur, Defence Colony, and Cambridge Layout. Students from any part of Indiranagar can join our online live classes.',
  },
  {
    question: 'What is the fee for NEET coaching in Indiranagar?',
    answer:
      "Our complete NEET Biology course ranges from Rs 24,000 to Rs 68,000 per year depending on the program chosen. This matches Indiranagar's premium education standards while offering superior flexibility. EMI options available.",
  },
  {
    question: 'How does this compare to coaching centers in Old Airport Road?',
    answer:
      'Unlike physical coaching centers where batches have 50-100 students, we limit batches to 10-15 students. This means every doubt gets addressed, every student gets personal attention.',
  },
  {
    question: 'Do you support CBSE and international school students?',
    answer:
      "Yes! We have batches for CBSE, Karnataka State Board, and international curriculum (IB, IGCSE) students. Many of our Indiranagar students are from Bishop Cotton, St. Joseph's, Inventure Academy, and Harvest International.",
  },
  {
    question: 'What medical colleges can Indiranagar students target?',
    answer:
      "With proper NEET preparation, Indiranagar students can target top colleges like Bangalore Medical College, St. John's Medical College (nearby in Koramangala), MS Ramaiah, Kempegowda Institute, and all-India institutes like AIIMS and JIPMER.",
  },
]

const premiumSchools = [
  'Bishop Cotton Boys School',
  'Bishop Cotton Girls School',
  "St. Joseph's Boys High School",
  'Harvest International School',
  'Inventure Academy',
  'Greenwood High',
  'The International School Bangalore',
  'St. Francis Xavier Girls High',
  'CMR National PU College',
  'Clarence High School',
]

const whyIndiranagar = [
  {
    icon: Sparkles,
    title: 'Premium Quality, Zero Commute',
    description:
      'Get world-class NEET coaching without leaving Indiranagar. No traffic to Jayanagar or Rajajinagar.',
  },
  {
    icon: Building,
    title: "East Bangalore's Best",
    description:
      "Designed for Indiranagar's discerning families. Premium infrastructure, concierge support.",
  },
  {
    icon: GraduationCap,
    title: 'Elite School Expert',
    description:
      "We understand Bishop Cotton, St. Joseph's, Harvest curriculums. Our faculty bridges school learning with NEET.",
  },
]

export default function NeetCoachingIndiranagarPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_indiranagar', {
        event_category: 'conversion',
        event_label: 'neet_coaching_indiranagar_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Indiranagar"
        citySlug="indiranagar-bangalore"
        state="Karnataka"
        localities={indiranagarLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="590"
        coordinates={{ lat: '12.9784', lng: '77.6408' }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-900 via-orange-700 to-rose-800 text-white py-20 overflow-hidden">
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
              East Bangalore Premium | NEET Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Indiranagar</span>, Bangalore
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              100 Feet Road | 12th Main | HAL Stages | CMH Road | Domlur
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Premium NEET Biology coaching for Indiranagar&apos;s elite schools. 94.2% success
              rate, AIIMS faculty, zero traffic stress. Join 590+ students from Bishop Cotton, St.
              Joseph&apos;s.
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
                  className="border-white text-white hover:bg-white hover:text-orange-900"
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

      {/* Indiranagar Localities Section */}
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
              NEET Coaching Across Indiranagar & Surrounding Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From 100 Feet Road to Domlur, HAL to CMH Road - premium coaching for every Indiranagar
              locality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {indiranagarLocalities.map((locality, index) => (
              <motion.div
                key={locality.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                    locality.priority === 'high' ? 'ring-2 ring-orange-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">{locality.students}</div>
                  <div className="text-sm text-gray-500">{locality.highlight}</div>
                  {locality.priority === 'high' && (
                    <div className="mt-2 inline-flex items-center text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
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

      {/* Why Indiranagar Students Choose Us */}
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
              Why Indiranagar&apos;s Elite Choose Cerebrum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium education meets convenience - designed for East Bangalore&apos;s discerning
              families.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyIndiranagar.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-orange-50 rounded-xl p-8 border border-orange-100"
              >
                <item.icon className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Indiranagar Schools Trust Us
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
                <feature.icon className="w-12 h-12 text-orange-600 mb-4" />
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
              Frequently Asked Questions - NEET Coaching Indiranagar
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
                  <MessageCircle className="w-6 h-6 mr-3 text-orange-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-orange-600 to-rose-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join Indiranagar&apos;s Elite NEET Aspirants
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              94.2% success rate, AIIMS faculty, premium small batches. East Bangalore specialists!
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
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All Indiranagar</span>
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
                <span>Elite Schools</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
