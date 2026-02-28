'use client'

import { useState, useCallback } from 'react'
import {
  MessageCircle,
  X,
  Smartphone,
  Copy,
  Check,
  ExternalLink,
  Clock,
  Users,
  Phone,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

const WHATSAPP_NUMBER = '918826444334'
const DISPLAY_NUMBER = '+91 88264 44334'

interface WhatsAppQRModalContentProps {
  whatsappUrl: string
  message: string
  source?: string
  onClose: () => void
}

export function WhatsAppQRModalContent({
  whatsappUrl,
  message,
  source = 'qr-modal',
  onClose,
}: WhatsAppQRModalContentProps) {
  const [copied, setCopied] = useState(false)

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(whatsappUrl)}&bgcolor=ffffff&color=128C7E&margin=10`

  const handleWhatsAppWeb = useCallback(async () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'qr_modal_whatsapp_web', {
        event_category: 'conversion',
        event_label: 'whatsapp_web',
        source: `${source}-web`,
      })
    }
    await trackAndOpenWhatsApp({
      source: `${source}-web`,
      message,
      campaign: `${source}-web`,
    })
    onClose()
  }, [source, message, onClose])

  const copyWhatsAppLink = useCallback(() => {
    navigator.clipboard.writeText(whatsappUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'qr_modal_link_copied', {
        event_category: 'conversion',
        source,
      })
    }
  }, [whatsappUrl, source])

  return (
    <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="bg-[#075E54] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Chat with Cerebrum Biology Academy</h3>
            <p className="text-sm text-green-200 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
              Online now — Avg reply: 2 mins
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* QR Code */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Smartphone className="w-4 h-4" />
            Easiest: Scan with your phone
          </div>
          <div className="bg-white p-4 rounded-xl border-2 border-green-100 inline-block shadow-sm">
            <img
              src={qrCodeUrl}
              alt="Scan QR code to open WhatsApp chat"
              width={200}
              height={200}
              className="rounded-lg"
              loading="eager"
            />
          </div>
          <p className="text-gray-500 text-sm mt-3">
            Open your phone camera and point at the QR code
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-5">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-gray-400 text-sm font-medium">or use these options</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Alternative options */}
        <div className="space-y-3">
          {/* WhatsApp Web */}
          <button
            onClick={handleWhatsAppWeb}
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all group"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <ExternalLink className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left flex-1">
              <p className="font-semibold text-gray-900">Open WhatsApp Web</p>
              <p className="text-sm text-gray-500">
                Chat from this computer (needs WhatsApp Web login)
              </p>
            </div>
          </button>

          {/* Copy Link */}
          <button
            onClick={copyWhatsAppLink}
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all group"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
              {copied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-green-600" />
              )}
            </div>
            <div className="text-left flex-1">
              <p className="font-semibold text-gray-900">
                {copied ? 'Link Copied!' : 'Copy Chat Link'}
              </p>
              <p className="text-sm text-gray-500">
                {copied ? 'Paste it in your phone browser' : 'Share to your phone via any app'}
              </p>
            </div>
          </button>
        </div>

        {/* Direct Number + Call */}
        <div className="mt-5 p-4 bg-gray-50 rounded-xl text-center">
          <p className="text-sm text-gray-500 mb-1">Or save our WhatsApp number directly:</p>
          <p className="text-xl font-bold text-gray-900 tracking-wide">{DISPLAY_NUMBER}</p>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <Phone className="w-3.5 h-3.5" />
            Call Now
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            1,50,000+ students coached
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            98% success rate
          </span>
        </div>
      </div>
    </div>
  )
}
