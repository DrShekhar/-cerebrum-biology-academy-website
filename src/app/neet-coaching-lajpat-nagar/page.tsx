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
  ShoppingBag,
  GraduationCap,
} from 'lucide-react'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy - Lajpat Nagar',
  description:
    'Best NEET coaching in Lajpat Nagar, South Delhi. Expert AIIMS faculty, proven results, and personalized attention for medical aspirants.',
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-lajpat-nagar',
  telephone: '+91-8826444334',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Lajpat Nagar',
    addressLocality: 'South Delhi',
    addressRegion: 'Delhi',
    postalCode: '110024',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '28.5700',
    longitude: '77.2400',
  },
  areaServed: [
    'Lajpat Nagar',
    'Defence Colony',
    'Jangpura',
    'Moolchand',
    'Andrews Ganj',
    'Amar Colony',
    'Bhogal',
    'Nizamuddin',
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
      name: 'Why choose NEET coaching in Lajpat Nagar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lajpat Nagar is a prime South Delhi location with excellent connectivity via Pink and Violet metro lines. The area offers great infrastructure with libraries, stationary shops, and study-friendly cafes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes Cerebrum Biology Academy different in Lajpat Nagar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum focuses exclusively on NEET Biology with AIIMS/MAMC faculty, smaller batch sizes (10-12 students), and a 98% success rate. We offer personalized attention that larger coaching centers cannot provide.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to reach the coaching center in Lajpat Nagar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our center is easily accessible via Lajpat Nagar Metro Station (Pink Line) and Moolchand Metro Station (Violet Line). Multiple bus routes also connect to Lajpat Nagar Central Market.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the fee for NEET Biology coaching in Lajpat Nagar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum offers comprehensive NEET Biology coaching starting from ₹15,000/month. Flexible payment options, EMI plans, and merit-based scholarships are available. Book a FREE demo first!',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there hostels near Lajpat Nagar coaching center?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lajpat Nagar and nearby Defence Colony have good PG options for students. Rent ranges from ₹10,000-18,000/month in this premium South Delhi area. Safe options for boys and girls available.',
      },
    },
    {
      '@type': 'Question',
      name: 'What batch timings are available in Lajpat Nagar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer multiple batches: Morning (8 AM - 11 AM), Afternoon (2 PM - 5 PM), and Evening (6 PM - 9 PM). Weekend batches cater to students attending school on weekdays.',
      },
    },
  ],
}

const nearbyAreas = [
  { name: 'Defence Colony', distance: '1 km' },
  { name: 'Jangpura', distance: '1.5 km' },
  { name: 'Moolchand', distance: '1 km' },
  { name: 'Andrews Ganj', distance: '1.5 km' },
  { name: 'Amar Colony', distance: '0.5 km' },
  { name: 'Bhogal', distance: '2 km' },
  { name: 'Nizamuddin', distance: '2.5 km' },
  { name: 'Kailash Colony', distance: '2 km' },
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

const whyLajpatNagar = [
  'Prime South Delhi location with excellent infrastructure',
  'Dual metro connectivity - Pink & Violet lines',
  'Famous central market for books and study materials',
  'Multiple libraries and study spaces nearby',
  'Safe and well-connected neighborhood',
  'Affordable food and hostel options available',
]

export default function NEETCoachingLajpatNagar() {
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
                <span className="text-sm font-medium">South Delhi&apos;s Preferred Location</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Best NEET Coaching in Lajpat Nagar
              </h1>

              <p className="text-xl text-teal-100 max-w-3xl mx-auto mb-8">
                Join South Delhi&apos;s premier NEET Biology coaching. AIIMS faculty, proven
                results, and the perfect location with excellent metro connectivity.
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

        {/* Why Lajpat Nagar Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Study in Lajpat Nagar?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A perfect blend of accessibility, resources, and academic environment
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
                    <ShoppingBag className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">South Delhi&apos;s Study Hub</h3>
                </div>
                <ul className="space-y-3">
                  {whyLajpatNagar.map((reason, index) => (
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
                  <h3 className="text-xl font-bold text-gray-900">Excellent Metro Access</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      P
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Lajpat Nagar Metro</p>
                      <p className="text-sm text-gray-500">Pink Line - 3 min walk</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      V
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Moolchand Metro</p>
                      <p className="text-sm text-gray-500">Violet Line - 8 min walk</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      V
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Jangpura Metro</p>
                      <p className="text-sm text-gray-500">Violet Line - 12 min walk</p>
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
                Why Choose Cerebrum in Lajpat Nagar?
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
              <p className="text-gray-600 max-w-2xl mx-auto">
                We serve NEET aspirants from all areas around Lajpat Nagar
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
                  <p className="text-sm text-teal-600">{area.distance}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
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
                &quot;Coming from Defence Colony, Lajpat Nagar was the perfect location for my NEET
                preparation. The metro connectivity made commuting easy, and Cerebrum&apos;s focused
                Biology coaching helped me score 650+ in NEET. The teachers genuinely care about
                each student.&quot;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-bold">RS</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Riya Sharma</p>
                  <p className="text-sm text-gray-500">
                    NEET 2024 - 655/720 | Lady Hardinge Medical College
                  </p>
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
              <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey in Lajpat Nagar</h2>
              <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
                Join South Delhi&apos;s most trusted NEET coaching. Book your FREE demo class today!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
                >
                  Book FREE Demo Class
                </Link>
                <a
                  href="https://wa.me/918826444334?text=Hi!%20I%20am%20interested%20in%20NEET%20coaching%20in%20Lajpat%20Nagar"
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
