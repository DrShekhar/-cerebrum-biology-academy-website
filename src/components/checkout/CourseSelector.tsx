'use client'

import { GraduationCap, BookOpen, Target, Beaker } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ClassLevel, CourseType, allClassPricing } from '@/data/pricing'

interface CourseSelectorProps {
  selectedClass: ClassLevel | null
  selectedCourseType: CourseType | null
  onClassSelect: (classLevel: ClassLevel) => void
  onCourseTypeSelect: (courseType: CourseType) => void
}

const classOptions: { value: ClassLevel; label: string; description: string }[] = [
  { value: 'foundation-9', label: 'Class 9th', description: 'Foundation course' },
  { value: 'foundation-10', label: 'Class 10th', description: 'Foundation course' },
  { value: 'class-11', label: 'Class 11th', description: '1 year program' },
  { value: 'class-12', label: 'Class 12th', description: '1 year intensive' },
  { value: 'dropper', label: 'Dropper/Repeater', description: '1 year intensive' },
  { value: '2-year', label: '2-Year Program', description: 'Class 11 + 12' },
]

const courseTypeLabels: Record<
  CourseType,
  { label: string; icon: typeof BookOpen; description: string }
> = {
  academic: {
    label: 'Academic Only',
    icon: BookOpen,
    description: 'School syllabus focus',
  },
  neet: {
    label: 'NEET Biology',
    icon: Target,
    description: 'Complete NEET preparation',
  },
  'board-only': {
    label: 'Board Only',
    icon: GraduationCap,
    description: 'Board exam excellence',
  },
  'board-neet': {
    label: 'Board + NEET',
    icon: Beaker,
    description: 'Dual preparation',
  },
  flagship: {
    label: 'Flagship (11th+12th)',
    icon: Target,
    description: '1-Year intensive NEET ZA',
  },
}

export function CourseSelector({
  selectedClass,
  selectedCourseType,
  onClassSelect,
  onCourseTypeSelect,
}: CourseSelectorProps) {
  const selectedClassData = selectedClass
    ? allClassPricing.find((c) => c.class === selectedClass)
    : null

  const availableCourseTypes = selectedClassData?.availableCourseTypes || []

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Select Your Class</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {classOptions.map((option) => {
            const isSelected = selectedClass === option.value

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onClassSelect(option.value)
                  onCourseTypeSelect(null as unknown as CourseType)
                }}
                className={cn(
                  'rounded-lg border-2 p-4 text-left transition-all',
                  isSelected
                    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-offset-2'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-lg',
                      isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                    )}
                  >
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{option.label}</h4>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {selectedClass && availableCourseTypes.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900">Select Course Type</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {availableCourseTypes.map((type) => {
              const isSelected = selectedCourseType === type
              const typeInfo = courseTypeLabels[type]
              const Icon = typeInfo.icon

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onCourseTypeSelect(type)}
                  className={cn(
                    'rounded-lg border-2 p-4 text-left transition-all',
                    isSelected
                      ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-offset-2'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-lg',
                        isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{typeInfo.label}</h4>
                      <p className="text-sm text-gray-600">{typeInfo.description}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
