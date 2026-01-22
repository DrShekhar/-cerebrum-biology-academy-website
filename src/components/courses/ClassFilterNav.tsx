'use client'

import { ClassLevel } from '@/types/courseSystem'

interface ClassFilterNavProps {
  selectedClass: ClassLevel | 'all'
  onClassSelect: (classLevel: ClassLevel | 'all') => void
  courseCounts: Record<ClassLevel, number>
}

export function ClassFilterNav({
  selectedClass,
  onClassSelect,
  courseCounts,
}: ClassFilterNavProps) {
  const classOptions: Array<{ value: ClassLevel | 'all'; label: string; emoji: string }> = [
    { value: 'all', label: 'All Classes', emoji: '📚' },
    { value: '9th', label: 'Class 9th', emoji: '🌱' },
    { value: '10th', label: 'Class 10th', emoji: '🌿' },
    { value: '11th', label: 'Class 11th', emoji: '🎯' },
    { value: '12th', label: 'Class 12th', emoji: '🏆' },
    { value: 'Dropper', label: 'Dropper', emoji: '💪' },
    { value: '2-Year', label: '2-Year Complete', emoji: '📅' },
  ]

  const getTotalCourses = () => {
    return Object.values(courseCounts).reduce((sum, count) => sum + count, 0)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-1 xs:p-1.5 sm:p-2 mb-8 overflow-x-auto scrollbar-hide">
      <div className="flex space-x-1 xs:space-x-1.5 sm:space-x-2 min-w-max">
        {classOptions.map((option) => {
          const courseCount =
            option.value === 'all'
              ? getTotalCourses()
              : courseCounts[option.value as ClassLevel] || 0
          const isSelected = selectedClass === option.value

          return (
            <button
              key={option.value}
              onClick={() => onClassSelect(option.value)}
              className={`flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2 px-2 xs:px-3 sm:px-6 py-1.5 xs:py-2 sm:py-3 rounded-lg xs:rounded-xl font-semibold transition-all duration-200 whitespace-nowrap text-xs xs:text-sm sm:text-base ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
              }`}
            >
              <span className="text-sm xs:text-base sm:text-xl">{option.emoji}</span>
              <span>{option.label}</span>
              <span
                className={`px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full text-xxs xs:text-xs ${
                  isSelected ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {courseCount}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
