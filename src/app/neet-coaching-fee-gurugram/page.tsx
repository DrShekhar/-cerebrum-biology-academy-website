import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, IndianRupee, CheckCircle, ArrowRight, AlertCircle, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching Fee in Gurugram 2026 | Fee Comparison | Cerebrum Academy',
  description:
    'Complete NEET coaching fee comparison in Gurugram 2026. Fees range from Rs 45,000 to Rs 2,50,000. Compare Aakash, Allen, Physics Wallah, Cerebrum fees. Call 88264-44334!',
  keywords: [
    'neet coaching fee gurugram',
    'neet coaching fees gurgaon',
    'how much fees for neet coaching',
    'neet coaching fee comparison gurugram',
    'affordable neet coaching gurugram',
    'best value neet coaching',
  ],
  openGraph: {
    title: 'NEET Coaching Fee Gurugram 2026 | Complete Fee Comparison',
    description: 'NEET coaching fees in Gurugram range from Rs 45,000 to Rs 2,50,000. Compare all institutes.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-fee-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-fee-gurugram',
  },
}

const feeComparison = [
  {
    institute: 'Cerebrum Biology Academy',
    courseType: 'Biology Only (Specialist)',
    fee1Year: '45,000 - 65,000',
    fee2Year: '85,000 - 1,10,000',
    batchSize: '15-20',
    includes: ['Study Material', 'Test Series', 'Doubt Sessions', 'Mock Tests'],
    rating: 4.9,
    highlight: true,
  },
  {
    institute: 'Aakash Institute',
    courseType: 'Full NEET (PCB)',
    fee1Year: '1,50,000 - 2,00,000',
    fee2Year: '2,50,000 - 3,50,000',
    batchSize: '80-100',
    includes: ['All Subjects', 'DLP Material', 'Test Series'],
    rating: 4.2,
  },
  {
    institute: 'Allen Career Institute',
    courseType: 'Full NEET (PCB)',
    fee1Year: '1,40,000 - 1,80,000',
    fee2Year: '2,20,000 - 3,00,000',
    batchSize: '60-80',
    includes: ['All Subjects', 'Study Material', 'Tests'],
    rating: 4.3,
  },
  {
    institute: 'Physics Wallah (Offline)',
    courseType: 'Full NEET (PCB)',
    fee1Year: '35,000 - 50,000',
    fee2Year: '60,000 - 90,000',
    batchSize: '100-150',
    includes: ['All Subjects', 'Online + Offline', 'Tests'],
    rating: 4.0,
  },
  {
    institute: 'Local Coaching Centers',
    courseType: 'Varies',
    fee1Year: '25,000 - 60,000',
    fee2Year: '45,000 - 1,00,000',
    batchSize: '30-50',
    includes: ['Basic Material', 'Limited Tests'],
    rating: 3.5,
  },
]

const quickAnswer = {
  question: 'What is the fee for NEET coaching in Gurugram?',
  answer: 'NEET coaching fees in Gurugram range from Rs 25,000 to Rs 3,50,000 per year depending on the institute, course type (Biology-only vs Full NEET), and batch size. Biology-specialist coaching like Cerebrum Academy costs Rs 45,000-65,000/year with 15-20 student batches. Large institutes like Aakash charge Rs 1,50,000-2,00,000/year for full NEET coaching.',
}

const feeFactors = [
  { factor: 'Institute Reputation', impact: 'High', description: 'Established brands charge 2-3x more' },
  { factor: 'Batch Size', impact: 'High', description: 'Smaller batches = higher fees but better attention' },
  { factor: 'Subject Coverage', impact: 'Medium', description: 'Biology-only is 50-70% cheaper than full PCB' },
  { factor: 'Study Material', impact: 'Medium', description: 'Premium material adds Rs 10,000-20,000' },
  { factor: 'Location', impact: 'Low', description: 'DLF/Golf Course Road areas slightly higher' },
]

const faqs = [
  {
    question: 'What is the average NEET coaching fee in Gurugram?',
    answer: 'The average NEET coaching fee in Gurugram is Rs 80,000-1,20,000 per year for full NEET (PCB) coaching. Biology-only specialist coaching is more affordable at Rs 45,000-65,000 per year.',
  },
  {
    question: 'Which is the most affordable NEET coaching in Gurugram?',
    answer: 'Physics Wallah offers the most affordable full NEET coaching at Rs 35,000-50,000/year. For biology-focused preparation, Cerebrum Biology Academy offers excellent value at Rs 45,000-65,000/year with small batches of 15-20 students.',
  },
  {
    question: 'Is expensive NEET coaching worth it?',
    answer: 'Not always. Success depends on teaching quality, batch size, and your dedication - not just fees. Many students from affordable coaching (Rs 50,000-80,000/year) crack NEET with good ranks. Focus on faculty quality and batch size over brand name.',
  },
  {
    question: 'Do NEET coaching institutes offer EMI or scholarships?',
    answer: 'Yes, most institutes offer EMI options (3-12 months). Scholarships of 10-100% are available based on entrance tests or board marks. Cerebrum Academy offers up to 50% scholarship for meritorious students.',
  },
]

