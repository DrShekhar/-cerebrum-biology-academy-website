'use client'

import React from 'react'
import { BookOpen, Clock, RefreshCw, CheckCircle, Timer, Archive } from 'lucide-react'
import type { SolutionReleaseSettings } from '../types'

interface SolutionsTabProps {
  solutionSettings: SolutionReleaseSettings
  setSolutionSettings: React.Dispatch<React.SetStateAction<SolutionReleaseSettings>>
  loading: boolean
  releaseSolutions: () => void
}

export function SolutionsTab({
  solutionSettings,
  setSolutionSettings,
  loading,
  releaseSolutions,
}: SolutionsTabProps) {
  return (
    <div
      key="solutions"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeInUp"
    >
      <div className="bg-white rounded-xl p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Solution Release Configuration
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Release Type</label>
            <select
              value={solutionSettings.releaseType}
              onChange={(e) =>
                setSolutionSettings((prev) => ({
                  ...prev,
                  releaseType: e.target.value as SolutionReleaseSettings['releaseType'],
                }))
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="immediate">Immediate Release</option>
              <option value="scheduled">Scheduled Release</option>
              <option value="manual">Manual Release</option>
            </select>
          </div>

          {solutionSettings.releaseType === 'scheduled' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Release Date</label>
                <input
                  type="date"
                  value={solutionSettings.releaseDate || ''}
                  onChange={(e) =>
                    setSolutionSettings((prev) => ({ ...prev, releaseDate: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Release Time</label>
                <input
                  type="time"
                  value={solutionSettings.releaseTime || ''}
                  onChange={(e) =>
                    setSolutionSettings((prev) => ({ ...prev, releaseTime: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Level</label>
            <select
              value={solutionSettings.contentLevel}
              onChange={(e) =>
                setSolutionSettings((prev) => ({
                  ...prev,
                  contentLevel: e.target.value as SolutionReleaseSettings['contentLevel'],
                }))
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="answers">Answers Only</option>
              <option value="explanations">With Explanations</option>
              <option value="detailed">Detailed Solutions</option>
              <option value="complete">Complete Analysis</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Distribution Method
            </label>
            <select
              value={solutionSettings.distributionMethod}
              onChange={(e) =>
                setSolutionSettings((prev) => ({
                  ...prev,
                  distributionMethod: e.target
                    .value as SolutionReleaseSettings['distributionMethod'],
                }))
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="platform">Platform Only</option>
              <option value="email">Email Delivery</option>
              <option value="download">Download Link</option>
              <option value="all">All Methods</option>
            </select>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Access Control</h4>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={solutionSettings.accessControl.requireCompletion}
                onChange={(e) =>
                  setSolutionSettings((prev) => ({
                    ...prev,
                    accessControl: {
                      ...prev.accessControl,
                      requireCompletion: e.target.checked,
                    },
                  }))
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Require test completion</span>
            </label>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Score Required (%)
              </label>
              <input
                type="number"
                value={solutionSettings.accessControl.minimumScore}
                onChange={(e) =>
                  setSolutionSettings((prev) => ({
                    ...prev,
                    accessControl: {
                      ...prev.accessControl,
                      minimumScore: parseInt(e.target.value),
                    },
                  }))
                }
                min="0"
                max="100"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wait Period After Completion (hours)
              </label>
              <input
                type="number"
                value={solutionSettings.accessControl.waitPeriod}
                onChange={(e) =>
                  setSolutionSettings((prev) => ({
                    ...prev,
                    accessControl: {
                      ...prev.accessControl,
                      waitPeriod: parseInt(e.target.value),
                    },
                  }))
                }
                min="0"
                max="168"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={releaseSolutions}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Releasing...
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4" />
                Release Solutions
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          Release Timeline
        </h3>

        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-600 rounded-full" />
              <div className="flex-1">
                <div className="font-medium text-green-800">Test Published</div>
                <div className="text-sm text-green-600">January 16, 2024 at 3:00 PM</div>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <div className="flex-1">
                <div className="font-medium text-blue-800">Test Completion Deadline</div>
                <div className="text-sm text-blue-600">January 18, 2024 at 11:59 PM</div>
              </div>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>

            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
              <div className="w-3 h-3 bg-amber-500 rounded-full" />
              <div className="flex-1">
                <div className="font-medium text-yellow-800">Solutions Release</div>
                <div className="text-sm text-yellow-600">January 19, 2024 at 9:00 AM</div>
              </div>
              <Timer className="w-5 h-5 text-yellow-600" />
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-3 h-3 bg-gray-400 rounded-full" />
              <div className="flex-1">
                <div className="font-medium text-gray-800">Archive Test</div>
                <div className="text-sm text-gray-600">January 26, 2024 at 12:00 AM</div>
              </div>
              <Archive className="w-5 h-5 text-gray-600" />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Release Statistics</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-blue-600">Eligible Students</div>
                <div className="font-bold">214</div>
              </div>
              <div>
                <div className="text-blue-600">Access Granted</div>
                <div className="font-bold">187</div>
              </div>
              <div>
                <div className="text-blue-600">Downloaded</div>
                <div className="font-bold">156</div>
              </div>
              <div>
                <div className="text-blue-600">Viewed Online</div>
                <div className="font-bold">201</div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Content Levels</h4>
            <div className="text-sm text-green-700 space-y-1">
              <div>
                <strong>Answers:</strong> Correct options only
              </div>
              <div>
                <strong>Explanations:</strong> Why the answer is correct
              </div>
              <div>
                <strong>Detailed:</strong> Step-by-step solutions
              </div>
              <div>
                <strong>Complete:</strong> Full analysis with tips
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
