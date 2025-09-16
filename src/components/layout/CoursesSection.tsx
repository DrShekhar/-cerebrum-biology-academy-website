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
  Filter,
  Search,
  SlidersHorizontal,
  Star,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'

const iconMap = {
  Users,
  Monitor,
  Smartphone,
}

export function CoursesSection() {
  const [selectedCategory, setSelectedCategory] = useState('classroom')
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState('all')
  const [duration, setDuration] = useState('all')
  const [difficulty, setDifficulty] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

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

  // Advanced filtering logic
  const filteredCourses = useMemo(() => {
    let filtered = courses.filter((course) => course.category === selectedCategory)

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Price filter
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'under50k':
          filtered = filtered.filter((course) => {
            const coursePrice = parseInt(course.price.replace(/[₹,]/g, ''))
            return coursePrice < 50000
          })
          break
        case '50k-80k':
          filtered = filtered.filter((course) => {
            const coursePrice = parseInt(course.price.replace(/[₹,]/g, ''))
            return coursePrice >= 50000 && coursePrice <= 80000
          })
          break
        case 'above80k':
          filtered = filtered.filter((course) => {
            const coursePrice = parseInt(course.price.replace(/[₹,]/g, ''))
            return coursePrice > 80000
          })
          break
      }
    }

    // Duration filter
    if (duration !== 'all') {
      filtered = filtered.filter((course) => {
        const courseDuration = course.duration.toLowerCase()
        switch (duration) {
          case 'short':
            return courseDuration.includes('month') && !courseDuration.includes('year')
          case 'medium':
            return courseDuration.includes('6 month') || courseDuration.includes('8 month')
          case 'long':
            return courseDuration.includes('year') || courseDuration.includes('12 month')
          default:
            return true
        }
      })
    }

    return filtered
  }, [selectedCategory, searchTerm, priceRange, duration, courses])

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

        {/* Search and Filters */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all min-h-[48px] touch-manipulation"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all min-h-[48px] touch-manipulation ${
                showFilters
                  ? 'bg-primary-50 border-primary-200 text-primary-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-primary-200 hover:bg-primary-50'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="font-medium">Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200"
            >
              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none min-h-[44px] touch-manipulation"
                >
                  <option value="all">All Prices</option>
                  <option value="under50k">Under ₹50,000</option>
                  <option value="50k-80k">₹50,000 - ₹80,000</option>
                  <option value="above80k">Above ₹80,000</option>
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none min-h-[44px] touch-manipulation"
                >
                  <option value="all">All Durations</option>
                  <option value="short">Short Term (1-3 months)</option>
                  <option value="medium">Medium Term (6-8 months)</option>
                  <option value="long">Long Term (1+ year)</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <div className="bg-primary-50 text-primary-700 px-4 py-2 rounded-lg border border-primary-200">
                  <span className="text-sm font-medium">
                    {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {filteredCourses.map((course, index) => (
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
