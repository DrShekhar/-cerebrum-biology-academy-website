'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Users,
  Trophy,
  Clock,
  CheckCircle,
  Star,
  Video,
  Phone,
  Calendar,
  Play,
  Headphones,
  BookOpen,
} from 'lucide-react'

const classFeatures = [
  {
    icon: Video,
    title: 'Live Interactive Sessions',
    desc: 'Real-time classes where you can ask questions and get instant answers from faculty.',
  },
  {
    icon: Play,
    title: 'Recorded Lectures',
    desc: 'Miss a class? No problem! Watch recordings anytime for revision.',
  },
  {
    icon: Headphones,
    title: 'Doubt Sessions',
    desc: 'Dedicated doubt clearing sessions after every chapter completion.',
  },
  {
    icon: BookOpen,
    title: 'Digital Notes',
    desc: 'Comprehensive PDF notes provided after each class for quick revision.',
  },
]

const classTimings = [
  { batch: 'Morning Batch', time: '6:00 AM - 8:00 AM', days: 'Mon-Fri' },
  { batch: 'Afternoon Batch', time: '4:00 PM - 6:00 PM', days: 'Mon-Fri' },
  { batch: 'Evening Batch', time: '7:00 PM - 9:00 PM', days: 'Mon-Fri' },
  { batch: 'Weekend Batch', time: '10:00 AM - 2:00 PM', days: 'Sat-Sun' },
]

const faqs = [
  {
    question: 'What are the timings for NEET online classes?',
    answer:
      'We offer multiple batch timings: Morning (6 AM), Afternoon (4 PM), Evening (7 PM) on weekdays, and Weekend batches (10 AM - 2 PM) on Saturdays and Sundays.',
  },
  {
    question: 'Are NEET online classes live or recorded?',
    answer:
      'Our NEET online classes are primarily live and interactive. All live classes are also recorded and made available for revision within 2 hours of the session.',
  },
  {
    question: 'How do I attend NEET online classes?',
    answer:
      'After enrollment, you receive login credentials for our learning platform. Classes can be attended on laptop, tablet, or smartphone with internet connection.',
  },
  {
    question: 'Can I ask doubts during online classes?',
    answer:
      'Yes! Our online classes are interactive. You can ask questions via chat during class, raise hand for audio questions, or attend dedicated doubt sessions.',
  },
]

export default function NeetOnlineClassesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
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
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 py-20 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              <Video className="mr-1 inline h-4 w-4" />
              Live + Recorded Classes
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">NEET Online Classes</h1>
            <p className="mb-8 text-xl text-indigo-100">
              Attend live interactive NEET classes from anywhere in India. Expert faculty, real-time
              doubt solving, and recorded lectures for revision. Multiple batch timings available!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-indigo-600 shadow-lg transition hover:bg-indigo-50"
              >
                Book Free Demo Class
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                View Schedule
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Trophy, value: '2,500+', label: 'NEET Selections' },
              { icon: Users, value: '1,50,000+', label: 'Students' },
              { icon: Star, value: '4.9/5', label: 'Class Rating' },
              { icon: Clock, value: '4', label: 'Batch Timings' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 text-center shadow-lg"
              >
                <stat.icon className="mx-auto mb-3 h-10 w-10 text-indigo-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Class Timings */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Online Class Timings</h2>
            <p className="text-lg text-gray-600">Choose a batch that suits your schedule</p>
          </motion.div>

          <div className="mx-auto max-w-3xl">
            <div className="grid gap-4 md:grid-cols-2">
              {classTimings.map((timing, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl bg-white p-6 shadow-lg"
                >
                  <Calendar className="mb-3 h-8 w-8 text-indigo-600" />
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{timing.batch}</h3>
                  <p className="text-2xl font-bold text-indigo-600">{timing.time}</p>
                  <p className="text-gray-600">{timing.days}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              What&apos;s Included in Online Classes
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {classFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <feature.icon className="mb-4 h-10 w-10 text-indigo-600" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">How Online Classes Work</h2>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { step: '1', title: 'Enroll', desc: 'Choose your batch and complete enrollment' },
                {
                  step: '2',
                  title: 'Get Access',
                  desc: 'Receive login credentials within 24 hours',
                },
                {
                  step: '3',
                  title: 'Start Learning',
                  desc: 'Join live classes and access recordings',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h3 className="mb-6 text-center text-xl font-semibold text-gray-900">
            Explore More Resources
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/online-neet-coaching"
              className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition hover:bg-blue-200"
            >
              Online NEET Coaching
            </Link>
            <Link
              href="/neet-online-course"
              className="rounded-lg bg-purple-100 px-4 py-2 text-purple-700 transition hover:bg-purple-200"
            >
              NEET Online Course
            </Link>
            <Link
              href="/neet-online"
              className="rounded-lg bg-indigo-100 px-4 py-2 text-indigo-700 transition hover:bg-indigo-200"
            >
              NEET Online
            </Link>
            <Link
              href="/neet-classes"
              className="rounded-lg bg-green-100 px-4 py-2 text-green-700 transition hover:bg-green-200"
            >
              NEET Classes
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="mb-4 text-3xl font-bold">Join NEET Online Classes Today</h2>
            <p className="mb-8 text-xl text-indigo-100">
              New batches starting soon - secure your seat for NEET 2026!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-indigo-600 shadow-lg transition hover:bg-indigo-50"
              >
                Book Free Demo Class
              </Link>
              <a
                href="tel:+918826444334"
                className="flex items-center gap-2 rounded-lg border-2 border-white px-8 py-3 font-semibold transition hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                Call: +91 88264 44334
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
