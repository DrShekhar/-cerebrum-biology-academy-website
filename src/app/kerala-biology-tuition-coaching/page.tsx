'use client'

import { motion } from 'framer-motion'
import {
  MapPin, Users, Trophy, Star, CheckCircle, Award, BookOpen, Clock, Shield, Video,
  MessageCircle, Play, ArrowRight, GraduationCap, Building, Phone, Calculator, Target, FileText,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent('Hi! I am interested in Kerala Biology tuition. Please share details.')

const keralaCities = [
  { name: 'Kochi/Ernakulam', students: '380+', highlight: 'Commercial Capital', priority: 'high' },
  { name: 'Thiruvananthapuram', students: '320+', highlight: 'State Capital', priority: 'high' },
  { name: 'Kozhikode/Calicut', students: '220+', highlight: 'Education Hub', priority: 'high' },
  { name: 'Thrissur', students: '180+', highlight: 'Cultural Capital', priority: 'high' },
  { name: 'Kollam', students: '120+', highlight: 'South Kerala', priority: 'medium' },
  { name: 'Kannur', students: '95+', highlight: 'North Kerala', priority: 'medium' },
  { name: 'Malappuram', students: '150+', highlight: 'Growing Fast', priority: 'medium' },
  { name: 'Palakkad', students: '85+', highlight: 'Gateway City', priority: 'medium' },
]

const features = [
  { icon: Video, title: 'Live Interactive Classes', description: 'Real-time online coaching aligned with Kerala Plus Two syllabus. English medium focus.' },
  { icon: Users, title: 'Small Batches (10-15)', description: 'Personalized attention for every Kerala student. Doubt clearing until mastery.' },
  { icon: Award, title: 'AIIMS Trained Faculty', description: 'Expert teachers who understand both Kerala HSE pattern and NEET requirements.' },
  { icon: BookOpen, title: 'Plus Two + NEET Dual Focus', description: 'Comprehensive preparation covering both Kerala board and NEET biology.' },
  { icon: Clock, title: 'Flexible Timings', description: 'Morning, afternoon, and evening batches. Study after school hours.' },
  { icon: Shield, title: 'NCERT Aligned', description: 'Our curriculum bridges Kerala SCERT with NCERT for complete NEET coverage.' },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score 2024', value: '358', icon: Star },
  { label: 'Kerala Students', value: '1,350+', icon: Users },
  { label: 'Plus Two Toppers', value: '48+', icon: GraduationCap },
]

const faqs = [
  {
    question: 'Is Kerala Plus Two Biology syllabus aligned with NEET?',
    answer: 'Kerala Plus Two (HSE) Biology syllabus under SCERT is approximately 80-85% aligned with NEET - one of the highest among state boards. Kerala follows NCERT-based curriculum, but some topics need deeper coverage for NEET. Our coaching ensures complete alignment.',
  },
  {
    question: 'Which cities in Kerala do you serve?',
    answer: 'We serve students from all Kerala cities including Kochi, Thiruvananthapuram, Kozhikode, Thrissur, Kollam, Kannur, Malappuram, Palakkad, and more. Our online live classes are accessible from anywhere in Kerala.',
  },
  {
    question: 'What is the fee for Plus Two Biology + NEET coaching?',
    answer: 'Our comprehensive Plus Two + NEET Biology coaching ranges from Rs 24,000 to Rs 68,000 per year. This includes board exam preparation, NEET coaching, study materials, and unlimited doubt sessions. EMI options available.',
  },
  {
    question: 'Which medical colleges can Kerala students target?',
    answer: 'With strong NEET scores, Kerala students can target: Government Medical College Thiruvananthapuram, Government Medical College Kozhikode, Amrita Institute of Medical Sciences, Government Medical College Thrissur, plus AIIMS, JIPMER, and other all-India institutes.',
  },
  {
    question: 'Do you teach in Malayalam medium?',
    answer: 'We focus on English medium students whose syllabus aligns with CBSE/NCERT. Our teaching is in English to ensure NEET readiness. Students from English medium schools or those comfortable with English benefit most from our program.',
  },
  {
    question: 'Why is Kerala board considered good for NEET preparation?',
    answer: 'Kerala SCERT curriculum is largely based on NCERT, making it one of the best state boards for NEET preparation. The syllabus has high overlap, reducing the gap students need to bridge. We enhance this advantage with focused NEET-specific training.',
  },
]

const premiumSchools = [
  'Bhavans Vidya Mandir', 'Choice School Kochi', 'Rajagiri Public School', 'Toc H Public School',
  'St. Teresa\'s College', 'Mar Ivanios College', 'Chinmaya Vidyalaya', 'Kendriya Vidyalaya Kerala',
  'Sarvodaya Vidyalaya', 'Model Higher Secondary Schools',
]

const neetTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Calculator },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: Target },
  { name: 'NEET Exam Countdown', href: '/neet-exam-countdown', icon: Clock },
]

