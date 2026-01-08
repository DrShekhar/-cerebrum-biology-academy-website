'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Download,
  MessageCircle,
  Share2,
  Mail,
  ArrowRight,
} from 'lucide-react'
import {
  SEMINAR_CONFIG,
  getNextSeminarDate,
  formatSeminarDate,
  generateCalendarICS,
} from '@/lib/seminar/config'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'

interface RegistrationData {
  id: string
  parentName: string
  email: string
  seminarDate: string
  seminarSlot: string
}

export default function SeminarThankYouPage() {
  const searchParams = useSearchParams()
  const registrationId = searchParams.get('id')
  const [registration, setRegistration] = useState<RegistrationData | null>(null)
  const [seminarDate, setSeminarDate] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSeminarDate(getNextSeminarDate())
  }, [])

  const handleDownloadCalendar = () => {
    if (!seminarDate) return

    const icsContent = generateCalendarICS(seminarDate)
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'neet-guidance-seminar.ics'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    const shareData = {
      title: SEMINAR_CONFIG.title,
      text: `I just registered for the NEET Guidance Seminar by Dr. Shekhar! Learn how to support your child's NEET preparation.`,
      url: 'https://cerebrumbiologyacademy.com/neet-guidance-seminar/',
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.url)
      alert('Link copied to clipboard!')
    }
  }

  const handleWhatsAppClick = () => {
    trackAndOpenWhatsApp({
      source: 'seminar_thank_you',
      message: WHATSAPP_MESSAGES.seminarSupport,
      buttonText: 'WhatsApp Us',
    })
  }

  if (!mounted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      {/* Success Header */}
      <section className="bg-gradient-to-br from-green-600 to-teal-600 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-lg">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Registration Successful!
          </h1>
          <p className="text-lg text-green-100">
            You're all set for the NEET Guidance Seminar
          </p>
          {registrationId && (
            <p className="text-sm text-green-200 mt-2">
              Registration ID: {registrationId}
            </p>
          )}
        </div>
      </section>

      {/* Confirmation Details */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Seminar Details Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              Seminar Details
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <Calendar className="w-5 h-5 text-slate-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Date</p>
                  <p className="text-slate-600">
                    {seminarDate ? formatSeminarDate(seminarDate) : 'Next Friday'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <Clock className="w-5 h-5 text-slate-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Time</p>
                  <p className="text-slate-600">8:00 PM IST (1 hour session)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <MapPin className="w-5 h-5 text-slate-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Platform</p>
                  <p className="text-slate-600">Online via Zoom (link will be shared)</p>
                </div>
              </div>
            </div>

            {/* Calendar Download */}
            <button
              onClick={handleDownloadCalendar}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-5 h-5" />
              Add to Calendar
            </button>
          </div>

          {/* What's Next Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              What Happens Next?
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <p className="font-semibold text-slate-900">WhatsApp Confirmation</p>
                  <p className="text-slate-600 text-sm">
                    You'll receive a welcome message on WhatsApp within a few minutes
                    with all seminar details.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Email Confirmation</p>
                  <p className="text-slate-600 text-sm">
                    Check your email for the registration confirmation and calendar
                    invite.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Reminder Notifications</p>
                  <p className="text-slate-600 text-sm">
                    We'll send you reminders 24 hours and 1 hour before the seminar
                    via WhatsApp.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Join the Session</p>
                  <p className="text-slate-600 text-sm">
                    On the seminar day, click the Zoom link in your WhatsApp message
                    to join live!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Share Card */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 md:p-8 mb-8 border border-purple-100">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Know Other NEET Parents?
            </h2>
            <p className="text-slate-600 mb-4">
              Share this seminar with other parents who could benefit from expert
              NEET guidance.
            </p>
            <button
              onClick={handleShare}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Share with Friends
            </button>
          </div>

          {/* Contact Support */}
          <div className="bg-slate-100 rounded-2xl p-6 text-center">
            <p className="text-slate-600 mb-4">
              Have questions? Reach out to us anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </button>
              <a
                href="mailto:info@cerebrumbiologyacademy.com"
                className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </a>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
