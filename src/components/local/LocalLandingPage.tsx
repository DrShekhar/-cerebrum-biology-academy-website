'use client'

import { CONTACT_INFO, getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'
import { LocalArea } from '@/data/localAreas'
import { LeadMagnet, getLeadMagnetsByArea } from '@/data/leadMagnets'
import { getTestimonialsByArea } from '@/data/localTestimonials'
import { Button } from '@/components/ui/Button'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'
import { DemoBookingModal } from '@/components/booking/DemoBookingModal'
import { LeadMagnetModal } from '@/components/local/LeadMagnetModal'
import Link from 'next/link'
import {
  MapPin,
  Star,
  Users,
  Award,
  CheckCircle,
  Download,
  Play,
  Phone,
  Mail,
  Target,
  Calendar,
  MessageCircle,
  School,
  Train,
  Calculator,
  ClipboardCheck,
  BookOpen,
  GraduationCap,
  Clock,
  Shield,
  Zap,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  BadgeCheck,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'

interface LocalLandingPageProps {
  area: LocalArea
}

// FAQ Section Component - generates area-specific FAQs using local data
function FAQSection({ area }: { area: LocalArea }) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const schoolsList = area.demographics.schools.slice(0, 3).join(', ')
  const transportList = area.transportLinks.slice(0, 2).join(' and ')

  const faqs = [
    {
      question: `What makes Cerebrum Biology Academy the best choice for NEET preparation in ${area.name}?`,
      answer: `Cerebrum Biology Academy is the top choice for ${area.name} students because of our AIIMS-trained faculty, small batch sizes of 15-30 students, and a proven 98% success rate. We serve students from schools like ${schoolsList}, and our center is conveniently accessible via ${transportList}. We offer both online and offline modes tailored for ${area.name} families.`,
    },
    {
      question: `How do ${area.name} students reach the Cerebrum Biology Academy center?`,
      answer: `Our ${area.name} center at ${area.centerAddress || 'a convenient location'} is well-connected by ${area.transportLinks.slice(0, 3).join(', ')}. Students from nearby areas like ${area.nearbyAreas.slice(0, 4).join(', ')} find it easy to commute. We also offer online live classes for students who prefer studying from home.`,
    },
    {
      question: `Which schools in ${area.name} do your students come from?`,
      answer: `We proudly coach students from leading ${area.name} schools including ${area.demographics.schools.join(', ')}. Our curriculum is designed to complement school syllabi while building strong NEET Biology foundations. Many of these students have gone on to score 330+ in NEET Biology.`,
    },
    {
      question: 'What courses do you offer for NEET Biology preparation?',
      answer: `We offer three course tiers for ${area.name} students: Pursuit (foundation building with basics to advanced concepts), Ascent (comprehensive NEET prep with personal mentoring - our most popular choice), and Pinnacle (premium excellence with 1:1 faculty access). Each includes regular tests, doubt sessions, and study materials.`,
    },
    {
      question: `How can I book a free demo class from ${area.name}?`,
      answer: `Booking a free demo class is easy! Click the "Book FREE Demo Class" button on this page, call us at ${CONTACT_INFO.phone.display.primary}, or send a WhatsApp message. Our counselors will schedule a convenient time at our ${area.name} center or online. The demo includes a live teaching session so you can experience our methodology firsthand.`,
    },
    {
      question: `Is online coaching available for ${area.name} students?`,
      answer: `Yes! Our online live classes are perfect for ${area.name} students who want to save commute time. Features include live interactive sessions with real-time doubt clearing, recorded lectures for revision, and digital study materials. Many ${area.name} students opt for our hybrid approach - attending offline on weekends and online during weekdays.`,
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12 animate-fadeInUp">
          <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-bold mb-4">
            FAQ
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about NEET Biology coaching in {area.name}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeInUp"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-[#4a5d4a] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openFAQ === index && (
                <div className="overflow-hidden animate-fadeInUp">
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 text-center bg-gradient-to-br from-[#4a5d4a] to-[#3d4d3d] rounded-2xl p-8 text-white animate-fadeInUp">
          <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
          <p className="text-white/80 mb-6">
            Our counselors are here to help you make the right decision
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={getPhoneLink()}
              className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 text-slate-900 rounded-xl font-semibold hover:bg-yellow-400 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now
            </a>
            <button
              onClick={async () => {
                await trackAndOpenWhatsApp({
                  source: `local-landing-faq-${area.name.toLowerCase().replace(/\s+/g, '-')}`,
                  message: WHATSAPP_MESSAGES.enquiry,
                  campaign: 'local-landing',
                })
              }}
              className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function LocalLandingPage({ area }: LocalLandingPageProps) {
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [selectedLeadMagnet, setSelectedLeadMagnet] = useState<LeadMagnet | null>(null)
  const [showLeadMagnetModal, setShowLeadMagnetModal] = useState(false)

  const leadMagnets = getLeadMagnetsByArea(area.id)
  const localTestimonials = getTestimonialsByArea(area.id)
  const primaryLeadMagnet = leadMagnets[0] // Feature the first one prominently

  const handleLeadMagnetClick = (magnet: LeadMagnet) => {
    setSelectedLeadMagnet(magnet)
    setShowLeadMagnetModal(true)
  }

  const handleBookDemo = () => {
    setShowDemoModal(true)
  }

  const stats = [
    { number: '500+', label: `Students from ${area.name}` },
    { number: '98%', label: 'Success Rate' },
    { number: '160+', label: 'Avg Biology Score' },
    { number: '15+', label: 'Years Experience' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Local Focus - Cerebrum Brand Colors */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 lg:py-28 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#4a5d4a] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              {/* Local Breadcrumb */}
              <div className="flex items-center text-slate-300 mb-6">
                <MapPin className="w-4 h-4 mr-2 text-[#4a5d4a]" />
                <span className="text-sm">
                  {area.state} &gt; {area.displayName}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Best Biology Teacher in <span className="text-yellow-400">{area.displayName}</span>
              </h1>

              {/* Sub-headline */}
              <p className="text-xl lg:text-2xl mb-8 text-slate-300 leading-relaxed">
                {area.description}
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="font-medium">4.9/5 Rating</span>
                </div>
                <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                  <Users className="w-5 h-5 text-green-400 mr-2" />
                  <span className="font-medium">500+ {area.name} Students</span>
                </div>
                <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                  <Award className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="font-medium">AIIMS Faculty</span>
                </div>
              </div>

              {/* Urgency Banner */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-xl mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  <span className="font-semibold text-sm sm:text-base">
                    Limited Seats! New Batch Starting Soon
                  </span>
                </div>
                <span className="text-xs bg-white/20 px-2 py-1 rounded">NEET 2026</span>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleBookDemo}
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold shadow-lg shadow-yellow-500/30"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book FREE Demo Class
                </Button>
                <Button
                  onClick={() => handleLeadMagnetClick(primaryLeadMagnet)}
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-slate-900"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Get Free Study Material
                </Button>
              </div>
            </div>

            {/* Hero Image/Stats */}
            <div className="relative animate-fadeInUp">
              {/* Success Stats Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-6 border border-white/10">
                <h3 className="text-2xl font-bold mb-6 text-center">Our {area.name} Results</h3>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                      <div className="text-sm text-slate-300">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Info */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center mb-3">
                  <MapPin className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="font-semibold">Our {area.name} Center</span>
                </div>
                <p className="text-sm text-slate-300 mb-4">{area.centerAddress}</p>
                <div className="flex items-center text-sm">
                  <Train className="w-4 h-4 mr-2 text-green-400" />
                  <span className="text-slate-300">Near {area.transportLinks[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools Section - NEW */}
      <section className="py-20 bg-gradient-to-br from-[#4a5d4a] to-[#3d4d3d] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <span className="inline-block bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-bold mb-4">
              FREE TOOLS
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Use Our Free NEET Preparation Tools
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Plan your NEET journey with our intelligent tools - used by 1,50,000+ students across{' '}
              {area.name}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* NEET College Predictor Tool */}
            <div className="bg-white rounded-2xl p-8 text-gray-900 shadow-xl hover:shadow-2xl transition-shadow animate-fadeInUp">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                  <Calculator className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">NEET College Predictor</h3>
                  <span className="text-sm text-green-600 font-medium">100% Free Tool</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Enter your expected NEET score and get a personalized list of medical colleges you
                can target based on your category and state quota.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  All India & State Quota Predictions
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Category-wise Cutoff Analysis
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Latest 2024 Data Updated
                </li>
              </ul>
              <Link href="/neet-college-predictor">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Try College Predictor
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* NEET Readiness Quiz */}
            <div className="bg-white rounded-2xl p-8 text-gray-900 shadow-xl hover:shadow-2xl transition-shadow animate-fadeInUp">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                  <ClipboardCheck className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">NEET Readiness Quiz</h3>
                  <span className="text-sm text-purple-600 font-medium">5-Min Assessment</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Take our quick assessment to discover your NEET readiness level and get personalized
                recommendations for your preparation.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-purple-600 mr-2" />
                  Personalized Study Plan
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-purple-600 mr-2" />
                  Strength & Weakness Analysis
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-purple-600 mr-2" />
                  Expert Recommendations
                </li>
              </ul>
              <Link href="/neet-readiness-quiz">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <ClipboardCheck className="w-5 h-5 mr-2" />
                  Take Readiness Quiz
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              FREE Resources for {area.name} Students
            </h2>
            <p className="text-xl text-gray-600">
              Download our exclusive study materials used by 1,50,000+ successful students from{' '}
              {area.name}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadMagnets.slice(0, 6).map((magnet, index) => (
              <div
                key={magnet.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-100 animate-fadeInUp"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#4a5d4a] to-[#3d4d3d] rounded-2xl flex items-center justify-center mb-4">
                    {magnet.type === 'pdf' && <Download className="w-8 h-8 text-white" />}
                    {magnet.type === 'video' && <Play className="w-8 h-8 text-white" />}
                    {magnet.type === 'assessment' && <Target className="w-8 h-8 text-white" />}
                    {magnet.type === 'checklist' && <CheckCircle className="w-8 h-8 text-white" />}
                    {magnet.type === 'strategy-session' && (
                      <MessageCircle className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {magnet.title.replace('[AREA]', area.displayName)}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {magnet.description.replace('[AREA]', area.displayName)}
                  </p>
                  <div className="text-green-600 font-semibold mb-4">{magnet.value}</div>
                </div>

                <ul className="space-y-2 mb-6">
                  {magnet.conversionBenefits.slice(0, 3).map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      {benefit.replace('[AREA]', area.displayName)}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleLeadMagnetClick(magnet)}
                  variant="primary"
                  size="lg"
                  className="w-full bg-[#4a5d4a] hover:bg-[#3d4d3d]"
                >
                  {magnet.ctaText.replace('[AREA]', area.displayName)}
                </Button>

                {magnet.socialProof && (
                  <p className="text-xs text-gray-500 text-center mt-3">
                    {magnet.socialProof.replace('[AREA]', area.displayName)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for [Area] */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why {area.name} Students Choose Cerebrum Biology Academy?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {area.uniqueSellingPoints.map((usp, index) => (
              <div
                key={index}
                className="flex items-start p-6 bg-gray-50 rounded-2xl animate-fadeInUp"
              >
                <div className="w-12 h-12 bg-[#4a5d4a] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed">{usp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Journey / How to Join Section - NEW */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <span className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-bold mb-4">
              ENROLLMENT GUIDE
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How to Join Cerebrum Biology Academy
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple 4-step process to start your NEET journey with us
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                step: '1',
                title: 'Book Free Demo',
                description: 'Schedule a free demo class to experience our teaching methodology',
                icon: Calendar,
                color: 'bg-blue-600',
              },
              {
                step: '2',
                title: 'Attend Demo Class',
                description:
                  'Interact with our faculty and understand our approach to NEET Biology',
                icon: BookOpen,
                color: 'bg-purple-600',
              },
              {
                step: '3',
                title: 'Choose Your Course',
                description:
                  'Select from Pursuit, Ascent, or Pinnacle based on your preparation needs',
                icon: GraduationCap,
                color: 'bg-green-600',
              },
              {
                step: '4',
                title: 'Start Learning',
                description: 'Complete enrollment and begin your journey to medical college',
                icon: Sparkles,
                color: 'bg-orange-500',
              },
            ].map((item, index) => (
              <div key={index} className="relative animate-fadeInUp">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center h-full">
                  <div
                    className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Course Options Preview */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-12 animate-fadeInUp">
            <div className="text-center mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Choose Your NEET Biology Course
              </h3>
              <p className="text-slate-300">Three tiers designed for different preparation needs</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  name: 'Pursuit',
                  tagline: 'Foundation Building',
                  features: ['Basics to Advanced', 'Small Batches', 'Regular Tests'],
                  color: 'from-green-500 to-green-600',
                },
                {
                  name: 'Ascent',
                  tagline: 'Most Popular',
                  features: ['Complete NEET Prep', 'Personal Mentoring', 'Doubt Sessions'],
                  color: 'from-blue-500 to-blue-600',
                  popular: true,
                },
                {
                  name: 'Pinnacle',
                  tagline: 'Premium Excellence',
                  features: ['1:1 Faculty Access', 'Priority Support', 'Elite Results'],
                  color: 'from-purple-500 to-purple-600',
                },
              ].map((course, index) => (
                <div
                  key={index}
                  className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border ${
                    course.popular
                      ? 'border-yellow-400 ring-2 ring-yellow-400/30'
                      : 'border-white/10'
                  } relative`}
                >
                  {course.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  <div
                    className={`w-full h-2 bg-gradient-to-r ${course.color} rounded-full mb-4`}
                  />
                  <h4 className="text-xl font-bold text-white mb-1">{course.name}</h4>
                  <p className="text-slate-400 text-sm mb-4">{course.tagline}</p>
                  <ul className="space-y-2 mb-4">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/courses">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold"
                >
                  View All Courses & Pricing
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Local Success Stories */}
      {localTestimonials.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 animate-fadeInUp">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Success Stories from {area.name} Students
              </h2>
              <p className="text-xl text-gray-600">
                Real students, real results from our {area.name} center
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {localTestimonials.slice(0, 3).map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-gray-50 rounded-3xl p-8 relative animate-fadeInUp"
                >
                  {/* Success Badge */}
                  <div className="absolute -top-3 left-6 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    NEET Rank: {testimonial.neetScore.rank}
                  </div>

                  {/* Student Info */}
                  <div className="text-center mb-6 mt-4">
                    <div className="w-20 h-20 mx-auto bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.school}</p>
                    <p className="text-blue-600 font-medium">{testimonial.college}</p>
                  </div>

                  {/* Score Improvement */}
                  <div className="bg-white rounded-2xl p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {testimonial.neetScore.biology}
                        </div>
                        <div className="text-xs text-gray-600">Biology Score</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {testimonial.neetScore.total}
                        </div>
                        <div className="text-xs text-gray-600">Total Score</div>
                      </div>
                    </div>
                    {testimonial.improvement && (
                      <div className="text-center mt-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          +{testimonial.improvement.biology} Biology Improvement
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-700 text-sm italic mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Local Details */}
                  <div className="bg-blue-50 rounded-2xl p-4">
                    <h4 className="font-semibold text-blue-900 text-sm mb-2">
                      Why {area.name} Center Worked:
                    </h4>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>🚇 {testimonial.localDetails.transportUsed}</li>
                      <li>📚 {testimonial.localDetails.studySpot}</li>
                      <li>⭐ {testimonial.localDetails.favoriteFeature}</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* More Testimonials CTA */}
            <div className="text-center mt-12">
              <Button onClick={handleBookDemo} variant="primary" size="lg" className="mx-auto">
                Join These Successful Students - Book Demo
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Local Area Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="animate-fadeInUp">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                Convenient Location in {area.name}
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                    Our {area.name} Center Location
                  </h4>
                  <p className="text-gray-600 ml-7">{area.centerAddress}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Train className="w-5 h-5 text-green-600 mr-2" />
                    Metro Connectivity
                  </h4>
                  <div className="ml-7 flex flex-wrap gap-2">
                    {area.transportLinks.slice(0, 3).map((transport, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                      >
                        {transport}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <School className="w-5 h-5 text-purple-600 mr-2" />
                    Nearby Schools We Serve
                  </h4>
                  <div className="ml-7 space-y-1">
                    {area.demographics.schools.slice(0, 3).map((school, idx) => (
                      <p key={idx} className="text-gray-600 text-sm">
                        • {school}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 animate-fadeInUp">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Our {area.name} Center
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-center p-4 bg-blue-50 rounded-2xl">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Call Us</div>
                    <div className="text-blue-600">{getDisplayPhone()}</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-green-50 rounded-2xl">
                  <MessageCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">WhatsApp</div>
                    <div className="text-green-600">Quick Response</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-purple-50 rounded-2xl">
                  <Mail className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-purple-600">info@cerebrumbiologyacademy.com</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button onClick={handleBookDemo} variant="primary" size="lg" className="w-full">
                  Book Free Demo Class
                </Button>
                <Button
                  onClick={() => handleLeadMagnetClick(primaryLeadMagnet)}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Get Free Study Material
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Landscape - unique per area */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <span className="inline-block bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm font-bold mb-4">
              LOCAL INSIGHT
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching Landscape in {area.name}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {area.name} is a{' '}
              {area.demographics.populationDensity === 'high'
                ? 'densely populated'
                : area.demographics.populationDensity === 'medium'
                  ? 'growing'
                  : 'well-connected'}{' '}
              area with{' '}
              {area.demographics.studentPopulation === 'high'
                ? 'a large student population'
                : area.demographics.studentPopulation === 'medium'
                  ? 'a significant number of NEET aspirants'
                  : 'dedicated students'}{' '}
              seeking quality Biology coaching for NEET.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-purple-50 rounded-2xl p-6">
              <School className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Top Schools We Serve</h3>
              <ul className="space-y-2">
                {area.demographics.schools.map((school, idx) => (
                  <li key={idx} className="flex items-center text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0" />
                    {school}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6">
              <GraduationCap className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Nearby Colleges & Universities
              </h3>
              <ul className="space-y-2">
                {area.demographics.colleges.map((college, idx) => (
                  <li key={idx} className="flex items-center text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                    {college}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 rounded-2xl p-6">
              <MapPin className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Areas We Serve Near {area.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {area.nearbyAreas.map((nearby, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white text-green-700 rounded-full text-sm border border-green-200"
                  >
                    {nearby}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-links to locations hub (hub-spoke SEO) */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Explore More Coaching Locations
            </h3>
            <p className="text-gray-600">
              Cerebrum Biology Academy serves students across Delhi NCR and beyond
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {area.state === 'Delhi' && (
              <Link
                href="/locations/delhi"
                className="px-5 py-2.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                All Delhi Locations
              </Link>
            )}
            {(area.state === 'Haryana' ||
              area.name.toLowerCase().includes('gurgaon') ||
              area.name.toLowerCase().includes('gurugram') ||
              area.name.toLowerCase().includes('faridabad')) && (
              <Link
                href="/locations/gurugram"
                className="px-5 py-2.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                All Gurugram Locations
              </Link>
            )}
            {(area.state === 'Uttar Pradesh' ||
              area.name.toLowerCase().includes('noida') ||
              area.name.toLowerCase().includes('ghaziabad')) && (
              <Link
                href="/locations/noida"
                className="px-5 py-2.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                All Noida Locations
              </Link>
            )}
            <Link
              href="/locations"
              className="px-5 py-2.5 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              All Locations
            </Link>
            <Link
              href="/all-locations"
              className="px-5 py-2.5 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              Location Directory
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section - Area-specific */}
      <FAQSection area={area} />

      {/* Trust Badges Section */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, label: 'Verified Faculty', sublabel: 'AIIMS & JIPMER Alumni' },
              { icon: Award, label: '15+ Years', sublabel: 'Teaching Excellence' },
              { icon: Users, label: '10,000+', sublabel: 'Students Trained' },
              { icon: BadgeCheck, label: '98%', sublabel: 'Success Rate' },
            ].map((badge, index) => (
              <div key={index} className="text-center animate-fadeInUp">
                <div className="w-12 h-12 mx-auto bg-[#4a5d4a]/10 rounded-full flex items-center justify-center mb-3">
                  <badge.icon className="w-6 h-6 text-[#4a5d4a]" />
                </div>
                <div className="font-bold text-gray-900">{badge.label}</div>
                <div className="text-sm text-gray-500">{badge.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Updated with Brand Colors */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#4a5d4a] rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <div className="animate-fadeInUp">
            {/* Urgency Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Clock className="w-4 h-4 mr-2" />
              Limited Seats Available - Enroll Now!
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Join 500+ Successful Students from {area.name}?
            </h2>
            <p className="text-xl mb-8 text-slate-300">
              Book your free demo class today and experience the Cerebrum difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleBookDemo}
                variant="secondary"
                size="xl"
                className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold shadow-lg shadow-yellow-500/30"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book FREE Demo Class
              </Button>
              <Button
                onClick={() => window.open(getPhoneLink())}
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-slate-900"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now: {getDisplayPhone()}
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-400">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>4.9/5 Rating</span>
              </div>
              <span>•</span>
              <div className="flex items-center">
                <Users className="w-4 h-4 text-green-400 mr-1" />
                <span>500+ {area.name} Students</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="hidden sm:flex items-center">
                <Award className="w-4 h-4 text-purple-400 mr-1" />
                <span>98% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Booking Modal */}
      <DemoBookingModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        courseId="local-demo"
        courseTitle={`Biology Coaching in ${area.displayName}`}
      />

      {/* Lead Magnet Modal */}
      {selectedLeadMagnet && (
        <LeadMagnetModal
          isOpen={showLeadMagnetModal}
          onClose={() => setShowLeadMagnetModal(false)}
          leadMagnet={selectedLeadMagnet}
          area={area}
        />
      )}
    </div>
  )
}
