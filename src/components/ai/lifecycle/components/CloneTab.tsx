'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Copy, RefreshCw } from 'lucide-react'
import type { CloneSettings } from '../types'

interface CloneTabProps {
  cloneSettings: CloneSettings
  setCloneSettings: React.Dispatch<React.SetStateAction<CloneSettings>>
  loading: boolean
  cloneTest: () => void
}

export function CloneTab({
  cloneSettings,
  setCloneSettings,
  loading,
  cloneTest,
}: CloneTabProps) {
  return (
    <motion.div
      key="clone"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <div className="bg-white rounded-xl p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Copy className="w-5 h-5 text-indigo-600" />
          Clone Settings
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Test Title</label>
            <input
              type="text"
              value={cloneSettings.newTitle}
              onChange={(e) => setCloneSettings((prev) => ({ ...prev, newTitle: e.target.value }))}
              placeholder="Enter new test title..."
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Year</label>
            <input
              type="text"
              value={cloneSettings.targetYear}
              onChange={(e) => setCloneSettings((prev) => ({ ...prev, targetYear: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Clone Type</label>
            <select
              value={cloneSettings.cloneType}
              onChange={(e) =>
                setCloneSettings((prev) => ({
                  ...prev,
                  cloneType: e.target.value as CloneSettings['cloneType'],
                }))
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="exact">Exact Copy</option>
              <option value="updated">Updated Content</option>
              <option value="template">Template Only</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={cloneSettings.preserveSchedule}
                onChange={(e) =>
                  setCloneSettings((prev) => ({
                    ...prev,
                    preserveSchedule: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Preserve schedule settings</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={cloneSettings.updateQuestions}
                onChange={(e) =>
                  setCloneSettings((prev) => ({
                    ...prev,
                    updateQuestions: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Update questions</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={cloneSettings.resetAnalytics}
                onChange={(e) =>
                  setCloneSettings((prev) => ({
                    ...prev,
                    resetAnalytics: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Reset analytics data</span>
            </label>
          </div>

          <button
            onClick={cloneTest}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Cloning...
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Clone Test
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-green-600" />
          Question Updates
        </h3>

        <div className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={cloneSettings.questionUpdates.refreshContent}
                onChange={(e) =>
                  setCloneSettings((prev) => ({
                    ...prev,
                    questionUpdates: {
                      ...prev.questionUpdates,
                      refreshContent: e.target.checked,
                    },
                  }))
                }
                className="rounded border-gray-300 text-green-600 focus:ring-green-600"
              />
              <span className="ml-2 text-sm text-gray-700">Refresh question content</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={cloneSettings.questionUpdates.updateDifficulty}
                onChange={(e) =>
                  setCloneSettings((prev) => ({
                    ...prev,
                    questionUpdates: {
                      ...prev.questionUpdates,
                      updateDifficulty: e.target.checked,
                    },
                  }))
                }
                className="rounded border-gray-300 text-green-600 focus:ring-green-600"
              />
              <span className="ml-2 text-sm text-gray-700">Update difficulty levels</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={cloneSettings.questionUpdates.addNewQuestions}
                onChange={(e) =>
                  setCloneSettings((prev) => ({
                    ...prev,
                    questionUpdates: {
                      ...prev.questionUpdates,
                      addNewQuestions: e.target.checked,
                    },
                  }))
                }
                className="rounded border-gray-300 text-green-600 focus:ring-green-600"
              />
              <span className="ml-2 text-sm text-gray-700">Add new questions</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={cloneSettings.questionUpdates.removeOutdated}
                onChange={(e) =>
                  setCloneSettings((prev) => ({
                    ...prev,
                    questionUpdates: {
                      ...prev.questionUpdates,
                      removeOutdated: e.target.checked,
                    },
                  }))
                }
                className="rounded border-gray-300 text-green-600 focus:ring-green-600"
              />
              <span className="ml-2 text-sm text-gray-700">Remove outdated questions</span>
            </label>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Cloning Benefits</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Saves time creating annual tests</li>
              <li>• Maintains consistency across years</li>
              <li>• Allows for gradual improvements</li>
              <li>• Preserves valuable question banks</li>
            </ul>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Clone Types</h4>
            <div className="text-sm text-yellow-700 space-y-1">
              <div>
                <strong>Exact:</strong> Perfect copy with no changes
              </div>
              <div>
                <strong>Updated:</strong> Content refresh and improvements
              </div>
              <div>
                <strong>Template:</strong> Structure only, new content
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
