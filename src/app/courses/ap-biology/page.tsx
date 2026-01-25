'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin,
  Phone,
  MessageSquare,
  Star,
  Users,
  Trophy,
  CheckCircle2,
  ArrowRight,
  Award,
  BookOpen,
  Target,
  Microscope,
  FileText,
  GraduationCap,
} from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import {
  trackWhatsAppConversion,
  trackPhoneCallConversion,
} from '@/lib/analytics/googleAdsConversions'
import { MobilePhoneStickyBar } from '@/components/common/MobilePhoneStickyBar'

export default function APBiologyPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'course-page',
      variantId: 'ap-biology',
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
    trackWhatsAppConversion('ap-biology')
    await trackAndOpenWhatsApp({
      source: 'ap-biology-page',
      message:
        'Hi! I am interested in AP Biology coaching. Please share details about your program.',
      campaign: 'course-ap-biology',
    })
  }

  const examUnits = [
    { unit: 1, name: 'Chemistry of Life', weight: '8-11%' },
    { unit: 2, name: 'Cell Structure & Function', weight: '10-13%' },
    { unit: 3, name: 'Cellular Energetics', weight: '12-16%' },
    { unit: 4, name: 'Cell Communication & Cycle', weight: '10-15%' },
    { unit: 5, name: 'Heredity', weight: '8-11%' },
    { unit: 6, name: 'Gene Expression & Regulation', weight: '12-16%' },
    { unit: 7, name: 'Natural Selection', weight: '13-20%' },
    { unit: 8, name: 'Ecology', weight: '10-15%' },
  ]

  const schools = [
    'American Embassy School (AES)',
    'Pathways World School',
    'American International School',
    'Step by Step School',
    'Oakridge International',
    'Genesis Global School',
  ]

  const faqs = [
    {
      q: 'When is the AP Biology exam?',
      a: 'AP Biology exam is held in the first two weeks of May each year. The 2026 exam will be during May 4-15, 2026. We recommend starting preparation at least 6 months before.',
    },
    {
      q: 'What score is needed for college credit?',
      a: 'Most US universities grant credit for scores of 4 or 5. Some competitive universities require a 5. Our students consistently achieve 4+ scores with 70% scoring 5.',
    },
    {
      q: 'Do you cover the lab component?',
      a: 'Yes! We cover all 13 AP Biology lab investigations with hands-on practice. Lab questions appear in both MCQ and FRQ sections, contributing significantly to your score.',
    },
    {
      q: 'Can I self-study for AP Biology?',
      a: 'While self-study is possible, the breadth and depth of AP Biology makes expert guidance valuable. Our coaching covers FRQ strategies, lab skills, and exam techniques that self-study misses.',
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Award className="w-4 h-4" />
                College Board Certified Prep
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="text-yellow-400">AP Biology</span> Coaching Delhi
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Expert preparation for College Board AP Biology exam. Score 5 strategies, lab
                skills, FRQ mastery. Perfect for American curriculum students.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp Us
                </button>
                <button
                  onClick={handleCallNow}
                  className="flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold transition-all hover:bg-gray-100"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto">
                {[
                  { value: '70%', label: 'Score 5' },
                  { value: '95%', label: 'Score 4+' },
                  { value: '13', label: 'Lab Practicals' },
                  { value: '100+', label: 'Students Coached' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Exam Structure */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              AP Biology Exam <span className="text-blue-600">Structure</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Section I: Multiple Choice</h3>
                    <p className="text-gray-600 text-sm">60 questions • 90 minutes • 50%</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Discrete questions and question sets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Data analysis and graph interpretation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Lab-based scenarios</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Section II: Free Response</h3>
                    <p className="text-gray-600 text-sm">6 questions • 90 minutes • 50%</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>2 long-form questions (8-10 points each)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>4 short-form questions (4 points each)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Experimental design & data analysis</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Units Covered */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              8 Units <span className="text-blue-600">Complete Coverage</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {examUnits.map((unit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-xl p-4 shadow-md"
                >
                  <div className="text-xs font-semibold text-blue-600 mb-1">Unit {unit.unit}</div>
                  <div className="font-bold text-gray-900 text-sm mb-1">{unit.name}</div>
                  <div className="text-xs text-gray-500">Exam weight: {unit.weight}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why Choose <span className="text-blue-600">Cerebrum</span> for AP Biology?
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Microscope,
                  title: 'Lab Mastery',
                  desc: 'All 13 AP labs covered with hands-on practice',
                },
                {
                  icon: Target,
                  title: 'Score 5 Focus',
                  desc: '70% of our students achieve perfect score',
                },
                {
                  icon: GraduationCap,
                  title: 'Expert Faculty',
                  desc: 'AIIMS/NEET background, AP trained',
                },
                {
                  icon: BookOpen,
                  title: 'FRQ Strategies',
                  desc: 'Proven techniques for full-credit answers',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg text-center"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Schools We Serve */}
        <section className="py-12 md:py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Schools We <span className="text-blue-600">Serve</span>
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Students from these American curriculum schools trust us
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {schools.map((school, i) => (
                <span key={i} className="bg-white px-4 py-2 rounded-full text-sm shadow-sm border">
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
                { value: '100+', label: 'AP Students' },
                { value: '70%', label: 'Score 5' },
                { value: '95%', label: 'Score 4+' },
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
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <h3 className="font-semibold text-lg mb-2">{f.q}</h3>
                  <p className="text-gray-600">{f.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Score 5 on AP Biology?</h2>
            <p className="text-lg mb-6 opacity-90">
              Book a free consultation with our AP Biology expert
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
                className="flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all"
              >
                <MessageSquare className="w-6 h-6" />
                Book Free Demo
              </button>
            </div>
          </div>
        </section>
      </div>

      <MobilePhoneStickyBar source="ap-biology" />
    </>
  )
}
