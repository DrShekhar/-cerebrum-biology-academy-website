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
  ExternalLink,
  TrendingUp,
  Monitor,
  Phone,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import {
  LocalBusinessSchema,
  GurugramServiceSchema,
  FAQSchema,
  DrShekharSinghSchema,
  VideoSchema,
  BreadcrumbSchema,
  SpeakableSchema,
} from '@/components/seo/StructuredData'
import { LazyGoogleMap } from '@/components/performance/LazyGoogleMap'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { UrgencyBanner } from '@/components/landing-pages/UrgencyBanner'

const gurugramLocalities = [
  // ULTRA-PREMIUM LOCALITIES (Golf Course Road + DLF Phases)
  {
    name: 'DLF Phase 5 (Magnolias/Camellias)',
    slug: 'dlf-phase-5',
    students: '28+',
    highlight: 'Ultra-Luxury Golf Course',
    priority: 'high',
  },
  {
    name: 'Golf Course Road',
    slug: 'golf-course-road',
    students: '180+',
    highlight: 'Premium Residential',
    priority: 'high',
  },
  {
    name: 'DLF Phase 3 (Shri Ram School)',
    slug: 'dlf-phase-3',
    students: '48+',
    highlight: 'Near Shri Ram School',
    priority: 'high',
  },
  {
    name: 'DLF Phase 1',
    slug: 'dlf-phase-1',
    students: '165+',
    highlight: 'Cyber City Area',
    priority: 'high',
  },
  {
    name: 'DLF Phase 2',
    slug: 'dlf-phase-2',
    students: '42+',
    highlight: 'Premium Bungalows',
    priority: 'high',
  },
  {
    name: 'DLF Phase 4',
    slug: 'dlf-phase-4',
    students: '135+',
    highlight: 'Galleria Market',
    priority: 'high',
  },
  // PREMIUM GATED COMMUNITIES
  {
    name: 'Nirvana Country',
    slug: 'nirvana-country',
    students: '35+',
    highlight: 'Premium Villas',
    priority: 'high',
  },
  {
    name: 'Sohna Road (Central Park)',
    slug: 'sohna-road',
    students: '65+',
    highlight: 'Belgravia/Vatika City',
    priority: 'high',
  },
  // AAKASH COMPETITOR AREAS
  {
    name: 'Sector 49 (South City 2)',
    slug: 'sector-49',
    students: '145+',
    highlight: 'Near Aakash - Better Alternative',
    priority: 'high',
  },
  {
    name: 'Sector 84 (M3M Market)',
    slug: 'sector-84',
    students: '55+',
    highlight: 'Near Aakash - 60% Cheaper',
    priority: 'high',
  },
  {
    name: 'Sector 14',
    slug: 'sector-14',
    students: '145+',
    highlight: 'Old Gurugram',
    priority: 'medium',
  },
  // OTHER KEY LOCALITIES
  {
    name: 'Sushant Lok',
    slug: 'sushant-lok',
    students: '220+',
    highlight: 'Established Hub',
    priority: 'high',
  },
  {
    name: 'Sector 56',
    slug: 'sector-56',
    students: '190+',
    highlight: 'Near Golf Course Ext',
    priority: 'medium',
  },
  {
    name: 'Sector 43',
    slug: 'sector-43',
    students: '130+',
    highlight: 'Central Location',
    priority: 'medium',
  },
  {
    name: 'Sector 51',
    slug: 'sector-51',
    students: '125+',
    highlight: 'Near Nirvana Country',
    priority: 'medium',
  },
  {
    name: 'Sector 57',
    slug: 'sector-57',
    students: '140+',
    highlight: 'Scottish High Area',
    priority: 'medium',
  },
  {
    name: 'South City 1',
    slug: 'south-city-1',
    students: '155+',
    highlight: 'South Gurugram',
    priority: 'medium',
  },
  {
    name: 'New Gurugram',
    slug: 'new-gurugram',
    students: '170+',
    highlight: 'Dwarka Expressway',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time teaching with instant doubt resolution - no more Delhi travel needed',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Exclusive Gurugram batches with personal attention for every student',
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
    description: 'Morning, afternoon, and evening batches to fit Gurugram schedules',
  },
  {
    icon: Shield,
    title: 'No Delhi Travel',
    description: 'Save 3+ hours daily on border crossing - study from your Gurugram home',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '360', icon: Star },
  { label: 'Gurugram Students', value: '2,100+', icon: Users },
  { label: 'Localities Covered', value: '18', icon: MapPin },
]

