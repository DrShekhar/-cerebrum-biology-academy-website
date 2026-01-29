'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronDown,
  Phone,
  Play,
  Home,
  Users,
  Target,
  Award,
  BookOpen,
  Star,
  ArrowRight,
  GraduationCap,
  Clock,
  IndianRupee,
  Shield,
  TrendingUp,
  MessageCircle,
  Microscope,
  Building2,
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

const comparisonData = [
  {
    feature: 'Batch Size',
    cerebrum: '15-20 students',
    aakash: '100+ students',
    winner: 'cerebrum',
    impact: 'More individual attention',
  },
  {
    feature: 'Subject Focus',
    cerebrum: 'Biology Specialized',
    aakash: 'All Subjects (PCB)',
    winner: 'cerebrum',
    impact: 'Deeper Biology coverage',
  },
  {
    feature: 'Faculty Credentials',
    cerebrum: 'AIIMS Alumnus (Dr. Shekhar)',
    aakash: 'Mixed faculty pool',
    winner: 'cerebrum',
    impact: 'Expert Biology teaching',
  },
  {
    feature: 'Personal Attention',
    cerebrum: 'High - Know every student',
    aakash: 'Limited - Large batches',
    winner: 'cerebrum',
    impact: 'Better weak area focus',
  },
  {
    feature: 'Doubt Clearing',
    cerebrum: 'Daily 1-on-1 sessions',
    aakash: 'Scheduled doubt sessions',
    winner: 'cerebrum',
    impact: 'No doubt left unresolved',
  },
  {
    feature: 'Fee Range (Annual)',
    cerebrum: 'Rs 45K - Rs 1.56L',
    aakash: 'Rs 1.5L - Rs 2.5L',
    winner: 'cerebrum',
    impact: 'Better value per rupee',
  },
  {
    feature: 'Biology Success Rate',
    cerebrum: '98% (Biology section)',
    aakash: 'Overall ~80%',
    winner: 'cerebrum',
    impact: 'Proven Biology results',
  },
  {
    feature: 'Study Material',
    cerebrum: 'NCERT-focused + notes',
    aakash: 'Comprehensive modules',
    winner: 'tie',
    impact: 'Both provide quality material',
  },
  {
    feature: 'Mock Tests',
    cerebrum: '50+ Biology-focused tests',
    aakash: 'Full-length tests (all subjects)',
    winner: 'tie',
    impact: 'Different testing approaches',
  },
  {
    feature: 'Institute Type',
    cerebrum: 'Independent institute',
    aakash: "BYJU'S subsidiary",
    winner: 'cerebrum',
    impact: 'Focused operations',
  },
]

const whyCerebrumAdvantages = [
  {
    title: 'Biology Specialization Matters',
    description:
      'NEET Biology carries 360 marks - 50% of total score. General coaching treats Biology as one of three subjects, but Cerebrum gives it the focused attention it deserves.',
    icon: Microscope,
    stat: '360',
    statLabel: 'Biology marks in NEET',
  },
  {
    title: 'Small Batch = Better Results',
    description:
      'With 15-20 students per batch, your teacher knows your strengths and weaknesses. In 100+ batches, you are just another face in the crowd.',
    icon: Users,
    stat: '15-20',
    statLabel: 'students per batch',
  },
  {
    title: 'AIIMS Faculty Teaching',
    description:
      'Dr. Shekhar (AIIMS alumnus) teaches Biology directly. At larger institutes, senior faculty often focus on top batches while others get junior teachers.',
    icon: GraduationCap,
    stat: '15+',
    statLabel: 'years teaching experience',
  },
  {
    title: 'Cost-Effective Quality',
    description:
      'Get premium coaching at 30-40% lower fees. Why pay for all subjects if you only need Biology support? Cerebrum offers targeted value.',
    icon: IndianRupee,
    stat: '40%',
    statLabel: 'more affordable',
  },
]

