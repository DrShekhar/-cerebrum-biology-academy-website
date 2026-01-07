'use client'

import { motion } from 'framer-motion'
import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Target,
  Brain,
  Microscope,
  FlaskConical,
  Globe,
  TrendingUp,
  Shield,
  Zap,
  Clock,
  FileText,
  BookMarked,
  Beaker,
  Dna,
  Atom,
  Phone,
} from 'lucide-react'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const examBoards = [
  {
    name: 'Cambridge International',
    code: 'AS & A Level Biology (9700)',
    description: 'Paper 1: MCQs, Paper 2: AS Level Structured, Paper 3: Advanced Practical',
    features: ['Comprehensive syllabus coverage', 'Extended response training', 'Practical skills'],
    icon: Globe,
  },
  {
    name: 'Edexcel International',
    code: 'IAL Biology (XBI11/YBI11)',
    description: 'Unit 1: Lifestyle, Unit 2: Genetics, Unit 3: Practical, Unit 4-6: A2 Units',
    features: ['Modular approach', 'Flexible examination', 'Practical endorsement'],
    icon: BookOpen,
  },
  {
    name: 'AQA',
    code: 'A-Level Biology (7401/7402)',
    description: 'Paper 1: Biological topics 1-4, Paper 2: Topics 5-8, Paper 3: Synoptic',
    features: ['UK standard', 'Synoptic assessment', 'Required practicals'],
    icon: GraduationCap,
  },
  {
    name: 'OCR',
    code: 'A & B Specifications',
    description: 'OCR A (H420) & OCR B (H422) - Different approaches to Biology',
    features: ['A: Traditional', 'B: Contextual', 'Both well-supported'],
    icon: Award,
  },
]

const aLevelTopics = [
  {
    topic: 'Biological Molecules',
    weightage: '15%',
    subtopics: ['Carbohydrates', 'Proteins', 'Lipids', 'Nucleic acids', 'Water & inorganic ions'],
    difficulty: 'Medium',
    icon: Atom,
  },
  {
    topic: 'Cells',
    weightage: '12%',
    subtopics: ['Cell structure', 'Cell division', 'Transport', 'Cell recognition'],
    difficulty: 'Medium',
    icon: Microscope,
  },
  {
    topic: 'Exchange & Transport',
    weightage: '15%',
    subtopics: ['Surface area', 'Gas exchange', 'Digestion', 'Mass transport'],
    difficulty: 'High',
    icon: FlaskConical,
  },
  {
    topic: 'Genetic Information & Variation',
    weightage: '18%',
    subtopics: ['DNA', 'Protein synthesis', 'Genetic diversity', 'Biodiversity'],
    difficulty: 'High',
    icon: Dna,
  },
  {
    topic: 'Energy Transfers',
    weightage: '12%',
    subtopics: ['Photosynthesis', 'Respiration', 'Energy & ecosystems'],
    difficulty: 'Medium',
    icon: Zap,
  },
  {
    topic: 'Organisms & Environment',
    weightage: '15%',
    subtopics: ['Response to stimuli', 'Nervous system', 'Hormones', 'Homeostasis'],
    difficulty: 'High',
    icon: Target,
  },
  {
    topic: 'Genetics & Evolution',
    weightage: '13%',
    subtopics: ['Inheritance', 'Populations', 'Evolution', 'Gene expression'],
    difficulty: 'High',
    icon: TrendingUp,
  },
]

const asVsA2 = {
  as: {
    title: 'AS Level (Year 1)',
    content: [
      'Biological molecules (carbohydrates, proteins, lipids, nucleic acids)',
      'Cells (structure, membranes, division, transport)',
      'Exchange surfaces & breathing',
      'Transport in animals & plants',
      'Disease & immunity basics',
    ],
    practicals: 4,
    papers: 2,
    grade: 'Standalone qualification or contributes 40% to A-Level',
  },
  a2: {
    title: 'A2 Level (Year 2)',
    content: [
      'Energy transfers (photosynthesis & respiration)',
      'Response to stimuli (nervous & hormonal)',
      'Genetics, populations & evolution',
      'Control of gene expression',
      'Recombinant DNA technology',
    ],
    practicals: 8,
    papers: 3,
    grade: 'Completes full A-Level (combines with AS for final grade)',
  },
}

const aLevelFeatures = [
  {
    icon: FileText,
    title: 'Past Paper Intensive Practice',
    description:
      '15+ years of past papers from all exam boards. Mark scheme analysis, examiner reports, and question pattern recognition.',
    stat: '500+',
  },
  {
    icon: Beaker,
    title: 'Required Practical Skills',
    description:
      'Complete coverage of all 12 required practicals. Virtual lab simulations, practical endorsement preparation, and PAG mastery.',
    stat: '12 PAGs',
  },
  {
    icon: BookMarked,
    title: 'Extended Response Technique',
    description:
      '6-mark and essay-style question training. Critical thinking, synoptic links, and scientific writing skills.',
    stat: '6-9 marks',
  },
  {
    icon: GraduationCap,
    title: 'University Preparation',
    description:
      'Beyond A-Levels - preparation for Biology Olympiads, BMAT, and university interviews for Medicine & Biosciences.',
    stat: 'Oxbridge',
  },
]

