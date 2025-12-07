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
  Building,
  GraduationCap,
} from 'lucide-react'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy - Mukherjee Nagar',
  description:
    "Best NEET coaching in Mukherjee Nagar, North Delhi. Expert AIIMS faculty, proven results for medical aspirants in Delhi's coaching hub.",
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-mukherjee-nagar',
  telephone: '+91-8826444334',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Mukherjee Nagar',
    addressLocality: 'North Delhi',
    addressRegion: 'Delhi',
    postalCode: '110009',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '28.7041',
    longitude: '77.2100',
  },
  areaServed: [
    'Mukherjee Nagar',
    'GTB Nagar',
    'Model Town',
    'Kamla Nagar',
    'Kingsway Camp',
    'Hudson Lane',
    'Vijay Nagar',
    'Outram Lines',
  ],
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Mukherjee Nagar good for NEET coaching?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes! Mukherjee Nagar is North Delhi's premier coaching hub with excellent study infrastructure, libraries, hostels, and a competitive academic environment perfect for NEET preparation.",
      },
    },
    {
      '@type': 'Question',
      name: 'What makes Cerebrum different from other coaching in Mukherjee Nagar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'While most coaching centers here focus on UPSC, Cerebrum specializes exclusively in NEET Biology with AIIMS faculty, small batches of 10-12 students, and 98% success rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to reach Mukherjee Nagar coaching center?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mukherjee Nagar is well-connected via GTB Nagar Metro Station (Yellow Line) which is 10 minutes away. Model Town Metro is also accessible.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the fee for NEET coaching in Mukherjee Nagar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum offers NEET Biology coaching starting from ₹15,000/month. We provide flexible payment plans including EMI options. Scholarships up to 50% are available based on entrance test performance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is accommodation available near Mukherjee Nagar coaching center?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mukherjee Nagar has the best hostel infrastructure in Delhi with 500+ PGs and hostels. Rent ranges from ₹6,000-12,000/month for shared rooms. Safe accommodations for boys and girls with mess facilities.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are class timings at Cerebrum Mukherjee Nagar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer multiple batch timings: Morning (7 AM - 10 AM), Day batch (11 AM - 2 PM), and Evening (5 PM - 8 PM). Special weekend batches available for students who attend school on weekdays.',
      },
    },
  ],
}

const nearbyAreas = [
  { name: 'GTB Nagar', distance: '1 km' },
  { name: 'Model Town', distance: '2 km' },
  { name: 'Kamla Nagar', distance: '1.5 km' },
  { name: 'Kingsway Camp', distance: '1 km' },
  { name: 'Hudson Lane', distance: '1.5 km' },
  { name: 'Vijay Nagar', distance: '2 km' },
  { name: 'Outram Lines', distance: '2 km' },
  { name: 'Mall Road', distance: '1 km' },
]

const features = [
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description: 'Learn from doctors who cleared AIIMS themselves',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: 'Only 10-12 students per batch for personal attention',
  },
  { icon: Award, title: '98% Success Rate', description: 'Proven track record of NEET qualifiers' },
  {
    icon: BookOpen,
    title: 'Complete Material',
    description: 'Comprehensive study material for NEET Biology',
  },
]

const whyMukherjeeNagar = [
  "North Delhi's premier coaching hub",
  'Excellent hostel and PG accommodations',
  'Multiple libraries and reading rooms',
  'Competitive study environment',
  'Affordable food options (canteens & dhabas)',
  'Close proximity to Delhi University',
]

export default function NEETCoachingMukherjeeNagar() {
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
                <span className="text-sm font-medium">North Delhi&apos;s Coaching Hub</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Best NEET Coaching in Mukherjee Nagar
              </h1>

              <p className="text-xl text-teal-100 max-w-3xl mx-auto mb-8">
                Join North Delhi&apos;s most focused NEET Biology coaching. AIIMS faculty, proven
                results, and the perfect academic environment in Delhi&apos;s coaching capital.
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

        {/* Why Mukherjee Nagar Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Study in Mukherjee Nagar?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                India&apos;s coaching capital with everything an aspirant needs
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
                    <Building className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">The Study Hub</h3>
                </div>
                <ul className="space-y-3">
                  {whyMukherjeeNagar.map((reason, index) => (
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
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      Y
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">GTB Nagar Metro</p>
                      <p className="text-sm text-gray-500">Yellow Line - 10 min walk</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      Y
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Model Town Metro</p>
                      <p className="text-sm text-gray-500">Yellow Line - 15 min walk</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      Y
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Vishwavidyalaya Metro</p>
                      <p className="text-sm text-gray-500">Yellow Line - 12 min by bus</p>
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
                Why Choose Cerebrum in Mukherjee Nagar?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Specialized NEET Biology coaching - not UPSC, only NEET!
              </p>
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

        {/* Nearby Areas Section */}
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
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
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
                &quot;I moved to Mukherjee Nagar for my NEET preparation. While the area is famous
                for UPSC coaching, finding quality NEET coaching was a challenge until I discovered
                Cerebrum. Their focused Biology coaching helped me crack NEET with 670 marks!&quot;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-bold">VK</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Vikram Kumar</p>
                  <p className="text-sm text-gray-500">NEET 2024 - 670/720 | UCMS Delhi</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            </motion.div>

            <div className="space-y-4">
              {faqStructuredData.mainEntity.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.name}</h3>
                  <p className="text-gray-600">{faq.acceptedAnswer.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Start Your NEET Journey in Mukherjee Nagar
              </h2>
              <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
                Join the coaching hub with the best study environment. Book your FREE demo class
                today!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
                >
                  Book FREE Demo Class
                </Link>
                <a
                  href="https://wa.me/918826444334?text=Hi!%20I%20am%20interested%20in%20NEET%20coaching%20in%20Mukherjee%20Nagar"
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
