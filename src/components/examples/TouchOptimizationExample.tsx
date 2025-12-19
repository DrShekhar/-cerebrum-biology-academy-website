'use client'

import React, { useState } from 'react'
import {
  TouchTarget,
  SwipeableCourseCarousel,
  MobileActionBar,
  ThumbNavigation,
  FloatingActionButton,
  EnhancedQuickActionButton,
  MobileModal,
  TouchForm,
  TouchInput,
  PullToRefresh,
  MobileCardStack,
  HapticFeedback,
  TouchOptimizationProvider,
  useTouchOptimization,
  useNativeTouchGestures,
} from '@/components/ui/TouchOptimization'
import { PhoneIcon, ChatBubbleLeftRightIcon, PlayIcon } from '@heroicons/react/24/outline'

/**
 * Example implementations showing how to use touch optimization components
 * for mobile-first user experience
 */

// Example: Touch-optimized course selection page
export function TouchCourseSelectionExample() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const courses = [
    {
      id: 'neet-biology-basic',
      title: 'NEET Biology Basic',
      price: '₹9,999',
      originalPrice: '₹19,999',
      image: '/images/course-basic.jpg',
      features: ['Live Classes', 'Study Material', 'Doubt Sessions'],
    },
    {
      id: 'neet-biology-premium',
      title: 'NEET Biology Premium',
      price: '₹15,999',
      originalPrice: '₹29,999',
      image: '/images/course-premium.jpg',
      features: ['Everything in Basic', 'Mock Tests', 'Personal Mentor', '1-on-1 Sessions'],
    },
    {
      id: 'neet-biology-ultimate',
      title: 'NEET Biology Ultimate',
      price: '₹25,999',
      originalPrice: '₹49,999',
      image: '/images/course-ultimate.jpg',
      features: ['Everything in Premium', 'Guaranteed Results', 'Priority Support'],
    },
  ]

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId)
    setShowModal(true)
    HapticFeedback.medium()
  }

  const handleEnroll = () => {
    HapticFeedback.success()
    // Handle enrollment logic
    console.log(`Enrolling in course: ${selectedCourse}`)
  }

  const handleCall = () => {
    HapticFeedback.light()
    window.location.href = 'tel:+918826444334'
  }

  const handleWhatsApp = () => {
    HapticFeedback.light()
    window.open('https://wa.me/918826444334', '_blank')
  }

  const handleDemo = () => {
    HapticFeedback.medium()
    // Handle demo booking
    console.log('Demo booking requested')
  }

  return (
    <TouchOptimizationProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Choose Your NEET Biology Course
          </h1>
          <p className="text-slate-600">
            Swipe through our courses and find the perfect fit for you
          </p>
        </div>

        {/* Touch-optimized Course Carousel */}
        <div className="mb-8">
          <SwipeableCourseCarousel courses={courses} onCourseSelect={handleCourseSelect} />
        </div>

        {/* Touch Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <TouchTarget
            variant="medium"
            className="bg-blue-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2"
            onClick={() => setShowModal(true)}
          >
            <PlayIcon className="w-5 h-5" />
            <span>Watch Demo</span>
          </TouchTarget>

          <TouchTarget
            variant="heavy"
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2"
            onClick={handleEnroll}
          >
            <span>Get Started</span>
          </TouchTarget>
        </div>

        {/* Mobile Action Bar */}
        <MobileActionBar
          onCallClick={handleCall}
          onWhatsAppClick={handleWhatsApp}
          onDemoClick={handleDemo}
          onEnrollClick={handleEnroll}
        />

        {/* Floating Action Button */}
        <FloatingActionButton icon={<PhoneIcon className="w-6 h-6" />} onClick={handleCall} />

        {/* Course Details Modal */}
        <MobileModal isOpen={showModal} onClose={() => setShowModal(false)} title="Course Details">
          <CourseDetailsForm courseId={selectedCourse} onEnroll={handleEnroll} />
        </MobileModal>
      </div>
    </TouchOptimizationProvider>
  )
}

