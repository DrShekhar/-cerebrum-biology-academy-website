'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const editLeadSchema = z.object({
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
  stage: z.enum([
    'NEW_LEAD',
    'CONTACTED',
    'QUALIFIED',
    'DEMO_SCHEDULED',
    'DEMO_COMPLETED',
    'NEGOTIATION',
    'CONVERTED',
    'LOST',
  ]),
  priority: z.enum(['HOT', 'WARM', 'COLD']),
  assignedToId: z.string().min(1, 'Assigned counselor is required'),
  nextFollowUpAt: z.string().optional(),
  notes: z.string().optional(),
  lostReason: z.string().optional(),
})

type EditLeadFormData = z.infer<typeof editLeadSchema>

interface Lead {
  id: string
  studentName: string
  email?: string
  phone: string
  courseInterest: string
  source: string
  stage: string
  priority: string
  assignedToId: string
  nextFollowUpAt?: Date | string
  lostReason?: string
}

interface EditLeadFormProps {
  lead: Lead
  counselors: Array<{ id: string; name: string }>
  onSuccess: () => void
  onCancel: () => void
}

export function EditLeadForm({ lead, counselors, onSuccess, onCancel }: EditLeadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<EditLeadFormData>({
    resolver: zodResolver(editLeadSchema),
    defaultValues: {
      studentName: lead.studentName,
      email: lead.email || '',
      phone: lead.phone,
      courseInterest: lead.courseInterest,
      source: lead.source as any,
      stage: lead.stage as any,
      priority: lead.priority as any,
      assignedToId: lead.assignedToId,
      nextFollowUpAt: lead.nextFollowUpAt
        ? new Date(lead.nextFollowUpAt).toISOString().slice(0, 16)
        : '',
      lostReason: lead.lostReason || '',
    },
  })

  const watchedStage = watch('stage')

  const onSubmit = async (data: EditLeadFormData) => {
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: lead.id,
          ...data,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update lead')
      }

      toast.success('Lead updated successfully!')
      onSuccess()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update lead')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Lead Information */}
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
              placeholder="student@example.com"
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

      {/* Lead Status */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Lead Status</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Source <span className="text-red-500">*</span>
            </label>
            <select
              {...register('source')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="MANUAL_ENTRY">Manual Entry</option>
              <option value="WALK_IN">Walk-In</option>
              <option value="PHONE_CALL">Phone Call</option>
              <option value="REFERRAL">Referral</option>
              <option value="WHATSAPP">WhatsApp</option>
              <option value="EMAIL">Email</option>
              <option value="SOCIAL_MEDIA">Social Media</option>
              <option value="WEBSITE">Website</option>
              <option value="ADVERTISEMENT">Advertisement</option>
              <option value="EVENT">Event</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.source && <p className="text-sm text-red-600 mt-1">{errors.source.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stage <span className="text-red-500">*</span>
            </label>
            <select
              {...register('stage')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="NEW_LEAD">New Lead</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="DEMO_SCHEDULED">Demo Scheduled</option>
              <option value="DEMO_COMPLETED">Demo Completed</option>
              <option value="NEGOTIATION">Negotiation</option>
              <option value="CONVERTED">Converted</option>
              <option value="LOST">Lost</option>
            </select>
            {errors.stage && <p className="text-sm text-red-600 mt-1">{errors.stage.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              {...register('priority')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="HOT">Hot</option>
              <option value="WARM">Warm</option>
              <option value="COLD">Cold</option>
            </select>
            {errors.priority && (
              <p className="text-sm text-red-600 mt-1">{errors.priority.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assigned Counselor <span className="text-red-500">*</span>
            </label>
            <select
              {...register('assignedToId')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Counselor</option>
              {counselors.map((counselor) => (
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Next Follow-Up</label>
            <input
              type="datetime-local"
              {...register('nextFollowUpAt')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {watchedStage === 'LOST' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lost Reason <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('lostReason')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter reason why lead was lost"
              />
              {errors.lostReason && (
                <p className="text-sm text-red-600 mt-1">{errors.lostReason.message}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Additional Notes</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            {...register('notes')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Add any additional notes about this lead..."
          />
        </div>
      </div>

      {/* Actions */}
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
              Updating...
            </>
          ) : (
            'Update Lead'
          )}
        </Button>
      </div>
    </form>
  )
}
