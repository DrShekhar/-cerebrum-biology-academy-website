'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  Phone,
  MessageSquare,
  Star,
  CheckCircle2,
  Award,
  BookOpen,
  Brain,
  Target,
  GraduationCap,
  IndianRupee,
} from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { trackPhoneCallConversion } from '@/lib/analytics/googleAdsConversions'
import { MobilePhoneStickyBar } from '@/components/common/MobilePhoneStickyBar'

export default function NTSEBiologyPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'course-page',
      variantId: 'ntse-biology',
      pageType: 'course',
    })
  }, [])

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()
    trackPhoneCallConversion(CONTACT_INFO.phone.primary)
  }

  const handleWhatsApp = async () => {
    await trackAndOpenWhatsApp({
      source: 'ntse-biology-page',
      message: 'Hi! I am interested in NTSE Biology coaching for Class 10. Please share details.',
      campaign: 'course-ntse-biology',
    })
  }

  const examStructure = [
    { section: 'MAT', name: 'Mental Ability Test', questions: 100, marks: 100, time: '120 min' },
    {
      section: 'SAT',
      name: 'Scholastic Aptitude Test',
      questions: 100,
      marks: 100,
      time: '120 min',
    },
  ]

  const satSubjects = [
    { subject: 'Science (PCB)', questions: '~40', focus: 'Biology heavy' },
    { subject: 'Mathematics', questions: '~20', focus: 'NCERT based' },
    { subject: 'Social Science', questions: '~40', focus: 'History, Civics, Geography' },
  ]

  const faqs = [
    {
      q: 'What is the NTSE scholarship amount?',
      a: "NTSE provides Rs 1.25 lakh per year scholarship that continues from Class 11 till PhD completion. It is one of India's most prestigious and longest-running scholarships.",
    },
    {
      q: 'How important is Biology in NTSE?',
      a: 'Biology is crucial in the SAT Science section. About 15-20 questions are from Biology covering topics like Life Processes, Control & Coordination, Heredity, and Environment. Strong Biology can significantly boost your SAT score.',
    },
    {
      q: 'When should I start NTSE preparation?',
      a: 'Ideally, start in Class 9 to build a strong foundation. However, focused preparation in Class 10 (6 months before exam) with our expert coaching is also effective.',
    },
    {
      q: 'What is the selection process?',
      a: 'NTSE has two stages: Stage 1 (State level) conducted by states, and Stage 2 (National level) by NCERT. You must clear both stages to get the scholarship.',
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-900 via-amber-800 to-orange-900 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div
              className="max-w-4xl mx-auto text-center animate-fadeInUp"
            >
              <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <IndianRupee className="w-4 h-4" />
                Rs 1.25 Lakh/Year Scholarship
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="text-yellow-400">NTSE</span> Biology Coaching Delhi
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Expert preparation for India's most prestigious scholarship exam. Class 10 focused,
                MAT + SAT strategies, 90% selection rate.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp Us
                </button>
                <a
                  href={`tel:${CONTACT_INFO.phone.primary}`}
                  onClick={handleCallNow}
                  className="flex items-center gap-2 bg-white text-orange-900 px-6 py-3 rounded-lg font-semibold transition-all hover:bg-gray-100"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto">
                {[
                  { value: '₹1.25L', label: 'Per Year' },
                  { value: '90%', label: 'Selection Rate' },
                  { value: 'Till PhD', label: 'Duration' },
                  { value: '100+', label: 'Scholars' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Exam Structure */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              NTSE Exam <span className="text-orange-600">Structure</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {examStructure.map((section, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-xl p-6 animate-fadeInUp"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      {idx === 0 ? (
                        <Brain className="w-6 h-6 text-orange-600" />
                      ) : (
                        <BookOpen className="w-6 h-6 text-orange-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        {section.section}: {section.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {section.questions} Questions • {section.marks} Marks • {section.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SAT Breakdown */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              SAT Section <span className="text-orange-600">Breakdown</span>
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Biology is crucial for Science section success
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {satSubjects.map((sub, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-lg text-center animate-fadeInUp"
                >
                  <h3 className="font-bold text-lg mb-2">{sub.subject}</h3>
                  <p className="text-3xl font-bold text-orange-600 mb-2">{sub.questions}</p>
                  <p className="text-gray-600 text-sm">{sub.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why Choose <span className="text-orange-600">Cerebrum</span> for NTSE?
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Target, title: '90% Selection', desc: 'Highest success rate in Delhi' },
                { icon: Brain, title: 'MAT + SAT', desc: 'Complete preparation' },
                { icon: GraduationCap, title: 'Expert Faculty', desc: 'AIIMS qualified teachers' },
                { icon: BookOpen, title: 'NCERT Focus', desc: 'Strong foundation approach' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-lg text-center animate-fadeInUp"
                >
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Biology Topics */}
        <section className="py-12 md:py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              NTSE Biology <span className="text-orange-600">Topics Covered</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                'Life Processes (Nutrition, Respiration, Transport, Excretion)',
                'Control & Coordination (Nervous System, Hormones)',
                'How Do Organisms Reproduce',
                'Heredity & Evolution',
                'Our Environment & Ecosystem',
                'Management of Natural Resources',
                'Cell Biology & Cell Division',
                'Tissues & Organ Systems',
              ].map((topic, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{topic}</span>
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
                { value: '100+', label: 'NTSE Scholars' },
                { value: '90%', label: 'Selection Rate' },
                { value: '15+', label: 'Years Experience' },
                { value: '4.9', label: 'Rating', icon: Star },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 flex items-center justify-center gap-1">
                    {s.value}
                    {s.icon && <s.icon className="w-6 h-6 fill-yellow-400" />}
                  </div>
                  <div className="text-gray-300 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Frequently Asked <span className="text-orange-600">Questions</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-md p-6 animate-fadeInUp"
                >
                  <h3 className="font-semibold text-lg mb-2">{f.q}</h3>
                  <p className="text-gray-600">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-gradient-to-r from-orange-600 to-amber-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Secure India's Most Prestigious Scholarship!
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Start your NTSE preparation with expert guidance
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/locations/south-extension"
                className="flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all"
              >
                <Award className="w-6 h-6" />
                Visit Center
              </Link>
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all"
              >
                <MessageSquare className="w-6 h-6" />
                Book Free Demo
              </button>
            </div>
          </div>
        </section>
      </div>

      <MobilePhoneStickyBar source="ntse-biology" />
    </>
  )
}
