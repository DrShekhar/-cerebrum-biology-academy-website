'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  Shield,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Building,
  Train,
  Heart,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import { CitySchema } from '@/components/seo/CitySchema'

const kolkataLocalities = [
  {
    name: 'Salt Lake',
    slug: 'salt-lake',
    students: '380+',
    highlight: 'Tech Hub & Sector V',
    priority: 'high',
  },
  {
    name: 'Park Street',
    slug: 'park-street',
    students: '320+',
    highlight: 'Central Kolkata',
    priority: 'high',
  },
  {
    name: 'New Town',
    slug: 'new-town',
    students: '290+',
    highlight: 'Modern Township',
    priority: 'high',
  },
  {
    name: 'Howrah',
    slug: 'howrah',
    students: '350+',
    highlight: 'West Bengal Gateway',
    priority: 'high',
  },
  {
    name: 'Ballygunge',
    slug: 'ballygunge',
    students: '260+',
    highlight: 'South Kolkata Elite',
    priority: 'high',
  },
  {
    name: 'Jadavpur',
    slug: 'jadavpur',
    students: '280+',
    highlight: 'University Area',
    priority: 'high',
  },
  {
    name: 'Behala',
    slug: 'behala',
    students: '240+',
    highlight: 'South Suburban',
    priority: 'high',
  },
  {
    name: 'Dum Dum',
    slug: 'dum-dum',
    students: '220+',
    highlight: 'North Kolkata',
    priority: 'medium',
  },
  {
    name: 'Barasat',
    slug: 'barasat',
    students: '200+',
    highlight: 'North 24 Parganas',
    priority: 'medium',
  },
  {
    name: 'Barrackpore',
    slug: 'barrackpore',
    students: '180+',
    highlight: 'Cantonment Area',
    priority: 'medium',
  },
  {
    name: 'Rajarhat',
    slug: 'rajarhat',
    students: '250+',
    highlight: 'Action Area',
    priority: 'high',
  },
  {
    name: 'Gariahat',
    slug: 'gariahat',
    students: '210+',
    highlight: 'Traditional Hub',
    priority: 'medium',
  },
  {
    name: 'Lake Town',
    slug: 'lake-town',
    students: '190+',
    highlight: 'Residential Area',
    priority: 'medium',
  },
  {
    name: 'Tollygunge',
    slug: 'tollygunge',
    students: '230+',
    highlight: 'South Metro',
    priority: 'medium',
  },
  {
    name: 'Alipore',
    slug: 'alipore',
    students: '170+',
    highlight: 'Elite Residential',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Real-time teaching with instant doubt resolution - skip Kolkata traffic completely',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Exclusive Kolkata batches with personal attention for every student',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculties',
    description: 'Expert doctors and teachers trained at premier medical institutions',
  },
  {
    icon: BookOpen,
    title: 'Complete Study Material',
    description: 'NCERT-based notes, previous year questions, mock tests included',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches to fit Kolkata schedules',
  },
  {
    icon: Shield,
    title: 'No Commute Stress',
    description: 'Save hours on Kolkata traffic - study from your home in any locality',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '360', icon: Star },
  { label: 'Bengal Students', value: '4,000+', icon: Users },
  { label: 'Areas Covered', value: '15+', icon: MapPin },
]

const faqs = [
  {
    question: 'Why choose online coaching for NEET preparation in Kolkata?',
    answer:
      'Kolkata students typically spend 2-3 hours daily commuting to coaching centers in Park Street or Salt Lake. Our online live classes deliver quality teaching from AIIMS trained faculties directly to your home. Save time, avoid traffic jams, and focus 100% on NEET preparation. Our 98% success rate proves online is as effective as offline.',
  },
  {
    question: 'Which areas in Kolkata do you serve?',
    answer:
      'We serve all major Kolkata localities including Salt Lake, Park Street, New Town, Howrah, Ballygunge, Jadavpur, Behala, Dum Dum, Barasat, Barrackpore, Rajarhat, Gariahat, Lake Town, Tollygunge, Alipore, and all surrounding areas. Students from any Kolkata pincode can join our online live classes.',
  },
  {
    question: 'What is the fee for NEET coaching in Kolkata?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 48,000 per year - significantly lower than premium Kolkata coaching centers that charge Rs 1-1.5 lakhs. Plus you save on travel costs and time. We offer EMI options and merit scholarships.',
  },
  {
    question: 'How do live classes work for Kolkata students?',
    answer:
      'We conduct live interactive classes via Zoom/Google Meet. Ask questions in real-time, participate in discussions, and interact with teachers just like a physical classroom. All classes are recorded for revision. Dedicated West Bengal batches ensure peer interaction with local students.',
  },
  {
    question: 'Do you understand West Bengal board patterns?',
    answer:
      'Yes! We have specialized batches for West Bengal board students. Our faculty understands the WBCHSE syllabus, exam patterns, and how to balance board exams with NEET preparation. Many of our Kolkata students have scored 90%+ in boards while also cracking NEET.',
  },
  {
    question: 'What about the state quota for West Bengal medical colleges?',
    answer:
      'We understand West Bengal has excellent state quota medical colleges like Medical College Kolkata, NRS Medical College, RG Kar Medical College. Our coaching is designed to help students excel in both state quota and all-India quota counseling rounds.',
  },
]