const faqs = [
  {
    question: 'Why choose online coaching over traveling to Delhi for NEET preparation?',
    answer:
      'Gurugram students typically spend 3-4 hours daily crossing the Delhi border for coaching. Our online live classes deliver Delhi-quality teaching from AIIMS trained faculties directly to your home. Save time, reduce stress, and focus 100% on NEET preparation. Our 98% success rate proves online is as effective as offline.',
  },
  {
    question: 'Which areas in Gurugram do you serve?',
    answer:
      'We serve all major Gurugram localities including DLF Phase 1, 2, 3, 4, Golf Course Road, Sushant Lok, Sector 14, 43, 51, 56, 57, South City, New Gurugram, Nirvana Country, and all surrounding areas. Students from any Gurugram pincode can join our online live classes.',
  },
  {
    question: 'What is the fee for NEET coaching in Gurugram?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 48,000 per year - significantly lower than Delhi coaching centers plus you save on travel costs. Premium Gurugram institutes charge Rs 1.2-1.5 lakhs. We offer EMI options and merit scholarships.',
  },
  {
    question: 'How do live classes work for Gurugram students?',
    answer:
      'We conduct live interactive classes via Zoom/Google Meet. Ask questions in real-time, participate in discussions, and interact with teachers just like a physical classroom. All classes are recorded for revision. Dedicated Gurugram batches ensure peer interaction with local students.',
  },
  {
    question: 'Do you have any physical presence in Gurugram?',
    answer:
      'We are primarily an online coaching institute serving Gurugram and all of India. This allows us to provide top Delhi NCR faculty at affordable fees. For doubt sessions and test series, we organize periodic meetups at convenient Gurugram locations.',
  },
  {
    question: 'What is your NEET Biology success rate for Gurugram students?',
    answer:
      'Our 2024 batch had a 98% NEET qualification rate with 800+ Gurugram students placed in medical colleges. Students from GD Goenka, Scottish High, and The Shri Ram School scored 640+ average in Biology. Many secured AIR under 2000 and admissions to AIIMS, MAMC, and UCMS Delhi.',
  },
  {
    question: 'Can I join coaching in Class 11 or is it only for Class 12 students?',
    answer:
      'We offer specialized batches for both Class 11 and Class 12 students from Gurugram. Class 11 is the ideal time to start NEET preparation with foundation building in Biology. We also have dropper batches and crash courses for Class 12 students needing intensive preparation.',
  },
  {
    question: 'What study material do you provide for NEET Biology preparation?',
    answer:
      'Students receive comprehensive digital study material including topic-wise notes for Botany and Zoology, 5000+ NEET previous year questions with solutions, chapter-wise practice sheets, NCERT-based concept maps, and high-yield topic summaries. All material is optimized for NEET 2026 pattern.',
  },
  {
    question: 'Who are your faculty members and what are their qualifications?',
    answer:
      'Dr. Shekhar C Singh (AIIMS New Delhi Alumnus) leads our NEET Biology faculty with 15+ years of coaching experience. Our team includes IIT graduates, medical college professors, and NEET toppers who secured AIR under 100. All faculty have proven track records of producing NEET qualifiers.',
  },
  {
    question: 'What batch timings are available for Gurugram school students?',
    answer:
      'We offer morning batches (6:30-8:30 AM before school), evening batches (6:00-8:00 PM after school), and weekend batches (Saturday/Sunday full day). Special batches for DPS Gurugram, GD Goenka, and Scottish High students aligned with their school timings. Recorded lectures available 24/7.',
  },
  {
    question: 'How many students are there per batch in your online classes?',
    answer:
      "We maintain small batch sizes of 15-20 students maximum to ensure personalized attention and effective doubt clearing. This is significantly smaller than typical offline coaching centers that have 80-100 students per batch. Small batches allow faculty to track each student's progress individually.",
  },
  {
    question: 'Do you conduct mock tests and practice tests for NEET preparation?',
    answer:
      'Yes, we conduct weekly chapter tests, monthly full-length NEET mock tests, and topic-wise practice tests. All tests follow the latest NTA NEET pattern with detailed performance analysis and personalized improvement plans. Students get access to 40+ full-length mock tests throughout the year.',
  },
  {
    question: 'How is doubt clearing handled in online classes for Gurugram students?',
    answer:
      'We offer daily live doubt clearing sessions (30 minutes after each class), dedicated WhatsApp group support for quick queries, one-on-one video call sessions twice a month, and 24/7 doubt resolution portal. Faculty response time is typically under 2 hours for urgent Biology doubts.',
  },
  {
    question: 'What is the difference between your coaching and big batch PCB coaching centers?',
    answer:
      'Our online/offline/hybrid coaching provides better results than crowded big-batch PCB coaching centers. Our small personalized batches (15-20 students) have 10X more chances of getting selected compared to 100+ student batches where individual attention is impossible. Already joined a corporate coaching institute? No problem - complement your preparation with Cerebrum Pinnacle courses and get the best of both worlds: mass coaching infrastructure + personalized mentoring and doubt clearing.',
  },
  {
    question: 'How do I enroll and what is the admission process from Gurugram?',
    answer:
      'Enrollment is simple: Book a free demo class via our website or WhatsApp (+91 88264 44334), attend the trial class, consult with our academic counselor about batch selection, and complete payment online (EMI available). Students from DLF, Golf Course Road, and all Gurugram areas can join within 24 hours.',
  },
]

const premiumSchools = [
  'The Shri Ram School',
  'DPS Gurugram',
  'Pathways World School',
  'GD Goenka World School',
  'Scottish High International',
  'Heritage Xperiential',
  'Amity International',
  'Shiv Nadar School',
  'Blue Bells',
  'K.R. Mangalam',
]

