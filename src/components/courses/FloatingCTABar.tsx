'use client'

import { useState, useEffect } from 'react'
import { CourseProgram } from '@/types/courseSystem'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { DemoClassModal } from './DemoClassModal'
import { Phone, Play, CreditCard, X, Clock, Users } from 'lucide-react'

interface FloatingCTABarProps {
  course: CourseProgram
}

export function FloatingCTABar({ course }: FloatingCTABarProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [showDemoModal, setShowDemoModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show the floating bar when user scrolls past the hero section
      const heroHeight = window.innerHeight
      const scrollY = window.scrollY

      if (scrollY > heroHeight && !isDismissed) {
        setIsVisible(true)
      } else if (scrollY <= heroHeight) {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  // Get the minimum price across all tiers
  const minPrice = Math.min(
    course.tiers.pursuit.price,
    course.tiers.ascent.price,
    course.tiers.pinnacle.price
  )

  if (!isVisible || isDismissed) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-blue-600 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Course Info */}
          <div className="flex items-center gap-4 flex-1">
            <div className="hidden sm:block">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <div className="text-sm font-bold text-blue-600">
                  {course.name
                    .split(' ')
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join('')}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-1">
                {course.name}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Users className="h-3 w-3" />
                  Small batches
                </div>
                <Badge variant="secondary" className="text-xs">
                  Starting ₹{minPrice.toLocaleString()}
                </Badge>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            <Button
              size="sm"
              variant="outline"
              className="hidden sm:flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => setShowDemoModal(true)}
            >
              <Play className="h-4 w-4" />
              Demo Class
            </Button>

            <a href="tel:+918826444334">
              <Button size="sm" variant="outline" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Call Now</span>
                <span className="sm:hidden">Call</span>
              </Button>
            </a>

            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              onClick={() => {
                window.location.href = `/checkout?course=${encodeURIComponent(course.id)}`
              }}
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Enroll Now</span>
              <span className="sm:hidden">Enroll</span>
            </Button>
          </div>

          {/* Dismiss Button */}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDismiss}
            className="ml-2 p-1 h-8 w-8 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm">
            <span className="font-medium">🔥 Limited Time Offer:</span>
            <span className="ml-2">Free study materials worth ₹5,000 with enrollment</span>
            <span className="ml-2 font-medium">Hurry, only few seats left!</span>
          </div>
        </div>
      </div>

      {/* Demo Class Modal */}
      {showDemoModal && <DemoClassModal course={course} onClose={() => setShowDemoModal(false)} />}
    </div>
  )
}
