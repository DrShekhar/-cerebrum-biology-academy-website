'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  GraduationCap,
  Users,
  CheckCircle,
  BookOpen,
  Clock,
  MessageCircle,
  Award,
  FileText,
  Target,
  Microscope,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

const ibBiologyTopics = [
  {
    topic: 1,
    title: 'Cell Biology',
    level: 'Core',
    hours: 15,
    subtopics: ['Cell theory', 'Ultrastructure', 'Membrane transport', 'Cell division'],
    campbellChapters: '6-7, 12',
  },
  {
    topic: 2,
    title: 'Molecular Biology',
    level: 'Core',
    hours: 21,
    subtopics: ['Molecules to metabolism', 'Water', 'Carbohydrates & lipids', 'Proteins', 'Enzymes', 'DNA structure & replication', 'Transcription & translation', 'Cell respiration', 'Photosynthesis'],
    campbellChapters: '2-5, 8-10, 16-17',
  },
  {
    topic: 3,
    title: 'Genetics',
    level: 'Core',
    hours: 15,
    subtopics: ['Genes', 'Chromosomes', 'Meiosis', 'Inheritance', 'Genetic modification'],
    campbellChapters: '13-15, 20',
  },
  {
    topic: 4,
    title: 'Ecology',
    level: 'Core',
    hours: 12,
    subtopics: ['Species & communities', 'Energy flow', 'Carbon cycling', 'Climate change'],
    campbellChapters: '52-56',
  },
  {
    topic: 5,
    title: 'Evolution & Biodiversity',
    level: 'Core',
    hours: 12,
    subtopics: ['Evidence for evolution', 'Natural selection', 'Classification', 'Cladistics'],
    campbellChapters: '22-26',
  },
  {
    topic: 6,
    title: 'Human Physiology',
    level: 'Core',
    hours: 20,
    subtopics: ['Digestion', 'Blood system', 'Defense against disease', 'Gas exchange', 'Neurons & synapses', 'Hormones'],
    campbellChapters: '40-49',
  },
]

const ahlTopics = [
  {
    topic: 7,
    title: 'Nucleic Acids',
    level: 'AHL',
    hours: 9,
    subtopics: ['DNA structure', 'Transcription', 'Translation'],
    campbellChapters: '16-17',
  },
  {
    topic: 8,
    title: 'Metabolism, Cell Respiration & Photosynthesis',
    level: 'AHL',
    hours: 14,
    subtopics: ['Metabolic pathways', 'Cell respiration details', 'Photosynthesis mechanisms'],
    campbellChapters: '8-10',
  },
  {
    topic: 9,
    title: 'Plant Biology',
    level: 'AHL',
    hours: 13,
    subtopics: ['Transport in xylem', 'Transport in phloem', 'Plant growth', 'Reproduction'],
    campbellChapters: '35-39',
  },
  {
    topic: 10,
    title: 'Genetics & Evolution',
    level: 'AHL',
    hours: 8,
    subtopics: ['Meiosis', 'Inheritance', 'Gene pools & speciation'],
    campbellChapters: '13-15, 23-24',
  },
  {
    topic: 11,
    title: 'Animal Physiology',
    level: 'AHL',
    hours: 16,
    subtopics: ['Antibody production', 'Movement', 'The kidney', 'Sexual reproduction'],
    campbellChapters: '43-46, 50',
  },
]

const features = [
  {
    icon: GraduationCap,
    title: 'IB Curriculum Aligned',
    description: 'Teaching matches the official IB Biology Guide for both HL and SL',
  },
  {
    icon: FileText,
    title: 'IA Expertise',
    description: 'Comprehensive support for Internal Assessment design and execution',
  },
  {
    icon: BookOpen,
    title: 'Campbell Biology Based',
    description: 'Lessons aligned with Campbell Biology - the gold standard textbook',
  },
  {
    icon: Target,
    title: 'Grade 7 Focus',
    description: 'Strategies and techniques aimed at achieving top IB grades',
  },
  {
    icon: Clock,
    title: 'Global Scheduling',
    description: 'Flexible timings for students across all timezones worldwide',
  },
  {
    icon: Microscope,
    title: 'Practical Skills',
    description: 'Lab technique training for Group 4 project and practical exams',
  },
]

