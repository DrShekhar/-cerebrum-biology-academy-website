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
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

const localities = [
  { name: 'MP Nagar', students: '140+', highlight: 'Commercial Hub', priority: 'high' },
  { name: 'Arera Colony', students: '120+', highlight: 'Premium Residential', priority: 'high' },
  { name: 'Kolar Road', students: '95+', highlight: 'Growing Area', priority: 'high' },
  { name: 'Hoshangabad Road', students: '85+', highlight: 'Education Zone', priority: 'medium' },
  { name: 'Shahpura', students: '75+', highlight: 'Central Location', priority: 'medium' },
  { name: 'Ayodhya Nagar', students: '65+', highlight: 'Residential Hub', priority: 'medium' },
  { name: 'Bairagarh', students: '55+', highlight: 'North Bhopal', priority: 'medium' },
  { name: 'TT Nagar', students: '70+', highlight: 'Administrative Area', priority: 'high' },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time online coaching for Bhopal students. No commute to coaching centers.',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Personalized attention unlike crowded Bhopal coaching centers.',
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
    title: 'All Bhopal Covered',
    description: 'MP Nagar, Arera Colony, Kolar Road - all served with same quality.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '358', icon: Star },
  { label: 'Bhopal Students', value: '650+', icon: Users },
  { label: 'AIIMS Selections', value: '12+', icon: GraduationCap },
]

const faqs = [
  {
    question: 'Why choose online NEET coaching over Bhopal coaching centers?',
    answer:
      'Bhopal coaching centers typically have 50-100+ students per batch. Our online classes limit to 10-15 students ensuring personalized attention. Plus, save commute time from different parts of Bhopal. Same 98% success rate, better attention.',
  },
  {
    question: 'Which areas in Bhopal do you serve?',
    answer:
      'We serve all Bhopal areas including MP Nagar, Arera Colony, Kolar Road, Hoshangabad Road, Shahpura, Ayodhya Nagar, TT Nagar, Bairagarh, and surrounding areas. Online live classes mean you can join from anywhere.',
  },
  {
    question: 'What is the fee for NEET coaching in Bhopal?',
    answer:
      'Our comprehensive NEET Biology coaching ranges from Rs 24,000 to Rs 68,000 per year depending on the program. This is comparable to Bhopal coaching centers but with much smaller batches. EMI available.',
  },
  {
    question: 'Which medical colleges can Bhopal students target?',
    answer:
      'With strong NEET scores, Bhopal students can target: Gandhi Medical College Bhopal, AIIMS Bhopal (top choice!), NSCB Medical College Jabalpur, MGM Medical College Indore, plus other all-India institutes.',
  },
  {
    question: 'Do you prepare for MP Board students?',
    answer:
      'Yes! We cater to English medium students from both CBSE and MP Board. The biology syllabus overlap is significant, and we bridge any gaps with NCERT-focused teaching for NEET.',
  },
  {
    question: 'How do online classes work for practical biology?',
    answer:
      'We use high-quality 3D animations, virtual lab simulations, and detailed diagrams. Our video explanations for practicals are often better than physical demonstrations. Plus, we provide practical notes and viva preparation.',
  },
]

const premiumSchools = [
  'Delhi Public School Bhopal',
  'The Sanskaar Valley School',
  'Campion School Bhopal',
  'St. Josephs Convent',
  'Carmel Convent School',
  'Sagar Public School',
  'Billabong High',
  'Kendriya Vidyalaya Bhopal',
]

const neetTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Calculator },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: Target },
  { name: 'NEET Exam Countdown', href: '/neet-exam-countdown', icon: Clock },
]

export default function NEETCoachingBhopalPage() {
  const handleWhatsAppClick = async () => {
    await trackAndOpenWhatsApp({
      source: 'neet-coaching-bhopal',
      message: "Hi! I'm from Bhopal and interested in NEET coaching. Please share details.",
      campaign: 'neet-coaching-bhopal',
    })
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Bhopal"
        citySlug="bhopal"
        state="Madhya Pradesh"
        localities={localities.map((l) => l.name)}
        faqs={faqs}
        studentCount="650"
        coordinates={{ lat: '23.2599', lng: '77.4126' }}
      />

      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              City of Lakes | MP Capital
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-[#4ade80]">NEET Coaching in Bhopal</span>
            </h1>
            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              MP Nagar | Arera Colony | Kolar Road | All Bhopal
            </h2>
            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Premium NEET Biology coaching for Bhopal students. 98% success rate, AIIMS faculty.
              Target AIIMS Bhopal, GMC with expert guidance. Join 650+ Bhopal students!
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
              NEET Coaching Across Bhopal
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
              Why Bhopal Students Choose Us
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
              Students from These Bhopal Schools Trust Us
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
              FAQs - NEET Coaching Bhopal
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

      <section className="py-20 bg-gradient-to-r from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Crack NEET from Bhopal?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join 650+ Bhopal students. Target AIIMS Bhopal, GMC. 98% success rate!
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
