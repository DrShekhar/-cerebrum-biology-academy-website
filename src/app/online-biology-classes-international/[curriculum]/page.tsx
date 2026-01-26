'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Users,
  Trophy,
  CheckCircle,
  Star,
  Phone,
  BookOpen,
  GraduationCap,
  Play,
  Target,
  Globe,
  Award,
  MapPin,
} from 'lucide-react'
import {
  internationalCurricula,
  getInternationalBySlug,
} from '@/lib/onlineClasses/internationalData'
import { notFound } from 'next/navigation'
import { use } from 'react'

export default function InternationalBiologyPage({
  params,
}: {
  params: Promise<{ curriculum: string }>
}) {
  const resolvedParams = use(params)
  const curriculum = getInternationalBySlug(resolvedParams.curriculum)

  if (!curriculum) {
    notFound()
  }

  const faqs = [
    {
      question: `What is covered in ${curriculum.name} Biology online classes?`,
      answer: `Our ${curriculum.name} Biology online classes cover the complete ${curriculum.fullName} syllabus as per ${curriculum.examBoard}. This includes all core topics, extended content, practical skills, and exam-specific preparation. We focus on both conceptual understanding and exam technique.`,
    },
    {
      question: `Can ${curriculum.name} students prepare for NEET?`,
      answer: `${curriculum.neetAlignment} We offer specialized NCERT bridge modules that help ${curriculum.name} students cover additional topics required for NEET. Many of our ${curriculum.name} students have successfully cracked NEET after completing our bridge program.`,
    },
    {
      question: `What is the fee for ${curriculum.name} Biology online classes?`,
      answer: `Our ${curriculum.name} Biology online classes are priced at $30-50/hour for individual sessions or ₹45,000-75,000 annually for batch programs. This includes live classes, recorded lectures, study materials, past paper practice, and personalized doubt support.`,
    },
    {
      question: `Do you cover ${curriculum.name} practical/lab requirements?`,
      answer: `Yes! We provide comprehensive support for ${curriculum.name} practical requirements. This includes lab technique training, practical report writing, and for exams with practical components, we cover Alternative to Practical (ATP) question strategies.`,
    },
    {
      question: `What time zones do you support for ${curriculum.name} students?`,
      answer: `We support students across all time zones. With students in ${curriculum.countries.join(', ')}, we offer flexible scheduling. Live classes are available in IST, GMT, EST, and PST friendly timings. Recorded lectures are available 24/7.`,
    },
  ]

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

      {/* Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: `${curriculum.name} Biology Online Classes`,
            description: `Comprehensive ${curriculum.fullName} online tutoring`,
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            courseMode: 'online',
            educationalLevel: 'High School',
            teaches: `${curriculum.name} Biology`,
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
            className="max-w-4xl"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              <Globe className="h-4 w-4" />
              {curriculum.studentCount} Students Worldwide
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              {curriculum.name} Biology Online Classes
            </h1>
            <p className="mb-4 text-xl text-indigo-100">{curriculum.heroSubtitle}</p>
            <p className="mb-8 text-lg text-indigo-200">
              {curriculum.fullName} • {curriculum.examBoard}
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
                Call: +91 88264 44334
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
              { icon: Users, value: curriculum.studentCount, label: 'Students Enrolled' },
              { icon: Globe, value: curriculum.countries.length + '+', label: 'Countries' },
              { icon: Trophy, value: '95%', label: 'Pass Rate' },
              { icon: Star, value: '4.9/5', label: 'Student Rating' },
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

      {/* Countries We Serve */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            Students From Around the World
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {curriculum.countries.map((country, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md"
              >
                <MapPin className="h-4 w-4 text-indigo-600" />
                {country}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* NEET Alignment */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-6 py-3 text-green-800">
              <Target className="h-5 w-5" />
              <span className="font-semibold">{curriculum.name} + NEET Bridge</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">NEET Preparation Support</h2>
            <p className="text-lg text-gray-700">{curriculum.neetAlignment}</p>
          </motion.div>
        </div>
      </section>

      {/* Syllabus Focus */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Our {curriculum.name} Biology Approach
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive coverage aligned with {curriculum.examBoard}
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {curriculum.syllabusFocus.map((focus, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-lg"
              >
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                <p className="text-gray-700">{focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Covered */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              {curriculum.name} Biology Syllabus
            </h2>
            <p className="text-lg text-gray-600">Complete curriculum coverage</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {curriculum.topics.map((unitData, unitIndex) => (
              <motion.div
                key={unitIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: unitIndex * 0.2 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-indigo-600">
                  <GraduationCap className="h-6 w-6" />
                  {unitData.unit}
                </h3>
                <div className="space-y-2">
                  {unitData.topics.map((topic, topicIndex) => (
                    <div
                      key={topicIndex}
                      className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-sm"
                    >
                      <BookOpen className="h-4 w-4 text-indigo-600" />
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              {curriculum.name}-Specific Features
            </h2>
            <p className="text-lg text-gray-600">
              What makes our {curriculum.name} classes special
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {curriculum.uniqueFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-indigo-50 p-6 shadow-lg"
              >
                <Award className="mb-4 h-10 w-10 text-indigo-600" />
                <p className="font-medium text-gray-800">{feature}</p>
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
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              FAQs for {curriculum.name} Students
            </h2>
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

      {/* Other Curricula */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h3 className="mb-6 text-center text-xl font-semibold text-gray-900">
            Other International Curricula
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {internationalCurricula
              .filter((c) => c.slug !== curriculum.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/online-biology-classes-international/${c.slug}`}
                  className="rounded-lg bg-indigo-100 px-4 py-2 text-indigo-700 transition hover:bg-indigo-200"
                >
                  {c.name} Biology
                </Link>
              ))}
            <Link
              href="/online-biology-classes-cbse"
              className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition hover:bg-blue-200"
            >
              CBSE Classes
            </Link>
            <Link
              href="/online-biology-classes-icse"
              className="rounded-lg bg-purple-100 px-4 py-2 text-purple-700 transition hover:bg-purple-200"
            >
              ICSE Classes
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="mb-4 text-3xl font-bold">
              Join {curriculum.studentCount} {curriculum.name} Students Worldwide
            </h2>
            <p className="mb-8 text-xl text-indigo-100">
              Expert {curriculum.name} Biology tutoring from anywhere in the world
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
