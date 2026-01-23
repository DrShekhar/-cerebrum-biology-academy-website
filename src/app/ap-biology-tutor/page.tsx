'use client'

import { motion } from 'framer-motion'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import {
  Trophy,
  Users,
  CheckCircle,
  Award,
  Clock,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  Target,
  Brain,
  Microscope,
  Medal,
  FileText,
  TrendingUp,
  Zap,
  Lightbulb,
  BarChart3,
  Phone,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const apBiologyUnits = [
  {
    unit: 'Unit 1',
    title: 'Chemistry of Life',
    topics: ['Water & Carbon', 'Macromolecules', 'Nucleic Acids', 'Cell Structure'],
    percentage: '8-11%',
  },
  {
    unit: 'Unit 2',
    title: 'Cell Structure & Function',
    topics: ['Cell Membrane', 'Transport', 'Cell Compartmentalization', 'Cell Types'],
    percentage: '10-13%',
  },
  {
    unit: 'Unit 3',
    title: 'Cellular Energetics',
    topics: ['Enzymes', 'Photosynthesis', 'Cellular Respiration', 'Fitness'],
    percentage: '12-16%',
  },
  {
    unit: 'Unit 4',
    title: 'Cell Communication & Cell Cycle',
    topics: ['Cell Signaling', 'Feedback', 'Cell Cycle', 'Regulation'],
    percentage: '10-15%',
  },
  {
    unit: 'Unit 5',
    title: 'Heredity',
    topics: ['Meiosis', 'Mendelian Genetics', 'Non-Mendelian', 'Environmental Effects'],
    percentage: '8-11%',
  },
  {
    unit: 'Unit 6',
    title: 'Gene Expression & Regulation',
    topics: ['DNA Structure', 'Transcription', 'Translation', 'Gene Regulation', 'Biotechnology'],
    percentage: '12-16%',
  },
  {
    unit: 'Unit 7',
    title: 'Natural Selection',
    topics: ['Evolution', 'Phylogeny', 'Speciation', 'Origin of Life', 'Variation'],
    percentage: '13-20%',
  },
  {
    unit: 'Unit 8',
    title: 'Ecology',
    topics: ['Population Dynamics', 'Community Ecology', 'Energy Flow', 'Ecosystems'],
    percentage: '10-15%',
  },
]

const examFormat = [
  {
    section: 'Section I: Multiple Choice',
    duration: '90 minutes',
    questions: '60 questions',
    weight: '50% of score',
    details: [
      '40-45 discrete questions',
      '15-20 questions in sets (data analysis)',
      'No penalty for wrong answers',
      'Calculator not allowed',
    ],
  },
  {
    section: 'Section II: Free Response',
    duration: '90 minutes',
    questions: '6 questions',
    weight: '50% of score',
    details: [
      '2 Long Free Response (8-10 points each)',
      '4 Short Free Response (4 points each)',
      '10-minute reading period',
      'Calculator allowed on specific questions',
    ],
  },
]

const scoreDistribution = [
  {
    score: 5,
    percentage: '~15%',
    description: 'Extremely Well Qualified',
    color: 'bg-green-600',
  },
  {
    score: 4,
    percentage: '~25%',
    description: 'Well Qualified',
    color: 'from-blue-500 to-blue-600',
  },
  {
    score: 3,
    percentage: '~30%',
    description: 'Qualified',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    score: 2,
    percentage: '~20%',
    description: 'Possibly Qualified',
    color: 'bg-orange-500',
  },
  {
    score: 1,
    percentage: '~10%',
    description: 'No Recommendation',
    color: 'bg-red-600',
  },
]

const features = [
  {
    icon: FileText,
    title: 'FRQ Mastery',
    description:
      'Extensive practice with College Board-style Free Response Questions. Get expert feedback on your answers and learn the exact rubric grading standards.',
  },
  {
    icon: Microscope,
    title: 'Lab Investigations',
    description:
      'Master all 13 College Board-recommended labs with virtual simulations and detailed analysis. Understand experimental design and data interpretation.',
  },
  {
    icon: Brain,
    title: 'Science Practices',
    description:
      'Master all 6 science practices tested on AP Bio: concept explanation, visual representations, questions & methods, data analysis, argumentation, and theory application.',
  },
  {
    icon: Target,
    title: 'College Credit Ready',
    description:
      'Our students consistently score 4-5, earning college credit. Save thousands in tuition and start college ahead with a strong biology foundation.',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description:
      'Unit-wise assessments track your mastery. Detailed analytics show strengths and weaknesses. Data-driven study plans ensure efficient preparation.',
  },
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Real-time instruction from AP Biology experts. Small batch sizes ensure personalized attention. Recorded sessions for unlimited review.',
  },
]

