'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
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
  GraduationCap,
  Play,
  MessageCircle,
  Calendar,
  MapPin,
} from 'lucide-react'

const classOptions = [
  {
    class: 'Class 9-10',
    focus: 'Foundation Building',
    topics: 'Basic Biology, Life Processes, Control & Coordination',
    neetRelevance: 'Strong foundation for NEET',
    color: 'bg-blue-500',
  },
  {
    class: 'Class 11',
    focus: 'NEET Foundation',
    topics: 'Diversity, Structural Organisation, Cell Biology, Plant Physiology',
    neetRelevance: '60% NEET weightage from Class 11',
    color: 'bg-emerald-500',
  },
  {
    class: 'Class 12',
    focus: 'NEET + Boards',
    topics: 'Reproduction, Genetics, Evolution, Ecology, Biotechnology',
    neetRelevance: '40% NEET weightage + Board Exams',
    color: 'bg-purple-500',
  },
  {
    class: 'Dropper Batch',
    focus: 'NEET Intensive',
    topics: 'Complete NEET syllabus revision with PYQ focus',
    neetRelevance: 'Target: NEET 2025/2026',
    color: 'bg-orange-500',
  },
]

const onlineFeatures = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    desc: 'Real-time sessions with two-way audio/video. Ask questions, get instant answers.',
  },
  {
    icon: Play,
    title: '500+ Recorded Lectures',
    desc: 'HD quality video library accessible 24/7. Learn at your own pace.',
  },
  {
    icon: MessageCircle,
    title: 'Doubt Resolution',
    desc: 'Dedicated doubt sessions. Get your queries resolved within 24 hours.',
  },
  {
    icon: BookOpen,
    title: 'Digital Study Material',
    desc: 'Comprehensive PDF notes, diagrams, and flowcharts for quick revision.',
  },
  {
    icon: Laptop,
    title: 'Multi-Device Access',
    desc: 'Learn on laptop, tablet, or smartphone. Seamless sync across devices.',
  },
  {
    icon: Wifi,
    title: 'Low Bandwidth Mode',
    desc: 'Works on 2 Mbps. Offline download option for recorded lectures.',
  },
]

const nriFeatures = [
  { title: 'Flexible Timings', desc: 'Multiple batch timings to suit different time zones' },
  { title: 'Weekend Batches', desc: 'Intensive Saturday-Sunday classes for working schedules' },
  { title: 'Recorded Access', desc: 'Watch lectures anytime - no timezone constraints' },
  { title: 'WhatsApp Support', desc: 'Quick doubt resolution via WhatsApp groups' },
]

const comparisonTable = [
  { feature: 'Quality of Teaching', online: 'AIIMS Faculty', local: 'Variable' },
  { feature: 'Study Material', online: 'NCERT-focused PDFs', local: 'Generic notes' },
  { feature: 'Cost (Annual)', online: '₹35,000 - ₹60,000', local: '₹80,000 - ₹1,50,000' },
  { feature: 'Flexibility', online: 'Learn anytime', local: 'Fixed schedule' },
  { feature: 'Revision Access', online: 'Unlimited recordings', local: 'No recordings' },
  { feature: 'Doubt Support', online: '24/7 via app', local: 'During class only' },
]

const faqs = [
  {
    question: 'What are the best online biology classes for Class 11?',
    answer:
      'The best online biology classes for Class 11 should cover NCERT syllabus thoroughly with NEET focus since 60% of NEET questions come from Class 11. Cerebrum Biology Academy offers AIIMS-trained faculty, live interactive sessions, and comprehensive coverage of all 5 units with NEET-oriented teaching.',
  },
  {
    question: 'How can I learn biology online effectively?',
    answer:
      'To learn biology online effectively: 1) Join live classes for real-time interaction, 2) Watch recorded lectures for revision, 3) Practice MCQs daily, 4) Use digital notes with diagrams, 5) Clear doubts immediately via doubt sessions. Our platform provides all these features for effective online learning.',
  },
  {
    question: 'Are online biology classes as good as offline coaching?',
    answer:
      'Yes, online biology classes can be equally effective with the right platform. Our online students achieve 98% success rate - same as offline batches. The advantages include flexible timing, recorded access for unlimited revision, and lower cost.',
  },
  {
    question: 'What is the fee for online biology classes?',
    answer:
      'Our online biology classes range from ₹35,000 to ₹60,000 annually depending on the course type. This includes live classes, recorded lectures, study material, test series, and doubt support - significantly lower than local coaching which costs ₹80,000-1,50,000.',
  },
  {
    question: 'Can NRI students join online biology classes?',
    answer:
      'Absolutely! We have students from UAE, USA, UK, Singapore, and Australia. We offer flexible batch timings, weekend classes, and 24/7 recorded access to accommodate different time zones. WhatsApp support ensures quick doubt resolution.',
  },
  {
    question: 'Do you provide online biology classes for NEET preparation?',
    answer:
      'Yes, our online biology classes are specifically designed for NEET preparation. Biology carries 360 marks (90 questions) in NEET - 50% of the total score. Our NEET-focused curriculum, PYQ analysis, and test series ensure comprehensive preparation.',
  },
]

