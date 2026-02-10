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
  Globe,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  FileText,
  Microscope,
  Shield,
  Zap,
} from 'lucide-react'

const FloatingWhatsAppButton = () => (
  <a
    href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20interested%20in%20Karnataka%20PUC%20Biology%20coaching%20for%20NEET"
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
    { title: 'Cell Biology & Biochemistry', topics: ['Cell Structure & Division', 'Enzymes', 'Carbohydrates & Lipids', 'Proteins & Nucleic Acids'] },
    { title: 'Genetics & Heredity', topics: ['Mendelian Inheritance', 'Chromosomal Basis', 'Mutations', 'Linkage & Crossing Over'] },
    { title: 'Ecology & Environment', topics: ['Organisms & Environment', 'Ecosystems', 'Biodiversity', 'Environmental Issues'] },
    { title: 'Human Physiology', topics: ['Nutrition & Digestion', 'Respiration', 'Circulation & Immunity', 'Nervous & Endocrine Systems'] },
  ]

  const boardToNEETMapping = [
    { pucTopic: 'Cell Division (Mitosis/Meiosis)', neetRelevance: 'Critical for Genetics & Reproduction sections', overlap: '95%' },
    { pucTopic: 'Photosynthesis & Respiration', neetRelevance: 'Plant Physiology & Metabolism foundation', overlap: '90%' },
    { pucTopic: 'Ecosystem Principles', neetRelevance: 'Ecology & Environmental Biology', overlap: '85%' },
    { pucTopic: 'Digestive & Circulatory Systems', neetRelevance: 'Human Physiology core topics', overlap: '92%' },
    { pucTopic: 'Genetic Laws & Inheritance', neetRelevance: 'Foundation for Molecular Genetics', overlap: '98%' },
  ]

  const whyChooseUs = [
    { icon: BookOpen, title: 'PUC Syllabus Mastery', description: 'Complete coverage of Karnataka PUC biology with chapter-wise modules and KCET-aligned content' },
    { icon: Target, title: 'NEET Bridge Content', description: 'Strategic gap filling between PUC and NEET with chapter overlap analysis and advanced concepts' },
    { icon: Award, title: 'KCET & NEET Dual Focus', description: 'Simultaneous preparation for both KCET (Karnataka entrance) and national NEET examination' },
    { icon: Users, title: 'Expert Karnataka Faculty', description: 'Experienced teachers familiar with PUC board patterns and successful NEET conversion' },
    { icon: Microscope, title: 'Lab-to-NEET Bridge', description: 'Connect PUC practicals with NEET theory through experimental understanding' },
    { icon: Shield, title: 'Proven Success Rate', description: 'Strong track record with Karnataka PUC students achieving 650+ NEET scores' },
  ]

  const pricingPlans = [
    { name: '1:1 Coaching', price: '₹45,000', description: 'Personalized one-on-one sessions with complete PUC + NEET integration' },
    { name: 'Complete Program', price: '₹34,999', description: 'Full batch program with 2 years PUC + NEET preparation and study materials' },
    { name: 'Group Batch', price: '₹24,999', description: 'Small group classes (4-6 students) with personalized doubt clearing' },
  ]

  const faqs = [
    {
      question: 'How does PUC curriculum differ from CBSE for NEET preparation?',
      answer: 'Karnataka PUC has its own syllabus depth and sequence. We bridge this by mapping PUC topics to NEET requirements, ensuring you\'re not over-studying unnecessary content while filling NEET-specific gaps in Cell Biology, Genetics, and Human Physiology.',
    },
    {
      question: 'Can I appear for KCET while preparing for NEET?',
      answer: 'Absolutely! PUC students have the advantage of preparing for both KCET (state entrance) and NEET. Our dual-focus program ensures you excel in both, with KCET-specific pattern practice and NEET\'s deeper concept requirements.',
    },
    {
      question: 'What is the NEET success rate for Karnataka PUC students?',
      answer: 'Our Karnataka PUC students achieve consistent success with 85%+ qualifying for NEET and average scores of 630+. The strong PUC biology foundation converts well to NEET when gaps are systematically addressed.',
    },
    {
      question: 'How much time do PUC students need for NEET preparation?',
      answer: 'PUC students typically need 8-10 months of focused NEET preparation post-PUC completion. With aligned coaching starting from PUC 1st year, you\'ll gradually build depth and breadth required for NEET.',
    },
    {
      question: 'Are there specific NEET topics that PUC misses?',
      answer: 'Yes - detailed Molecular Biology, certain Reproductive Health concepts, and specific Ecology nuances. Our program systematically covers these through targeted modules beyond PUC syllabus.',
    },
    {
      question: 'Do you provide PUC board exam preparation alongside NEET?',
      answer: 'Yes! We maintain PUC board excellence while building NEET depth. Students score 90+ in PUC boards while simultaneously developing NEET-level conceptual strength.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <FloatingWhatsAppButton />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-orange-600 to-red-700 text-white py-12 sm:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.1 }}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Karnataka PUC to NEET Excellence
              </h1>
              <p className="text-lg sm:text-xl text-orange-100 mb-8">
                Master Karnataka Pre-University Biology with seamless NEET integration. Expert coaching for KCET & NEET success from PUC curriculum foundation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/admissions"
                  className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-flex items-center justify-center"
                >
                  Enroll for PUC-NEET
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a
                  href="https://wa.me/918826444334"
                  className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors inline-flex items-center justify-center"
                >
                  WhatsApp Us
                  <MessageCircle className="w-5 h-5 ml-2" />
                </a>
              </div>
            </motion.div>
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">PUC-NEET Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-yellow-300" />
                  <span>100% PUC Syllabus Coverage</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-yellow-300" />
                  <span>KCET + NEET Dual Focus</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-yellow-300" />
                  <span>Chapter Overlap Analysis</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-yellow-300" />
                  <span>630+ NEET Average Score</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Syllabus Coverage */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              PUC Biology Syllabus Coverage
            </h2>
            <p className="text-gray-600 text-lg">Complete coverage with NEET alignment</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {syllabusCoverage.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-6 h-6 text-orange-600 mr-3" />
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

      {/* Board to NEET Mapping */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              PUC to NEET Topic Mapping
            </h2>
            <p className="text-gray-600 text-lg">Strategic alignment analysis</p>
          </div>
          <div className="space-y-4">
            {boardToNEETMapping.map((mapping, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-semibold">PUC Topic</p>
                    <p className="text-lg font-bold text-gray-900">{mapping.pucTopic}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-semibold">NEET Relevance</p>
                    <p className="text-lg font-bold text-orange-600">{mapping.neetRelevance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-semibold">Overlap</p>
                    <p className="text-lg font-bold text-green-600">{mapping.overlap}</p>
                  </div>
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
              Why Choose Cerebrum for Karnataka PUC
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
                  <Icon className="w-8 h-8 text-orange-600 mb-4" />
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
              PUC-NEET Coaching Plans
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
                <div className="text-3xl font-bold text-orange-600 mb-4">{plan.price}</div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <Link
                  href="/admissions"
                  className="block bg-orange-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
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
                    <ChevronUp className="w-5 h-5 text-orange-600 flex-shrink-0" />
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
        className="bg-gradient-to-r from-orange-600 to-red-700 text-white py-12 sm:py-16 md:py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Excel in Karnataka PUC & NEET Today
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-orange-100">
            Join 500+ Karnataka PUC students achieving 630+ NEET scores
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-flex items-center justify-center"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a
              href="tel:8826444334"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors inline-flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call: 8826444334
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-orange-400 text-sm opacity-90">
            <p>WhatsApp: +91 88264-44334 | Website: cerebrumbiologyacademy.com</p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
