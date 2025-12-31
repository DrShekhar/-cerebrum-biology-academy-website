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
  Languages,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const southIndiaStates = [
  {
    name: 'Karnataka',
    slug: 'karnataka',
    students: '650+',
    cities: ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum'],
    priority: 'high',
  },
  {
    name: 'Tamil Nadu',
    slug: 'tamil-nadu',
    students: '520+',
    cities: ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem'],
    priority: 'high',
  },
  {
    name: 'Kerala',
    slug: 'kerala',
    students: '480+',
    cities: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam'],
    priority: 'high',
  },
  {
    name: 'Andhra Pradesh',
    slug: 'andhra-pradesh',
    students: '380+',
    cities: ['Hyderabad', 'Vijayawada', 'Visakhapatnam', 'Guntur', 'Tirupati'],
    priority: 'high',
  },
  {
    name: 'Telangana',
    slug: 'telangana',
    students: '420+',
    cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'],
    priority: 'high',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time teaching with instant doubt resolution in English medium',
  },
  {
    icon: Languages,
    title: 'English Medium Teaching',
    description: 'All classes in English - perfect for South Indian board students',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculties',
    description: 'Expert doctors trained at premier Delhi medical institutions',
  },
  {
    icon: BookOpen,
    title: 'Complete Study Material',
    description: 'NCERT-based notes aligned with NEET pattern',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Evening batches after school hours for South India students',
  },
  {
    icon: Wifi,
    title: 'High-Quality Streaming',
    description: 'Optimized for good internet infrastructure in South India',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '360', icon: Star },
  { label: 'South India Students', value: '2,450+', icon: Users },
  { label: 'States Covered', value: '5', icon: MapPin },
]

const faqs = [
  {
    question: 'Are classes conducted in English?',
    answer:
      'Yes, all our classes are conducted in English, making them perfect for South Indian students who study in English medium schools. Our faculty explain complex concepts clearly in simple English.',
  },
  {
    question: 'What are the class timings for South India students?',
    answer:
      'We have evening batches starting from 5 PM and 7 PM IST, ideal for students after school. Weekend batches are also available for intensive preparation. Recorded classes can be watched anytime.',
  },
  {
    question: 'How is Delhi coaching different from local South India coaching?',
    answer:
      "Delhi coaching focuses on NCERT-based NEET pattern preparation. Our AIIMS-trained faculty bring expertise from India's top medical institutions. We combine rigorous practice with smart strategies that have produced 98% success rate.",
  },
  {
    question: 'Do you cover state board topics or only NCERT?',
    answer:
      'NEET is 100% NCERT-based. We focus entirely on NCERT curriculum which is common across all boards. Whether you study CBSE, State Board, or ICSE, our NCERT-focused approach ensures complete NEET preparation.',
  },
  {
    question: 'What about practical/lab work support?',
    answer:
      'We provide detailed video demonstrations of all practical experiments relevant for NEET. Our virtual lab sessions help you understand concepts that could appear in practical-based MCQs.',
  },
]

const whyOnline = [
  {
    icon: Globe,
    title: 'Access Delhi Excellence',
    description:
      "Get exposure to North India's competitive NEET coaching culture and strategies from top faculty.",
  },
  {
    icon: Languages,
    title: 'English Medium Only',
    description: 'Clear English explanations perfect for South Indian students. No Hindi barrier.',
  },
  {
    icon: GraduationCap,
    title: 'NCERT-Focused Approach',
    description: 'Pure NCERT-based teaching that works across all state boards and CBSE equally.',
  },
]

export default function NeetCoachingSouthIndiaPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_south_india', {
        event_category: 'conversion',
        event_label: 'neet_coaching_south_india_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-900 via-red-800 to-pink-900 text-white py-20 overflow-hidden">
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
              Serving All South Indian States Online
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching for South India</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Karnataka | Tamil Nadu | Kerala | Andhra Pradesh | Telangana
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Access Delhi-quality NEET coaching in English medium. AIIMS-trained faculty, 98%
              success rate, and NCERT-focused approach perfect for South Indian students.
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
              NEET Coaching Across All South Indian States
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Bangalore to Chennai, Kochi to Hyderabad - we serve students from every major
              city in South India.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {southIndiaStates.map((state, index) => (
              <motion.div
                key={state.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 ring-2 ring-orange-500">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{state.name}</h3>
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-2">{state.students}</div>
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* City-Specific Pages Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore NEET Coaching by City
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find detailed information about NEET coaching in your city
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { name: 'Bangalore', href: '/neet-coaching-bangalore' },
              { name: 'Hyderabad', href: '/neet-coaching-hyderabad' },
            ].map((city, index) => (
              <motion.div
                key={city.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link
                  href={city.href}
                  className="flex items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-all hover:shadow-md"
                >
                  <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                  <span className="font-medium text-gray-800">{city.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Online Section */}
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
              Why South India Students Choose Our Online Coaching
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
                className="bg-orange-50 rounded-xl p-8 border border-orange-100"
              >
                <item.icon className="w-12 h-12 text-orange-600 mb-4" />
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
              Why Choose Cerebrum for NEET Coaching in South India?
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
              Frequently Asked Questions - NEET Coaching South India
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
      <section className="py-20 bg-gradient-to-r from-orange-600 via-red-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from South India Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS trained faculties, 2,450+ South India students. English medium
              classes!
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
                <span>5 States Covered</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>English Medium</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>NCERT Focused</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
