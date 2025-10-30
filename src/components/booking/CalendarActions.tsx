'use client'

import { useState } from 'react'
import { Calendar, Download, Mail, MessageCircle, ExternalLink, CheckCircle } from 'lucide-react'
import {
  downloadCalendarEvent,
  addToGoogleCalendar,
  shareCalendarViaWhatsApp,
  shareCalendarViaEmail,
} from '@/lib/calendar/calendarService'

interface CalendarActionsProps {
  bookingData: {
    studentName: string
    email: string
    phone: string
    preferredDate: string
    preferredTime: string
    instructor?: string
    zoomJoinUrl?: string
    zoomPassword?: string
    demoType?: 'FREE' | 'PREMIUM'
  }
}

export function CalendarActions({ bookingData }: CalendarActionsProps) {
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = () => {
    try {
      downloadCalendarEvent(bookingData)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 3000)
    } catch (error) {
      console.error('Failed to download calendar event:', error)
      alert('Failed to create calendar file. Please try again.')
    }
  }

  const handleGoogleCalendar = () => {
    const url = addToGoogleCalendar(bookingData)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleWhatsAppShare = () => {
    const url = shareCalendarViaWhatsApp(bookingData)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleEmailShare = () => {
    const url = shareCalendarViaEmail(bookingData)
    window.location.href = url
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Add to Calendar</h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Never miss your demo class - add it to your calendar now!
      </p>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          {downloaded ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Downloaded</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                Download .ics
              </span>
            </>
          )}
        </button>

        <button
          onClick={handleGoogleCalendar}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
            Google Calendar
          </span>
        </button>

        <button
          onClick={handleWhatsAppShare}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">
            Share via WhatsApp
          </span>
        </button>

        <button
          onClick={handleEmailShare}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <Mail className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
            Share via Email
          </span>
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Works with Google Calendar, Apple Calendar, Outlook, and more
      </p>
    </div>
  )
}
