'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  MapPin,
  Phone,
  Play,
  Home,
  Award,
  Users,
  Target,
  GraduationCap,
  Star,
  FileText,
  Microscope,
  Dna,
  Brain,
  Leaf,
  Train,
  Beaker,
  Clock,
  TrendingUp,
  Calculator,
  Video,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ {
  question: string
  answer: string
}

const syllabusTopics = [
  {
    unit: 'Human Physiology',
    chapters: ['Reproduction in Organisms', 'Human Reproduction', 'Reproductive Health'],
    board: 'CBSE Class 12',
    icon: Dna,
    neetRelevance: 'Very High',
    neetWeightage: '12%',
  },
  {
    unit: 'Genetics & Evolution',
    chapters: ['Principles of Inheritance', 'Molecular Basis of Inheritance', 'Evolution'],
    board: 'CBSE Class 12',
    icon: Brain,
    neetRelevance: 'Very High',
    neetWeightage: '18%',
  },
  {
    unit: 'Biology in Human Welfare',
    chapters: ['Human Health & Disease', 'Microbes in Human Welfare'],
    board: 'CBSE Class 12',
    icon: Microscope,
    neetRelevance: 'High',
    neetWeightage: '8%',
  },
  {
    unit: 'Biotechnology',
    chapters: ['Biotechnology Principles & Processes', 'Biotechnology & Its Applications'],
    board: 'CBSE Class 12',
    icon: Beaker,
    neetRelevance: 'High',
    neetWeightage: '10%',
  },
  {
    unit: 'Ecology',
    chapters: ['Organisms & Populations', 'Ecosystem', 'Biodiversity & Conservation'],
    board: 'CBSE Class 12',
    icon: Leaf,
    neetRelevance: 'High',
    neetWeightage: '14%',
  },
]

const features = [
  {
    title: 'Board + NEET Dual Prep',
    description: 'Integrated preparation covering both CBSE boards and NEET syllabus',
    icon: Target,
  },
  {
    title: 'NCERT Mastery',
    description: 'Line-by-line NCERT coverage - the bible for both exams',
    icon: BookOpen,
  },
  {
    title: 'Expert Faculty',
    description: 'Teachers with 10+ years experience in Class 12 & NEET Biology',
    icon: Users,
  },
  {
    title: 'Small Batches',
    description: 'Maximum 15-18 students for individual attention',
    icon: GraduationCap,
  },
  {
    title: 'Practical Coaching',
    description: 'Complete lab work, viva prep & practical file guidance',
    icon: Beaker,
  },
  {
    title: 'Regular Testing',
    description: 'Weekly board-pattern tests + NEET MCQs',
    icon: FileText,
  },
]

const studentResults = [
  {
    name: 'Ananya Sharma',
    school: 'DPS Rohini',
    boardScore: '97%',
    neetScore: 'AIR 3,450',
    year: '2024',
    quote: 'The dual prep approach helped me score high in boards while staying NEET-ready.',
  },
  {
    name: 'Rahul Verma',
    school: 'Ryan International',
    boardScore: '95%',
    neetScore: 'AIR 5,200',
    year: '2024',
    quote: 'Practical coaching and board prep together saved my time and improved my scores.',
  },
  {
    name: 'Priya Singh',
    school: 'Bal Bharati Rohini',
    boardScore: '94%',
    neetScore: 'AIR 8,100',
    year: '2024',
    quote: 'NCERT-focused teaching with NEET MCQs is the perfect combination.',
  },
  {
    name: 'Arjun Kapoor',
    school: 'Venkateshwar International',
    boardScore: '96%',
    neetScore: 'AIR 4,800',
    year: '2023',
    quote: 'Small batch size meant I could ask all my doubts and understand concepts deeply.',
  },
]

const premiumSchools = [
  'DPS Rohini',
  'Ryan International Rohini',
  'Bal Bharati Rohini',
  'GD Goenka Rohini',
  'Mount Abu Public School',
  'Venkateshwar International',
  'St. Marks Sr. Sec. School',
  'Maharaja Agrasen Model School',
  'N.C. Jindal Public School',
  'The Indian Heights School',
]

const dualPrepBenefits = [
  '70% of NEET Biology is from Class 12 syllabus',
  'NCERT is the primary source for both exams',
  'Board concepts form the foundation for NEET MCQs',
  'Diagram-based questions important for both exams',
  'Single preparation saves time and energy',
  'Conceptual clarity benefits both exam formats',
]

const practicalTopics = [
  'Study of pollen germination on a slide',
  'Study of osmosis by potato osmometer',
  'Study of mitosis in onion root tip',
  'Study of flowers adapted to pollination',
  'Preparation of temporary mounts',
  'Study of T.S. of dicot and monocot stems',
  'Detection of sugar, starch, protein in plant/animal materials',
  'Study of specimens from Biology Museum',
]

