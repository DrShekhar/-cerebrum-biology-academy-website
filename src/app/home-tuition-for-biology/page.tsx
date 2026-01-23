'use client'

import { motion } from 'framer-motion'
import {
  CheckCircle,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  Clock,
  Target,
  Brain,
  Home,
  XCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const homeTuitionBenefits = [
  {
    icon: Home,
    title: 'Learn from Comfort of Home',
    description: 'No commuting, no travel time. Study in your own comfortable environment.',
  },
  {
    icon: Brain,
    title: 'AIIMS-Trained Faculty',
    description: 'Get the same quality teaching as offline coaching from expert doctors.',
  },
  {
    icon: Target,
    title: 'Personalized Attention',
    description: 'Small batch sizes ensure every student gets individual focus and feedback.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Choose batch timings that fit your school schedule and personal commitments.',
  },
  {
    icon: Video,
    title: 'Recorded Sessions',
    description: 'Miss a class? Access recorded lectures anytime for revision or catch-up.',
  },
  {
    icon: MessageCircle,
    title: '24/7 Doubt Support',
    description: 'WhatsApp groups and dedicated doubt sessions - help is always available.',
  },
]

const comparisonData = [
  {
    feature: 'Teacher Qualification',
    homeTutor: 'Variable, often undergraduate students',
    cerebrum: 'AIIMS-trained doctors with 15+ years experience',
    cerebrumBetter: true,
  },
  {
    feature: 'Study Materials',
    homeTutor: 'Usually none, or basic notes',
    cerebrum: 'Comprehensive notes, DPPs, test series included',
    cerebrumBetter: true,
  },
  {
    feature: 'Regular Tests',
    homeTutor: 'Rarely conducted',
    cerebrum: 'Weekly tests with detailed analysis',
    cerebrumBetter: true,
  },
  {
    feature: 'NEET Preparation',
    homeTutor: 'Basic board coverage only',
    cerebrum: 'Dual focus on boards + NEET from day 1',
    cerebrumBetter: true,
  },
  {
    feature: 'Doubt Resolution',
    homeTutor: 'Only during tuition hours',
    cerebrum: '24/7 WhatsApp support available',
    cerebrumBetter: true,
  },
  {
    feature: 'Progress Tracking',
    homeTutor: 'No systematic tracking',
    cerebrum: 'Detailed reports and parent-teacher meetings',
    cerebrumBetter: true,
  },
  {
    feature: 'Peer Learning',
    homeTutor: 'No peer interaction',
    cerebrum: 'Learn with motivated batch mates',
    cerebrumBetter: true,
  },
  {
    feature: 'Cost',
    homeTutor: '₹15,000-25,000/month',
    cerebrum: 'More affordable with better value',
    cerebrumBetter: true,
  },
]

const credentials = [
  { label: 'AIIMS Alumni', value: 'Faculty' },
  { label: 'Teaching Experience', value: '15+ Years' },
  { label: 'Students Taught', value: '10,000+' },
  { label: 'NEET Selections', value: '2,500+' },
  { label: 'Success Rate', value: '98%' },
  { label: 'Average Improvement', value: '40%' },
]

const faqs = [
  {
    question: 'Is online home tuition effective for biology?',
    answer:
      'Absolutely! Our online home tuition is highly effective because you get AIIMS-trained faculty (which local home tutors can rarely match), structured curriculum, comprehensive study materials, regular tests, and 24/7 doubt support - all from the comfort of your home.',
  },
  {
    question: 'How is this better than hiring a local home tutor?',
    answer:
      'Local home tutors are often undergraduate students with limited expertise. With us, you get: 1) AIIMS doctors as teachers, 2) Comprehensive study materials, 3) Regular tests with analysis, 4) 24/7 doubt support, 5) NEET preparation alongside boards, 6) Recorded classes for revision - all at a more affordable cost.',
  },
  {
    question: 'What if I miss a class?',
    answer:
      'All our live sessions are recorded. If you miss a class, you can watch the recorded lecture anytime. Plus, our faculty conducts extra doubt sessions to help you catch up.',
  },
  {
    question: 'Do you provide study materials?',
    answer:
      'Yes! You get comprehensive study notes, NCERT-based worksheets, Daily Practice Problems (DPPs), previous year papers, and access to our test series - all included in the fee.',
  },
]

export default function HomeTuitionBiologyPage() {
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
      <section className="relative bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Home className="w-5 h-5 mr-2 text-yellow-300" />
              Better Than Home Tuition
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">Home Tuition for Biology</span> - Upgraded!
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              AIIMS Faculty at Your Home | Expert Teaching | Complete NEET Preparation
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Why settle for average home tutors when you can get AIIMS-trained doctors teaching you
              from the comfort of your home? Get expert biology tuition that local tutors simply
              cannot match.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Try Free Demo Class
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-900"
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

      {/* Why Our Online Tuition is Better */}
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
              Why Choose Us Over Local Home Tutors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get premium quality education from home without compromising on teaching quality
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeTuitionBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <benefit.icon className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Home Tutor vs Cerebrum Academy
            </h2>
            <p className="text-xl text-gray-600">See the clear advantage</p>
          </motion.div>

          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="p-4 text-left font-bold">Feature</th>
                  <th className="p-4 text-left font-bold">Local Home Tutor</th>
                  <th className="p-4 text-left font-bold bg-purple-700">Cerebrum Academy</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={row.feature} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-4 font-medium text-gray-900">{row.feature}</td>
                    <td className="p-4 text-gray-600">
                      <div className="flex items-start">
                        <XCircle className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                        {row.homeTutor}
                      </div>
                    </td>
                    <td className="p-4 bg-purple-50">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-purple-900 font-medium">{row.cerebrum}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything Included in Your Home Tuition
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
              '24/7 Doubt Support',
              'Progress Reports',
              'Parent-Teacher Updates',
              'NEET Preparation',
              'Board Exam Focus',
              'Motivational Sessions',
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-4 shadow flex items-center"
              >
                <CheckCircle className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0" />
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
                  <MessageCircle className="w-6 h-6 mr-3 text-purple-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Upgrade Your Home Tuition Experience Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Book a free demo class and see why 10,000+ students chose us over local home tutors!
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
                  className="border-white text-white hover:bg-white hover:text-purple-600"
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
              href="/biology-tuition-near-me"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tuition Near Me
            </Link>
            <Link
              href="/biology-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Classes
            </Link>
            <Link
              href="/biology-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Coaching
            </Link>
            <Link
              href="/biology-home-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Home Tutor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
