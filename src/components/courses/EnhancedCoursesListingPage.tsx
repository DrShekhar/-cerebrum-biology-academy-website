'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { ClassLevel, CourseProgram } from '@/types/courseSystem'
import { coursePrograms, courseTiers } from '@/data/courseSystemData'
import { ClassFilterNav } from './ClassFilterNav'
import { CourseCard } from './CourseCard'
import { DemoClassModal } from './DemoClassModal'
import { FAQDisplay } from '@/components/seo/FAQSchema'

const courseFAQs = [
  {
    question: 'Which NEET Biology course is best for Class 11 students?',
    answer:
      'For Class 11 students, we recommend our Foundation Programs (Apex or Pinnacle series) that build strong NCERT fundamentals while introducing NEET-level concepts. These 2-year programs give you the advantage of early preparation with smaller batch sizes for personalized attention.',
  },
  {
    question: 'What is the difference between Pinnacle, Ascent, and Apex series?',
    answer:
      'Pinnacle Series offers premium mentorship with 1:1 attention and smallest batch sizes (4-6 students). Ascent Series provides balanced coaching with moderate batch sizes (8-15 students). Apex Series is our most affordable option with larger batches (20-30 students) while maintaining quality teaching.',
  },
  {
    question: 'Do you offer demo classes before enrollment?',
    answer:
      'Yes! We offer free demo classes for all our courses. You can experience our teaching methodology, interact with faculty, and assess the learning environment before making any commitment. Book a demo class through our website or WhatsApp.',
  },
  {
    question: 'What is the fee structure for NEET Biology courses?',
    answer:
      'Our course fees range from ₹30,000 to ₹3,00,000+ depending on the series, batch size, and duration. We offer flexible payment options including EMI plans. Contact our counselors for detailed fee breakdowns and any ongoing discounts.',
  },
  {
    question: 'Are online and offline modes available for all courses?',
    answer:
      'Yes, most of our courses are available in both online and offline modes. Online classes include live interactive sessions, recorded lectures, and digital study materials. Offline classes are conducted at our South Delhi centers with the same curriculum.',
  },
  {
    question: 'What study materials are provided with the courses?',
    answer:
      'All courses include comprehensive study materials: topic-wise notes, NCERT-based question banks, previous year NEET questions, mock tests, and our proprietary Biology concept maps. Higher-tier courses also include personalized doubt-solving sessions and mentor support.',
  },
]

// Map URL query param values to internal ClassLevel values
const classParamMap: Record<string, ClassLevel> = {
  'class-9': '9th',
  'class-10': '10th',
  'class-11': '11th',
  'class-12': '12th',
  dropper: 'Dropper',
  '2-year': '2-Year',
  '9th': '9th',
  '10th': '10th',
  '11th': '11th',
  '12th': '12th',
  Dropper: 'Dropper',
  '2-Year': '2-Year',
}

