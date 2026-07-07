'use client'

/**
 * The ONE lead form — supersedes AddLeadForm, EditLeadForm and the form
 * inside CreateLeadModal (three near-duplicates with drifting field sets;
 * the old edit form even offered stage values the API rejects).
 *
 * surface controls the endpoint + role-specific fields:
 *   admin      → POST/PUT /api/admin/leads, assignee picker (required)
 *   counselor  → POST /api/counselor/leads, lead auto-assigns to self
 */

import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

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
] as const

// The REAL LeadStage enum — the old edit form offered CONTACTED/QUALIFIED/
// NEGOTIATION/CONVERTED, which the API (correctly) rejected with a 400.
const LEAD_STAGES = [
  { value: 'NEW_LEAD', label: 'New Lead' },
  { value: 'DEMO_SCHEDULED', label: 'Demo Scheduled' },
  { value: 'DEMO_COMPLETED', label: 'Demo Completed' },
  { value: 'OFFER_SENT', label: 'Offer Sent' },
  { value: 'NEGOTIATING', label: 'Negotiating' },
  { value: 'PAYMENT_PLAN_CREATED', label: 'Payment Plan Created' },
  { value: 'ENROLLED', label: 'Enrolled' },
  { value: 'ACTIVE_STUDENT', label: 'Active Student' },
  { value: 'LOST', label: 'Lost' },
] as const

const PRIORITY_LEVELS = [
  { value: 'HOT', label: 'Hot - High Priority' },
  { value: 'WARM', label: 'Warm - Medium Priority' },
  { value: 'COLD', label: 'Cold - Low Priority' },
] as const

const SOURCE_VALUES = LEAD_SOURCES.map((s) => s.value) as [string, ...string[]]
const STAGE_VALUES = LEAD_STAGES.map((s) => s.value) as [string, ...string[]]

const leadFormSchema = z.object({
  studentName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format'),
  courseInterest: z.string().min(1, 'Course interest is required'),
  source: z.enum(SOURCE_VALUES),
  stage: z.enum(STAGE_VALUES).optional(),
  priority: z.enum(['HOT', 'WARM', 'COLD']).default('WARM'),
  assignedToId: z.string().optional(),
  nextFollowUpAt: z.string().optional(),
  notes: z.string().optional(),
  lostReason: z.string().optional(),
})

export type LeadFormData = z.infer<typeof leadFormSchema>

export interface LeadFormInitialValues extends Partial<LeadFormData> {
  id?: string
}

interface Counselor {
  id: string
  name: string
}

interface LeadFormProps {
  surface: 'admin' | 'counselor'
  mode: 'add' | 'edit'
  /** Assignee options — admin surface only. */
  counselors?: Counselor[]
  /** Required in edit mode (must include id). */
  initialValues?: LeadFormInitialValues
  onSuccess: () => void
  onCancel: () => void
}

export function LeadForm({
  surface,
  mode,
  counselors = [],
  initialValues,
  onSuccess,
  onCancel,
}: LeadFormProps) {
  const isEdit = mode === 'edit'
  const isAdmin = surface === 'admin'

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema) as Resolver<LeadFormData>,
    defaultValues: {
      priority: 'WARM',
      source: 'MANUAL_ENTRY',
      ...initialValues,
      email: initialValues?.email || '',
      nextFollowUpAt: initialValues?.nextFollowUpAt
        ? String(initialValues.nextFollowUpAt).split('T')[0]
        : '',
    },
  })

  const watchedStage = watch('stage')

  const onSubmit = async (data: LeadFormData) => {
    // Admin creates/edits need an assignee; the counselor endpoint assigns
    // the creating counselor server-side.
    if (isAdmin && !data.assignedToId) {
      toast.error('Please assign a counselor')
      return
    }

    try {
      const url = isAdmin ? '/api/admin/leads' : '/api/counselor/leads'
      const method = isEdit ? 'PUT' : 'POST'
      const payload: Record<string, unknown> = { ...data }
      if (isEdit) payload.id = initialValues?.id
      if (!isAdmin) {
        delete payload.assignedToId
        delete payload.stage
        delete payload.lostReason
        delete payload.notes
        delete payload.nextFollowUpAt
      }
      if (!isEdit) delete payload.stage

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || `Failed to ${isEdit ? 'update' : 'add'} lead`)
      }

      if (result.isExisting) {
        toast.info('A lead with this phone already exists — showing the existing lead')
      } else {
        toast.success(`Lead ${isEdit ? 'updated' : 'added'} successfully!`)
      }
      reset()
      onSuccess()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : `Failed to ${isEdit ? 'update' : 'add'} lead`
      )
    }
  }

  const today = new Date().toISOString().split('T')[0]
  const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Lead Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="studentName">
              Student Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="studentName"
              {...register('studentName')}
              className={inputClass}
              placeholder="Enter full name"
            />
            {errors.studentName && (
              <p className="text-sm text-red-600 mt-1">{errors.studentName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={inputClass}
              placeholder="student@email.com"
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              className={inputClass}
              placeholder="+91 98765 43210"
            />
            {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="courseInterest"
            >
              Course Interest <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="courseInterest"
              {...register('courseInterest')}
              className={inputClass}
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
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="source">
              Lead Source <span className="text-red-500">*</span>
            </label>
            <select id="source" {...register('source')} className={inputClass}>
              {LEAD_SOURCES.map((source) => (
                <option key={source.value} value={source.value}>
                  {source.label}
                </option>
              ))}
            </select>
            {errors.source && <p className="text-sm text-red-600 mt-1">{errors.source.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="priority">
              Priority <span className="text-red-500">*</span>
            </label>
            <select id="priority" {...register('priority')} className={inputClass}>
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

          {isAdmin && isEdit && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="stage">
                Stage
              </label>
              <select id="stage" {...register('stage')} className={inputClass}>
                {LEAD_STAGES.map((stage) => (
                  <option key={stage.value} value={stage.value}>
                    {stage.label}
                  </option>
                ))}
              </select>
              {errors.stage && <p className="text-sm text-red-600 mt-1">{errors.stage.message}</p>}
            </div>
          )}

          {isAdmin && (
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="assignedToId"
              >
                Assign to Counselor <span className="text-red-500">*</span>
              </label>
              <select id="assignedToId" {...register('assignedToId')} className={inputClass}>
                <option value="">Select counselor</option>
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
          )}

          {isAdmin && (
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="nextFollowUpAt"
              >
                Next Follow-up Date
              </label>
              <input
                type="date"
                id="nextFollowUpAt"
                {...register('nextFollowUpAt')}
                min={isEdit ? undefined : today}
                className={inputClass}
              />
            </div>
          )}

          {isAdmin && isEdit && watchedStage === 'LOST' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lostReason">
                Lost Reason
              </label>
              <input
                type="text"
                id="lostReason"
                {...register('lostReason')}
                className={inputClass}
                placeholder="Why was this lead lost?"
              />
            </div>
          )}
        </div>

        {isAdmin && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              {...register('notes')}
              rows={3}
              className={inputClass}
              placeholder="Any additional notes about the lead..."
            />
          </div>
        )}

        {!isAdmin && (
          <p className="text-xs text-gray-500">
            The lead will be assigned to you. Add notes and log interactions from the lead's detail
            page after creating it.
          </p>
        )}
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
            'Add Lead'
          )}
        </Button>
      </div>
    </form>
  )
}