const premiumSchools = [
  'South Point School',
  'La Martiniere',
  "St. Xavier's Collegiate",
  'DPS Ruby Park',
  'Heritage School',
  'Calcutta Boys School',
  'Lakshmipat Singhania Academy',
  'Modern High School',
  'Mahadevi Birla World Academy',
  'Delhi Public School Newtown',
]

const whyKolkata = [
  {
    icon: Building,
    title: 'Quality Without Traffic',
    description:
      'From Howrah Bridge to Salt Lake, get premium coaching without spending hours in Kolkata traffic or crowded buses.',
  },
  {
    icon: Train,
    title: 'Metro-Proof Learning',
    description:
      'Kolkata metro crowds and delays affect commute but not your studies. Attend classes from home regardless of conditions.',
  },
  {
    icon: GraduationCap,
    title: 'West Bengal Board Expert',
    description:
      'We understand WBCHSE patterns, Kolkata school schedules, and local academic challenges. Personalized support for Bengal students.',
  },
]

const medicalColleges = [
  'Medical College Kolkata',
  'NRS Medical College',
  'RG Kar Medical College',
  'Calcutta National Medical College',
  'SSKM Hospital',
  'Burdwan Medical College',
]

export default function NeetCoachingKolkataPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_kolkata', {
        event_category: 'conversion',
        event_label: 'neet_coaching_kolkata_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Kolkata"
        citySlug="kolkata"
        state="West Bengal"
        localities={kolkataLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="4000"
        coordinates={{ lat: '22.5726', lng: '88.3639' }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-700 to-purple-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              Serving All Kolkata & West Bengal
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Kolkata</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Salt Lake | Park Street | New Town | Howrah | Jadavpur | Ballygunge
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Skip Kolkata traffic. Get AIIMS trained faculties, 98% success rate, and live
              interactive classes - all from your home. Join 4,000+ West Bengal students already
              preparing with us.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Course Details
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Kolkata Localities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              NEET Coaching Across All Kolkata Localities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Howrah to New Town, Alipore to Barasat - we serve students from every corner of
              Kolkata and West Bengal.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {kolkataLocalities.map((locality, index) => (
              <motion.div
                key={locality.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                    locality.priority === 'high' ? 'ring-2 ring-purple-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">{locality.students}</div>
                  <div className="text-sm text-gray-500">{locality.highlight}</div>
                  {locality.priority === 'high' && (
                    <div className="mt-2 inline-flex items-center text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 mr-1" />
                      High Demand
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* West Bengal Medical Colleges */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Into Top West Bengal Medical Colleges
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our coaching is designed to help you crack state quota counseling and secure seats in
              Bengal&apos;s prestigious medical colleges.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {medicalColleges.map((college, index) => (
              <motion.div
                key={college}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white px-6 py-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center">
                  <Heart className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-semibold text-gray-900">{college}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Kolkata Students Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Kolkata Students Choose Online NEET Coaching
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop the daily traffic struggle. Premium education delivered to your doorstep.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyKolkata.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-purple-50 rounded-xl p-8 border border-purple-100"
              >
                <item.icon className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Kolkata Schools Trust Us
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {premiumSchools.map((school, index) => (
                <motion.span
                  key={school}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm"
                >
                  {school}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Cerebrum for NEET Coaching in Kolkata?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions - NEET Coaching Kolkata
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-purple-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Cities Section */}
      <RelatedCityLinks currentCity="kolkata" variant="default" />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from Kolkata Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS trained faculties, 4,000+ West Bengal students. No traffic
              commute required!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All Kolkata Areas</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Live Classes</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>No Commute</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
