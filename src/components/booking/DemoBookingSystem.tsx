'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  BookOpen,
  Video,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  MessageSquare,
  Gift,
  Zap,
  Trophy,
  Users,
  Target,
  Award,
} from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'
import { zoomService } from '@/lib/zoom/zoomService'

interface TimeSlot {
  id: string
  time: string
  available: boolean
  instructor?: string
  spotsLeft?: number
}

interface BookingData {
  studentName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  courseInterest: string
  currentClass: string
  previousScore?: string
  specificTopics: string
  hearAboutUs: string
  zoomMeetingId?: string
  zoomJoinUrl?: string
  zoomPassword?: string
}

export function DemoBookingSystem() {
  const { trackDemoRequest, trackFormInteraction } = useAnalytics()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [bookingData, setBookingData] = useState<BookingData>({
    studentName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    courseInterest: 'neet-biology',
    currentClass: '',
    previousScore: '',
    specificTopics: '',
    hearAboutUs: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [error, setError] = useState('')

  // Generate available dates for next 14 days (excluding Sundays)
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      // Skip Sundays
      if (date.getDay() !== 0) {
        dates.push({
          date: date.toISOString().split('T')[0],
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          dayNum: date.getDate(),
          month: date.toLocaleDateString('en-US', { month: 'short' }),
        })
      }
    }
    return dates
  }

  // Available time slots based on selected date
  const getTimeSlots = (date: string): TimeSlot[] => {
    const slots = [
      { id: '10:00', time: '10:00 AM', available: true, instructor: 'Dr. Priya', spotsLeft: 3 },
      { id: '11:30', time: '11:30 AM', available: true, instructor: 'Dr. Rahul', spotsLeft: 2 },
      { id: '14:00', time: '2:00 PM', available: true, instructor: 'Dr. Kavya', spotsLeft: 4 },
      { id: '15:30', time: '3:30 PM', available: false, instructor: 'Dr. Priya', spotsLeft: 0 },
      { id: '17:00', time: '5:00 PM', available: true, instructor: 'Dr. Ankit', spotsLeft: 1 },
      { id: '18:30', time: '6:30 PM', available: true, instructor: 'Dr. Rahul', spotsLeft: 3 },
    ]

    // Simulate different availability for weekends
    const selectedDate = new Date(date)
    const isWeekend = selectedDate.getDay() === 6 || selectedDate.getDay() === 0

    return isWeekend ? slots.filter((slot) => ['10:00', '11:30', '14:00'].includes(slot.id)) : slots
  }

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))
    trackFormInteraction('demo_booking', 'field_update', field)
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      trackFormInteraction('demo_booking', 'step_advance', `step_${currentStep + 1}`)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const finalBookingData = {
        studentName: bookingData.studentName,
        email: bookingData.email,
        phone: bookingData.phone,
        preferredDate: new Date(selectedDate),
        preferredTime: selectedTime,
        courseInterest: bookingData.courseInterest,
        studentClass: bookingData.currentClass,
        previousKnowledge: bookingData.previousScore || 'First attempt',
        specificTopics: bookingData.specificTopics ? [bookingData.specificTopics] : [],
      }

      // Create Zoom meeting
      const zoomMeeting = await zoomService.createDemoMeeting(finalBookingData)

      if (zoomMeeting) {
        // Track the demo booking with Zoom meeting ID
        trackDemoRequest(bookingData.studentName, bookingData.courseInterest, bookingData.phone)

        setBookingComplete(true)

        // Store meeting details for confirmation screen
        setBookingData((prev) => ({
          ...prev,
          zoomMeetingId: zoomMeeting.id,
          zoomJoinUrl: zoomMeeting.join_url,
          zoomPassword: zoomMeeting.password,
        }))
      } else {
        throw new Error('Failed to create Zoom meeting')
      }
    } catch (error) {
      console.error('Booking failed:', error)
      setError('Failed to book demo. Please try again or contact support.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const availableDates = getAvailableDates()
  const timeSlots = selectedDate ? getTimeSlots(selectedDate) : []

  const stepTitles = [
    'Select Date & Time',
    'Your Information',
    'Course Preferences',
    'Confirm Booking',
  ]

  if (bookingComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-lg p-8 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Demo Booked Successfully! 🎉</h2>

          <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold text-blue-900 mb-3">Your Demo Details:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>{selectedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{selectedTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-blue-600" />
                <span>
                  Zoom link:{' '}
                  {bookingData.zoomJoinUrl ? 'Ready to join!' : 'Will be sent 30 minutes before'}
                </span>
              </div>
              {bookingData.zoomPassword && (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 text-blue-600">🔐</span>
                  <span>Meeting Password: {bookingData.zoomPassword}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>WhatsApp confirmation sent to {bookingData.phone}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Gift className="w-4 h-4 text-purple-600" />
                <span>Free study materials</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span>NEET strategy session</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4 text-green-600" />
                <span>Personalized guidance</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => (window.location.href = '/courses')}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Explore Courses
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Home
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Need to reschedule? Contact us at +91 88264 44334 or email
              support@cerebrumbiologyacademy.com
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Book Your Free NEET Biology Demo Class</h1>
          <p className="text-blue-100">
            Experience our teaching methodology and get personalized guidance from AIIMS experts
          </p>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mt-6">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep > index + 1
                      ? 'bg-green-500 text-white'
                      : currentStep === index + 1
                        ? 'bg-white text-blue-600'
                        : 'bg-blue-500 text-blue-200'
                  }`}
                >
                  {currentStep > index + 1 ? '✓' : index + 1}
                </div>
                {index < stepTitles.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${
                      currentStep > index + 1 ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-2">
            <span className="text-sm text-blue-100">{stepTitles[currentStep - 1]}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Date & Time Selection */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Choose Your Preferred Date
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-3">
                    {availableDates.map((date) => (
                      <button
                        key={date.date}
                        onClick={() => {
                          setSelectedDate(date.date)
                          setSelectedTime('') // Reset time when date changes
                        }}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          selectedDate === date.date
                            ? 'border-blue-600 bg-blue-50 text-blue-900'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className="text-sm font-medium">{date.day}</div>
                        <div className="text-xs text-gray-500">{date.month}</div>
                        <div className="text-lg font-bold">{date.dayNum}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Available Time Slots
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => slot.available && setSelectedTime(slot.time)}
                          disabled={!slot.available}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            selectedTime === slot.time
                              ? 'border-blue-600 bg-blue-50'
                              : slot.available
                                ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">{slot.time}</span>
                            {slot.available && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                {slot.spotsLeft} spots left
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">with {slot.instructor}</div>
                          {!slot.available && (
                            <div className="text-xs text-red-600 mt-1">Fully booked</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tell Us About Yourself</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={bookingData.studentName}
                      onChange={(e) => handleInputChange('studentName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Class/Status *
                    </label>
                    <select
                      value={bookingData.currentClass}
                      onChange={(e) => handleInputChange('currentClass', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select your current status</option>
                      <option value="class-11">Class 11th</option>
                      <option value="class-12">Class 12th</option>
                      <option value="dropper-1">1st Year Dropper</option>
                      <option value="dropper-2">2nd Year Dropper</option>
                      <option value="working-professional">Working Professional</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous NEET Score (if applicable)
                  </label>
                  <input
                    type="text"
                    value={bookingData.previousScore}
                    onChange={(e) => handleInputChange('previousScore', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 520/720 or Not attempted"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Course Preferences */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Your Learning Preferences
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <BookOpen className="w-4 h-4 inline mr-2" />
                    Course Interest *
                  </label>
                  <select
                    value={bookingData.courseInterest}
                    onChange={(e) => handleInputChange('courseInterest', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="neet-biology">Complete NEET Biology Course</option>
                    <option value="class-11-biology">Class 11th Biology</option>
                    <option value="class-12-biology">Class 12th Biology</option>
                    <option value="crash-course">NEET Biology Crash Course</option>
                    <option value="doubt-clearing">Doubt Clearing Sessions</option>
                    <option value="test-series">Biology Test Series</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specific Topics You Want to Focus On
                  </label>
                  <textarea
                    value={bookingData.specificTopics}
                    onChange={(e) => handleInputChange('specificTopics', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="e.g., Genetics, Human Physiology, Plant Biology, or any specific doubts..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How did you hear about us? *
                  </label>
                  <select
                    value={bookingData.hearAboutUs}
                    onChange={(e) => handleInputChange('hearAboutUs', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="google-search">Google Search</option>
                    <option value="youtube">YouTube</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="friend-referral">Friend/Family Referral</option>
                    <option value="coaching-center">Other Coaching Center</option>
                    <option value="school">School</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Confirm Your Demo Booking
                </h3>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-4">Booking Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Student Name:</span>
                      <span className="font-medium">{bookingData.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{bookingData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{bookingData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="font-medium">
                        {selectedDate} at {selectedTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Course Interest:</span>
                      <span className="font-medium">{bookingData.courseInterest}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <Gift className="w-5 h-5" />
                    What You'll Get in Your Free Demo
                  </h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      45-minute personalized NEET Biology session
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Free study material and chapter notes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      NEET strategy and preparation roadmap
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Doubt clearing and topic explanation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Personalized feedback and guidance
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-yellow-900">Important Notes:</h5>
                      <ul className="text-sm text-yellow-800 mt-1 space-y-1">
                        <li>• Zoom link will be sent 30 minutes before the session</li>
                        <li>• Please ensure stable internet connection</li>
                        <li>• Keep a notebook ready for taking notes</li>
                        <li>• No payment required - this demo is completely free</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNextStep}
                disabled={
                  (currentStep === 1 && (!selectedDate || !selectedTime)) ||
                  (currentStep === 2 &&
                    (!bookingData.studentName ||
                      !bookingData.email ||
                      !bookingData.phone ||
                      !bookingData.currentClass)) ||
                  (currentStep === 3 && (!bookingData.courseInterest || !bookingData.hearAboutUs))
                }
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Confirm Booking
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
