'use client'

import Link from 'next/link'
import {
  GraduationCap,
  Users,
  Trophy,
  Clock,
  CheckCircle,
  Star,
  BookOpen,
  Calendar,
  Phone,
  Video,
} from 'lucide-react'

const batchTypes = [
  {
    name: 'Regular Batch',
    duration: '12 months',
    schedule: 'Mon-Fri, 6 AM / 4 PM / 7 PM',
    features: ['Complete Zoology Coverage', 'Weekly Tests', 'Doubt Sessions', 'Study Material'],
  },
  {
    name: 'Crash Course',
    duration: '3-4 months',
    schedule: 'Daily Classes',
    features: ['Intensive Revision', 'High-Yield Topics', 'Mock Tests', 'Quick Doubt Resolution'],
  },
  {
    name: 'Dropper Batch',
    duration: '10 months',
    schedule: 'Mon-Sat',
    features: ['Advanced Teaching', 'Focus on Weak Areas', 'Extensive Practice', 'Mentor Support'],
  },
]

const zoologyTopics = [
  { name: 'Human Physiology', chapters: 7, weightage: '20%' },
  { name: 'Human Reproduction', chapters: 2, weightage: '12%' },
  { name: 'Animal Kingdom', chapters: 2, weightage: '8%' },
  { name: 'Structural Organisation', chapters: 2, weightage: '4%' },
  { name: 'Evolution', chapters: 1, weightage: '4%' },
  { name: 'Human Health & Disease', chapters: 1, weightage: '4%' },
]

const faqs = [
  {
    question: 'What topics are covered in zoology classes?',
    answer:
      'Our zoology classes cover all NEET topics: Human Physiology (7 chapters), Human Reproduction, Animal Kingdom, Structural Organisation, Evolution, and Human Health & Disease.',
  },
  {
    question: 'What are the batch timings for zoology classes?',
    answer:
      'We offer flexible timings: 6 AM batch for early risers, 4 PM batch for school-goers, and 7 PM batch for those preferring evening classes. Weekend batches also available.',
  },
  {
    question: 'Is study material provided in zoology classes?',
    answer:
      'Yes, comprehensive study material including NCERT-based notes, diagram sheets, previous year questions, and practice MCQs are provided with all zoology batches.',
  },
  {
    question: 'Are online zoology classes available?',
    answer:
      'Yes! We offer both online and offline zoology classes. Online classes are live, interactive sessions with the same expert faculty teaching our offline batches.',
  },
]

export default function ZoologyClassesPage() {
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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-600 py-20 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative mx-auto px-4">
          <div
            className="mx-auto max-w-4xl text-center animate-fadeInUp"
          >
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              <Calendar className="mr-1 inline h-4 w-4" />
              Multiple Batch Timings Available
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Zoology Classes for NEET 2026
            </h1>
            <p className="mb-8 text-xl text-green-100">
              Join expert-led zoology batches covering 50% of NEET Biology. Regular, Crash Course &
              Dropper batches available in offline and online formats.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Batch Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-12 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Zoology Batch Options</h2>
            <p className="text-lg text-gray-600">Choose the batch that suits your preparation</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {batchTypes.map((batch, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-6 shadow-lg animate-fadeInUp"
              >
                <h3 className="mb-2 text-2xl font-bold text-green-600">{batch.name}</h3>
                <div className="mb-4 text-gray-600">
                  <p>
                    <Clock className="mr-2 inline h-4 w-4" />
                    Duration: {batch.duration}
                  </p>
                  <p>
                    <Calendar className="mr-2 inline h-4 w-4" />
                    {batch.schedule}
                  </p>
                </div>
                <ul className="space-y-2">
                  {batch.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Trophy, value: '67+', label: 'AIIMS Selections' },
              { icon: Users, value: '1,50,000+', label: 'Students Taught' },
              { icon: Star, value: '98%', label: 'Success Rate' },
              { icon: Video, value: 'Online + Offline', label: 'Class Modes' },
            ].map((stat, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-6 text-center shadow-lg animate-fadeInUp"
              >
                <stat.icon className="mx-auto mb-3 h-10 w-10 text-green-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-12 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Zoology Class Syllabus</h2>
            <p className="text-lg text-gray-600">Complete NEET zoology coverage in our classes</p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <div className="grid gap-4 md:grid-cols-2">
                {zoologyTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-4 animate-fadeInUp"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-900">{topic.name}</h4>
                      <p className="text-sm text-gray-600">{topic.chapters} chapters</p>
                    </div>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      {topic.weightage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-12 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              What&apos;s Included in Our Zoology Classes
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: 'Expert Faculty',
                desc: 'AIIMS-trained teachers with 15+ years of NEET teaching experience.',
              },
              {
                icon: BookOpen,
                title: 'Study Material',
                desc: 'Comprehensive NCERT-based notes, diagrams, and practice questions.',
              },
              {
                icon: CheckCircle,
                title: 'Regular Tests',
                desc: 'Weekly chapter tests and monthly mock tests with detailed analysis.',
              },
              {
                icon: Users,
                title: 'Doubt Sessions',
                desc: 'Dedicated doubt clearing sessions and one-on-one mentoring.',
              },
              {
                icon: Video,
                title: 'Recorded Classes',
                desc: 'Access to recorded lectures for revision and missed classes.',
              },
              {
                icon: Star,
                title: 'Progress Tracking',
                desc: 'Regular progress reports and performance analytics.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-6 shadow-lg animate-fadeInUp"
              >
                <feature.icon className="mb-4 h-10 w-10 text-green-600" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-12 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-6 shadow-lg animate-fadeInUp"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
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
              className="rounded-lg bg-indigo-100 px-4 py-2 text-indigo-700 transition hover:bg-indigo-200"
            >
              Zoology Teacher
            </Link>
            <Link
              href="/best-zoology-teacher-for-neet"
              className="rounded-lg bg-green-100 px-4 py-2 text-green-700 transition hover:bg-green-200"
            >
              Best Zoology Teacher for NEET
            </Link>
            <Link
              href="/botany-classes"
              className="rounded-lg bg-green-100 px-4 py-2 text-green-700 transition hover:bg-green-200"
            >
              Botany Classes
            </Link>
            <Link
              href="/biology-classes"
              className="rounded-lg bg-purple-100 px-4 py-2 text-purple-700 transition hover:bg-purple-200"
            >
              Biology Classes
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="mb-4 text-3xl font-bold">Enroll in Zoology Classes Today</h2>
            <p className="mb-8 text-xl text-green-100">
              New batches starting soon - secure your seat for NEET 2026!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-green-600 shadow-lg transition hover:bg-green-50"
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
          </div>
        </div>
      </section>
    </div>
  )
}
