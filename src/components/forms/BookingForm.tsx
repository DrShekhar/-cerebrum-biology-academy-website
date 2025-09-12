'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { ContactForm } from '@/types'
import { Calendar, Phone, Mail, User, BookOpen, MessageSquare, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

interface BookingFormProps {
  type?: 'demo' | 'inquiry' | 'callback'
  onSubmit?: (data: ContactForm) => void
}

export function BookingForm({ type = 'demo', onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<ContactForm>>({})

  const courseOptions = [
    { value: '', label: 'Select a Course' },
    { value: 'neet-2025-11th', label: 'NEET 2025 - Class 11th' },
    { value: 'neet-2025-12th', label: 'NEET 2025 - Class 12th' },
    { value: 'neet-2025-dropper', label: 'NEET 2025 - Dropper Batch' },
    { value: 'neet-2026-early-bird', label: 'NEET 2026 - Early Bird' },
    { value: 'general-inquiry', label: 'General Inquiry' },
  ]

  const preferredTimeOptions = [
    { value: '', label: 'Select Preferred Time' },
    { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 4 PM)' },
    { value: 'evening', label: 'Evening (4 PM - 8 PM)' },
    { value: 'flexible', label: 'Flexible' },
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits'
    }

    if (!formData.course) {
      newErrors.course = 'Please select a course'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log('Form submitted:', formData)

      if (onSubmit) {
        onSubmit(formData)
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        message: '',
      })

      alert('Thank you! We will contact you soon.')
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const getFormTitle = () => {
    switch (type) {
      case 'demo':
        return 'Book Your Free Demo Class'
      case 'callback':
        return 'Request a Callback'
      case 'inquiry':
      default:
        return 'Course Inquiry'
    }
  }

  const getFormDescription = () => {
    switch (type) {
      case 'demo':
        return 'Experience our teaching methodology firsthand. Book a free demo class and see why thousands of students choose Cerebrum Biology Academy.'
      case 'callback':
        return 'Our expert counselors will call you back within 2 hours to discuss your NEET preparation journey.'
      case 'inquiry':
      default:
        return 'Get detailed information about our courses, faculty, and admission process. We&apos;re here to help you succeed!'
    }
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Form Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          {type === 'demo' && <Calendar className="w-8 h-8 text-blue-600" />}
          {type === 'callback' && <Phone className="w-8 h-8 text-blue-600" />}
          {type === 'inquiry' && <BookOpen className="w-8 h-8 text-blue-600" />}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">{getFormTitle()}</h3>

        <p className="text-gray-600">{getFormDescription()}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Full Name *
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email and Phone */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address *
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={
                errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
              }
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number *
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="9876543210"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={
                errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
              }
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Course Selection */}
        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
            <BookOpen className="w-4 h-4 inline mr-2" />
            Course of Interest *
          </label>
          <Select
            id="course"
            options={courseOptions}
            value={formData.course}
            onChange={(e) => handleInputChange('course', e.target.value)}
            className={
              errors.course ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
            }
          />
          {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
        </div>

        {/* Preferred Time (for demo bookings) */}
        {type === 'demo' && (
          <div>
            <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              Preferred Time
            </label>
            <Select
              id="preferredTime"
              options={preferredTimeOptions}
              value={formData.preferredTime || ''}
              onChange={(e) =>
                handleInputChange('preferredTime' as keyof ContactForm, e.target.value)
              }
            />
          </div>
        )}

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Additional Message (Optional)
          </label>
          <Textarea
            id="message"
            placeholder="Tell us about your NEET preparation goals, questions, or specific requirements..."
            value={formData.message || ''}
            onChange={(e) => handleInputChange('message', e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="xl"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {type === 'demo'
                ? 'Booking Demo...'
                : type === 'callback'
                  ? 'Requesting Callback...'
                  : 'Sending Inquiry...'}
            </>
          ) : (
            <>
              {type === 'demo' && <Calendar className="w-5 h-5 mr-2" />}
              {type === 'callback' && <Phone className="w-5 h-5 mr-2" />}
              {type === 'inquiry' && <Mail className="w-5 h-5 mr-2" />}
              {type === 'demo'
                ? 'Book Free Demo'
                : type === 'callback'
                  ? 'Request Callback'
                  : 'Send Inquiry'}
            </>
          )}
        </Button>

        {/* Contact Info */}
        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-2">Or contact us directly:</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
            <a
              href="tel:+918826444334"
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <Phone className="w-4 h-4 mr-1" />
              +91 88264 44334
            </a>
            <a
              href="mailto:info@cerebrumbiologyacademy.com"
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <Mail className="w-4 h-4 mr-1" />
              info@cerebrumbiologyacademy.com
            </a>
          </div>
        </div>
      </form>
    </motion.div>
  )
}