const neetTools = [
  {
    name: 'NEET Rank Predictor',
    path: '/neet-rank-predictor',
    description: 'Predict your NEET rank based on expected score',
    icon: TrendingUp,
  },
  {
    name: 'NEET College Predictor',
    path: '/neet-college-predictor',
    description: 'Find colleges you can get based on your rank',
    icon: GraduationCap,
  },
  {
    name: 'NEET Biology MCQ',
    path: '/neet-biology-mcq',
    description: 'Practice chapter-wise MCQs for NEET Biology',
    icon: FileText,
  },
]

export default function Board12BiologyRohiniContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: '12th-board-biology-coaching-rohini',
      message: 'Hi! I need 12th board biology coaching with NEET preparation at Rohini',
      campaign: '12th-board-biology-rohini',
    })
  }

  const rohiniCenter = CONTACT_INFO.centers.rohini

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-teal-600">
                <Home className="w-4 h-4" />
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <Link href="/biology-coaching" className="text-gray-600 hover:text-teal-600">
                Biology Coaching
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">12th Board Biology Rohini</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-indigo-900 via-purple-800 to-violet-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-violet-500/20 text-violet-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              CBSE Board + NEET Dual Preparation
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Dual Preparation: 12th Boards + NEET
              <span className="block text-violet-400 mt-2">in Rohini, Delhi</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Excel in your CBSE Class 12 Board exams while simultaneously preparing for NEET. Our DC Chauk center
              offers integrated Biology coaching that ensures success in both exams with expert faculty and
              personalized attention.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Target className="w-5 h-5 text-violet-400" />
                <span>Board + NEET</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <FileText className="w-5 h-5 text-indigo-400" />
                <span>CBSE Class 12</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Users className="w-5 h-5 text-purple-400" />
                <span>Max 15-18 Students</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span>DC Chauk Center</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-violet-500 text-white hover:bg-violet-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30"
              >
                <Phone className="w-5 h-5" />
                WhatsApp: +91-88264-44334
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Board + NEET Dual Prep */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 to-violet-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Board + NEET Dual Preparation Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Class 12 is the most crucial year - 70% of NEET Biology comes from Class 12 syllabus
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-violet-600" />
                </div>
                Benefits of Dual Preparation
              </h3>
              <ul className="space-y-4">
                {dualPrepBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6">Class 12 to NEET Connection</h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="font-semibold mb-2">Genetics & Evolution</div>
                  <div className="text-sm text-violet-100">
                    Highest NEET weightage (18%) - Direct from Class 12 syllabus
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="font-semibold mb-2">Ecology</div>
                  <div className="text-sm text-violet-100">
                    14% NEET weightage - Easy scoring with proper preparation
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="font-semibold mb-2">Human Reproduction</div>
                  <div className="text-sm text-violet-100">12% NEET weightage - Diagram-heavy, needs practice</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="font-semibold mb-2">Biotechnology</div>
                  <div className="text-sm text-violet-100">10% NEET weightage - Application-based questions</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Our 12th Board + NEET Coaching?
            </h2>
            <p className="text-xl text-slate-600">
              Comprehensive preparation ensuring excellence in CBSE boards and NEET
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Coverage */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Complete Class 12 Biology Syllabus Coverage
            </h2>
            <p className="text-xl text-slate-600">All units covered with NEET weightage highlighted</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabusTopics.map((topic, index) => (
              <motion.div
                key={topic.unit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                      <topic.icon className="w-5 h-5 text-violet-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{topic.unit}</h3>
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  <span className="bg-violet-100 text-violet-700 px-2 py-1 rounded-full text-xs font-medium">
                    {topic.board}
                  </span>
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                    NEET: {topic.neetWeightage}
                  </span>
                </div>
                <ul className="space-y-2">
                  {topic.chapters.map((chapter) => (
                    <li key={chapter} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0" />
                      {chapter}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical/Lab Coaching Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Beaker className="w-4 h-4" />
              Practical Coaching Included
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Lab & Practical Training</h2>
            <p className="text-xl text-violet-100 max-w-3xl mx-auto">
              CBSE Class 12 Biology practical exam is worth 30 marks - we ensure you score full marks
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold mb-6">Practical Experiments Covered</h3>
              <ul className="space-y-3">
                {practicalTopics.map((topic, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-violet-300 flex-shrink-0 mt-0.5" />
                    <span className="text-violet-100">{topic}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="font-bold text-lg mb-3">Practical File Guidance</h4>
                <p className="text-violet-100">
                  Complete practical file preparation with proper format, diagrams, and observations
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="font-bold text-lg mb-3">Viva Preparation</h4>
                <p className="text-violet-100">
                  Mock viva sessions with expected questions and model answers for internal examiners
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="font-bold text-lg mb-3">Spotting & Identification</h4>
                <p className="text-violet-100">
                  Practice sessions for specimen spotting and slide identification with real samples
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FREE NEET Tools */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              FREE NEET Tools
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Use Our Free NEET Preparation Tools
            </h2>
            <p className="text-xl text-slate-600">Plan your NEET journey while preparing for boards</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {neetTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={tool.path}
                  className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <tool.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{tool.name}</h3>
                  <p className="text-slate-600 mb-4">{tool.description}</p>
                  <span className="text-green-600 font-semibold flex items-center gap-1">
                    Try Free <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Results */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Results from Rohini Students
            </h2>
            <p className="text-xl text-slate-600">Our students excel in both Board exams and NEET</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentResults.map((student, index) => (
              <motion.div
                key={student.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-violet-200 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{student.name}</h4>
                    <p className="text-sm text-slate-600">{student.school}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="text-xs text-slate-500 mb-1">Board Score</div>
                    <div className="font-bold text-violet-600">{student.boardScore}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="text-xs text-slate-500 mb-1">NEET Rank</div>
                    <div className="font-bold text-green-600">{student.neetScore}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 italic">&quot;{student.quote}&quot;</p>
                <div className="mt-3 text-xs text-slate-500">Batch of {student.year}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Schools */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-4">Students from Top Rohini Schools</h2>
            <p className="text-violet-100">We teach Class 12 students from all major schools in Rohini</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {premiumSchools.map((school) => (
              <span key={school} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                {school}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details & Location */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-violet-100">
                  <span className="text-slate-600">Course</span>
                  <span className="font-semibold">Class XII Board + NEET Biology</span>
                </div>
                <div className="flex justify-between py-3 border-b border-violet-100">
                  <span className="text-slate-600">Duration</span>
                  <span className="font-semibold">1 Year (with Board & NEET batches)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-violet-100">
                  <span className="text-slate-600">Fee</span>
                  <span className="font-semibold text-violet-600">Rs. 72,200/year</span>
                </div>
                <div className="flex justify-between py-3 border-b border-violet-100">
                  <span className="text-slate-600">Batch Size</span>
                  <span className="font-semibold">15-18 students max</span>
                </div>
                <div className="flex justify-between py-3 border-b border-violet-100">
                  <span className="text-slate-600">Schedule</span>
                  <span className="font-semibold">Weekday Evening & Weekend</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-slate-600">Includes</span>
                  <span className="font-semibold text-right">Study material + Board tests + NEET MCQs + Practical coaching</span>
                </div>
              </div>
              <Link href="/demo-booking" className="block mt-6">
                <Button className="w-full bg-violet-600 hover:bg-violet-700">Book Free Demo</Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <div className="flex items-center mb-6">
                <MapPin className="w-8 h-8 text-violet-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Our Rohini Center</h2>
              </div>
              <p className="text-gray-700 mb-4">
                <strong>Address:</strong> {rohiniCenter.streetAddress}, {rohiniCenter.addressLocality}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Landmark:</strong> Vikas Surya Tower, DC Chauk, Sector 9
              </p>
              <div className="flex items-start gap-2 text-gray-700 mb-6">
                <Train className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Metro:</strong> Rohini West Metro Station (Red Line) - 5 min walk
                </div>
              </div>
              <div className="bg-violet-50 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-slate-900 mb-2">Nearby Areas</h4>
                <p className="text-sm text-slate-600">
                  Sector 9, Sector 8, Sector 7, DC Chowk, Rohini West, Rithala, Pitampura, Netaji Subhash Place
                </p>
              </div>
              <div className="flex gap-4">
                <a href={`tel:${CONTACT_INFO.phone.primary}`}>
                  <Button variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </a>
                <a href={rohiniCenter.mapUrl} target="_blank" rel="noopener">
                  <Button>
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <VideoTestimonialsSection />

      {/* NEET Tools Widget */}
      <NEETToolsWidget
        title="Preparing for NEET alongside Boards?"
        subtitle="Use our free NEET tools to plan your medical career"
      />

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Pages</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/class-11-biology-tuition-rohini"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-violet-600">Class 11 Biology Rohini</h3>
              <p className="text-sm text-gray-600">Foundation year</p>
            </Link>
            <Link href="/neet-coaching-rohini" className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-violet-600">NEET Coaching Rohini</h3>
              <p className="text-sm text-gray-600">Full NEET program</p>
            </Link>
            <Link
              href="/neet-dropper-batch-rohini"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-violet-600">NEET Dropper Batch</h3>
              <p className="text-sm text-gray-600">For repeat attempts</p>
            </Link>
            <Link href="/biology-tutor-rohini" className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-violet-600">Biology Tutor Rohini</h3>
              <p className="text-sm text-gray-600">All classes</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your 12th Board + NEET Journey Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join the best Class 12 Biology coaching in Rohini - excel in boards and crack NEET together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-violet-600 hover:bg-gray-100 font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo
              </Button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-violet-600 px-6 py-4 rounded-xl font-semibold transition-colors"
            >
              <Phone className="w-5 h-5" />
              WhatsApp: +91-88264-44334
            </motion.button>
          </div>
        </div>
      </section>
    </main>
  )
}
