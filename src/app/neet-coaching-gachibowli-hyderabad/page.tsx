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
  Cpu,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { CitySchema } from '@/components/seo/CitySchema'

const gachibowliLocalities = [
  {
    name: 'Gachibowli',
    slug: 'gachibowli',
    students: '280+',
    highlight: 'IT Hub Center',
    priority: 'high',
  },
  {
    name: 'Financial District',
    slug: 'financial-district',
    students: '150+',
    highlight: 'Corporate Hub',
    priority: 'high',
  },
  {
    name: 'Nanakramguda',
    slug: 'nanakramguda',
    students: '120+',
    highlight: 'IT Corridor',
    priority: 'high',
  },
  {
    name: 'Kondapur',
    slug: 'kondapur',
    students: '180+',
    highlight: 'Tech Residential',
    priority: 'high',
  },
  {
    name: 'Manikonda',
    slug: 'manikonda',
    students: '140+',
    highlight: 'Growing IT Hub',
    priority: 'high',
  },
  {
    name: 'Gopanpally',
    slug: 'gopanpally',
    students: '95+',
    highlight: 'Biodiversity Junction',
    priority: 'medium',
  },
  {
    name: 'Tellapur',
    slug: 'tellapur',
    students: '85+',
    highlight: 'Extended IT Zone',
    priority: 'medium',
  },
  {
    name: 'Narsingi',
    slug: 'narsingi',
    students: '90+',
    highlight: 'Premium Residential',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Premium online coaching for IT professionals\' children. No traffic from Gachibowli. Study from home.',
  },
  {
    icon: Users,
    title: 'Elite Small Batches (10-15)',
    description: 'Exclusive batches with personalized attention perfect for busy IT families.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Expert doctors and teachers from premier medical institutions.',
  },
  {
    icon: BookOpen,
    title: 'Complete Premium Package',
    description: 'NCERT mastery, advanced materials, unlimited doubt sessions included.',
  },
  {
    icon: Clock,
    title: 'Flexible IT-Friendly Timings',
    description: 'Batches designed for IT family schedules - weekend and evening options.',
  },
  {
    icon: Cpu,
    title: 'Tech-Forward Learning',
    description: 'Digital-native learning platform. App access, recorded lectures, AI-powered practice.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score 2024', value: '360', icon: Star },
  { label: 'IT Hub Students', value: '950+', icon: Users },
  { label: 'Premium Schools', value: '15+', icon: GraduationCap },
]

const faqs = [
  {
    question: 'Why do Gachibowli IT families choose online NEET coaching?',
    answer:
      'Gachibowli\'s IT professionals understand the value of quality online education. With demanding work schedules and traffic, online coaching saves 2-3 hours daily. Our tech-forward platform provides the same quality as physical coaching with superior flexibility. 94.2% success rate proves effectiveness.',
  },
  {
    question: 'Which areas in Gachibowli do you serve?',
    answer:
      'We serve all Gachibowli and Financial District localities including Nanakramguda, Kondapur, Manikonda, Gopanpally, Tellapur, Narsingi, and all surrounding IT corridor areas. Perfect for families in DLF, My Home, Aparna complexes.',
  },
  {
    question: 'What is the fee for NEET coaching in Gachibowli?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 68,000 per year. For Gachibowli\'s IT families, this represents excellent value - premium education at a fraction of physical coaching costs, with zero commute time.',
  },
  {
    question: 'How does this fit with IT professional parents\' schedules?',
    answer:
      'We offer multiple batch timings including early morning, evening, and weekend intensive options. Parents can monitor progress through our app. Recorded lectures allow students to catch up if they miss a class.',
  },
  {
    question: 'Do you have batches for international school students?',
    answer:
      'Yes! Many Gachibowli students attend Oakridge, ISB Mohali, and other international schools. We have specialized IB, IGCSE, and Cambridge batches that bridge international curriculum with NEET requirements.',
  },
  {
    question: 'What medical colleges can Gachibowli students target?',
    answer:
      'With proper NEET preparation, students can target Osmania Medical College, Gandhi Medical College, NIMS, and all-India institutes like AIIMS and JIPMER. Many IT families also consider private medical colleges as backup.',
  },
]

const premiumSchools = [
  'Oakridge International',
  'Delhi Public School',
  'Meridian School',
  'Sreenidhi International',
  'Chirec International',
  'Gitanjali Devashray',
  'Silver Oaks International',
  'Glendale Academy',
  'Indus International',
  'NASR School',
]

const whyGachibowli = [
  {
    icon: Cpu,
    title: 'Built for IT Families',
    description:
      'Tech-forward platform designed for digital-native families. App-based learning, AI practice, progress tracking.',
  },
  {
    icon: Building,
    title: 'Zero Commute Premium',
    description:
      'Skip the ORR traffic. Get world-class coaching from your Gachibowli apartment or villa.',
  },
  {
    icon: GraduationCap,
    title: 'Flexible for Busy Schedules',
    description:
      'Multiple batch timings, recorded lectures, weekend intensives - designed for IT family lifestyles.',
  },
]

export default function NeetCoachingGachibowliPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_gachibowli', {
        event_category: 'conversion',
        event_label: 'neet_coaching_gachibowli_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Gachibowli"
        citySlug="gachibowli-hyderabad"
        state="Telangana"
        localities={gachibowliLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="950"
        coordinates={{ lat: '17.4401', lng: '78.3489' }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-900 via-cyan-700 to-blue-800 text-white py-20 overflow-hidden">
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
              Hyderabad IT Hub | Premium NEET Coaching for Tech Families
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Gachibowli</span>, Hyderabad
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Gachibowli | Financial District | Kondapur | Nanakramguda | Manikonda
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Premium NEET Biology coaching for IT families. 94.2% success rate, AIIMS faculty,
              tech-forward platform. Zero ORR traffic. Join 950+ students from Gachibowli IT corridor.
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
                  className="border-white text-white hover:bg-white hover:text-cyan-900"
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

      {/* Localities Section */}
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
              NEET Coaching Across Gachibowli IT Corridor
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gachibowliLocalities.map((locality, index) => (
              <motion.div
                key={locality.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                    locality.priority === 'high' ? 'ring-2 ring-cyan-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                    <MapPin className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div className="text-2xl font-bold text-cyan-600 mb-1">
                    {locality.students}
                  </div>
                  <div className="text-sm text-gray-500">{locality.highlight}</div>
                  {locality.priority === 'high' && (
                    <div className="mt-2 inline-flex items-center text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 mr-1" />
                      IT Hub Area
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Gachibowli Section */}
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
              Why IT Families Choose Cerebrum
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyGachibowli.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-cyan-50 rounded-xl p-8 border border-cyan-100"
              >
                <item.icon className="w-12 h-12 text-cyan-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Premium Schools Trust Us
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
                <feature.icon className="w-12 h-12 text-cyan-600 mb-4" />
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
              FAQs - NEET Coaching Gachibowli
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
                  <MessageCircle className="w-6 h-6 mr-3 text-cyan-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 via-cyan-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join Gachibowli&apos;s Tech-Savvy NEET Aspirants
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              94.2% success rate, AIIMS faculty, tech-forward platform. Built for IT families!
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
                  className="border-white text-white hover:bg-white hover:text-cyan-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>IT Corridor</span>
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
