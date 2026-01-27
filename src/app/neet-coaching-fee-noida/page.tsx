import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, IndianRupee, CheckCircle, ArrowRight, Star, Monitor, MapPin, Building2 } from 'lucide-react'
import { NoidaPageSchemas } from '@/components/seo/NoidaSchemas'

export const metadata: Metadata = {
  title: 'NEET Coaching Fee in Noida 2026 | Fee Comparison Rs 48,000-3,50,000 | Cerebrum',
  description:
    'NEET coaching fee in Noida 2026: Rs 48,000-3,50,000. Compare Cerebrum (Rs 48,000, AIIMS faculty), Allen, Aakash, FIITJEE fees. EMI available. 98% success rate. Best value coaching in Noida!',
  keywords: [
    'neet coaching fee noida',
    'neet coaching fees greater noida',
    'how much fees for neet coaching noida',
    'neet coaching fee comparison noida',
    'affordable neet coaching noida',
    'online neet coaching fee noida',
    'cheapest neet coaching noida',
    'neet coaching emi noida',
    'neet coaching installment noida',
    'neet dropper fee noida',
    'neet foundation fee noida',
    'class 11 neet coaching fee noida',
    'class 12 neet coaching fee noida',
    'neet coaching fee sector 18 noida',
    'neet coaching fee sector 62 noida',
    'best value neet coaching noida',
    'neet coaching scholarship noida',
  ],
  openGraph: {
    title: 'NEET Coaching Fee Noida 2026 | Complete Fee Comparison',
    description: 'NEET coaching fees in Noida range from Rs 45,000 to Rs 3,50,000. Compare all institutes.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-fee-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-fee-noida',
  },
}

const quickAnswer = {
  question: 'How much does NEET coaching cost in Noida?',
  answer: 'NEET coaching fees in Noida range from Rs 45,000 to Rs 3,50,000 per year. Online-only courses start at Rs 25,000, while premium offline coaching at major institutes costs Rs 1,50,000-3,50,000. Cerebrum Academy offers specialized Biology coaching online from Rs 45,000/year with hybrid option at Rs 55,000/year.',
}

const feeComparison = [
  {
    institute: 'Cerebrum Biology Academy',
    type: 'Biology Specialist (Online)',
    fee1Year: '45,000',
    fee2Year: '85,000',
    mode: 'Online / Hybrid',
    batchSize: '15-20',
    rating: 4.9,
    highlight: true,
  },
  {
    institute: 'Aakash Institute',
    type: 'Full NEET (PCB)',
    fee1Year: '1,60,000 - 2,20,000',
    fee2Year: '2,80,000 - 3,80,000',
    mode: 'Offline',
    batchSize: '80-120',
    rating: 4.2,
  },
  {
    institute: 'Allen Career',
    type: 'Full NEET (PCB)',
    fee1Year: '1,50,000 - 2,00,000',
    fee2Year: '2,60,000 - 3,50,000',
    mode: 'Offline',
    batchSize: '60-100',
    rating: 4.3,
  },
  {
    institute: 'FIITJEE',
    type: 'Full NEET (PCB)',
    fee1Year: '1,40,000 - 1,80,000',
    fee2Year: '2,40,000 - 3,20,000',
    mode: 'Offline',
    batchSize: '40-60',
    rating: 4.1,
  },
  {
    institute: 'Physics Wallah',
    type: 'Full NEET (Online)',
    fee1Year: '25,000 - 45,000',
    fee2Year: '45,000 - 80,000',
    mode: 'Online Only',
    batchSize: '500+',
    rating: 4.4,
  },
  {
    institute: 'Unacademy',
    type: 'Full NEET (Online)',
    fee1Year: '30,000 - 60,000',
    fee2Year: '55,000 - 1,00,000',
    mode: 'Online Only',
    batchSize: '500+',
    rating: 4.0,
  },
]

const cerebrumModes = [
  {
    mode: '100% Online',
    fee: '45,000',
    features: ['Live classes from home', 'Recorded lectures', 'WhatsApp doubts', 'Digital material'],
    best: 'Gaur City, Sector 150, Greater Noida students',
    icon: Monitor,
  },
  {
    mode: 'Hybrid Mode',
    fee: '55,000',
    features: ['All online benefits', 'Weekend offline tests', 'Face-to-face doubts', 'Library access'],
    best: 'Students wanting accountability',
    icon: Building2,
    recommended: true,
  },
  {
    mode: 'Full Offline',
    fee: '65,000',
    features: ['Daily classroom', 'Small batch (15)', 'Personal attention', 'South Extension center'],
    best: 'Students preferring traditional coaching',
    icon: MapPin,
  },
]

