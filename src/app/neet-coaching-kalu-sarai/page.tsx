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
  name: 'Cerebrum Biology Academy - Kalu Sarai',
  description:
    'Best NEET coaching in Kalu Sarai, South Delhi. Expert AIIMS faculty, proven results, and personalized attention for medical aspirants.',
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-kalu-sarai',
  telephone: '+91-8826444334',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kalu Sarai, Near IIT Delhi',
    addressLocality: 'South Delhi',
    addressRegion: 'Delhi',
    postalCode: '110016',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '28.5460',
    longitude: '77.1937',
  },
  areaServed: [
    'Kalu Sarai',
    'Sarvapriya Vihar',
    'Ber Sarai',
    'Hauz Khas',
    'Green Park',
    'SDA',
    'Malviya Nagar',
    'Panchsheel',
  ],
  sameAs: [
    'https://www.facebook.com/cerebrumbiologyacademy',
    'https://www.instagram.com/cerebrumbiologyacademy',
  ],
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why choose NEET coaching in Kalu Sarai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Kalu Sarai is Delhi's premier coaching hub, located near IIT Delhi with excellent transport connectivity. The area has a rich academic environment that helps students focus on their NEET preparation.",
      },
    },
    {
      '@type': 'Question',
      name: 'What makes Cerebrum Biology Academy different from other coaching in Kalu Sarai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Unlike generic coaching institutes, Cerebrum focuses exclusively on NEET Biology with AIIMS/MAMC faculty, smaller batch sizes (10-12 students), and a 98% success rate in NEET.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to reach Kalu Sarai coaching center?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Kalu Sarai is well-connected via Hauz Khas Metro Station (Yellow Line) which is just 5 minutes away. It's also accessible from Green Park and AIIMS Metro stations.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the fee structure for NEET coaching in Kalu Sarai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum offers competitive fees starting from ₹15,000/month for NEET Biology coaching. We offer installment plans and merit scholarships. Sibling discounts and early-bird offers are also available.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there hostels available near Kalu Sarai for outstation students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Kalu Sarai and nearby Sarvapriya Vihar have many hostels and PGs catering to coaching students. Rent ranges from ₹8,000-15,000/month. Safe options for boys and girls with 24/7 security and mess.',
      },
    },
    {
      '@type': 'Question',
      name: 'What batch timings are available at Cerebrum Kalu Sarai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer flexible batches: Early Morning (6 AM - 9 AM), Morning (9 AM - 12 PM), Afternoon (2 PM - 5 PM), and Evening (6 PM - 9 PM). Weekend-only batches are available for school-going students.',
      },
    },
  ],
}

const nearbyAreas = [
  { name: 'Sarvapriya Vihar', distance: '0.5 km' },
  { name: 'Ber Sarai', distance: '1 km' },
  { name: 'Hauz Khas', distance: '1.5 km' },
  { name: 'Green Park', distance: '2 km' },
  { name: 'SDA (Safdarjung Development Area)', distance: '2 km' },
  { name: 'Malviya Nagar', distance: '2.5 km' },
  { name: 'Panchsheel', distance: '3 km' },
  { name: 'IIT Delhi Campus', distance: '0.5 km' },
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
    title: 'Comprehensive Material',
    description: 'Complete study material covering entire NEET syllabus',
  },
]

const whyKaluSarai = [
  "Premier coaching hub of Delhi - India's coaching capital",
  'Located near IIT Delhi with academic atmosphere',
  'Excellent metro connectivity via Hauz Khas station',
  'Surrounded by libraries, hostels, and study cafes',
  'Competitive environment with serious aspirants',
  'Multiple food and accommodation options nearby',
]

export default function NEETCoachingKaluSarai() {
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
        <section className="relative py-20 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white overflow-hidden">
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
                <span className="text-sm font-medium">Delhi&apos;s Premier Coaching Hub</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Best NEET Coaching in Kalu Sarai
              </h1>

              <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
                Join Delhi&apos;s most trusted NEET Biology coaching in the heart of India&apos;s
                coaching capital. AIIMS faculty, proven results, and the perfect academic
                environment near IIT Delhi.
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

        {/* Why Kalu Sarai Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Study in Kalu Sarai?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kalu Sarai is not just a location - it&apos;s an ecosystem designed for serious
                aspirants
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
                    <Building className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">India&apos;s Coaching Capital</h3>
                </div>
                <ul className="space-y-3">
                  {whyKaluSarai.map((reason, index) => (
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
                  <h3 className="text-xl font-bold text-gray-900">Excellent Connectivity</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      Y
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Hauz Khas Metro</p>
                      <p className="text-sm text-gray-500">Yellow Line - 5 min walk</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      Y
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Green Park Metro</p>
                      <p className="text-sm text-gray-500">Yellow Line - 10 min walk</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      P
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">IIT Delhi Metro</p>
                      <p className="text-sm text-gray-500">Magenta Line - 8 min walk</p>
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
                Why Choose Cerebrum in Kalu Sarai?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Specialized NEET Biology coaching with proven results
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
              <p className="text-gray-600 max-w-2xl mx-auto">
                We serve NEET aspirants from all areas around Kalu Sarai
              </p>
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
                  <p className="text-sm text-green-600">{area.distance}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
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
                &quot;Living in Kalu Sarai and studying at Cerebrum was the perfect combination. The
                academic environment here, combined with expert Biology teaching, helped me score
                680+ in NEET. The small batch size meant I could get my doubts cleared
                instantly.&quot;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">AK</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Ananya Kapoor</p>
                  <p className="text-sm text-gray-500">NEET 2024 - 680/720 | MAMC Delhi</p>
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
        <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey in Kalu Sarai</h2>
              <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                Join the coaching hub that has produced thousands of doctors. Book your FREE demo
                class today!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  Book FREE Demo Class
                </Link>
                <a
                  href="https://wa.me/918826444334?text=Hi!%20I%20am%20interested%20in%20NEET%20coaching%20in%20Kalu%20Sarai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-400 transition-colors"
                >
                  WhatsApp Us
                </a>
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
