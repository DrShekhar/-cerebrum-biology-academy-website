'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const addLeadSchema = z.object({
  studentName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format'),
  courseInterest: z.string().min(1, 'Course interest is required'),
  source: z.enum([
    'MANUAL_ENTRY',
    'WALK_IN',
    'PHONE_CALL',
    'REFERRAL',
    'WHATSAPP',
    'EMAIL',
    'SOCIAL_MEDIA',
    'WEBSITE',
    'ADVERTISEMENT',
    'EVENT',
    'OTHER',
  ]),
  priority: z.enum(['HOT', 'WARM', 'COLD']).optional().default('WARM'),
  assignedToId: z.string().min(1, 'Assigned counselor is required'),
  nextFollowUpAt: z.string().optional(),
  notes: z.string().optional(),
})

type AddLeadFormData = z.infer<typeof addLeadSchema>

interface AddLeadFormProps {
  onSuccess: () => void
  onCancel: () => void
}

const LEAD_SOURCES = [
  { value: 'MANUAL_ENTRY', label: 'Manual Entry' },
  { value: 'WALK_IN', label: 'Walk-in' },
  { value: 'PHONE_CALL', label: 'Phone Call' },
  { value: 'REFERRAL', label: 'Referral' },
  { value: 'WHATSAPP', label: 'WhatsApp' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'SOCIAL_MEDIA', label: 'Social Media' },
  { value: 'WEBSITE', label: 'Website' },
  { value: 'ADVERTISEMENT', label: 'Advertisement' },
  { value: 'EVENT', label: 'Event' },
  { value: 'OTHER', label: 'Other' },
]

const PRIORITY_LEVELS = [
  { value: 'HOT', label: 'Hot - High Priority' },
  { value: 'WARM', label: 'Warm - Medium Priority' },
  { value: 'COLD', label: 'Cold - Low Priority' },
]

const COUNSELORS = [
  { id: 'counselor-1', name: 'Dr. Priya Sharma' },
  { id: 'counselor-2', name: 'Dr. Rajesh Kumar' },
  { id: 'counselor-3', name: 'Dr. Anjali Verma' },
]

export function AddLeadForm({ onSuccess, onCancel }: AddLeadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddLeadFormData>({
    resolver: zodResolver(addLeadSchema),
    defaultValues: {
      priority: 'WARM',
      source: 'MANUAL_ENTRY',
    },
  })

  const onSubmit = async (data: AddLeadFormData) => {
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to add lead')
      }

      toast.success('Lead added successfully!')
      reset()
      onSuccess()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add lead')
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Lead Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('studentName')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter full name"
            />
            {errors.studentName && (
              <p className="text-sm text-red-600 mt-1">{errors.studentName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="student@email.com"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Interest <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('courseInterest')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., NEET Biology Class 12"
            />
            {errors.courseInterest && (
              <p className="text-sm text-red-600 mt-1">{errors.courseInterest.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Lead Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lead Source <span className="text-red-500">*</span>
            </label>
            <select
              {...register('source')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {LEAD_SOURCES.map((source) => (
                <option key={source.value} value={source.value}>
                  {source.label}
                </option>
              ))}
            </select>
            {errors.source && <p className="text-sm text-red-600 mt-1">{errors.source.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              {...register('priority')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {PRIORITY_LEVELS.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
            {errors.priority && (
              <p className="text-sm text-red-600 mt-1">{errors.priority.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign to Counselor <span className="text-red-500">*</span>
            </label>
            <select
              {...register('assignedToId')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select counselor</option>
              {COUNSELORS.map((counselor) => (
                <option key={counselor.id} value={counselor.id}>
                  {counselor.name}
                </option>
              ))}
            </select>
            {errors.assignedToId && (
              <p className="text-sm text-red-600 mt-1">{errors.assignedToId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Next Follow-up Date
            </label>
            <input
              type="date"
              {...register('nextFollowUpAt')}
              min={today}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.nextFollowUpAt && (
              <p className="text-sm text-red-600 mt-1">{errors.nextFollowUpAt.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            {...register('notes')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Any additional notes about the lead..."
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
              Adding...
            </>
          ) : (
            'Add Lead'
          )}
        </Button>
      </div>
    </form>
  )
}
