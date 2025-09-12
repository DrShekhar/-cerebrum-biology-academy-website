'use client'

import { Button } from '@/components/ui/Button'
import { detailedCourses } from '@/data/detailedCourses'
import {
  Clock,
  Users,
  Star,
  CheckCircle,
  Calendar,
  BookOpen,
  Award,
  Target,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function CoursesListingPage() {
  const handleEnrollClick = (courseId: string) => {
    console.log(`Enroll clicked for course: ${courseId}`)
    // TODO: Implement enrollment system
  }

  const handleBookDemo = () => {
    console.log('Book demo clicked')
    // TODO: Implement demo booking system
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              Expert NEET Biology Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Choose Your <span className="text-yellow-300">NEET Biology</span> Course
            </h1>

            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Comprehensive courses designed by AIIMS experts for Class 11th, 12th, and dropper
              students
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">3</div>
                <div className="text-sm opacity-80">Specialized Courses</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">AIIMS</div>
                <div className="text-sm opacity-80">Expert Faculty</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {detailedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Course Header */}
                <div className="relative p-8 bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                  {course.isPopular && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Popular
                    </div>
                  )}

                  <div className="mb-4">
                    <div className="text-sm opacity-80 mb-2">{course.targetClass} Class</div>
                    <h2 className="text-2xl font-bold mb-3">{course.title}</h2>
                    <p className="text-sm opacity-90 line-clamp-2">{course.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">
                      ₹
                      {course.discount
                        ? (
                            course.price -
                            (course.price * course.discount.percentage) / 100
                          ).toLocaleString()
                        : course.price.toLocaleString()}
                      {course.discount && (
                        <span className="text-lg text-gray-200 line-through ml-2">
                          ₹{course.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {course.discount && (
                      <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                        {course.discount.percentage}% OFF
                      </div>
                    )}
                  </div>
                </div>

                {/* Course Details */}
                <div className="p-8">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      {course.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-green-600" />
                      {course.batchSize} students
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                      {course.schedule.frequency}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      {course.instructor.rating}/5 Rating
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Course Highlights</h4>
                    <div className="space-y-2">
                      {course.highlights.slice(0, 4).map((highlight, idx) => (
                        <div key={idx} className="flex items-start text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Instructor</h4>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm mr-3">
                        {course.instructor.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {course.instructor.name}
                        </div>
                        <div className="text-gray-500 text-xs">{course.instructor.experience}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link href={`/courses/${course.slug}`} className="block">
                      <Button variant="primary" size="lg" className="w-full">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleEnrollClick(course.id)}
                      variant="outline"
                      size="lg"
                      className="w-full"
                    >
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Courses?</h2>
            <p className="text-lg text-gray-600">
              Experience the difference that expert guidance makes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AIIMS Expert Faculty</h3>
              <p className="text-gray-600">
                Learn from the best with our AIIMS alumni faculty who bring real medical knowledge
                to your preparation.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Proven Results</h3>
              <p className="text-gray-600">
                98% success rate with our students consistently scoring 160+ marks in NEET Biology
                section.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Curriculum</h3>
              <p className="text-gray-600">
                Complete syllabus coverage with focus on high-yield topics and NEET exam patterns.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your NEET Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Book a free demo class and experience our teaching methodology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleBookDemo}
              variant="secondary_cta"
              size="xl"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Book Free Demo Class
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
