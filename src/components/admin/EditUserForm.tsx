'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const editUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format'),
  role: z.enum(['ADMIN', 'COUNSELOR', 'TEACHER']),
  permissions: z.array(z.string()).min(1, 'Select at least one permission'),
  status: z.enum(['active', 'inactive', 'suspended']),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .optional()
    .or(z.literal('')),
})

type EditUserFormData = z.infer<typeof editUserSchema>

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'ADMIN' | 'COUNSELOR' | 'TEACHER'
  status: 'active' | 'inactive' | 'suspended'
  permissions: string[]
}

interface EditUserFormProps {
  user: User
  onSuccess: () => void
  onCancel: () => void
}

const USER_ROLES = [
  { value: 'ADMIN', label: 'Admin - Full Access' },
  { value: 'COUNSELOR', label: 'Counselor - Lead & Student Management' },
  { value: 'TEACHER', label: 'Teacher - Course & LMS Access' },
]

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' },
]

const PERMISSION_OPTIONS = [
  { value: 'leads', label: 'Lead Management' },
  { value: 'students', label: 'Student Management' },
  { value: 'courses', label: 'Course Management' },
  { value: 'bookings', label: 'Demo Bookings' },
  { value: 'payments', label: 'Payment Management' },
  { value: 'faculty', label: 'Faculty Management' },
  { value: 'analytics', label: 'Analytics & Reports' },
  { value: 'settings', label: 'System Settings' },
]

export function EditUserForm({ user, onSuccess, onCancel }: EditUserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone,
      role: user.role,
      permissions: user.permissions,
      status: user.status,
      password: '',
    },
  })

  useEffect(() => {
    reset({
      name: user.name,
      phone: user.phone,
      role: user.role,
      permissions: user.permissions,
      status: user.status,
      password: '',
    })
  }, [user, reset])

  const selectedRole = watch('role')
  const selectedPermissions = watch('permissions') || []

  const togglePermission = (permission: string) => {
    const current = selectedPermissions
    if (current.includes(permission)) {
      setValue(
        'permissions',
        current.filter((p) => p !== permission)
      )
    } else {
      setValue('permissions', [...current, permission])
    }
  }

  const selectAllPermissions = () => {
    setValue(
      'permissions',
      PERMISSION_OPTIONS.map((p) => p.value)
    )
  }

  const clearAllPermissions = () => {
    setValue('permissions', [])
  }

  const onSubmit = async (data: EditUserFormData) => {
    try {
      const updatePayload: any = {
        id: user.id,
        name: data.name,
        phone: data.phone,
        role: data.role,
        permissions: data.permissions,
        status: data.status,
      }

      if (data.password && data.password.length >= 8) {
        updatePayload.password = data.password
      }

      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update user')
      }

      toast.success('User updated successfully!')
      onSuccess()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update user')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">User Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('name')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="password"
              {...register('password')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Leave blank to keep current"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Role & Status</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Role <span className="text-red-500">*</span>
            </label>
            <select
              {...register('role')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {USER_ROLES.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            {errors.role && <p className="text-sm text-red-600 mt-1">{errors.role.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              {...register('status')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            {errors.status && <p className="text-sm text-red-600 mt-1">{errors.status.message}</p>}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Permissions <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={selectAllPermissions}
              className="text-xs"
            >
              Select All
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={clearAllPermissions}
              className="text-xs"
            >
              Clear All
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {PERMISSION_OPTIONS.map((permission) => (
            <label
              key={permission.value}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedPermissions.includes(permission.value)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedPermissions.includes(permission.value)}
                onChange={() => togglePermission(permission.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-900">{permission.label}</span>
            </label>
          ))}
        </div>
        {errors.permissions && (
          <p className="text-sm text-red-600 mt-1">{errors.permissions.message}</p>
        )}
      </div>

      {selectedRole === 'ADMIN' && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            <strong>Warning:</strong> Admin users have full system access regardless of selected
            permissions.
          </p>
        </div>
      )}

      <div className="flex items-center justify-end space-x-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </form>
  )
}
