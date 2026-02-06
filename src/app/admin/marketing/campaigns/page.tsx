'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import {
  MessageSquare,
  Search,
  Plus,
  Play,
  Pause,
  Eye,
  Trash2,
  Send,
  Mail,
  Phone,
  Target,
  TrendingUp,
  Calendar,
  Users,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'

interface Campaign {
  id: string
  name: string
  type: 'whatsapp' | 'sms' | 'email' | 'facebook' | 'google' | 'mixed'
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed' | 'failed'
  objective: string
  metrics: {
    sent: number
    delivered: number
    opened: number
    clicked: number
    converted: number
    unsubscribed: number
    cost: number
  }
  scheduledAt?: number
  createdAt: number
  updatedAt: number
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({ type: 'campaigns', limit: '50' })
      if (statusFilter !== 'all') params.set('status', statusFilter)
      const res = await fetch(`/api/admin/marketing?${params}`)
      const json = await res.json()
      if (json.success) {
        setCampaigns(json.data.campaigns || [])
      }
    } catch (error) {
      console.error('Failed to fetch campaigns:', error)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    fetchCampaigns()
  }, [fetchCampaigns])

  const filteredCampaigns = campaigns.filter((c) => {
    if (searchTerm && !c.name.toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (typeFilter !== 'all' && c.type !== typeFilter) return false
    return true
  })

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-700',
      scheduled: 'bg-blue-100 text-blue-700',
      active: 'bg-green-100 text-green-700',
      paused: 'bg-yellow-100 text-yellow-700',
      completed: 'bg-purple-100 text-purple-700',
      failed: 'bg-red-100 text-red-700',
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getTypeIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      whatsapp: <MessageSquare className="w-4 h-4 text-green-600" />,
      sms: <Phone className="w-4 h-4 text-blue-600" />,
      email: <Mail className="w-4 h-4 text-purple-600" />,
      facebook: <Users className="w-4 h-4 text-blue-500" />,
      google: <Target className="w-4 h-4 text-red-500" />,
      mixed: <Send className="w-4 h-4 text-gray-600" />,
    }
    return icons[type] || <Send className="w-4 h-4" />
  }

  const totalSent = campaigns.reduce((s, c) => s + c.metrics.sent, 0)
  const totalConverted = campaigns.reduce((s, c) => s + c.metrics.converted, 0)
  const activeCampaigns = campaigns.filter((c) => c.status === 'active').length

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
            <p className="text-gray-600 mt-1">Create and manage marketing campaigns</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600">
                <MessageSquare className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{activeCampaigns}</p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-green-100 text-green-600">
                <Play className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sent</p>
                <p className="text-2xl font-bold text-gray-900">{totalSent.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-purple-100 text-purple-600">
                <Send className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversions</p>
                <p className="text-2xl font-bold text-orange-600">{totalConverted}</p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-orange-100 text-orange-600">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="sms">SMS</option>
              <option value="email">Email</option>
              <option value="facebook">Facebook</option>
              <option value="google">Google</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Loading campaigns...</p>
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
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Open Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                        <div className="text-xs text-gray-500">{campaign.objective}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-600">
                          {getTypeIcon(campaign.type)}
                          <span className="ml-2 capitalize">{campaign.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}
                        >
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.metrics.sent.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.metrics.sent > 0
                          ? `${((campaign.metrics.opened / campaign.metrics.sent) * 100).toFixed(1)}%`
                          : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.metrics.converted}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(campaign.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900" title="View">
                            <Eye className="w-4 h-4" />
                          </button>
                          {campaign.status === 'active' ? (
                            <button className="text-yellow-600 hover:text-yellow-900" title="Pause">
                              <Pause className="w-4 h-4" />
                            </button>
                          ) : campaign.status === 'draft' || campaign.status === 'paused' ? (
                            <button className="text-green-600 hover:text-green-900" title="Start">
                              <Play className="w-4 h-4" />
                            </button>
                          ) : null}
                          {campaign.status === 'draft' && (
                            <button className="text-red-600 hover:text-red-900" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!loading && filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No campaigns found</h3>
              <p className="mt-1 text-sm text-gray-500">Create your first marketing campaign.</p>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
