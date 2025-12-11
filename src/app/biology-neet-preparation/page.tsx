'use client'

import { motion } from 'framer-motion'
import {
  Users,
  CheckCircle,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Target,
  Calendar,
  Brain,
  Award,
  FileText,
  TrendingUp,
  Trophy,
  Star,
  Microscope,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const neetBiologyBreakdown = [
  { topic: 'Diversity of Living Organisms', questions: '10-12', percentage: '14%' },
  { topic: 'Structural Organisation', questions: '3-5', percentage: '5%' },
  { topic: 'Cell Structure & Function', questions: '10-12', percentage: '15%' },
  { topic: 'Plant Physiology', questions: '8-10', percentage: '12%' },
  { topic: 'Human Physiology', questions: '9-11', percentage: '14%' },
  { topic: 'Reproduction', questions: '8-10', percentage: '12%' },
  { topic: 'Genetics & Evolution', questions: '12-14', percentage: '18%' },
  { topic: 'Biology in Human Welfare', questions: '5-7', percentage: '8%' },
  { topic: 'Biotechnology', questions: '6-8', percentage: '10%' },
  { topic: 'Ecology', questions: '8-10', percentage: '12%' },
]

const preparationFeatures = [
  {
    icon: Brain,
    title: 'AIIMS-Trained Faculty',
    description:
      'Learn from doctors who cleared AIIMS and have 15+ years of NEET teaching experience.',
  },
  {
    icon: Target,
    title: 'NEET-Focused Curriculum',
    description:
      'Every lecture designed with NEET pattern in mind. Focus on high-yield topics and frequently asked questions.',
  },
  {
    icon: Microscope,
    title: 'Complete NCERT Mastery',
    description:
      'Line-by-line NCERT coverage - the bible for NEET Biology. 95% questions come from NCERT.',
  },
  {
    icon: FileText,
    title: 'Extensive Test Series',
    description:
      'Chapter tests, subject tests, and full-length mocks with detailed analysis and rank prediction.',
  },
  {
    icon: Video,
    title: 'Live + Recorded Classes',
    description:
      'Interactive live sessions with unlimited recorded access for revision anytime, anywhere.',
  },
  {
    icon: TrendingUp,
    title: 'Performance Analytics',
    description:
      'Detailed performance tracking, weak area identification, and personalized improvement strategies.',
  },
]

const neetStats = [
  { label: 'NEET Selections', value: '2,500+' },
  { label: 'Students Trained', value: '10,000+' },
  { label: 'Success Rate', value: '98%' },
  { label: 'Average Score Boost', value: '40%' },
  { label: 'Top 1000 Ranks', value: '150+' },
  { label: 'GMC Selections', value: '800+' },
]

const faqs = [
  {
    question: 'How many questions come from Biology in NEET?',
    answer:
      'NEET has 200 questions total (180 to attempt), out of which 90 are from Biology - 45 from Botany and 45 from Zoology. Biology carries 360 marks out of 720, making it the highest-weightage subject. Scoring well in Biology is crucial for NEET success.',
  },
  {
    question: 'What is the best strategy for NEET Biology preparation?',
    answer:
      'The best strategy involves: 1) Complete NCERT mastery (95% questions come from NCERT), 2) Focus on high-weightage chapters like Genetics, Human Physiology, and Cell Biology, 3) Regular practice with previous year questions, 4) Mock tests to build exam temperament, 5) Revision cycles to ensure retention.',
  },
  {
    question: 'Is NCERT enough for NEET Biology?',
    answer:
      'NCERT is the primary source and covers 95% of NEET Biology. However, for competitive edge, especially for AIQ seats, you need to supplement with previous year questions, NCERT exemplar, and some additional reference material for complex topics.',
  },
  {
    question: 'How long does it take to prepare Biology for NEET?',
    answer:
      'With focused preparation, 12-18 months is ideal. Class 11 students should start early as 60% of NEET Biology syllabus is from Class 11. Droppers can complete preparation in 10-12 months with dedicated effort. Quality of preparation matters more than duration.',
  },
]

export default function BiologyNeetPreparationPage() {
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
      <section className="relative bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Trophy className="w-5 h-5 mr-2 text-yellow-300" />
              NEET Biology Preparation
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">Biology for NEET</span> - Complete Preparation
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              360/720 Marks from Biology | 2,500+ NEET Selections | 98% Success Rate
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Master NEET Biology with India&apos;s top AIIMS-trained faculty. Our proven
              methodology has helped 2,500+ students secure medical seats. Biology alone can make or
              break your NEET score - prepare with the best!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
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
                  className="border-white text-white hover:bg-white hover:text-emerald-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View NEET Courses
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {neetStats.map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-300">{stat.value}</div>
                  <div className="text-xs opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEET Biology Topic Weightage */}
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
              NEET Biology Topic-wise Weightage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              90 questions from Biology (45 Botany + 45 Zoology) = 360 marks
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {neetBiologyBreakdown.map((topic, index) => (
              <motion.div
                key={topic.topic}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-4 shadow flex items-center justify-between"
              >
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{topic.topic}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{topic.questions} Qs</span>
                  <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-3 py-1 rounded-full">
                    {topic.percentage}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our NEET Preparation */}
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
              Why Choose Our NEET Biology Preparation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The proven path to NEET success with expert guidance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {preparationFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete NEET Package */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete NEET Biology Package
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Live Interactive Classes',
              'Recorded Lecture Access',
              'Complete NCERT Notes',
              'Chapter-wise DPPs',
              'Topic-wise Tests',
              'Full Mock Tests',
              'PYQs (15 Years)',
              'Detailed Solutions',
              '24/7 Doubt Support',
              'Performance Analytics',
              'Rank Prediction',
              'NEET Strategy Sessions',
              'High-Yield Focus',
              'Revision Modules',
              'Last-Minute Tips',
              'Mentorship Support',
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-4 shadow flex items-center"
              >
                <CheckCircle className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
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
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-emerald-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your NEET Journey Today</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join 2,500+ successful students who cracked NEET with our expert Biology preparation!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-emerald-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
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
              href="/biology-tuition-class-11"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 11 Biology
            </Link>
            <Link
              href="/biology-tuition-class-12"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 12 Biology
            </Link>
            <Link
              href="/biology-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Coaching
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
