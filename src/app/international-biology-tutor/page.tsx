'use client'

import { motion } from 'framer-motion'
import {
  Globe,
  Users,
  Clock,
  BookOpen,
  Video,
  CheckCircle,
  Star,
  Award,
  MessageCircle,
  FileText,
  TrendingUp,
  MapPin,
  Phone,
  ArrowRight,
  Target,
  Zap,
  Shield,
  HeadphonesIcon,
  GraduationCap,
  Trophy,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const curriculumCards = [
  {
    title: 'IGCSE/GCSE Biology',
    href: '/igcse-biology-tutor',
    icon: BookOpen,
    description: 'Cambridge & Edexcel biology tuition for GCSE/IGCSE students',
    stats: '500+ students • 95% A*/A',
    features: ['Cambridge certified', 'Past paper focus', 'Exam board specific'],
    color: 'from-blue-600 to-blue-600',
  },
  {
    title: 'A-Level Biology',
    href: '/a-level-biology-tutor',
    icon: GraduationCap,
    description: 'Expert A-Level biology tuition for AQA, OCR, Edexcel, Cambridge',
    stats: '400+ students • 92% A*/A',
    features: ['University prep', 'Medical school focus', 'All exam boards'],
    color: 'from-indigo-600 to-purple-600',
  },
  {
    title: 'IB Biology',
    href: '/ib-biology-tutor',
    icon: Globe,
    description: 'IB Diploma Biology HL & SL tuition with IA support',
    stats: '350+ students • 6-7 average',
    features: ['IA guidance', 'TOK integration', 'EE support'],
    color: 'from-purple-600 to-indigo-600',
  },
  {
    title: 'AP Biology',
    href: '/ap-biology-tutor',
    icon: Trophy,
    description: 'Advanced Placement Biology for US college credit',
    stats: '300+ students • 85% score 5',
    features: ['College credit', 'FRQ mastery', 'Lab report help'],
    color: 'from-indigo-600 to-rose-600',
  },
]

const countries = [
  { name: 'UAE', cities: 'Dubai, Abu Dhabi, Sharjah', students: '450+', flag: '🇦🇪' },
  {
    name: 'United Kingdom',
    cities: 'London, Manchester, Birmingham',
    students: '380+',
    flag: '🇬🇧',
  },
  { name: 'United States', cities: 'New York, California, Texas', students: '320+', flag: '🇺🇸' },
  { name: 'Singapore', cities: 'Singapore', students: '280+', flag: '🇸🇬' },
  { name: 'Hong Kong', cities: 'Hong Kong', students: '240+', flag: '🇭🇰' },
  { name: 'Australia', cities: 'Sydney, Melbourne, Brisbane', students: '220+', flag: '🇦🇺' },
  { name: 'Canada', cities: 'Toronto, Vancouver, Montreal', students: '200+', flag: '🇨🇦' },
  { name: 'Saudi Arabia', cities: 'Riyadh, Jeddah', students: '180+', flag: '🇸🇦' },
  { name: 'Qatar', cities: 'Doha', students: '160+', flag: '🇶🇦' },
  { name: 'Kuwait', cities: 'Kuwait City', students: '140+', flag: '🇰🇼' },
  { name: 'Bahrain', cities: 'Manama', students: '120+', flag: '🇧🇭' },
  { name: 'Oman', cities: 'Muscat', students: '100+', flag: '🇴🇲' },
]

const whyChooseUs = [
  {
    icon: Award,
    title: 'Curriculum-Specific Experts',
    description:
      'Dedicated tutors specialized in IGCSE, A-Level, IB, and AP - not generic biology teachers',
  },
  {
    icon: Clock,
    title: 'Flexible Global Timings',
    description: 'Classes available across all time zones - EST, GMT, GST, SGT, AEST and more',
  },
  {
    icon: FileText,
    title: 'Past Paper Mastery',
    description: '10+ years of past papers, mark schemes, and examiner reports for each exam board',
  },
  {
    icon: GraduationCap,
    title: 'University Application Support',
    description: 'UCAS personal statement, US college essays, and medical school interview prep',
  },
  {
    icon: Target,
    title: 'Predicted Grade Improvement',
    description: 'Average 2-grade improvement in predicted grades within 6 months',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description:
      'All tutors are qualified teachers or university graduates with teaching experience',
  },
]

const features = [
  {
    icon: Video,
    title: 'Online Live Classes',
    description: 'Interactive sessions via Zoom with whiteboard, screen sharing, and recordings',
  },
  {
    icon: BookOpen,
    title: 'Recorded Sessions',
    description: 'Access all class recordings anytime for revision and exam preparation',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Doubt Support',
    description: '24/7 doubt clearing via WhatsApp - send photos, ask questions anytime',
  },
  {
    icon: FileText,
    title: 'Past Paper Banks',
    description: 'Comprehensive collection of past papers, mark schemes, and examiner reports',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Regular assessments, mock exams, and detailed performance analytics',
  },
  {
    icon: HeadphonesIcon,
    title: 'Parent Updates',
    description: 'Weekly progress reports and monthly parent-teacher meetings',
  },
]

const successStories = [
  {
    name: 'Sarah Ahmed',
    country: 'UAE',
    flag: '🇦🇪',
    curriculum: 'A-Level Biology',
    achievement: 'A* Grade',
    quote:
      'From predicted B to A*! The past paper practice was phenomenal. Now studying Medicine at Imperial College London.',
  },
  {
    name: 'James Chen',
    country: 'Singapore',
    flag: '🇸🇬',
    curriculum: 'IB Biology HL',
    achievement: 'Score 7',
    quote: 'The IA support was invaluable. Scored 7 in HL Biology and got into NUS Medicine.',
  },
  {
    name: 'Emily Thompson',
    country: 'USA',
    flag: '🇺🇸',
    curriculum: 'AP Biology',
    achievement: 'Score 5',
    quote:
      'Perfect score on AP Bio! The FRQ practice sessions made all the difference. Heading to Stanford now!',
  },
]

const comparisonData = [
  {
    feature: 'Difficulty Level',
    igcse: 'Foundation',
    aLevel: 'Advanced',
    ib: 'High (HL) / Medium (SL)',
    ap: 'College Level',
  },
  {
    feature: 'Assessment Style',
    igcse: 'MCQ + Written',
    aLevel: 'Essay-based',
    ib: 'Paper 1-3 + IA',
    ap: 'MCQ + FRQ',
  },
  {
    feature: 'Duration',
    igcse: '2 years',
    aLevel: '2 years',
    ib: '2 years',
    ap: '1 year',
  },
  {
    feature: 'University Recognition',
    igcse: 'Pre-university',
    aLevel: 'UK/Global',
    ib: 'Global',
    ap: 'US/Canada',
  },
  {
    feature: 'Best For',
    igcse: 'Ages 14-16',
    aLevel: 'Ages 16-18',
    ib: 'Ages 16-18',
    ap: 'Ages 15-18',
  },
]

const faqs = [
  {
    question: 'Do you teach all international biology curricula?',
    answer:
      'Yes! We specialize in IGCSE/GCSE Biology (Cambridge & Edexcel), A-Level Biology (AQA, OCR, Edexcel, Cambridge), IB Biology (HL & SL), and AP Biology. Each curriculum has dedicated expert tutors.',
  },
  {
    question: 'How do you handle different time zones?',
    answer:
      'We offer flexible scheduling across all major time zones including EST, GMT, GST, SGT, AEST, and more. Students from UAE typically prefer evening slots (7-10 PM GST), UK students prefer after-school (4-8 PM GMT), and US students book morning or evening slots.',
  },
  {
    question: 'What makes your international biology tutoring different?',
    answer:
      'Unlike generic tutors, our teachers are curriculum-specific experts who understand exam board requirements, marking schemes, and common examiner expectations. We provide 10+ years of past papers, detailed mark schemes, and focus on exam technique.',
  },
  {
    question: 'Can you help with university applications?',
    answer:
      'Yes! We provide comprehensive support including UCAS personal statements for UK universities, US college essays, medical school interview preparation, and guidance on using your biology grades for competitive programs.',
  },
  {
    question: 'What are your fees for international students?',
    answer:
      'Fees range from $30-50 per hour depending on curriculum level and package. IGCSE: $30-35/hr, A-Level/IB: $40-45/hr, AP: $35-40/hr. We offer package discounts and multi-child family discounts.',
  },
  {
    question: 'Do you provide study materials and past papers?',
    answer:
      'Yes! All students receive comprehensive study materials including curriculum-specific notes, 10+ years of past papers with mark schemes, examiner reports, topic-wise question banks, and regular mock tests.',
  },
]

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy - International Biology Tutor',
  description:
    'Expert online biology tutoring for IGCSE, A-Level, IB, and AP curricula serving students in 15+ countries',
  url: 'https://cerebrumbiologyacademy.com/international-biology-tutor',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'Global',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1500',
  },
  offers: {
    '@type': 'Offer',
    category: 'Online Biology Tutoring',
    priceRange: '$30-$50',
  },
}

