'use client'

import React from 'react'
import { Send, Lock, RefreshCw, AlertTriangle } from 'lucide-react'
import type { PublishSettings } from '../types'

interface PublishTabProps {
  publishSettings: PublishSettings
  setPublishSettings: React.Dispatch<React.SetStateAction<PublishSettings>>
  loading: boolean
  publishTest: () => void
}

export function PublishTab({
  publishSettings,
  setPublishSettings,
  loading,
  publishTest,
}: PublishTabProps) {
  return (
    <div
      key="publish"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeInUp"
    >
      <div className="bg-white rounded-xl p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Send className="w-5 h-5 text-green-600" />
          Publication Settings
        </h3>

        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={publishSettings.publishImmediately}
                onChange={(e) =>
                  setPublishSettings((prev) => ({
                    ...prev,
                    publishImmediately: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-green-600 focus:ring-green-600"
              />
              <span className="ml-2 text-sm text-gray-700">Publish immediately</span>
            </label>
          </div>

          {!publishSettings.publishImmediately && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
                <input
                  type="date"
                  value={publishSettings.publishDate}
                  onChange={(e) =>
                    setPublishSettings((prev) => ({ ...prev, publishDate: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Publish Time</label>
                <input
                  type="time"
                  value={publishSettings.publishTime}
                  onChange={(e) =>
                    setPublishSettings((prev) => ({ ...prev, publishTime: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>
            </div>
          )}

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={publishSettings.notifyStudents}
                onChange={(e) =>
                  setPublishSettings((prev) => ({
                    ...prev,
                    notifyStudents: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-green-600 focus:ring-green-600"
              />
              <span className="ml-2 text-sm text-gray-700">Notify students</span>
            </label>
          </div>

          {publishSettings.notifyStudents && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notification Message
              </label>
              <textarea
                value={publishSettings.notificationMessage}
                onChange={(e) =>
                  setPublishSettings((prev) => ({
                    ...prev,
                    notificationMessage: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Device Limit per Student
            </label>
            <input
              type="number"
              value={publishSettings.accessRestrictions.deviceLimit}
              onChange={(e) =>
                setPublishSettings((prev) => ({
                  ...prev,
                  accessRestrictions: {
                    ...prev.accessRestrictions,
                    deviceLimit: parseInt(e.target.value),
                  },
                }))
              }
              min="1"
              max="5"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          <button
            onClick={publishTest}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Publish Test
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-red-600" />
          Security Settings
        </h3>

        <div className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={publishSettings.securitySettings.preventCopyPaste}
                onChange={(e) =>
                  setPublishSettings((prev) => ({
                    ...prev,
                    securitySettings: {
                      ...prev.securitySettings,
                      preventCopyPaste: e.target.checked,
                    },
                  }))
                }
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="ml-2 text-sm text-gray-700">Prevent copy/paste</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={publishSettings.securitySettings.preventPrintScreen}
                onChange={(e) =>
                  setPublishSettings((prev) => ({
                    ...prev,
                    securitySettings: {
                      ...prev.securitySettings,
                      preventPrintScreen: e.target.checked,
                    },
                  }))
                }
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="ml-2 text-sm text-gray-700">Prevent print screen</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={publishSettings.securitySettings.lockdownBrowser}
                onChange={(e) =>
                  setPublishSettings((prev) => ({
                    ...prev,
                    securitySettings: {
                      ...prev.securitySettings,
                      lockdownBrowser: e.target.checked,
                    },
                  }))
                }
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="ml-2 text-sm text-gray-700">Require lockdown browser</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={publishSettings.securitySettings.webcamMonitoring}
                onChange={(e) =>
                  setPublishSettings((prev) => ({
                    ...prev,
                    securitySettings: {
                      ...prev.securitySettings,
                      webcamMonitoring: e.target.checked,
                    },
                  }))
                }
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="ml-2 text-sm text-gray-700">Enable webcam monitoring</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Browsers</label>
            <div className="space-y-2">
              {['Chrome', 'Firefox', 'Safari', 'Edge'].map((browser) => (
                <label key={browser} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={publishSettings.accessRestrictions.browserRequirements.includes(
                      browser
                    )}
                    onChange={(e) => {
                      const browsers = e.target.checked
                        ? [...publishSettings.accessRestrictions.browserRequirements, browser]
                        : publishSettings.accessRestrictions.browserRequirements.filter(
                            (b) => b !== browser
                          )
                      setPublishSettings((prev) => ({
                        ...prev,
                        accessRestrictions: {
                          ...prev.accessRestrictions,
                          browserRequirements: browsers,
                        },
                      }))
                    }}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{browser}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800 mb-1">Security Notice</h4>
                <p className="text-sm text-yellow-700">
                  Enhanced security features may affect test accessibility. Test thoroughly before
                  publishing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