// Touch-optimized course details form
function CourseDetailsForm({
  courseId,
  onEnroll,
}: {
  courseId: string | null
  onEnroll: () => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    target: 'NEET 2026',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: Record<string, string> = {}

    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.phone) newErrors.phone = 'Phone is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      HapticFeedback.error()
      return
    }

    HapticFeedback.success()
    onEnroll()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <TouchForm onSubmit={handleSubmit}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Course: {courseId}</h3>
        <p className="text-slate-600 text-sm">Fill in your details to enroll in this course</p>
      </div>

      <TouchInput
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        error={errors.name}
        required
      />

      <TouchInput
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        error={errors.email}
        required
      />

      <TouchInput
        label="Mobile Number"
        type="tel"
        placeholder="Enter 10-digit mobile number"
        value={formData.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
        error={errors.phone}
        required
      />

      <div className="form-group">
        <label className="block text-sm font-medium text-slate-700 mb-2">Target Exam</label>
        <select
          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-emerald-500 focus:ring-emerald-100 focus:ring-3 focus:outline-none"
          value={formData.target}
          onChange={(e) => handleInputChange('target', e.target.value)}
          style={{ fontSize: '16px' }}
        >
          <option value="NEET 2026">NEET 2026</option>
          <option value="NEET 2026">NEET 2026</option>
          <option value="AIIMS">AIIMS</option>
          <option value="JIPMER">JIPMER</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold py-4 rounded-xl mt-6 min-h-[48px] active:scale-95 transition-transform"
      >
        Complete Enrollment
      </button>
    </TouchForm>
  )
}

// Example: Mobile-optimized homepage with touch interactions
export function TouchHomepageExample() {
  const [currentPage, setCurrentPage] = useState('home')
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setRefreshing(false)
    HapticFeedback.success()
  }

  const cards = [
    {
      id: 'courses',
      title: 'Explore Courses',
      content: (
        <div>
          <p className="mb-2">Discover our comprehensive NEET Biology courses</p>
          <span className="text-emerald-600 font-semibold">3 courses available</span>
        </div>
      ),
      action: () => {
        HapticFeedback.light()
        setCurrentPage('courses')
      },
    },
    {
      id: 'faculty',
      title: 'Meet Our Faculty',
      content: (
        <div>
          <p className="mb-2">Learn from experienced AIIMS faculty</p>
          <span className="text-blue-600 font-semibold">15+ years experience</span>
        </div>
      ),
      action: () => {
        HapticFeedback.light()
        setCurrentPage('faculty')
      },
    },
    {
      id: 'results',
      title: 'Success Stories',
      content: (
        <div>
          <p className="mb-2">See how our students cracked NEET</p>
          <span className="text-purple-600 font-semibold">94.2% success rate</span>
        </div>
      ),
      action: () => {
        HapticFeedback.light()
        setCurrentPage('results')
      },
    },
  ]

  return (
    <TouchOptimizationProvider>
      <div className="min-h-screen bg-white">
        {/* Pull to Refresh Container */}
        <PullToRefresh onRefresh={handleRefresh} refreshing={refreshing}>
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6 text-center">
            <h1 className="text-2xl font-bold mb-2">Cerebrum Biology Academy</h1>
            <p className="text-purple-100 mb-4">Master NEET Biology with AIIMS Faculty</p>

            <TouchTarget
              variant="heavy"
              className="bg-white text-purple-600 font-semibold py-3 px-6 rounded-full"
              onClick={() => {
                HapticFeedback.medium()
                console.log('Start learning clicked')
              }}
            >
              Start Learning Today
            </TouchTarget>
          </div>

          {/* Feature Cards */}
          <div className="p-4">
            <h2 className="text-xl font-bold text-slate-800 mb-4">What we offer</h2>
            <MobileCardStack cards={cards} />
          </div>

          {/* Stats Section */}
          <div className="bg-slate-50 p-6 m-4 rounded-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Our Track Record</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-600">10K+</div>
                <div className="text-sm text-slate-600">Students</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-slate-600">Success Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">15+</div>
                <div className="text-sm text-slate-600">Years</div>
              </div>
            </div>
          </div>
        </PullToRefresh>

        {/* Thumb Navigation */}
        <ThumbNavigation
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page)
            HapticFeedback.light()
          }}
        />
      </div>
    </TouchOptimizationProvider>
  )
}

// Example: Touch-optimized quiz interface
export function TouchQuizExample() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  const questions = [
    {
      question: 'Which organelle is known as the powerhouse of the cell?',
      options: ['Nucleus', 'Mitochondria', 'Endoplasmic Reticulum', 'Golgi Apparatus'],
      correct: 1,
    },
    {
      question: 'What is the basic unit of heredity?',
      options: ['Chromosome', 'DNA', 'Gene', 'Allele'],
      correct: 2,
    },
    {
      question: 'Which process converts light energy into chemical energy?',
      options: ['Respiration', 'Photosynthesis', 'Fermentation', 'Glycolysis'],
      correct: 1,
    },
  ]

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    HapticFeedback.light()
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1)
      HapticFeedback.success()
    } else {
      HapticFeedback.error()
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      // Quiz completed
      console.log(
        `Quiz completed! Score: ${score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0)}/${questions.length}`
      )
    }
  }

  const isLastQuestion = currentQuestion === questions.length - 1

  return (
    <TouchOptimizationProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-slate-600">Score: {score}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">
            {questions[currentQuestion].question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <TouchTarget
                key={index}
                variant="light"
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
                    }`}
                  >
                    {selectedAnswer === index && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </TouchTarget>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <TouchTarget
          variant="heavy"
          className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
            selectedAnswer !== null
              ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed'
          }`}
          onClick={selectedAnswer !== null ? handleNextQuestion : undefined}
          disabled={selectedAnswer === null}
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </TouchTarget>
      </div>
    </TouchOptimizationProvider>
  )
}

