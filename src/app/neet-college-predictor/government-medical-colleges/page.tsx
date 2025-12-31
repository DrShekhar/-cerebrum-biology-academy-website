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

export default function GovernmentMedicalCollegesPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'cutoff' | 'fees' | 'seats'>('cutoff')

  useEffect(() => {
    async function loadColleges() {
      const data = await import('@/data/colleges.json')
      const allColleges = data.default as College[]
      const govtColleges = allColleges.filter((c) => c.type === 'Government')
      setColleges(govtColleges)
      setLoading(false)
    }
    loadColleges()
  }, [])

  const filteredColleges = useMemo(() => {
    let filtered = [...colleges]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (c) => c.name.toLowerCase().includes(query) || c.state.toLowerCase().includes(query)
      )
    }

    filtered.sort((a, b) => {
      if (sortBy === 'cutoff') return a.aiqCutoffs.general - b.aiqCutoffs.general
      if (sortBy === 'fees') return a.fees - b.fees
      return b.totalSeats - a.totalSeats
    })

    return filtered
  }, [colleges, searchQuery, sortBy])

  const stats = useMemo(() => {
    const totalSeats = colleges.reduce((sum, c) => sum + c.totalSeats, 0)
    const avgFees = colleges.length
      ? Math.round(colleges.reduce((sum, c) => sum + c.fees, 0) / colleges.length)
      : 0
    const states = new Set(colleges.map((c) => c.state)).size
    return { total: colleges.length, totalSeats, avgFees, states }
  }, [colleges])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading government colleges...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/neet-college-predictor"
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to College Predictor
        </Link>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="bg-[#4a5d4a] px-6 py-8 text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Government Medical Colleges NEET Cutoff 2024
            </h1>
            <p className="text-green-100">
              Complete list of {stats.total} government MBBS colleges with AIQ cutoffs, fees, and
              seat distribution
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <Building2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Govt Colleges</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {stats.totalSeats.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Seats</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <MapPin className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stats.states}</div>
                <div className="text-sm text-gray-600">States</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <IndianRupee className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900">
                  ~₹{(stats.avgFees / 1000).toFixed(0)}K/yr
                </div>
                <div className="text-sm text-gray-600">Avg Fees</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by college name or state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'cutoff' | 'fees' | 'seats')}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600"
              >
                <option value="cutoff">Sort by Cutoff Rank</option>
                <option value="fees">Sort by Fees (Low to High)</option>
                <option value="seats">Sort by Seats (High to Low)</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">College</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">State</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                      General Cutoff
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Est. Marks</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Seats</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Fees</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredColleges.map((college) => (
                    <tr
                      key={college.name}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <Link
                          href={`/neet-college-predictor/college/${generateSlug(college.name)}`}
                          className="font-medium text-gray-900 hover:text-green-600 transition-colors"
                        >
                          {college.name}
                        </Link>
                        {college.nirfRank && (
                          <span className="ml-2 text-xs bg-amber-100 text-yellow-700 px-2 py-0.5 rounded-full">
                            NIRF #{college.nirfRank}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{college.state}</td>
                      <td className="py-3 px-4 text-right font-semibold text-green-600">
                        {college.aiqCutoffs.general.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600">
                        ~{getMarksFromRank(college.aiqCutoffs.general)}/720
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600">{college.totalSeats}</td>
                      <td className="py-3 px-4 text-right text-gray-600">{college.feeDisplay}</td>
                      <td className="py-3 px-4 text-center">
                        <Link
                          href={`/neet-college-predictor/college/${generateSlug(college.name)}`}
                          className="text-green-600 hover:text-green-800"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredColleges.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No colleges found matching your search.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            About Government Medical Colleges in India
          </h2>
          <div className="prose prose-green max-w-none text-gray-600">
            <p>
              Government medical colleges in India offer MBBS education at highly subsidized fees,
              making them the most sought-after institutions for NEET aspirants. These colleges are
              funded by state or central governments and provide quality medical education at
              affordable costs.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 mt-4">Key Benefits:</h3>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>Low Fees:</strong> Annual fees range from ₹1,628 (AIIMS) to ₹50,000 for most
                government colleges
              </li>
              <li>
                <strong>Quality Education:</strong> Many are NIRF ranked and have excellent
                infrastructure
              </li>
              <li>
                <strong>Clinical Exposure:</strong> Attached teaching hospitals with high patient
                flow
              </li>
              <li>
                <strong>Research Opportunities:</strong> Access to research facilities and academic
                programs
              </li>
            </ul>
            <h3 className="text-lg font-semibold text-gray-900 mt-4">Admission Process:</h3>
            <p>
              Admission to government medical colleges is through NEET UG counselling. 15% of seats
              are reserved under All India Quota (AIQ) conducted by MCC, while 85% are filled
              through state counselling based on domicile.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/neet-college-predictor"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Check My NEET Rank
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
