'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  MapPin,
  Users,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  Building,
  Globe,
  Phone,
  Clock,
  Navigation,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const offlineCenters = [
  {
    name: 'Rohini Center',
    address: 'Sector 7, Rohini, Delhi - 110085',
    landmark: 'Near Rohini West Metro Station',
    timing: 'Mon-Sat: 8 AM - 8 PM',
    phone: '+91-XXXXXXXXXX',
    highlight: true,
  },
  {
    name: 'Gurugram Center',
    address: 'Sector 14, Gurugram, Haryana',
    landmark: 'Near HUDA City Centre',
    timing: 'Mon-Sat: 8 AM - 8 PM',
    phone: '+91-XXXXXXXXXX',
    highlight: false,
  },
  {
    name: 'South Extension Center',
    address: 'South Extension Part 2, Delhi',
    landmark: 'Near South Ex Metro',
    timing: 'Mon-Sat: 9 AM - 7 PM',
    phone: '+91-XXXXXXXXXX',
    highlight: false,
  },
  {
    name: 'Faridabad Center',
    address: 'Sector 15, Faridabad, Haryana',
    landmark: 'Near Badkhal Chowk',
    timing: 'Mon-Sat: 8 AM - 8 PM',
    phone: '+91-XXXXXXXXXX',
    highlight: false,
  },
]

const onlineAdvantages = [
  'Same AIIMS-trained faculty as offline',
  'Live interactive sessions (not recorded)',
  'Small batches of 15-20 students',
  '24/7 WhatsApp doubt support',
  'Digital study materials & notes',
  'Regular tests and assessments',
]

const faqs = [
  {
    question: 'Which is the best center to join?',
    answer:
      'All our centers have the same quality of teaching and faculty. Choose the one nearest to your location. Rohini is our flagship center with the highest student strength.',
  },
  {
    question: 'Is online teaching as effective as offline?',
    answer:
      'Our online teaching is highly effective with live interactive sessions, the same faculty, and small batches. Many online students have secured top NEET ranks. Choose based on your preference and commute convenience.',
  },
  {
    question: 'Can I switch between online and offline?',
    answer:
      'Yes, we offer hybrid options. You can attend offline when convenient and switch to online when needed. This flexibility is especially helpful during exam times.',
  },
  {
    question: 'Do you have centers outside Delhi NCR?',
    answer:
      'Currently, our offline centers are only in Delhi NCR. However, students from all over India and abroad join our online batches with excellent results.',
  },
]

export default function BiologyTeacherNearMePage() {
  const [isInDelhiNCR, setIsInDelhiNCR] = useState<boolean | null>(null)
  const [showLocationModal, setShowLocationModal] = useState(false)

  useEffect(() => {
    const savedLocation = localStorage.getItem('userInDelhiNCR')
    if (savedLocation !== null) {
      setIsInDelhiNCR(savedLocation === 'true')
    } else {
      setShowLocationModal(true)
    }
  }, [])

  const handleLocationSelect = (inDelhi: boolean) => {
    setIsInDelhiNCR(inDelhi)
    localStorage.setItem('userInDelhiNCR', String(inDelhi))
    setShowLocationModal(false)
  }

  return (
    <div className="min-h-screen">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
              Where are you located?
            </h3>
            <p className="text-gray-600 text-center mb-6">
              This helps us show you the most relevant options
            </p>
            <div className="space-y-3">
              <button
                onClick={() => handleLocationSelect(true)}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Building className="w-5 h-5" />
                Delhi NCR (can attend offline)
              </button>
              <button
                onClick={() => handleLocationSelect(false)}
                className="w-full py-4 bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
              >
                <Globe className="w-5 h-5" />
                Outside Delhi NCR (online only)
              </button>
            </div>
          </motion.div>
        </div>
      )}

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
              <MapPin className="w-5 h-5 mr-2 text-yellow-300" />
              Find Biology Teacher Near You
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">Biology Teacher</span> Near Me
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              4 Offline Centers in Delhi NCR | Online Classes Pan-India
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              {isInDelhiNCR === true
                ? 'Great! You can attend our offline centers for in-person learning experience. Choose the center nearest to you.'
                : isInDelhiNCR === false
                  ? 'Join our online batches with the same AIIMS-trained faculty. Students from 15+ states learning with us!'
                  : 'Find the best biology teaching near you. Offline centers in Delhi NCR or join online from anywhere in India.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <button
                onClick={() => setShowLocationModal(true)}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition"
              >
                <Navigation className="w-5 h-5 mr-2" />
                Change Location
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Offline Centers - Show prominently for Delhi NCR users */}
      {isInDelhiNCR !== false && (
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
                Our Offline Centers
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Visit any of our 4 centers in Delhi NCR for in-person classes
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {offlineCenters.map((center, index) => (
                <motion.div
                  key={center.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`rounded-xl p-8 shadow-lg ${
                    center.highlight ? 'bg-blue-50 border-2 border-blue-300' : 'bg-white'
                  }`}
                >
                  {center.highlight && (
                    <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full mb-4">
                      Flagship Center
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{center.name}</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p>{center.address}</p>
                        <p className="text-sm text-gray-500">{center.landmark}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <p>{center.timing}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <p>{center.phone}</p>
                    </div>
                  </div>
                  <Link href="/demo-booking">
                    <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700">
                      Book Visit
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Online Option - Show prominently for non-Delhi users */}
      <section className={`py-20 ${isInDelhiNCR === false ? 'bg-gray-50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              {isInDelhiNCR === false
                ? 'Join Online from Anywhere'
                : 'Online Classes Also Available'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isInDelhiNCR === false
                ? "Can't attend offline? Our online batches deliver the same quality teaching!"
                : 'Prefer learning from home? Join our online batches with the same faculty.'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                {onlineAdvantages.map((advantage, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{advantage}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-4">
                <Link href="/demo-booking">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Video className="w-5 h-5 mr-2" />
                    Try Free Online Demo
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white"
            >
              <Globe className="w-16 h-16 mb-6 opacity-80" />
              <h3 className="text-2xl font-bold mb-4">Students from 15+ States</h3>
              <p className="opacity-90 mb-6">
                Maharashtra, Karnataka, Tamil Nadu, Kerala, Gujarat, Rajasthan, UP, Bihar, West
                Bengal, and more. Plus NRI students from UAE, USA, UK!
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm opacity-80">Online Students</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm opacity-80">Success Rate</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gray-50">
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
                className="bg-white rounded-xl p-8 shadow-lg"
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {isInDelhiNCR
                ? 'Visit our nearest center or join online - your choice!'
                : 'Join our online batches and learn from the best!'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
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
          </motion.div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/biology-teacher"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Teacher
            </Link>
            <Link
              href="/best-biology-teacher-for-neet"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Best Biology Teacher for NEET
            </Link>
            <Link
              href="/biology-tutors-near-me"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tutors Near Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
