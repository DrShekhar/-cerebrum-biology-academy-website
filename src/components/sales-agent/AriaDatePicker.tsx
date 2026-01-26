/**
 * ARIA Sales Agent - Inline Demo Booking Component
 * Compact date/time picker for scheduling demos within chat
 */

'use client'

import { useState, useCallback } from 'react'
import { Calendar, Clock, CheckCircle, X } from 'lucide-react'
import { addDays, format, startOfTomorrow, isWeekend } from 'date-fns'
import type { Language } from '@/lib/aria/types'

interface AriaDatePickerProps {
  language: Language
  onBookingComplete: (booking: DemoBooking) => void
  onCancel: () => void
  existingPhone?: string
  existingName?: string
}

export interface DemoBooking {
  date: string
  time: string
  timeSlot: 'morning' | 'afternoon' | 'evening'
  phone?: string
  name?: string
}

type TimeSlot = 'morning' | 'afternoon' | 'evening'

interface DateOption {
  date: Date
  label: string
  sublabel: string
}

function getNextAvailableDates(): DateOption[] {
  const dates: DateOption[] = []
  let currentDate = startOfTomorrow()

  // Get next 3 available dates (skip Sundays)
  while (dates.length < 3) {
    if (currentDate.getDay() !== 0) {
      dates.push({
        date: currentDate,
        label: format(currentDate, 'EEE, MMM d'),
        sublabel: format(currentDate, 'yyyy'),
      })
    }
    currentDate = addDays(currentDate, 1)
  }

  return dates
}

const timeSlots: { id: TimeSlot; en: string; hi: string; time: string }[] = [
  { id: 'morning', en: 'Morning', hi: 'सुबह', time: '9:00 - 12:00' },
  { id: 'afternoon', en: 'Afternoon', hi: 'दोपहर', time: '12:00 - 5:00' },
  { id: 'evening', en: 'Evening', hi: 'शाम', time: '5:00 - 9:00' },
]