export default function NEETCoachingFeeGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Quick Answer Box - Featured Snippet Target */}
      <section className="bg-gradient-to-r from-green-700 to-teal-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{quickAnswer.question}</h1>
              <p className="text-lg text-green-100 leading-relaxed">{quickAnswer.answer}</p>
              <div className="mt-4 flex items-center gap-2 text-yellow-300">
                <IndianRupee className="w-5 h-5" />
                <span className="font-semibold">Quick Answer: Rs 25,000 - Rs 3,50,000/year</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Comparison Table - Structured for Featured Snippet */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">NEET Coaching Fee Comparison Gurugram 2026</h2>
          <p className="text-center text-gray-600 mb-8">Updated January 2026 | Verified fees from official sources</p>

          <div className="max-w-6xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="px-4 py-3 text-left">Institute</th>
                  <th className="px-4 py-3 text-left">Course Type</th>
                  <th className="px-4 py-3 text-center">1-Year Fee</th>
                  <th className="px-4 py-3 text-center">2-Year Fee</th>
                  <th className="px-4 py-3 text-center">Batch Size</th>
                  <th className="px-4 py-3 text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {feeComparison.map((item, index) => (
                  <tr key={index} className={`border-b ${item.highlight ? 'bg-green-50 font-medium' : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="px-4 py-4">
                      <div className="font-semibold">{item.institute}</div>
                      {item.highlight && <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">Recommended</span>}
                    </td>
                    <td className="px-4 py-4 text-sm">{item.courseType}</td>
                    <td className="px-4 py-4 text-center">Rs {item.fee1Year}</td>
                    <td className="px-4 py-4 text-center">Rs {item.fee2Year}</td>
                    <td className="px-4 py-4 text-center">{item.batchSize}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span>{item.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-500 text-center mt-4">* Fees are approximate and may vary. Contact institutes for exact pricing.</p>
        </div>
      </section>

      {/* Fee Factors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Factors Affecting NEET Coaching Fees</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {feeFactors.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{item.factor}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.impact === 'High' ? 'bg-red-100 text-red-700' :
                    item.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>{item.impact} Impact</span>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-green-50 rounded-2xl p-8 border border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Why Cerebrum Offers Best Value for Money</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Small batches of 15-20 students only',
                'AIIMS-trained faculty with 15+ years experience',
                '98% success rate in NEET qualification',
                'Biology specialist = focused preparation',
                'Personal attention and doubt clearing',
                'Flexible payment options and scholarships',
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg">
              <div className="flex items-center gap-2 text-green-700">
                <AlertCircle className="w-5 h-5" />
                <span className="font-semibold">Fee: Rs 45,000 - Rs 65,000/year | Scholarship up to 50%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-green-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Related Resources</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link href="/neet-coaching-gurugram" className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition text-center">
              <h3 className="font-semibold text-green-800">NEET Coaching</h3>
              <p className="text-sm text-gray-600">Complete program details</p>
            </Link>
            <Link href="/free-neet-demo-class-gurugram" className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition text-center">
              <h3 className="font-semibold text-blue-800">Free Demo Class</h3>
              <p className="text-sm text-gray-600">Try before you pay</p>
            </Link>
            <Link href="/neet-result-2025-gurugram" className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition text-center">
              <h3 className="font-semibold text-purple-800">2025 Results</h3>
              <p className="text-sm text-gray-600">97% success rate</p>
            </Link>
            <Link href="/which-is-better-aakash-or-allen-gurugram" className="bg-amber-50 p-4 rounded-lg hover:bg-amber-100 transition text-center">
              <h3 className="font-semibold text-amber-800">Institute Comparison</h3>
              <p className="text-sm text-gray-600">Aakash vs Allen vs others</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Best Value NEET Coaching</h2>
          <p className="text-xl text-green-100 mb-8">Small batches, expert faculty, affordable fees. Scholarship available!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
              <Phone className="w-5 h-5" />Call 88264-44334
            </a>
            <Link href="/free-neet-demo-class-gurugram" className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition">
              Book Free Demo<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer }
        })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'NEET Coaching Fee in Gurugram 2026 - Complete Comparison',
        description: quickAnswer.answer,
        author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
        publisher: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
        datePublished: '2026-01-01',
        dateModified: '2026-01-27',
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Table',
        about: 'NEET Coaching Fee Comparison Gurugram 2026',
      }) }} />
    </div>
  )
}
