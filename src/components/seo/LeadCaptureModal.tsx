'use client'

import { useEffect } from 'react'
import { X, Download, CheckCircle, MessageCircle, Phone } from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

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
  topicTitle,
  leadMagnetTitle,
  leadMagnetDescription,
}: LeadCaptureModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeInUp"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto relative shadow-2xl animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

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
              <span>Instant delivery via WhatsApp</span>
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

        <div className="space-y-3">
          <button
            type="button"
            onClick={() =>
              trackAndOpenWhatsApp({
                source: 'seo-lead-capture',
                message: `Hi! I want to get the free PDF notes on "${topicTitle}". Please share ${leadMagnetTitle}.`,
                campaign: 'seo-lead-magnet',
              })
            }
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-green-500/25 transition-all min-h-[48px] touch-manipulation"
          >
            <MessageCircle className="w-5 h-5" />
            Get via WhatsApp
          </button>

          <a
            href="tel:+918826444334"
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/25 transition-all min-h-[48px] touch-manipulation"
          >
            <Phone className="w-5 h-5" />
            Call: +91 88264 44334
          </a>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center text-xs text-gray-500 space-x-4">
            <span>Instant Delivery</span>
            <span>•</span>
            <span>No Spam</span>
            <span>•</span>
            <span>100% Free</span>
          </div>
        </div>
      </div>
    </div>
  )
}
