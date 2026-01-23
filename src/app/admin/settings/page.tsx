'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Settings as SettingsIcon,
  Users,
  UserCog,
  Bell,
  Lock,
  Zap,
  ChevronRight,
  Save,
  RefreshCw,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface SettingsCard {
  id: string
  title: string
  description: string
  icon: any
  href: string
  color: string
  badge?: string
}

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const settingsCards: SettingsCard[] = [
    {
      id: 'users',
      title: 'User Management',
      description: 'Manage admin users, roles, and permissions',
      icon: Users,
      href: '/admin/settings/users',
      color: 'bg-blue-100 text-blue-600',
      badge: 'Admin Only',
    },
    {
      id: 'faculty',
      title: 'Faculty Management',
      description: 'Manage faculty profiles, schedules, and assignments',
      icon: UserCog,
      href: '/admin/settings/faculty',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Configure email, SMS, and WhatsApp notifications',
      icon: Bell,
      href: '/admin/settings/notifications',
      color: 'bg-green-100 text-green-600',
    },
    {
      id: 'general',
      title: 'General Settings',
      description: 'Academy info, branding, and global preferences',
      icon: SettingsIcon,
      href: '#general',
      color: 'bg-gray-100 text-gray-600',
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Two-factor auth, API keys, and access controls',
      icon: Lock,
      href: '#security',
      color: 'bg-red-100 text-red-600',
    },
    {
      id: 'integrations',
      title: 'Integrations',
      description: 'Connect with WhatsApp, payment gateways, and tools',
      icon: Zap,
      href: '#integrations',
      color: 'bg-yellow-100 text-yellow-600',
    },
  ]

  const handleSaveSettings = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Settings saved successfully!')
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            Configure your academy's admin panel, users, and system preferences
          </p>
        </div>

        {/* Settings Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {settingsCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={card.href}
                className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${card.color}`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  {card.badge && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                      {card.badge}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Settings Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Settings</h2>

          <div className="space-y-6">
            {/* Academy Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academy Name</label>
              <input
                type="text"
                defaultValue="Cerebrum Biology Academy"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <input
                type="email"
                defaultValue="contact@cerebrumbiologyacademy.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
              <input
                type="tel"
                defaultValue="+91 98765 43210"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Timezone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Asia/Dubai">Asia/Dubai (GST)</option>
              </select>
            </div>

            {/* Demo Class Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Demo Class Duration (minutes)
              </label>
              <input
                type="number"
                defaultValue="60"
                min="30"
                max="180"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Auto-assign Leads */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Auto-assign Leads</p>
                <p className="text-xs text-gray-500">
                  Automatically assign new leads to counselors
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                <p className="text-xs text-gray-500">Send email alerts for new bookings</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
            <Button
              onClick={handleSaveSettings}
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
          </div>
        </div>

        {/* System Info */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">System Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Version</p>
              <p className="font-semibold text-gray-900">CRM v1.0.2</p>
            </div>
            <div>
              <p className="text-gray-600">Last Updated</p>
              <p className="font-semibold text-gray-900">November 17, 2025</p>
            </div>
            <div>
              <p className="text-gray-600">Environment</p>
              <p className="font-semibold text-gray-900">Production</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
