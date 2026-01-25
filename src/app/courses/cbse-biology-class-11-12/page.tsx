'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen,
  Phone,
  MessageSquare,
  Star,
  Users,
  Trophy,
  CheckCircle2,
  Target,
  GraduationCap,
  ArrowRight,
  FileText,
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

export default function CBSEBiologyPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'course-page',
      variantId: 'cbse-biology-11-12',
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
    trackWhatsAppConversion('cbse-11-12-course')
    await trackAndOpenWhatsApp({
      source: 'cbse-biology-course-page',
      message: 'Hi! I am interested in CBSE Biology Class 11/12 coaching. Please share details.',
      campaign: 'course-cbse-biology',
    })
  }

  const class11Syllabus = [
    'Diversity in Living World',
    'Structural Organisation in Plants & Animals',
    'Cell Structure and Function',
    'Plant Physiology',
    'Human Physiology',
  ]

  const class12Syllabus = [
    'Reproduction',
    'Genetics and Evolution',
    'Biology and Human Welfare',
    'Biotechnology',
    'Ecology',
  ]

  const features = [
    {
      icon: BookOpen,
      title: 'NCERT Focus',
      desc: '100% NCERT coverage with detailed explanations',
    },
    { icon: Target, title: 'Board + NEET', desc: 'Integrated preparation for both exams' },
    { icon: FileText, title: 'Practice Tests', desc: 'Weekly tests with board pattern questions' },
    { icon: Users, title: 'Small Batches', desc: 'Maximum 15-20 students for attention' },
  ]

  const faqs = [
    {
      q: 'Do you prepare for both Board exams and NEET together?',
      a: 'Yes! Our CBSE Biology coaching is designed for integrated Board + NEET preparation. The syllabus overlaps significantly, and our teaching covers both examination patterns.',
    },
    {
      q: 'How much of NCERT do you cover?',
      a: 'We cover 100% of NCERT Biology for Class 11 and 12. Every line of NCERT is explained in detail as it forms the foundation for both Board exams and NEET.',
    },
    {
      q: 'What study material do you provide?',
      a: 'We provide comprehensive notes, chapter-wise worksheets, previous year board questions, NCERT solutions, and regular test papers designed by AIIMS faculty.',
    },
    {
      q: 'Are the batches available at South Extension?',
      a: 'Yes, CBSE Biology batches are available at our flagship South Extension center as well as Rohini center. Both weekday and weekend batches are available.',
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-900 via-teal-800 to-green-900 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <GraduationCap className="w-4 h-4" />
                Board + NEET Integrated
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                CBSE Biology <span className="text-yellow-400">Class 11 & 12</span> Coaching
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Complete NCERT coverage with Board exam preparation and NEET alignment. Expert AIIMS
                faculty, comprehensive study material.
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
                  className="flex items-center gap-2 bg-white text-green-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 md:py-16 -mt-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {features.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg text-center"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-xs">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Syllabus */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-green-50 to-teal-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              CBSE Biology Syllabus Coverage
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-green-600 text-white py-3 px-6">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Microscope className="w-5 h-5" />
                    Class 11 NCERT Biology
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {class11Syllabus.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-teal-600 text-white py-3 px-6">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Microscope className="w-5 h-5" />
                    Class 12 NCERT Biology
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {class12Syllabus.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {[
                { value: '98%', label: 'Board Pass Rate' },
                { value: '85%', label: 'Score 90+ in Bio' },
                { value: '100%', label: 'NCERT Coverage' },
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
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Excel in CBSE Biology with Expert Guidance!
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Join our CBSE Biology batches and score 90+ in boards
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                <MessageSquare className="w-6 h-6" />
                Book Free Demo
              </button>
              <Link
                href="/locations/south-extension"
                className="flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all shadow-lg"
              >
                Visit Center
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <MobilePhoneStickyBar source="cbse-biology-course" />
    </>
  )
}
