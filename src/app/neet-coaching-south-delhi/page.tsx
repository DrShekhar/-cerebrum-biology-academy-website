'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin,
  GraduationCap,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  Award,
  Play,
  Target,
  Microscope,
  Building2,
  School,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const southDelhiAreas = [
  {
    name: 'Hauz Khas',
    slug: 'hauz-khas',
    description: 'Premier coaching hub near IIT Delhi',
    highlights: ['Near IIT Delhi', 'Metro Connected', 'Coaching Hub'],
    type: 'coaching-hub',
  },
  {
    name: 'Kalu Sarai',
    slug: 'kalu-sarai',
    description: 'Famous coaching destination near IIT',
    highlights: ['Coaching Capital', 'Near IIT Gate', 'Competitive Environment'],
    type: 'coaching-hub',
  },
  {
    name: 'Greater Kailash',
    slug: 'greater-kailash',
    description: 'Premium locality with top DPS students',
    highlights: ['GK-I & GK-II', 'DPS Students', 'Affluent Area'],
    type: 'posh',
  },
  {
    name: 'Defence Colony',
    slug: 'defence-colony',
    description: 'Prestigious colony with defence families',
    highlights: ['Educated Families', 'Metro Access', 'Premium Location'],
    type: 'posh',
  },
  {
    name: 'Vasant Vihar',
    slug: 'vasant-vihar',
    description: 'Ultra-premium with embassies and top schools',
    highlights: ['Embassy Area', 'Top Schools', 'Ultra Premium'],
    type: 'posh',
  },
  {
    name: 'Saket',
    slug: 'saket',
    description: 'Modern area with Select City Walk',
    highlights: ['Metro Hub', 'Shopping District', 'Growing Demand'],
    type: 'residential',
  },
  {
    name: 'Malviya Nagar',
    slug: 'malviya-nagar',
    description: 'Affordable coaching destination',
    highlights: ['Budget Friendly', 'Student Area', 'Good Connectivity'],
    type: 'coaching-hub',
  },
  {
    name: 'Green Park',
    slug: 'green-park',
    description: 'Central location with easy access',
    highlights: ['Central Location', 'Metro Access', 'Residential Mix'],
    type: 'residential',
  },
  {
    name: 'Panchsheel Park',
    slug: 'panchsheel-park',
    description: 'Upscale residential area',
    highlights: ['Upscale Living', 'Near GK', 'Premium Students'],
    type: 'posh',
  },
  {
    name: 'New Friends Colony',
    slug: 'new-friends-colony',
    description: 'Established colony with educated families',
    highlights: ['NFC Market', 'Family Area', 'Good Schools'],
    type: 'residential',
  },
  {
    name: 'CR Park',
    slug: 'cr-park',
    description: 'Bengali community with academic focus',
    highlights: ['Academic Culture', 'Community Focus', 'Near Kalkaji'],
    type: 'residential',
  },
  {
    name: 'Vasant Kunj',
    slug: 'vasant-kunj',
    description: 'Large residential complex near airport',
    highlights: ['DDA Housing', 'Near Airport', 'Growing Area'],
    type: 'gated',
  },
]

const nearbySchools = [
  { name: 'DPS RK Puram', location: 'RK Puram', students: '3000+' },
  { name: 'DPS Vasant Vihar', location: 'Vasant Vihar', students: '2500+' },
  { name: 'Vasant Valley School', location: 'Vasant Kunj', students: '1800+' },
  { name: 'Modern School', location: 'Vasant Vihar', students: '2000+' },
  { name: 'Sanskriti School', location: 'Chanakyapuri', students: '1500+' },
  { name: 'The Shri Ram School', location: 'Vasant Vihar', students: '1200+' },
]

