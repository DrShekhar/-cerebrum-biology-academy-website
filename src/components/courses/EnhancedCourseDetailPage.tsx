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
import WhyStartEarlySection from './WhyStartEarlySection'
import ParentGuideSection from './ParentGuideSection'
import WhatsIncludedSection from './WhatsIncludedSection'
import EnrollmentStepsSection from './EnrollmentStepsSection'

interface EnhancedCourseDetailPageProps {
  course: CourseProgram
}

export function EnhancedCourseDetailPage({ course }: EnhancedCourseDetailPageProps) {
  const isFoundationCourse = ['9th', '10th'].includes(course.targetClass)

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
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Course Hero Section */}
      <CourseHeroSection course={course} />

      {/* Course Sections */}
      <div className="space-y-0">
        {/* Why Start Early — Foundation courses only */}
        {isFoundationCourse && (
          <section id="why-start-early">
            <WhyStartEarlySection />
          </section>
        )}

        {/* Course Curriculum */}
        <section id="curriculum">
          <CourseCurriculum course={course} />
        </section>

        {/* What's Included */}
        {isFoundationCourse && (
          <section id="whats-included">
            <WhatsIncludedSection />
          </section>
        )}

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

        {/* Parent's Guide — Foundation courses only */}
        {isFoundationCourse && (
          <section id="parent-guide">
            <ParentGuideSection />
          </section>
        )}

        {/* Detailed Pricing */}
        <section id="pricing">
          <DetailedPricingSection course={course} />
        </section>

        {/* Enrollment Steps */}
        <section id="enrollment">
          <EnrollmentStepsSection />
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
