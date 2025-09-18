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

  // Premium black-gold theme for medical professional positioning
  const getTierColor = (series: CourseSeries) => {
    // Unified premium black background for all course tiers
    // Creates medical professional aesthetic that builds trust
    return 'from-black via-gray-900 to-black'
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Course Info */}
          <div className="space-y-8">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {course.isPopular && (
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-bold border-2 border-yellow-300"
                >
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Popular Choice
                </Badge>
              )}
              {course.isFeatured && (
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-bold border-2 border-yellow-300"
                >
                  <Award className="h-3 w-3 mr-1 fill-current" />
                  Featured Course
                </Badge>
              )}
              <Badge variant="outline" className="border-white text-white">
                Class {course.targetClass}
              </Badge>
            </div>

            {/* Course Title */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{course.name}</h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-6">{course.description}</p>
            </div>

            {/* Key Stats - Premium black-gold design */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-gray-800/50 border border-yellow-400/30 rounded-xl p-4 hover:bg-gray-700/50 transition-all">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
                  <div className="font-bold text-xl text-white">{course.duration}</div>
                  <div className="text-sm text-gray-300">Duration</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gray-800/50 border border-yellow-400/30 rounded-xl p-4 hover:bg-gray-700/50 transition-all">
                  <Users className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
                  <div className="font-bold text-xl text-white">{primaryTier.batchSize}</div>
                  <div className="text-sm text-gray-300">Batch Size</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gray-800/50 border border-yellow-400/30 rounded-xl p-4 hover:bg-gray-700/50 transition-all">
                  <BookOpen className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
                  <div className="font-bold text-xl text-white">
                    {course.curriculum.totalModules}
                  </div>
                  <div className="text-sm text-gray-300">Modules</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gray-800/50 border border-yellow-400/30 rounded-xl p-4 hover:bg-gray-700/50 transition-all">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
                  <div className="font-bold text-xl text-white">{course.teachingHours}hrs</div>
                  <div className="text-sm text-gray-300">Weekly</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons - Premium black-gold theme */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-bold border-2 border-yellow-300 shadow-lg hover:shadow-xl transition-all"
                onClick={() => setShowDemoModal(true)}
              >
                <Play className="h-5 w-5 mr-2 fill-current" />
                Book Free Demo Class
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold"
                onClick={() => setShowSyllabusModal(true)}
              >
                <Download className="h-5 w-5 mr-2" />
                Download Syllabus
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold"
              >
                <Phone className="h-5 w-5 mr-2" />
                Talk to Counselor
              </Button>
            </div>
          </div>

          {/* Right Column - Course Highlights - Premium theme */}
          <div className="space-y-6">
            <Card className="bg-gray-800/80 backdrop-blur-sm border-2 border-yellow-400/30 text-white p-6 shadow-xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-yellow-400">
                <TrendingUp className="h-5 w-5 mr-2" />
                Course Highlights
              </h3>
              <ul className="space-y-3">
                {primaryTier.additionalBenefits.slice(0, 4).map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-200">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Price Starting From - Enhanced gold design */}
            <Card className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-black p-6 border-0 shadow-2xl">
              <div className="text-center">
                <div className="text-sm font-bold mb-1 uppercase tracking-wide">Starting from</div>
                <div className="text-4xl font-black mb-2">
                  ₹
                  {Math.min(
                    course.tiers.pursuit?.price || 0,
                    course.tiers.ascent?.price || 0,
                    course.tiers.pinnacle?.price || 0
                  ).toLocaleString()}
                </div>
                <div className="text-sm font-semibold">
                  EMI options available • Money-back guarantee
                </div>
              </div>
            </Card>

            {/* Enrollment Bonus - Premium theme */}
            {primaryTier.enrollmentBonus && (
              <Card className="bg-gray-800/80 backdrop-blur-sm border-2 border-yellow-400/30 text-white p-6 shadow-xl">
                <h4 className="font-semibold mb-3 flex items-center text-yellow-400">
                  <Award className="h-4 w-4 mr-2" />
                  Limited Time Bonus
                </h4>
                <ul className="space-y-2">
                  {primaryTier.enrollmentBonus.slice(0, 3).map((bonus, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 bg-yellow-400 rounded-full flex-shrink-0" />
                      <span className="text-gray-200">{bonus}</span>
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
