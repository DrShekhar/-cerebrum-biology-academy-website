'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  Shield,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Building,
  Phone,
  Calculator,
  Target,
  FileText,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I am interested in Karnataka PUC Biology coaching. Please share details about your online coaching program.'
)

const karnatakaCities = [
  { name: 'Bangalore', students: '580+', highlight: 'IT Capital Hub', priority: 'high' },
  { name: 'Mysore', students: '180+', highlight: 'Heritage City', priority: 'high' },
  { name: 'Mangalore', students: '150+', highlight: 'Coastal Premium', priority: 'high' },
  { name: 'Hubli-Dharwad', students: '120+', highlight: 'North Karnataka', priority: 'medium' },
  { name: 'Belgaum', students: '95+', highlight: 'Border City', priority: 'medium' },
  { name: 'Gulbarga', students: '75+', highlight: 'Hyderabad-Karnataka', priority: 'medium' },
  { name: 'Davangere', students: '65+', highlight: 'Central Karnataka', priority: 'medium' },
  { name: 'Shimoga', students: '55+', highlight: 'Malnad Region', priority: 'medium' },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Real-time online coaching aligned with Karnataka PUC syllabus. English medium focus.',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Personalized attention for every PUC student. Doubt clearing until mastery.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Expert teachers who understand both KSEEB pattern and NEET requirements.',
  },
  {
    icon: BookOpen,
    title: 'PUC + NEET Dual Focus',
    description: 'Comprehensive preparation covering both Karnataka board and NEET biology.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches. Study after college hours.',
  },
  {
    icon: Shield,
    title: 'NCERT Aligned',
    description: 'Our curriculum bridges PUC syllabus with NCERT for complete NEET coverage.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '358', icon: Star },
  { label: 'Karnataka Students', value: '1,400+', icon: Users },
  { label: 'PUC Toppers', value: '52+', icon: GraduationCap },
]

const premiumSchools = [
  'Bishop Cotton Boys School',
  'National Public School Bangalore',
  'Delhi Public School Bangalore',
  'Inventure Academy',
  'Greenwood High',
  'Jain International School',
  'Mallya Aditi International',
  'Vidyashilp Academy',
  'BGS National Public School',
  'Presidency School',
]

const neetTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Calculator },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: Target },
  { name: 'NEET Exam Countdown', href: '/neet-exam-countdown', icon: Clock },
]

