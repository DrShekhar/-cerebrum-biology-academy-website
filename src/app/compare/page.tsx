import { Metadata } from 'next'
import Link from 'next/link'
import { CEREBRUM_DATA, getAllCompetitors } from '@/components/seo/ComparisonSchema'
import { ArrowRight, Trophy, IndianRupee, Users, Target, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Coaching Comparison | Cerebrum vs Kota, Allen, Aakash | 2026 Guide',
  description:
    'Compare Cerebrum Biology Academy with Kota coaching, Allen, Aakash, and local institutes. See fees, batch sizes, success rates. Make an informed decision for NEET 2026.',
  keywords: [
    'NEET coaching comparison',
    'Cerebrum vs Kota',
    'Cerebrum vs Allen',
    'Cerebrum vs Aakash',
    'best NEET Biology coaching',
    'NEET coaching fees comparison',
    'Kota coaching alternative',
  ],
  openGraph: {
    title: 'NEET Coaching Comparison 2026',
    description: 'Compare fees, batch sizes, and success rates. Find the best NEET coaching.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/compare',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/compare',
  },
}

export default function ComparePage() {
  const competitors = getAllCompetitors()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-medium">Honest Comparisons</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              NEET Coaching Comparison 2026
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Compare Cerebrum Biology Academy with other coaching institutes.
              Transparent comparisons to help you make the right decision.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-yellow-300">98%</div>
                <div className="text-sm text-green-100">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-yellow-300">15-20</div>
                <div className="text-sm text-green-100">Batch Size</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-yellow-300">₹72K</div>
                <div className="text-sm text-green-100">Annual Fee</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-yellow-300">AIIMS</div>
                <div className="text-sm text-green-100">Faculty</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Compare with Popular Options
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Click on any comparison to see detailed analysis
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {competitors.map((competitor) => {
              const feeSavings = competitor.averageFee - CEREBRUM_DATA.averageFee
              const savingsPercent = Math.round((feeSavings / competitor.averageFee) * 100)
              return (
                <Link
                  key={competitor.slug}
                  href={`/compare/${competitor.slug}`}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                          Cerebrum vs {competitor.name.split(' ')[0]}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{competitor.location}</p>
                      </div>
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                        <ArrowRight className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-1">
                          <IndianRupee className="w-4 h-4" />Fee Savings
                        </span>
                        <span className="font-semibold text-green-600">
                          Save ₹{feeSavings.toLocaleString()} ({savingsPercent}%)
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-1">
                          <Users className="w-4 h-4" />Batch Size
                        </span>
                        <span className="text-gray-700">
                          {CEREBRUM_DATA.batchSize} vs {competitor.batchSize}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-1">
                          <Target className="w-4 h-4" />Success Rate
                        </span>
                        <span className="text-gray-700">98% vs {competitor.successRate || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 border-t border-green-100">
                    <span className="text-sm text-green-700 font-medium group-hover:text-green-800 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      View detailed comparison →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Summary Table */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Why Students Choose Cerebrum
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-4 text-left font-semibold text-gray-900">Feature</th>
                      <th className="p-4 text-center font-semibold text-green-700 bg-green-50">Cerebrum</th>
                      <th className="p-4 text-center font-semibold text-gray-600">Kota/Others</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Specialization', 'Biology-focused', 'Generic PCB'],
                      ['Faculty', 'AIIMS-trained', 'Mixed'],
                      ['Batch Size', '15-20 students', '100-200 students'],
                      ['Annual Fee', '₹72,000', '₹1.5-2 lakh'],
                      ['Success Rate', '98%', '50-70%'],
                      ['Doubt Support', '24/7 WhatsApp', 'Limited hours'],
                    ].map(([feature, cerebrum, others], i) => (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="p-4 font-medium text-gray-900">{feature}</td>
                        <td className="p-4 text-center bg-green-50 text-green-700 font-medium">{cerebrum}</td>
                        <td className="p-4 text-center text-gray-600">{others}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Experience the Difference Yourself
          </h2>
          <p className="text-green-100 mb-6 max-w-xl mx-auto">
            Book a FREE demo class and see why students choose Cerebrum.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 bg-white text-green-600 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors"
          >
            Book FREE Demo Class
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
