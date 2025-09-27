'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  Phone,
  Clock,
  User,
  CheckCircle,
  Calendar,
  MapPin,
  Star,
  Zap,
  Send,
  X,
  ChevronDown,
  ChevronUp,
  Users,
  Award,
  Headphones,
} from 'lucide-react'

interface ConsultationSlot {
  id: string
  time: string
  available: boolean
  counselorName: string
  counselorRating: number
  specialization: string[]
  nextAvailable?: string
}

interface WhatsAppConsultationProps {
  studentData?: {
    name?: string
    phone?: string
    goals?: {
      targetScore: number
      preferredRank: number
    }
    location?: {
      city: string
      state: string
    }
  }
  position?: 'floating' | 'inline' | 'sticky'
  variant?: 'compact' | 'detailed' | 'expanded'
  showScheduler?: boolean
  urgencyLevel?: 'low' | 'medium' | 'high'
}

const WhatsAppConsultation: React.FC<WhatsAppConsultationProps> = ({
  studentData,
  position = 'floating',
  variant = 'detailed',
  showScheduler = true,
  urgencyLevel = 'medium',
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [consultationData, setConsultationData] = useState({
    name: studentData?.name || '',
    phone: studentData?.phone || '',
    preferredTime: '',
    specificQuery: '',
    urgency: 'normal' as 'normal' | 'urgent',
  })

  // Mock consultation slots
  const availableSlots: ConsultationSlot[] = [
    {
      id: 'slot-1',
      time: 'Now - 2:30 PM',
      available: true,
      counselorName: 'Dr. Priya Sharma',
      counselorRating: 4.9,
      specialization: ['NEET Strategy', 'Biology Focus', 'Study Planning'],
    },
    {
      id: 'slot-2',
      time: '3:00 PM Today',
      available: true,
      counselorName: 'Rajesh Kumar',
      counselorRating: 4.8,
      specialization: ['Course Selection', 'Career Guidance', 'Admission Process'],
    },
    {
      id: 'slot-3',
      time: '4:30 PM Today',
      available: true,
      counselorName: 'Dr. Neha Gupta',
      counselorRating: 4.9,
      specialization: ['Academic Planning', 'Exam Strategy', 'Motivation'],
    },
    {
      id: 'slot-4',
      time: '6:00 PM Today',
      available: false,
      counselorName: 'Amit Patel',
      counselorRating: 4.7,
      specialization: ['Test Series', 'Performance Analysis'],
      nextAvailable: 'Tomorrow 10:00 AM',
    },
  ]

  const [onlineStatus, setOnlineStatus] = useState({
    counselorsOnline: 3,
    averageResponseTime: '< 2 minutes',
    totalConsultationsToday: 47,
  })

  // Update online status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineStatus({
        counselorsOnline: 2 + Math.floor(Math.random() * 3),
        averageResponseTime: ['< 1 minute', '< 2 minutes', '< 3 minutes'][
          Math.floor(Math.random() * 3)
        ],
        totalConsultationsToday: 45 + Math.floor(Math.random() * 15),
      })
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleWhatsAppClick = (slotId?: string) => {
    const slot = slotId ? availableSlots.find((s) => s.id === slotId) : null

    let message = `Hi! I'm interested in NEET coaching consultation.`

    if (studentData?.name) {
      message += `\n\nMy details:\nName: ${studentData.name}`
    }

    if (studentData?.goals?.targetScore) {
      message += `\nTarget Score: ${studentData.goals.targetScore}`
    }

    if (studentData?.location?.city) {
      message += `\nLocation: ${studentData.location.city}, ${studentData.location.state}`
    }

    if (slot) {
      message += `\n\nI'd like to schedule a consultation for ${slot.time} with ${slot.counselorName}.`
    } else {
      message += `\n\nI'd like to schedule a consultation at your earliest convenience.`
    }

    if (consultationData.specificQuery) {
      message += `\n\nSpecific Query: ${consultationData.specificQuery}`
    }

    const phoneNumber = '+918826444334' // Cerebrum's WhatsApp number
    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    // Track the consultation request
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_consultation_request', {
        event_category: 'engagement',
        event_label: slot ? 'scheduled' : 'immediate',
        value: 1,
        custom_parameters: {
          slot_id: slotId,
          counselor: slot?.counselorName,
          urgency: consultationData.urgency,
        },
      })
    }

    window.open(whatsappURL, '_blank')
  }

  const handlePhoneCall = () => {
    const phoneNumber = '+918826444334'
    window.location.href = `tel:${phoneNumber}`

    // Track phone call
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'phone_consultation_request', {
        event_category: 'engagement',
        event_label: 'direct_call',
        value: 1,
      })
    }
  }

  const getUrgencyColor = () => {
    switch (urgencyLevel) {
      case 'high':
        return 'from-red-500 to-orange-500'
      case 'medium':
        return 'from-emerald-500 to-blue-500'
      case 'low':
        return 'from-blue-500 to-purple-500'
      default:
        return 'from-emerald-500 to-blue-500'
    }
  }

  const getPositionStyles = () => {
    switch (position) {
      case 'floating':
        return 'fixed bottom-6 right-6 z-50 max-w-sm'
      case 'sticky':
        return 'sticky top-4 z-40 max-w-sm'
      case 'inline':
        return 'w-full max-w-md mx-auto'
      default:
        return 'fixed bottom-6 right-6 z-50 max-w-sm'
    }
  }

  if (variant === 'compact' && !isExpanded) {
    return (
      <motion.div
        className={getPositionStyles()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={() => setIsExpanded(true)}
          className={`w-16 h-16 rounded-full bg-gradient-to-r ${getUrgencyColor()} text-white shadow-lg flex items-center justify-center relative overflow-hidden`}
        >
          <MessageCircle className="w-8 h-8" />

          {/* Pulse animation for urgency */}
          {urgencyLevel === 'high' && (
            <motion.div
              className="absolute inset-0 bg-white rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          {/* Online indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={getPositionStyles()}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getUrgencyColor()} p-4 text-white relative`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Free Consultation</h3>
                <p className="text-xs text-white/80">
                  {onlineStatus.counselorsOnline} counselors online
                </p>
              </div>
            </div>

            {variant === 'compact' && (
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-white/20 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Status indicators */}
          <div className="mt-3 flex items-center gap-4 text-xs text-white/90">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Response in {onlineStatus.averageResponseTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{onlineStatus.totalConsultationsToday} consultations today</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <motion.button
              onClick={() => handleWhatsAppClick()}
              className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="font-medium text-green-800 text-sm">WhatsApp</div>
                <div className="text-xs text-green-600">Instant chat</div>
              </div>
            </motion.button>

            <motion.button
              onClick={handlePhoneCall}
              className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="font-medium text-blue-800 text-sm">Call Now</div>
                <div className="text-xs text-blue-600">Direct call</div>
              </div>
            </motion.button>
          </div>

          {/* Scheduled consultation section */}
          {showScheduler && (
            <div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="w-full flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-800">Schedule Consultation</span>
                </div>
                {showForm ? (
                  <ChevronUp className="w-4 h-4 text-purple-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-purple-600" />
                )}
              </button>

              <AnimatePresence>
                {showForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 space-y-3"
                  >
                    {/* Available slots */}
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Available Slots</div>
                      <div className="space-y-2">
                        {availableSlots.map((slot) => (
                          <div
                            key={slot.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                              slot.available
                                ? selectedSlot === slot.id
                                  ? 'border-emerald-500 bg-emerald-50'
                                  : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-25'
                                : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                            }`}
                            onClick={() => slot.available && setSelectedSlot(slot.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-gray-500" />
                                  <span
                                    className={`font-medium ${slot.available ? 'text-gray-900' : 'text-gray-500'}`}
                                  >
                                    {slot.time}
                                  </span>
                                  {!slot.available && (
                                    <span className="text-xs text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                                      Busy
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                  {slot.counselorName} • {slot.counselorRating} ⭐
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {slot.specialization.join(' • ')}
                                </div>
                                {!slot.available && slot.nextAvailable && (
                                  <div className="text-xs text-blue-600 mt-1">
                                    Next available: {slot.nextAvailable}
                                  </div>
                                )}
                              </div>

                              {slot.available && selectedSlot === slot.id && (
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Consultation form */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Specific Query (Optional)
                        </label>
                        <textarea
                          value={consultationData.specificQuery}
                          onChange={(e) =>
                            setConsultationData((prev) => ({
                              ...prev,
                              specificQuery: e.target.value,
                            }))
                          }
                          placeholder="What specific help do you need? (Course selection, study plan, etc.)"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                          rows={3}
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="urgent"
                          checked={consultationData.urgency === 'urgent'}
                          onChange={(e) =>
                            setConsultationData((prev) => ({
                              ...prev,
                              urgency: e.target.checked ? 'urgent' : 'normal',
                            }))
                          }
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <label htmlFor="urgent" className="text-sm text-gray-700">
                          Urgent consultation needed
                        </label>
                      </div>
                    </div>

                    {/* Book consultation button */}
                    <button
                      onClick={() => handleWhatsAppClick(selectedSlot || undefined)}
                      disabled={!selectedSlot}
                      className="w-full flex items-center justify-center gap-2 p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Book via WhatsApp
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Trust indicators */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-lg font-bold text-emerald-600">4.9⭐</div>
                <div className="text-xs text-gray-600">Rating</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">10K+</div>
                <div className="text-xs text-gray-600">Students</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-600">94%</div>
                <div className="text-xs text-gray-600">Success</div>
              </div>
            </div>
          </div>

          {/* Testimonial snippet */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 italic">
              "The counseling session helped me choose the right course. Got AIR 156 with their
              guidance!"
            </div>
            <div className="text-xs text-gray-500 mt-1">- Priya S., NEET 2024</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WhatsAppConsultation
