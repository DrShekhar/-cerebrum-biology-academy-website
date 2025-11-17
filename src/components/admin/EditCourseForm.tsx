'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const editCourseSchema = z.object({
  name: z.string().min(5, 'Course name must be at least 5 characters').max(200),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  type: z.enum(['NEET_COMPLETE', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION', 'CRASH_COURSE']),
  class: z.enum(['CLASS_9', 'CLASS_10', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION']),
  duration: z.number().min(1, 'Duration must be at least 1 month').max(36),
  totalFees: z.number().min(1000, 'Fees must be at least 1000'),
  instructor: z.string().min(2, 'Instructor name is required'),
  maxCapacity: z.number().min(1, 'Capacity must be at least 1').max(500),
  startDate: z.string().min(1, 'Start date is required'),
  schedule: z.string().min(5, 'Schedule details are required'),
  isActive: z.boolean(),
  syllabus: z.string().optional(),
  features: z.string().optional(),
})

type EditCourseFormData = z.infer<typeof editCourseSchema>

interface Course {
  id: string
  name: string
  description: string
  type: string
  class: string
  duration: number
  totalFees: number
  instructor: string
  maxCapacity: number
  startDate: string
  schedule: string
  isActive: boolean
  syllabus?: string[]
  features?: string[]
}

interface EditCourseFormProps {
  course: Course
  onSuccess: () => void
  onCancel: () => void
}

export function EditCourseForm({ course, onSuccess, onCancel }: EditCourseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditCourseFormData>({
    resolver: zodResolver(editCourseSchema),
    defaultValues: {
      name: course.name,
      description: course.description,
      type: course.type as any,
      class: course.class as any,
      duration: course.duration,
      totalFees: course.totalFees,
      instructor: course.instructor,
      maxCapacity: course.maxCapacity,
      startDate: course.startDate,
      schedule: course.schedule,
      isActive: course.isActive,
      syllabus: course.syllabus?.join('\n') || '',
      features: course.features?.join('\n') || '',
    },
  })

  const onSubmit = async (data: EditCourseFormData) => {
    try {
      const syllabusArray = data.syllabus
        ? data.syllabus
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean)
        : []
      const featuresArray = data.features
        ? data.features
            .split('\n')
            .map((f) => f.trim())
            .filter(Boolean)
        : []

      const response = await fetch('/api/admin/courses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: course.id,
          ...data,
          syllabus: syllabusArray,
          features: featuresArray,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update course')
      }

      toast.success('Course updated successfully!')
      onSuccess()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update course')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Course Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Course Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('name')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., NEET Biology Class 12 Complete Course"
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Detailed description of the course..."
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register('type')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="NEET_COMPLETE">NEET Complete</option>
              <option value="CLASS_11">Class 11</option>
              <option value="CLASS_12">Class 12</option>
              <option value="DROPPER">Dropper</option>
              <option value="FOUNDATION">Foundation</option>
              <option value="CRASH_COURSE">Crash Course</option>
            </select>
            {errors.type && <p className="text-sm text-red-600 mt-1">{errors.type.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class <span className="text-red-500">*</span>
            </label>
            <select
              {...register('class')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="CLASS_9">Class 9</option>
              <option value="CLASS_10">Class 10</option>
              <option value="CLASS_11">Class 11</option>
              <option value="CLASS_12">Class 12</option>
              <option value="DROPPER">Dropper</option>
              <option value="FOUNDATION">Foundation</option>
            </select>
            {errors.class && <p className="text-sm text-red-600 mt-1">{errors.class.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructor <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('instructor')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Dr. Priya Sharma"
            />
            {errors.instructor && (
              <p className="text-sm text-red-600 mt-1">{errors.instructor.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Schedule <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('schedule')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Mon, Wed, Fri - 4:00 PM to 6:00 PM"
            />
            {errors.schedule && (
              <p className="text-sm text-red-600 mt-1">{errors.schedule.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Course Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (months) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('duration', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="12"
            />
            {errors.duration && (
              <p className="text-sm text-red-600 mt-1">{errors.duration.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Fees (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('totalFees', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="45000"
            />
            {errors.totalFees && (
              <p className="text-sm text-red-600 mt-1">{errors.totalFees.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Capacity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('maxCapacity', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="300"
            />
            {errors.maxCapacity && (
              <p className="text-sm text-red-600 mt-1">{errors.maxCapacity.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register('startDate')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.startDate && (
              <p className="text-sm text-red-600 mt-1">{errors.startDate.message}</p>
            )}
          </div>

          <div className="flex items-center md:col-span-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                {...register('isActive')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Active Course</span>
            </label>
          </div>
        </div>
      </div>

      {/* Syllabus & Features */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Syllabus & Features</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Syllabus Topics (one per line)
            </label>
            <textarea
              {...register('syllabus')}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Human Physiology&#10;Plant Physiology&#10;Reproduction&#10;Genetics"
            />
            <p className="text-xs text-gray-500 mt-1">Enter each topic on a new line</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features (one per line)
            </label>
            <textarea
              {...register('features')}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Live Classes&#10;Recorded Lectures&#10;Mock Tests&#10;Study Material"
            />
            <p className="text-xs text-gray-500 mt-1">Enter each feature on a new line</p>
          </div>
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
            'Update Course'
          )}
        </Button>
      </div>
    </form>
  )
}