export default function KeralaBiologyTuitionPage() {
  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'whatsapp_click', { event_category: 'conversion', event_label: 'kerala_biology_page' })
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')
  }

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy - Kerala Biology Tuition',
        description: 'Best online biology tuition for Kerala Plus Two students preparing for NEET',
        url: 'https://cerebrumbiologyacademy.com/kerala-biology-tuition-coaching',
        areaServed: { '@type': 'State', name: 'Kerala', containedInPlace: { '@type': 'Country', name: 'India' } },
      })}} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div className="text-center max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />Kerala State Board | Plus Two + NEET Biology
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-[#4ade80]">Kerala Biology</span> Tuition & Coaching Online
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">Kochi | Trivandrum | Calicut | Thrissur | All Kerala Cities</h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Expert Plus Two Biology coaching with NEET focus. 94.2% success rate, AIIMS faculty. Kerala&apos;s NCERT-aligned syllabus advantage + our expertise = medical college success!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="secondary" size="xl" onClick={handleWhatsAppClick} className="bg-[#25D366] text-white hover:bg-[#20BD5A] flex items-center justify-center gap-2">
                <MessageCircle className="w-6 h-6" /><span>WhatsApp Us Now</span>
              </Button>
              <Link href="/demo-booking">
                <Button variant="secondary" size="xl" className="bg-[#4ade80] text-[#1e3a5f] hover:bg-[#22c55e]">
                  <Play className="w-5 h-5 mr-2" />Book Free Demo Class
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-white/90 mb-12">
              <Phone className="w-5 h-5" /><span>Or call us: </span>
              <a href="tel:+918826444334" className="font-bold hover:text-[#4ade80] transition-colors">+91-88264-44334</a>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (
                <motion.div key={metric.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-[#4ade80]" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEET Tools */}
      <section className="py-12 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Free NEET Preparation Tools</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {neetTools.map((tool) => (
              <Link key={tool.name} href={tool.href} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center transition-all hover:scale-105">
                <tool.icon className="w-8 h-8 mx-auto mb-2" /><span className="text-sm font-medium">{tool.name}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/neet-tools">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#1e3a5f]">
                View All NEET Tools <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cities Coverage */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Biology Coaching Across Kerala</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keralaCities.map((city, index) => (
              <motion.div key={city.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} viewport={{ once: true }}>
                <div className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${city.priority === 'high' ? 'ring-2 ring-[#1e3a5f]' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{city.name}</h3>
                    <MapPin className="w-5 h-5 text-[#1e3a5f]" />
                  </div>
                  <div className="text-2xl font-bold text-[#1e3a5f] mb-1">{city.students}</div>
                  <div className="text-sm text-gray-500">{city.highlight}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kerala Advantage */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16"><h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">The Kerala NEET Advantage</h2></motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center"><CheckCircle className="w-6 h-6 mr-2" />Kerala Syllabus Strength (80-85%)</h3>
              <ul className="space-y-3">
                {['NCERT-based SCERT curriculum', 'High overlap with NEET syllabus', 'Strong conceptual foundation', 'Quality state education system', 'English medium strength', 'Good practical exposure', 'Competitive student community'].map((topic, i) => (
                  <li key={i} className="flex items-center text-gray-700"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />{topic}</li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center"><FileText className="w-6 h-6 mr-2" />What We Add (15-20%)</h3>
              <ul className="space-y-3">
                {['NEET-specific question patterns', 'Deeper Biotechnology coverage', 'Ecology application questions', 'MCQ solving strategies', 'Time management skills', 'Previous year analysis', 'Mock test practice'].map((topic, i) => (
                  <li key={i} className="flex items-center text-gray-700"><ArrowRight className="w-5 h-5 text-blue-600 mr-2" />{topic}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" onClick={handleWhatsAppClick} className="bg-[#25D366] text-white hover:bg-[#20BD5A]">
              <MessageCircle className="w-5 h-5 mr-2" />Chat with Counselor on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16"><h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Why Kerala Students Choose Us</h2></motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white rounded-xl p-8 shadow-lg">
                <feature.icon className="w-12 h-12 text-[#1e3a5f] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#1e3a5f]/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Students from These Kerala Schools Trust Us</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {premiumSchools.map((school) => (
                <span key={school} className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm">{school}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div className="text-center mb-16"><h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">FAQs - Kerala Biology Tuition</h2></motion.div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div key={faq.question} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-gray-50 rounded-xl p-8" itemScope itemType="https://schema.org/Question">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start" itemProp="name">
                  <MessageCircle className="w-6 h-6 mr-3 text-[#1e3a5f] flex-shrink-0 mt-1" />{faq.question}
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p className="text-gray-700 leading-relaxed ml-9" itemProp="text">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Excel in Plus Two Biology & NEET?</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">Join 1,350+ Kerala students. 94.2% success rate. AIIMS faculty. Start today!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="secondary" size="xl" onClick={handleWhatsAppClick} className="bg-[#25D366] text-white hover:bg-[#20BD5A] flex items-center justify-center gap-2">
                <MessageCircle className="w-6 h-6" /><span>WhatsApp Us Now</span>
              </Button>
              <Link href="/demo-booking">
                <Button variant="secondary" size="xl" className="bg-white text-[#1e3a5f] hover:bg-gray-100">
                  <Play className="w-5 h-5 mr-2" />Book Free Demo Class
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/90">
              <Phone className="w-5 h-5" /><span>Call: </span>
              <a href="tel:+918826444334" className="font-bold hover:text-[#4ade80] transition-colors">+91-88264-44334</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
