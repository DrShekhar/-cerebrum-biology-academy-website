import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, IndianRupee, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching Fees in Faridabad 2025 | ₹45K-₹3L Comparison',
  description:
    'NEET coaching fees in Faridabad range from ₹45,000 to ₹3,00,000. Compare Velocity, YVS, Cerebrum fees. What\'s included, hidden costs, and best value. Call 88264-44334!',
  keywords: [
    'neet coaching fees faridabad',
    'how much fees for neet coaching',
    'neet coaching fees in faridabad',
    'velocity neet fees faridabad',
    'yvs neet fees faridabad',
    'affordable neet coaching faridabad',
  ],
  openGraph: {
    title: 'NEET Coaching Fees in Faridabad 2025 | Complete Comparison',
    description: 'Compare NEET coaching fees from ₹45K to ₹3L. Find best value.',
    url: 'https://cerebrumbiologyacademy.com/how-much-fees-for-neet-coaching-faridabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/how-much-fees-for-neet-coaching-faridabad',
  },
}

const feeComparison = [
  { institute: 'Large Coaching (Velocity/Aakash)', fees: '₹1.5L - ₹3L', batch: '100-200', included: 'Books, Tests', hidden: 'Hostel, Extra courses' },
  { institute: 'Cerebrum Biology Academy', fees: '₹75K - ₹1.2L', batch: '15-20', included: 'Books, Tests, Doubt Sessions', hidden: 'None' },
  { institute: 'Local Tuition Centers', fees: '₹30K - ₹60K', batch: '30-50', included: 'Basic material', hidden: 'Test series extra' },
  { institute: 'Online Only (PW, Unacademy)', fees: '₹15K - ₹45K', batch: 'Unlimited', included: 'Video lectures, Tests', hidden: 'Offline support extra' },
]

const whatAffectsFees = [
  { factor: 'Course Duration', impact: '1-year costs 40-50% of 2-year program' },
  { factor: 'Batch Size', impact: 'Smaller batches (20 students) cost more but better results' },
  { factor: 'Faculty Experience', impact: 'AIIMS/MBBS faculty charges premium' },
  { factor: 'Location', impact: 'Prime areas like Sector 17 charge 20-30% more' },
  { factor: 'Infrastructure', impact: 'AC classrooms, labs add to costs' },
]

const faqs = [
  {
    question: 'What is the average NEET coaching fee in Faridabad?',
    answer: 'For 2-year programs: ₹1.2L-₹2.5L (large institutes), ₹75K-₹1.5L (boutique coaching). For 1-year: ₹60K-₹1.5L. Crash courses: ₹25K-₹50K.',
  },
  {
    question: 'Is expensive coaching worth it?',
    answer: 'Not always. Our ₹85K program with 20-student batches has 98% success rate vs 60-70% at ₹2L+ large institutes. Quality teaching matters more than fees.',
  },
  {
    question: 'Are there hidden costs in NEET coaching?',
    answer: 'Often yes! Large institutes may charge extra for: doubt classes, test series, study material upgrades, re-enrollment. We have zero hidden costs - everything included.',
  },
  {
    question: 'Can I get scholarship for NEET coaching?',
    answer: 'Yes! We offer 25-100% scholarship based on merit (10th/11th marks) and need. Aakash/Allen also have scholarship tests. Apply for iNEET or ACST.',
  },
  {
    question: 'Is EMI available for NEET coaching fees?',
    answer: 'Yes, most institutes including ours offer 6-12 month EMI options through partner banks. Zero-cost EMI available for select programs.',
  },
]

export default function HowMuchFeesForNEETCoachingFaridabad() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-emerald-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <IndianRupee className="w-4 h-4" />
              2025 Fee Guide
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Coaching Fees in Faridabad</h1>
            <p className="text-xl text-emerald-100 mb-8">Complete fee comparison: ₹45,000 to ₹3,00,000</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-600 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-emerald-900 mb-3">Quick Answer</h2>
              <p className="text-lg text-emerald-800">
                NEET coaching fees in Faridabad range from <strong>₹45,000 to ₹3,00,000</strong> depending on institute type, course duration, and batch size. Average for quality coaching: <strong>₹80,000 - ₹1,50,000</strong> for a 1-year program. Best value: Small batch coaching with AIIMS faculty at ₹75K-₹1L.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Fee Comparison Table (2025)</h2>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-emerald-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Institute Type</th>
                  <th className="px-4 py-3 text-left">Annual Fees</th>
                  <th className="px-4 py-3 text-left">Batch Size</th>
                  <th className="px-4 py-3 text-left">Included</th>
                  <th className="px-4 py-3 text-left">Hidden Costs</th>
                </tr>
              </thead>
              <tbody>
                {feeComparison.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-semibold">{row.institute}</td>
                    <td className="px-4 py-3 text-emerald-700 font-bold">{row.fees}</td>
                    <td className="px-4 py-3">{row.batch}</td>
                    <td className="px-4 py-3 text-sm">{row.included}</td>
                    <td className="px-4 py-3 text-sm text-red-600">{row.hidden}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">What Affects NEET Coaching Fees?</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            {whatAffectsFees.map((item, index) => (
              <div key={index} className="bg-emerald-50 p-4 rounded-lg">
                <h3 className="font-bold text-emerald-800">{item.factor}</h3>
                <p className="text-gray-600 text-sm">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Cerebrum Academy Fees (Best Value in Faridabad)</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-lg font-bold text-gray-600 mb-2">2-Year Program</h3>
                <p className="text-4xl font-bold text-emerald-600 mb-2">₹1,20,000</p>
                <p className="text-sm text-gray-500 mb-4">Class 11-12 + NEET</p>
                <ul className="text-sm text-left space-y-1">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />AIIMS Faculty</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />20 Student Batch</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />All Materials</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center border-2 border-emerald-500 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">POPULAR</span>
                <h3 className="text-lg font-bold text-gray-600 mb-2">1-Year Program</h3>
                <p className="text-4xl font-bold text-emerald-600 mb-2">₹85,000</p>
                <p className="text-sm text-gray-500 mb-4">Class 12 + NEET</p>
                <ul className="text-sm text-left space-y-1">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />AIIMS Faculty</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />20 Student Batch</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />All Materials</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-lg font-bold text-gray-600 mb-2">Crash Course</h3>
                <p className="text-4xl font-bold text-emerald-600 mb-2">₹45,000</p>
                <p className="text-sm text-gray-500 mb-4">3-4 Months Intensive</p>
                <ul className="text-sm text-left space-y-1">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />AIIMS Faculty</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />15 Student Batch</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Revision Focus</li>
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
                  <span className="text-emerald-600 group-open:rotate-180 transition-transform">&#9660;</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Detailed Fee Structure</h2>
          <p className="text-xl text-emerald-100 mb-8">Call us for scholarship eligibility and EMI options. Cerebrum Biology Academy, Sector 17, Faridabad.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-emerald-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
              <Phone className="w-5 h-5" />Call 88264-44334
            </a>
            <Link href="/neet-scholarship-faridabad" className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition">
              Check Scholarship<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'NEET Coaching Fees in Faridabad 2025',
        description: 'Complete fee comparison for NEET coaching in Faridabad',
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
