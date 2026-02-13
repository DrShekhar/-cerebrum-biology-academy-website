'use client'

import React from 'react'
import { Play, Target, Award, Eye, RefreshCw, BookOpen } from 'lucide-react'
import type { PracticeModeSettings } from '../types'

interface PracticeTabProps {
  practiceSettings: PracticeModeSettings
  setPracticeSettings: React.Dispatch<React.SetStateAction<PracticeModeSettings>>
  loading: boolean
  enablePracticeMode: () => void
}

export function PracticeTab({
  practiceSettings,
  setPracticeSettings,
  loading,
  enablePracticeMode,
}: PracticeTabProps) {
  return (
    <div
      key="practice"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeInUp"
    >
      <div className="bg-white rounded-xl p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Play className="w-5 h-5 text-purple-600" />
          Practice Mode Configuration
        </h3>

        <div className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={practiceSettings.allowUnlimitedAttempts}
                onChange={(e) =>
                  setPracticeSettings((prev) => ({
                    ...prev,
                    allowUnlimitedAttempts: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">Allow unlimited attempts</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={practiceSettings.showAnswersImmediately}
                onChange={(e) =>
                  setPracticeSettings((prev) => ({
                    ...prev,
                    showAnswersImmediately: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">Show answers immediately</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={practiceSettings.showExplanations}
                onChange={(e) =>
                  setPracticeSettings((prev) => ({
                    ...prev,
                    showExplanations: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">Show explanations</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={practiceSettings.showScoreAfterEach}
                onChange={(e) =>
                  setPracticeSettings((prev) => ({
                    ...prev,
                    showScoreAfterEach: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">Show score after each question</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={practiceSettings.enableHints}
                onChange={(e) =>
                  setPracticeSettings((prev) => ({
                    ...prev,
                    enableHints: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">Enable hints</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={practiceSettings.randomizeQuestions}
                onChange={(e) =>
                  setPracticeSettings((prev) => ({
                    ...prev,
                    randomizeQuestions: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">Randomize question order</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Level</label>
            <select
              value={practiceSettings.feedbackLevel}
              onChange={(e) =>
                setPracticeSettings((prev) => ({
                  ...prev,
                  feedbackLevel: e.target.value as PracticeModeSettings['feedbackLevel'],
                }))
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="none">No Feedback</option>
              <option value="basic">Basic (Correct/Incorrect)</option>
              <option value="detailed">Detailed (With Explanations)</option>
              <option value="comprehensive">Comprehensive (Full Analysis)</option>
            </select>
          </div>

          <div>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={practiceSettings.timeLimit.enabled}
                onChange={(e) =>
                  setPracticeSettings((prev) => ({
                    ...prev,
                    timeLimit: { ...prev.timeLimit, enabled: e.target.checked },
                  }))
                }
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">Set time limit</span>
            </label>
            {practiceSettings.timeLimit.enabled && (
              <input
                type="number"
                value={practiceSettings.timeLimit.duration}
                onChange={(e) =>
                  setPracticeSettings((prev) => ({
                    ...prev,
                    timeLimit: { ...prev.timeLimit, duration: parseInt(e.target.value) },
                  }))
                }
                placeholder="Minutes"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            )}
          </div>

          <button
            onClick={enablePracticeMode}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Convert to Practice Mode
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-orange-600" />
          Practice Mode Benefits
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-green-600">Self-Paced</div>
              <div className="text-sm text-green-700">Learning at your own speed</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-blue-600">Immediate</div>
              <div className="text-sm text-blue-700">Instant feedback and answers</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <RefreshCw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-purple-600">Unlimited</div>
              <div className="text-sm text-purple-700">Retry as many times needed</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-orange-600">Educational</div>
              <div className="text-sm text-orange-700">Focus on learning outcomes</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Practice Mode Features:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• No stress environment for learning</li>
              <li>• Detailed explanations for each answer</li>
              <li>• Progressive hint system</li>
              <li>• Performance tracking over time</li>
              <li>• Customizable difficulty progression</li>
              <li>• Topic-wise practice sessions</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">Usage Scenarios</h4>
            <div className="text-sm text-purple-700 space-y-1">
              <div>
                <strong>Pre-exam:</strong> Final preparation and revision
              </div>
              <div>
                <strong>Post-exam:</strong> Review and understand mistakes
              </div>
              <div>
                <strong>Continuous:</strong> Regular practice and skill building
              </div>
              <div>
                <strong>Remedial:</strong> Focused improvement on weak areas
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
