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

const andheriLocalities = [
  {
    name: 'Andheri West',
    slug: 'andheri-west',
    students: '220+',
    highlight: 'Lokhandwala, Versova',
    priority: 'high',
  },
  {
    name: 'Andheri East',
    slug: 'andheri-east',
    students: '180+',
    highlight: 'MIDC, Marol',
    priority: 'high',
  },
  {
    name: 'Lokhandwala Complex',
    slug: 'lokhandwala',
    students: '150+',
    highlight: 'Premium Township',
    priority: 'high',
  },
  {
    name: 'Versova',
    slug: 'versova',
    students: '120+',
    highlight: 'Creative Hub',
    priority: 'high',
  },
  {
    name: 'DN Nagar',
    slug: 'dn-nagar',
    students: '100+',
    highlight: 'Metro Hub',
    priority: 'high',
  },
  {
    name: 'Four Bungalows',
    slug: 'four-bungalows',
    students: '95+',
    highlight: 'Residential Premium',
    priority: 'medium',
  },
  {
    name: 'Oshiwara',
    slug: 'oshiwara',
    students: '85+',
    highlight: 'Growing Hub',
    priority: 'medium',
  },
  {
    name: 'SEEPZ Area',
    slug: 'seepz',
    students: '75+',
    highlight: 'Corporate Zone',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Premium online coaching - no need to travel through Andheri traffic. World-class teaching from home.',
  },
  {
    icon: Users,
    title: 'Elite Small Batches (10-15)',
    description:
      'Exclusive batches for Andheri students with personalized attention and premium support.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description:
      'Expert doctors and teachers from premier medical institutions. Quality Andheri families expect.',
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
    description: 'No Link Road traffic stress. Study in comfort from your Lokhandwala apartment.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score 2024', value: '352', icon: Star },
  { label: 'Andheri Students', value: '850+', icon: Users },
  { label: 'Partner Schools', value: '20+', icon: GraduationCap },
]

const faqs = [
  {
    question: 'Why do Andheri students choose online NEET coaching?',
    answer:
      "Andheri is Mumbai's commercial hub with notorious traffic. Our online classes save students 2-3 hours daily that would be spent commuting to coaching centers. With Lokhandwala, Versova, and Andheri East all under one platform, students get premium coaching without travel stress.",
  },
  {
    question: 'Which areas in Andheri do you serve?',
    answer:
      'We serve all Andheri localities including Andheri West, Andheri East, Lokhandwala Complex, Versova, DN Nagar, Four Bungalows, Oshiwara, SEEPZ, and Marol. Students from any part of Andheri can join our online live classes.',
  },
  {
    question: 'What is the fee for NEET coaching in Andheri?',
    answer:
      "Our complete NEET Biology course ranges from Rs 24,000 to Rs 68,000 per year depending on the program chosen. This is competitive with Andheri's premium coaching centers while offering superior flexibility and personalized attention. EMI options available.",
  },
  {
    question: 'How does this compare to physical coaching centers in Andheri?',
    answer:
      'Unlike physical coaching centers on Link Road or Andheri Station area where batches have 50-100 students, we limit batches to 10-15 students. This means every doubt gets addressed, every student gets personal attention.',
  },
  {
    question: 'Do you support CBSE and State Board students?',
    answer:
      'Yes! We have batches for both CBSE and Maharashtra State Board students. Our faculty understands both curricula and knows how to prepare students for NEET while keeping school exams in mind.',
  },
  {
    question: 'What medical colleges can Andheri students target?',
    answer:
      'With proper NEET preparation, Andheri students can target top colleges like Grant Medical College, KEM Hospital, Seth GS Medical College, BYL Nair Hospital, and all-India institutes like AIIMS and JIPMER.',
  },
]

const premiumSchools = [
  'Mithibai College Junior',
  'NM College Junior',
  'Podar International School',
  'Billabong High School',
  'Ryan International',
  "St. Anne's High School",
  'Holy Cross High School',
  'Jasudben ML School',
  'Universal High School',
  'Mary Immaculate Girls High School',
]

const whyAndheri = [
  {
    icon: Sparkles,
    title: 'Zero Commute, Maximum Study',
    description:
      'Save 2-3 hours daily on Andheri traffic. Use that time for self-study and revision instead of sitting in rickshaws.',
  },
  {
    icon: Building,
    title: "Mumbai's Coaching Alternative",
    description:
      'Get Kota-level coaching without leaving Andheri. AIIMS faculty, small batches, and premium infrastructure.',
  },
  {
    icon: GraduationCap,
    title: 'School-Friendly Schedule',
    description:
      'Flexible timings that work around your junior college schedule. Morning, evening, and weekend batches.',
  },
]

export default function NeetCoachingAndheriPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_andheri', {
        event_category: 'conversion',
        event_label: 'neet_coaching_andheri_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Andheri"
        citySlug="andheri-mumbai"
        state="Maharashtra"
        localities={andheriLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="850"
        coordinates={{ lat: '19.1136', lng: '72.8697' }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-900 via-orange-700 to-amber-800 text-white py-20 overflow-hidden">
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
              Mumbai&apos;s Commercial Hub | Premium NEET Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Andheri</span>, Mumbai
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Lokhandwala | Versova | Andheri East | DN Nagar | Four Bungalows
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Premium NEET Biology coaching for Andheri students. 94.2% success rate, AIIMS faculty,
              zero traffic stress. Join 850+ students from Lokhandwala to Marol.
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

      {/* Andheri Localities Section */}
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
              NEET Coaching Across Andheri & Surrounding Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Lokhandwala to SEEPZ, Versova to Marol - premium coaching for every Andheri
              locality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {andheriLocalities.map((locality, index) => (
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

      {/* Why Andheri Students Choose Us */}
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
              Why Andheri Students Choose Cerebrum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium education meets convenience - designed for busy Andheri families.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyAndheri.map((item, index) => (
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
              Students from These Andheri Schools Trust Us
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
              Frequently Asked Questions - NEET Coaching Andheri
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
      <section className="py-20 bg-gradient-to-r from-orange-600 via-orange-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join Andheri&apos;s Top NEET Aspirants
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              94.2% success rate, AIIMS faculty, premium small batches. No traffic stress!
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
                <span>All Andheri Areas</span>
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
                <span>Flexible Schedule</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
