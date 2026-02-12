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
  Phone,
  Globe,
  GraduationCap,
  Award,
} from 'lucide-react'

const teacherCredentials = [
  { icon: GraduationCap, title: 'AIIMS Delhi', desc: 'Medical education background' },
  { icon: Clock, title: '15+ Years', desc: 'Teaching experience' },
  { icon: Trophy, title: '67+', desc: 'AIIMS selections' },
  { icon: Users, title: '1,50,000+', desc: 'Students taught' },
]

const teachingMethodology = [
  {
    title: 'NCERT-First Approach',
    desc: 'Every concept explained with NCERT references. Perfect for boards and NEET.',
  },
  {
    title: 'Visual Learning',
    desc: 'Complex diagrams simplified with animations and whiteboard explanations.',
  },
  {
    title: 'Conceptual Clarity',
    desc: 'Focus on understanding "why" before memorizing "what".',
  },
  {
    title: 'PYQ Integration',
    desc: 'Previous year questions discussed with every chapter.',
  },
  {
    title: 'Doubt Sessions',
    desc: 'Regular doubt clearing sessions to ensure no topic is left unclear.',
  },
  {
    title: 'Regular Testing',
    desc: 'Chapter-wise and full-length mock tests with detailed analysis.',
  },
]

const whyBestTeacher = [
  { metric: 'Experience', value: '15+ Years', detail: 'Teaching Biology for NEET and Boards' },
  { metric: 'Success Rate', value: '98%', detail: 'Students clearing NEET cutoff' },
  { metric: 'Selections', value: '67+', detail: 'AIIMS selections' },
  { metric: 'Top AIRs', value: '50+', detail: 'Students in Top 1000 AIR' },
  { metric: 'Rating', value: '4.9/5', detail: 'Average student rating' },
  { metric: 'Reach', value: 'Pan-India', detail: 'Students from all 28 states' },
]

const faqs = [
  {
    question: 'Who is the best biology teacher online in India?',
    answer:
      'The best online biology teacher should have strong academic credentials, proven results, and effective teaching methodology. At Cerebrum, our AIIMS-trained faculty with 15+ years experience and 67+ AIIMS selections is considered among the best biology teachers online in India.',
  },
  {
    question: 'What makes a biology teacher the best for online classes?',
    answer:
      'The best online biology teacher should: 1) Have medical/biology academic background, 2) Use NCERT-focused teaching, 3) Provide conceptual clarity with visual aids, 4) Have proven track record of results, 5) Offer interactive doubt resolution, 6) Be accessible for personalized guidance.',
  },
  {
    question: 'How can I find the best online teacher for biology?',
    answer:
      'To find the best online biology teacher: Check their qualifications (AIIMS/MBBS preferred), verify their track record (NEET selections), attend demo classes to experience teaching style, read student reviews, and ensure they cover NCERT thoroughly.',
  },
  {
    question: 'Is online biology teaching as effective as classroom teaching?',
    answer:
      'Yes, online biology teaching can be equally or more effective with the right teacher and platform. Our online students achieve 98% success rate - same as offline. Advantages include recorded access for revision, personalized attention, and flexibility.',
  },
  {
    question: 'What qualifications should the best biology teacher have?',
    answer:
      'The best biology teacher should have: Medical background (AIIMS/MBBS), 15+ years teaching experience, proven NEET results (1000+ selections), expertise in NCERT curriculum, and ability to explain complex concepts simply.',
  },
]

export default function BestBiologyTeacherOnlinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
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

      {/* Person Schema for Teacher */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Dr. Shekhar',
            jobTitle: 'Biology Teacher',
            worksFor: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
            description:
              'AIIMS-trained biology teacher with 15+ years experience and 67+ AIIMS selections',
            knowsAbout: ['Biology', 'NEET', 'Medical Entrance', 'NCERT Biology'],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-green-600 py-20 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                <Award className="mr-1 inline h-4 w-4" />
                AIIMS-Trained Faculty
              </span>
              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Best Biology Teacher Online
              </h1>
              <p className="mb-8 text-xl text-green-100">
                Learn from India&apos;s best online biology teacher with AIIMS background. 15+ years
                of experience, 67+ AIIMS selections, and a teaching methodology that makes biology
                simple and scoring.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/demo"
                  className="rounded-lg bg-white px-8 py-3 font-semibold text-green-600 shadow-lg transition hover:bg-green-50"
                >
                  Book Free Demo
                </Link>
                <Link
                  href="/contact"
                  className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Know More
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
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&h=600&fit=crop"
                  alt="Best Biology Teacher Online conducting class"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-800/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="rounded-lg bg-white/95 p-4 backdrop-blur">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">Dr. Shekhar</p>
                        <p className="text-sm text-gray-600">AIIMS-Trained Biology Expert</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-semibold">4.9</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Teacher Credentials */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {teacherCredentials.map((cred, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 text-center shadow-lg"
              >
                <cred.icon className="mx-auto mb-3 h-10 w-10 text-green-600" />
                <div className="text-2xl font-bold text-gray-900">{cred.title}</div>
                <div className="text-sm text-gray-600">{cred.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Best Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Why We&apos;re Considered the Best Online Biology Teacher
            </h2>
            <p className="text-lg text-gray-600">Numbers that speak for our teaching excellence</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyBestTeacher.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <p className="text-sm font-medium text-green-600">{item.metric}</p>
                <p className="my-2 text-3xl font-bold text-gray-900">{item.value}</p>
                <p className="text-gray-600">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Teaching Methodology</h2>
              <p className="mb-6 text-gray-600">
                What makes us the best online biology teacher? Our unique teaching approach that
                combines conceptual clarity with exam-oriented preparation.
              </p>
              <div className="space-y-4">
                {teachingMethodology.map((method, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{method.title}</h4>
                      <p className="text-sm text-gray-600">{method.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop"
                  alt="Biology teaching methodology - NCERT focused"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* All India Reach */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Globe className="mx-auto mb-4 h-12 w-12" />
            <h2 className="mb-4 text-3xl font-bold">Teaching Students Across India & Abroad</h2>
            <p className="mx-auto mb-8 max-w-2xl text-indigo-100">
              Our best biology teacher online reaches students in all 28 states of India plus NRI
              students in UAE, USA, UK, Singapore, and Australia. Quality education knows no
              boundaries.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'Delhi NCR',
                'Maharashtra',
                'Karnataka',
                'Tamil Nadu',
                'West Bengal',
                'Gujarat',
                'UAE',
                'USA',
              ].map((location, index) => (
                <span
                  key={index}
                  className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium"
                >
                  {location}
                </span>
              ))}
            </div>
          </motion.div>
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
              href="/online-biology-classes"
              className="rounded-lg bg-green-100 px-4 py-2 text-green-700 transition hover:bg-green-200"
            >
              Online Biology Classes
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
              href="/best-biology-teacher-for-neet"
              className="rounded-lg bg-green-100 px-4 py-2 text-green-700 transition hover:bg-green-200"
            >
              Best Biology Teacher for NEET
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="mb-4 text-3xl font-bold">Experience the Best Biology Teaching Online</h2>
            <p className="mb-8 text-xl text-green-100">
              Book a free demo class and see the difference yourself!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-green-600 shadow-lg transition hover:bg-green-50"
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
