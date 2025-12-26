'use client'

import { Course } from '@/types'
import { Button } from '@/components/ui/Button'
import {
  Clock,
  Users,
  Calendar,
  Star,
  BookOpen,
  Award,
  CheckCircle,
  Phone,
  Mail,
  Play,
  ArrowLeft,
  MessageCircle,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { DemoBookingModal } from '@/components/booking/DemoBookingModal'
import { EnrollmentModal } from '@/components/enrollment/EnrollmentModal'

interface CourseDetailPageProps {
  course: Course
}

export function CourseDetailPage({ course }: CourseDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'instructor' | 'faq' | 'reviews'>(
    'curriculum'
  )
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false)

  const handleEnrollNow = () => {
    setShowEnrollmentModal(true)
  }

  const handleBookDemo = () => {
    setShowDemoModal(true)
  }

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId)
  }

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId)
  }

  const discountedPrice = course.discount
    ? course.price - (course.price * course.discount.percentage) / 100
    : course.price

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/#courses"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {course.isPopular && (
                  <div className="inline-flex items-center bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                )}

                <h1 className="text-4xl lg:text-5xl font-bold mb-6">{course.title}</h1>
                <p className="text-xl mb-8 opacity-90 leading-relaxed">{course.description}</p>

                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    <span>Batch Size: {course.batchSize}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>Starts: {new Date(course.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    <span>{course.instructor.rating}/5 Rating</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleEnrollNow}
                    variant="secondary"
                    size="xl"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Enroll Now - ₹{discountedPrice.toLocaleString()}
                  </Button>
                  <Button
                    onClick={handleBookDemo}
                    variant="outline"
                    size="xl"
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Book Free Demo
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Pricing Card */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center mb-6">
                <div className="text-3xl font-bold mb-2">
                  ₹{discountedPrice.toLocaleString()}
                  {course.discount && (
                    <span className="text-lg text-gray-300 line-through ml-2">
                      ₹{course.price.toLocaleString()}
                    </span>
                  )}
                </div>
                {course.discount && (
                  <div className="text-yellow-300 text-sm">
                    Save {course.discount.percentage}% - Limited Time Offer!
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  {course.curriculum.totalHours} hours of live classes
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  {course.curriculum.testSeries} mock tests included
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Comprehensive study materials
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Personal mentorship included
                </div>
              </div>

              <Button
                onClick={handleEnrollNow}
                variant="primary"
                size="lg"
                className="w-full bg-yellow-400 text-yellow-900 hover:bg-yellow-500"
              >
                Secure Your Seat Now
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Course Highlights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="flex items-start p-4 bg-blue-50 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{highlight}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex flex-wrap border-b border-gray-200 mb-8">
            {[
              { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
              { id: 'instructor', label: 'Instructor', icon: Award },
              { id: 'faq', label: 'FAQ', icon: MessageCircle },
              { id: 'reviews', label: 'Reviews', icon: Star },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as 'curriculum' | 'instructor' | 'faq' | 'reviews')}
                className={`flex items-center px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            {activeTab === 'curriculum' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Course Curriculum</h3>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <div className="text-2xl font-bold text-blue-600">
                      {course.curriculum.totalHours}
                    </div>
                    <div className="text-sm text-gray-600">Total Hours</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <div className="text-2xl font-bold text-green-600">
                      {course.curriculum.modules.length}
                    </div>
                    <div className="text-sm text-gray-600">Modules</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <div className="text-2xl font-bold text-purple-600">
                      {course.curriculum.testSeries}
                    </div>
                    <div className="text-sm text-gray-600">Test Series</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {course.curriculum.modules.map((module, index) => (
                    <div
                      key={module.id}
                      className="border border-gray-200 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                            {index + 1}
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-gray-900">{module.title}</h4>
                            <p className="text-sm text-gray-600">{module.duration} hours</p>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transform transition-transform ${
                            expandedModule === module.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {expandedModule === module.id && (
                        <div className="p-6 border-t">
                          <div className="grid md:grid-cols-2 gap-8">
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-3">Topics Covered:</h5>
                              <ul className="space-y-2">
                                {module.topics.map((topic, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm">{topic}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-3">
                                Learning Objectives:
                              </h5>
                              <ul className="space-y-2">
                                {module.learningObjectives.map((objective, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <Target className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm">{objective}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'instructor' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Meet Your Instructor</h3>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-6">
                      {course.instructor.name.charAt(0)}
                    </div>

                    <div className="flex justify-center items-center mb-4">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-gray-600 text-sm">{course.instructor.rating}/5</span>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      {course.instructor.name}
                    </h4>
                    <p className="text-blue-600 font-medium mb-2">
                      {course.instructor.qualification}
                    </p>
                    <p className="text-gray-600 mb-4">
                      {course.instructor.experience} Teaching Experience
                    </p>

                    <p className="text-gray-700 mb-6 leading-relaxed">{course.instructor.bio}</p>

                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Specializations:</h5>
                      <div className="flex flex-wrap gap-2">
                        {course.instructor.specialization.map((spec, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">
                  Frequently Asked Questions
                </h3>

                <div className="space-y-4">
                  {course.faq.map((faq) => (
                    <div
                      key={faq.id}
                      className="border border-gray-200 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <h4 className="font-semibold text-gray-900 pr-4">{faq.question}</h4>
                        <ChevronRight
                          className={`w-5 h-5 text-gray-400 transform transition-transform flex-shrink-0 ${
                            expandedFAQ === faq.id ? 'rotate-90' : ''
                          }`}
                        />
                      </button>

                      {expandedFAQ === faq.id && (
                        <div className="px-6 pb-6 border-t bg-gray-50">
                          <p className="text-gray-700 pt-4">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Student Reviews</h3>

                <div className="text-center py-16">
                  <MessageCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h4 className="text-xl font-semibold text-gray-600 mb-2">Reviews Coming Soon</h4>
                  <p className="text-gray-500">
                    We&apos;re collecting reviews from our current students. Check back soon to see
                    what they say!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Schedule & Contact */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Schedule */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Class Schedule</h3>
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Days</div>
                      <div className="text-gray-600">{course.schedule.days.join(', ')}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Timing</div>
                      <div className="text-gray-600">{course.schedule.timing}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Total Classes</div>
                      <div className="text-gray-600">{course.schedule.totalClasses} classes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-blue-50 rounded-2xl">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Call Us</div>
                    <div className="text-blue-600">+91 88264 44334</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-green-50 rounded-2xl">
                  <MessageCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">WhatsApp</div>
                    <div className="text-green-600">Quick Support</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-purple-50 rounded-2xl">
                  <Mail className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-purple-600">info@cerebrumbiologyacademy.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your NEET Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join {course.title} and take the first step towards your medical career
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleEnrollNow}
              variant="secondary"
              size="xl"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Enroll Now - ₹{discountedPrice.toLocaleString()}
            </Button>
            <Button
              onClick={handleBookDemo}
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Book Free Demo Class
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Booking Modal */}
      <DemoBookingModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        courseId={course.id}
        courseTitle={course.title}
      />

      {/* Enrollment Modal */}
      <EnrollmentModal
        isOpen={showEnrollmentModal}
        onClose={() => setShowEnrollmentModal(false)}
        course={course}
      />
    </div>
  )
}
