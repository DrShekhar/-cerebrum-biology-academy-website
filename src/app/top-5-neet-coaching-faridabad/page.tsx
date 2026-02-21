import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Trophy, Star, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Top 5 NEET Coaching in Faridabad 2026 | Ranking by Results',
  description:
    'Ranked list of top 5 NEET coaching institutes in Faridabad 2026. Compare by success rate, fees, batch size. #1 Cerebrum Academy (98% rate). Call 88264-44334!',
  keywords: [
    'top 5 neet coaching faridabad',
    'best neet coaching ranking faridabad',
    'neet coaching institutes faridabad list',
    'top neet coaching centers faridabad',
    'neet coaching ranking 2026',
    'best biology coaching faridabad',
  ],
  openGraph: {
    title: 'Top 5 NEET Coaching Institutes in Faridabad 2026',
    description: 'Official ranking based on success rate, faculty, and student reviews.',
    url: 'https://cerebrumbiologyacademy.com/top-5-neet-coaching-faridabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/top-5-neet-coaching-faridabad',
  },
}

const quickAnswer = {
  question: 'Which are the top 5 NEET coaching institutes in Faridabad?',
  answer: 'The top 5 NEET coaching institutes in Faridabad 2026 are: 1) Cerebrum Biology Academy (98% success, biology specialist), 2) Velocity Institute (large network, all subjects), 3) YVS Academy (established methodology), 4) Aakash Faridabad (affordable), 5) Physics Wallah Vidyapeeth (budget-friendly). Rankings based on success rate, faculty credentials, batch size, and student reviews.',
}

const topCoachings = [
  {
    rank: 1,
    name: 'Cerebrum Biology Academy',
    type: 'Biology Specialist',
    successRate: '98%',
    batchSize: '15-20',
    fee: '₹45,000 - 65,000/year',
    faculty: 'AIIMS-trained (Dr. Shekhar Singh)',
    rating: 4.9,
    pros: ['Highest success rate', 'Small batches', 'Personal attention', 'Biology expertise'],
    cons: ['Biology only (not PCB)', 'Limited seats'],
    bestFor: 'Serious NEET aspirants wanting focused Biology preparation',
    highlight: true,
  },
  {
    rank: 2,
    name: 'Velocity Institute',
    type: 'Full NEET (PCB)',
    successRate: '82-85%',
    batchSize: '80-100',
    fee: '₹1,20,000 - 1,80,000/year',
    faculty: 'Experienced faculty team',
    rating: 4.1,
    pros: ['All subjects covered', 'Local presence', 'Study material quality', 'Good test series'],
    cons: ['Large batches', 'Expensive', 'Less personal attention'],
    bestFor: 'Students wanting complete NEET preparation under one roof',
  },
  {
    rank: 3,
    name: 'YVS Academy',
    type: 'Full NEET (PCB)',
    successRate: '78-82%',
    batchSize: '60-80',
    fee: '₹1,00,000 - 1,50,000/year',
    faculty: 'Experienced local faculty',
    rating: 4.0,
    pros: ['Established in Faridabad', 'Good results track record', 'Structured program'],
    cons: ['Large batches', 'Less flexibility', 'Average material quality'],
    bestFor: 'Students who want structured coaching with local presence',
  },
  {
    rank: 4,
    name: 'Aakash Institute Faridabad',
    type: 'Full NEET (PCB)',
    successRate: '80-85%',
    batchSize: '80-120',
    fee: '₹1,50,000 - 2,00,000/year',
    faculty: 'Aakash faculty team',
    rating: 4.2,
    pros: ['Pan-India network', 'Proven methodology', 'Strong material', 'Good infrastructure'],
    cons: ['Very large batches', 'Most expensive', 'Less personal attention'],
    bestFor: 'Students wanting national brand with standardized coaching',
  },
  {
    rank: 5,
    name: 'Physics Wallah (Vidyapeeth)',
    type: 'Full NEET (PCB)',
    successRate: '70-75%',
    batchSize: '100-150',
    fee: '₹35,000 - 50,000/year',
    faculty: 'Young dynamic team',
    rating: 4.0,
    pros: ['Very affordable', 'Good online content', 'Engaging teaching'],
    cons: ['Very large batches', 'New offline centers', 'Less personal attention'],
    bestFor: 'Budget-conscious students who learn well in large groups',
  },
]

