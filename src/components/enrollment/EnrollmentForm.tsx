'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, CreditCard, IndianRupee, CheckCircle, AlertCircle } from 'lucide-react'
import { razorpayService } from '@/lib/payments/razorpay'
import { useAnalytics } from '@/hooks/useAnalytics'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface Course {
  id: string
  name: string
  price: number
  originalPrice?: number
  duration: string
  features: string[]
}

interface EnrollmentFormProps {
  course: Course
  onSuccess?: (enrollmentData: any) => void
}

export function EnrollmentForm({ course, onSuccess }: EnrollmentFormProps) {
  const { trackCourseEnrollment, trackFormSubmission } = useAnalytics()
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    installmentPlan: 'full' as 'full' | 'quarterly' | 'monthly',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const calculateAmount = () => {
    const { installmentPlan } = formData
    const baseAmount = course.price

    switch (installmentPlan) {
      case 'quarterly':
        return Math.ceil(baseAmount / 4)
      case 'monthly':
        return Math.ceil(baseAmount / 12)
      default:
        return baseAmount
    }
  }

  const getInstallmentInfo = () => {
    const { installmentPlan } = formData
    const amount = calculateAmount()

    switch (installmentPlan) {
      case 'quarterly':
        return {
          label: 'Quarterly Payment',
          description: `₹${amount.toLocaleString()} every 3 months (4 installments)`,
          total: `Total: ₹${course.price.toLocaleString()}`,
        }
      case 'monthly':
        return {
          label: 'Monthly Payment',
          description: `₹${amount.toLocaleString()} every month (12 installments)`,
          total: `Total: ₹${course.price.toLocaleString()}`,
        }
      default:
        return {
          label: 'One-time Payment',
          description: `₹${amount.toLocaleString()} (Complete payment)`,
          total: course.originalPrice
            ? `Save ₹${(course.originalPrice - course.price).toLocaleString()}!`
            : '',
        }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const enrollmentData = {
        ...formData,
        courseId: course.id,
        courseName: course.name,
        amount: calculateAmount(),
      }

      const result = await razorpayService.processEnrollment(enrollmentData)

      if (result.success) {
        // Initialize Razorpay payment
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          amount: result.amount,
          currency: result.currency,
          name: 'Cerebrum Biology Academy',
          description: `Enrollment for ${course.name}`,
          order_id: result.orderId,
          handler: async (response: any) => {
            // Verify payment
            const verified = await razorpayService.verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            )

            if (verified) {
              setSuccess(true)
              // Track successful enrollment for revenue analytics
              trackCourseEnrollment(course.id, course.name, enrollmentData.amount)
              onSuccess?.(enrollmentData)

              // Send WhatsApp confirmation
              await sendWhatsAppConfirmation(formData.phone, course.name)
            } else {
              setError('Payment verification failed. Please contact support.')
            }
          },
          prefill: {
            name: formData.studentName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: '#2563eb',
          },
          modal: {
            ondismiss: () => {
              setError('Payment cancelled. You can try again.')
            },
          },
        }

        // Load and open Razorpay checkout
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.onload = () => {
          const rzp = new (window as any).Razorpay(options)
          rzp.on('payment.failed', (response: any) => {
            setError(response.error?.description || 'Payment failed. Please try again.')
            setIsLoading(false)
          })
          rzp.open()
        }
        script.onerror = () => {
          setError('Failed to load payment gateway. Please try again.')
          setIsLoading(false)
        }
        document.body.appendChild(script)
      } else {
        setError(result.error || 'Failed to process enrollment')
        trackFormSubmission('enrollment', false, enrollmentData.amount)
      }
    } catch (error) {
      console.error('Enrollment error:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const sendWhatsAppConfirmation = async (phone: string, courseName: string) => {
    try {
      await fetch('/api/whatsapp/send-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          message: `🎉 Welcome to Cerebrum Biology Academy! Your enrollment for ${courseName} is confirmed. You'll receive login details shortly. For support: ${CONTACT_INFO.phone.display.primary}`,
        }),
      })
    } catch (error) {
      console.error('WhatsApp confirmation error:', error)
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-green-50 rounded-xl border border-green-200"
      >
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">Enrollment Successful! 🎉</h3>
        <p className="text-green-700 mb-4">
          Welcome to {course.name}! You'll receive login details on WhatsApp shortly.
        </p>
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <p className="text-sm text-gray-600">
            📱 WhatsApp confirmation sent to: {formData.phone}
          </p>
          <p className="text-sm text-gray-600">📧 Email confirmation sent to: {formData.email}</p>
        </div>
      </motion.div>
    )
  }

  const installmentInfo = getInstallmentInfo()

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-lg"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Enroll in {course.name}</h3>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-lg font-semibold text-blue-800">{installmentInfo.label}</p>
          <p className="text-blue-700">{installmentInfo.description}</p>
          {installmentInfo.total && (
            <p className="text-sm text-blue-600 mt-1">{installmentInfo.total}</p>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Full Name
          </label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            placeholder="+91 XXXXX XXXXX"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <CreditCard className="w-4 h-4 inline mr-2" />
            Payment Plan
          </label>
          <select
            name="installmentPlan"
            value={formData.installmentPlan}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          >
            <option value="full">One-time Payment (Best Value)</option>
            <option value="quarterly">Quarterly Installments</option>
            <option value="monthly">Monthly Installments</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">Course Features:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          {course.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <IndianRupee className="w-5 h-5 mr-2" />
            Pay ₹{calculateAmount().toLocaleString()} & Enroll Now
          </div>
        )}
      </button>

      <p className="text-center text-sm text-gray-600">
        🔒 Secure payment powered by Razorpay • 100% money-back guarantee
      </p>
    </motion.form>
  )
}
