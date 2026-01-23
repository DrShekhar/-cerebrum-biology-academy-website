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
  'Hi! I am interested in Maharashtra HSC Biology tuition. Please share details about your online coaching program.'
)

const maharashtraCities = [
  { name: 'Mumbai', students: '450+', highlight: 'Maximum Enrolments', priority: 'high' },
  { name: 'Pune', students: '320+', highlight: 'IT Hub Premium', priority: 'high' },
  { name: 'Nagpur', students: '180+', highlight: 'Central India Hub', priority: 'high' },
  { name: 'Nashik', students: '120+', highlight: 'Growing Fast', priority: 'medium' },
  { name: 'Thane', students: '150+', highlight: 'Mumbai Adjacent', priority: 'high' },
  { name: 'Aurangabad', students: '95+', highlight: 'Marathwada Region', priority: 'medium' },
  { name: 'Navi Mumbai', students: '130+', highlight: 'Tech Corridor', priority: 'high' },
  { name: 'Kolhapur', students: '75+', highlight: 'Western Maharashtra', priority: 'medium' },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Real-time online coaching aligned with Maharashtra HSC syllabus. Learn from anywhere in Maharashtra.',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Personalized attention for every HSC student. Doubt clearing until you understand.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Expert teachers who understand both HSC board pattern and NEET requirements.',
  },
  {
    icon: BookOpen,
    title: 'HSC + NEET Dual Focus',
    description: 'Comprehensive preparation covering both Maharashtra board and NEET biology syllabus.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches. Study after school or on weekends.',
  },
  {
    icon: Shield,
    title: 'NCERT Aligned',
    description: 'Our curriculum bridges HSC syllabus with NCERT, ensuring complete NEET coverage.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score 2024', value: '358', icon: Star },
  { label: 'Maharashtra Students', value: '1,200+', icon: Users },
  { label: 'HSC Toppers', value: '45+', icon: GraduationCap },
]

const faqs = [
  {
    question: 'Is Maharashtra HSC Biology syllabus aligned with NEET?',
    answer:
      'Maharashtra HSC Biology syllabus covers approximately 70-75% of NEET syllabus. However, there are gaps especially in topics like Genetics, Biotechnology, and Ecology. Our coaching bridges these gaps by teaching NCERT alongside HSC, ensuring you are fully prepared for both board exams and NEET.',
  },
  {
    question: 'Which cities in Maharashtra do you serve?',
    answer:
      'We serve students from all Maharashtra cities including Mumbai, Pune, Nagpur, Nashik, Thane, Aurangabad, Navi Mumbai, Kolhapur, and more. Our online live classes mean you can join from anywhere in Maharashtra or even outside.',
  },
  {
    question: 'What is the fee for HSC Biology + NEET coaching?',
    answer:
      'Our comprehensive HSC + NEET Biology coaching ranges from Rs 24,000 to Rs 68,000 per year depending on the program chosen. This includes board exam preparation, NEET coaching, study materials, and unlimited doubt sessions. EMI options available.',
  },
  {
    question: 'How do you cover the gap between HSC and NEET syllabus?',
    answer:
      'We follow a dual-track approach: (1) Cover all HSC syllabus topics for board exam scoring, (2) Add NCERT-specific topics not in HSC. Our structured program ensures you master both without overlap confusion. Special focus on Genetics, Biotechnology, and Ecology gaps.',
  },
  {
    question: 'Can I prepare for both HSC boards and NEET simultaneously?',
    answer:
      'Yes! Our program is specifically designed for dual preparation. Many students score 90%+ in HSC Biology while also cracking NEET with 600+ marks. The key is our integrated teaching approach that covers common topics once but thoroughly.',
  },
  {
    question: 'Which medical colleges can Maharashtra students target?',
    answer:
      'With strong NEET scores, Maharashtra students can target: Grant Medical College Mumbai, Seth GS Medical College, BJ Medical College Pune, Government Medical College Nagpur, plus all-India institutes like AIIMS, JIPMER, and armed forces medical colleges.',
  },
]

const premiumSchools = [
  'Cathedral Vidya School Mumbai',
  'Symbiosis International School Pune',
  'Mercedes Benz International School',
  'Dhirubhai Ambani International',
  'Jamnabai Narsee School Mumbai',
  'Podar International School',
  'Vibgyor High School',
  'Ryan International School',
  'DPS Nagpur',
  'Kendriya Vidyalaya Maharashtra',
]

const neetTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Calculator },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: Target },
  { name: 'NEET Exam Countdown', href: '/neet-exam-countdown', icon: Clock },
]

