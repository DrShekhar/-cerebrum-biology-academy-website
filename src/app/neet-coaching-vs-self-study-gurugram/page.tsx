import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, ArrowRight, CheckCircle, XCircle, Users, BookOpen, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching vs Self-Study: Which is Better? 2025 Guide | Gurugram',
  description:
    'NEET coaching vs self-study comparison. Pros, cons, success rates, and who should choose what. Expert advice from AIIMS faculty in Gurugram. Call 88264-44334!',
  keywords: [
    'neet coaching vs self study',
    'coaching or self study for neet',
    'neet self study vs coaching',
    'should i join neet coaching',
    'neet preparation coaching or self study',
    'neet coaching worth it',
  ],
  openGraph: {
    title: 'NEET Coaching vs Self-Study: Which is Better?',
    description: 'Complete comparison with success rates and expert advice.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-vs-self-study-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-vs-self-study-gurugram',
  },
}

const comparisonTable = [
  { factor: 'Study Hours Required', coaching: '5-6 hours/day', selfStudy: '8-10 hours/day' },
  { factor: 'Success Rate (AIR <10K)', coaching: '25-30%', selfStudy: '10-15%' },
  { factor: 'Cost', coaching: '₹50K - ₹3L', selfStudy: '₹10K - ₹30K' },
  { factor: 'Doubt Clearing', coaching: 'Immediate', selfStudy: 'Delayed/Online' },
  { factor: 'Discipline Required', coaching: 'Moderate', selfStudy: 'Very High' },
  { factor: 'Peer Learning', coaching: 'Yes', selfStudy: 'Limited' },
  { factor: 'Flexibility', coaching: 'Low', selfStudy: 'High' },
  { factor: 'Mock Tests', coaching: 'Regular + Analysis', selfStudy: 'Self-arranged' },
]

const coachingPros = [
  'Structured curriculum and timeline',
  'Expert faculty for doubt clearing',
  'Regular tests with performance analysis',
  'Peer competition and motivation',
  'Curated study material',
  'Time-saving - focus on what matters',
]

const coachingCons = [
  'Expensive (₹50K - ₹3L)',
  'Fixed schedule - less flexibility',
  'Quality varies greatly',
  'Large batches - limited attention',
  'Travel time to coaching center',
]

const selfStudyPros = [
  'Cost-effective (₹10K-30K)',
  'Flexible timing and pace',
  'Study from anywhere',
  'No dependency on others',
  'Builds self-discipline',
]

const selfStudyCons = [
  'Requires exceptional discipline',
  'No immediate doubt resolution',
  'No performance benchmarking',
  'Easy to lose motivation',
  'May miss important topics',
  'Harder to identify weaknesses',
]

const faqs = [
  {
    question: 'What percentage of NEET toppers use coaching?',
    answer: '80-85% of NEET toppers (AIR under 1000) have some form of coaching - either full-time, part-time, or at least test series. Pure self-study toppers are 15-20%.',
  },
  {
    question: 'Is self-study enough for 600+ in NEET?',
    answer: 'Possible but difficult. 600+ requires strong foundation, excellent resources, and consistent 8-10 hours daily. Consider at least test series and doubt support even if not full coaching.',
  },
  {
    question: 'Can I combine coaching and self-study?',
    answer: 'Yes! This is often the best approach. Join coaching for classes and tests, but dedicate 3-4 hours daily to self-study for revision and practice.',
  },
  {
    question: 'Which is better for repeaters/droppers?',
    answer: 'Depends on first attempt score. If 550+: self-study with test series may work. Below 500: coaching recommended to fix fundamentals. Analyze what went wrong first.',
  },
]

export default function NEETCoachingVsSelfStudy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <section className="bg-gradient-to-r from-teal-700 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-teal-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Target className="w-4 h-4" />
              Decision Guide
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Coaching vs Self-Study</h1>
            <p className="text-xl text-teal-100 mb-8">Which approach will work best for YOU?</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-l-4 border-teal-600 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-teal-900 mb-3">Quick Answer</h2>
              <p className="text-lg text-teal-800">
                <strong>Coaching has higher success rate</strong> (25-30% vs 10-15% for self-study) but costs more. <strong>Self-study works if</strong> you have exceptional discipline, strong foundation, and access to good resources. <strong>Best approach</strong>: Combine both - join coaching for structure, dedicate daily self-study time for mastery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Side-by-Side Comparison</h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Factor</th>
                  <th className="px-4 py-3 text-center">Coaching</th>
                  <th className="px-4 py-3 text-center">Self-Study</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-semibold">{row.factor}</td>
                    <td className="px-4 py-3 text-center">{row.coaching}</td>
                    <td className="px-4 py-3 text-center">{row.selfStudy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-teal-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-teal-800 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Coaching
              </h3>
              <div className="mb-4">
                <h4 className="font-semibold text-green-700 mb-2">Pros:</h4>
                <ul className="space-y-1">
                  {coachingPros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-2">Cons:</h4>
                <ul className="space-y-1">
                  {coachingCons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-cyan-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Self-Study
              </h3>
              <div className="mb-4">
                <h4 className="font-semibold text-green-700 mb-2">Pros:</h4>
                <ul className="space-y-1">
                  {selfStudyPros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-2">Cons:</h4>
                <ul className="space-y-1">
                  {selfStudyCons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-teal-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Who Should Choose What?</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-teal-800 mb-4">Choose Coaching If:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5" />
                  <span>First NEET attempt</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5" />
                  <span>Weak in any subject</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5" />
                  <span>Need structured schedule</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5" />
                  <span>Aiming for AIIMS/top colleges</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5" />
                  <span>Parents can't monitor daily</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-cyan-800 mb-4">Choose Self-Study If:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5" />
                  <span>Scored 550+ previously</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5" />
                  <span>Exceptional self-discipline</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5" />
                  <span>Budget constraints</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5" />
                  <span>Strong NCERT foundation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5" />
                  <span>Access to test series & mentor</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Best of Both Worlds</h2>
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Weekend + Self-Study Model</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Weekdays (Self-Study)</h4>
                  <ul className="space-y-1 text-teal-100">
                    <li>• 4-5 hours focused study</li>
                    <li>• NCERT reading + note making</li>
                    <li>• Practice MCQs</li>
                    <li>• Online doubt forums</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Weekends (Coaching)</h4>
                  <ul className="space-y-1 text-teal-100">
                    <li>• 6-8 hours intensive classes</li>
                    <li>• Doubt clearing sessions</li>
                    <li>• Mock tests with analysis</li>
                    <li>• Peer discussions</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-center">Our Weekend Batch at ₹45,000/year offers exactly this.</p>
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
                  <span className="text-teal-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Not Sure What's Right for You?</h2>
          <p className="text-xl text-teal-100 mb-8">Free counseling to help you decide. No obligation.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-teal-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
              <Phone className="w-5 h-5" />Call 88264-44334
            </a>
            <Link href="/free-neet-demo-class-gurugram" className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition">
              Try Free Demo<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'NEET Coaching vs Self-Study: Which is Better?',
        description: 'Complete comparison of coaching and self-study for NEET',
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
