'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FocusTrap from 'focus-trap-react'
import {
  X,
  Crown,
  Mail,
  Phone,
  Sparkles,
  TrendingUp,
  Target,
  BookOpen,
  Users,
  Trophy,
  Lock,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { TrialStatus } from '@/lib/trial/trialManager'

interface TrialExpiredModalProps {
  isOpen: boolean
  trialStatus: TrialStatus
  onClose?: () => void
  onUpgrade?: () => void
  onContactUs?: () => void
}

export function TrialExpiredModal({
  isOpen,
  trialStatus,
  onClose,
  onUpgrade,
  onContactUs,
}: TrialExpiredModalProps) {
  const [showContactForm, setShowContactForm] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const benefits = [
    {
      icon: Target,
      title: 'Unlimited Practice Tests',
      description: 'Take as many tests as you need to master every topic',
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Get detailed insights and performance predictions',
    },
    {
      icon: BookOpen,
      title: 'Personalized Study Plans',
      description: 'AI-powered plans tailored to your weaknesses',
    },
    {
      icon: Users,
      title: 'Priority Support',
      description: '24/7 expert help when you need it most',
    },
    {
      icon: Trophy,
      title: 'Performance Tracking',
      description: 'Track your progress and compare with peers',
    },
    {
      icon: Sparkles,
      title: 'Premium Features',
      description: 'Access all advanced features and content',
    },
  ]

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/trial/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          freeUserId: trialStatus.freeUserId,
          email,
          phone,
          message,
          requestType: 'extension',
        }),
      })

      if (response.ok) {
        alert('Request submitted! We will contact you soon.')
        setShowContactForm(false)
        onClose?.()
      } else {
        alert('Failed to submit request. Please try again.')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <FocusTrap>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget && onClose) {
              onClose()
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 opacity-50"></div>

            <div className="relative overflow-y-auto max-h-[90vh] custom-scrollbar">
              {onClose && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              )}

              <div className="p-6 sm:p-8 lg:p-12">
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-full mb-6"
                  >
                    <Lock className="w-10 h-10 text-white" />
                  </motion.div>

                  <h2
                    id="modal-title"
                    className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3"
                  >
                    Your 15-Day Trial Has Ended
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    You took {trialStatus.testsTaken} tests during your trial. Upgrade now to
                    continue your NEET preparation journey with unlimited access!
                  </p>
                </div>

                {!showContactForm ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="p-5 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                              <benefit.icon className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                                {benefit.title}
                              </h3>
                              <p className="text-xs text-gray-600 line-clamp-2">
                                {benefit.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 sm:p-8 text-white mb-6">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">Special Offer</h3>
                          <p className="text-blue-100">
                            Upgrade now and get 20% off your first month!
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">₹499</div>
                          <div className="text-sm text-blue-100 line-through">₹599/month</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <button
                        onClick={onUpgrade || (() => (window.location.href = '/pricing'))}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all active:scale-95 min-h-[56px] focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                      >
                        <Crown className="w-5 h-5" />
                        <span>Upgrade Now & Save 20%</span>
                      </button>

                      <button
                        onClick={() => setShowContactForm(true)}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-green-600 hover:text-green-600 transition-all active:scale-95 min-h-[56px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                      >
                        <Mail className="w-5 h-5" />
                        <span>Request Extension</span>
                      </button>
                    </div>

                    <div className="mt-6 text-center space-y-3">
                      <p className="text-sm text-gray-600">
                        Have questions?{' '}
                        <button
                          onClick={onContactUs || (() => (window.location.href = '/contact'))}
                          className="text-green-600 hover:text-green-700 font-semibold underline focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 rounded px-1"
                        >
                          Contact our support team
                        </button>
                      </p>
                      <button
                        onClick={async () => {
                          await trackAndOpenWhatsApp({
                            source: 'trial-expired-modal',
                            message: 'Hi! My trial has expired. I need help with upgrading or extending my trial.',
                            campaign: 'trial-expiry',
                          })
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#166534] hover:bg-[#14532d] text-white font-medium rounded-lg transition-colors text-sm cursor-pointer"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Chat on WhatsApp
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Request Trial Extension
                      </h3>
                      <p className="text-gray-600">
                        Fill out this form and our team will review your request
                      </p>
                    </div>

                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            id="phone"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Why do you need an extension?
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none text-gray-900"
                          placeholder="Tell us why you need more time..."
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setShowContactForm(false)}
                          className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all active:scale-95 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Request'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </FocusTrap>
    </AnimatePresence>
  )
}