export default function MaharashtraHSCBiologyTuitionPage() {
  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'whatsapp_click', {
        event_category: 'conversion',
        event_label: 'maharashtra_hsc_biology_page',
        value: 1,
      })
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')
  }

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_maharashtra', {
        event_category: 'conversion',
        event_label: 'maharashtra_hsc_biology_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Schema.org Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy - Maharashtra HSC Biology Tuition',
            description: 'Best online biology tuition for Maharashtra HSC board students preparing for NEET',
            url: 'https://cerebrumbiologyacademy.com/maharashtra-hsc-biology-tuition',
            areaServed: {
              '@type': 'State',
              name: 'Maharashtra',
              containedInPlace: { '@type': 'Country', name: 'India' },
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Biology Coaching Programs',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Course',
                    name: 'Maharashtra HSC + NEET Biology Coaching',
                    description: 'Comprehensive coaching for HSC board exam and NEET preparation',
                  },
                },
              ],
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 text-white py-20 overflow-hidden">
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
              Maharashtra State Board | HSC + NEET Biology
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">Maharashtra HSC Biology</span> Tuition Online
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Mumbai | Pune | Nagpur | Thane | Nashik | All Maharashtra Cities
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Expert HSC Biology coaching with NEET focus. 94.2% success rate, AIIMS faculty. Bridge the
              gap between Maharashtra board and NCERT syllabus. Join 1,200+ Maharashtra students!
            </p>

            {/* Primary CTA - WhatsApp */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleWhatsAppClick}
                className="bg-green-500 text-white hover:bg-green-600 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-6 h-6" />
                <span>WhatsApp Us Now</span>
              </Button>

              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>
            </div>

            {/* Phone CTA */}
            <div className="flex items-center justify-center gap-2 text-white/90 mb-12">
              <Phone className="w-5 h-5" />
              <span>Or call us: </span>
              <a href="tel:+918826444334" className="font-bold hover:text-yellow-300 transition-colors">
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
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEET Tools Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Free NEET Preparation Tools
            </h2>
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
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                View All NEET Tools <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Maharashtra Cities Coverage */}
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
              HSC Biology Coaching Across Maharashtra
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Mumbai to Nagpur, Pune to Nashik - premium online coaching for every Maharashtra student.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {maharashtraCities.map((city, index) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${
                    city.priority === 'high' ? 'ring-2 ring-orange-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{city.name}</h3>
                    <MapPin className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">{city.students}</div>
                  <div className="text-sm text-gray-500">{city.highlight}</div>
                  {city.priority === 'high' && (
                    <div className="mt-2 inline-flex items-center text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
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

      {/* HSC vs NEET Syllabus Comparison */}
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
              Maharashtra HSC vs NEET Syllabus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the overlap and gaps is crucial for dual preparation success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Common Topics (70-75%)
              </h3>
              <ul className="space-y-3">
                {[
                  'Cell Biology & Cell Division',
                  'Plant Physiology Basics',
                  'Human Physiology',
                  'Reproduction in Plants & Animals',
                  'Genetics (Mendelian)',
                  'Classification of Living Organisms',
                  'Biomolecules',
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
                  'Molecular Genetics (DNA Replication, Transcription)',
                  'Biotechnology Principles & Applications',
                  'Ecology (Ecosystem, Biodiversity)',
                  'Human Health & Diseases (Detailed)',
                  'Microbes in Human Welfare',
                  'Evolution (Hardy-Weinberg)',
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

          {/* WhatsApp CTA Mid-page */}
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 mb-4">
              Want to understand how we bridge these gaps? Talk to our counselor!
            </p>
            <Button
              size="lg"
              onClick={handleWhatsAppClick}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with Counselor on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Why Maharashtra Students Choose Us
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
                <feature.icon className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Schools Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-orange-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Maharashtra Schools Trust Us
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

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              FAQs - Maharashtra HSC Biology Tuition
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
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
                  <MessageCircle className="w-6 h-6 mr-3 text-orange-600 flex-shrink-0 mt-1" />
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

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Excel in HSC Biology & NEET?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join 1,200+ Maharashtra students. 94.2% success rate. AIIMS faculty. Start your journey today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleWhatsAppClick}
                className="bg-green-500 text-white hover:bg-green-600 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-6 h-6" />
                <span>WhatsApp Us Now</span>
              </Button>

              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-white text-orange-600 hover:bg-gray-100"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-white/90">
              <Phone className="w-5 h-5" />
              <span>Call: </span>
              <a href="tel:+918826444334" className="font-bold hover:text-yellow-300 transition-colors">
                +91-88264-44334
              </a>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm mt-12">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All Maharashtra Cities</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Live Classes</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>HSC + NEET</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>NCERT Aligned</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
