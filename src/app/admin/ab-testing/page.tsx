'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import { ABTestDashboard } from '@/components/abTesting/ABTestDashboard'
import { useState } from 'react'
import {
  FlaskConical,
  BarChart2,
  Settings,
  FileDown,
} from 'lucide-react'

export default function ABTestingPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings' | 'export'>('dashboard')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FlaskConical className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">A/B Testing Center</h1>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Monitor and analyze A/B test performance to optimize conversion rates across the
            platform. Track user behavior, measure statistical significance, and make data-driven
            decisions.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8 shadow-sm">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <BarChart2 className="h-4 w-4" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'export'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <FileDown className="h-4 w-4" />
            Export
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <div>
            <ABTestDashboard showAllTests={true} />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Test Configuration</h2>

            {/* Active Tests Status */}
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Hero Section Test</h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Running
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Testing urgency-focused hero vs. standard hero messaging
                </p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200">
                    Pause Test
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm hover:bg-gray-200">
                    Edit Settings
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Pricing Strategy Test</h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Running
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Testing different discount strategies and guarantee messaging
                </p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200">
                    Pause Test
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm hover:bg-gray-200">
                    Edit Settings
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">CTA Button Test</h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Running
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Testing different button copy and styling variations
                </p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200">
                    Pause Test
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm hover:bg-gray-200">
                    Edit Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Global Settings */}
            <div className="mt-8 border-t pt-6">
              <h3 className="font-medium text-gray-900 mb-4">Global Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Traffic Split
                  </label>
                  <select className="w-48 px-3 py-2 border border-gray-300 rounded-lg">
                    <option>50/50 Split</option>
                    <option>60/40 Split</option>
                    <option>70/30 Split</option>
                    <option>90/10 Split</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Sample Size
                  </label>
                  <input
                    type="number"
                    defaultValue={100}
                    className="w-48 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confidence Threshold
                  </label>
                  <select className="w-48 px-3 py-2 border border-gray-300 rounded-lg">
                    <option>95%</option>
                    <option>90%</option>
                    <option>99%</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'export' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Data Export</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Raw Data Export</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Export all A/B test events and assignments for external analysis
                </p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                  Export JSON Data
                </button>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Analytics Report</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Generate comprehensive analytics report with visualizations
                </p>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                  Generate Report
                </button>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Conversion Funnel</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Export conversion funnel data and dropoff analysis
                </p>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
                  Export Funnel Data
                </button>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Statistical Analysis</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Export statistical significance calculations and confidence intervals
                </p>
                <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700">
                  Export Statistics
                </button>
              </div>
            </div>

            {/* Schedule Reports */}
            <div className="mt-8 border-t pt-6">
              <h3 className="font-medium text-gray-900 mb-4">Scheduled Reports</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Reports To
                  </label>
                  <input
                    type="email"
                    placeholder="admin@cerebrumbiologyacademy.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                  <select className="w-48 px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                  Setup Scheduled Reports
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
