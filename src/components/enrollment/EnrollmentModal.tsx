'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { useEnrollment } from '@/hooks/useEnrollment'
import { Course } from '@/types'
import {
  X,
  User,
  Phone,
  Mail,
  Calendar,
  Shield,
  CheckCircle,
  Clock,
  Users,
  ArrowRight,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import FocusTrap from 'focus-trap-react'
import { AuthModal } from '@/components/auth/AuthModal'
import { RazorpayPayment } from '@/components/payment/RazorpayPayment'
import toast from 'react-hot-toast'

interface EnrollmentModalProps {
  isOpen: boolean
  onClose: () => void
  course: Course
}

export function EnrollmentModal({ isOpen, onClose, course }: EnrollmentModalProps) {
  const { user, isAuthenticated } = useAuth()
  const { enrollInCourse } = useEnrollment()

  const [currentStep, setCurrentStep] = useState<'details' | 'payment' | 'success'>('details')
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    studentName: user?.name || '',
    email: user?.email || '',
    phone: user?.profile?.phoneNumber || '',
    class: '',
    school: '',
    previousExperience: '',
    targetScore: '',
    preferredBatch: '',
    parentName: '',
    parentPhone: '',
    address: '',
    paymentMethod: 'full',
  })

  const discountedPrice = Math.round(course.price * 0.85) // 15% discount
  const installmentPrice = Math.round(discountedPrice / 3)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    setCurrentStep('payment')
  }

  const handlePaymentSuccess = async (paymentData: {
    razorpay_payment_id: string
    razorpay_order_id: string
    razorpay_signature: string
  }) => {
    setIsLoading(true)

    try {
      await enrollInCourse({
        userId: user?.id || '',
        courseId: course.id,
        studentName: formData.studentName,
        email: formData.email,
        phone: formData.phone,
        courseStartDate: course.startDate,
      })

      console.log('Payment successful:', paymentData)
      setCurrentStep('success')
    } catch (error) {
      console.error('Enrollment error:', error)
      toast.error('Enrollment failed after payment. Please contact support.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaymentError = (error: {
    error?: unknown
    reason?: string
    description?: string
  }) => {
    console.error('Payment error:', error)
    toast.error('Payment failed. Please try again or contact support.')
  }

  const handleClose = () => {
    setCurrentStep('details')
    setFormData({
      studentName: user?.name || '',
      email: user?.email || '',
      phone: user?.profile?.phoneNumber || '',
      class: '',
      school: '',
      previousExperience: '',
      targetScore: '',
      preferredBatch: '',
      parentName: '',
      parentPhone: '',
      address: '',
      paymentMethod: 'full',
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <FocusTrap>
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enrollment-modal-title"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Step Indicator */}
            <div className="bg-indigo-500 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between mb-4">
                <h2 id="enrollment-modal-title" className="text-2xl font-bold">
                  Enroll in {course.title}
                </h2>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep === 'details' ? 'bg-white text-blue-600' : 'bg-blue-500'
                    }`}
                  >
                    1
                  </div>
                  <ArrowRight className="w-4 h-4" />
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep === 'payment' ? 'bg-white text-blue-600' : 'bg-blue-500'
                    }`}
                  >
                    2
                  </div>
                  <ArrowRight className="w-4 h-4" />
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep === 'success' ? 'bg-white text-blue-600' : 'bg-blue-500'
                    }`}
                  >
                    3
                  </div>
                </div>
              </div>

              {/* Course Summary */}
              <div className="bg-white/10 rounded-2xl p-4">
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Starts: {new Date(course.startDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Duration: {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Batch Size: {course.batchSize}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {currentStep === 'details' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Student Information</h3>

                  <form onSubmit={handleSubmitDetails} className="space-y-6">
                    {/* Student Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Student Name *
                        </label>
                        <input
                          type="text"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Class *
                        </label>
                        <select
                          name="class"
                          value={formData.class}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          required
                        >
                          <option value="">Select Class</option>
                          <option value="11th">Class 11th</option>
                          <option value="12th">Class 12th</option>
                          <option value="dropper">Dropper</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          School/College
                        </label>
                        <input
                          type="text"
                          name="school"
                          value={formData.school}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Target NEET Score
                        </label>
                        <select
                          name="targetScore"
                          value={formData.targetScore}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select Target</option>
                          <option value="600+">600+ (AIIMS/Top Colleges)</option>
                          <option value="550+">550+ (Good Medical Colleges)</option>
                          <option value="500+">500+ (State Quota)</option>
                          <option value="450+">450+ (Private Colleges)</option>
                        </select>
                      </div>
                    </div>

                    {/* Parent Details */}
                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Parent/Guardian Information
                      </h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Parent Name *
                          </label>
                          <input
                            type="text"
                            name="parentName"
                            value={formData.parentName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Parent Phone *
                          </label>
                          <input
                            type="tel"
                            name="parentPhone"
                            value={formData.parentPhone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Batch Selection */}
                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Batch Preference</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {course.schedule && Array.isArray(course.schedule) ? (
                          course.schedule.map((schedule, index) => (
                            <label
                              key={index}
                              className="flex items-center p-4 border border-gray-300 rounded-2xl cursor-pointer hover:border-blue-500 transition-colors"
                            >
                              <input
                                type="radio"
                                name="preferredBatch"
                                value={`${schedule.days.join(', ')} - ${schedule.time}`}
                                checked={
                                  formData.preferredBatch ===
                                  `${schedule.days.join(', ')} - ${schedule.time}`
                                }
                                onChange={handleInputChange}
                                className="mr-3"
                              />
                              <div>
                                <div className="font-medium">{schedule.days.join(', ')}</div>
                                <div className="text-sm text-gray-600">{schedule.time}</div>
                              </div>
                            </label>
                          ))
                        ) : (
                          <div className="text-gray-600 col-span-2">
                            No batch schedules available for this course
                          </div>
                        )}
                      </div>
                    </div>

                    <Button type="submit" variant="primary" size="lg" className="w-full">
                      Continue to Payment
                    </Button>
                  </form>
                </motion.div>
              )}

              {currentStep === 'payment' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Options</h3>

                  {/* Pricing Options */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <label className="relative">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="full"
                        checked={formData.paymentMethod === 'full'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div
                        className={`p-6 border-2 rounded-2xl cursor-pointer transition-colors ${
                          formData.paymentMethod === 'full'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-900">Full Payment</h4>
                          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                            Save ₹{(course.price - discountedPrice).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                          ₹{discountedPrice.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600 line-through">
                          ₹{course.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-600 font-medium mt-2">
                          15% Discount Applied
                        </div>
                      </div>
                    </label>

                    <label className="relative">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="installment"
                        checked={formData.paymentMethod === 'installment'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div
                        className={`p-6 border-2 rounded-2xl cursor-pointer transition-colors ${
                          formData.paymentMethod === 'installment'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        <h4 className="font-semibold text-gray-900 mb-4">3 Installments</h4>
                        <div className="text-3xl font-bold text-gray-900">
                          ₹{installmentPrice.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">per month × 3</div>
                        <div className="text-sm text-gray-600 mt-2">
                          Total: ₹{(installmentPrice * 3).toLocaleString()}
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Payment Security */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                    <div className="flex items-center mb-4">
                      <Shield className="w-5 h-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-gray-900">Secure Payment</h4>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        SSL Encrypted
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        100% Refund Policy
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Razorpay Secured
                      </div>
                    </div>
                  </div>

                  {/* Enrollment Summary */}
                  <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                    <h4 className="font-semibold text-blue-900 mb-4">Enrollment Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Student:</span>
                        <span className="font-medium">{formData.studentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Course:</span>
                        <span className="font-medium">{course.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Batch:</span>
                        <span className="font-medium">
                          {formData.preferredBatch || 'Not selected'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Start Date:</span>
                        <span className="font-medium">
                          {new Date(course.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total Amount:</span>
                        <span>
                          ₹
                          {formData.paymentMethod === 'full'
                            ? discountedPrice.toLocaleString()
                            : (installmentPrice * 3).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <RazorpayPayment
                      amount={
                        formData.paymentMethod === 'full' ? discountedPrice : installmentPrice
                      }
                      courseTitle={course.title}
                      studentName={formData.studentName}
                      email={formData.email}
                      phone={formData.phone}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />

                    <Button
                      onClick={() => setCurrentStep('details')}
                      variant="outline"
                      size="lg"
                      className="w-full"
                    >
                      Back to Student Details
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Enrollment Successful! 🎉
                  </h3>

                  <p className="text-lg text-gray-600 mb-8">
                    Welcome to <strong>{course.title}</strong>! Your journey to NEET success starts
                    now.
                  </p>

                  <div className="bg-green-50 rounded-2xl p-6 mb-8">
                    <h4 className="font-semibold text-green-900 mb-4">What happens next?</h4>
                    <div className="space-y-3 text-left">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium">Confirmation Email Sent</div>
                          <div className="text-sm text-green-700">
                            Check your email for course details and login credentials
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium">WhatsApp Group Access</div>
                          <div className="text-sm text-green-700">
                            You&apos;ll be added to the batch WhatsApp group within 24 hours
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium">Study Material Access</div>
                          <div className="text-sm text-green-700">
                            Digital notes and resources will be shared before the first class
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium">Orientation Call</div>
                          <div className="text-sm text-green-700">
                            Our counselor will call you within 2 hours to discuss your preparation
                            plan
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                    <h4 className="font-semibold text-blue-900 mb-2">Quick Start Tips</h4>
                    <div className="text-sm text-blue-800 space-y-1">
                      <div>📚 Download our NEET preparation guide from the student portal</div>
                      <div>📱 Join our Telegram channel for daily practice questions</div>
                      <div>📅 Mark your class schedule in your calendar</div>
                      <div>💬 Follow us on Instagram @cerebrumbiologyacademy for tips</div>
                    </div>
                  </div>

                  <Button onClick={handleClose} variant="primary" size="lg" className="mx-auto">
                    Start Learning Journey
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </FocusTrap>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="Sign in to enroll"
        subtitle="Create your account to complete the enrollment process"
      />
    </AnimatePresence>
  )
}
