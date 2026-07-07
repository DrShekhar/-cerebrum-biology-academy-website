'use client'

import { useState, useEffect } from 'react'
import {
  Bell,
  Mail,
  MessageSquare,
  Send,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Settings,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { showToast } from '@/lib/toast'

interface NotificationChannel {
  id: string
  name: string
  icon: any
  enabled: boolean
  description: string
}

interface NotificationEvent {
  id: string
  name: string
  description: string
  email: boolean
  sms: boolean
  whatsapp: boolean
}

const DEFAULT_CHANNELS: NotificationChannel[] = [
  {
    id: 'email',
    name: 'Email',
    icon: Mail,
    enabled: true,
    description: 'Send notifications via email',
  },
  {
    id: 'sms',
    name: 'SMS',
    icon: MessageSquare,
    enabled: true,
    description: 'Send notifications via SMS',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: Send,
    enabled: true,
    description: 'Send notifications via WhatsApp',
  },
]

const DEFAULT_EVENTS: NotificationEvent[] = [
  {
    id: 'demo_booking',
    name: 'Demo Booking Received',
    description: 'When a student books a demo class',
    email: true,
    sms: false,
    whatsapp: true,
  },
  {
    id: 'demo_reminder',
    name: 'Demo Class Reminder',
    description: '1 hour before scheduled demo class',
    email: true,
    sms: true,
    whatsapp: true,
  },
  {
    id: 'lead_assigned',
    name: 'Lead Assigned',
    description: 'When a lead is assigned to a counselor',
    email: true,
    sms: false,
    whatsapp: false,
  },
  {
    id: 'enrollment_complete',
    name: 'Enrollment Completed',
    description: 'When a student completes enrollment',
    email: true,
    sms: true,
    whatsapp: true,
  },
  {
    id: 'payment_received',
    name: 'Payment Received',
    description: 'When payment is successfully processed',
    email: true,
    sms: false,
    whatsapp: true,
  },
  {
    id: 'payment_reminder',
    name: 'Payment Reminder',
    description: '3 days before payment due date',
    email: true,
    sms: true,
    whatsapp: true,
  },
  {
    id: 'course_start',
    name: 'Course Starting Soon',
    description: '1 day before course starts',
    email: true,
    sms: false,
    whatsapp: true,
  },
  {
    id: 'attendance_alert',
    name: 'Low Attendance Alert',
    description: 'When student attendance falls below 75%',
    email: true,
    sms: false,
    whatsapp: true,
  },
]

export default function NotificationsSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [channels, setChannels] = useState<NotificationChannel[]>(DEFAULT_CHANNELS)

  const [events, setEvents] = useState<NotificationEvent[]>(DEFAULT_EVENTS)

  const toggleChannel = (channelId: string) => {
    setChannels(channels.map((ch) => (ch.id === channelId ? { ...ch, enabled: !ch.enabled } : ch)))
  }

  const toggleEvent = (eventId: string, channel: 'email' | 'sms' | 'whatsapp') => {
    setEvents(events.map((ev) => (ev.id === eventId ? { ...ev, [channel]: !ev[channel] } : ev)))
  }

  const handleReset = () => {
    setChannels(DEFAULT_CHANNELS.map((c) => ({ ...c })))
    setEvents(DEFAULT_EVENTS.map((e) => ({ ...e })))
    showToast.success('Defaults restored — press Save to keep them')
  }

  const [testing, setTesting] = useState<string | null>(null)
  const sendTest = async (channel: 'email' | 'whatsapp') => {
    setTesting(channel)
    try {
      const res = await fetch('/api/admin/settings/notifications/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel }),
      })
      const json = await res.json()
      if (json.success) {
        showToast.success(json.message || 'Test sent')
      } else {
        showToast.error(json.error || 'Test failed')
      }
    } catch {
      showToast.error('Test failed')
    } finally {
      setTesting(null)
    }
  }

  // Load persisted settings (profile.notificationSettings) and merge into the
  // default matrix — previously this page reset to defaults on every visit and
  // its Save button was a setTimeout that wrote nothing.
  useEffect(() => {
    fetch('/api/admin/settings/notifications', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const saved = data?.settings
        if (!saved) return
        if (Array.isArray(saved.channels)) {
          setChannels((prev) =>
            prev.map((ch) => {
              const s = saved.channels.find((c: { id: string }) => c.id === ch.id)
              return s ? { ...ch, enabled: s.enabled } : ch
            })
          )
        }
        if (Array.isArray(saved.events)) {
          setEvents((prev) =>
            prev.map((ev) => {
              const s = saved.events.find((e: { id: string }) => e.id === ev.id)
              return s ? { ...ev, email: s.email, sms: s.sms, whatsapp: s.whatsapp } : ev
            })
          )
        }
      })
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const res = await fetch('/api/admin/settings/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          channels: channels.map((c) => ({ id: c.id, enabled: c.enabled })),
          events: events.map((e) => ({
            id: e.id,
            email: e.email,
            sms: e.sms,
            whatsapp: e.whatsapp,
          })),
        }),
      })
      if (!res.ok) throw new Error('save failed')
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch {
      showToast.error('Failed to save notification settings')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notification Settings</h1>
          <p className="text-gray-600">
            Configure email, SMS, and WhatsApp notifications for various events
          </p>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center animate-fadeInUp">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <p className="text-green-800 font-medium">Notification settings saved successfully!</p>
          </div>
        )}

        {/* Notification Channels */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Notification Channels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-lg ${
                        channel.enabled ? 'bg-blue-100' : 'bg-gray-100'
                      }`}
                    >
                      <channel.icon
                        className={`w-5 h-5 ${channel.enabled ? 'text-blue-600' : 'text-gray-400'}`}
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">{channel.name}</h3>
                      <p className="text-xs text-gray-600">{channel.description}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={channel.enabled}
                      onChange={() => toggleChannel(channel.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sender identity / provider credentials are environment-driven — see the
            Integrations page for live status. Persisting them here would be a
            second layer of config nothing reads. */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-900">
          Sender identities and provider credentials (Resend, WhatsApp, Interakt) are configured via
          environment variables — check their status on the{' '}
          <a href="/admin/settings/integrations" className="font-medium underline">
            Integrations page
          </a>
          .
        </div>

        {/* Event Notifications */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Event Notifications</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <Mail className="w-4 h-4 mx-auto" />
                    Email
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <MessageSquare className="w-4 h-4 mx-auto" />
                    SMS
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <Send className="w-4 h-4 mx-auto" />
                    WhatsApp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{event.name}</p>
                        <p className="text-xs text-gray-500">{event.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={event.email}
                          onChange={() => toggleEvent(event.id, 'email')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={event.sms}
                          onChange={() => toggleEvent(event.id, 'sms')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={event.whatsapp}
                          onChange={() => toggleEvent(event.id, 'whatsapp')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alert */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-800 font-medium mb-1">Important</p>
            <p className="text-sm text-yellow-700">
              SMS and WhatsApp notifications may incur additional costs based on your provider's
              pricing. Make sure your API credentials are configured correctly.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isSaving}
          >
            {isSaving ? (
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
          <Button variant="outline" className="text-gray-700 border-gray-300" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button
            variant="outline"
            className="text-blue-700 border-blue-300"
            onClick={() => void sendTest('email')}
            disabled={testing !== null}
          >
            <Bell className="w-4 h-4 mr-2" />
            {testing === 'email' ? 'Sending…' : 'Test Email (to me)'}
          </Button>
          <Button
            variant="outline"
            className="text-green-700 border-green-300"
            onClick={() => void sendTest('whatsapp')}
            disabled={testing !== null}
          >
            <Send className="w-4 h-4 mr-2" />
            {testing === 'whatsapp' ? 'Sending…' : 'Test WhatsApp (to me)'}
          </Button>
        </div>
      </div>
    </>
  )
}
