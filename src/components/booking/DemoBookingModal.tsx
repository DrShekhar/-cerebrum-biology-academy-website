'use client'

import { useEffect, useCallback } from 'react'
import { X, Calendar, Phone, MessageCircle, CheckCircle } from 'lucide-react'
import FocusTrap from 'focus-trap-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

interface DemoBookingModalProps {
  isOpen: boolean
  onClose: () => void
  courseId: string
  courseTitle: string
}

export function DemoBookingModal({
  isOpen,
  onClose,
  courseId,
  courseTitle,
}: DemoBookingModalProps) {
  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEscapeKey])

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40 animate-fadeInUp"
        onClick={onClose}
      >
        <FocusTrap>
          <div
            className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-md w-full relative animate-fadeInUp"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-booking-modal-title"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h2
                id="demo-booking-modal-title"
                className="text-xl sm:text-2xl font-bold text-gray-900 mb-2"
              >
                Book Free Demo Class
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">{courseTitle}</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() =>
                  trackAndOpenWhatsApp({
                    source: 'demo-booking-modal',
                    message: `Hi! I want to book a demo class for ${courseTitle}. Please help me schedule.`,
                    campaign: 'demo-booking',
                  })
                }
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-2xl transition-colors min-h-[56px] touch-manipulation shadow-lg shadow-green-500/25"
              >
                <MessageCircle className="w-6 h-6" />
                WhatsApp Us Now
              </button>

              <a
                href="tel:+918826444334"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl transition-colors min-h-[56px] touch-manipulation shadow-lg shadow-blue-500/25"
              >
                <Phone className="w-6 h-6" />
                Call: +91 88264 44334
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
              {[
                'Instant response on WhatsApp',
                '100% free demo class',
                'AIIMS faculty session',
              ].map((item) => (
                <div key={item} className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </FocusTrap>
      </div>
    </>
  )
}
