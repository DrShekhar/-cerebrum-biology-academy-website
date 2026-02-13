'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Users,
  Search,
  UserPlus,
  Mail,
  Phone,
  Link2,
  Unlink,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { CreateParentForm } from '@/components/admin/CreateParentForm'
import toast from 'react-hot-toast'

interface ChildInfo {
  relationshipId: string
  id: string
  name: string
  email: string
}

interface Parent {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
  children: ChildInfo[]
}

export default function ParentsPage() {
  const [parents, setParents] = useState<Parent[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const fetchParents = useCallback(async () => {
    try {
      setLoading(true)
      const url = searchTerm
        ? `/api/admin/parents?search=${encodeURIComponent(searchTerm)}`
        : '/api/admin/parents'
      const res = await fetch(url)
      const data = await res.json()
      if (data.success) {
        setParents(data.data)
      }
    } catch {
      toast.error('Failed to load parents')
    } finally {
      setLoading(false)
    }
  }, [searchTerm])

  useEffect(() => {
    const timer = setTimeout(() => fetchParents(), 300)
    return () => clearTimeout(timer)
  }, [fetchParents])

  const handleUnlink = async (relationshipId: string) => {
    if (!confirm('Are you sure you want to unlink this parent-child relationship?')) {
      return
    }

    try {
      const res = await fetch('/api/admin/parents/link', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ relationshipId }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Link removed')
        fetchParents()
      } else {
        toast.error(data.error || 'Failed to remove link')
      }
    } catch {
      toast.error('Failed to remove link')
    }
  }

  const statsData = [
    {
      label: 'Total Parents',
      value: parents.length,
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'With Linked Students',
      value: parents.filter((p) => p.children.length > 0).length,
      icon: Link2,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Without Links',
      value: parents.filter((p) => p.children.length === 0).length,
      icon: Unlink,
      color: 'bg-yellow-100 text-yellow-600',
    },
  ]

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Parent Management</h1>
            <p className="text-gray-600 mt-2">
              Manage parent accounts and parent-child relationships
            </p>
          </div>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Create Parent
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsData.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white p-6 rounded-xl border border-gray-200 animate-fadeInUp"
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
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div
          className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-fadeInUp"
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
                        Parent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Linked Students
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
                    {parents.map((parent) => (
                      <tr key={parent.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                              <Users className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {parent.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <div className="text-sm text-gray-900 flex items-center">
                              <Mail className="w-3 h-3 mr-2 text-gray-400" />
                              {parent.email}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="w-3 h-3 mr-2 text-gray-400" />
                              {parent.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {parent.children.length === 0 ? (
                            <span className="text-sm text-gray-400">No linked students</span>
                          ) : (
                            <div className="space-y-1">
                              {parent.children.map((child) => (
                                <div
                                  key={child.id}
                                  className="flex items-center gap-2"
                                >
                                  <span className="text-sm text-gray-900">
                                    {child.name}
                                  </span>
                                  <button
                                    onClick={() => handleUnlink(child.relationshipId)}
                                    className="text-red-400 hover:text-red-600"
                                    title="Unlink"
                                  >
                                    <Unlink className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(parent.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button
                            variant="outline"
                            className="text-xs"
                            onClick={() =>
                              toast('Link student feature - use Create Parent form')
                            }
                          >
                            <Link2 className="w-3 h-3 mr-1" />
                            Link Student
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {parents.length === 0 && !loading && (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No parents found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Create a parent account to get started.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Modal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        title="Create Parent Account"
        description="Create a parent account and optionally link to student children."
        size="xl"
      >
        <CreateParentForm
          onSuccess={() => {
            setIsCreateModalOpen(false)
            fetchParents()
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </AdminLayout>
  )
}
