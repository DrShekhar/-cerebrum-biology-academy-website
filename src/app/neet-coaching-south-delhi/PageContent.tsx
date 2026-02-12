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
  Building2,
  School,
  ExternalLink,
  ThumbsUp,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { QuickAnswers } from '@/components/seo/QuickAnswers'
import { LazyGoogleMap } from '@/components/performance/LazyGoogleMap'
import { CityBreadcrumb } from '@/components/city/CityBreadcrumb'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'

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
  { label: 'Success Rate', value: '98%' },
  { label: 'Areas Covered', value: '15+' },
  { label: 'Top 1000 Rankers', value: '180+' },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in South Delhi?',
    answer:
      'Cerebrum Biology Academy is rated among the top NEET coaching institutes in South Delhi with 98% success rate. We have expert AIIMS faculty, comprehensive study material, and proven track record with students from GK, Defence Colony, Vasant Vihar, and Hauz Khas.',
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
  {
    question: 'How far is Cerebrum Biology Academy from Defence Colony?',
    answer:
      'Our South Extension center is approximately 3-4 km from Defence Colony, which is a 10-15 minute drive or a comfortable 20-minute metro ride via Yellow Line (Lajpat Nagar Metro). Many of our students from Defence Colony prefer our weekend batches or online classes for convenience. We also have evening batches (6-8 PM) that work well for Defence Colony students.',
  },
  {
    question: 'Is transport facility available from Vasant Vihar to the coaching center?',
    answer:
      "While we don't provide dedicated transport, our South Extension location is well-connected to Vasant Vihar via multiple routes. You can take Vasant Vihar Metro (Yellow Line) to South Extension (3 stops, 12 minutes) or use app-based cabs (₹150-200, 20-25 minutes depending on traffic). Many Vasant Vihar students also opt for our hybrid mode - attending weekend classes offline and weekday classes online.",
  },
  {
    question: 'What is the batch size for NEET Biology coaching at Cerebrum?',
    answer:
      "We maintain small batches of maximum 15-20 students to ensure personalized attention. Unlike large coaching institutes where batch sizes can exceed 100 students, our small batches allow faculty to track each student's progress individually, conduct regular doubt-clearing sessions, and provide customized study plans. This personalized approach has resulted in our 98% NEET success rate.",
  },
  {
    question: 'Do you provide hybrid mode (online + offline) NEET coaching?',
    answer:
      'Yes! We offer flexible hybrid mode for South Delhi students. You can attend classes offline at our South Extension center on weekends (Saturday-Sunday) and join online live classes during weekdays. All classes are recorded and available for revision. This hybrid approach is particularly popular among students from Greater Kailash, Vasant Vihar, and Defence Colony who want the best of both worlds - personalized offline interaction and online convenience.',
  },
  {
    question: 'How does Cerebrum compare to other NEET coaching institutes in the Hauz Khas area?',
    answer:
      'Unlike generic coaching institutes in Hauz Khas/Kalu Sarai that teach all subjects with large batches (50-100 students), Cerebrum specializes exclusively in Biology with AIIMS trained faculty. Our advantages: (1) Small batch size (15-20 vs 50-100 students), (2) 15+ years of specialized Biology teaching experience, (3) 98% NEET success rate vs 60-70% industry average, (4) Personalized doubt-clearing sessions, (5) Comprehensive NCERT-focused study material. Our students from DPS RK Puram, Modern School, and Vasant Valley consistently outperform peers who attend larger coaching institutes.',
  },
]

