'use client'

import { useState, useMemo } from 'react'
import { InternationalCourseCard } from './InternationalCourseCard'
import { CourseFilters } from './CourseFilters'
import type { Course } from '@/lib/international/courses'
import type { CountryConfig } from '@/lib/international/countries'

interface CourseGridProps {
  courses: Course[]
  country: CountryConfig
}

const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'] as const

export function CourseGrid({ courses, country }: CourseGridProps) {
  const [selectedExamSystem, setSelectedExamSystem] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')

  const examSystems = useMemo(() => {
    const systems = new Set(courses.map((course) => course.examSystem))
    return Array.from(systems).sort()
  }, [courses])

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesExam = selectedExamSystem === 'all' || course.examSystem === selectedExamSystem
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
      return matchesExam && matchesLevel
    })
  }, [courses, selectedExamSystem, selectedLevel])

  const handleClearFilters = () => {
    setSelectedExamSystem('all')
    setSelectedLevel('all')
  }

  return (
    <div>
      <CourseFilters
        examSystems={examSystems}
        levels={[...LEVELS]}
        selectedExamSystem={selectedExamSystem}
        selectedLevel={selectedLevel}
        onExamSystemChange={setSelectedExamSystem}
        onLevelChange={setSelectedLevel}
        onClearFilters={handleClearFilters}
        totalCourses={courses.length}
        filteredCount={filteredCourses.length}
      />

      {filteredCourses.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-2">No courses match your filters.</p>
          <button
            onClick={handleClearFilters}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <InternationalCourseCard key={course.id} course={course} country={country} />
          ))}
        </div>
      )}
    </div>
  )
}
