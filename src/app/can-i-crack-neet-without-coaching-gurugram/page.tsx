import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, ArrowRight, CheckCircle, Target, BookOpen, Clock, AlertTriangle, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Can I Crack NEET Without Coaching? Self-Study Guide 2025',
  description:
    'Can you crack NEET without coaching? Honest analysis with self-study strategy, resources, and when you might need help. Success stories from Gurugram. Call 88264-44334!',
  keywords: [
    'can i crack neet without coaching',
    'neet without coaching possible',
    'neet self study strategy',
    'neet preparation without coaching',
    'crack neet without coaching gurugram',
    'neet self study tips',
  ],
  openGraph: {
    title: 'Can I Crack NEET Without Coaching? Expert Guide',
    description: 'Honest analysis with self-study strategy and when you might need help.',
    url: 'https://cerebrumbiologyacademy.com/can-i-crack-neet-without-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/can-i-crack-neet-without-coaching-gurugram',
  },
}

const selfStudyRequirements = [
  { requirement: 'Daily 8-10 hours dedicated study', difficulty: 'High' },
  { requirement: 'Strong foundation in NCERT (Class 11-12)', difficulty: 'Medium' },
  { requirement: 'Access to quality test series', difficulty: 'Low' },
  { requirement: 'Self-discipline for 12-18 months', difficulty: 'Very High' },
  { requirement: 'Mentor for guidance and doubt clearing', difficulty: 'Medium' },
  { requirement: 'Previous score 550+ (for droppers)', difficulty: 'High' },
]

const selfStudyResources = [
  { resource: 'NCERT Biology (Class 11 & 12)', purpose: 'Foundation - 90% syllabus coverage', mandatory: true },
  { resource: 'NCERT Physics & Chemistry', purpose: 'Foundation for Physics & Chemistry', mandatory: true },
  { resource: 'MTG/Trueman Biology', purpose: 'Advanced concepts and MCQs', mandatory: false },
  { resource: 'HC Verma / DC Pandey', purpose: 'Physics problem solving', mandatory: false },
  { resource: 'Allen/Aakash Test Series', purpose: 'Mock tests and analysis', mandatory: true },
  { resource: 'PYQs (Last 10 years)', purpose: 'Exam pattern understanding', mandatory: true },
]

const successStories = [
  { name: 'Ananya S.', score: '685/720', method: '100% Self-Study', note: 'NCERT + PYQs, 2nd attempt' },
  { name: 'Rohit M.', score: '650/720', method: 'Self-Study + Test Series', note: 'Used Allen test series only' },
  { name: 'Priya K.', score: '640/720', method: 'Online + Self-Study', note: 'PW videos + self practice' },
]

const faqs = [
  {
    question: 'What percentage of NEET toppers are self-study?',
    answer: 'Approximately 15-20% of top rankers (AIR under 1000) claim to be primarily self-study. However, many of them had tutors, online courses, or test series - pure self-study is rare among toppers.',
  },
  {
    question: 'How many hours should I study for NEET without coaching?',
    answer: 'Without coaching, you need 8-10 hours of focused self-study daily (vs 5-6 hours with coaching). This includes reading, practice, revision, and mock tests.',
  },
  {
    question: 'Can an average student crack NEET without coaching?',
    answer: 'It\'s challenging but possible. Average students benefit most from structured coaching. If choosing self-study, join at least a test series and get periodic doubt sessions.',
  },
  {
    question: 'What if I fail without coaching?',
    answer: 'Don\'t wait until you fail. If struggling after 3-4 months of self-study, consider joining coaching or at least hybrid support. Our weekend batch is designed for self-study students.',
  },
]

export default function CanICrackNEETWithoutCoaching() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <section className="bg-gradient-to-r from-purple-800 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-purple-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Target className="w-4 h-4" />
              Self-Study Guide
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Can I Crack NEET Without Coaching?</h1>
            <p className="text-xl text-purple-100 mb-8">Honest analysis with actionable self-study strategy</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-600 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-purple-900 mb-3">Quick Answer</h2>
              <p className="text-lg text-purple-800">
                <strong>Yes, but it's difficult.</strong> About 15-20% of NEET toppers are self-study students. Success requires exceptional self-discipline, 8-10 hours daily study, strong NCERT foundation, and access to quality test series. Most self-study successes are 2nd/3rd attempt students who already scored 550+.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Self-Study Requirements</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Requirement</th>
                    <th className="px-4 py-3 text-left">Difficulty Level</th>
                  </tr>
                </thead>
                <tbody>
                  {selfStudyRequirements.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3">{item.requirement}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          item.difficulty === 'Very High' ? 'bg-red-100 text-red-700' :
                          item.difficulty === 'High' ? 'bg-orange-100 text-orange-700' :
                          item.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {item.difficulty}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Essential Self-Study Resources</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            {selfStudyResources.map((item, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${item.mandatory ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold">{item.resource}</h3>
                    <p className="text-sm text-gray-600">{item.purpose}</p>
                  </div>
                  {item.mandatory && (
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">Must Have</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Self-Study Success Stories</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <p className="text-3xl font-bold text-purple-600 mb-2">{story.score}</p>
                <p className="font-semibold">{story.name}</p>
                <p className="text-sm text-gray-500 mb-2">{story.method}</p>
                <p className="text-xs text-gray-400">{story.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-amber-900 mb-2">When Self-Study Won't Work</h2>
                <ul className="space-y-2 text-amber-800">
                  <li>• First attempt with weak Class 11 foundation</li>
                  <li>• Unable to maintain consistent 8+ hour schedule</li>
                  <li>• Previous NEET score below 500</li>
                  <li>• No access to quality test series or mentorship</li>
                  <li>• Struggling with Physics numerical problems</li>
                </ul>
                <p className="mt-4 text-amber-900 font-semibold">In these cases, consider at least weekend coaching or hybrid support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Middle Ground: Self-Study + Support</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <BookOpen className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="font-bold mb-2">Weekend Batch</h3>
                <p className="text-sm text-gray-600">Self-study weekdays, coaching Sat-Sun. Best of both worlds.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <Clock className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="font-bold mb-2">Doubt Sessions Only</h3>
                <p className="text-sm text-gray-600">Pay-per-session doubt clearing. ₹500-1000/session.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <Users className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="font-bold mb-2">Test Series + Review</h3>
                <p className="text-sm text-gray-600">Take mock tests with expert analysis and guidance.</p>
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
                  <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Guidance for Self-Study?</h2>
          <p className="text-xl text-purple-100 mb-8">Free counseling session to assess if self-study will work for you.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
              <Phone className="w-5 h-5" />Call 88264-44334
            </a>
            <Link href="/free-neet-demo-class-gurugram" className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition">
              Free Assessment<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Can I Crack NEET Without Coaching?',
        description: 'Complete guide to NEET self-study with strategies and resources',
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
