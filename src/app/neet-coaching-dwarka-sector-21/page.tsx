'use client'

import Link from 'next/link'
import {
  Phone,
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
  Plane,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy - NEET Coaching Dwarka Sector 21',
  description:
    'Best NEET biology coaching for Dwarka Sector 21 students near IGI Airport. Expert AIIMS Trained faculty, 98% success rate. Online + Offline classes. 35 min from Rohini center via Blue Line Metro.',
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-dwarka-sector-21',
  telephone: '+91-8826444334',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Rohini',
    addressRegion: 'Delhi',
    postalCode: '110085',
    addressCountry: 'IN',
  },
  areaServed: [
    'Dwarka Sector 21',
    'Dwarka Sector 22',
    'Dwarka Sector 23',
    'Dwarka Sector 19',
    'IGI Airport Area',
    'Palam',
  ],
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which is the best NEET coaching for Dwarka Sector 21 students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum Biology Academy offers specialized NEET biology coaching for Dwarka Sector 21 students with 98% success rate. Our Rohini DC Chauk center is accessible via Blue Line Metro from Dwarka Sector 21 station in about 35 minutes. Online classes are very popular due to the distance.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do Dwarka Sector 21 students reach Cerebrum Biology Academy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Students from Dwarka Sector 21 (near IGI Airport) can take Blue Line Metro to Rajiv Chowk, then Yellow Line to Rohini West. Total journey is about 35 minutes. Many Sector 21 students prefer our comprehensive online classes for convenience.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is online NEET coaching recommended for Dwarka Sector 21 students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Online classes are highly recommended for Dwarka Sector 21 students due to the 35-minute metro journey. Our online program includes live interactive classes, recorded lectures, daily doubt sessions, weekly tests, and complete study material.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the fee for NEET coaching for Dwarka Sector 21 students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our comprehensive NEET biology course fee is Rs 75,000/year for Class 12 students. We offer EMI options and scholarships up to 50% for deserving students. Online and offline fees are the same. Contact us at 88264-44334.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there any students from Dwarka Sector 21 area at Cerebrum?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We have many students from Dwarka Sector 21, Sector 22, Sector 23, and areas near IGI Airport. Most prefer our hybrid mode - online classes during weekdays and occasional weekend visits to Rohini center.',
      },
    },
  ],
}

const nearbyAreas = [
  { name: 'Dwarka Sector 22', distance: '5 min', link: '/neet-coaching-dwarka-sector-22' },
  { name: 'Dwarka Sector 23', distance: '8 min', link: '/neet-coaching-dwarka' },
  { name: 'Dwarka Sector 19', distance: '10 min', link: '/neet-coaching-dwarka' },
  { name: 'IGI Airport Area', distance: '5 min', link: '/neet-coaching-dwarka' },
  { name: 'Palam', distance: '15 min', link: '/neet-coaching-dwarka' },
]

const testimonials = [
  {
    name: 'Sneha Gupta',
    location: 'Dwarka Sector 21',
    school: 'Ryan International, Dwarka',
    score: '645/720',
    college: 'LHMC Delhi',
    mode: 'Online',
    quote: 'Living near the airport, traveling was difficult. Online classes were a blessing! The live sessions with Dr. Shekhar Sir are so interactive. Improved from 490 to 645 - all through online coaching!',
  },
  {
    name: 'Aditya Kumar',
    location: 'Dwarka Sector 21',
    school: 'DPS Dwarka',
    score: '662/720',
    college: 'MAMC Delhi',
    mode: 'Hybrid',
    quote: 'I chose hybrid mode - online on weekdays and visited Rohini once a month. The metro journey gave me time to revise. The personal mentoring made all the difference. Got MAMC Delhi!',
  },
]

const handleWhatsAppClick = (location: string) => {
  trackAndOpenWhatsApp({
    source: `neet-coaching-dwarka-sector-21-${location.toLowerCase().replace(/\s+/g, '-')}`,
    message: `Hi, I'm from ${location} and interested in NEET Biology coaching. Please share details about online and offline options.`,
    campaign: 'dwarka-sector-21',
  })
}

