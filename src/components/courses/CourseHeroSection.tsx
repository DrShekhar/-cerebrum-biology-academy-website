'use client'

import { CourseProgram, CourseSeries } from '@/types/courseSystem'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import {
  Clock,
  Users,
  Calendar,
  Star,
  Award,
  BookOpen,
  Download,
  Play,
  Phone,
  TrendingUp,
} from 'lucide-react'
import { useState } from 'react'
import { DemoClassModal } from './DemoClassModal'
import { SyllabusDownloadModal } from './SyllabusDownloadModal'

interface CourseHeroSectionProps {
  course: CourseProgram
}

export function CourseHeroSection({ course }: CourseHeroSectionProps) {
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [showSyllabusModal, setShowSyllabusModal] = useState(false)

  // Get the tier colors based on series
  const getTierColor = (series: CourseSeries) => {
    switch (series) {
      case 'pinnacle':
        return 'from-purple-600 to-purple-800'
      case 'ascent':
        return 'from-blue-600 to-blue-800'
      case 'pursuit':
        return 'from-green-600 to-green-800'
      default:
        return 'from-gray-600 to-gray-800'
    }
  }

  const getDefaultTier = () => {
    if (course.tiers.ascent) return 'ascent'
    if (course.tiers.pinnacle) return 'pinnacle'
    return 'pursuit'
  }

  const defaultTier = getDefaultTier()
  const primaryTier = course.tiers[defaultTier as CourseSeries]

  return (
    <section
      className={`relative bg-gradient-to-r ${getTierColor(defaultTier as CourseSeries)} text-white`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-20">
        <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Course Info */}
          <div className="space-y-6 sm:space-y-8">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {course.isPopular && (
                <Badge variant="secondary" className="bg-yellow-500 text-black hover:bg-yellow-400">
                  <Star className="h-3 w-3 mr-1" />
                  Popular Choice
                </Badge>
              )}
              {course.isFeatured && (
                <Badge variant="secondary" className="bg-red-500 text-white hover:bg-red-400">
                  <Award className="h-3 w-3 mr-1" />
                  Featured Course
                </Badge>
              )}
              <Badge variant="outline" className="border-white text-white">
                Class {course.targetClass}
              </Badge>
            </div>

            {/* Course Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                {course.name}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-4 sm:mb-6">
                {course.description}
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="text-center">
                <div className="bg-white/20 rounded-lg p-3 sm:p-4">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2" />
                  <div className="text-sm sm:text-base font-semibold">{course.duration}</div>
                  <div className="text-xs sm:text-sm text-white/80">Duration</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-lg p-3 sm:p-4">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2" />
                  <div className="text-sm sm:text-base font-semibold">{primaryTier.batchSize}</div>
                  <div className="text-xs sm:text-sm text-white/80">Batch Size</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-lg p-3 sm:p-4">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2" />
                  <div className="text-sm sm:text-base font-semibold">
                    {course.curriculum.totalModules}
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">Modules</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-lg p-3 sm:p-4">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2" />
                  <div className="text-sm sm:text-base font-semibold">
                    {course.teachingHours}hrs
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">Weekly</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-gray-900 hover:bg-gray-100 font-semibold min-h-[44px] w-full sm:w-auto text-sm sm:text-base"
                onClick={() => setShowDemoModal(true)}
              >
                <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Book Free Demo Class
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 min-h-[44px] w-full sm:w-auto text-sm sm:text-base"
                onClick={() => setShowSyllabusModal(true)}
              >
                <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Download Syllabus
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 min-h-[44px] w-full sm:w-auto text-sm sm:text-base"
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Talk to Counselor
              </Button>
            </div>
          </div>

          {/* Right Column - Course Highlights */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-5 sm:p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Course Highlights
              </h3>
              <ul className="space-y-3">
                {primaryTier.additionalBenefits.slice(0, 4).map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-white rounded-full mt-2 flex-shrink-0" />
                    <span className="text-white/90">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Price Starting From */}
            <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black p-6 border-0">
              <div className="text-center">
                <div className="text-sm font-medium mb-1">Starting from</div>
                <div className="text-3xl font-bold mb-2">
                  ₹
                  {Math.min(
                    course.tiers.pursuit?.price || 0,
                    course.tiers.ascent?.price || 0,
                    course.tiers.pinnacle?.price || 0
                  ).toLocaleString()}
                </div>
                <div className="text-sm">EMI options available • Money-back guarantee</div>
              </div>
            </Card>

            {/* Enrollment Bonus */}
            {primaryTier.enrollmentBonus && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-6">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Limited Time Bonus
                </h4>
                <ul className="space-y-2">
                  {primaryTier.enrollmentBonus.slice(0, 3).map((bonus, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 bg-yellow-400 rounded-full flex-shrink-0" />
                      {bonus}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Demo Class Modal */}
      {showDemoModal && <DemoClassModal course={course} onClose={() => setShowDemoModal(false)} />}

      {/* Syllabus Download Modal */}
      {showSyllabusModal && (
        <SyllabusDownloadModal course={course} onClose={() => setShowSyllabusModal(false)} />
      )}
    </section>
  )
}