export default function PageContent() {
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
      <section className="relative bg-indigo-900 text-white py-20 overflow-hidden">
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

              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%27m%20interested%20in%20NEET%20Biology%20coaching%20in%20South%20Delhi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-green-500 hover:border-green-500"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Us
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

      {/* Quick Answers Section - Optimized for Featured Snippets */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <QuickAnswers locality="South Delhi" />
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

      {/* Premium Localities Spotlight */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Building2 className="w-4 h-4 mr-2" />
              Premium Localities We Serve
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Specialized NEET Coaching for South Delhi's Elite Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Deep presence in Greater Kailash, Defence Colony, and Vasant Vihar with tailored
              support for top school students
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Greater Kailash */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Greater Kailash</h3>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-bold">
                  450+ Students
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <School className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">Target Schools</p>
                    <p className="text-gray-600 text-sm">DPS RK Puram, DPS GK, Modern School</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">Connectivity</p>
                    <p className="text-gray-600 text-sm">
                      Yellow Line Metro - Kailash Colony / Greater Kailash (15 min)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">Batch Timings</p>
                    <p className="text-gray-600 text-sm">
                      Evening 6-8 PM | Weekend 10 AM-1 PM | Hybrid mode
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">Recent Success</p>
                    <p className="text-gray-600 text-sm">
                      Ananya Mehta (DPS RK Puram) - 678/720, AIR 890, UCMS Delhi
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong className="text-purple-900">GK Advantage:</strong> Our South Extension
                  center is just 10 minutes from both GK-I and GK-II. With 450+ students from
                  Greater Kailash, we understand the academic rigor of DPS schools and provide
                  complementary NEET preparation that doesn't compromise school performance.
                </p>
              </div>
            </motion.div>

            {/* Defence Colony */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Defence Colony</h3>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">
                  320+ Students
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <School className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">Target Schools</p>
                    <p className="text-gray-600 text-sm">Modern School, Army Public School</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">Connectivity</p>
                    <p className="text-gray-600 text-sm">
                      Pink Line - Lajpat Nagar Metro (12 min) | Direct auto route
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">Batch Timings</p>
                    <p className="text-gray-600 text-sm">
                      Weekday Evening 5:30-7:30 PM | Saturday-Sunday Morning
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">Recent Success</p>
                    <p className="text-gray-600 text-sm">
                      Kabir Singh (Modern School) - 665/720, AIR 1250, MAMC Delhi
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong className="text-blue-900">Defence Colony Special:</strong> Understanding
                  the discipline and excellence expected in defence families, we offer structured
                  weekend batches and personalized progress reports. Many armed forces families
                  trust us for their children's medical career preparation.
                </p>
              </div>
            </motion.div>

            {/* Vasant Vihar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Vasant Vihar</h3>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                  280+ Students
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <School className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">Target Schools</p>
                    <p className="text-gray-600 text-sm">
                      Modern School, DPS Vasant Vihar, Vasant Valley
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">Connectivity</p>
                    <p className="text-gray-600 text-sm">
                      Yellow Line - Vasant Vihar to South Extension Metro (12 min)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">Batch Timings</p>
                    <p className="text-gray-600 text-sm">
                      Hybrid Mode Popular | Weekend Offline + Weekday Online
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">Recent Success</p>
                    <p className="text-gray-600 text-sm">
                      Riya Gupta (Vasant Valley) - 690/720, AIR 420, AIIMS Delhi
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong className="text-green-900">Vasant Vihar Premium:</strong> Catering to
                  students from ultra-premium schools, we offer flexible hybrid mode - perfect for
                  balancing school activities, extracurriculars, and NEET prep. Our faculty
                  understands the holistic development focus of Vasant Valley and Modern School.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center bg-white rounded-full shadow-lg px-8 py-4 border border-gray-200">
              <Users className="w-6 h-6 text-purple-600 mr-3" />
              <span className="text-gray-700 font-medium">
                <strong className="text-gray-900">1,050+ students</strong> from these three
                localities alone have joined Cerebrum in the last 3 years
              </span>
            </div>
          </motion.div>
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

      {/* Video Testimonials Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Play className="w-4 h-4 mr-2" />
              Real Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Watch Success Stories from South Delhi Students
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear directly from NEET achievers who started their journey from homes in Greater
              Kailash, Defence Colony, and Vasant Vihar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                youtubeId: 'bk6wQCh6b9w',
                student: 'Sadhna Sirin',
                score: '695/720',
                achievement: 'Delhi-NCR Topper NEET 2023',
                percentile: '100 Percentile Biology',
              },
              {
                youtubeId: 'NfhkGqOQXzk',
                student: 'Abhisek',
                score: 'AFMC Selection',
                achievement: 'Armed Forces Medical College',
                percentile: 'Pune Campus',
              },
              {
                youtubeId: 't5F8RBuHITM',
                student: 'Nishita',
                score: 'Medical College',
                achievement: '6-Month Intensive Program',
                percentile: 'Quick Success Story',
              },
            ].map((video, index) => (
              <motion.div
                key={video.youtubeId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 group hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative aspect-video bg-gray-100">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={`${video.student} NEET Success Story`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{video.student}</h3>
                  <p className="text-green-600 font-semibold mb-1">{video.score}</p>
                  <p className="text-gray-600 text-sm mb-1">{video.achievement}</p>
                  <p className="text-purple-600 text-xs font-medium">{video.percentile}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a
              href="https://www.youtube.com/@cerebrumbiologyacademy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Play className="w-6 h-6" />
              Watch More Success Stories on YouTube
              <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
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

      {/* Enhanced Success Stories Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Trophy className="w-4 h-4 mr-2" />
              Student Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Results from South Delhi Students
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Read detailed transformation stories of students from DPS, Modern School, and Vasant
              Valley who cracked NEET with us
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Ananya Mehta',
                school: 'DPS RK Puram',
                location: 'Greater Kailash I',
                beforeScore: 540,
                afterScore: 678,
                improvement: 138,
                neetRank: 'AIR 890',
                college: 'UCMS Delhi',
                year: 2024,
                quote:
                  "Coming from DPS RK Puram, I was looking for quality NEET coaching near my home in Greater Kailash. Cerebrum's location in South Extension was perfect - just 10 minutes away. The AIIMS trained faculty focused on NCERT thoroughly, which is crucial for NEET. Small batch of 15 students meant I got individual attention for my doubts. Dr. Shekhar Sir's teaching methodology helped me understand Botany concepts that I always struggled with. The regular mock tests and performance analysis helped me track my progress. I improved my score from 540 to 678 marks and secured AIR 890, which got me admission to UCMS Delhi - my dream college!",
              },
              {
                name: 'Kabir Singh',
                school: 'Modern School, Vasant Vihar',
                location: 'Defence Colony',
                beforeScore: 520,
                afterScore: 665,
                improvement: 145,
                neetRank: 'AIR 1250',
                college: 'MAMC Delhi',
                year: 2024,
                quote:
                  "As a student from Modern School living in Defence Colony, I needed coaching that understood the pressure of balancing school and NEET prep. Cerebrum's flexible weekend batches were a lifesaver. The faculty's focus on high-yield topics and previous year question patterns helped me optimize my preparation. I was particularly weak in Ecology and Evolution, but the personalized doubt-clearing sessions helped me master these chapters. The comprehensive study material eliminated the need for multiple reference books. My journey from 520 to 665 marks and AIR 1250 was possible because of the systematic approach and constant mentorship I received.",
              },
              {
                name: 'Riya Gupta',
                school: 'Vasant Valley School',
                location: 'Vasant Kunj',
                beforeScore: 495,
                afterScore: 690,
                improvement: 195,
                neetRank: 'AIR 420',
                college: 'AIIMS Delhi',
                year: 2024,
                quote:
                  "I'm from Vasant Valley School in Vasant Kunj, and initially, I was scoring only 495 in mock tests. My parents were worried if I could even qualify NEET. But joining Cerebrum Biology Academy changed everything. The faculty identified my weak areas - Plant Physiology and Human Physiology - and gave me targeted practice. The small batch size meant every student's progress was tracked individually. Dr. Shekhar Sir's real-life examples and clinical correlations made complex concepts memorable. The regular parent-teacher meetings kept my family updated on my progress. I improved by 195 marks to score 690/720 and got AIR 420, securing a seat at AIIMS Delhi - something I never thought possible!",
              },
            ].map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.school}</p>
                    <p className="text-xs text-purple-600 font-medium mt-1">{story.location}</p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                    {story.year}
                  </div>
                </div>

                {/* Score Improvement */}
                <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Before</p>
                      <p className="text-2xl font-bold text-red-600">{story.beforeScore}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">After</p>
                      <p className="text-2xl font-bold text-green-600">{story.afterScore}</p>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      +{story.improvement} marks improvement
                    </span>
                  </div>
                </div>

                {/* Achievement */}
                <div className="flex items-center justify-between bg-purple-50 rounded-lg p-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">NEET Rank</p>
                    <p className="text-lg font-bold text-purple-900">{story.neetRank}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 mb-1">College</p>
                    <p className="text-sm font-bold text-purple-900">{story.college}</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    &quot;{story.quote}&quot;
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-sm font-semibold">
              <Award className="w-5 h-5 mr-2" />
              Average improvement: 150+ marks | 500+ students from South Delhi qualified NEET
            </div>
          </motion.div>
        </div>
      </section>

      {/* Google Business Profile & Reviews Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by South Delhi Families
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See what students and parents from Greater Kailash, Defence Colony, and Vasant Vihar
              are saying about us
            </p>
          </motion.div>

          {/* Google Rating & Reviews Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Google Rating Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-8 border border-blue-100"
            >
              <div className="flex items-center justify-center mb-6">
                <img
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                  alt="Google"
                  className="h-10"
                />
              </div>
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-gray-900 mb-3">4.9</div>
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-7 h-7 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 font-semibold text-lg mb-2">Based on 500+ reviews</p>
                <p className="text-sm text-gray-500">
                  Verified reviews from students and parents across South Delhi
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.google.com/search?q=cerebrum+biology+academy+reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
                >
                  <ThumbsUp className="w-5 h-5" />
                  Read All Reviews on Google
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="https://www.google.com/search?q=cerebrum+biology+academy+write+review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Write a Review
                </a>
              </div>
            </motion.div>

            {/* Recent Reviews Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-xl p-8 border border-purple-100"
            >
              <h3 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-purple-600" />
                Recent Reviews from South Delhi
              </h3>
              <div className="space-y-5">
                {[
                  {
                    text: "Best NEET Biology coaching in South Delhi! My daughter from DPS RK Puram got personalized attention in small batches. She scored 675/720 in NEET 2024 and got into UCMS Delhi. Dr. Shekhar Sir's teaching is exceptional.",
                    author: 'Parent',
                    location: 'Greater Kailash I',
                    rating: 5,
                  },
                  {
                    text: "I was weak in Botany but Cerebrum's AIIMS trained faculty made complex topics simple. Weekend batches were perfect for my schedule. The study material and regular tests helped me improve from 540 to 668 marks. Highly recommend!",
                    author: 'Rohan M.',
                    location: 'Defence Colony',
                    rating: 5,
                  },
                  {
                    text: 'Excellent coaching institute! Being from Vasant Vihar, I wanted quality coaching nearby. Small batch size (only 15 students) meant I got individual attention. Faculty focuses on NCERT thoroughly which is key for NEET.',
                    author: 'Ananya S.',
                    location: 'Vasant Vihar',
                    rating: 5,
                  },
                  {
                    text: 'Joined in Class 11 itself - best decision! The conceptual clarity and doubt-solving sessions are amazing. Study material is comprehensive. My son is now in Class 12 and confident about NEET 2026.',
                    author: 'Parent',
                    location: 'Hauz Khas',
                    rating: 5,
                  },
                ].map((review, index) => (
                  <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                    <div className="flex gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-2 italic">
                      &quot;{review.text}&quot;
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                      - {review.author}, {review.location}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Google Maps & Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-xl overflow-hidden border border-green-100"
          >
            <div className="grid lg:grid-cols-2">
              {/* Map */}
              <div className="relative h-96 lg:h-auto bg-gray-100">
                <LazyGoogleMap
                  embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.8904729344643!2d77.21443931508122!3d28.56964948244002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e9f6f5f5f5%3A0x1234567890abcdef!2sSouth%20Extension%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  title="NEET Coaching Center Location"
                  height="100%"
                  placeholder={{
                    lat: 28.56964948244002,
                    lng: 77.21443931508122,
                    address: "South Extension, New Delhi"
                  }}
                />
              </div>

              {/* Contact Details */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Visit Our South Delhi Center
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Address</p>
                      <p className="text-gray-600 leading-relaxed">
                        Cerebrum Biology Academy
                        <br />
                        South Extension, Part I
                        <br />
                        New Delhi - 110049
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Phone</p>
                      <a
                        href="tel:+918826444334"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        +91-88264-44334
                      </a>
                      <p className="text-sm text-gray-500 mt-1">Mon-Sat: 9 AM - 7 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MessageCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Email</p>
                      <a
                        href="mailto:info@cerebrumbiologyacademy.com"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        info@cerebrumbiologyacademy.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Metro Connectivity</p>
                      <p className="text-gray-600">
                        <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium mr-1">
                          Yellow Line
                        </span>
                        South Extension Metro (10 min walk)
                        <br />
                        <span className="inline-block bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs font-medium mr-1 mt-1">
                          Pink Line
                        </span>
                        Lajpat Nagar Metro (15 min auto)
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a
                      href="https://maps.google.com/?q=Cerebrum+Biology+Academy+South+Extension"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors w-full justify-center"
                    >
                      <MapPin className="w-5 h-5" />
                      Get Directions
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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

      {/* Trust Badges Section */}
      <section className="py-12 md:py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {[
              {
                icon: Award,
                label: '15+ Years',
                sublabel: 'Excellence Since 2009',
                color: 'text-blue-600',
              },
              {
                icon: Users,
                label: '2,500+ Students',
                sublabel: 'From South Delhi',
                color: 'text-green-600',
              },
              {
                icon: Star,
                label: '4.9/5 Rating',
                sublabel: '500+ Google Reviews',
                color: 'text-yellow-600',
              },
              {
                icon: GraduationCap,
                label: 'AIIMS Faculty',
                sublabel: 'Expert Teachers',
                color: 'text-purple-600',
              },
              {
                icon: Trophy,
                label: '180+ Top Rankers',
                sublabel: 'Under AIR 1000',
                color: 'text-orange-600',
              },
              {
                icon: MapPin,
                label: 'South Extension',
                sublabel: 'Prime Location',
                color: 'text-red-600',
              },
            ].map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <badge.icon className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 ${badge.color}`} />
                <div className="font-bold text-gray-900 text-sm md:text-base mb-1">
                  {badge.label}
                </div>
                <div className="text-xs text-gray-600">{badge.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-indigo-600 text-white">
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

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/918826444334?text=Hi%2C%20I%27m%20interested%20in%20NEET%20Biology%20coaching%20in%20South%20Delhi.%20I%27d%20like%20to%20know%20more%20about%20your%20courses%20and%20book%20a%20free%20demo%20class."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 group hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          1
        </span>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat with us on WhatsApp
        </span>
      </motion.a>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy - South Delhi',
            description:
              'Best NEET coaching in South Delhi. Expert AIIMS faculty, 98% success rate.',
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
      <PricingSection cityName="South" />
      <CostComparisonSection cityName="South" />
      <RelatedCityLinks currentCity="south-delhi" variant="default" />
    </div>
  )
}