export function EnhancedCoursesListingPage() {
  const searchParams = useSearchParams()
  const coursesRef = useRef<HTMLDivElement>(null)

  // Get class from URL query param
  const classParam = searchParams.get('class')
  const initialClass = classParam && classParamMap[classParam] ? classParamMap[classParam] : 'all'

  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'all'>(initialClass)
  const [searchQuery, setSearchQuery] = useState('')
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<CourseProgram | null>(null)

  // Update selected class when URL param changes and scroll to courses
  useEffect(() => {
    if (classParam && classParamMap[classParam]) {
      setSelectedClass(classParamMap[classParam])
      // Scroll to courses section after a short delay
      setTimeout(() => {
        coursesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [classParam])

  // Calculate course counts for each class
  const courseCounts = useMemo(() => {
    const counts: Record<ClassLevel, number> = {
      '9th': 0,
      '10th': 0,
      '11th': 0,
      '12th': 0,
      Dropper: 0,
      '2-Year': 0,
    }

    coursePrograms.forEach((course) => {
      counts[course.targetClass]++
    })

    return counts
  }, [])

  // Filter courses based on selected class and search query
  const filteredCourses = useMemo(() => {
    let filtered = coursePrograms

    if (selectedClass !== 'all') {
      filtered = filtered.filter((course) => course.targetClass === selectedClass)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.targetClass.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }, [selectedClass, searchQuery])

  const getTotalStudents = () => {
    return filteredCourses.reduce((total, course) => {
      return total + Object.values(course.tiers).reduce((sum, tier) => sum + tier.batchSize, 0)
    }, 0)
  }

  const handleBookDemo = (course: CourseProgram) => {
    setSelectedCourse(course)
    setShowDemoModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#4a5d4a] text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            NEET Biology Courses
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-green-100 max-w-3xl mx-auto mb-6 sm:mb-8">
            Choose from our comprehensive range of NEET Biology courses designed for every class
            level. Expert faculty, proven curriculum, and guaranteed results.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold">{coursePrograms.length}</div>
              <div className="text-green-100 text-xs sm:text-sm md:text-base">Course Programs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold">{courseTiers.length}</div>
              <div className="text-green-100 text-xs sm:text-sm md:text-base">Learning Tiers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold">5%</div>
              <div className="text-green-100 text-xs sm:text-sm md:text-base">
                One-time Discount
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold">{getTotalStudents()}</div>
              <div className="text-green-100 text-xs sm:text-sm md:text-base">Total Capacity</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={coursesRef} className="py-10 sm:py-12 md:py-16" id="courses">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Search and Filter Section */}
          <div className="mb-6 sm:mb-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Find Your Perfect Course
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
                Explore our class-wise course offerings with flexible pricing tiers and payment
                options
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 min-h-[44px] border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>

            {/* Class Filter Navigation */}
            <ClassFilterNav
              selectedClass={selectedClass}
              onClassSelect={setSelectedClass}
              courseCounts={courseCounts}
            />
          </div>

          {/* Results Summary */}
          <div className="mb-8 text-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-blue-600">{filteredCourses.length}</span>{' '}
              course
              {filteredCourses.length !== 1 ? 's' : ''}
              {selectedClass !== 'all' && (
                <span>
                  {' '}
                  for <span className="font-semibold">Class {selectedClass}</span>
                </span>
              )}
              {searchQuery && (
                <span>
                  {' '}
                  matching "<span className="font-semibold">{searchQuery}</span>"
                </span>
              )}
            </p>
          </div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Courses Found</h3>
              <p className="text-gray-600 mb-8">
                {searchQuery
                  ? `No courses match your search "${searchQuery}"`
                  : `No courses available for ${selectedClass === 'all' ? 'the selected filters' : `Class ${selectedClass}`}`}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedClass('all')
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Tier Comparison Section - Pricing Table */}
          <div className="mt-12 sm:mt-16 md:mt-20 bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Course Pricing by Tier
              </h3>
              <p className="text-sm sm:text-base text-gray-600 px-4">
                All prices shown are lump sum payments. EMI options available.
              </p>
            </div>

            {/* Tier Headers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {courseTiers.map((tier) => (
                <div
                  key={tier.series}
                  className={`text-center p-4 rounded-xl ${
                    tier.series === 'pinnacle'
                      ? 'bg-purple-50 border-2 border-purple-200'
                      : tier.series === 'ascent'
                        ? 'bg-blue-50 border-2 border-blue-200'
                        : 'bg-green-50 border-2 border-green-200'
                  }`}
                >
                  <div className="text-2xl mb-2">
                    {tier.series === 'pinnacle' ? '👑' : tier.series === 'ascent' ? '🎯' : '🌟'}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">{tier.name}</h4>
                  <p className="text-sm text-gray-600">
                    Batch: {tier.batchSizeDisplay || tier.batchSize} students
                  </p>
                </div>
              ))}
            </div>

            {/* Pricing Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 sm:p-4 font-semibold text-gray-900 border-b">
                      Course
                    </th>
                    <th className="text-center p-3 sm:p-4 font-semibold text-purple-700 border-b">
                      Pinnacle
                    </th>
                    <th className="text-center p-3 sm:p-4 font-semibold text-blue-700 border-b">
                      Ascent
                    </th>
                    <th className="text-center p-3 sm:p-4 font-semibold text-green-700 border-b">
                      Pursuit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {coursePrograms.map((course, index) => (
                    <tr key={course.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 sm:p-4 border-b">
                        <div className="font-medium text-gray-900 text-sm sm:text-base">
                          {course.name}
                        </div>
                        <div className="text-xs text-gray-500">{course.duration}</div>
                      </td>
                      <td className="text-center p-3 sm:p-4 border-b">
                        <span className="font-bold text-purple-700 text-sm sm:text-base">
                          ₹{course.tiers.pinnacle.price.toLocaleString()}
                        </span>
                      </td>
                      <td className="text-center p-3 sm:p-4 border-b">
                        <span className="font-bold text-blue-700 text-sm sm:text-base">
                          ₹{course.tiers.ascent.price.toLocaleString()}
                        </span>
                      </td>
                      <td className="text-center p-3 sm:p-4 border-b">
                        <span className="font-bold text-green-700 text-sm sm:text-base">
                          ₹{course.tiers.pursuit.price.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tier Features Summary */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {courseTiers.map((tier) => (
                <div key={tier.series} className="p-4">
                  <h5
                    className={`font-bold mb-3 ${
                      tier.series === 'pinnacle'
                        ? 'text-purple-700'
                        : tier.series === 'ascent'
                          ? 'text-blue-700'
                          : 'text-green-700'
                    }`}
                  >
                    {tier.name} Features
                  </h5>
                  <div className="space-y-2">
                    {tier.highlights.slice(0, 4).map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start text-xs sm:text-sm text-gray-700"
                      >
                        <span className="text-green-600 mr-2 mt-0.5">✓</span>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 sm:mt-16 text-center bg-[#4a5d4a] rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Ready to Start Your NEET Journey?
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-green-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Join thousands of successful students who have achieved their medical dreams with our
              expert guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <button
                onClick={() => {
                  // Use a featured course or the first available course
                  const demoCourse =
                    filteredCourses.find((course) => course.isFeatured || course.isPopular) ||
                    filteredCourses[0]
                  if (demoCourse) {
                    handleBookDemo(demoCourse)
                  }
                }}
                className="bg-white text-[#4a5d4a] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                disabled={filteredCourses.length === 0}
              >
                Book Free Demo Class
              </button>
              <button className="bg-[#3d4d3d] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#5a6d5a] transition-colors">
                Talk to Counselor
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQDisplay
          questions={courseFAQs}
          title="Frequently Asked Questions About Our Courses"
          className="mt-12 sm:mt-16"
        />
      </section>

      {/* Demo Class Modal */}
      {showDemoModal && selectedCourse && (
        <DemoClassModal
          course={selectedCourse}
          onClose={() => {
            setShowDemoModal(false)
            setSelectedCourse(null)
          }}
        />
      )}
    </div>
  )
}
