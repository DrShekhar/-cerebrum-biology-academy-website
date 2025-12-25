'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Star, CheckCircle2 } from 'lucide-react'

interface Course {
  id: string
  badge: string
  title: string
  subtitle: string
  priceRange: string
  popular?: boolean
  details: {
    duration: string
    features: string[]
    highlights: string[]
    description: string
  }
}

interface SimplifiedCourseCardsProps {
  className?: string
}

export function SimplifiedCourseCards({ className = '' }: SimplifiedCourseCardsProps) {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)

  const courses: Course[] = [
    {
      id: 'foundation',
      badge: 'Class 9-10',
      title: 'Foundation',
      subtitle: 'Build your base',
      priceRange: '₹34,000 - 65,000',
      details: {
        duration: '2 Years',
        features: ['NCERT Foundation', 'Basic to Advanced', 'Regular Practice', 'Concept Building'],
        highlights: ['1200+ Students', '96% Board Success', 'Strong Foundation'],
        description:
          'Perfect foundation program for Class 9-10 students to build strong concepts for future NEET preparation.',
      },
    },
    {
      id: 'regular',
      badge: 'Class 11-12',
      title: 'Regular',
      subtitle: 'Comprehensive prep',
      priceRange: '₹48,000 - 98,000',
      popular: true,
      details: {
        duration: '2 Years',
        features: ['Complete NCERT', 'Advanced Problems', 'Regular Tests', 'Personal Mentoring'],
        highlights: ['1,50,000+ Students', '94.8% Success Rate', 'Most Popular'],
        description:
          'Complete 2-year NEET preparation program with comprehensive coverage of all topics and regular assessments.',
      },
    },
    {
      id: 'intensive',
      badge: 'Droppers',
      title: 'Intensive',
      subtitle: 'Transform now',
      priceRange: '₹88,000 - 180,000',
      details: {
        duration: '1 Year',
        features: [
          'Intensive Coverage',
          'Previous Year Focus',
          'Mock Test Series',
          'Strategy Sessions',
        ],
        highlights: ['800+ Students', '91% Success Rate', 'Second Chance Success'],
        description:
          'Intensive one-year program designed specifically for dropper students to achieve their NEET dreams.',
      },
    },
  ]

  const expandCourse = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId)
  }

  const handleExplore = (courseId: string) => {
    window.location.href = `/courses/${courseId}`
  }

  return (
    <section className={`courses py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Choose Your Path</h2>

        {/* Only 3 Main Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`course-card relative bg-white rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-300 ${
                course.popular ? 'popular border-blue-500 shadow-md' : 'border-gray-200'
              } ${expandedCourse === course.id ? 'ring-2 ring-blue-400' : ''}`}
              onClick={() => expandCourse(course.id)}
            >
              {course.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    POPULAR
                  </div>
                </div>
              )}

              <div className="card-header p-6 pb-4">
                <span className="badge inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {course.badge}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h3>
                <p className="text-gray-600">{course.subtitle}</p>
              </div>

              <div className="card-body p-6 pt-0">
                <div className="price text-2xl font-bold text-blue-600 mb-4">
                  {course.priceRange}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleExplore(course.id)
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Explore {course.title}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expandable Details */}
        <AnimatePresence>
          {expandedCourse && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="course-details bg-gray-50 rounded-xl p-6 overflow-hidden"
            >
              {(() => {
                const course = courses.find((c) => c.id === expandedCourse)
                if (!course) return null

                return (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {course.title} Program Details
                      </h3>
                      <p className="text-gray-600 mb-6">{course.details.description}</p>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Program Features:</h4>
                        <ul className="space-y-2">
                          {course.details.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h4 className="font-semibold text-gray-900 mb-4">Success Highlights:</h4>
                        <div className="space-y-3 mb-6">
                          {course.details.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Star className="h-5 w-5 text-yellow-500" />
                              <span className="text-gray-700">{highlight}</span>
                            </div>
                          ))}
                        </div>

                        <div className="border-t pt-4">
                          <div className="text-sm text-gray-600 mb-2">Duration</div>
                          <div className="text-lg font-semibold text-gray-900 mb-4">
                            {course.details.duration}
                          </div>

                          <div className="flex gap-3">
                            <button
                              onClick={() => handleExplore(course.id)}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                              View Full Details
                            </button>
                            <button
                              onClick={() => (window.location.href = '/demo')}
                              className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                              Book Demo
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
