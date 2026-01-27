import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, ArrowRight, Calendar, Clock, Target, CheckCircle, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'When to Start NEET Preparation? Best Time Guide 2025 | Gurugram',
  description:
    'When should you start NEET preparation? Expert guide on ideal timing - Class 9, 10, 11, or 12. Month-wise strategy and what to do if starting late. Call 88264-44334!',
  keywords: [
    'when to start neet preparation',
    'best time to start neet preparation',
    'neet preparation from class 11',
    'neet preparation from class 10',
    'when to start neet coaching gurugram',
    'neet preparation timeline',
  ],
  openGraph: {
    title: 'When to Start NEET Preparation? Expert Timing Guide',
    description: 'Ideal timing for NEET prep - Class 9, 10, 11, or 12. Complete strategy.',
    url: 'https://cerebrumbiologyacademy.com/when-to-start-neet-preparation-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/when-to-start-neet-preparation-gurugram',
  },
}

const startingPoints = [
  {
    class: 'Class 9-10',
    status: 'Early Start',
    color: 'green',
    advantages: ['Strong foundation building', 'No pressure, gradual learning', 'Time for Olympiads and extra activities'],
    approach: 'Focus on NCERT, build concepts. No need for heavy coaching yet.',
  },
  {
    class: 'Class 11',
    status: 'Ideal Time',
    color: 'blue',
    advantages: ['Perfect balance of time and focus', '2 full years for preparation', 'Can cover syllabus twice'],
    approach: 'Join coaching, start NCERT thoroughly, build strong habits.',
  },
  {
    class: 'Class 12',
    status: 'Challenging',
    color: 'orange',
    advantages: ['Focused 1-year preparation', 'High motivation', 'Clear goal visibility'],
    approach: 'Intensive coaching, prioritize high-weightage topics, daily 8+ hours.',
  },
  {
    class: 'After 12th (Dropper)',
    status: 'Focused',
    color: 'red',
    advantages: ['100% focus on NEET', 'No board exam distraction', 'Previous attempt experience'],
    approach: 'Identify weak areas, crash course or intensive batch, mock tests focus.',
  },
]

const monthlyTimeline = [
  { month: 'April-June (Class 11)', focus: 'Foundation: Basic Biology, Physics mechanics, Chemistry basics' },
  { month: 'July-October', focus: 'Core syllabus: NCERT reading + note making' },
  { month: 'November-February', focus: 'Class 11 completion + revision' },
  { month: 'March-June (Class 12)', focus: 'Class 12 syllabus + Class 11 revision' },
  { month: 'July-October', focus: 'Full syllabus completion + mock tests start' },
  { month: 'November-January', focus: 'Intensive revision + daily mock tests' },
  { month: 'February-May', focus: 'Final revision + past papers + exam simulation' },
]

const faqs = [
  {
    question: 'Is it too late to start NEET in Class 12?',
    answer: 'Not too late, but challenging. You have 1 year - join an intensive batch, study 8-10 hours daily, and focus on high-weightage chapters. Many students crack NEET starting from Class 12.',
  },
  {
    question: 'Should I start NEET preparation from Class 9?',
    answer: 'Not intensive preparation, but foundation building. Focus on understanding concepts, reading NCERT, and developing interest in Biology. Formal coaching can wait until Class 11.',
  },
  {
    question: 'Can I crack NEET in 6 months?',
    answer: 'Possible if you have strong Class 11-12 base. Join a crash course, study 10-12 hours daily, focus on Biology (50% marks), and attempt 50+ mock tests. Success rate is lower but achievable.',
  },
  {
    question: 'What if I\'m already in Class 12 and haven\'t started?',
    answer: 'Start immediately! Join a 1-year program or crash course. Focus on NCERT first, prioritize Biology, then tackle Physics numericals and Chemistry formulas. Still 10-12 months left.',
  },
  {
    question: 'Is dropping a year for NEET worth it?',
    answer: 'If you scored 550+ in first attempt, dropping can help reach 650+. If below 500, analyze why - was it preparation or aptitude? Dropping only works with changed strategy.',
  },
]

