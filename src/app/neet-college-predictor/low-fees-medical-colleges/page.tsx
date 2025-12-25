'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  MapPin,
  Building2,
  Award,
  Users,
  IndianRupee,
  Search,
  ChevronRight,
  Sparkles,
} from 'lucide-react'

interface College {
  name: string
  state: string
  type: 'Government' | 'Private' | 'Deemed'
  quotaType: 'AIQ_Only' | 'AIQ_and_State'
  tier: number
  totalSeats: number
  aiqSeats: number
  stateSeats: number
  nirfRank: number | null
  aiqCutoffs: {
    general: number
    ews: number
    obc: number
    sc: number
    st: number
  }
  stateCutoffs: {
    general: number
    ews: number
    obc: number
    sc: number
    st: number
  } | null
  fees: number
  feeDisplay: string
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function getMarksFromRank(rankNum: number): number {
  if (rankNum <= 1) return 720
  if (rankNum <= 10) return 720 - Math.round((rankNum - 1) / 2)
  if (rankNum <= 100) return 715 - Math.round((rankNum - 10) / 6)
  if (rankNum <= 1100) return 700 - Math.round((rankNum - 100) / 50)
  if (rankNum <= 5000) return 680 - Math.round((rankNum - 1100) / 130)
  if (rankNum <= 25000) return 650 - Math.round((rankNum - 5000) / 400)
  if (rankNum <= 70000) return 600 - Math.round((rankNum - 25000) / 900)
  if (rankNum <= 150000) return 550 - Math.round((rankNum - 70000) / 1600)
  if (rankNum <= 300000) return 500 - Math.round((rankNum - 150000) / 3000)
  return Math.max(350, 450 - Math.round((rankNum - 300000) / 4000))
}

function getFeeCategory(fees: number): { label: string; color: string } {
  if (fees <= 10000) return { label: 'Ultra Low', color: 'bg-green-100 text-green-800' }
  if (fees <= 50000) return { label: 'Very Low', color: 'bg-green-100 text-green-700' }
  if (fees <= 200000) return { label: 'Low', color: 'bg-blue-100 text-blue-700' }
  if (fees <= 500000) return { label: 'Moderate', color: 'bg-yellow-100 text-yellow-700' }
  return { label: 'High', color: 'bg-orange-100 text-orange-700' }
}

export default function LowFeesMedicalCollegesPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [feeFilter, setFeeFilter] = useState<string>('all')

  useEffect(() => {
    async function loadColleges() {
      const data = await import('@/data/colleges.json')
      const allColleges = data.default as College[]
      const sortedByFees = allColleges.sort((a, b) => a.fees - b.fees)
      setColleges(sortedByFees)
      setLoading(false)
    }
    loadColleges()
  }, [])

