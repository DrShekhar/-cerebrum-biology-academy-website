'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Mail,
  Search,
  Plus,
  Eye,
  Send,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'

interface Campaign {
  id: string
  name: string
  type: string
  status: string
  metrics: {
    sent: number
    delivered: number
    opened: number
    clicked: number
    converted: number
    unsubscribed: number
    cost: number
  }
  createdAt: number
}

export default function EmailCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/marketing?type=campaigns&limit=50')
      const json = await res.json()
      if (json.success) {
        setCampaigns((json.data.campaigns || []).filter((c: Campaign) => c.type === 'email'))
      }
    } catch (error) {
      console.error('Failed to fetch email campaigns:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCampaigns()
  }, [fetchCampaigns])

  const filtered = campaigns.filter(
    (c) => !searchTerm || c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalSent = campaigns.reduce((s, c) => s + c.metrics.sent, 0)
  const totalOpened = campaigns.reduce((s, c) => s + c.metrics.opened, 0)
  const totalClicked = campaigns.reduce((s, c) => s + c.metrics.clicked, 0)
  const avgOpenRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : '0'
  const avgClickRate = totalOpened > 0 ? ((totalClicked / totalOpened) * 100).toFixed(1) : '0'

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Email Campaigns</h1>
            <p className="text-gray-600 mt-1">Manage email marketing campaigns and newsletters</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Email Campaign
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-purple-100 text-purple-600">
                <Mail className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emails Sent</p>
                <p className="text-2xl font-bold text-gray-900">{totalSent.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600">
                <Send className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Open Rate</p>
                <p className="text-2xl font-bold text-green-600">{avgOpenRate}%</p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-green-100 text-green-600">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Click Rate</p>
                <p className="text-2xl font-bold text-orange-600">{avgClickRate}%</p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-orange-100 text-orange-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search email campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Loading email campaigns...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Opened
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clicked
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unsubscribed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filtered.map((campaign) => {
                    const openRate =
                      campaign.metrics.sent > 0
                        ? ((campaign.metrics.opened / campaign.metrics.sent) * 100).toFixed(1)
                        : '0'
                    return (
                      <tr key={campaign.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                              campaign.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : campaign.status === 'active'
                                  ? 'bg-blue-100 text-blue-700'
                                  : campaign.status === 'scheduled'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {campaign.status === 'completed' ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : campaign.status === 'active' ? (
                              <Send className="w-3 h-3 mr-1" />
                            ) : (
                              <Clock className="w-3 h-3 mr-1" />
                            )}
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {campaign.metrics.sent.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {campaign.metrics.opened.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">{openRate}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {campaign.metrics.clicked.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {campaign.metrics.unsubscribed}
                          </div>
                          {campaign.metrics.unsubscribed > 0 && (
                            <AlertCircle className="w-3 h-3 text-yellow-500 inline ml-1" />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(campaign.createdAt).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-900" title="View">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-12">
              <Mail className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No email campaigns</h3>
              <p className="mt-1 text-sm text-gray-500">Create your first email campaign.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
