'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bell,
  Mail,
  MessageSquare,
  Send,
  Calendar,
  Users,
  BookOpen,
  DollarSign,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Settings,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'

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

export default function NotificationsSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [channels, setChannels] = useState<NotificationChannel[]>([
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
  ])

  const [events, setEvents] = useState<NotificationEvent[]>([
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
  ])

  const toggleChannel = (channelId: string) => {
    setChannels(channels.map((ch) => (ch.id === channelId ? { ...ch, enabled: !ch.enabled } : ch)))
  }

  const toggleEvent = (eventId: string, channel: 'email' | 'sms' | 'whatsapp') => {
    setEvents(events.map((ev) => (ev.id === eventId ? { ...ev, [channel]: !ev[channel] } : ev)))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <AdminLayout>
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center"
          >
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <p className="text-green-800 font-medium">Notification settings saved successfully!</p>
          </motion.div>
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

        {/* Channel Configuration */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Channel Configuration</h2>

          <div className="space-y-6">
            {/* Email Configuration */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Cerebrum Biology Academy"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sender Email
                  </label>
                  <input
                    type="email"
                    defaultValue="noreply@cerebrumbiologyacademy.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* SMS Configuration */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                SMS Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sender ID</label>
                  <input
                    type="text"
                    defaultValue="CEREBIO"
                    maxLength={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMS Provider
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Twilio</option>
                    <option>MSG91</option>
                    <option>Gupshup</option>
                  </select>
                </div>
              </div>
            </div>

            {/* WhatsApp Configuration */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Send className="w-4 h-4 mr-2" />
                WhatsApp Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="+91 98765 43210"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Provider
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Twilio</option>
                    <option>Gupshup</option>
                    <option>WATI</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
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
          <Button variant="outline" className="text-gray-700 border-gray-300">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button
            variant="outline"
            className="text-blue-700 border-blue-300"
            onClick={() => alert('Test notification sent to admin email!')}
          >
            <Bell className="w-4 h-4 mr-2" />
            Send Test Notification
          </Button>
        </div>
      </div>
    </AdminLayout>
  )
}