// Example: Native touch gestures with enhanced quick actions
export function NativeTouchGesturesExample() {
  const [refreshing, setRefreshing] = useState(false)

  // Initialize native touch gestures
  useNativeTouchGestures({
    enablePullToRefresh: true,
    enableQuickActions: true,
    onRefresh: async () => {
      setRefreshing(true)
      // Simulate refresh
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setRefreshing(false)
    },
    phoneNumber: '+918826444334',
    emailAddress: 'contact@cerebrumbiologyacademy.com',
  })

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setRefreshing(false)
  }

  return (
    <TouchOptimizationProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        {/* Native Pull to Refresh */}
        <PullToRefresh onRefresh={handleRefresh} refreshing={refreshing} useNative={true}>
          {/* Header */}
          <div className="bg-white shadow-sm p-4">
            <h1 className="text-2xl font-bold text-slate-800 text-center">
              Native Touch Gestures Demo
            </h1>
            <p className="text-slate-600 text-center mt-2">
              Pull down to refresh • Tap actions for instant response
            </p>
          </div>

          {/* Enhanced Quick Action Buttons Grid */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">One-Tap Quick Actions</h2>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <EnhancedQuickActionButton action="call" size="lg" className="mx-auto mb-2" />
                <span className="text-sm text-slate-600">Call</span>
              </div>

              <div className="text-center">
                <EnhancedQuickActionButton action="whatsapp" size="lg" className="mx-auto mb-2" />
                <span className="text-sm text-slate-600">WhatsApp</span>
              </div>

              <div className="text-center">
                <EnhancedQuickActionButton action="share" size="lg" className="mx-auto mb-2" />
                <span className="text-sm text-slate-600">Share</span>
              </div>

              <div className="text-center">
                <EnhancedQuickActionButton action="email" size="lg" className="mx-auto mb-2" />
                <span className="text-sm text-slate-600">Email</span>
              </div>

              <div className="text-center">
                <EnhancedQuickActionButton action="demo" size="lg" className="mx-auto mb-2" />
                <span className="text-sm text-slate-600">Book Demo</span>
              </div>

              <div className="text-center">
                <EnhancedQuickActionButton
                  action="enroll"
                  size="lg"
                  className="mx-auto mb-2"
                  courseId="neet-biology-premium"
                />
                <span className="text-sm text-slate-600">Enroll</span>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">🚀 Native Performance</h3>
                <p className="text-slate-600 text-sm">
                  Pure JavaScript implementation for optimal performance and native feel.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">📱 Haptic Feedback</h3>
                <p className="text-slate-600 text-sm">
                  Device vibration provides tactile feedback for all interactions.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  📊 Analytics Integration
                </h3>
                <p className="text-slate-600 text-sm">
                  Every interaction is tracked for conversion optimization.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">🎯 One-Tap Actions</h3>
                <p className="text-slate-600 text-sm">
                  Direct phone calls, WhatsApp messages, and native sharing.
                </p>
              </div>
            </div>

            {/* Refresh Instructions */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="text-blue-800 font-semibold mb-2">💡 Try Native Pull to Refresh</h4>
              <p className="text-blue-700 text-sm">
                Scroll to the top and pull down to trigger the native refresh gesture. You'll feel
                haptic feedback and see the loading indicator.
              </p>
            </div>
          </div>
        </PullToRefresh>

        {/* Fixed Quick Actions (simulating floating buttons) */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3">
          <EnhancedQuickActionButton action="call" size="md" className="shadow-lg" />
          <EnhancedQuickActionButton action="whatsapp" size="md" className="shadow-lg" />
        </div>
      </div>
    </TouchOptimizationProvider>
  )
}

export default {
  TouchCourseSelectionExample,
  TouchHomepageExample,
  TouchQuizExample,
  NativeTouchGesturesExample,
}
