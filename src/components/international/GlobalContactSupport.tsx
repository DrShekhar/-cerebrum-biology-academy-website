'use client'

import React, { useState, useEffect } from 'react'
import {
  CountryContentService,
  CountryContactInfo,
} from '@/lib/international/countryContentService'
import { TimezoneService } from '@/lib/international/timezoneService'
import { usePersonalization } from '@/components/providers/PersonalizationProvider'
import { Phone, Mail, Clock, Globe, MapPin, MessageSquare, Smartphone } from 'lucide-react'

interface GlobalContactSupportProps {
  countryCode?: string
  showAllMethods?: boolean
  className?: string
}

export function GlobalContactSupport({
  countryCode,
  showAllMethods = true,
  className = '',
}: GlobalContactSupportProps) {
  const { preferences, updatePreferences, trackBehavior } = usePersonalization()
  const [contactInfo, setContactInfo] = useState<CountryContactInfo | null>(null)
  const [isBusinessHours, setIsBusinessHours] = useState(false)
  const [localTime, setLocalTime] = useState('')
  const [nextAvailable, setNextAvailable] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<string>('')

  useEffect(() => {
    loadContactInfo()
    const interval = setInterval(updateTimeInfo, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [countryCode, preferences.location])

  const loadContactInfo = () => {
    try {
      // Determine country code from props or user preferences
      const targetCountry =
        countryCode || preferences.countryCode || preferences.location?.country || 'IN'

      // Get contact info for the specific country
      let countryData = CountryContentService.getCountryContent(targetCountry)

      // If no data for the specific country, get from nearest supported country
      if (!countryData) {
        const nearestCountry = CountryContentService.getNearnestSupportedCountry(targetCountry)
        countryData = nearestCountry
      }

      if (countryData) {
        setContactInfo(countryData.contactInfo)
        updateTimeInfo(countryData.timezone)

        // Update user preferences with contact country
        updatePreferences({
          countryCode: countryData.code,
          selectedTimezone: countryData.timezone,
        })

        trackBehavior('contact_info_loaded', {
          countryCode: countryData.code,
          contactMethod: countryData.contactInfo.preferredContact,
        })
      }
    } catch (error) {
      console.error('Failed to load contact info:', error)
    }
  }

  const updateTimeInfo = (timezone?: string) => {
    if (!timezone && !contactInfo) return

    const targetTimezone =
      timezone || contactInfo?.timezone || preferences.selectedTimezone || 'Asia/Kolkata'

    const time = TimezoneService.getLocalTime(targetTimezone)
    const businessHours = TimezoneService.isBusinessHours(targetTimezone)
    const nextBusinessHour = TimezoneService.getNextBusinessHour(targetTimezone)

    setLocalTime(time)
    setIsBusinessHours(businessHours)
    setNextAvailable(nextBusinessHour)
  }

  const handleContactClick = (method: string, contactValue: string) => {
    setSelectedMethod(method)

    trackBehavior('contact_method_clicked', {
      method,
      contactValue,
      countryCode: preferences.countryCode,
      isBusinessHours,
    })

    // Handle different contact methods
    switch (method) {
      case 'phone':
        window.location.href = `tel:${contactValue}`
        break
      case 'whatsapp':
        const whatsappNumber = contactValue.replace(/[^\d]/g, '')
        const message = encodeURIComponent(
          "Hi! I'm interested in NEET Biology coaching. Can you provide more information?"
        )
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
        break
      case 'email':
        const subject = encodeURIComponent('Inquiry about NEET Biology Coaching')
        const body = encodeURIComponent(
          "Hi,\n\nI'm interested in learning more about your NEET Biology coaching programs. Please provide me with course details and fees.\n\nThank you!"
        )
        window.location.href = `mailto:${contactValue}?subject=${subject}&body=${body}`
        break
      default:
        break
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'phone':
        return <Phone className="h-5 w-5" />
      case 'whatsapp':
        return <Smartphone className="h-5 w-5" />
      case 'email':
        return <Mail className="h-5 w-5" />
      case 'chat':
        return <MessageSquare className="h-5 w-5" />
      default:
        return <Phone className="h-5 w-5" />
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'phone':
        return 'bg-blue-500 hover:bg-blue-600'
      case 'whatsapp':
        return 'bg-green-600 hover:bg-green-600'
      case 'email':
        return 'bg-purple-500 hover:bg-purple-600'
      case 'chat':
        return 'bg-indigo-500 hover:bg-indigo-600'
      default:
        return 'bg-gray-500 hover:bg-gray-600'
    }
  }

  if (!contactInfo) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Contact Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">Get In Touch</h3>
        </div>

        <p className="text-gray-600 mb-6">
          Our support team is ready to help you start your medical journey. Choose your preferred
          contact method below.
        </p>

        {/* Availability Status */}
        <div
          className={`p-4 rounded-lg border ${
            isBusinessHours ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-3 h-3 rounded-full ${
                isBusinessHours ? 'bg-green-600' : 'bg-amber-500'
              }`}
            ></div>
            <div className="flex-1">
              <div
                className={`font-medium ${isBusinessHours ? 'text-green-800' : 'text-yellow-800'}`}
              >
                {isBusinessHours ? "🟢 We're Online Now!" : '🟡 Currently Offline'}
              </div>
              <div className={`text-sm ${isBusinessHours ? 'text-green-700' : 'text-yellow-700'}`}>
                {isBusinessHours
                  ? 'Our team is available to help you'
                  : `Next available: ${nextAvailable}`}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{localTime}</span>
              </div>
              <div className="text-xs text-gray-500">{contactInfo.hours}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phone */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Phone className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Phone Call</h4>
              <p className="text-sm text-gray-600">Direct conversation with our team</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-lg font-medium text-gray-900">{contactInfo.phone}</div>

            <button
              onClick={() => handleContactClick('phone', contactInfo.phone)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>Call Now</span>
            </button>

            <div className="text-xs text-gray-500 text-center">
              {isBusinessHours
                ? 'Available now for immediate assistance'
                : "Leave a voicemail and we'll call back"}
            </div>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">WhatsApp</h4>
              <p className="text-sm text-gray-600">Quick messaging and support</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-lg font-medium text-gray-900">{contactInfo.whatsapp}</div>

            <button
              onClick={() => handleContactClick('whatsapp', contactInfo.whatsapp)}
              className="w-full bg-green-600 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <Smartphone className="h-5 w-5" />
              <span>Chat on WhatsApp</span>
            </button>

            <div className="text-xs text-green-600 text-center font-medium">
              ✓ Fastest response • 24/7 available
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Mail className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Email</h4>
              <p className="text-sm text-gray-600">Detailed inquiries and documentation</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-lg font-medium text-gray-900">{contactInfo.email}</div>

            <button
              onClick={() => handleContactClick('email', contactInfo.email)}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <Mail className="h-5 w-5" />
              <span>Send Email</span>
            </button>

            <div className="text-xs text-gray-500 text-center">
              Response within 24 hours during business days
            </div>
          </div>
        </div>

        {/* Office Address */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Office Location</h4>
              <p className="text-sm text-gray-600">Visit us for in-person consultation</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm text-gray-700">{contactInfo.address}</div>

            <button className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Get Directions</span>
            </button>

            <div className="text-xs text-gray-500 text-center">{contactInfo.hours}</div>
          </div>
        </div>
      </div>

      {/* Preferred Contact Method */}
      <div className="bg-gray-50 border border-blue-200 rounded-xl p-6">
        <div className="text-center">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            💡 Recommended Contact Method
          </h4>
          <p className="text-gray-700 mb-4">
            <strong>{contactInfo.preferredContact}</strong> is the fastest way to reach us from your
            location.
          </p>

          {contactInfo.preferredContact.toLowerCase().includes('whatsapp') && (
            <button
              onClick={() => handleContactClick('whatsapp', contactInfo.whatsapp)}
              className="bg-green-600 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
            >
              <Smartphone className="h-5 w-5" />
              <span>Start WhatsApp Chat</span>
            </button>
          )}

          {contactInfo.preferredContact.toLowerCase().includes('phone') && (
            <button
              onClick={() => handleContactClick('phone', contactInfo.phone)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>Call Now</span>
            </button>
          )}

          {contactInfo.preferredContact.toLowerCase().includes('email') && (
            <button
              onClick={() => handleContactClick('email', contactInfo.email)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
            >
              <Mail className="h-5 w-5" />
              <span>Send Email</span>
            </button>
          )}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="text-center">
          <p className="text-red-800 text-sm">
            <strong>Need urgent help?</strong> WhatsApp us at {contactInfo.whatsapp} for immediate
            assistance. Our automated system responds 24/7 with basic information.
          </p>
        </div>
      </div>
    </div>
  )
}