const whyGurugram = [
  {
    icon: Building,
    title: 'Premium Quality at Home',
    description:
      'DLF, Golf Course Road, Sushant Lok residents deserve excellence. Get Delhi-quality coaching without crossing the border.',
  },
  {
    icon: Train,
    title: 'Save Commute Time',
    description:
      'Gurugram to South Delhi is 2+ hours daily. Use that time for self-study and practice instead of sitting in traffic.',
  },
  {
    icon: GraduationCap,
    title: 'Local Understanding',
    description:
      'We understand Gurugram school schedules, board exam patterns, and local academic challenges. Personalized support for Gurugram students.',
  },
]

export default function NeetCoachingGurugramPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_gurugram', {
        event_category: 'conversion',
        event_label: 'neet_coaching_gurugram_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-800 to-cyan-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              Serving All Gurugram Localities
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Gurugram</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              DLF Magnolias | Camellias | Aralias | Nirvana Country | Central Park | Golf Course
              Road | Sushant Lok
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Stop wasting 3+ hours daily traveling to Delhi for coaching. Get AIIMS trained
              faculties, 98% success rate, and live interactive classes - all from your Gurugram
              home. Join 1,800+ Gurugram students already preparing with us.
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
                  className="border-white text-white hover:bg-white hover:text-green-800"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Course Details
                </Button>
              </Link>
            </div>

            {/* Urgency Banner */}
            <UrgencyBanner
              batchStartDate="Feb 10, 2026"
              seatsTotal={20}
              seatsFilled={16}
              showCountdown={true}
            />

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-8">
              {successMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-fade-in-up"
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gurugram Localities Section */}
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
              NEET Coaching Across All Gurugram Localities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From DLF Cyber City to New Gurugram - we serve students from every corner of
              Gurugram/Gurgaon. Click on your locality for location-specific information.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gurugramLocalities.map((locality, index) => (
              <motion.div
                key={locality.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={`/locations/gurugram/${locality.slug}`}>
                  <div
                    className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                      locality.priority === 'high' ? 'ring-2 ring-green-600' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {locality.students}
                    </div>
                    <div className="text-sm text-gray-500">{locality.highlight}</div>
                    {locality.priority === 'high' && (
                      <div className="mt-2 inline-flex items-center text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
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

      {/* Why Gurugram Students Choose Us */}
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
              Why Gurugram Students Choose Online NEET Coaching
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop the daily Delhi border crossing. Premium education delivered to your doorstep.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyGurugram.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-green-50 rounded-xl p-8 border border-green-100"
              >
                <item.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Gurugram Schools Trust Us
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
              Why Choose Cerebrum for NEET Coaching in Gurugram?
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
                <feature.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section - Phase 1 */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Play className="w-4 h-4 mr-2" />
              Real Student Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Watch Success Stories from NEET Toppers & Medical College Admits
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear directly from our students who cracked NEET and secured top medical colleges.
              Accessible from all Gurugram areas via online classes - DLF Phases, Golf Course Road,
              Sushant Lok. Every story is authentic, every achievement verified.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Video 1: Sadhna Sirin */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/bk6wQCh6b9w"
                  title="Sadhna Sirin - 695/720 NEET 2023 Delhi-NCR Topper"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Sadhna Sirin</h3>
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Delhi-NCR Topper
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-green-600 font-semibold">
                    <Trophy className="w-5 h-5 mr-2" />
                    695/720 NEET 2023
                  </div>
                  <div className="flex items-center text-purple-600 font-semibold">
                    <Award className="w-5 h-5 mr-2" />
                    100 Percentile Biology
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "Dr. Shekhar Sir's unique teaching methods helped me achieve perfection in
                  Biology. Perfect for students from DLF Phase 1-4, Golf Course Road, or taking
                  online classes from Sushant Lok."
                </p>
              </div>
            </motion.div>

            {/* Video 2: Abhisek */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/NfhkGqOQXzk"
                  title="Abhisek - AFMC Selection"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Abhisek</h3>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    AFMC Pune
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-green-600 font-semibold">
                    <Trophy className="w-5 h-5 mr-2" />
                    AFMC Selection 2023
                  </div>
                  <div className="flex items-center text-purple-600 font-semibold">
                    <Award className="w-5 h-5 mr-2" />
                    Armed Forces Medical College
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "Rigorous preparation and personal mentoring helped me crack AFMC. Online classes
                  saved 3+ hours daily for students from Sector 56, 43, South City, and New
                  Gurugram."
                </p>
              </div>
            </motion.div>

            {/* Video 3: Nishita */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/t5F8RBuHITM"
                  title="Nishita - 6-Month Intensive Program Success"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Nishita</h3>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    6-Month Success
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-green-600 font-semibold">
                    <Trophy className="w-5 h-5 mr-2" />
                    Medical College Selection
                  </div>
                  <div className="flex items-center text-purple-600 font-semibold">
                    <Award className="w-5 h-5 mr-2" />
                    6-Month Transformation
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "Intensive program transformed my Biology preparation completely. Flexible timings
                  perfect for students from Ardee City, Heritage School, or anywhere in Gurugram via
                  online."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Watch More CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              href="https://www.youtube.com/@CerebrumBiologyAcademy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch More Success Stories on YouTube
              <ExternalLink className="w-5 h-5 ml-2" />
            </Link>
            <p className="text-sm text-gray-600 mt-4">
              Join students from DLF Phases, Golf Course Road, Sushant Lok, Sector 14-57, and all
              Gurugram areas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Google Business Profile & Reviews Section - Phase 2 */}
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
              Trusted by 800+ Gurugram Students & Parents
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Read verified reviews from students across DLF Phases, Golf Course Road, Sushant Lok,
              Sector 14-57, and all Gurugram areas
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Google Rating Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-xl sticky top-24">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg mx-auto">
                  <svg className="w-12 h-12" viewBox="0 0 48 48">
                    <path
                      fill="#4285F4"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#34A853"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#EA4335"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-1">4.9</div>
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-gray-700 font-semibold mb-6">
                    Based on 400+ verified reviews
                  </div>
                  <div className="space-y-3 w-full">
                    <Link
                      href="https://g.page/r/CeQX5XZ9QZ9QEBA/review"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                    >
                      Read All Reviews on Google
                    </Link>
                    <Link
                      href="https://g.page/r/CeQX5XZ9QZ9QEBA/review"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                    >
                      Write a Review
                    </Link>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Verified reviews from students across all Gurugram areas
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Review Highlights */}
            <div className="lg:col-span-2 space-y-5">
              {/* Review 1: GD Goenka Student */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      A
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Aarav, GD Goenka Sohna Road</div>
                      <div className="text-sm text-gray-600">Class 12 Student</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "Best NEET Biology coaching for Gurugram students! Online classes from my home in
                  DLF Phase 4. Small batch of 15 students, personalized attention. Scored 658/720 in
                  NEET 2024 and got Maulana Azad Medical College. No need to travel to Delhi!"
                </p>
                <div className="mt-3 flex items-center text-sm text-teal-700">
                  <Trophy className="w-4 h-4 mr-1" />
                  <span className="font-semibold">658/720 NEET 2024 | MAMC Delhi</span>
                </div>
              </motion.div>

              {/* Review 2: Scottish High Student */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      P
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        Priya S., Scottish High Sector 57
                      </div>
                      <div className="text-sm text-gray-600">Dropper Batch Student</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "Dropper batch student from Sector 56. Online classes worked perfectly - no
                  traffic stress! AIIMS faculty and comprehensive study material helped me score 642
                  in NEET. Evening timings fit my schedule. Highly recommend for Gurugram students!"
                </p>
                <div className="mt-3 flex items-center text-sm text-blue-700">
                  <Award className="w-4 h-4 mr-1" />
                  <span className="font-semibold">642/720 NEET 2024 | Excellent Faculty</span>
                </div>
              </motion.div>

              {/* Review 3: Sushant Lok Parent */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      R
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        Rajesh M., Parent from Sushant Lok
                      </div>
                      <div className="text-sm text-gray-600">Sushant Lok Phase 1</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "My son from Sushant Lok takes online classes. Went from 552 in mock tests to 632
                  in final NEET. The recorded lectures and doubt sessions till late night were
                  extremely helpful. Best investment for our child's medical future!"
                </p>
                <div className="mt-3 flex items-center text-sm text-orange-700">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="font-semibold">
                    552→632 Improvement | Government Medical College
                  </span>
                </div>
              </motion.div>

              {/* Review 4: Golf Course Road Student */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      K
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Kavya R., Golf Course Road</div>
                      <div className="text-sm text-gray-600">Class 12 Student</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "Perfect for Gurugram students - online classes save 2+ hours daily travel to
                  Delhi. Scored 348/360 in Biology with focused preparation. Dr. Shekhar Sir's
                  conceptual teaching made Botany easy. Weekly tests kept me on track."
                </p>
                <div className="mt-3 flex items-center text-sm text-purple-700">
                  <Trophy className="w-4 h-4 mr-1" />
                  <span className="font-semibold">348/360 Biology | Perfect Biology Score</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Online Classes Benefits for Gurugram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8"
          >
            {/* Google Maps */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <LazyGoogleMap
                embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.8904729344643!2d77.0426!3d28.4295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19e3f6f5f5f5%3A0x1234567890abcdef!2sM2K%20Corporate%20Park%2C%20Sector%2051%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1234567890"
                title="NEET Coaching Center Location - Gurugram"
                height={300}
                placeholder={{
                  lat: 28.4295,
                  lng: 77.0426,
                  address: "M2K Corporate Park, Sector 51, Gurugram"
                }}
              />
            </div>

            {/* Gurugram Benefits */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Our Gurugram Center is Perfect for You
              </h3>

              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      No Need to Travel to Delhi
                    </div>
                    <p className="text-sm text-gray-600">
                      Our M2K Corporate Park center in Sector 51 is just 10-15 minutes from DLF
                      Phases, Golf Course Road, and Sushant Lok areas. Save hours daily!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      Live Interactive Zoom Classes
                    </div>
                    <p className="text-sm text-gray-600">
                      Real-time doubt clearing for Sector 14, 43, 51, 56, 57, South City, New
                      Gurugram students. Same quality as offline classes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Recorded Lectures 24/7</div>
                    <p className="text-sm text-gray-600">
                      All classes recorded and available within 2 hours for unlimited revision from
                      anywhere in Gurugram - Ardee City, Heritage School area, or Cyber Hub.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Premium Quality at Home</div>
                    <p className="text-sm text-gray-600">
                      AIIMS-trained faculty teaching from your home. Perfect for students from
                      Lancers, GD Goenka, Scottish High, and all Gurugram schools.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  Book Free Demo Class from Gurugram
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Success Stories Section - Phase 3 */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Trophy className="w-4 h-4 mr-2" />
              Detailed Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Student Transformations: From Struggle to Medical College Success
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Read how our Gurugram students achieved remarkable score improvements and secured top
              government medical colleges through personalized mentoring and strategic preparation
            </p>
          </motion.div>

          {/* 3 Success Story Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Story 1: Arjun Mehta - Purple-pink gradient */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-2xl font-bold">Arjun Mehta</div>
                    <div className="text-sm opacity-90">GD Goenka Public School</div>
                  </div>
                  <GraduationCap className="w-10 h-10 opacity-80" />
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  ))}
                </div>
              </div>

              {/* Score Improvement Card */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-red-100 rounded-lg p-3 text-center">
                    <div className="text-xs text-red-600 font-semibold mb-1">Before</div>
                    <div className="text-xl font-bold text-red-700">545</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="bg-green-100 rounded-lg p-3 text-center">
                    <div className="text-xs text-green-600 font-semibold mb-1">After</div>
                    <div className="text-xl font-bold text-green-700">615</div>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    +70 Marks
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    AIR 2,340
                  </div>
                  <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                    ESI Medical
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <div className="absolute -top-2 -left-1 text-6xl text-purple-200 opacity-50">
                    &ldquo;
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed pl-6 italic">
                    After scoring only 545 in my first NEET attempt, I was devastated. My parents
                    suggested Cerebrum&apos;s online coaching instead of daily travel to Delhi
                    coaching centers. Living in DLF Phase 4, the commute was a major concern.
                    Initially skeptical about online classes, I was amazed by the quality - HD
                    video, small batch of just 15 students, and Dr. Shekhar Sir&apos;s incredible
                    teaching made Biology come alive.
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed mt-2 italic">
                    The flexibility was perfect for a dropper like me - I could attend evening
                    batches from my Gurugram home while managing other responsibilities. The faculty
                    identified my weaknesses in Human Physiology and Genetics, providing customized
                    practice sheets and dedicated doubt sessions via video calls. Weekly mock tests
                    helped me track improvement consistently. The recorded lectures were invaluable
                    during revision - I could rewatch difficult topics like Molecular Basis of
                    Inheritance multiple times. Improved by 70 marks to score 615 and secured ESI
                    Medical College. Best decision joining Cerebrum online from Gurugram!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Story 2: Sneha Kapoor - Red-orange gradient */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-2xl font-bold">Sneha Kapoor</div>
                    <div className="text-sm opacity-90">Scottish High International</div>
                  </div>
                  <Trophy className="w-10 h-10 opacity-80" />
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  ))}
                </div>
              </div>

              {/* Score Improvement Card */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-red-100 rounded-lg p-3 text-center">
                    <div className="text-xs text-red-600 font-semibold mb-1">Mock</div>
                    <div className="text-xl font-bold text-red-700">580</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="bg-green-100 rounded-lg p-3 text-center">
                    <div className="text-xs text-green-600 font-semibold mb-1">After</div>
                    <div className="text-xl font-bold text-green-700">670</div>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    +90 Marks
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    AIR 890
                  </div>
                  <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold">
                    AFMC Pune
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <div className="absolute -top-2 -left-1 text-6xl text-red-200 opacity-50">
                    &ldquo;
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed pl-6 italic">
                    AFMC was my dream - one of the toughest medical entrances in India. I scored 580
                    in early mocks and knew I needed exceptional coaching. Living in Golf Course
                    Road area, my parents explored coaching institutes but the daily commute to
                    Delhi seemed impractical. Cerebrum&apos;s online classes were game-changing -
                    AIIMS-trained faculty who understood both NEET and AFMC patterns inside-out.
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed mt-2 italic">
                    What set Cerebrum apart was the dual preparation strategy - NEET excellence plus
                    AFMC-specific coaching. The faculty provided separate sessions on AFMC exam
                    patterns, intelligence tests, and interview preparation alongside regular NEET
                    classes. Daily online practice with previous year AFMC questions, personalized
                    mentoring calls twice a week, and strategic time management techniques helped me
                    excel. The small online batch (only 12 students in my group) ensured individual
                    attention to my weak areas - Ecology and Evolution. Scored 670 in NEET with AIR
                    890 and cleared AFMC entrance and interview. Online coaching from Gurugram made
                    my AFMC dream reality!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Story 3: Tanvi Sharma - Green-teal gradient */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-2xl font-bold">Tanvi Sharma</div>
                    <div className="text-sm opacity-90">The Shri Ram School</div>
                  </div>
                  <Award className="w-10 h-10 opacity-80" />
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  ))}
                </div>
              </div>

              {/* Score Improvement Card */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-red-100 rounded-lg p-3 text-center">
                    <div className="text-xs text-red-600 font-semibold mb-1">Mock</div>
                    <div className="text-xl font-bold text-red-700">560</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="bg-green-100 rounded-lg p-3 text-center">
                    <div className="text-xs text-green-600 font-semibold mb-1">After</div>
                    <div className="text-xl font-bold text-green-700">655</div>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    +95 Marks
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    AIR 1,480
                  </div>
                  <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-semibold">
                    PGI Rohatak
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <div className="absolute -top-2 -left-1 text-6xl text-green-200 opacity-50">
                    &ldquo;
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed pl-6 italic">
                    I had access to good schools in Sushant Lok but needed specialized NEET
                    coaching. After scoring 560 in my first mock test, I realized school preparation
                    wasn&apos;t enough. My parents explored coaching institutes but the 2-3 hour
                    daily commute across the Delhi border seemed impractical. That&apos;s when we
                    discovered Cerebrum&apos;s online coaching - perfect solution!
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed mt-2 italic">
                    Dr. Shekhar Sir&apos;s teaching methodology was phenomenal - he made complex
                    Botany topics like Plant Physiology and Molecular Biology so simple with
                    real-life examples and clinical case studies. The online format had unexpected
                    advantages - recorded lectures available 24/7 meant I could revise difficult
                    chapters multiple times at my own pace. Weekly online tests with detailed
                    performance analysis helped identify weak areas systematically. The faculty
                    provided personalized study plans targeting my weaknesses in Ecology and
                    Biotechnology with extra practice modules and one-on-one doubt sessions.
                    Improved from 560 to 655 (95 marks jump!), secured AIR 1,480 and got PGI Rohatak
                    - a top government medical college!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 rounded-2xl p-8 text-white shadow-2xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Proven Success Across All Batches
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">+85</div>
                <div className="text-sm md:text-base opacity-90">Average Marks Improvement</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">647</div>
                <div className="text-sm md:text-base opacity-90">Average Final NEET Score</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
                <div className="text-sm md:text-base opacity-90">Success Rate (2024 Batch)</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">800+</div>
                <div className="text-sm md:text-base opacity-90">Gurugram Students Placed</div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 mb-4">
                <p className="text-sm font-semibold">
                  Featured Colleges: ESI Medical College, AFMC Pune, PGI Rohatak
                </p>
              </div>
              <div>
                <Button
                  onClick={handleDemoBooking}
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Start Your Success Story Today
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges Section - Phase 4 */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why 800+ Gurugram Students Trust Cerebrum Biology Academy
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every credential verified, every promise delivered
            </p>
          </motion.div>

          {/* 6 Trust Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Badge 1: 15+ Years of Excellence */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6"
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">15+</div>
              <div className="text-lg font-semibold text-gray-700 mb-3">Years of Excellence</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Established NEET coaching institute since 2009. Over a decade of proven track record
                helping thousands of students achieve medical college admissions through expert
                teaching methods.
              </p>
            </motion.div>

            {/* Badge 2: 800+ Gurugram Students */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6"
            >
              <div className="bg-gradient-to-br from-green-600 to-teal-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">800+</div>
              <div className="text-lg font-semibold text-gray-700 mb-3">
                Gurugram Students Placed
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Students from DLF Phases 1-5, Golf Course Road, Sushant Lok, Sector 14-57, South
                City, New Gurugram, and all premium areas trust us for NEET Biology excellence.
                Proven results across Gurugram.
              </p>
            </motion.div>

            {/* Badge 3: 4.9/5 Google Rating */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6"
            >
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-10 h-10 text-white fill-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">4.9/5</div>
              <div className="text-lg font-semibold text-gray-700 mb-3">Google Rating</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Based on 400+ verified student and parent reviews. Students consistently praise
                teaching quality, study material, doubt resolution, and personalized attention that
                helped them achieve NEET goals.
              </p>
            </motion.div>

            {/* Badge 4: AIIMS Trained Faculty */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6"
            >
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">AIIMS</div>
              <div className="text-lg font-semibold text-gray-700 mb-3">Faculty Excellence</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dr. Shekhar C Singh (AIIMS New Delhi Alumnus) leads our team. 15+ years of NEET
                coaching experience with deep understanding of exam patterns and high-yield topics.
              </p>
            </motion.div>

            {/* Badge 5: 98% Success Rate */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">98%</div>
              <div className="text-lg font-semibold text-gray-700 mb-3">
                NEET Qualification Rate
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                2024 batch success rate. 650+ students qualified NEET with our coaching, many
                securing ranks under 2000 AIR and admissions to AIIMS, JIPMER, and top government
                medical colleges.
              </p>
            </motion.div>

            {/* Badge 6: Live Online Classes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6"
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <Monitor className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">LIVE</div>
              <div className="text-lg font-semibold text-gray-700 mb-3">
                Online Classes Available
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                HD Zoom classes accessible from all Gurugram areas. Small batches (15-20 students),
                live doubt clearing, recorded lectures, and same quality as offline coaching.
                Perfect for DLF, Golf Course Road, Sushant Lok students.
              </p>
            </motion.div>
          </div>

          {/* Bottom CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Join 800+ Successful Gurugram Students
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Start your NEET journey with expert guidance, proven methods, and personalized support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleDemoBooking}
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Book Free Demo Class
              </Button>
              <Link href="tel:+918826444334">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 88264 44334
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Free NEET Tools Section */}
      <NEETToolsWidget
        title="Free NEET Preparation Tools"
        subtitle="Boost your preparation with our AI-powered tools - 100% Free for Gurugram students"
      />

      {/* School-Specific NEET Coaching Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              School-Specific NEET Coaching
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We serve students from all major Gurugram schools with batch timings aligned to their schedules
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'DPS Gurugram', href: '/biology-classes-dps-gurgaon', students: '85+' },
              { name: 'Amity International', href: '/biology-classes-amity-gurgaon', students: '45+' },
              { name: 'GD Goenka World School', href: '/biology-classes-gd-goenka-gurgaon', students: '55+' },
              { name: 'The Shri Ram School', href: '/biology-classes-shri-ram-school-gurgaon', students: '65+' },
              { name: 'Scottish High International', href: '/biology-classes-scottish-high-gurgaon', students: '40+' },
              { name: 'Heritage Xperiential', href: '/biology-classes-heritage-school-gurgaon', students: '25+' },
              { name: 'Suncity World School', href: '/biology-classes-suncity-school-gurgaon', students: '35+' },
              { name: 'Manav Rachna School', href: '/biology-classes-manav-rachna-gurgaon', students: '30+' },
            ].map((school, index) => (
              <motion.div
                key={school.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={school.href}>
                  <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-1">{school.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-semibold">{school.students} students</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Board-Specific Coaching Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Board-Specific NEET Coaching
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Specialized programs aligned with your board syllabus for seamless NEET preparation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href="/cbse-neet-coaching-gurugram">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-blue-100">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">CBSE Board Students</h3>
                  <p className="text-gray-600 mb-4">100% NCERT-aligned coaching. Perfect for DPS, Shri Ram, GD Goenka students.</p>
                  <div className="flex items-center text-blue-600 font-semibold">
                    <span>View CBSE Program</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Link href="/icse-neet-coaching-gurugram">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-purple-100">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">ICSE/ISC Board Students</h3>
                  <p className="text-gray-600 mb-4">ICSE-to-NCERT bridge program. For Pathways, Lancers, Suncity students.</p>
                  <div className="flex items-center text-purple-600 font-semibold">
                    <span>View ICSE Program</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link href="/haryana-board-neet-coaching-gurugram">
                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-green-100">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Haryana Board Students</h3>
                  <p className="text-gray-600 mb-4">Hindi + English bilingual support. Affordable fees starting ₹35,000.</p>
                  <div className="flex items-center text-green-600 font-semibold">
                    <span>View HBSE Program</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Pages Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Explore More NEET Resources</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/neet-coaching-near-me-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">NEET Coaching Near Me</h3>
              <p className="text-sm text-gray-600">Find coaching by location</p>
            </Link>
            <Link href="/online-neet-classes-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">Online NEET Classes</h3>
              <p className="text-sm text-gray-600">Live interactive sessions</p>
            </Link>
            <Link href="/neet-study-material-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">NEET Study Material</h3>
              <p className="text-sm text-gray-600">Notes, MCQs, tests</p>
            </Link>
            <Link href="/neet-dropper-batch-2025-26-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">Dropper Batch 2025-26</h3>
              <p className="text-sm text-gray-600">Intensive preparation</p>
            </Link>
          </div>
          <div className="grid md:grid-cols-4 gap-4 mt-4">
            <Link href="/neet-result-2025-gurugram" className="bg-green-50 p-4 rounded-xl hover:shadow-md transition-shadow border border-green-100">
              <h3 className="font-semibold text-green-700">NEET 2025 Results</h3>
              <p className="text-sm text-gray-600">97% success rate</p>
            </Link>
            <Link href="/neet-topper-interview-gurugram" className="bg-purple-50 p-4 rounded-xl hover:shadow-md transition-shadow border border-purple-100">
              <h3 className="font-semibold text-purple-700">Topper Interviews</h3>
              <p className="text-sm text-gray-600">Learn from 650+ scorers</p>
            </Link>
            <Link href="/neet-biology-faculty-gurugram" className="bg-blue-50 p-4 rounded-xl hover:shadow-md transition-shadow border border-blue-100">
              <h3 className="font-semibold text-blue-700">Our Faculty</h3>
              <p className="text-sm text-gray-600">AIIMS-trained teachers</p>
            </Link>
            <Link href="/free-neet-demo-class-gurugram" className="bg-amber-50 p-4 rounded-xl hover:shadow-md transition-shadow border border-amber-100">
              <h3 className="font-semibold text-amber-700">Free Demo Class</h3>
              <p className="text-sm text-gray-600">Experience our teaching</p>
            </Link>
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
              Frequently Asked Questions - NEET Coaching Gurugram
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
                  <MessageCircle className="w-6 h-6 mr-3 text-green-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from Gurugram Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS trained faculties, 2,100+ Gurugram students. No Delhi travel
              required!
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
                  className="border-white text-white hover:bg-white hover:text-green-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All Gurugram Areas</span>
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
                <span>No Delhi Travel</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group"
      >
        {/* Hover Tooltip */}
        <div className="absolute bottom-full mb-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            Chat with us on WhatsApp
          </div>
        </div>

        {/* WhatsApp Button */}
        <Link
          href="https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20NEET%20Biology%20coaching%20for%20Gurgaon%20students%20(DLF%20Phases%2C%20Golf%20Course%20Road%2C%20Sushant%20Lok%20area).%20I'd%20like%20to%20know%20about%20live%20online%20class%20timings%2C%20batch%20dates%2C%20fees%2C%20and%20demo%20classes.%20I'm%20from%20Gurgaon."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 text-white" />
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white" />
        </Link>
      </motion.div>

      {/* Schema Markup for SEO */}
      <LocalBusinessSchema />
      <GurugramServiceSchema />
      <FAQSchema />
      <DrShekharSinghSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'NEET Coaching', url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram' },
          { name: 'Gurugram', url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram' },
        ]}
      />
      <SpeakableSchema
        name="NEET Coaching in Gurugram"
        description="Best NEET Biology coaching in Gurugram with AIIMS faculty. Small batches of 15 students, 98% success rate."
        speakableSelectors={['h1', '.quick-answer', '.hero-description']}
        url="https://cerebrumbiologyacademy.com/neet-coaching-gurugram"
      />

      {/* Video Testimonial Schemas */}
      <VideoSchema
        name="Sadhna Sirin - 695/720 NEET 2023 Delhi-NCR Topper Testimonial"
        description="Sadhna Sirin shares her journey to scoring 695/720 in NEET 2023 with 100 Percentile in Biology. Learn how Dr. Shekhar's teaching methods at Cerebrum Biology Academy helped her achieve this exceptional score."
        thumbnailUrl="https://img.youtube.com/vi/bk6wQCh6b9w/maxresdefault.jpg"
        uploadDate="2023-08-15"
        duration="PT5M30S"
        embedUrl="https://www.youtube.com/embed/bk6wQCh6b9w"
        interactionCount={15000}
      />
      <VideoSchema
        name="Abhisek - AFMC Pune Selection Success Story"
        description="Abhisek shares his experience preparing for NEET and AFMC entrance with Cerebrum Biology Academy. Hear how personalized mentoring and rigorous preparation helped him crack AFMC Pune."
        thumbnailUrl="https://img.youtube.com/vi/NfhkGqOQXzk/maxresdefault.jpg"
        uploadDate="2023-09-10"
        duration="PT4M45S"
        embedUrl="https://www.youtube.com/embed/NfhkGqOQXzk"
        interactionCount={8500}
      />
      <VideoSchema
        name="Nishita - 6-Month Intensive NEET Program Success"
        description="Nishita's transformation story - how the 6-month intensive NEET program at Cerebrum Biology Academy helped her secure admission to a government medical college."
        thumbnailUrl="https://img.youtube.com/vi/t5F8RBuHITM/maxresdefault.jpg"
        uploadDate="2023-10-05"
        duration="PT6M20S"
        embedUrl="https://www.youtube.com/embed/t5F8RBuHITM"
        interactionCount={12000}
      />

      {/* Topic Cluster Schema - Related Content */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'NEET Coaching Gurugram - Related Resources',
            description: 'Comprehensive resources for NEET preparation in Gurugram',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'How to Prepare for NEET in Gurugram',
                url: 'https://cerebrumbiologyacademy.com/how-to-prepare-for-neet-in-gurugram',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'NEET Coaching Fee Comparison Gurugram',
                url: 'https://cerebrumbiologyacademy.com/neet-coaching-fee-gurugram',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Top 5 NEET Coaching in Gurugram',
                url: 'https://cerebrumbiologyacademy.com/top-5-neet-coaching-gurugram',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'NEET Biology Chapter Weightage',
                url: 'https://cerebrumbiologyacademy.com/neet-biology-chapter-weightage-gurugram',
              },
              {
                '@type': 'ListItem',
                position: 5,
                name: 'NEET Coaching Reviews Gurugram',
                url: 'https://cerebrumbiologyacademy.com/neet-coaching-reviews-gurugram',
              },
              {
                '@type': 'ListItem',
                position: 6,
                name: 'Dr. Shekhar Singh - NEET Biology Faculty',
                url: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty',
              },
            ],
          }),
        }}
      />
    </div>
  )
}
