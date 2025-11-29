'use client'

import { motion } from 'framer-motion'
import {
  BookOpen,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Award,
  Brain,
  Heart,
  Leaf,
  Microscope,
  Play,
  ArrowRight,
  MessageCircle,
  Target,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const biologyTopics = [
  {
    icon: Leaf,
    title: 'Botany',
    topics: ['Plant Physiology', 'Plant Anatomy', 'Plant Morphology', 'Plant Kingdom', 'Ecology'],
    weightage: '50%',
  },
  {
    icon: Heart,
    title: 'Zoology',
    topics: ['Human Physiology', 'Animal Kingdom', 'Structural Organization', 'Biomolecules'],
    weightage: '50%',
  },
  {
    icon: Microscope,
    title: 'Cell Biology',
    topics: ['Cell Structure', 'Cell Division', 'Cell Cycle', 'Biomolecules'],
    weightage: 'High Priority',
  },
  {
    icon: Brain,
    title: 'Genetics',
    topics: ['Molecular Genetics', 'Inheritance', 'Biotechnology', 'Evolution'],
    weightage: 'Very High',
  },
]

const topperResults = [
  { name: 'Sadhna', score: '695/720', biologyScore: '360/360', rank: 'Top 100 AIR' },
  { name: 'Rahul Verma', score: '680/720', biologyScore: '355/360', rank: 'AIR 1,247' },
  { name: 'Priya Sharma', score: '665/720', biologyScore: '352/360', rank: 'AIR 2,156' },
  { name: 'Ananya Patel', score: '655/720', biologyScore: '348/360', rank: 'AIR 3,156' },
]

const features = [
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description:
      'Expert Biology teachers trained at AIIMS with 15+ years of NEET coaching experience',
  },
  {
    icon: Target,
    title: '360/360 Biology Toppers',
    description: 'Our teaching methodology has produced 50+ perfect Biology scorers in NEET',
  },
  {
    icon: BookOpen,
    title: 'NCERT-Focused Teaching',
    description: '90% of NEET Biology comes from NCERT. We cover every line, every diagram',
  },
  {
    icon: Users,
    title: 'Small Batches (15-20)',
    description: 'Personal attention for concept clarity and doubt resolution in Biology',
  },
]

const faqs = [
  {
    question: 'Why is specialized Biology coaching important for NEET?',
    answer:
      'Biology carries 360 marks (50%) in NEET - equal to Physics and Chemistry combined. Most students lose marks in Biology due to lack of specialized coaching. Our Biology-focused approach ensures you score 320+ in Biology.',
  },
  {
    question: 'What topics are covered in your NEET Biology coaching?',
    answer:
      'We cover complete NCERT Biology for Class 11 and 12: Botany (Plant Physiology, Anatomy, Morphology), Zoology (Human Physiology, Animal Kingdom), Genetics, Ecology, Biotechnology, Evolution, and all other NEET-important topics.',
  },
  {
    question: 'How do you help students score 360/360 in Biology?',
    answer:
      'Our 4-step approach: 1) Complete NCERT mastery with line-by-line coverage, 2) Diagram-based learning for visual memory, 3) 5000+ MCQ practice bank, 4) Weekly mock tests with detailed analysis.',
  },
  {
    question: 'Is online Biology coaching effective for NEET?',
    answer:
      'Our 98% success rate proves it! Online coaching allows screen-sharing for diagrams, instant doubt resolution, recorded lectures for revision, and flexible timings. Many toppers prefer online for Biology.',
  },
]

export default function NeetBiologyCoachingIndiaPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_biology_india', {
        event_category: 'conversion',
        event_label: 'neet_biology_coaching_india_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
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
              <Brain className="w-5 h-5 mr-2" />
              Specialized NEET Biology Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Biology Coaching</span> in India
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              360/360 Toppers • AIIMS Trained Faculty • Zoology & Botany Experts
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Biology is 50% of NEET! Our specialized Biology coaching has produced 50+ perfect
              scorers. Expert teaching in Human Physiology, Genetics, Botany, Zoology from AIIMS
              trained faculty.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary_cta"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Biology Demo
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Biology Syllabus
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">360/360</div>
                <div className="text-sm opacity-80">Perfect Biology Score</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm opacity-80">360 Scorers</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <Award className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">340+</div>
                <div className="text-sm opacity-80">Average Biology Score</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">2,500+</div>
                <div className="text-sm opacity-80">Biology Students</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Biology Topics Section */}
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
              Complete NEET Biology Syllabus Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Cell Biology to Ecology - comprehensive coverage of all NEET Biology topics.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {biologyTopics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="flex items-center mb-4">
                  <topic.icon className="w-10 h-10 text-purple-600 mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{topic.title}</h3>
                    <span className="text-purple-600 font-semibold">
                      Weightage: {topic.weightage}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {topic.topics.map((t) => (
                    <span
                      key={t}
                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Toppers Section */}
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
              Our Biology Toppers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Students who achieved perfect and near-perfect Biology scores in NEET.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {topperResults.map((topper, index) => (
              <motion.div
                key={topper.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 text-center"
              >
                <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-900">{topper.name}</h3>
                <div className="text-3xl font-bold text-purple-600 my-2">{topper.biologyScore}</div>
                <div className="text-gray-600 text-sm">Biology Score</div>
                <div className="text-gray-500 text-sm mt-2">{topper.rank}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Why Our Biology Coaching is Different
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
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
              Biology Coaching FAQs
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Score 360/360 in NEET Biology</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join India's best Biology coaching. AIIMS trained faculty, proven methodology, 50+
              perfect scorers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary_cta"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Biology Demo
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

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>360/360 Toppers</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Complete NCERT</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>5000+ MCQs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
