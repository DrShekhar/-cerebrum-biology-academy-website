'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { ContactForm } from '@/types'
import {
  Calendar,
  Phone,
  Mail,
  User,
  BookOpen,
  MessageSquare,
  Clock,
  PhoneCall,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'
import toast from 'react-hot-toast'
import { getTrackingDataForAPI } from '@/lib/tracking/utm'
import {
  trackDemoBooking,
  trackPhoneCall,
  trackEnhancedConversion,
  GOOGLE_ADS_ID,
} from '@/lib/ads/googleAdsConversion'

// Primary contact number for Google Ads conversion tracking
const PRIMARY_CALL_NUMBER = '9311946297'
const PRIMARY_CALL_LINK = 'tel:+919311946297'

interface BookingFormProps {
  type?: 'demo' | 'inquiry' | 'callback'
  onSubmit?: (data: ContactForm) => void
}

export function BookingForm({ type = 'demo', onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState<ContactForm & { preferredDate?: string }>({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
    preferredDate: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<ContactForm>>({})

  const courseOptions = [
    { value: '', label: 'Select a Course' },
    { value: 'neet-2026-11th', label: 'NEET 2026 - Class 11th' },
    { value: 'neet-2026-12th', label: 'NEET 2026 - Class 12th' },
    { value: 'neet-2026-dropper', label: 'NEET 2026 - Dropper Batch' },
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

  const mapPreferredTimeToApiFormat = (time: string): string => {
    const timeMap: Record<string, string> = {
      morning: '09:00 AM - 12:00 PM',
      afternoon: '12:00 PM - 04:00 PM',
      evening: '04:00 PM - 08:00 PM',
      flexible: '09:00 AM - 08:00 PM',
    }
    return timeMap[time] || '09:00 AM - 12:00 PM'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Get UTM/GCLID tracking data for attribution
      const trackingData = getTrackingDataForAPI()

      const apiPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        courseInterest: [formData.course],
        preferredDate: formData.preferredDate || new Date().toISOString().split('T')[0],
        preferredTime: mapPreferredTimeToApiFormat(formData.preferredTime || 'flexible'),
        message: formData.message || '',
        // Include tracking data for Google Ads attribution
        ...trackingData,
      }

      const response = await fetch('/api/demo-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit booking')
      }

      console.log('Booking created:', result)

      // Fire Google Ads conversion tracking (client-side for real-time bidding)
      trackDemoBooking(formData.name, formData.course, 0)

      // Fire enhanced conversion with user data for better attribution
      if (typeof window !== 'undefined' && window.gtag && GOOGLE_ADS_ID) {
        trackEnhancedConversion('demo_booking', 0, formData.email, formData.phone)
      }

      if (onSubmit) {
        onSubmit(formData)
      }

      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        message: '',
        preferredDate: '',
      })

      toast.success('Thank you! Your demo class has been booked. We will contact you soon.')
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Track phone call clicks for Google Ads
  const handleCallClick = () => {
    trackPhoneCall('booking-form-cta', 0)
    // Also fire as primary conversion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_ID,
        event_category: 'engagement',
        event_label: 'phone_call_click',
        value: 100, // Estimated value of a call lead
        currency: 'INR',
      })
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
            <User className="w-4 h-4 inline mr-2" aria-hidden="true" />
            Full Name{' '}
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={errors.name}
            required
            autoComplete="name"
          />
        </div>

        {/* Email and Phone */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" aria-hidden="true" />
              Email Address{' '}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" aria-hidden="true" />
              Phone Number{' '}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="9876543210"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={errors.phone}
              required
              autoComplete="tel"
            />
          </div>
        </div>

        {/* Course Selection */}
        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
            <BookOpen className="w-4 h-4 inline mr-2" />
            Course of Interest *
          </label>
          <select
            id="course"
            value={formData.course}
            onChange={(e) => handleInputChange('course', e.target.value)}
            className={`flex h-12 w-full items-center justify-between rounded-lg border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${
              errors.course
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
            }`}
          >
            {courseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
        </div>

        {/* Preferred Date and Time (for demo bookings) */}
        {type === 'demo' && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="preferredDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Preferred Date *
              </label>
              <input
                type="date"
                id="preferredDate"
                value={formData.preferredDate || ''}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, preferredDate: e.target.value }))
                }
                className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="preferredTime"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <Clock className="w-4 h-4 inline mr-2" />
                Preferred Time
              </label>
              <select
                id="preferredTime"
                value={formData.preferredTime || ''}
                onChange={(e) =>
                  handleInputChange('preferredTime' as keyof ContactForm, e.target.value)
                }
                className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
              >
                {preferredTimeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
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

        {/* Call Now CTA - Primary Google Ads Conversion */}
        <div className="pt-6 border-t border-gray-100">
          <p className="text-center text-sm text-gray-600 mb-3">Want to talk to an expert now?</p>
          <a
            href={PRIMARY_CALL_LINK}
            onClick={handleCallClick}
            className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
          >
            <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-lg">Call Now: {PRIMARY_CALL_NUMBER}</span>
              <span className="block text-xs text-green-100">
                Speak to NEET Expert • Mon-Sat 9AM-8PM
              </span>
            </div>
          </a>
        </div>

        {/* Secondary Contact Info */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-400 mb-2">Other ways to reach us:</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
            <a
              href={getPhoneLink()}
              className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Phone className="w-4 h-4 mr-1" />
              {getDisplayPhone()}
            </a>
            <a
              href="mailto:info@cerebrumbiologyacademy.com"
              className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
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
