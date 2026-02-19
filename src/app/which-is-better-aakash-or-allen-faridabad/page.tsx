import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  ArrowRight,
  CheckCircle,
  XCircle,
  Users,
  Building,
  Award,
  Target,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Aakash vs Allen: Which is Better for NEET in Faridabad? 2026',
  description:
    'Aakash vs Allen comparison for NEET coaching in Faridabad. Fees, faculty, results, batch size compared. Plus a better alternative with 98% success. Call 88264-44334!',
  keywords: [
    'aakash vs allen neet',
    'which is better aakash or allen',
    'aakash or allen for neet faridabad',
    'aakash allen comparison neet',
    'best coaching between aakash allen',
    'aakash vs allen fees faridabad',
  ],
  openGraph: {
    title: 'Aakash vs Allen: Which is Better for NEET? | Faridabad',
    description: 'Complete comparison of Aakash and Allen for NEET coaching in Faridabad.',
    url: 'https://cerebrumbiologyacademy.com/which-is-better-aakash-or-allen-faridabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/which-is-better-aakash-or-allen-faridabad',
  },
}

const comparison = [
  { factor: 'Founded', aakash: '1988', allen: '1988', winner: 'Tie' },
  {
    factor: 'Batch Size',
    aakash: '80-150 students',
    allen: '100-200 students',
    winner: 'Aakash',
  },
  {
    factor: 'Annual Fees (2-year)',
    aakash: '₹2-3 Lakh',
    allen: '₹1.8-2.8 Lakh',
    winner: 'Allen',
  },
  {
    factor: 'Study Material',
    aakash: 'Comprehensive',
    allen: 'Very Detailed',
    winner: 'Allen',
  },
  {
    factor: 'Test Series',
    aakash: 'AIATS (Good)',
    allen: 'AITS (Excellent)',
    winner: 'Allen',
  },
  {
    factor: 'Online Platform',
    aakash: 'Aakash Digital',
    allen: 'Allen Digital',
    winner: 'Tie',
  },
  {
    factor: 'Faculty Quality',
    aakash: 'Good',
    allen: 'Very Good',
    winner: 'Allen',
  },
  {
    factor: 'Faridabad Presence',
    aakash: '2-3 centers',
    allen: '1-2 centers',
    winner: 'Aakash',
  },
  {
    factor: 'Personal Attention',
    aakash: 'Limited',
    allen: 'Limited',
    winner: 'Neither',
  },
]

const aakashPros = [
  'More centers in Faridabad - easier access',
  'Strong brand recognition',
  "Good digital platform (BYJU's backed)",
  'Regular parent-teacher meetings',
]

const aakashCons = [
  'Large batch sizes (80-150 students)',
  'Higher fees than Allen',
  'Frequent faculty changes reported',
  'Less focus on individual attention',
]

const allenPros = [
  'Better study material quality',
  'Excellent test series (AITS)',
  'Strong track record in Kota',
  'Slightly lower fees than Aakash',
]

const allenCons = [
  'Fewer centers in Faridabad',
  'Very large batches (100-200)',
  'Kota-centric approach may not suit all',
  'Limited doubt clearing time',
]

const faqs = [
  {
    question: 'Which has better results - Aakash or Allen?',
    answer:
      'Nationally, Allen has edge with more NEET toppers. In Faridabad specifically, results are comparable. However, individual results depend more on student effort than institute choice.',
  },
  {
    question: 'Is Allen or Aakash better for Biology?',
    answer:
      "Allen's Biology material is considered slightly better. However, for focused Biology coaching with AIIMS faculty, specialized Biology academies outperform both.",
  },
  {
    question: 'Can I switch from Aakash to Allen mid-course?',
    answer:
      'Technically yes, but not recommended. Switching mid-course disrupts preparation. If unhappy, complete current year and switch for next year if needed.',
  },
  {
    question: 'Is there a better alternative in Faridabad?',
    answer:
      'Yes! Boutique coaching like Cerebrum Biology Academy offers 20-student batches, AIIMS faculty, and 98% success rate at half the fees. Consider smaller institutes for better attention.',
  },
]

