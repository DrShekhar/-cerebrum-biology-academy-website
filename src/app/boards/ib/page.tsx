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
  Lightbulb,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  FileText,
  Microscope,
  Beaker,
  Shield,
  Zap,
  Video,
  HeadphonesIcon,
  BadgeCheck,
  Sparkles,
} from 'lucide-react'

// Floating WhatsApp Button Component
const FloatingWhatsAppButton = () => {
  const whatsappNumber = '918826444334'
  const message = encodeURIComponent(
    "Hi! I'm interested in IB Biology coaching at Cerebrum Biology Academy. Please share more details about the program."
  )

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-5 py-4 rounded-full shadow-2xl transition-all duration-300 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
      >
        <MessageCircle className="w-6 h-6" fill="currentColor" />
      </motion.div>
      <span className="font-semibold hidden sm:inline">Chat on WhatsApp</span>
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
    </motion.a>
  )
}

// FAQ Accordion Component
const FAQItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}) => (
  <motion.div
    className="border border-gray-200 rounded-xl overflow-hidden bg-white"
    initial={false}
  >
    <button
      onClick={onClick}
      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
    >
      <span className="font-semibold text-gray-900 pr-4">{question}</span>
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
      )}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 pb-5 text-gray-600 border-t border-gray-100 pt-4">{answer}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)

