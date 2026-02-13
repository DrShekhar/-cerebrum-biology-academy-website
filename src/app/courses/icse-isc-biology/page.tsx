'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  Phone,
  MessageSquare,
  Star,
  CheckCircle2,
  GraduationCap,
  ArrowRight,
  Microscope,
} from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import {
  trackWhatsAppConversion,
  trackPhoneCallConversion,
} from '@/lib/analytics/googleAdsConversions'
import { MobilePhoneStickyBar } from '@/components/common/MobilePhoneStickyBar'

export default function ICSEISCBiologyPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'course-page',
      variantId: 'icse-isc-biology',
      pageType: 'course',
    })
  }, [])

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()
    trackPhoneCallConversion(CONTACT_INFO.phone.primary)
    window.open(`tel:${CONTACT_INFO.phone.primary}`, '_self')
  }

  const handleWhatsApp = async () => {
    ConversionTracker.trackWhatsAppClick()
    trackWhatsAppConversion('icse-isc-course')
    await trackAndOpenWhatsApp({
      source: 'icse-isc-biology-course-page',
      message: 'Hi! I am interested in ICSE/ISC Biology coaching. Please share details.',
      campaign: 'course-icse-isc-biology',
    })
  }

  const programs = [
    {
      title: 'ICSE Biology',
      subtitle: 'Class 9 & 10',
      features: [
        'Complete Selina Concise coverage',
        'Practical diagram training',
        'Board paper pattern practice',
        'Scoring techniques',
      ],
      color: 'from-orange-600 to-orange-700',
    },
    {
      title: 'ISC Biology',
      subtitle: 'Class 11 & 12',
      features: [
        'Full ISC syllabus coverage',
        'NEET integration possible',
        'Project & practical guidance',
        'Previous year analysis',
      ],
      color: 'from-red-600 to-red-700',
    },
  ]

  const icseSyllabus = [
    'Basic Biology & Cell',
    'Plant Physiology',
    'Human Anatomy & Physiology',
    'Reproduction',
    'Population & Environment',
    'Pollution',
  ]

  const iscSyllabus = [
    'Diversity of Life',
    'Cell Biology & Genetics',
    'Plant & Animal Physiology',
    'Reproduction & Development',
    'Ecology & Environment',
    'Applications of Biology',
  ]

  const faqs = [
    {
      q: 'Do you use Selina Concise Biology textbook?',
      a: 'Yes! We follow Selina Concise Biology as the primary textbook for ICSE classes. Our notes and practice sheets align with Selina for seamless preparation.',
    },
    {
      q: 'Can ISC students also prepare for NEET?',
      a: 'Absolutely! ISC Biology syllabus has significant overlap with NEET. We offer integrated ISC + NEET preparation for students who want to pursue medical entrance along with boards.',
    },
    {
      q: 'How do you prepare for ICSE Biology practicals?',
      a: 'We provide comprehensive practical training including specimen identification, diagram drawing, experiments, and project guidance. Regular practical sessions ensure confidence.',
    },
    {
      q: 'Which ICSE/ISC schools do your students come from?',
      a: 'We have students from top ICSE/ISC schools including La Martiniere, Modern School, Springdales, Bal Bharati, DPS, and many others across Delhi NCR.',
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-900 via-red-800 to-orange-900 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div
              className="max-w-4xl mx-auto text-center animate-fadeInUp"
            >
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <GraduationCap className="w-4 h-4" />
                CISCE Board Specialist
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                ICSE & ISC <span className="text-yellow-400">Biology</span> Coaching
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Expert coaching for ICSE (Class 9-10) and ISC (Class 11-12) Biology. Complete Selina
                coverage, practical training, board exam mastery.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  Book Free Demo
                </button>
                <button
                  onClick={handleCallNow}
                  className="flex items-center gap-2 bg-white text-orange-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="py-12 md:py-16 -mt-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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

        {/* Syllabus */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Syllabus Coverage</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div
                className="bg-white rounded-xl shadow-lg overflow-hidden animate-fadeInUp"
              >
                <div className="bg-orange-600 text-white py-3 px-6">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Microscope className="w-5 h-5" />
                    ICSE Biology (9-10)
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {icseSyllabus.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className="bg-white rounded-xl shadow-lg overflow-hidden animate-fadeInUp"
              >
                <div className="bg-red-600 text-white py-3 px-6">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Microscope className="w-5 h-5" />
                    ISC Biology (11-12)
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {iscSyllabus.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {[
                { value: '300+', label: 'ICSE/ISC Students' },
                { value: '92%', label: 'Score 90+ in Bio' },
                { value: '100%', label: 'Selina Coverage' },
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
        <section className="py-12 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Excel in ICSE/ISC Biology!</h2>
            <p className="text-lg mb-6 opacity-90">Join the best ICSE Biology coaching in Delhi</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                <MessageSquare className="w-6 h-6" />
                Book Free Demo
              </button>
              <Link
                href="/locations/greater-kailash"
                className="flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all shadow-lg"
              >
                Near GK
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <MobilePhoneStickyBar source="icse-isc-course" />
    </>
  )
}
