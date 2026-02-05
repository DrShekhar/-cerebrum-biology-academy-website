'use client'

import Link from 'next/link'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO, getPhoneLink } from '@/lib/constants/contactInfo'
import {
  CheckCircle,
  XCircle,
  Phone,
  Video,
  ArrowRight,
  Trophy,
  Users,
  IndianRupee,
  Target,
  MessageCircle,
  Star,
  Award,
  TrendingUp,
} from 'lucide-react'
import { CompetitorData, CEREBRUM_DATA } from './ComparisonSchema'

interface ComparisonLandingPageProps {
  competitor: CompetitorData
}

export function ComparisonLandingPage({ competitor }: ComparisonLandingPageProps) {
  const feeSavings = competitor.averageFee - CEREBRUM_DATA.averageFee
  const feeSavingsPercent = Math.round((feeSavings / competitor.averageFee) * 100)

  const comparisonTable = [
    {
      aspect: 'Batch Size',
      cerebrum: CEREBRUM_DATA.batchSize,
      competitor: competitor.batchSize,
      cerebrumWins: true,
      icon: Users,
    },
    {
      aspect: 'Annual Fee',
      cerebrum: `₹${CEREBRUM_DATA.averageFee.toLocaleString()}`,
      competitor: `₹${competitor.averageFee.toLocaleString()}`,
      cerebrumWins: CEREBRUM_DATA.averageFee < competitor.averageFee,
      icon: IndianRupee,
    },
    {
      aspect: 'Success Rate',
      cerebrum: CEREBRUM_DATA.successRate,
      competitor: competitor.successRate || 'Not disclosed',
      cerebrumWins: true,
      icon: Target,
    },
    {
      aspect: 'Faculty',
      cerebrum: 'AIIMS-trained specialist',
      competitor: 'Mixed faculty',
      cerebrumWins: true,
      icon: Award,
    },
    {
      aspect: 'Doubt Support',
      cerebrum: '24/7 WhatsApp',
      competitor: 'Limited hours',
      cerebrumWins: true,
      icon: MessageCircle,
    },
    {
      aspect: 'Learning Mode',
      cerebrum: 'Hybrid (Online + Offline)',
      competitor: competitor.type === 'city' ? 'Primarily Offline' : 'Both',
      cerebrumWins: true,
      icon: Video,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-medium">Honest Comparison 2026</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Cerebrum Biology Academy vs{' '}
              <span className="text-yellow-300">{competitor.name}</span>
            </h1>

            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Complete comparison of fees, batch size, success rate, and teaching quality.
              Make an informed decision for your NEET Biology preparation.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">₹{feeSavings.toLocaleString()}</div>
                <div className="text-sm text-green-100">You Save Per Year</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">{feeSavingsPercent}%</div>
                <div className="text-sm text-green-100">Lower Fees</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">98%</div>
                <div className="text-sm text-green-100">Our Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">15-20</div>
                <div className="text-sm text-green-100">Students Per Batch</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => trackAndOpenWhatsApp(WHATSAPP_MESSAGES.DEMO_BOOKING, `compare_${competitor.slug}_hero`)}
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105"
              >
                <Video className="w-5 h-5" />
                Book FREE Demo
              </button>
              <a
                href={getPhoneLink()}
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all"
              >
                <Phone className="w-5 h-5" />
                {CONTACT_INFO.phone.display.hyphenated.primary}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Side-by-Side Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 text-left bg-gray-100 rounded-tl-xl">Aspect</th>
                    <th className="p-4 text-center bg-green-100 text-green-800 font-bold">
                      <div className="flex items-center justify-center gap-2">
                        <Trophy className="w-5 h-5" />
                        Cerebrum
                      </div>
                    </th>
                    <th className="p-4 text-center bg-gray-100 rounded-tr-xl">
                      {competitor.name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <row.icon className="w-5 h-5 text-gray-400" />
                          <span className="font-medium text-gray-900">{row.aspect}</span>
                        </div>
                      </td>
                      <td className={`p-4 text-center ${row.cerebrumWins ? 'bg-green-50' : 'bg-white'}`}>
                        <div className="flex items-center justify-center gap-2">
                          {row.cerebrumWins && <CheckCircle className="w-5 h-5 text-green-500" />}
                          <span className={row.cerebrumWins ? 'font-semibold text-green-700' : 'text-gray-700'}>
                            {row.cerebrum}
                          </span>
                        </div>
                      </td>
                      <td className={`p-4 text-center ${!row.cerebrumWins ? 'bg-green-50' : 'bg-white'}`}>
                        <span className="text-gray-700">{row.competitor}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500 inline mr-2" />
                Cerebrum wins in 5 out of 6 key aspects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pros and Cons */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Detailed Analysis
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Cerebrum */}
              <div className="bg-white rounded-2xl shadow-sm border border-green-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Trophy className="w-6 h-6" />
                    Cerebrum Biology Academy
                  </h3>
                  <p className="text-green-100 mt-1">Recommended Choice</p>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Advantages
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {CEREBRUM_DATA.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                  <h4 className="font-semibold text-gray-500 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Limitations
                  </h4>
                  <ul className="space-y-2">
                    {CEREBRUM_DATA.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <XCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Competitor */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-900">{competitor.name}</h3>
                  <p className="text-gray-500 mt-1">{competitor.location}</p>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Advantages
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {competitor.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                  <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Disadvantages
                  </h4>
                  <ul className="space-y-2">
                    {competitor.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best For Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Which One is Right for You?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                <h3 className="font-bold text-green-800 mb-3">Choose Cerebrum if you want:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    Specialized Biology coaching (not generic PCB)
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    Personal attention in small batches
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    AIIMS-trained faculty expertise
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    Affordable fees without compromising quality
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    24/7 doubt support on WhatsApp
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3">Choose {competitor.name} if you want:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    {competitor.bestFor}
                  </li>
                  {competitor.pros.slice(0, 2).map((pro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience the Cerebrum Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Book a FREE demo class and see why students choose Cerebrum over {competitor.name}.
            No obligation, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => trackAndOpenWhatsApp(WHATSAPP_MESSAGES.DEMO_BOOKING, `compare_${competitor.slug}_footer`)}
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              Book FREE Demo on WhatsApp
            </button>
            <a
              href={getPhoneLink()}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all"
            >
              <Phone className="w-5 h-5" />
              Call: {CONTACT_INFO.phone.display.hyphenated.primary}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
