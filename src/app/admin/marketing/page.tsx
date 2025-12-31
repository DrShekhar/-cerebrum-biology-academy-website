'use client'

// Force dynamic rendering to prevent Clerk auth issues during static build
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Send,
  Users,
  TrendingUp,
  Plus,
  Loader2,
  Mail,
  Phone,
  Target,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'

interface MarketingOverview {
  totalCampaigns: number
  activeCampaigns: number
  totalReach: number
  conversionRate: number
  weeklyMetrics: {
    sent: number
    opened: number
    clicked: number
    converted: number
  }
}

export default function MarketingPage() {
  const [overview, setOverview] = useState<MarketingOverview | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMarketingOverview()
  }, [])

  const fetchMarketingOverview = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/admin/marketing')

      if (!response.ok) {
        throw new Error('Failed to fetch marketing data')
      }

      const data = await response.json()

      if (data.success) {
        setOverview(data.data)
      } else {
        throw new Error(data.error || 'Failed to fetch marketing data')
      }
    } catch (err) {
      console.error('Error fetching marketing data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load marketing data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketing Automation</h1>
            <p className="text-gray-600 mt-2">
              Manage campaigns, automation, and customer engagement
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">Error loading marketing data</p>
            <p className="text-sm">{error}</p>
            <Button onClick={fetchMarketingOverview} variant="outline" size="sm" className="mt-2">
              Retry
            </Button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading marketing data...</span>
          </div>
        )}

        {/* Marketing Metrics */}
        {!loading && !error && overview && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {overview.totalCampaigns}
                    </p>
                  </div>
                  <MessageSquare className="w-10 h-10 text-blue-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-600"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {overview.activeCampaigns}
                    </p>
                  </div>
                  <Target className="w-10 h-10 text-green-600" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Reach</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {overview.totalReach.toLocaleString()}
                    </p>
                  </div>
                  <Users className="w-10 h-10 text-purple-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {overview.conversionRate.toFixed(1)}%
                    </p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-orange-500" />
                </div>
              </motion.div>
            </div>

            {/* Weekly Performance */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Performance</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <Send className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {overview.weeklyMetrics.sent.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Messages Sent</p>
                </div>
                <div className="text-center">
                  <Mail className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {overview.weeklyMetrics.opened.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Opened</p>
                </div>
                <div className="text-center">
                  <Phone className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {overview.weeklyMetrics.clicked.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Clicked</p>
                </div>
                <div className="text-center">
                  <Target className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {overview.weeklyMetrics.converted.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Converted</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => (window.location.href = '/api/admin/marketing?type=campaigns')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  View All Campaigns
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() =>
                    (window.location.href = '/api/admin/marketing?type=abandoned-carts')
                  }
                >
                  <Users className="w-4 h-4 mr-2" />
                  Abandoned Carts
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => (window.location.href = '/api/admin/marketing?type=automation')}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Automation Metrics
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && !overview && (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Marketing Data Available</h3>
            <p className="text-gray-600 mb-4">Start by creating your first marketing campaign</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
