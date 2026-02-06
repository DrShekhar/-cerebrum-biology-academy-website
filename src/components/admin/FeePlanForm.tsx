'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const feePlanSchema = z.object({
  leadId: z.string().min(1, 'Lead is required'),
  courseId: z.string().min(1, 'Course is required'),
  courseName: z.string().min(1),
  baseFee: z.number().min(0),
  discount: z.number().min(0),
  discountType: z.enum(['PERCENTAGE', 'FIXED_AMOUNT']),
  planType: z.string().min(1),
  startDate: z.string().min(1, 'Start date is required'),
})

type FormData = z.infer<typeof feePlanSchema>

interface Lead {
  id: string
  studentName: string
  phone: string
}

interface Course {
  id: string
  name: string
  totalFees: number
}

interface FeePlanFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export function FeePlanForm({ onSuccess, onCancel }: FeePlanFormProps) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [leadSearch, setLeadSearch] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(feePlanSchema),
    defaultValues: {
      discount: 0,
      discountType: 'PERCENTAGE',
      planType: 'FULL',
      baseFee: 0,
    },
  })

  const baseFee = watch('baseFee')
  const discount = watch('discount')
  const discountType = watch('discountType')
  const planType = watch('planType')

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

  useEffect(() => {
    if (leadSearch.length < 2) {
      setLeads([])
      return
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/admin/students?search=${encodeURIComponent(leadSearch)}&limit=10`
        )
        const data = await res.json()
        if (data.success && data.data?.students) {
          setLeads(
            data.data.students.map((s: any) => ({
              id: s.id,
              studentName: s.name,
              phone: s.phone || '',
            }))
          )
        }
      } catch {
        // ignore
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [leadSearch])

  const handleCourseChange = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId)
    if (course) {
      setValue('courseId', course.id)
      setValue('courseName', course.name)
      setValue('baseFee', course.totalFees)
    }
  }

  let totalFee = baseFee || 0
  if (discountType === 'PERCENTAGE') {
    totalFee = totalFee * (1 - (discount || 0) / 100)
  } else {
    totalFee = totalFee - (discount || 0)
  }
  totalFee = Math.max(0, Math.round(totalFee))

  const installmentCount =
    planType === 'QUARTERLY' ? 4 : planType === 'MONTHLY' ? 12 : 1
  const installmentAmount = Math.ceil(totalFee / installmentCount)

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/admin/fee-plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create fee plan')
      }

      toast.success('Fee plan created successfully!')
      reset()
      onSuccess()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to create fee plan'
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
          Student & Course
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student (Lead) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={leadSearch}
              onChange={(e) => setLeadSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search student..."
            />
            <input type="hidden" {...register('leadId')} />
            {leads.length > 0 && (
              <div className="mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-32 overflow-y-auto">
                {leads.map((lead) => (
                  <button
                    key={lead.id}
                    type="button"
                    onClick={() => {
                      setValue('leadId', lead.id)
                      setLeadSearch(lead.studentName)
                      setLeads([])
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                  >
                    {lead.studentName} ({lead.phone})
                  </button>
                ))}
              </div>
            )}
            {errors.leadId && (
              <p className="text-sm text-red-600 mt-1">{errors.leadId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course <span className="text-red-500">*</span>
            </label>
            <select
              onChange={(e) => handleCourseChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name} (&#8377;{course.totalFees?.toLocaleString('en-IN')})
                </option>
              ))}
            </select>
            <input type="hidden" {...register('courseId')} />
            <input type="hidden" {...register('courseName')} />
            {errors.courseId && (
              <p className="text-sm text-red-600 mt-1">{errors.courseId.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">
          Pricing
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Base Fee (&#8377;)
            </label>
            <input
              type="number"
              {...register('baseFee', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Type
            </label>
            <select
              {...register('discountType')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="PERCENTAGE">Percentage</option>
              <option value="FIXED_AMOUNT">Fixed Amount</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount {discountType === 'PERCENTAGE' ? '(%)' : '(₹)'}
            </label>
            <input
              type="number"
              {...register('discount', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min={0}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plan Type
            </label>
            <select
              {...register('planType')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="FULL">Full Payment</option>
              <option value="QUARTERLY">Quarterly (4 installments)</option>
              <option value="MONTHLY">Monthly (12 installments)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            {...register('startDate')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent max-w-xs"
          />
          {errors.startDate && (
            <p className="text-sm text-red-600 mt-1">{errors.startDate.message}</p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Preview</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-blue-600">Total Fee:</span>
            <p className="font-bold text-blue-900">
              ₹{totalFee.toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <span className="text-blue-600">Installments:</span>
            <p className="font-bold text-blue-900">{installmentCount}</p>
          </div>
          <div>
            <span className="text-blue-600">Per Installment:</span>
            <p className="font-bold text-blue-900">
              ~₹{installmentAmount.toLocaleString('en-IN')}
            </p>
          </div>
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
              Creating Fee Plan...
            </>
          ) : (
            'Create Fee Plan'
          )}
        </Button>
      </div>
    </form>
  )
}
