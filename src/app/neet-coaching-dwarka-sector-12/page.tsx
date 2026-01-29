'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Phone,
  MapPin,
  Award,
  Users,
  CheckCircle,
  Star,
  Train,
  GraduationCap,
  Play,
  MessageCircle,
  Building2,
  Globe,
  Monitor,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy - NEET Coaching Dwarka Sector 12',
  description:
    'Best NEET biology coaching for Dwarka Sector 12 students. Expert AIIMS Trained faculty, 94% success rate. Online + Offline classes. 30 min from Rohini center via Blue Line Metro.',
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-dwarka-sector-12',
  telephone: '+91-8826444334',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Rohini',
    addressRegion: 'Delhi',
    postalCode: '110085',
    addressCountry: 'IN',
  },
  areaServed: [
    'Dwarka Sector 12',
    'Dwarka Sector 11',
    'Dwarka Sector 13',
    'Dwarka Sector 14',
    'Dwarka Sector 10',
  ],
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which is the best NEET coaching for Dwarka Sector 12 students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum Biology Academy offers specialized NEET biology coaching for Dwarka Sector 12 students with 94% success rate. Our Rohini DC Chauk center is accessible via Blue Line Metro from Dwarka Sector 14 station in about 30 minutes. We also offer popular online classes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do Dwarka Sector 12 students reach Cerebrum Biology Academy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Students from Dwarka Sector 12 can walk to Dwarka Sector 14 Metro (8-10 min), take Blue Line to Rajiv Chowk, then Yellow Line to Rohini West. Total journey is about 30 minutes. Many students prefer our online classes for convenience.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is online NEET coaching available for Dwarka Sector 12 students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We offer comprehensive online NEET coaching with live interactive classes, recorded lectures for revision, daily doubt sessions, weekly tests, and complete study material - all accessible from home. Very popular with Sector 12 students.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the fee for NEET coaching for Dwarka Sector 12 students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our comprehensive NEET biology course fee is Rs 75,000/year for Class 12 students. We offer EMI options and scholarships up to 50% for deserving students. Online and offline fees are the same. Contact us at 88264-44334.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which schools in Dwarka Sector 12 area do students come from?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We have students from Venkateshwar International School, St. Gregorios School, DAV Public School, and other top schools near Dwarka Sector 12. Our flexible modes suit all students.',
      },
    },
  ],
}

const nearbyAreas = [
  { name: 'Dwarka Sector 11', distance: '5 min', link: '/neet-coaching-dwarka' },
  { name: 'Dwarka Sector 13', distance: '5 min', link: '/neet-coaching-dwarka' },
  { name: 'Dwarka Sector 14', distance: '8 min to Metro', link: '/neet-coaching-dwarka' },
  { name: 'Dwarka Sector 10', distance: '10 min', link: '/neet-coaching-dwarka-sector-10' },
  { name: 'Dwarka Sector 21', distance: '15 min', link: '/neet-coaching-dwarka-sector-21' },
]

const testimonials = [
  {
    name: 'Rohit Verma',
    location: 'Dwarka Sector 12',
    school: 'Venkateshwar International',
    score: '658/720',
    college: 'UCMS Delhi',
    mode: 'Offline',
    quote: 'The metro journey from Dwarka Sector 14 to Rohini was worth every minute. Blue Line to Rajiv Chowk, then Yellow Line to Rohini West. I used travel time to revise notes. From 480 to 658!',
  },
  {
    name: 'Priyanka Jain',
    location: 'Dwarka Sector 12',
    school: 'St. Gregorios School',
    score: '642/720',
    college: 'LHMC Delhi',
    mode: 'Hybrid',
    quote: 'Hybrid mode was perfect - online classes during weekdays and offline on weekends. The small batches gave me personal attention. Best coaching for biology!',
  },
]

const handleWhatsAppClick = (location: string) => {
  trackAndOpenWhatsApp({
    source: `neet-coaching-dwarka-sector-12-${location.toLowerCase().replace(/\s+/g, '-')}`,
    message: `Hi, I'm from ${location} and interested in NEET Biology coaching. Please share details about online and offline options.`,
    campaign: 'dwarka-sector-12',
  })
}

