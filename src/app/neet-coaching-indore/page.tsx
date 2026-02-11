'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
  Users,
  Trophy,
  Star,
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
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I am interested in NEET coaching in Indore. Please share details.'
)

const localities = [
  { name: 'Vijay Nagar', students: '180+', highlight: 'Education Hub', priority: 'high' },
  { name: 'Palasia', students: '120+', highlight: 'Central Indore', priority: 'high' },
  { name: 'Rau', students: '95+', highlight: 'Coaching Hub', priority: 'high' },
  { name: 'Bhawarkua', students: '85+', highlight: 'Commercial Area', priority: 'medium' },
  { name: 'Scheme 78', students: '75+', highlight: 'Residential', priority: 'medium' },
  { name: 'Sapna Sangeeta', students: '65+', highlight: 'Premium Zone', priority: 'high' },
  { name: 'MR-10', students: '55+', highlight: 'IT Corridor', priority: 'medium' },
  { name: 'AB Road', students: '90+', highlight: 'Main Highway', priority: 'high' },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Real-time online coaching for Indore students. No commute to Vijay Nagar coaching hubs.',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Personalized attention unlike crowded Indore coaching centers.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Expert doctors and teachers from premier medical institutions.',
  },
  {
    icon: BookOpen,
    title: 'CBSE + MP Board Focus',
    description: 'Complete biology coaching for both board exams and NEET.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, evening batches. Fit your school schedule.',
  },
  {
    icon: Shield,
    title: 'All Indore Covered',
    description: 'Vijay Nagar, Palasia, Rau, AB Road - all served with same quality.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '358', icon: Star },
  { label: 'Indore Students', value: '720+', icon: Users },
  { label: 'MGM Selections', value: '18+', icon: GraduationCap },
]

const faqs = [
  {
    question: 'Why choose online NEET coaching over Indore coaching centers?',
    answer:
      'Indore has become a coaching hub with centers in Vijay Nagar and Rau having 100+ students per batch. Our online classes limit to 10-15 students. Save commute time, get personalized attention, same 98% success rate.',
  },
  {
    question: 'Which areas in Indore do you serve?',
    answer:
      'We serve all Indore areas including Vijay Nagar, Palasia, Rau, Bhawarkua, Sapna Sangeeta, Scheme 78, MR-10, AB Road, and surrounding areas. Online live classes mean you can join from anywhere.',
  },
  {
    question: 'What is the fee for NEET coaching in Indore?',
    answer:
      'Our comprehensive NEET Biology coaching ranges from Rs 24,000 to Rs 68,000 per year depending on the program. Competitive with Indore coaching centers but with much smaller batches. EMI available.',
  },
  {
    question: 'Which medical colleges can Indore students target?',
    answer:
      'With strong NEET scores, Indore students can target: MGM Medical College Indore, Gandhi Medical College Bhopal, AIIMS Bhopal, Index Medical College, plus other all-India institutes.',
  },
  {
    question: 'How is Indore as a coaching destination?',
    answer:
      'Indore has emerged as a major NEET coaching hub in MP. While physical coaching centers are good, our online format offers smaller batches, flexible timings, and saves 1-2 hours daily commute time.',
  },
  {
    question: 'Do you cover MP Board syllabus?',
    answer:
      'Yes! We cater to English medium students from both CBSE and MP Board. Our NCERT-focused approach ensures complete NEET syllabus coverage while bridging any board-specific gaps.',
  },
]

const premiumSchools = [
  'Delhi Public School Indore',
  'Emerald Heights School',
  'The Daly College',
  'Choithram School',
  'St. Pauls Higher Secondary',
  'Queen Mary Convent',
  'MGM School',
  'Indore Public School',
]

const neetTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Calculator },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: Target },
  { name: 'NEET Exam Countdown', href: '/neet-exam-countdown', icon: Clock },
]

export default function NEETCoachingIndorePage() {
  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'whatsapp_click', {
        event_category: 'conversion',
        event_label: 'indore_neet_page',
      })
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Indore"
        citySlug="indore"
        state="Madhya Pradesh"
        localities={localities.map((l) => l.name)}
        faqs={faqs}
        studentCount="720"
        coordinates={{ lat: '22.7196', lng: '75.8577' }}
      />

      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              Cleanest City | Mini Mumbai
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-[#4ade80]">NEET Coaching in Indore</span>
            </h1>
            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Vijay Nagar | Palasia | Rau | All Indore
            </h2>
            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Premium NEET Biology coaching for Indore students. 98% success rate, AIIMS faculty.
              Target MGM Indore, AIIMS Bhopal. Join 720+ Indore students!
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
              <span>Call: </span>
              <a href="tel:+918826444334" className="font-bold hover:text-[#4ade80]">
                +91-88264-44334
              </a>
            </div>
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
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

      <section className="py-12 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Free NEET Preparation Tools</h2>
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

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              NEET Coaching Across Indore
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {localities.map((locality, index) => (
              <motion.div
                key={locality.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${locality.priority === 'high' ? 'ring-2 ring-[#1e3a5f]' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                    <MapPin className="w-5 h-5 text-[#1e3a5f]" />
                  </div>
                  <div className="text-2xl font-bold text-[#1e3a5f] mb-1">{locality.students}</div>
                  <div className="text-sm text-gray-500">{locality.highlight}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Indore Students Choose Us
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8 shadow-lg"
              >
                <feature.icon className="w-12 h-12 text-[#1e3a5f] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Indore Schools Trust Us
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {premiumSchools.map((school) => (
                <span
                  key={school}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium"
                >
                  {school}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              FAQs - NEET Coaching Indore
            </h2>
          </motion.div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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

      <section className="py-20 bg-gradient-to-r from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Crack NEET from Indore?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join 720+ Indore students. Target MGM, AIIMS Bhopal. 98% success rate!
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
              <a href="tel:+918826444334" className="font-bold hover:text-[#4ade80]">
                +91-88264-44334
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
