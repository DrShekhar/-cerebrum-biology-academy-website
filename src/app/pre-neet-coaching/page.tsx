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
  Clock,
  Zap,
  Medal,
  Rocket,
  Brain,
  TrendingUp,
  GraduationCap,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const targetAudience = [
  {
    class: 'Class 8',
    description: 'Start earliest - 5 years to master NEET',
    benefits: ['Build scientific thinking', 'Develop study habits', 'Explore medical career'],
    icon: Rocket,
  },
  {
    class: 'Class 9',
    description: '4-year journey to NEET success',
    benefits: ['30% NEET concepts covered', 'NTSE & Olympiad prep', 'Strong biology foundation'],
    icon: Brain,
  },
  {
    class: 'Class 10',
    description: '2-year head start before Class 11',
    benefits: ['40% NEET concepts', 'Board + NEET together', 'Enter Class 11 prepared'],
    icon: Target,
  },
]

const advantages = [
  {
    icon: Clock,
    title: 'More Time to Learn',
    description: 'No rushing, no cramming. Learn at comfortable pace with deep understanding.',
  },
  {
    icon: Target,
    title: 'Stress-Free Journey',
    description: 'Spread preparation over years. Enjoy learning instead of pressure.',
  },
  {
    icon: Zap,
    title: 'Higher Success Rate',
    description: 'Early starters have 3x higher success rate than those who start in Class 11.',
  },
  {
    icon: Medal,
    title: 'Build Strong Profile',
    description: 'Clear NTSE, Olympiads, and build impressive academic profile along the way.',
  },
]

const features = [
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Learn from Dr. Shekhar Singh and faculty from premier medical institutions.',
  },
  {
    icon: BookOpen,
    title: 'Age-Appropriate Teaching',
    description: 'Content designed for young minds. Make biology interesting and fun.',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: '10-15 students per batch. Individual attention for every student.',
  },
  {
    icon: GraduationCap,
    title: 'Board Exam Focus',
    description: 'Excel in school while preparing for NEET. No compromise on academics.',
  },
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Engaging sessions with experiments, models, and practical demonstrations.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Regular assessments and parent updates. Track improvement continuously.',
  },
]

const faqs = [
  {
    question: 'Is Class 8 too early to start NEET preparation?',
    answer:
      'Not at all! Class 8 is perfect to develop scientific curiosity and study habits. We dont teach NEET syllabus directly but build strong foundation in reasoning, biology concepts, and love for science that makes future NEET prep easier.',
  },
  {
    question: 'How is Pre-NEET coaching different from regular tuition?',
    answer:
      'Pre-NEET coaching covers school syllabus but with NEET perspective. We emphasize conceptual understanding over memorization, include MCQ practice, and prepare students for competitive thinking - all while ensuring board exam success.',
  },
  {
    question: 'Will Pre-NEET coaching affect my childs school performance?',
    answer:
      'Actually, it improves school performance! Our students typically score 90-95+ in science because they understand concepts deeply. We ensure school syllabus is never compromised.',
  },
  {
    question: 'What competitive exams can my child appear for during Pre-NEET?',
    answer:
      'Students can appear for NTSE (Class 10), Science Olympiads (NSO, NSEB), KVPY, and other talent search exams. Our Pre-NEET program prepares them for all these along the way.',
  },
  {
    question: 'Is online Pre-NEET coaching effective?',
    answer:
      'Yes! Our online classes have same faculty and quality as offline. We use interactive tools, regular doubt sessions, and parent updates. Many successful students have studied entirely online with us.',
  },
]

export default function PreNEETCoachingPage() {
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
      <section className="relative bg-gradient-to-br from-rose-900 via-pink-800 to-red-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Rocket className="w-5 h-5 mr-2 text-rose-300" />
              Pre-NEET Coaching for Class 8-10
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-rose-300">Pre-NEET</span> Coaching
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Start Before Class 11 | Build Strong Foundation | Stress-Free NEET Journey
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              The earlier you start, the easier NEET becomes. Our Pre-NEET program for Class 8-10
              students builds strong conceptual foundation while ensuring school success. Give your
              child a head start!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-rose-400 text-black hover:bg-rose-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-rose-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View All Courses
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-rose-300" />
                <div className="text-2xl font-bold">Class 8-10</div>
                <div className="text-sm opacity-80">Early Start</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-rose-300" />
                <div className="text-2xl font-bold">10-15</div>
                <div className="text-sm opacity-80">Students/Batch</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-rose-300" />
                <div className="text-2xl font-bold">3x</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-rose-300" />
                <div className="text-2xl font-bold">95+</div>
                <div className="text-sm opacity-80">Board Score</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Target Audience Section */}
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
              When Should You Start?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pre-NEET coaching for different starting points
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {targetAudience.map((item, index) => (
              <motion.div
                key={item.class}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-8 border border-rose-100"
              >
                <item.icon className="w-12 h-12 text-rose-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.class}</h3>
                <p className="text-rose-600 font-medium mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Why Start Early?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The proven advantages of Pre-NEET coaching
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <advantage.icon className="w-12 h-12 text-rose-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
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
              What You Get in Pre-NEET Coaching
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
                <feature.icon className="w-12 h-12 text-rose-600 mb-4" />
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
                  <MessageCircle className="w-6 h-6 mr-3 text-rose-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 via-indigo-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Give Your Child a Head Start in NEET
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              The journey of a thousand miles begins with a single step!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-rose-400 text-black hover:bg-rose-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-rose-600"
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
              href="/neet-foundation-class-9"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Foundation Class 9
            </Link>
            <Link
              href="/neet-foundation-class-10"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Foundation Class 10
            </Link>
            <Link
              href="/biology-tutor-class-9"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 9 Biology Tutor
            </Link>
            <Link
              href="/ntse-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NTSE Coaching
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
