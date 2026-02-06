'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Loader2, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

const convertLeadSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  coachingTier: z.enum(['FREE', 'PURSUIT', 'ASCENT', 'PINNACLE']),
  courseId: z.string().optional(),
  createEnrollment: z.boolean(),
})

type FormData = z.infer<typeof convertLeadSchema>

interface Course {
  id: string
  name: string
}

interface ConvertLeadFormProps {
  lead: {
    id: string
    studentName: string
    email?: string | null
    phone: string
    courseInterest?: string
  }
  onSuccess: () => void
  onCancel: () => void
}

function generatePassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  let password = ''
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

export function ConvertLeadForm({ lead, onSuccess, onCancel }: ConvertLeadFormProps) {
  const [courses, setCourses] = useState<Course[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(convertLeadSchema),
    defaultValues: {
      password: generatePassword(),
      coachingTier: 'FREE',
      createEnrollment: false,
    },
  })

  const password = watch('password')

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
    if (
      !confirm(
        `Convert "${lead.studentName}" to a student account? This will create login credentials.`
      )
    )
      return

    try {
      const response = await fetch('/api/admin/leads/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          password: data.password,
          coachingTier: data.coachingTier,
          courseId: data.courseId || undefined,
          createEnrollment: data.createEnrollment,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to convert lead')
      }

      toast.success(result.message || 'Lead converted successfully!')
      onSuccess()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to convert lead')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Lead Details</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Name:</span>{' '}
            <span className="font-medium">{lead.studentName}</span>
          </div>
          <div>
            <span className="text-gray-500">Phone:</span>{' '}
            <span className="font-medium">{lead.phone}</span>
          </div>
          <div>
            <span className="text-gray-500">Email:</span>{' '}
            <span className="font-medium">{lead.email || 'Not provided'}</span>
          </div>
          <div>
            <span className="text-gray-500">Interest:</span>{' '}
            <span className="font-medium">{lead.courseInterest || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Account Setup</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              {...register('password')}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setValue('password', generatePassword())}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Coaching Tier <span className="text-red-500">*</span>
          </label>
          <select
            {...register('coachingTier')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="FREE">Free</option>
            <option value="PURSUIT">Pursuit</option>
            <option value="ASCENT">Ascent</option>
            <option value="PINNACLE">Pinnacle</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
          <select
            {...register('courseId')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">No course (assign later)</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('createEnrollment')}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">Create enrollment for selected course</span>
        </label>
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Converting...
            </>
          ) : (
            'Convert to Student'
          )}
        </Button>
      </div>
    </form>
  )
}
