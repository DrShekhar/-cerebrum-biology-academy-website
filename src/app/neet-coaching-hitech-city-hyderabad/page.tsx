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
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { CitySchema } from '@/components/seo/CitySchema'

const hitechCityLocalities = [
  {
    name: 'Hitech City Main',
    slug: 'hitech-city-main',
    students: '180+',
    highlight: 'IT Corridor Core',
    priority: 'high',
  },
  {
    name: 'Madhapur',
    slug: 'madhapur',
    students: '200+',
    highlight: 'Tech Hub Heart',
    priority: 'high',
  },
  {
    name: 'Cyber Towers Area',
    slug: 'cyber-towers',
    students: '120+',
    highlight: 'Premium IT Zone',
    priority: 'high',
  },
  {
    name: 'Raheja Mindspace',
    slug: 'raheja-mindspace',
    students: '110+',
    highlight: 'IT Park Adjacent',
    priority: 'high',
  },
  {
    name: 'Kukatpally',
    slug: 'kukatpally',
    students: '150+',
    highlight: 'KPHB Colony',
    priority: 'high',
  },
  {
    name: 'Miyapur',
    slug: 'miyapur',
    students: '95+',
    highlight: 'Metro Connected',
    priority: 'medium',
  },
  {
    name: 'Hafeezpet',
    slug: 'hafeezpet',
    students: '85+',
    highlight: 'Growing Hub',
    priority: 'medium',
  },
  {
    name: 'Raidurgam',
    slug: 'raidurgam',
    students: '90+',
    highlight: 'Biodiversity Park Area',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Premium online coaching - no need to navigate ORR traffic. World-class teaching from your IT Park apartment.',
  },
  {
    icon: Users,
    title: 'Tech-Savvy Batches (10-15)',
    description: 'Exclusive batches for IT families with personalized attention and digital-first approach.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Expert doctors and teachers from premier medical institutions. Quality IT professionals expect.',
  },
  {
    icon: BookOpen,
    title: 'Complete Premium Package',
    description: 'NCERT mastery, advanced materials, unlimited doubt sessions - everything included.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches to complement parents\' IT shift schedules.',
  },
  {
    icon: Shield,
    title: 'Stress-Free Learning',
    description: 'No ORR traffic stress. Study in comfort from your Madhapur or Kukatpally home.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score 2024', value: '356', icon: Star },
  { label: 'Hitech Students', value: '780+', icon: Users },
  { label: 'IT Schools', value: '15+', icon: GraduationCap },
]

const faqs = [
  {
    question: 'Why do Hitech City students choose online NEET coaching?',
    answer:
      'Hitech City families are tech-forward and understand the power of online learning. With parents working in IT, digital education is natural. Our online classes offer AIIMS faculty without ORR traffic. Save 2+ hours daily on commute to coaching centers in Ameerpet or SR Nagar.',
  },
  {
    question: 'Which areas in Hitech City corridor do you serve?',
    answer:
      'We serve the entire Hitech City corridor including Madhapur, Cyber Towers area, Raheja Mindspace, Kukatpally, KPHB Colony, Miyapur, Hafeezpet, Raidurgam, and surrounding IT hub areas. Students from any part of the IT corridor can join our online live classes.',
  },
  {
    question: 'What is the fee for NEET coaching in Hitech City?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 68,000 per year depending on the program chosen. This matches the premium education standards IT families expect while offering superior flexibility. EMI options available for working professionals.',
  },
  {
    question: 'How does this compare to coaching centers in Ameerpet?',
    answer:
      'Unlike physical coaching centers in Ameerpet or SR Nagar where batches have 50-100 students, we limit batches to 10-15 students. This means every doubt gets addressed, every student gets personal attention. Plus, you save 2+ hours on Hyderabad traffic daily.',
  },
  {
    question: 'Do you support CBSE and international school students?',
    answer:
      'Yes! We have specialized batches for CBSE, Telangana State Board, and international curriculum (IB, IGCSE) students. Many of our Hitech City students are from DPS, Oakridge, Chirec, and FIITJEE schools. Our faculty bridges all curricula with NEET requirements.',
  },
  {
    question: 'What medical colleges can Hitech City students target?',
    answer:
      'With proper NEET preparation, Hitech City students can target top colleges like Gandhi Medical College, Osmania Medical College, Deccan Medical College, NIMS, and all-India institutes like AIIMS and JIPMER.',
  },
]

const premiumSchools = [
  'DPS Hitech City',
  'Oakridge International',
  'Chirec Public School',
  'FIITJEE World School',
  'Delhi Public School Madhapur',
  'Glendale Academy',
  'The Hyderabad Public School',
  'Silver Oaks International',
  'Meridian School',
  'Johnson Grammar School',
]

const whyHitechCity = [
  {
    icon: Sparkles,
    title: 'Tech-Forward Platform',
    description:
      'AI-powered analytics, interactive learning, progress tracking - the digital experience IT families expect.',
  },
  {
    icon: Building,
    title: 'IT Professional Friendly',
    description:
      'We understand IT work schedules. Flexible timings, weekend batches, and parent-friendly updates.',
  },
  {
    icon: GraduationCap,
    title: 'Premium School Expert',
    description:
      'We understand DPS, Oakridge, Chirec, FIITJEE curriculums. Our faculty bridges school learning with NEET.',
  },
]

export default function NeetCoachingHitechCityPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_hitech_city', {
        event_category: 'conversion',
        event_label: 'neet_coaching_hitech_city_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Hitech City"
        citySlug="hitech-city-hyderabad"
        state="Telangana"
        localities={hitechCityLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="780"
        coordinates={{ lat: '17.4474', lng: '78.3762' }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-violet-900 via-purple-700 to-fuchsia-800 text-white py-20 overflow-hidden">
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
              Hyderabad&apos;s IT Corridor | Premium NEET Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Hitech City</span>, Hyderabad
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Madhapur | Cyber Towers | Kukatpally | KPHB | Miyapur | Raidurgam
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Tech-forward NEET Biology coaching for Hitech City IT families. 94.2% success rate, AIIMS
              faculty, zero traffic stress. Join 780+ students from DPS, Oakridge, Chirec.
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
                  View Premium Programs
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

      {/* Hitech City Localities Section */}
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
              NEET Coaching Across Hitech City IT Corridor
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Madhapur to Miyapur, Kukatpally to Raidurgam - premium coaching for the entire IT corridor.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hitechCityLocalities.map((locality, index) => (
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
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {locality.students}
                  </div>
                  <div className="text-sm text-gray-500">{locality.highlight}</div>
                  {locality.priority === 'high' && (
                    <div className="mt-2 inline-flex items-center text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 mr-1" />
                      IT Hub
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hitech City Students Choose Us */}
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
              Why Hitech City&apos;s IT Families Choose Cerebrum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Digital excellence meets premium education - designed for tech-forward families.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyHitechCity.map((item, index) => (
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
              Students from These Hitech City Schools Trust Us
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
              Premium NEET Biology Coaching Features
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
              Frequently Asked Questions - NEET Coaching Hitech City
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-purple-600 to-fuchsia-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join Hitech City&apos;s Top NEET Aspirants
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              94.2% success rate, AIIMS faculty, tech-forward platform. IT family specialists!
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
                <span>Full IT Corridor</span>
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
                <span>Tech Platform</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