const gradeBoundaries = [
  {
    board: 'Cambridge (9700)',
    astar: '85%+',
    a: '75%+',
    b: '65%+',
    tips: 'Focus on Paper 4 (A2 Structured) - highest weighting at 38%',
  },
  {
    board: 'Edexcel (IAL)',
    astar: '80%+',
    a: '70%+',
    b: '60%+',
    tips: 'Unit 5 (Energy & Control) typically has lowest grade boundaries',
  },
  {
    board: 'AQA (7401)',
    astar: '82%+',
    a: '72%+',
    b: '62%+',
    tips: 'Paper 3 synoptic - practice linking topics across entire syllabus',
  },
  {
    board: 'OCR A (H420)',
    astar: '81%+',
    a: '71%+',
    b: '61%+',
    tips: 'Module 6 (Genetics & Ecosystems) most challenging - allocate extra time',
  },
]

const successMetrics = [
  { label: 'A-Level Students', value: '400+', icon: Users },
  { label: 'A*/A Rate', value: '92%', icon: Trophy },
  { label: 'Average Score', value: '87%', icon: Star },
  { label: 'University Success', value: '96%', icon: Award },
]

const faqs = [
  {
    question: 'Do you teach all A-Level exam boards?',
    answer:
      'Yes! We provide specialized coaching for Cambridge International (9700), Edexcel IAL (XBI11/YBI11), AQA (7401/7402), and OCR A & B specifications. Our faculty are trained in the specific requirements and mark schemes of each board.',
  },
  {
    question: 'What is the difference between AS and A2 Level Biology?',
    answer:
      'AS Level (Year 1) covers foundation topics like biological molecules, cells, and basic transport systems. A2 Level (Year 2) covers advanced topics including gene expression, evolution, and complex control systems. AS contributes 40% to final A-Level grade, A2 contributes 60%.',
  },
  {
    question: 'How do you prepare students for required practicals?',
    answer:
      'We provide comprehensive coverage of all 12 required practicals (PAGs) through virtual lab simulations, practical technique videos, and detailed method analysis. Students get practice in experimental design, data analysis, and evaluation skills needed for the practical endorsement.',
  },
  {
    question: 'What is your A-Level Biology success rate?',
    answer:
      'Our students achieve 92% A*/A rate in A-Level Biology across all exam boards. Average score is 87%. We have helped 400+ students achieve top grades and secure places at leading universities including Oxford, Cambridge, Imperial, and UCL.',
  },
  {
    question: 'Do you offer help with university applications for Medicine and Biosciences?',
    answer:
      'Yes! Beyond A-Level preparation, we provide guidance for BMAT, UCAT, Biology Olympiads, and university interviews. Our faculty includes medical professionals who can help with personal statements and interview preparation for competitive Medicine and Biosciences programs.',
  },
  {
    question: 'How much time should I dedicate to A-Level Biology preparation?',
    answer:
      'For AS Level, we recommend 4-5 hours per week of focused study including classes. For A2 Level, increase to 6-7 hours per week. This includes attending live classes, completing assignments, practicing past papers, and reviewing content. Consistent effort is key to achieving A*/A grades.',
  },
]

