'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Tag,
  Search,
  Plus,
  Copy,
  ToggleLeft,
  ToggleRight,
  Ticket,
  TrendingDown,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { CouponForm } from '@/components/admin/CouponForm'
import toast from 'react-hot-toast'

interface Coupon {
  id: string
  code: string
  description: string | null
  discountPercent: number
  discountAmount: number | null
  isActive: boolean
  startsAt: string | null
  expiresAt: string | null
  maxUses: number | null
  maxUsesPerUser: number | null
  usedCount: number
  minOrderAmount: number | null
  redemptionCount: number
  createdAt: string
}

interface Stats {
  total: number
  active: number
  totalRedemptions: number
  totalDiscountGiven: number
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [stats, setStats] = useState<Stats>({
    total: 0,
    active: 0,
    totalRedemptions: 0,
    totalDiscountGiven: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true)
      const url = searchTerm
        ? `/api/admin/coupons?search=${encodeURIComponent(searchTerm)}`
        : '/api/admin/coupons'
      const res = await fetch(url)
      const data = await res.json()
      if (data.success) {
        setCoupons(data.data.coupons)
        setStats(data.data.stats)
      }
    } catch {
      toast.error('Failed to load coupons')
    } finally {
      setLoading(false)
    }
  }, [searchTerm])

  useEffect(() => {
    const timer = setTimeout(() => fetchCoupons(), 300)
    return () => clearTimeout(timer)
  }, [fetchCoupons])

  const toggleActive = async (coupon: Coupon) => {
    try {
      const res = await fetch(`/api/admin/coupons/${coupon.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !coupon.isActive }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(`Coupon ${coupon.isActive ? 'deactivated' : 'activated'}`)
        fetchCoupons()
      } else {
        toast.error(data.error || 'Failed to update coupon')
      }
    } catch {
      toast.error('Failed to update coupon')
    }
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success(`Copied: ${code}`)
  }

  const getCouponStatus = (coupon: Coupon) => {
    if (!coupon.isActive) return { label: 'Inactive', color: 'bg-gray-100 text-gray-800' }
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date())
      return { label: 'Expired', color: 'bg-red-100 text-red-800' }
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses)
      return { label: 'Exhausted', color: 'bg-orange-100 text-orange-800' }
    return { label: 'Active', color: 'bg-green-100 text-green-800' }
  }

  const statsCards = [
    {
      label: 'Total Coupons',
      value: stats.total,
      icon: Tag,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Active',
      value: stats.active,
      icon: Ticket,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Total Redemptions',
      value: stats.totalRedemptions,
      icon: TrendingDown,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Total Discount Given',
      value: `₹${(stats.totalDiscountGiven || 0).toLocaleString('en-IN')}`,
      icon: TrendingDown,
      color: 'bg-yellow-100 text-yellow-600',
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Coupon Management</h1>
            <p className="text-gray-600 mt-2">
              Create and manage discount coupons for courses
            </p>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Coupon
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
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by coupon code or description..."
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
                        Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Discount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Uses
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dates
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {coupons.map((coupon) => {
                      const status = getCouponStatus(coupon)
                      return (
                        <tr key={coupon.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <span className="font-mono font-bold text-sm text-gray-900">
                                {coupon.code}
                              </span>
                              {coupon.description && (
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {coupon.description}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {coupon.discountAmount && coupon.discountAmount > 0 ? (
                              <span className="font-medium">
                                ₹{coupon.discountAmount.toLocaleString('en-IN')}
                              </span>
                            ) : (
                              <span className="font-medium">
                                {coupon.discountPercent}%
                              </span>
                            )}
                            {coupon.minOrderAmount && (
                              <p className="text-xs text-gray-500">
                                Min: ₹{coupon.minOrderAmount.toLocaleString('en-IN')}
                              </p>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${status.color}`}
                            >
                              {status.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {coupon.usedCount}
                            {coupon.maxUses ? `/${coupon.maxUses}` : ''}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                            {coupon.startsAt && (
                              <div>
                                From:{' '}
                                {new Date(coupon.startsAt).toLocaleDateString()}
                              </div>
                            )}
                            {coupon.expiresAt && (
                              <div>
                                To:{' '}
                                {new Date(coupon.expiresAt).toLocaleDateString()}
                              </div>
                            )}
                            {!coupon.startsAt && !coupon.expiresAt && 'No date limits'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => copyCode(coupon.code)}
                                className="text-gray-400 hover:text-gray-600"
                                title="Copy code"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => toggleActive(coupon)}
                                className={
                                  coupon.isActive
                                    ? 'text-green-600 hover:text-green-800'
                                    : 'text-gray-400 hover:text-gray-600'
                                }
                                title={
                                  coupon.isActive ? 'Deactivate' : 'Activate'
                                }
                              >
                                {coupon.isActive ? (
                                  <ToggleRight className="w-5 h-5" />
                                ) : (
                                  <ToggleLeft className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              {coupons.length === 0 && !loading && (
                <div className="text-center py-12">
                  <Tag className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No coupons found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Create a coupon to get started.
                  </p>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      <Modal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        title="Create Coupon"
        description="Set up a new discount coupon for courses."
        size="xl"
      >
        <CouponForm
          onSuccess={() => {
            setIsCreateModalOpen(false)
            fetchCoupons()
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </AdminLayout>
  )
}