export default function PageContent() {
  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'whatsapp_click', {
        event_category: 'conversion',
        event_label: 'karnataka_puc_biology_page',
        value: 1,
      })
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')
  }

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_karnataka', {
        event_category: 'conversion',
        event_label: 'karnataka_puc_biology_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Cerebrum Brand Colors */}
      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              Karnataka State Board | PUC + NEET Biology
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-[#4ade80]">Karnataka PUC Biology</span> Coaching Online
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Bangalore | Mysore | Mangalore | Hubli | All Karnataka Cities
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Expert PUC Biology coaching with NEET focus. 98% success rate, AIIMS faculty. Bridge
              the gap between KSEEB and NCERT syllabus. Join 1,400+ Karnataka students!
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleWhatsAppClick}
                className="bg-[#25D366] text-white hover:bg-[#20BD5A] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-6 h-6" />
                <span>WhatsApp Us Now</span>
              </Button>

              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-[#4ade80] text-[#1e3a5f] hover:bg-[#22c55e]"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-white/90 mb-12">
              <Phone className="w-5 h-5" />
              <span>Or call us: </span>
              <a
                href="tel:+918826444334"
                className="font-bold hover:text-[#4ade80] transition-colors"
              >
                +91-88264-44334
              </a>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-[#4ade80]" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEET Tools Section */}
      <section className="py-12 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Free NEET Preparation Tools</h2>
            <p className="opacity-90">Use our AI-powered tools to plan your NEET journey</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {neetTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center transition-all hover:scale-105"
              >
                <tool.icon className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm font-medium">{tool.name}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/neet-tools">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#1e3a5f]"
              >
                View All NEET Tools <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Karnataka Cities Coverage */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              PUC Biology Coaching Across Karnataka
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Bangalore to Mangalore, Mysore to Hubli - premium online coaching for every
              Karnataka student.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {karnatakaCities.map((city, index) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${
                    city.priority === 'high' ? 'ring-2 ring-[#1e3a5f]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{city.name}</h3>
                    <MapPin className="w-5 h-5 text-[#1e3a5f]" />
                  </div>
                  <div className="text-2xl font-bold text-[#1e3a5f] mb-1">{city.students}</div>
                  <div className="text-sm text-gray-500">{city.highlight}</div>
                  {city.priority === 'high' && (
                    <div className="mt-2 inline-flex items-center text-xs bg-[#1e3a5f]/10 text-[#1e3a5f] px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 mr-1" />
                      Top City
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PUC vs NEET Syllabus */}
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
              Karnataka PUC vs NEET Syllabus
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Common Topics (75-80%)
              </h3>
              <ul className="space-y-3">
                {[
                  'Cell Biology & Biomolecules',
                  'Plant & Human Physiology',
                  'Reproduction Chapters',
                  'Genetics & Inheritance',
                  'Classification of Organisms',
                  'Structural Organisation',
                  'Body Fluids & Circulation',
                ].map((topic, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
              <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                Gap Topics (Need NCERT)
              </h3>
              <ul className="space-y-3">
                {[
                  'Biotechnology Applications Detail',
                  'Ecosystem & Environmental Issues',
                  'Biodiversity Conservation',
                  'Microbes in Human Welfare',
                  'Evolution Mechanisms Detail',
                  'Human Health & Immunity',
                  'Organisms & Populations',
                ].map((topic, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <ArrowRight className="w-5 h-5 text-red-600 mr-2 flex-shrink-0" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              onClick={handleWhatsAppClick}
              className="bg-[#25D366] text-white hover:bg-[#20BD5A]"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with Counselor on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Karnataka Students Choose Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <feature.icon className="w-12 h-12 text-[#1e3a5f] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Schools */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#1e3a5f]/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Karnataka Schools Trust Us
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {premiumSchools.map((school, index) => (
                <motion.span
                  key={school}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm"
                >
                  {school}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <VideoTestimonialsSection />

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              FAQs - Karnataka PUC Biology Coaching
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: 'Is Karnataka PUC Biology syllabus aligned with NEET?',
                answer:
                  'Karnataka PUC (KSEEB) Biology syllabus is approximately 75-80% aligned with NEET. The state board follows a comprehensive curriculum, but gaps exist in Biotechnology Applications, Ecology details, and some Genetics topics. Our coaching bridges these gaps with NCERT integration.',
              },
              {
                question: 'Which cities in Karnataka do you serve?',
                answer:
                  'We serve students from all Karnataka cities including Bangalore, Mysore, Mangalore, Hubli-Dharwad, Belgaum, Gulbarga, Davangere, Shimoga, and more. Our online live classes are accessible from anywhere in Karnataka.',
              },
              {
                question: 'What is the fee for PUC Biology + NEET coaching?',
                answer:
                  'Our comprehensive PUC + NEET Biology coaching ranges from Rs 24,000 to Rs 68,000 per year. This includes board exam preparation, NEET coaching, study materials, and unlimited doubt sessions. EMI options available.',
              },
              {
                question: 'How do you cover the gap between PUC and NEET syllabus?',
                answer:
                  'We follow an integrated approach: Cover all PUC syllabus for board scoring while adding NCERT-specific topics. Special modules for Biotechnology Applications, detailed Ecology, and advanced Genetics ensure complete NEET preparation.',
              },
              {
                question: 'Which medical colleges can Karnataka students target?',
                answer:
                  'With strong NEET scores, Karnataka students can target: Bangalore Medical College, Mysore Medical College, Kasturba Medical College Manipal, St. Johns Medical College, plus AIIMS, JIPMER, and other all-India institutes.',
              },
              {
                question: 'Do you offer coaching in Kannada medium?',
                answer:
                  'Currently, we focus on English medium students whose syllabus aligns with CBSE/NCERT. Our teaching is in English to ensure NEET readiness, as NEET is primarily in English. Students from English medium PUC colleges benefit most.',
              },
              {
                question: 'What is the success rate for Karnataka PUC students?',
                answer:
                  'Our success rate for PUC Biology students is 98% with an average score of 358/720 in NEET. We have 52+ PUC toppers in the last two years across all Karnataka districts.',
              },
              {
                question: 'Can I join mid-year if I start coaching later?',
                answer:
                  'Yes! We have batch starts every month. Our curriculum is designed to accommodate mid-year joiners with accelerated sessions to cover missed topics. Contact us to discuss your timeline.',
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8"
                itemScope
                itemType="https://schema.org/Question"
              >
                <h3
                  className="text-xl font-bold text-gray-900 mb-4 flex items-start"
                  itemProp="name"
                >
                  <MessageCircle className="w-6 h-6 mr-3 text-[#1e3a5f] flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p className="text-gray-700 leading-relaxed ml-9" itemProp="text">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Excel in PUC Biology & NEET?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join 1,400+ Karnataka students. 98% success rate. AIIMS faculty. Start today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleWhatsAppClick}
                className="bg-[#25D366] text-white hover:bg-[#20BD5A] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-6 h-6" />
                <span>WhatsApp Us Now</span>
              </Button>

              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-white text-[#1e3a5f] hover:bg-gray-100"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-white/90">
              <Phone className="w-5 h-5" />
              <span>Call: </span>
              <a
                href="tel:+918826444334"
                className="font-bold hover:text-[#4ade80] transition-colors"
              >
                +91-88264-44334
              </a>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm mt-12">
              {['All Karnataka Cities', 'Live Classes', 'PUC + NEET', 'NCERT Aligned'].map(
                (item) => (
                  <div key={item} className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
