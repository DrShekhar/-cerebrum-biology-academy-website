'use client'

import React from 'react'
import {
  BookOpen,
  CheckCircle,
  Award,
  TrendingUp,
  MessageCircle,
  GraduationCap,
  Microscope,
  Dna,
  Leaf,
  Brain,
  FileText,
  Target,
  Globe,
  Star,
  Clock,
  ChevronRight,
  Lightbulb,
  BarChart,
  BookMarked,
} from 'lucide-react'
import Link from 'next/link'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

export default function IBBiologyTutorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - IB Biology Tutor',
    description:
      'Expert IB Biology tutoring for HL and SL students. 95% of students score 6-7 with our IB certified methods.',
    url: 'https://cerebrumbiologyacademy.com/ib-biology-tutor',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '250',
    },
    offers: {
      '@type': 'Offer',
      category: 'IB Biology Tutoring',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between IB Biology HL and SL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'IB Biology SL requires 150 teaching hours covering core topics, while HL requires 240 hours including all core topics plus additional higher level content in nucleic acids, metabolism, plant biology, and animal physiology. HL students also face more challenging assessments.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can an IB Biology tutor help improve my score?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An experienced IB Biology tutor provides targeted support in understanding complex concepts, mastering command terms, developing strong IA research questions, and practicing exam techniques. Our students achieve 98% success rate in scoring 6-7.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide support for IB Biology Internal Assessment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we provide comprehensive IA support including research question development, experimental design, data collection methods, statistical analysis, and evaluation techniques to maximize your IA score.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you help with IB Biology Extended Essay?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! We guide students through the entire Extended Essay process in Biology, from topic selection and research question formulation to literature review, methodology, and analysis.',
        },
      },
      {
        '@type': 'Question',
        name: 'What teaching methods do you use for IB Biology?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We use IB certified teaching methods focusing on inquiry-based learning, conceptual understanding, command term mastery, and past paper practice. Our approach integrates TOK connections and develops critical thinking skills.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#4a5d4a] pt-20 pb-32">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-green-800/20 to-transparent"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              initial="hidden"
              animate="visible"
              className="text-center animate-fadeInUp"
            >
              <div
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6 animate-fadeInUp"
              >
                <Award className="w-5 h-5" />
                <span className="text-sm font-semibold">IB Certified Methods</span>
              </div>

              <h1
                className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeInUp"
              >
                IB Biology Tutor
                <br />
                <span className="text-green-100">HL & SL Expert Tutoring</span>
              </h1>

              <p
                className="text-xl text-green-50 mb-8 max-w-3xl mx-auto animate-fadeInUp"
              >
                Master the IB Diploma Programme Biology with personalized tutoring from experienced
                educators. Specialized support for both Higher Level and Standard Level students.
              </p>

              {/* Stats */}
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 animate-fadeInUp"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-bold text-white mb-2">250+</div>
                  <div className="text-green-50">IB Students Taught</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-bold text-white mb-2">95%</div>
                  <div className="text-green-50">Score 6-7 Grades</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-bold text-white mb-2">100%</div>
                  <div className="text-green-50">IB Certified Methods</div>
                </div>
              </div>

              {/* CTAs */}
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp"
              >
                <Link
                  href="/book-demo"
                  className="group bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-50 transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Book Free Demo Class
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={async () => {
                    await trackAndOpenWhatsApp({
                      source: 'ib-biology-hero',
                      message: WHATSAPP_MESSAGES.courseEnquiry,
                      campaign: 'ib-biology-tutor',
                    })
                  }}
                  className="group bg-green-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-700/70 transition-all duration-300 flex items-center gap-2 border border-white/20 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp: +91 88264 44334
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* HL vs SL Comparison Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div
              initial="hidden"
              whileInView="visible"
              className="text-center mb-16 animate-fadeInUp"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fadeInUp">
                IB Biology: HL vs SL
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fadeInUp">
                Understanding the differences between Higher Level and Standard Level Biology
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Standard Level */}
              <div
                initial="hidden"
                whileInView="visible"
                className="bg-white rounded-3xl p-8 shadow-xl border-2 border-green-200 animate-fadeInUp"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <BookOpen className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Standard Level (SL)</h3>
                    <p className="text-green-600 font-semibold">150 Teaching Hours</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Course Content</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>All core topics (95 hours)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>One option topic (15 hours)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Practical work & IA (40 hours)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Assessment Breakdown</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex justify-between">
                        <span>Paper 1 (Multiple Choice)</span>
                        <span className="font-semibold">20%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Paper 2 (Data-based & Short)</span>
                        <span className="font-semibold">40%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Paper 3 (Option Topic)</span>
                        <span className="font-semibold">20%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Internal Assessment</span>
                        <span className="font-semibold">20%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Higher Level */}
              <div
                initial="hidden"
                whileInView="visible"
                className="bg-[#4a5d4a] rounded-3xl p-8 shadow-xl border-2 border-green-500 relative overflow-hidden animate-fadeInUp"
              >
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                  RECOMMENDED
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Higher Level (HL)</h3>
                    <p className="text-green-100 font-semibold">240 Teaching Hours</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <h4 className="font-semibold text-white mb-2">Course Content</h4>
                    <ul className="space-y-2 text-green-50">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-200 mt-0.5 flex-shrink-0" />
                        <span>All core topics (95 hours)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-200 mt-0.5 flex-shrink-0" />
                        <span>Additional HL topics (60 hours)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-200 mt-0.5 flex-shrink-0" />
                        <span>One option topic (25 hours)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-200 mt-0.5 flex-shrink-0" />
                        <span>Practical work & IA (60 hours)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <h4 className="font-semibold text-white mb-2">Assessment Breakdown</h4>
                    <ul className="space-y-2 text-green-50">
                      <li className="flex justify-between">
                        <span>Paper 1 (Multiple Choice)</span>
                        <span className="font-semibold">20%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Paper 2 (Data-based & Extended)</span>
                        <span className="font-semibold">36%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Paper 3 (Option Topic)</span>
                        <span className="font-semibold">24%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Internal Assessment</span>
                        <span className="font-semibold">20%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Topics Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div
              initial="hidden"
              whileInView="visible"
              className="text-center mb-16 animate-fadeInUp"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fadeInUp">
                Core Topics Coverage
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fadeInUp">
                Comprehensive tutoring for all IB Biology core topics (Both HL & SL)
              </p>
            </div>

            <div
              initial="hidden"
              whileInView="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeInUp"
            >
              {[
                {
                  icon: Microscope,
                  title: 'Cell Biology',
                  description:
                    'Cell theory, structure, membranes, cell division, and cellular processes',
                  color: 'bg-green-600',
                },
                {
                  icon: Dna,
                  title: 'Molecular Biology',
                  description:
                    'DNA structure, replication, transcription, translation, and protein synthesis',
                  color: 'bg-green-600',
                },
                {
                  icon: BookMarked,
                  title: 'Genetics',
                  description:
                    'Mendelian genetics, chromosomes, gene expression, and genetic modification',
                  color: 'bg-green-600',
                },
                {
                  icon: Leaf,
                  title: 'Ecology',
                  description: 'Species, communities, ecosystems, energy flow, and carbon cycling',
                  color: 'bg-[#4a5d4a]',
                },
                {
                  icon: Target,
                  title: 'Evolution & Biodiversity',
                  description:
                    'Natural selection, classification, cladistics, and evolutionary evidence',
                  color: 'bg-green-700',
                },
                {
                  icon: Brain,
                  title: 'Human Physiology',
                  description:
                    'Digestion, cardiovascular, respiratory, nervous, and immune systems',
                  color: 'bg-green-700',
                },
              ].map((topic, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white to-green-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-400 animate-fadeInUp"
                >
                  <div
                    className={`bg-gradient-to-br ${topic.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <topic.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional HL Topics Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-50">
          <div className="max-w-7xl mx-auto">
            <div
              initial="hidden"
              whileInView="visible"
              className="text-center mb-16 animate-fadeInUp"
            >
              <div
                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-fadeInUp"
              >
                <Star className="w-4 h-4" />
                HIGHER LEVEL ONLY
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fadeInUp">
                Additional HL Topics
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fadeInUp">
                Advanced content exclusively for Higher Level students
              </p>
            </div>

            <div
              initial="hidden"
              whileInView="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeInUp"
            >
              {[
                {
                  title: 'Nucleic Acids',
                  topics: [
                    'DNA structure and replication',
                    'Transcription and gene expression',
                    'Translation and protein synthesis',
                  ],
                  icon: Dna,
                },
                {
                  title: 'Metabolism, Cell Respiration & Photosynthesis',
                  topics: [
                    'Metabolic pathways',
                    'Cellular respiration details',
                    'Photosynthesis mechanisms',
                  ],
                  icon: Lightbulb,
                },
                {
                  title: 'Plant Biology',
                  topics: [
                    'Transport in plants',
                    'Growth and development',
                    'Reproduction in plants',
                  ],
                  icon: Leaf,
                },
                {
                  title: 'Genetics & Evolution',
                  topics: [
                    'Meiosis and genetic variation',
                    'Population genetics',
                    'Hardy-Weinberg principle',
                  ],
                  icon: BarChart,
                },
                {
                  title: 'Animal Physiology',
                  topics: [
                    'Antibody production',
                    'Muscle and movement',
                    'Kidney and osmoregulation',
                    'Neurotransmission',
                  ],
                  icon: Brain,
                },
              ].map((topic, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200 hover:border-green-500 transition-all duration-300 animate-fadeInUp"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-[#4a5d4a] w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <topic.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{topic.title}</h3>
                      <ul className="space-y-2">
                        {topic.topics.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-700">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Assessment Components Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div
              initial="hidden"
              whileInView="visible"
              className="text-center mb-16 animate-fadeInUp"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fadeInUp">
                Assessment Components
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fadeInUp">
                Master every component of the IB Biology assessment with expert guidance
              </p>
            </div>

            <div
              initial="hidden"
              whileInView="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeInUp"
            >
              {[
                {
                  title: 'Paper 1',
                  subtitle: 'Multiple Choice',
                  sl: '30 questions, 45 min',
                  hl: '40 questions, 60 min',
                  weight: '20%',
                  description: 'Core and option topics',
                  icon: CheckCircle,
                },
                {
                  title: 'Paper 2',
                  subtitle: 'Data-based Questions',
                  sl: '3 sections, 75 min',
                  hl: '3 sections, 135 min',
                  weight: 'SL: 40%, HL: 36%',
                  description: 'Short and extended response',
                  icon: FileText,
                },
                {
                  title: 'Paper 3',
                  subtitle: 'Extended Response',
                  sl: '2 sections, 60 min',
                  hl: '3 sections, 75 min',
                  weight: 'SL: 20%, HL: 24%',
                  description: 'Option topic questions',
                  icon: BookOpen,
                },
                {
                  title: 'Internal Assessment',
                  subtitle: 'Individual Investigation',
                  sl: '10 hours',
                  hl: '10 hours',
                  weight: '20%',
                  description: 'Independent research project',
                  icon: Microscope,
                },
              ].map((paper, index) => (
                <div
                  key={index}
                  className="bg-green-50 rounded-2xl p-6 shadow-lg border-2 border-green-200 hover:border-green-500 transition-all duration-300 animate-fadeInUp"
                >
                  <div className="bg-[#4a5d4a] w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <paper.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{paper.title}</h3>
                  <p className="text-green-600 font-semibold mb-3">{paper.subtitle}</p>
                  <div className="space-y-2 text-sm text-gray-700 mb-4">
                    <p>
                      <span className="font-semibold">SL:</span> {paper.sl}
                    </p>
                    <p>
                      <span className="font-semibold">HL:</span> {paper.hl}
                    </p>
                    <p className="text-green-700 font-semibold">{paper.weight}</p>
                  </div>
                  <p className="text-gray-600 text-sm">{paper.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IA Support Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#4a5d4a]">
          <div className="max-w-7xl mx-auto">
            <div
              initial="hidden"
              whileInView="visible"
              className="text-center mb-16 animate-fadeInUp"
            >
              <h2 className="text-4xl font-bold text-white mb-4 animate-fadeInUp">
                Internal Assessment (IA) Support
              </h2>
              <p className="text-xl text-green-50 max-w-3xl mx-auto animate-fadeInUp">
                Comprehensive guidance to maximize your IA score (20% of final grade)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Research Question Development',
                  description: 'Craft focused, investigable questions that meet IB criteria',
                  icon: Target,
                  features: ['Topic selection', 'Scope refinement', 'Variable identification'],
                },
                {
                  title: 'Data Collection Methods',
                  description: 'Design robust experiments with appropriate controls',
                  icon: Microscope,
                  features: ['Methodology design', 'Control variables', 'Sample size calculation'],
                },
                {
                  title: 'Analysis & Evaluation',
                  description: 'Statistical analysis and critical evaluation techniques',
                  icon: BarChart,
                  features: ['Statistical tests', 'Error analysis', 'Graph optimization'],
                },
                {
                  title: 'Score Optimization',
                  description: 'Meet all assessment criteria for maximum marks',
                  icon: TrendingUp,
                  features: ['Criteria alignment', 'Academic writing', 'Citation guidance'],
                },
              ].map((item, index) => (
                <div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 animate-fadeInUp"
                >
                  <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-green-50 mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-green-100 text-sm">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div
              initial="hidden"
              whileInView="visible"
              className="text-center mb-16 animate-fadeInUp"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fadeInUp">
                Why Choose Our IB Biology Tutoring
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fadeInUp">
                Comprehensive support beyond the curriculum
              </p>
            </div>

            <div
              initial="hidden"
              whileInView="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeInUp"
            >
              {[
                {
                  icon: Target,
                  title: 'Command Term Mastery',
                  description:
                    'Master IB-specific command terms like "Outline," "Explain," "Discuss," and "Evaluate" to answer questions precisely.',
                },
                {
                  icon: BookMarked,
                  title: 'Extended Essay Support',
                  description:
                    'Complete guidance for Biology Extended Essays - from topic selection to final submission.',
                },
                {
                  icon: Lightbulb,
                  title: 'TOK Integration',
                  description:
                    'Connect biological concepts with Theory of Knowledge themes for deeper understanding.',
                },
                {
                  icon: Globe,
                  title: 'University Preparation',
                  description:
                    'Prepare for Biology programs at top UK, US, and international universities.',
                },
                {
                  icon: Clock,
                  title: 'Flexible Scheduling',
                  description:
                    'Online and offline classes that fit your IB Diploma Programme schedule.',
                },
                {
                  icon: Award,
                  title: 'Past Paper Practice',
                  description:
                    'Extensive practice with real IB past papers and examiner-style questions.',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-green-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 animate-fadeInUp"
                >
                  <div className="bg-[#4a5d4a] w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-50">
          <div className="max-w-4xl mx-auto">
            <div
              initial="hidden"
              whileInView="visible"
              className="text-center mb-16 animate-fadeInUp"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fadeInUp">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 animate-fadeInUp">
                Everything you need to know about our IB Biology tutoring
              </p>
            </div>

            <div
              initial="hidden"
              whileInView="visible"
              className="space-y-4 animate-fadeInUp"
            >
              {[
                {
                  question: 'What is the difference between IB Biology HL and SL?',
                  answer:
                    'IB Biology SL requires 150 teaching hours covering core topics, while HL requires 240 hours including all core topics plus additional higher level content in nucleic acids, metabolism, plant biology, and animal physiology. HL students also face more challenging assessments with longer exam times and more complex questions.',
                },
                {
                  question: 'How can an IB Biology tutor help improve my score?',
                  answer:
                    'An experienced IB Biology tutor provides targeted support in understanding complex concepts, mastering command terms, developing strong IA research questions, and practicing exam techniques. Our structured approach focuses on the specific requirements of IB assessments, and our students achieve a 98% success rate in scoring 6-7.',
                },
                {
                  question: 'Do you provide support for IB Biology Internal Assessment?',
                  answer:
                    'Yes, we provide comprehensive IA support including research question development, experimental design, data collection methods, statistical analysis, and evaluation techniques. We guide you through each criterion to ensure you maximize your IA score, which accounts for 20% of your final grade.',
                },
                {
                  question: 'Can you help with IB Biology Extended Essay?',
                  answer:
                    'Absolutely! We guide students through the entire Extended Essay process in Biology, from topic selection and research question formulation to literature review, methodology, data analysis, and final presentation. Our tutors have extensive experience with successful Biology EEs.',
                },
                {
                  question: 'What teaching methods do you use for IB Biology?',
                  answer:
                    'We use IB certified teaching methods focusing on inquiry-based learning, conceptual understanding, command term mastery, and past paper practice. Our approach integrates TOK connections, develops critical thinking skills, and emphasizes the scientific method and experimental design.',
                },
                {
                  question: 'Do you offer both online and in-person tutoring?',
                  answer:
                    'Yes, we offer both online and in-person tutoring options to suit your preferences and schedule. Our online sessions use interactive tools and digital resources to provide an engaging learning experience equivalent to in-person teaching.',
                },
                {
                  question: 'What qualifications do your IB Biology tutors have?',
                  answer:
                    'All our tutors are highly qualified with advanced degrees in Biology or related fields and extensive experience teaching the IB Diploma Programme. Many are certified IB examiners or workshop leaders, giving them insider knowledge of assessment criteria and marking schemes.',
                },
                {
                  question: 'How do you prepare students for university applications?',
                  answer:
                    'Beyond IB exam preparation, we help students develop the scientific thinking and practical skills needed for Biology programs at top universities. This includes guidance on personal statements, interview preparation, and understanding university-level Biology requirements in the UK, US, and other countries.',
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 animate-fadeInUp"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#4a5d4a]">
          <div className="max-w-4xl mx-auto text-center">
            <div
              initial="hidden"
              whileInView="visible"
             className="animate-fadeInUp">
              <h2
                className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fadeInUp"
              >
                Ready to Excel in IB Biology?
              </h2>
              <p className="text-xl text-green-50 mb-8 animate-fadeInUp">
                Join 250+ successful IB Biology students. Book your free demo class today!
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fadeInUp"
              >
                <Link
                  href="/book-demo"
                  className="group bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-50 transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Book Free Demo Class
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={async () => {
                    await trackAndOpenWhatsApp({
                      source: 'ib-biology-cta',
                      message: WHATSAPP_MESSAGES.courseEnquiry,
                      campaign: 'ib-biology-tutor',
                    })
                  }}
                  className="group bg-green-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-700/70 transition-all duration-300 flex items-center gap-2 border border-white/20 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp: +91 88264 44334
                </button>
              </div>

              <div
                className="flex items-center justify-center gap-6 text-green-50 animate-fadeInUp"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>No commitment required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>HL & SL experts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>95% score 6-7</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
