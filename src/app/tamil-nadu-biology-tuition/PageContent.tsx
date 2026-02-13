'use client'

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
  'Hi! I am interested in Tamil Nadu State Board Biology tuition. Please share details.'
)

const tamilNaduCities = [
  { name: 'Chennai', students: '520+', highlight: 'State Capital', priority: 'high' },
  { name: 'Coimbatore', students: '280+', highlight: 'Education Hub', priority: 'high' },
  { name: 'Madurai', students: '180+', highlight: 'Temple City', priority: 'high' },
  { name: 'Tiruchirappalli', students: '150+', highlight: 'Central TN', priority: 'medium' },
  { name: 'Salem', students: '120+', highlight: 'Growing Fast', priority: 'medium' },
  { name: 'Tirunelveli', students: '95+', highlight: 'South TN Hub', priority: 'medium' },
  { name: 'Erode', students: '85+', highlight: 'Western TN', priority: 'medium' },
  { name: 'Vellore', students: '110+', highlight: 'CMC Adjacent', priority: 'high' },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Real-time online coaching aligned with Tamil Nadu State Board syllabus. English medium focus.',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Personalized attention for every TN board student. Doubt clearing until mastery.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Expert teachers who understand both TN pattern and NEET requirements.',
  },
  {
    icon: BookOpen,
    title: 'TN Board + NEET Dual Focus',
    description: 'Comprehensive preparation covering both Tamil Nadu board and NEET biology.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches. Study after school hours.',
  },
  {
    icon: Shield,
    title: 'NCERT Aligned',
    description: 'Our curriculum bridges TN syllabus with NCERT for complete NEET coverage.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '358', icon: Star },
  { label: 'TN Students', value: '1,500+', icon: Users },
  { label: 'TN Board Toppers', value: '58+', icon: GraduationCap },
]

const premiumSchools = [
  'DAV Schools Chennai',
  'PSBB Schools',
  'Chettinad Vidyashram',
  'Sishya School',
  'Padma Seshadri Bala Bhavan',
  'National Public School Chennai',
  'Vidya Mandir Schools',
  'Bharatiya Vidya Bhavan',
  'GD Matriculation',
  'Velammal Schools',
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
        event_label: 'tamil_nadu_biology_page',
      })
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              Tamil Nadu State Board | Samacheer Kalvi + NEET
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-[#4ade80]">Tamil Nadu Biology</span> Tuition Online
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Chennai | Coimbatore | Madurai | Trichy | All TN Cities
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Expert TN Board Biology coaching with NEET focus. 98% success rate, AIIMS faculty.
              Bridge the gap between Samacheer Kalvi and NCERT syllabus. Join 1,500+ Tamil Nadu
              students!
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
                <div
                  key={metric.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-fadeInUp"
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-[#4ade80]" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEET Tools */}
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

      {/* Cities Coverage */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Biology Coaching Across Tamil Nadu
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Chennai to Madurai, Coimbatore to Trichy - premium online coaching for every TN
              student.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tamilNaduCities.map((city, index) => (
              <div
                key={city.name}
               className="animate-fadeInUp">
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${city.priority === 'high' ? 'ring-2 ring-[#1e3a5f]' : ''}`}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Tamil Nadu vs NEET Syllabus
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Common Topics (70-75%)
              </h3>
              <ul className="space-y-3">
                {[
                  'Cell Biology & Biomolecules',
                  'Plant & Human Physiology',
                  'Reproduction Chapters',
                  'Genetics & Inheritance',
                  'Classification of Organisms',
                  'Structural Organisation',
                  'Neural Control',
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
                  'Evolution Mechanisms',
                  'Human Health & Diseases',
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
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Tamil Nadu Students Choose Us
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-8 shadow-lg animate-fadeInUp"
              >
                <feature.icon className="w-12 h-12 text-[#1e3a5f] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#1e3a5f]/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Tamil Nadu Schools Trust Us
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {premiumSchools.map((school, index) => (
                <span
                  key={school}
                  className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm animate-fadeInUp"
                >
                  {school}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              FAQs - Tamil Nadu Biology Tuition
            </h2>
          </div>
          <div className="space-y-6">
            {[
              {
                question: 'Is Tamil Nadu State Board Biology syllabus aligned with NEET?',
                answer:
                  'Tamil Nadu State Board Biology syllabus is approximately 70-75% aligned with NEET. The TN board follows Samacheer Kalvi curriculum which has good coverage but gaps exist in Biotechnology Applications, detailed Ecology, and some Genetics topics. Our coaching bridges these gaps with NCERT integration.',
              },
              {
                question: 'Which cities in Tamil Nadu do you serve?',
                answer:
                  'We serve students from all Tamil Nadu cities including Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Tirunelveli, Erode, Vellore, and more. Our online live classes are accessible from anywhere in Tamil Nadu.',
              },
              {
                question: 'What is the fee for TN Board Biology + NEET coaching?',
                answer:
                  'Our comprehensive TN Board + NEET Biology coaching ranges from Rs 24,000 to Rs 68,000 per year. This includes board exam preparation, NEET coaching, study materials, and unlimited doubt sessions. EMI options available.',
              },
              {
                question: 'Which medical colleges can Tamil Nadu students target?',
                answer:
                  'With strong NEET scores, TN students can target: Madras Medical College, Stanley Medical College, Kilpauk Medical College, Coimbatore Medical College, CMC Vellore, plus AIIMS, JIPMER Puducherry, and other all-India institutes.',
              },
              {
                question: 'Do you teach in Tamil medium?',
                answer:
                  'We focus on English medium students whose syllabus aligns with CBSE/NCERT. Our teaching is in English to ensure NEET readiness. Students from English medium schools or those comfortable with English benefit most from our program.',
              },
              {
                question: 'How do you cover the gap between TN Board and NEET syllabus?',
                answer:
                  'We follow an integrated approach: Cover all Samacheer Kalvi syllabus for board scoring while adding NCERT-specific topics. Special modules for Biotechnology Applications, detailed Ecology, and advanced Genetics ensure complete NEET preparation.',
              },
              {
                question: 'What is the success rate for Tamil Nadu students?',
                answer:
                  'Our success rate for TN Board Biology students is 98% with an average score of 358/720 in NEET. We have 58+ TN Board toppers in the last two years across all Tamil Nadu districts.',
              },
              {
                question: 'How can I enroll or get more information?',
                answer:
                  'You can contact us via WhatsApp at 918826444334, call us at +91-88264-44334, or visit our website to book a free demo class. Our counselors will discuss your goals and customize a learning plan for you.',
              },
            ].map((faq, index) => (
              <div
                key={faq.question}
                className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Excel in TN Board Biology & NEET?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join 1,500+ Tamil Nadu students. 98% success rate. AIIMS faculty. Start today!
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
              {['All TN Cities', 'Live Classes', 'Board + NEET', 'NCERT Aligned'].map((item) => (
                <div key={item} className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