export default function OnlineBiologyClassesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
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
            name: 'Online Biology Classes',
            description: 'Comprehensive online biology classes for Class 9-12 and NEET preparation',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            courseMode: 'online',
            educationalLevel: 'High School',
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'online',
              courseWorkload: 'PT500H',
            },
          }),
        }}
      />

      {/* Hero Section with Image */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-cyan-600 py-20 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                <Globe className="mr-1 inline h-4 w-4" />
                Learn from Anywhere in India or Abroad
              </span>
              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Online Biology Classes
              </h1>
              <p className="mb-8 text-xl text-teal-100">
                Join India&apos;s best online biology classes with AIIMS-trained faculty. Live
                interactive sessions, 500+ recorded lectures, and comprehensive NEET preparation.
                15,000+ students across India and abroad!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/demo"
                  className="rounded-lg bg-white px-8 py-3 font-semibold text-teal-600 shadow-lg transition hover:bg-teal-50"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/contact"
                  className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  View Curriculum
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop"
                  alt="Student learning biology online with laptop"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/90 p-4 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500">
                      <Play className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Live Class in Progress</p>
                      <p className="text-sm text-gray-600">Cell Biology - Mitochondria</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Users, value: '15,000+', label: 'Online Students' },
              { icon: Trophy, value: '98%', label: 'Success Rate' },
              { icon: Video, value: '500+', label: 'Video Hours' },
              { icon: Star, value: '4.9/5', label: 'Student Rating' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 text-center shadow-lg"
              >
                <stat.icon className="mx-auto mb-3 h-10 w-10 text-teal-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Class Options */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Online Biology Classes for All Levels
            </h2>
            <p className="text-lg text-gray-600">
              Choose the right program for your academic journey
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {classOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <div className={`mb-4 h-2 w-full rounded-full ${option.color}`} />
                <h3 className="mb-2 text-2xl font-bold text-gray-900">{option.class}</h3>
                <p className="mb-3 font-semibold text-teal-600">{option.focus}</p>
                <p className="mb-3 text-sm text-gray-600">{option.topics}</p>
                <div className="rounded-lg bg-teal-50 p-2 text-sm font-medium text-teal-700">
                  {option.neetRelevance}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Class 11 Special Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="relative h-[350px] w-full overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop"
                  alt="Biology education - cell structure"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
              <span className="mb-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                Most Popular
              </span>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Online Biology Classes for Class 11
              </h2>
              <p className="mb-6 text-gray-600">
                Class 11 Biology is the foundation of NEET success. 60% of NEET Biology questions
                come from Class 11 syllabus. Our online classes cover all 5 units with NEET focus:
              </p>
              <div className="space-y-3">
                {[
                  'Unit 1: Diversity in Living World (8%)',
                  'Unit 2: Structural Organisation (5%)',
                  'Unit 3: Cell Structure & Function (15%)',
                  'Unit 4: Plant Physiology (12%)',
                  'Unit 5: Human Physiology (20%)',
                ].map((unit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-gray-700">{unit}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/demo"
                className="mt-6 inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Join Class 11 Batch
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Online Features */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Why Learn Biology Online with Us?
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need for effective online learning
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {onlineFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <feature.icon className="mb-4 h-10 w-10 text-teal-600" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Online Classes vs Local Coaching
            </h2>
            <p className="text-lg text-gray-600">See why students prefer our online platform</p>
          </motion.div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl shadow-lg">
            <table className="w-full">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-center">Our Online Classes</th>
                  <th className="px-6 py-4 text-center">Local Coaching</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-teal-600">{row.online}</td>
                    <td className="px-6 py-4 text-center text-gray-500">{row.local}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* NRI Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
              <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                <MapPin className="mr-1 inline h-4 w-4" />
                For NRI Students
              </span>
              <h2 className="mb-4 text-3xl font-bold">
                Online Biology Classes for Students Abroad
              </h2>
              <p className="mb-6 text-indigo-100">
                Preparing for NEET from UAE, USA, UK, Singapore, or Australia? Our online platform
                is designed to help NRI students access quality biology education from anywhere in
                the world.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {nriFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-indigo-200" />
                    <div>
                      <h4 className="font-semibold">{feature.title}</h4>
                      <p className="text-sm text-indigo-200">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="grid grid-cols-2 gap-4"
            >
              {['UAE', 'USA', 'UK', 'Singapore', 'Australia', 'Canada'].map((country, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg bg-white/10 p-4 backdrop-blur"
                >
                  <Globe className="h-5 w-5" />
                  <span className="font-medium">{country}</span>
                </div>
              ))}
            </motion.div>
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
              href="/best-biology-teacher-online"
              className="rounded-lg bg-emerald-100 px-4 py-2 text-emerald-700 transition hover:bg-emerald-200"
            >
              Best Biology Teacher Online
            </Link>
            <Link
              href="/best-online-biology-teacher-for-neet"
              className="rounded-lg bg-purple-100 px-4 py-2 text-purple-700 transition hover:bg-purple-200"
            >
              Best Online Biology Teacher for NEET
            </Link>
            <Link
              href="/biology-tutor-online"
              className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition hover:bg-blue-200"
            >
              Biology Tutor Online
            </Link>
            <Link
              href="/online-neet-coaching"
              className="rounded-lg bg-indigo-100 px-4 py-2 text-indigo-700 transition hover:bg-indigo-200"
            >
              Online NEET Coaching
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="mb-4 text-3xl font-bold">Start Learning Biology Online Today</h2>
            <p className="mb-8 text-xl text-teal-100">
              Join 15,000+ students learning biology online from anywhere in the world!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-teal-600 shadow-lg transition hover:bg-teal-50"
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