export default function WhenToStartNEETPreparation() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <section className="bg-gradient-to-r from-orange-600 to-amber-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-white text-orange-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Calendar className="w-4 h-4" />
              Timing Guide
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">When to Start NEET Preparation?</h1>
            <p className="text-xl text-orange-100 mb-8">Expert guide on ideal timing for maximum success</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-orange-900 mb-3">Quick Answer</h2>
              <p className="text-lg text-orange-800">
                <strong>Ideal: Start of Class 11.</strong> This gives you 2 full years for comprehensive preparation. However, students successfully crack NEET starting from Class 12 (1 year) or even as droppers. The key is not when you start, but how effectively you use the time you have.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Starting at Different Stages</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {startingPoints.map((point, index) => (
              <div key={index} className={`bg-white p-6 rounded-xl shadow-lg border-t-4 ${
                point.color === 'green' ? 'border-green-500' :
                point.color === 'blue' ? 'border-blue-500' :
                point.color === 'orange' ? 'border-orange-500' :
                'border-red-500'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{point.class}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    point.color === 'green' ? 'bg-green-100 text-green-700' :
                    point.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                    point.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>{point.status}</span>
                </div>
                <ul className="space-y-2 mb-4">
                  {point.advantages.map((adv, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm"><strong>Approach:</strong> {point.approach}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">2-Year Preparation Timeline</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {monthlyTimeline.map((item, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full ${index < 3 ? 'bg-blue-500' : index < 5 ? 'bg-orange-500' : 'bg-green-500'}`} />
                    {index < monthlyTimeline.length - 1 && <div className="w-0.5 h-full bg-gray-200" />}
                  </div>
                  <div className="pb-4">
                    <p className="font-bold text-gray-800">{item.month}</p>
                    <p className="text-gray-600 text-sm">{item.focus}</p>
                  </div>
                </div>
              ))}
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
                <h2 className="text-xl font-bold text-amber-900 mb-2">Starting Late? Don't Panic</h2>
                <p className="text-amber-800 mb-4">If you're starting in Class 12 or later, here's what to prioritize:</p>
                <ul className="space-y-2 text-amber-800">
                  <li>• <strong>Biology first</strong> - 50% marks, most scoring</li>
                  <li>• <strong>High-weightage chapters</strong> - Focus on what matters most</li>
                  <li>• <strong>NCERT only initially</strong> - Master before moving to reference books</li>
                  <li>• <strong>Mock tests early</strong> - Start from day 1 with chapter-wise tests</li>
                  <li>• <strong>Join crash course</strong> - Structured approach saves time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Programs for Every Stage</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <Target className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">2-Year Program</h3>
                <p className="text-sm text-gray-600 mb-2">For Class 11 starters</p>
                <p className="text-2xl font-bold text-blue-600">₹1,20,000</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center border-2 border-orange-500">
                <Clock className="w-10 h-10 text-orange-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">1-Year Program</h3>
                <p className="text-sm text-gray-600 mb-2">For Class 12 starters</p>
                <p className="text-2xl font-bold text-orange-600">₹85,000</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <Calendar className="w-10 h-10 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Crash Course</h3>
                <p className="text-sm text-gray-600 mb-2">For late starters/droppers</p>
                <p className="text-2xl font-bold text-red-600">₹45,000</p>
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
                  <span className="text-orange-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your NEET Journey?</h2>
          <p className="text-xl text-orange-100 mb-8">Get personalized guidance on the right program for your stage.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition">
              <Phone className="w-5 h-5" />Call 88264-44334
            </a>
            <Link href="/free-neet-demo-class-gurugram" className="inline-flex items-center gap-2 bg-orange-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-900 transition">
              Book Free Demo<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'When to Start NEET Preparation?',
        description: 'Expert guide on ideal timing for NEET preparation',
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
