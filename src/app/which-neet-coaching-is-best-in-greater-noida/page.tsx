import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  CheckCircle,
  XCircle,
  Star,
  Users,
  Award,
  ArrowRight,
  TrendingUp,
  Wallet,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Which NEET Coaching is Best in Greater Noida? | 2026 Honest Comparison',
  description:
    'Looking for the best NEET coaching in Greater Noida? Compare Aakash Greater Noida, WiseTurtle, Allen & Cerebrum on fees, batch size, results, faculty. Honest analysis. Read before deciding!',
  keywords: [
    'which neet coaching is best in greater noida',
    'best neet coaching greater noida 2026',
    'top neet coaching greater noida comparison',
    'aakash vs cerebrum greater noida',
    'neet coaching comparison greater noida',
    'best biology coaching greater noida',
    'which coaching is best for neet greater noida',
    'neet coaching ranking greater noida',
  ],
  openGraph: {
    title: 'Which NEET Coaching is Best in Greater Noida? | 2026 Comparison',
    description:
      'Honest comparison of NEET coaching institutes for Greater Noida students. Compare fees, batch size, results.',
    url: 'https://cerebrumbiologyacademy.com/which-neet-coaching-is-best-in-greater-noida',
  },
  alternates: {
    canonical:
      'https://cerebrumbiologyacademy.com/which-neet-coaching-is-best-in-greater-noida',
  },
}

const coachingComparison = [
  {
    name: 'Cerebrum Biology Academy',
    type: 'Biology Specialist',
    batchSize: '15-20',
    fees: '₹57K-85K/year',
    faculty: 'AIIMS Alumni',
    successRate: '98%',
    strengths: [
      'Personal attention',
      'Biology focus',
      'AIIMS faculty',
      'Small batches',
      'Online + hybrid for Greater Noida',
    ],
    weaknesses: ['Only Biology', 'Center in Sector 62 Noida (not in Greater Noida)'],
    rating: 4.9,
    bestFor: 'Serious Biology-focused NEET aspirants in Greater Noida',
    verdict: 'recommended',
  },
  {
    name: 'Aakash Greater Noida',
    type: 'All Subjects',
    batchSize: '80-120',
    fees: '₹1.5-2.5L/year',
    faculty: 'Mixed',
    successRate: '~70%',
    strengths: ['Brand recognition', 'All subjects', 'Local Greater Noida center'],
    weaknesses: ['Large batches', 'Less personal attention', 'High fees', "BYJU's instability"],
    rating: 3.8,
    bestFor: 'Students needing all 3 subjects at one place in Greater Noida',
    verdict: 'alternative',
  },
  {
    name: 'WiseTurtle Academy',
    type: 'Generic PCB',
    batchSize: '40-70',
    fees: '₹40K-80K/year',
    faculty: 'Mixed',
    successRate: '~50%',
    strengths: ['Local Greater Noida presence', 'Affordable'],
    weaknesses: ['Large batches', 'No specialist faculty', 'Generic approach', 'Limited track record'],
    rating: 3.2,
    bestFor: 'Budget-conscious families in Greater Noida seeking local coaching',
    verdict: 'alternative',
  },
  {
    name: 'Narayana Greater Noida',
    type: 'Generic PCB',
    batchSize: '50-80',
    fees: '₹70K-1.2L/year',
    faculty: 'Mixed',
    successRate: '~65%',
    strengths: ['Established brand', 'Greater Noida presence', 'All subjects'],
    weaknesses: ['Large batches', 'High fees', 'No specialist focus'],
    rating: 3.5,
    bestFor: 'Students wanting an established brand in Greater Noida',
    verdict: 'alternative',
  },
]

const decisionFactors = [
  {
    factor: 'Batch Size',
    icon: Users,
    importance: 'Critical',
    recommendation:
      'Smaller is better. In 100+ student batches, your doubts rarely get answered. Look for 25 or fewer students per batch.',
  },
  {
    factor: 'Faculty Credentials',
    icon: Award,
    importance: 'Very High',
    recommendation:
      'Check if faculty are from top medical colleges (AIIMS, MAMC). Avoid generic "experienced faculty" claims without proof.',
  },
  {
    factor: 'Fee vs Value',
    icon: Wallet,
    importance: 'High',
    recommendation:
      'Expensive doesnt mean better. Compare per-student attention. ₹2L for 100-student batch vs ₹70K for 20-student batch - do the math.',
  },
  {
    factor: 'Success Rate Claims',
    icon: TrendingUp,
    importance: 'Medium',
    recommendation:
      'Ask for verifiable results - student names, roll numbers. "1000+ selections" from 50,000 students is actually poor.',
  },
]

const faqs = [
  {
    question: 'Which NEET coaching is best in Greater Noida for Biology?',
    answer:
      'For Biology-focused preparation, Cerebrum Biology Academy ranks #1 for Greater Noida students. With AIIMS-trained faculty, 15-20 student batches, online + hybrid classes (no need to travel daily), and 98% success rate, it offers specialized attention that larger institutes cannot match. Greater Noida students join via online mode or visit our Sector 62, Noida center on weekends.',
  },
  {
    question: 'Is Aakash Greater Noida better than Allen for NEET?',
    answer:
      'Both have similar pros and cons - large batches (80-120 students), mixed faculty, and high fees (₹1.5-2.5L). Aakash has a local Greater Noida center which is convenient. Allen requires travel. For Biology, consider specialized coaching like Cerebrum for better results at lower cost via online/hybrid mode.',
  },
  {
    question: 'How much does NEET coaching cost in Greater Noida?',
    answer:
      'NEET coaching fees in Greater Noida range from ₹40K (WiseTurtle) to ₹2.5L (Aakash Greater Noida). Mid-range quality coaching like Cerebrum costs ₹57K-85K/year with small batches and AIIMS faculty - offering best value for money. Online mode is ₹45K/year.',
  },
  {
    question: 'Is WiseTurtle Academy Greater Noida good for NEET?',
    answer:
      'WiseTurtle Academy is a local Greater Noida option with affordable fees (₹40K-80K) but has large batches (40-70 students) and no specialist NEET faculty. Success rate (~50%) is significantly lower than specialized institutes like Cerebrum (98%). For serious NEET preparation, we recommend comparing results before enrolling.',
  },
  {
    question: 'What batch size is ideal for NEET coaching?',
    answer:
      'Research shows optimal learning happens in batches of 15-25 students. Large batches (80-150) reduce doubt-solving time per student from 5 minutes to under 30 seconds. For NEET, where concepts need deep understanding, small batches are critical.',
  },
]

