'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  BookOpen,
  MessageSquare,
  CheckCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface DemoBookingModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: DemoBookingData) => void
}

export interface DemoBookingData {
  name: string
  email: string
  phone: string
  whatsappNumber?: string
  courseInterest: string[]
  preferredDate: string
  preferredTime: string
  message?: string
}

const courseOptions = [
  { id: 'class-11', name: 'Class 11th Biology', popular: true },
  { id: 'class-12', name: 'Class 12th Biology', popular: true },
  { id: 'neet-dropper', name: 'NEET Dropper Program', popular: true },
  { id: 'foundation', name: 'Foundation Course' },
]

const timeSlots = [
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
  '06:00 PM - 07:00 PM',
  '07:00 PM - 08:00 PM',
]

export function DemoBookingModal({ isOpen, onClose, onSubmit }: DemoBookingModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<DemoBookingData>({
    name: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    courseInterest: [],
    preferredDate: '',
    preferredTime: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (field: keyof DemoBookingData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCourseToggle = (courseId: string) => {
    setFormData((prev) => ({
      ...prev,
      courseInterest: prev.courseInterest.includes(courseId)
        ? prev.courseInterest.filter((id) => id !== courseId)
        : [...prev.courseInterest, courseId],
    }))
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      setIsSuccess(true)
      // Reset form after 3 seconds and close
      setTimeout(() => {
        setIsSuccess(false)
        setStep(1)
        setFormData({
          name: '',
          email: '',
          phone: '',
          whatsappNumber: '',
          courseInterest: [],
          preferredDate: '',
          preferredTime: '',
          message: '',
        })
        onClose()
      }, 3000)
    } catch (error) {
      console.error('Demo booking failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          formData.name && formData.email && formData.phone && formData.courseInterest.length > 0
        )
      case 2:
        return formData.preferredDate && formData.preferredTime
      case 3:
        return true
      default:
        return false
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{ boxShadow: 'var(--shadow-premium)' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Book Your Free Demo</h2>
                <p className="text-white/90">Get personalized NEET biology coaching</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 flex items-center space-x-4">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= num ? 'bg-white text-primary-600' : 'bg-white/20 text-white'
                    }`}
                  >
                    {step > num ? <CheckCircle className="w-5 h-5" /> : num}
                  </div>
                  {num < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 rounded ${step > num ? 'bg-white' : 'bg-white/20'}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Demo Booked Successfully!</h3>
                <p className="text-gray-600 mb-4">
                  We'll contact you within 2 hours to confirm your demo session.
                </p>
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                  <p className="text-primary-700 font-medium">
                    📱 You'll receive a WhatsApp confirmation shortly
                  </p>
                </div>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Personal Information
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Mail className="w-4 h-4 inline mr-2" />
                            Email *
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                            placeholder="your@email.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Phone className="w-4 h-4 inline mr-2" />
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                            placeholder={CONTACT_INFO.phone.display.secondary}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <MessageSquare className="w-4 h-4 inline mr-2" />
                          WhatsApp Number (Optional)
                        </label>
                        <input
                          type="tel"
                          value={formData.whatsappNumber}
                          onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                          placeholder={CONTACT_INFO.phone.display.secondary}
                        />
                        <p className="text-sm text-gray-500 mt-1">For demo reminders and updates</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          <BookOpen className="w-4 h-4 inline mr-2" />
                          Interested Courses *
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {courseOptions.map((course) => (
                            <button
                              key={course.id}
                              onClick={() => handleCourseToggle(course.id)}
                              className={`p-4 rounded-xl border-2 text-left transition-all ${
                                formData.courseInterest.includes(course.id)
                                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                                  : 'border-gray-200 bg-white text-gray-700 hover:border-primary-200'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{course.name}</span>
                                {course.popular && (
                                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                    Popular
                                  </span>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Schedule Your Demo</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Preferred Time *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => handleInputChange('preferredTime', slot)}
                              className={`p-3 rounded-xl border-2 text-center transition-all ${
                                formData.preferredTime === slot
                                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                                  : 'border-gray-200 bg-white text-gray-700 hover:border-primary-200'
                              }`}
                            >
                              <span className="text-sm font-medium">{slot}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Additional Information
                    </h3>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        Message (Optional)
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none"
                        placeholder="Any specific topics you'd like to cover or questions you have..."
                      />
                    </div>

                    {/* Summary */}
                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                      <h4 className="font-semibold text-primary-900 mb-3">Booking Summary</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Name:</strong> {formData.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {formData.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {formData.phone}
                        </p>
                        {formData.whatsappNumber && (
                          <p>
                            <strong>WhatsApp:</strong> {formData.whatsappNumber}
                          </p>
                        )}
                        <p>
                          <strong>Courses:</strong>{' '}
                          {formData.courseInterest
                            .map((id) => courseOptions.find((c) => c.id === id)?.name)
                            .join(', ')}
                        </p>
                        <p>
                          <strong>Date:</strong>{' '}
                          {new Date(formData.preferredDate).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Time:</strong> {formData.preferredTime}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Footer */}
          {!isSuccess && (
            <div className="border-t border-gray-200 p-6 flex items-center justify-between">
              <div className="flex space-x-3">
                {step > 1 && (
                  <Button variant="secondary" onClick={handleBack} className="px-6 py-2">
                    Back
                  </Button>
                )}
              </div>

              <div className="flex space-x-3">
                {step < 3 ? (
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="px-6 py-2"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-2"
                  >
                    {isSubmitting ? 'Booking...' : 'Book Demo'}
                  </Button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