export default function NEETCoachingDwarkaSector12Page() {
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

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">NEET Coaching for Dwarka Sector 12 Students</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Best NEET Coaching in Dwarka Sector 12 - Biology Classes
              </h1>

              <p className="text-xl text-purple-100 mb-4 max-w-3xl mx-auto">
                Join Cerebrum Biology Academy for expert NEET biology coaching. Dwarka Sector 12 students
                can attend via <strong>Online Classes</strong> or visit Rohini center (30 min via Dwarka Sector 14 Metro).
              </p>

              <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
                <Monitor className="w-5 h-5 mr-2 text-green-300" />
                <span className="text-green-200 font-medium">Online Classes Available - Study from Home!</span>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => handleWhatsAppClick('Dwarka Sector 12')}
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp: 88264-44334
                </button>
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                >
                  <Play className="w-5 h-5" />
                  Book Free Demo Class
                </Link>
                <Link
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/30"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Distance from Rohini Info */}
        <section className="py-8 bg-purple-50 border-b border-purple-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-center">
              <div className="flex items-center gap-2">
                <Train className="w-6 h-6 text-purple-600" />
                <span className="text-gray-700"><strong>30 min</strong> from Rohini Center via Metro</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-green-600" />
                <span className="text-gray-700"><strong>Online Classes</strong> - Study from Home</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-red-600" />
                <span className="text-gray-700"><strong>8-10 min walk</strong> to Dwarka Sector 14 Metro</span>
              </div>
            </div>
          </div>
        </section>

        {/* Metro Route */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Train className="w-8 h-8 text-purple-600" />
                  Metro Route from Dwarka Sector 12
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                      <div>
                        <p className="font-semibold text-gray-900">Dwarka Sector 14 Metro</p>
                        <p className="text-sm text-gray-600">8-10 min walk from Sector 12</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                      <div>
                        <p className="font-semibold text-gray-900">Rajiv Chowk (Interchange)</p>
                        <p className="text-sm text-gray-600">Change to Yellow Line</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                      <div>
                        <p className="font-semibold text-gray-900">Rohini West Metro</p>
                        <p className="text-sm text-gray-600">2-min walk to Cerebrum Academy</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4">Journey Summary</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Total Time: ~30 minutes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Metro Fare: Rs 30-40</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Direct Blue Line + Yellow Line</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Use travel time for revision!</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Free NEET Tools */}
        <section className="py-12 bg-gradient-to-br from-indigo-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Free NEET Tools for Dwarka Sector 12 Students
              </h2>
              <p className="text-gray-600">Boost your NEET preparation with these free tools</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <Link href="/neet-rank-predictor" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-bold text-gray-900 mb-2">NEET Rank Predictor</h3>
                <p className="text-sm text-gray-600">Predict your All India Rank based on expected score</p>
              </Link>
              <Link href="/neet-college-predictor" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="text-3xl mb-3">🏥</div>
                <h3 className="font-bold text-gray-900 mb-2">NEET College Predictor</h3>
                <p className="text-sm text-gray-600">Find medical colleges based on your NEET rank</p>
              </Link>
              <Link href="/neet-biology-mcq" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="text-3xl mb-3">📝</div>
                <h3 className="font-bold text-gray-900 mb-2">NEET Biology MCQs</h3>
                <p className="text-sm text-gray-600">Practice chapter-wise MCQs with solutions</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Success Stories from Dwarka Sector 12
              </h2>
              <p className="text-gray-600">Real results from students in your area</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                      {testimonial.score}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      testimonial.mode === 'Offline'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {testimonial.mode}
                    </span>
                  </div>
                  <blockquote className="text-gray-700 text-sm mb-4 italic">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.school}</p>
                    <p className="text-purple-600 text-xs">{testimonial.location} | {testimonial.college}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Also Serving Nearby Areas
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {nearbyAreas.map((area, index) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={area.link}
                    className="block bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg hover:border-purple-200 transition-all text-center"
                  >
                    <Building2 className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-800 text-sm">{area.name}</h3>
                    <p className="text-purple-600 text-xs">{area.distance}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                FAQs - NEET Coaching Dwarka Sector 12
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqStructuredData.mainEntity.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md border border-gray-100 p-6"
                >
                  <h3 className="font-bold text-gray-800 mb-3 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    {faq.name}
                  </h3>
                  <p className="text-gray-600 ml-8">{faq.acceptedAnswer.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-12 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Award, label: '15+ Years', sublabel: 'Experience', color: 'text-blue-600' },
                { icon: Users, label: '94% Success', sublabel: 'Rate', color: 'text-green-600' },
                { icon: Star, label: '4.9 Rating', sublabel: '847+ Reviews', color: 'text-yellow-600' },
                { icon: GraduationCap, label: 'AIIMS Faculty', sublabel: 'Expert Teachers', color: 'text-purple-600' },
              ].map((badge, index) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <badge.icon className={`w-8 h-8 mx-auto mb-2 ${badge.color}`} />
                  <div className="font-bold text-gray-900 text-sm">{badge.label}</div>
                  <div className="text-xs text-gray-600">{badge.sublabel}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey from Dwarka Sector 12!</h2>
              <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
                Join successful NEET aspirants from Dwarka Sector 12. Book your free demo class today!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => handleWhatsAppClick('Dwarka Sector 12')}
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp: 88264-44334
                </button>
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center gap-2 bg-yellow-500 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                >
                  Book Free Demo Class
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              NEET Coaching in Nearby Dwarka Sectors
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {[
                { name: 'Dwarka (Main)', link: '/neet-coaching-dwarka' },
                { name: 'Dwarka Sector 4', link: '/neet-coaching-dwarka-sector-4' },
                { name: 'Dwarka Sector 6', link: '/neet-coaching-dwarka-sector-6' },
                { name: 'Dwarka Sector 10', link: '/neet-coaching-dwarka-sector-10' },
                { name: 'Dwarka Sector 21', link: '/neet-coaching-dwarka-sector-21' },
                { name: 'Dwarka Sector 22', link: '/neet-coaching-dwarka-sector-22' },
                { name: 'Janakpuri', link: '/neet-coaching-janakpuri' },
                { name: 'Uttam Nagar', link: '/neet-coaching-uttam-nagar' },
              ].map((area) => (
                <Link
                  key={area.name}
                  href={area.link}
                  className="bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
