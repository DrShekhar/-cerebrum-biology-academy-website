'use client'

import Link from 'next/link'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { FileText, BarChart3, Search, Zap, TrendingUp, FileDown } from 'lucide-react'

const contentModules = [
  {
    title: 'Content Drafts',
    description: 'Review and publish SEO content (blogs, news, landing pages)',
    href: '/admin/content/drafts',
    icon: FileText,
    color: 'bg-blue-500',
    stats: 'Manage draft queue',
  },
  {
    title: 'Analytics',
    description: 'Track content performance, views, conversions, and engagement',
    href: '/admin/content/analytics',
    icon: BarChart3,
    color: 'bg-green-500',
    stats: 'Performance metrics',
  },
  {
    title: 'Keyword Tracker',
    description: 'Monitor keyword rankings and SEO performance',
    href: '/admin/content/keywords',
    icon: Search,
    color: 'bg-purple-500',
    stats: 'SEO rankings',
  },
]

const quickActions = [
  { label: 'Generate Blog Post', command: 'npm run seo:blog "Topic"', icon: FileText },
  { label: 'Generate News Article', command: 'npm run seo:news --headline "Title"', icon: Zap },
  {
    label: 'Generate Lead Magnet',
    command: 'npm run seo:lead-magnet --topic "Topic"',
    icon: FileDown,
  },
  {
    label: 'Repurpose to Social',
    command: 'npm run seo:social --source draft.json',
    icon: TrendingUp,
  },
]

export default function ContentPage() {
  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">SEO Content Machine</h1>
          <p className="text-gray-600 mt-1">Generate, manage, and track SEO content performance</p>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {contentModules.map((module) => {
            const Icon = module.icon
            return (
              <Link
                key={module.href}
                href={module.href}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all"
              >
                <div
                  className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{module.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{module.description}</p>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {module.stats}
                </span>
              </Link>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick CLI Commands</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <div
                  key={action.command}
                  className="flex items-start gap-3 bg-gray-800 rounded-lg p-4"
                >
                  <Icon className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-300 text-sm mb-1">{action.label}</p>
                    <code className="text-green-400 text-sm font-mono">{action.command}</code>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Workflow Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Content Workflow</h3>
          <ol className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">1.</span>
              <span>
                <strong>Generate</strong> - Use CLI commands to create content drafts
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">2.</span>
              <span>
                <strong>Review</strong> - Check drafts in the dashboard, approve or reject
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">3.</span>
              <span>
                <strong>Publish</strong> - One-click publish to make content live
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">4.</span>
              <span>
                <strong>Track</strong> - Monitor performance in Analytics dashboard
              </span>
            </li>
          </ol>
        </div>
      </div>
    </AdminLayout>
  )
}
