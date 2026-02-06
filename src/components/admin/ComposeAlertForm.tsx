'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Loader2, Send } from 'lucide-react'
import toast from 'react-hot-toast'

const composeAlertSchema = z.object({
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(1, 'Message is required').max(5000),
  recipientType: z.enum([
    'ALL_STUDENTS',
    'BY_TIER',
    'BY_COURSE',
    'ALL_PARENTS',
    'CUSTOM',
  ]),
  tierFilter: z.string().optional(),
  courseId: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  emailChannel: z.boolean(),
  whatsappChannel: z.boolean(),
  smsChannel: z.boolean(),
})

type FormData = z.infer<typeof composeAlertSchema>

interface Course {
  id: string
  name: string
}

interface ComposeAlertFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export function ComposeAlertForm({ onSuccess, onCancel }: ComposeAlertFormProps) {
  const [courses, setCourses] = useState<Course[]>([])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(composeAlertSchema),
    defaultValues: {
      recipientType: 'ALL_STUDENTS',
      priority: 'MEDIUM',
      emailChannel: true,
      whatsappChannel: false,
      smsChannel: false,
    },
  })

  const recipientType = watch('recipientType')

  useEffect(() => {
    fetch('/api/admin/courses')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setCourses(Array.isArray(data.data) ? data.data : data.data.courses || [])
        }
      })
      .catch(() => {})
  }, [])

  const onSubmit = async (data: FormData) => {
    if (!data.emailChannel && !data.whatsappChannel && !data.smsChannel) {
      toast.error('Select at least one channel')
      return
    }

    if (!confirm(`Are you sure you want to send this alert?`)) return

    try {
      const response = await fetch('/api/admin/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: data.subject,
          message: data.message,
          recipientType: data.recipientType,
          tierFilter: data.tierFilter || undefined,
          courseId: data.courseId || undefined,
          channels: {
            email: data.emailChannel,
            whatsapp: data.whatsappChannel,
            sms: data.smsChannel,
          },
          priority: data.priority,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send alert')
      }

      toast.success(result.message || 'Alert sent successfully!')
      reset()
      onSuccess()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send alert')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
          Recipients
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Send To <span className="text-red-500">*</span>
            </label>
            <select
              {...register('recipientType')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL_STUDENTS">All Students</option>
              <option value="BY_TIER">By Coaching Tier</option>
              <option value="BY_COURSE">By Course</option>
              <option value="ALL_PARENTS">All Parents</option>
            </select>
          </div>

          {recipientType === 'BY_TIER' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tier
              </label>
              <select
                {...register('tierFilter')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="PURSUIT">Pursuit</option>
                <option value="ASCENT">Ascent</option>
                <option value="PINNACLE">Pinnacle</option>
              </select>
            </div>
          )}

          {recipientType === 'BY_COURSE' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course
              </label>
              <select
                {...register('courseId')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
          Channels & Priority
        </h3>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('emailChannel')}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">Email</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('whatsappChannel')}
              className="h-4 w-4 text-green-600 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">WhatsApp</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('smsChannel')}
              className="h-4 w-4 text-purple-600 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">SMS</span>
          </label>
        </div>

        <div className="max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            {...register('priority')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
          Message
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('subject')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Alert subject..."
          />
          {errors.subject && (
            <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('message')}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write your message here..."
          />
          {errors.message && (
            <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
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
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Alert
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
