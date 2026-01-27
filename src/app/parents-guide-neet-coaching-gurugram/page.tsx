import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, ArrowRight, CheckCircle, Heart, Shield, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Parents Guide to NEET Coaching in Gurugram 2025 | What to Know',
  description:
    'Complete parents guide to NEET coaching in Gurugram. How to choose institute, red flags, fees, mental health tips, and how to support your child. Call 88264-44334!',
  keywords: [
    'parents guide neet coaching',
    'neet coaching for parents',
    'how to choose neet coaching',
    'neet coaching advice for parents',
    'supporting neet aspirant child',
    'neet coaching tips parents gurugram',
  ],
  openGraph: {
    title: 'Parents Guide to NEET Coaching | Gurugram',
    description: 'Everything parents need to know about NEET coaching.',
    url: 'https://cerebrumbiologyacademy.com/parents-guide-neet-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/parents-guide-neet-coaching-gurugram',
  },
}

const checklistBeforeJoining = [
  'Visit the center physically, don\'t just rely on ads',
  'Meet the actual faculty who will teach (not just counselors)',
  'Ask for batch size - smaller is better (20-30 ideal)',
  'Check fee structure including all hidden costs',
  'Talk to current students and their parents',
  'Verify success rate claims with actual data',
  'Check infrastructure: AC, seating, study material',
  'Ask about makeup classes for missed sessions',
]

const redFlags = [
  'Guaranteeing specific ranks or results',
  'Pressuring for immediate enrollment with "limited seats"',
  'Unwilling to show demo class before enrollment',
  'Hidden fees revealed after joining',
  'Batch size over 50 students',
  'No clear refund policy',
  'Faculty not available for parent meetings',
]

const supportTips = [
  { title: 'Don\'t Compare', description: 'Every child\'s journey is different. Comparing with relatives\' kids adds pressure.' },
  { title: 'Maintain Communication', description: 'Have daily non-academic conversations. Ask about their day, not just studies.' },
  { title: 'Healthy Environment', description: 'Ensure proper sleep (7-8 hours), nutrition, and short breaks during study.' },
  { title: 'Manage Your Anxiety', description: 'Your stress transfers to your child. Stay calm and positive.' },
  { title: 'Plan B Conversation', description: 'Discuss alternatives calmly. Reduces "do or die" pressure on NEET.' },
  { title: 'Trust the Process', description: 'Consistent effort over 2 years matters more than daily monitoring.' },
]

const faqs = [
  {
    question: 'How much should I spend on NEET coaching?',
    answer: 'Quality coaching ranges from ₹50K-₹1.5L per year. Expensive doesn\'t mean better. A ₹85K small batch with good faculty often outperforms ₹3L large coaching. Focus on batch size and faculty quality, not brand name.',
  },
  {
    question: 'Should I send my child to Kota?',
    answer: 'Not necessary. Good local coaching (like ours in Gurugram) gives same quality with family support. Kota suits self-motivated students who thrive independently. Consider emotional and mental health costs of sending child away.',
  },
  {
    question: 'How do I know if my child is progressing?',
    answer: 'Regular mock test scores (should improve over time), reduced doubt questions in basic concepts, ability to explain topics to you in simple terms. Don\'t just track hours studied - track understanding.',
  },
  {
    question: 'What if my child wants to drop after 12th?',
    answer: 'Dropping is okay if 1) First attempt score was 550+, 2) Child is motivated (not just parent\'s decision), 3) Clear strategy for improvement exists. One drop year is reasonable; multiple drops need reassessment.',
  },
  {
    question: 'How can I help without being overbearing?',
    answer: 'Create distraction-free environment, ensure healthy meals and sleep, handle their stress (not add to it), attend parent-teacher meetings, and most importantly - express love and support unconditionally.',
  },
]

export default function ParentsGuideNEETCoaching() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <section className="bg-gradient-to-r from-rose-700 to-rose-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-rose-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Heart className="w-4 h-4" />
              For Parents
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Parents Guide to NEET Coaching</h1>
            <p className="text-xl text-rose-100 mb-8">Everything you need to know to support your child's NEET journey</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-l-4 border-rose-600 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-rose-900 mb-3">Dear Parent</h2>
              <p className="text-lg text-rose-800">
                Your child's NEET journey is stressful for the entire family. This guide helps you make informed decisions about coaching, understand what to expect, and most importantly - how to support your child without adding pressure. Remember: <strong>your emotional support matters more than the coaching you choose</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Checklist Before Joining Any Coaching</h2>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <ul className="space-y-4">
              {checklistBeforeJoining.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 bg-red-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-red-800">Red Flags to Watch For</h2>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border-2 border-red-200">
            <ul className="space-y-4">
              {redFlags.map((flag, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-red-800">{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">How to Support Your Child</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportTips.map((tip, index) => (
              <div key={index} className="bg-rose-50 p-6 rounded-xl">
                <h3 className="font-bold text-rose-800 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Understanding the NEET Timeline</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-24 flex-shrink-0">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Class 11</span>
                  </div>
                  <div>
                    <p className="font-semibold">Foundation Year</p>
                    <p className="text-sm text-gray-600">Build concepts, develop study habits. Don't expect perfect scores yet. Focus on understanding, not memorizing.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 flex-shrink-0">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">Class 12</span>
                  </div>
                  <div>
                    <p className="font-semibold">Intensive Year</p>
                    <p className="text-sm text-gray-600">Balance boards and NEET. Scores should start improving in mock tests. This is when pressure peaks - your support is crucial.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 flex-shrink-0">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Final 3 Months</span>
                  </div>
                  <div>
                    <p className="font-semibold">Revision & Mocks</p>
                    <p className="text-sm text-gray-600">No new topics. Focus on revision and mock tests. Manage exam anxiety. Ensure proper sleep and nutrition.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-rose-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-rose-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-rose-900 mb-2">Mental Health Matters</h2>
                <p className="text-rose-800 mb-4">
                  NEET preparation stress is real. Watch for these signs and seek help if needed:
                </p>
                <ul className="space-y-2 text-rose-800">
                  <li>• Persistent anxiety or panic attacks</li>
                  <li>• Sleep issues (too much or too little)</li>
                  <li>• Loss of interest in previously enjoyed activities</li>
                  <li>• Extreme mood swings or irritability</li>
                  <li>• Talk of being a burden or giving up</li>
                </ul>
                <p className="mt-4 font-semibold">If you notice these, consider professional counseling. Your child's mental health is more important than any exam.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-100">
                  {faq.question}
                  <span className="text-rose-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-rose-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Have Questions? We're Here to Help</h2>
          <p className="text-xl text-rose-100 mb-8">Schedule a free parent counseling session. No pressure, just guidance.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-rose-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
              <Phone className="w-5 h-5" />Call 88264-44334
            </a>
            <Link href="/free-neet-demo-class-gurugram" className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition">
              Book Demo with Child<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Parents Guide to NEET Coaching',
        description: 'Complete guide for parents on NEET coaching selection and child support',
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
