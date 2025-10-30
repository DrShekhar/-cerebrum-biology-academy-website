'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  BookOpen,
  Video,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  MessageSquare,
  Gift,
  Zap,
  Trophy,
  Users,
  Target,
  Award,
  AlertCircle,
  TrendingUp,
  Check,
  X,
} from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { format, addDays, startOfTomorrow } from 'date-fns'
import 'react-day-picker/dist/style.css'
import { useAnalytics } from '@/hooks/useAnalytics'
import { zoomService } from '@/lib/zoom/zoomService'
import { useFormValidation } from '@/hooks/useFormValidation'
import { TestimonialCarousel } from './TestimonialCarousel'
import { BenefitsGrid } from './BenefitsGrid'
import { FAQAccordion } from './FAQAccordion'
import { InstructorCard } from './InstructorCard'
import { PremiumDemoCard } from './PremiumDemoCard'
import { ReferralInput } from './ReferralInput'
import { CalendarActions } from './CalendarActions'
import { ReferralShare } from './ReferralShare'

interface TimeSlot {
  id: string
  time: string
  available: boolean
  instructor?: string
  spotsLeft?: number
}

interface BookingData {
  studentName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  courseInterest: string[]
  currentClass: string
  previousScore?: string
  specificTopics: string
  hearAboutUs: string
  zoomMeetingId?: string
  zoomJoinUrl?: string
  zoomPassword?: string
}

