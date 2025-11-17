'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const scheduleDemoSchema = z.object({
  studentName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format'),
  whatsappNumber: z.string().optional(),
  courseInterest: z.array(z.string()).min(1, 'Select at least one course'),
  preferredDate: z.string().min(1, 'Date is required'),
  preferredTime: z.string().min(1, 'Time is required'),
  assignedTo: z.string().optional(),
  notes: z.string().optional(),
})

type ScheduleDemoFormData = z.infer<typeof scheduleDemoSchema>

interface ScheduleDemoFormProps {
  onSuccess: () => void
  onCancel: () => void
}

const COURSES = [
  'NEET Biology Class 11',
  'NEET Biology Class 12',
  'NEET Dropper Batch',
  'Foundation Biology Class 9',
  'Foundation Biology Class 10',
]

const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
]

export function ScheduleDemoForm({ onSuccess, onCancel }: ScheduleDemoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<ScheduleDemoFormData>({
    resolver: zodResolver(scheduleDemoSchema),
    defaultValues: {
      courseInterest: [],
    },
  })

  const selectedCourses = watch('courseInterest') || []

  const toggleCourse = (course: string) => {
    const current = selectedCourses
    if (current.includes(course)) {
      setValue(
        'courseInterest',
        current.filter((c) => c !== course)
      )
    } else {
      setValue('courseInterest', [...current, course])
    }
  }

  const onSubmit = async (data: ScheduleDemoFormData) => {
    try {
      const response = await fetch('/api/admin/demo-bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to schedule demo')
      }

      toast.success('Demo class scheduled successfully!')
      reset()
      onSuccess()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to schedule demo')
    }
  }

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Student Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Student Information</h3>

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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
            <input
              type="tel"
              {...register('whatsappNumber')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>
      </div>

      {/* Course Selection */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
          Course Interest <span className="text-red-500">*</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {COURSES.map((course) => (
            <label
              key={course}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedCourses.includes(course)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedCourses.includes(course)}
                onChange={() => toggleCourse(course)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-900">{course}</span>
            </label>
          ))}
        </div>
        {errors.courseInterest && (
          <p className="text-sm text-red-600 mt-1">{errors.courseInterest.message}</p>
        )}
      </div>

      {/* Schedule Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Schedule Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register('preferredDate')}
              min={today}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.preferredDate && (
              <p className="text-sm text-red-600 mt-1">{errors.preferredDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Time <span className="text-red-500">*</span>
            </label>
            <select
              {...register('preferredTime')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select time slot</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.preferredTime && (
              <p className="text-sm text-red-600 mt-1">{errors.preferredTime.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign to Faculty (Optional)
            </label>
            <select
              {...register('assignedTo')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Assign later</option>
              <option value="Dr. Priya Sharma">Dr. Priya Sharma</option>
              <option value="Dr. Rajesh Kumar">Dr. Rajesh Kumar</option>
              <option value="Dr. Anjali Verma">Dr. Anjali Verma</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
          <textarea
            {...register('notes')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Any special requirements or notes..."
          />
        </div>
      </div>

      {/* Form Actions */}
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
              Scheduling...
            </>
          ) : (
            'Schedule Demo'
          )}
        </Button>
      </div>
    </form>
  )
}
