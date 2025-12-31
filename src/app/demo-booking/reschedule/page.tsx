'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Mail, Phone, CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface BookingData {
  id: string
  studentName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  demoType: 'FREE' | 'PREMIUM'
  status: string
}

function RescheduleContent() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('id')
  const token = searchParams.get('token')

  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState<BookingData | null>(null)
  const [error, setError] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (bookingId && token) {
      fetchBooking()
    } else {
      setError('Invalid reschedule link')
      setLoading(false)
    }
  }, [bookingId, token])

  const fetchBooking = async () => {
    try {
      const response = await fetch(`/api/demo-booking/reschedule?id=${bookingId}&token=${token}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch booking')
      }

      setBooking(data.booking)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load booking')
    } finally {
      setLoading(false)
    }
  }

  const handleReschedule = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/demo-booking/reschedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          token,
          newDate,
          newTime,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reschedule')
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reschedule')
    } finally {
      setSubmitting(false)
    }
  }

  const getAvailableDates = () => {
    const dates = []
    const today = new Date()

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      if (date.getDay() !== 0) {
        dates.push(date.toISOString().split('T')[0])
      }
    }
    return dates
  }

  const availableTimeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM',
    '05:00 PM - 06:00 PM',
    '06:00 PM - 07:00 PM',
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    )
  }

  if (error && !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-red-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Booking</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <p className="text-sm text-gray-500">
            Please contact support at{' '}
            <a href="tel:+918826444334" className="text-blue-600 hover:underline">
              +91 88264 44334
            </a>
          </p>
        </motion.div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Rescheduled Successfully!</h1>
          <p className="text-gray-600 mb-6">Your demo class has been rescheduled to:</p>
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <p className="text-lg font-semibold text-blue-900">
              {new Date(newDate).toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-blue-700 font-medium mt-2">{newTime}</p>
          </div>
          <p className="text-sm text-gray-500">
            You will receive a confirmation via email and SMS shortly.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Reschedule Demo Class</h1>
            <p className="text-blue-100">Choose a new date and time for your demo session</p>
          </div>

          {booking && (
            <div className="p-8">
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Current Booking Details
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <User className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{booking.studentName}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{booking.email}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Phone className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{booking.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                    <span>
                      {new Date(booking.preferredDate).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{booking.preferredTime}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleReschedule} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Date</label>
                  <select
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a date</option>
                    {getAvailableDates().map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Time Slot
                  </label>
                  <select
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a time</option>
                    {availableTimeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || !newDate || !newTime}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-600 text-white font-semibold py-4 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Rescheduling...
                    </>
                  ) : (
                    'Confirm Reschedule'
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Need help?{' '}
                <a href="tel:+918826444334" className="text-blue-600 hover:underline">
                  Call +91 88264 44334
                </a>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default function ReschedulePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        </div>
      }
    >
      <RescheduleContent />
    </Suspense>
  )
}