export function DemoBookingSystem() {
  const { trackDemoRequest } = useAnalytics()
  const { validationStates, validateField, formatPhone, capitalizeName } = useFormValidation()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [hoveredInstructor, setHoveredInstructor] = useState<string | null>(null)
  const [bookingData, setBookingData] = useState<BookingData>({
    studentName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    courseInterest: ['neet-biology'],
    currentClass: '',
    previousScore: '',
    specificTopics: '',
    hearAboutUs: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [error, setError] = useState('')
  const [liveBookings] = useState(847) // Social proof counter
  const [selectedDemoType, setSelectedDemoType] = useState<'FREE' | 'PREMIUM'>('FREE')
  const [referralCode, setReferralCode] = useState('')
  const [referralDiscount, setReferralDiscount] = useState(0)
  const [paymentInProgress, setPaymentInProgress] = useState(false)
  const [bookingId, setBookingId] = useState<string>('')

  const disabledDays = [{ dayOfWeek: [0] }]
  const tomorrow = startOfTomorrow()
  const twoWeeksFromNow = addDays(tomorrow, 14)

  const getTimeSlots = (date: Date): TimeSlot[] => {
    const slots = [
      { id: '10:00', time: '10:00 AM', available: true, instructor: 'Dr. Priya', spotsLeft: 3 },
      { id: '11:30', time: '11:30 AM', available: true, instructor: 'Dr. Rahul', spotsLeft: 2 },
      { id: '14:00', time: '2:00 PM', available: true, instructor: 'Dr. Kavya', spotsLeft: 4 },
      { id: '15:30', time: '3:30 PM', available: false, instructor: 'Dr. Priya', spotsLeft: 0 },
      { id: '17:00', time: '5:00 PM', available: true, instructor: 'Dr. Ankit', spotsLeft: 1 },
      { id: '18:30', time: '6:30 PM', available: true, instructor: 'Dr. Rahul', spotsLeft: 3 },
    ]

    const isWeekend = date.getDay() === 6
    return isWeekend ? slots.filter((slot) => ['10:00', '11:30', '14:00'].includes(slot.id)) : slots
  }

  const getAvailabilityColor = (spotsLeft: number): string => {
    if (spotsLeft === 0) return 'bg-red-500'
    if (spotsLeft <= 2) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const handleInputChange = (field: keyof BookingData, value: string | string[]) => {
    if (field === 'studentName' && typeof value === 'string') {
      const capitalized = capitalizeName(value)
      setBookingData((prev) => ({ ...prev, [field]: capitalized }))
      if (value.trim().length >= 2) {
        validateField(field, value, 'name')
      }
    } else if (field === 'email' && typeof value === 'string') {
      setBookingData((prev) => ({ ...prev, [field]: value }))
      if (value.includes('@')) {
        validateField(field, value, 'email')
      }
    } else if (field === 'phone' && typeof value === 'string') {
      const formatted = formatPhone(value)
      setBookingData((prev) => ({ ...prev, [field]: formatted }))
      validateField(field, formatted, 'phone')
    } else {
      setBookingData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleCourseInterestToggle = (course: string) => {
    setBookingData((prev) => {
      const currentInterests = prev.courseInterest
      const isSelected = currentInterests.includes(course)

      if (isSelected) {
        if (currentInterests.length === 1) {
          return prev
        }
        return {
          ...prev,
          courseInterest: currentInterests.filter((c) => c !== course),
        }
      } else {
        if (currentInterests.length >= 3) {
          return prev
        }
        return {
          ...prev,
          courseInterest: [...currentInterests, course],
        }
      }
    })
  }

  const handleEmailSuggestionAccept = (suggestion: string) => {
    setBookingData((prev) => ({ ...prev, email: suggestion }))
    validateField('email', suggestion, 'email')
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePayment = async (bookingId: string, amount: number): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        // Create Razorpay order
        const orderResponse = await fetch('/api/payment/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, bookingId }),
        })

        if (!orderResponse.ok) {
          throw new Error('Failed to create payment order')
        }

        const { orderId, key } = await orderResponse.json()

        // Initialize Razorpay
        const options = {
          key,
          amount: amount * 100, // Convert to paise
          currency: 'INR',
          name: 'Cerebrum Biology Academy',
          description: 'Premium Demo Class',
          order_id: orderId,
          handler: async (response: any) => {
            try {
              // Verify payment
              const verifyResponse = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  bookingId,
                }),
              })

              if (verifyResponse.ok) {
                console.log('✅ Payment verified successfully')
                resolve()
              } else {
                throw new Error('Payment verification failed')
              }
            } catch (error) {
              console.error('Payment verification error:', error)
              reject(error)
            }
          },
          prefill: {
            name: bookingData.studentName,
            email: bookingData.email,
            contact: bookingData.phone,
          },
          theme: {
            color: '#0ea5e9',
          },
          modal: {
            ondismiss: () => reject(new Error('Payment cancelled by user')),
          },
        }

        const razorpay = new (window as any).Razorpay(options)
        razorpay.open()
      } catch (error) {
        console.error('Payment initialization error:', error)
        reject(error)
      }
    })
  }

  const sendSMSConfirmation = async (bookingIdParam: string) => {
    try {
      await fetch('/api/notifications/sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: bookingData.phone,
          name: bookingData.studentName,
          date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
          time: selectedTime,
          zoomUrl: bookingData.zoomJoinUrl || 'Will be sent 30 minutes before',
          demoType: selectedDemoType,
          bookingId: bookingIdParam,
        }),
      })
      console.log('✅ SMS confirmation sent')
    } catch (error) {
      console.error('⚠️ SMS failed (non-critical):', error)
      // Don't fail booking if SMS fails
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError('') // Clear previous errors

    try {
      const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''

      const bookingPayload = {
        name: bookingData.studentName,
        email: bookingData.email,
        phone: bookingData.phone,
        whatsappNumber: bookingData.phone,
        courseInterest: bookingData.courseInterest,
        preferredDate: formattedDate,
        preferredTime: selectedTime,
        message: bookingData.specificTopics || undefined,
        demoType: selectedDemoType,
        referralCodeUsed: referralCode || undefined,
        referralDiscount: referralDiscount || undefined,
      }

      console.log('📤 Submitting booking to API:', bookingPayload)

      const apiResponse = await fetch('/api/demo-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
      })

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json()
        throw new Error(errorData.error || 'Booking submission failed')
      }

      const apiResult = await apiResponse.json()
      const bookingIdResult = apiResult.bookingId

      console.log('✅ Booking saved to database:', bookingIdResult)
      setBookingId(bookingIdResult) // Save bookingId to state

      let zoomMeeting = null
      try {
        zoomMeeting = await zoomService.createDemoMeeting({
          studentName: bookingData.studentName,
          email: bookingData.email,
          phone: bookingData.phone,
          preferredDate: selectedDate!,
          preferredTime: selectedTime,
          courseInterest: bookingData.courseInterest.join(', '),
          studentClass: bookingData.currentClass,
          previousKnowledge: bookingData.previousScore || 'First attempt',
          specificTopics: bookingData.specificTopics ? [bookingData.specificTopics] : [],
        })

        console.log('✅ Zoom meeting created:', zoomMeeting?.id)

        if (zoomMeeting) {
          setBookingData((prev) => ({
            ...prev,
            zoomMeetingId: zoomMeeting.id,
            zoomJoinUrl: zoomMeeting.join_url,
            zoomPassword: zoomMeeting.password,
          }))
        }
      } catch (zoomError) {
        console.warn('⚠️ Zoom meeting creation failed (non-critical):', zoomError)
      }

      // Step 3: Handle Payment (if premium)
      if (selectedDemoType === 'PREMIUM') {
        const finalPrice = 99 - referralDiscount

        if (finalPrice > 0) {
          console.log(`💳 Processing payment: ₹${finalPrice}`)
          setPaymentInProgress(true)
          try {
            await handlePayment(bookingIdResult, finalPrice)
            console.log('✅ Payment completed successfully')
          } catch (paymentError) {
            setPaymentInProgress(false)
            throw new Error(
              paymentError instanceof Error
                ? paymentError.message
                : 'Payment failed. Please try again.'
            )
          }
          setPaymentInProgress(false)
        } else {
          console.log('🎉 Premium demo is free with referral discount!')
        }
      }

      // Step 4: Send SMS Confirmation
      await sendSMSConfirmation(bookingIdResult)

      // Step 5: Track analytics
      trackDemoRequest(
        bookingData.studentName,
        bookingData.courseInterest.join(', '),
        bookingData.phone
      )

      // Step 6: Show success screen
      setBookingComplete(true)

      // Step 7: Clear saved draft from localStorage
      localStorage.removeItem('demo-booking-draft')

      console.log('🎉 Booking completed successfully!')
    } catch (error) {
      console.error('❌ Booking failed:', error)

      // Show user-friendly error message
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unable to complete your booking. Please try again or contact us at +91 88264 44334.'

      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
      setPaymentInProgress(false)
    }
  }

  const timeSlots = selectedDate ? getTimeSlots(selectedDate) : []
  const formattedSelectedDate = selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''

  const stepTitles = [
    'Select Date & Time',
    'Your Information',
    'Course Preferences',
    'Confirm Booking',
  ]

  if (bookingComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-lg p-8 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Demo Booked Successfully! 🎉</h2>

          <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold text-blue-900 mb-3">Your Demo Details:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>{formattedSelectedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{selectedTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-blue-600" />
                <span>
                  Zoom link:{' '}
                  {bookingData.zoomJoinUrl ? 'Ready to join!' : 'Will be sent 30 minutes before'}
                </span>
              </div>
              {bookingData.zoomPassword && (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 text-blue-600">🔐</span>
                  <span>Meeting Password: {bookingData.zoomPassword}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>WhatsApp confirmation sent to {bookingData.phone}</span>
              </div>
            </div>
          </div>

          {/* Calendar Actions */}
          <div className="mb-6">
            <CalendarActions
              bookingData={{
                studentName: bookingData.studentName,
                email: bookingData.email,
                phone: bookingData.phone,
                preferredDate: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
                preferredTime: selectedTime,
                zoomJoinUrl: bookingData.zoomJoinUrl || '',
                zoomPassword: bookingData.zoomPassword || '',
                demoType: selectedDemoType,
              }}
            />
          </div>

          {/* Referral Share */}
          <div className="mb-6">
            <ReferralShare userName={bookingData.studentName} userEmail={bookingData.email} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Gift className="w-4 h-4 text-purple-600" />
                <span>Free study materials</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span>NEET strategy session</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4 text-green-600" />
                <span>Personalized guidance</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => (window.location.href = '/courses')}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Explore Courses
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Home
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Need to reschedule? Contact us at +91 88264 44334 or email
              support@cerebrumbiologyacademy.com
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  useEffect(() => {
    if (bookingData.studentName || bookingData.email || selectedDate) {
      const draftData = {
        ...bookingData,
        selectedDate: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null,
        selectedTime,
        currentStep,
        savedAt: new Date().toISOString(),
      }
      localStorage.setItem('demo-booking-draft', JSON.stringify(draftData))
      console.log('💾 Progress saved to localStorage')
    }
  }, [bookingData, selectedDate, selectedTime, currentStep])

  // Load saved progress on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('demo-booking-draft')
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft)
        const savedAt = new Date(parsed.savedAt)
        const hoursSince = (Date.now() - savedAt.getTime()) / (1000 * 60 * 60)

        // Only restore if less than 24 hours old
        if (hoursSince < 24) {
          const shouldRestore = window.confirm(
            'We found your previous booking draft. Would you like to continue where you left off?'
          )

          if (shouldRestore) {
            setBookingData({
              studentName: parsed.studentName || '',
              email: parsed.email || '',
              phone: parsed.phone || '',
              preferredDate: parsed.preferredDate || '',
              preferredTime: parsed.preferredTime || '',
              courseInterest: Array.isArray(parsed.courseInterest)
                ? parsed.courseInterest
                : parsed.courseInterest
                  ? [parsed.courseInterest]
                  : ['neet-biology'],
              currentClass: parsed.currentClass || '',
              previousScore: parsed.previousScore || '',
              specificTopics: parsed.specificTopics || '',
              hearAboutUs: parsed.hearAboutUs || '',
            })
            if (parsed.selectedDate) {
              setSelectedDate(new Date(parsed.selectedDate))
            }
            setSelectedTime(parsed.selectedTime || '')
            setCurrentStep(parsed.currentStep || 1)
            console.log('✅ Draft restored from localStorage')
          } else {
            localStorage.removeItem('demo-booking-draft')
          }
        } else {
          localStorage.removeItem('demo-booking-draft')
          console.log('🗑️ Old draft removed (>24 hours)')
        }
      } catch (e) {
        console.error('Failed to restore draft:', e)
        localStorage.removeItem('demo-booking-draft')
      }
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 md:p-6 text-white">
          <h1 className="text-xl md:text-2xl font-bold mb-2">
            Book Your Free NEET Biology Demo Class
          </h1>
          <p className="text-blue-100">
            Experience our teaching methodology and get personalized guidance from AIIMS experts
          </p>

          {/* Social Proof Counter */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{liveBookings}+ students booked this month</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 rating from demos</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>94.2% NEET success rate</span>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mt-6">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep > index + 1
                      ? 'bg-green-500 text-white'
                      : currentStep === index + 1
                        ? 'bg-white text-blue-600'
                        : 'bg-blue-500 text-blue-200'
                  }`}
                >
                  {currentStep > index + 1 ? '✓' : index + 1}
                </div>
                {index < stepTitles.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${
                      currentStep > index + 1 ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-2">
            <span className="text-sm text-blue-100">{stepTitles[currentStep - 1]}</span>
          </div>
        </div>

        {/* Testimonials */}
        <div className="px-4 md:px-6 pt-6">
          <TestimonialCarousel />
        </div>

        {/* Benefits Grid */}
        <div className="px-4 md:px-6">
          <BenefitsGrid />
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-red-900">Booking Error</p>
                  <p className="text-sm text-red-800 mt-1">{error}</p>
                  <button
                    onClick={() => setError('')}
                    className="text-sm text-red-700 underline mt-2 hover:text-red-900"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1: Date & Time Selection */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Choose Your Preferred Date
                  </h3>
                  <div className="flex justify-center">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date)
                        setSelectedTime('')
                      }}
                      disabled={disabledDays}
                      fromDate={tomorrow}
                      toDate={twoWeeksFromNow}
                      modifiersClassNames={{
                        selected: 'bg-blue-600 text-white hover:bg-blue-700',
                        today: 'font-bold text-blue-600',
                        disabled: 'text-gray-300 cursor-not-allowed',
                      }}
                      className="border border-gray-200 rounded-lg p-4"
                    />
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Sundays are not available for booking
                  </p>
                </div>

                {selectedDate && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    {/* Urgency Banner */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded-r-lg">
                      <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-yellow-900">Limited Slots Available!</p>
                          <p className="text-sm text-yellow-800 mt-1">
                            Only {timeSlots.filter((s) => s.available).length} slots left for this
                            date. Book now to secure your preferred time!
                          </p>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Available Time Slots
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {timeSlots.map((slot) => (
                        <div
                          key={slot.id}
                          className="relative"
                          onMouseEnter={() =>
                            slot.instructor && setHoveredInstructor(slot.instructor)
                          }
                          onMouseLeave={() => setHoveredInstructor(null)}
                        >
                          <button
                            onClick={() => slot.available && setSelectedTime(slot.time)}
                            disabled={!slot.available}
                            className={`w-full p-4 rounded-lg border-2 text-left transition-all min-h-[44px] touch-manipulation ${
                              selectedTime === slot.time
                                ? 'border-blue-600 bg-blue-50'
                                : slot.available
                                  ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                  : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900">{slot.time}</span>
                              {slot.available && slot.spotsLeft !== undefined && (
                                <div className="flex items-center gap-1">
                                  <div
                                    className={`w-2 h-2 rounded-full ${getAvailabilityColor(slot.spotsLeft)}`}
                                  />
                                  <span className="text-xs text-gray-600">
                                    {slot.spotsLeft} {slot.spotsLeft === 1 ? 'spot' : 'spots'}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                              with {slot.instructor}
                            </div>
                            {!slot.available && (
                              <div className="text-xs text-red-600 mt-1">Fully booked</div>
                            )}
                          </button>
                          {slot.instructor && (
                            <InstructorCard
                              instructorName={slot.instructor}
                              isVisible={hoveredInstructor === slot.instructor}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tell Us About Yourself</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={bookingData.studentName}
                        onChange={(e) => handleInputChange('studentName', e.target.value)}
                        className={`w-full p-3 pr-10 border rounded-lg focus:ring-2 focus:border-transparent ${
                          validationStates.studentName?.isValid
                            ? 'border-green-500 focus:ring-green-500'
                            : validationStates.studentName?.error
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        placeholder="Enter your full name"
                        required
                      />
                      {validationStates.studentName?.isValid && (
                        <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                      {validationStates.studentName?.error && (
                        <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                      )}
                    </div>
                    {validationStates.studentName?.error && (
                      <p className="text-xs text-red-600 mt-1">
                        {validationStates.studentName.error}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={bookingData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full p-3 pr-10 border rounded-lg focus:ring-2 focus:border-transparent ${
                          validationStates.email?.isValid
                            ? 'border-green-500 focus:ring-green-500'
                            : validationStates.email?.error
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        placeholder="your@email.com"
                        required
                      />
                      {validationStates.email?.isValid && (
                        <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                      {validationStates.email?.error && (
                        <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                      )}
                    </div>
                    {validationStates.email?.error && (
                      <p className="text-xs text-red-600 mt-1">{validationStates.email.error}</p>
                    )}
                    {validationStates.email?.suggestion && (
                      <button
                        onClick={() =>
                          handleEmailSuggestionAccept(validationStates.email!.suggestion!)
                        }
                        className="text-xs text-blue-600 hover:text-blue-700 underline mt-1"
                      >
                        Did you mean: {validationStates.email.suggestion}?
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={bookingData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full p-3 pr-10 border rounded-lg focus:ring-2 focus:border-transparent ${
                          validationStates.phone?.isValid
                            ? 'border-green-500 focus:ring-green-500'
                            : validationStates.phone?.error
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        placeholder="+91 98765 43210"
                        required
                      />
                      {validationStates.phone?.isValid && (
                        <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                      {validationStates.phone?.error && (
                        <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                      )}
                    </div>
                    {validationStates.phone?.error && (
                      <p className="text-xs text-red-600 mt-1">{validationStates.phone.error}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Class/Status *
                    </label>
                    <select
                      value={bookingData.currentClass}
                      onChange={(e) => handleInputChange('currentClass', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select your current status</option>
                      <option value="class-11">Class 11th</option>
                      <option value="class-12">Class 12th</option>
                      <option value="dropper-1">1st Year Dropper</option>
                      <option value="dropper-2">2nd Year Dropper</option>
                      <option value="working-professional">Working Professional</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous NEET Score (if applicable)
                  </label>
                  <input
                    type="text"
                    value={bookingData.previousScore}
                    onChange={(e) => handleInputChange('previousScore', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 520/720 or Not attempted"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Course Preferences */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Your Learning Preferences
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <BookOpen className="w-4 h-4 inline mr-2" />
                    Course Interest * (Select 1-3 courses)
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Choose up to 3 courses you are interested in
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: 'neet-biology', label: 'Complete NEET Biology Course' },
                      { id: 'class-11-biology', label: 'Class 11th Biology' },
                      { id: 'class-12-biology', label: 'Class 12th Biology' },
                      { id: 'crash-course', label: 'NEET Biology Crash Course' },
                      { id: 'doubt-clearing', label: 'Doubt Clearing Sessions' },
                      { id: 'test-series', label: 'Biology Test Series' },
                    ].map((course) => (
                      <button
                        key={course.id}
                        type="button"
                        onClick={() => handleCourseInterestToggle(course.id)}
                        disabled={
                          !bookingData.courseInterest.includes(course.id) &&
                          bookingData.courseInterest.length >= 3
                        }
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          bookingData.courseInterest.includes(course.id)
                            ? 'border-blue-600 bg-blue-50 text-blue-900'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              bookingData.courseInterest.includes(course.id)
                                ? 'bg-blue-600 border-blue-600'
                                : 'border-gray-300'
                            }`}
                          >
                            {bookingData.courseInterest.includes(course.id) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="font-medium">{course.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Selected: {bookingData.courseInterest.length}/3
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specific Topics You Want to Focus On
                  </label>
                  <textarea
                    value={bookingData.specificTopics}
                    onChange={(e) => handleInputChange('specificTopics', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="e.g., Genetics, Human Physiology, Plant Biology, or any specific doubts..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How did you hear about us? *
                  </label>
                  <select
                    value={bookingData.hearAboutUs}
                    onChange={(e) => handleInputChange('hearAboutUs', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="google-search">Google Search</option>
                    <option value="youtube">YouTube</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="friend-referral">Friend/Family Referral</option>
                    <option value="coaching-center">Other Coaching Center</option>
                    <option value="school">School</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Confirm Your Demo Booking
                </h3>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-4">Booking Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Student Name:</span>
                      <span className="font-medium">{bookingData.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{bookingData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{bookingData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="font-medium">
                        {formattedSelectedDate} at {selectedTime}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-gray-600">Course Interest:</span>
                      <div className="flex flex-wrap gap-1">
                        {bookingData.courseInterest.map((course) => (
                          <span
                            key={course}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <Gift className="w-5 h-5" />
                    What You'll Get in Your Free Demo
                  </h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      45-minute personalized NEET Biology session
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Free study material and chapter notes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      NEET strategy and preparation roadmap
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Doubt clearing and topic explanation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Personalized feedback and guidance
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-yellow-900">Important Notes:</h5>
                      <ul className="text-sm text-yellow-800 mt-1 space-y-1">
                        <li>• Zoom link will be sent 30 minutes before the session</li>
                        <li>• Please ensure stable internet connection</li>
                        <li>• Keep a notebook ready for taking notes</li>
                        <li>• No payment required - this demo is completely free</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp Quick Booking */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <p className="text-center text-sm text-gray-600 mb-3">Prefer to book via WhatsApp?</p>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent(
                `Hi! I'd like to book a free NEET Biology demo class.\n\n${
                  bookingData.studentName ? `Name: ${bookingData.studentName}\n` : ''
                }${bookingData.currentClass ? `Class: ${bookingData.currentClass}\n` : ''}${
                  bookingData.courseInterest ? `Interest: ${bookingData.courseInterest}\n` : ''
                }${selectedDate ? `Preferred Date: ${selectedDate}\n` : ''}${
                  selectedTime ? `Preferred Time: ${selectedTime}` : ''
                }`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors min-h-[44px] touch-manipulation"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Book via WhatsApp</span>
            </a>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-4 md:px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Back</span>
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNextStep}
                disabled={
                  (currentStep === 1 && (!selectedDate || !selectedTime)) ||
                  (currentStep === 2 &&
                    (!bookingData.studentName ||
                      !bookingData.email ||
                      !bookingData.phone ||
                      !bookingData.currentClass)) ||
                  (currentStep === 3 &&
                    (bookingData.courseInterest.length === 0 || !bookingData.hearAboutUs))
                }
                className="flex items-center gap-2 px-4 md:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 md:px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">Confirm Booking</span>
                    <span className="sm:hidden">Confirm</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="px-4 md:px-6 pb-6">
          <FAQAccordion />
        </div>
      </div>
    </div>
  )
}
