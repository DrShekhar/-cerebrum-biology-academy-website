'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  Globe,
  Phone,
  MessageSquare,
  Star,
  Users,
  Trophy,
  CheckCircle2,
  Award,
  BookOpen,
  ArrowRight,
} from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { trackPhoneCallConversion } from '@/lib/analytics/googleAdsConversions'
import { MobilePhoneStickyBar } from '@/components/common/MobilePhoneStickyBar'

export default function IBIGCSEBiologyPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'course-page',
      variantId: 'ib-igcse-biology',
      pageType: 'course',
    })
  }, [])

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()
    trackPhoneCallConversion(CONTACT_INFO.phone.primary)
  }

  const handleWhatsApp = async () => {
    await trackAndOpenWhatsApp({
      source: 'ib-igcse-biology-course-page',
      message: 'Hi! I am interested in IB/IGCSE Biology coaching. Please share details.',
      campaign: 'course-ib-igcse-biology',
    })
  }

  const programs = [
    {
      title: 'IB Diploma Biology',
      subtitle: 'HL & SL',
      features: [
        'Complete syllabus coverage',
        'IA guidance & support',
        'Past paper practice',
        'Exam strategies',
      ],
      color: 'from-blue-600 to-blue-700',
    },
    {
      title: 'IGCSE Biology',
      subtitle: 'Cambridge',
      features: [
        '0610 syllabus coverage',
        'Practical skills training',
        'Past paper analysis',
        'Grade 9 targeting',
      ],
      color: 'from-green-600 to-green-700',
    },
    {
      title: 'A-Level Biology',
      subtitle: 'CIE/Edexcel',
      features: ['Complete AS & A2', 'Lab work support', 'University prep', 'Exam techniques'],
      color: 'from-purple-600 to-purple-700',
    },
  ]

  const schools = [
    'British School Delhi',
    'American Embassy School',
    'Vasant Valley School',
    'Pathways World School',
    'Step by Step School',
    'DPS International',
    'Shri Ram School',
    'Sanskriti School',
  ]

  const faqs = [
    {
      q: 'Do you cover IB Biology Internal Assessment (IA)?',
      a: 'Yes, we provide comprehensive IA guidance including topic selection, experiment design, data analysis, and report writing. Our students consistently score 6-7 in their IAs.',
    },
    {
      q: 'Which international schools do your students come from?',
      a: 'We tutor students from British School, American Embassy School, Pathways, Vasant Valley, DPS International, Step by Step, and other IB/IGCSE schools across Delhi NCR.',
    },
    {
      q: 'Do you offer online IB Biology tutoring?',
      a: 'Yes! We offer both in-person (at our South Delhi centers) and online 1-on-1 IB Biology tutoring. Many of our international school students prefer flexible online sessions.',
    },
    {
      q: 'What is the typical score improvement?',
      a: 'Our IB Biology students typically improve by 2-3 grades. Most achieve 6 or 7 in IB Diploma Biology (HL/SL) and A*/A grades in IGCSE.',
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div
              className="max-w-4xl mx-auto text-center animate-fadeInUp"
            >
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Globe className="w-4 h-4" />
                International Curriculum
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                IB & IGCSE <span className="text-yellow-400">Biology</span> Coaching
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Expert tutoring for IB Diploma, IGCSE, Cambridge & A-Level Biology. Trusted by
                students from top international schools in Delhi NCR.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  Book Free Demo
                </button>
                <a
                  href={`tel:${CONTACT_INFO.phone.primary}`}
                  onClick={handleCallNow}
                  className="flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="py-12 md:py-16 -mt-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {programs.map((program, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-xl overflow-hidden animate-fadeInUp"
                >
                  <div className={`bg-gradient-to-r ${program.color} text-white py-4 px-6`}>
                    <h3 className="font-bold text-xl">{program.title}</h3>
                    <p className="text-white/80 text-sm">{program.subtitle}</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {program.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why International School Students Choose{' '}
              <span className="text-blue-600">Cerebrum</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Award,
                  title: 'IB Trained Tutors',
                  desc: 'Faculty trained in IB methodology',
                },
                { icon: Users, title: '1-on-1 Sessions', desc: 'Personalized attention' },
                { icon: BookOpen, title: 'IA & EE Support', desc: 'Complete coursework guidance' },
                { icon: Trophy, title: 'Grade 7/A* Results', desc: 'Proven track record' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-lg text-center animate-fadeInUp"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schools We Serve */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Students from Top International Schools
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              We tutor IB and IGCSE students from leading international schools across Delhi NCR
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {schools.map((school, idx) => (
                <span
                  key={idx}
                  className="bg-white px-4 py-2 rounded-full text-sm shadow-sm border hover:border-blue-500 transition-colors"
                >
                  {school}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {[
                { value: '200+', label: 'IB/IGCSE Students' },
                { value: '95%', label: 'Score 6+ in IB' },
                { value: '1:1', label: 'Personal Attention' },
                { value: '4.9', label: 'Google Rating', icon: Star },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 flex items-center justify-center gap-1">
                    {stat.value}
                    {stat.icon && <stat.icon className="w-6 h-6 fill-yellow-400" />}
                  </div>
                  <div className="text-gray-300 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md p-6 animate-fadeInUp"
                >
                  <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Get Expert IB/IGCSE Biology Tutoring
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Book a free consultation to discuss your child's specific needs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                <MessageSquare className="w-6 h-6" />
                Book Free Consultation
              </button>
              <Link
                href="/locations/vasant-vihar"
                className="flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all shadow-lg"
              >
                Near Vasant Vihar
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <MobilePhoneStickyBar source="ib-igcse-course" />
    </>
  )
}
