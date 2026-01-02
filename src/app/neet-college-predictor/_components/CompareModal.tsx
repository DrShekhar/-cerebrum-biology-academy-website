'use client'

import { Scale, X } from 'lucide-react'
import type { CollegeResult } from './types'
import { getChance, predictCounsellingRound } from './utils'

interface CompareModalProps {
  compareList: CollegeResult[]
  category: string
  isPwD: boolean
  rank: string
  onClose: () => void
  onClear: () => void
  toggleCompare: (result: CollegeResult) => void
}

export function CompareModal({
  compareList,
  category,
  isPwD,
  rank,
  onClose,
  onClear,
  toggleCompare,
}: CompareModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
          <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Scale className="h-6 w-6 text-indigo-600" />
            College Comparison
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {compareList.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              No colleges selected for comparison. Click the compare icon on college cards to add
              them.
            </p>
          ) : (
            <div className="overflow-x-auto -mx-2 px-2 md:mx-0 md:px-0">
              <table className="w-full min-w-[480px] md:min-w-[600px] border-collapse text-sm md:text-base">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 text-left text-sm font-semibold text-gray-600">Feature</th>
                    {compareList.map((r) => (
                      <th
                        key={`${r.college.name}-${r.quotaType}`}
                        className="p-3 text-left text-sm font-semibold text-gray-900"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="max-w-[180px] truncate">{r.college.name}</div>
                            <span
                              className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs ${
                                r.quotaType === 'AIQ'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-orange-100 text-orange-700'
                              }`}
                            >
                              {r.quotaType}
                            </span>
                          </div>
                          <button
                            onClick={() => toggleCompare(r)}
                            className="ml-2 rounded-full p-1 text-gray-400 hover:bg-gray-100"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 text-sm font-medium text-gray-600">Type</td>
                    {compareList.map((r) => (
                      <td key={`type-${r.college.name}-${r.quotaType}`} className="p-3 text-sm">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                            r.college.type === 'Government'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {r.college.type}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 text-sm font-medium text-gray-600">State</td>
                    {compareList.map((r) => (
                      <td
                        key={`state-${r.college.name}-${r.quotaType}`}
                        className="p-3 text-sm text-gray-900"
                      >
                        {r.college.state}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-sm font-medium text-gray-600">Tier</td>
                    {compareList.map((r) => (
                      <td
                        key={`tier-${r.college.name}-${r.quotaType}`}
                        className="p-3 text-sm text-gray-900"
                      >
                        Tier {r.college.tier}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 text-sm font-medium text-gray-600">NIRF Rank</td>
                    {compareList.map((r) => (
                      <td
                        key={`nirf-${r.college.name}-${r.quotaType}`}
                        className="p-3 text-sm text-gray-900"
                      >
                        {r.college.nirfRank ? `#${r.college.nirfRank}` : 'N/A'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-sm font-medium text-gray-600">
                      Cutoff ({category.toUpperCase()}
                      {isPwD ? '-PwD' : ''})
                    </td>
                    {compareList.map((r) => {
                      const displayCutoff = isPwD ? r.pwdCutoff : r.cutoff
                      return (
                        <td
                          key={`cutoff-${r.college.name}-${r.quotaType}`}
                          className="p-3 text-sm font-bold text-gray-900"
                        >
                          {displayCutoff.toLocaleString()}
                        </td>
                      )
                    })}
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 text-sm font-medium text-gray-600">Your Chance</td>
                    {compareList.map((r) => {
                      const displayCutoff = isPwD ? r.pwdCutoff : r.cutoff
                      const chance = getChance(parseInt(rank), displayCutoff)
                      return (
                        <td key={`chance-${r.college.name}-${r.quotaType}`} className="p-3 text-sm">
                          <span className={`rounded-full px-2 py-1 font-semibold ${chance.color}`}>
                            {chance.level}
                          </span>
                        </td>
                      )
                    })}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-sm font-medium text-gray-600">Est. Round</td>
                    {compareList.map((r) => {
                      const displayCutoff = isPwD ? r.pwdCutoff : r.cutoff
                      const prediction = predictCounsellingRound(parseInt(rank), displayCutoff)
                      return (
                        <td key={`round-${r.college.name}-${r.quotaType}`} className="p-3 text-sm">
                          <span
                            className={`rounded-full px-2 py-1 font-semibold ${prediction.color}`}
                          >
                            {prediction.round}
                          </span>
                        </td>
                      )
                    })}
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 text-sm font-medium text-gray-600">Seats</td>
                    {compareList.map((r) => (
                      <td
                        key={`seats-${r.college.name}-${r.quotaType}`}
                        className="p-3 text-sm text-gray-900"
                      >
                        {r.seats}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-sm font-medium text-gray-600">Annual Fees</td>
                    {compareList.map((r) => (
                      <td
                        key={`fees-${r.college.name}-${r.quotaType}`}
                        className="p-3 text-sm text-gray-900"
                      >
                        {r.college.feeDisplay}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 border-t bg-gray-50 p-4">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClear}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
