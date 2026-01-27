import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, CheckCircle, ArrowRight, BookOpen, Target, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Is Coaching Necessary for NEET? Gurugram Expert Answer | 2025',
  description:
    'Is coaching necessary for NEET? Expert analysis from Gurugram NEET toppers. When coaching helps vs self-study works. Honest advice from AIIMS faculty. Call 88264-44334!',
  keywords: [
    'is coaching necessary for neet',
    'neet coaching vs self study',
    'do i need coaching for neet',
    'neet without coaching gurugram',
    'is neet coaching worth it',
    'neet preparation coaching or self study',
  ],
  openGraph: {
    title: 'Is Coaching Necessary for NEET? Expert Answer',
    description: 'Honest analysis: when coaching helps and when self-study works.',
    url: 'https://cerebrumbiologyacademy.com/is-coaching-necessary-for-neet-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/is-coaching-necessary-for-neet-gurugram',
  },
}

const whenCoachingHelps = [
  'First-time NEET attempt with no prior preparation strategy',
  'Weak in one or more subjects (Physics/Chemistry/Biology)',
  'Need structured schedule and accountability',
  'Struggle with time management during exam',
  'Parents working and unable to monitor daily progress',
  'Aim for top medical colleges (AIIMS, JIPMER)',
]

const whenSelfStudyWorks = [
  'Strong self-discipline and time management',
  'Already scored 550+ in previous attempt',
  'Access to quality study materials and test series',
  'Can afford full-time dedicated preparation',
  'Have mentor or senior for guidance',
]

const faqs = [
  {
    question: 'Can I crack NEET without coaching?',
    answer: 'Yes, but statistics show only 15-20% of toppers are purely self-study. Most successful self-study students have exceptional discipline, prior strong foundation, and access to quality resources.',
  },
  {
    question: 'Is expensive coaching necessary?',
    answer: 'No. Expensive doesn\'t mean better. Small batch coaching (like ours with 20 students) often outperforms large institutes. Focus on faculty quality and personal attention, not brand name.',
  },
  {
    question: 'What if I can\'t afford coaching?',
    answer: 'Apply for scholarships! We offer 25-100% fee waiver based on merit and need. Many coaching centers have scholarship programs for deserving students.',
  },
  {
    question: 'Is online coaching as effective?',
    answer: 'For motivated students, hybrid (online + offline) works well. Pure online requires exceptional self-discipline. We recommend at least weekend offline classes for doubt clearing.',
  },
]

export default function IsCoachingNecessaryForNEET() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="bg-gradient-to-r from-slate-800 to-slate-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" />
              Expert Analysis
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Is Coaching Necessary for NEET?</h1>
            <p className="text-xl text-slate-200 mb-8">Honest answer from AIIMS faculty with 15+ years experience</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-blue-900 mb-3">Quick Answer</h2>
              <p className="text-lg text-blue-800">
                <strong>Not always necessary, but highly recommended.</strong> Statistics show 80-85% of NEET toppers have some form of coaching. However, the right question is not "Is coaching necessary?" but "What kind of support do I need?" Self-study can work if you have exceptional discipline, strong foundation, and quality resources.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">The Honest Truth About NEET Coaching</h2>
              <p className="text-gray-700 mb-6">
                As an AIIMS faculty member who has guided 500+ NEET aspirants, I've seen both successful self-study students and those who needed coaching. The answer depends entirely on YOUR situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-green-800">Coaching Helps When...</h3>
              </div>
              <ul className="space-y-3">
                {whenCoachingHelps.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-bold text-blue-800">Self-Study Works When...</h3>
              </div>
              <ul className="space-y-3">
                {whenSelfStudyWorks.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">NEET 2024 Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-slate-800">24L+</p>
                <p className="text-sm text-gray-600">Total Aspirants</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-green-600">80-85%</p>
                <p className="text-sm text-gray-600">Toppers with Coaching</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-blue-600">15-20%</p>
                <p className="text-sm text-gray-600">Self-Study Toppers</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-orange-600">720</p>
                <p className="text-sm text-gray-600">Max Score</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-amber-900 mb-2">Warning: Avoid These Mistakes</h2>
                <ul className="space-y-2 text-amber-800">
                  <li>• Joining coaching just because everyone else is</li>
                  <li>• Choosing expensive coaching assuming it's better</li>
                  <li>• Ignoring self-study time even with coaching</li>
                  <li>• Joining multiple coaching centers simultaneously</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-slate-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Confused? Get Free Counseling</h2>
          <p className="text-xl text-slate-200 mb-8">Book a free session. We'll honestly tell you if you need coaching or not.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
              <Phone className="w-5 h-5" />Call 88264-44334
            </a>
            <Link href="/free-neet-demo-class-gurugram" className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition">
              Book Free Demo<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Is Coaching Necessary for NEET?',
        description: 'Expert analysis on whether coaching is necessary for NEET preparation',
        author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
        publisher: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
        datePublished: '2025-01-01',
        dateModified: '2025-01-26',
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
      }) }} />
    </div>
  )
}
