'use client'

import { motion } from 'framer-motion'
import {
  Globe,
  Users,
  Trophy,
  BookOpen,
  Video,
  CheckCircle,
  Star,
  Clock,
  Shield,
  Zap,
  MessageCircle,
  Award,
  MapPin,
  Play,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const indianStates = [
  { name: 'Rajasthan', students: '450+', highlight: 'Kota Alternative' },
  { name: 'Uttar Pradesh', students: '380+', highlight: 'Lucknow, Noida' },
  { name: 'Maharashtra', students: '320+', highlight: 'Mumbai, Pune' },
  { name: 'Karnataka', students: '280+', highlight: 'Bangalore' },
  { name: 'Tamil Nadu', students: '260+', highlight: 'Chennai' },
  { name: 'Gujarat', students: '240+', highlight: 'Ahmedabad' },
  { name: 'Kerala', students: '220+', highlight: 'Kochi' },
  { name: 'Telangana', students: '200+', highlight: 'Hyderabad' },
  { name: 'West Bengal', students: '180+', highlight: 'Kolkata' },
  { name: 'Madhya Pradesh', students: '160+', highlight: 'Bhopal, Indore' },
  { name: 'Bihar', students: '150+', highlight: 'Patna' },
  { name: 'Delhi NCR', students: '800+', highlight: 'Physical + Online' },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time teaching with instant doubt resolution. Not pre-recorded videos.',
  },
  {
    icon: Users,
    title: 'Small Batches (15-20)',
    description: 'Personal attention unlike Kota/Allen batches of 200-400 students.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Expert teachers with 15+ years experience, trained at AIIMS.',
  },
  {
    icon: MessageCircle,
    title: '24/7 Doubt Resolution',
    description: 'Get your doubts cleared anytime via chat, call, or scheduled sessions.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Study Material',
    description: 'NCERT-based notes, previous year questions, mock tests included.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches to suit your schedule.',
  },
]

const successStories = [
  {
    name: 'Priya Sharma',
    state: 'Rajasthan',
    score: 'AIR 1,247',
    quote: 'Chose Cerebrum over Kota. Best decision - saved ₹2.5L and scored better!',
  },
  {
    name: 'Arjun Patel',
    state: 'Gujarat',
    score: 'AIR 2,156',
    quote:
      'Online classes were as effective as any classroom. Personal attention made the difference.',
  },
  {
    name: 'Sneha Iyer',
    state: 'Tamil Nadu',
    score: 'AIR 1,892',
    quote: 'From Chennai, got Delhi-quality coaching without leaving home. 360/360 in Biology!',
  },
]

const faqs = [
  {
    question: 'Can I join from any state in India?',
    answer:
      'Yes! Our online NEET coaching is available for students across India. We have students from 25+ states including Rajasthan, UP, Maharashtra, Karnataka, Tamil Nadu, Gujarat, Kerala, and more. All you need is a stable internet connection.',
  },
  {
    question: 'Are online classes as effective as Kota coaching?',
    answer:
      "Our 98% success rate speaks for itself! Unlike Kota's large batches of 200-400 students, we maintain small batches of 15-20 for personal attention. Our students score better on average while staying safe at home.",
  },
  {
    question: 'What is the fee for online NEET coaching?',
    answer:
      'Our complete NEET Biology course is ₹24,000 - ₹48,000 per year depending on the program. This is 60-70% less than Kota coaching when you include accommodation and living expenses.',
  },
  {
    question: 'How do live classes work?',
    answer:
      'We conduct live interactive classes via Zoom/Google Meet. You can ask questions in real-time, participate in discussions, and interact with teachers just like a physical classroom. All classes are recorded for revision.',
  },
  {
    question: 'Do you provide study materials?',
    answer:
      'Yes! All students receive comprehensive study materials - NCERT-based notes, topic-wise questions, previous year NEET papers, and regular mock tests. Everything is included in the course fee.',
  },
]

export default function OnlineNeetCoachingIndiaPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_online_india', {
        event_category: 'conversion',
        event_label: 'online_neet_coaching_india_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
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
              <Globe className="w-5 h-5 mr-2" />
              Pan-India Online NEET Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">Online NEET Coaching</span> in India
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Live Classes • AIIMS Trained Faculty • 98% Success Rate
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Join 2,500+ students from Rajasthan, UP, Maharashtra, Karnataka, Tamil Nadu, Gujarat,
              Kerala and all Indian states. Quality coaching from home - no need to relocate to
              Kota!
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">2,500+</div>
                <div className="text-sm opacity-80">Students Pan-India</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <MapPin className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">25+</div>
                <div className="text-sm opacity-80">Indian States</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">695</div>
                <div className="text-sm opacity-80">Top Score 2024</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* States Coverage Section */}
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
              Students from All Over India Trust Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Kota alternatives in Rajasthan to online coaching in Kerala - we serve NEET
              aspirants across every Indian state.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {indianStates.map((state, index) => (
              <motion.div
                key={state.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{state.name}</h3>
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">{state.students}</div>
                <div className="text-sm text-gray-500">{state.highlight}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Why Choose Our Online NEET Coaching?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get Kota-quality education from the comfort of your home. No relocation, no stress,
              better results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories from Across India
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real students, real results. See how online coaching transformed their NEET journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{story.name}</div>
                    <div className="text-gray-500 text-sm">{story.state}</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-4">{story.score}</div>
                <p className="text-gray-700 italic">&ldquo;{story.quote}&rdquo;</p>
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
              Frequently Asked Questions
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
              Join India's Best Online NEET Coaching
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, 2,500+ students, 25+ states. Start your NEET journey from home
              today!
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
                <span>All India Coverage</span>
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
                <span>Affordable Fees</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
