'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Calendar, User, Phone, BookOpen, Video, Clock } from 'lucide-react'
import { Metadata } from 'next'

export default function DemoBookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    studentClass: '',
    preferredDate: '',
    preferredTime: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const classOptions = [
    { value: 'class-11', label: 'Class 11th' },
    { value: 'class-12', label: 'Class 12th' },
    { value: 'dropper', label: 'Dropper/Gap Year' },
    { value: 'class-9-10', label: 'Foundation (9th/10th)' },
  ]

  const timeSlots = [
    '10:00 AM - 11:00 AM',
    '02:00 PM - 03:00 PM',
    '04:00 PM - 05:00 PM',
    '06:00 PM - 07:00 PM',
    '08:00 PM - 09:00 PM',
  ]

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 14)
    return maxDate.toISOString().split('T')[0]
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError('')
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name')
      return false
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError('Please enter a valid phone number')
      return false
    }
    if (!formData.studentClass) {
      setError('Please select your class')
      return false
    }
    if (!formData.preferredDate) {
      setError('Please select a date')
      return false
    }
    if (!formData.preferredTime) {
      setError('Please select a time slot')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/demo-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: `${formData.phone}@temp.com`,
          phone: formData.phone,
          whatsappNumber: formData.phone,
          courseInterest: [formData.studentClass],
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          message: '',
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsSuccess(true)
      } else {
        setError(data.error || 'Failed to book demo. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Demo Class Booked Successfully!
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Your free demo class has been confirmed. We'll send you a WhatsApp confirmation shortly.
          </p>

          <div className="bg-blue-50 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Your Demo Details
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Date:</strong>{' '}
                {new Date(formData.preferredDate).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p>
                <strong>Time:</strong> {formData.preferredTime}
              </p>
              <p>
                <strong>Class:</strong>{' '}
                {classOptions.find((c) => c.value === formData.studentClass)?.label}
              </p>
              <p>
                <strong>Phone:</strong> {formData.phone}
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-yellow-900 mb-2">What's Next?</h4>
            <ul className="text-sm text-yellow-800 space-y-1 text-left">
              <li>✓ WhatsApp confirmation within 5 minutes</li>
              <li>✓ Zoom link sent 30 minutes before class</li>
              <li>✓ Faculty: AIIMS Graduate Teacher</li>
              <li>✓ Duration: 60 minutes (45 min class + 15 min Q&A)</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/918826444334"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Contact Support
            </a>
            <a
              href="/"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Back to Home
            </a>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <CheckCircle className="w-4 h-4 mr-2" />
              100% FREE • No Payment Required
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Experience World-Class
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                NEET Biology Teaching
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              Book your free 60-minute demo class with AIIMS faculty. No credit card needed.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center text-gray-700">
                <Video className="w-5 h-5 text-blue-600 mr-2" />
                <span>Live 1-on-1 Session</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Clock className="w-5 h-5 text-green-600 mr-2" />
                <span>60 Minutes Class</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
                <span>98% Success Rate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-2xl p-8 sticky top-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Free Demo Class</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-900 text-lg"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Phone Field */}
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
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-900 text-lg"
                    placeholder="+91 XXXXX XXXXX"
                    pattern="[0-9+\s-()]+"
                    required
                  />
                </div>

                {/* Class Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <BookOpen className="w-4 h-4 inline mr-2" />
                    Your Class *
                  </label>
                  <select
                    name="studentClass"
                    value={formData.studentClass}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-900 text-lg appearance-none bg-white cursor-pointer"
                    required
                  >
                    <option value="">Select your class</option>
                    {classOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Picker */}
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
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-900 text-lg"
                    required
                  />
                </div>

                {/* Time Slot */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Preferred Time *
                  </label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-900 text-lg appearance-none bg-white cursor-pointer"
                    required
                  >
                    <option value="">Select time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold text-lg px-8 py-5 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Booking Your Demo...
                    </div>
                  ) : (
                    <>Book My Free Demo Class</>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By booking, you agree to receive updates on WhatsApp. No spam, we promise!
                </p>
              </form>
            </motion.div>

            {/* Benefits Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* What You'll Get */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  What You'll Get in Demo Class
                </h3>
                <div className="space-y-4">
                  {[
                    'Live 1-on-1 session with AIIMS faculty',
                    'Cell Biology concept with NEET focus',
                    'Personalized NEET preparation strategy',
                    'AI-powered doubt resolution demo',
                    'Study plan for your goals',
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Why 2,500+ Students Choose Us</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="text-4xl font-bold mr-4">695</div>
                    <div className="text-sm">Sadhna's NEET 2023 Score (100%ile Bio)</div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-4xl font-bold mr-4">98%</div>
                    <div className="text-sm">NEET Qualification Rate</div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-4xl font-bold mr-4">650+</div>
                    <div className="text-sm">Average Score (out of 720)</div>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 border-2 border-green-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Priya Sharma</div>
                    <div className="text-sm text-gray-600">AIIMS Delhi • 685/720</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The demo class convinced me to join. Dr. Priya's teaching style is amazing! She
                  made Cell Biology so easy to understand."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
