'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Phone,
  MapPin,
  Clock,
  Award,
  Users,
  BookOpen,
  CheckCircle,
  Star,
  Train,
  GraduationCap,
  School,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy - GTB Nagar',
  description:
    'Best NEET coaching in GTB Nagar near Delhi University. Expert AIIMS faculty, proven results for medical aspirants.',
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-gtb-nagar',
  telephone: '+91-8826444334',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'GTB Nagar',
    addressLocality: 'North Delhi',
    addressRegion: 'Delhi',
    postalCode: '110009',
    addressCountry: 'IN',
  },
  areaServed: [
    'GTB Nagar',
    'Hudson Lane',
    'Mukherjee Nagar',
    'Kamla Nagar',
    'Shakti Nagar',
    'Roop Nagar',
    'Outram Lines',
    'Mall Road',
  ],
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why is GTB Nagar good for NEET coaching?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GTB Nagar is located near Delhi University with excellent academic environment, libraries, cafes, and the famous Hudson Lane food street. It offers the perfect balance of study and student life.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes Cerebrum different in GTB Nagar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum offers specialized NEET Biology coaching with AIIMS faculty, small batches of 10-12 students, and 98% success rate. We focus exclusively on NEET unlike generic coaching centers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to reach GTB Nagar coaching center?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GTB Nagar Metro Station (Yellow Line) is right in the heart of the area. The coaching center is just 5 minutes walk from the metro station.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the fees for NEET coaching in GTB Nagar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum offers NEET Biology coaching from ₹15,000/month. We provide EMI options and merit scholarships up to 50% for toppers. Demo classes are FREE to help you decide.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is PG accommodation available near GTB Nagar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GTB Nagar and nearby Hudson Lane have excellent student accommodations with 200+ PGs and hostels. Rent ranges from ₹7,000-12,000/month. The area is known for safe, student-friendly housing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the batch timings at Cerebrum GTB Nagar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer morning (7 AM - 10 AM), afternoon (12 PM - 3 PM), and evening (5 PM - 8 PM) batches. Weekend batches available for school-going students. Choose timing that suits your schedule.',
      },
    },
  ],
}

const nearbyAreas = [
  { name: 'Hudson Lane', distance: '0.5 km' },
  { name: 'Mukherjee Nagar', distance: '1.5 km' },
  { name: 'Kamla Nagar', distance: '1 km' },
  { name: 'Shakti Nagar', distance: '2 km' },
  { name: 'Roop Nagar', distance: '1.5 km' },
  { name: 'Outram Lines', distance: '1 km' },
  { name: 'Mall Road', distance: '2 km' },
  { name: 'Delhi University', distance: '0.5 km' },
]

const features = [
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description: 'Learn from doctors who cleared AIIMS',
  },
  { icon: Users, title: 'Small Batches', description: '10-12 students per batch' },
  { icon: Award, title: '98% Success', description: 'Proven NEET results' },
  { icon: BookOpen, title: 'Complete Material', description: 'Comprehensive study material' },
]

const whyGTBNagar = [
  'Adjacent to Delhi University North Campus',
  'Famous Hudson Lane for food and cafes',
  'Multiple libraries and study spaces',
  'Vibrant student community',
  'Yellow Line metro connectivity',
  'Affordable PG and hostel options',
]

export default function NEETCoachingGTBNagar() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-[#4a5d4a] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-300 rounded-full blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
                <School className="w-4 h-4" />
                <span className="text-sm font-medium">Near Delhi University</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Best NEET Coaching in GTB Nagar
              </h1>

              <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
                Study in the heart of Delhi&apos;s academic hub near Delhi University. AIIMS
                faculty, proven results, and the perfect student environment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  Book FREE Demo Class
                </Link>
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-500 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call: 8826-444-334
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why GTB Nagar Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Study in GTB Nagar?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The perfect blend of academics and student life
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <School className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">The DU Hub</h3>
                </div>
                <ul className="space-y-3">
                  {whyGTBNagar.map((reason, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{reason}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Train className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Metro Connectivity</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      Y
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">GTB Nagar Metro</p>
                      <p className="text-sm text-gray-500">Yellow Line - 5 min walk</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      Y
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Vishwavidyalaya Metro</p>
                      <p className="text-sm text-gray-500">Yellow Line - 8 min walk</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      Y
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Model Town Metro</p>
                      <p className="text-sm text-gray-500">Yellow Line - 12 min</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Cerebrum in GTB Nagar?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Students from Nearby Areas</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {nearbyAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-4 rounded-lg shadow-md text-center"
                >
                  <p className="font-medium text-gray-900">{area.name}</p>
                  <p className="text-sm text-green-600">{area.distance}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16 px-4 bg-green-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-lg text-gray-700 mb-6">
                &quot;GTB Nagar is the best place for students - great food at Hudson Lane, DU
                vibes, and serious study environment. Cerebrum&apos;s Biology coaching here helped
                me score 665 in NEET. The location is perfect!&quot;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">AJ</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Aditya Joshi</p>
                  <p className="text-sm text-gray-500">NEET 2024 - 665/720 | LHMC Delhi</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">FAQs</h2>
            </motion.div>

            <div className="space-y-4">
              {faqStructuredData.mainEntity.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.name}</h3>
                  <p className="text-gray-600">{faq.acceptedAnswer.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-[#4a5d4a] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey in GTB Nagar</h2>
              <p className="text-green-100 mb-8">
                Study near DU in Delhi&apos;s best student hub. Book your FREE demo today!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  Book FREE Demo Class
                </Link>
                <button
                  onClick={async () => {
                    await trackAndOpenWhatsApp({
                      source: 'neet-coaching-gtb-nagar',
                      message: 'Hi! I am interested in NEET coaching in GTB Nagar',
                      campaign: 'neet-coaching-page',
                    })
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-400 transition-colors cursor-pointer"
                >
                  WhatsApp Us
                </button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-green-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Mon-Sat: 8AM-8PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>8826-444-334</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