export default function InternationalBiologyTutorPage() {
  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'whatsapp_click', {
        event_category: 'conversion',
        event_label: 'international_biology_tutor_page',
        value: 1,
      })
    }
    window.open(
      'https://wa.me/918826444334?text=Hello!%20I%20am%20interested%20in%20international%20biology%20tutoring',
      '_blank'
    )
  }

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_international', {
        event_category: 'conversion',
        event_label: 'international_biology_tutor_page',
        value: 1,
      })
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-800 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

          <div className="relative max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium mb-6 border border-white/20">
                <Globe className="w-5 h-5 mr-2" />
                World-Class International Biology Tutoring
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                International Biology Tutor
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-300 mt-2">
                  IGCSE, A-Level, IB & AP Expert
                </span>
              </h1>

              <h2 className="text-xl md:text-2xl opacity-90 mb-6 font-light">
                World-class biology tutoring for international curricula
              </h2>

              <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join 1,500+ international students from UAE, UK, USA, Singapore, and 15+ countries.
                Expert online biology tutors specialized in IGCSE, A-Level, IB, and AP curricula
                with flexible timing across all time zones.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/demo-booking">
                  <Button
                    variant="secondary"
                    size="xl"
                    onClick={handleDemoBooking}
                    className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold"
                  >
                    <Video className="w-5 h-5 mr-2" />
                    Book Free Demo Class
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="xl"
                  onClick={handleWhatsAppClick}
                  className="border-white text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  WhatsApp: +91 88264 44334
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <Users className="w-10 h-10 mx-auto mb-3 text-blue-300" />
                  <div className="text-3xl font-bold">1,500+</div>
                  <div className="text-sm opacity-80 mt-1">International Students</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <MapPin className="w-10 h-10 mx-auto mb-3 text-blue-300" />
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-sm opacity-80 mt-1">Countries Worldwide</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <Clock className="w-10 h-10 mx-auto mb-3 text-blue-300" />
                  <div className="text-3xl font-bold">All Zones</div>
                  <div className="text-sm opacity-80 mt-1">EST, GMT, GST, SGT, AEST</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Curriculum Cards Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Choose Your Curriculum
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Specialized expert tutors for each international biology curriculum
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {curriculumCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={card.href}>
                    <div
                      className={`relative group bg-gradient-to-br ${card.color} rounded-2xl p-8 text-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

                      <div className="relative">
                        <div className="flex items-start justify-between mb-4">
                          <card.icon className="w-12 h-12" />
                          <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                        <p className="text-white/90 mb-4 leading-relaxed">{card.description}</p>

                        <div className="flex items-center gap-2 mb-4 text-sm font-semibold">
                          <Star className="w-4 h-4" />
                          <span>{card.stats}</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {card.features.map((feature, i) => (
                            <span
                              key={i}
                              className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/30"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Our International Tutoring?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Specialized expertise that goes beyond generic online tutoring
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-indigo-50 to-slate-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="bg-gradient-to-br from-indigo-600 to-slate-700 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Countries We Serve Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Students Worldwide Trust Us
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Teaching international biology students across 15+ countries and all major time
                zones
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {countries.map((country, index) => (
                <motion.div
                  key={country.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-3 text-center">{country.flag}</div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                    {country.name}
                  </h3>
                  <div className="text-2xl font-bold text-indigo-600 text-center mb-2">
                    {country.students}
                  </div>
                  <div className="text-sm text-gray-500 text-center">{country.cities}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Compare Biology Curricula
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understand the differences between IGCSE, A-Level, IB, and AP Biology
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="overflow-x-auto rounded-xl shadow-lg"
            >
              <table className="w-full bg-white">
                <thead className="bg-gradient-to-r from-indigo-600 to-slate-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Feature</th>
                    <th className="px-6 py-4 text-left font-bold">IGCSE</th>
                    <th className="px-6 py-4 text-left font-bold">A-Level</th>
                    <th className="px-6 py-4 text-left font-bold">IB</th>
                    <th className="px-6 py-4 text-left font-bold">AP</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-gray-700">{row.igcse}</td>
                      <td className="px-6 py-4 text-gray-700">{row.aLevel}</td>
                      <td className="px-6 py-4 text-gray-700">{row.ib}</td>
                      <td className="px-6 py-4 text-gray-700">{row.ap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                International Student Success Stories
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Real students from around the world achieving exceptional results
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <motion.div
                  key={story.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{story.flag}</div>
                      <div>
                        <div className="font-bold text-lg">{story.name}</div>
                        <div className="text-sm opacity-80">{story.country}</div>
                      </div>
                    </div>
                    <Trophy className="w-8 h-8 text-yellow-300" />
                  </div>

                  <div className="mb-3">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/30">
                      {story.curriculum}
                    </span>
                  </div>

                  <div className="text-2xl font-bold text-yellow-300 mb-4">{story.achievement}</div>

                  <p className="italic opacity-90 leading-relaxed">&ldquo;{story.quote}&rdquo;</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Premium Learning Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need for international biology exam success
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
                  className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl p-8 hover:shadow-lg transition-all"
                >
                  <div className="bg-gradient-to-br from-indigo-600 to-slate-700 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Common questions about international biology tutoring
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
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                    <MessageCircle className="w-6 h-6 mr-3 text-indigo-600 flex-shrink-0 mt-1" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Start Your International Biology Journey Today
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                Join 1,500+ successful international students from 15+ countries. Expert IGCSE,
                A-Level, IB, and AP biology tutoring available now!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/demo-booking">
                  <Button
                    variant="secondary"
                    size="xl"
                    onClick={handleDemoBooking}
                    className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold"
                  >
                    <Video className="w-5 h-5 mr-2" />
                    Book Free Demo Class
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="xl"
                  onClick={handleWhatsAppClick}
                  className="border-white text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </div>

              <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
                <div className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>All Time Zones</span>
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>Past Paper Focus</span>
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>Expert Tutors</span>
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>Proven Results</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