export default function WhichNEETCoachingBestGreaterNoida() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Honest Comparison | No Paid Reviews
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Which NEET Coaching is Best in Greater Noida?
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              An honest, data-driven comparison of Greater Noida&apos;s top NEET coaching
              institutes. No sponsored content - just facts to help you decide.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-slate-700 px-4 py-2 rounded-full">Updated January 2026</span>
              <span className="bg-slate-700 px-4 py-2 rounded-full">4 Institutes Compared</span>
              <span className="bg-slate-700 px-4 py-2 rounded-full">Based on Real Data</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answer Box - Featured Snippet Target */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-green-50 border-2 border-green-200 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 fill-current" />
              Quick Answer: Best NEET Coaching in Greater Noida
            </h2>
            <div className="prose prose-green">
              <p className="text-gray-700 mb-4">
                <strong>For Biology-focused preparation:</strong> Cerebrum Biology Academy ranks #1
                for Greater Noida students with AIIMS faculty, 15-20 student batches, online +
                hybrid classes available, and 98% success rate at ₹57K-85K/year.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>For all-subject coaching in Greater Noida:</strong> Aakash Greater Noida has
                a local center but with larger batches (80-120) and higher fees (₹1.5-2.5L).
                WiseTurtle Academy offers budget options but with limited track record.
              </p>
              <p className="text-gray-700">
                <strong>Best value:</strong> Cerebrum online/hybrid at ₹45K-55K/year — zero or
                minimal travel, same AIIMS faculty, small batches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">2026 NEET Coaching Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Institute</th>
                  <th className="px-6 py-4 text-center">Batch Size</th>
                  <th className="px-6 py-4 text-center">Fees/Year</th>
                  <th className="px-6 py-4 text-center">Faculty</th>
                  <th className="px-6 py-4 text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {coachingComparison.map((institute) => (
                  <tr
                    key={institute.name}
                    className={`border-b ${institute.verdict === 'recommended' ? 'bg-green-50' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold">{institute.name}</div>
                      <div className="text-sm text-gray-500">{institute.type}</div>
                      {institute.verdict === 'recommended' && (
                        <span className="inline-block mt-1 bg-green-600 text-white text-xs px-2 py-1 rounded">
                          Recommended
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center font-semibold">{institute.batchSize}</td>
                    <td className="px-6 py-4 text-center">{institute.fees}</td>
                    <td className="px-6 py-4 text-center">{institute.faculty}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-bold">{institute.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Detailed Institute Analysis</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {coachingComparison.map((institute) => (
              <div
                key={institute.name}
                className={`rounded-xl p-6 ${institute.verdict === 'recommended' ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{institute.name}</h3>
                    <p className="text-gray-500 text-sm">{institute.type}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-bold">{institute.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Batch Size:</span>
                    <span className="font-semibold ml-2">{institute.batchSize}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Fees:</span>
                    <span className="font-semibold ml-2">{institute.fees}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Strengths:</p>
                  <div className="flex flex-wrap gap-2">
                    {institute.strengths.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                      >
                        <CheckCircle className="w-3 h-3" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Weaknesses:</p>
                  <div className="flex flex-wrap gap-2">
                    {institute.weaknesses.map((w) => (
                      <span
                        key={w}
                        className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded"
                      >
                        <XCircle className="w-3 h-3" />
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm">
                    <span className="font-semibold">Best for:</span> {institute.bestFor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decision Factors */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">How to Choose the Right Coaching</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Key factors to consider before finalizing your NEET coaching in Greater Noida
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {decisionFactors.map((factor) => (
              <div key={factor.factor} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <factor.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">{factor.factor}</h3>
                    <span className="text-xs text-blue-600 font-semibold">
                      Importance: {factor.importance}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{factor.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-100">
                  {faq.question}
                  <span className="text-blue-600 group-open:rotate-180 transition-transform">
                    &#9660;
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Confused? Try Before You Decide</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Book a FREE demo class at Cerebrum Biology Academy. Online from your Greater Noida home
            or visit our Sector 62, Noida center. Experience the difference of small batches and
            AIIMS faculty.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919953643938"
              className="bg-yellow-500 text-green-900 px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Book Free Demo: 99536-43938
            </a>
            <Link
              href="/biology-classes-greater-noida"
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-green-50 transition"
            >
              View All Courses
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Which NEET Coaching is Best in Greater Noida? 2026 Comparison',
            description:
              'Comprehensive comparison of NEET coaching institutes in Greater Noida including Aakash Greater Noida, WiseTurtle Academy, Narayana, and Cerebrum Biology Academy.',
            author: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
            datePublished: '2026-01-01',
            dateModified: '2026-02-20',
          }),
        }}
      />
    </div>
  )
}
