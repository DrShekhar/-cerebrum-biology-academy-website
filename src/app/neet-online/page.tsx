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
  Globe,
  Laptop,
  Smartphone,
  Wifi,
  BookOpen,
  Target,
} from 'lucide-react'

const onlineBenefits = [
  {
    icon: Globe,
    title: 'Learn from Anywhere',
    desc: 'Access NEET preparation from any location in India or abroad.',
  },
  {
    icon: Laptop,
    title: 'Multi-Device Access',
    desc: 'Study on laptop, tablet, or smartphone - seamless experience.',
  },
  {
    icon: Video,
    title: 'Live + Recorded',
    desc: 'Attend live classes and watch recordings for revision.',
  },
  {
    icon: Target,
    title: 'Track Progress',
    desc: 'Monitor your preparation with detailed analytics.',
  },
]

const whatWeOffer = [
  { title: 'Live Interactive Classes', desc: 'Real-time learning with expert faculty' },
  { title: '500+ Video Lectures', desc: 'Comprehensive recorded content library' },
  { title: 'Practice Tests', desc: '10,000+ MCQs with detailed solutions' },
  { title: 'Doubt Support', desc: '24/7 doubt resolution via chat and sessions' },
  { title: 'Study Material', desc: 'Digital notes and PDF resources' },
  { title: 'Mock Tests', desc: 'Full-length NEET simulations' },
  { title: 'Previous Years', desc: '15+ years solved papers' },
  { title: 'Personal Mentor', desc: 'Dedicated guidance throughout your journey' },
]

const faqs = [
  {
    question: 'What is NEET online preparation?',
    answer:
      'NEET online preparation allows you to prepare for the medical entrance exam from anywhere using internet-based learning platforms. It includes live classes, video lectures, practice tests, and study materials accessible on any device.',
  },
  {
    question: 'Is online NEET preparation effective?',
    answer:
      'Yes! With the right platform, online NEET preparation is highly effective. Our online students have achieved the same success rates as offline students - 2,500+ selections with 98% success rate.',
  },
  {
    question: 'What do I need for NEET online study?',
    answer:
      'You need a laptop/tablet/smartphone with stable internet connection. Our platform works on minimum 2 Mbps connection and we also provide offline download options for recorded lectures.',
  },
  {
    question: 'Can I interact with teachers online?',
    answer:
      'Absolutely! Our live classes are interactive - you can ask questions, participate in discussions, and get instant doubt resolution. We also have dedicated doubt sessions and one-on-one mentoring.',
  },
]

export default function NeetOnlinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
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
      <section className="relative overflow-hidden bg-gradient-to-r from-cyan-600 to-teal-600 py-20 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              <Wifi className="mr-1 inline h-4 w-4" />
              Study NEET Online
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">NEET Online</h1>
            <p className="mb-8 text-xl text-cyan-100">
              Your complete NEET online preparation platform. Live classes, video lectures, practice
              tests, and expert guidance - all accessible from anywhere. Join 1,50,000+ students!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-cyan-600 shadow-lg transition hover:bg-cyan-50"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Learn More
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
              { icon: Users, value: '1,50,000+', label: 'Online Students' },
              { icon: Star, value: '98%', label: 'Success Rate' },
              { icon: Clock, value: '24/7', label: 'Access' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 text-center shadow-lg"
              >
                <stat.icon className="mx-auto mb-3 h-10 w-10 text-cyan-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Why Study NEET Online?</h2>
            <p className="text-lg text-gray-600">The smart way to prepare for medical entrance</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {onlineBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <benefit.icon className="mb-4 h-10 w-10 text-cyan-600" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">What We Offer</h2>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4 md:grid-cols-2">
              {whatWeOffer.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-lg"
                >
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Device Compatibility */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Study on Any Device</h2>
            <p className="text-lg text-gray-600">
              Our platform works seamlessly across all devices
            </p>
          </motion.div>

          <div className="mx-auto max-w-3xl">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { icon: Laptop, name: 'Laptop/Desktop', desc: 'Best for live classes' },
                { icon: Smartphone, name: 'Tablet', desc: 'Great for reading' },
                { icon: Smartphone, name: 'Mobile', desc: 'Learn on the go' },
              ].map((device, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl bg-white p-6 text-center shadow-lg"
                >
                  <device.icon className="mx-auto mb-4 h-12 w-12 text-cyan-600" />
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">{device.name}</h3>
                  <p className="text-gray-600">{device.desc}</p>
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
              href="/neet-online-classes"
              className="rounded-lg bg-indigo-100 px-4 py-2 text-indigo-700 transition hover:bg-indigo-200"
            >
              NEET Online Classes
            </Link>
            <Link
              href="/neet-online-course"
              className="rounded-lg bg-purple-100 px-4 py-2 text-purple-700 transition hover:bg-purple-200"
            >
              NEET Online Course
            </Link>
            <Link
              href="/neet-preparation"
              className="rounded-lg bg-emerald-100 px-4 py-2 text-emerald-700 transition hover:bg-emerald-200"
            >
              NEET Preparation
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-cyan-600 to-teal-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="mb-4 text-3xl font-bold">Start Your NEET Online Journey</h2>
            <p className="mb-8 text-xl text-cyan-100">
              Join thousands of successful NEET aspirants studying online!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-cyan-600 shadow-lg transition hover:bg-cyan-50"
              >
                Book Free Demo
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