export default function NEETCoachingDwarkaSector21Page() {
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
        <section className="relative py-20 bg-gradient-to-br from-teal-900 via-blue-900 to-indigo-800 text-white overflow-hidden">
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
            <div
              className="text-center max-w-4xl mx-auto animate-fadeInUp"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
                <Plane className="w-5 h-5" />
                <span className="font-medium">NEET Coaching for Dwarka Sector 21 (Near IGI Airport)</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Best NEET Coaching in Dwarka Sector 21 - Biology Classes
              </h1>

              <p className="text-xl text-teal-100 mb-4 max-w-3xl mx-auto">
                Join Cerebrum Biology Academy for expert NEET biology coaching. Dwarka Sector 21 students
                can attend via <strong>Online Classes</strong> (recommended) or visit Rohini center (35 min via Metro).
              </p>

              <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
                <Monitor className="w-5 h-5 mr-2 text-green-300" />
                <span className="text-green-200 font-medium">Online Classes Recommended - Save 70 min daily!</span>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => handleWhatsAppClick('Dwarka Sector 21')}
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
            </div>
          </div>
        </section>

        {/* Distance from Rohini Info */}
        <section className="py-8 bg-teal-50 border-b border-teal-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-center">
              <div className="flex items-center gap-2">
                <Train className="w-6 h-6 text-teal-600" />
                <span className="text-gray-700"><strong>35 min</strong> from Rohini Center via Metro</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-green-600" />
                <span className="text-gray-700"><strong>Online Classes</strong> - Most Popular for Sector 21</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700">Near <strong>IGI Airport</strong> T3</span>
              </div>
            </div>
          </div>
        </section>

        {/* Metro Route */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div
                className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 border border-teal-100 animate-fadeInUp"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Train className="w-8 h-8 text-teal-600" />
                  Metro Route from Dwarka Sector 21
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                      <div>
                        <p className="font-semibold text-gray-900">Dwarka Sector 21 Metro</p>
                        <p className="text-sm text-gray-600">Near IGI Airport T3</p>
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
                        <span>Total Time: ~35 minutes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Metro Fare: Rs 40-50</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Direct Blue Line + Yellow Line</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="font-medium">Online Classes save 70 min daily!</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Free NEET Tools */}
        <section className="py-12 bg-gradient-to-br from-indigo-50 to-white">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-8 animate-fadeInUp"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Free NEET Tools for Dwarka Sector 21 Students
              </h2>
              <p className="text-gray-600">Boost your NEET preparation with these free tools</p>
            </div>

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
            <div
              className="text-center mb-12 animate-fadeInUp"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Success Stories from Dwarka Sector 21
              </h2>
              <p className="text-gray-600">Real results from students near IGI Airport area</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-fadeInUp"
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
                      testimonial.mode === 'Online'
                        ? 'bg-blue-100 text-blue-700'
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
                    <p className="text-teal-600 text-xs">{testimonial.location} | {testimonial.college}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-12 animate-fadeInUp"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Also Serving Nearby Areas
              </h2>
            </div>

            <div className="grid md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {nearbyAreas.map((area, index) => (
                <div
                  key={area.name}
                 className="animate-fadeInUp">
                  <Link
                    href={area.link}
                    className="block bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg hover:border-teal-200 transition-all text-center"
                  >
                    <Building2 className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-800 text-sm">{area.name}</h3>
                    <p className="text-teal-600 text-xs">{area.distance}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div
              className="text-center mb-12 animate-fadeInUp"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                FAQs - NEET Coaching Dwarka Sector 21
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqStructuredData.mainEntity.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md border border-gray-100 p-6 animate-fadeInUp"
                >
                  <h3 className="font-bold text-gray-800 mb-3 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    {faq.name}
                  </h3>
                  <p className="text-gray-600 ml-8">{faq.acceptedAnswer.text}</p>
                </div>
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
                { icon: Users, label: '98% Success', sublabel: 'Rate', color: 'text-green-600' },
                { icon: Star, label: '4.9 Rating', sublabel: '847+ Reviews', color: 'text-yellow-600' },
                { icon: GraduationCap, label: 'AIIMS Faculty', sublabel: 'Expert Teachers', color: 'text-purple-600' },
              ].map((badge, index) => (
                <div
                  key={badge.label}
                  className="text-center animate-fadeInUp"
                >
                  <badge.icon className={`w-8 h-8 mx-auto mb-2 ${badge.color}`} />
                  <div className="font-bold text-gray-900 text-sm">{badge.label}</div>
                  <div className="text-xs text-gray-600">{badge.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-teal-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <div
             className="animate-fadeInUp">
              <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey from Dwarka Sector 21!</h2>
              <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
                Join successful NEET aspirants from the IGI Airport area. Book your free demo class today - Online classes recommended!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => handleWhatsAppClick('Dwarka Sector 21')}
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
            </div>
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
                { name: 'Dwarka Sector 12', link: '/neet-coaching-dwarka-sector-12' },
                { name: 'Dwarka Sector 22', link: '/neet-coaching-dwarka-sector-22' },
                { name: 'Janakpuri', link: '/neet-coaching-janakpuri' },
                { name: 'Palam', link: '/neet-coaching-dwarka' },
              ].map((area) => (
                <Link
                  key={area.name}
                  href={area.link}
                  className="bg-gray-100 hover:bg-teal-100 text-gray-700 hover:text-teal-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
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