export default function AakashVsAllenFaridabad() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <section className="bg-gradient-to-r from-indigo-700 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-indigo-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Target className="w-4 h-4" />
              Honest Comparison
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Aakash vs Allen: Which is Better?
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Unbiased comparison for NEET coaching in Faridabad
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-600 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-indigo-900 mb-3">Quick Answer</h2>
              <p className="text-lg text-indigo-800">
                <strong>Allen has slight edge</strong> in study material and test series.{' '}
                <strong>Aakash has better Faridabad presence</strong> with more centers. However,
                both have similar issues: large batches (100+ students) and limited personal
                attention. For better results, consider smaller batch coaching with specialized
                faculty.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Head-to-Head Comparison</h2>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Factor</th>
                  <th className="px-4 py-3 text-center">Aakash</th>
                  <th className="px-4 py-3 text-center">Allen</th>
                  <th className="px-4 py-3 text-center">Winner</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-semibold">{row.factor}</td>
                    <td className="px-4 py-3 text-center">{row.aakash}</td>
                    <td className="px-4 py-3 text-center">{row.allen}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          row.winner === 'Aakash'
                            ? 'bg-blue-100 text-blue-700'
                            : row.winner === 'Allen'
                              ? 'bg-green-100 text-green-700'
                              : row.winner === 'Neither'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {row.winner}
                      </span>
                    </td>
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
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                <Building className="w-6 h-6" />
                Aakash Institute
              </h3>
              <div className="mb-4">
                <h4 className="font-semibold text-green-700 mb-2">Pros:</h4>
                <ul className="space-y-1">
                  {aakashPros.map((pro, index) => (
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
                  {aakashCons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <Building className="w-6 h-6" />
                Allen Career Institute
              </h3>
              <div className="mb-4">
                <h4 className="font-semibold text-green-700 mb-2">Pros:</h4>
                <ul className="space-y-1">
                  {allenPros.map((pro, index) => (
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
                  {allenCons.map((con, index) => (
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

      <section className="py-12 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Consider a Better Alternative</h2>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <Users className="w-10 h-10 text-indigo-600 mx-auto mb-2" />
                  <p className="font-bold text-2xl">20</p>
                  <p className="text-sm text-gray-600">Students per Batch</p>
                </div>
                <div className="text-center">
                  <Award className="w-10 h-10 text-indigo-600 mx-auto mb-2" />
                  <p className="font-bold text-2xl">98%</p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
                <div className="text-center">
                  <Building className="w-10 h-10 text-indigo-600 mx-auto mb-2" />
                  <p className="font-bold text-2xl">₹85K</p>
                  <p className="text-sm text-gray-600">1-Year Program</p>
                </div>
              </div>
              <p className="text-center text-gray-700 mb-6">
                Cerebrum Biology Academy offers what Aakash and Allen can't:{' '}
                <strong>small batches, personal attention, and AIIMS faculty</strong> at half the
                price.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/aakash-alternative-faridabad"
                  className="text-indigo-600 hover:underline"
                >
                  Aakash vs Cerebrum &rarr;
                </Link>
                <Link
                  href="/allen-alternative-faridabad"
                  className="text-indigo-600 hover:underline"
                >
                  Allen vs Cerebrum &rarr;
                </Link>
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
                  <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                    &#9660;
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want Personalized Advice?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Talk to our counselors. We'll help you make the right choice.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-yellow-500 text-indigo-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call 88264-44334
            </a>
            <Link
              href="/free-neet-demo-class-faridabad"
              className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition"
            >
              Try Our Free Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Aakash vs Allen: Which is Better for NEET?',
            description: 'Complete comparison of Aakash and Allen for NEET coaching',
            author: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
            datePublished: '2025-01-01',
            dateModified: '2026-02-19',
          }),
        }}
      />
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
    </div>
  )
}
