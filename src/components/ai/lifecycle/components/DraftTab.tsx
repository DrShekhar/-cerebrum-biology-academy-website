'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Save, History, RefreshCw } from 'lucide-react'
import type { DraftSettings } from '../types'

interface DraftTabProps {
  draftSettings: DraftSettings
  setDraftSettings: React.Dispatch<React.SetStateAction<DraftSettings>>
  saving: boolean
  saveAsDraft: () => void
}

export function DraftTab({ draftSettings, setDraftSettings, saving, saveAsDraft }: DraftTabProps) {
  return (
    <motion.div
      key="draft"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <div className="bg-white rounded-xl p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Save className="w-5 h-5 text-gray-600" />
          Draft Management
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse" />
              <span className="font-medium">Auto-save Status</span>
            </div>
            <div className="text-sm text-gray-600">
              Last saved: {new Date(draftSettings.lastSaved).toLocaleTimeString()}
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={draftSettings.autoSave}
                onChange={(e) =>
                  setDraftSettings((prev) => ({ ...prev, autoSave: e.target.checked }))
                }
                className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
              />
              <span className="ml-2 text-sm text-gray-700">Enable auto-save</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auto-save interval (seconds)
            </label>
            <input
              type="number"
              value={draftSettings.saveInterval}
              onChange={(e) =>
                setDraftSettings((prev) => ({
                  ...prev,
                  saveInterval: parseInt(e.target.value),
                }))
              }
              min="10"
              max="300"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Collaborators</label>
            <input
              type="text"
              placeholder="Add collaborator email..."
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={saveAsDraft}
            disabled={saving}
            className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Draft
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <History className="w-5 h-5 text-blue-600" />
          Version History
        </h3>

        <div className="space-y-3">
          {draftSettings.versions.map((version, index) => (
            <div key={version.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-medium">v{version.version}</span>
                  {index === 0 && (
                    <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(version.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{version.changes}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>By {version.author}</span>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                  <button className="text-green-600 hover:text-green-800">Restore</button>
                  <button className="text-purple-600 hover:text-purple-800">Compare</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
