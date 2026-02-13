'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  UserPlus,
  Shield,
  Edit,
  Trash2,
  Search,
  Mail,
  Phone,
  Calendar,
  Lock,
  Check,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { AddUserForm } from '@/components/admin/AddUserForm'
import { EditUserForm } from '@/components/admin/EditUserForm'
import toast from 'react-hot-toast'

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'ADMIN' | 'COUNSELOR' | 'TEACHER'
  status: 'active' | 'inactive' | 'suspended'
  createdAt: string
  lastLogin: string
  permissions: string[]
}

export default function UsersSettingsPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (roleFilter !== 'all') params.set('role', roleFilter)
      if (searchTerm) params.set('search', searchTerm)

      const response = await fetch(`/api/admin/users?${params.toString()}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch users')
      }

      setUsers(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }, [roleFilter, searchTerm])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleEditClick = (user: User) => {
    setSelectedUser(user)
    setIsEditUserModalOpen(true)
  }

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user)
    setIsDeleteConfirmOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return

    setDeleting(true)
    try {
      const response = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedUser.id }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete user')
      }

      toast.success('User deactivated successfully')
      setIsDeleteConfirmOpen(false)
      setSelectedUser(null)
      fetchUsers()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete user')
    } finally {
      setDeleting(false)
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'COUNSELOR':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'TEACHER':
        return 'bg-purple-100 text-purple-800 border-purple-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'suspended':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">Manage admin users, roles, and permissions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchUsers} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsAddUserModalOpen(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u) => u.status === 'active').length}
                </p>
              </div>
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u) => u.role === 'ADMIN').length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-red-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Counselors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u) => u.role === 'COUNSELOR').length}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="COUNSELOR">Counselor</option>
              <option value="TEACHER">Teacher</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchUsers} className="ml-auto">
              Retry
            </Button>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <span className="ml-3 text-gray-600">Loading users...</span>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <Users className="w-12 h-12 mb-3 opacity-50" />
              <p>No users found</p>
              {(searchTerm || roleFilter !== 'all') && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('')
                    setRoleFilter('all')
                  }}
                  className="mt-3"
                >
                  Clear filters
                </Button>
              )}
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
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Permissions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {user.email}
                          </div>
                          {user.phone && (
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {user.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getRoleColor(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            user.status
                          )}`}
                        >
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(user.lastLogin).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.slice(0, 3).map((perm) => (
                            <span
                              key={perm}
                              className="inline-block px-2 py-0.5 text-xs bg-blue-50 text-blue-600 rounded"
                            >
                              {perm}
                            </span>
                          ))}
                          {user.permissions.length > 3 && (
                            <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                              +{user.permissions.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900 p-1"
                            onClick={() => handleEditClick(user)}
                            title="Edit user"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900 p-1"
                            title="Reset password"
                          >
                            <Lock className="w-4 h-4" />
                          </button>
                          {user.role !== 'ADMIN' && (
                            <button
                              className="text-red-600 hover:text-red-900 p-1"
                              onClick={() => handleDeleteClick(user)}
                              title="Deactivate user"
                            >
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
        </div>

        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Role Permissions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold text-red-700 mb-2">ADMIN</p>
              <p className="text-gray-600">Full system access, user management, settings</p>
            </div>
            <div>
              <p className="font-semibold text-blue-700 mb-2">COUNSELOR</p>
              <p className="text-gray-600">Lead management, student enrollment, bookings</p>
            </div>
            <div>
              <p className="font-semibold text-purple-700 mb-2">TEACHER</p>
              <p className="text-gray-600">Course management, LMS access, student grades</p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={isAddUserModalOpen}
        onOpenChange={setIsAddUserModalOpen}
        title="Add New User"
        description="Create a new admin, counselor, or staff user with specific permissions."
        size="lg"
      >
        <AddUserForm
          onSuccess={() => {
            setIsAddUserModalOpen(false)
            fetchUsers()
          }}
          onCancel={() => setIsAddUserModalOpen(false)}
        />
      </Modal>

      <Modal
        open={isEditUserModalOpen}
        onOpenChange={setIsEditUserModalOpen}
        title="Edit User"
        description="Update user details, role, and permissions."
        size="lg"
      >
        {selectedUser && (
          <EditUserForm
            user={selectedUser}
            onSuccess={() => {
              setIsEditUserModalOpen(false)
              setSelectedUser(null)
              fetchUsers()
            }}
            onCancel={() => {
              setIsEditUserModalOpen(false)
              setSelectedUser(null)
            }}
          />
        )}
      </Modal>

      <Modal
        open={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
        title="Deactivate User"
        description="Are you sure you want to deactivate this user? They will no longer be able to access the system."
        size="sm"
      >
        <div className="space-y-4">
          {selectedUser && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900">{selectedUser.name}</p>
              <p className="text-sm text-gray-500">{selectedUser.email}</p>
              <p className="text-sm text-gray-500">Role: {selectedUser.role}</p>
            </div>
          )}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteConfirmOpen(false)
                setSelectedUser(null)
              }}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDeleteConfirm}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deactivating...
                </>
              ) : (
                'Deactivate User'
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  )
}
