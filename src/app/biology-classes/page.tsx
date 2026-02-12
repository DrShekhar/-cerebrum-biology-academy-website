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
  Clock,
  Target,
  Calendar,
  Brain,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const classFeatures = [
  {
    icon: Brain,
    title: 'Concept-First Approach',
    description:
      'Build strong foundations with deep conceptual understanding before problem-solving.',
  },
  {
    icon: Target,
    title: 'Dual Focus: Board + NEET',
    description:
      'Integrated curriculum covering both board exams and NEET preparation simultaneously.',
  },
  {
    icon: Users,
    title: 'Small Batch Size',
    description: 'Limited to 15-20 students per batch for personalized attention and interaction.',
  },
  {
    icon: Calendar,
    title: 'Structured Schedule',
    description: 'Well-planned classes with regular tests, assignments, and revision sessions.',
  },
  {
    icon: Video,
    title: 'Live Interactive Sessions',
    description: 'Engage directly with faculty in real-time classes with Q&A sessions.',
  },
  {
    icon: MessageCircle,
    title: '24/7 Doubt Support',
    description: 'WhatsApp groups and dedicated doubt sessions for continuous support.',
  },
]

const batchSchedule = [
  { class: 'Class 11', timing: 'Mon, Wed, Fri - 5:00 PM to 7:00 PM', status: 'Enrolling' },
  { class: 'Class 12', timing: 'Tue, Thu, Sat - 5:00 PM to 7:00 PM', status: 'Enrolling' },
  { class: 'Dropper Batch', timing: 'Daily - 10:00 AM to 1:00 PM', status: 'Limited Seats' },
  { class: 'Weekend Batch', timing: 'Sat, Sun - 9:00 AM to 1:00 PM', status: 'Enrolling' },
]

const credentials = [
  { label: 'AIIMS Alumni', value: 'Faculty' },
  { label: 'Teaching Experience', value: '15+ Years' },
  { label: 'Students Taught', value: '10,000+' },
  { label: 'AIIMS Selections', value: '67+' },
  { label: 'Success Rate', value: '98%' },
  { label: 'Average Score Boost', value: '40%' },
]

const faqs = [
  {
    question: 'What are the class timings for biology classes?',
    answer:
      'We offer flexible batch timings - weekday batches (5-7 PM), morning batches (10 AM-1 PM for droppers), and weekend batches (9 AM-1 PM). You can choose the timing that suits your schedule best.',
  },
  {
    question: 'Are online biology classes as effective as offline?',
    answer:
      'Yes! Our online classes are highly interactive with live sessions, screen sharing, digital whiteboard, and real-time doubt resolution. Many students prefer online for the convenience while getting the same quality education.',
  },
  {
    question: 'What is the fee structure for biology classes?',
    answer:
      'Our fees vary based on the course duration and batch type. We offer competitive pricing with EMI options available. Contact us for detailed fee structure and current offers.',
  },
  {
    question: 'Do you provide study materials?',
    answer:
      'Yes, comprehensive study materials including detailed notes, NCERT-based worksheets, previous year papers, and DPPs (Daily Practice Problems) are provided to all enrolled students.',
  },
]

export default function BiologyClassesPage() {
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
      <section className="relative bg-gradient-to-br from-cyan-900 via-green-800 to-green-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-5 h-5 mr-2 text-yellow-300" />
              Expert Biology Classes
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">Biology Classes</span> for NEET & Boards
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              AIIMS-Trained Faculty | Small Batches | 98% Success Rate
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Join our structured biology classes designed for NEET aspirants and board exam
              students. Experience interactive learning with expert faculty, comprehensive study
              materials, and a proven track record of success.
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
                  className="border-white text-white hover:bg-white hover:text-green-800"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Course Details
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {credentials.map((cred) => (
                <div key={cred.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-300">{cred.value}</div>
                  <div className="text-xs opacity-80">{cred.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Makes Our Classes Different */}
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
              Why Our Biology Classes Stand Out
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A perfect blend of expertise, structured learning, and personalized attention
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Batch Schedule */}
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
              Current Batch Schedule
            </h2>
            <p className="text-xl text-gray-600">
              Choose from multiple batches based on your convenience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {batchSchedule.map((batch, index) => (
              <motion.div
                key={batch.class}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{batch.class}</h3>
                  <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                    {batch.status}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2 text-green-600" />
                  {batch.timing}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/demo-booking">
              <Button variant="primary" size="lg">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Free Trial Class
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              What You Get in Our Classes
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Live Interactive Classes',
              'Recorded Lectures Access',
              'Comprehensive Notes',
              'NCERT-Based Worksheets',
              'Weekly Tests',
              'DPPs (Daily Practice)',
              'Doubt Resolution',
              'Progress Tracking',
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-4 shadow flex items-center"
              >
                <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
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
                  <MessageCircle className="w-6 h-6 mr-3 text-green-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-blue-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your Biology Journey Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Book a free demo class and experience the difference quality teaching makes!
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
                  className="border-white text-white hover:bg-white hover:text-green-600"
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
              href="/biology-classes-near-me"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Classes Near Me
            </Link>
            <Link
              href="/biology-tuition-near-me"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tuition Near Me
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