export default function ALevelBiologyTutorPage() {
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
      <section className="relative bg-gradient-to-br from-purple-600 via-violet-700 to-violet-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6 border border-white/20">
              <Trophy className="w-5 h-5 mr-2 text-yellow-300" />
              Cambridge, Edexcel, AQA & OCR Expert
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              A-Level Biology Tutor |{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                92% A*/A Rate
              </span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Cambridge, Edexcel & AQA Expert | 400+ Students | University Preparation
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Master A-Level Biology with expert tutors specializing in all exam boards. From
              biological molecules to gene expression - achieve A*/A grades and secure top
              university places.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-white text-purple-700 hover:bg-gray-100 shadow-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-purple-700 cursor-pointer"
                onClick={async () => {
                  await trackAndOpenWhatsApp({
                    source: 'a-level-biology-hero',
                    message: WHATSAPP_MESSAGES.courseEnquiry,
                    campaign: 'a-level-biology',
                  })
                }}
              >
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp: +91 88264 44334
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
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

      {/* Exam Boards Section */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              All A-Level Exam Boards Covered
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized expertise in Cambridge, Edexcel, AQA, and OCR specifications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {examBoards.map((board, index) => (
              <motion.div
                key={board.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-purple-600 hover:shadow-2xl transition"
              >
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg mr-4">
                    <board.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{board.name}</h3>
                    <p className="text-purple-600 font-semibold">{board.code}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{board.description}</p>
                <div className="flex flex-wrap gap-2">
                  {board.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* A-Level Topics Coverage */}
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
              Complete A-Level Biology Syllabus Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master every topic with targeted teaching and exam board-specific focus
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aLevelTopics.map((topic, index) => (
              <motion.div
                key={topic.topic}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200 hover:border-purple-400 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <topic.icon className="w-10 h-10 text-purple-600" />
                  <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                    {topic.weightage}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.topic}</h3>
                <div className="mb-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      topic.difficulty === 'High'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {topic.difficulty} Difficulty
                  </span>
                </div>
                <ul className="space-y-1">
                  {topic.subtopics.map((subtopic) => (
                    <li key={subtopic} className="text-sm text-gray-600 flex items-start">
                      <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                      {subtopic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AS vs A2 Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              AS Level vs A2 Level: Understanding the Pathway
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Two-year progression from foundation to advanced Biology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-purple-500"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-100 rounded-lg mr-4">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{asVsA2.as.title}</h3>
                  <p className="text-purple-600 font-semibold">{asVsA2.as.grade}</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {asVsA2.as.content.map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-purple-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {asVsA2.as.practicals}
                  </div>
                  <div className="text-sm text-gray-600">Required Practicals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{asVsA2.as.papers}</div>
                  <div className="text-sm text-gray-600">Exam Papers</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-violet-600"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-violet-100 rounded-lg mr-4">
                  <GraduationCap className="w-8 h-8 text-violet-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{asVsA2.a2.title}</h3>
                  <p className="text-violet-600 font-semibold">{asVsA2.a2.grade}</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {asVsA2.a2.content.map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-violet-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-violet-600 mb-1">
                    {asVsA2.a2.practicals}
                  </div>
                  <div className="text-sm text-gray-600">Total Practicals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-violet-600 mb-1">{asVsA2.a2.papers}</div>
                  <div className="text-sm text-gray-600">Exam Papers</div>
                </div>
              </div>
            </motion.div>
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
              Beyond Standard Teaching
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced preparation techniques for A*/A grades
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aLevelFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 shadow-lg hover:shadow-xl transition text-center border border-purple-100"
              >
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">{feature.stat}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Grade Boundaries */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-violet-900 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Understanding Grade Boundaries</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Know exactly what you need for A*/A grades in each exam board
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {gradeBoundaries.map((boundary, index) => (
              <motion.div
                key={boundary.board}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-2xl font-bold mb-4">{boundary.board}</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-yellow-300 text-sm font-semibold mb-1">A*</div>
                    <div className="text-2xl font-bold">{boundary.astar}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-300 text-sm font-semibold mb-1">A</div>
                    <div className="text-2xl font-bold">{boundary.a}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-300 text-sm font-semibold mb-1">B</div>
                    <div className="text-2xl font-bold">{boundary.b}</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/20">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 mr-2 mt-1 text-yellow-300 flex-shrink-0" />
                    <p className="text-sm opacity-90">{boundary.tips}</p>
                  </div>
                </div>
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
            <p className="text-xl text-gray-600">
              Everything you need to know about A-Level Biology
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-8 shadow-lg border border-purple-100"
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
      <section className="py-20 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Achieve A*/A in A-Level Biology?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join 400+ students achieving top grades. Expert tutors, all exam boards, proven
              results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-white text-purple-700 hover:bg-gray-100 shadow-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-purple-700 cursor-pointer"
                onClick={async () => {
                  await trackAndOpenWhatsApp({
                    source: 'a-level-biology-cta',
                    message: WHATSAPP_MESSAGES.courseEnquiry,
                    campaign: 'a-level-biology',
                  })
                }}
              >
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp Now
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All Exam Boards</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>92% A*/A Rate</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Expert Tutors</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>University Prep</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 bg-gradient-to-br from-purple-50 to-violet-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Explore More Programs
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/campbell-biology/"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow hover:shadow-md hover:bg-teal-700 transition"
            >
              Campbell Biology (56 Chapters)
            </Link>
            <Link
              href="/ib-biology-online-classes/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-purple-200 hover:border-purple-400"
            >
              IB Biology
            </Link>
            <Link
              href="/ap-biology-online-tutor/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-purple-200 hover:border-purple-400"
            >
              AP Biology
            </Link>
            <Link
              href="/mcat-biology-preparation/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-purple-200 hover:border-purple-400"
            >
              MCAT Biology
            </Link>
            <Link
              href="/biology-olympiad-preparation/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-purple-200 hover:border-purple-400"
            >
              Biology Olympiad
            </Link>
            <Link
              href="/usabo-coaching/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-purple-200 hover:border-purple-400"
            >
              USABO Coaching
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
