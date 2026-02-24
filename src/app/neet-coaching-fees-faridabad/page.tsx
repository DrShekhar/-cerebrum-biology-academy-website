import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  CheckCircle,
  Users,
  Award,
  ArrowRight,
  Shield,
  BookOpen,
  Clock,
  Star,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching Fees in Faridabad 2026 | Compare Coaching Fees',
  description:
    'Compare NEET coaching fees in Faridabad 2026. Fee comparison of Aakash, Narayana, VMC, Velocity, YVS vs Cerebrum Biology Academy. Best value with small batches. Call 88264-44334!',
  keywords: [
    'neet coaching fees faridabad',
    'neet coaching cost faridabad',
    'best neet coaching fees faridabad',
    'cheapest neet coaching faridabad',
    'neet coaching fee comparison faridabad',
    'aakash fees faridabad',
    'narayana fees faridabad',
    'neet biology coaching fees',
    'affordable neet coaching faridabad',
  ],
  openGraph: {
    title: 'NEET Coaching Fees in Faridabad 2026 | Compare & Save',
    description:
      'Detailed fee comparison of all major NEET coaching institutes in Faridabad. Find the best value.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-fees-faridabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-fees-faridabad',
  },
}

const feeComparison = [
  {
    institute: 'Aakash (Faridabad)',
    class11_12: '1.5-3.5 Lakh',
    dropper: '1-2 Lakh',
    batchSize: '100-200',
    highlight: false,
  },
  {
    institute: 'Narayana (Faridabad)',
    class11_12: '1.7-3.5 Lakh',
    dropper: '1.2-2 Lakh',
    batchSize: '80-150',
    highlight: false,
  },
  {
    institute: 'VMC (Faridabad)',
    class11_12: '1.7-3.5 Lakh',
    dropper: '1-1.8 Lakh',
    batchSize: '60-100',
    highlight: false,
  },
  {
    institute: 'Velocity (Faridabad)',
    class11_12: '72,000/year',
    dropper: 'N/A',
    batchSize: '30-50',
    highlight: false,
  },
  {
    institute: 'YVS (Faridabad)',
    class11_12: '60,000-1 Lakh',
    dropper: 'N/A',
    batchSize: '40-60',
    highlight: false,
  },
  {
    institute: 'Cerebrum Biology Academy',
    class11_12: '60,000-75,000/year',
    dropper: '65,000',
    batchSize: '15-20',
    highlight: true,
  },
]

const whatsIncluded = [
  'Complete NCERT + Reference study material',
  'Chapter-wise test series (50+ tests)',
  'Full-length mock tests (15+ NEET pattern)',
  'Daily doubt clearing sessions',
  'Previous 10 years NEET paper analysis',
  'WhatsApp doubt support (24/7)',
  'Recorded lectures for revision',
  'Parent-teacher meetings (monthly)',
  'Performance tracking dashboard',
  'Scholarship up to 100% fee waiver',
]

const valueProps = [
  {
    icon: Users,
    title: 'Smallest Batches in Faridabad',
    description:
      'Only 15-20 students per batch. While large institutes pack 100-200 students, we ensure every student gets personal attention.',
  },
  {
    icon: Award,
    title: 'AIIMS Faculty',
    description:
      'Learn from Dr. Shekhar Singh (AIIMS) and team. No junior teachers or recorded lectures - direct interaction with experts.',
  },
  {
    icon: Shield,
    title: 'No Hidden Charges',
    description:
      'Fee includes everything - study material, test series, doubt sessions. No separate charges for mock tests or extra classes.',
  },
  {
    icon: Star,
    title: 'Proven Results',
    description:
      '98% success rate with average 650+ scores. Our students consistently outperform students from institutes charging 3-4x more.',
  },
]

const faqs = [
  {
    question: 'What is the fee structure at Cerebrum Biology Academy Faridabad?',
    answer:
      'Our fee for Class 11+12 (2-year program) is Rs 60,000-75,000 per year. Dropper batch is Rs 65,000 for the full program. This is all-inclusive with no hidden charges.',
  },
  {
    question: 'Is EMI available for NEET coaching fees?',
    answer:
      'Yes! We offer easy EMI options. You can pay in 3, 6, or 12 monthly installments. No-cost EMI available for select payment methods. Contact us for details.',
  },
  {
    question: 'How can I get a scholarship to reduce fees?',
    answer:
      'We offer merit-based scholarships up to 100% fee waiver. Based on your Class 10/11/12 marks or our scholarship test. Students with 90%+ marks can get 50-75% scholarship.',
  },
  {
    question: 'Why is Cerebrum cheaper than Aakash/Narayana?',
    answer:
      'We focus on Biology only (not all 3 subjects), keep batches small (15-20 students), and have minimal overhead. This allows us to offer premium quality at affordable fees. Our results prove that expensive does not mean better.',
  },
  {
    question: 'Are there any additional charges for test series or study material?',
    answer:
      'No. Our fee is all-inclusive. Study material, test series, mock tests, doubt sessions, recorded lectures - everything is included. We believe in transparent pricing.',
  },
  {
    question: 'Can I switch from online to offline mode?',
    answer:
      'Yes, you can switch between online and offline mode at any time. If upgrading to offline, you pay the difference. If switching to online, the excess amount is adjusted for the next term.',
  },
]

export default function NEETCoachingFeesFaridabadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" />
              2026 Fee Comparison
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Coaching Fees in Faridabad</h1>
            <p className="text-xl text-blue-100 mb-8">
              Compare fees of all major coaching institutes in Faridabad. Find the best value for
              your NEET preparation without overpaying.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918826444334"
                className="inline-flex items-center gap-2 bg-yellow-500 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
              >
                <Phone className="w-5 h-5" />
                Call 88264-44334
              </a>
              <Link
                href="/neet-coaching-faridabad"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
              >
                View All Programs
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Fee Comparison: NEET Coaching in Faridabad
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Updated for 2026. Fees are approximate and may vary. Contact institutes for exact
            figures.
          </p>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="text-left py-4 px-4 font-bold text-slate-900 border-b-2 border-blue-200">
                    Institute
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-slate-900 border-b-2 border-blue-200">
                    Class 11+12
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-slate-900 border-b-2 border-blue-200">
                    Dropper
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-slate-900 border-b-2 border-blue-200">
                    Batch Size
                  </th>
                </tr>
              </thead>
              <tbody>
                {feeComparison.map((row, index) => (
                  <tr
                    key={index}
                    className={
                      row.highlight
                        ? 'bg-green-50 border-2 border-green-400 font-semibold'
                        : 'border-b border-gray-100 hover:bg-gray-50'
                    }
                  >
                    <td className="py-4 px-4">
                      {row.highlight ? (
                        <span className="text-green-700 font-bold">{row.institute}</span>
                      ) : (
                        <span className="text-gray-800">{row.institute}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {row.highlight ? (
                        <span className="text-green-700 font-bold">&#8377;{row.class11_12}</span>
                      ) : (
                        <span className="text-gray-700">&#8377;{row.class11_12}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {row.highlight ? (
                        <span className="text-green-700 font-bold">&#8377;{row.dropper}</span>
                      ) : (
                        <span className="text-gray-700">
                          {row.dropper === 'N/A' ? 'N/A' : `\u20B9${row.dropper}`}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {row.highlight ? (
                        <span className="text-green-700 font-bold">{row.batchSize}</span>
                      ) : (
                        <span className="text-gray-700">{row.batchSize}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            * Fees are indicative and based on publicly available information. Please verify with
            respective institutes.
          </p>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Why Cerebrum Offers the Best Value
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Lower fees, smaller batches, better results. Here&apos;s why 500+ Faridabad students
            choose us.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {valueProps.map((prop, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <prop.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">{prop.title}</h3>
                <p className="text-gray-600 text-sm">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">What&apos;s Included in the Fee</h2>
            <p className="text-center text-gray-600 mb-12">
              No hidden charges. Everything you need for NEET Biology preparation.
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-100">
              <div className="grid md:grid-cols-2 gap-4">
                {whatsIncluded.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
                <Shield className="w-5 h-5" />
                100% Transparent Pricing - No Hidden Fees
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Scholarship */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Award className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Save Even More with Scholarship</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Get up to 100% fee waiver based on your academic merit. Scholarships available for Class
            11, 12, and Dropper students.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/neet-scholarship-faridabad"
              className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition"
            >
              <Award className="w-5 h-5" />
              Check Scholarship Eligibility
            </Link>
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition border border-white/30"
            >
              <Phone className="w-5 h-5" />
              Call 88264-44334
            </a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Fee-Related FAQs</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
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

      {/* EMI Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Easy EMI Options Available</h2>
            <p className="text-lg text-gray-600 mb-8">
              Don&apos;t let lump-sum payment be a barrier. Split your fee into easy monthly
              installments.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-blue-700">3</p>
                <p className="text-sm text-gray-600">Month EMI</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-blue-700">6</p>
                <p className="text-sm text-gray-600">Month EMI</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-blue-700">12</p>
                <p className="text-sm text-gray-600">Month EMI</p>
              </div>
            </div>
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <Phone className="w-5 h-5" />
              Discuss Fee & EMI: 88264-44334
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your NEET Journey?</h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Best quality at the most affordable fees in Faridabad. Small batches, AIIMS faculty,
            proven results.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call Now: 88264-44334
            </a>
            <Link
              href="/demo-booking"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition border border-white/30"
            >
              Book Free Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema - FAQ */}
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
      {/* Schema - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'NEET Coaching Fees in Faridabad 2026 - Complete Comparison',
            description:
              'Detailed comparison of NEET coaching fees across all major institutes in Faridabad including Aakash, Narayana, VMC, and Cerebrum Biology Academy.',
            author: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            datePublished: '2025-01-01',
            dateModified: '2026-02-19',
          }),
        }}
      />
    </div>
  )
}