const comparisonCriteria = [
  { criteria: 'Success Rate', weight: '30%', description: 'NEET qualification percentage of students' },
  { criteria: 'Faculty Quality', weight: '25%', description: 'Credentials, experience, teaching ability' },
  { criteria: 'Batch Size', weight: '20%', description: 'Smaller = better personal attention' },
  { criteria: 'Student Reviews', weight: '15%', description: 'Google ratings, testimonials' },
  { criteria: 'Value for Money', weight: '10%', description: 'Results relative to fees' },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in Faridabad for Biology?',
    answer: 'Cerebrum Biology Academy is the best for Biology-focused NEET preparation with 98% success rate and AIIMS-trained faculty. For complete PCB coaching, Velocity Institute and Aakash Faridabad are top choices.',
  },
  {
    question: 'How to choose the right NEET coaching in Faridabad?',
    answer: 'Consider: 1) Your budget (₹35K-2L/year range), 2) Batch size preference (15-150 students), 3) Subject focus (Biology-only vs full PCB), 4) Location convenience near Sector 17, Bata Chowk area, 5) Demo class experience. Visit top 2-3 and attend demo classes.',
  },
  {
    question: 'Is Velocity Institute or YVS Academy better for NEET in Faridabad?',
    answer: 'Both are comparable for full NEET coaching in Faridabad. Velocity has slightly better infrastructure and material. YVS brings established local reputation. Choose based on demo class experience and batch timing that suits you.',
  },
  {
    question: 'What is the fee difference between top NEET coachings in Faridabad?',
    answer: 'Fees range from ₹35,000 (Physics Wallah) to ₹2,00,000 (Aakash) per year. Cerebrum offers mid-range ₹45,000-65,000 for biology-only but highest success rate. More expensive doesn\'t mean better results.',
  },
]