const successStats = [
  { label: 'Students Taught', value: '300+', icon: Users },
  { label: 'Score 4-5 Rate', value: '90%', icon: Trophy },
  { label: 'Expert Tutors', value: 'PhD Level', icon: Award },
  { label: 'Avg Score Gain', value: '+1.5', icon: TrendingUp },
]

const faqs = [
  {
    question: 'What is AP Biology and why should I take it?',
    answer:
      'AP Biology is a College Board advanced placement course equivalent to a two-semester college introductory biology course. Taking AP Bio demonstrates academic rigor to colleges, can earn you college credit (saving $3,000-5,000), and provides an excellent foundation for medical, biological, or environmental science careers. Students who score 4-5 typically place out of introductory biology in college.',
  },
  {
    question: 'How is the AP Biology exam scored?',
    answer:
      'The AP Biology exam is scored on a scale of 1-5. Your composite score combines Section I (60 multiple choice, 50%) and Section II (6 free response, 50%). The scoring rubric: 5 (Extremely Well Qualified) - top 15% of students, typically 104-150 points; 4 (Well Qualified) - next 25%, typically 85-103 points; 3 (Qualified) - next 30%. Most colleges grant credit for scores of 4-5, and some accept 3.',
  },
  {
    question: 'How long should I prepare for the AP Biology exam?',
    answer:
      'Most successful students prepare for 8-10 months (full academic year). Our comprehensive program covers all 8 units systematically with regular practice tests. Starting early allows time to master complex topics like cellular energetics, genetics, and evolution. We recommend beginning in August-September for the May exam. Last-minute crash courses rarely produce 4-5 scores.',
  },
  {
    question: 'What makes your AP Biology tutoring program different?',
    answer:
      'Our tutors have PhD-level biology expertise and proven track records with 90% of students scoring 4-5. We provide College Board-aligned curriculum, extensive FRQ practice with expert feedback, all 13 recommended lab simulations, unit-wise assessments, personalized study plans, and small batch sizes (8-12 students). We teach test-taking strategies specific to AP Bio, not just content.',
  },
  {
    question: 'Do I need to take the AP Biology course at school to take the exam?',
    answer:
      'No! Many students self-study or take our tutoring program without taking AP Bio at school. However, the exam is comprehensive and requires systematic preparation. Our program is designed for both students taking AP Bio at school (who want to excel) and self-study students who need complete instruction. We cover all content from the College Board curriculum framework.',
  },
  {
    question: 'What resources and materials are included?',
    answer:
      'Complete College Board-aligned study materials including digital textbook, unit-wise study guides, 500+ practice MCQs, 100+ FRQ questions with rubrics, all 13 lab simulations, formula sheets, practice exams (full-length), video library of complex topics, and WhatsApp support for doubt resolution. All materials are updated to match the current AP Biology curriculum framework.',
  },
]