const faqs = [
  {
    question: 'Which NEET coaching is most affordable in Noida?',
    answer: 'Online-only options like Physics Wallah (Rs 25,000-45,000) and Cerebrum Academy online (Rs 45,000) are most affordable. For Biology-only specialized coaching, Cerebrum offers the best value at Rs 45,000/year with small batches and AIIMS faculty.',
  },
  {
    question: 'Is expensive NEET coaching better?',
    answer: 'Not necessarily. Success depends on teaching quality, batch size, and your effort - not fees. Many students from Rs 45,000-65,000 programs score 650+ in NEET. Focus on faculty credentials and batch size over brand premium.',
  },
  {
    question: 'What is the fee for online NEET coaching in Noida?',
    answer: 'Online NEET coaching fees range from Rs 25,000 (Physics Wallah) to Rs 60,000 (Unacademy Plus). Cerebrum Academy specialized Biology online costs Rs 45,000/year with live classes and personal attention.',
  },
  {
    question: 'Do Noida coaching institutes offer EMI?',
    answer: 'Yes, most institutes offer EMI options. Cerebrum Academy offers 3-6 month EMI with zero interest. Major institutes like Aakash and Allen also have education loan tie-ups.',
  },
  {
    question: 'Is there scholarship available for NEET coaching in Noida?',
    answer: 'Yes! Cerebrum Academy offers up to 50% scholarship based on entrance test scores. Aakash and Allen offer 10-100% scholarships through their national scholarship tests (ANTHE, TALLENTEX).',
  },
]

export default function NEETCoachingFeeNoidaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Quick Answer - Featured Snippet */}
      <section className="bg-gradient-to-r from-green-700 to-teal-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{quickAnswer.question}</h1>
              <p className="text-lg text-green-100 leading-relaxed">{quickAnswer.answer}</p>
              <div className="mt-4 flex items-center gap-2 text-yellow-300">
                <IndianRupee className="w-5 h-5" />
                <span className="font-semibold">Quick Answer: Rs 45,000 - Rs 3,50,000/year</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">NEET Coaching Fee Comparison Noida 2026</h2>
          <p className="text-center text-gray-600 mb-8">Updated January 2026 | Verified fees from official sources</p>

          <div className="max-w-6xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="px-4 py-3 text-left">Institute</th>
                  <th className="px-4 py-3 text-left">Course Type</th>
                  <th className="px-4 py-3 text-center">1-Year Fee</th>
                  <th className="px-4 py-3 text-center">2-Year Fee</th>
                  <th className="px-4 py-3 text-center">Mode</th>
                  <th className="px-4 py-3 text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {feeComparison.map((item, index) => (
                  <tr key={index} className={`border-b ${item.highlight ? 'bg-green-50 font-medium' : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="px-4 py-4">
                      <div className="font-semibold">{item.institute}</div>
                      {item.highlight && <span className="text-xs text-green-600">Recommended for Biology</span>}
                    </td>
                    <td className="px-4 py-4 text-sm">{item.type}</td>
                    <td className="px-4 py-4 text-center">Rs {item.fee1Year}</td>
                    <td className="px-4 py-4 text-center">Rs {item.fee2Year}</td>
                    <td className="px-4 py-4 text-center text-sm">{item.mode}</td>
                    <td className="px-4 py-4 text-center">
                      <span className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {item.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Cerebrum Modes */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Cerebrum Academy Fee Options for Noida</h2>
          <p className="text-center text-gray-600 mb-12">Choose the mode that fits your learning style</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {cerebrumModes.map((item, index) => (
              <div key={index} className={`rounded-2xl p-6 ${item.recommended ? 'bg-yellow-400 relative' : 'bg-white border-2 border-gray-200'}`}>
                {item.recommended && <span className="absolute top-0 right-0 bg-green-800 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</span>}
                <item.icon className={`w-10 h-10 mb-4 ${item.recommended ? 'text-green-800' : 'text-green-600'}`} />
                <h3 className="text-xl font-bold mb-2">{item.mode}</h3>
                <p className="text-2xl font-bold mb-4">Rs {item.fee}<span className="text-sm font-normal">/year</span></p>
                <ul className="space-y-2 text-sm mb-4">
                  {item.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className={`w-4 h-4 ${item.recommended ? 'text-green-800' : 'text-green-600'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className={`text-sm ${item.recommended ? 'text-green-900' : 'text-gray-500'}`}>Best for: {item.best}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Fee-Related FAQs</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-100">
                  {faq.question}
                  <span className="text-gray-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Best Value NEET Coaching</h2>
          <p className="text-xl text-green-100 mb-8">Specialized Biology coaching at affordable fees</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
              <Phone className="w-5 h-5" />Call 88264-44334
            </a>
            <Link href="/online-neet-classes-noida" className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition">
              Explore Online Options <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Comprehensive Schema Markup */}
      <NoidaPageSchemas
        area="Noida"
        pageName="NEET Coaching Fee in Noida"
        pageDescription="Complete NEET coaching fee comparison in Noida 2026. Compare fees from Rs 45,000 to Rs 3,50,000 across institutes."
        pageUrl="https://cerebrumbiologyacademy.com/neet-coaching-fee-noida"
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'NEET Coaching Noida', url: 'https://cerebrumbiologyacademy.com/neet-coaching-noida' },
          { name: 'Fee Comparison', url: 'https://cerebrumbiologyacademy.com/neet-coaching-fee-noida' },
        ]}
        customFAQs={faqs}
      />
    </div>
  )
}
