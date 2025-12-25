'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  GraduationCap,
  Users,
  Trophy,
  Clock,
  CheckCircle,
  Star,
  MapPin,
  Phone,
  Globe,
  Building2,
} from 'lucide-react'

const offlineCenters = [
  { name: 'Rohini Center', area: 'Sector 7, Rohini', city: 'Delhi' },
  { name: 'Gurugram Center', area: 'Sector 14', city: 'Haryana' },
  { name: 'South Extension', area: 'Part 2', city: 'Delhi' },
  { name: 'Faridabad Center', area: 'Sector 15', city: 'Haryana' },
]

const faqs = [
  {
    question: 'Is there a zoology teacher near me in Delhi NCR?',
    answer:
      'Yes! Cerebrum Biology Academy has 4 offline centers in Delhi NCR - Rohini, Gurugram, South Extension, and Faridabad. All centers feature expert zoology faculty with AIIMS training.',
  },
  {
    question: 'Can I get online zoology classes if no center is nearby?',
    answer:
      'Absolutely! We offer Pan-India online zoology classes with the same expert faculty. Students from across India can access our live interactive sessions.',
  },
  {
    question: 'What is the zoology teaching approach at your centers?',
    answer:
      'Our zoology teaching covers Human Physiology (20%), Human Reproduction (12%), and Animal Kingdom (8%) with detailed diagrams, NCERT line-by-line explanation, and previous year analysis.',
  },
  {
    question: 'How do I find the nearest zoology coaching center?',
    answer:
      'Contact us at +91 88264 44334 or book a free demo. We will guide you to the nearest center or help you enroll in our online batch if preferred.',
  },
]

export default function ZoologyTeacherNearMePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 py-20 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              <MapPin className="mr-1 inline h-4 w-4" />4 Centers in Delhi NCR + Pan-India Online
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Zoology Teacher Near Me
            </h1>
            <p className="mb-8 text-xl text-blue-100">
              Find expert zoology coaching at our offline centers in Delhi NCR or join our online
              classes from anywhere in India. 50% of NEET Biology covered!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50"
              >
                Book Free Demo Class
              </Link>
              <a
                href="tel:+918826444334"
                className="flex items-center gap-2 rounded-lg border-2 border-white px-8 py-3 font-semibold transition hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                Find Nearest Center
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Offline Centers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Offline Centers</h2>
            <p className="text-lg text-gray-600">
              Expert zoology teachers at 4 convenient locations in Delhi NCR
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {offlineCenters.map((center, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <Building2 className="mb-4 h-10 w-10 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{center.name}</h3>
                <p className="text-gray-600">{center.area}</p>
                <p className="text-sm text-gray-500">{center.city}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Option */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white md:p-12"
            >
              <div className="flex flex-col items-center gap-8 md:flex-row">
                <div className="flex-1">
                  <Globe className="mb-4 h-12 w-12" />
                  <h2 className="mb-4 text-3xl font-bold">No Center Nearby?</h2>
                  <p className="mb-6 text-blue-100">
                    Join our online zoology classes with the same expert AIIMS-trained faculty. Live
                    interactive sessions, doubt clearing, and complete NEET preparation - all from
                    the comfort of your home.
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Live interactive classes',
                      'Same expert faculty',
                      'Recorded sessions for revision',
                      'Pan-India access',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-cyan-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center">
                  <Link
                    href="/demo"
                    className="inline-block rounded-lg bg-white px-8 py-4 font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50"
                  >
                    Try Free Online Demo
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Trophy, value: '2,500+', label: 'NEET Selections' },
              { icon: Users, value: '1,50,000+', label: 'Students Taught' },
              { icon: Star, value: '4', label: 'Centers in NCR' },
              { icon: Clock, value: '15+', label: 'Years Experience' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 text-center shadow-lg"
              >
                <stat.icon className="mx-auto mb-3 h-10 w-10 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Why Choose Our Zoology Coaching
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: 'AIIMS-Trained Faculty',
                desc: 'Expert zoology teachers with medical background for clinical perspective.',
              },
              {
                icon: MapPin,
                title: 'Multiple Locations',
                desc: '4 convenient centers across Delhi NCR for easy access.',
              },
              {
                icon: Globe,
                title: 'Online Option',
                desc: 'Pan-India online classes for students outside Delhi NCR.',
              },
              {
                icon: CheckCircle,
                title: 'NCERT-Focused',
                desc: 'Line-by-line NCERT coverage essential for NEET zoology.',
              },
              {
                icon: Star,
                title: '50% Biology Coverage',
                desc: 'Complete zoology syllabus covering half of NEET Biology.',
              },
              {
                icon: Users,
                title: 'Small Batch Size',
                desc: 'Personalized attention with limited students per batch.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <feature.icon className="mb-4 h-10 w-10 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
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
              href="/zoology-teacher"
              className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition hover:bg-blue-200"
            >
              Zoology Teacher
            </Link>
            <Link
              href="/best-zoology-teacher-for-neet"
              className="rounded-lg bg-indigo-100 px-4 py-2 text-indigo-700 transition hover:bg-indigo-200"
            >
              Best Zoology Teacher for NEET
            </Link>
            <Link
              href="/zoology-classes"
              className="rounded-lg bg-cyan-100 px-4 py-2 text-cyan-700 transition hover:bg-cyan-200"
            >
              Zoology Classes
            </Link>
            <Link
              href="/botany-teacher-near-me"
              className="rounded-lg bg-green-100 px-4 py-2 text-green-700 transition hover:bg-green-200"
            >
              Botany Teacher Near Me
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="mb-4 text-3xl font-bold">Find Zoology Coaching Near You</h2>
            <p className="mb-8 text-xl text-blue-100">
              Visit our nearest center or join online - expert zoology teaching awaits!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50"
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