const successStories = [
  {
    name: 'Priya Sharma',
    score: '655/720',
    biologyScore: '345/360',
    previous: 'Switched from Aakash',
    quote:
      'At Aakash, I was lost in a batch of 150 students. Biology concepts were rushed. At Cerebrum, every doubt was addressed. My Biology score jumped from 280 to 345.',
    year: 'NEET 2025',
  },
  {
    name: 'Rahul Verma',
    score: '638/720',
    biologyScore: '340/360',
    previous: 'Joined Cerebrum + Aakash',
    quote:
      'I kept Aakash for Physics but joined Cerebrum for Biology. Best decision! The small batch made a huge difference in understanding complex topics like Genetics.',
    year: 'NEET 2025',
  },
  {
    name: 'Ananya Gupta',
    score: '642/720',
    biologyScore: '348/360',
    previous: 'Direct Cerebrum admission',
    quote:
      'My seniors advised against large coaching centers for Biology. At Cerebrum, Dr. Shekhar personally tracks my progress. That mentorship is invaluable.',
    year: 'NEET 2025',
  },
]

const valueProposition = [
  {
    title: 'If you want deep Biology expertise',
    description: 'Choose Cerebrum for specialized, focused Biology preparation',
    icon: BookOpen,
  },
  {
    title: 'If you struggle in crowded classrooms',
    description: 'Choose Cerebrum for intimate batch sizes and personal attention',
    icon: Users,
  },
  {
    title: 'If Biology is your weak subject',
    description: 'Choose Cerebrum for dedicated doubt-clearing and weak area focus',
    icon: Target,
  },
  {
    title: 'If you want better value for money',
    description: 'Choose Cerebrum for premium quality at competitive fees',
    icon: IndianRupee,
  },
]

