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
  Target,
  Award,
  Phone,
} from 'lucide-react'

const zoologyTopics = [
  { name: 'Human Physiology', questions: '18-20', percentage: '20%', color: 'bg-indigo-500' },
  { name: 'Human Reproduction', questions: '10-12', percentage: '12%', color: 'bg-purple-500' },
  { name: 'Animal Kingdom', questions: '6-8', percentage: '8%', color: 'bg-blue-500' },
  { name: 'Structural Organisation', questions: '3-4', percentage: '4%', color: 'bg-blue-500' },
  { name: 'Evolution', questions: '3-4', percentage: '4%', color: 'bg-green-600' },
  { name: 'Human Health & Disease', questions: '3-4', percentage: '4%', color: 'bg-green-600' },
]

const faqs = [
  {
    question: 'What is the weightage of Zoology in NEET?',
    answer:
      'Zoology accounts for approximately 45-50% of NEET Biology questions, which translates to 40-45 questions and 160-180 marks out of the total 360 marks in Biology.',
  },
  {
    question: 'Which zoology topics are most important for NEET?',
    answer:
      'Human Physiology (20%), Human Reproduction (12%), and Animal Kingdom (8%) are the most important zoology topics, together contributing about 40% of Biology marks.',
  },
  {
    question: 'Do you provide specialized zoology coaching?',
    answer:
      'Yes, our AIIMS-trained faculty provides specialized focus on zoology topics with detailed diagrams, flowcharts, and NCERT-based explanations essential for NEET.',
  },
  {
    question: 'How is zoology different from botany in NEET preparation?',
    answer:
      'Zoology focuses on animal biology including human physiology and anatomy, while botany covers plant biology. Both are equally important and together form the complete NEET Biology syllabus.',
  },
]

export default function ZoologyTeacherPage() {
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
          <div
            className="mx-auto max-w-4xl text-center animate-fadeInUp"
          >
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              50% of NEET Biology = Zoology
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Best Zoology Teacher for NEET
            </h1>
            <p className="mb-8 text-xl text-indigo-100">
              Master Human Physiology, Animal Kingdom & Reproduction with AIIMS-trained faculty.
              Expert teaching methodology for 45-50 questions in NEET.
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
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Trophy, value: '67+', label: 'AIIMS Selections' },
              { icon: Users, value: '1,50,000+', label: 'Students Taught' },
              { icon: Star, value: '98%', label: 'Success Rate' },
              { icon: Clock, value: '15+', label: 'Years Experience' },
            ].map((stat, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-6 text-center shadow-lg animate-fadeInUp"
              >
                <stat.icon className="mx-auto mb-3 h-10 w-10 text-indigo-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEET Zoology Breakdown */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-12 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">NEET Zoology Topic Weightage</h2>
            <p className="text-lg text-gray-600">
              Our expert teachers focus on high-yield zoology topics
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl bg-white p-6 shadow-lg">
              {zoologyTopics.map((topic, index) => (
                <div
                  key={index}
                  className="mb-4 last:mb-0 animate-fadeInUp"
                >
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium text-gray-900">{topic.name}</span>
                    <span className="text-gray-600">
                      {topic.questions} Qs ({topic.percentage})
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full ${topic.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-12 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Why Choose Our Zoology Faculty
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: 'AIIMS-Trained Expert',
                desc: 'Faculty with medical background ensures clinical perspective in teaching human physiology.',
              },
              {
                icon: BookOpen,
                title: 'NCERT-Focused',
                desc: 'Complete NCERT coverage with line-by-line explanation for NEET zoology.',
              },
              {
                icon: Target,
                title: 'High-Yield Focus',
                desc: 'Strategic focus on Human Physiology (20%) and Reproduction (12%) for maximum marks.',
              },
              {
                icon: Award,
                title: 'Diagram Mastery',
                desc: 'Detailed anatomical diagrams and flowcharts for visual learning.',
              },
              {
                icon: Users,
                title: 'Batch Learning',
                desc: 'Structured batch system with peer learning and doubt sessions.',
              },
              {
                icon: CheckCircle,
                title: 'Previous Year Focus',
                desc: 'Analysis of 10+ years of NEET zoology questions for pattern recognition.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-6 shadow-lg animate-fadeInUp"
              >
                <feature.icon className="mb-4 h-10 w-10 text-indigo-600" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-16">
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
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="mb-6 text-center text-xl font-semibold text-gray-900">
            Explore More Resources
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/best-zoology-teacher-for-neet"
              className="rounded-lg bg-indigo-100 px-4 py-2 text-indigo-700 transition hover:bg-indigo-200"
            >
              Best Zoology Teacher for NEET
            </Link>
            <Link
              href="/zoology-classes"
              className="rounded-lg bg-indigo-100 px-4 py-2 text-indigo-700 transition hover:bg-indigo-200"
            >
              Zoology Classes
            </Link>
            <Link
              href="/botany-teacher"
              className="rounded-lg bg-green-100 px-4 py-2 text-green-700 transition hover:bg-green-200"
            >
              Botany Teacher
            </Link>
            <Link
              href="/biology-teacher"
              className="rounded-lg bg-purple-100 px-4 py-2 text-purple-700 transition hover:bg-purple-200"
            >
              Biology Teacher
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="mb-4 text-3xl font-bold">Ready to Master Zoology?</h2>
            <p className="mb-8 text-xl text-indigo-100">
              Join our expert-led zoology classes and score 160+ in NEET Biology
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
          </div>
        </div>
      </section>
    </div>
  )
}
