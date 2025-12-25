'use client'

import { motion } from 'framer-motion'
import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Target,
  Brain,
  Microscope,
  Medal,
  UserCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const whyChooseUs = [
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description:
      'Learn from Dr. Shekhar Singh and faculty trained at premier medical institutions.',
    stat: 'AIIMS',
  },
  {
    icon: Trophy,
    title: '98% Success Rate',
    description: 'Highest selection rate among biology tutoring services in Delhi NCR.',
    stat: '98%',
  },
  {
    icon: Users,
    title: 'Small Batch Size',
    description: 'Maximum 10-15 students per batch for personalized attention and peer learning.',
    stat: '10-15',
  },
  {
    icon: Star,
    title: '1,50,000+ Success Stories',
    description: 'Over 15 years, thousands have achieved their medical dreams with us.',
    stat: '1,50K+',
  },
]

const tutorBenefits = [
  {
    icon: UserCheck,
    title: 'Personal Mentorship',
    description: 'Direct guidance from Dr. Shekhar Singh, AIIMS-trained biology expert.',
  },
  {
    icon: Brain,
    title: 'Conceptual Clarity',
    description:
      'Focus on understanding concepts, not just memorization. Build strong foundations.',
  },
  {
    icon: Microscope,
    title: 'Practical Learning',
    description: 'Virtual labs, 3D models, and visual explanations for complex biology topics.',
  },
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time doubt resolution, not just recorded videos.',
  },
  {
    icon: BookOpen,
    title: 'Complete Study Material',
    description: 'NCERT-based notes, question banks, and mock tests included.',
  },
  {
    icon: MessageCircle,
    title: '24/7 Doubt Support',
    description: 'WhatsApp support for instant doubt resolution anytime.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'NEET Top Score', value: '720', icon: Star },
  { label: 'Students Taught', value: '1,50K+', icon: Users },
  { label: 'Years Experience', value: '15+', icon: Award },
]

const boardsCovered = [
  { name: 'CBSE', link: '/biology-tutor-cbse', description: 'Class 11 & 12' },
  { name: 'ICSE', link: '/biology-tutor-icse', description: 'Class 11 & 12' },
  { name: 'State Boards', link: '/biology-tutor-state-boards', description: 'English Medium' },
  { name: 'NEET', link: '/neet-biology-classes', description: 'Medical Entrance' },
]

const faqs = [
  {
    question: 'Why should I choose Cerebrum for biology tutoring?',
    answer:
      'Cerebrum Biology Academy offers AIIMS-trained faculty led by Dr. Shekhar Singh, 98% success rate, small batch sizes (10-15 students), personalized attention, and comprehensive study material. Our 15+ years experience and 1,50,000+ successful students prove our teaching methodology works.',
  },
  {
    question: 'What makes a good biology tutor?',
    answer:
      'A good biology tutor should have strong academic credentials (AIIMS/medical background), ability to explain complex concepts simply, provide personalized attention, offer comprehensive study material, and create a competitive learning environment. At Cerebrum, we ensure all these qualities.',
  },
  {
    question: 'Do you offer online biology tutoring?',
    answer:
      'Yes! We offer both offline classes at our 4 centers (Rohini, Gurugram, South Extension, Faridabad) and live online classes. Online students get the same quality teaching with recorded lectures for revision.',
  },
  {
    question: 'What is the fee for biology tutoring?',
    answer:
      'Our biology tutoring fees range from Rs 24,000 to Rs 48,000 per year, which is significantly lower than other top institutes. We offer EMI options and merit scholarships for deserving students.',
  },
  {
    question: 'Which boards do you cover?',
    answer:
      'We cover CBSE, ICSE, and English-medium State Boards aligned with NCERT curriculum. Our tutoring is suitable for Class 9-12 students preparing for board exams and competitive exams like NEET.',
  },
]

export default function BiologyTutorPage() {
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
      <section className="relative bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Medal className="w-5 h-5 mr-2 text-yellow-300" />
              India&apos;s Most Trusted Biology Tutor
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Expert <span className="text-yellow-300">Biology Tutor</span> for Your Success
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              AIIMS Trained Faculty | 98% Success Rate | 1,50,000+ Students
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Looking for the best biology tutor? Learn from Dr. Shekhar Singh and AIIMS-trained
              faculty. Whether you&apos;re preparing for NEET, CBSE, or ICSE - we make biology
              simple and scoring!
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
                  className="border-white text-white hover:bg-white hover:text-green-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Courses
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Our Biology Tutor */}
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
              Why Choose Our Biology Tutor?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Not all biology tutors are the same. Here&apos;s what sets us apart.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">{item.stat}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
              What You Get with Our Biology Tutoring
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <benefit.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Boards Covered */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Biology Tutoring for All Boards
            </h2>
            <p className="text-xl text-gray-600">
              Expert tutoring for CBSE, ICSE, State Boards, and NEET
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {boardsCovered.map((board, index) => (
              <motion.div
                key={board.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={board.link}
                  className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition text-center"
                >
                  <GraduationCap className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{board.name}</h3>
                  <p className="text-gray-600">{board.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
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
                className="bg-gray-50 rounded-xl p-8"
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
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Learning with India&apos;s Best Biology Tutor
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              AIIMS trained faculty, 98% success rate, personalized attention. Your biology success
              starts here!
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

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>98% Success</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Small Batches</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>24/7 Support</span>
              </div>
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
              href="/biology-tutors-near-me"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tutors Near Me
            </Link>
            <Link
              href="/biology-home-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Home Tutor
            </Link>
            <Link
              href="/biology-tutor-class-12-cbse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 12 CBSE Tutor
            </Link>
            <Link
              href="/biology-tutor-class-11-cbse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 11 CBSE Tutor
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