export default function IBBiologyPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const stats = [
    { value: '89%', label: 'Score 6-7', sublabel: 'Top IB grades' },
    { value: '6.3', label: 'Avg Score', sublabel: 'Out of 7 points' },
    { value: '500+', label: 'IB Students', sublabel: 'Globally coached' },
    { value: '98%', label: 'University', sublabel: 'Top admissions' },
  ]

  const trustBadges = [
    { icon: BadgeCheck, text: 'IB Certified Faculty' },
    { icon: Shield, text: 'Score Guarantee' },
    { icon: HeadphonesIcon, text: '24/7 Support' },
    { icon: Award, text: 'Premium Quality' },
  ]

  const whyChooseUs = [
    {
      icon: GraduationCap,
      title: 'IB Examiner Faculty',
      description:
        'Learn from actual IB Biology examiners who understand exactly what scores 7s. Our faculty has corrected 10,000+ IB papers.',
    },
    {
      icon: Target,
      title: '2-Point Score Guarantee',
      description:
        'We guarantee a minimum 2-point improvement in your IB Biology score or get extended support free until you achieve it.',
    },
    {
      icon: FileText,
      title: 'IA Mastery Program',
      description:
        'Dedicated Internal Assessment guidance from topic selection to final submission. 92% of our students score 20+ in IA.',
    },
    {
      icon: Video,
      title: 'Interactive Live Classes',
      description:
        'Small batch sizes (max 8 students) with HD video, digital whiteboard, instant doubt clearing, and recorded sessions.',
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 WhatsApp Support',
      description:
        'Direct access to your tutor anytime via WhatsApp. Get doubts cleared within hours, not days. Especially during exam season.',
    },
    {
      icon: Beaker,
      title: 'Lab & Practical Focus',
      description:
        'Virtual lab simulations, practical skills training, and Group 4 project guidance. Complete preparation for all assessment components.',
    },
  ]

  const pricingPlans = [
    {
      name: '1:1 Elite Tutoring',
      price: '$75',
      unit: '/hour',
      description: 'Premium personalized coaching',
      features: [
        'One-on-one with IB examiner',
        'Fully customized curriculum',
        'Flexible scheduling (all timezones)',
        'IA & EE dedicated support',
        'WhatsApp access to tutor',
        'Session recordings',
        'Progress reports',
      ],
      highlight: false,
      cta: 'Book Trial Session',
      packages: [
        { hours: 20, price: '$1,400', savings: '$100 off' },
        { hours: 40, price: '$2,600', savings: '$400 off' },
        { hours: 60, price: '$3,600', savings: '$900 off' },
      ],
    },
    {
      name: 'Complete IB Program',
      price: '$6,000',
      unit: '/year',
      description: 'Best value for full preparation',
      features: [
        'HL & SL complete coverage',
        '150+ hours of instruction',
        'Small batch (4-8 students)',
        'IA guidance included',
        'All study materials',
        'Past paper bank access',
        'University guidance bonus',
        'Research workshop bonus',
      ],
      highlight: true,
      cta: 'Enroll Now',
      bonus: 'FREE: University guidance + Research workshop ($500 value)',
    },
    {
      name: 'Group Batch',
      price: '$40',
      unit: '/hour',
      description: 'Learn with peers globally',
      features: [
        '4-8 students per batch',
        'Fixed weekly schedule',
        'Interactive discussions',
        'IA guidance sessions',
        'Study materials included',
        'Recorded sessions',
        'Peer learning benefits',
      ],
      highlight: false,
      cta: 'Join Batch',
      packages: [
        { name: 'SL Track', duration: '6 months', price: '$1,800' },
        { name: 'HL Track', duration: '8 months', price: '$2,400' },
      ],
    },
  ]

  const syllabus = {
    hl: {
      name: 'Higher Level (HL)',
      hours: '240 hours',
      topics: [
        { name: 'Cell Biology', hours: '15h', icon: Microscope },
        { name: 'Molecular Biology', hours: '21h', icon: Beaker },
        { name: 'Genetics', hours: '15h', icon: Sparkles },
        { name: 'Ecology', hours: '12h', icon: Globe },
        { name: 'Evolution & Biodiversity', hours: '12h', icon: Lightbulb },
        { name: 'Human Physiology', hours: '20h', icon: Users },
        { name: 'Nucleic Acids (AHL)', hours: '9h', icon: Beaker },
        { name: 'Metabolism (AHL)', hours: '14h', icon: Zap },
        { name: 'Plant Biology (AHL)', hours: '13h', icon: Target },
        { name: 'Genetics & Evolution (AHL)', hours: '8h', icon: Sparkles },
        { name: 'Animal Physiology (AHL)', hours: '16h', icon: Users },
        { name: 'Option Topic', hours: '15h', icon: BookOpen },
      ],
    },
    sl: {
      name: 'Standard Level (SL)',
      hours: '150 hours',
      topics: [
        { name: 'Cell Biology', hours: '15h', icon: Microscope },
        { name: 'Molecular Biology', hours: '21h', icon: Beaker },
        { name: 'Genetics', hours: '15h', icon: Sparkles },
        { name: 'Ecology', hours: '12h', icon: Globe },
        { name: 'Evolution & Biodiversity', hours: '12h', icon: Lightbulb },
        { name: 'Human Physiology', hours: '20h', icon: Users },
        { name: 'Option Topic', hours: '15h', icon: BookOpen },
      ],
    },
  }

  const testimonials = [
    {
      name: 'Arjun M.',
      school: 'Singapore American School',
      score: '7/7 HL',
      image: '/testimonials/student1.jpg',
      quote:
        'The IA guidance was exceptional. My tutor helped me design an investigation that was both manageable and impressive. Scored 23/24 on my IA!',
    },
    {
      name: 'Sophie L.',
      school: 'British School of Brussels',
      score: '7/7 SL',
      image: '/testimonials/student2.jpg',
      quote:
        'Coming from a 4 to a 7 seemed impossible. The examiner insights and past paper strategies made all the difference. Best investment for IB.',
    },
    {
      name: 'Rohan K.',
      school: 'Dhirubhai Ambani School, Mumbai',
      score: '6/7 HL',
      image: '/testimonials/student3.jpg',
      quote:
        'The 24/7 WhatsApp support saved me during exam week. Got my doubts cleared at midnight before Paper 2!',
    },
  ]

  const faqs = [
    {
      question: 'What makes Cerebrum different from other IB Biology tutoring services?',
      answer:
        "Unlike generic tutoring platforms, we specialize exclusively in IB Biology with actual IB examiners on our faculty. Our 89% success rate for 6-7 scores and 2-point improvement guarantee demonstrate our commitment to results. We also offer 24/7 WhatsApp support - something most competitors charge extra for or don't offer at all.",
    },
    {
      question: 'How does the 2-point score guarantee work?',
      answer:
        "If you complete our full program (minimum 40 hours of instruction) and don't improve by at least 2 points from your baseline assessment, we provide free additional tutoring until you achieve that improvement. This applies to students who attend 90%+ sessions and complete all assigned work.",
    },
    {
      question: 'Do you help with Internal Assessment (IA)?',
      answer:
        'Absolutely! IA support is central to our program. We guide you through topic selection, experimental design, data collection methodology, analysis techniques, and scientific writing. Our structured approach has helped 92% of students score 20+ out of 24 on their IA.',
    },
    {
      question: 'What timezones do you support for live classes?',
      answer:
        "We have faculty across multiple timezones (IST, GMT, EST, PST, SGT) and offer flexible scheduling. Whether you're in Singapore, Dubai, London, or New York, we can accommodate your schedule. 1:1 sessions offer maximum flexibility.",
    },
    {
      question: 'Is $6,000/year for the Complete Program really all-inclusive?',
      answer:
        'Yes! The Complete IB Program includes 150+ hours of instruction (worth $6,000 at $40/hr), all study materials, past paper banks, IA guidance, and bonus university application support worth $500. No hidden costs. This makes us one of the most affordable premium IB Biology programs globally.',
    },
    {
      question: 'Can I switch between 1:1 and batch sessions?',
      answer:
        'Yes, we offer flexibility. Many students start with our batch program and add 1:1 sessions for IA support or exam-intensive revision. We can create a hybrid plan that fits your needs and budget.',
    },
  ]

  const comparisonData = [
    { feature: 'IB Examiner Faculty', us: true, others: 'Rare' },
    { feature: 'Score Guarantee', us: '2-point', others: 'None' },
    { feature: '24/7 WhatsApp Support', us: true, others: 'Extra $$$' },
    { feature: 'IA Dedicated Support', us: 'Included', others: 'Extra $$$' },
    { feature: 'Session Recordings', us: true, others: 'Sometimes' },
    { feature: 'Average Price (1:1)', us: '$75/hr', others: '$100-150/hr' },
    { feature: 'Complete Program', us: '$6,000/yr', others: '$8-12K+/yr' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Floating WhatsApp Button */}
      <FloatingWhatsAppButton />

      {/* Hero Section - Premium Dark */}
      <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          {/* Trust Badges Row */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {trustBadges.map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm"
              >
                <badge.icon className="w-4 h-4 text-green-400" />
                <span>{badge.text}</span>
              </div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                India's Premier IB Biology Institute
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Master IB Biology
                <span className="block text-green-400">Score 6-7 Guaranteed</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
                Premium IB Biology coaching with <strong>actual IB examiners</strong>. Comprehensive
                HL & SL preparation, dedicated IA support, and 24/7 WhatsApp access. Join 500+
                students achieving top scores worldwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.a
                  href={`https://wa.me/918826444334?text=${encodeURIComponent("Hi! I'm interested in IB Biology coaching. Please share program details.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-green-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us Now
                </motion.a>
                <Link
                  href="#pricing"
                  className="flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
                >
                  View Pricing
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 border-2 border-slate-900"
                    />
                  ))}
                </div>
                <span>
                  <strong className="text-white">500+</strong> students enrolled globally
                </span>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">Our Track Record</h3>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    className="text-center p-4 bg-white/5 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-1">
                      {stat.value}
                    </div>
                    <div className="font-semibold text-white">{stat.label}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{stat.sublabel}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-center gap-2 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5" fill="currentColor" />
                  ))}
                  <span className="text-white ml-2">4.9/5 Rating</span>
                </div>
                <p className="text-center text-gray-400 text-sm mt-2">
                  Based on 200+ student reviews
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Cerebrum */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Top IB Students Choose Cerebrum
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're not just another tutoring service. We're IB Biology specialists with examiner
              insights, proven results, and unmatched support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-5">
                  <item.icon className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How We Compare</h2>
            <p className="text-lg text-gray-600">See why students switch to Cerebrum</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 sm:p-8 border border-green-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-green-200">
                    <th className="text-left py-4 px-4 font-bold text-gray-900">Feature</th>
                    <th className="text-center py-4 px-4 font-bold text-green-600">
                      <div className="flex items-center justify-center gap-2">
                        <Award className="w-5 h-5" />
                        Cerebrum
                      </div>
                    </th>
                    <th className="text-center py-4 px-4 font-bold text-gray-500">Others</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="border-b border-green-100">
                      <td className="py-4 px-4 text-gray-700">{row.feature}</td>
                      <td className="py-4 px-4 text-center">
                        {row.us === true ? (
                          <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <span className="font-semibold text-green-600">{row.us}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center text-gray-500">{row.others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Complete IB Biology Syllabus Coverage
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive preparation for both Higher Level and Standard Level
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {Object.entries(syllabus).map(([level, data]) => (
              <motion.div
                key={level}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{data.name}</h3>
                    <p className="text-green-600 font-medium">{data.hours}</p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full font-semibold ${level === 'hl' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}
                  >
                    {level.toUpperCase()}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.topics.map((topic, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      <topic.icon className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-gray-900 block truncate">
                          {topic.name}
                        </span>
                        <span className="text-xs text-gray-500">{topic.hours}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Transparent Pricing, Premium Value
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your learning style. All plans include our 2-point score
              guarantee.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                className={`relative rounded-2xl p-6 sm:p-8 ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl scale-105 border-2 border-green-500'
                    : 'bg-white border border-gray-200 shadow-lg'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <h3
                  className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}
                >
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span
                    className={`text-4xl font-bold ${plan.highlight ? 'text-green-400' : 'text-green-600'}`}
                  >
                    {plan.price}
                  </span>
                  <span className={plan.highlight ? 'text-gray-300' : 'text-gray-500'}>
                    {plan.unit}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle
                        className={`w-5 h-5 flex-shrink-0 ${plan.highlight ? 'text-green-400' : 'text-green-500'}`}
                      />
                      <span className={plan.highlight ? 'text-gray-200' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.bonus && (
                  <div
                    className={`p-3 rounded-lg mb-6 text-sm ${plan.highlight ? 'bg-green-500/20 text-green-300' : 'bg-green-50 text-green-700'}`}
                  >
                    <Sparkles className="w-4 h-4 inline mr-2" />
                    {plan.bonus}
                  </div>
                )}

                {plan.packages && (
                  <div className="space-y-2 mb-6">
                    <p
                      className={`text-sm font-medium ${plan.highlight ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                      Package Options:
                    </p>
                    {plan.packages.map((pkg, k) => (
                      <div
                        key={k}
                        className={`flex justify-between text-sm p-2 rounded ${plan.highlight ? 'bg-white/5' : 'bg-gray-50'}`}
                      >
                        <span>{'hours' in pkg ? `${pkg.hours} hours` : pkg.name}</span>
                        <span className="font-semibold">
                          {pkg.price}
                          {'savings' in pkg && (
                            <span className="text-green-500 ml-1 text-xs">({pkg.savings})</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <motion.a
                  href={`https://wa.me/918826444334?text=${encodeURIComponent(`Hi! I'm interested in the ${plan.name} for IB Biology coaching.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
                    plan.highlight
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  {plan.cta}
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Success Stories from IB Students
            </h2>
            <p className="text-lg text-gray-600">Real results from students worldwide</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.school}</p>
                    <p className="text-sm font-medium text-green-600">{testimonial.score}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === i}
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-green-600 via-teal-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Excel in IB Biology?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join 500+ IB students worldwide who chose Cerebrum for their Biology success. Start
              with a free consultation today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.a
                href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want to book a free consultation for IB Biology coaching.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white text-green-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-all shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-6 h-6" />
                Book Free Consultation
              </motion.a>
              <Link
                href="tel:+918826444334"
                className="flex items-center justify-center gap-3 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
              >
                <Phone className="w-5 h-5" />
                Call +91 88264 44334
              </Link>
            </div>

            <p className="text-green-200 text-sm">
              No commitment required. Get expert guidance on your IB Biology journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Explore More Programs
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'IGCSE Biology', href: '/boards/igcse' },
              { name: 'A-Level Biology', href: '/a-level-biology-tuition' },
              { name: 'CBSE Biology', href: '/boards/cbse' },
              { name: 'NEET Preparation', href: '/courses/neet' },
              { name: 'Biology Olympiad', href: '/biology-olympiad-coaching' },
            ].map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-green-500 hover:text-green-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
