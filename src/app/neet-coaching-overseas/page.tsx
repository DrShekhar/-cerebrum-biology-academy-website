'use client'

import { motion } from 'framer-motion'
import {
  Users,
  Trophy,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Globe,
  Plane,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const overseasRegions = [
  {
    name: 'Middle East (UAE, Saudi, Qatar)',
    slug: 'middle-east',
    students: '280+',
    countries: ['Dubai', 'Abu Dhabi', 'Riyadh', 'Doha', 'Kuwait', 'Bahrain'],
    timezone: 'GMT+3 to +4',
    priority: 'high',
  },
  {
    name: 'Southeast Asia',
    slug: 'southeast-asia',
    students: '120+',
    countries: ['Singapore', 'Malaysia', 'Thailand', 'Indonesia'],
    timezone: 'GMT+7 to +8',
    priority: 'high',
  },
  {
    name: 'USA & Canada',
    slug: 'north-america',
    students: '85+',
    countries: ['California', 'Texas', 'New Jersey', 'Toronto', 'Vancouver'],
    timezone: 'GMT-8 to -5',
    priority: 'medium',
  },
  {
    name: 'UK & Europe',
    slug: 'europe',
    students: '65+',
    countries: ['London', 'Manchester', 'Germany', 'France', 'Netherlands'],
    timezone: 'GMT to +2',
    priority: 'medium',
  },
  {
    name: 'Australia & NZ',
    slug: 'oceania',
    students: '45+',
    countries: ['Sydney', 'Melbourne', 'Perth', 'Auckland'],
    timezone: 'GMT+10 to +12',
    priority: 'medium',
  },
  {
    name: 'Africa',
    slug: 'africa',
    students: '35+',
    countries: ['Kenya', 'Nigeria', 'South Africa', 'Tanzania'],
    timezone: 'GMT+2 to +3',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time teaching with instant doubt resolution, recorded for later viewing',
  },
  {
    icon: Clock,
    title: 'Flexible Timing',
    description: 'Multiple batches across time zones - IST evening works for most regions',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculties',
    description: "Expert doctors trained at India's premier medical institutions",
  },
  {
    icon: BookOpen,
    title: 'Digital Study Material',
    description: 'Complete NCERT-based digital notes, accessible from anywhere in the world',
  },
  {
    icon: Globe,
    title: 'Worldwide Accessibility',
    description: 'Join from any country - all you need is internet connection',
  },
  {
    icon: Plane,
    title: 'Return to India Support',
    description:
      'Smooth transition guidance for NRI students moving to India for medical education',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '360', icon: Star },
  { label: 'Overseas Students', value: '630+', icon: Users },
  { label: 'Countries Served', value: '25+', icon: Globe },
]

const faqs = [
  {
    question: 'How do live classes work for students in different time zones?',
    answer:
      'We have multiple batch timings to accommodate different time zones. IST evening batches (5-9 PM) work well for Middle East, Southeast Asia, and even some European time zones. For USA students, we have weekend batches. All classes are recorded and available within hours for flexible viewing.',
  },
  {
    question: 'Is the NEET syllabus same for NRI students?',
    answer:
      'Yes, NEET syllabus is uniform for all candidates - Indian or NRI. The exam is entirely based on NCERT curriculum (Class 11 & 12). Whether you study in a CBSE school in Dubai or an international school in Singapore, our NCERT-focused approach ensures complete preparation.',
  },
  {
    question: 'Can students from international boards (IB, Cambridge) prepare for NEET?',
    answer:
      'Absolutely! Many of our overseas students come from IB, IGCSE, or Cambridge backgrounds. We provide bridge courses to help transition to NCERT-based preparation. Our faculty understand the differences and guide accordingly. Many IB/Cambridge students have cleared NEET with 600+ scores.',
  },
  {
    question: 'What about the NRI quota for medical admissions?',
    answer:
      'NRI students can apply under NRI quota in many medical colleges, which often has different cutoffs. We provide complete guidance on NRI quota admissions, documentation requirements, and counseling process. Our team helps navigate both NRI and general quota options.',
  },
  {
    question: 'How do doubt sessions and mentor support work across time zones?',
    answer:
      "We have dedicated WhatsApp groups and scheduled doubt sessions at multiple times. Our faculty are available for queries via WhatsApp/email throughout the day. Weekend mentor sessions accommodate various time zones. You'll never feel disconnected despite the distance.",
  },
  {
    question: 'Do you provide guidance for returning to India for NEET exam?',
    answer:
      'Yes! We help with exam center selection, travel planning around exam dates, accommodation guidance in major cities, and last-minute revision support. Many overseas students come 1-2 weeks before exam for intensive revision - we support that transition.',
  },
]

const whyOnline = [
  {
    icon: Globe,
    title: 'Study from Anywhere',
    description:
      'Dubai, Singapore, USA, UK - prepare for NEET from anywhere. No need to relocate to India for coaching.',
  },
  {
    icon: GraduationCap,
    title: 'Same Quality as India',
    description:
      'Get the same AIIMS-trained faculty, same materials, same attention as students in Delhi. Zero compromise.',
  },
  {
    icon: Award,
    title: 'NRI Quota Expertise',
    description:
      'Complete guidance on NRI quota admissions, documentation, and counseling process for medical colleges.',
  },
]

export default function NeetCoachingOverseasPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_overseas', {
        event_category: 'conversion',
        event_label: 'neet_coaching_overseas_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-indigo-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Globe className="w-5 h-5 mr-2" />
              Serving NRI Students Worldwide
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">NEET Coaching for NRI</span> & Overseas Students
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Middle East | Southeast Asia | USA | UK | Australia | Africa
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Prepare for NEET from anywhere in the world. AIIMS-trained faculty, flexible timings
              across time zones, and complete guidance for NRI quota admissions.
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
                  className="border-white text-white hover:bg-white hover:text-violet-900"
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

      {/* Regions Section */}
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
              NEET Coaching for NRI Students Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Dubai to California, Singapore to London - we serve NRI students preparing for
              NEET from every corner of the world.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {overseasRegions.map((region, index) => (
              <motion.div
                key={region.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${
                    region.priority === 'high' ? 'ring-2 ring-violet-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{region.name}</h3>
                    <Globe className="w-5 h-5 text-violet-600" />
                  </div>
                  <div className="text-2xl font-bold text-violet-600 mb-1">{region.students}</div>
                  <div className="text-sm text-gray-500 mb-2">Students enrolled</div>
                  <div className="text-xs text-violet-600 bg-violet-50 px-2 py-1 rounded inline-block mb-3">
                    {region.timezone}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {region.countries.slice(0, 4).map((country) => (
                      <span
                        key={country}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {country}
                      </span>
                    ))}
                    {region.countries.length > 4 && (
                      <span className="text-xs bg-violet-100 text-violet-600 px-2 py-1 rounded">
                        +{region.countries.length - 4} more
                      </span>
                    )}
                  </div>
                  {region.priority === 'high' && (
                    <div className="mt-3 inline-flex items-center text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 mr-1" />
                      High Student Count
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Online Section */}
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
              Why NRI Students Choose Our Online Coaching
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyOnline.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-8 border border-violet-100"
              >
                <item.icon className="w-12 h-12 text-violet-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Time Zone Info */}
      <section className="py-16 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-6">Class Timings Across Time Zones</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="font-bold text-lg">Middle East</div>
              <div className="text-sm opacity-80">2:30 PM - 6:30 PM GST</div>
              <div className="text-xs mt-1">Dubai, Riyadh, Doha</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="font-bold text-lg">Southeast Asia</div>
              <div className="text-sm opacity-80">7:30 PM - 11:30 PM SGT</div>
              <div className="text-xs mt-1">Singapore, Malaysia</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="font-bold text-lg">USA (Weekend)</div>
              <div className="text-sm opacity-80">7:30 AM - 11:30 AM EST</div>
              <div className="text-xs mt-1">Saturday/Sunday batches</div>
            </div>
          </div>
          <p className="mt-6 text-sm opacity-80">
            All classes are recorded and available within hours for flexible viewing
          </p>
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
              Why Choose Cerebrum for NEET Coaching Overseas?
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
                <feature.icon className="w-12 h-12 text-violet-600 mb-4" />
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
              Frequently Asked Questions - NRI NEET Coaching
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
                  <MessageCircle className="w-6 h-6 mr-3 text-violet-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from Overseas Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS trained faculties, 630+ NRI students. Study from anywhere in
              the world!
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
                  className="border-white text-white hover:bg-white hover:text-violet-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>25+ Countries</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Flexible Timing</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>NRI Quota Support</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>IB/Cambridge Bridge</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
