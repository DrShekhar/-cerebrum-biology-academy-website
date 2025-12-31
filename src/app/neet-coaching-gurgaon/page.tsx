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
  name: 'Cerebrum Biology Academy - NEET Coaching Gurgaon',
  description:
    'Top NEET biology coaching for Gurgaon students. Expert faculty, proven results, and comprehensive study material for NEET UG preparation.',
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon',
  telephone: '+91-8826444334',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gurgaon',
    addressRegion: 'Haryana',
    postalCode: '122001',
    addressCountry: 'IN',
  },
  areaServed: [
    'Sector 14 Gurgaon',
    'DLF Phase 1',
    'DLF Phase 2',
    'DLF Phase 3',
    'DLF Phase 4',
    'DLF Phase 5',
    'Sohna Road',
    'MG Road',
    'Golf Course Road',
    'Cyber City',
    'Sector 29',
    'Sector 56',
    'Sector 57',
    'Palam Vihar',
    'South City',
    'Nirvana Country',
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
      name: 'Which is the best NEET coaching in Gurgaon?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum Biology Academy offers specialized NEET biology coaching for Gurgaon students. Our expert faculty and personalized approach have helped many Gurgaon students score 650+ in NEET.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can Gurgaon students reach Cerebrum Biology Academy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Students from Gurgaon can take the Yellow Line Metro from HUDA City Centre to Hauz Khas, then change to Magenta Line or take a short auto ride to our Panchsheel Enclave center. Total journey is approximately 50-60 minutes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer weekend batches for Gurgaon students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we offer special weekend batches designed for Gurgaon and NCR students. Classes are held on Saturdays and Sundays with intensive sessions and doubt clearing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the fee structure for NEET coaching?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our fees range from ₹45,000 (Pursuit) to ₹1,56,000 (Pinnacle) depending on course and tier. Class 9-10: ₹45,000-₹90,000, Class 11: ₹48,000-₹98,000, Class 12: ₹70,000-₹1,56,000. We offer scholarships up to 50% for deserving students.',
      },
    },
  ],
}

const gurgaonAreas = [
  { name: 'DLF Phase 1-5', distance: '50 min via Metro', description: 'Premium residential areas' },
  { name: 'Sector 14', distance: '55 min via Metro', description: 'Near HUDA City Centre' },
  { name: 'MG Road', distance: '50 min via Metro', description: 'Commercial hub' },
  { name: 'Sohna Road', distance: '55 min', description: 'Growing residential corridor' },
  { name: 'Golf Course Road', distance: '55 min', description: 'Premium locality' },
  { name: 'Cyber City', distance: '50 min via Metro', description: 'IT hub area' },
  { name: 'Palam Vihar', distance: '45 min', description: 'Near Dwarka Expressway' },
  { name: 'South City', distance: '50 min', description: 'Near Sohna Road' },
]

const features = [
  {
    icon: Award,
    title: 'Expert Faculty',
    description: 'Learn from experienced NEET biology experts with 10+ years experience',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: 'Limited batch size of 15-20 students for personalized attention',
  },
  {
    icon: BookOpen,
    title: 'Complete Material',
    description: 'Comprehensive study material with NCERT focus',
  },
  {
    icon: Clock,
    title: 'Weekend Batches',
    description: 'Special weekend batches for Gurgaon students',
  },
]

export default function NEETCoachingGurgaonPage() {
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
        <section className="relative py-20 bg-[#4a5d4a] text-white overflow-hidden">
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
                <span className="font-medium">NEET Coaching for Gurgaon Students</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Best NEET Coaching in Gurgaon - Expert Biology Classes
              </h1>

              <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
                Join Cerebrum Biology Academy for specialized NEET biology coaching. Easy access
                from all Gurgaon sectors via Rapid Metro and Yellow Line. Weekend batches available
                for working professionals&apos; children.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call: 8826444334
                </Link>
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors border border-white/30"
                >
                  Book Free Demo Class
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Gurgaon Students Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Why Gurgaon Students Choose Cerebrum Biology Academy
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Convenient metro connectivity and weekend batches make it easy for Gurgaon students
                to access quality NEET coaching.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Connectivity from Gurgaon Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Easy Access from All Gurgaon Areas
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Well-connected via Rapid Metro and Yellow Line. Special weekend batches for Gurgaon
                students.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {gurgaonAreas.map((area, index) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-lg p-4 shadow-md border border-gray-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Train className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{area.name}</h3>
                      <p className="text-green-600 text-sm font-medium">{area.distance}</p>
                      <p className="text-gray-500 text-xs mt-1">{area.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Train className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Metro Route from Gurgaon</h3>
                  <p className="text-gray-600">
                    <strong>Yellow Line:</strong> HUDA City Centre → Hauz Khas (Direct)
                    <br />
                    <strong>Then:</strong> Short auto/cab to Panchsheel Enclave (5 min)
                    <br />
                    <span className="text-green-600 font-medium">
                      Total journey: 50-60 minutes from most Gurgaon areas
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gurgaon Schools We Serve */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Students from Top Gurgaon Schools
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We proudly serve students from leading schools across Gurgaon
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                'DPS Gurgaon',
                'The Shri Ram School',
                'Pathways World School',
                'GD Goenka World School',
                'Suncity School',
                'Heritage School',
                'Blue Bells School',
                'Amity International',
                'Scottish High',
                'Shikshantar School',
                'DAV Public School',
                'Ryan International',
              ].map((school, index) => (
                <motion.div
                  key={school}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-lg p-4 shadow-md border border-gray-100 flex items-center gap-3"
                >
                  <GraduationCap className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{school}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Success Stories from Gurgaon
                </h2>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 mb-6 italic">
                  &quot;Coming from DLF Phase 3, I was initially worried about the commute. But the
                  weekend batches perfectly fit my schedule. The quality of teaching at Cerebrum is
                  unmatched. I scored 692 in NEET 2024 and secured admission to Lady Hardinge
                  Medical College!&quot;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">AS</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Aanya Sharma</p>
                    <p className="text-gray-600 text-sm">
                      NEET 2024 - 692/720 | The Shri Ram School, Gurgaon
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Frequently Asked Questions - NEET Coaching Gurgaon
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

        {/* CTA Section */}
        <section className="py-16 bg-[#4a5d4a] text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey from Gurgaon</h2>
              <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                Join the growing community of successful NEET aspirants from Gurgaon. Book your free
                demo class today and experience the Cerebrum difference.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  Book Free Demo Class
                </Link>
                <Link
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-500 transition-colors border border-white/30"
                >
                  <Phone className="w-5 h-5" />
                  Call: 8826444334
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
