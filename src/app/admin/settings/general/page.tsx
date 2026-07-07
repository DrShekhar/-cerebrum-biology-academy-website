'use client'

import { useState, useEffect } from 'react'
import { Settings as SettingsIcon, Save, RefreshCw, ArrowLeft } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { showToast } from '@/lib/toast'

interface GeneralSettings {
  academyName: string
  contactEmail: string
  contactPhone: string
  whatsappNumber: string
  timezone: string
  demoDurationMinutes: number
  autoAssignLeads: boolean
}

export default function GeneralSettingsPage() {
  const [settings, setSettings] = useState<GeneralSettings | null>(null)
  const [lastLoaded, setLastLoaded] = useState<GeneralSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/admin/settings/general')
      const json = await res.json()
      if (json.success) {
        setSettings(json.data)
        setLastLoaded(json.data)
      } else {
        setError(json.error || 'Failed to load settings')
      }
    } catch {
      setError('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!settings) return
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings/general', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      const json = await res.json()
      if (json.success) {
        setSettings(json.data)
        setLastLoaded(json.data)
        showToast.success('Settings saved')
      } else {
        showToast.error(json.error || 'Failed to save settings')
      }
    } catch {
      showToast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    if (lastLoaded) setSettings(lastLoaded)
  }

  const update = <K extends keyof GeneralSettings>(key: K, value: GeneralSettings[K]) => {
    setSettings((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href="/admin/settings"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Settings
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gray-100 text-gray-600">
              <SettingsIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">General Settings</h1>
              <p className="text-gray-600">Academy info and global preferences</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6 animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                <div className="h-10 w-full bg-gray-100 rounded-lg" />
              </div>
            ))}
          </div>
        ) : error || !settings ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-900 font-medium mb-2">Could not load settings</p>
            <p className="text-sm text-gray-500 mb-4">{error}</p>
            <Button variant="outline" onClick={fetchSettings}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Academy Name</label>
                <input
                  type="text"
                  value={settings.academyName}
                  onChange={(e) => update('academyName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => update('contactEmail', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={settings.contactPhone}
                    onChange={(e) => update('contactPhone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={settings.whatsappNumber}
                    onChange={(e) => update('whatsappNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => update('timezone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Demo Class Duration (minutes)
                </label>
                <input
                  type="number"
                  min={30}
                  max={180}
                  value={settings.demoDurationMinutes}
                  onChange={(e) => update('demoDurationMinutes', Number(e.target.value) || 60)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Auto-assign Leads</p>
                  <p className="text-xs text-gray-500">
                    Round-robin new leads to counselors automatically. When off, new leads stay
                    unassigned for manual triage.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoAssignLeads}
                    onChange={(e) => update('autoAssignLeads', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
              <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="text-gray-700 border-gray-300"
                onClick={handleReset}
                disabled={saving}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Discard Changes
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
