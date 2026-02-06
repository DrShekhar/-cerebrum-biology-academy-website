'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  CreditCard,
  Search,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { FeePlanForm } from '@/components/admin/FeePlanForm'
import toast from 'react-hot-toast'

interface Installment {
  id: string
  installmentNumber: number
  amount: number
  dueDate: string
  status: string
  paidAt: string | null
}

interface FeePlan {
  id: string
  leadId: string
  courseId: string
  courseName: string
  baseFee: number
  discount: number
  totalFee: number
  amountPaid: number
  amountDue: number
  planType: string
  numberOfInstallments: number
  status: string
  createdAt: string
  leads: { id: string; studentName: string; phone: string } | null
  installments: Installment[]
}

interface Stats {
  total: number
  active: number
  overdueAmount: number
  collectedThisMonth: number
}

export default function FeePlansPage() {
  const [feePlans, setFeePlans] = useState<FeePlan[]>([])
  const [stats, setStats] = useState<Stats>({
    total: 0,
    active: 0,
    overdueAmount: 0,
    collectedThisMonth: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const fetchFeePlans = useCallback(async () => {
    try {
      setLoading(true)
      let url = '/api/admin/fee-plans'
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.set('status', statusFilter)
      if (params.toString()) url += `?${params.toString()}`

      const res = await fetch(url)
      const data = await res.json()
      if (data.success) {
        setFeePlans(data.data.feePlans)
        setStats(data.data.stats)
      }
    } catch {
      toast.error('Failed to load fee plans')
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    fetchFeePlans()
  }, [fetchFeePlans])

  const filteredPlans = searchTerm
    ? feePlans.filter(
        (fp) =>
          fp.leads?.studentName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          fp.courseName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : feePlans

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'PARTIAL':
        return 'bg-yellow-100 text-yellow-800'
      case 'PENDING':
        return 'bg-blue-100 text-blue-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getNextDueDate = (installments: Installment[]) => {
    const pending = installments.find((i) => i.status === 'PENDING')
    return pending ? new Date(pending.dueDate).toLocaleDateString() : 'N/A'
  }

  const statsCards = [
    {
      label: 'Total Plans',
      value: stats.total,
      icon: CreditCard,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Active Plans',
      value: stats.active,
      icon: Clock,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Overdue Amount',
      value: `₹${stats.overdueAmount.toLocaleString('en-IN')}`,
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600',
    },
    {
      label: 'Collected This Month',
      value: `₹${stats.collectedThisMonth.toLocaleString('en-IN')}`,
      icon: DollarSign,
      color: 'bg-purple-100 text-purple-600',
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fee Plans</h1>
            <p className="text-gray-600 mt-2">
              Manage student fee plans and installment schedules
            </p>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Fee Plan
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
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by student name or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="PARTIAL">Partial</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
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
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Fee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Paid / Due
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Next Due
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPlans.map((fp) => (
                      <tr key={fp.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {fp.leads?.studentName || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {fp.courseName}
                          <span className="text-xs text-gray-400 ml-1">
                            ({fp.planType})
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{fp.totalFee.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="text-green-600">
                            ₹{fp.amountPaid.toLocaleString('en-IN')}
                          </span>
                          <span className="text-gray-400"> / </span>
                          <span className="text-red-600">
                            ₹{fp.amountDue.toLocaleString('en-IN')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(fp.status)}`}
                          >
                            {fp.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getNextDueDate(fp.installments)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredPlans.length === 0 && !loading && (
                <div className="text-center py-12">
                  <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No fee plans found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Create a fee plan to get started.
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
        title="Create Fee Plan"
        description="Set up a new fee plan with installment schedule."
        size="xl"
      >
        <FeePlanForm
          onSuccess={() => {
            setIsCreateModalOpen(false)
            fetchFeePlans()
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </AdminLayout>
  )
}