export default function Top5NEETCoachingFaridabad() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Quick Answer */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{quickAnswer.question}</h1>
              <p className="text-lg text-amber-100 leading-relaxed">{quickAnswer.answer}</p>
              <div className="mt-4 flex items-center gap-2 text-yellow-300">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">#1 Cerebrum (98%) | #2 Velocity (85%) | #3 YVS (82%)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ranking Criteria */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-center mb-4">Ranking Methodology</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {comparisonCriteria.map((item, index) => (
              <div key={index} className="bg-amber-50 px-4 py-2 rounded-lg text-sm">
                <span className="font-semibold">{item.criteria}</span>
                <span className="text-amber-600 ml-2">({item.weight})</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rankings List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Top 5 NEET Coaching in Faridabad 2026</h2>
          <p className="text-center text-gray-600 mb-12">Updated January 2026 | Based on 2025 results and student feedback</p>

          <div className="max-w-4xl mx-auto space-y-6">
            {topCoachings.map((coaching) => (
              <div key={coaching.rank} className={`bg-white rounded-2xl shadow-lg overflow-hidden ${coaching.highlight ? 'ring-2 ring-amber-500' : ''}`}>
                <div className={`p-4 ${coaching.highlight ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gray-100'} ${coaching.highlight ? 'text-white' : 'text-gray-800'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${coaching.highlight ? 'bg-white text-amber-600' : 'bg-amber-500 text-white'}`}>
                        #{coaching.rank}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{coaching.name}</h3>
                        <p className={coaching.highlight ? 'text-amber-100' : 'text-gray-600'}>{coaching.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className={`w-5 h-5 ${coaching.highlight ? 'text-yellow-300' : 'text-yellow-500'} fill-current`} />
                        <span className="font-bold">{coaching.rating}</span>
                      </div>
                      {coaching.highlight && <span className="text-xs bg-white/20 px-2 py-1 rounded">RECOMMENDED</span>}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{coaching.successRate}</p>
                      <p className="text-xs text-gray-600">Success Rate</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-lg font-bold text-blue-600">{coaching.batchSize}</p>
                      <p className="text-xs text-gray-600">Batch Size</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-bold text-purple-600">{coaching.fee}</p>
                      <p className="text-xs text-gray-600">Annual Fee</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700">{coaching.faculty}</p>
                      <p className="text-xs text-gray-600">Faculty</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Pros</h4>
                      <ul className="space-y-1">
                        {coaching.pros.map((pro, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-700 mb-2">Cons</h4>
                      <ul className="space-y-1">
                        {coaching.cons.map((con, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-4 h-4 rounded-full bg-red-200 flex items-center justify-center text-xs text-red-600">!</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <span className="font-semibold text-blue-800">Best For: </span>
                    <span className="text-blue-700">{coaching.bestFor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Quick Comparison Table</h2>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-amber-600 text-white">
                  <th className="px-4 py-3 text-left">Institute</th>
                  <th className="px-4 py-3 text-center">Success Rate</th>
                  <th className="px-4 py-3 text-center">Batch Size</th>
                  <th className="px-4 py-3 text-center">Fee/Year</th>
                  <th className="px-4 py-3 text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {topCoachings.map((coaching, index) => (
                  <tr key={index} className={coaching.highlight ? 'bg-amber-50 font-medium' : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 border-b">
                      <span className="font-semibold">#{coaching.rank} {coaching.name}</span>
                    </td>
                    <td className="px-4 py-3 border-b text-center font-bold text-green-600">{coaching.successRate}</td>
                    <td className="px-4 py-3 border-b text-center">{coaching.batchSize}</td>
                    <td className="px-4 py-3 border-b text-center text-sm">{coaching.fee}</td>
                    <td className="px-4 py-3 border-b text-center">
                      <span className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {coaching.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                  <span className="text-amber-600 group-open:rotate-180 transition-transform">&#9660;</span>
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
          <h2 className="text-2xl font-bold text-center mb-8">Related Comparisons</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link href="/how-much-fees-for-neet-coaching-faridabad" className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition text-center">
              <h3 className="font-semibold text-green-800">Fee Comparison</h3>
              <p className="text-sm text-gray-600">Detailed fee breakdown</p>
            </Link>
            <Link href="/neet-coaching-faridabad" className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition text-center">
              <h3 className="font-semibold text-purple-800">NEET Coaching Hub</h3>
              <p className="text-sm text-gray-600">All programs</p>
            </Link>
            <Link href="/online-neet-classes-faridabad" className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition text-center">
              <h3 className="font-semibold text-blue-800">Online Classes</h3>
              <p className="text-sm text-gray-600">Study from home</p>
            </Link>
            <Link href="/free-neet-demo-class-faridabad" className="bg-amber-50 p-4 rounded-lg hover:bg-amber-100 transition text-center">
              <h3 className="font-semibold text-amber-800">Free Demo</h3>
              <p className="text-sm text-gray-600">Try #1 ranked coaching</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join #1 Ranked NEET Coaching in Faridabad</h2>
          <p className="text-xl text-amber-100 mb-8">98% success rate. Small batches. AIIMS faculty. Sector 17, Faridabad.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition">
              <Phone className="w-5 h-5" />Call 88264-44334
            </a>
            <Link href="/neet-coaching-faridabad" className="inline-flex items-center gap-2 bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-900 transition">
              View Details<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Top 5 NEET Coaching Institutes in Faridabad 2026',
        description: quickAnswer.answer,
        itemListElement: topCoachings.map((coaching) => ({
          '@type': 'ListItem',
          position: coaching.rank,
          item: {
            '@type': 'EducationalOrganization',
            name: coaching.name,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: coaching.rating,
              bestRating: 5,
            },
          },
        })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer }
        })),
      }) }} />
    </div>
  )
}
