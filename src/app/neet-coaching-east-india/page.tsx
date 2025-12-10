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
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Globe,
  Wifi,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const eastIndiaStates = [
  {
    name: 'West Bengal',
    slug: 'west-bengal',
    students: '480+',
    cities: ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
    priority: 'high',
  },
  {
    name: 'Bihar',
    slug: 'bihar',
    students: '620+',
    cities: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga'],
    priority: 'high',
  },
  {
    name: 'Jharkhand',
    slug: 'jharkhand',
    students: '280+',
    cities: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh'],
    priority: 'medium',
  },
  {
    name: 'Odisha',
    slug: 'odisha',
    students: '320+',
    cities: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri', 'Berhampur'],
    priority: 'medium',
  },
  {
    name: 'Assam',
    slug: 'assam',
    students: '180+',
    cities: ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Nagaon'],
    priority: 'medium',
  },
  {
    name: 'Northeast States',
    slug: 'northeast',
    students: '150+',
    cities: ['Imphal', 'Shillong', 'Agartala', 'Itanagar', 'Aizawl'],
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time teaching with instant doubt resolution from Delhi NCR faculty',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Personal attention for every student from Kolkata to Guwahati',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculties',
    description: 'Expert doctors trained at premier Delhi medical institutions',
  },
  {
    icon: BookOpen,
    title: 'Complete Study Material',
    description: 'NCERT-based notes, previous year questions, mock tests included',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning and evening batches to suit East India schedules',
  },
  {
    icon: Wifi,
    title: 'Optimized Streaming',
    description: 'Works well even with moderate internet speeds in smaller towns',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '360', icon: Star },
  { label: 'East India Students', value: '2,030+', icon: Users },
  { label: 'States Covered', value: '6+', icon: MapPin },
]

const faqs = [
  {
    question: 'Can students from Bihar and Jharkhand compete with Delhi students?',
    answer:
      'Absolutely! NEET is a national exam with uniform syllabus. Our Bihar and Jharkhand students have consistently performed well with proper guidance. The key is quality coaching which we provide through our AIIMS-trained faculty. Many of our toppers are from Bihar and West Bengal.',
  },
  {
    question: 'Is internet connectivity an issue for East India students?',
    answer:
      'We have optimized our platform for various bandwidth conditions. Students from even smaller towns like Darbhanga, Hazaribagh, and Silchar study with us successfully. Classes are also recorded for offline viewing if live sessions face connectivity issues.',
  },
  {
    question: 'What are the class timings for East India students?',
    answer:
      'We have evening batches starting from 5 PM and 7 PM IST, plus weekend batches. This timing works perfectly for students after school hours. All classes are recorded for revision anytime.',
  },
  {
    question: 'Why not join local coaching in Kolkata or Patna?',
    answer:
      'While local coaching exists, Delhi coaching has a different approach - more competitive, strategy-focused, and backed by AIIMS alumni experience. Our 98% success rate speaks for the quality difference. Plus, you get all this from home without relocation costs.',
  },
  {
    question: 'Do you provide study materials in Hindi?',
    answer:
      'Our primary medium is English (as NEET is English-based), but our faculty can explain concepts in Hindi when needed for better understanding. Study materials are in English following NCERT terminology.',
  },
]

const whyOnline = [
  {
    icon: Globe,
    title: 'No Kota/Delhi Migration',
    description:
      'Why relocate from Patna or Kolkata? Get Delhi-quality coaching from your hometown.',
  },
  {
    icon: GraduationCap,
    title: 'Level Playing Field',
    description:
      'Same faculty, same material, same quality as students in Delhi NCR. Equal opportunity for all.',
  },
  {
    icon: Award,
    title: 'Proven Track Record',
    description:
      'Multiple toppers from Bihar and West Bengal. East India students excel with proper guidance.',
  },
]

export default function NeetCoachingEastIndiaPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_east_india', {
        event_category: 'conversion',
        event_label: 'neet_coaching_east_india_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-teal-800 to-emerald-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Globe className="w-5 h-5 mr-2" />
              Serving All East Indian States Online
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching for East India</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              West Bengal | Bihar | Jharkhand | Odisha | Assam | Northeast
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              From Kolkata to Guwahati - get Delhi NCR quality NEET coaching at home. AIIMS-trained
              faculty, 98% success rate, and proven results from East India students.
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

      {/* States Section */}
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
              NEET Coaching Across All East Indian States
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From the plains of Bihar to the hills of Northeast - we serve students from every
              corner of East India.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eastIndiaStates.map((state, index) => (
              <motion.div
                key={state.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${
                    state.priority === 'high' ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{state.name}</h3>
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-2">{state.students}</div>
                  <div className="text-sm text-gray-500 mb-3">Students enrolled</div>
                  <div className="flex flex-wrap gap-1">
                    {state.cities.map((city) => (
                      <span
                        key={city}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                  {state.priority === 'high' && (
                    <div className="mt-3 inline-flex items-center text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 mr-1" />
                      High Student Count
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Online Section */}
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
              Why East India Students Choose Our Online Coaching
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyOnline.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-8 border border-green-100"
              >
                <item.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
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
              Why Choose Cerebrum for NEET Coaching in East India?
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
              Frequently Asked Questions - NEET Coaching East India
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
      <section className="py-20 bg-gradient-to-r from-green-600 via-teal-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from East India Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS trained faculties, 2,030+ East India students. No Kota
              migration required!
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
                <span>6+ States Covered</span>
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
                <span>Hindi Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
