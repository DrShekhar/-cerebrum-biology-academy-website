'use client'

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
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import { CityBreadcrumb } from '@/components/city/CityBreadcrumb'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I am interested in biology tuition in Surat. Please share details.'
)

const localities = [
  { name: 'Adajan', students: '180+', highlight: 'Premium Zone', priority: 'high' },
  { name: 'Vesu', students: '150+', highlight: 'IT Hub', priority: 'high' },
  { name: 'Athwa', students: '120+', highlight: 'Elite Locality', priority: 'high' },
  { name: 'City Light', students: '110+', highlight: 'Commercial Hub', priority: 'high' },
  { name: 'Piplod', students: '95+', highlight: 'Residential', priority: 'medium' },
  { name: 'Pal', students: '85+', highlight: 'Growing Fast', priority: 'medium' },
  { name: 'Katargam', students: '75+', highlight: 'Industrial Area', priority: 'medium' },
  { name: 'Varachha', students: '90+', highlight: 'Business Hub', priority: 'medium' },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time online coaching for Surat students. No commute needed.',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Personalized attention unlike crowded Surat coaching centers.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Expert doctors and teachers from premier medical institutions.',
  },
  {
    icon: BookOpen,
    title: 'CBSE + Gujarat Board',
    description: 'Complete biology coaching for both board exams and NEET.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, evening batches. Fit your school schedule.',
  },
  {
    icon: Shield,
    title: 'All Surat Covered',
    description: 'Adajan, Vesu, Athwa, City Light - all served with same quality.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '358', icon: Star },
  { label: 'Surat Students', value: '680+', icon: Users },
  { label: 'Medical Selections', value: '22+', icon: GraduationCap },
]

const faqs = [
  {
    question: 'Why choose online biology tuition over Surat coaching centers?',
    answer:
      "Surat coaching centers typically have large batches. Our online classes limit to 10-15 students. Save commute time across Surat's busy roads, get personalized attention, same 98% success rate.",
  },
  {
    question: 'Which areas in Surat do you serve?',
    answer:
      'We serve all Surat areas including Adajan, Vesu, Athwa, City Light, Piplod, Pal, Katargam, Varachha, and surrounding areas. Online live classes mean you can join from anywhere in Surat.',
  },
  {
    question: 'What is the fee for NEET coaching in Surat?',
    answer:
      'Our comprehensive NEET Biology coaching ranges from Rs 24,000 to Rs 68,000 per year. Competitive pricing with much smaller batches and personalized attention. EMI available.',
  },
  {
    question: 'Which medical colleges can Surat students target?',
    answer:
      'With strong NEET scores, Surat students can target: Government Medical College Surat, B.J. Medical College Ahmedabad, AIIMS, GMERS colleges across Gujarat, plus other all-India institutes.',
  },
  {
    question: 'Do you cover Gujarat Board (GSEB) syllabus?',
    answer:
      'We focus on English medium students. While Gujarat Board has some differences, our NCERT-focused approach ensures complete NEET coverage. CBSE and English medium GSEB students benefit most.',
  },
  {
    question: "How is Surat's NEET preparation scenario?",
    answer:
      'Surat has a growing NEET aspirant community with many students traveling to Ahmedabad or Rajkot for coaching. Our online format brings quality AIIMS faculty to Surat without the travel hassle.',
  },
  {
    question: 'How do Surat students clear doubts in online coaching?',
    answer:
      'We provide unlimited doubt clearing via dedicated WhatsApp groups, live post-class sessions, one-on-one mentoring slots, and 24/7 access to recorded explanations. Most doubts from Surat students are resolved within 2 minutes on WhatsApp.',
  },
  {
    question: 'Is there a free demo class for Surat students?',
    answer:
      'Yes, we offer a completely free demo class for Surat families. Book via WhatsApp at 8826444334 or through our website. No commitment required. Experience our AIIMS-trained faculty teaching methodology before enrolling.',
  },
]

const premiumSchools = [
  'Delhi Public School Surat',
  'SGVP International School',
  'Shree Swaminarayan Gurukul',
  'The New Tulip International',
  'Udgam School for Children',
  'Podar International Surat',
  'Vibgyor High Surat',
  'St. Xaviers High School',
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
        event_label: 'surat_biology_page',
      })
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')
  }

  return (
    <div className="min-h-screen">
      <CityBreadcrumb cityName="Surat" stateName="Gujarat" stateSlug="neet-coaching-surat" />
      <CitySchema
        cityName="Surat"
        citySlug="surat"
        state="Gujarat"
        localities={localities.map((l) => l.name)}
        faqs={faqs}
        studentCount="680"
        coordinates={{ lat: '21.1702', lng: '72.8311' }}
      />

      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              Diamond City | Gujarat
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-[#4ade80]">Biology Tuition in Surat</span>
            </h1>
            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Adajan | Vesu | Athwa | City Light | All Surat
            </h2>
            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Premium Biology tuition & NEET coaching for Surat students. 98% success rate, AIIMS
              faculty. Target GMC Surat, AIIMS. Join 680+ Surat students!
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
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Biology Tuition Across Surat
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {localities.map((locality, index) => (
              <div
                key={locality.name}
               className="animate-fadeInUp">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Surat Students Choose Us
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-xl p-8 shadow-lg animate-fadeInUp"
              >
                <feature.icon className="w-12 h-12 text-[#1e3a5f] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Surat Schools Trust Us
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
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              FAQs - Biology Tuition Surat
            </h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
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

      <PricingSection cityName="Surat" />
      <CostComparisonSection cityName="Surat" />
      <RelatedCityLinks currentCity="Surat" currentSlug="biology-tuition-surat" />

      <section className="py-20 bg-gradient-to-r from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Excel in Biology & NEET from Surat?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join 680+ Surat students. Target GMC Surat, AIIMS. 98% success rate!
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
          </div>
        </div>
      </section>
    </div>
  )
}
