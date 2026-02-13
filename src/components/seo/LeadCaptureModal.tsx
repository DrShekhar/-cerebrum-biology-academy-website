'use client'

import { useState, useEffect } from 'react'
import { X, Download, CheckCircle, Mail, MessageCircle, User, Shield } from 'lucide-react'
interface LeadCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  topicSlug: string
  topicTitle: string
  leadMagnetId: string
  leadMagnetTitle: string
  leadMagnetDescription: string
  requiresEmail?: boolean
  requiresWhatsApp?: boolean
}

export function LeadCaptureModal({
  isOpen,
  onClose,
  topicSlug,
  topicTitle,
  leadMagnetId,
  leadMagnetTitle,
  leadMagnetDescription,
  requiresEmail = true,
  requiresWhatsApp = false,
}: LeadCaptureModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsappNumber: '',
  })

  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', email: '', whatsappNumber: '' })
      setIsSubmitted(false)
      setError(null)
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError(null)
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name')
      return false
    }

    if (requiresEmail && !formData.email.trim()) {
      setError('Email is required to receive the download link')
      return false
    }

    if (requiresEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }

    if (requiresWhatsApp && !formData.whatsappNumber.trim()) {
      setError('WhatsApp number is required')
      return false
    }

    if (requiresWhatsApp && !/^[6-9]\d{9}$/.test(formData.whatsappNumber.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit mobile number')
      return false
    }

    if (!requiresEmail && !requiresWhatsApp && !formData.email && !formData.whatsappNumber) {
      setError('Please provide at least an email or WhatsApp number')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const utmParams = new URLSearchParams(window.location.search)

      const response = await fetch('/api/seo/leads/capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || undefined,
          whatsappNumber: formData.whatsappNumber || undefined,
          topicSlug,
          leadMagnetId,
          source: 'topic-page',
          utmSource: utmParams.get('utm_source') || undefined,
          utmMedium: utmParams.get('utm_medium') || undefined,
          utmCampaign: utmParams.get('utm_campaign') || undefined,
          referrer: document.referrer || undefined,
          userAgent: navigator.userAgent,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to submit. Please try again.')
      }

      const data = await response.json()
      setIsSubmitted(true)

      if (data.downloadUrl) {
        setTimeout(() => {
          window.open(data.downloadUrl, '_blank')
        }, 500)
      }
    } catch (err) {
      console.error('Lead capture error:', err)
      setError(err instanceof Error ? err.message : 'Failed to submit. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
<div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeInUp"
        onClick={handleClose}
      >
        <div
          className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto relative shadow-2xl animate-fadeInUp"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {!isSubmitted ? (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto bg-indigo-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{leadMagnetTitle}</h2>
                <p className="text-gray-600 text-sm">{leadMagnetDescription}</p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2 text-sm flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  What You'll Get:
                </h3>
                <ul className="space-y-1.5 text-sm text-blue-800">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Comprehensive notes on {topicTitle}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Instant PDF download via email</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>100% Free - No payment required</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Created by AIIMS faculty with 15+ years experience</span>
                  </li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    <User className="w-4 h-4 inline mr-1.5" />
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                    placeholder="Enter your name"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Mail className="w-4 h-4 inline mr-1.5" />
                    Email Address {requiresEmail && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                    placeholder="your.email@example.com"
                    required={requiresEmail}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We'll send the PDF to this email instantly
                  </p>
                </div>

                {(requiresWhatsApp || !requiresEmail) && (
                  <div>
                    <label
                      htmlFor="whatsappNumber"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      <MessageCircle className="w-4 h-4 inline mr-1.5" />
                      WhatsApp Number {requiresWhatsApp && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="tel"
                      id="whatsappNumber"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                      placeholder="9876543210"
                      required={requiresWhatsApp}
                      disabled={isLoading}
                      maxLength={10}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We'll share study tips via WhatsApp
                    </p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-600 focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Get Free PDF Now
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center text-xs text-gray-500 space-x-4">
                  <span className="flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    100% Secure
                  </span>
                  <span>•</span>
                  <span>No Spam</span>
                  <span>•</span>
                  <span>Instant Access</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Success! Check Your Email 📧
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We've sent <strong>{leadMagnetTitle}</strong> to{' '}
                <strong className="text-blue-600">{formData.email}</strong>
                {formData.whatsappNumber && (
                  <>
                    {' '}
                    and WhatsApp number{' '}
                    <strong className="text-green-600">+91 {formData.whatsappNumber}</strong>
                  </>
                )}
                .
              </p>
              <div className="bg-gray-50 border border-blue-100 rounded-xl p-6 mb-6 text-left">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  What's Next?
                </h4>
                <ul className="text-sm text-blue-800 space-y-2.5">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">1.</span>
                    <span>Check your email inbox (and spam folder)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">2.</span>
                    <span>Download and study the comprehensive notes</span>
                  </li>
                  {formData.whatsappNumber && (
                    <li className="flex items-start">
                      <span className="font-bold mr-2">3.</span>
                      <span>Get additional study tips on WhatsApp</span>
                    </li>
                  )}
                  <li className="flex items-start">
                    <span className="font-bold mr-2">{formData.whatsappNumber ? '4' : '3'}.</span>
                    <span>Explore more free biology notes on our website</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={handleClose}
                className="bg-indigo-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-600 transition-all shadow-lg"
              >
                Continue Studying
              </button>
            </div>
          )}
        </div>
      </div>
)
}
