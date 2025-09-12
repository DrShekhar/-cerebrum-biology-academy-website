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
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const iconMap = {
  Users,
  Monitor,
  Smartphone,
}

export function CoursesSection() {
  const [selectedCategory, setSelectedCategory] = useState('classroom')

  const handleEnrollClick = (courseId: string) => {
    console.log(`Enroll clicked for course: ${courseId}`)
    // TODO: Implement enrollment system
  }

  const handleViewDetails = (courseId: string) => {
    const detailedCourse = detailedCourses.find((course) => course.id === courseId)
    if (detailedCourse) {
      window.location.href = `/courses/${detailedCourse.slug}`
    } else {
      console.log(`Course details not found for: ${courseId}`)
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            Our Courses
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Path to <span className="text-blue-600">NEET Success</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive biology coaching programs designed for every student&apos;s needs. From
            foundation building to intensive preparation - we&apos;ve got you covered.
          </p>
        </motion.div>

        {/* Course Categories */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {courseCategories.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap]
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">{category.name}</div>
                  <div className="text-sm opacity-80">{category.description}</div>
                </div>
              </button>
            )
          })}
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Course Header */}
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      course.targetClass === '11th'
                        ? 'bg-green-100 text-green-600'
                        : course.targetClass === '12th'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-purple-100 text-purple-600'
                    }`}
                  >
                    {course.targetClass === 'Dropper'
                      ? 'Dropper Batch'
                      : `Class ${course.targetClass}`}
                  </span>
                  <Award className="w-6 h-6 text-yellow-500" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>

                <p className="text-gray-600 mb-6">{course.description}</p>

                {/* Course Meta */}
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
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
                <div className="flex items-center space-x-2 mb-6">
                  <IndianRupee className="w-6 h-6 text-green-600" />
                  <span className="text-3xl font-bold text-gray-900">
                    {course.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-gray-500">/ year</span>
                </div>
              </div>

              {/* Features List */}
              <div className="p-8">
                <h4 className="font-semibold text-gray-900 mb-4">What&apos;s Included:</h4>
                <ul className="space-y-3 mb-8">
                  {course.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    onClick={() => handleEnrollClick(course.id)}
                  >
                    Enroll Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => handleViewDetails(course.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">Not Sure Which Course is Right for You?</h3>
          <p className="text-xl mb-8 opacity-90">
            Get personalized guidance from our expert counselors to choose the perfect program
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary_cta"
              size="xl"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Free Counseling Session
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Download Brochure
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
