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

const bandraLocalities = [
  {
    name: 'Bandra West',
    slug: 'bandra-west',
    students: '180+',
    highlight: 'Premium Hub - Linking Road',
    priority: 'high',
  },
  {
    name: 'Bandra East',
    slug: 'bandra-east',
    students: '150+',
    highlight: 'BKC Adjacent',
    priority: 'high',
  },
  {
    name: 'Pali Hill',
    slug: 'pali-hill',
    students: '85+',
    highlight: 'Ultra Premium Enclave',
    priority: 'high',
  },
  {
    name: 'Carter Road',
    slug: 'carter-road',
    students: '70+',
    highlight: 'Seafront Premium',
    priority: 'high',
  },
  {
    name: 'Khar West',
    slug: 'khar-west',
    students: '120+',
    highlight: 'Adjacent Premium Area',
    priority: 'high',
  },
  {
    name: 'Santacruz West',
    slug: 'santacruz-west',
    students: '110+',
    highlight: 'Residential Hub',
    priority: 'medium',
  },
  {
    name: 'Linking Road',
    slug: 'linking-road',
    students: '95+',
    highlight: 'Commercial Core',
    priority: 'medium',
  },
  {
    name: 'Turner Road',
    slug: 'turner-road',
    students: '65+',
    highlight: 'Boutique Locality',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Premium online coaching - no need to travel through Bandra traffic. World-class teaching from home.',
  },
  {
    icon: Users,
    title: 'Elite Small Batches (10-15)',
    description: 'Exclusive batches for Bandra students with personalized attention and premium support.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Expert doctors and teachers from premier medical institutions. Quality Bandra deserves.',
  },
  {
    icon: BookOpen,
    title: 'Complete Premium Package',
    description: 'NCERT mastery, advanced materials, unlimited doubt sessions - everything included.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches to complement your premium school schedule.',
  },
  {
    icon: Shield,
    title: 'Stress-Free Learning',
    description: 'No Bandra-Kurla traffic stress. Study in comfort from your premium residence.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score 2024', value: '358', icon: Star },
  { label: 'Bandra Students', value: '650+', icon: Users },
  { label: 'Premium Schools', value: '15+', icon: GraduationCap },
]

const faqs = [
  {
    question: 'Why do Bandra students choose online NEET coaching?',
    answer:
      'Bandra\'s premium schools like American School of Bombay, Ecole Mondiale, and Cathedral School have demanding schedules. Our online classes offer flexibility that physical coaching cannot. Save 2-3 hours daily on traffic to coaching centers in Dadar or Andheri. Our 94.2% success rate proves online is equally effective.',
  },
  {
    question: 'Which areas in Bandra do you serve?',
    answer:
      'We serve all Bandra localities including Bandra West, Bandra East, Pali Hill, Carter Road, Khar West, Santacruz West, Linking Road, Turner Road, and all surrounding premium areas. Students from Hill Road to Bandstand can join our online live classes.',
  },
  {
    question: 'What is the fee for premium NEET coaching in Bandra?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 68,000 per year depending on the program chosen. This is competitive with Bandra\'s premium coaching centers while offering superior flexibility and personalized attention. EMI options available.',
  },
  {
    question: 'How does this compare to coaching centers in BKC or Dadar?',
    answer:
      'Unlike physical coaching centers where batches have 50-100 students, we limit batches to 10-15 students. This means every doubt gets addressed, every student gets personal attention. Plus, you save hours on Mumbai traffic daily.',
  },
  {
    question: 'Do you understand international school patterns?',
    answer:
      'Yes! We have specialized batches for international school students (IB, IGCSE, A-Levels). Our faculty understands how to bridge international curriculum with NEET Biology requirements. Many of our Bandra students are from American School of Bombay, Dhirubhai Ambani, and Ecole Mondiale.',
  },
  {
    question: 'What medical colleges can Bandra students target?',
    answer:
      'With proper NEET preparation, Bandra students can target top colleges like Grant Medical College, KEM Hospital, Seth GS Medical College, Topiwala National Medical College, and all-India institutes like AIIMS and JIPMER.',
  },
]

const premiumSchools = [
  'American School of Bombay',
  'Ecole Mondiale World School',
  'Cathedral & John Connon School',
  'Dhirubhai Ambani International',
  'Jamnabai Narsee School',
  'St. Stanislaus High School',
  'Maneckji Cooper School',
  'Arya Vidya Mandir',
  'Bombay Scottish School',
  'Hill Spring International',
]

const whyBandra = [
  {
    icon: Sparkles,
    title: 'Premium Quality, Zero Commute',
    description:
      'Get world-class NEET coaching without stepping out of Bandra. No traffic to Dadar or Andheri coaching hubs.',
  },
  {
    icon: Building,
    title: 'International School Expert',
    description:
      'We understand IB, IGCSE, A-Levels. Our faculty knows how to prepare international school students for NEET.',
  },
  {
    icon: GraduationCap,
    title: 'Elite Student Network',
    description:
      'Study with peers from Bandra\'s top schools. Network with motivated students from premium institutions.',
  },
]

export default function NeetCoachingBandraPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_bandra', {
        event_category: 'conversion',
        event_label: 'neet_coaching_bandra_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Bandra"
        citySlug="bandra-mumbai"
        state="Maharashtra"
        localities={bandraLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="650"
        coordinates={{ lat: '19.0596', lng: '72.8295' }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-700 to-purple-800 text-white py-20 overflow-hidden">
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
              Queen of Suburbs | Premium NEET Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Bandra</span>, Mumbai
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Bandra West | Pali Hill | Carter Road | Khar | BKC Adjacent
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Premium NEET Biology coaching for Bandra&apos;s elite schools. 94.2% success rate, AIIMS
              faculty, zero traffic commute. Join 650+ students from ASB, Cathedral, Ecole Mondiale.
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
                  className="border-white text-white hover:bg-white hover:text-indigo-900"
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

      {/* Bandra Localities Section */}
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
              NEET Coaching Across Bandra & Surrounding Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Pali Hill to BKC, Carter Road to Linking Road - premium coaching for every
              Bandra locality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bandraLocalities.map((locality, index) => (
              <motion.div
                key={locality.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                    locality.priority === 'high' ? 'ring-2 ring-indigo-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                    <MapPin className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="text-2xl font-bold text-indigo-600 mb-1">
                    {locality.students}
                  </div>
                  <div className="text-sm text-gray-500">{locality.highlight}</div>
                  {locality.priority === 'high' && (
                    <div className="mt-2 inline-flex items-center text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 mr-1" />
                      Premium Area
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Bandra Students Choose Us */}
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
              Why Bandra&apos;s Elite Choose Cerebrum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium education meets convenience - designed for Bandra&apos;s discerning families.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyBandra.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-indigo-50 rounded-xl p-8 border border-indigo-100"
              >
                <item.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Bandra Schools Trust Us
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
                <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
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
              Frequently Asked Questions - NEET Coaching Bandra
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
                  <MessageCircle className="w-6 h-6 mr-3 text-indigo-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join Bandra&apos;s Elite NEET Aspirants
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              94.2% success rate, AIIMS faculty, premium small batches. International school
              specialists!
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
                  className="border-white text-white hover:bg-white hover:text-indigo-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All Bandra Areas</span>
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
                <span>IB/IGCSE Expert</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