const stats = [
  { label: 'Students from South Delhi', value: '2,500+' },
  { label: 'Success Rate', value: '94%' },
  { label: 'Areas Covered', value: '15+' },
  { label: 'Top 1000 Rankers', value: '180+' },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in South Delhi?',
    answer:
      'Cerebrum Biology Academy is rated among the top NEET coaching institutes in South Delhi with 94% success rate. We have expert AIIMS faculty, comprehensive study material, and proven track record with students from GK, Defence Colony, Vasant Vihar, and Hauz Khas.',
  },
  {
    question: 'Is there NEET coaching near Hauz Khas Metro?',
    answer:
      'Yes! Our South Delhi center is easily accessible from Hauz Khas Metro. We provide online classes for students across South Delhi including Kalu Sarai, Green Park, and Malviya Nagar areas.',
  },
  {
    question: 'What is the fee for NEET coaching in South Delhi?',
    answer:
      'Our comprehensive NEET biology course fee is ₹75,000/year for Class 11-12. We offer EMI options and scholarship up to 50% for deserving students. Contact us for detailed fee structure.',
  },
  {
    question: 'Do you provide coaching for students from DPS RK Puram?',
    answer:
      'Absolutely! We have many students from DPS RK Puram, DPS Vasant Vihar, Modern School, and Vasant Valley. Our timings are designed to complement school schedules.',
  },
  {
    question: 'Is online NEET coaching available for South Delhi students?',
    answer:
      'Yes! We offer both online and hybrid modes for South Delhi students. Live interactive classes, recorded lectures, and personal mentoring - all accessible from home.',
  },
]

export default function NEETCoachingSouthDelhiPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_south_delhi', {
        event_category: 'conversion',
        event_label: 'neet_coaching_south_delhi',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2 text-yellow-300" />
              South Delhi's Premium NEET Institute
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">NEET Coaching in South Delhi</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Hauz Khas • Greater Kailash • Defence Colony • Vasant Vihar • Saket
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-4xl mx-auto">
              Join South Delhi's most trusted NEET Biology coaching. Expert AIIMS faculty, 94%
              success rate, students from top schools like DPS, Modern, and Vasant Valley. Online &
              offline batches available.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                >
                  <div className="text-xl md:text-2xl font-bold text-yellow-300">{stat.value}</div>
                  <div className="text-xs md:text-sm opacity-80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching Across South Delhi
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Serving students from posh localities, coaching hubs, and residential areas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {southDelhiAreas.map((area, index) => (
              <motion.div
                key={area.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={`/neet-coaching-south-delhi/${area.slug}`}>
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 h-full group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        {area.type === 'posh' && (
                          <Building2 className="w-6 h-6 text-purple-600 mr-2" />
                        )}
                        {area.type === 'coaching-hub' && (
                          <School className="w-6 h-6 text-blue-600 mr-2" />
                        )}
                        {area.type === 'residential' && (
                          <MapPin className="w-6 h-6 text-green-600 mr-2" />
                        )}
                        {area.type === 'gated' && (
                          <Building2 className="w-6 h-6 text-orange-600 mr-2" />
                        )}
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-purple-600 transition-colors">
                          {area.name}
                        </h3>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{area.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {area.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Students from Top South Delhi Schools
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We coach students from the most prestigious schools in South Delhi
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbySchools.map((school, index) => (
              <motion.div
                key={school.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100"
              >
                <div className="flex items-center mb-3">
                  <GraduationCap className="w-8 h-8 text-purple-600 mr-3" />
                  <div>
                    <h3 className="font-bold text-gray-900">{school.name}</h3>
                    <p className="text-sm text-gray-500">{school.location}</p>
                  </div>
                </div>
                <div className="text-sm text-purple-600 font-medium">
                  {school.students} students enrolled
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why South Delhi */}
      <section className="py-16 md:py-20 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us for South Delhi?</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Expert AIIMS/JIPMER faculty',
              'Students from DPS, Modern School',
              'Flexible timings for school students',
              'Online + Offline hybrid mode',
              'Small batch size (15-20 students)',
              'Personalized attention & mentoring',
              'Regular parent-teacher meetings',
              'Scholarship for deserving students',
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <CheckCircle className="w-6 h-6 text-yellow-300 mr-3 flex-shrink-0" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching South Delhi - FAQs
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join South Delhi's Top NEET Coaching
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Students from GK, Defence Colony, Vasant Vihar trust us. Book your free demo today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-700"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  View All Courses
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy - South Delhi',
            description:
              'Best NEET coaching in South Delhi. Expert AIIMS faculty, 94% success rate.',
            url: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi',
            areaServed: [
              'Hauz Khas',
              'Greater Kailash',
              'Defence Colony',
              'Vasant Vihar',
              'Saket',
              'Malviya Nagar',
              'Green Park',
              'Kalu Sarai',
            ],
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'South Delhi',
              addressRegion: 'Delhi',
              addressCountry: 'IN',
            },
          }),
        }}
      />
    </div>
  )
}
