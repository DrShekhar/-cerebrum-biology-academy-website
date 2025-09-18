'use client'

import { CourseProgram } from '@/types/courseSystem'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { CourseHeroSection } from './CourseHeroSection'
import { CourseCurriculum } from './CourseCurriculum'
import { FacultyProfiles } from './FacultyProfiles'
import { CourseSchedule } from './CourseSchedule'
import { SuccessStories } from './SuccessStories'
import { CourseFAQ } from './CourseFAQ'
import { DetailedPricingSection } from './DetailedPricingSection'
import { FloatingCTABar } from './FloatingCTABar'

interface EnhancedCourseDetailPageProps {
  course: CourseProgram
}

export function EnhancedCourseDetailPage({ course }: EnhancedCourseDetailPageProps) {
  // Generate breadcrumb items
  const breadcrumbItems = [
    { label: 'Courses', href: '/courses' },
    {
      label: `Class ${course.targetClass}`,
      href: `/courses?class=${course.targetClass}`,
    },
    { label: course.name },
  ]

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation - Premium black theme */}
      <div className="bg-gray-900 border-b border-yellow-400/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Course Hero Section */}
      <CourseHeroSection course={course} />

      {/* Course Sections */}
      <div className="space-y-0">
        {/* Course Curriculum */}
        <section id="curriculum">
          <CourseCurriculum course={course} />
        </section>

        {/* Faculty Profiles */}
        <section id="faculty">
          <FacultyProfiles course={course} />
        </section>

        {/* Course Schedule */}
        <section id="schedule">
          <CourseSchedule course={course} />
        </section>

        {/* Success Stories */}
        <section id="success-stories">
          <SuccessStories course={course} />
        </section>

        {/* Detailed Pricing */}
        <section id="pricing">
          <DetailedPricingSection course={course} />
        </section>

        {/* FAQ Section */}
        <section id="faq">
          <CourseFAQ course={course} />
        </section>
      </div>

      {/* Floating CTA Bar */}
      <FloatingCTABar course={course} />
    </div>
  )
}