export default function APBiologyTutorPage() {
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
      <section className="relative bg-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-indigo-100" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium mb-6 border border-white/20">
              <Medal className="w-5 h-5 mr-2 text-yellow-300" />
              College Board Curriculum Experts
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              AP Biology Tutor | <span className="text-yellow-300">Score 5</span> on Your AP Bio
              Exam
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4 font-medium">
              Master All 8 Units | College Board Aligned | PhD-Level Tutors
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Achieve your target AP Biology score with expert tutoring. Our proven curriculum
              covers all College Board units, FRQ strategies, and lab investigations. Join 300+
              students who scored 4-5!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-bold shadow-xl"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Button
                variant="outline"
                size="xl"
                onClick={async () => {
                  await trackAndOpenWhatsApp({
                    source: 'ap-biology-tutor-hero',
                    message: 'Hi! I am interested in AP Biology tutoring',
                    campaign: 'ap-biology-page',
                  })
                }}
                className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm font-bold cursor-pointer"
              >
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp: +91 88264 44334
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successStats.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
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

      {/* AP Biology Units (College Board Curriculum) */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete College Board Curriculum Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We cover all 8 AP Biology units aligned with the College Board Curriculum Framework.
              Master every topic tested on the exam.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {apBiologyUnits.map((unit, index) => (
              <motion.div
                key={unit.unit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-blue-100 hover:border-blue-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    {unit.unit}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">{unit.percentage}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">{unit.title}</h3>

                <ul className="space-y-2">
                  {unit.topics.map((topic) => (
                    <li key={topic} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Format Section */}
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
              AP Biology Exam Format
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand the exam structure and master both sections with our targeted strategies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {examFormat.map((section, index) => (
              <motion.div
                key={section.section}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8 shadow-lg border-2 border-blue-200"
              >
                <h3 className="text-2xl font-bold text-blue-900 mb-4">{section.section}</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm px-4 py-3 rounded-lg">
                    <span className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      Duration
                    </span>
                    <span className="font-bold text-gray-900">{section.duration}</span>
                  </div>

                  <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm px-4 py-3 rounded-lg">
                    <span className="flex items-center text-gray-700">
                      <FileText className="w-5 h-5 mr-2 text-blue-600" />
                      Questions
                    </span>
                    <span className="font-bold text-gray-900">{section.questions}</span>
                  </div>

                  <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm px-4 py-3 rounded-lg">
                    <span className="flex items-center text-gray-700">
                      <Target className="w-5 h-5 mr-2 text-blue-600" />
                      Score Weight
                    </span>
                    <span className="font-bold text-gray-900">{section.weight}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-gray-900 mb-3">Key Details:</h4>
                  {section.details.map((detail) => (
                    <div key={detail} className="flex items-start text-sm text-gray-700">
                      <Zap className="w-4 h-4 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 bg-blue-600 text-white rounded-xl p-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-300" />
              Scoring Strategy
            </h3>
            <p className="text-lg opacity-90 leading-relaxed">
              Total exam time: 3 hours (180 minutes). Composite score combines both sections
              equally. Raw score is converted to 1-5 scale. No penalty for wrong answers on MCQs, so
              always guess! FRQs use specific rubrics - we teach you exactly what graders look for.
              Practice makes perfect - our program includes 10+ full-length practice exams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Score Distribution */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              AP Biology Score Distribution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Understanding national score distribution helps you set realistic goals
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {scoreDistribution.map((item, index) => (
              <motion.div
                key={item.score}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                    >
                      {item.score}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{item.description}</h3>
                      <p className="text-gray-600">{item.percentage} of students nationally</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.score >= 4 && (
                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                        College Credit
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 bg-[#4a5d4a] text-white rounded-xl p-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Trophy className="w-8 h-8 mr-3 text-yellow-300" />
              How We Help You Reach Top Scores
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-bold mb-2 text-lg">National Average: 40% score 4-5</h4>
                <p className="opacity-90">Most students struggle with FRQs and complex topics</p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-lg">Our Students: 90% score 4-5</h4>
                <p className="opacity-90">
                  Systematic preparation, expert guidance, proven strategies
                </p>
              </div>
            </div>
          </motion.div>
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
              What Makes Our AP Bio Tutoring Special
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive preparation beyond just content knowledge
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition-all border border-blue-100"
              >
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
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
              Everything you need to know about AP Biology preparation
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
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Score 5 on Your AP Biology Exam?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Join 300+ students who achieved their target scores. Expert tutoring, proven
              curriculum, personalized attention. Your AP Bio success starts here!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-bold shadow-xl"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm font-bold"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>PhD Tutors</span>
              </div>
              <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>90% Score 4-5</span>
              </div>
              <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Small Batches</span>
              </div>
              <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
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
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Related AP & Biology Resources
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition font-medium text-gray-700 hover:text-blue-600"
            >
              Biology Tutor
            </Link>
            <Link
              href="/biology-tutor-class-12-cbse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition font-medium text-gray-700 hover:text-blue-600"
            >
              Class 12 Biology Tutor
            </Link>
            <Link
              href="/neet-biology-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition font-medium text-gray-700 hover:text-blue-600"
            >
              NEET Biology Classes
            </Link>
            <Link
              href="/biology-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition font-medium text-gray-700 hover:text-blue-600"
            >
              Biology Coaching
            </Link>
            <Link
              href="/biology-teacher"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition font-medium text-gray-700 hover:text-blue-600"
            >
              Expert Biology Teachers
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
