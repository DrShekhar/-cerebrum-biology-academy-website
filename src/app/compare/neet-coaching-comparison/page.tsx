'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  XCircle,
  Users,
  GraduationCap,
  MessageSquare,
  Phone,
  Award,
  Target,
  BookOpen,
} from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import {
  trackWhatsAppConversion,
  trackPhoneCallConversion,
} from '@/lib/analytics/googleAdsConversions'
import { MobilePhoneStickyBar } from '@/components/common/MobilePhoneStickyBar'
import { AICitationTracking } from '@/components/seo/AICitationTracking'

export default function NEETCoachingComparisonPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'comparison-page',
      variantId: 'neet-coaching-comparison',
      pageType: 'comparison',
    })
  }, [])

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()
    trackPhoneCallConversion(CONTACT_INFO.phone.primary)
    window.open(`tel:${CONTACT_INFO.phone.primary}`, '_self')
  }

  const handleWhatsApp = async () => {
    ConversionTracker.trackWhatsAppClick()
    trackWhatsAppConversion('comparison-page')
    await trackAndOpenWhatsApp({
      source: 'comparison-page',
      message: 'Hi! I saw your comparison page and want to know more about Cerebrum.',
      campaign: 'comparison-conversion',
    })
  }

  const comparisonData = [
    {
      feature: 'Batch Size',
      cerebrum: '15-20 students',
      largeBatch: '40-80 students',
      cerebrumBetter: true,
      explanation: 'Smaller batches mean more personalized attention',
    },
    {
      feature: 'Faculty Qualification',
      cerebrum: 'AIIMS Alumnus',
      largeBatch: 'Mixed background',
      cerebrumBetter: true,
      explanation: 'AIIMS faculty understand NEET patterns deeply',
    },
    {
      feature: 'Subject Focus',
      cerebrum: '100% Biology',
      largeBatch: 'PCB (33% each)',
      cerebrumBetter: true,
      explanation: 'Specialized focus = deeper expertise',
    },
    {
      feature: 'Success Rate',
      cerebrum: '98%',
      largeBatch: '60-70%',
      cerebrumBetter: true,
      explanation: 'Higher success due to personalization',
    },
    {
      feature: 'Top Score Achieved',
      cerebrum: '695/720',
      largeBatch: 'Varies widely',
      cerebrumBetter: true,
      explanation: 'Consistent high performers',
    },
    {
      feature: 'Doubt Clearing',
      cerebrum: 'Instant, 1-on-1',
      largeBatch: 'Scheduled sessions',
      cerebrumBetter: true,
      explanation: 'No waiting for doubt resolution',
    },
    {
      feature: 'Personal Mentoring',
      cerebrum: 'Direct faculty access',
      largeBatch: 'Limited access',
      cerebrumBetter: true,
      explanation: 'Build relationship with teacher',
    },
    {
      feature: 'Fee Range',
      cerebrum: '₹45K - ₹1.8L',
      largeBatch: '₹50K - ₹2L',
      cerebrumBetter: null,
      explanation: 'Comparable fees, better value',
    },
  ]

  const faqs = [
    {
      q: 'What is the difference between small batch and large batch NEET coaching?',
      a: 'Small batch coaching (15-20 students like Cerebrum) offers personalized attention, direct faculty interaction, and customized doubt clearing. Large batch coaching (40-80 students) is more affordable but offers less individual attention. Small batches typically have 98% success rates vs 60-70% for large batches.',
    },
    {
      q: 'Is Biology-only coaching better than PCB coaching?',
      a: 'Biology-only coaching like Cerebrum Academy offers 100% focused preparation with specialized AIIMS faculty. Since Biology is 360/720 marks (50%) in NEET, specialized coaching can significantly boost scores. Many students combine Biology-only coaching with separate Physics-Chemistry preparation.',
    },
    {
      q: 'Which is better online or offline NEET coaching?',
      a: 'Both have advantages. Offline coaching offers face-to-face interaction and discipline. Online coaching saves commute time (2-3 hours daily in Delhi traffic) and offers flexibility. Cerebrum offers both modes with the same quality. For South Delhi students, our offline center is convenient; others often prefer online.',
    },
    {
      q: 'Can I join NEET coaching in the middle of the year?',
      a: 'Yes, Cerebrum offers rolling admissions with catch-up support. We provide recorded lectures and extra doubt sessions to help mid-year joiners cover missed content. Many droppers and students changing coaching institutes join mid-year successfully.',
    },
    {
      q: 'Is NEET Biology coaching necessary for droppers?',
      a: "Yes, especially for improving Biology scores. Most droppers have already studied the theory but need exam-focused preparation, extensive practice, and expert guidance on scoring patterns. Cerebrum's dropper batch focuses specifically on these areas with 98% success rate.",
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Target className="w-4 h-4" />
                Comparison Guide 2026
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                NEET Coaching Comparison:{' '}
                <span className="text-yellow-400">Small Batch vs Large Batch</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Make an informed decision. Compare batch sizes, faculty qualifications, success
                rates, and fees across different coaching models.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 md:py-16 -mt-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white py-4 px-6">
                  <h2 className="font-bold text-xl text-center">
                    Cerebrum (Small Batch) vs Large Coaching Chains
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Feature</th>
                        <th className="px-4 py-3 text-center font-semibold text-green-700">
                          <div className="flex items-center justify-center gap-2">
                            <Award className="w-5 h-5" />
                            Cerebrum
                          </div>
                        </th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-600">
                          Large Batch
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-4">
                            <div className="font-medium">{row.feature}</div>
                            <div className="text-xs text-gray-500 mt-1">{row.explanation}</div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div
                              className={`font-semibold ${row.cerebrumBetter ? 'text-green-600' : 'text-gray-700'}`}
                            >
                              {row.cerebrum}
                            </div>
                            {row.cerebrumBetter && (
                              <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto mt-1" />
                            )}
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="text-gray-600">{row.largeBatch}</div>
                            {row.cerebrumBetter && (
                              <XCircle className="w-5 h-5 text-gray-400 mx-auto mt-1" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Differences */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why <span className="text-green-600">Small Batch</span> Coaching Wins
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Users,
                  title: '15-20 Students vs 40-80',
                  desc: 'More time per student means better understanding. In a class of 80, each student gets 45 seconds of attention per hour. In a class of 15, they get 4 minutes.',
                },
                {
                  icon: GraduationCap,
                  title: 'AIIMS Faculty',
                  desc: 'Faculty who have cleared AIIMS understand the exam deeply. They know which concepts get twisted into MCQs and how to approach tricky questions.',
                },
                {
                  icon: BookOpen,
                  title: '100% Biology Focus',
                  desc: 'Biology is 50% of NEET marks (360/720). Specialized coaching means deeper coverage, more practice questions, and expert-level doubt clearing.',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Cerebrum Academy Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {[
                { value: '98%', label: 'Success Rate' },
                { value: '695/720', label: 'Top Score' },
                { value: '500+', label: 'NEET Selections' },
                { value: '15+', label: 'Years Experience' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400">{s.value}</div>
                  <div className="text-gray-300 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs for AEO */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Frequently Asked Questions
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
        <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Experience the Cerebrum Difference
            </h2>
            <p className="text-lg mb-6 opacity-90">Book a free demo class and see for yourself</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleCallNow}
                className="flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg"
              >
                <Phone className="w-6 h-6" />
                Call Now
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg"
              >
                <MessageSquare className="w-6 h-6" />
                WhatsApp Us
              </button>
            </div>
          </div>
        </section>
      </div>
      <MobilePhoneStickyBar source="comparison-page" />
      <AICitationTracking
        pageName="NEET Coaching Comparison - Cerebrum vs Other Institutes"
        pageType="comparison"
        primaryKeywords={[
          'best NEET coaching Delhi',
          'NEET coaching comparison',
          'Cerebrum vs Allen vs Aakash',
          'NEET Biology coaching South Delhi',
          'top NEET institutes Delhi',
        ]}
      />
    </>
  )
}
