'use client'

import React from 'react'
import { RotateCcw, Users, RefreshCw } from 'lucide-react'
import type { RegradeOptions } from '../types'

interface RegradeTabProps {
  regradeOptions: RegradeOptions
  setRegradeOptions: React.Dispatch<React.SetStateAction<RegradeOptions>>
  loading: boolean
  initiateRegrade: () => void
}

export function RegradeTab({
  regradeOptions,
  setRegradeOptions,
  loading,
  initiateRegrade,
}: RegradeTabProps) {
  return (
    <div
      key="regrade"
      className="space-y-6 animate-fadeInUp"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-red-600" />
            Regrade Configuration
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Regrade Type</label>
              <select
                value={regradeOptions.regradeType}
                onChange={(e) =>
                  setRegradeOptions((prev) => ({
                    ...prev,
                    regradeType: e.target.value as RegradeOptions['regradeType'],
                  }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="partial">Partial Regrade</option>
                <option value="complete">Complete Regrade</option>
                <option value="specific_questions">Specific Questions</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Regrade
              </label>
              <textarea
                value={regradeOptions.reason}
                onChange={(e) => setRegradeOptions((prev) => ({ ...prev, reason: e.target.value }))}
                rows={3}
                placeholder="Describe the reason for regrade..."
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Regrade Deadline
              </label>
              <input
                type="datetime-local"
                value={regradeOptions.deadline}
                onChange={(e) =>
                  setRegradeOptions((prev) => ({ ...prev, deadline: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={regradeOptions.notifyStudents}
                  onChange={(e) =>
                    setRegradeOptions((prev) => ({
                      ...prev,
                      notifyStudents: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">Notify students</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={regradeOptions.preserveOriginalScores}
                  onChange={(e) =>
                    setRegradeOptions((prev) => ({
                      ...prev,
                      preserveOriginalScores: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">Preserve original scores</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={regradeOptions.approvalRequired}
                  onChange={(e) =>
                    setRegradeOptions((prev) => ({
                      ...prev,
                      approvalRequired: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">Require approval</span>
              </label>
            </div>

            <button
              onClick={initiateRegrade}
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Processing Regrade...
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4" />
                  Start Regrade
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-600" />
            Affected Students
          </h3>

          <div className="space-y-4">
            {regradeOptions.affectedStudents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No regrade results yet</p>
                <p className="text-sm">Students affected by regrade will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {regradeOptions.affectedStudents.map((student) => (
                  <div key={student.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{student.name}</h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.improvement > 0
                            ? 'bg-green-100 text-green-600'
                            : student.improvement < 0
                              ? 'bg-red-100 text-red-600'
                              : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {student.improvement > 0 ? '+' : ''}
                        {student.improvement} marks
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>
                        Original: {student.originalScore} → New: {student.newScore}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">Regrade Guidelines</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Verify all affected questions before proceeding</li>
                <li>• Document the reason for regrade</li>
                <li>• Review impact on student rankings</li>
                <li>• Notify all stakeholders after completion</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Regrade Types</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <div>
                  <strong>Partial:</strong> Only specific criteria
                </div>
                <div>
                  <strong>Complete:</strong> Full re-evaluation
                </div>
                <div>
                  <strong>Specific Questions:</strong> Selected questions only
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
