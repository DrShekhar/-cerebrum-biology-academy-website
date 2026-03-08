'use client'

import { X, Download, CheckCircle, Phone, MessageCircle } from 'lucide-react'
import { LeadMagnet } from '@/data/leadMagnets'
import { LocalArea } from '@/data/localAreas'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

interface LeadMagnetModalProps {
  isOpen: boolean
  onClose: () => void
  leadMagnet: LeadMagnet
  area: LocalArea
}

export function LeadMagnetModal({ isOpen, onClose, leadMagnet, area }: LeadMagnetModalProps) {
  if (!isOpen) return null

  const title = leadMagnet.title.replace('[AREA]', area.displayName)
  const description = leadMagnet.description.replace('[AREA]', area.displayName)

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeInUp"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Download className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4 mr-2" />
            {leadMagnet.value}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">What You&apos;ll Get:</h3>
          <ul className="space-y-3">
            {leadMagnet.conversionBenefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{benefit.replace('[AREA]', area.displayName)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <button
            onClick={() =>
              trackAndOpenWhatsApp({
                source: `lead-magnet-${area.slug}`,
                message: `Hi! I want to get the ${title}. Please share the details.`,
                campaign: 'lead-magnet',
              })
            }
            className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl transition-all shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
            Get via WhatsApp
          </button>

          <a
            href="tel:+918826444334"
            className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl transition-all shadow-lg"
          >
            <Phone className="w-6 h-6" />
            Call: +91 88264 44334
          </a>
        </div>

        {leadMagnet.socialProof && (
          <div className="text-center text-sm text-gray-500 mt-4">
            {leadMagnet.socialProof.replace('[AREA]', area.displayName)}
          </div>
        )}
      </div>
    </div>
  )
}
