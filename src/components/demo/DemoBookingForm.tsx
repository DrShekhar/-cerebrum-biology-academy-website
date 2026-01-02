'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  BookOpen,
  GraduationCap,
  Brain,
  CheckCircle,
  AlertCircle,
  Video,
  Zap,
} from 'lucide-react'
import { zoomService } from '@/lib/zoom/zoomService'

interface DemoBookingFormProps {
  onSuccess?: (bookingData: any) => void
  className?: string
}

export function DemoBookingForm({ onSuccess, className = '' }: DemoBookingFormProps) {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    courseInterest: 'class-12-biology',
    message: '',
    specificTopics: [] as string[],
    studentClass: '',
    previousKnowledge: '',
  })
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [step, setStep] = useState(1)

  const courseOptions = [
    { value: 'class-11-biology', label: 'Class 11 Biology Foundation', icon: '🌱' },
    { value: 'class-12-biology', label: 'Class 12 Biology Advanced', icon: '🧬' },
    { value: 'neet-dropper', label: 'NEET Dropper Program', icon: '🎯' },
    { value: 'foundation-course', label: 'Foundation Course (9th-10th)', icon: '📚' },
    { value: 'crash-course', label: 'NEET Crash Course', icon: '⚡' },
  ]

  const classOptions = [
    { value: 'class-9', label: 'Class 9' },
    { value: 'class-10', label: 'Class 10' },
    { value: 'class-11', label: 'Class 11' },
    { value: 'class-12', label: 'Class 12' },
    { value: 'dropper', label: 'Dropper/Gap Year' },
  ]

  const knowledgeOptions = [
    { value: 'beginner', label: 'Beginner (Just starting)', icon: '🌟' },
    { value: 'intermediate', label: 'Intermediate (Some knowledge)', icon: '📈' },
    { value: 'advanced', label: 'Advanced (Good foundation)', icon: '🚀' },
  ]

  const topicOptions = [
    'Cell Biology',
    'Genetics',
    'Human Physiology',
    'Plant Physiology',
    'Ecology',
    'Biotechnology',
    'Molecular Biology',
    'Evolution',
    'Reproduction',
    'Diversity of Living Organisms',
  ]

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Auto-fetch available slots when date is selected
    if (name === 'preferredDate' && value) {
      fetchAvailableSlots(new Date(value))
    }
  }

  const handleTopicChange = (topic: string) => {
    setFormData((prev) => ({
      ...prev,
      specificTopics: prev.specificTopics.includes(topic)
        ? prev.specificTopics.filter((t) => t !== topic)
        : [...prev.specificTopics, topic],
    }))
  }

  const fetchAvailableSlots = async (date: Date) => {
    try {
      const slots = await zoomService.getAvailableSlots(date)
      setAvailableSlots(slots)
    } catch (error) {
      console.error('Error fetching available slots:', error)
      setAvailableSlots(['10:00', '14:00', '16:00', '18:00', '20:00']) // Fallback slots
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Validate required fields
      if (
        !formData.studentName ||
        !formData.email ||
        !formData.phone ||
        !formData.preferredDate ||
        !formData.preferredTime
      ) {
        throw new Error('Please fill in all required fields')
      }

      // Create Zoom meeting
      const meetingResponse = await zoomService.createDemoMeeting({
        studentName: formData.studentName,
        email: formData.email,
        phone: formData.phone,
        preferredDate: new Date(formData.preferredDate),
        preferredTime: formData.preferredTime,
        courseInterest: formData.courseInterest,
        studentClass: formData.studentClass,
        previousKnowledge: formData.previousKnowledge,
        specificTopics: formData.specificTopics,
      })

      if (meetingResponse) {
        setSuccess(true)
        onSuccess?.(formData)

        // Send additional notifications
        await sendConfirmationNotifications(meetingResponse)
      } else {
        throw new Error('Failed to schedule demo. Please try again.')
      }
    } catch (error) {
      console.error('Demo booking error:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const sendConfirmationNotifications = async (meetingData: any) => {
    // Additional confirmation logic can be added here
    console.log('Demo scheduled successfully:', meetingData)
  }

  const nextStep = () => {
    if (step < 2) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center p-8 bg-green-50 rounded-2xl border border-green-200 ${className}`}
      >
        <Video className="w-20 h-20 text-green-600 mx-auto mb-6" />
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-800 mb-4">
          Demo Class Booked Successfully! 🎉
        </h3>
        <div className="bg-white p-6 rounded-xl border border-green-200 mb-6">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            <span className="font-semibold text-gray-800">Confirmation Details</span>
          </div>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              📅 <strong>Date:</strong> {new Date(formData.preferredDate).toLocaleDateString()}
            </p>
            <p>
              🕐 <strong>Time:</strong> {formData.preferredTime}
            </p>
            <p>
              📚 <strong>Course:</strong>{' '}
              {courseOptions.find((c) => c.value === formData.courseInterest)?.label}
            </p>
            <p>
              📱 <strong>WhatsApp:</strong> Confirmation sent to {formData.phone}
            </p>
            <p>
              📧 <strong>Email:</strong> Details sent to {formData.email}
            </p>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">What's Next?</h4>
          <ul className="text-sm text-blue-700 space-y-1 text-left">
            <li>• Zoom link will be sent 30 minutes before class</li>
            <li>• Faculty: Dr. Priya Sharma (AIIMS Graduate)</li>
            <li>• Prepare your biology questions and doubts</li>
            <li>• Have a notebook and pen ready</li>
          </ul>
        </div>
      </motion.div>
    )
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const year = tomorrow.getFullYear()
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0')
    const day = String(tomorrow.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30)
    const year = maxDate.getFullYear()
    const month = String(maxDate.getMonth() + 1).padStart(2, '0')
    const day = String(maxDate.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden ${className}`}
    >
      {/* Progress Bar */}
      <div className="bg-indigo-500 p-4">
        <div className="flex items-center justify-between text-white mb-2">
          <span className="font-semibold">Step {step} of 2</span>
          <span className="text-sm opacity-90">Book Your Free Demo - Just 2 Steps!</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 sm:p-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center mb-6">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Information</h3>
              <p className="text-gray-600">Quick and easy - takes just 30 seconds!</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Student Name *
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-900 placeholder-gray-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-900 placeholder-gray-500"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-900 placeholder-gray-500"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Course Interest *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                  {courseOptions.map((course) => (
                    <label
                      key={course.value}
                      className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.courseInterest === course.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="courseInterest"
                        value={course.value}
                        checked={formData.courseInterest === course.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{course.icon}</span>
                        <span className="font-medium text-gray-700">{course.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Schedule Demo */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Schedule Your Demo</h3>
              <p className="text-gray-600">Pick your preferred date and time</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  min={getMinDate()}
                  max={getMaxDate()}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Preferred Time *
                </label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-900"
                  required
                  disabled={!formData.preferredDate}
                >
                  <option value="">Select time slot</option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot} (1 hour session)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Any specific questions or topics? (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-900 placeholder-gray-500 resize-none"
                placeholder="e.g., I want to focus on Cell Biology and Human Physiology..."
              />
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Zap className="w-5 h-5 text-blue-600 mr-2" />
                What You'll Get in Demo Class:
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Live 1-on-1 session with AIIMS faculty
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Cell Biology concept explanation with NEET focus
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Personalized NEET preparation strategy
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Doubt resolution and study tips
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Course roadmap for your goals
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm sm:text-base min-h-[44px]"
            >
              Previous
            </button>
          )}

          {step < 2 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-4 sm:px-6 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all text-sm sm:text-base min-h-[44px]"
              disabled={
                !formData.studentName ||
                !formData.email ||
                !formData.phone ||
                !formData.courseInterest
              }
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading || !formData.preferredDate || !formData.preferredTime}
              className="ml-auto px-4 sm:px-6 md:px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base min-h-[44px]"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Booking Demo...
                </div>
              ) : (
                <div className="flex items-center">
                  <Video className="w-5 h-5 mr-2" />
                  Book Free Demo
                </div>
              )}
            </button>
          )}
        </div>
      </form>
    </motion.div>
  )
}
