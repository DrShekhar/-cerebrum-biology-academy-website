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
  Brain,
  FileText,
  BarChart,
  Microscope,
  Dna,
  Leaf,
  Heart,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const ntseBiologyTopics = [
  {
    unit: 'Unit 1',
    title: 'Diversity in Living World',
    chapters: ['Classification', 'Five Kingdom', 'Plant Kingdom', 'Animal Kingdom'],
    weightage: '18%',
    icon: Leaf,
  },
  {
    unit: 'Unit 2',
    title: 'Cell Biology',
    chapters: ['Cell Structure', 'Cell Organelles', 'Cell Division', 'Biomolecules'],
    weightage: '15%',
    icon: Microscope,
  },
  {
    unit: 'Unit 3',
    title: 'Human Body Systems',
    chapters: ['Nutrition', 'Respiration', 'Circulation', 'Excretion', 'Nervous System'],
    weightage: '22%',
    icon: Heart,
  },
  {
    unit: 'Unit 4',
    title: 'Plant Physiology',
    chapters: ['Photosynthesis', 'Respiration', 'Transportation', 'Plant Hormones'],
    weightage: '12%',
    icon: Leaf,
  },
  {
    unit: 'Unit 5',
    title: 'Genetics & Evolution',
    chapters: ['Heredity', 'Mendels Laws', 'DNA Structure', 'Evolution'],
    weightage: '16%',
    icon: Dna,
  },
  {
    unit: 'Unit 6',
    title: 'Ecology & Environment',
    chapters: ['Ecosystem', 'Food Chain', 'Pollution', 'Conservation'],
    weightage: '17%',
    icon: Leaf,
  },
]

const questionTypes = [
  {
    type: 'Conceptual MCQs',
    percentage: '40%',
    description: 'Direct concept-based questions from NCERT',
  },
  {
    type: 'Application-Based',
    percentage: '30%',
    description: 'Apply concepts to real-life scenarios',
  },
  {
    type: 'Diagram-Based',
    percentage: '20%',
    description: 'Identify structures, processes from diagrams',
  },
  {
    type: 'Assertion-Reasoning',
    percentage: '10%',
    description: 'Logical reasoning with biology concepts',
  },
]

const features = [
  {
    icon: Award,
    title: 'NTSE Specialist Faculty',
    description: 'Faculty experienced in NTSE pattern and question types.',
  },
  {
    icon: BookOpen,
    title: 'SAT Focused Curriculum',
    description: 'Complete biology syllabus coverage for SAT section of NTSE.',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: '10-15 students per batch for individual attention.',
  },
  {
    icon: Brain,
    title: 'MAT + SAT Preparation',
    description: 'Integrated approach covering both MAT and SAT sections.',
  },
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Engaging sessions with MCQ practice and doubt resolution.',
  },
  {
    icon: FileText,
    title: 'Mock Tests & Analysis',
    description: 'Regular NTSE-pattern tests with detailed performance analysis.',
  },
]

const faqs = [
  {
    question: 'What is the weightage of Biology in NTSE SAT exam?',
    answer:
      'Biology forms about 35-40% of the Science section in NTSE SAT. This makes it crucial for scoring well. Our focused preparation ensures you maximize your biology score.',
  },
  {
    question: 'How is NTSE Biology preparation different from board exam preparation?',
    answer:
      'NTSE requires conceptual depth and application skills beyond board exams. Questions are MCQ-based, often with tricky options. We train students to think critically and avoid common traps.',
  },
  {
    question: 'What study materials are provided for NTSE Biology?',
    answer:
      'We provide comprehensive study material including topic-wise notes, previous year questions, chapter-wise MCQs, mock tests, and formula/concept sheets. All aligned with NTSE pattern.',
  },
  {
    question: 'Do you offer both Stage 1 and Stage 2 NTSE preparation?',
    answer:
      'Yes! We prepare students for both Stage 1 (State level) and Stage 2 (National level). The preparation is progressive with increasing difficulty as students advance.',
  },
  {
    question: 'Can I join NTSE biology preparation along with regular board coaching?',
    answer:
      'Absolutely! Our NTSE program complements board preparation. Since NTSE is based on NCERT, preparing for NTSE actually improves board exam performance.',
  },
]

export default function NTSEBiologyPreparationPage() {
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
      <section className="relative bg-gradient-to-br from-lime-900 via-green-800 to-green-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-5 h-5 mr-2 text-lime-300" />
              NTSE Biology Preparation
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-lime-300">NTSE Biology</span> Preparation
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Master SAT Biology | Score Maximum in Science Section
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Biology forms 35-40% of NTSE SAT Science section. Our focused preparation covers all
              topics with NTSE-pattern practice, helping you maximize your score in this crucial
              section.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-lime-400 text-black hover:bg-lime-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/ntse-coaching">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-lime-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View NTSE Course
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-lime-300" />
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm opacity-80">Stage 1 Selections</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-lime-300" />
                <div className="text-2xl font-bold">10-15</div>
                <div className="text-sm opacity-80">Students/Batch</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-lime-300" />
                <div className="text-2xl font-bold">35-40%</div>
                <div className="text-sm opacity-80">Biology in SAT</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-lime-300" />
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm opacity-80">NTSE Scholars</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Topic Weightage Section */}
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
              NTSE Biology Topics & Weightage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete SAT Biology syllabus with chapter-wise importance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ntseBiologyTopics.map((unit, index) => (
              <motion.div
                key={unit.unit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center">
                    <unit.icon className="w-6 h-6 text-lime-600" />
                  </div>
                  <span className="bg-lime-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {unit.weightage} SAT
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{unit.unit}</h3>
                <p className="text-lime-600 font-medium mb-3">{unit.title}</p>
                <ul className="space-y-1">
                  {unit.chapters.map((chapter) => (
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

      {/* Question Types Section */}
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
              NTSE Biology Question Types
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand the pattern to score better
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {questionTypes.map((item, index) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-lime-50 to-green-50 rounded-xl p-6 border border-lime-100"
              >
                <BarChart className="w-10 h-10 text-lime-600 mb-4" />
                <div className="text-3xl font-bold text-lime-600 mb-2">{item.percentage}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.type}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
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
              What You Get in NTSE Biology Coaching
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
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <feature.icon className="w-12 h-12 text-lime-600 mb-4" />
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
                  <MessageCircle className="w-6 h-6 mr-3 text-lime-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-lime-600 via-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Maximize Your NTSE Biology Score
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Expert coaching for NTSE SAT Biology section!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-lime-400 text-black hover:bg-lime-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-lime-600"
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
              href="/ntse-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NTSE Coaching
            </Link>
            <Link
              href="/ntse-online-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NTSE Online Classes
            </Link>
            <Link
              href="/biology-tutor-class-10"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 10 Biology Tutor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
