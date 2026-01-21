'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Users,
  Trophy,
  CheckCircle,
  Star,
  Video,
  Phone,
  BookOpen,
  GraduationCap,
  Play,
  Target,
  Globe,
  Clock,
  Laptop,
  MessageCircle,
  Calendar,
  DollarSign,
  MapPin,
} from 'lucide-react'

const nriRegions = [
  { name: 'USA & Canada', students: '4,500+', timezones: 'EST/PST' },
  { name: 'Middle East (UAE, Saudi, Qatar)', students: '3,200+', timezones: 'GST' },
  { name: 'UK & Europe', students: '1,800+', timezones: 'GMT/CET' },
  { name: 'Australia & New Zealand', students: '900+', timezones: 'AEST/NZST' },
  { name: 'Singapore & SE Asia', students: '1,100+', timezones: 'SGT' },
]

const features = [
  {
    icon: Clock,
    title: 'Multi-Timezone Classes',
    desc: 'Live classes scheduled for IST, EST, PST, GST, and SGT. Never miss a class wherever you are.',
  },
  {
    icon: Video,
    title: '500+ Recorded Lectures',
    desc: 'Access entire course recordings 24/7. Perfect for catching up across time zones.',
  },
  {
    icon: DollarSign,
    title: 'International Payment Options',
    desc: 'Pay in USD, GBP, AED, SGD, or AUD. Credit cards, PayPal, and wire transfer accepted.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Doubt Support',
    desc: 'Get doubts resolved within 12 hours. We respond across all timezones.',
  },
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    desc: 'Weekend intensives for working parents. Holiday batch options available.',
  },
  {
    icon: Laptop,
    title: 'Low Bandwidth Mode',
    desc: 'Classes work on 2 Mbps. Offline download available for areas with poor connectivity.',
  },
]

const faqs = [
  {
    question: 'Can NRI students prepare for NEET from abroad?',
    answer:
      'Absolutely! Thousands of NRI students prepare for NEET while studying abroad. Our online classes make this possible with flexible timings, recorded lectures, and comprehensive NCERT coverage. Many NRI students return to India only for the final 6 months before NEET.',
  },
  {
    question: 'What are the class timings for NRI students?',
    answer:
      'We offer multiple batch timings: Morning IST (6-8 AM) works for USA EST/PST evenings, Evening IST (6-8 PM) works for Middle East, and Weekend batches suit all timezones. All live classes are recorded for later viewing.',
  },
  {
    question: 'How do NRI students pay for classes?',
    answer:
      'We accept international payments via credit/debit cards (Visa, Mastercard, Amex), PayPal, and wire transfers. Fees can be paid in USD ($450-800/year), GBP (£350-650/year), AED (1,500-2,800/year), or INR. EMI options available.',
  },
  {
    question: 'Do you help with NEET registration for NRI candidates?',
    answer:
      'Yes! We provide complete guidance on NRI quota NEET registration, document requirements, and the 15% All India Quota process. Our counseling team helps NRI students navigate the admission process.',
  },
  {
    question: 'What curriculum do NRI students usually follow?',
    answer:
      "NRI students typically follow A-Level, IB, AP, or local curricula in their country. We provide NCERT bridge modules that cover the gap between international curricula and NEET syllabus. Whether you're in CBSE, IGCSE, or American high school system, we have a pathway for you.",
  },
]

export default function OnlineBiologyClassesNRIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
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

      {/* Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Online Biology Classes for NRI Students',
            description: 'NEET Biology preparation for Non-Resident Indian students worldwide',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            courseMode: 'online',
            educationalLevel: 'High School',
            areaServed: 'Worldwide',
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 py-20 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              <Globe className="h-4 w-4" />
              11,500+ NRI Students Across 40+ Countries
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Online Biology Classes for NRI Students
            </h1>
            <p className="mb-8 text-xl text-orange-100">
              NEET preparation from anywhere in the world. Flexible timings, international payments,
              and expert NCERT teaching for your child&apos;s medical dreams.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/demo-booking"
                className="flex items-center gap-2 rounded-lg bg-yellow-500 px-8 py-3 font-semibold text-black shadow-lg transition hover:bg-yellow-400"
              >
                <Play className="h-5 w-5" />
                Book Free Demo Class
              </Link>
              <a
                href="tel:+918826444334"
                className="flex items-center gap-2 rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                WhatsApp: +91 88264 44334
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Users, value: '11,500+', label: 'NRI Students' },
              { icon: Globe, value: '40+', label: 'Countries' },
              { icon: Trophy, value: '97%', label: 'Success Rate' },
              { icon: Star, value: '4.9/5', label: 'Parent Rating' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 text-center shadow-lg"
              >
                <stat.icon className="mx-auto mb-3 h-10 w-10 text-orange-500" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NRI Regions */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              NRI Students From Around the World
            </h2>
            <p className="text-lg text-gray-600">
              We serve Indian families in every major region
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {nriRegions.map((region, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <div className="mb-3 flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-orange-500" />
                  <h3 className="text-lg font-semibold text-gray-900">{region.name}</h3>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {region.students} students
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {region.timezones}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why NRI Parents Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Why NRI Parents Choose Cerebrum
            </h2>
            <p className="text-lg text-gray-600">
              Designed specifically for families living abroad
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <feature.icon className="mb-4 h-10 w-10 text-orange-500" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Bridge */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl"
          >
            <div className="mb-6 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-6 py-3 text-green-800">
                <Target className="h-5 w-5" />
                <span className="font-semibold">Curriculum Bridge Programs</span>
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                From Any Curriculum to NEET
              </h2>
              <p className="text-lg text-gray-700">
                Whether your child studies A-Level, IB, AP, or local curricula abroad, we bridge
                the gap to NCERT and NEET.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                'A-Level to NCERT bridge (60% overlap + gap modules)',
                'IB Biology to NEET conversion (65% overlap)',
                'AP Biology to NEET preparation (55% overlap)',
                'American High School to NCERT curriculum',
                'UK GCSE/A-Level to Indian medical entrance',
                'Middle East curriculum alignment',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-md"
                >
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Class Timings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Class Timing Options</h2>
            <p className="text-lg text-gray-600">Choose what works for your timezone</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'Morning Batch (IST)',
                time: '6:00 AM - 8:00 AM IST',
                works: 'USA (Evening) • Canada • UK (Morning)',
              },
              {
                name: 'Evening Batch (IST)',
                time: '6:00 PM - 8:00 PM IST',
                works: 'Middle East • Singapore • Australia',
              },
              {
                name: 'Weekend Intensive',
                time: 'Sat-Sun 10 AM - 2 PM IST',
                works: 'All timezones • Working parents',
              },
            ].map((batch, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-orange-50 p-6 shadow-lg"
              >
                <Clock className="mb-4 h-10 w-10 text-orange-500" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{batch.name}</h3>
                <p className="mb-2 font-medium text-orange-600">{batch.time}</p>
                <p className="text-sm text-gray-600">{batch.works}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">FAQs for NRI Parents</h2>
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

      {/* Related Links */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="mb-6 text-center text-xl font-semibold text-gray-900">
            Explore by Curriculum
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/online-biology-classes-international/a-level"
              className="rounded-lg bg-indigo-100 px-4 py-2 text-indigo-700 transition hover:bg-indigo-200"
            >
              A-Level Biology
            </Link>
            <Link
              href="/online-biology-classes-international/ib"
              className="rounded-lg bg-purple-100 px-4 py-2 text-purple-700 transition hover:bg-purple-200"
            >
              IB Biology
            </Link>
            <Link
              href="/online-biology-classes-international/ap"
              className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition hover:bg-blue-200"
            >
              AP Biology
            </Link>
            <Link
              href="/online-biology-classes-cbse"
              className="rounded-lg bg-green-100 px-4 py-2 text-green-700 transition hover:bg-green-200"
            >
              CBSE Classes
            </Link>
            <Link
              href="/online-biology-classes"
              className="rounded-lg bg-orange-100 px-4 py-2 text-orange-700 transition hover:bg-orange-200"
            >
              All Online Classes
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="mb-4 text-3xl font-bold">
              Join 11,500+ NRI Families Worldwide
            </h2>
            <p className="mb-8 text-xl text-orange-100">
              Your child&apos;s NEET dreams don&apos;t have to wait until you return to India
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo-booking"
                className="flex items-center gap-2 rounded-lg bg-yellow-500 px-8 py-3 font-semibold text-black shadow-lg transition hover:bg-yellow-400"
              >
                <Play className="h-5 w-5" />
                Book Free Demo Class
              </Link>
              <a
                href="https://wa.me/918826444334"
                target="_blank" rel="noopener noreferrer"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border-2 border-white px-8 py-3 font-semibold transition hover:bg-white/10"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
