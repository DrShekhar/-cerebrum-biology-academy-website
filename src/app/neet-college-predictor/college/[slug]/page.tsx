'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  MapPin,
  Building2,
  Award,
  Users,
  IndianRupee,
  GraduationCap,
  TrendingUp,
  ChevronRight,
  Info,
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
    general_pwd?: number
    ews_pwd?: number
    obc_pwd?: number
    sc_pwd?: number
    st_pwd?: number
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
  if (rankNum <= 500000) return 450 - Math.round((rankNum - 300000) / 4000)
  if (rankNum <= 750000) return 400 - Math.round((rankNum - 500000) / 5000)
  return Math.max(0, 350 - Math.round((rankNum - 750000) / 6000))
}

function formatRank(rank: number): string {
  return rank.toLocaleString('en-IN')
}

export default function CollegeProfilePage() {
  const params = useParams()
  const slug = params.slug as string
  const [college, setCollege] = useState<College | null>(null)
  const [allColleges, setAllColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCollege() {
      try {
        const data = await import('@/data/colleges.json')
        const colleges = data.default as College[]
        setAllColleges(colleges)

        const foundCollege = colleges.find((c) => generateSlug(c.name) === slug)

        if (foundCollege) {
          setCollege(foundCollege)
        } else {
          setError('College not found')
        }
      } catch {
        setError('Failed to load college data')
      } finally {
        setLoading(false)
      }
    }

    loadCollege()
  }, [slug])

  const similarColleges = useMemo(() => {
    if (!college || allColleges.length === 0) return []

    return allColleges
      .filter((c) => {
        if (c.name === college.name) return false
        const sameState = c.state === college.state
        const sameTier = c.tier === college.tier
        const sameType = c.type === college.type
        return sameState || sameTier || sameType
      })
      .sort((a, b) => {
        let scoreA = 0
        let scoreB = 0
        if (a.state === college.state) scoreA += 3
        if (b.state === college.state) scoreB += 3
        if (a.tier === college.tier) scoreA += 2
        if (b.tier === college.tier) scoreB += 2
        if (a.type === college.type) scoreA += 1
        if (b.type === college.type) scoreB += 1
        return scoreB - scoreA
      })
      .slice(0, 5)
  }, [college, allColleges])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading college details...</p>
        </div>
      </div>
    )
  }

  if (error || !college) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">College Not Found</h1>
          <p className="text-gray-600 mb-6">
            The college you&apos;re looking for doesn&apos;t exist or the URL is incorrect.
          </p>
          <Link
            href="/neet-college-predictor"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to College Predictor
          </Link>
        </div>
      </div>
    )
  }

  const tierLabels: Record<number, string> = {
    1: 'Tier 1 - Top Medical College',
    2: 'Tier 2 - Excellent Medical College',
    3: 'Tier 3 - Good Medical College',
    4: 'Tier 4 - Standard Medical College',
  }

  const tierColors: Record<number, string> = {
    1: 'bg-purple-100 text-purple-800 border-purple-200',
    2: 'bg-blue-100 text-blue-800 border-blue-200',
    3: 'bg-green-100 text-green-800 border-green-200',
    4: 'bg-gray-100 text-gray-800 border-gray-200',
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link
          href="/neet-college-predictor"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to College Predictor
        </Link>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="bg-blue-600 px-6 py-8 text-white">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{college.name}</h1>
                <div className="flex items-center gap-4 text-blue-100 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {college.state}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {college.type}
                  </span>
                  {college.nirfRank && (
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      NIRF Rank #{college.nirfRank}
                    </span>
                  )}
                </div>
              </div>
              <div
                className={`px-4 py-2 rounded-lg border ${tierColors[college.tier]} text-sm font-medium`}
              >
                {tierLabels[college.tier]}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{college.totalSeats}</div>
                <div className="text-sm text-gray-600">Total Seats</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <GraduationCap className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{college.aiqSeats}</div>
                <div className="text-sm text-gray-600">AIQ Seats</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{college.stateSeats}</div>
                <div className="text-sm text-gray-600">State Quota</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <IndianRupee className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900">{college.feeDisplay}</div>
                <div className="text-sm text-gray-600">Annual Fee</div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                AIQ Cutoff Ranks (NEET 2024)
              </h2>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Category
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">
                          Cutoff Rank
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">
                          Est. Marks
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-100">
                        <td className="py-3 px-4 font-medium">General</td>
                        <td className="py-3 px-4 text-right font-semibold text-blue-600">
                          {formatRank(college.aiqCutoffs.general)}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-600">
                          ~{getMarksFromRank(college.aiqCutoffs.general)}/720
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-100">
                        <td className="py-3 px-4 font-medium">EWS</td>
                        <td className="py-3 px-4 text-right font-semibold text-blue-600">
                          {formatRank(college.aiqCutoffs.ews)}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-600">
                          ~{getMarksFromRank(college.aiqCutoffs.ews)}/720
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-100">
                        <td className="py-3 px-4 font-medium">OBC</td>
                        <td className="py-3 px-4 text-right font-semibold text-blue-600">
                          {formatRank(college.aiqCutoffs.obc)}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-600">
                          ~{getMarksFromRank(college.aiqCutoffs.obc)}/720
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-100">
                        <td className="py-3 px-4 font-medium">SC</td>
                        <td className="py-3 px-4 text-right font-semibold text-blue-600">
                          {formatRank(college.aiqCutoffs.sc)}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-600">
                          ~{getMarksFromRank(college.aiqCutoffs.sc)}/720
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100">
                        <td className="py-3 px-4 font-medium">ST</td>
                        <td className="py-3 px-4 text-right font-semibold text-blue-600">
                          {formatRank(college.aiqCutoffs.st)}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-600">
                          ~{getMarksFromRank(college.aiqCutoffs.st)}/720
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {college.aiqCutoffs.general_pwd && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">PwD Category Cutoffs</h2>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">
                            Category
                          </th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-700">
                            Cutoff Rank
                          </th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-700">
                            Est. Marks
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {college.aiqCutoffs.general_pwd && (
                          <tr className="border-b border-gray-100 hover:bg-gray-100">
                            <td className="py-3 px-4 font-medium">General PwD</td>
                            <td className="py-3 px-4 text-right font-semibold text-blue-600">
                              {formatRank(college.aiqCutoffs.general_pwd)}
                            </td>
                            <td className="py-3 px-4 text-right text-gray-600">
                              ~{getMarksFromRank(college.aiqCutoffs.general_pwd)}/720
                            </td>
                          </tr>
                        )}
                        {college.aiqCutoffs.ews_pwd && (
                          <tr className="border-b border-gray-100 hover:bg-gray-100">
                            <td className="py-3 px-4 font-medium">EWS PwD</td>
                            <td className="py-3 px-4 text-right font-semibold text-blue-600">
                              {formatRank(college.aiqCutoffs.ews_pwd)}
                            </td>
                            <td className="py-3 px-4 text-right text-gray-600">
                              ~{getMarksFromRank(college.aiqCutoffs.ews_pwd)}/720
                            </td>
                          </tr>
                        )}
                        {college.aiqCutoffs.obc_pwd && (
                          <tr className="border-b border-gray-100 hover:bg-gray-100">
                            <td className="py-3 px-4 font-medium">OBC PwD</td>
                            <td className="py-3 px-4 text-right font-semibold text-blue-600">
                              {formatRank(college.aiqCutoffs.obc_pwd)}
                            </td>
                            <td className="py-3 px-4 text-right text-gray-600">
                              ~{getMarksFromRank(college.aiqCutoffs.obc_pwd)}/720
                            </td>
                          </tr>
                        )}
                        {college.aiqCutoffs.sc_pwd && (
                          <tr className="border-b border-gray-100 hover:bg-gray-100">
                            <td className="py-3 px-4 font-medium">SC PwD</td>
                            <td className="py-3 px-4 text-right font-semibold text-blue-600">
                              {formatRank(college.aiqCutoffs.sc_pwd)}
                            </td>
                            <td className="py-3 px-4 text-right text-gray-600">
                              ~{getMarksFromRank(college.aiqCutoffs.sc_pwd)}/720
                            </td>
                          </tr>
                        )}
                        {college.aiqCutoffs.st_pwd && (
                          <tr className="hover:bg-gray-100">
                            <td className="py-3 px-4 font-medium">ST PwD</td>
                            <td className="py-3 px-4 text-right font-semibold text-blue-600">
                              {formatRank(college.aiqCutoffs.st_pwd)}
                            </td>
                            <td className="py-3 px-4 text-right text-gray-600">
                              ~{getMarksFromRank(college.aiqCutoffs.st_pwd)}/720
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {college.stateCutoffs && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">State Quota Cutoffs</h2>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">
                            Category
                          </th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-700">
                            Cutoff Rank
                          </th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-700">
                            Est. Marks
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 hover:bg-gray-100">
                          <td className="py-3 px-4 font-medium">General</td>
                          <td className="py-3 px-4 text-right font-semibold text-green-600">
                            {formatRank(college.stateCutoffs.general)}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">
                            ~{getMarksFromRank(college.stateCutoffs.general)}/720
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-100">
                          <td className="py-3 px-4 font-medium">EWS</td>
                          <td className="py-3 px-4 text-right font-semibold text-green-600">
                            {formatRank(college.stateCutoffs.ews)}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">
                            ~{getMarksFromRank(college.stateCutoffs.ews)}/720
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-100">
                          <td className="py-3 px-4 font-medium">OBC</td>
                          <td className="py-3 px-4 text-right font-semibold text-green-600">
                            {formatRank(college.stateCutoffs.obc)}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">
                            ~{getMarksFromRank(college.stateCutoffs.obc)}/720
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-100">
                          <td className="py-3 px-4 font-medium">SC</td>
                          <td className="py-3 px-4 text-right font-semibold text-green-600">
                            {formatRank(college.stateCutoffs.sc)}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">
                            ~{getMarksFromRank(college.stateCutoffs.sc)}/720
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-100">
                          <td className="py-3 px-4 font-medium">ST</td>
                          <td className="py-3 px-4 text-right font-semibold text-green-600">
                            {formatRank(college.stateCutoffs.st)}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">
                            ~{getMarksFromRank(college.stateCutoffs.st)}/720
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Key Takeaways</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>
                    To get admission in <strong>{college.name}</strong> under General category
                    (AIQ), you need a NEET rank of{' '}
                    <strong>{formatRank(college.aiqCutoffs.general)}</strong> or better
                    (approximately <strong>{getMarksFromRank(college.aiqCutoffs.general)}</strong>{' '}
                    marks out of 720).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>
                    The college has <strong>{college.totalSeats} total seats</strong>, with{' '}
                    {college.aiqSeats} seats available through All India Quota.
                  </span>
                </li>
                {college.type === 'Government' && (
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>
                      As a <strong>government college</strong>, {college.name} offers affordable
                      education at just <strong>{college.feeDisplay}</strong> per year.
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {similarColleges.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Similar Colleges</h2>
              <p className="text-sm text-gray-600">
                Explore other medical colleges you might be interested in
              </p>
            </div>
            <div className="divide-y divide-gray-100">
              {similarColleges.map((c) => (
                <Link
                  key={c.name}
                  href={`/neet-college-predictor/college/${generateSlug(c.name)}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <div className="font-medium text-gray-900">{c.name}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {c.state} • {c.type}
                      {c.nirfRank && <span>• NIRF #{c.nirfRank}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-600">
                      General: {formatRank(c.aiqCutoffs.general)}
                    </div>
                    <div className="text-xs text-gray-500">{c.feeDisplay}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Want to check your chances of admission? Use our NEET College Predictor tool.
          </p>
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
