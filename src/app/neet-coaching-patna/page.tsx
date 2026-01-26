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
  Heart,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import { CitySchema } from '@/components/seo/CitySchema'

const patnaLocalities = [
  {
    name: 'Boring Road',
    slug: 'boring-road',
    students: '380+',
    highlight: 'Premium Coaching Hub',
    priority: 'high',
  },
  {
    name: 'Kankarbagh',
    slug: 'kankarbagh',
    students: '320+',
    highlight: 'Residential Hub',
    priority: 'high',
  },
  {
    name: 'Patliputra Colony',
    slug: 'patliputra-colony',
    students: '280+',
    highlight: 'Elite Residential',
    priority: 'high',
  },
  {
    name: 'Rajendra Nagar',
    slug: 'rajendra-nagar',
    students: '250+',
    highlight: 'Central Patna',
    priority: 'high',
  },
  {
    name: 'Bailey Road',
    slug: 'bailey-road',
    students: '290+',
    highlight: 'Educational Zone',
    priority: 'high',
  },
  {
    name: 'Kidwaipuri',
    slug: 'kidwaipuri',
    students: '200+',
    highlight: 'Growing Area',
    priority: 'medium',
  },
  {
    name: 'Anisabad',
    slug: 'anisabad',
    students: '180+',
    highlight: 'Traditional Hub',
    priority: 'medium',
  },
  {
    name: 'Danapur',
    slug: 'danapur',
    students: '220+',
    highlight: 'Cantonment Area',
    priority: 'medium',
  },
  {
    name: 'Phulwari Sharif',
    slug: 'phulwari-sharif',
    students: '160+',
    highlight: 'South Patna',
    priority: 'medium',
  },
  {
    name: 'Digha',
    slug: 'digha',
    students: '170+',
    highlight: 'Developing Zone',
    priority: 'medium',
  },
  {
    name: 'Saguna More',
    slug: 'saguna-more',
    students: '190+',
    highlight: 'Junction Area',
    priority: 'medium',
  },
  {
    name: 'Ashiana Nagar',
    slug: 'ashiana-nagar',
    students: '210+',
    highlight: 'Modern Township',
    priority: 'high',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Real-time teaching with instant doubt resolution - world-class coaching from your home',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Exclusive Bihar batches with personal attention for every aspirant',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculties',
    description: 'Expert doctors and teachers trained at premier medical institutions',
  },
  {
    icon: BookOpen,
    title: 'Affordable Excellence',
    description: 'Premium coaching at fraction of Kota prices - perfect for Bihar students',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches to fit your schedule',
  },
  {
    icon: Shield,
    title: 'Stay Home, Study Smart',
    description: 'No need to migrate to Kota - get top coaching from Patna itself',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score 2024', value: '352', icon: Star },
  { label: 'Bihar Students', value: '3,000+', icon: Users },
  { label: 'Areas Covered', value: '12+', icon: MapPin },
]

const faqs = [
  {
    question: 'Why should Bihar students choose online coaching over migrating to Kota?',
    answer:
      "Every year, thousands of Bihar students migrate to Kota spending Rs 3-5 lakhs annually on coaching + hostel + food. Our online coaching delivers same quality teaching at Rs 24,000-48,000 per year. Stay with family, save money, and get personalized attention that Kota's crowded classrooms cannot provide. Our 94.2% success rate proves online is equally effective.",
  },
  {
    question: 'Which areas in Patna do you serve?',
    answer:
      'We serve all major Patna localities including Boring Road, Kankarbagh, Patliputra Colony, Rajendra Nagar, Bailey Road, Kidwaipuri, Anisabad, Danapur, Phulwari Sharif, Digha, Saguna More, Ashiana Nagar, and all surrounding areas. Students from any Patna or Bihar district can join our online live classes.',
  },
  {
    question: 'What is the fee for NEET coaching in Patna?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 48,000 per year - a fraction of what students spend migrating to Kota. We offer EMI options and merit scholarships specifically for Bihar students.',
  },
  {
    question: 'How do live classes work for Patna students?',
    answer:
      'We conduct live interactive classes via Zoom/Google Meet. Ask questions in real-time, participate in discussions, and interact with teachers just like a physical classroom. All classes are recorded for revision. Dedicated Bihar batches ensure peer interaction with local students.',
  },
  {
    question: 'Do you understand Bihar board patterns?',
    answer:
      'Yes! We have specialized batches for Bihar board (BSEB) students. Our faculty understands the Bihar intermediate syllabus, exam patterns, and how to balance board exams with NEET preparation. Many of our Patna students have scored 85%+ in boards while also cracking NEET.',
  },
  {
    question: 'What about Bihar state quota for medical colleges?',
    answer:
      'Bihar has excellent state quota medical colleges like PMCH (Patna Medical College), IGIMS, ANMMC. With 85% state quota, Bihar students have great opportunities. Our coaching helps you maximize your score for better state quota seats.',
  },
]

const premiumSchools = [
  'DPS Patna',
  "St. Michael's High School",
  'Notre Dame Academy',
  'Don Bosco Academy',
  'Kendriya Vidyalaya',
  'DAV Public School',
  "St. Karen's Secondary School",
  'Loyola High School',
  'Mount Carmel High School',
  'Gyan Niketan',
]

const whyPatna = [
  {
    icon: Building,
    title: 'No Kota Migration Needed',
    description:
      'Get Kota-quality coaching from Patna. Save Rs 2-3 lakhs annually on hostel, food, and travel costs.',
  },
  {
    icon: TrendingUp,
    title: 'Bihar Pride Rising',
    description:
      'Bihar students are cracking NEET at record numbers. Be part of the rising success story.',
  },
  {
    icon: GraduationCap,
    title: 'Bihar Board Expert',
    description:
      'We understand BSEB patterns, Patna school schedules, and local challenges. Personalized support for Bihar students.',
  },
]

const medicalColleges = [
  'PMCH (Patna Medical College)',
  'IGIMS Patna',
  'ANMMC Gaya',
  'DMCH Darbhanga',
  'SKMCH Muzaffarpur',
  'JLNMC Bhagalpur',
]

export default function NeetCoachingPatnaPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_patna', {
        event_category: 'conversion',
        event_label: 'neet_coaching_patna_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Patna"
        citySlug="patna"
        state="Bihar"
        localities={patnaLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="3000"
        coordinates={{ lat: '25.5941', lng: '85.1376' }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-900 via-amber-700 to-amber-800 text-white py-20 overflow-hidden">
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
              Make Bihar Proud | No Kota Migration Needed
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Patna</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Boring Road | Kankarbagh | Patliputra | Rajendra Nagar | Bailey Road
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Why migrate to Kota? Get AIIMS trained faculties, 94.2% success rate, and live
              interactive classes - all from Patna. Join 3,000+ Bihar students achieving NEET
              success from home.
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
                  className="border-white text-white hover:bg-white hover:text-amber-900"
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

      {/* Why Stay in Patna Section */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Stay in Patna, Crack NEET - Save Rs 2-3 Lakhs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every year Bihar students spend lakhs migrating to Kota. Here&apos;s why that&apos;s
              not needed anymore.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-red-600 mb-6">❌ Kota Migration Cost</h3>
                <ul className="space-y-4">
                  <li className="flex items-start justify-between">
                    <span>Coaching Fee (Annual)</span>
                    <span className="font-bold">Rs 1,50,000+</span>
                  </li>
                  <li className="flex items-start justify-between">
                    <span>Hostel/PG (Annual)</span>
                    <span className="font-bold">Rs 1,20,000+</span>
                  </li>
                  <li className="flex items-start justify-between">
                    <span>Food (Annual)</span>
                    <span className="font-bold">Rs 60,000+</span>
                  </li>
                  <li className="flex items-start justify-between">
                    <span>Travel (Annual)</span>
                    <span className="font-bold">Rs 20,000+</span>
                  </li>
                  <li className="flex items-start justify-between border-t pt-4 text-xl">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-red-600">Rs 3,50,000+</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-green-600 mb-6">✓ Cerebrum from Patna</h3>
                <ul className="space-y-4">
                  <li className="flex items-start justify-between">
                    <span>Complete Biology Course</span>
                    <span className="font-bold">Rs 24,000-48,000</span>
                  </li>
                  <li className="flex items-start justify-between">
                    <span>Stay with Family</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </li>
                  <li className="flex items-start justify-between">
                    <span>Home Food</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </li>
                  <li className="flex items-start justify-between">
                    <span>No Travel</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </li>
                  <li className="flex items-start justify-between border-t pt-4 text-xl">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-green-600">Rs 24,000-48,000</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Patna Localities Section */}
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
              NEET Coaching Across All Patna Localities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Boring Road to Danapur, Kankarbagh to Ashiana - we serve students from every
              corner of Patna and Bihar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {patnaLocalities.map((locality, index) => (
              <motion.div
                key={locality.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                    locality.priority === 'high' ? 'ring-2 ring-amber-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                    <MapPin className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="text-2xl font-bold text-amber-600 mb-1">{locality.students}</div>
                  <div className="text-sm text-gray-500">{locality.highlight}</div>
                  {locality.priority === 'high' && (
                    <div className="mt-2 inline-flex items-center text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
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

      {/* Bihar Medical Colleges */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Into Top Bihar Medical Colleges
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bihar has 85% state quota seats. Our coaching is designed to help you secure seats in
              Bihar&apos;s prestigious medical colleges.
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
                  <Heart className="w-5 h-5 text-amber-600 mr-2" />
                  <span className="font-semibold text-gray-900">{college}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Patna Students Choose Us */}
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
              Why Patna Students Choose Online NEET Coaching
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyPatna.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-amber-50 rounded-xl p-8 border border-amber-100"
              >
                <item.icon className="w-12 h-12 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Patna Schools Trust Us
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
              Why Choose Cerebrum for NEET Coaching in Patna?
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
                <feature.icon className="w-12 h-12 text-amber-600 mb-4" />
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
              Frequently Asked Questions - NEET Coaching Patna
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
                  <MessageCircle className="w-6 h-6 mr-3 text-amber-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Cities Section */}
      <RelatedCityLinks currentCity="patna" variant="default" />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 via-amber-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Make Bihar Proud - Crack NEET from Patna
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              94.2% success rate, AIIMS trained faculties, 3,000+ Bihar students. No Kota migration
              needed!
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
                  className="border-white text-white hover:bg-white hover:text-amber-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All Patna Areas</span>
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
                <span>Bihar Specialist</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