const seniorFacultyPricing = [
  {
    name: 'Starter',
    hours: 12,
    price: 1800,
    perHour: 150,
    features: [
      '12 hours 1-on-1 tutoring',
      'Topic-focused learning',
      'Past paper practice',
      'WhatsApp support',
    ],
  },
  {
    name: 'Foundation',
    hours: 24,
    price: 3360,
    perHour: 140,
    popular: true,
    features: [
      '24 hours 1-on-1 tutoring',
      'Full SL or HL coverage',
      'IA guidance included',
      'Data analysis practice',
      'Priority support',
    ],
  },
  {
    name: 'Comprehensive',
    hours: 36,
    price: 4680,
    perHour: 130,
    features: [
      '36 hours 1-on-1 tutoring',
      'Complete exam preparation',
      'Full IA support',
      'Extended Essay guidance',
      '24/7 support',
    ],
  },
  {
    name: 'Premium',
    hours: 48,
    price: 5760,
    perHour: 120,
    features: [
      '48 hours 1-on-1 tutoring',
      'HL + all options',
      'IA + EE complete support',
      'Mock exam series',
      'University guidance',
    ],
  },
]

const juniorFacultyPricing = [
  {
    name: 'Starter',
    hours: 12,
    price: 900,
    perHour: 75,
    features: [
      '12 hours 1-on-1 tutoring',
      'Topic-focused learning',
      'Practice questions',
      'WhatsApp support',
    ],
  },
  {
    name: 'Foundation',
    hours: 24,
    price: 1680,
    perHour: 70,
    popular: true,
    features: [
      '24 hours 1-on-1 tutoring',
      'Full SL coverage',
      'Past paper practice',
      'Basic IA guidance',
      'Email support',
    ],
  },
  {
    name: 'Comprehensive',
    hours: 36,
    price: 2340,
    perHour: 65,
    features: [
      '36 hours 1-on-1 tutoring',
      'Complete SL/HL syllabus',
      'IA support',
      'Exam techniques',
      'Priority support',
    ],
  },
  {
    name: 'Premium',
    hours: 48,
    price: 2880,
    perHour: 60,
    features: [
      '48 hours 1-on-1 tutoring',
      'Full curriculum',
      'IA + exam prep',
      'All resources included',
      '24/7 support',
    ],
  },
]

const batchPricing = [
  {
    name: 'Monthly',
    hours: 8,
    price: 320,
    perHour: 40,
    features: ['8 hours group classes', '4-6 students per batch', 'Weekly sessions', 'Study materials'],
  },
  {
    name: 'Quarterly',
    hours: 24,
    price: 840,
    perHour: 35,
    popular: true,
    features: [
      '24 hours group classes',
      '4-6 students per batch',
      'IA workshops',
      'Past papers',
      'Group discussions',
    ],
  },
  {
    name: 'Half-Year',
    hours: 48,
    price: 1440,
    perHour: 30,
    features: [
      '48 hours group classes',
      '4-6 students per batch',
      'Complete HL/SL prep',
      'IA support',
      'Mock exams',
    ],
  },
  {
    name: 'Full Year',
    hours: 96,
    price: 2400,
    perHour: 25,
    features: [
      '96 hours group classes',
      '4-6 students per batch',
      'Full curriculum',
      'IA + exam prep',
      'University guidance',
    ],
  },
]

