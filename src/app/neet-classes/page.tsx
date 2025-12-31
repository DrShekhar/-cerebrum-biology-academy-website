'use client'

import { motion } from 'framer-motion'
import {
  Video,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  MessageCircle,
  Play,
  ArrowRight,
  Monitor,
  Wifi,
  Calendar,
  FileText,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const classTypes = [
  {
    icon: Monitor,
    title: 'Live Interactive Classes',
    description: 'Real-time teaching via Zoom/Google Meet with instant doubt resolution.',
    features: ['Live Q&A', 'Screen sharing', 'Recorded for revision'],
  },
  {
    icon: Users,
    title: 'Offline Classes',
    description: 'In-person classes at our 4 centres across Delhi NCR.',
    features: ['Face-to-face', 'Lab facilities', 'Peer learning'],
  },
  {
    icon: Video,
    title: 'Recorded Lectures',
    description: 'Access to recorded classes for revision and missed sessions.',
    features: ['Anytime access', 'Speed control', 'Mobile friendly'],
  },
  {
    icon: MessageCircle,
    title: 'Doubt Sessions',
    description: 'Dedicated doubt clearing sessions and 24/7 WhatsApp support.',
    features: ['Daily sessions', 'WhatsApp support', 'One-on-one'],
  },
]

const batchTimings = [
  {
    name: 'Morning Batch',
    time: '8:00 AM - 12:00 PM',
    description: 'Ideal for dropper students and serious aspirants',
    availability: 'Mon-Sat',
  },
  {
    name: 'Afternoon Batch',
    time: '1:00 PM - 5:00 PM',
    description: 'For students with morning school',
    availability: 'Mon-Sat',
  },
  {
    name: 'Evening Batch',
    time: '5:00 PM - 9:00 PM',
    description: 'For school students and working professionals',
    availability: 'Mon-Sat',
  },
  {
    name: 'Weekend Batch',
    time: '9:00 AM - 5:00 PM',
    description: 'Intensive weekend classes',
    availability: 'Sat-Sun',
  },
]

const features = [
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Expert teachers with medical background and 10+ years experience.',
  },
  {
    icon: Users,
    title: 'Small Batch Size',
    description: 'Maximum 10-15 students per batch for personalized attention.',
  },
  {
    icon: BookOpen,
    title: 'Complete Study Material',
    description: 'NCERT-based notes, question banks, and mock tests.',
  },
  {
    icon: Calendar,
    title: 'Regular Assessments',
    description: 'Weekly tests and monthly mock exams with analysis.',
  },
  {
    icon: Wifi,
    title: 'Online + Offline',
    description: 'Flexible mode - attend online or at our centres.',
  },
  {
    icon: FileText,
    title: 'Previous Year Papers',
    description: 'Solved NEET papers with detailed explanations.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Batch Size', value: '10-15', icon: Users },
  { label: 'Daily Classes', value: '4 hrs', icon: Clock },
  { label: 'Top Score', value: '720', icon: Star },
]

const faqs = [
  {
    question: 'What types of NEET classes do you offer?',
    answer:
      'We offer live interactive online classes, offline classroom sessions at our 4 centres (Rohini, Gurugram, South Extension, Faridabad), recorded lectures for revision, and dedicated doubt clearing sessions. You can choose the mode that suits you best.',
  },
  {
    question: 'What are the NEET class timings?',
    answer:
      'We have multiple batches - Morning (8 AM - 12 PM), Afternoon (1 PM - 5 PM), Evening (5 PM - 9 PM), and Weekend batches. Each student attends 4 hours of classes daily, 6 days a week.',
  },
  {
    question: 'Are NEET classes available near me?',
    answer:
      'We have offline NEET classes at 4 locations in Delhi NCR. If you are not near any centre, join our online live classes. We serve students across India and overseas with the same quality teaching.',
  },
  {
    question: 'What is the batch size for NEET classes?',
    answer:
      'We maintain small batches of 10-15 students to ensure personal attention for every student. This allows teachers to understand individual weaknesses and help accordingly.',
  },
  {
    question: 'Can I join NEET coaching classes mid-year?',
    answer:
      'Yes, you can join our NEET classes at any time. We have continuous enrollment with new batches starting every month. We also provide makeup classes for topics already covered.',
  },
]

export default function NeetClassesPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_classes', {
        event_category: 'conversion',
        event_label: 'neet_classes_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-indigo-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Video className="w-5 h-5 mr-2 text-yellow-300" />
              Live Interactive Classes | Online & Offline
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">NEET Classes</span> Near Me
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Live Classes | Small Batches | Expert Faculty | Flexible Timings
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Join the best NEET coaching classes with live interactive sessions, AIIMS-trained
              faculty, and personalized attention. Choose online or offline mode based on your
              convenience.
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
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Class Schedule
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

      {/* Class Types */}
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
              Types of NEET Classes We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the learning mode that suits your style and convenience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <type.icon className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Batch Timings */}
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
              NEET Class Timings
            </h2>
            <p className="text-xl text-gray-600">Flexible batch timings to fit your schedule</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {batchTimings.map((batch, index) => (
              <motion.div
                key={batch.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-orange-50 rounded-xl p-6 border border-orange-100"
              >
                <Clock className="w-10 h-10 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-1">{batch.name}</h3>
                <div className="text-2xl font-bold text-orange-600 mb-2">{batch.time}</div>
                <p className="text-gray-600 text-sm mb-2">{batch.description}</p>
                <div className="text-sm text-gray-500">{batch.availability}</div>
              </motion.div>
            ))}
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
              What You Get in Our NEET Classes
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
              FAQs - NEET Classes
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
      <section className="py-20 bg-gradient-to-r from-orange-600 via-red-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Join Our NEET Classes Today</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, small batches, flexible timings. Start your NEET preparation now!
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
                <span>Live Classes</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Small Batches</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Expert Faculty</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>98% Success</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/best-neet-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Best NEET Coaching
            </Link>
            <Link
              href="/neet-coaching-centre"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Coaching Centre
            </Link>
            <Link
              href="/neet-coaching-institute"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Coaching Institute
            </Link>
            <Link
              href="/neet-preparation"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Preparation
            </Link>
            <Link
              href="/neet-biology-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Biology Classes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