  const filteredColleges = useMemo(() => {
    let filtered = [...colleges]

    if (feeFilter === 'under10k') filtered = filtered.filter((c) => c.fees <= 10000)
    else if (feeFilter === 'under50k') filtered = filtered.filter((c) => c.fees <= 50000)
    else if (feeFilter === 'under2L') filtered = filtered.filter((c) => c.fees <= 200000)
    else if (feeFilter === 'under5L') filtered = filtered.filter((c) => c.fees <= 500000)

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (c) => c.name.toLowerCase().includes(query) || c.state.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [colleges, searchQuery, feeFilter])

  const feeRangeStats = useMemo(() => {
    return {
      under10k: colleges.filter((c) => c.fees <= 10000).length,
      under50k: colleges.filter((c) => c.fees <= 50000).length,
      under2L: colleges.filter((c) => c.fees <= 200000).length,
      under5L: colleges.filter((c) => c.fees <= 500000).length,
    }
  }, [colleges])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading affordable colleges...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/neet-college-predictor"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to College Predictor
        </Link>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6" />
              <span className="text-blue-200 text-sm font-medium">Budget-Friendly Options</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Low Fees Medical Colleges in India 2024
            </h1>
            <p className="text-blue-100">
              Affordable MBBS colleges sorted by fees - from ₹1,628/year to premium institutions
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <button
                onClick={() => setFeeFilter('under10k')}
                className={`rounded-xl p-4 text-center transition-all ${
                  feeFilter === 'under10k'
                    ? 'bg-green-600 text-white ring-2 ring-green-600 ring-offset-2'
                    : 'bg-green-50 hover:bg-green-100'
                }`}
              >
                <IndianRupee
                  className={`w-6 h-6 mx-auto mb-2 ${feeFilter === 'under10k' ? 'text-white' : 'text-green-600'}`}
                />
                <div
                  className={`text-xl font-bold ${feeFilter === 'under10k' ? 'text-white' : 'text-gray-900'}`}
                >
                  {feeRangeStats.under10k}
                </div>
                <div
                  className={`text-sm ${feeFilter === 'under10k' ? 'text-green-100' : 'text-gray-600'}`}
                >
                  Under ₹10K/yr
                </div>
              </button>
              <button
                onClick={() => setFeeFilter('under50k')}
                className={`rounded-xl p-4 text-center transition-all ${
                  feeFilter === 'under50k'
                    ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2'
                    : 'bg-blue-50 hover:bg-blue-100'
                }`}
              >
                <IndianRupee
                  className={`w-6 h-6 mx-auto mb-2 ${feeFilter === 'under50k' ? 'text-white' : 'text-blue-600'}`}
                />
                <div
                  className={`text-xl font-bold ${feeFilter === 'under50k' ? 'text-white' : 'text-gray-900'}`}
                >
                  {feeRangeStats.under50k}
                </div>
                <div
                  className={`text-sm ${feeFilter === 'under50k' ? 'text-blue-100' : 'text-gray-600'}`}
                >
                  Under ₹50K/yr
                </div>
              </button>
              <button
                onClick={() => setFeeFilter('under2L')}
                className={`rounded-xl p-4 text-center transition-all ${
                  feeFilter === 'under2L'
                    ? 'bg-purple-600 text-white ring-2 ring-purple-600 ring-offset-2'
                    : 'bg-purple-50 hover:bg-purple-100'
                }`}
              >
                <IndianRupee
                  className={`w-6 h-6 mx-auto mb-2 ${feeFilter === 'under2L' ? 'text-white' : 'text-purple-600'}`}
                />
                <div
                  className={`text-xl font-bold ${feeFilter === 'under2L' ? 'text-white' : 'text-gray-900'}`}
                >
                  {feeRangeStats.under2L}
                </div>
                <div
                  className={`text-sm ${feeFilter === 'under2L' ? 'text-purple-100' : 'text-gray-600'}`}
                >
                  Under ₹2L/yr
                </div>
              </button>
              <button
                onClick={() => setFeeFilter('all')}
                className={`rounded-xl p-4 text-center transition-all ${
                  feeFilter === 'all'
                    ? 'bg-gray-800 text-white ring-2 ring-gray-800 ring-offset-2'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <Building2
                  className={`w-6 h-6 mx-auto mb-2 ${feeFilter === 'all' ? 'text-white' : 'text-gray-600'}`}
                />
                <div
                  className={`text-xl font-bold ${feeFilter === 'all' ? 'text-white' : 'text-gray-900'}`}
                >
                  {colleges.length}
                </div>
                <div
                  className={`text-sm ${feeFilter === 'all' ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  All Colleges
                </div>
              </button>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by college name or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">College</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">State</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                      Annual Fees
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                      General Cutoff
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Seats</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredColleges.slice(0, 50).map((college, index) => (
                    <tr
                      key={college.name}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-start gap-2">
                          <span className="text-gray-400 text-xs font-medium mt-1">
                            #{index + 1}
                          </span>
                          <div>
                            <Link
                              href={`/neet-college-predictor/college/${generateSlug(college.name)}`}
                              className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                            >
                              {college.name}
                            </Link>
                            {college.nirfRank && (
                              <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                NIRF #{college.nirfRank}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            college.type === 'Government'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {college.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{college.state}</td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`font-semibold ${getFeeCategory(college.fees).color} px-2 py-1 rounded text-xs`}
                        >
                          {college.feeDisplay}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-blue-600">
                        {college.aiqCutoffs.general.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600">{college.totalSeats}</td>
                      <td className="py-3 px-4 text-center">
                        <Link
                          href={`/neet-college-predictor/college/${generateSlug(college.name)}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredColleges.length > 50 && (
              <div className="text-center mt-4 text-gray-500 text-sm">
                Showing 50 of {filteredColleges.length} colleges. Use filters to narrow down.
              </div>
            )}

            {filteredColleges.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No colleges found matching your criteria.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            How to Choose a Low-Fees Medical College
          </h2>
          <div className="prose prose-blue max-w-none text-gray-600">
            <p>
              Finding an affordable medical college in India requires balancing cost with quality.
              Government colleges offer the best value with fees as low as ₹1,628/year (AIIMS), but
              have competitive cutoffs.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 mt-4">Fee Categories:</h3>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>Ultra Low (Under ₹10K/year):</strong> AIIMS, JIPMER, and some state
                government colleges
              </li>
              <li>
                <strong>Very Low (₹10K - ₹50K/year):</strong> Most state government medical colleges
              </li>
              <li>
                <strong>Low (₹50K - ₹2L/year):</strong> Select government and some private colleges
              </li>
              <li>
                <strong>Moderate (₹2L - ₹5L/year):</strong> Private/deemed universities with
                scholarships
              </li>
            </ul>
            <h3 className="text-lg font-semibold text-gray-900 mt-4">Tips:</h3>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                Focus on government colleges for lowest fees with best quality - target NEET rank
                under 50,000
              </li>
              <li>
                Consider state quota if you have domicile - easier admission with similar low fees
              </li>
              <li>Many private colleges offer merit scholarships that reduce effective fees</li>
              <li>
                Factor in hostel, mess, and other costs when comparing - sometimes bundle deals are
                better
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/neet-college-predictor"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Check My NEET Rank
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
