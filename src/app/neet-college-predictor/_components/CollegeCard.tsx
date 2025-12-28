'use client'

import Link from 'next/link'
import {
  MapPin,
  Award,
  Star,
  Globe,
  Home,
  Heart,
  Scale,
  Users,
  IndianRupee,
  TrendingUp,
  Calendar,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import type { CollegeResult } from './types'
import { getChance, predictCounsellingRound, generateSlug } from './utils'
import { MAX_COMPARE } from './constants'

interface CollegeCardProps {
  result: CollegeResult
  index: number
  rank: string
  isPwD: boolean
  expandedCard: string | null
  setExpandedCard: (card: string | null) => void
  isCollegeSaved: (name: string) => boolean
  toggleSaveCollege: (name: string) => void
  isInCompareList: (result: CollegeResult) => boolean
  toggleCompare: (result: CollegeResult) => void
  compareListLength: number
}

export function CollegeCard({
  result,
  index,
  rank,
  isPwD,
  expandedCard,
  setExpandedCard,
  isCollegeSaved,
  toggleSaveCollege,
  isInCompareList,
  toggleCompare,
  compareListLength,
}: CollegeCardProps) {
  const { college, quotaType, cutoff, pwdCutoff, seats } = result
  const displayCutoff = isPwD ? pwdCutoff : cutoff
  const chance = getChance(parseInt(rank), displayCutoff)
  const prediction = predictCounsellingRound(parseInt(rank), displayCutoff)
  const isExpanded = expandedCard === `${college.name}-${quotaType}`

  return (
    <div
      key={`${college.name}-${quotaType}-${index}`}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                  quotaType === 'AIQ'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-orange-100 text-orange-800'
                }`}
              >
                {quotaType === 'AIQ' ? <Globe className="h-3 w-3" /> : <Home className="h-3 w-3" />}
                {quotaType === 'AIQ' ? 'All India' : 'State Quota'}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  college.type === 'Government'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-purple-100 text-purple-800'
                }`}
              >
                {college.type}
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                Tier {college.tier}
              </span>
              {college.nirfRank && (
                <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                  <Star className="h-3 w-3" />
                  NIRF #{college.nirfRank}
                </span>
              )}
            </div>
            <Link
              href={`/neet-college-predictor/college/${generateSlug(college.name)}`}
              className="text-lg font-bold text-gray-900 transition-colors hover:text-blue-600"
            >
              {college.name}
            </Link>
            <div className="mt-1 flex items-center gap-1 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{college.state}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => toggleSaveCollege(college.name)}
              className={`rounded-full p-2 transition-all ${
                isCollegeSaved(college.name)
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
              }`}
              title={isCollegeSaved(college.name) ? 'Remove from saved' : 'Save college'}
            >
              <Heart className={`h-4 w-4 ${isCollegeSaved(college.name) ? 'fill-red-500' : ''}`} />
            </button>
            <button
              onClick={() => toggleCompare(result)}
              disabled={!isInCompareList(result) && compareListLength >= MAX_COMPARE}
              className={`rounded-full p-2 transition-all ${
                isInCompareList(result)
                  ? 'bg-indigo-100 text-indigo-600'
                  : compareListLength >= MAX_COMPARE
                    ? 'cursor-not-allowed bg-gray-50 text-gray-300'
                    : 'bg-gray-100 text-gray-400 hover:bg-indigo-50 hover:text-indigo-500'
              }`}
              title={
                isInCompareList(result)
                  ? 'Remove from compare'
                  : compareListLength >= MAX_COMPARE
                    ? 'Max 3 colleges'
                    : 'Add to compare'
              }
            >
              <Scale className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="mb-1 flex items-center gap-1 text-xs text-gray-500">
              <TrendingUp className="h-3 w-3" />
              Cutoff Rank
            </div>
            <div className="text-lg font-bold text-gray-900">{displayCutoff.toLocaleString()}</div>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="mb-1 flex items-center gap-1 text-xs text-gray-500">
              <Award className="h-3 w-3" />
              Your Chance
            </div>
            <span className={`rounded-full px-2 py-1 text-sm font-bold ${chance.color}`}>
              {chance.level}
            </span>
          </div>
        </div>

        <button
          onClick={() => setExpandedCard(isExpanded ? null : `${college.name}-${quotaType}`)}
          className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
        >
          <span>{isExpanded ? 'Less Details' : 'More Details'}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-3 border-t pt-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="h-4 w-4" />
                <span>
                  <strong>{seats}</strong> {quotaType} Seats
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <IndianRupee className="h-4 w-4" />
                <span>{college.feeDisplay}/year</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${prediction.color}`}
                >
                  Est. {prediction.round}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="h-4 w-4" />
                <span>Total: {college.totalSeats} seats</span>
              </div>
            </div>

            <Link
              href={`/neet-college-predictor/college/${generateSlug(college.name)}`}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              View Full Details
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
