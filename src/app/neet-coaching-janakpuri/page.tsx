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
  ShoppingCart,
  GraduationCap,
} from 'lucide-react'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy - Janakpuri',
  description:
    "Best NEET coaching in Janakpuri, West Delhi. Expert AIIMS faculty, proven results. West Delhi's premier coaching destination.",
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-janakpuri',
  telephone: '+91-8826444334',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Janakpuri',
    addressLocality: 'West Delhi',
    addressRegion: 'Delhi',
    postalCode: '110058',
    addressCountry: 'IN',
  },
  areaServed: [
    'Janakpuri',
    'Vikaspuri',
    'Uttam Nagar',
    'Tilak Nagar',
    'Rajouri Garden',
    'Hari Nagar',
    'Subhash Nagar',
    'Dwarka',
  ],
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why choose NEET coaching in Janakpuri?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Janakpuri is West Delhi's premier coaching hub with excellent infrastructure, District Centre mall, multiple libraries, and Blue Line metro connectivity. It's the most developed area in West Delhi.",
      },
    },
    {
      '@type': 'Question',
      name: 'What makes Cerebrum different in Janakpuri?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum offers specialized NEET Biology coaching with AIIMS faculty, small batches of 10-12 students, and 98% success rate. We provide personalized attention that larger institutes cannot.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to reach Janakpuri coaching center?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Janakpuri has excellent metro connectivity with Janakpuri West and East stations on the Blue Line. The area is also well-connected by buses from all parts of West Delhi.',
      },
    },
  ],
}

const nearbyAreas = [
  { name: 'Vikaspuri', distance: '2 km' },
  { name: 'Uttam Nagar', distance: '3 km' },
  { name: 'Tilak Nagar', distance: '2.5 km' },
  { name: 'Rajouri Garden', distance: '4 km' },
  { name: 'Hari Nagar', distance: '3 km' },
  { name: 'Subhash Nagar', distance: '3.5 km' },
  { name: 'Dwarka', distance: '5 km' },
  { name: 'Paschim Vihar', distance: '5 km' },
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

const whyJanakpuri = [
  "West Delhi's most developed residential area",
  'Janakpuri District Centre for all amenities',
  'Multiple coaching institutes and libraries',
  'Excellent Blue Line metro connectivity',
  'Safe and well-planned neighborhood',
  'Affordable PG and hostel options',
]

export default function NEETCoachingJanakpuri() {
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

      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white overflow-hidden">
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
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">West Delhi&apos;s Premier Hub</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Best NEET Coaching in Janakpuri
              </h1>

              <p className="text-xl text-teal-100 max-w-3xl mx-auto mb-8">
                Join West Delhi&apos;s most trusted NEET Biology coaching. AIIMS faculty, proven
                results, and the best infrastructure in West Delhi.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
                >
                  Book FREE Demo Class
                </Link>
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center justify-center gap-2 bg-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-400 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call: 8826-444-334
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Janakpuri Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Study in Janakpuri?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                West Delhi&apos;s most developed and student-friendly area
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
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">West Delhi Hub</h3>
                </div>
                <ul className="space-y-3">
                  {whyJanakpuri.map((reason, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
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
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                    <Train className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Metro Connectivity</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      B
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Janakpuri West Metro</p>
                      <p className="text-sm text-gray-500">Blue Line - 5 min walk</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      B
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Janakpuri East Metro</p>
                      <p className="text-sm text-gray-500">Blue Line - 10 min walk</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      M
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Janakpuri West (Magenta)</p>
                      <p className="text-sm text-gray-500">Interchange station</p>
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
                Why Choose Cerebrum in Janakpuri?
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
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-teal-600" />
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
                  <p className="text-sm text-teal-600">{area.distance}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16 px-4 bg-teal-50">
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
                &quot;Being from Uttam Nagar, Janakpuri was the perfect location for my coaching.
                The metro connectivity made it so easy, and Cerebrum&apos;s focused approach to
                Biology helped me score 660 in NEET. Best decision I made!&quot;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-bold">NK</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Neha Kumari</p>
                  <p className="text-sm text-gray-500">NEET 2024 - 660/720 | VMMC Delhi</p>
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
        <section className="py-16 px-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey in Janakpuri</h2>
              <p className="text-teal-100 mb-8">
                Join West Delhi&apos;s best NEET coaching. Book your FREE demo today!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
                >
                  Book FREE Demo Class
                </Link>
                <a
                  href="https://wa.me/918826444334?text=Hi!%20I%20am%20interested%20in%20NEET%20coaching%20in%20Janakpuri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-400 transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-teal-100">
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
