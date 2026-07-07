'use client'

/**
 * Teacher course builder page — thin wrapper over the shared CourseBuilder
 * (also rendered by the admin course workspace Curriculum tab).
 */

import { use } from 'react'
import { CourseBuilder } from '@/components/courses/builder/CourseBuilder'

export default function CourseBuilderPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params)
  return (
    <div className="p-6">
      <CourseBuilder courseId={courseId} backHref="/teacher/courses" />
    </div>
  )
}
