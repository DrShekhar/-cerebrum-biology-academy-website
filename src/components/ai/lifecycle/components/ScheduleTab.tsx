'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Timer, Calendar as CalendarIcon, Trash2, RefreshCw } from 'lucide-react'
import type { ScheduleSettings } from '../types'

interface ScheduleTabProps {
  scheduleSettings: ScheduleSettings
  setScheduleSettings: React.Dispatch<React.SetStateAction<ScheduleSettings>>
  loading: boolean
  scheduleTest: () => void
}

export function ScheduleTab({
  scheduleSettings,
  setScheduleSettings,
  loading,
  scheduleTest,
}: ScheduleTabProps) {
  return (
    <motion.div
      key="schedule"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <div className="bg-white rounded-xl p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Schedule Settings
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={scheduleSettings.startDate}
                onChange={(e) =>
                  setScheduleSettings((prev) => ({ ...prev, startDate: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
              <input
                type="time"
                value={scheduleSettings.startTime}
                onChange={(e) =>
                  setScheduleSettings((prev) => ({ ...prev, startTime: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={scheduleSettings.endDate}
                onChange={(e) =>
                  setScheduleSettings((prev) => ({ ...prev, endDate: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
              <input
                type="time"
                value={scheduleSettings.endTime}
                onChange={(e) =>
                  setScheduleSettings((prev) => ({ ...prev, endTime: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              value={scheduleSettings.timezone}
              onChange={(e) =>
                setScheduleSettings((prev) => ({ ...prev, timezone: e.target.value }))
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Asia/Kolkata">India Standard Time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grace Period (minutes)
            </label>
            <input
              type="number"
              value={scheduleSettings.gracePeriod}
              onChange={(e) =>
                setScheduleSettings((prev) => ({
                  ...prev,
                  gracePeriod: parseInt(e.target.value),
                }))
              }
              min="0"
              max="60"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={scheduleSettings.autoExtensions}
                onChange={(e) =>
                  setScheduleSettings((prev) => ({
                    ...prev,
                    autoExtensions: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Allow automatic extensions</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={scheduleSettings.reminderNotifications.enabled}
                onChange={(e) =>
                  setScheduleSettings((prev) => ({
                    ...prev,
                    reminderNotifications: {
                      ...prev.reminderNotifications,
                      enabled: e.target.checked,
                    },
                  }))
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Send reminder notifications</span>
            </label>
          </div>

          <button
            onClick={scheduleTest}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Scheduling...
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4" />
                Schedule Test
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Timer className="w-5 h-5 text-purple-600" />
            Availability Windows
          </h3>
          <button className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
            Add Window
          </button>
        </div>

        <div className="space-y-4">
          {scheduleSettings.availabilityWindows.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No availability windows configured</p>
              <p className="text-sm">
                Add windows to restrict test access to specific time periods
              </p>
            </div>
          ) : (
            scheduleSettings.availabilityWindows.map((window) => (
              <div key={window.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{window.name}</h4>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${window.isActive ? 'bg-green-600' : 'bg-gray-300'}`}
                    />
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <div>
                    {window.start} - {window.end}
                  </div>
                  <div>{window.timezone}</div>
                </div>
              </div>
            ))
          )}

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Scheduling Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Set grace periods for late submissions</li>
              <li>• Use availability windows for different time zones</li>
              <li>• Enable notifications for important reminders</li>
              <li>• Consider automatic extensions for technical issues</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
