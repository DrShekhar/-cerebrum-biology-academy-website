'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, MapPin, Loader2, Shield, CheckCircle } from 'lucide-react'
import {
  SEMINAR_CONFIG,
  getNextSeminarDate,
  formatSeminarDate,
} from '@/lib/seminar/config'

interface FormData {
  parentName: string
  email: string
  whatsappNumber: string
  city: string
  studentClass: string
  referralCode: string
}

interface FormErrors {
  parentName?: string
  email?: string
  whatsappNumber?: string
  city?: string
}

export function SeminarRegistrationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    parentName: '',
    email: '',
    whatsappNumber: '',
    city: '',
    studentClass: '',
    referralCode: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const [seminarDate, setSeminarDate] = useState<Date | null>(null)

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => setRazorpayLoaded(true)
    document.body.appendChild(script)

    setSeminarDate(getNextSeminarDate())

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Please enter your name'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'Please enter your WhatsApp number'
    } else if (!/^[6-9]\d{9}$/.test(formData.whatsappNumber.replace(/\D/g, ''))) {
      newErrors.whatsappNumber = 'Please enter a valid 10-digit mobile number'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Please enter your city'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return
    if (!razorpayLoaded) {
      alert('Payment system is loading. Please try again.')
      return
    }

    setIsSubmitting(true)

    try {
      // Step 1: Create Razorpay order
      const orderResponse = await fetch('/api/seminar/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          seminarDate: seminarDate?.toISOString(),
          pricingTier: 'STANDARD',
        }),
      })

      const orderData = await orderResponse.json()

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order')
      }

      // Step 2: Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: 'INR',
        name: 'Cerebrum Biology Academy',
        description: SEMINAR_CONFIG.title,
        order_id: orderData.order.id,
        prefill: {
          name: formData.parentName,
          email: formData.email,
          contact: formData.whatsappNumber,
        },
        notes: {
          registration_id: orderData.registrationId,
        },
        theme: {
          color: '#22c55e',
        },
        handler: async (response: any) => {
          // Step 3: Verify payment
          const verifyResponse = await fetch('/api/seminar/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              registrationId: orderData.registrationId,
            }),
          })

          const verifyData = await verifyResponse.json()

          if (verifyData.success) {
            router.push(
              `/neet-guidance-seminar/thank-you?id=${orderData.registrationId}`
            )
          } else {
            alert('Payment verification failed. Please contact support.')
          }
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error('Registration error:', error)
      alert('Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <section id="register" className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-green-400 font-semibold mb-2">REGISTER NOW</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Secure Your Seat
          </h2>
          {seminarDate && (
            <p className="text-slate-300">
              Next Session: <span className="text-yellow-400 font-semibold">{formatSeminarDate(seminarDate)}</span> at 8:00 PM IST
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Parent Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.parentName ? 'border-red-500' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.parentName && (
                <p className="mt-1 text-sm text-red-500">{errors.parentName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.email ? 'border-red-500' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center gap-2 px-3 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400" />
                  +91
                </span>
                <input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  placeholder="9876543210"
                  maxLength={10}
                  className={`w-full pl-4 pr-4 py-3 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.whatsappNumber ? 'border-red-500' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.whatsappNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.whatsappNumber}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g., Delhi, Mumbai, Bangalore"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.city ? 'border-red-500' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">{errors.city}</p>
              )}
            </div>

            {/* Student Class (Optional) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Child's Class <span className="text-slate-400">(Optional)</span>
              </label>
              <select
                name="studentClass"
                value={formData.studentClass}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select class</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
                <option value="dropper">Dropper</option>
              </select>
            </div>

            {/* Referral Code (Optional) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Referral Code <span className="text-slate-400">(Optional)</span>
              </label>
              <input
                type="text"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleInputChange}
                placeholder="Enter referral code if you have one"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Pricing Summary */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Seminar Registration Fee</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 line-through text-sm">₹499</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{SEMINAR_CONFIG.pricing.standard}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Includes recording + bonus resources worth ₹999</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !razorpayLoaded}
              className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-slate-300 text-slate-900 font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  🎯 Pay ₹{SEMINAR_CONFIG.pricing.standard} & Register
                </>
              )}
            </button>

            {/* Trust Signals */}
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Secure payment powered by Razorpay</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SeminarRegistrationForm
