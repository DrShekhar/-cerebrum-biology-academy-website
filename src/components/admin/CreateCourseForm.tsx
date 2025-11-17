'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Loader2, Plus, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useState } from 'react'

const createCourseSchema = z.object({
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
})

type CreateCourseFormData = z.infer<typeof createCourseSchema>

interface CreateCourseFormProps {
  onSuccess: () => void
  onCancel: () => void
}

const COURSE_TYPES = [
  { value: 'NEET_COMPLETE', label: 'NEET Complete Course' },
  { value: 'CLASS_11', label: 'Class 11' },
  { value: 'CLASS_12', label: 'Class 12' },
  { value: 'DROPPER', label: 'Dropper Batch' },
  { value: 'FOUNDATION', label: 'Foundation Course' },
  { value: 'CRASH_COURSE', label: 'Crash Course' },
]

const STUDENT_CLASSES = [
  { value: 'CLASS_9', label: 'Class 9' },
  { value: 'CLASS_10', label: 'Class 10' },
  { value: 'CLASS_11', label: 'Class 11' },
  { value: 'CLASS_12', label: 'Class 12' },
  { value: 'DROPPER', label: 'Dropper' },
  { value: 'FOUNDATION', label: 'Foundation' },
]

export function CreateCourseForm({ onSuccess, onCancel }: CreateCourseFormProps) {
  const [features, setFeatures] = useState<string[]>([])
  const [currentFeature, setCurrentFeature] = useState('')
  const [topics, setTopics] = useState<string[]>([])
  const [currentTopic, setCurrentTopic] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateCourseFormData>({
    resolver: zodResolver(createCourseSchema),
  })

  const addFeature = () => {
    if (currentFeature.trim() && !features.includes(currentFeature.trim())) {
      setFeatures([...features, currentFeature.trim()])
      setCurrentFeature('')
    }
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const addTopic = () => {
    if (currentTopic.trim() && !topics.includes(currentTopic.trim())) {
      setTopics([...topics, currentTopic.trim()])
      setCurrentTopic('')
    }
  }

  const removeTopic = (index: number) => {
    setTopics(topics.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: CreateCourseFormData) => {
    try {
      const payload = {
        ...data,
        syllabus: topics.length > 0 ? topics : null,
        features: features.length > 0 ? features : null,
      }

      const response = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create course')
      }

      toast.success('Course created successfully!')
      reset()
      setFeatures([])
      setTopics([])
      onSuccess()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create course')
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              placeholder="e.g., NEET Biology Class 12 - Complete Course"
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
              placeholder="Brief description of the course..."
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
              <option value="">Select type</option>
              {COURSE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.type && <p className="text-sm text-red-600 mt-1">{errors.type.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student Class <span className="text-red-500">*</span>
            </label>
            <select
              {...register('class')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select class</option>
              {STUDENT_CLASSES.map((cls) => (
                <option key={cls.value} value={cls.value}>
                  {cls.label}
                </option>
              ))}
            </select>
            {errors.class && <p className="text-sm text-red-600 mt-1">{errors.class.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (months) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('duration', { valueAsNumber: true })}
              min="1"
              max="36"
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
              min="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="45000"
            />
            {errors.totalFees && (
              <p className="text-sm text-red-600 mt-1">{errors.totalFees.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructor <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('instructor')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Dr. Priya Sharma"
            />
            {errors.instructor && (
              <p className="text-sm text-red-600 mt-1">{errors.instructor.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Capacity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('maxCapacity', { valueAsNumber: true })}
              min="1"
              max="500"
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
              min={today}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.startDate && (
              <p className="text-sm text-red-600 mt-1">{errors.startDate.message}</p>
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
              placeholder="Mon, Wed, Fri - 4:00 PM to 6:00 PM"
            />
            {errors.schedule && (
              <p className="text-sm text-red-600 mt-1">{errors.schedule.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
          Syllabus Topics (Optional)
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            value={currentTopic}
            onChange={(e) => setCurrentTopic(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTopic()
              }
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter topic and press Enter or click Add"
          />
          <Button type="button" onClick={addTopic} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        {topics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                <span>{topic}</span>
                <button
                  type="button"
                  onClick={() => removeTopic(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
          Course Features (Optional)
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            value={currentFeature}
            onChange={(e) => setCurrentFeature(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addFeature()
              }
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter feature and press Enter or click Add"
          />
          <Button type="button" onClick={addFeature} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        {features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                <span>{feature}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-green-600 hover:text-green-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
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
              Creating...
            </>
          ) : (
            'Create Course'
          )}
        </Button>
      </div>
    </form>
  )
}
