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
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const hyderabadLocalities = [
  {
    name: 'Madhapur',
    slug: 'madhapur',
    students: '290+',
    highlight: 'IT Hub & Financial District',
    priority: 'high',
  },
  {
    name: 'Gachibowli',
    slug: 'gachibowli',
    students: '275+',
    highlight: 'Tech Corridor & DLF',
    priority: 'high',
  },
  {
    name: 'HITEC City',
    slug: 'hitec-city',
    students: '260+',
    highlight: 'Corporate Hub',
    priority: 'high',
  },
  {
    name: 'Jubilee Hills',
    slug: 'jubilee-hills',
    students: '240+',
    highlight: 'Premium Residential',
    priority: 'high',
  },
  {
    name: 'Banjara Hills',
    slug: 'banjara-hills',
    students: '235+',
    highlight: 'Upscale Locality',
    priority: 'high',
  },
  {
    name: 'Kukatpally',
    slug: 'kukatpally',
    students: '220+',
    highlight: 'Metro Connected Hub',
    priority: 'high',
  },
  {
    name: 'Secunderabad',
    slug: 'secunderabad',
    students: '210+',
    highlight: 'Twin City Central',
    priority: 'high',
  },
  {
    name: 'Ameerpet',
    slug: 'ameerpet',
    students: '195+',
    highlight: 'Education Hub',
    priority: 'high',
  },
  {
    name: 'LB Nagar',
    slug: 'lb-nagar',
    students: '180+',
    highlight: 'South Hyderabad Hub',
    priority: 'medium',
  },
  {
    name: 'Dilsukhnagar',
    slug: 'dilsukhnagar',
    students: '165+',
    highlight: 'Commercial Center',
    priority: 'medium',
  },
  {
    name: 'Begumpet',
    slug: 'begumpet',
    students: '155+',
    highlight: 'Airport Area',
    priority: 'medium',
  },
  {
    name: 'Uppal',
    slug: 'uppal',
    students: '145+',
    highlight: 'Eastern Corridor',
    priority: 'medium',
  },
  {
    name: 'Miyapur',
    slug: 'miyapur',
    students: '135+',
    highlight: 'Metro Terminal',
    priority: 'medium',
  },
  {
    name: 'Kompally',
    slug: 'kompally',
    students: '125+',
    highlight: 'Emerging Residential',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Real-time teaching with instant doubt resolution - skip Hyderabad traffic completely',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Exclusive Hyderabad batches with personal attention for every student',
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
    description: 'Morning, afternoon, and evening batches to fit Hyderabad schedules',
  },
  {
    icon: Shield,
    title: 'No Commute Stress',
    description: 'Save 2+ hours daily on Hyderabad traffic - study from your home',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '360', icon: Star },
  { label: 'Hyderabad Students', value: '2,400+', icon: Users },
  { label: 'Areas Covered', value: '14+', icon: MapPin },
]

const faqs = [
  {
    question: 'Why choose online coaching over traveling across Hyderabad for NEET preparation?',
    answer:
      'Hyderabad students typically spend 2-3 hours daily navigating ORR, IT corridor traffic, or waiting for metro connections for coaching. Our online live classes deliver quality teaching from AIIMS trained faculties directly to your home. Save time, avoid traffic congestion, and focus 100% on NEET preparation. Our 98% success rate proves online is as effective as offline.',
  },
  {
    question: 'Which areas in Hyderabad do you serve?',
    answer:
      'We serve all major Hyderabad localities including Madhapur, Gachibowli, HITEC City, Jubilee Hills, Banjara Hills, Kukatpally, Secunderabad, Ameerpet, LB Nagar, Dilsukhnagar, Begumpet, Uppal, Miyapur, Kompally, and all surrounding areas. Students from any Hyderabad pincode can join our online live classes.',
  },
  {
    question: 'What is the fee for NEET coaching in Hyderabad?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 48,000 per year - significantly lower than premium Hyderabad coaching centers that charge Rs 1.5-2 lakhs. Plus you save on travel costs. We offer EMI options and merit scholarships.',
  },
  {
    question: 'How do live classes work for Hyderabad students?',
    answer:
      'We conduct live interactive classes via Zoom/Google Meet. Ask questions in real-time, participate in discussions, and interact with teachers just like a physical classroom. All classes are recorded for revision. Dedicated Hyderabad batches ensure peer interaction with local students.',
  },
  {
    question: 'Is online coaching effective for competitive exams like NEET?',
    answer:
      'Yes! Our 98% success rate and 500+ medical college selections prove that online coaching is highly effective. Hyderabad students particularly benefit as they save commute time for self-study. Our interactive live classes, doubt sessions, and AI-powered practice tests ensure comprehensive preparation.',
  },
  {
    question: 'Do you understand Telangana Intermediate board patterns?',
    answer:
      'Absolutely! We have specialized understanding of the Telangana State Board of Intermediate Education syllabus and examination patterns. Our faculty is trained to help students balance both board exams and NEET preparation effectively, ensuring success in both.',
  },
]

