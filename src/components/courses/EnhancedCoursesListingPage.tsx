'use client'

import { useState, useMemo } from 'react'
import { ClassLevel, CourseProgram } from '@/types/courseSystem'
import { coursePrograms, courseTiers } from '@/data/courseSystemData'
import { ClassFilterNav } from './ClassFilterNav'
import { CourseCard } from './CourseCard'
import { DemoClassModal } from './DemoClassModal'

export function EnhancedCoursesListingPage() {
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<CourseProgram | null>(null)

  // Calculate course counts for each class
  const courseCounts = useMemo(() => {
    const counts: Record<ClassLevel, number> = {
      '9th': 0,
      '10th': 0,
      '11th': 0,
      '12th': 0,
      'Dropper': 0
    }
    
    coursePrograms.forEach(course => {
      counts[course.targetClass]++
    })
    
    return counts
  }, [])

  // Filter courses based on selected class and search query
  const filteredCourses = useMemo(() => {
    let filtered = coursePrograms

    if (selectedClass !== 'all') {
      filtered = filtered.filter(course => course.targetClass === selectedClass)
    }

    if (searchQuery) {
      filtered = filtered.filter(course =>
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
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">NEET Biology Courses</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Choose from our comprehensive range of NEET Biology courses designed for every class level. 
            Expert faculty, proven curriculum, and guaranteed results.
          </p>
          
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold">{coursePrograms.length}</div>
              <div className="text-blue-100">Course Programs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold">{courseTiers.length}</div>
              <div className="text-blue-100">Learning Tiers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold">5%</div>
              <div className="text-blue-100">One-time Discount</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold">{getTotalStudents()}</div>
              <div className="text-blue-100">Total Capacity</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Find Your Perfect Course
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our class-wise course offerings with flexible pricing tiers and payment options
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
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              Showing <span className="font-semibold text-blue-600">{filteredCourses.length}</span> course
              {filteredCourses.length !== 1 ? 's' : ''} 
              {selectedClass !== 'all' && (
                <span> for <span className="font-semibold">Class {selectedClass}</span></span>
              )}
              {searchQuery && (
                <span> matching "<span className="font-semibold">{searchQuery}</span>"</span>
              )}
            </p>
          </div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Courses Found</h3>
              <p className="text-gray-600 mb-8">
                {searchQuery 
                  ? `No courses match your search "${searchQuery}"`
                  : `No courses available for ${selectedClass === 'all' ? 'the selected filters' : `Class ${selectedClass}`}`
                }
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

          {/* Tier Comparison Section */}
          <div className="mt-20 bg-white rounded-3xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Compare Our Course Tiers</h3>
              <p className="text-gray-600">Choose the learning tier that best fits your needs and budget</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {courseTiers.map((tier) => (
                <div key={tier.series} className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    tier.series === 'pinnacle' ? 'bg-purple-100' :
                    tier.series === 'ascent' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    <span className="text-2xl">
                      {tier.series === 'pinnacle' ? '👑' : 
                       tier.series === 'ascent' ? '🎯' : '🌟'}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h4>
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    ₹{tier.priceRange.min.toLocaleString()} - ₹{tier.priceRange.max.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    Batch Size: {tier.batchSize} students
                  </div>
                  <div className="text-left space-y-2">
                    {tier.highlights.slice(0, 3).map((highlight, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <span className="text-green-500 mr-2">✓</span>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your NEET Journey?</h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who have achieved their medical dreams with our expert guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  // Use a featured course or the first available course
                  const demoCourse = filteredCourses.find(course => course.isFeatured || course.isPopular) || filteredCourses[0]
                  if (demoCourse) {
                    handleBookDemo(demoCourse)
                  }
                }}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                disabled={filteredCourses.length === 0}
              >
                Book Free Demo Class
              </button>
              <button className="bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-400 transition-colors">
                Talk to Counselor
              </button>
            </div>
          </div>
        </div>
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