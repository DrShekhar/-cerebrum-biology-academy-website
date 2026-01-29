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
  Building2,
  GraduationCap,
  Calculator,
  FileText,
  MessageCircle,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

export const metadata = {
  title: 'NEET Coaching Vikas Puri | Biology Classes West Delhi | Cerebrum Academy',
  description:
    'Best NEET coaching in Vikas Puri, West Delhi. Expert AIIMS faculty, small batches, proven results. Serving all 9 blocks, KG apartments & DDA flats. 15-20 min from Rohini via metro.',
  keywords:
    'NEET coaching vikas puri, biology tuition vikas puri delhi, NEET classes vikas puri, medical coaching west delhi, biology coaching vikas puri, NEET preparation vikas puri',
  openGraph: {
    title: 'NEET Coaching Vikas Puri | Biology Classes West Delhi | Cerebrum Academy',
    description:
      'Best NEET coaching in Vikas Puri. AIIMS faculty, small batches, 98% success rate. Free demo class available.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-vikas-puri',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy - Vikas Puri',
  description:
    'Best NEET coaching in Vikas Puri, West Delhi. Expert AIIMS faculty, proven results. Serving all 9 blocks, 3 sub-blocks, KG apartments and DDA flats.',
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-vikas-puri',
  telephone: '+91-8826444334',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Vikas Puri',
    addressLocality: 'West Delhi',
    addressRegion: 'Delhi',
    postalCode: '110018',
    addressCountry: 'IN',
  },
  areaServed: [
    'Vikas Puri',
    'Janakpuri',
    'Uttam Nagar',
    'Tilak Nagar',
    'Subhash Nagar',
    'Hari Nagar',
    'Tagore Garden',
    'Rajouri Garden',
  ],
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why choose NEET coaching in Vikas Puri?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vikas Puri is a well-established residential colony in West Delhi with 9 main blocks and 3 sub-blocks. It offers affordable accommodation, good connectivity via Vikas Puri metro station, and a peaceful study environment away from commercial hustle.',
      },
    },
    {
      '@type': 'Question',
      name: 'How far is Cerebrum Academy from Vikas Puri?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our Rohini center is just 15-20 minutes from Vikas Puri via Delhi Metro. Take the Blue Line from Vikas Puri metro station, change at Rajiv Chowk, and reach Rohini. Many students from Vikas Puri study with us.',
      },
    },
    {
      '@type': 'Question',
      name: 'What areas in Vikas Puri do you serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We have students from all 9 blocks of Vikas Puri (A to J blocks), 3 sub-blocks, KG apartments, DDA flats, and nearby areas including Janakpuri, Uttam Nagar, and Tilak Nagar.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the fee structure for NEET coaching for Vikas Puri students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum offers NEET Biology coaching from Rs 15,000/month. We have flexible EMI options and scholarship programs for meritorious students from Vikas Puri and surrounding areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide study material for NEET preparation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we provide comprehensive NEET Biology study material, including topic-wise notes, previous year questions, mock tests, and free access to NEET preparation tools like rank predictor and college finder.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the batch timings available for Vikas Puri students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer Morning (7 AM - 10 AM), Afternoon (12 PM - 3 PM), and Evening (5 PM - 8 PM) batches. Weekend batches are also available for students attending school on weekdays. Choose timing that suits your metro commute.',
      },
    },
  ],
}

const speakableStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'NEET Coaching Vikas Puri | Cerebrum Biology Academy',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['.speakable-intro', '.speakable-cta'],
  },
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-vikas-puri',
}

