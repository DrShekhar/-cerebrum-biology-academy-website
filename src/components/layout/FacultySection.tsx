'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { facultyMembers, facultyStats, facultyHighlights } from '@/data/faculty'
import {
  Award,
  BookOpen,
  Star,
  GraduationCap,
  Heart,
  Target,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/contexts/I18nContext'
import { useState, useEffect, useRef } from 'react'

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
          observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

export function FacultySection() {
  const router = useRouter()
  const { t } = useI18n()

  // Scroll animation hooks
  const headerAnim = useScrollAnimation()
  const statsAnim = useScrollAnimation()
  const gridAnim = useScrollAnimation()
  const highlightsAnim = useScrollAnimation()
  const methodologyAnim = useScrollAnimation()
  const ctaAnim = useScrollAnimation()

  const handleMeetFaculty = () => {
    router.push('/faculty')
  }

  const handleBookDemo = () => {
    router.push('/demo-booking')
  }

  return (
    <section className="py-12 xs:py-16 sm:py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerAnim.ref}
          className={`text-center mb-10 xs:mb-12 sm:mb-16 transition-all duration-600 ${
            headerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium mb-3 xs:mb-4">
            <GraduationCap className="w-3 xs:w-4 h-3 xs:h-4 mr-2" />
            {t('faculty')}
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 xs:mb-5 sm:mb-6">
            {t('aiims')} <span className="text-blue-600">{t('trainedFaculty')}</span>
          </h2>

          <p className="text-base xs:text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('faculty')} - {t('aiims')}
          </p>
        </div>

        {/* Faculty Statistics */}
        <div
          ref={statsAnim.ref}
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 mb-10 xs:mb-12 sm:mb-16 transition-all duration-600 delay-200 ${
            statsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {facultyStats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-4 xs:p-5 sm:p-6 bg-white rounded-xl xs:rounded-2xl shadow-sm hover:shadow-md transition-shadow animate-fade-in-up"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className="text-2xl xs:text-3xl font-bold text-blue-600 mb-1.5 xs:mb-2">
                {stat.number}
              </div>
              <div className="text-sm xs:text-base font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-xs xs:text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Faculty Grid */}
        <div
          ref={gridAnim.ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xs:gap-6 sm:gap-8 mb-10 xs:mb-12 sm:mb-16 transition-all duration-600 delay-300 ${
            gridAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {facultyMembers.map((faculty, index) => (
            <div
              key={faculty.id}
              className="bg-white rounded-2xl xs:rounded-3xl shadow-lg hover:shadow-xl transition-shadow p-5 xs:p-6 sm:p-8 group animate-fade-in-up"
              style={{ animationDelay: `${500 + index * 100}ms` }}
            >
              {/* Faculty Image */}
              <div className="w-20 xs:w-22 sm:w-24 h-20 xs:h-22 sm:h-24 mx-auto mb-4 xs:mb-5 sm:mb-6 rounded-full overflow-hidden border-4 border-blue-100 group-hover:scale-105 transition-transform shadow-lg">
                {faculty.image && !faculty.image.includes('ui-avatars.com') ? (
                  <Image
                    src={faculty.image}
                    alt={faculty.name}
                    width={96}
                    height={96}
                    quality={80}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 640px) 80px, 96px"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xl xs:text-2xl sm:text-3xl">
                      {faculty.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </span>
                  </div>
                )}
              </div>

              {/* Faculty Info */}
              <div className="text-center mb-4 xs:mb-5 sm:mb-6">
                <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-1.5 xs:mb-2">
                  {faculty.name}
                </h3>
                <div className="flex items-center justify-center text-gray-600 text-xs xs:text-sm mb-2 xs:mb-3">
                  <Award className="w-3.5 xs:w-4 h-3.5 xs:h-4 mr-1" />
                  {faculty.experience}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 xs:w-4 h-3.5 xs:h-4 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 text-xs xs:text-sm">4.9/5</span>
              </div>
            </div>
          ))}
        </div>

        {/* Faculty Highlights */}
        <div
          ref={highlightsAnim.ref}
          className={`bg-white rounded-2xl xs:rounded-3xl shadow-xl p-5 xs:p-6 sm:p-8 md:p-12 mb-8 xs:mb-10 sm:mb-12 transition-all duration-600 ${
            highlightsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="text-center mb-6 xs:mb-7 sm:mb-8">
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 mb-3 xs:mb-4">
              Why Our Faculty Stands Apart
            </h3>
            <p className="text-sm xs:text-base sm:text-lg text-gray-600">
              Experience the difference that expert guidance makes in your NEET preparation journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6">
            {facultyHighlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 xs:space-x-4 animate-fade-in-left"
                style={{ animationDelay: `${900 + index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 xs:w-4.5 sm:w-5 h-4 xs:h-4.5 sm:h-5 text-green-600" />
                </div>
                <p className="text-sm xs:text-base text-gray-700 font-medium">{highlight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Teaching Methodology */}
        <div className="text-center mb-8 xs:mb-10 sm:mb-12">
          <h3 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Teaching <span className="text-blue-600">Methodology</span>
          </h3>
          <p className="text-base xs:text-lg text-gray-600 max-w-3xl mx-auto">
            At Cerebrum Biology Academy, we combine traditional teaching excellence with modern pedagogical approaches. Our AIIMS Trained faculty employs proven methods that ensure deep conceptual understanding, exam readiness, and long-term retention of biological concepts for NEET success.
          </p>
        </div>

        <div
          ref={methodologyAnim.ref}
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 xs:gap-6 sm:gap-8 mb-8 xs:mb-10 sm:mb-12 transition-all duration-600 ${
            methodologyAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="text-center p-5 xs:p-6 sm:p-8 bg-white rounded-xl xs:rounded-2xl shadow-lg">
            <div className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 mx-auto mb-3 xs:mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 text-blue-600" />
            </div>
            <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3">
              Conceptual Teaching
            </h3>
            <p className="text-sm xs:text-base text-gray-600">
              We emphasize deep understanding through concept-based learning, real-world examples, and clinical case studies rather than rote memorization. Our faculty connects biological concepts to practical applications, making complex topics like Genetics, Physiology, and Ecology easy to understand and remember. Interactive discussions and doubt-clearing sessions ensure every student grasps fundamental principles thoroughly.
            </p>
          </div>

          <div className="text-center p-5 xs:p-6 sm:p-8 bg-white rounded-xl xs:rounded-2xl shadow-lg">
            <div className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 mx-auto mb-3 xs:mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <Target className="w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 text-purple-600" />
            </div>
            <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3">
              NEET Focused Strategy
            </h3>
            <p className="text-sm xs:text-base text-gray-600">
              Our strategic approach aligns perfectly with NEET exam patterns, focusing on high-yield topics and frequently asked concepts. Weekly assessments mirror the actual NEET paper structure with detailed performance analysis and improvement strategies. We provide extensive practice with previous year questions, topic-wise tests, and full-length mock exams to build speed, accuracy, and exam temperament for NEET success.
            </p>
          </div>

          <div className="text-center p-5 xs:p-6 sm:p-8 bg-white rounded-xl xs:rounded-2xl shadow-lg">
            <div className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 mx-auto mb-3 xs:mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <Heart className="w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 text-green-600" />
            </div>
            <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3">
              Personal Mentoring
            </h3>
            <p className="text-sm xs:text-base text-gray-600">
              With small batch sizes of maximum 15 students, we ensure individual attention and personalized guidance for every student. Our faculty tracks each student's progress through regular assessments, identifies weak areas, and provides customized improvement plans. One-on-one doubt sessions, parent-teacher meetings, and motivational counseling create a supportive environment where every student can achieve their full potential and realize their NEET dreams.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div
          ref={ctaAnim.ref}
          className={`text-center bg-indigo-500 rounded-2xl xs:rounded-3xl p-6 xs:p-8 sm:p-12 text-white transition-all duration-600 ${
            ctaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-3 xs:mb-4">
            Ready to Learn from the Best?
          </h3>
          <p className="text-base xs:text-lg sm:text-xl mb-6 xs:mb-8 text-green-100">
            Join thousands of students who achieved NEET success under expert guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              variant="secondary"
              size="xl"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={handleMeetFaculty}
            >
              Meet Our Faculty
              <ArrowRight className="w-3 xs:w-4 h-3 xs:h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={handleBookDemo}
            >
              Book Demo Class
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