const faqs = [
  {
    question: 'What is the difference between IB Biology HL and SL?',
    answer:
      'Higher Level (HL) covers additional topics (Topics 7-11) with more depth and requires 240 teaching hours, while Standard Level (SL) covers core topics (Topics 1-6) with 150 teaching hours. HL students also complete more challenging Internal Assessments and exams.',
  },
  {
    question: 'How do you help with the IB Biology Internal Assessment (IA)?',
    answer:
      'We provide comprehensive IA support including topic selection, research question formulation, experimental design, data collection guidance, statistical analysis, and report writing. Our tutors are experienced IB examiners who know exactly what criteria markers look for.',
  },
  {
    question: 'Can you help with IB Biology Extended Essay?',
    answer:
      'Yes! We offer specialized Extended Essay support for Biology EEs. This includes topic exploration, research methodology, structure guidance, draft reviews, and final polishing. Many of our students achieve A grades on their Biology EEs.',
  },
  {
    question: 'Which textbook do you use for IB Biology?',
    answer:
      'We primarily use Campbell Biology (the gold standard university-level textbook) supplemented with Oxford IB Biology and Pearson IB Biology. Campbell provides deeper understanding that helps students excel in both HL content and university preparation.',
  },
  {
    question: 'How do IB Biology online classes work?',
    answer:
      'Classes are conducted via Zoom with interactive whiteboards, screen sharing, and real-time problem solving. Sessions are recorded for review. We use past papers, specimen papers, and our custom question banks aligned with IB assessment objectives.',
  },
  {
    question: 'What grades can I expect with your tutoring?',
    answer:
      'Most of our IB Biology students improve by 2-3 grade points. Our average student grade is 6, with many achieving 7s in both HL and SL. Success depends on consistent effort and completing assigned practice.',
  },
  {
    question: 'Do you cover all IB Biology options?',
    answer:
      'Yes, we cover all four options: Option A (Neurobiology and Behaviour), Option B (Biotechnology and Bioinformatics), Option C (Ecology and Conservation), and Option D (Human Physiology). We help you choose the best option for your interests and strengths.',
  },
  {
    question: 'How do you prepare students for Paper 1, 2, and 3?',
    answer:
      'Paper 1 (MCQ): Focused drilling on common question types and elimination strategies. Paper 2 (Short/Extended): Structure templates and marking scheme analysis. Paper 3 (Data-based + Options): Scientific methodology and option-specific preparation.',
  },
]

interface PricingTier {
  name: string
  hours: number
  price: number
  perHour: number
  popular?: boolean
  features: string[]
}

function PricingCard({ tier, currency }: { tier: PricingTier; currency: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative rounded-2xl bg-white p-6 shadow-lg ${
        tier.popular ? 'border-2 border-purple-500 ring-2 ring-purple-200' : 'border border-gray-200'
      }`}
    >
      {tier.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-4 py-1 text-sm font-medium text-white">
          Most Popular
        </span>
      )}
      <div className="mb-4 text-center">
        <h4 className="text-lg font-bold text-gray-900">{tier.name}</h4>
        <p className="text-sm text-gray-500">{tier.hours} hours</p>
      </div>
      <div className="mb-4 text-center">
        <span className="text-3xl font-bold text-gray-900">
          {currency}
          {tier.price.toLocaleString()}
        </span>
        <p className="text-sm text-green-600">
          {currency}
          {tier.perHour}/hour
        </p>
      </div>
      <ul className="mb-6 space-y-2">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          trackAndOpenWhatsApp({
            source: `IB Biology - Pricing - ${tier.name}`,
            page: 'ib-biology-online-classes',
            message: `Hi! I'm interested in the ${tier.name} package (${tier.hours} hours) for IB Biology tutoring at ${currency}${tier.price}. Can you share more details?`,
          })
        }
        className="w-full rounded-lg bg-purple-600 py-2 font-semibold text-white transition hover:bg-purple-700"
      >
        Get Started
      </button>
    </motion.div>
  )
}

