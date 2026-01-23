'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Trophy,
  BookOpen,
  Users,
  CheckCircle,
  Globe,
  GraduationCap,
  Target,
  Beaker,
  Microscope,
  FlaskConical,
  Brain,
  ChevronRight,
  Award,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

const iboPathway = [
  {
    stage: 'National Selection',
    description: 'Qualify through your national Biology Olympiad',
    icon: Target,
    color: 'bg-blue-500',
  },
  {
    stage: 'National Training',
    description: 'Top performers selected for national training camp',
    icon: GraduationCap,
    color: 'bg-purple-500',
  },
  {
    stage: 'Team Selection',
    description: '4 students selected to represent their country',
    icon: Users,
    color: 'bg-green-500',
  },
  {
    stage: 'IBO Competition',
    description: 'Compete against 80+ countries at IBO',
    icon: Trophy,
    color: 'bg-yellow-500',
  },
]

const iboSyllabus = [
  {
    category: 'Cell Biology & Biochemistry',
    percentage: '25%',
    topics: [
      'Cell structure and organelles',
      'Membrane transport mechanisms',
      'Enzyme kinetics and regulation',
      'Metabolic pathways (glycolysis, Krebs, ETC)',
      'Photosynthesis (light & dark reactions)',
      'DNA replication and repair',
    ],
    icon: Microscope,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    category: 'Molecular Biology & Genetics',
    percentage: '20%',
    topics: [
      'Gene expression and regulation',
      'Transcription and translation',
      'Epigenetics and chromatin',
      'Mendelian and population genetics',
      'Molecular cloning techniques',
      'Genome analysis and bioinformatics',
    ],
    icon: FlaskConical,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    category: 'Plant Biology',
    percentage: '15%',
    topics: [
      'Plant anatomy and morphology',
      'Plant physiology and hormones',
      'Photosynthesis mechanisms',
      'Water relations and transport',
      'Plant reproduction',
      'Plant ecology',
    ],
    icon: BookOpen,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    category: 'Animal Anatomy & Physiology',
    percentage: '20%',
    topics: [
      'Comparative animal systems',
      'Nervous system and neuroscience',
      'Endocrine system',
      'Cardiovascular and respiratory',
      'Immune system',
      'Reproduction and development',
    ],
    icon: Brain,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    category: 'Ecology & Evolution',
    percentage: '10%',
    topics: [
      'Population dynamics',
      'Community ecology',
      'Ecosystem processes',
      'Evolutionary mechanisms',
      'Phylogenetics',
      'Conservation biology',
    ],
    icon: Globe,
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
  },
  {
    category: 'Practical Skills',
    percentage: '10%',
    topics: [
      'Microscopy techniques',
      'Biochemical assays',
      'Molecular biology practicals',
      'Anatomical dissections',
      'Data analysis',
      'Experimental design',
    ],
    icon: Beaker,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
]

const features = [
  {
    title: 'Global Olympiad Expertise',
    description:
      'Our faculty includes IBO medalists and trainers from multiple countries who understand the international competition level.',
    icon: Globe,
  },
  {
    title: 'IBO-Level Problem Solving',
    description:
      'Practice with past IBO theoretical and practical papers. Develop strategies for complex multi-step problems.',
    icon: Target,
  },
  {
    title: 'Advanced Practical Training',
    description:
      'Virtual lab simulations and practical exam strategies for biochemistry, molecular biology, and anatomy practicals.',
    icon: Beaker,
  },
  {
    title: 'International Peer Network',
    description:
      'Connect with olympiad aspirants from 80+ countries. Collaborative learning and knowledge exchange.',
    icon: Users,
  },
  {
    title: 'Research Paper Analysis',
    description:
      'Learn to interpret scientific literature at the level expected in IBO theoretical questions.',
    icon: BookOpen,
  },
  {
    title: 'Mock IBO Exams',
    description:
      'Full-length simulated IBO exams with theoretical and practical components under competition conditions.',
    icon: Trophy,
  },
]

const pricingPlans = [
  {
    name: 'Senior Faculty',
    price: '$120-150',
    unit: 'per hour',
    description: 'IBO Medalists & National Team Trainers',
    features: [
      'IBO gold/silver medalist instructors',
      'National team training experience',
      'Advanced research mentorship',
      'Personalized IBO preparation plan',
      'Direct WhatsApp support',
      'Mock IBO exam reviews',
    ],
    popular: true,
    cta: 'Book Senior Faculty',
  },
  {
    name: 'Junior Faculty',
    price: '$60-75',
    unit: 'per hour',
    description: 'National Olympiad Medalists & PhD Students',
    features: [
      'National olympiad medalists',
      'PhD/Masters in Biology',
      'Strong theoretical foundation',
      'Regular practice sessions',
      'Doubt clearing support',
      'Progress tracking',
    ],
    popular: false,
    cta: 'Book Junior Faculty',
  },
  {
    name: 'Batch Programs',
    price: '$40',
    unit: 'per hour',
    description: 'Intensive Group Training (4-6 Students)',
    features: [
      'Small batch (4-6 students)',
      'Collaborative problem solving',
      'Weekly live sessions',
      'Recorded lectures access',
      'International peer network',
      'Batch study materials',
    ],
    popular: false,
    cta: 'Join Batch',
  },
]

const faqs = [
  {
    question: 'What is the International Biology Olympiad (IBO)?',
    answer:
      "The International Biology Olympiad (IBO) is the world's most prestigious biology competition for pre-university students. It brings together the top 4 students from 80+ countries to compete in theoretical and practical exams. The IBO tests deep understanding of biology, from molecular biology to ecology, and includes challenging laboratory practicals.",
  },
  {
    question: 'How do I qualify for IBO?',
    answer:
      'To participate in IBO, you must first excel in your national Biology Olympiad (USABO, BBO, INBO, etc.). Only the top performers from national competitions are selected for their country\'s IBO training camp, and ultimately only 4 students per country compete at IBO. The selection process varies by country but typically involves multiple rounds of exams.',
  },
  {
    question: 'What topics are covered in IBO?',
    answer:
      'IBO covers seven major areas: Cell Biology (20%), Plant Anatomy & Physiology (15%), Animal Anatomy & Physiology (25%), Ethology (5%), Genetics & Evolution (20%), Ecology (10%), and Biosystematics (5%). The practical exam tests laboratory skills including microscopy, biochemical assays, and anatomical studies. Questions require integration of concepts across multiple areas.',
  },
  {
    question: 'How is IBO different from national olympiads?',
    answer:
      'IBO is significantly more challenging than national olympiads. It has both theoretical (60%) and practical (40%) components. Questions often require applying knowledge to novel research scenarios. The practical exams involve real laboratory work including molecular biology, biochemistry, and anatomy. International training and exposure to IBO-level problems are essential.',
  },
  {
    question: 'What textbook is recommended for IBO preparation?',
    answer:
      "Campbell Biology (12th edition) is the primary reference for all Biology Olympiad preparation globally. For IBO level, you'll also need additional resources like Molecular Biology of the Cell (Alberts), Principles of Biochemistry (Lehninger), and specialized texts for plant and animal physiology. We provide structured study plans covering all essential resources.",
  },
  {
    question: 'How can your coaching help me prepare for IBO?',
    answer:
      'Our IBO coaching is designed by former IBO medalists and national team trainers. We offer intensive theoretical preparation covering all IBO syllabus areas at the required depth, practical exam strategies and virtual lab training, analysis of past IBO papers, mock exams under competition conditions, and one-on-one mentorship to address your specific weaknesses. We have helped students from multiple countries achieve IBO medals.',
  },
]

const countryOlympiads = [
  { country: 'USA', name: 'USABO', link: '/usabo-coaching/' },
  { country: 'UK', name: 'BBO', link: '/bbo-preparation/' },
  { country: 'India', name: 'INBO', link: '/inbo-coaching/' },
  { country: 'China', name: 'CNBO', link: '/biology-olympiad-preparation/' },
  { country: 'Australia', name: 'ASOB', link: '/biology-olympiad-preparation/' },
  { country: 'Canada', name: 'CBO', link: '/biology-olympiad-preparation/' },
]

export default function IBOPreparationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsAppEnquiry = () => {
    trackAndOpenWhatsApp({
      source: 'ibo-page',
      message:
        'Hi! I am interested in IBO (International Biology Olympiad) preparation. I have qualified through my national olympiad and want to prepare for the international competition. Please share details about your IBO coaching program.',
      campaign: 'ibo-preparation',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              World&apos;s Premier Biology Competition
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              IBO Preparation
              <span className="block text-yellow-400 mt-2">
                International Biology Olympiad
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Expert coaching to help you compete at the highest level of pre-university
              biology. Join 80+ countries in the world&apos;s most prestigious biology
              competition. Learn from IBO medalists and national team trainers.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>Gold Medal Training</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Globe className="w-5 h-5 text-blue-400" />
                <span>80+ Countries Compete</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Beaker className="w-5 h-5 text-green-400" />
                <span>Theory + Practical</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppEnquiry}
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-green-500/25 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Start IBO Training
              </motion.button>
              <Link
                href="/campbell-biology/"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-medium transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Campbell Biology Study Guide
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IBO Pathway */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Your Path to IBO
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The journey from national olympiad to international gold medal
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {iboPathway.map((stage, index) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg h-full border-2 border-transparent hover:border-yellow-400 transition-colors">
                  <div
                    className={`w-12 h-12 ${stage.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <stage.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium text-slate-500 mb-1">
                    Stage {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{stage.stage}</h3>
                  <p className="text-sm text-slate-600">{stage.description}</p>
                </div>
                {index < iboPathway.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-slate-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IBO Syllabus */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              IBO Syllabus Coverage
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive preparation covering all IBO syllabus areas with Campbell
              Biology as the foundation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {iboSyllabus.map((unit, index) => (
              <motion.div
                key={unit.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${unit.bgColor} rounded-2xl p-6 border border-slate-100`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-white rounded-xl shadow-sm`}>
                    <unit.icon className={`w-6 h-6 ${unit.color}`} />
                  </div>
                  <span className="text-2xl font-bold text-slate-900">
                    {unit.percentage}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{unit.category}</h3>
                <ul className="space-y-2">
                  {unit.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className={`w-4 h-4 ${unit.color} flex-shrink-0 mt-0.5`} />
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
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Our IBO Coaching?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Expert training from IBO medalists with proven international success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              IBO Coaching Plans
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Flexible options for students from all countries preparing for IBO
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl p-6 ${plan.popular ? 'ring-2 ring-yellow-400' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{plan.price}</div>
                  <div className="text-slate-500 text-sm">{plan.unit}</div>
                  <p className="text-slate-600 text-sm mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleWhatsAppEnquiry}
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Common questions about IBO and our coaching program
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronRight
                    className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === index ? 'rotate-90' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Country Olympiads */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              National Olympiad Preparation
            </h2>
            <p className="text-slate-600">
              First qualify through your national Biology Olympiad
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {countryOlympiads.map((olympiad) => (
              <Link
                key={olympiad.name}
                href={olympiad.link}
                className="bg-white rounded-xl p-4 text-center border border-slate-200 hover:border-yellow-400 hover:shadow-lg transition-all group"
              >
                <div className="text-2xl mb-2">{olympiad.country === 'USA' ? '🇺🇸' : olympiad.country === 'UK' ? '🇬🇧' : olympiad.country === 'India' ? '🇮🇳' : olympiad.country === 'China' ? '🇨🇳' : olympiad.country === 'Australia' ? '🇦🇺' : '🇨🇦'}</div>
                <div className="font-bold text-slate-900 group-hover:text-yellow-600 transition-colors">
                  {olympiad.name}
                </div>
                <div className="text-xs text-slate-500">{olympiad.country}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="py-12 bg-[#e8ede8]">
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
              href="/usabo-coaching/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-[#4a5d4a]/10 hover:border-[#4a5d4a]/30"
            >
              USABO (USA)
            </Link>
            <Link
              href="/bbo-preparation/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-[#4a5d4a]/10 hover:border-[#4a5d4a]/30"
            >
              BBO (UK)
            </Link>
            <Link
              href="/inbo-coaching/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-[#4a5d4a]/10 hover:border-[#4a5d4a]/30"
            >
              INBO (India)
            </Link>
            <Link
              href="/mcat-biology-preparation/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-[#4a5d4a]/10 hover:border-[#4a5d4a]/30"
            >
              MCAT Biology
            </Link>
            <Link
              href="/ap-biology-online-tutor/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-[#4a5d4a]/10 hover:border-[#4a5d4a]/30"
            >
              AP Biology
            </Link>
            <Link
              href="/biology-olympiad-preparation/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-[#4a5d4a]/10 hover:border-[#4a5d4a]/30"
            >
              All Olympiad Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-yellow-400 to-yellow-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Award className="w-16 h-16 text-yellow-900 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-900 mb-6">
              Ready to Compete at the Highest Level?
            </h2>
            <p className="text-xl text-yellow-800 mb-8 max-w-2xl mx-auto">
              Join the elite group of students preparing for the International Biology
              Olympiad. Our expert faculty will guide you every step of the way.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsAppEnquiry}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Start Your IBO Journey
            </motion.button>
            <p className="mt-4 text-yellow-800">
              Free consultation • Personalized study plan • Expert guidance
            </p>
          </motion.div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'International Biology Olympiad (IBO) Preparation',
            description:
              'Expert coaching for IBO - the world\'s most prestigious pre-university biology competition',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              sameAs: 'https://cerebrumbiologyacademy.com',
            },
            coursePrerequisites:
              'National Biology Olympiad qualification (USABO, BBO, INBO, etc.)',
            educationalLevel: 'Advanced - International Competition Level',
          }),
        }}
      />
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
    </main>
  )
}
