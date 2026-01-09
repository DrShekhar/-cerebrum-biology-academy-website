'use client'

import { Button } from '@/components/ui/Button'
import { courses, courseCategories } from '@/data/courses'
import { detailedCourses } from '@/data/detailedCourses'
import {
  Clock,
  IndianRupee,
  CheckCircle,
  Users,
  Monitor,
  Smartphone,
  BookOpen,
  Award,
  Target,
  Download,
  MessageCircle,
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/contexts/I18nContext'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

// Lightweight scroll animation hook (replaces framer-motion)
function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element) // Stop observing once visible
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

const iconMap = {
  Users,
  Monitor,
  Smartphone,
}

export function CoursesSection() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('classroom')
  const { t } = useI18n()

  // Scroll animation hooks
  const headerAnim = useScrollAnimation()
  const categoriesAnim = useScrollAnimation()
  const ctaAnim = useScrollAnimation()

  const handleEnrollClick = (courseId: string) => {
    router.push(`/enrollment?course=${courseId}`)
  }

  const handleViewDetails = (courseId: string) => {
    // Create a slug from the course ID for navigation
    const slug = courseId.replace(/-/g, '-')
    router.push(`/courses/${slug}`)
  }

  const handleCounselingClick = () => {
    router.push('/demo-booking?type=counseling')
  }

  const handleBrochureDownload = () => {
    // Trigger brochure download
    window.open('/brochure.pdf', '_blank')
  }

  const handleWhatsAppEnquiry = (courseTitle: string) => {
    trackAndOpenWhatsApp({
      source: 'course-card',
      message: `Hi! I'm interested in the "${courseTitle}" course. Can you share more details about the curriculum, fees, and admission process?`,
      campaign: 'courses-section',
    })
  }

  return (
    <section className="py-12 xs:py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerAnim.ref}
          className={`text-center mb-10 xs:mb-12 sm:mb-16 transition-all duration-600 ${
            headerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium mb-3 xs:mb-4">
            <BookOpen className="w-3 xs:w-4 h-3 xs:h-4 mr-2" />
            {t('ourCourses')}
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 xs:mb-6">
            {t('courses')} - <span className="text-blue-600">NEET</span>
          </h2>

          <p className="text-base xs:text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('viewAllCourses')}
          </p>
        </div>

        {/* Course Categories */}
        <div
          ref={categoriesAnim.ref}
          className={`flex flex-wrap justify-center gap-3 xs:gap-4 mb-8 xs:mb-10 sm:mb-12 transition-all duration-600 delay-200 ${
            categoriesAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {courseCategories.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap]
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                aria-label={`${category.name}: ${category.description}`}
                aria-pressed={selectedCategory === category.id}
                className={`flex items-center space-x-2 xs:space-x-3 px-4 xs:px-5 sm:px-6 py-3 xs:py-4 rounded-xl transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <IconComponent className="w-5 h-5" aria-hidden="true" />
                <div className="text-left">
                  <div className="font-semibold">{category.name}</div>
                  <div className="text-sm text-current/90">{category.description}</div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-10 xs:mb-12 sm:mb-16">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="bg-white rounded-xl xs:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Course Header */}
              <div className="p-5 xs:p-6 sm:p-8 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      course.targetClass === '11th'
                        ? 'bg-green-100 text-green-800'
                        : course.targetClass === '12th'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {course.targetClass === 'Dropper'
                      ? 'Dropper Batch'
                      : `Class ${course.targetClass}`}
                  </span>
                  <Award className="w-6 h-6 text-yellow-500" />
                </div>

                <h3 className="text-xl xs:text-2xl font-bold text-gray-900 mb-2 xs:mb-3 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>

                <p className="text-sm xs:text-base text-gray-600 mb-4 xs:mb-6">
                  {course.description}
                </p>

                {/* Course Meta */}
                <div className="flex items-center space-x-4 xs:space-x-6 text-xs xs:text-sm text-gray-500 mb-4 xs:mb-6">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    NEET Focused
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center space-x-1.5 xs:space-x-2 mb-4 xs:mb-6">
                  <IndianRupee className="w-5 xs:w-6 h-5 xs:h-6 text-green-600" />
                  <span className="text-2xl xs:text-3xl font-bold text-gray-900">
                    {course.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm xs:text-base text-gray-500">/ year</span>
                </div>
              </div>

              {/* Features List */}
              <div className="p-5 xs:p-6 sm:p-8">
                <h4 className="text-sm xs:text-base font-semibold text-gray-900 mb-3 xs:mb-4">
                  What&apos;s Included:
                </h4>
                <ul className="space-y-2 xs:space-y-3 mb-6 xs:mb-8">
                  {course.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start text-sm xs:text-base text-gray-600"
                    >
                      <CheckCircle className="w-4 xs:w-5 h-4 xs:h-5 text-green-600 mr-2 xs:mr-3 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      onClick={() => handleEnrollClick(course.id)}
                    >
                      {t('enrollNow')}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => handleViewDetails(course.id)}
                    >
                      {t('learnMore')}
                    </Button>
                  </div>
                  <button
                    onClick={() => handleWhatsAppEnquiry(course.title)}
                    className="w-full flex items-center justify-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Ask on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          ref={ctaAnim.ref}
          className={`text-center bg-indigo-500 rounded-2xl xs:rounded-3xl p-6 xs:p-8 sm:p-12 text-white mx-2 transition-all duration-600 ${
            ctaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-3 xs:mb-4">
            Not Sure Which Course is Right for You?
          </h3>
          <p className="text-base xs:text-lg sm:text-xl mb-6 xs:mb-8 text-green-100 px-2">
            Get personalized guidance from our expert counselors to choose the perfect program
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-2xl mx-auto px-2">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 text-sm sm:text-base px-4 sm:px-6"
              onClick={handleCounselingClick}
            >
              <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="hidden sm:inline">Free Counseling</span>
              <span className="sm:hidden">Counseling</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600 text-sm sm:text-base px-4 sm:px-6"
              onClick={handleBrochureDownload}
            >
              <Download className="w-4 h-4 mr-2 flex-shrink-0" />
              Brochure
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