const premiumSchools = [
  'Chirec International',
  'Oakridge International',
  'NASR School',
  'DPS Hyderabad',
  'Silver Oaks International',
  'Meridian School',
  'Glendale Academy',
  'The Hyderabad Public School',
  'Gitanjali Devashray',
  'Jubilee Hills Public School',
]

const whyHyderabad = [
  {
    icon: Building,
    title: 'Quality Without IT Corridor Traffic',
    description:
      'From Gachibowli to Secunderabad, get premium coaching without spending hours on ORR or Outer Ring Road traffic jams.',
  },
  {
    icon: Train,
    title: 'Metro-Proof Learning',
    description:
      'Whether metro is crowded or delayed, attend classes from home. No dependency on metro schedules or last-mile connectivity.',
  },
  {
    icon: GraduationCap,
    title: 'Telangana Board Understanding',
    description:
      'We understand Telangana Intermediate board patterns, Hyderabad school schedules, and local academic challenges. Personalized support for Hyderabad students.',
  },
]

export default function NeetCoachingHyderabadPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_hyderabad', {
        event_category: 'conversion',
        event_label: 'neet_coaching_hyderabad_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-red-700 text-white py-20 overflow-hidden">
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
              Serving All Hyderabad Localities
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Hyderabad</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Madhapur | Gachibowli | HITEC City | Jubilee Hills | Banjara Hills | Kukatpally
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Skip the IT corridor traffic and metro rush. Get AIIMS trained faculties, 98% success
              rate, and live interactive classes - all from your Hyderabad home. Join 2,400+
              Hyderabad students already preparing with us.
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
                  className="border-white text-white hover:bg-white hover:text-orange-700"
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

      {/* Hyderabad Localities Section */}
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
              NEET Coaching Across All Hyderabad Localities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Gachibowli to Secunderabad, Madhapur to Uppal - we serve students from every
              corner of Hyderabad and Cyberabad. Click on your locality for location-specific
              information.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {hyderabadLocalities.map((locality, index) => (
              <motion.div
                key={locality.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={`/locations/hyderabad/${locality.slug}`}>
                  <div
                    className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                      locality.priority === 'high' ? 'ring-2 ring-orange-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                      <MapPin className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {locality.students}
                    </div>
                    <div className="text-sm text-gray-500">{locality.highlight}</div>
                    {locality.priority === 'high' && (
                      <div className="mt-2 inline-flex items-center text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 mr-1" />
                        High Demand Area
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hyderabad Students Choose Us */}
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
              Why Hyderabad Students Choose Online NEET Coaching
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop the daily IT corridor traffic struggle. Premium education delivered to your
              doorstep.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyHyderabad.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 border border-orange-100"
              >
                <item.icon className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Hyderabad Schools Trust Us
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
              Why Choose Cerebrum for NEET Coaching in Hyderabad?
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
                <feature.icon className="w-12 h-12 text-orange-600 mb-4" />
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
              Frequently Asked Questions - NEET Coaching Hyderabad
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
                  <MessageCircle className="w-6 h-6 mr-3 text-orange-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from Hyderabad Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS trained faculties, 2,400+ Hyderabad students. No IT corridor
              traffic required!
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
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All Hyderabad Areas</span>
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
                <span>No Commute Needed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
