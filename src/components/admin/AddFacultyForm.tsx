'use client'

import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const baseFacultySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format'),
  specialization: z.string().min(2, 'Specialization is required'),
  experience: z.number().min(0, 'Experience cannot be negative').max(50),
  qualification: z.string().min(2, 'Qualification is required'),
  availability: z.string().min(2, 'Availability schedule is required'),
  bio: z.string().optional(),
})

const addFacultySchema = baseFacultySchema.extend({
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const editFacultySchema = baseFacultySchema.extend({
  password: z.string().optional(),
})

// Password optional at the type level; the add-mode schema enforces it at runtime.
type AddFacultyFormData = z.infer<typeof editFacultySchema>

export interface FacultyFormInitialValues {
  id: string
  name: string
  email: string
  phone: string
  specialization: string
  experience: number
  qualification: string
  availability: string
  bio?: string
}

interface AddFacultyFormProps {
  onSuccess: () => void
  onCancel: () => void
  mode?: 'add' | 'edit'
  initialValues?: FacultyFormInitialValues
}

export function AddFacultyForm({
  onSuccess,
  onCancel,
  mode = 'add',
  initialValues,
}: AddFacultyFormProps) {
  const isEdit = mode === 'edit' && initialValues
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddFacultyFormData>({
    resolver: zodResolver(
      isEdit ? editFacultySchema : addFacultySchema
    ) as Resolver<AddFacultyFormData>,
    defaultValues: isEdit
      ? {
          name: initialValues.name,
          email: initialValues.email,
          phone: initialValues.phone,
          specialization: initialValues.specialization,
          experience: initialValues.experience,
          qualification: initialValues.qualification,
          availability: initialValues.availability,
          bio: initialValues.bio || '',
        }
      : undefined,
  })

  const onSubmit = async (data: AddFacultyFormData) => {
    try {
      const url = isEdit ? `/api/admin/faculty/${initialValues.id}` : '/api/admin/faculty'
      const payload: Record<string, unknown> = { ...data }
      if (isEdit) delete payload.password

      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || `Failed to ${isEdit ? 'update' : 'add'} faculty`)
      }

      toast.success(`Faculty member ${isEdit ? 'updated' : 'added'} successfully!`)
      reset()
      onSuccess()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : `Failed to ${isEdit ? 'update' : 'add'} faculty`
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Personal Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('name')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Dr. Priya Sharma"
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="shekharcsingh57@gmail.com"
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+91 98765 43210"
            />
            {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
          </div>

          {!isEdit && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                {...register('password')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Minimum 8 characters"
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Professional Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Qualification <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('qualification')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="PhD in Biology, M.Sc."
            />
            {errors.qualification && (
              <p className="text-sm text-red-600 mt-1">{errors.qualification.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialization <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('specialization')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Human Physiology, Genetics"
            />
            {errors.specialization && (
              <p className="text-sm text-red-600 mt-1">{errors.specialization.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience (years) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('experience', { valueAsNumber: true })}
              min="0"
              max="50"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="10"
            />
            {errors.experience && (
              <p className="text-sm text-red-600 mt-1">{errors.experience.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Availability <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('availability')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Mon-Sat, 9 AM - 6 PM"
            />
            {errors.availability && (
              <p className="text-sm text-red-600 mt-1">{errors.availability.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio / About (Optional)
          </label>
          <textarea
            {...register('bio')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief professional background and teaching philosophy..."
          />
        </div>
      </div>

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
              {isEdit ? 'Saving...' : 'Adding...'}
            </>
          ) : isEdit ? (
            'Save Changes'
          ) : (
            'Add Faculty'
          )}
        </Button>
      </div>
    </form>
  )
}
