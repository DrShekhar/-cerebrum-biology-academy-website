'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  Users,
  Award,
  BookOpen,
  Target,
  Star,
  ArrowRight,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Microscope,
  Trophy,
  Zap,
} from 'lucide-react'

const FloatingWhatsAppButton = () => (
  <a
    href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20interested%20in%20Kerala%20HSE%20Biology%20coaching%20for%20NEET%20and%20KEAM"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all z-50"
  >
    <MessageCircle className="w-6 h-6" />
  </a>
)

export default function PageContent() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const syllabusCoverage = [
    { title: 'Cellular & Molecular Biology', topics: ['Cell Structure & Functions', 'Cell Division', 'Genetics Foundations', 'Photosynthesis & Respiration'] },
    { title: 'Genetics & Biodiversity', topics: ['Mendel\'s Laws', 'Linkage & Mapping', 'Mutation', 'Evolution & Biodiversity'] },
    { title: 'Physiology & Ecology', topics: ['Nutrition & Digestion', 'Circulation & Respiration', 'Nervous Coordination', 'Ecosystem Dynamics'] },
    { title: 'Reproductive Biology', topics: ['Plant Reproduction', 'Animal Reproduction', 'Human Reproduction', 'Reproductive Health'] },
  ]

  const keralaNEETAdvantage = [
    { aspect: 'Strong Foundation', description: 'Kerala HSE provides excellent conceptual foundation for NEET with well-structured practicals' },
    { aspect: 'High Scorers', description: 'Kerala students consistently rank among top NEET scorers nationally with 650+ average scores' },
    { aspect: 'Science Tradition', description: 'Kerala\'s education system emphasizes science depth - strong advantage for medical entrance exams' },
    { aspect: 'KEAM + NEET', description: 'Dual preparation opportunity with Kerala\'s state entrance (KEAM) aligned with NEET requirements' },
    { aspect: 'Lab Experience', description: 'Kerala HSE practicals provide experimental understanding crucial for NEET theory application' },
    { aspect: 'Curriculum Quality', description: 'HSE curriculum has optimal breadth and depth for seamless NEET transition' },
  ]

  const whyChooseUs = [
    { icon: BookOpen, title: 'Kerala HSE Expertise', description: 'Deep understanding of Kerala HSE curriculum with expert guidance for maximum board scores' },
    { icon: Target, title: 'NEET + KEAM Dual Focus', description: 'Simultaneous preparation for both national NEET and Kerala state KEAM entrance exams' },
    { icon: Award, title: 'High Score Guarantee', description: 'Track record of Kerala students achieving 650+ NEET scores and KEAM excellence' },
    { icon: Trophy, title: 'Science Excellence Culture', description: 'Foster Kerala\'s strong science tradition with expert mentorship and strategic guidance' },
    { icon: Users, title: 'Kerala Faculty Expertise', description: 'Teachers trained in Kerala HSE standards with proven NEET conversion success' },
    { icon: Microscope, title: 'Practical-to-Theory Bridge', description: 'Connect Kerala HSE lab practicals with NEET theoretical understanding seamlessly' },
  ]

  const pricingPlans = [
    { name: '1:1 Coaching', price: '₹46,999', description: 'Premium personalized coaching with HSE focus and NEET/KEAM integrated excellence' },
    { name: 'Complete Program', price: '₹35,999', description: 'Full 2-year HSE + NEET/KEAM program with study materials and test series' },
    { name: 'Group Batch', price: '₹25,999', description: 'Small group classes with HSE board excellence and NEET/KEAM preparation focus' },
  ]

  const faqs = [
    {
      question: 'Why do Kerala HSE students perform so well in NEET?',
      answer: 'Kerala HSE curriculum emphasizes conceptual depth and practical understanding. This provides an excellent foundation for NEET\'s theoretical rigor. Additionally, Kerala\'s strong education culture and emphasis on science results in high motivation and preparation quality.',
    },
    {
      question: 'Can I prepare for both KEAM and NEET simultaneously?',
      answer: 'Yes! KEAM and NEET have 85%+ overlapping syllabus. Our dual-focus program optimizes both simultaneously, ensuring you don\'t double-study while maximizing scores in both competitive exams.',
    },
    {
      question: 'What is the NEET success rate for Kerala HSE students?',
      answer: 'Kerala HSE students show exceptional NEET success with 90%+ qualification rates and average scores of 650+. Many Kerala students rank in top 1% nationally, demonstrating the strength of HSE foundation when complemented with NEET-specific preparation.',
    },
    {
      question: 'How does Kerala HSE differ from CBSE in NEET preparation?',
      answer: 'Kerala HSE has different chapter sequence and depth emphasis. We bridge this by mapping HSE topics to NEET, preventing over-study while ensuring complete coverage. HSE\'s practical focus is actually an advantage for conceptual NEET questions.',
    },
    {
      question: 'Do Kerala HSE practicals help in NEET preparation?',
      answer: 'Absolutely! Kerala HSE practicals develop experimental thinking crucial for NEET\'s application-based questions. We connect these practical experiences to NEET theory, deepening conceptual clarity beyond theoretical learning alone.',
    },
    {
      question: 'How long does NEET prep take after HSE completion?',
      answer: 'With early start in HSE Class 11, targeted NEET focus for 8-10 months post-HSE completion is typically sufficient. Starting our integrated program in Class 11 ensures gradual depth building with consistent NEET preparation.',
    },
  ]

  const keralaStats = [
    { stat: '90%+', label: 'NEET Qualification Rate' },
    { stat: '650+', label: 'Average NEET Score' },
    { stat: 'Top 1%', label: 'National Ranking' },
    { stat: '85%+', label: 'KEAM-NEET Overlap' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <FloatingWhatsAppButton />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-green-700 to-blue-800 text-white py-12 sm:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.1 }}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Kerala HSE to NEET & KEAM Excellence
              </h1>
              <p className="text-lg sm:text-xl text-green-100 mb-8">
                Leverage Kerala's strong science education tradition with expert NEET and KEAM coaching. Join top NEET scorers from Kerala with HSE foundation excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/admissions"
                  className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center justify-center"
                >
                  Enroll for Kerala HSE
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a
                  href="https://wa.me/918826444334"
                  className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-colors inline-flex items-center justify-center"
                >
                  WhatsApp Us
                  <MessageCircle className="w-5 h-5 ml-2" />
                </a>
              </div>
            </motion.div>
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">Kerala HSE Success Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                {keralaStats.map((item, idx) => (
                  <div key={idx}>
                    <div className="text-3xl font-bold text-yellow-300 mb-1">{item.stat}</div>
                    <p className="text-sm text-green-100">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Kerala Advantage */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Kerala Students Excel in NEET
            </h2>
            <p className="text-gray-600 text-lg">Unique advantages of Kerala HSE curriculum</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keralaNEETAdvantage.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-green-600"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.aspect}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Coverage */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kerala HSE Syllabus Coverage
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {syllabusCoverage.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-6 h-6 text-green-600 mr-3" />
                  {module.title}
                </h3>
                <div className="space-y-2">
                  {module.topics.map((topic, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Cerebrum for Kerala HSE
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Icon className="w-8 h-8 text-green-600 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kerala HSE-NEET/KEAM Plans
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-green-600 mb-4">{plan.price}</div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <Link
                  href="/admissions"
                  className="block bg-green-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Enroll Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-900">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-gray-200 bg-gray-50"
                    >
                      <p className="p-6 text-gray-700">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-gradient-to-r from-green-700 to-blue-800 text-white py-12 sm:py-16 md:py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Excel in NEET & KEAM with Kerala HSE Excellence
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-green-100">
            Join Kerala students achieving 650+ NEET scores with HSE foundation strength
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center justify-center"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a
              href="tel:8826444334"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-colors inline-flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call: 8826444334
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-green-500 text-sm opacity-90">
            <p>WhatsApp: +91 88264-44334 | Website: cerebrumbiologyacademy.com</p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
