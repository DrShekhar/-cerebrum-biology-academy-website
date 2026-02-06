'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import {
  ShoppingCart,
  Search,
  Send,
  DollarSign,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  MessageSquare,
  Mail,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'

interface AbandonedCart {
  id: string
  userId: string
  totalAmount: number
  abandonedAt: number
  recovered: boolean
  finalPurchaseAmount?: number
  user?: { id: string; email: string; phone?: string; profile?: { currentClass?: string } }
}

interface RecoveryOpportunities {
  highValue: number
  recentAbandonment: number
  totalPotentialRevenue: number
}

export default function AbandonedCartsPage() {
  const [carts, setCarts] = useState<AbandonedCart[]>([])
  const [recovery, setRecovery] = useState<RecoveryOpportunities | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchCarts = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/marketing?type=abandoned-carts&limit=50')
      const json = await res.json()
      if (json.success) {
        setCarts(json.data.abandonedCarts || [])
        setRecovery(json.data.recoveryOpportunities || null)
      }
    } catch (error) {
      console.error('Failed to fetch abandoned carts:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCarts()
  }, [fetchCarts])

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)

  const timeSince = (timestamp: number) => {
    const diff = Date.now() - timestamp
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  const urgency = (timestamp: number) => {
    const hours = (Date.now() - timestamp) / (1000 * 60 * 60)
    if (hours < 1) return { label: 'Hot', color: 'bg-red-100 text-red-700' }
    if (hours < 24) return { label: 'Warm', color: 'bg-yellow-100 text-yellow-700' }
    if (hours < 72) return { label: 'Cooling', color: 'bg-blue-100 text-blue-700' }
    return { label: 'Cold', color: 'bg-gray-100 text-gray-700' }
  }

  const filtered = carts.filter(
    (c) =>
      !searchTerm ||
      c.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.userId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalValue = carts.reduce((s, c) => s + c.totalAmount, 0)
  const recoveredCount = carts.filter((c) => c.recovered).length

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Abandoned Carts</h1>
            <p className="text-gray-600 mt-1">
              Recover lost revenue from incomplete enrollments and payments
            </p>
          </div>
          <Button
            variant="outline"
            className="text-gray-700 border-gray-300"
            onClick={fetchCarts}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Abandoned Carts</p>
                <p className="text-2xl font-bold text-gray-900">{carts.length}</p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-red-100 text-red-600">
                <ShoppingCart className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Potential Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-orange-100 text-orange-600">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recovered</p>
                <p className="text-2xl font-bold text-green-600">{recoveredCount}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {carts.length > 0
                    ? `${((recoveredCount / carts.length) * 100).toFixed(0)}% rate`
                    : 'No data'}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-green-100 text-green-600">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Value</p>
                <p className="text-2xl font-bold text-purple-600">
                  {recovery?.highValue || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">Above &#8377;10,000</p>
              </div>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-purple-100 text-purple-600">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by email or user ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Loading abandoned carts...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Urgency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Abandoned
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filtered.map((cart) => {
                    const urg = urgency(cart.abandonedAt)
                    return (
                      <tr key={cart.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {cart.user?.email || cart.userId}
                          </div>
                          {cart.user?.phone && (
                            <div className="text-xs text-gray-500">{cart.user.phone}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {formatCurrency(cart.totalAmount)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${urg.color}`}
                          >
                            {urg.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            {timeSince(cart.abandonedAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {cart.recovered ? (
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Recovered
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Not recovered
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {!cart.recovered && (
                            <div className="flex items-center space-x-2">
                              <button
                                className="text-green-600 hover:text-green-900"
                                title="Send WhatsApp reminder"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </button>
                              <button
                                className="text-purple-600 hover:text-purple-900"
                                title="Send email reminder"
                              >
                                <Mail className="w-4 h-4" />
                              </button>
                              <button
                                className="text-blue-600 hover:text-blue-900"
                                title="Send SMS reminder"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                            </div>
                          )}
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
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No abandoned carts</h3>
              <p className="mt-1 text-sm text-gray-500">
                Great news! No users have abandoned their carts recently.
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