const nearbyAreas = [
  { name: 'Block A-D Vikas Puri', distance: 'All blocks' },
  { name: 'Block E-J Vikas Puri', distance: 'All blocks' },
  { name: 'KG Apartments', distance: '2 km' },
  { name: 'DDA Flats Vikas Puri', distance: '1 km' },
  { name: 'Janakpuri', distance: '3 km' },
  { name: 'Uttam Nagar', distance: '2 km' },
  { name: 'Tilak Nagar', distance: '4 km' },
  { name: 'Subhash Nagar', distance: '3 km' },
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

const whyVikasPuri = [
  '9 main blocks (A to J) with peaceful residential environment',
  '3 sub-blocks with affordable housing options',
  'KG apartments and DDA flats for student accommodation',
  'Vikas Puri metro station on Blue Line',
  'Just 15-20 min from our Rohini center via metro',
  'Budget-friendly PG and rental options',
]

const freeTools = [
  {
    icon: Calculator,
    title: 'NEET Rank Predictor',
    description: 'Estimate your NEET rank based on expected score',
    link: '/neet-rank-predictor',
  },
  {
    icon: FileText,
    title: 'College Predictor',
    description: 'Find colleges matching your NEET score',
    link: '/neet-college-predictor',
  },
  {
    icon: BookOpen,
    title: 'Free Study Material',
    description: 'Download chapter-wise Biology notes',
    link: '/resources',
  },
]

export default function NEETCoachingVikasPuri() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableStructuredData) }}
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
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Serving All 9 Blocks of Vikas Puri</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Best NEET Coaching for Vikas Puri Students
              </h1>

              <p className="speakable-intro text-xl text-green-100 max-w-3xl mx-auto mb-8">
                Join West Delhi&apos;s most trusted NEET Biology coaching. AIIMS faculty, small
                batches, and proven results. Just 15-20 minutes from Vikas Puri via metro.
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
                      source: 'neet-coaching-vikas-puri',
                      message:
                        'Hi! I am from Vikas Puri and interested in NEET coaching. Please share details.',
                      campaign: 'vikas-puri-landing',
                    })
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-500 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us Now
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Distance from Rohini */}
        <section className="py-8 px-4 bg-green-600 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
              <div className="flex items-center gap-3">
                <Train className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">15-20 Minutes</p>
                  <p className="text-green-100">From Vikas Puri to Rohini Center via Metro</p>
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-green-400" />
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">Blue Line Metro</p>
                  <p className="text-green-100">Direct connectivity from Vikas Puri Station</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Vikas Puri Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                NEET Coaching for Vikas Puri Residents
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Serving students from all 9 blocks, 3 sub-blocks, KG apartments & DDA flats
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
                    <Building2 className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">About Vikas Puri</h3>
                </div>
                <ul className="space-y-3">
                  {whyVikasPuri.map((reason, index) => (
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
                  <h3 className="text-xl font-bold text-gray-900">How to Reach Us</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-medium text-gray-900 mb-2">From Vikas Puri Metro Station:</p>
                    <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
                      <li>Board Blue Line towards Dwarka</li>
                      <li>Change at Rajiv Chowk (Yellow Line)</li>
                      <li>Take Yellow Line towards Samaypur Badli</li>
                      <li>Exit at Rohini Sector 18-19</li>
                    </ol>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Clock className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Total Travel Time</p>
                      <p className="text-sm text-gray-600">15-20 minutes via metro</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-gray-900">Vikas Puri Metro Station</p>
                      <p className="text-sm text-gray-600">Blue Line - Near Block C</p>
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
                Why Vikas Puri Students Choose Cerebrum
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

        {/* Free NEET Tools */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Free NEET Preparation Tools</h2>
              <p className="text-gray-600">
                Use our free tools to plan your NEET journey effectively
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {freeTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={tool.link}
                    className="block bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <tool.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.title}</h3>
                    <p className="text-gray-600 text-sm">{tool.description}</p>
                    <span className="inline-block mt-4 text-green-600 font-medium text-sm">
                      Try Free →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Students from All Vikas Puri Areas
              </h2>
              <p className="text-gray-600">We serve students from every corner of Vikas Puri</p>
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
        <section className="py-16 px-4">
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
                &quot;I live in Block E, Vikas Puri and was worried about the commute. But the metro
                journey to Rohini is just 20 minutes. Cerebrum&apos;s focused Biology coaching
                helped me score 640 in NEET. The small batch size meant I could ask doubts
                freely.&quot;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">RS</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Rahul Sharma</p>
                  <p className="text-sm text-gray-500">
                    NEET 2024 - 640/720 | From Vikas Puri Block E
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">Common questions from Vikas Puri students</p>
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
              <h2 className="text-3xl font-bold mb-4">
                Start Your NEET Journey from Vikas Puri Today
              </h2>
              <p className="speakable-cta text-green-100 mb-8">
                Join hundreds of Vikas Puri students who chose Cerebrum. Book your FREE demo class
                and experience the difference!
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
                      source: 'neet-coaching-vikas-puri-cta',
                      message:
                        'Hi! I am from Vikas Puri and want to join NEET coaching. Please share batch timings and fees.',
                      campaign: 'vikas-puri-landing',
                    })
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-400 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp: Get Instant Info
                </button>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-green-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Mon-Sat: 8AM-8PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <a href="tel:+918826444334" className="hover:text-white">
                    8826-444-334
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Train className="w-5 h-5" />
                  <span>15-20 min from Vikas Puri Metro</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
