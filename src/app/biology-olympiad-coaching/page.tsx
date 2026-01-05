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
  Globe,
  Microscope,
  Dna,
  Leaf,
  Heart,
  GraduationCap,
  Medal,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const olympiadPathway = [
  {
    stage: 'Stage 1',
    name: 'NSEB',
    description: 'National Standard Examination in Biology',
    date: 'November',
    icon: Target,
  },
  {
    stage: 'Stage 2',
    name: 'INBO',
    description: 'Indian National Biology Olympiad',
    date: 'February',
    icon: Award,
  },
  {
    stage: 'Stage 3',
    name: 'OCSC',
    description: 'Orientation cum Selection Camp',
    date: 'April',
    icon: GraduationCap,
  },
  {
    stage: 'Stage 4',
    name: 'IBO',
    description: 'International Biology Olympiad',
    date: 'July',
    icon: Globe,
  },
]

const syllabus = [
  {
    unit: 'Cell Biology',
    topics: ['Cell Structure', 'Cell Organelles', 'Cell Division', 'Cell Signaling'],
    weightage: '15%',
    icon: Microscope,
  },
  {
    unit: 'Molecular Biology',
    topics: ['DNA/RNA', 'Protein Synthesis', 'Gene Expression', 'Biotechnology'],
    weightage: '20%',
    icon: Dna,
  },
  {
    unit: 'Plant Biology',
    topics: ['Plant Anatomy', 'Photosynthesis', 'Plant Hormones', 'Plant Reproduction'],
    weightage: '18%',
    icon: Leaf,
  },
  {
    unit: 'Animal Biology',
    topics: ['Animal Physiology', 'Human Systems', 'Reproduction', 'Development'],
    weightage: '22%',
    icon: Heart,
  },
  {
    unit: 'Ecology & Evolution',
    topics: ['Ecosystems', 'Population Ecology', 'Evolutionary Biology', 'Biodiversity'],
    weightage: '15%',
    icon: Leaf,
  },
  {
    unit: 'Genetics',
    topics: ['Mendelian Genetics', 'Molecular Genetics', 'Population Genetics', 'Human Genetics'],
    weightage: '10%',
    icon: Dna,
  },
]

const features = [
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description:
      'Learn from faculty with Olympiad mentoring experience and deep subject expertise.',
  },
  {
    icon: BookOpen,
    title: 'College-Level Syllabus',
    description: 'Cover undergraduate biology topics required for Olympiad success.',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: '8-10 students per batch for intensive training and individual attention.',
  },
  {
    icon: Globe,
    title: 'International Exposure',
    description: 'Prepare for international level with advanced problems and global perspective.',
  },
  {
    icon: Microscope,
    title: 'Practical Training',
    description: 'Lab sessions for practical component of Biology Olympiad.',
  },
  {
    icon: Target,
    title: 'Mock Tests',
    description: 'Regular NSEB-pattern tests with detailed analysis and feedback.',
  },
]

const faqs = [
  {
    question: 'What is the Biology Olympiad pathway in India?',
    answer:
      'The pathway is: NSEB (National Standard Examination in Biology) → INBO (Indian National Biology Olympiad) → OCSC (Orientation cum Selection Camp) → IBO (International Biology Olympiad). Top performers at each stage advance to the next.',
  },
  {
    question: 'Who can participate in Biology Olympiad?',
    answer:
      'Students from Class 8-12 can participate in NSEB. However, only those in Class 11 or 12 (who havent passed Class 12) can progress to IBO. We recommend starting from Class 9-10 for thorough preparation.',
  },
  {
    question: 'What is the syllabus for Biology Olympiad?',
    answer:
      'Biology Olympiad covers undergraduate level biology including Cell Biology, Molecular Biology, Plant Biology, Animal Physiology, Genetics, Ecology, and Evolution. It goes beyond NCERT and requires college-level understanding.',
  },
  {
    question: 'How is Olympiad coaching different from regular biology coaching?',
    answer:
      'Olympiad requires college-level depth, problem-solving skills, and practical knowledge. We cover advanced topics, international-level problems, and include practical training that regular coaching doesnt cover.',
  },
  {
    question: 'What are the benefits of clearing Biology Olympiad?',
    answer:
      'Benefits include: international recognition, automatic selection in premier universities abroad, KVPY-like scholarship, strong profile for medical/research admissions, and exceptional preparation for NEET biology.',
  },
]

export default function BiologyOlympiadCoachingPage() {
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
      <section className="relative bg-gradient-to-br from-green-800 via-cyan-800 to-green-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Globe className="w-5 h-5 mr-2 text-green-400" />
              Biology Olympiad Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-green-400">Biology Olympiad</span> Coaching
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              NSEB → INBO → IBO | Compete Internationally | Research Exposure
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Prepare for Biology Olympiad with expert coaching. Our program covers NSEB to IBO
              pathway with college-level syllabus, practical training, and international exposure.
              Represent India on the global stage!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-green-500 text-black hover:bg-green-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/olympiad-preparation">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-800"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View All Olympiads
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">NSEB</div>
                <div className="text-sm opacity-80">to IBO Pathway</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">8-10</div>
                <div className="text-sm opacity-80">Students/Batch</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">UG Level</div>
                <div className="text-sm opacity-80">Syllabus</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm opacity-80">INBO Qualifiers</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Olympiad Pathway Section */}
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
              Biology Olympiad Pathway
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From NSEB to representing India at International Biology Olympiad
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {olympiadPathway.map((stage, index) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-100 h-full">
                  <stage.icon className="w-12 h-12 text-green-600 mb-4" />
                  <div className="text-sm text-green-600 font-semibold mb-1">{stage.stage}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{stage.name}</h3>
                  <p className="text-gray-600 mb-2">{stage.description}</p>
                  <span className="text-sm text-gray-500">{stage.date}</span>
                </div>
                {index < olympiadPathway.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-green-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
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
              Biology Olympiad Syllabus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              College-level syllabus for competitive edge
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabus.map((unit, index) => (
              <motion.div
                key={unit.unit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <unit.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {unit.weightage}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{unit.unit}</h3>
                <ul className="space-y-1">
                  {unit.topics.map((topic) => (
                    <li key={topic} className="text-sm text-gray-600 flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      {topic}
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
              What You Get in Biology Olympiad Coaching
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
                <feature.icon className="w-12 h-12 text-green-600 mb-4" />
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
              Represent India at International Biology Olympiad
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Start your journey from NSEB to IBO today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-green-500 text-black hover:bg-green-400"
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
              href="/usabo-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              USABO Coaching (USA)
            </Link>
            <Link
              href="/olympiad-preparation"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              All Olympiad Preparation
            </Link>
            <Link
              href="/nso-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NSO Coaching
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
