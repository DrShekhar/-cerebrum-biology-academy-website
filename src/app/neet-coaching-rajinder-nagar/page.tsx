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
  name: 'Cerebrum Biology Academy - Rajinder Nagar',
  description:
    "Best NEET coaching in Rajinder Nagar (Old Rajendra Nagar), Central Delhi. Expert AIIMS faculty in India's famous coaching destination.",
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-rajinder-nagar',
  telephone: '+91-8826444334',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Old Rajinder Nagar',
    addressLocality: 'Central Delhi',
    addressRegion: 'Delhi',
    postalCode: '110060',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '28.6400',
    longitude: '77.1800',
  },
  areaServed: [
    'Old Rajinder Nagar',
    'Karol Bagh',
    'Patel Nagar',
    'Rajendra Place',
    'Shankar Road',
    'Kirti Nagar',
    'Moti Nagar',
  ],
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Rajinder Nagar good for NEET preparation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes! Old Rajinder Nagar is India's most famous coaching hub with world-class infrastructure. While primarily known for UPSC, it offers excellent facilities for NEET aspirants too.",
      },
    },
    {
      '@type': 'Question',
      name: 'What makes Cerebrum different in Rajinder Nagar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum is one of the few institutes in Rajinder Nagar that focuses exclusively on NEET Biology. With AIIMS faculty and small batches of 10-12 students, we offer personalized attention.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to reach Rajinder Nagar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rajinder Nagar is excellently connected via Rajendra Place Metro (Blue Line) and Karol Bagh Metro (Blue + Red Lines). Multiple bus routes also serve the area.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the fee structure for NEET Biology coaching in Rajinder Nagar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum offers flexible fee structures starting from ₹15,000 per month for comprehensive NEET Biology coaching. We also offer installment options and merit-based scholarships for deserving students.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are hostel facilities available near Rajinder Nagar coaching center?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Rajinder Nagar has hundreds of hostels and PG accommodations specifically for coaching students. Rent ranges from ₹8,000-15,000/month for shared rooms, with options for boys and girls separately.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the batch timings at Cerebrum Rajinder Nagar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer flexible batch timings: Morning batch (8 AM - 11 AM), Afternoon batch (2 PM - 5 PM), and Evening batch (6 PM - 9 PM). Weekend batches are also available for students attending school on weekdays.',
      },
    },
  ],
}

const nearbyAreas = [
  { name: 'Karol Bagh', distance: '1 km' },
  { name: 'Patel Nagar', distance: '1 km' },
  { name: 'Rajendra Place', distance: '0.5 km' },
  { name: 'Shankar Road', distance: '1 km' },
  { name: 'Kirti Nagar', distance: '2 km' },
  { name: 'Moti Nagar', distance: '2.5 km' },
  { name: 'Shadipur', distance: '1.5 km' },
  { name: 'Naraina', distance: '3 km' },
]

const features = [
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description: 'Learn from doctors who cleared AIIMS',
  },
  { icon: Users, title: 'Small Batches', description: '10-12 students for personal attention' },
  { icon: Award, title: '98% Success', description: 'Proven track record in NEET' },
  {
    icon: BookOpen,
    title: 'Complete Material',
    description: 'Comprehensive NEET Biology material',
  },
]

const whyRajinderNagar = [
  "India's most famous coaching destination",
  'World-class study infrastructure',
  'Hundreds of libraries and study rooms',
  'Best hostel facilities in Delhi',
  'Competitive academic environment',
  'Excellent metro connectivity (Blue Line)',
]

export default function NEETCoachingRajinderNagar() {
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
                <span className="text-sm font-medium">India&apos;s Premier Coaching Hub</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Best NEET Coaching in Rajinder Nagar
              </h1>

              <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
                Study in India&apos;s most iconic coaching destination. AIIMS faculty, proven
                results, and world-class infrastructure in Old Rajendra Nagar.
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

        {/* Why Rajinder Nagar Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Study in Old Rajinder Nagar?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The legendary coaching destination that has produced lakhs of successful candidates
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
                  <h3 className="text-xl font-bold text-gray-900">The Coaching Capital</h3>
                </div>
                <ul className="space-y-3">
                  {whyRajinderNagar.map((reason, index) => (
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
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      B
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Rajendra Place Metro</p>
                      <p className="text-sm text-gray-500">Blue Line - 5 min walk</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      B
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Karol Bagh Metro</p>
                      <p className="text-sm text-gray-500">Blue Line - 8 min walk</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      B
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Patel Nagar Metro</p>
                      <p className="text-sm text-gray-500">Blue Line - 10 min walk</p>
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
                Why Choose Cerebrum in Rajinder Nagar?
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
                &quot;Old Rajinder Nagar has the best study environment in India. Cerebrum&apos;s
                Biology coaching in this location was perfect - focused teaching, great
                infrastructure, and surrounded by motivated students. I scored 685 in NEET!&quot;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">PS</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Priyanka Singh</p>
                  <p className="text-sm text-gray-500">NEET 2024 - 685/720 | AIIMS Delhi</p>
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
        <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey in Rajinder Nagar</h2>
              <p className="text-green-100 mb-8">
                Study in India&apos;s coaching capital. Book your FREE demo today!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  Book FREE Demo Class
                </Link>
                <a
                  href="https://wa.me/918826444334?text=Hi!%20I%20am%20interested%20in%20NEET%20coaching%20in%20Rajinder%20Nagar"
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
