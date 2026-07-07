'use client'

import {
  Settings as SettingsIcon,
  Users,
  UserCog,
  Bell,
  Lock,
  Zap,
  ChevronRight,
} from 'lucide-react'
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
    description: 'Academy info, contact details, and global preferences',
    icon: SettingsIcon,
    href: '/admin/settings/general',
    color: 'bg-gray-100 text-gray-600',
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Authentication, password policy, and staff accounts',
    icon: Lock,
    href: '/admin/settings/security',
    color: 'bg-red-100 text-red-600',
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Status of payment, messaging, and tooling credentials',
    icon: Zap,
    href: '/admin/settings/integrations',
    color: 'bg-yellow-100 text-yellow-600',
  },
]

export default function SettingsPage() {
  return (
    <>
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
          {settingsCards.map((card) => (
            <div key={card.id} className="animate-fadeInUp">
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
            </div>
          ))}
        </div>

        {/* System Info */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">System Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Build</p>
              <p className="font-semibold text-gray-900">
                {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'local'}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Environment</p>
              <p className="font-semibold text-gray-900">
                {process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
