'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Bell,
  Send,
  CheckCircle,
  AlertTriangle,
  Mail,
  MessageSquare,
  Smartphone,
  Search,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { ComposeAlertForm } from '@/components/admin/ComposeAlertForm'
import toast from 'react-hot-toast'

interface Alert {
  id: string
  title: string
  message: string
  type: string
  status: string
  channels: { email?: boolean; whatsapp?: boolean; sms?: boolean } | null
  recipientCount: number
  deliveredCount: number
  failedCount: number
  sendToAll: boolean
  sentAt: string | null
  createdAt: string
}

interface Stats {
  totalSent: number
  totalRecipients: number
  totalDelivered: number
  totalFailed: number
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [stats, setStats] = useState<Stats>({
    totalSent: 0,
    totalRecipients: 0,
    totalDelivered: 0,
    totalFailed: 0,
  })
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isComposeOpen, setIsComposeOpen] = useState(false)

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(
        `/api/admin/alerts?page=${pagination.page}&limit=${pagination.limit}`
      )
      const data = await res.json()
      if (data.success) {
        setAlerts(data.data.alerts)
        setStats(data.data.stats)
        setPagination(data.data.pagination)
      }
    } catch {
      toast.error('Failed to load alerts')
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit])

  useEffect(() => {
    fetchAlerts()
  }, [fetchAlerts])

  const filteredAlerts = searchTerm
    ? alerts.filter(
        (a) =>
          a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : alerts

  const deliveryRate =
    stats.totalRecipients > 0
      ? Math.round((stats.totalDelivered / stats.totalRecipients) * 100)
      : 0

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SENT':
        return 'bg-green-100 text-green-800'
      case 'SENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'FAILED':
        return 'bg-red-100 text-red-800'
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  const getChannelIcons = (
    channels: { email?: boolean; whatsapp?: boolean; sms?: boolean } | null
  ) => {
    if (!channels) return null
    return (
      <div className="flex items-center gap-1">
        {channels.email && (
          <span title="Email">
            <Mail className="w-4 h-4 text-blue-500" />
          </span>
        )}
        {channels.whatsapp && (
          <span title="WhatsApp">
            <MessageSquare className="w-4 h-4 text-green-500" />
          </span>
        )}
        {channels.sms && (
          <span title="SMS">
            <Smartphone className="w-4 h-4 text-purple-500" />
          </span>
        )}
      </div>
    )
  }

  const statsCards = [
    {
      label: 'Total Sent',
      value: stats.totalSent,
      icon: Send,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Delivery Rate',
      value: `${deliveryRate}%`,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Total Delivered',
      value: stats.totalDelivered,
      icon: Bell,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Failed',
      value: stats.totalFailed,
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600',
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>
            <p className="text-gray-600 mt-2">
              Broadcast alerts to students and parents via Email, WhatsApp, and
              SMS
            </p>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setIsComposeOpen(true)}
          >
            <Send className="w-4 h-4 mr-2" />
            Compose Alert
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`h-12 w-12 rounded-lg flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search alerts by subject or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Channels
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipients
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Delivered
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sent At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAlerts.map((alert) => (
                      <tr key={alert.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          <div className="max-w-xs truncate">{alert.title}</div>
                          <div className="text-xs text-gray-500 truncate max-w-xs mt-0.5">
                            {alert.message.substring(0, 80)}
                            {alert.message.length > 80 ? '...' : ''}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getChannelIcons(alert.channels)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {alert.recipientCount}
                          {alert.sendToAll && (
                            <span className="ml-1 text-xs text-blue-600">
                              (all)
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="text-green-600">
                            {alert.deliveredCount}
                          </span>
                          {alert.failedCount > 0 && (
                            <>
                              <span className="text-gray-400"> / </span>
                              <span className="text-red-600">
                                {alert.failedCount} failed
                              </span>
                            </>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(alert.status)}`}
                          >
                            {alert.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {alert.sentAt
                            ? new Date(alert.sentAt).toLocaleString()
                            : 'Pending'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredAlerts.length === 0 && !loading && (
                <div className="text-center py-12">
                  <Bell className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No alerts sent yet
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Compose an alert to broadcast to students or parents.
                  </p>
                </div>
              )}
              {pagination.totalPages > 1 && (
                <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Showing page {pagination.page} of {pagination.totalPages} (
                    {pagination.total} total)
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page <= 1}
                      onClick={() =>
                        setPagination((p) => ({ ...p, page: p.page - 1 }))
                      }
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page >= pagination.totalPages}
                      onClick={() =>
                        setPagination((p) => ({ ...p, page: p.page + 1 }))
                      }
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      <Modal
        open={isComposeOpen}
        onOpenChange={setIsComposeOpen}
        title="Compose Alert"
        description="Send a broadcast alert to students or parents."
        size="xl"
      >
        <ComposeAlertForm
          onSuccess={() => {
            setIsComposeOpen(false)
            fetchAlerts()
          }}
          onCancel={() => setIsComposeOpen(false)}
        />
      </Modal>
    </AdminLayout>
  )
}
