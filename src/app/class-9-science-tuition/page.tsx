'use client'

import { motion } from 'framer-motion'
import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  Target,
  Leaf,
  Atom,
  Beaker,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const class9Syllabus = [
  {
    unit: 'Biology',
    title: 'Living World & Cell Biology',
    chapters: [
      'The Fundamental Unit of Life',
      'Tissues',
      'Diversity in Living Organisms',
      'Why Do We Fall Ill',
    ],
    weightage: '30%',
    icon: Leaf,
  },
  {
    unit: 'Physics',
    title: 'Motion, Force & Energy',
    chapters: ['Motion', 'Force and Laws of Motion', 'Gravitation', 'Work and Energy', 'Sound'],
    weightage: '35%',
    icon: Atom,
  },
  {
    unit: 'Chemistry',
    title: 'Matter & Elements',
    chapters: [
      'Matter in Our Surroundings',
      'Is Matter Around Us Pure',
      'Atoms and Molecules',
      'Structure of the Atom',
    ],
    weightage: '35%',
    icon: Beaker,
  },
]

const features = [
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description:
      'Learn from Dr. Shekhar Singh and faculty trained at premier medical institutions.',
  },
  {
    icon: BookOpen,
    title: 'Complete NCERT Focus',
    description: 'All three sciences - Biology, Physics, Chemistry covered thoroughly.',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: '10-15 students per batch for personalized attention and concept clarity.',
  },
  {
    icon: Target,
    title: 'Early NEET Foundation',
    description: 'Start NEET preparation early. Build strong fundamentals from Class 9 itself.',
  },
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Engaging live sessions with experiments, demos, and instant doubt resolution.',
  },
  {
    icon: MessageCircle,
    title: '24/7 Doubt Support',
    description: 'WhatsApp support anytime. Get help with homework and concept clarification.',
  },
]

const faqs = [
  {
    question: 'Why should I join science tuition in Class 9?',
    answer:
      'Class 9 is the foundation year for CBSE science. Strong concepts in Class 9 make Class 10 boards and future NEET preparation much easier. Starting early gives you a competitive advantage and helps develop scientific thinking from the beginning.',
  },
  {
    question: 'Do you teach all three sciences - Biology, Physics, and Chemistry?',
    answer:
      'Yes! Our Class 9 Science Tuition covers all three subjects comprehensively. We have specialized faculty for each subject who ensure complete NCERT coverage with practical demonstrations and conceptual clarity.',
  },
  {
    question: 'How does Class 9 help with NEET foundation?',
    answer:
      'Class 9 builds fundamental concepts in cell biology, human body systems, chemical reactions, and physical laws that are crucial for NEET. Starting NEET foundation from Class 9 gives you 4 years to master concepts instead of rushing in Class 11-12.',
  },
  {
    question: 'What is the batch size for Class 9 science coaching?',
    answer:
      'We maintain small batches of 10-15 students to ensure every student gets individual attention. This helps in better doubt resolution, personalized feedback, and effective learning.',
  },
  {
    question: 'Is the coaching available online or offline?',
    answer:
      'We offer both online and offline classes for Class 9 Science. Our offline centers are located across Delhi NCR, and online classes are available for students anywhere in India with the same quality of teaching.',
  },
]

export default function Class9ScienceTuitionPage() {
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
      <section className="relative bg-gradient-to-br from-orange-900 via-yellow-800 to-yellow-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-5 h-5 mr-2 text-amber-300" />
              Class 9 CBSE Science
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-amber-300">Class 9 Science</span> Tuition
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Biology, Physics, Chemistry | Early NEET Foundation
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Build strong foundations in all three sciences. Start your NEET journey early with
              expert guidance from AIIMS-trained faculty. Complete NCERT coverage with competitive
              exam perspective.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-amber-400 text-black hover:bg-amber-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/courses/class-9">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-orange-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Class 9 Course
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-amber-300" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-amber-300" />
                <div className="text-2xl font-bold">10-15</div>
                <div className="text-sm opacity-80">Students/Batch</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-amber-300" />
                <div className="text-2xl font-bold">3 Subjects</div>
                <div className="text-sm opacity-80">Bio, Phy, Chem</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-amber-300" />
                <div className="text-2xl font-bold">Foundation</div>
                <div className="text-sm opacity-80">Early NEET Prep</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Syllabus Section */}
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
              Class 9 CBSE Science Syllabus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete coverage of Biology, Physics, and Chemistry
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {class9Syllabus.map((subject, index) => (
              <motion.div
                key={subject.unit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <subject.icon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {subject.weightage}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{subject.unit}</h3>
                <p className="text-yellow-600 font-medium mb-3">{subject.title}</p>
                <ul className="space-y-1">
                  {subject.chapters.map((chapter) => (
                    <li key={chapter} className="text-sm text-gray-600 flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      {chapter}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              What You Get in Class 9 Science Coaching
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <feature.icon className="w-12 h-12 text-yellow-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
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
                  <MessageCircle className="w-6 h-6 mr-3 text-yellow-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-yellow-600 to-yellow-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Foundation from Class 9
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Build strong science fundamentals. Get ahead of the competition!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-amber-400 text-black hover:bg-amber-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-orange-600"
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
              href="/biology-tutor-class-9"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 9 Biology Tutor
            </Link>
            <Link
              href="/class-10-science-tuition"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 10 Science Tuition
            </Link>
            <Link
              href="/neet-foundation-class-9"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Foundation Class 9
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