export function AriaDatePicker({
  language,
  onBookingComplete,
  onCancel,
  existingPhone,
  existingName,
}: AriaDatePickerProps) {
  const [step, setStep] = useState<'date' | 'time' | 'phone' | 'confirm'>('date')
  const [selectedDate, setSelectedDate] = useState<DateOption | null>(null)
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null)
  const [phone, setPhone] = useState(existingPhone || '')
  const [phoneError, setPhoneError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const dateOptions = getNextAvailableDates()

  const handleDateSelect = useCallback((date: DateOption) => {
    setSelectedDate(date)
    setStep('time')
  }, [])

  const handleTimeSelect = useCallback(
    (slot: TimeSlot) => {
      setSelectedTime(slot)
      // If we have phone, skip to confirm
      if (existingPhone) {
        setStep('confirm')
      } else {
        setStep('phone')
      }
    },
    [existingPhone]
  )

  const validatePhone = useCallback(
    (value: string): boolean => {
      const cleaned = value.replace(/\D/g, '')
      if (cleaned.length !== 10) {
        setPhoneError(language === 'hi' ? 'कृपया 10 अंकों का नंबर दें' : 'Please enter 10 digits')
        return false
      }
      if (!/^[6-9]/.test(cleaned)) {
        setPhoneError(language === 'hi' ? 'अमान्य मोबाइल नंबर' : 'Invalid mobile number')
        return false
      }
      setPhoneError('')
      return true
    },
    [language]
  )

  const handlePhoneSubmit = useCallback(() => {
    if (validatePhone(phone)) {
      setStep('confirm')
    }
  }, [phone, validatePhone])

  const handleConfirm = useCallback(async () => {
    if (!selectedDate || !selectedTime) return

    setIsSubmitting(true)

    const booking: DemoBooking = {
      date: format(selectedDate.date, 'yyyy-MM-dd'),
      time: selectedDate.label,
      timeSlot: selectedTime,
      phone: phone || existingPhone,
      name: existingName,
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    onBookingComplete(booking)
    setIsSubmitting(false)
  }, [selectedDate, selectedTime, phone, existingPhone, existingName, onBookingComplete])

  const handleBack = useCallback(() => {
    if (step === 'time') setStep('date')
    else if (step === 'phone') setStep('time')
    else if (step === 'confirm') setStep(existingPhone ? 'time' : 'phone')
  }, [step, existingPhone])

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Calendar className="h-4 w-4 text-green-600" />
          {language === 'hi' ? 'डेमो बुक करें' : 'Book Demo'}
        </div>
        <button
          onClick={onCancel}
          className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Cancel"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Step indicator */}
      <div className="mb-3 flex gap-1">
        {['date', 'time', existingPhone ? null : 'phone', 'confirm'].filter(Boolean).map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full ${
              step === s
                ? 'bg-green-500'
                : ['date', 'time', 'phone', 'confirm'].indexOf(step) >
                    ['date', 'time', 'phone', 'confirm'].indexOf(s as string)
                  ? 'bg-green-200'
                  : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Date Selection */}
      {step === 'date' && (
        <div className="space-y-2">
          <p className="text-xs text-slate-500">
            {language === 'hi' ? 'तारीख़ चुनें:' : 'Select a date:'}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {dateOptions.map((option) => (
              <button
                key={option.date.toISOString()}
                onClick={() => handleDateSelect(option)}
                className="flex flex-col items-center rounded-lg border border-slate-200 bg-slate-50 p-2 text-center transition-all hover:border-green-300 hover:bg-green-50"
              >
                <span className="text-xs font-medium text-slate-700">{option.label}</span>
                <span className="text-[10px] text-slate-400">
                  {isWeekend(option.date)
                    ? language === 'hi'
                      ? 'सप्ताहांत'
                      : 'Weekend'
                    : language === 'hi'
                      ? 'कार्यदिवस'
                      : 'Weekday'}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Time Selection */}
      {step === 'time' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              {language === 'hi' ? 'समय चुनें:' : 'Select time:'}
            </p>
            <button onClick={handleBack} className="text-xs text-green-600 hover:text-green-700">
              ← {language === 'hi' ? 'वापस' : 'Back'}
            </button>
          </div>
          <div className="space-y-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => handleTimeSelect(slot.id)}
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-2 transition-all hover:border-green-300 hover:bg-green-50"
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">
                    {language === 'hi' ? slot.hi : slot.en}
                  </span>
                </div>
                <span className="text-xs text-slate-400">{slot.time}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Phone Input */}
      {step === 'phone' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              {language === 'hi' ? 'फ़ोन नंबर:' : 'Phone number:'}
            </p>
            <button onClick={handleBack} className="text-xs text-green-600 hover:text-green-700">
              ← {language === 'hi' ? 'वापस' : 'Back'}
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10)
                setPhone(cleaned)
                if (phoneError) validatePhone(cleaned)
              }}
              placeholder={language === 'hi' ? '10 अंकों का नंबर' : '10-digit number'}
              className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
                phoneError ? 'border-red-300 bg-red-50' : 'border-slate-200'
              } focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400`}
            />
            <button
              onClick={handlePhoneSubmit}
              disabled={phone.length !== 10}
              className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {language === 'hi' ? 'आगे' : 'Next'}
            </button>
          </div>
          {phoneError && <p className="text-xs text-red-500">{phoneError}</p>}
        </div>
      )}

      {/* Confirmation */}
      {step === 'confirm' && selectedDate && selectedTime && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              {language === 'hi' ? 'पुष्टि करें:' : 'Confirm booking:'}
            </p>
            <button onClick={handleBack} className="text-xs text-green-600 hover:text-green-700">
              ← {language === 'hi' ? 'बदलें' : 'Change'}
            </button>
          </div>

          <div className="rounded-lg bg-green-50 p-3">
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <span className="font-medium text-slate-700">{selectedDate.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="text-slate-600">
                  {timeSlots.find((s) => s.id === selectedTime)?.[language === 'hi' ? 'hi' : 'en']}{' '}
                  ({timeSlots.find((s) => s.id === selectedTime)?.time})
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-green-400"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {language === 'hi' ? 'बुक हो रहा है...' : 'Booking...'}
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                {language === 'hi' ? 'डेमो बुक करें' : 'Confirm Booking'}
              </>
            )}
          </button>

          <p className="text-center text-[10px] text-slate-400">
            {language === 'hi'
              ? 'हम आपको WhatsApp पर डिटेल्स भेजेंगे'
              : "We'll send details on WhatsApp"}
          </p>
        </div>
      )}
    </div>
  )
}