export default function IBBiologyPage() {
  const handleHeroCTA = () => {
    trackAndOpenWhatsApp({
      source: 'IB Biology - Hero',
      page: 'ib-biology-online-classes',
      message:
        "Hi! I'm interested in IB Biology online classes. I'd like to know more about your tutoring programs for HL/SL students.",
    })
  }

  const handleIACTA = () => {
    trackAndOpenWhatsApp({
      source: 'IB Biology - IA Support',
      page: 'ib-biology-online-classes',
      message:
        "Hi! I need help with my IB Biology Internal Assessment. Can you tell me about your IA support services?",
    })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="mb-4 inline-block rounded-full bg-purple-500/20 px-4 py-2 text-sm font-medium text-purple-300">
                IB Diploma Programme
              </span>
              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                IB Biology Online Classes
                <span className="block text-purple-400">HL & SL Tutoring</span>
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 md:text-xl">
                Expert tutoring for International Baccalaureate Biology. Master all topics, ace your
                Internal Assessment, and achieve Grade 7 with personalized coaching.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleHeroCTA}
                  className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-green-600"
                >
                  <MessageCircle className="h-6 w-6" />
                  Start IB Biology Prep
                </motion.button>
                <Link
                  href="/campbell-biology/"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
                >
                  <BookOpen className="h-6 w-6" />
                  View Campbell Biology
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <div className="container mx-auto mt-12 px-4">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { value: '500+', label: 'IB Students' },
              { value: '6.4', label: 'Avg Grade' },
              { value: '85%', label: 'Score 6+' },
              { value: '40+', label: 'Countries' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm"
              >
                <div className="text-2xl font-bold text-purple-400 md:text-3xl">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Why Choose Our IB Biology Tutoring?
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Specialized coaching designed for IB Diploma success
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition hover:shadow-xl"
              >
                <feature.icon className="mb-4 h-10 w-10 text-purple-600" />
                <h3 className="mb-2 text-lg font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Topics Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              IB Biology Core Topics (SL & HL)
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Comprehensive coverage of all core topics with Campbell Biology alignment
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ibBiologyTopics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl bg-white p-5 shadow-lg"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                    Topic {topic.topic}
                  </span>
                  <span className="text-sm text-gray-500">{topic.hours} hrs</span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{topic.title}</h3>
                <div className="mb-3 flex flex-wrap gap-1">
                  {topic.subtopics.slice(0, 4).map((subtopic, i) => (
                    <span
                      key={i}
                      className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                    >
                      {subtopic}
                    </span>
                  ))}
                  {topic.subtopics.length > 4 && (
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      +{topic.subtopics.length - 4} more
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Campbell Ch: {topic.campbellChapters}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AHL Topics Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Additional Higher Level (AHL) Topics
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Advanced topics exclusively for HL students - 60 additional teaching hours
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ahlTopics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border-2 border-purple-200 bg-purple-50 p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-purple-600 px-3 py-1 text-sm font-medium text-white">
                    Topic {topic.topic} (AHL)
                  </span>
                  <span className="text-sm text-gray-500">{topic.hours} hrs</span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{topic.title}</h3>
                <div className="mb-3 flex flex-wrap gap-1">
                  {topic.subtopics.map((subtopic, i) => (
                    <span
                      key={i}
                      className="rounded bg-white px-2 py-0.5 text-xs text-gray-600"
                    >
                      {subtopic}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Campbell Ch: {topic.campbellChapters}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IA Support Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <FileText className="mx-auto mb-4 h-12 w-12 text-purple-200" />
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Internal Assessment (IA) Support
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-purple-100">
                The IA is worth 20% of your final grade. Our expert tutors guide you through every
                step to maximize your score.
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Topic Selection', desc: 'Choose a unique, feasible research question' },
                { title: 'Experimental Design', desc: 'Plan methodology and variables correctly' },
                { title: 'Data Analysis', desc: 'Statistical tests and uncertainty calculations' },
                { title: 'Report Writing', desc: 'Structure and criterion-based feedback' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm"
                >
                  <div className="mb-2 text-2xl font-bold text-white">{index + 1}</div>
                  <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-purple-200">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleIACTA}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-purple-700 shadow-lg transition hover:bg-gray-100"
              >
                <MessageCircle className="h-6 w-6" />
                Get IA Help Now
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              IB Biology Tutoring Packages
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Flexible pricing options for students worldwide
            </p>
          </motion.div>

          {/* Senior Faculty */}
          <div className="mb-12">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900">Senior Faculty</h3>
              <p className="text-gray-600">
                PhD holders & IB examiners with 8+ years experience
              </p>
              <p className="mt-1 text-sm text-green-600">$120-150/hour</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {seniorFacultyPricing.map((tier, index) => (
                <PricingCard key={index} tier={tier} currency="$" />
              ))}
            </div>
          </div>

          {/* Junior Faculty */}
          <div className="mb-12">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900">Junior Faculty</h3>
              <p className="text-gray-600">Master&apos;s degree holders with IB teaching experience</p>
              <p className="mt-1 text-sm text-green-600">$60-75/hour</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {juniorFacultyPricing.map((tier, index) => (
                <PricingCard key={index} tier={tier} currency="$" />
              ))}
            </div>
          </div>

          {/* Batch Programs */}
          <div>
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900">Group Classes</h3>
              <p className="text-gray-600">Small batch learning (4-6 students per group)</p>
              <p className="mt-1 text-sm text-green-600">$25-40/hour</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {batchPricing.map((tier, index) => (
                <PricingCard key={index} tier={tier} currency="$" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Common questions about IB Biology preparation
            </p>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <h3 className="mb-3 text-lg font-bold text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>

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
      </section>

      {/* Related Pages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Related Programs</h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/campbell-biology/"
              className="rounded-lg border border-gray-200 bg-white p-4 text-center transition hover:border-purple-300 hover:shadow-lg"
            >
              <BookOpen className="mx-auto mb-2 h-6 w-6 text-teal-600" />
              <span className="font-semibold text-gray-900">Campbell Biology</span>
              <p className="mt-1 text-sm text-gray-600">56 chapter guides</p>
            </Link>
            <Link
              href="/ap-biology-online-tutor/"
              className="rounded-lg border border-gray-200 bg-white p-4 text-center transition hover:border-purple-300 hover:shadow-lg"
            >
              <GraduationCap className="mx-auto mb-2 h-6 w-6 text-green-600" />
              <span className="font-semibold text-gray-900">AP Biology</span>
              <p className="mt-1 text-sm text-gray-600">College Board prep</p>
            </Link>
            <Link
              href="/biology-olympiad-preparation/"
              className="rounded-lg border border-gray-200 bg-white p-4 text-center transition hover:border-purple-300 hover:shadow-lg"
            >
              <Award className="mx-auto mb-2 h-6 w-6 text-yellow-600" />
              <span className="font-semibold text-gray-900">Biology Olympiad</span>
              <p className="mt-1 text-sm text-gray-600">IBO, USABO, BBO prep</p>
            </Link>
            <Link
              href="/mcat-biology-preparation/"
              className="rounded-lg border border-gray-200 bg-white p-4 text-center transition hover:border-purple-300 hover:shadow-lg"
            >
              <Users className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <span className="font-semibold text-gray-900">MCAT Biology</span>
              <p className="mt-1 text-sm text-gray-600">Pre-med preparation</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to Achieve Grade 7 in IB Biology?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-300">
              Start your IB Biology preparation today with expert tutoring aligned to Campbell
              Biology and IB assessment objectives.
            </p>
            <button
              onClick={handleHeroCTA}
              className="inline-flex items-center gap-2 rounded-lg bg-purple-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-purple-600"
            >
              <MessageCircle className="h-6 w-6" />
              Start IB Biology Prep Today
            </button>
          </motion.div>
        </div>
      </section>

      {/* Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'IB Biology Online Classes',
            description:
              'Expert IB Biology tutoring for Higher Level (HL) and Standard Level (SL). Personalized coaching for Internal Assessment, Extended Essay, and exam preparation.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            educationalLevel: 'High School',
            about: ['IB Biology', 'International Baccalaureate', 'IB Diploma Programme'],
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'Online',
              courseWorkload: 'PT150H-PT240H',
            },
          }),
        }}
      />
    </main>
  )
}
