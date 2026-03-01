'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Phone,
  MessageSquare,
  Star,
  Users,
  Trophy,
  CheckCircle2,
  Clock,
  Target,
  Brain,
  Microscope,
  GraduationCap,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { trackPhoneCallConversion } from '@/lib/analytics/googleAdsConversions'
import { MobilePhoneStickyBar } from '@/components/common/MobilePhoneStickyBar'

export default function Class910BiologyFoundationPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'course-page',
      variantId: 'class-9-10-foundation',
      pageType: 'course',
    })
  }, [])

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()
    trackPhoneCallConversion(CONTACT_INFO.phone.primary)
  }

  const handleWhatsApp = async () => {
    await trackAndOpenWhatsApp({
      source: 'class-9-10-biology-course-page',
      message: 'Hi! I am interested in Class 9-10 Biology Foundation course. Please share details.',
      campaign: 'course-class-9-10-foundation',
    })
  }

  const courseHighlights = [
    { icon: BookOpen, title: 'CBSE & ICSE', desc: 'Both board syllabi covered' },
    { icon: Target, title: 'NEET Foundation', desc: 'Build basics for medical entrance' },
    { icon: Users, title: 'Small Batches', desc: 'Max 15 students per batch' },
    { icon: Trophy, title: '65% Better Results', desc: 'Early starters score higher' },
  ]

  const curriculum = [
    {
      class: 'Class 9',
      topics: [
        'Cell Structure & Function',
        'Tissues',
        'Diversity in Living Organisms',
        'Why Do We Fall Ill',
        'Natural Resources',
        'Improvement in Food Resources',
      ],
    },
    {
      class: 'Class 10',
      topics: [
        'Life Processes',
        'Control & Coordination',
        'How Do Organisms Reproduce',
        'Heredity & Evolution',
        'Our Environment',
        'Sustainable Management',
      ],
    },
  ]

  const faqs = [
    {
      q: 'Is this course suitable for both CBSE and ICSE students?',
      a: 'Yes! Our Class 9-10 Biology foundation covers both CBSE and ICSE syllabi. We ensure all board-specific topics are thoroughly covered while building NEET-ready concepts.',
    },
    {
      q: 'How does early preparation help for NEET?',
      a: 'Students who start Biology foundation from Class 9 have 65% higher NEET success rates. Strong basics in Class 9-10 make Class 11-12 NEET Biology much easier to master.',
    },
    {
      q: 'What is the batch size and timing?',
      a: 'We maintain small batches of maximum 15 students for personalized attention. Batches are available on weekdays and weekends at our South Extension and Rohini centers.',
    },
    {
      q: 'Do you provide study material?',
      a: 'Yes, comprehensive study material including notes, worksheets, MCQs, and previous year questions are provided. All materials are designed by AIIMS faculty.',
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div
              className="max-w-4xl mx-auto text-center animate-fadeInUp"
            >
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <GraduationCap className="w-4 h-4" />
                Foundation Course
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Class 9-10 <span className="text-yellow-400">Biology Foundation</span> Course
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Build strong Biology fundamentals for CBSE/ICSE boards and future NEET success.
                Start early, learn smart!
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
                  className="flex items-center gap-2 bg-white text-indigo-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Course Highlights */}
        <section className="py-12 md:py-16 -mt-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {courseHighlights.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-lg text-center animate-fadeInUp"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Start Early */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why Start Biology Foundation from <span className="text-indigo-600">Class 9?</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Clock,
                  title: '4-Year Advantage',
                  desc: 'More time to build concepts means less stress during Class 11-12 NEET preparation.',
                },
                {
                  icon: Brain,
                  title: 'Strong Fundamentals',
                  desc: 'Class 9-10 Biology concepts form the base for 60% of NEET Biology syllabus.',
                },
                {
                  icon: Sparkles,
                  title: 'Develop Scientific Thinking',
                  desc: 'Early exposure to biological concepts develops analytical and reasoning skills.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-lg animate-fadeInUp"
                >
                  <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Course Curriculum</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {curriculum.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg overflow-hidden animate-fadeInUp"
                >
                  <div className="bg-indigo-600 text-white py-3 px-6">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Microscope className="w-5 h-5" />
                      {item.class} Biology
                    </h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {item.topics.map((topic, tidx) => (
                        <li key={tidx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {[
                { value: '850+', label: 'Class 9-10 Students' },
                { value: '65%', label: 'Better NEET Scores' },
                { value: '15', label: 'Max Batch Size' },
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
        <section className="py-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Start Your Child's Medical Journey Early!
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Book a free demo class and see the difference expert teaching makes
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
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

      <MobilePhoneStickyBar source="class-9-10-foundation-course" />
    </>
  )
}