export default function CerebrumVsAakashContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'cerebrum-vs-aakash-comparison',
      message:
        'Hi! I was comparing Cerebrum and Aakash for NEET Biology coaching. Can you help me understand which would be better for my preparation?',
      campaign: 'cerebrum-vs-aakash-comparison',
    })
  }

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
              <span className="text-teal-700 font-medium">Cerebrum vs Aakash</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Honest Comparison for NEET 2026 Aspirants
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Cerebrum vs Aakash
              <span className="block text-teal-400 mt-2">NEET Coaching Comparison</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Making the right coaching decision can define your NEET journey. Compare Cerebrum and
              Aakash on key parameters like batch size, faculty, fees, and specialization to find
              your best fit.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Users className="w-5 h-5 text-teal-400" />
                <span>15-20 vs 100+ Batch Size</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>98% Biology Success</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Target className="w-5 h-5 text-green-400" />
                <span>Biology Specialized</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-teal-500 text-white hover:bg-teal-400 font-bold"
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
                <MessageCircle className="w-5 h-5" />
                Ask Our Counselor
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Summary Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">At a Glance</h2>
            <p className="text-xl text-slate-600">Key differences that matter for your NEET prep</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Cerebrum Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-8 border-2 border-teal-200 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Microscope className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Cerebrum</h3>
                  <p className="text-teal-600 font-medium">Biology Specialized</p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>15-20 students per batch</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>AIIMS faculty teaching Biology</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>98% Biology success rate</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Daily 1-on-1 doubt clearing</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Rs 45K - 1.56L annual fee</span>
                </li>
              </ul>
              <p className="mt-6 text-sm text-teal-700 font-medium">
                Best for: Students who want focused Biology preparation with personal mentorship
              </p>
            </motion.div>

            {/* Aakash Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Aakash</h3>
                  <p className="text-slate-600 font-medium">All-Subject Coaching</p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-xs text-slate-600">
                    -
                  </span>
                  <span>100+ students per batch</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-xs text-slate-600">
                    -
                  </span>
                  <span>Large faculty pool (rotating)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-xs text-slate-600">
                    -
                  </span>
                  <span>~80% overall success rate</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-xs text-slate-600">
                    -
                  </span>
                  <span>Scheduled doubt sessions</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-xs text-slate-600">
                    -
                  </span>
                  <span>Rs 1.5L - 2.5L annual fee</span>
                </li>
              </ul>
              <p className="mt-6 text-sm text-slate-600 font-medium">
                Best for: Students wanting all subjects (PCB) under one roof with brand recognition
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Detailed Comparison: Cerebrum vs Aakash
            </h2>
            <p className="text-xl text-slate-600">
              Feature-by-feature analysis to help you decide
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-center bg-teal-700">Cerebrum</th>
                  <th className="px-6 py-4 text-center">Aakash</th>
                  <th className="px-6 py-4 text-left hidden md:table-cell">Why It Matters</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={row.feature} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium text-slate-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center bg-teal-50">
                      <span className="flex items-center justify-center gap-2">
                        {row.winner === 'cerebrum' && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {row.winner === 'tie' && <span className="w-5 h-5" />}
                        <span className="text-slate-900">{row.cerebrum}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600">
                      <span className="flex items-center justify-center gap-2">
                        {row.winner === 'cerebrum' && <XCircle className="w-5 h-5 text-red-400" />}
                        {row.winner === 'tie' && (
                          <CheckCircle className="w-5 h-5 text-blue-500" />
                        )}
                        {row.aakash}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm hidden md:table-cell">
                      {row.impact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            * Data compiled from public sources and student feedback. Fees and batch sizes may vary
            by center.
          </p>
        </div>
      </section>

      {/* Why Cerebrum Offers Better Value */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Cerebrum Offers Better Value for Biology
            </h2>
            <p className="text-xl text-slate-600">
              For serious NEET aspirants who understand Biology importance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyCerebrumAdvantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <advantage.icon className="w-7 h-7 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{advantage.title}</h3>
                    <p className="text-slate-600 mb-4">{advantage.description}</p>
                    <div className="inline-flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-lg">
                      <span className="text-2xl font-bold text-teal-600">{advantage.stat}</span>
                      <span className="text-sm text-teal-700">{advantage.statLabel}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Students Who Made the Right Choice
            </h2>
            <p className="text-xl text-slate-600">Real results from students who chose Cerebrum</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 shadow-lg border border-slate-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-xl">
                    {story.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{story.name}</p>
                    <p className="text-sm text-slate-500">{story.previous}</p>
                  </div>
                </div>

                <div className="flex gap-3 mb-4">
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                    {story.score}
                  </div>
                  <div className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-bold">
                    Bio: {story.biologyScore}
                  </div>
                </div>

                <p className="text-slate-600 italic mb-4">&quot;{story.quote}&quot;</p>

                <p className="text-xs text-slate-400 font-medium">{story.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Decision Guide */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              When Should You Choose Cerebrum?
            </h2>
            <p className="text-xl text-slate-300">Cerebrum is the right choice if...</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProposition.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-slate-300 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-slate-300 mb-6">
              Not sure which is right for you? Talk to our counselor for unbiased guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-teal-500 text-white hover:bg-teal-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Try a Free Demo Class
                </Button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with Counselor
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Can Join Both Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Best of Both Worlds?
                <br />
                Join Aakash + Cerebrum
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                Many students continue at Aakash for Physics and Chemistry while joining Cerebrum
                specifically for Biology. Get comprehensive coverage without compromising on Biology
                depth.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Weekend batches that complement Aakash schedule
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Evening sessions for working professionals&apos; children
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Use Aakash study material + Cerebrum expert teaching
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Focused Biology boost for weak areas
                </li>
              </ul>
              <Link href="/complement-aakash-coaching-gurugram">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  Learn About Complementary Coaching{' '}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Flexible Batch Options</h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <span className="font-semibold">Weekend Batches</span>
                  </div>
                  <p className="text-blue-100 text-sm">
                    Saturday-Sunday intensive classes for students enrolled elsewhere
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="font-semibold">Evening Batches</span>
                  </div>
                  <p className="text-blue-100 text-sm">
                    Post-school hours for additional Biology practice
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-teal-400" />
                    <span className="font-semibold">Crash Courses</span>
                  </div>
                  <p className="text-blue-100 text-sm">
                    30-60 day intensive Biology revision programs
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />
      <NEETToolsWidget
        title="Free NEET Preparation Tools"
        subtitle="Boost your preparation with AI-powered tools"
      />

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Comparisons</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/aakash-alternative-gurugram"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">Aakash Alternative Gurugram</h3>
              <p className="text-sm text-gray-600">For Gurugram students</p>
            </Link>
            <Link
              href="/allen-alternative-gurugram"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">Allen Alternative</h3>
              <p className="text-sm text-gray-600">Compare with Allen</p>
            </Link>
            <Link
              href="/affordable-neet-coaching-gurugram"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">Affordable Coaching</h3>
              <p className="text-sm text-gray-600">Budget-friendly options</p>
            </Link>
            <Link
              href="/neet-coaching-gurugram"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">NEET Coaching Hub</h3>
              <p className="text-sm text-gray-600">All programs</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience the Cerebrum Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 500+ students who chose specialized Biology coaching for better NEET results
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-teal-600 hover:bg-gray-100 font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo Class
              </Button>
            </Link>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}>
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-teal-600"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call {CONTACT_INFO.phone.display.primary}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
