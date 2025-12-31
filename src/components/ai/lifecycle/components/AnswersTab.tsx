'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Key, Eye, RefreshCw } from 'lucide-react'
import type { AnswerKeySettings } from '../types'

interface AnswersTabProps {
  answerKeySettings: AnswerKeySettings
  setAnswerKeySettings: React.Dispatch<React.SetStateAction<AnswerKeySettings>>
  loading: boolean
  generateAnswerKey: () => void
}

export function AnswersTab({
  answerKeySettings,
  setAnswerKeySettings,
  loading,
  generateAnswerKey,
}: AnswersTabProps) {
  return (
    <motion.div
      key="answers"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <div className="bg-white rounded-xl p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Key className="w-5 h-5 text-yellow-600" />
          Answer Key Configuration
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
            <select
              value={answerKeySettings.format}
              onChange={(e) =>
                setAnswerKeySettings((prev) => ({
                  ...prev,
                  format: e.target.value as AnswerKeySettings['format'],
                }))
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="pdf">PDF Document</option>
              <option value="html">HTML Page</option>
              <option value="word">Word Document</option>
              <option value="excel">Excel Spreadsheet</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Access Level</label>
            <select
              value={answerKeySettings.accessLevel}
              onChange={(e) =>
                setAnswerKeySettings((prev) => ({
                  ...prev,
                  accessLevel: e.target.value as AnswerKeySettings['accessLevel'],
                }))
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="public">Public Access</option>
              <option value="teachers">Teachers Only</option>
              <option value="restricted">Restricted Access</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Watermark Text</label>
            <input
              type="text"
              value={answerKeySettings.watermark}
              onChange={(e) =>
                setAnswerKeySettings((prev) => ({ ...prev, watermark: e.target.value }))
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={answerKeySettings.includeExplanations}
                onChange={(e) =>
                  setAnswerKeySettings((prev) => ({
                    ...prev,
                    includeExplanations: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-yellow-600 focus:ring-amber-500"
              />
              <span className="ml-2 text-sm text-gray-700">Include explanations</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={answerKeySettings.includeReferences}
                onChange={(e) =>
                  setAnswerKeySettings((prev) => ({
                    ...prev,
                    includeReferences: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-yellow-600 focus:ring-amber-500"
              />
              <span className="ml-2 text-sm text-gray-700">Include references</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={answerKeySettings.includeMarkingScheme}
                onChange={(e) =>
                  setAnswerKeySettings((prev) => ({
                    ...prev,
                    includeMarkingScheme: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-yellow-600 focus:ring-amber-500"
              />
              <span className="ml-2 text-sm text-gray-700">Include marking scheme</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={answerKeySettings.generateQRCode}
                onChange={(e) =>
                  setAnswerKeySettings((prev) => ({
                    ...prev,
                    generateQRCode: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-yellow-600 focus:ring-amber-500"
              />
              <span className="ml-2 text-sm text-gray-700">Generate QR code</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={answerKeySettings.includeStatistics}
                onChange={(e) =>
                  setAnswerKeySettings((prev) => ({
                    ...prev,
                    includeStatistics: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-yellow-600 focus:ring-amber-500"
              />
              <span className="ml-2 text-sm text-gray-700">Include statistics</span>
            </label>
          </div>

          <button
            onClick={generateAnswerKey}
            disabled={loading}
            className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Key className="w-4 h-4" />
                Generate Answer Key
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-green-600" />
          Answer Key Preview
        </h3>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg min-h-64">
            <div className="text-center mb-4">
              <h4 className="font-bold text-lg">NEET Biology Mock Test 1</h4>
              <p className="text-sm text-gray-600">Answer Key & Marking Scheme</p>
              {answerKeySettings.watermark && (
                <p className="text-xs text-gray-400 italic">{answerKeySettings.watermark}</p>
              )}
            </div>

            <div className="space-y-3">
              <div className="border-b pb-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    1. Which organelle is called the powerhouse of the cell?
                  </span>
                  <span className="text-sm text-gray-500">2 marks</span>
                </div>
                <div className="text-green-600 font-medium mt-1">Answer: B) Mitochondria</div>
                {answerKeySettings.includeExplanations && (
                  <div className="text-sm text-gray-600 mt-1">
                    Explanation: Mitochondria are called the powerhouse because they produce ATP...
                  </div>
                )}
              </div>

              <div className="border-b pb-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">2. The process of photosynthesis occurs in:</span>
                  <span className="text-sm text-gray-500">2 marks</span>
                </div>
                <div className="text-green-600 font-medium mt-1">Answer: C) Chloroplasts</div>
                {answerKeySettings.includeExplanations && (
                  <div className="text-sm text-gray-600 mt-1">
                    Explanation: Chloroplasts contain chlorophyll and are the site of
                    photosynthesis...
                  </div>
                )}
              </div>

              <div className="text-center text-gray-400 text-sm">... more questions ...</div>
            </div>

            {answerKeySettings.includeStatistics && (
              <div className="mt-4 pt-4 border-t">
                <h5 className="font-medium mb-2">Test Statistics</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Total Questions: 50</div>
                  <div>Total Marks: 200</div>
                  <div>Average Score: 68.5%</div>
                  <div>Pass Rate: 87.3%</div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-blue-600">50</div>
              <div className="text-sm text-blue-700">Questions</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-green-600">200</div>
              <div className="text-sm text-green-700">Total Marks</div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Security Features</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Watermark protection</li>
              <li>• Access level restrictions</li>
              <li>• QR code verification</li>
              <li>• Download tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
